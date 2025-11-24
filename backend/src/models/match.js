import { query } from '../config/database.js';

export const matchModel = {
  async create(matchData) {
    const { sport, name, address, date, time, maxPlayers, skillLevel, description, createdBy } = matchData;

    const text = `
      INSERT INTO matches (sport, name, address, date, time, max_players, skill_level, description, created_by)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;

    const values = [sport, name, address, date, time, maxPlayers, skillLevel, description, createdBy];
    const result = await query(text, values);
    return result.rows[0];
  },

  async findAll(sport = null) {
    let text = `
      SELECT
        m.*,
        u.name as creator_name,
        COUNT(mp.id) as current_players
      FROM matches m
      LEFT JOIN users u ON m.created_by = u.id
      LEFT JOIN match_participants mp ON m.id = mp.match_id
    `;

    const values = [];
    if (sport) {
      text += ` WHERE m.sport = $1`;
      values.push(sport);
    }

    text += ` GROUP BY m.id, u.name ORDER BY m.date, m.time`;

    const result = await query(text, values);
    return result.rows;
  },

  async findById(id) {
    const text = `
      SELECT
        m.*,
        u.name as creator_name,
        COUNT(mp.id) as current_players
      FROM matches m
      LEFT JOIN users u ON m.created_by = u.id
      LEFT JOIN match_participants mp ON m.id = mp.match_id
      WHERE m.id = $1
      GROUP BY m.id, u.name
    `;

    const result = await query(text, [id]);
    return result.rows[0];
  },

  async delete(id) {
    const text = 'DELETE FROM matches WHERE id = $1 RETURNING *';
    const result = await query(text, [id]);
    return result.rows[0];
  },

  async getParticipants(matchId) {
    const text = `
      SELECT u.id, u.name, u.email, mp.joined_at
      FROM match_participants mp
      JOIN users u ON mp.user_id = u.id
      WHERE mp.match_id = $1
      ORDER BY mp.joined_at
    `;

    const result = await query(text, [matchId]);
    return result.rows;
  },

  async joinMatch(matchId, userId) {
    const text = `
      INSERT INTO match_participants (match_id, user_id)
      VALUES ($1, $2)
      ON CONFLICT (match_id, user_id) DO NOTHING
      RETURNING *
    `;

    const result = await query(text, [matchId, userId]);
    return result.rows[0];
  },

  async leaveMatch(matchId, userId) {
    const text = `
      DELETE FROM match_participants
      WHERE match_id = $1 AND user_id = $2
      RETURNING *
    `;

    const result = await query(text, [matchId, userId]);
    return result.rows[0];
  }
};
