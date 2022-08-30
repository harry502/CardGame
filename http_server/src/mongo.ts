import * as mongodb from "mongodb";

export default class Mongo {
    client: mongodb.MongoClient;
    db: mongodb.Db;
    promise: Promise<void>;
    constructor(url: string, dbName: string) {
        this.promise = new Promise((resolve) =>
            {
                this.client = new mongodb.MongoClient(url);
                this.client.connect().then(()=>{
                    this.db = this.client.db(dbName);
                    resolve();
                });
            }
        );
    }

    public async createTable(tableName: string) {
        await this.promise;
        return this.db.createCollection(tableName);
    }

    public async insert(tableName: string, data: any) {
        await this.promise;
        this.db.createCollection(tableName).catch((_err)=>{});;
        if (data instanceof Array) {
            return this.db.collection(tableName).insertMany(data);
        }
        else {
            return this.db.collection(tableName).insertOne(data);
        }
    }

    public async find(tableName: string, query: any, limit: number = 1000, skip: number = 0) {
        await this.promise;
        return new Promise<any[]>((resolve) => this.db.collection(tableName)
        .find(query, {limit: limit, skip: skip}).toArray((err, result) => {
            if (err) throw err;
            if (Array.isArray(result)) {
                let ans: any[] = [];
                result.forEach(element => {
                    ans.push(element);
                });
                resolve(ans);
            }
            else {
                resolve([]);
            }
        }));
    }

    public async count(tableName: string) {
        await this.promise;
        return this.db.collection(tableName).countDocuments();
    }

    public async update(tableName: string, query: any, data: any) {
        await this.promise;
        return this.db.collection(tableName).updateOne(query, { "$set": data }, { upsert: true });
    }

    public async delete(tableName: string, query: any) {
        await this.promise;
        return this.db.collection(tableName).deleteMany(query);
    }
}