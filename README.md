# A4P Platform V9

Prototype SaaS commercial A4P prêt à adapter.

## Ce que contient ce pack
- Frontend multi-pages statique pour démo GitHub/Vercel
- Backend Node/Express de référence
- Exemple d'intégration Stripe Checkout + portail client
- Onboarding club
- Création équipe et génération de passation collective
- Rapport staff PDF (impression navigateur + HTML dédié)
- Service d'analyse mentale IA côté serveur (placeholder sécurisé)

## Important
Ce pack est un **socle sérieux** mais pas une plateforme de production prête à encaisser des paiements réels sans configuration.
À finaliser avant mise en production :
- variables d'environnement
- clés Stripe
- base Postgres / Supabase
- authentification réelle
- e-mails transactionnels
- politique RGPD, CGV, mentions légales

## Déploiement recommandé
- Frontend : Vercel / Netlify
- Backend : Render / Railway / Vercel Functions
- Base : Supabase Postgres
- Paiement : Stripe
- IA : API OpenAI via backend uniquement

## Flux produit
1. Un club crée son compte
2. Choisit un abonnement
3. Finalise Stripe Checkout
4. Crée une équipe
5. Génère un lien de passation
6. Les joueurs remplissent le test
7. Le dashboard équipe se met à jour
8. Le staff exporte un PDF
9. L'analyse IA génère une synthèse

## Fichiers clés
- `frontend/index.html` : landing / accès plateforme
- `frontend/onboarding.html` : onboarding club
- `frontend/dashboard.html` : dashboard staff
- `frontend/equipe.html` : vue équipe
- `frontend/report.html` : rapport staff PDF
- `backend/src/server.js` : API Express
- `backend/src/routes/*.js` : routes API
- `database/schema.sql` : schéma de base

## Variables d'environnement backend
Voir `backend/.env.example`
