"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWsbyId = void 0;
function getWsbyId(id, wss) {
    var out;
    wss.clients.forEach((con) => {
        if (con.id) {
            console.log(con.id);
            if (con.id == id) {
                out = con;
            }
        }
    });
    return out;
}
exports.getWsbyId = getWsbyId;
