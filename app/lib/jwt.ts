import { sign, verify, SignOptions, JwtPayload } from 'jsonwebtoken';
import ms from 'ms';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

export function signToken(payload: object, expiresIn: string & ms.StringValue = '1h'): string {
  const options: SignOptions = { expiresIn };
  return sign(payload, SECRET_KEY, options);
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    return verify(token, SECRET_KEY) as JwtPayload;
  } catch {
    return null;
  }
}
