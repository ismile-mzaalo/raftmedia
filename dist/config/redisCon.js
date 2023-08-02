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
const ioredis_1 = __importDefault(require("ioredis"));
const connectRedis = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let redisClient = new ioredis_1.default({
            host: "localhost",
            port: 6379,
        });
        redisClient.on("connect", () => console.log("-- Connected to Redis server --"));
        redisClient.on("error", (error) => console.error(`Error : ${error}`));
    }
    catch (error) {
        console.error(`Error:${error}`);
        process.exit(1);
    }
});
exports.default = connectRedis;
