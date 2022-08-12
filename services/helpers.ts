import { Server } from "ws";

export function getWsbyId(id:string,wss:Server){

    var out;

    wss.clients.forEach((con: any)=>{
        if(con.id){
            console.log(con.id)
            if(con.id ==id){
                out = con;
            }
        }
        
    })

    return out;
}