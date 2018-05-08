// TODO: This could be an external module and doesnt really belongs in source.
import AWSDK from 'aws-sdk'

const dynamoDb = new AWSDK.DynamoDB.DocumentClient()

export function query(params) {
  return new Promise((resolve, reject) =>
    dynamoDb
      .query(params)
      .promise()
      .then(data => resolve(data.Items))
      .catch(err => reject(err))
  )
}

export function scan(params) {
  return new Promise((resolve, reject) =>
    dynamoDb
      .scan(params)
      .promise()
      .then(data => resolve(data.Items))
      .catch(err => reject(err))
  )
}

export function get(params) {
  return new Promise((resolve, reject) =>
    dynamoDb
      .get(params)
      .promise()
      .then(data => resolve(data.Item))
      .catch(err => reject(err))
  )
}

export function createItem(params) {
  return new Promise((resolve, reject) =>
    dynamoDb
      .put(params)
      .promise()
      .then(() => resolve(params.Item))
      .catch(err => reject(err))
  )
}

export function updateItem(params) {
  return new Promise((resolve, reject) =>
    dynamoDb
      .update(params)
      .promise()
      .then(data => resolve(data.Attributes))
      .catch(err => reject(err))
  )
}

export function deleteItem(params) {
  return new Promise((resolve, reject) =>
    dynamoDb
      .delete(params)
      .promise()
      .then(data => resolve(data.Attributes))
      .catch(err => reject(err))
  )
}
