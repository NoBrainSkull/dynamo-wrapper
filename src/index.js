import uuid from 'uuid/v1'
import * as db from './dynamo'

export default class Table {
  constructor(name, documentArgs, options) {
    this.name = name
    this.documentArgs = documentArgs || {
      convertEmptyValues: true
    }
    this.options = options
  }

  add({ args, params = null, options }) {
    return db.createItem(
      {
        TableName: this.name,
        Item: {
          createdAt: new Date().toJSON(),
          updatedAt: new Date().toJSON(),
          ..._attachPrimaryKey(options),
          ...args
        },
        ...params
      },
      this.documentArgs,
      this.options
    )
  }

  async put(key, args, params = null) {
    const item = await this.findById(key, params)
    return db.createItem(
      {
        TableName: this.name,
        Item: {
          ...item,
          ..._attachCreatedAt(item),
          updatedAt: new Date().toJSON(),
          ...key,
          ...args
        },
        ...params
      },
      this.documentArgs,
      this.options
    )
  }

  query(params = null) {
    return db.query(
      {
        TableName: this.name,
        ...params
      },
      this.documentArgs,
      this.options
    )
  }

  find(params = null) {
    return db.scan(
      {
        TableName: this.name,
        ...params
      },
      this.documentArgs,
      this.options
    )
  }

  findById(key, params = null) {
    return db.get(
      {
        TableName: this.name,
        Key: key,
        ...params
      },
      this.documentArgs,
      this.options
    )
  }

  findByIndex(index, key, params = null) {
    const {
      expression,
      formattedValues,
      formattedNames
    } = this.constructor.formatValues(key)
    return db.query(
      {
        TableName: this.name,
        IndexName: index,
        KeyConditionExpression: `${expression.join(', ')}`,
        ExpressionAttributeNames: formattedNames,
        ExpressionAttributeValues: formattedValues,
        ...params
      },
      this.documentArgs,
      this.options
    )
  }

  findNotNull({ field }, params = null) {
    return this.find({
      ExpressionAttributeNames: { '#field': `${field}` },
      FilterExpression: 'attribute_exists(#field)',
      ...params
    })
  }

  findNull({ field }, params = null) {
    return this.find({
      ExpressionAttributeNames: { '#field': `${field}` },
      FilterExpression: 'attribute_not_exists(#field)',
      ...params
    })
  }

  findIn({ values, field }, params = null) {
    const filters = Table.formatArrayValues(values)
    return this.find({
      ExpressionAttributeNames: { '#field': `${field}` },
      FilterExpression: `#field IN (${Object.keys(filters)})`,
      ExpressionAttributeValues: filters,
      ...params
    })
  }

  findBy({ value, field }, params = null) {
    return this.find({
      ExpressionAttributeNames: { '#field': `${field}` },
      FilterExpression: `#field = :${field}`,
      ExpressionAttributeValues: { [`:${field}`]: value },
      ...params
    })
  }

  findContains({ value, field }, params = null) {
    return this.find({
      ExpressionAttributeNames: { '#field': `${field}` },
      FilterExpression: `contains(#field, :${field})`,
      ExpressionAttributeValues: { [`:${field}`]: value },
      ...params
    })
  }

  update(key, params = null) {
    return db.updateItem(
      {
        TableName: this.name,
        Key: key,
        ReturnValues: 'ALL_NEW',
        ...params
      },
      this.documentArgs,
      this.options
    )
  }

  updateWithFormat(key, args, params = null) {
    Object.keys(key).forEach(k => delete args[k])
    const {
      expression,
      formattedValues,
      formattedNames
    } = this.constructor.formatValues(args)
    const UpdateExpression = expression.includes('#updatedAt = :updatedAt')
      ? `SET ${expression.join(', ')}`
      : `SET ${expression.join(', ')}, #updatedAt = :updatedAt`
    return this.update(key, {
      ExpressionAttributeNames: {
        '#updatedAt': 'updatedAt',
        ...formattedNames
      },
      UpdateExpression,
      ExpressionAttributeValues: {
        ':updatedAt': new Date().toJSON(),
        ...formattedValues
      },
      ...params
    })
  }

  remove(key, params = null) {
    return db.deleteItem(
      {
        TableName: this.name,
        Key: key,
        ReturnValues: 'ALL_OLD',
        ...params
      },
      this.documentArgs,
      this.options
    )
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

  static formatValues(val) {
    return Object.keys(val).reduce(
      (acc, key) => {
        if (val[key] === undefined) return acc
        return {
          expression: acc.expression.concat(`#${key} = :${key}`),
          formattedValues: {
            ...acc.formattedValues,
            [`:${key}`]: val[key]
          },
          formattedNames: {
            ...acc.formattedNames,
            [`#${key}`]: key
          }
        }
      },
      { expression: [], formattedValues: {}, formattedNames: {} }
    )
  }

  static addIdToSubItems(val, inc = 0) {
    if (!val) return val
    if (Array.isArray(val)) {
      const i = inc + 1
      return val.map(v => Table.addIdToSubItems(v, i))
    }
    return _addIdToSubItems(val, inc)
  }
}

const _addIdToSubItems = (val, clockseq) => {
  if (val.id) return val
  return {
    ...val,
    id: uuid({ clockseq })
  }
}

const _attachPrimaryKey = options => {
  if (!options || !options.customPrimaryKey) return { id: uuid() }
}

const _attachCreatedAt = item =>
  item
    ? {}
    : {
        createdAt: new Date().toJSON()
      }
