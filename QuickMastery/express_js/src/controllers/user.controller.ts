import { Request, Response } from "express";

abstract class Controller {
    abstract getAll(req: Request, res: Response): void;
    abstract getOne(req: Request, res: Response): void;
    abstract updateOne(req: Request, res: Response): void;
    abstract createOne(req: Request, res: Response): void;
    protected deleteOne?(req: Request, res: Response): void;
}

class UserController extends Controller {
  private users = [
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

  getAll(req: Request, res: Response) {
    res.json({
      status: 200,
      data: this.users,
      message: "Users fetched successfully",
    });
  }

  getOne(req: Request, res: Response) {
    const { id } = req.params;
    const user = this.users.find((user) => user.id === parseInt(id));
    if (user) {
      res.json({
        status: 200,
        data: user,
        message: "User fetched successfully",
      });
    } else {
      res.json({
        status: 404,
        data: null,
        message: "User not found",
      });
    }
  }

  updateOne(req: Request, res: Response) {
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
    } else {
      res.json({
        status: 404,
        data: null,
        message: "User not found",
      });
    }
  }

  createOne(req: Request, res: Response) {
    const { name } = req.body;
    const id = this.users.length + 1;
    const user = { id, name };
    this.users.push(user);
    res.json({
      status: 200,
      data: user,
      message: "User created successfully",
    });
  }

  deleteOne(req: Request, res: Response) {
    const { id } = req.params;
    this.users = this.users.filter((user) => user.id !== parseInt(id));
    const user = this.users.find((user) => user.id === parseInt(id));
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
  }
}

export default new UserController();