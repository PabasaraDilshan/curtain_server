"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CurtainSchema = new mongoose_1.Schema({
    curtainId: String,
    location: String,
    userId: String,
    openTime: String,
    closeTime: String,
    isOpened: { type: Boolean, default: false },
    username: String
});
const Curtain = (0, mongoose_1.model)('Curtain', CurtainSchema);
exports.default = Curtain;
