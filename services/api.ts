import axios from 'axios';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export interface MatchParticipant {
  id: number;
  name: string;
  email: string;
  joined_at: string;
}

export interface MatchFromAPI {
  id: number;
  sport: 'football' | 'padel';
  name: string;
  address: string;
  date: string;
  time: string;
  max_players: number;
  skill_level: string;
  description: string;
  created_by: number;
  creator_name: string;
  current_players: string;
  created_at: string;
}

export interface CreateMatchPayload {
  sport: 'football' | 'padel';
  name: string;
  address: string;
  date: string;
  time: string;
  maxPlayers?: number;
  skillLevel?: string;
  description?: string;
  createdBy: number;
}

export const matchApi = {
  async getAllMatches(sport?: 'football' | 'padel'): Promise<MatchFromAPI[]> {
    const params = sport ? { sport } : {};
    const response = await api.get('/matches', { params });
    return response.data;
  },

  async getMatchById(id: number): Promise<MatchFromAPI> {
    const response = await api.get(`/matches/${id}`);
    return response.data;
  },

  async createMatch(payload: CreateMatchPayload): Promise<MatchFromAPI> {
    const response = await api.post('/matches', payload);
    return response.data;
  },

  async deleteMatch(id: number): Promise<void> {
    await api.delete(`/matches/${id}`);
  },

  async getMatchParticipants(matchId: number): Promise<MatchParticipant[]> {
    const response = await api.get(`/matches/${matchId}/participants`);
    return response.data;
  },

  async joinMatch(matchId: number, userId: number): Promise<void> {
    await api.post(`/matches/${matchId}/join`, { userId });
  },

  async leaveMatch(matchId: number, userId: number): Promise<void> {
    await api.post(`/matches/${matchId}/leave`, { userId });
  },
};

export const userApi = {
  async createUser(name: string, email: string): Promise<User> {
    const response = await api.post('/users', { name, email });
    return response.data;
  },

  async getAllUsers(): Promise<User[]> {
    const response = await api.get('/users');
    return response.data;
  },

  async getUserById(id: number): Promise<User> {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },
};

export default api;
