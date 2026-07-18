const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');
 
let mx = 0, my = 0;
let rx = 0, ry = 0;
 
document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
});
 
function animateCursor() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
  ring.style.left   = rx + 'px';
  ring.style.top    = ry + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();
 
document.querySelectorAll('a, button, .skill-tag, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
    ring.style.transform   = 'translate(-50%, -50%) scale(1.5)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    ring.style.transform   = 'translate(-50%, -50%) scale(1)';
  });
});
 
// ─── Typewriter Effect ────────────────────────────────────────────────────
const phrases = ['Full Stack Developer', 'Problem Solver', 'Passionate to Learn'];
let pi  = 0;
let ci  = 0;
let del = false;
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
 
// ─── Scroll Reveal ────────────────────────────────────────────────────────
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(r => observer.observe(r));
 
// ─── Toast Helper ─────────────────────────────────────────────────────────
function showToast(message, type) {
  const toast   = document.getElementById('toast');
  toast.textContent = message;
  toast.className   = 'toast show ' + type;
  setTimeout(() => { toast.className = 'toast'; }, 4000);
}
 
// ─── Contact Form (EmailJS) ───────────────────────────────────────────────
function handleSubmit(e) {
  e.preventDefault();
 
  // FIX: read values at submit time, not at page load
  const userName    = document.getElementById('userName').value.trim();
  const userEmail   = document.getElementById('userEmail').value.trim();
  const userMessage = document.getElementById('userMessage').value.trim();
 
  if (!userName || !userEmail || !userMessage) {
    showToast('Please fill in all fields.', 'error');
    return;
  }
 
  const btn = document.getElementById('submitBtn');
  btn.textContent   = 'Sending...';
  btn.disabled      = true;
  btn.style.opacity = '0.7';
 
  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
    from_name:  userName,
    from_email: userEmail,
    message:    userMessage,
  })
  .then(() => {
    showToast('Message sent! I will get back to you soon.', 'success');
    e.target.reset();
  })
  .catch((err) => {
    console.error('EmailJS error:', err);
    showToast('Something went wrong. Please email me directly.', 'error');
  })
  .finally(() => {
    btn.textContent   = 'Send Message →';
    btn.disabled      = false;
    btn.style.opacity = '1';
  });
}
 
// ─── Nav Active Highlight ─────────────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let currentId = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 200) {
      currentId = section.getAttribute('id');
    }
  });
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.style.color = link.getAttribute('href') === '#' + currentId ? 'var(--text)' : '';
  });
});
 