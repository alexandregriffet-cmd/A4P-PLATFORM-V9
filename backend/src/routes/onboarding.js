import { Router } from 'express';
const router = Router();

router.post('/club', async (req,res)=>{
  const { clubName, sport, coachName, coachEmail, plan } = req.body;
  // Ici : créer club, coach, première équipe en base
  return res.json({
    ok:true,
    club:{ id:'club_new', name:clubName, sport, plan },
    coach:{ id:'coach_new', name:coachName, email:coachEmail }
  });
});

router.post('/team', async (req,res)=>{
  const { clubId, name, category, playersCount } = req.body;
  return res.json({
    ok:true,
    team:{ id:'team_new', clubId, name, category, playersCount },
    passationLink:`/frontend/passation.html?team=team_new&module=cmp`
  });
});

export default router;
