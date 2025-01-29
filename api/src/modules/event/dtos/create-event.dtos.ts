import { z } from 'zod';

export const ICreateEventRequest = z.object({
  name: z.string().min(1, 'name is required'),
  odds: z.number().min(1, 'odds is required'),
});

export type CreateEventDto = z.infer<typeof ICreateEventRequest>;

export type ICreateEventResponse = {
  event_id: number;
};
