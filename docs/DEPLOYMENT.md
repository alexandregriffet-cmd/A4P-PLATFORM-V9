# Feuille de route production V9

## 1. Frontend
Déployer `frontend/` sur Vercel ou Netlify.

## 2. Backend
Déployer `backend/` sur Render ou Railway.

## 3. Stripe
Créer 3 produits + 3 price IDs, puis renseigner :
- STRIPE_PRICE_STARTER
- STRIPE_PRICE_CLUB
- STRIPE_PRICE_PERFORMANCE

## 4. Base cloud
Importer `database/schema.sql` dans Supabase Postgres.

## 5. Auth
Ajouter Supabase Auth ou Clerk selon ton choix.

## 6. IA
Brancher l'endpoint `/api/analysis/team` à l'API OpenAI côté serveur.
