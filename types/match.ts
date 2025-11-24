export type Sport = 'football' | 'padel';

export interface Match {
  id: number;
  sport: Sport;
  name: string;
  address: string;
  date: string;
  time: string;
  max_players: number;
  skill_level: string;
  description: string;
  created_by: number;
  creator_name: string;
  current_players: number;
  created_at: string;
}
