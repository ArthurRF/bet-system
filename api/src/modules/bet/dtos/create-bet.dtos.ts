import { z } from 'zod';

export const ICreateBetRequest = z.object({
  user_id: z.string().min(1, 'user_id is required').uuid(),
  event_id: z.number().min(1, 'event_id is required'),
  value: z.number().min(1, 'value is required'),
});

export type CreateBetDto = z.infer<typeof ICreateBetRequest>;

export type ICreateBetResponse = {
  user_id: string;
  event_id: number;
  value: number;
};
