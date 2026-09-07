/**
 * TALENTnext V3 — Application Logic
 * Specification: landingv2.md + Architectural Layout
 * Handles live call deck interactions, bento card selection, video player, and lead intake form.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Live Video Terminal Deck Controls (From Layout Reference)
  const micBtn = document.getElementById('ctrlMicBtn');
  const camBtn = document.getElementById('ctrlCamBtn');
  const recordBtn = document.getElementById('ctrlRecordBtn');
  const endBtn = document.getElementById('ctrlEndBtn');
  const callRecTimer = document.getElementById('callRecTimer');
  const telemetryQuote = document.getElementById('telemetryQuote');
  const photoFeeds = document.querySelectorAll('.panoramic-photo-feed');
  const micDots = document.querySelectorAll('.live-mic-dot');



  let isMicMuted = false;
  let isCamOff = false;
  let isRecording = true;
  let sessionSeconds = 3098; // 51:38

  // Timer Tick
  setInterval(() => {
    if (isRecording && callRecTimer) {
      sessionSeconds++;
      const mins = Math.floor(sessionSeconds / 60);
      const secs = sessionSeconds % 60;
      callRecTimer.textContent = `REC ${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
  }, 1000);

  // Rotating Live Telemetry Quotes & Observations
  const telemetryQuotes = [
    '“Communication pattern: Decisive clarity maintained under pressure.”',
    '“Candidate standard: Elevated ownership demonstrated without prompting.”',
    '“Adversity reaction: Immediate focus on stabilizing team outcomes.”',
    '“Identified competency: Natural talent for cross-functional alignment.”',
    '“Diagnostic conclusion: Strong alignment with L • Leader archetype.”'
  ];
  let quoteIdx = 0;

  if (telemetryQuote) {
    setInterval(() => {
      telemetryQuote.style.opacity = '0';
      setTimeout(() => {
        quoteIdx = (quoteIdx + 1) % telemetryQuotes.length;
        telemetryQuote.textContent = telemetryQuotes[quoteIdx];
        telemetryQuote.style.opacity = '1';
      }, 300);
    }, 4000);
  }

  // Toggle Microphone
  if (micBtn) {
    micBtn.addEventListener('click', () => {
      isMicMuted = !isMicMuted;
      if (isMicMuted) {
        micBtn.classList.remove('btn-mic-on');
        micBtn.style.backgroundColor = '#DC2626';
        micBtn.setAttribute('title', 'Microphone Muted (Click to Unmute)');
        micDots.forEach(dot => dot.style.backgroundColor = '#EF4444');
      } else {
        micBtn.classList.add('btn-mic-on');
        micBtn.style.backgroundColor = '#15803D';
        micBtn.setAttribute('title', 'Microphone Active (Click to Mute)');
        micDots.forEach(dot => dot.style.backgroundColor = '#22C55E');
      }
    });
  }

  // Toggle Camera (Middle Accent Action Button)
  if (camBtn) {
    camBtn.addEventListener('click', () => {
      isCamOff = !isCamOff;
      if (isCamOff) {
        camBtn.classList.remove('btn-accent-ctrl');
        camBtn.style.backgroundColor = '#DC2626';
        camBtn.style.borderColor = '#EF4444';
        photoFeeds.forEach(feed => feed.style.filter = 'brightness(0.2) contrast(1.2)');
      } else {
        camBtn.classList.add('btn-accent-ctrl');
        camBtn.style.backgroundColor = 'var(--accent)';
        camBtn.style.borderColor = 'var(--accent)';
        photoFeeds.forEach(feed => feed.style.filter = 'none');
      }
    });
  }

  // Toggle Recording
  if (recordBtn) {
    recordBtn.addEventListener('click', () => {
      isRecording = !isRecording;
      recordBtn.style.backgroundColor = isRecording ? '#991B1B' : '#23232A';
      if (callRecTimer) {
        callRecTimer.style.opacity = isRecording ? '1' : '0.4';
      }
    });
  }

  // Leave Call
  if (endBtn) {
    endBtn.addEventListener('click', () => {
      alert('Discovery session completed. Redirecting to schedule your own session...');
      const formSection = document.getElementById('get-started');
      formSection?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // 2. Bento Trait Card, Ticker & Hero Marquee Click to sync with Intake Form
  const talentCells = document.querySelectorAll('.bento-tile, .bento-ticker-cell, .marquee-card-portrait, .marquee-card-square');
  const archetypeSelect = document.getElementById('formArchetype');
  const archetypeMap = {
    'T': 'top-performer',
    'A': 'athlete',
    'L': 'leader',
    'E': 'entrepreneur',
    'N': 'not-sure',
    'TP': 'team-player'
  };

  talentCells.forEach(cell => {
    cell.addEventListener('click', () => {
      const traitKey = cell.getAttribute('data-trait-key');
      if (traitKey && archetypeMap[traitKey] && archetypeSelect) {
        archetypeSelect.value = archetypeMap[traitKey];
        // Smooth scroll down to the form
        const formSection = document.getElementById('get-started');
        formSection?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // 3. Section 8: Video Player Interaction Simulation
  // 3. Section 8: Video Player Interaction
  const videoPlayBtn = document.getElementById('videoPlayBtn');
  const actionVideo = document.getElementById('actionVideoPlayer');

  if (videoPlayBtn && actionVideo) {
    videoPlayBtn.addEventListener('click', () => {
      if (actionVideo.paused) {
        actionVideo.play();
        videoPlayBtn.innerHTML = `
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16"/>
            <rect x="14" y="4" width="4" height="16"/>
          </svg>
        `;
        videoPlayBtn.setAttribute('aria-label', 'Pause Conversation Video');
      } else {
        actionVideo.pause();
        videoPlayBtn.innerHTML = `
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <polygon points="6 4 20 12 6 20 6 4"/>
          </svg>
        `;
        videoPlayBtn.setAttribute('aria-label', 'Play Conversation Video');
      }
    });
  }

  // 4. Section 9: 3-Step Interactive Form Logic
  const threeStepForm = document.getElementById('talentThreeStepForm');
  const step1 = document.getElementById('formStep1');
  const step2 = document.getElementById('formStep2');
  const step3 = document.getElementById('formStep3');
  const successMsg = document.getElementById('stepFormSuccessMessage');

  const step1Next = document.getElementById('step1NextBtn');
  const step2Prev = document.getElementById('step2PrevBtn');
  const step2Next = document.getElementById('step2NextBtn');
  const step3Prev = document.getElementById('step3PrevBtn');

  // Step 1 -> Step 2
  if (step1Next) {
    step1Next.addEventListener('click', () => {
      const whereChecked = document.querySelectorAll('input[name="where_now"]:checked');
      const hopingChecked = document.querySelectorAll('input[name="hoping"]:checked');

      if (whereChecked.length === 0 || hopingChecked.length === 0) {
        alert('Please answer both questions before proceeding.');
        return;
      }

      step1.style.display = 'none';
      step2.style.display = 'block';
    });
  }

  // Step 2 -> Step 1
  if (step2Prev) {
    step2Prev.addEventListener('click', () => {
      step2.style.display = 'none';
      step1.style.display = 'block';
    });
  }

  // Step 2 -> Step 3
  if (step2Next) {
    step2Next.addEventListener('click', () => {
      const timeChecked = document.querySelectorAll('input[name="call_time"]:checked');

      if (timeChecked.length === 0) {
        alert('Please select your preferred call time before proceeding.');
        return;
      }

      step2.style.display = 'none';
      step3.style.display = 'block';
    });
  }

  // Step 3 -> Step 2
  if (step3Prev) {
    step3Prev.addEventListener('click', () => {
      step3.style.display = 'none';
      step2.style.display = 'block';
    });
  }

  // Final Form Submission
  if (threeStepForm) {
    threeStepForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const fName = document.getElementById('stepFirstName')?.value.trim();
      const lName = document.getElementById('stepLastName')?.value.trim();
      const email = document.getElementById('stepEmail')?.value.trim();
      const phone = document.getElementById('stepPhone')?.value.trim();
      const postal = document.getElementById('stepPostalCode')?.value.trim();

      if (!fName || !lName || !email || !phone || !postal) {
        alert('Please fill out all required contact fields.');
        return;
      }

      threeStepForm.style.display = 'none';
      if (successMsg) {
        successMsg.style.display = 'block';
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  // 5. Section 4: Viewport Scroll-Driven Horizontal Card Scroll
  const traitsPinWrapper = document.getElementById('traitsPinWrapper');
  const traitsStickyFrame = document.getElementById('traits');
  const traitsScrollContainer = document.getElementById('traitsScrollContainer');
  const traitsScrollPrev = document.getElementById('traitsScrollPrev');
  const traitsScrollNext = document.getElementById('traitsScrollNext');

  if (traitsPinWrapper && traitsStickyFrame && traitsScrollContainer) {
    const headerHeight = 70; // sticky header height

    function updateTraitsViewportScroll() {
      // On narrow mobile devices, allow native horizontal touch scrolling
      if (window.innerWidth <= 768) return;

      const wrapperRect = traitsPinWrapper.getBoundingClientRect();
      const scrollableDistance = traitsPinWrapper.offsetHeight - traitsStickyFrame.offsetHeight;
      if (scrollableDistance <= 0) return;

      // When the top of the wrapper hits the bottom of the sticky header (70px)
      const scrolled = headerHeight - wrapperRect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));

      const maxHorizontal = traitsScrollContainer.scrollWidth - traitsScrollContainer.clientWidth;
      if (maxHorizontal > 0) {
        traitsScrollContainer.scrollLeft = progress * maxHorizontal;
      }
    }

    // Bind to window scroll with requestAnimationFrame for 60fps responsiveness
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateTraitsViewportScroll();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    window.addEventListener('resize', () => {
      updateTraitsViewportScroll();
    });

    // Initial positioning check
    updateTraitsViewportScroll();

    // Arrow navigation buttons: smoothly advance viewport scroll position
    if (traitsScrollPrev) {
      traitsScrollPrev.addEventListener('click', () => {
        const maxHorizontal = traitsScrollContainer.scrollWidth - traitsScrollContainer.clientWidth;
        if (maxHorizontal <= 0) return;
        const scrollableDistance = traitsPinWrapper.offsetHeight - traitsStickyFrame.offsetHeight;
        const stepScrollY = (330 / maxHorizontal) * scrollableDistance;
        window.scrollBy({ top: -stepScrollY, behavior: 'smooth' });
      });
    }

    if (traitsScrollNext) {
      traitsScrollNext.addEventListener('click', () => {
        const maxHorizontal = traitsScrollContainer.scrollWidth - traitsScrollContainer.clientWidth;
        if (maxHorizontal <= 0) return;
        const scrollableDistance = traitsPinWrapper.offsetHeight - traitsStickyFrame.offsetHeight;
        const stepScrollY = (330 / maxHorizontal) * scrollableDistance;
        window.scrollBy({ top: stepScrollY, behavior: 'smooth' });
      });
    }
  }

  // URL scroll helper for direct section deep-linking and testing
  const urlParams = new URLSearchParams(window.location.search);
  const scrollToParam = urlParams.get('scroll');
  if (scrollToParam) {
    setTimeout(() => {
      const el = document.getElementById(scrollToParam);
      if (el) {
        el.scrollIntoView({ behavior: 'instant', block: 'start' });
      } else if (!isNaN(Number(scrollToParam))) {
        window.scrollTo(0, Number(scrollToParam));
      }
    }, 150);
  }
});
