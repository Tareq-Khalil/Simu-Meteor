import express from 'express';
import { 
  getApod, getNeoFeed, getNeoById, getNeoBrowse, getScenarios, 
  getRandomScenario, testMitigation, getDynamicEducationalContent, getMitigationStrategies, simulateAsteroid 
} from '../controllers/nasaController.js';

const router = express.Router();

router.get('/apod', getApod);
router.get('/neo/feed', getNeoFeed);
router.get('/neo/browse', getNeoBrowse);
router.get('/neo/:id', getNeoById);
router.get('/scenarios', getScenarios);
router.get('/random-scenario', getRandomScenario);
router.get('/educational-content', getDynamicEducationalContent);
router.get('/mitigation-strategies', getMitigationStrategies);

router.post('/mitigation', testMitigation);
router.post('/simulate', simulateAsteroid); 

export default router;