/* =========================================================
   Al-Mutanabbi — app.js
   Structure: DATA → STATE → helpers → UI modules → init
   ========================================================= */
'use strict';

/* ---------- DATA ---------- */
const HERO_VERSE = ['الخيل والليل والبيداء تعرفني', 'والسيف والرمح والقرطاس والقلم'];

const TIMELINE = [
  { year: '٣٠٣ هـ / ٩١٥ م', title: 'الكوفة: الميلاد والنشأة', text: 'وُلد في كندة بالكوفة، وتلقّى الأدب واللغة، ثم خرج إلى بادية الشام وأخذ الفصاحة من أهلها.' },
  { year: '٣٢٠ هـ تقريبًا', title: 'التجوال وبدايات الشهرة', text: 'طاف بالشام يمدح ويطلب المجد، وسُجن زمنًا في اللاذقية بعد ادعاءٍ نُسب إليه، وبه لُقّب «المتنبي».' },
  { year: '٣٣٧ – ٣٤٦ هـ', title: 'حلب: العصر الذهبي مع سيف الدولة', text: 'لازم الأمير الحمداني قرابة تسع سنوات، فأنشد أروع مدائحه وقصائد الحرب، وجمعه بالأمير مجلس ضمّ كبار الأدباء.' },
  { year: '٣٤٦ هـ', title: 'مصر: كافور الإخشيدي', text: 'غادر حلب إلى مصر طامعًا في ولاية، فمدح كافورًا، ثم خاب أمله ولم ينل ما وُعد به.' },
  { year: '٣٥٠ هـ', title: 'الهروب من مصر', text: 'فرّ من مصر ليلة العيد، وقال في كافور أشدّ هجائه وأشهره.' },
  { year: '٣٥٤ هـ / ٩٦٥ م', title: 'المصير المأساوي', text: 'بعد إقامته عند عضد الدولة في شيراز، قُتل في طريق عودته قرب دير العاقول على يد فاتك الأسدي وجماعته.' }
];

const POEMS = [
  { id: 'p1', cat: 'fakhr', title: 'الخيل والليل والبيداء', note: 'مطلع شهير في الفخر', verses: [
    ['الخيل والليل والبيداء تعرفني', 'والسيف والرمح والقرطاس والقلم'],
    ['أنا الذي نظر الأعمى إلى أدبي', 'وأسمعت كلماتي من به صمم'],
    ['أنام ملء جفوني عن شواردها', 'ويسهر الخلق جراها ويختصم'] ] },
  { id: 'p2', cat: 'madh', title: 'على قدر أهل العزم', note: 'في مدح سيف الدولة', verses: [
    ['على قدر أهل العزم تأتي العزائم', 'وتأتي على قدر الكرام المكارم'],
    ['وتعظم في عين الصغير صغارها', 'وتصغر في عين العظيم العظائم'] ] },
  { id: 'p3', cat: 'madh', title: 'وقفت وما في الموت شك', note: 'في مدح سيف الدولة', verses: [
    ['وقفت وما في الموت شك لواقف', 'كأنك في جفن الردى وهو نائم'],
    ['لكل امرئ من دهره ما تعودا', 'وعادة سيف الدولة الطعن في العدا'] ] },
  { id: 'p4', cat: 'hija', title: 'عيد بأية حال عدت يا عيد', note: 'في هجاء كافور', verses: [
    ['عيد بأية حال عدت يا عيد', 'بما مضى أم لأمر فيك تجديد'],
    ['أما الأحبة فالبيداء دونهم', 'فليت دونك بيدا دونها بيد'] ] },
  { id: 'p5', cat: 'hikma', title: 'ما كل ما يتمنى المرء', note: 'من أشهر حكمه', verses: [
    ['ما كل ما يتمنى المرء يدركه', 'تجري الرياح بما لا تشتهي السفن'],
    ['إذا غامرت في شرف مروم', 'فلا تقنع بما دون النجوم'] ] },
  { id: 'p6', cat: 'hikma', title: 'إذا أنت أكرمت الكريم', note: 'حكمة في طبائع الناس', verses: [
    ['إذا أنت أكرمت الكريم ملكته', 'وإن أنت أكرمت اللئيم تمردا'],
    ['ومن يك ذا فم مر مريض', 'يجد مرا به الماء الزلالا'] ] }
];

const CATS = [['all', 'الكل'], ['fakhr', 'الفخر'], ['madh', 'المدح'], ['hija', 'الهجاء'], ['hikma', 'الحكمة']];

/* Image URLs live here so you can swap them in one place.
   Wikimedia Commons "Special:FilePath" links resolve to the original file by name.
   NOTE: verify each filename in a browser; if one fails, the card shows a monogram instead. */
