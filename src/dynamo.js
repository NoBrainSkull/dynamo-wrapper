import AWSDK from 'aws-sdk'

export function query(params, documentArgs, options = {}) {
  return new Promise((resolve, reject) =>
    new AWSDK.DynamoDB.DocumentClient(documentArgs)
      .query(params)
      .promise()
      .then(data => {
        if(options.verbose) console.log('query:', data)
        return data
      })
      .then(data => resolve(data.Items))
      .catch(error => reject(error))
  )
}

export function scan(params, documentArgs, options = {}) {
  return new Promise((resolve, reject) =>
    new AWSDK.DynamoDB.DocumentClient(documentArgs)
      .scan(params)
      .promise()
      .then(data => {
        if(options.verbose) console.log('query:', data)
        return data
      })
      .then(async data =>
        data.LastEvaluatedKey
          ? resolve(
              data.Items.concat(
                await scan(
                  {
                    ...params,
                    ExclusiveStartKey: data.LastEvaluatedKey
                  },
                  documentArgs
                )
              )
            )
          : resolve(data.Items)
      )
      .catch(error => reject(error))
  )
}

export function get(params, documentArgs, options = {}) {
  return new Promise((resolve, reject) =>
    new AWSDK.DynamoDB.DocumentClient(documentArgs)
      .get(params)
      .promise()
      .then(data => {
        if(options.verbose) console.log('query:', data)
        return data
      })
      .then(data => resolve(data.Item))
      .catch(error => reject(error))
  )
}

export function createItem(params, documentArgs, options = {}) {
  return new Promise((resolve, reject) =>
    new AWSDK.DynamoDB.DocumentClient(documentArgs)
      .put(params)
      .promise()
      .then(data => {
        if(options.verbose) console.log('query:', data)
        return data
      })
      .then(() => resolve(params.Item))
      .catch(error => reject(error))
  )
}

export function updateItem(params, documentArgs, options = {}) {
  return new Promise((resolve, reject) =>
    new AWSDK.DynamoDB.DocumentClient(documentArgs)
      .update(params)
      .promise()
      .then(data => {
        if(options.verbose) console.log('query:', data)
        return data
      })
      .then(data => resolve(data.Attributes))
      .catch(error => reject(error))
  )
}

export function deleteItem(params, documentArgs, options = {}) {
  return new Promise((resolve, reject) =>
    new AWSDK.DynamoDB.DocumentClient(documentArgs)
      .delete(params)
      .promise()
      .then(data => {
        if(options.verbose) console.log('query:', data)
        return data
      })
      .then(data => resolve(data.Attributes))
      .catch(error => reject(error))
  )
}
