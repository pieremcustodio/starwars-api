const AWS = require('aws-sdk');

let dynamoDB = new AWS.DynamoDB.DocumentClient();

const findSpecie = async(id) => {
    const params = {
        TableName: 'species',
        Key: {
            id: id
        },
    }

    const response = await dynamoDB.get(params).promise();

    return response.Item;
}

const insertSpecie = async(data) => {
    const fechaAct = new Date().toISOString();
    data.creado = fechaAct;
    data.editado = fechaAct;
    
    const params = {
        TableName: 'species',
        Item: data
    };
    
    await dynamoDB.put(params).promise();
    
    return params.Item;
}

module.exports = {
    insertSpecie,
    findSpecie
}