export interface SportEvent {
  event_id: number;
  event_name: string;
  odds: number;
}

export interface BetFormData {
  eventId: number;
  amount: number;
}

export interface PaginatedResponse {
  events: SportEvent[];
  total_pages: number;
  pages: number;
}

export interface LoginResponse {
  user_id: string;
  token: string;
}

export interface RegisterResponse {
  user_id: string;
  token: string;
}
