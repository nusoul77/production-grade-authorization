class AuthController {
  constructor(authService) {
    this._authService = authService;
  }

  signUp() {
    return async (req, res) => {
      try {
        res.status(201);
        res.send(await this._authService.register(req.body));
      } catch (exception) {
        res.status(exception.statusCode || 500);
        res.send(exception.statusCode ? exception : { message: 'Internal server error' });
      }
    };
  }

  signIn() {
    return async (req, res) => {
      try {
        res.status(201);
        res.send(await this._authService.login(req.body));
      } catch (exception) {
        res.status(exception.statusCode || 500);
        res.send(exception.statusCode ? exception : { message: 'Internal server error' });
      }
    };
  }
}

export default AuthController;
