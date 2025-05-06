import { Request, Response } from "express";
import AbstractModel from "src/abstract/abstract.controller";

class AuthController extends AbstractModel {

  async getById(req: Request, res: Response): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async getAll(req: Request, res: Response): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async create(req: Request, res: Response): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async update(req: Request, res: Response): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async delete(req: Request, res: Response): Promise<any> {
    throw new Error("Method not implemented.");
  }

  constructor() {
    super();
  }

}

export default new AuthController();