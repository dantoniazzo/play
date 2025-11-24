import express from 'express';
import { matchController } from '../controllers/matchController.js';

const router = express.Router();

router.post('/', matchController.createMatch);
router.get('/', matchController.getAllMatches);
router.get('/:id', matchController.getMatchById);
router.delete('/:id', matchController.deleteMatch);
router.get('/:id/participants', matchController.getMatchParticipants);
router.post('/:id/join', matchController.joinMatch);
router.post('/:id/leave', matchController.leaveMatch);

export default router;
