"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
const config_1 = require("../config");
// Encrypt data
const encrypt = (data) => {
    return crypto_js_1.default.AES.encrypt(data, config_1.config.encryptionKey).toString();
};
exports.encrypt = encrypt;
// Decrypt data
const decrypt = (encryptedData) => {
    const bytes = crypto_js_1.default.AES.decrypt(encryptedData, config_1.config.encryptionKey);
    return bytes.toString(crypto_js_1.default.enc.Utf8);
};
exports.decrypt = decrypt;
