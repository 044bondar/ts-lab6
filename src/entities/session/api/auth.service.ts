import { http } from '@/shared/api';
import type { AuthUser, LoginDto } from '../model/types';

export class AuthService {
    login(credentials: LoginDto): Promise<AuthUser> {
        return http<AuthUser>('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ ...credentials, expiresInMins: 30 }),
        });
    }
}