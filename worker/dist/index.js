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
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const client = (0, redis_1.createClient)({
    url: 'redis://localhost:6379'
});
const redisConnect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        return true;
    }
    catch (e) {
        console.log(e);
        return false;
    }
});
let isConnected = false;
redisConnect()
    .then(res => {
    while (!res) {
        redisConnect();
    }
    isConnected = res;
    console.log(res);
});
const getQueueElement = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        while (1) {
            const response = yield client.brPop('submissions', 0);
            console.log(response);
        }
    }
    catch (e) {
        console.log(e);
    }
});
getQueueElement();
