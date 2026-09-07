/**
 * TALENTnext Concept V2 — Interactive Logic
 * Includes Responsive Viewport Simulator Controller & Live Cockpit Simulation
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. Interactive Top Viewport Controller
  // --------------------------------------------------------------------------
  const deviceFrame = document.getElementById('deviceFrame');
  const canvasWrapper = document.getElementById('simulatorCanvas');
  const presetButtons = document.querySelectorAll('.preset-btn');
  const pixelReadout = document.getElementById('pixelReadout');

  function updateReadout() {
    if (deviceFrame && pixelReadout) {
      const width = Math.round(deviceFrame.getBoundingClientRect().width);
      pixelReadout.textContent = `${width}px`;
    }
  }

  presetButtons.forEach(button => {
    button.addEventListener('click', () => {
      presetButtons.forEach(b => b.classList.remove('active'));
      button.classList.add('active');

      const targetWidth = button.getAttribute('data-width');

      if (targetWidth === '100%') {
        deviceFrame.style.maxWidth = '100%';
        if (canvasWrapper) canvasWrapper.style.padding = '0';
      } else {
        deviceFrame.style.maxWidth = `${targetWidth}px`;
        if (canvasWrapper) canvasWrapper.style.padding = '24px 16px 48px 16px';
      }

      setTimeout(updateReadout, 280);
    });
  });

  window.addEventListener('resize', updateReadout);
  updateReadout();

  // --------------------------------------------------------------------------
  // 2. Hero V2 Live Cockpit Controls
  // --------------------------------------------------------------------------
  const v2MicBtn = document.getElementById('v2MicBtn');
  const v2CamBtn = document.getElementById('v2CamBtn');
  const v2EndBtn = document.getElementById('v2EndBtn');
  const v2CallTimer = document.getElementById('v2CallTimer');
  const v2TelemetryQuote = document.getElementById('v2TelemetryQuote');
  const v2Feeds = document.querySelectorAll('.v2-portrait-img');
  const v2MicDots = document.querySelectorAll('.v2-mic-dot');

  let isMicMuted = false;
  let isCamOff = false;
  let sessionSeconds = 1114; // 18:34

  // Live Timer
  setInterval(() => {
    if (v2CallTimer) {
      sessionSeconds++;
      const mins = Math.floor(sessionSeconds / 60);
      const secs = sessionSeconds % 60;
      v2CallTimer.textContent = `REC ${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
  }, 1000);

  // Rotating Telemetry Insights
  const telemetryQuotes = [
    '"Immediate focus: Stabilizing team deliverables before assigning blame."',
    '"Communication standard: Decisive clarity maintained under ambiguity."',
    '"Observed behavior: High voluntary ownership demonstrated."',
    '"Diagnostic index: L • Leader archetype (94% confidence level)."'
  ];
  let quoteIdx = 0;

  if (v2TelemetryQuote) {
    setInterval(() => {
      v2TelemetryQuote.style.opacity = '0';
      setTimeout(() => {
        quoteIdx = (quoteIdx + 1) % telemetryQuotes.length;
        v2TelemetryQuote.textContent = telemetryQuotes[quoteIdx];
        v2TelemetryQuote.style.opacity = '1';
      }, 300);
    }, 4200);
  }

  // Mic Button Toggle
  if (v2MicBtn) {
    v2MicBtn.addEventListener('click', () => {
      isMicMuted = !isMicMuted;
      if (isMicMuted) {
        v2MicBtn.classList.remove('mic-btn-active');
        v2MicBtn.style.backgroundColor = '#DC2626';
        v2MicDots.forEach(dot => dot.style.backgroundColor = '#EF4444');
      } else {
        v2MicBtn.classList.add('mic-btn-active');
        v2MicBtn.style.backgroundColor = '#15803D';
        v2MicDots.forEach(dot => dot.style.backgroundColor = '#22C55E');
      }
    });
  }

  // Camera Button Toggle (Middle Accent Color Button)
  if (v2CamBtn) {
    v2CamBtn.addEventListener('click', () => {
      isCamOff = !isCamOff;
      if (isCamOff) {
        v2CamBtn.classList.remove('accent-middle-btn');
        v2CamBtn.style.backgroundColor = '#DC2626';
        v2Feeds.forEach(f => f.style.filter = 'brightness(0.25) contrast(1.2)');
      } else {
        v2CamBtn.classList.add('accent-middle-btn');
        v2CamBtn.style.backgroundColor = 'var(--color-accent)';
        v2Feeds.forEach(f => f.style.filter = 'none');
      }
    });
  }

  // End Call Button
  if (v2EndBtn) {
    v2EndBtn.addEventListener('click', () => {
      document.getElementById('get-started').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // --------------------------------------------------------------------------
  // 3. Trait Card Click Sync
  // --------------------------------------------------------------------------
  const traitCards = document.querySelectorAll('.trait-card');
  const formSelect = document.getElementById('archetypeSelect');
  const optionMap = ['top-performer', 'athlete', 'leader', 'entrepreneur', 'not-sure', 'team-player'];

  traitCards.forEach(card => {
    card.addEventListener('click', () => {
      traitCards.forEach(c => c.classList.remove('active-card'));
      card.classList.add('active-card');

      const cardIdx = parseInt(card.getAttribute('data-trait-index'), 10);
      if (!isNaN(cardIdx) && formSelect && optionMap[cardIdx]) {
        formSelect.value = optionMap[cardIdx];
      }
    });
  });

  // --------------------------------------------------------------------------
  // 4. Lead Booking Form
  // --------------------------------------------------------------------------
  const bookingForm = document.getElementById('leadBookingForm');
  const successBanner = document.getElementById('formSuccessBanner');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const firstName = document.getElementById('firstName').value.trim();
      const email = document.getElementById('email').value.trim();

      if (!firstName || !email) {
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
});
