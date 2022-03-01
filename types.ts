import {WebSocket} from "ws";

export interface WebSocketInterface extends WebSocket{
    id?:string
}