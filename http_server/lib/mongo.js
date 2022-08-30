"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb = require("mongodb");
class Mongo {
    constructor(url, dbName) {
        this.promise = new Promise((resolve) => {
            this.client = new mongodb.MongoClient(url);
            this.client.connect().then(() => {
                this.db = this.client.db(dbName);
                resolve();
            });
        });
    }
    createTable(tableName) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.promise;
            return this.db.createCollection(tableName);
        });
    }
    insert(tableName, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.promise;
            this.db.createCollection(tableName).catch((_err) => { });
            ;
            if (data instanceof Array) {
                return this.db.collection(tableName).insertMany(data);
            }
            else {
                return this.db.collection(tableName).insertOne(data);
            }
        });
    }
    find(tableName, query, limit = 1000, skip = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.promise;
            return new Promise((resolve) => this.db.collection(tableName)
                .find(query, { limit: limit, skip: skip }).toArray((err, result) => {
                if (err)
                    throw err;
                if (Array.isArray(result)) {
                    let ans = [];
                    result.forEach(element => {
                        ans.push(element);
                    });
                    resolve(ans);
                }
                else {
                    resolve([]);
                }
            }));
        });
    }
    count(tableName) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.promise;
            return this.db.collection(tableName).countDocuments();
        });
    }
    update(tableName, query, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.promise;
            return this.db.collection(tableName).updateOne(query, { "$set": data }, { upsert: true });
        });
    }
    delete(tableName, query) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.promise;
            return this.db.collection(tableName).deleteMany(query);
        });
    }
}
exports.default = Mongo;
//# sourceMappingURL=mongo.js.map