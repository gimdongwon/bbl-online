import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// 사용자 등록
export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    const savedUser = await user.save();
    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
      },
    });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// 회원 리스트 반환
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find({}, 'name email'); // 비밀번호 제외
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const getCurrentUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user; // `any`로 임시 해결
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized: No user ID' });
      return;
    }

    const user = await User.findById(userId).select('-password');
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    // JWT 토큰 생성
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: '1h', // 1시간 유효
    });

    // 비밀번호 제외한 사용자 정보 반환
    const { password: _, ...userWithoutPassword } = user.toObject();

    res.status(200).json({
      message: 'Login successful',
      token, // JWT 토큰 추가
      user: userWithoutPassword, // 비밀번호를 제외한 사용자 정보 반환
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

export const logout = (req: Request, res: Response): void => {
  // 클라이언트에서 토큰을 삭제하도록 유도
  res.status(200).json({ message: 'Logged out successfully' });
};
