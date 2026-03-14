
window.A4P_CONFIG = {
  backendBaseUrl: "http://localhost:8787/api",
  stripeCheckoutUrl: "http://localhost:8787/api/billing/create-checkout-session",
  appName: "A4P Performance Platform V9",
  plans: [
    { id: "starter", name: "Starter", price: "99€/mois", teams: "1 équipe" },
    { id: "club", name: "Club", price: "249€/mois", teams: "5 équipes" },
    { id: "performance", name: "Performance", price: "499€/mois", teams: "illimité" }
  ]
};
