import uuid from 'uuid/v1'
import * as db from './dynamo'

export default class Table {
  constructor(name) {
    this.name = name
  }

  query(params = null) {
    return db.query({
      TableName: this.name,
      ...params
    })
  }

  find(params = null) {
    return db.scan({
      TableName: this.name,
      ...params
    })
  }

  findById(id, params = null) {
    return db.get({
      TableName: this.name,
      Key: { id },
      ...params
    })
  }

  findByCompositeId(params = null) {
    return db.get({
      TableName: this.name,
      Key: { ...ids },
      ...params
    })
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
