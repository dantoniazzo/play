import { query } from '../config/database.js';

export const userModel = {
  async create(userData) {
    const { name, email } = userData;

    const text = `
      INSERT INTO users (name, email)
      VALUES ($1, $2)
      RETURNING *
    `;

    const result = await query(text, [name, email]);
    return result.rows[0];
  },

  async findById(id) {
    const text = 'SELECT * FROM users WHERE id = $1';
    const result = await query(text, [id]);
    return result.rows[0];
  },

  async findByEmail(email) {
    const text = 'SELECT * FROM users WHERE email = $1';
    const result = await query(text, [email]);
    return result.rows[0];
  },

  async findAll() {
    const text = 'SELECT * FROM users ORDER BY created_at DESC';
    const result = await query(text);
    return result.rows;
  }
};
