import { Router } from 'express';
import Stripe from 'stripe';

const router = Router();
const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

router.get('/create-checkout-session', async (req,res)=>{
  const plan = req.query.plan || 'club';
  if(!stripe){
    return res.status(200).send(`Mode démo : Checkout Stripe non configuré. Plan demandé = ${plan}`);
  }
  // Exemple : à adapter avec de vrais price IDs Stripe
  const priceMap = {
    starter: process.env.STRIPE_PRICE_STARTER,
    club: process.env.STRIPE_PRICE_CLUB,
    performance: process.env.STRIPE_PRICE_PERFORMANCE
  };
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: priceMap[plan], quantity: 1 }],
    success_url: `${process.env.FRONTEND_URL}/dashboard.html?checkout=success`,
    cancel_url: `${process.env.FRONTEND_URL}/billing.html?checkout=cancelled`
  });
  res.redirect(session.url);
});

router.post('/webhook', expressRaw(), async (req,res)=>{
  res.json({received:true});
});

function expressRaw(){
  return (req,res,next)=>next();
}

export default router;
