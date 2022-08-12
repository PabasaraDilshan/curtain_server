"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCurtain = exports.getCurtains = exports.handleCurtainMsg = exports.controlCurtain = void 0;
const User_1 = __importDefault(require("../models/User"));
const Curtain_1 = __importDefault(require("../models/Curtain"));
const helpers_1 = require("./helpers");
function controlCurtain(req, wss, ws) {
    var res;
    console.log(req);
    switch (req.message.command) {
        case "open":
            // Curtain.updateOne({curtainId:req.message.curtainId},{isOpen:true});
            console.log(req);
            var curtainWs = (0, helpers_1.getWsbyId)(req.message.curtainId, wss);
            if (curtainWs) {
                curtainWs.send(JSON.stringify({
                    type: 1,
                    username: req.message.username,
                    curtainId: req.message.curtainId,
                    speed: req.message.speed ? req.message.speed : 30
                }));
            }
            else {
                res = {
                    type: 'control-curtain',
                    message: "Curtain Not online",
                    success: false
                };
            }
            break;
        case "close":
            // Curtain.updateOne({curtainId:req.message.curtainId},{isOpen:false});
            var curtainWs = (0, helpers_1.getWsbyId)(req.message.curtainId, wss);
            if (curtainWs) {
                curtainWs.send(JSON.stringify({
                    type: 0,
                    username: req.message.username,
                    curtainId: req.message.curtainId,
                    speed: req.message.speed ? req.message.speed : 30
                }));
            }
            else {
                res = {
                    type: 'control-curtain',
                    message: "Curtain Not online",
                    success: false
                };
            }
            break;
        case "test":
            var curtainWs = (0, helpers_1.getWsbyId)(req.message.curtainId, wss);
            curtainWs === null || curtainWs === void 0 ? void 0 : curtainWs.send(JSON.stringify({
                type: 7,
                username: req.message.username,
                curtainId: req.message.curtainId
            }));
            break;
        default:
            break;
    }
    return res;
}
exports.controlCurtain = controlCurtain;
function handleCurtainMsg(req, wss, ws) {
    return __awaiter(this, void 0, void 0, function* () {
        var res;
        switch (req.case) {
            case 0:
                // Curtain.updateOne({curtainId:req.message.curtainId},{isOpen:true});
                console.log("User", req.username);
                var userWs = (0, helpers_1.getWsbyId)(req.username, wss);
                if (userWs) {
                    console.log("Sent", JSON.stringify(req));
                    userWs.send(JSON.stringify(req));
                }
                break;
            case 1:
                // Curtain.updateOne({curtainId:req.message.curtainId},{isOpen:true});
                console.log("User", req.username);
                var userWs = (0, helpers_1.getWsbyId)(req.username, wss);
                if (userWs) {
                    console.log("Sent", JSON.stringify(req));
                    userWs.send(JSON.stringify(req));
                }
                break;
            default:
                break;
        }
        return res;
    });
}
exports.handleCurtainMsg = handleCurtainMsg;
function getCurtains(req) {
    return __awaiter(this, void 0, void 0, function* () {
        var res;
        const curtains = yield Curtain_1.default.find({ username: req.message.username });
        res = {
            type: req.type,
            message: curtains,
            success: true
        };
        return res;
    });
}
exports.getCurtains = getCurtains;
function addCurtain(req) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Add Curtain");
        var res;
        const user = yield User_1.default.findOne({ username: req.message.username });
        if (!user) {
            console.log("No User");
            res = {
                type: req.type,
                message: "No user created",
                success: false
            };
            return res;
        }
        else {
            const curtain = yield Curtain_1.default.findOne({ curtainId: req.message.curtainId });
            if (curtain) {
                console.log("Already created", curtain);
                res = {
                    type: req.type,
                    message: "Already created",
                    success: false
                };
                return res;
            }
            else {
                const curtain = new Curtain_1.default({
                    curtainId: req.message.curtainId,
                    userId: user._id.toString(),
                    openTime: req.message.openTime,
                    closeTime: req.message.closeTime,
                    location: req.message.location,
                    username: req.message.username
                });
                curtain.save();
                res = {
                    type: req.type,
                    message: curtain,
                    success: true
                };
                return res;
            }
        }
    });
}
exports.addCurtain = addCurtain;
