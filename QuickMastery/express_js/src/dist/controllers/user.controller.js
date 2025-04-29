"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Controller {
}
class UserController extends Controller {
    constructor() {
        super(...arguments);
        this.users = [
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
        this.getAll = (req, res) => {
            res.json({
                status: 200,
                data: this.users,
                message: "Users fetched successfully",
            });
        };
        this.getOne = (req, res) => {
            const { id } = req.params;
            const user = this.users.find((user) => user.id === parseInt(id));
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
        };
        this.updateOne = (req, res) => {
            const { id } = req.params;
            const { name } = req.body;
            const user = this.users.find((user) => user.id === parseInt(id));
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
        };
        this.createOne = (req, res) => {
            const { name } = req.body;
            const id = this.users.length + 1;
            const user = { id, name };
            this.users.push(user);
            res.json({
                status: 200,
                data: user,
                message: "User created successfully",
            });
        };
        this.deleteOne = (req, res) => {
            const { id } = req.params;
            const user = this.users.find((user) => user.id === parseInt(id));
            if (!user) {
                res.json({
                    status: 404,
                    data: null,
                    message: "User not found",
                });
                return;
            }
            this.users = this.users.filter((user) => user.id !== parseInt(id));
            res.json({
                status: 200,
                data: null,
                message: "User deleted successfully",
            });
        };
    }
}
exports.default = new UserController();
