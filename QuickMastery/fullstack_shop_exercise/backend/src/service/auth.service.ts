import { db } from "../db/index.js";
import { NewUser } from "src/types/index.js";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { usersTable } from "../db/schema.js";

type RegisterUser = Pick<
  NewUser,
  "username" | "password" | "fullname" | "phone_number" | "role"
>;

class AuthService {
  async login(username: string, password: string) {
    try {
      const user = await db.query.usersTable.findFirst({
        where: eq(usersTable.username, username),
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
      throw new Error("An unexpected error occured: " + error);
    }
  }

  async register(data: RegisterUser) {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const newUser: NewUser = { ...data, password: hashedPassword };
      const user = await db.insert(usersTable).values(newUser);
      return user;
    } catch (error) {
      console.error("Error registering user: ", error);
      return null;
    }
  }
}

export default new AuthService();
