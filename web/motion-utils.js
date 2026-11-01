export function normalizeDuration(value, effect) {
  const duration = Number(value);
  const bounded = Number.isFinite(duration) ? Math.min(1800, Math.max(300, duration)) : 800;
  return effect?.name === 'flash' ? Math.max(1200, bounded) : bounded;
}

export function filterMotion(catalog, { query = '', library = 'all', group = 'all', featured = false } = {}) {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  return catalog.effects.filter(effect =>
    (library === 'all' || effect.library === library) &&
    (group === 'all' || effect.group === group || effect.kind === group) &&
    (!featured || effect.featured) &&
    terms.every(term => `${effect.name} ${effect.zh} ${effect.description} ${effect.scene} ${effect.kind} ${effect.library} ${effect.name.startsWith('fadeIn') ? '淡入' : effect.name.startsWith('fadeOut') ? '淡出' : ''}`.toLowerCase().includes(term)));
}

export function composeMotionPrompt(effect, durationMs = 800) {
  const duration = normalizeDuration(durationMs, effect);
  const reference = effect.library === 'animate' ? `Animate.css 4.1.1 的 ${effect.name}；准确类名：${effect.className}` : `GSAP 3.15.0 的 ${effect.name}；这是API/概念演示，不是官方预设效果名`;
  return [
    `请为 {{目标组件与触发操作}} 实现“${effect.zh}”动效，融入项目现有设计系统。`,
    `参考：${reference}。`,
    `动作含义：${effect.description}`,
    `适用目的：${effect.scene}`,
    `设计注意：${effect.caution}`,
    `当前教学演示时长参数为 ${duration}ms；实际项目结合位移距离、用户任务与现有规范调整，不能把演示参数当成库默认值或通用标准。`,
    '先阅读现有组件与状态，再确定初始、进行中和结束状态；区分入场、离场、强调与布局变化。',
    '支持连续操作与中断，从当前状态自然衔接；不因播放而锁住正常操作，不重复强制挂载。',
    '优先评估transform/opacity，避免意外布局位移、整页闪烁、无目的循环；结束与DOM卸载、焦点和点击命中保持一致。',
    '尊重prefers-reduced-motion；减少动态效果时保留必要信息与操作。退出或切换组件时回收补间、时间线、滚动触发器和监听。',
    '验收普通操作、快速重复、取消/退出、慢设备和减少动态效果；区分已实测与待验证，不编造流畅性或性能结论。',
    `第一方参考：${effect.source}`,
  ].join('\n\n');
}

export function motionCode(effect, durationMs = 800) {
  if (effect.library === 'animate') return `<div class="${effect.className}" style="animation-duration: ${normalizeDuration(durationMs, effect)}ms">\n  示例内容\n</div>`;
  return effect.code;
}
