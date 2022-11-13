import Logger from "../utils/logger.js";
import { hash } from "../utils/password.js";
import { generateToken } from "../utils/token.js";

class AuthService {
  constructor(userService) {
    this._userService = userService;
    this.logger = new Logger(AuthService.name);
  }

  async register(body) {
    try {
      this.logger.log("Registering new user");

      const createdUser = await this._userService.createUser({
        ...body,
        password: hash(body.password),
      });

      if (!createdUser) {
        throw new Error(`User wasn't created`);
      }

      const token = generateToken({ email: body.email });

      return {
        auth_token: `Bearer_${token}`,
      };
    } catch (err) {
      this.logger.error(err.message, err.stack);
    }
  }
}

export default AuthService;
