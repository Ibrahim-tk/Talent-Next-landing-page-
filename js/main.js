/**
 * TALENTnext Landing Page — Main Application Logic
 * Strict Zero-Pixel Radius & Minimalist Interaction Handling
 * Human-Centered Editorial Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Trait Cards Interactive Click & Sync with Booking Form
  const traitCards = document.querySelectorAll('.trait-card');
  const formSelect = document.getElementById('archetypeSelect');
  const optionMap = ['top-performer', 'athlete', 'leader', 'entrepreneur', 'not-sure', 'team-player'];

  traitCards.forEach((card) => {
    card.addEventListener('click', () => {
      traitCards.forEach(c => c.classList.remove('active-card'));
      card.classList.add('active-card');

      const cardIdx = parseInt(card.getAttribute('data-trait-index'), 10);
      if (!isNaN(cardIdx) && formSelect && optionMap[cardIdx]) {
        formSelect.value = optionMap[cardIdx];
      }
    });
  });

  // 2. See It in Action: Interactive Playback Simulation
  const playBtn = document.getElementById('previewPlayBtn');
  const livePulseDot = document.querySelector('.live-pulse-dot');
  const previewTimerBadge = document.getElementById('previewTimerBadge');
  const dialogueBubbles = document.querySelectorAll('.dialogue-bubble');
  let isPlaying = false;
  let playInterval = null;
  let playSeconds = 0;

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;
      if (isPlaying) {
        playBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
        playBtn.setAttribute('aria-label', 'Pause Interview Sample Clip');
        if (livePulseDot) livePulseDot.style.animation = 'pulse 0.8s infinite';

        playInterval = setInterval(() => {
          playSeconds++;
          const mins = Math.floor(playSeconds / 60);
          const secs = playSeconds % 60;
          if (previewTimerBadge) {
            previewTimerBadge.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs} Playing`;
          }
          if (playSeconds % 4 === 0) {
            dialogueBubbles.forEach(b => b.style.backgroundColor = 'var(--color-bg-surface)');
            const activeBubble = dialogueBubbles[(playSeconds / 4) % dialogueBubbles.length];
            if (activeBubble) activeBubble.style.backgroundColor = 'var(--color-accent-tint)';
          }
        }, 1000);
      } else {
        playBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><polygon points="5 3 19 12 5 21 5 3"/></svg>';
        playBtn.setAttribute('aria-label', 'Play Interview Sample Clip');
        clearInterval(playInterval);
        if (previewTimerBadge) previewTimerBadge.textContent = '3:42 Sample Clip';
        dialogueBubbles.forEach(b => b.style.backgroundColor = 'var(--color-bg-surface)');
      }
    });
  }

  // 3. Lead Booking Form Submission
  const bookingForm = document.getElementById('leadBookingForm');
  const successBanner = document.getElementById('formSuccessBanner');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const firstName = document.getElementById('firstName').value.trim();
      const lastName = document.getElementById('lastName').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();

      if (!firstName || !lastName || !email || !phone) {
        alert('Please complete all required fields.');
        return;
      }

      bookingForm.style.display = 'none';
      if (successBanner) {
        successBanner.innerHTML = `
          <div style="display:flex; flex-direction:column; gap:12px;">
            <div style="display:flex; align-items:center; gap:8px; font-weight:700; font-size:1.125rem;">
              <span style="color:var(--color-accent); font-size:1.5rem;">✓</span>
              <span>Your Free 30-Minute Session is Confirmed!</span>
            </div>
            <p style="font-size:0.9375rem; color:var(--color-text-primary); line-height:1.5;">
              Thank you, <strong>${firstName}</strong>. A TALENT Agent will contact you at <strong>${email}</strong> within 24 hours to schedule your session.
            </p>
            <div style="margin-top:12px;">
              <button type="button" class="btn-primary" onclick="window.location.reload()">Book Another Session</button>
            </div>
          </div>
        `;
        successBanner.classList.add('active');
      }
    });
  }

  // 4. Mobile Navigation Drawer Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileNavDrawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
    });

    const drawerLinks = mobileDrawer.querySelectorAll('a');
    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    });
  }
});
