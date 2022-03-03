import User from "../models/User";
import Curtain from "../models/Curtain";
import {Server} from "ws";
import { WebSocketInterface } from "../types";

export async function controlCurtain(req:any,wss:Server,ws:WebSocketInterface){
   var res;
    if(req.message.command=="open"){
        Curtain.updateOne({curtainId:req.message.curtainId},{isOpen:true});
         res = {
            type:'control-curtain',
            message:"Curtain Opened Successfully",
            success:true
    
        }
    }else{
        Curtain.updateOne({curtainId:req.message.curtainId},{isOpen:false});
         res = {
            type:'control-curtain',
            message:"Curtain Closed Successfully",
            success:true
    
        }
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