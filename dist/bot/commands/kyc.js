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
exports.kycCommand = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../../config");
const logger_1 = require("../../utils/logger");
const config = (0, config_1.loadConfig)();
// Command: /kyc
const kycCommand = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const token = ctx.session.token;
    if (!token) {
        return ctx.reply('Please log in first using /login.');
    }
    try {
        const response = yield axios_1.default.get(`${config.copperxApiBaseUrl}/kycs`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.approved) {
            ctx.reply('Your KYC is approved. You can proceed with transactions.');
        }
        else {
            ctx.reply('Your KYC is not approved. Please complete KYC at: https://copperx.io/kyc');
        }
        (0, logger_1.logInfo)(`KYC status checked for user: ${ctx.session.email}`, 'kyc');
    }
    catch (error) {
        (0, logger_1.logError)(error, 'checking KYC status');
        ctx.reply('Failed to check KYC status. Please try again later.');
    }
});
exports.kycCommand = kycCommand;
