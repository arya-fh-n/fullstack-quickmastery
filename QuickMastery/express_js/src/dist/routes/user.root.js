"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
let users = [
    {
        id: 1,
        name: "John Doe",
    },
    {
        id: 2,
        name: "Jane Doe",
    },
    {
        id: 3,
        name: "John Doe",
    },
    {
        id: 4,
        name: "Jane Doe",
    },
    {
        id: 5,
        name: "John Doe",
    },
];
router.get("/", (req, res) => {
    res.send("Hello World!");
});
router.get("/users", (req, res) => {
    res.json({
        status: 200,
        data: users,
        message: "Users fetched successfully",
    });
});
router.get("/user/:id", (req, res) => {
    const { id } = req.params;
    const user = users.find((user) => user.id === parseInt(id));
    if (user) {
        res.json({
            status: 200,
            data: user,
            message: "User fetched successfully",
        });
    }
    else {
        res.json({
            status: 404,
            data: null,
            message: "User not found",
        });
    }
});
router.put("/user/:id", (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const user = users.find((user) => user.id === parseInt(id));
    if (user) {
        user.name = name;
        res.json({
            status: 200,
            data: user,
            message: "User updated successfully",
        });
    }
    else {
        res.json({
            status: 404,
            data: null,
            message: "User not found",
        });
    }
});
router.post("/user", (req, res) => {
    const { name } = req.body;
    const id = users.length + 1;
    const user = { id, name };
    users.push(user);
    res.json({
        status: 200,
        data: user,
        message: "User created successfully",
    });
});
router.delete("/user/:id", (req, res) => {
    const { id } = req.params;
    users = users.filter((user) => user.id !== parseInt(id));
    const user = users.find((user) => user.id === parseInt(id));
    if (!user) {
        res.json({
            status: 404,
            data: null,
            message: "User not found",
        });
        return;
    }
    res.json({
        status: 200,
        data: null,
        message: "User deleted successfully",
    });
});
exports.default = router;
