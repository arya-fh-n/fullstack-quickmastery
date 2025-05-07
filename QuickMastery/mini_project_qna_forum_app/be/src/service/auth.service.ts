import { db } from "../db/index.js";
import { NewUser, RegisterUser } from "src/types/index.js";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { users as UsersTable } from "../db/schema.js";
import { generateUserId } from "../utils/generator.utils.js";


class AuthService {

    async login(username: string, password: string) {
        try {
            const user = await db.query.users.findFirst({
                where: eq(UsersTable.username, username),
            });
            if (!user) {
                console.log("User not found");
                throw new Error("User not found.");
            }
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                console.log("Invalid password");
                throw new Error("Invalid password.");
            }
            return user;
        } catch (error) {
            console.error("Error logging in:", error);
            return null;
        }
    }

    async register(data: RegisterUser) {
        try {
            const hashedPassword = await bcrypt.hash(data.password, 10);
            const newUser: NewUser = { ...data, id: generateUserId("user"), password: hashedPassword, role: "user" };
            const user = await db.insert(UsersTable).values(newUser);
            return user;
        } catch (error) {
            console.error("Error registering user: ", error);
            return null;
        }
    }

    async registerAdmin(data: RegisterUser) {
        try {
            const hashedPassword = await bcrypt.hash(data.password, 10);
            const newUser: NewUser = { ...data, id: generateUserId("admin"), password: hashedPassword, role: "admin" };
            const user = await db.insert(UsersTable).values(newUser);
            return user;
        } catch (error) {
            console.error("Error registering admin: ", error);
            return null;
        }
    }

}

export default new AuthService();
