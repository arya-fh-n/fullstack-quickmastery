"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_root_1 = __importDefault(require("./routes/user.root"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/", user_root_1.default);
app.listen(3000, () => {
    console.log("Server started on port 3000");
});
