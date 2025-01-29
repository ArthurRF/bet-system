import { z } from 'zod';

export const IUpdateEventRequest = z.object({
  name: z.string().min(1, 'name is required'),
  odds: z.number().min(1, 'odds is required'),
});

export type UpdateEventDto = z.infer<typeof IUpdateEventRequest>;

export type IUpdateEventResponse = {
  event_id: number;
  event_name: string;
  odds: number;
};
