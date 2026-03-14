function drawRadar(canvasId, values, labels) {
  const canvas = document.getElementById(canvasId)
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const w = canvas.width = canvas.clientWidth * (window.devicePixelRatio || 1)
  const h = canvas.height = 430 * (window.devicePixelRatio || 1)
  ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1)
  ctx.clearRect(0,0,canvas.clientWidth,430)

  const cx = canvas.clientWidth / 2
  const cy = 210
  const radius = Math.min(canvas.clientWidth * 0.32, 150)
  const levels = 5
  const n = values.length

  ctx.strokeStyle = '#cfd8e6'
  ctx.lineWidth = 1.5
  for (let l=1; l<=levels; l++) {
    const r = radius * (l/levels)
    ctx.beginPath()
    for (let i=0;i<n;i++) {
      const angle = -Math.PI/2 + (Math.PI*2*i/n)
      const x = cx + Math.cos(angle)*r
      const y = cy + Math.sin(angle)*r
      if (i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y)
    }
    ctx.closePath(); ctx.stroke()
  }

  for (let i=0;i<n;i++) {
    const angle = -Math.PI/2 + (Math.PI*2*i/n)
    const x = cx + Math.cos(angle)*radius
    const y = cy + Math.sin(angle)*radius
    ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(x,y); ctx.stroke()

    const lx = cx + Math.cos(angle)*(radius+48)
    const ly = cy + Math.sin(angle)*(radius+48)
    ctx.fillStyle = '#233d71'
    ctx.font = '700 16px Arial'
    ctx.textAlign = lx < cx - 10 ? 'right' : lx > cx + 10 ? 'left' : 'center'
    ctx.fillText(labels[i], lx, ly)
  }

  ctx.beginPath()
  values.forEach((v,i)=>{
    const r = radius*(v/100)
    const angle = -Math.PI/2 + (Math.PI*2*i/n)
    const x = cx + Math.cos(angle)*r
    const y = cy + Math.sin(angle)*r
    if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y)
  })
  ctx.closePath()
  ctx.fillStyle = 'rgba(47,89,160,.18)'
  ctx.strokeStyle = '#294d8d'
  ctx.lineWidth = 4
  ctx.fill(); ctx.stroke()

  values.forEach((v,i)=>{
    const r = radius*(v/100)
    const angle = -Math.PI/2 + (Math.PI*2*i/n)
    const x = cx + Math.cos(angle)*r
    const y = cy + Math.sin(angle)*r
    ctx.beginPath(); ctx.arc(x,y,6,0,Math.PI*2); ctx.fillStyle='#294d8d'; ctx.fill()
  })
}
