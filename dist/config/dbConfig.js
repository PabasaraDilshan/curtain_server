"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const _1 = __importDefault(require("."));
function dbConnection() {
    let dbConfig = _1.default.db.devlopment;
    // switch(config.env) {
    //     case Environment.DEVELOPMENT:
    //         dbConfig = config.db.devlopment;
    //         break;
    //     default:
    //         dbConfig = config.db.test;
    //         break;
    // }
    // concat uri
    const uri = 'mongodb+srv://admin:pabasara12345@cluster0.wtkcb.mongodb.net/Curtains?retryWrites=true&w=majority';
    //const uri: string = `mongodb://${dbConfig.dbHost}:${dbConfig.dbPort}`; /* /${dbConfig.dbName}`; */
    console.log(uri);
    const options = {
        user: dbConfig.dbUsername,
        pass: dbConfig.dbPassword,
        dbName: dbConfig.dbName,
    };
    // mongoose.connect(
    //     uri,
    //     options,
    //     (err:any) => {
    //         if(err){
    //             console.error(err);
    //             console.error('Db connection failure');
    //         } else {
    //             console.log('Db connected successfully');
    //         }
    //     }
    // )
    mongoose_1.default.connect(uri, (err) => {
        if (err) {
            console.error(err);
            console.error('Db connection failure');
        }
        else {
            console.log('Db connected successfully');
        }
    });
}
exports.default = dbConnection;
