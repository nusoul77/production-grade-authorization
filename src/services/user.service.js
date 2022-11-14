import Logger from '../utils/logger.js';
import ConflictException from '../exceptions/conflict.exception.js';
import { USER_ROLES } from '../utils/constants.js';

class UserService {
  constructor(userRepository) {
    this._userRepository = userRepository;
    this.logger = new Logger(UserService.name);
  }

  async createUser(input) {
    const { email, password, firstName, lastName } = input;

    this.logger.log(`Creating user`, { email, firstName, lastName });

    const existingOne = await this.findOneWithFilter({ email: input.email });

    if (existingOne) {
      throw new ConflictException(`User with email:"${input.email}" already exists`);
    }

    const user = {
      email,
      password,
      firstName,
      lastName,
      role: USER_ROLES.USER,
      isDeleted: false,
    };

    return await this._userRepository.create(user);
  }

  async findAll() {
    this.logger.log(`Searching for all users`);

    const allUsers = await this._userRepository.findMany({ isDeleted: false });

    const userReturnModels = allUsers
      .filter((user) => user.role !== USER_ROLES.ADMIN)
      .map((user) => {
        const { _id, email, firstName, lastName } = user;

        return {
          id: _id,
          email,
          firstName,
          lastName,
        };
      });

    return userReturnModels;
  }

  async findOneWithFilter(filter) {
    this.logger.log(`Searching for specific user`, { filter });

    const existingOne = await this._userRepository.findOne(filter);

    if (!existingOne) {
      return null;
    }

    const { _id, email, password, firstName, lastName, role } = existingOne;

    const returnModel = {
      id: _id,
      email,
      password,
      firstName,
      lastName,
      role,
    };

    return returnModel;
  }

  async updateOne(userId, update) {
    this.logger.log(`Updating user`, { userId, update });

    const updated = await this._userRepository.update(userId, update);

    if (!updated?.modifiedCount) {
      return null;
    }

    const { _id, email, password, firstName, lastName, role } = updated;

    const returnModel = {
      id: _id,
      email,
      password,
      firstName,
      lastName,
      role,
    };

    return returnModel;
  }

  async deleteOne(userId) {
    this.logger.log(`Removing user`, { userId });

    const deleted = await this._userRepository.update(userId, { isDeleted: true });

    if (!deleted?.modifiedCount) {
      return null;
    }

    const { _id, email, password, firstName, lastName, role } = deleted;

    const returnModel = {
      id: _id,
      email,
      password,
      firstName,
      lastName,
      role,
    };

    return returnModel;
  }
}

export default UserService;
