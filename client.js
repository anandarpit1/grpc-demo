const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const packageDef = protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);

const todoPackage = grpcObject.todoPackage;

const client = new todoPackage.TodoService("localhost:40000", grpc.credentials.createInsecure());

client.createTodo({
    "id": 434,
    "text": "this is my text"
}, (err, response) => {
    console.log("Received from server " + JSON.stringify(response));
})

client.readTodos({}, (err, response) => {
    console.log("Received from server (readtodos) " + JSON.stringify(response));
})