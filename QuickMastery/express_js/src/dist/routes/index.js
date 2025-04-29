"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_root_1 = __importDefault(require("./user.root"));
const router = express_1.default.Router();
router.use("/v2", user_root_1.default);
exports.default = router;
