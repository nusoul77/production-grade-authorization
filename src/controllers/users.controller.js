import NotFoundException from '../exceptions/not-found.exception.js';
import { STATUS_CODES } from '../utils/constants.js';

class UsersController {
  constructor(userService) {
    this._userService = userService;
  }

  getAll() {
    return async (req, res) => {
      try {
        res.status(STATUS_CODES.OK);
        res.send(await this._userService.findAll());
      } catch (exception) {
        res.status(exception.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR);
        res.send(exception.statusCode ? exception : { message: 'Internal server error' });
      }
    };
  }

  getOne() {
    return async (req, res) => {
      try {
        const userId = String(req.params?.id);

        if (!userId) {
          throw new Error(`userId wasn't provided`);
        }

        const user = await this._userService.findOneWithFilter({ id: userId });

        if (!user) {
          throw new NotFoundException(`No such user with id: ${userId}`);
        }

        res.status(STATUS_CODES.OK);
        res.send(user);
      } catch (exception) {
        res.status(exception.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR);
        res.send(exception.statusCode ? exception : { message: 'Internal server error' });
      }
    };
  }

  update() {
    return async (req, res) => {
      try {
        res.status(STATUS_CODES.CREATED);
        res.send('await this._userService.updateOne({_id: userId})');
      } catch (exception) {
        res.status(exception.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR);
        res.send(exception.statusCode ? exception : { message: 'Internal server error' });
      }
    };
  }

  delete() {
    return async (req, res) => {
      try {
        res.status(STATUS_CODES.ACCEPTED);
        res.send('await this._userService.deleteOne({_id: userId})');
      } catch (exception) {
        res.status(exception.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR);
        res.send(exception.statusCode ? exception : { message: 'Internal server error' });
      }
    };
  }
}

export default UsersController;
