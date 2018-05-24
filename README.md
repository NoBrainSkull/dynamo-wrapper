# Dynamo Connector

All in here is used to fetch data from dynamo a dynamo table.

# Docs

## add({ args, params = null, options })

Extend : [DynamoDB - put](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property)
```js
new Table().add({
  args: {
    string: "String",
    object: {"Object"},
    array: ["Array"],
    numeric: "Numeric"
  },
  params: {
    DynamodbParams
  },
  options: {
    customPrimaryKey: "Boolean"
  }
})
```

## query(params = null)

Extend : [DynamoDB - query](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#query-property)
```js
new Table().query({
  DynamodbParams
})
```

## find(params = null)

Extend : [DynamoDB - scan](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#scan-property)
```js
new Table().find({
  DynamodbParams
})
```

## findById(key, params = null)

Extend : [DynamoDB - get](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#get-property)
```js
new Table().findById({
  primaryKey: "String",
  sortingKey: "String"
},
{
  DynamodbParams
})
```