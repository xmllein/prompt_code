let enginePromise;
let animateStylesPromise;
const pluginPromises = new Map();

export function loadAnimateStyles() {
  animateStylesPromise ||= new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = new URL('./vendor/animate.min.css', import.meta.url).href;
    link.onload = resolve;
    link.onerror = () => { link.remove(); reject(new Error('Animate.css is unavailable')); };
    document.head.append(link);
  }).catch(error => { animateStylesPromise = undefined; throw error; });
  return animateStylesPromise;
}

// The official minified browser builds are UMD scripts, not strict ESM modules.
// Load them as classic scripts so their browser-global initialization is valid.
function loadClassic(relative) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = new URL(relative, import.meta.url).href;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => { script.remove(); reject(new Error(`Failed to load ${relative}`)); };
    document.head.append(script);
  });
}

async function loadEngine(demo) {
  enginePromise ||= (async () => {
    await loadClassic('./vendor/gsap.min.js');
    if (!window.gsap) throw new Error('GSAP resource is unavailable');
    return window.gsap;
  })().catch(error => { enginePromise = undefined; throw error; });
  const gsap = await enginePromise;
  const plugin = ['scrollTrigger', 'scrub', 'pin'].includes(demo) ? 'ScrollTrigger' : demo === 'flip' ? 'Flip' : null;
  if (plugin) {
    if (!pluginPromises.has(plugin)) {
      const resource = plugin === 'Flip' ? './vendor/Flip.min.js' : './vendor/ScrollTrigger.min.js';
      pluginPromises.set(plugin, loadClassic(resource).then(() => {
        if (!window[plugin]) throw new Error(`${plugin} resource is unavailable`);
        gsap.registerPlugin(window[plugin]);
      }).catch(error => { pluginPromises.delete(plugin); throw error; }));
    }
    await pluginPromises.get(plugin);
  }
  return { gsap, ScrollTrigger: window.ScrollTrigger, Flip: window.Flip };
}

export function createVisual(effect) {
  const content = document.createElement('div');
  const box = (letter = 'A') => { const node = document.createElement('span'); node.className = 'demo-object'; node.textContent = letter; node.setAttribute('aria-hidden', 'true'); return node; };
  if (effect.library === 'animate' || ['tween', 'to', 'from', 'fromTo', 'repeat', 'yoyo', 'overwrite', 'playback'].includes(effect.demo)) {
    content.className = 'demo-single';
    content.append(box());
    if (effect.demo === 'overwrite' || effect.demo === 'playback') {
      const controls = document.createElement('div'); controls.className = 'playback-controls';
      const labels = effect.demo === 'overwrite' ? [['left', '← 左移'], ['right', '右移 →']] : [['pause', '暂停 / 继续'], ['reverse', '倒放']];
      for (const [action, label] of labels) { const button = document.createElement('button'); button.textContent = label; button.dataset.control = action; button.disabled = true; controls.append(button); }
      if (effect.demo === 'playback') { const range = document.createElement('input'); range.type = 'range'; range.min = 0; range.max = 100; range.step = 1; range.value = 0; range.disabled = true; range.dataset.control = 'progress'; range.setAttribute('aria-label', '时间线播放进度'); controls.append(range); }
      content.append(controls);
    }
  } else if (['timeline', 'stagger'].includes(effect.demo)) {
    content.className = 'demo-items';
    for (let i = 0; i < (effect.demo === 'stagger' ? 5 : 3); i++) content.append(box(String(i + 1)));
  } else if (['ease', 'position'].includes(effect.demo)) {
    content.className = effect.demo === 'ease' ? 'ease-lanes' : 'position-lanes';
    const labels = effect.demo === 'ease' ? ['none', 'power2.out', 'back.out', 'elastic.out'] : ['intro', 'intro+=0.2'];
    for (const text of labels) { const lane = document.createElement('div'); lane.className = 'demo-lane'; const label = document.createElement('span'); label.textContent = text; lane.append(label, box('')); content.append(lane); }
  } else if (effect.demo === 'flip') {
    content.className = 'demo-layout';
    for (let i = 0; i < 4; i++) content.append(box(String(i + 1)));
  } else {
    content.className = 'motion-scroll'; content.tabIndex = 0; content.setAttribute('aria-label', `${effect.name} 局部滚动演示区`);
    const runway = document.createElement('div'); runway.className = `scroll-runway ${effect.demo === 'scrub' ? 'linked-scroll' : effect.demo === 'pin' ? 'pinned-scroll' : ''}`;
    const hint = document.createElement('p'); hint.className = 'scroll-hint'; hint.textContent = '先点击播放，再在此区域滚动 ↓';
    const end = document.createElement('span'); end.className = 'scroll-end'; end.textContent = '滚动范围结束';
    runway.append(hint, box(), end); content.append(runway);
  }
  return content;
}

