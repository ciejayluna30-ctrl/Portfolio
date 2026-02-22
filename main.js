/* ════════════════════════════════════
   CIEJAY Portfolio — main.js
   Christopher Acbang Luna Jr.
════════════════════════════════════ */

/* ── LOADER ── */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('gone');
  }, 2000);
});

/* ── CURSOR ── */
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});

/* ── NAV SCROLL ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

/* ── HAMBURGER MENU ── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.classList.toggle('nav-open');
});

// Close on link click
mobileMenu.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.classList.remove('nav-open');
  });
});

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) {
      e.preventDefault();
      t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── ACTIVE NAV LINK ── */
const sections = document.querySelectorAll('section[id]');
const links    = document.querySelectorAll('.nav-link, .mob-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 200) current = sec.id;
  });
  links.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
});

/* ── SCROLL REVEAL ── */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      // animate skill bars
      e.target.querySelectorAll('.sk-fill').forEach(bar => {
        setTimeout(() => { bar.style.width = bar.dataset.w + '%'; }, 150);
      });
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ── SERVICES MODAL ── */
const serviceData = {
  'video-editing': {
    title: 'Video Editing',
    note: 'Basic editing with transitions, color grading, text overlays, and background music. Suitable for vlogs, reels, and short-form social content.',
    folder: 'images/video',
    count: 3,
    ext: 'mp4',
    isVideo: true,
  },
  'graphic-design': {
    title: 'Graphic Designing',
    note: 'Posters, social media graphics, banners, and visual branding using Canva and Photoshop.',
    folder: 'images/graphic',
    count: 3,
    ext: 'jpg',
  },
  'web-design': {
    title: 'Web Design',
    note: 'Clean, responsive websites built from scratch using HTML, CSS, JavaScript, and PHP.',
    folder: 'images/web',
    count: 3,
    ext: 'jpg',
  },
  'vexel-art': {
    title: 'Vexel Art',
    note: 'Digital vector-style portraits and illustrations from photo references.',
    folder: 'images/vexel',
    count: 3,
    ext: 'jpg',
  },
};

function openService(key) {
  const data = serviceData[key];
  document.getElementById('modal-title').textContent = data.title;
  document.getElementById('modal-note').textContent   = data.note;

  // Build image/video grid
  const container = document.getElementById('modal-examples');
  container.innerHTML = '';
  for (let i = 1; i <= data.count; i++) {
    if (data.isVideo) {
      const video = document.createElement('video');
      video.src = `${data.folder}/${i}.${data.ext}`;
      video.className = 'modal-img modal-video';
      video.autoplay = true;
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.controls = true;
      video.onerror = () => video.style.display = 'none';
      container.appendChild(video);
    } else {
      const img = document.createElement('img');
      img.src = `${data.folder}/${i}.${data.ext}`;
      img.alt = `${data.title} example ${i}`;
      img.className = 'modal-img';
      img.loading = 'lazy';
      img.onerror = () => img.style.display = 'none';
      // Click to open lightbox
      img.addEventListener('click', () => {
        const lb = document.createElement('div');
        lb.className = 'lightbox';
        const full = document.createElement('img');
        full.src = img.src;
        full.alt = img.alt;
        lb.appendChild(full);
        lb.addEventListener('click', () => document.body.removeChild(lb));
        document.body.appendChild(lb);
      });
      container.appendChild(img);
    }
  }

  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeService() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

/* close on Escape */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeService();
});

