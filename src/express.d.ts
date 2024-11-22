import { User } from '@prisma/client';
import { Request } from 'express';
import { DecodedJwt } from './Decoded.interface';

declare global {
	namespace Express {
		interface Request {
			user?: DecodedJwt;
		}
	}
}
