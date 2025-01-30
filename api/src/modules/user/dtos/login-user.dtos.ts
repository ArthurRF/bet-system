import { z } from 'zod';

export const ILoginUserRequest = z.object({
  username: z.string().min(1, 'username is required'),
  password: z.string().min(1, 'password is required'),
});

export type LoginUserDto = z.infer<typeof ILoginUserRequest>;

export type ILoginUserResponse = {
  user_id: string;
  token: string;
};