export async function playGsap({ effect, stage, duration, onComplete, isCurrent, signal }) {
  const { gsap, ScrollTrigger, Flip } = await loadEngine(effect.demo);
  if (!isCurrent() || signal.aborted) return null;
  const targets = [...stage.querySelectorAll('.demo-object')];
  const target = targets[0];
  const d = duration / 1000;
  const distance = Math.min(80, stage.clientWidth * 0.24);
  let animation;
  const complete = () => { if (isCurrent()) onComplete(); };
  const context = gsap.context(() => {
    switch (effect.demo) {
      case 'tween': animation = gsap.fromTo(target, { x: -distance, scale: 0.7 }, { x: distance, scale: 1, rotation: 90, duration: d, ease: 'power2.inOut', onComplete: complete }); break;
      case 'to': animation = gsap.to(target, { x: distance, duration: d, ease: 'power2.out', onComplete: complete }); break;
      case 'from': animation = gsap.from(target, { y: 35, opacity: 0, duration: d, ease: 'power2.out', onComplete: complete }); break;
      case 'fromTo': animation = gsap.fromTo(target, { x: -distance, opacity: 0.25 }, { x: distance, opacity: 1, duration: d, ease: 'power2.inOut', onComplete: complete }); break;
      case 'timeline':
        animation = gsap.timeline({ onComplete: complete });
        targets.forEach(item => animation.from(item, { y: 25, opacity: 0, duration: d / 2.2, ease: 'power2.out' }));
        break;
      case 'position':
        animation = gsap.timeline({ onComplete: complete }).addLabel('intro');
        animation.to(targets[0], { x: distance, duration: d, ease: 'power2.inOut' }, 'intro').to(targets[1], { x: distance, duration: d, ease: 'power2.inOut' }, 'intro+=0.2');
        break;
      case 'ease':
        animation = gsap.timeline({ onComplete: complete });
        ['none', 'power2.out', 'back.out(1.7)', 'elastic.out(1,0.35)'].forEach((ease, i) => animation.to(targets[i], { x: distance, duration: d, ease }, 0));
        break;
      case 'stagger': animation = gsap.from(targets, { y: 28, opacity: 0, duration: d * 0.65, stagger: d * 0.12, ease: 'power2.out', onComplete: complete }); break;
      case 'repeat': animation = gsap.to(target, { x: distance, duration: d, repeat: 2, ease: 'power1.inOut', onComplete: complete }); break;
      case 'yoyo': animation = gsap.to(target, { x: distance, duration: d, repeat: 1, yoyo: true, ease: 'power2.inOut', onComplete: complete }); break;
      case 'overwrite': {
        animation = gsap.to(target, { x: distance, duration: d, overwrite: 'auto', ease: 'power2.out', onComplete: complete });
        stage.querySelectorAll('[data-control]').forEach(button => {
          button.disabled = false;
          button.addEventListener('click', () => context.add(() => gsap.to(target, { x: button.dataset.control === 'left' ? -distance : distance, duration: d, overwrite: 'auto', ease: 'power2.out', onComplete: complete })), { signal });
        });
        break;
      }
      case 'playback': {
        const progress = stage.querySelector('[data-control="progress"]');
        animation = gsap.timeline({ paused: true, onComplete: complete, onUpdate: () => { progress.value = Math.round(animation.progress() * 100); } });
        animation.to(target, { x: distance, duration: d, ease: 'power2.inOut' }).to(target, { rotation: 180, duration: d * 0.65 });
        stage.querySelectorAll('[data-control]').forEach(control => { control.disabled = false; });
        stage.querySelector('[data-control="pause"]').addEventListener('click', () => animation.paused(!animation.paused()), { signal });
        stage.querySelector('[data-control="reverse"]').addEventListener('click', () => animation.reverse(), { signal });
        progress.addEventListener('input', () => animation.pause().progress(Number(progress.value) / 100), { signal });
        animation.play();
        break;
      }
      case 'scrollTrigger': {
        const scroller = stage.querySelector('.motion-scroll');
        animation = gsap.from(target, { opacity: 0, y: 24, duration: d, ease: 'power2.out', onComplete: complete, scrollTrigger: { trigger: target, scroller, start: 'top 85%', toggleActions: 'play none none reverse' } });
        break;
      }
      case 'scrub': {
        const scroller = stage.querySelector('.motion-scroll');
        animation = gsap.to(target, { x: distance, rotation: 180, ease: 'none', scrollTrigger: { trigger: stage.querySelector('.scroll-runway'), scroller, start: 'top top', end: 'bottom bottom', scrub: true } });
        break;
      }
      case 'pin': {
        ScrollTrigger.create({ trigger: target, scroller: stage.querySelector('.motion-scroll'), start: 'top top+=45', end: '+=180', pin: true, pinSpacing: false });
        break;
      }
      case 'flip': {
        const before = Flip.getState(targets);
        const grid = stage.querySelector('.demo-layout');
        grid.classList.toggle('is-grid'); grid.prepend(grid.lastElementChild);
        animation = Flip.from(before, { duration: d, ease: 'power2.inOut', absolute: true, onComplete: complete });
        break;
      }
      default: throw new Error(`Unknown GSAP demo: ${effect.demo}`);
    }
  }, stage);
  return { cleanup: () => context.revert(), animation };
}
