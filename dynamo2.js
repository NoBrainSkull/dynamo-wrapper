// POC of an idea. Remove if forgotten.

import uuid from 'uuid/v1'
import * as db from './dynamo'

export class DynamoQuery {
  constructor(table) {
    this.table = table
    this.keys = {}
    this.params = {}
  }

  set key(pk) {
    this.key = { ...this.keys, ...pk }
    return this
  }

  keys(pks) {
    this.keys = pks
    return this
  }

  params(params) {
    this.params = params
    return this
  }

  get query(params = null) {
    return {
      TableName: this.query,
      Key: this.keys,
      ...this.params,
      ...params
    }
  }
}

export class DynamoTable {

  constructor(name) {
    this.name = name
  }

  get query(params = null) {
    return new DynamoQuery(this.name)
  }

  find(params = null) {
    return db.scan(
      this.query.params(params) 
    )
  }

  findById(id, params = null) {
    return db.scan(
      this.query.keys(id).params(params) 
    )
  }

  add(args, params = null) {
    return db.createItem({
      TableName: this.name,
      Item: {
        ...args,
        id: uuid()
      },
      ...params
    })
  }

  update(id, params = null) {
    return db.updateItem({
      TableName: this.name,
      Key: {
        id
      },
      ReturnValues: 'ALL_NEW',
      ...params
    })
  }

  updateWithFormat(args) {
    const {
      expression,
      formattedValues,
      formattedNames
    } = this.constructor.formatUpdateValues(args)
    return this.update(args.id, {
      ExpressionAttributeNames: formattedNames,
      UpdateExpression: `SET ${expression.join(', ')}`,
      ExpressionAttributeValues: formattedValues
    })
  }

  remove(args, params = null) {
    return db.deleteItem({
      TableName: this.name,
      Key: {
        id: args.id
      },
      ReturnValues: 'ALL_OLD',
      ...params
    })
  }

  static formatArrayValues(values) {
    return values.reduce(
      (acc, x, i) => ({
        ...acc,
        [`:value${i}`]: x
      }),
      {}
    )
  }

  static formatUpdateValues({ id, ...val }) {
    return Object.keys(val).reduce(
      (acc, key) => ({
        expression: acc.expression.concat(`#${key} = :${key}`),
        formattedValues: {
          ...acc.formattedValues,
          [`:${key}`]: val[key]
        },
        formattedNames: {
          ...acc.formattedNames,
          [`#${key}`]: key
        }
      }),
      { expression: [], formattedValues: {}, formattedNames: {} }
    )
  }

  static addIdToSubItems(val) {
    if (!val) return val
    if (Array.isArray(val)) return val.map(v => Table.addIdToSubItems(v))
    return __addIdToSubItems(val)
  }
}

const __addIdToSubItems = val => {
  return {
    ...val,
    id: uuid()
  }
}
