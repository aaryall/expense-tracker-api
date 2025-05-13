import { MongoClient } from "mongodb";

let client;
export const connectToMongoDB = () =>{
    MongoClient.connect("mongodb://localhost:27017/expenses")
                .then(clientInstance =>{
                    client = clientInstance
                 
                })
                .catch(err =>{
                    console.log(err);
                    console.log("1233333333");
                });
}

export const getClient = () =>{
    return client;
}
export const getDb = () => {
 
    return client.db();
}