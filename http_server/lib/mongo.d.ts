import * as mongodb from "mongodb";
export default class Mongo {
    client: mongodb.MongoClient;
    db: mongodb.Db;
    promise: Promise<void>;
    constructor(url: string, dbName: string);
    createTable(tableName: string): Promise<mongodb.Collection<mongodb.Document>>;
    insert(tableName: string, data: any): Promise<mongodb.InsertManyResult<mongodb.Document> | mongodb.InsertOneResult<mongodb.Document>>;
    find(tableName: string, query: any, limit?: number, skip?: number): Promise<any[]>;
    count(tableName: string): Promise<number>;
    update(tableName: string, query: any, data: any): Promise<mongodb.UpdateResult>;
    delete(tableName: string, query: any): Promise<mongodb.DeleteResult>;
}
