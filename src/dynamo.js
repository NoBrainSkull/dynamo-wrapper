import AWSDK from 'aws-sdk'

export function query(params, documentArgs) {
  return new Promise((resolve, reject) =>
    new AWSDK.DynamoDB.DocumentClient(documentArgs)
      .query(params)
      .promise()
      .then(data => resolve(data.Items))
      .catch(err => reject(err))
  )
}

export function scan(params, documentArgs) {
  return new Promise((resolve, reject) =>
    new AWSDK.DynamoDB.DocumentClient(documentArgs)
      .scan(params)
      .promise()
      .then(data => resolve(data.Items))
      .catch(err => reject(err))
  )
}

export function get(params, documentArgs) {
  return new Promise((resolve, reject) =>
    new AWSDK.DynamoDB.DocumentClient(documentArgs)
      .get(params)
      .promise()
      .then(data => resolve(data.Item))
      .catch(err => reject(err))
  )
}

export function createItem(params, documentArgs) {
  return new Promise((resolve, reject) =>
    new AWSDK.DynamoDB.DocumentClient(documentArgs)
      .put(params)
      .promise()
      .then(() => resolve(params.Item))
      .catch(err => reject(err))
  )
}

export function updateItem(params, documentArgs) {
  return new Promise((resolve, reject) =>
    new AWSDK.DynamoDB.DocumentClient(documentArgs)
      .update(params)
      .promise()
      .then(data => resolve(data.Attributes))
      .catch(err => reject(err))
  )
}

export function deleteItem(params, documentArgs) {
  return new Promise((resolve, reject) =>
    new AWSDK.DynamoDB.DocumentClient(documentArgs)
      .delete(params)
      .promise()
      .then(data => resolve(data.Attributes))
      .catch(err => reject(err))
  )
}
