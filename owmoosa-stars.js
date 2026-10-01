(() => {
  const canvas = document.querySelector('#galaxy-stars');
  const frame = document.querySelector('#frame');
  const ctx = canvas.getContext('2d');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let width = 0, height = 0, stars = [], animation = null;
  let meteors = [], floaters = [], nextMeteor = 0, previousTime = 0;
  const pointer = { x: -9999, y: -9999, active: false };
  const view = { x: 0, y: 0 };
  let hoverButton = null;
  function resize() {
    const bounds = frame.getBoundingClientRect();
    width = bounds.width; height = bounds.height;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    stars = Array.from({ length: Math.min(1100, Math.max(240, Math.floor(width * height / 1100))) }, () => {
      const x = Math.random() * width, y = Math.random() * height;
      const prominent = Math.random() < .14;
      return { x, y, homeX: x, homeY: y, vx: 0, vy: 0, depth: prominent ? .8 + Math.random() * .4 : .15 + Math.random() * .6, size: prominent ? 1.8 + Math.random() * 1.8 : .6 + Math.random() * 1.3, phase: Math.random() * Math.PI * 2, brightness: .45 + Math.random() * .55, prominent };
    });
    floaters = Array.from({ length: width < 700 ? 4 : 6 }, (_, i) => makeFloater(true, i % 3));
    meteors = []; nextMeteor = 0;
    restart();
  }
  function drawNebula(time) {
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    for (let i = 0; i < 5; i++) {
      const t = motion.matches ? 0 : time * .00007;
      const x = width * (.18 + i * .17) + Math.sin(t + i * 1.6) * width * .045 + view.x * 9;
      const y = height * (.58 + Math.cos(t * .7 + i) * .18) + view.y * 6;
      const radius = Math.max(width, height) * .23;
      const glow = ctx.createRadialGradient(x, y, 0, x, y, radius);
      const pulse = .016 + .007 * Math.sin(t * 2 + i);
      glow.addColorStop(0, `rgba(145,149,157,${pulse})`);
      glow.addColorStop(.45, `rgba(90,93,100,${pulse * .5})`);
      glow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glow; ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
    }
    ctx.restore();
    for (let i = 0; i < 9; i++) {
      const drift = motion.matches ? 0 : Math.sin(time * .00012 + i) * width * .035;
      const x = width * (.27 + i * .057) + drift - view.x * 13;
      const y = height * (.42 + Math.sin(i * 1.7) * .14) + (motion.matches ? 0 : Math.cos(time * .00009 + i) * 18) - view.y * 8;
      const radius = Math.min(width, height) * (.18 + (i % 3) * .025);
      const cloud = ctx.createRadialGradient(x, y, 0, x, y, radius);
      cloud.addColorStop(0, 'rgba(0,0,0,.05)');
      cloud.addColorStop(.48, 'rgba(1,1,2,.025)');
      cloud.addColorStop(.8, 'rgba(4,4,5,.01)');
      cloud.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = cloud;
      ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
    }
  }
  function makeFloater(initial = false, type = Math.floor(Math.random() * 3)) {
    const fromLeft = Math.random() < .5;
    return {
      x: initial ? Math.random() * width : (fromLeft ? -30 : width + 30),
      y: height * (.08 + Math.random() * .84),
      vx: (fromLeft ? 1 : -1) * (5 + Math.random() * 9),
      vy: (Math.random() - .5) * 3,
      size: (width < 700 ? 5 : 6) + Math.random() * 7,
      type, squash: .25 + Math.random() * .3,
      lights: 3 + Math.floor(Math.random() * 5),
      hue: [185, 215, 38][Math.floor(Math.random() * 3)],
      brightness: .45 + Math.random() * .4,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - .5) * .13,
      phase: Math.random() * Math.PI * 2,
      facets: Array.from({ length: 7 }, () => .65 + Math.random() * .35)
    };
  }
  function drawFloaters(time, delta) {
    for (let i = 0; i < floaters.length; i++) {
      let f = floaters[i];
      if (!motion.matches) {
        f.x += f.vx * delta; f.y += f.vy * delta; f.angle += f.spin * delta;
        if (f.x < -40 || f.x > width + 40 || f.y < -40 || f.y > height + 40) {
          floaters[i] = f = makeFloater();
        }
      }
      ctx.save();
      ctx.translate(f.x, f.y + (motion.matches ? 0 : Math.sin(time * .0004 + f.phase) * 7));
      ctx.rotate(f.angle);
      const shade = ctx.createLinearGradient(0, -f.size, 0, f.size);
      shade.addColorStop(0, '#d1d5dc'); shade.addColorStop(.4, '#64717d'); shade.addColorStop(1, '#171d25');
      ctx.globalAlpha = f.brightness;
      ctx.fillStyle = shade; ctx.strokeStyle = '#c5d3e688'; ctx.lineWidth = .6;
      ctx.beginPath();
      if (f.type === 2) {
        ctx.moveTo(f.size, 0); ctx.lineTo(-f.size * .7, -f.size * .6);
        ctx.lineTo(-f.size * .4, 0); ctx.lineTo(-f.size * .7, f.size * .6); ctx.closePath();
      } else {
        ctx.ellipse(0, 0, f.size, f.size * f.squash, 0, 0, Math.PI * 2);
      }
      ctx.fill(); ctx.stroke();
      if (f.type === 0) {
        ctx.fillStyle = '#aec5dd'; ctx.beginPath();
        ctx.ellipse(0, -f.size * f.squash * .55, f.size * .4, f.size * .27, 0, Math.PI, Math.PI * 2); ctx.fill();
      } else if (f.type === 1) {
        ctx.fillStyle = '#080b10'; ctx.beginPath();
        ctx.ellipse(0, 0, f.size * .55, f.size * f.squash * .5, 0, 0, Math.PI * 2); ctx.fill();
      }
      ctx.shadowColor = `hsl(${f.hue} 75% 75%)`; ctx.shadowBlur = 4;
      ctx.fillStyle = ctx.shadowColor;
      for (let j = 0; j < f.lights; j++) {
        const a = j / f.lights * Math.PI * 2;
        ctx.globalAlpha = f.brightness * (motion.matches ? .8 : .55 + .45 * Math.sin(time * .0015 + f.phase + j) ** 2);
        ctx.beginPath();
        ctx.arc(Math.cos(a) * f.size * .78, Math.sin(a) * f.size * (f.type === 2 ? .42 : f.squash) * .8, .7 + f.size * .025, 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore();
    }
  }
  function drawMeteors(time, delta) {
    if (motion.matches) return;
    if (time >= nextMeteor) {
      const speed = 220 + Math.random() * 1000;
      const angle = Math.random() * Math.PI * 2;
      const ux = Math.cos(angle), uy = Math.sin(angle);
      meteors.push({ x: Math.random() * width, y: Math.random() * height,
        vx: ux * speed, vy: uy * speed, ux, uy, age: 0,
        life: 1.3 + Math.random() * 1.5, fadeOut: .65 + Math.random() * .45,
        length: 40 + Math.random() * 220,
        brightness: .25 + Math.random() * .75, size: .65 + Math.random() * 2.1,
        glow: 3 + Math.random() * 12 });
      nextMeteor = time + 2800 + Math.random() * 4200;
    }
    meteors = meteors.filter(m => m.age < m.life && m.x > -300 && m.x < width + 300 && m.y > -300 && m.y < height + 300);
    for (const m of meteors) {
      m.age += delta; m.x += m.vx * delta; m.y += m.vy * delta;
      const fadeIn = Math.min(1, m.age / .18);
      const remaining = Math.max(0, Math.min(1, (m.life - m.age) / m.fadeOut));
      const fadeOut = remaining * remaining * (3 - 2 * remaining);
      const alpha = m.brightness * fadeIn * fadeOut;
      const tx = m.x - m.length * m.ux, ty = m.y - m.length * m.uy;
      const trail = ctx.createLinearGradient(tx, ty, m.x, m.y);
      trail.addColorStop(0, 'rgba(210,213,219,0)');
      trail.addColorStop(.75, `rgba(220,223,229,${alpha * .5})`);
      trail.addColorStop(1, `rgba(243,249,255,${alpha})`);
      ctx.save(); ctx.strokeStyle = trail; ctx.lineWidth = m.size;
      ctx.shadowColor = '#e2e5ec'; ctx.shadowBlur = m.glow;
      ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(m.x, m.y); ctx.stroke();
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.beginPath(); ctx.arc(m.x, m.y, m.size, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    }
  }
  function draw(time) {
    animation = null;
    const delta = Math.min((time - previousTime) / 1000 || .016, .035);
    previousTime = time;
    ctx.clearRect(0, 0, width, height);
    if (!frame.classList.contains('is-inside')) {
      const step = delta * 60;
      const targetViewX = pointer.active ? (pointer.x / width - .5) * 2 : 0;
      const targetViewY = pointer.active ? (pointer.y / height - .5) * 2 : 0;
      view.x += (targetViewX - view.x) * Math.min(1, delta * 4);
      view.y += (targetViewY - view.y) * Math.min(1, delta * 4);
      const buttonBounds = hoverButton?.getBoundingClientRect();
      const frameBounds = buttonBounds ? frame.getBoundingClientRect() : null;
      const attractor = buttonBounds ? { x: buttonBounds.left + buttonBounds.width / 2 - frameBounds.left, y: buttonBounds.top + buttonBounds.height / 2 - frameBounds.top } : null;
      drawNebula(time);
      for (const star of stars) {
        if (!motion.matches) {
          const baseX = star.homeX + view.x * star.depth * 32 + Math.sin(time * .00015 + star.phase) * star.depth * 8;
          const baseY = star.homeY + view.y * star.depth * 21 + Math.cos(time * .00012 + star.phase) * star.depth * 5;
          const dx = star.x - pointer.x, dy = star.y - pointer.y;
          const distance = Math.hypot(dx, dy);
          if (pointer.active && !attractor && distance < 180) {
            const force = (1 - distance / 180) * 2.2 * star.depth * step;
            star.vx += (dx / Math.max(distance, 1)) * force;
            star.vy += (dy / Math.max(distance, 1)) * force;
          }
          if (attractor && Math.hypot(baseX - attractor.x, baseY - attractor.y) < 210) {
            const angle = star.phase + time * .00035 * (.5 + star.depth);
            const radius = 65 + star.depth * 52;
            star.vx += (attractor.x + Math.cos(angle) * radius - star.x) * .012 * step;
            star.vy += (attractor.y + Math.sin(angle) * radius * .5 - star.y) * .012 * step;
          } else {
            star.vx += (baseX - star.x) * .008 * step;
            star.vy += (baseY - star.y) * .008 * step;
          }
          const damping = Math.pow(.87, step);
          star.vx *= damping; star.vy *= damping;
          star.x += star.vx * step; star.y += star.vy * step;
        }
        const shimmer = motion.matches ? 1 : .55 + .45 * Math.pow(.5 + .5 * Math.sin(time * .0022 + star.phase), 2);
        const alpha = star.brightness * shimmer;
        if (star.prominent) {
          const glow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 7);
          glow.addColorStop(0, `rgba(237,239,244,${alpha * .55})`);
          glow.addColorStop(.3, `rgba(205,209,218,${alpha * .12})`);
          glow.addColorStop(1, 'rgba(205,209,218,0)');
          ctx.fillStyle = glow; ctx.fillRect(star.x - star.size * 7, star.y - star.size * 7, star.size * 14, star.size * 14);
          ctx.strokeStyle = `rgba(239,241,245,${alpha * .6})`; ctx.lineWidth = .7;
          const ray = star.size * (2 + shimmer * 2);
          ctx.beginPath(); ctx.moveTo(star.x - ray, star.y); ctx.lineTo(star.x + ray, star.y);
          ctx.moveTo(star.x, star.y - ray); ctx.lineTo(star.x, star.y + ray); ctx.stroke();
        }
        ctx.fillStyle = `rgba(243,244,247,${alpha})`;
        ctx.beginPath(); ctx.arc(star.x, star.y, star.size * (star.prominent ? .62 : 1), 0, Math.PI * 2); ctx.fill();
      }
      drawFloaters(time, delta);
      drawMeteors(time, delta);
    }
    if (!motion.matches && !document.hidden && !frame.classList.contains('is-inside')) animation = requestAnimationFrame(draw);
  }
  function restart() {
    if (animation !== null) cancelAnimationFrame(animation);
    animation = null;
    previousTime = performance.now();
    nextMeteor = previousTime + 1000;
    meteors = [];
    if (!document.hidden) draw(performance.now());
  }
  frame.addEventListener('pointermove', event => {
    const bounds = frame.getBoundingClientRect();
    pointer.x = event.clientX - bounds.left; pointer.y = event.clientY - bounds.top;
    pointer.active = true;
  });
  frame.addEventListener('pointerleave', () => { pointer.active = false; });
  document.querySelectorAll('[data-space]').forEach(button => {
    button.addEventListener('pointerenter', () => { hoverButton = button; });
    button.addEventListener('pointerleave', () => { hoverButton = null; });
    button.addEventListener('focus', () => { hoverButton = button; });
    button.addEventListener('blur', () => { hoverButton = null; });
    button.addEventListener('click', () => { hoverButton = null; pointer.active = false; });
  });
  frame.addEventListener('pointerup', event => { if (event.pointerType !== 'mouse') pointer.active = false; });
  new ResizeObserver(resize).observe(frame);
  new MutationObserver(restart).observe(frame, { attributes: true, attributeFilter: ['class'] });
  document.addEventListener('visibilitychange', restart);
  motion.addEventListener('change', restart);
})();