const wm = f => 'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(f) + '?width=600';
const FIGURES = [
  { id: 'sayf', name: 'سيف الدولة الحمداني', tag: 'أمير حلب (٩١٦ – ٩٦٧ م)', img: wm('Sayf al-Dawla.jpg'),
    bio: 'علي بن عبد الله بن حمدان، مؤسس الإمارة الحمدانية في حلب. اشتهر بحروبه ضد الروم وبمجلسه الذي جمع الشعراء والعلماء كالفارابي وأبي فراس.',
    link: 'كان الممدوح الأكبر للمتنبي ومحور أجود شعره. ثم ساءت العلاقة بينهما بتأثير الحاسدين، فغادر المتنبي حلب سنة ٣٤٦ هـ.' },
  { id: 'kafur', name: 'كافور الإخشيدي', tag: 'حاكم مصر (نحو ٩٠٥ – ٩٦٨ م)', img: wm('Kafur al-Ikhshidi.jpg'),
    bio: 'أبو المسك كافور، بدأ غلامًا وارتقى حتى حكم مصر والشام بعد وفاة الإخشيد، وعُرف بالدهاء وحسن السياسة.',
    link: 'قصده المتنبي طمعًا في ولاية، فلم ينلها، فهرب من مصر وهجاه بقصائد من أشهر الهجاء في العربية.' },
  { id: 'adud', name: 'عضد الدولة البويهي', tag: 'أمير بويهي (٩٣٦ – ٩٨٣ م)', img: wm('Adud al-Dawla.jpg'),
    bio: 'فناخسرو، أقوى أمراء بني بويه، حكم فارس والعراق، ورعى العلماء والشعراء، وأنشأ المشاريع العمرانية الكبرى.',
    link: 'استضاف المتنبي في شيراز سنة ٣٥٤ هـ ومدحه بقصائد منها «أروع ما ذُكر». وفي عودته من عنده قُتل الشاعر.' },
  { id: 'firas', name: 'أبو فراس الحمداني', tag: 'شاعر وفارس (٩٣٢ – ٩٦٨ م)', img: wm('Abu Firas al-Hamdani.jpg'),
    bio: 'ابن عم سيف الدولة، فارس وشاعر، اشتُهرت «الروميات» التي نظمها أسيرًا لدى الروم.',
    link: 'كان منافسًا للمتنبي في بلاط حلب، وتشير الروايات إلى توتر بينهما على مكانة الشعر عند الأمير.' }
];

/* ---------- STATE (single source of truth) ---------- */
const state = { filter: 'all', query: '', openPoem: null, activeFigure: null, slide: 0 };

/* ---------- Helpers ---------- */
const $ = (s, r = document) => r.querySelector(s);
const el = (tag, cls, html) => { const n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; };
const strip = s => s.replace(/[\u064B-\u065F\u0670\u0640]/g, '').replace(/[إأآ]/g, 'ا').replace(/ى/g, 'ي').replace(/ة/g, 'ه');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Navigation + cursor ---------- */
const NavigationModule = {
  init() {
    const nav = $('#nav'), toggle = $('.nav-toggle');
    addEventListener('scroll', () => nav.classList.toggle('solid', scrollY > 40), { passive: true });
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
    nav.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
    // Active link highlighting
    const links = [...nav.querySelectorAll('.nav-links a')];
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) links.forEach(l => l.classList.toggle('active', l.hash === '#' + e.target.id));
    }), { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('.section').forEach(s => io.observe(s));
    this.cursor();
  },
  cursor() {
    if (!matchMedia('(hover:hover)').matches) return;
    const c = $('.cursor'); let x = 0, y = 0, cx = 0, cy = 0;
    addEventListener('mousemove', e => { x = e.clientX; y = e.clientY; c.classList.add('on'); });
    document.addEventListener('mouseover', e => c.classList.toggle('big', !!e.target.closest('a,button,.fig,input')));
    (function loop() { cx += (x - cx) * .18; cy += (y - cy) * .18; c.style.transform = `translate(${cx - 17}px,${cy - 17}px)`; requestAnimationFrame(loop); })();
  }
};

/* ---------- Hero: letter-by-letter blur reveal ---------- */
const HeroModule = {
  init() {
    const box = $('#heroVerse'); let delay = 500;
    HERO_VERSE.forEach(line => {
      const row = el('span', 'hemi'); box.append(row);
      [...line].forEach(ch => {
        const s = el('span', 'ch' + (ch === ' ' ? ' sp' : ''), ch === ' ' ? '&nbsp;' : ch);
        // Per-letter delay; Arabic joins stay intact because letters are inline-blocks in DOM order
        s.style.animationDelay = (reduced ? 0 : delay) + 'ms'; delay += 70; row.append(s);
      });
      delay += 350;
    });
  }
};

/* ---------- Timeline ---------- */
const TimelineModule = {
  init() {
    const list = $('#timeline');
    TIMELINE.forEach(t => list.append(el('li', 'tl-item',
      `<div class="tl-card glass"><span class="tl-year">${t.year}</span><h3>${t.title}</h3><p>${t.text}</p></div>`)));
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: .25 });
    list.querySelectorAll('.tl-item').forEach(i => io.observe(i));
  }
};

