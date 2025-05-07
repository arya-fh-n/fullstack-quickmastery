import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET_KEY ?? 'your_jwt_secret';
const JWT_REFRESH_SECRET = process.env.JWT_SECRET_KEY_REFRESH ?? 'your_refresh_secret';

// Helper function to generate tokens
export const generateTokens = (userId: string, username: string, email: string, rememberMe: boolean = false) => {
  // Access token with short expiry
  const accessToken = jwt.sign(
    { id: userId, username, email },
    JWT_SECRET,
    { expiresIn: rememberMe ? '7d' : '1d' }
  );
  
  return { accessToken };
};