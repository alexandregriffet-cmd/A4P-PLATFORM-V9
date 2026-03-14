
function qs(sel){return document.querySelector(sel);}
function getStore(key, fallback){try{return JSON.parse(localStorage.getItem(key)) ?? fallback;}catch(e){return fallback;}}
function setStore(key, val){localStorage.setItem(key, JSON.stringify(val));}
function uid(prefix="id"){return prefix + "_" + Math.random().toString(36).slice(2,10);}
function today(){return new Date().toISOString().slice(0,10);}

function ensureDemoData(){
  const db = getStore("a4p_v9_db", null);
  if(db) return db;
  const seed = {
    clubs:[{id:"club_a4p_demo", name:"Académie Démo", sport:"Rugby", plan:"club", createdAt:today()}],
    coaches:[{id:"coach_demo", clubId:"club_a4p_demo", name:"Coach Démo", email:"coach@a4p.demo"}],
    teams:[{id:"team_u18", clubId:"club_a4p_demo", name:"U18", category:"U18", playersCount:4, passationLink:"passation.html?team=team_u18&module=cmp"}],
    players:[
      {id:"pl1", teamId:"team_u18", firstName:"Lucas", lastName:"Martin", position:"Centre"},
      {id:"pl2", teamId:"team_u18", firstName:"Tom", lastName:"Petit", position:"Ailier"},
      {id:"pl3", teamId:"team_u18", firstName:"Hugo", lastName:"Bernard", position:"Demi"},
      {id:"pl4", teamId:"team_u18", firstName:"Noah", lastName:"Garcia", position:"Arrière"}
    ],
    tests:[
      {id:"t1", playerId:"pl1", teamId:"team_u18", module:"CMP", date:"2026-03-01", score_global:63, dimensions:{confiance:58,regulation:45,engagement:72,stabilite:77}, profile:"CMP-2"},
      {id:"t2", playerId:"pl1", teamId:"team_u18", module:"CMP", date:"2026-04-01", score_global:68, dimensions:{confiance:64,regulation:52,engagement:75,stabilite:79}, profile:"CMP-2"},
      {id:"t3", playerId:"pl2", teamId:"team_u18", module:"CMP", date:"2026-04-01", score_global:54, dimensions:{confiance:48,regulation:42,engagement:66,stabilite:60}, profile:"CMP-3"},
      {id:"t4", playerId:"pl3", teamId:"team_u18", module:"CMP", date:"2026-04-01", score_global:72, dimensions:{confiance:70,regulation:66,engagement:76,stabilite:76}, profile:"CMP-1"},
      {id:"t5", playerId:"pl4", teamId:"team_u18", module:"CMP", date:"2026-04-01", score_global:47, dimensions:{confiance:41,regulation:39,engagement:61,stabilite:47}, profile:"CMP-5"}
    ],
    billing:[]
  };
  setStore("a4p_v9_db", seed);
  return seed;
}
function getLatestTestsForTeam(teamId,module="CMP"){
  const db=ensureDemoData();
  const byPlayer={};
  db.tests.filter(t=>t.teamId===teamId && t.module===module).sort((a,b)=>a.date.localeCompare(b.date)).forEach(t=>byPlayer[t.playerId]=t);
  return Object.values(byPlayer);
}
function avg(vals){return vals.length?Math.round(vals.reduce((a,b)=>a+b,0)/vals.length):0;}
function teamSummary(teamId){
  const tests=getLatestTestsForTeam(teamId);
  const dims=["confiance","regulation","engagement","stabilite"];
  return {
    count: tests.length,
    score: avg(tests.map(t=>t.score_global)),
    dimensions: Object.fromEntries(dims.map(d=>[d, avg(tests.map(t=>t.dimensions[d]))])),
    alerts: tests.filter(t=>t.score_global<55 || Object.values(t.dimensions).some(v=>v<45)).length
  }
}
function createTeam(payload){
  const db=ensureDemoData();
  const teamId=uid("team");
  db.teams.push({id:teamId, clubId:payload.clubId, name:payload.name, category:payload.category, playersCount:Number(payload.playersCount||0), passationLink:`passation.html?team=${teamId}&module=cmp`});
  setStore("a4p_v9_db", db);
  return teamId;
}
function createCheckoutLink(planId){
  return `${window.A4P_CONFIG.stripeCheckoutUrl}?plan=${encodeURIComponent(planId)}`;
}
