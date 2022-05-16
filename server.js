const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const packageDef = protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);

const todoPackage = grpcObject.todoPackage;

const server = new grpc.Server();

server.bind("0.0.0.0:40000", grpc.ServerCredentials.createInsecure());

const todos =[];
server.addService(todoPackage.TodoService.service,{
    "createTodo": (call, callback) => {
        var myVals = call.metadata.get("authorization"); 
        var myVal = myVals[0]; 
      const todoItem = {
          "id": todos.length + 1,
          "text": call.request.text
      }
      if(myVal === "secret"){
        todos.push(todoItem);
        callback(null, todoItem);
      }else{
            callback({
                "details": "Unauthorized"
            }, null);
      }
      
    },
    "readTodos": (call, callback) => {
        callback(null, {
            "items": todos
        });
    }
})

server.start();