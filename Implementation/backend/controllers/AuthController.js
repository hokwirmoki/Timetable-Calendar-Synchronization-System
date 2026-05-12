import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/UserRepository.js';

export class AuthController {
  
  static async signup(req, res, next) {
    try {
      const { student_number, password, role } = req.body;

      if (!student_number || !password) {
        return res.status(400).json({ error: 'Student number and password are required' });
      }

      // Default role to student if not provided, else restrict to student/admin
      const userRole = (role && role === 'admin') ? 'admin' : 'student';

      const existingUser = await UserRepository.findByStudentNumber(student_number);
      if (existingUser) {
        return res.status(409).json({ error: 'User with this student number already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      const newUser = await UserRepository.createUser(student_number, passwordHash, userRole);

      // Generate token immediately on signup if desired, but we can just return success
      return res.status(201).json({ 
        message: 'User created successfully',
        user: { id: newUser.id, student_number: newUser.student_number, role: newUser.role }
      });

    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { student_number, password } = req.body;

      if (!student_number || !password) {
        return res.status(400).json({ error: 'Student number and password are required' });
      }

      const user = await UserRepository.findByStudentNumber(student_number);
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const secret = process.env.JWT_SECRET || 'fallback_preview_secret_do_not_use_in_prod';
      
      const payload = {
        userId: user.id,
        student_number: user.student_number,
        role: user.role
      };

      const token = jwt.sign(payload, secret, { expiresIn: '1d' });

      return res.status(200).json({
        message: 'Login successful',
        token,
        user: payload
      });
      
    } catch (error) {
      next(error);
    }
  }
}
