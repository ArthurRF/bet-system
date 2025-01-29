import { z } from 'zod';

export const ICreateEventRequest = z.object({
  name: z.string().min(1, 'Title is required'),
  odds: z.number().min(1, 'Odds is required'),
});

export type CreateEventDto = z.infer<typeof ICreateEventRequest>;

export type ICreateEventResponse = {
  event_id: number;
};
