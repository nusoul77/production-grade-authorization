import ConflictException from '../exceptions/conflict.exception.js';
import Logger from '../utils/logger.js';

class UserService {
  constructor(userRepository) {
    this._userRepository = userRepository;
    this.logger = new Logger(UserService.name);
  }

  async createUser(input) {
    this.logger.log(`Creating user`, { input });

    const existingOne = await this.findOneWithFilter({ email: input.email });

    if (existingOne) {
      throw new ConflictException(`User with email:"${input.email}" already exists`);
    }

    return await this._userRepository.create(input);
  }

  async findOneWithFilter(filter) {
    this.logger.log(`Searching for specific user`, { filter });

    return await this._userRepository.findOne(filter);
  }
}

export default UserService;
