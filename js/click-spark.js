/* =============================================
   CLICK SPARK — Vanilla JS HTML5 Canvas Port
   Ported from React Bits <ClickSpark /> component
   Sparks burst on every click across the site in #FF7300
   ============================================= */

(function () {
  'use strict';

  const CONFIG = {
    sparkColor: '#FF7300',
    sparkSize: 12,
    sparkRadius: 35,
    sparkCount: 10,
    duration: 450,
    extraScale: 1.2
  };

  let canvas, ctx;
  let sparks = [];
  let rafId = null;

  function easeOut(t) {
    return t * (2 - t);
  }

  function initCanvas() {
    canvas = document.createElement('canvas');
    canvas.id = 'click-spark-canvas';
    canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 99999;
      user-select: none;
    `;
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');
    resize();
  }

  function resize() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function addSparks(x, y) {
    const now = performance.now();
    for (let i = 0; i < CONFIG.sparkCount; i++) {
      const angle = (2 * Math.PI * i) / CONFIG.sparkCount + (Math.random() * 0.2 - 0.1);
      sparks.push({
        x: x,
        y: y,
        angle: angle,
        startTime: now,
        color: i % 2 === 0 ? '#FF7300' : '#FFA04D'
      });
    }
    if (!rafId) {
      rafId = requestAnimationFrame(draw);
    }
  }

  function draw(timestamp) {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    sparks = sparks.filter(spark => {
      const elapsed = timestamp - spark.startTime;
      if (elapsed >= CONFIG.duration) return false;

      const progress = elapsed / CONFIG.duration;
      const eased = easeOut(progress);

      const distance = eased * CONFIG.sparkRadius * CONFIG.extraScale;
      const lineLength = CONFIG.sparkSize * (1 - eased);

      const x1 = spark.x + distance * Math.cos(spark.angle);
      const y1 = spark.y + distance * Math.sin(spark.angle);
      const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
      const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

      ctx.strokeStyle = spark.color;
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      return true;
    });

    if (sparks.length > 0) {
      rafId = requestAnimationFrame(draw);
    } else {
      rafId = null;
    }
  }

  function handleClick(e) {
    addSparks(e.clientX, e.clientY);
  }

  function init() {
    initCanvas();
    window.addEventListener('resize', resize);
    window.addEventListener('click', handleClick, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
