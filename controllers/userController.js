const UserService = require('../services/userService');
const Response = require('../utils/response');

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  async signup(req, res) {
    const { email, password, name, age } = req.body;

    try {
      const user = await this.userService.createUser(email, password, name, age);
      if(!user){
        const response = new Response(400, null,'Email already exists' );
        res.json(response);
      }else{
        const response = new Response(201, user,false,'User created successfully');
        res.json(response);
      }
      
    } catch (error) {
      const response = new Response(500, null, error.message,'An error occured');
      res.json(response);
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const token = await this.userService.loginUser(email, password);
      if(!token){
        const response =new Response(400, null,'Invalid email or password');
        res.json(response);
      }else{
        const response = new Response(200, { token },false,'Login successful');
      res.json(response);
      }
      
    } catch (error) {
      const response = new Response(500, null, error.message);
      res.json(response);
    }
  }

  async updateProfile(req, res) {
    const { name, age } = req.body;
    const { userId } = req.params;

    try {
      const user = await this.userService.updateUserProfile(userId, name, age);
      if(!user){
        const response = new Response(400, null,'User not found');
        res.json(response);
      }else{
        const response = new Response(200, user,false,'User profile updated successfully');
        res.json(response);
      }
      
    } catch (error) {
      const response = new Response(500, null, error.message);
      res.json(response);
    }
  }
}

module.exports = UserController;
