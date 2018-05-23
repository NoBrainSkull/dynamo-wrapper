import uuid from 'uuid/v1'
import * as db from './dynamo'

export default class Table {
  constructor(name) {
    this.name = name
  }

  add(args, params = null) {
    let id = {}
    id = params.idField ? (id[params.idField] = uuid()) : (id['id'] = uuid())
    return db.createItem({
      TableName: this.name,
      Item: {
        ...id,
        ...args
      },
      ...params
    })
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

  findNotNull({ field }, params = null) {
    return this.find(
      {
        ExpressionAttributeNames: { '#field': `${field}` },
        FilterExpression: 'attribute_exists(#field)'
      },
      params
    )
  }

  findNull({ field }, params = null) {
    return this.find(
      {
        ExpressionAttributeNames: { '#field': `${field}` },
        FilterExpression: 'attribute_not_exists(#field)'
      },
      params
    )
  }

  findIn({ values, field }, params = null) {
    const filters = Table.formatArrayValues(values)
    return this.find(
      {
        ExpressionAttributeNames: { '#field': `${field}` },
        FilterExpression: `#field IN (${Object.keys(filters)})`,
        ExpressionAttributeValues: filters
      },
      params
    )
  }

  findBy({ value, field }, params = null) {
    return this.find(
      {
        ExpressionAttributeNames: { '#field': `${field}` },
        FilterExpression: `#field = :${field}`,
        ExpressionAttributeValues: { [`:${field}`]: value }
      },
      params
    )
  }

  findContains({ value, field }, params = null) {
    return this.find(
      {
        ExpressionAttributeNames: { '#field': `${field}` },
        FilterExpression: `#field contains :${field}`,
        ExpressionAttributeValues: { [`:${field}`]: value }
      },
      params
    )
  }

  update(id, params = null) {
    let id = {}
    id = params.idField
      ? (id[params.idField] = params[params.idField])
      : (id['id'] = params[params.idField])
    return db.updateItem({
      TableName: this.name,
      Key: {
        ...id
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
    return __addIdToSubItems(val, inc)
  }
}

const __addIdToSubItems = (val, clockseq) => {
  if (val.id) return val
  return {
    ...val,
    id: uuid({ clockseq })
  }
}