/* ── DOWNLOAD RESUME AS PDF ── */
function downloadResume(e) {
  e.preventDefault();

  const btn = e.currentTarget;
  const original = btn.innerHTML;
  btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> Generating...`;
  btn.style.pointerEvents = 'none';

  const resumeHTML = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>LunaCV</title>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box;}
  body{background:#fff;color:#111;font-family:'DM Sans',sans-serif;font-size:11pt;line-height:1.6;padding:32pt;}
  .sec-label{font-family:'DM Mono',monospace;font-size:8pt;letter-spacing:3px;text-transform:uppercase;color:#00a0c4;margin-bottom:6pt;}
  .resume-sec-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:20pt;}
  .sec-title{font-size:22pt;font-weight:300;color:#111;margin-bottom:0;}
  .accent{color:#00a0c4;font-weight:500;}
  .btn-print,.btn-download,.resume-header-btns{display:none!important;}
  .resume-layout{display:grid;grid-template-columns:160pt 1fr;gap:24pt;}
  .resume-profile-card{display:flex;align-items:center;gap:10pt;background:#f5f5f5;border:1pt solid #ddd;padding:12pt;border-radius:4pt;margin-bottom:14pt;}
  .res-photo-wrap{width:46pt;height:46pt;border-radius:50%;overflow:hidden;border:2pt solid #00a0c4;flex-shrink:0;}
  .res-photo{width:100%;height:100%;object-fit:cover;}
  .res-name{font-size:11pt;font-weight:500;color:#111;}
  .res-role{font-size:9pt;color:#555;margin:2pt 0;}
  .res-loc{font-size:9pt;color:#888;font-family:'DM Mono',monospace;}
  .resume-block{margin-bottom:14pt;}
  .rb-title{font-family:'DM Mono',monospace;font-size:7pt;letter-spacing:2px;text-transform:uppercase;color:#00a0c4;margin-bottom:8pt;padding-bottom:4pt;border-bottom:1pt solid #ddd;}
  .rb-item{font-size:9pt;color:#555;margin-bottom:4pt;font-family:'DM Mono',monospace;}
  .skills-tags{display:flex;flex-wrap:wrap;gap:4pt;}
  .skill-tag{font-family:'DM Mono',monospace;font-size:7pt;letter-spacing:1px;text-transform:uppercase;color:#333;background:#f0f0f0;border:1pt solid #ddd;padding:2pt 6pt;border-radius:2pt;}
  .cert-item{display:flex;align-items:flex-start;gap:8pt;margin-bottom:8pt;}
  .cert-icon{font-size:12pt;flex-shrink:0;margin-top:1pt;}
  .cert-name{font-size:10pt;color:#111;font-weight:400;}
  .cert-from{font-family:'DM Mono',monospace;font-size:8pt;color:#888;margin-top:1pt;}
  .edu-item{margin-bottom:12pt;padding-left:10pt;border-left:2pt solid #00a0c4;padding-bottom:2pt;}
  .edu-year{font-family:'DM Mono',monospace;font-size:8pt;color:#00a0c4;margin-bottom:2pt;}
  .edu-degree{font-size:11pt;color:#111;font-weight:500;margin-bottom:2pt;}
  .edu-school{font-size:9pt;color:#555;margin-bottom:2pt;}
  .edu-note{font-size:8pt;color:#888;font-style:italic;}
  .exp-item{margin-bottom:14pt;padding-left:10pt;border-left:2pt solid #00a0c4;}
  .exp-period{font-family:'DM Mono',monospace;font-size:8pt;color:#00a0c4;margin-bottom:2pt;}
  .exp-role{font-size:12pt;color:#111;font-weight:500;margin-bottom:2pt;}
  .exp-company{font-size:9pt;color:#555;margin-bottom:6pt;}
  .exp-list{padding-left:14pt;list-style:disc;}
  .exp-list li{font-size:10pt;color:#555;margin-bottom:3pt;}
  .reveal{opacity:1!important;transform:none!important;}
</style>
</head>
<body>
${document.getElementById('resume').innerHTML}
</body>
</html>`;

  // Create downloadable HTML file named LunaCV (user opens and prints to PDF)
  // For true PDF we use blob + anchor download
  const blob = new Blob([resumeHTML], { type: 'text/html' });
  const url  = URL.createObjectURL(blob);

  // Create a hidden iframe to print silently
  const printFrame = document.createElement('iframe');
  printFrame.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;border:0;z-index:99999;background:#fff;';
  printFrame.src = url;
  document.body.appendChild(printFrame);

  printFrame.onload = () => {
    // Add filename hint via title then print
    try {
      printFrame.contentDocument.title = 'LunaCV';
      setTimeout(() => {
        printFrame.contentWindow.focus();
        printFrame.contentWindow.print();

        // Remove iframe after print dialog closes
        printFrame.contentWindow.onafterprint = () => {
          document.body.removeChild(printFrame);
          URL.revokeObjectURL(url);
        };
        // Fallback remove
        setTimeout(() => {
          if (document.body.contains(printFrame)) {
            document.body.removeChild(printFrame);
            URL.revokeObjectURL(url);
          }
        }, 60000);
      }, 800);
    } catch(err) {
      window.open(url, '_blank');
      document.body.removeChild(printFrame);
    }
    btn.innerHTML = original;
    btn.style.pointerEvents = '';
  };
}

/* ── CONTACT FORM ── */
// Form submits natively to Formspree — no JS needed
function handleSubmit(e) {
  // empty — form posts directly to https://formspree.io/f/mreayawd
}