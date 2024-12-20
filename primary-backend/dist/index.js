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
const express_1 = __importDefault(require("express"));
const redis_1 = require("redis");
const client = (0, redis_1.createClient)({
    url: 'redis://localhost:6379'
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.listen(3000, () => {
    console.log('listening on port 3000!');
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
app.post('/submissions', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const submissionDetails = {
            problem: req.body.problem,
            status: req.body.status
        };
        yield client.lPush('submissions', JSON.stringify(submissionDetails));
        res.json({
            msg: 'Submission received!'
        });
    }
    catch (e) {
        console.log(e);
    }
}));
