"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    port: '8001',
    domain: '127.0.01',
    env: 'TEST',
    allow_origins: '*',
    //Auth
    isAuthRequired: true,
    authSecret: 'secretkey',
    // Database config
    db: {
        devlopment: {
            dbPort: '27017',
            dbHost: '127.0.0.1',
            dbUsername: 'admin',
            dbPassword: 'password',
            dbName: 'curtains',
        },
        test: {
            dbPort: '27017',
            dbHost: '127.0.0.1',
            dbUsername: 'admin',
            dbPassword: 'password',
            dbName: 'thalassaemia',
        },
    }
};
exports.default = config;
