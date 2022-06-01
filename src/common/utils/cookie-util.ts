import { CookieOptions, Response } from 'express';

export function removeCookie(
  res: Response,
  key: string,
  options?: CookieOptions,
) {
  res.cookie(key, '', {
    maxAge: 0,
    ...options,
  });
}
