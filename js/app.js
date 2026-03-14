function badgeClass(alert){
  if(alert === 'green') return 'success'
  if(alert === 'red') return 'danger'
  return 'warn'
}

function alertLabel(alert){
  if(alert === 'green') return 'Stabilisé'
  if(alert === 'red') return 'Alerte'
  return 'Vigilance'
}

function average(arr, key){
  return Math.round(arr.reduce((sum, item)=> sum + Number(item[key] || 0), 0) / (arr.length || 1))
}

function teamStats(teamId){
  const players = window.A4P_DATA.players.filter(p => p.teamId === teamId)
  return {
    count: players.length,
    score: average(players, 'score'),
    confiance: average(players, 'confiance'),
    regulation: average(players, 'regulation'),
    engagement: average(players, 'engagement'),
    stabilite: average(players, 'stabilite'),
    alerts: players.filter(p => p.alert !== 'green').length,
    players
  }
}

function renderHome(){
  const root = document.getElementById('app')
  if(!root) return
  const club = window.A4P_DATA.club
  const cmpTeam = teamStats('u18')
  const totalPlayers = window.A4P_DATA.players.length
  const totalTeams = window.A4P_DATA.teams.length
  const alerts = window.A4P_DATA.players.filter(p => p.alert !== 'green').length

  root.innerHTML = `
    <div class="hero">
      <section class="card">
        <p class="eyebrow">Hub diagnostic A4P</p>
        <h2>Plateforme club visible, propre et exploitable immédiatement.</h2>
        <p>${club.staffNote}</p>
        <div class="actions">
          <a class="btn" href="dashboard.html">Ouvrir le dashboard club</a>
          <a class="btn secondary" href="equipes.html">Voir les équipes</a>
          <a class="btn secondary" href="passations.html">Passations</a>
        </div>
      </section>
      <section class="card cover">
        <img src="assets/logo-a4p.png" alt="A4P">
      </section>
    </div>

    <section class="grid kpis">
      <article class="card kpi"><div class="section-title">Score mental moyen</div><div class="value">${cmpTeam.score}/100</div><div class="sub">Équipe U18 de démonstration</div></article>
      <article class="card kpi"><div class="section-title">Équipes</div><div class="value">${totalTeams}</div><div class="sub">Structure club déjà préparée</div></article>
      <article class="card kpi"><div class="section-title">Joueurs</div><div class="value">${totalPlayers}</div><div class="sub">Base visible immédiatement</div></article>
      <article class="card kpi"><div class="section-title">Alertes</div><div class="value">${alerts}</div><div class="sub">Joueurs à suivre en priorité</div></article>
    </section>

    <section class="grid main">
      <article class="card">
        <div class="section-title">Radar combiné</div>
        <h3 class="big-title">Vue collective CMP</h3>
        <canvas id="radarHome"></canvas>
      </article>
      <article class="card">
        <div class="section-title">Modules</div>
        <div class="stat-list">
          ${window.A4P_DATA.modules.map(m => `
            <div class="stat-row">
              <div>
                <strong>${m.title}</strong><br><span class="muted">${m.summary || 'Point d’entrée module'}</span>
              </div>
              <div style="text-align:right">
                <span class="badge ${m.type}">${m.status}</span><br>
                <a class="btn secondary" href="${m.link}" target="_blank" rel="noopener">Ouvrir</a>
              </div>
            </div>`).join('')}
        </div>
      </article>
    </section>

    <section class="card" style="margin-top:22px">
      <div class="section-title">Résumé staff</div>
      <h3 class="big-title">Ce que le club voit immédiatement</h3>
      <div class="module-grid">
        <article class="module-card card">
          <span class="badge soft">Équipes</span>
          <h3>Comparer les collectifs</h3>
          <p>Accès direct aux catégories U16, U18 et Seniors avec score moyen, profils dominants et alertes.</p>
        </article>
        <article class="module-card card">
          <span class="badge soft">Joueurs</span>
          <h3>Identifier les priorités</h3>
          <p>Repérer les joueurs en vigilance et cibler les accompagnements individuels les plus utiles.</p>
        </article>
        <article class="module-card card">
          <span class="badge soft">Passations</span>
          <h3>Préparer la suite SaaS</h3>
          <p>La base est prête pour brancher ensuite la passation d’équipe et les synthèses staff automatisées.</p>
        </article>
      </div>
    </section>
  `

  drawRadar('radarHome', [cmpTeam.confiance, cmpTeam.regulation, cmpTeam.engagement, cmpTeam.stabilite], ['Confiance','Régulation','Engagement','Stabilité'])
}

