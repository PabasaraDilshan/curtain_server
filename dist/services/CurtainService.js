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
exports.addCurtain = exports.getCurtains = exports.controlCurtain = void 0;
const User_1 = __importDefault(require("../models/User"));
const Curtain_1 = __importDefault(require("../models/Curtain"));
function controlCurtain(req, wss, ws) {
    return __awaiter(this, void 0, void 0, function* () {
        var res;
        if (req.message.command == "open") {
            Curtain_1.default.updateOne({ curtainId: req.message.curtainId }, { isOpen: true });
            res = {
                type: 'control-curtain',
                message: "Curtain Opened Successfully",
                success: true
            };
        }
        else {
            Curtain_1.default.updateOne({ curtainId: req.message.curtainId }, { isOpen: false });
            res = {
                type: 'control-curtain',
                message: "Curtain Closed Successfully",
                success: true
            };
        }
        return res;
    });
}
exports.controlCurtain = controlCurtain;
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
