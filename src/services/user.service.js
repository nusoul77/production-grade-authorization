import Logger from "../utils/logger.js";

class UserService {
  constructor(userRepository) {
    this._userRepository = userRepository;
    this.logger = new Logger(UserService.name);
  }

  async createUser(input) {
    this.logger.log(`Creating user`, { input });

    return await this._userRepository.create(input);
  }
}

export default UserService;