function renderDashboard(){
  const root = document.getElementById('dashboard-app')
  if(!root) return
  const u18 = teamStats('u18')
  const scoreGlobal = Math.round(window.A4P_DATA.teams.reduce((s,t)=>s+t.mentalScore,0) / window.A4P_DATA.teams.length)
  const modulesSynced = 1

  root.innerHTML = `
    <section class="grid kpis">
      <article class="card kpi"><div class="section-title">Score global mental</div><div class="value">${scoreGlobal}/100</div><div class="sub">${modulesSynced}/3 modules synchronisés</div></article>
      <article class="card kpi"><div class="section-title">Équipe prioritaire</div><div class="value">${u18.alerts}</div><div class="sub">alertes U18 à traiter</div></article>
      <article class="card kpi"><div class="section-title">Joueurs testés</div><div class="value">${window.A4P_DATA.players.length}</div><div class="sub">base club visible</div></article>
      <article class="card kpi"><div class="section-title">Ressource clé</div><div class="value">${u18.engagement}</div><div class="sub">engagement collectif</div></article>
    </section>
    <section class="grid main">
      <article class="card">
        <div class="section-title">Radar combiné</div>
        <h2 class="big-title">Vue équipe U18</h2>
        <canvas id="radarDashboard"></canvas>
      </article>
      <article class="card">
        <div class="section-title">Synthèse staff</div>
        <h2 class="big-title">Lecture rapide</h2>
        <p class="muted">Score moyen U18 : <strong>${u18.score}/100</strong></p>
        <p class="muted">Point fort collectif : <strong>engagement (${u18.engagement})</strong></p>
        <p class="muted">Point de vigilance : <strong>régulation (${u18.regulation})</strong></p>
        <p class="muted">Le collectif présente une vraie mobilisation, mais le niveau de régulation sous pression justifie une intervention ciblée.</p>
        <div class="actions">
          <a class="btn" href="equipes.html">Voir les équipes</a>
          <a class="btn secondary" href="joueurs.html">Voir les joueurs</a>
        </div>
      </article>
    </section>
    <section class="card" style="margin-top:22px">
      <div class="section-title">Module 2</div>
      <h2 class="big-title">Compétences Mentales (CMP)</h2>
      <span class="badge success">Synchronisé</span>
      <p class="muted"><strong>Profil :</strong> Mobilisation forte mais régulation fluctuante</p>
      <p class="muted"><strong>Score :</strong> ${u18.score}/100</p>
      <div class="actions">
        <a class="btn" href="https://alexandregriffet-cmd.github.io/CMP-A4P-ACADEMIE-DE-PERFORMANCES-/" target="_blank" rel="noopener">Ouvrir le test CMP</a>
        <a class="btn secondary" href="https://alexandregriffet-cmd.github.io/CMP-A4P-ACADEMIE-DE-PERFORMANCES-/resultats.html" target="_blank" rel="noopener">Voir la synthèse</a>
      </div>
    </section>
  `
  drawRadar('radarDashboard', [u18.confiance, u18.regulation, u18.engagement, u18.stabilite], ['Confiance','Régulation','Engagement','Stabilité'])
}

