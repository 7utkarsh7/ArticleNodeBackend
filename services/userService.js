const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

class UserService {
  async createUser(email, password, name, age) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
       return false;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, name, age });
    await user.save();
    return user;
  }

  async loginUser(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
        return false;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return false;
    }
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
    return token;
  }

  async updateUserProfile(userId, name, age) {
    const user = await User.findById(userId);
    if (!user) {
      return false;
    }
    user.name = name;
    user.age = age;
    await user.save();
    return user;
  }
}

module.exports = UserService;
