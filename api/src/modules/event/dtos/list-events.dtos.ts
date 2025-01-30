type EventItem = {
  event_id: number;
  event_name: string;
  odds: number;
};

export type IListEventsResponse = {
  total: number;
  total_pages: number;
  events: EventItem[];
};
