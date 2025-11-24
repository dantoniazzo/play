import { matchModel } from "../models/match.js";

export const matchController = {
  async createMatch(req, res) {
    try {
      const {
        sport,
        name,
        address,
        date,
        time,
        maxPlayers,
        skillLevel,
        description,
        createdBy,
      } = req.body;
      console.log(req.body);
      if (!sport || !name || !address || !date || !time) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      if (!["football", "padel"].includes(sport)) {
        return res
          .status(400)
          .json({ error: "Sport must be either football or padel" });
      }

      const match = await matchModel.create({
        sport,
        name,
        address,
        date,
        time,
        maxPlayers: maxPlayers || 10,
        skillLevel,
        description,
        createdBy,
      });

      res.status(201).json(match);
    } catch (error) {
      console.error("Error creating match:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async getAllMatches(req, res) {
    try {
      const { sport } = req.query;
      const matches = await matchModel.findAll(sport);
      res.json(matches);
    } catch (error) {
      console.error("Error fetching matches:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async getMatchById(req, res) {
    try {
      const { id } = req.params;
      const match = await matchModel.findById(id);

      if (!match) {
        return res.status(404).json({ error: "Match not found" });
      }

      res.json(match);
    } catch (error) {
      console.error("Error fetching match:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async deleteMatch(req, res) {
    try {
      const { id } = req.params;
      const match = await matchModel.delete(id);

      if (!match) {
        return res.status(404).json({ error: "Match not found" });
      }

      res.json({ message: "Match deleted successfully", match });
    } catch (error) {
      console.error("Error deleting match:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async getMatchParticipants(req, res) {
    try {
      const { id } = req.params;
      const participants = await matchModel.getParticipants(id);
      res.json(participants);
    } catch (error) {
      console.error("Error fetching participants:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async joinMatch(req, res) {
    try {
      const { id } = req.params;
      const { userId } = req.body;

      if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
      }

      const match = await matchModel.findById(id);
      if (!match) {
        return res.status(404).json({ error: "Match not found" });
      }

      if (parseInt(match.current_players) >= match.max_players) {
        return res.status(400).json({ error: "Match is full" });
      }

      const result = await matchModel.joinMatch(id, userId);

      if (!result) {
        return res
          .status(400)
          .json({ error: "User already joined this match" });
      }

      res.json({ message: "Successfully joined match", result });
    } catch (error) {
      console.error("Error joining match:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async leaveMatch(req, res) {
    try {
      const { id } = req.params;
      const { userId } = req.body;

      if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
      }

      const result = await matchModel.leaveMatch(id, userId);

      if (!result) {
        return res.status(404).json({ error: "User not found in this match" });
      }

      res.json({ message: "Successfully left match", result });
    } catch (error) {
      console.error("Error leaving match:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
