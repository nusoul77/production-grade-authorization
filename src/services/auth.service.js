import NotFoundException from '../exceptions/not-found.exception.js';
import Logger from '../utils/logger.js';
import { hash, compare } from '../utils/password.js';
import { generateToken } from '../utils/token.js';

class AuthService {
  constructor(userService) {
    this._userService = userService;
    this.logger = new Logger(AuthService.name);
  }

  async register(body) {
    try {
      this.logger.log('Registering new user');

      const createdUser = await this._userService.createUser({
        ...body,
        password: hash(body.password),
      });

      if (!createdUser) {
        throw new Error(`User wasn't created`);
      }

      const token = generateToken({ email: createdUser.email, role: createdUser.role });

      return {
        auth_token: token,
      };
    } catch (err) {
      this.logger.error(err.message, err.stack);

      throw err;
    }
  }

  async login(body) {
    try {
      this.logger.log('logging in');

      const existingOne = await this._userService.findOneWithFilter({ email: body.email });

      if (!existingOne) {
        throw new NotFoundException(`No such user`);
      }

      await compare(body.password, existingOne.password);

      const token = generateToken({ email: existingOne.email, role: existingOne.role });

      return {
        auth_token: token,
      };
    } catch (err) {
      this.logger.error(err.message, err.stack);

      throw err;
    }
  }
}

export default AuthService;
