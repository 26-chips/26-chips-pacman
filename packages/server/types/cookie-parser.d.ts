import * as express from 'express';

interface CookieParseOptions {
  decode?(val: string): string;
}

declare function cookieParser(
  secret?: string | string[],
  options?: CookieParseOptions
): express.RequestHandler;

export default cookieParser;
