import * as http from "http";
import * as WebSocket from "ws";
import * as fs from "fs";
import { WebSocketInterface } from "./types";
import dbConnection from "./config/dbConfig";
import { Login } from "./services/UserService";
import { addCurtain, controlCurtain, getCurtains } from "./services/CurtainService";
const PORT = process.env.PORT||5000;
dbConnection();
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

async function handleMessage(wss:WebSocket.Server,ws:WebSocketInterface,dataBuff:WebSocket.RawData){
    var res;
    try{
    
        const data = JSON.parse(dataBuff.toString());
        switch (data.type) {
            case "connect":
                ws.id = data.message.username;
               
                const user = await Login(data.message.username); 
                res = {
                    type :"connect",
                    success:true,
                    message: user
                }
                ws.send(JSON.stringify(res));
                console.log(`${data.message.username} Connected!`)
                break;
            case "add-curtain":
                res = await addCurtain(data);
                ws.send(JSON.stringify(res));
            
               
                break;
            case "get-curtains":

                    res = await getCurtains(data);
                    ws.send(JSON.stringify(res));
    
    
                    console.log(`${data.message.username}, Getting Curtain`)
                    break;
             case "control-curtain":
                        res = controlCurtain(data,wss,ws)
                       
                        ws.send(JSON.stringify(res));
        
        
                        console.log(`${data.message.username}, Curtain Created`)
                        break;
            default:
                break;
        }
    


    }catch(e){
        console.log("Error",e);
    }
    
}

server.listen(PORT,()=>{
    console.log(`server started at ${PORT}`);
});