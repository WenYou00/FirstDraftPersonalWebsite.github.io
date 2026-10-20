/* =========================================================
   Emily Chiam — Portfolio
   1. Dark mode toggle
   2. Save theme choice
   3. About: scroll reveal (cards + skill pills)
   4. Projects: modal open / close
   5. Contact: copy email
   6. Auto year
   ========================================================= */

(function () {
  'use strict';

  /* =========================================================
     1. Theme toggle
     ========================================================= */
  const themeBtn = document.getElementById('themeBtn');

  function setTheme(isDark) {
    document.body.classList.toggle('dark', isDark);
    themeBtn.innerHTML = isDark
      ? '<span aria-hidden="true">☀️</span>'
      : '<span aria-hidden="true">🌙</span>';
    themeBtn.setAttribute(
      'aria-label',
      isDark ? 'Switch to light mode' : 'Switch to dark mode'
    );
    try {
      localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
    } catch (e) {}
  }

  let startDark = false;
  try {
    startDark = localStorage.getItem('portfolio-theme') === 'dark';
  } catch (e) {}
  setTheme(startDark);

  themeBtn.addEventListener('click', () => {
    setTheme(!document.body.classList.contains('dark'));
  });

  /* =========================================================
     2. About — scroll reveal
     (Cards fade up; pills stagger in once the card is visible)
     ========================================================= */
  const revealElements = document.querySelectorAll('.reveal-up');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('visible'));
  }

  /* =========================================================
     3. Projects — modal
     ========================================================= */
  const projects = [
    {
      num: '01',
      title: 'Project One',
      tag: 'C++',
      desc: 'A short description of this project.'
    },
    {
      num: '02',
      title: 'Project Two',
      tag: 'Pyhton',
      desc: 'A short description of this project.'
    },
    {
      num: '03',
      title: 'Project Three',
      tag: 'Java',
      desc: 'A short description of this project. '
    },
    {
      num: '04',
      title: 'Project Four',
      tag: 'Computer Graphic',
      desc: 'A short description of this project.'
    },
    {
      num: '05',
      title: 'Project Five',
      tag: 'UI / UX 1',
      desc: 'A short description of this project.'
    },
    {
      num: '06',
      title: 'Project Six',
      tag: 'UI / UX 2',
      desc: 'A short description of this project.'
    }
  ];

  const gallery = document.getElementById('gallery');
  const modal = document.getElementById('modal');
  const modalNum = document.getElementById('modalNum');
  const modalTitle = document.getElementById('modalTitle');
  const modalTag = document.getElementById('modalTag');
  const modalDesc = document.getElementById('modalDesc');
  const closeBtn = document.getElementById('closeBtn');

  function openModal(id) {
    const data = projects[id];
    if (!data) return;

    modalNum.textContent = data.num;
    modalTitle.textContent = data.title;
    modalTag.textContent = data.tag;
    modalDesc.textContent = data.desc;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (gallery) {
    gallery.addEventListener('click', (e) => {
      const card = e.target.closest('.project');
      if (!card) return;
      openModal(card.dataset.id);
    });

    gallery.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const card = e.target.closest('.project');
      if (!card) return;
      e.preventDefault();
      openModal(card.dataset.id);
    });
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closeModal();
    }
  });

  /* =========================================================
     4. Copy email
     ========================================================= */
  const emailLink = document.getElementById('emailLink');

  if (emailLink) {
    emailLink.addEventListener('click', async (e) => {
      const email = emailLink.textContent.trim();
      try {
        await navigator.clipboard.writeText(email);
        e.preventDefault();
        showToast('Email copied ✦');
      } catch (err) {}
    });
  }

  function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%) translateY(20px);
      background: var(--ink);
      color: var(--paper);
      padding: 12px 20px;
      border-radius: 99px;
      font-size: 0.85rem;
      opacity: 0;
      transition: all 0.3s;
      z-index: 300;
      font-weight: 500;
    `;
    document.body.appendChild(toast);
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  }

  /* =========================================================
     5. Auto year
     ========================================================= */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
