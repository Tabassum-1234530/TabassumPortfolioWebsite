// Cursor
const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;
  let userNameEl = document.getElementById("userName").value;
  let userEmailEl = document.getElementById("userEmail").value;
  let userMessageEl = document.getElementById("userMessage").value;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  function animateCursor() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
  document.querySelectorAll('a, button, .skill-tag, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.style.transform = 'translate(-50%, -50%) scale(2.5)'; ring.style.transform = 'translate(-50%, -50%) scale(1.5)'; });
    el.addEventListener('mouseleave', () => { cursor.style.transform = 'translate(-50%, -50%) scale(1)'; ring.style.transform = 'translate(-50%, -50%) scale(1)'; });
  });

  // Typewriter
  const phrases = ['Full Stack Developer', 'Problem Solver', 'passionate to learn new things'];
  let pi = 0, ci = 0, del = false;
  const tw = document.getElementById('typewriter-text');
  function type() {
    const cur = phrases[pi];
    if (!del) {
      tw.textContent = cur.substring(0, ci + 1);
      ci++;
      if (ci === cur.length) { del = true; setTimeout(type, 1800); return; }
      setTimeout(type, 90);
    } else {
      tw.textContent = cur.substring(0, ci - 1);
      ci--;
      if (ci === 0) { del = false; pi = (pi + 1) % phrases.length; setTimeout(type, 400); return; }
      setTimeout(type, 45);
    }
  }
  setTimeout(type, 800);

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(r => obs.observe(r));

  // Form submit
  function handleSubmit(e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    btn.textContent = 'Sending...';
    btn.style.background = 'var(--accent3)';
    setTimeout(() => {
      btn.textContent = '✓ Message Sent!';
      btn.style.background = 'var(--accent2)';
      setTimeout(() => {
        btn.textContent = 'Send Message →';
        btn.style.background = 'var(--accent1)';
        e.target.reset();
      }, 3000);
    }, 1500);
  }

  // Nav active highlight on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 200) cur = s.getAttribute('id');
    });
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + cur ? 'var(--text)' : '';
    });
  });





