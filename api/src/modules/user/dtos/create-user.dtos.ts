import { z } from 'zod';

export const ICreateUserRequest = z.object({
  username: z.string().min(1, 'username is required'),
  password: z.string().min(1, 'password is required'),
});

export type CreateUserDto = z.infer<typeof ICreateUserRequest>;

export type ICreateUserResponse = {
  user_id: string;
  token: string;
};