function renderTeams(){
  const root = document.getElementById('teams-app')
  if(!root) return
  root.innerHTML = `
    <section class="card">
      <div class="section-title">Équipes du club</div>
      <h2 class="big-title">Tableau de bord catégories</h2>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Équipe</th><th>Sport</th><th>Joueurs testés</th><th>Score</th><th>Alertes</th><th>Profil dominant</th></tr></thead>
          <tbody>
            ${window.A4P_DATA.teams.map(t => `
              <tr>
                <td><a href="equipe.html?team=${t.id}"><strong>${t.name}</strong></a></td>
                <td>${t.sport}</td>
                <td>${t.playersTested}</td>
                <td>${t.mentalScore}/100</td>
                <td>${t.alerts}</td>
                <td>${t.dominantProfile}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </section>
  `
}

function renderTeamPage(){
  const root = document.getElementById('team-app')
  if(!root) return
  const params = new URLSearchParams(window.location.search)
  const teamId = params.get('team') || 'u18'
  const team = window.A4P_DATA.teams.find(t => t.id === teamId) || window.A4P_DATA.teams[0]
  const stats = teamStats(team.id)
  root.innerHTML = `
    <section class="grid main">
      <article class="card">
        <div class="section-title">Équipe</div>
        <h2 class="big-title">${team.name}</h2>
        <p class="muted">${team.sport} • ${team.category}</p>
        <div class="stat-list">
          <div class="stat-row"><strong>Score mental moyen</strong><span>${stats.score}/100</span></div>
          <div class="stat-row"><strong>Joueurs testés</strong><span>${stats.count}</span></div>
          <div class="stat-row"><strong>Alertes</strong><span>${stats.alerts}</span></div>
          <div class="stat-row"><strong>Profil collectif</strong><span>${team.dominantProfile}</span></div>
        </div>
      </article>
      <article class="card">
        <div class="section-title">Radar collectif</div>
        <canvas id="radarTeam"></canvas>
      </article>
    </section>

    <section class="card" style="margin-top:22px">
      <div class="section-title">Joueurs</div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Joueur</th><th>Poste</th><th>Score</th><th>Profil</th><th>Alerte</th><th>Détail</th></tr></thead>
          <tbody>
            ${stats.players.map(p => `
              <tr>
                <td>${p.firstname} ${p.lastname}</td>
                <td>${p.position}</td>
                <td>${p.score}/100</td>
                <td>${p.profil}</td>
                <td><span class="badge ${badgeClass(p.alert)}">${alertLabel(p.alert)}</span></td>
                <td><a class="btn secondary" href="joueur.html?id=${p.id}">Ouvrir</a></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </section>
  `
  drawRadar('radarTeam', [stats.confiance, stats.regulation, stats.engagement, stats.stabilite], ['Confiance','Régulation','Engagement','Stabilité'])
}

function renderPlayers(){
  const root = document.getElementById('players-app')
  if(!root) return
  root.innerHTML = `
    <section class="card">
      <div class="section-title">Base joueurs</div>
      <h2 class="big-title">Joueurs testés</h2>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Nom</th><th>Équipe</th><th>Score</th><th>Confiance</th><th>Régulation</th><th>Engagement</th><th>Stabilité</th><th>Alerte</th></tr></thead>
          <tbody>
            ${window.A4P_DATA.players.map(p => {
              const team = window.A4P_DATA.teams.find(t => t.id === p.teamId)
              return `
                <tr>
                  <td><a href="joueur.html?id=${p.id}"><strong>${p.firstname} ${p.lastname}</strong></a></td>
                  <td>${team ? team.name : p.teamId}</td>
                  <td>${p.score}</td>
                  <td>${p.confiance}</td>
                  <td>${p.regulation}</td>
                  <td>${p.engagement}</td>
                  <td>${p.stabilite}</td>
                  <td><span class="badge ${badgeClass(p.alert)}">${alertLabel(p.alert)}</span></td>
                </tr>
              `
            }).join('')}
          </tbody>
        </table>
      </div>
    </section>
  `
}

function renderPlayerPage(){
  const root = document.getElementById('player-app')
  if(!root) return
  const params = new URLSearchParams(window.location.search)
  const id = params.get('id') || 'p1'
  const p = window.A4P_DATA.players.find(x => x.id === id) || window.A4P_DATA.players[0]
  const team = window.A4P_DATA.teams.find(t => t.id === p.teamId)
  root.innerHTML = `
    <section class="grid main">
      <article class="card">
        <div class="section-title">Fiche joueur</div>
        <h2 class="big-title">${p.firstname} ${p.lastname}</h2>
        <p class="muted">${team ? team.name : p.teamId} • ${p.position}</p>
        <span class="badge ${badgeClass(p.alert)}">${alertLabel(p.alert)}</span>
        <div class="stat-list">
          <div class="stat-row"><strong>Score global</strong><span>${p.score}/100</span></div>
          <div class="stat-row"><strong>Profil</strong><span>${p.profil}</span></div>
          <div class="stat-row"><strong>Dernier test</strong><span>${p.lastTest}</span></div>
        </div>
      </article>
      <article class="card">
        <div class="section-title">Radar individuel</div>
        <canvas id="radarPlayer"></canvas>
      </article>
    </section>
    <section class="card" style="margin-top:22px">
      <div class="section-title">Lecture staff</div>
      <p class="muted">Le joueur montre une forte mobilisation dans l’action, mais une variabilité plus marquée dans la régulation émotionnelle. Un travail sur la gestion de la pression et le recentrage rapide après erreur est recommandé.</p>
    </section>
  `
  drawRadar('radarPlayer', [p.confiance, p.regulation, p.engagement, p.stabilite], ['Confiance','Régulation','Engagement','Stabilité'])
}

function renderPassations(){
  const root = document.getElementById('passations-app')
  if(!root) return
  root.innerHTML = `
    <section class="card">
      <div class="section-title">Passations</div>
      <h2 class="big-title">Préparation des campagnes équipe</h2>
      <p class="muted">Cette V7 corrigée reste visible immédiatement. Elle prépare la future logique de passation collective et de collecte centralisée.</p>
      <div class="module-grid">
        ${window.A4P_DATA.teams.map(t => `
          <article class="card module-card">
            <span class="badge soft">${t.category}</span>
            <h3>${t.name}</h3>
            <p>Générer un lien CMP d’équipe et piloter ensuite la complétion des joueurs.</p>
            <div class="actions">
              <a class="btn" href="https://alexandregriffet-cmd.github.io/CMP-A4P-ACADEMIE-DE-PERFORMANCES-/" target="_blank" rel="noopener">Lancer CMP</a>
              <a class="btn secondary" href="equipe.html?team=${t.id}">Voir l’équipe</a>
            </div>
          </article>
        `).join('')}
      </div>
    </section>
  `
}

document.addEventListener('DOMContentLoaded', () => {
  renderHome()
  renderDashboard()
  renderTeams()
  renderTeamPage()
  renderPlayers()
  renderPlayerPage()
  renderPassations()
})
