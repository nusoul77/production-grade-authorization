import { STATUS_CODES } from '../utils/constants.js';

class AuthController {
  constructor(authService) {
    this._authService = authService;
  }

  signUp() {
    return async (req, res) => {
      try {
        res.status(STATUS_CODES.CREATED);
        res.send(await this._authService.register(req.body));
      } catch (exception) {
        res.status(exception.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR);
        res.send(exception.statusCode ? exception : { message: 'Internal server error' });
      }
    };
  }

  signIn() {
    return async (req, res) => {
      try {
        res.status(STATUS_CODES.ACCEPTED);
        res.send(await this._authService.login(req.body));
      } catch (exception) {
        res.status(exception.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR);
        res.send(exception.statusCode ? exception : { message: 'Internal server error' });
      }
    };
  }
}

export default AuthController;
