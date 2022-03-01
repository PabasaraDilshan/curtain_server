import * as http from "http";
import * as WebSocket from "ws";
import * as fs from "fs";
import { WebSocketInterface } from "./types";
const PORT = process.env.PORT||5000;

const server = http.createServer(async (req,res)=>{
    if(req.url==="/" && req.method === "GET"){
        fs.readFile('index.html',(error,pgResp)=>{
            if(!error){
                res.writeHead(200,{"Content-Type":"text/html"});
                res.write(pgResp);
                res.end();
            }
        });
        
    }else if(req.url==="/test" && req.method === "GET"){
        // fs.readFile('index.html',(error,pgResp)=>{
        //     if(!error){
        //         res.writeHead(200,{"Content-Type":"text/html"});
        //         res.write(pgResp);
        //         res.end();
        //     }
        // });
        res.writeHead(200);
        res.end(JSON.stringify({test:"This is a Test"}));
    }
    else{
        res.writeHead(404,{"Content-Type":"application/json"});
        res.end(JSON.stringify({message:"Route not found"}));
    }
});

const wss = new WebSocket.Server({server});
wss.on('connection',function connection(ws){
    
    console.log("new connection");
    ws.on('message',function incoming(data){
        // console.log(data.toString())
        // wss.clients.forEach((client)=>{
        //     client.send(data.toString());
        // })
        handleMessage(wss,ws,data)
    })
})

function handleMessage(wss:WebSocket.Server,ws:WebSocketInterface,dataBuff:WebSocket.RawData){
    try{
    
        const data = JSON.parse(dataBuff.toString());
        switch (data.type) {
            case "connect":
                ws.id = data.message.username;
                console.log(`${data.message.username} Connected`)
                 
                ws.send(`{
                    "type":"connect", 
                    "message":{"username":"${data.message.username}"   },
                    "success":true
                    }`);
                    break;
            case "add-curtain":
                const res = {
                    type:data.type,
                    message:data.message,
                    success:true
                }
                ws.send(JSON.stringify(res));


                console.log(`${data.message.username}, Curtain Created`)
                break;
            default:
                break;
        }
    


    }catch{
        console.log("Error");
    }
    
}

server.listen(PORT,()=>{
    console.log(`server started at ${PORT}`);
});