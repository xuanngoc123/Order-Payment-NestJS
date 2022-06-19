import * as jwt from 'jsonwebtoken';

export function generateAccessToken(user: any): string {
  return jwt.sign(
    {
      id: user._id,
      userName: user.userName,
      role: user.role,
    },
    process.env.ACCESS_TOKEN_KEY,
    { expiresIn: '84600s' },
  );
}

export function verifyToken(token: string): any {
  return jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, data) => {
    if (err) {
      return 'token invalid!';
    } else {
      return data;
    }
  });
}
