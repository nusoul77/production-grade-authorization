class AuthController {
  constructor(authService) {
    this._authService = authService;
  }

  signUp() {
    return async (req, res) => {
      res.send(await this._authService.register(req.body));
    };
  }
}

export default AuthController;
