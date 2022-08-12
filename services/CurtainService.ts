import User from "../models/User";
import Curtain from "../models/Curtain";
import {Server} from "ws";
import { WebSocketInterface } from "../types";
import { getWsbyId } from "./helpers";

export function controlCurtain(req:any,wss:Server,ws:WebSocketInterface){
   var res;
   console.log(req);
    switch (req.message.command) {
        case "open":
            // Curtain.updateOne({curtainId:req.message.curtainId},{isOpen:true});
            console.log(req)
            var curtainWs = getWsbyId(req.message.curtainId,wss) as WebSocketInterface|undefined;
            if(curtainWs){
                curtainWs.send(JSON.stringify({
                    type:1,
                    username:req.message.username,
                    curtainId:req.message.curtainId,
                    speed:req.message.speed?req.message.speed:30
                }));

            }else{                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
                res = {
                    type:'control-curtain',
                    message:"Curtain Not online",
                    success:false
                }
            }
        break;    
        case "close":
            // Curtain.updateOne({curtainId:req.message.curtainId},{isOpen:false});
         var curtainWs = getWsbyId(req.message.curtainId,wss) as WebSocketInterface|undefined;
         if(curtainWs){
             curtainWs.send(JSON.stringify({
                 type:0,
                 username:req.message.username,
                 curtainId:req.message.curtainId,
                 speed:req.message.speed?req.message.speed:30
             }));

         }else{                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
             res = {
                 type:'control-curtain',
                 message:"Curtain Not online",
                 success:false
             }
         }

            break;
        case "test":
            var curtainWs = getWsbyId(req.message.curtainId,wss) as WebSocketInterface|undefined;
            curtainWs?.send(JSON.stringify({
                type:7,
                username:req.message.username,
                curtainId:req.message.curtainId
            }))
            break;
        default:
            break;
    }
    return res
}


export async function handleCurtainMsg(req:any,wss:Server,ws:WebSocketInterface){
    var res;
    
     switch (req.case) {
         case 0:
             // Curtain.updateOne({curtainId:req.message.curtainId},{isOpen:true});
             console.log("User",req.username);
             var userWs = getWsbyId(req.username,wss) as WebSocketInterface|undefined;
             if(userWs){
                console.log("Sent",JSON.stringify(req));
                userWs.send(JSON.stringify(req));
 
             }
        break; 
        case 1:
            // Curtain.updateOne({curtainId:req.message.curtainId},{isOpen:true});
            console.log("User",req.username);
            var userWs = getWsbyId(req.username,wss) as WebSocketInterface|undefined;
            if(userWs){
               console.log("Sent",JSON.stringify(req));
               userWs.send(JSON.stringify(req));

            }
       break; 
         default:
             break;
     }
     return res
 }
export async function getCurtains(req:any){
    var res;
    const curtains = await Curtain.find({username:req.message.username})
    res = {
        type:req.type,
        message:curtains,
        success:true
    }
   
    return res
}

export async function addCurtain(req:any){
    console.log("Add Curtain")
    var res;
    const user = await User.findOne({ username: req.message.username });
    if(!user){
        console.log("No User")
        res = {
            type:req.type,
            message:"No user created",
            success:false
        }
        return res
    }else{
        const curtain = await Curtain.findOne({curtainId:req.message.curtainId})
        if(curtain){
            console.log("Already created",curtain)
            res = {
                type:req.type,
                message:"Already created",
                success:false
            }
            return res
        }else{
            
            const curtain = new Curtain({
                curtainId:req.message.curtainId,
                userId:user._id.toString(),
                openTime:req.message.openTime,
                closeTime:req.message.closeTime,
                location:req.message.location,
                username:req.message.username
            })
            curtain.save()
            res = {
                type:req.type,
                message:curtain,
                success:true
            }
            return res
        }
        
    }
    
}