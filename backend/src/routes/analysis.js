import { Router } from 'express';
const router = Router();

router.post('/team', async (req,res)=>{
  const { teamName, metrics } = req.body;
  // En production : appeler l'API OpenAI côté serveur uniquement
  return res.json({
    ok:true,
    analysis:`Équipe ${teamName} : engagement solide, régulation émotionnelle à renforcer, priorité staff sur routines pré-compétitives et débriefs stabilisateurs.`,
    metrics
  });
});

export default router;
