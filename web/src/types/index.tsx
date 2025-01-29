export interface SportEvent {
  event_id: number;
  event_name: string;
  odds: number;
}

export interface BetFormData {
  eventId: number;
  amount: number;
}
