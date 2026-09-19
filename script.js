  /* ------------------------------------------------------------------
     Google Sheet endpoint. Paste the Apps Script Web App /exec URL here.
     Setup steps are in GOOGLE-SHEET-SETUP.md. Left blank, the form still
     validates and confirms, it just doesn't record anything.
     ------------------------------------------------------------------ */
  const SHEET_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzGbp1jL0spLVbMmhUfOaEZMRNpxVBBoZt-qNcJnX1Gs4qh3Wuy2oPLgO3rPOpl_ryp/exec';

  /* the application modal is injected from here so every page carries it */
  document.body.insertAdjacentHTML('beforeend', `
<div class="modal" id="applyModal" role="dialog" aria-modal="true" aria-labelledby="applyTitle">
  <div class="modal-backdrop" data-close></div>
  <div class="modal-panel">
    <button class="modal-close" type="button" data-close aria-label="Close application form">&times;</button>
    <div class="modal-scroll">
      <div class="modal-head">
      <p class="modal-kicker">Pitzy</p>
      <h2 id="applyTitle">Founder Application</h2>
      <p class="modal-sub">A few questions so we know where you are in the raise and what you actually need. Takes about two minutes.</p>
      <p class="req-note"><em class="req" aria-hidden="true">*</em>Required — every question except the last.</p>
    </div>
    <form id="applyForm" novalidate>
      <div class="fq" data-field="fullname">
        <label class="fq-label" for="f-fullname"><span class="fq-num">01</span><span>Full Name<em class="req" aria-hidden="true">*</em></span></label>
        <input type="text" required aria-required="true" id="f-fullname" name="fullname" placeholder="Jane Doe" autocomplete="off">
        <p class="fq-error">This one is required.</p>
      </div>
      <div class="fq" data-field="phone">
        <label class="fq-label" for="f-phone"><span class="fq-num">02</span><span>Phone Number<em class="req" aria-hidden="true">*</em></span></label>
        <input type="tel" required aria-required="true" id="f-phone" name="phone" placeholder="9876543210" inputmode="numeric" autocomplete="off">
        <p class="fq-error">This one is required.</p>
      </div>
      <div class="fq" data-field="email">
        <label class="fq-label" for="f-email"><span class="fq-num">03</span><span>Email<em class="req" aria-hidden="true">*</em></span></label>
        <input type="email" required aria-required="true" id="f-email" name="email" placeholder="jane@startup.com" autocomplete="off">
        <p class="fq-error">This one is required.</p>
      </div>
      <div class="fq" data-field="company">
        <label class="fq-label" for="f-company"><span class="fq-num">04</span><span>Startup / Company Name<em class="req" aria-hidden="true">*</em></span></label>
        <input type="text" required aria-required="true" id="f-company" name="company" placeholder="Acme Labs" autocomplete="off">
        <p class="fq-error">This one is required.</p>
      </div>
      <div class="fq" data-field="stage" role="radiogroup" aria-label="What stage is your startup currently at?">
        <p class="fq-label"><span class="fq-num">05</span><span>What stage is your startup currently at?<em class="req" aria-hidden="true">*</em></span></p>
        <div class="fq-opts">
          <label class="opt"><input type="radio" name="stage" value="Idea"><span>Idea</span></label>
          <label class="opt"><input type="radio" name="stage" value="MVP"><span>MVP</span></label>
          <label class="opt"><input type="radio" name="stage" value="Early Revenue"><span>Early Revenue</span></label>
          <label class="opt"><input type="radio" name="stage" value="Product-Market Fit"><span>Product-Market Fit</span></label>
          <label class="opt"><input type="radio" name="stage" value="Scaling"><span>Scaling</span></label>
        </div>
        <p class="fq-error">Pick one to continue.</p>
      </div>
      <div class="fq" data-field="raising" role="radiogroup" aria-label="Are you currently raising funds?">
        <p class="fq-label"><span class="fq-num">06</span><span>Are you currently raising funds?<em class="req" aria-hidden="true">*</em></span></p>
        <div class="fq-opts">
          <label class="opt"><input type="radio" name="raising" value="Yes, currently raising"><span>Yes, currently raising</span></label>
          <label class="opt"><input type="radio" name="raising" value="Planning to raise within 1–3 months"><span>Planning to raise within 1–3 months</span></label>
          <label class="opt"><input type="radio" name="raising" value="Planning to raise within 3–6 months"><span>Planning to raise within 3–6 months</span></label>
          <label class="opt"><input type="radio" name="raising" value="Just exploring"><span>Just exploring</span></label>
        </div>
        <p class="fq-error">Pick one to continue.</p>
      </div>
      <div class="fq" data-field="round" role="radiogroup" aria-label="Which round are you raising?">
        <p class="fq-label"><span class="fq-num">07</span><span>Which round are you raising?<em class="req" aria-hidden="true">*</em></span></p>
        <div class="fq-opts">
          <label class="opt"><input type="radio" name="round" value="Pre-Seed"><span>Pre-Seed</span></label>
          <label class="opt"><input type="radio" name="round" value="Seed"><span>Seed</span></label>
          <label class="opt"><input type="radio" name="round" value="Other"><span>Other</span></label>
        </div>
        <p class="fq-error">Pick one to continue.</p>
      </div>
      <div class="fq" data-field="amount">
        <label class="fq-label" for="f-amount"><span class="fq-num">08</span><span>How much are you looking to raise?<em class="req" aria-hidden="true">*</em></span></label>
        <input type="text" required aria-required="true" id="f-amount" name="amount" placeholder="e.g. ₹1.5 Cr" autocomplete="off">
        <p class="fq-error">This one is required.</p>
      </div>
      <div class="fq" data-field="help" role="radiogroup" aria-label="What do you need help with?">
        <p class="fq-label"><span class="fq-num">09</span><span>What do you need help with?<em class="req" aria-hidden="true">*</em> <em class="fq-hint">select all that apply</em></span></p>
        <div class="fq-opts">
          <label class="opt"><input type="checkbox" name="help" value="Pitch Deck"><span>Pitch Deck</span></label>
          <label class="opt"><input type="checkbox" name="help" value="Finding the Right Investors"><span>Finding the Right Investors</span></label>
          <label class="opt"><input type="checkbox" name="help" value="Investor Outreach"><span>Investor Outreach</span></label>
          <label class="opt"><input type="checkbox" name="help" value="Follow-ups"><span>Follow-ups</span></label>
          <label class="opt"><input type="checkbox" name="help" value="All of the Above"><span>All of the Above</span></label>
        </div>
        <p class="fq-error">Pick one to continue.</p>
      </div>
      <div class="fq" data-field="challenge" role="radiogroup" aria-label="What is your biggest fundraising challenge right now?">
        <p class="fq-label"><span class="fq-num">10</span><span>What is your biggest fundraising challenge right now?<em class="req" aria-hidden="true">*</em></span></p>
        <div class="fq-opts">
          <label class="opt"><input type="radio" name="challenge" value="Creating a strong pitch"><span>Creating a strong pitch</span></label>
          <label class="opt"><input type="radio" name="challenge" value="Finding the right investors"><span>Finding the right investors</span></label>
          <label class="opt"><input type="radio" name="challenge" value="Getting investor responses"><span>Getting investor responses</span></label>
          <label class="opt"><input type="radio" name="challenge" value="Getting investor meetings"><span>Getting investor meetings</span></label>
          <label class="opt"><input type="radio" name="challenge" value="Managing follow-ups"><span>Managing follow-ups</span></label>
          <label class="opt"><input type="radio" name="challenge" value="Not sure where to start"><span>Not sure where to start</span></label>
        </div>
        <p class="fq-error">Pick one to continue.</p>
      </div>
      <div class="fq" data-field="deck" role="radiogroup" aria-label="Do you already have a pitch deck?">
        <p class="fq-label"><span class="fq-num">11</span><span>Do you already have a pitch deck?<em class="req" aria-hidden="true">*</em></span></p>
        <div class="fq-opts">
          <label class="opt"><input type="radio" name="deck" value="Yes, and it&#x27;s ready"><span>Yes, and it&#x27;s ready</span></label>
          <label class="opt"><input type="radio" name="deck" value="Yes, but it needs improvement"><span>Yes, but it needs improvement</span></label>
          <label class="opt"><input type="radio" name="deck" value="Currently creating one"><span>Currently creating one</span></label>
          <label class="opt"><input type="radio" name="deck" value="No"><span>No</span></label>
        </div>
        <p class="fq-error">Pick one to continue.</p>
      </div>
      <div class="fq" data-field="timing" role="radiogroup" aria-label="When are you looking to get started?">
        <p class="fq-label"><span class="fq-num">12</span><span>When are you looking to get started?<em class="req" aria-hidden="true">*</em></span></p>
        <div class="fq-opts">
          <label class="opt"><input type="radio" name="timing" value="Immediately"><span>Immediately</span></label>
          <label class="opt"><input type="radio" name="timing" value="Within 1–2 weeks"><span>Within 1–2 weeks</span></label>
          <label class="opt"><input type="radio" name="timing" value="Within 1 month"><span>Within 1 month</span></label>
          <label class="opt"><input type="radio" name="timing" value="Just exploring"><span>Just exploring</span></label>
        </div>
        <p class="fq-error">Pick one to continue.</p>
      </div>
      <div class="fq" data-field="details">
        <label class="fq-label" for="f-details"><span class="fq-num">13</span><span>Any additional details you'd like to share? <em class="fq-hint">optional</em></span></label>
        <textarea id="f-details" name="details" rows="4" placeholder="Anything else we should know before we look at your raise."></textarea>
      </div>
      <div class="apply-foot">
        <button type="submit" class="apply-btn">Apply Now</button>
        <p class="apply-fail" id="applyFail">Couldn't send that — please check your connection and try again, or email pitzy.official@gmail.com.</p>
      </div>
    </form>
    <canvas class="confetti" id="applyConfetti" aria-hidden="true"></canvas>
    <div class="apply-progress" id="applyProgress" hidden role="status" aria-live="polite">
      <p class="ap-title">Submitting your application…</p>
      <p class="ap-pct"><span id="applyPct">0</span>%</p>
      <div class="ap-track"><div class="ap-fill" id="applyFill"></div></div>
      <p class="ap-note">Please don't close this window.</p>
    </div>
    <div class="modal-done" id="applyDone" hidden>
      <div class="tick"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>
      <h3>Application received.</h3>
      <p>Thanks for sharing, our team will reach out shortly. In the meantime, <strong class="done-hl">feel free to check out our brochure, shared on email. Don't forget to check your spam folder too.</strong> 😊</p>
    </div>
    </div>
  </div>
</div>
`);

  const nav = document.getElementById('nav');
  if (nav) window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 20));

  /* ===== scroll reveals — each group cascades in one by one ===== */
  const pending = Array.from(document.querySelectorAll('.reveal'));

  pending.forEach(el => {
    /* the stacked cards arrive one at a time already — a queued delay would just
       make each one lag behind the scroll */
    if (el.parentElement.classList.contains('no-stagger')) return;
    const group = Array.from(el.parentElement.children).filter(c => c.classList.contains('reveal'));
    const i = group.indexOf(el);
    if (group.length > 1 && i > 0) el.style.transitionDelay = (i * 110) + 'ms';
  });

  const pSteps = Array.from(document.querySelectorAll('#pSteps .p-step'));
  const pStepsWrap = document.getElementById('pSteps');
  let pStepsDone = false;

  function checkReveal(){
    const trigger = window.innerHeight * 0.9;

    /* `top < trigger` alone — an element jumped past by a fast scroll or an
       anchor link must still resolve, never stay stuck at opacity 0 */
    for (let i = pending.length - 1; i >= 0; i--) {
      if (pending[i].getBoundingClientRect().top < trigger) {
        pending[i].classList.add('in');
        pending.splice(i, 1);
      }
    }

    if (!pStepsDone && pStepsWrap) {
      if (pStepsWrap.getBoundingClientRect().top < trigger) {
        pStepsDone = true;
        pSteps.forEach((step, i) => setTimeout(() => step.classList.add('in'), i * 220));
      }
    }
  }
  let lastRun = 0, trailing = null;
  function onScroll(){
    const now = Date.now();
    if (now - lastRun > 100) { lastRun = now; checkReveal(); }
    else {
      clearTimeout(trailing);
      trailing = setTimeout(() => { lastRun = Date.now(); checkReveal(); }, 100);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  window.addEventListener('load', checkReveal);
  checkReveal();


  /* ===== founder application modal ===== */
  const applyModal = document.getElementById('applyModal');
  const applyForm  = document.getElementById('applyForm');
  const applyDone  = document.getElementById('applyDone');
  let lastFocused = null;
  let applySending = false;

  function openApply(e){
    if (e) e.preventDefault();
    lastFocused = document.activeElement;
    applyModal.classList.add('open');
    document.documentElement.classList.add('modal-open');
    const drawer = document.getElementById('drawer');
    if (drawer) drawer.classList.remove('open');
    const first = applyForm.querySelector('input');
    if (first) setTimeout(() => first.focus({preventScroll:true}), 60);
  }
  function closeApply(){
    // closing mid-submit would hide whether the application went through
    if (applySending) return;
    applyModal.classList.remove('open');
    document.documentElement.classList.remove('modal-open');
    if (lastFocused) lastFocused.focus({preventScroll:true});
  }

  /* every "Get Started" opens the form instead of jumping to an anchor */
  document.querySelectorAll('a').forEach(a => {
    if (a.textContent.trim().startsWith('Get Started')) a.addEventListener('click', openApply);
  });
  if (applyModal) applyModal.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeApply));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && applyModal && applyModal.classList.contains('open')) closeApply();
  });

  /* keep the pill in sync with the radio that actually owns the state */
  if (applyForm) {
  applyForm.addEventListener('change', e => {
    const input = e.target;
    if (input.type !== 'radio' && input.type !== 'checkbox') return;
    /* radios need the whole group resynced; a checkbox only toggles itself */
    const scope = input.type === 'radio'
      ? applyForm.querySelectorAll('input[name="' + input.name + '"]')
      : [input];
    scope.forEach(r => r.closest('.opt').classList.toggle('is-checked', r.checked));
    input.closest('.fq').classList.remove('has-error');
  });
  applyForm.addEventListener('input', e => {
    if (e.target.value.trim()) e.target.closest('.fq').classList.remove('has-error');
  });
  /* keep the phone field to digits so it can never be submitted with stray characters */
  const phoneField = applyForm.querySelector('input[type=tel]');
  if (phoneField) {
    phoneField.addEventListener('input', () => {
      const cleaned = phoneField.value.replace(/\D/g, '');
      if (cleaned !== phoneField.value) phoneField.value = cleaned;
    });
  }

  applyForm.addEventListener('submit', e => {
    e.preventDefault();
    let firstBad = null;
    applyForm.querySelectorAll('.fq').forEach(fq => {
      /* the textarea is the one optional answer, so it is deliberately not matched here */
      const text  = fq.querySelector('input[type=text], input[type=email], input[type=tel]');
      const picks = fq.querySelectorAll('input[type=radio], input[type=checkbox]');
      const note  = fq.querySelector('.fq-error');
      let bad = false;

      if (text) {
        const value = text.value.trim();
        if (!value) {
          bad = true;
          if (note) note.textContent = 'This one is required.';
        } else if (text.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
          bad = true;
          if (note) note.textContent = 'Enter a valid email address, like jane@startup.com.';
        } else if (text.type === 'tel' && !/^\d{7,15}$/.test(value)) {
          bad = true;
          if (note) note.textContent = 'Digits only — 7 to 15 of them, no spaces or symbols.';
        }
      } else if (picks.length) {
        bad = ![...picks].some(r => r.checked);
        if (bad && note) note.textContent = 'Pick one to continue.';
      }

      fq.classList.toggle('has-error', bad);
      if (bad && !firstBad) firstBad = fq;
    });
    if (firstBad) {
      firstBad.scrollIntoView({block:'center', behavior:'smooth'});
      const f = firstBad.querySelector('input');
      if (f) f.focus({preventScroll:true});
      return;
    }
    const btn  = applyForm.querySelector('.apply-btn');
    const fail = document.getElementById('applyFail');
    fail.classList.remove('show');

    function showThanks(){
      applyForm.hidden = true;
      document.querySelector('#applyModal .modal-head').hidden = true;
      applyDone.hidden = false;
      document.querySelector('#applyModal .modal-scroll').scrollTop = 0;
      launchConfetti();
    }

    /* short confetti burst over the thank-you screen */
    function launchConfetti(){
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const canvas = document.getElementById('applyConfetti');
      const panel  = canvas.closest('.modal-panel');
      const dpr = window.devicePixelRatio || 1;
      const w = panel.clientWidth, h = panel.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      const ctx = canvas.getContext('2d');
      ctx.scale(dpr, dpr);

      const colors = ['#ffe14d', '#1d4ed8', '#0a0f1f', '#60a5fa', '#f59e0b'];
      const pieces = Array.from({length: 140}, () => ({
        x: Math.random() * w,
        y: -20 - Math.random() * h * 0.6,
        vx: (Math.random() - 0.5) * 2.2,
        vy: 2 + Math.random() * 3,
        size: 6 + Math.random() * 6,
        rot: Math.random() * Math.PI,
        spin: (Math.random() - 0.5) * 0.25,
        wobble: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)]
      }));

      const start = performance.now();
      const duration = 4200;
      (function frame(now){
        const t = now - start;
        ctx.clearRect(0, 0, w, h);
        // fade the whole burst out over the last second
        ctx.globalAlpha = Math.max(0, Math.min(1, (duration - t) / 1000));
        pieces.forEach(p => {
          p.wobble += 0.08;
          p.x += p.vx + Math.sin(p.wobble) * 0.6;
          p.y += p.vy;
          p.rot += p.spin;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
          ctx.restore();
        });
        if (t < duration) requestAnimationFrame(frame);
        else ctx.clearRect(0, 0, w, h);
      })(start);
    }

    if (!SHEET_ENDPOINT) { showThanks(); return; }

    /* gather answers; the multi-select question collapses to one cell */
    const data = new FormData(applyForm);
    const body = new URLSearchParams();
    for (const key of new Set([...data.keys()])) {
      body.append(key, data.getAll(key).join(', '));
    }

    btn.disabled = true;
    const progress = document.getElementById('applyProgress');
    const pctText  = document.getElementById('applyPct');
    const fill     = document.getElementById('applyFill');
    const warnLeave = e => { e.preventDefault(); e.returnValue = ''; };

    let pct = 0;
    function setPct(v){
      pct = v;
      pctText.textContent = Math.round(v);
      fill.style.width = v + '%';
    }
    function endSending(){
      applySending = false;
      applyModal.classList.remove('is-sending');
      window.removeEventListener('beforeunload', warnLeave);
    }

    applySending = true;
    applyModal.classList.add('is-sending');
    window.addEventListener('beforeunload', warnLeave);
    setPct(0);
    progress.hidden = false;

    /* the real request can't report progress, so the bar eases toward 92%
       while waiting and only reaches 100% once the request has finished */
    const creep = setInterval(() => setPct(pct + (92 - pct) * 0.06), 120);

    /* Apps Script sends no CORS headers, so the response is opaque — a resolved
       promise means the POST left the browser, which is all we can observe */
    fetch(SHEET_ENDPOINT, { method:'POST', mode:'no-cors', body })
      .then(() => {
        clearInterval(creep);
        setPct(100);
        setTimeout(() => {
          progress.hidden = true;
          endSending();
          showThanks();
        }, 450);
      })
      .catch(() => {
        clearInterval(creep);
        progress.hidden = true;
        endSending();
        btn.disabled = false;
        fail.classList.add('show');
      });
  });
  }


  /* ===== Q&A accordion ===== */
  document.querySelectorAll('.qa').forEach(item => {
    const btn = item.querySelector('.qa-q');
    btn.addEventListener('click', () => {
      const isOpen = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  });

  /* ===== 3D tilt on the service cards (fine pointers only) ===== */
  const finePointer = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  const stillMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (finePointer && !stillMotion) {
    const MAX_TILT = 2.5;
    document.querySelectorAll('.what-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.setProperty('--ry', (px * MAX_TILT).toFixed(2) + 'deg');
        card.style.setProperty('--rx', (-py * MAX_TILT).toFixed(2) + 'deg');
      });
      card.addEventListener('mouseleave', () => {
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
      });
    });
  }