/* ---------- Poetry archive: filter, search, accordion ---------- */
const PoetryArchiveModule = {
  init() {
    const chips = $('#chips');
    CATS.forEach(([k, label]) => {
      const b = el('button', 'chip' + (k === 'all' ? ' active' : ''), label); b.dataset.k = k;
      b.addEventListener('click', () => { state.filter = k; this.render(); });
      chips.append(b);
    });
    $('#poemSearch').addEventListener('input', e => { state.query = strip(e.target.value.trim()); this.render(); });
    $('#archive').addEventListener('click', e => {
      const head = e.target.closest('.poem-head'); if (!head) return;
      const id = head.closest('.poem').dataset.id;
      state.openPoem = state.openPoem === id ? null : id; this.syncOpen();
    });
    this.render();
  },
  matches(p) {
    if (state.filter !== 'all' && p.cat !== state.filter) return false;
    if (!state.query) return true;
    return strip(p.title + ' ' + p.verses.flat().join(' ')).includes(state.query);
  },
  render() {
    const box = $('#archive'); box.innerHTML = '';
    document.querySelectorAll('.chip').forEach(c => c.classList.toggle('active', c.dataset.k === state.filter));
    const list = POEMS.filter(p => this.matches(p));
    $('#empty').hidden = list.length > 0;
    list.forEach(p => {
      const card = el('article', 'poem glass'); card.dataset.id = p.id;
      const rows = p.verses.map(([a, b]) => `<div class="verse"><span>${a}</span><span>${b}</span></div>`).join('');
      card.innerHTML = `<button class="poem-head" aria-expanded="false"><div><h3>${p.title}</h3><small>${p.note}</small></div><i></i></button>
        <div class="poem-body"><div><div class="verses">${rows}</div></div></div>`;
      box.append(card);
    });
    // Auto-open when searching so matches are visible
    if (state.query && list.length) state.openPoem = list[0].id;
    this.syncOpen();
  },
  syncOpen() {
    document.querySelectorAll('.poem').forEach(c => {
      const open = c.dataset.id === state.openPoem;
      c.classList.toggle('open', open); c.querySelector('.poem-head').setAttribute('aria-expanded', open);
    });
  }
};

/* ---------- Biography hub: 3D tilt + slider panel ---------- */
const BiographyHubModule = {
  init() {
    const hub = $('#hub');
    FIGURES.forEach(f => {
      const card = el('button', 'fig glass'); card.dataset.id = f.id;
      card.innerHTML = `<div class="fig-img"><b>${f.name.charAt(0)}</b></div>
        <div class="fig-txt"><h3>${f.name}</h3><p>${f.tag}</p></div>`;
      const img = new Image(); img.alt = f.name; img.loading = 'lazy'; img.referrerPolicy = 'no-referrer';
      img.onload = () => { const w = $('.fig-img', card); w.innerHTML = ''; w.append(img); };  // swap monogram on success only
      img.src = f.img;
      this.tilt(card); card.addEventListener('click', () => this.open(f.id));
      hub.append(card);
    });
    const panel = $('#panel');
    panel.addEventListener('click', e => { if (e.target === panel || e.target.closest('.panel-close')) this.close(); });
    panel.querySelectorAll('[data-dir]').forEach(b => b.addEventListener('click', () => this.go(+b.dataset.dir)));
    addEventListener('keydown', e => {
      if (!panel.classList.contains('open')) return;
      if (e.key === 'Escape') this.close();
      if (e.key === 'ArrowLeft') this.go(1);
      if (e.key === 'ArrowRight') this.go(-1);
    });
  },
  tilt(card) {
    if (reduced || !matchMedia('(hover:hover)').matches) return;
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect(), px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
      card.style.transform = `rotateY(${px * 16}deg) rotateX(${-py * 16}deg) translateZ(10px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  },
  open(id) {
    const f = FIGURES.find(x => x.id === id); state.activeFigure = id; state.slide = 0;
    $('#panelTitle').textContent = f.name;
    const slides = [['من هو؟', f.bio], ['صلته بالمتنبي', f.link]];
    $('#slides').innerHTML = slides.map(([h, t]) => `<div class="slide"><h4>${h}</h4><p>${t}</p></div>`).join('');
    $('#dots').innerHTML = slides.map(() => '<i></i>').join('');
    this.paint(); const p = $('#panel'); p.classList.add('open'); p.setAttribute('aria-hidden', 'false');
    $('.panel-close').focus();
  },
  go(dir) { const n = $('#slides').children.length; state.slide = (state.slide + dir + n) % n; this.paint(); },
  paint() {
    [...$('#slides').children].forEach((s, i) => s.classList.toggle('on', i === state.slide));
    [...$('#dots').children].forEach((d, i) => d.classList.toggle('on', i === state.slide));
  },
  close() { const p = $('#panel'); p.classList.remove('open'); p.setAttribute('aria-hidden', 'true'); state.activeFigure = null; }
};

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
  [NavigationModule, HeroModule, TimelineModule, PoetryArchiveModule, BiographyHubModule].forEach(m => m.init());
});
