"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const http = __importStar(require("http"));
const WebSocket = __importStar(require("ws"));
const fs = __importStar(require("fs"));
const PORT = process.env.PORT || 5000;
const server = http.createServer((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.url === "/" && req.method === "GET") {
        fs.readFile('index.html', (error, pgResp) => {
            if (!error) {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.write(pgResp);
                res.end();
            }
        });
    }
    else if (req.url === "/test" && req.method === "GET") {
        // fs.readFile('index.html',(error,pgResp)=>{
        //     if(!error){
        //         res.writeHead(200,{"Content-Type":"text/html"});
        //         res.write(pgResp);
        //         res.end();
        //     }
        // });
        res.writeHead(200);
        res.end(JSON.stringify({ test: "This is a Test" }));
    }
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route not found" }));
    }
}));
const wss = new WebSocket.Server({ server });
wss.on('connection', function connection(ws) {
    console.log("new connection");
    ws.on('message', function incoming(data) {
        // console.log(data.toString())
        // wss.clients.forEach((client)=>{
        //     client.send(data.toString());
        // })
        handleMessage(wss, ws, data);
    });
});
function handleMessage(wss, ws, data) {
    console.log(data);
}
server.listen(PORT, () => {
    console.log(`server started at ${PORT}`);
});
