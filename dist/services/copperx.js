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
exports.authenticateOTP = exports.requestOTP = exports.sendFundsToWallet = exports.sendFundsToEmail = exports.withdrawToBank = exports.getWalletBalances = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config");
const logger_1 = require("../utils/logger");
const config = (0, config_1.loadConfig)();
// Fetch wallet balances
const getWalletBalances = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`${config.copperxApiBaseUrl}/wallets/balances`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        (0, logger_1.logInfo)('Fetched wallet balances successfully.', 'copperx');
        return response.data;
    }
    catch (error) {
        (0, logger_1.logError)(error, 'fetching wallet balances');
        throw new Error('Failed to fetch wallet balances.');
    }
});
exports.getWalletBalances = getWalletBalances;
// Withdraw funds to a bank account
const withdrawToBank = (token, bankAccountId, amount) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post(`${config.copperxApiBaseUrl}/transfers/offramp`, { bankAccountId, amount }, { headers: { Authorization: `Bearer ${token}` } });
        (0, logger_1.logInfo)(`Withdrawal successful: ${response.data.transactionId}`, 'copperx');
        return response.data;
    }
    catch (error) {
        (0, logger_1.logError)(error, 'withdrawing funds to bank');
        throw new Error('Failed to process withdrawal.');
    }
});
exports.withdrawToBank = withdrawToBank;
// Send funds to an email
const sendFundsToEmail = (token, email, amount) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post(`${config.copperxApiBaseUrl}/transfers/send`, { email, amount }, { headers: { Authorization: `Bearer ${token}` } });
        (0, logger_1.logInfo)(`Funds sent to email: ${email}`, 'copperx');
        return response.data;
    }
    catch (error) {
        (0, logger_1.logError)(error, 'sending funds to email');
        throw new Error('Failed to send funds.');
    }
});
exports.sendFundsToEmail = sendFundsToEmail;
// Send funds to a wallet address
const sendFundsToWallet = (token, address, amount) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post(`${config.copperxApiBaseUrl}/transfers/wallet-withdraw`, { address, amount }, { headers: { Authorization: `Bearer ${token}` } });
        (0, logger_1.logInfo)(`Funds sent to wallet: ${address}`, 'copperx');
        return response.data;
    }
    catch (error) {
        (0, logger_1.logError)(error, 'sending funds to wallet');
        throw new Error('Failed to send funds.');
    }
});
exports.sendFundsToWallet = sendFundsToWallet;
// Request OTP for authentication
const requestOTP = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post(`${config.copperxApiBaseUrl}/auth/email-otp/request`, { email });
        (0, logger_1.logInfo)(`OTP requested for email: ${email}`, 'copperx');
        return response.data;
    }
    catch (error) {
        (0, logger_1.logError)(error, 'requesting OTP');
        throw new Error('Failed to request OTP.');
    }
});
exports.requestOTP = requestOTP;
// Authenticate with OTP
const authenticateOTP = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post(`${config.copperxApiBaseUrl}/auth/email-otp/authenticate`, { email, otp });
        (0, logger_1.logInfo)(`User authenticated: ${email}`, 'copperx');
        return response.data.token; // Session token
    }
    catch (error) {
        (0, logger_1.logError)(error, 'authenticating OTP');
        throw new Error('Failed to authenticate.');
    }
});
exports.authenticateOTP = authenticateOTP;
