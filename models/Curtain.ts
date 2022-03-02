import { Schema, model } from 'mongoose';

const CurtainSchema = new Schema({
    curtainId:String,
    location:String,
    userId:String,
    openTime: String,
    closeTime:String,
    isOpened:{type:Boolean,default:false},
});

const Curtain = model('Curtain', CurtainSchema);
export default Curtain;