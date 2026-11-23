/*
 * 光源宇宙 · 全站共享脚本
 * Header / Footer 单一数据源；文案渲染；轮播；移动菜单；滚动淡入
 * 纯原生 JS，无构建、无依赖，file:// 双击与 GitHub Pages 均可运行
 */
(function () {
  'use strict';

  /* ---------- 内联图标 ---------- */
  const ICON = {
    butterfly: `<svg viewBox="0 0 32 32" aria-hidden="true" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 13.6C13.4 9 8.4 6.4 5.8 9.1 3.2 11.8 6 16 10.3 16.6 6.5 18 4.8 21.8 7.2 24c2.4 2.2 6.2-.3 8.8-4.5" fill="#C9B2E2"/>
      <path d="M16 13.6c2.6-4.6 7.6-7.2 10.2-4.5 2.6 2.7-.2 6.9-4.5 7.5 3.8 1.4 5.5 5.2 3.1 7.4-2.4 2.2-6.2-.3-8.8-4.5" fill="#DCC6EA"/>
      <path d="M16 10.8v11.4M16 10.8c-1.2-1.8-2.8-2.6-3.6-2M16 10.8c1.2-1.8 2.8-2.6 3.6-2" stroke="#9E82C4" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`,
    leaf: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10Z"/><path d="M2 21c0-3 1.9-5.4 5.1-6C9.5 14.5 12 13 13 12"/></svg>`,
    search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>`,
    menu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>`,
    close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>`,
    chevronLeft: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>`,
    chevronRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>`,
    photo: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="m4 17 5-5 4 4 3-3 4 4"/></svg>`,
    flower: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="2.2"/><path d="M12 9.8C10 6 13 3.5 14.5 5.5c1.2 1.6-.6 3.6-2.5 4.3M14.2 12c3.8-2 6.3 1 4.3 2.5-1.6 1.2-3.6-.6-4.3-2.5M12 14.2c2 3.8-1 6.3-2.5 4.3-1.2-1.6.6-3.6 2.5-4.3M9.8 12c-3.8 2-6.3-1-4.3-2.5 1.6-1.2 3.6.6 4.3 2.5"/></svg>`
  };

  const NAV = [
    { path: 'index.html', key: 'nav.home' },
    { path: 'about.html', key: 'nav.about' },
    { path: 'courses.html', key: 'nav.courses' },
    { path: 'therapies.html', key: 'nav.therapies' },
    { path: 'events.html', key: 'nav.events' },
    { path: 'contact.html', key: 'nav.contact' }
  ];

  const LANG = 'zh-cn';
  const dict = () => window.I18N[LANG] || {};
  const t = key => dict()[key] || key;

  function currentPage() {
    const f = location.pathname.split('/').pop().toLowerCase();
    return f === '' || f === 'index.html' ? 'index.html' : f;
  }

  /* ---------- 共享 Header ---------- */
  function renderHeader() {
    document.querySelectorAll('.skip-link, .site-header').forEach(el => el.remove());
    const page = currentPage();

    const desktopLinks = NAV.map(item => {
      const active = item.path === page ? ' aria-current="page"' : '';
      return `<a class="nav-link" href="${item.path}"${active} data-i18n="${item.key}">${t(item.key)}</a>`;
    }).join('');

    const drawerLinks = NAV.map(item => {
      const active = item.path === page ? ' aria-current="page"' : '';
      return `<a href="${item.path}"${active} data-i18n="${item.key}">${t(item.key)}</a>`;
    }).join('');

    const html = `
      <a class="skip-link" href="#main">跳到主要内容</a>
      <header class="site-header">
        <div class="header-inner">
          <a class="brand" href="index.html" aria-label="${t('brand.name')}">
            <img class="brand-logo" src="assets/images/logo-butterfly.png" alt="" width="1920" height="1920">
            <span class="brand-name" data-i18n="brand.name">${t('brand.name')}</span>
            <span class="brand-sub" data-i18n="brand.sub">${t('brand.sub')}</span>
          </a>
          <nav class="nav-desktop" aria-label="主导航">${desktopLinks}</nav>
          <div class="header-tools">
            <button class="icon-btn" type="button" aria-label="${t('nav.search')}" data-i18n-aria="nav.search">${ICON.search}</button>
            <button class="icon-btn menu-toggle" type="button" aria-label="${t('nav.menu')}" aria-expanded="false" data-i18n-aria="nav.menu">${ICON.menu}</button>
          </div>
        </div>
        <nav class="mobile-drawer" aria-label="移动端导航">${drawerLinks}</nav>
      </header>`;

    document.body.insertAdjacentHTML('afterbegin', html);
  }

  /* ---------- 共享 Footer ---------- */
  function renderFooter() {
    document.querySelectorAll('.site-footer').forEach(el => el.remove());
    const html = `
      <footer class="site-footer">
        <div class="footer-inner">
          <div class="footer-brand">
            <img class="footer-logo" src="assets/images/logo-butterfly.png" alt="" width="1920" height="1920">
            <span class="brand-name" data-i18n="brand.name">${t('brand.name')}</span>
            <span class="footer-tag" data-i18n="footer.tag">${t('footer.tag')}</span>
          </div>
          <nav class="footer-nav" aria-label="页脚导航">
            <a href="disclaimer.html" data-i18n="footer.disclaimer">${t('footer.disclaimer')}</a>
            <a href="privacy.html" data-i18n="footer.privacy">${t('footer.privacy')}</a>
            <a href="https://www.instagram.com/yuanyu_shi0624" target="_blank" rel="noopener noreferrer" data-i18n="footer.ins">${t('footer.ins')}</a>
          </nav>
          <span class="footer-slogan" data-i18n="footer.slogan">${t('footer.slogan')}</span>
        </div>
        <div class="footer-contact" aria-label="联系方式">
          <a class="fcontact" href="mailto:472826634@qq.com">
            <span class="fcontact-name" data-i18n="footer.contact.email">${t('footer.contact.email')}</span>
            <span class="fcontact-id">472826634@qq.com</span>
          </a>
          <a class="fcontact" href="https://wa.me/8618998732803" target="_blank" rel="noopener noreferrer">
            <span class="fcontact-name" data-i18n="footer.contact.whatsapp">${t('footer.contact.whatsapp')}</span>
            <span class="fcontact-id">+86 18998732803</span>
          </a>
          <button class="fcontact" type="button" data-copy-id="huayitaluo" title="${t('contact.copy') || '复制'}">
            <span class="fcontact-name" data-i18n="footer.contact.wechat">${t('footer.contact.wechat')}</span>
            <span class="fcontact-id">huayitaluo</span>
          </button>
          <button class="fcontact" type="button" data-copy-id="yuanyu shi（小蝴蝶）" title="${t('contact.copy') || '复制'}">
            <span class="fcontact-name" data-i18n="footer.contact.facebook">${t('footer.contact.facebook')}</span>
            <span class="fcontact-id">yuanyu shi（小蝴蝶）</span>
          </button>
        </div>
      </footer>`;
    document.body.insertAdjacentHTML('beforeend', html);
  }

  /* ---------- 富文本渲染：\n 分段、**重点** 加粗 ---------- */
  function richHTML(text) {
    const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return String(text).split('\n').map(line => {
      const safe = esc(line).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
      return '<p>' + safe + '</p>';
    }).join('');
  }

  /* ---------- 应用文案 ---------- */
  function applyI18n() {
    const d = dict();
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const v = d[el.getAttribute('data-i18n')];
      if (v !== undefined) el.textContent = v;
    });
    document.querySelectorAll('[data-i18n-rich]').forEach(el => {
      const v = d[el.getAttribute('data-i18n-rich')];
      if (v !== undefined) el.innerHTML = richHTML(v);
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const v = d[el.getAttribute('data-i18n-aria')];
      if (v !== undefined) el.setAttribute('aria-label', v);
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const v = d[el.getAttribute('data-i18n-ph')];
      if (v !== undefined) el.setAttribute('placeholder', v);
    });
    document.documentElement.lang = LANG;
    splitHeroTitle(); // 文案填入后重新逐字拆分
  }

  /* ---------- 首屏标题逐字拆分 ---------- */
  function splitHeroTitle() {
    document.querySelectorAll('[data-hero-split]').forEach(el => {
      const chars = Array.from(el.textContent);
      el.textContent = '';
      chars.forEach((ch, i) => {
        const span = document.createElement('span');
        span.className = 'hero-char';
        span.textContent = ch === ' ' ? '\u00A0' : ch;
        span.style.setProperty('--char-delay', (i * 0.075).toFixed(3) + 's');
        el.appendChild(span);
      });
    });
  }

  /* ---------- 移动菜单 ---------- */
  function bindMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const drawer = document.querySelector('.mobile-drawer');
    if (!toggle || !drawer) return;
    toggle.addEventListener('click', () => {
      const open = drawer.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.innerHTML = open ? ICON.close : ICON.menu;
    });
    drawer.addEventListener('click', e => {
      if (e.target.closest('a')) {
        drawer.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = ICON.menu;
      }
    });
  }

  /* ---------- 轮播（每组 3 张，按组翻页） ---------- */
  function bindCarousels() {
    document.querySelectorAll('.carousel').forEach(carousel => {
      const track = carousel.querySelector('.carousel-track');
      const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
      if (!track || slides.length === 0) return;

      // 每屏张数可由 data-per-view 指定（默认 3），向下兼容首页既有轮播
      const perView = Math.max(1, parseInt(carousel.dataset.perView, 10) || 3);
      const starts = slides.filter(s => s.classList.contains('group-start'));
      const groupStarts = starts.length ? starts : slides.filter((_, i) => i % perView === 0);
      const groupCount = groupStarts.length;
      const unit = perView === 1 ? '张' : '组';

      const dotsWrap = carousel.querySelector('.dots');
      if (dotsWrap) {
        dotsWrap.innerHTML = '';
        groupStarts.forEach((_, i) => {
          const b = document.createElement('button');
          b.type = 'button';
          b.className = 'dot' + (i === 0 ? ' active' : '');
          b.setAttribute('aria-label', `第 ${i + 1} ${unit}`);
          b.addEventListener('click', () => go(i));
          dotsWrap.appendChild(b);
        });
      }
      const dots = () => Array.from(carousel.querySelectorAll('.dot'));

      function go(group) {
        const g = Math.max(0, Math.min(group, groupCount - 1));
        const target = groupStarts[g];
        track.scrollTo({ left: target.offsetLeft - slides[0].offsetLeft, behavior: 'smooth' });
        dots().forEach((d, n) => d.classList.toggle('active', n === g));
      }
      function current() {
        let best = 0, dist = Infinity;
        groupStarts.forEach((s, i) => {
          const d = Math.abs(s.offsetLeft - slides[0].offsetLeft - track.scrollLeft);
          if (d < dist) { dist = d; best = i; }
        });
        return best;
      }

      const prev = carousel.querySelector('.carousel-nav.prev');
      const next = carousel.querySelector('.carousel-nav.next');
      if (prev) prev.addEventListener('click', () => go(current() - 1));
      if (next) next.addEventListener('click', () => go(current() + 1));

      track.addEventListener('scroll', () => {
        const i = current();
        dots().forEach((d, n) => d.classList.toggle('active', n === i));
      }, { passive: true });

      let timer = null;
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const autoplay = carousel.dataset.autoplay !== 'false'; // data-autoplay="false" 可关闭
      if (!reduce && autoplay && groupCount > 1) {
        timer = setInterval(() => {
          if (document.hidden) return;
          go((current() + 1) % groupCount);
        }, 5200);
        carousel.addEventListener('mouseenter', () => clearInterval(timer));
        carousel.addEventListener('focusin', () => clearInterval(timer));
      }
    });
  }

  /* ---------- 工作室详情毛玻璃弹窗 ---------- */
  function bindStudioModal() {
    const modal = document.getElementById('studioModal');
    if (!modal) return;
    const openBtn = document.querySelector('.studio-detail-btn');
    const closeEls = modal.querySelectorAll('[data-modal-close]');
    const dialog = modal.querySelector('.studio-modal-dialog');
    let lastFocus = null;

    function open() {
      lastFocus = document.activeElement;
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      const closeBtn = modal.querySelector('.studio-modal-close');
      if (closeBtn) closeBtn.focus();
    }
    function close() {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    if (openBtn) openBtn.addEventListener('click', open);
    closeEls.forEach(el => el.addEventListener('click', close));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && modal.classList.contains('open')) close();
    });
    // 点击对话框外部（遮罩）关闭
    modal.addEventListener('click', e => {
      if (e.target === modal) close();
    });
    if (dialog) dialog.addEventListener('click', e => e.stopPropagation());
  }

  /* ---------- 证书大图灯箱（关于页资质区） ---------- */
  function bindCertLightbox() {
    const box = document.getElementById('certLightbox');
    if (!box) return;
    const img = box.querySelector('.cert-lb-img');
    const caption = box.querySelector('.cert-lb-caption');
    const thumbs = Array.from(document.querySelectorAll('.cert-thumb'));
    if (!img || !thumbs.length) return;
    let current = 0;
    let lastFocus = null;

    function show(i) {
      current = (i + thumbs.length) % thumbs.length;
      const btn = thumbs[current];
      const full = btn.getAttribute('data-full');
      img.src = full;
      img.alt = btn.getAttribute('aria-label') || '证书大图';
      caption.textContent = btn.getAttribute('data-title') || '';
    }
    function open(i) {
      lastFocus = document.activeElement;
      show(i);
      box.classList.add('open');
      box.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      const closeBtn = box.querySelector('[data-cert-close]');
      if (closeBtn) closeBtn.focus();
    }
    function close() {
      box.classList.remove('open');
      box.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    thumbs.forEach((btn, i) => btn.addEventListener('click', () => open(i)));
    const closeBtn = box.querySelector('[data-cert-close]');
    const prevBtn = box.querySelector('[data-cert-prev]');
    const nextBtn = box.querySelector('[data-cert-next]');
    if (closeBtn) closeBtn.addEventListener('click', close);
    if (prevBtn) prevBtn.addEventListener('click', () => show(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => show(current + 1));
    // 点击遮罩关闭（点在图片/说明之外）
    box.addEventListener('click', e => {
      if (e.target === box || e.target.classList.contains('cert-lb-figure')) close();
    });
    // 键盘：左右切换、ESC 关闭（仅灯箱打开时生效）
    document.addEventListener('keydown', e => {
      if (!box.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') show(current - 1);
      else if (e.key === 'ArrowRight') show(current + 1);
    });
  }

  /* ---------- 头像锁定：禁止右键保存 / 拖拽 / 选中 ---------- */
  function bindAvatarLock() {
    document.querySelectorAll('.avatar-locked').forEach(el => {
      el.addEventListener('contextmenu', e => e.preventDefault());
      el.addEventListener('dragstart', e => e.preventDefault());
      el.addEventListener('selectstart', e => e.preventDefault());
    });
  }

  /* ---------- 法律条款：标签跳转 + 滚动高亮 ---------- */
  function bindLegalNav() {
    const nav = document.querySelector('.legal-nav');
    if (!nav) return;
    const links = Array.from(nav.querySelectorAll('[data-jump]'));
    const clauses = links
      .map(a => document.getElementById(a.dataset.jump))
      .filter(Boolean);
    if (!links.length || !clauses.length) return;

    let activeId = clauses[0].id;
    function highlight(id) {
      if (id === activeId) return;
      activeId = id;
      links.forEach(a => a.classList.toggle('active', a.dataset.jump === id));
    }
    function openClause(clause) {
      if (!clause) return;
      const body = clause.querySelector('.legal-body');
      const btn = clause.querySelector('.legal-toggle');
      if (body) body.hidden = false;
      if (btn) btn.setAttribute('aria-expanded', 'true');
      clause.classList.add('is-open');
    }

    // 条款标题点击展开 / 收起
    clauses.forEach(c => {
      const btn = c.querySelector('.legal-toggle');
      if (!btn) return;
      btn.addEventListener('click', () => {
        const body = c.querySelector('.legal-body');
        if (!body) return;
        const willOpen = body.hidden;
        body.hidden = !willOpen;
        btn.setAttribute('aria-expanded', String(willOpen));
        c.classList.toggle('is-open', willOpen);
      });
    });

    links.forEach(a => {
      a.addEventListener('click', e => {
        const target = document.getElementById(a.dataset.jump);
        if (!target) return;
        e.preventDefault();
        openClause(target); // 跳转时自动展开对应条款
        highlight(a.dataset.jump);
        history.replaceState(null, '', '#' + a.dataset.jump);
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      });
    });

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(entries => {
        const visible = entries
          .filter(en => en.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length) highlight(visible[0].target.id);
      }, { rootMargin: '-25% 0px -60% 0px', threshold: 0 });
      clauses.forEach(c => io.observe(c));
    }

    // 带 #hash 进入时定位到对应条款
    if (location.hash) {
      const id = decodeURIComponent(location.hash.slice(1));
      const target = document.getElementById(id);
      if (target && links.some(a => a.dataset.jump === id)) {
        openClause(target);
        highlight(id);
        requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }));
      }
    }
  }

  /* ---------- 联系页：表单（mailto 提交）+ 微信号复制 ---------- */
  function bindContactForm() {
    const form = document.getElementById('booking-form');
    if (form) {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const status = document.getElementById('form-status');
        const fd = new FormData(form);
        const v = k => (fd.get(k) || '').toString().trim();
        const name = v('name'), contact = v('contact');
        if (!name || !contact) return;
        const lines = [
          '称呼：' + name,
          '联系方式：' + contact,
          '咨询类型：' + v('type'),
          '方便联系时间：' + v('time'),
          '',
          '— 预约前问卷 —',
          '感兴趣的课程 / 疗法：' + v('interest'),
          '相关经验：' + v('experience'),
          '希望时间：' + v('hope'),
          '想解决的问题：' + v('problem'),
          '补充说明：' + v('note'),
        ];
        const subject = '【光源宇宙】预约咨询 · ' + name;
        const body = lines.join('\n');
        if (status) {
          status.textContent = dict()['contact.sending'] || '正在打开邮件客户端，请在邮件中点击发送即可完成预约。';
        }
        window.location.href = 'mailto:472826634@qq.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      });
    }
    const copyBtn = document.getElementById('wechat-copy');
    const wechatId = document.getElementById('wechat-id');
    if (copyBtn && wechatId) {
      copyBtn.addEventListener('click', e => {
        e.preventDefault();
        const id = wechatId.textContent.trim();
        const done = () => {
          const label = copyBtn.querySelector('.cm-copy');
          if (!label) return;
          const old = label.textContent;
          label.textContent = dict()['contact.copied'] || '已复制';
          setTimeout(() => { label.textContent = old; }, 1600);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(id).then(done).catch(() => fallbackCopy(id, done));
        } else {
          fallbackCopy(id, done);
        }
      });
    }
    // 通用复制：任意带 data-copy-id 的元素，点击复制其 ID（页脚微信等）
    document.querySelectorAll('[data-copy-id]').forEach(btn => {
      if (btn.id === 'wechat-copy') return; // 联系页已有专门绑定，避免重复
      btn.addEventListener('click', e => {
        e.preventDefault();
        const id = btn.getAttribute('data-copy-id');
        const label = btn.querySelector('.fcontact-id, .social-id');
        const done = () => {
          if (!label) return;
          const old = label.textContent;
          label.textContent = dict()['contact.copied'] || '已复制';
          setTimeout(() => { label.textContent = old; }, 1600);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(id).then(done).catch(() => fallbackCopy(id, done));
        } else {
          fallbackCopy(id, done);
        }
      });
    });
    // 社交媒体占位：暂无真实账号，阻止 # 跳转（填入真实 href 后可移除此段）
    document.querySelectorAll('[data-social-placeholder]').forEach(a => {
      a.addEventListener('click', e => { e.preventDefault(); });
    });
  }
  function fallbackCopy(text, done) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); done(); } catch (_) {}
    document.body.removeChild(ta);
  }

  /* ---------- 滚动淡入 ---------- */
  function bindReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;
    if (!('IntersectionObserver' in window)) {
      items.forEach(el => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(el => io.observe(el));
  }

  /* ---------- 全站星球装饰：与首页同一套设计，注入到内页页头与底部 CTA ---------- */
  function injectCosmos() {
    // 内页页头 .page-hero：紧凑版星轨 + 光点 + 环绕小星球 + 光晕星球
    const heroMarkup =
      '<div class="page-cosmos" aria-hidden="true">' +
        '<span class="cosmos-orbit cosmos-orbit-a"></span>' +
        '<span class="cosmos-orbit cosmos-orbit-b"></span>' +
        '<span class="cosmos-star cosmos-star-1"></span>' +
        '<span class="cosmos-star cosmos-star-2"></span>' +
        '<span class="cosmos-star cosmos-star-3"></span>' +
        '<span class="cosmos-star cosmos-star-4"></span>' +
        '<span class="cosmos-star cosmos-star-5"></span>' +
        '<span class="cosmos-star cosmos-star-6"></span>' +
        '<span class="cosmos-mini cosmos-mini-1"></span>' +
        '<span class="cosmos-mini cosmos-mini-2"></span>' +
        '<span class="cosmos-mini cosmos-mini-3"></span>' +
        '<span class="hero-orb"><span class="orb-glow"></span><span class="orb-core"></span><span class="orb-ring"></span><span class="orb-satellite"></span></span>' +
      '</div>';
    document.querySelectorAll('.page-hero').forEach(hero => {
      if (hero.querySelector('.page-cosmos')) return;
      hero.insertAdjacentHTML('afterbegin', heroMarkup);
    });

    // 底部 CTA：补齐与首页一致的星尘 + 小星球（首页 HTML 已自带，故仅补缺失的）
    const ctaMarkup =
      '<div class="cta-decor" aria-hidden="true">' +
        '<span class="cta-stardust cta-dust-1"></span>' +
        '<span class="cta-stardust cta-dust-2"></span>' +
        '<span class="cta-stardust cta-dust-3"></span>' +
        '<span class="cta-stardust cta-dust-4"></span>' +
        '<span class="cta-mini cta-mini-1"></span>' +
        '<span class="cta-mini cta-mini-2"></span>' +
      '</div>';
    document.querySelectorAll('.cta-banner').forEach(banner => {
      if (banner.querySelector('.cta-decor')) return;
      banner.insertAdjacentHTML('afterbegin', ctaMarkup);
    });
  }

  /* ---------- 启动 ---------- */
  function init() {
    renderHeader();
    renderFooter();
    injectCosmos();
    applyI18n();
    bindMenu();
    bindCarousels();
    bindStudioModal();
    bindCertLightbox();
    bindAvatarLock();
    bindLegalNav();
    bindContactForm();
    bindReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
