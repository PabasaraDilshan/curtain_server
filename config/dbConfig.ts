import mongoose from 'mongoose';
import config from '.';
import Environment from './enums';

interface DbConfig {
    dbPort: string;
    dbHost: string;
    dbUsername: string;
    dbPassword: string;
    dbName: string;
}

export default function dbConnection(): void{
    let dbConfig: DbConfig = config.db.devlopment;
    // switch(config.env) {
    //     case Environment.DEVELOPMENT:
    //         dbConfig = config.db.devlopment;
    //         break;
    //     default:
    //         dbConfig = config.db.test;
    //         break;
    // }
    // concat uri
    const uri = 'mongodb+srv://admin:pabasara12345@cluster0.wtkcb.mongodb.net/Curtains?retryWrites=true&w=majority'
    //const uri: string = `mongodb://${dbConfig.dbHost}:${dbConfig.dbPort}`; /* /${dbConfig.dbName}`; */
    console.log(uri)
    const options: mongoose.ConnectOptions = {
        user: dbConfig.dbUsername,
        pass: dbConfig.dbPassword,
        dbName: dbConfig.dbName,
    }

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
    mongoose.connect(
        uri,
   
        (err:any) => {
            if(err){
                console.error(err);
                console.error('Db connection failure');
            } else {
                console.log('Db connected successfully');
            }
        }
    )
}