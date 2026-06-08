document.addEventListener('alpine:init', () => {
  Alpine.data('app', () => ({
    tab: 'playground',
    themePref: 'dark',

    get themeLabel() {
      return this.themePref === 'dark' ? 'Switch to light' : 'Switch to dark';
    },

    init() {
      this.tab = location.hash.slice(1) || 'playground';
      window.addEventListener('hashchange', () => {
        this.tab = location.hash.slice(1) || 'playground';
      });

      this.themePref = sessionStorage.getItem('theme-pref') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      this._applyTheme();
    },

    _applyTheme() {
      const root = document.documentElement;
      if (this.themePref === 'dark') {
        root.classList.add('dark');
        root.classList.remove('light');
      } else {
        root.classList.add('light');
        root.classList.remove('dark');
      }
      this._updateMetaThemeColor();
    },

    _updateMetaThemeColor() {
      const meta = document.getElementById('meta-theme-color');
      if (!meta) return;
      meta.setAttribute('content', this.themePref === 'dark' ? '#0d0d0d' : '#f5f4f0');
    },

    toggleTheme() {
      this.themePref = this.themePref === 'dark' ? 'light' : 'dark';
      sessionStorage.setItem('theme-pref', this.themePref);
      this._applyTheme();
    },

    switchTab(t) {
      this.tab = t;
      location.hash = t;
    },
  }));

  Alpine.data('playground', () => {
    const THEME_LABELS = {
      'lcd-backlit': 'LCD \u2014 Backlit',
      calculator: 'Calculator',
      'e-ink': 'E-Ink',
      lcd: 'LCD',
      'neon-amber': 'Neon \u2014 Amber',
      'neon-blue': 'Neon \u2014 Blue',
      'neon-green': 'Neon \u2014 Green',
      'neon-red': 'Neon \u2014 Red',
      'neon-vapor': 'Neon \u2014 Vapor',
    };

    return {
      // ── state ──
      mode: '7seg',
      theme: 'neon-green',
      glow: false,
      glowBlur: 1,
      skewEnabled: false,
      skewAngle: -6,
      height: 96,
      gap: 15,
      value: '0123456789-abcdefghijklmnopqrstuvwxyz-ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      length: 0,
      pad: '',
      customColor: '#76ff03',
      customOffColor: '#315324',
      customBg: '#000000',
      _MODES: null,
      _THEMES: null,
      _ready: false,

      // ── computed ──
      get isCustomTheme() { return this.theme === '__custom__'; },

      get currentModeData() {
        return this._MODES ? this._MODES[this.mode] : null;
      },

      get refPanelHTML() {
        const data = this.currentModeData;
        if (!data) return '';
        const gap2 = 0.15;
        const total = data.keys.length;
        let svgPaths = '';
        const colors = {};
        data.keys.forEach((k, i) => {
          const c = this._colorFor(i, total);
          colors[k] = c;
          svgPaths += `<path d="${data.paths[k]}" fill="${c}" opacity="0.9" style="transform-box:fill-box;transform-origin:center;transform:scale(${1 - gap2})"/>`;
        });
        return `
          <div class="bg-dark-500 rounded-[6px] p-1 border border-dark-700 inline-flex">
            <svg viewBox="${data.viewBox}" width="110" height="200">
              <rect width="100%" height="100%" fill="none" rx="2"/>
              ${svgPaths}
            </svg>
          </div>
          <div class="flex flex-col gap-[3px] text-[11px]">
            ${data.keys.map(k =>
              `<div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-[3px] border border-dark-700 shrink-0" style="background:${colors[k]}"></div>
                <span class="font-mono font-bold text-gray-300 text-[10px] min-w-[28px]">${k}</span>
                <span class="text-gray-550 text-[9px]">${data.desc[k] || ''}</span>
              </div>`
            ).join('')}
          </div>`;
      },

      // ── init ──
      async init() {
        const segtype = await window.__SEGTYPE_READY__;
        this._MODES = segtype.MODES;
        this._THEMES = segtype.THEMES;

        // populate theme selector
        const themeSel = this.$refs.themeSel;
        for (const key of Object.keys(this._THEMES).sort()) {
          const opt = document.createElement('option');
          opt.value = key;
          opt.textContent = THEME_LABELS[key] || key;
          if (key === 'neon-green') opt.selected = true;
          themeSel.appendChild(opt);
        }
        const customOpt = document.createElement('option');
        customOpt.value = '__custom__';
        customOpt.textContent = 'Custom';
        themeSel.appendChild(customOpt);

        this.$watch('theme', (val) => this._applyThemeDefaults(val));
        this._applyThemeDefaults(this.theme);

        this._ready = true;
        this.syncPreview();
      },

      // ── sync preview <x-seglyph> ──

      syncPreview() {
        if (!this._ready) return;
        const el = this.$refs.preview;
        if (!el) return;
        el.setAttribute('mode', this.mode);
        if (this.isCustomTheme) {
          el.removeAttribute('theme');
          el.setAttribute('color', this.customColor);
          el.setAttribute('off-color', this.customOffColor);
          el.setAttribute('bg', this.customBg);
        } else {
          el.setAttribute('theme', this.theme);
          el.removeAttribute('color');
          el.removeAttribute('off-color');
          el.removeAttribute('bg');
        }
        el.setAttribute('height', this.height + 'px');
        el.setAttribute('segment-gap', String(this.gap / 100));
        el.toggleAttribute('glow', this.glow);
        if (this.skewEnabled) el.setAttribute('skew', this.skewAngle === -6 ? '' : String(this.skewAngle));
        else el.removeAttribute('skew');
        el.setAttribute('glow-blur', String(this.glowBlur));
        if (this.length) el.setAttribute('length', String(this.length));
        else el.removeAttribute('length');
        if (this.pad) el.setAttribute('pad', this.pad);
        else el.removeAttribute('pad');
        el.setAttribute('value', this.value);
      },

      onModeChange() {
        this.syncPreview();
      },

      _applyThemeDefaults(val) {
        if (val === '__custom__' || !this._THEMES) {
          this.glow = false;
          this.skewEnabled = false;
          return;
        }
        const t = this._THEMES[val];
        this.glow = t && t.glow === true;
        this.skewEnabled = t && t.skew === true;
      },

      onColorHexChange(el, prop) {
        if (/^#[0-9a-f]{6}$/i.test(el.value)) {
          this[prop] = el.value;
        } else {
          el.value = this[prop];
        }
      },

      resetAll() {
        this.mode = '7seg';
        this.theme = 'neon-green';
        this.value = '0123456789-abcdefghijklmnopqrstuvwxyz-ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.height = 96;
        this.gap = 15;
        this.glowBlur = 1;
        this.length = 0;
        this.pad = '';
        this.customColor = '#76ff03';
        this.customOffColor = '#315324';
        this.customBg = '#000000';
      },

      _colorFor(i, total) {
        return `hsl(${((i * 360 / total) + 15) % 360}, 85%, 55%)`;
      },
    };
  });

  Alpine.data('designer', () => ({
    // ── state ──
    mode: '7seg',
    char: 'A',
    variants: [['a', 'b', 'c', 'e', 'f', 'g']],
    current: 0,
    savedMap: {},
    _MODES: null,
    _getCharVariants: null,
    _ready: false,

    // ── computed ──
    get currentSet() {
      return this._MODES ? this._MODES[this.mode] : null;
    },

    get onSegs() {
      return this.variants[this.current] || [];
    },

    get refPanelHTML() {
      const data = this.currentSet;
      if (!data) return '';
      const gap2 = 0.15;
      const total = data.keys.length;
      let svgPaths = '';
      const colors = {};
      data.keys.forEach((k, i) => {
        const c = this._colorFor(i, total);
        colors[k] = c;
        svgPaths += `<path d="${data.paths[k]}" fill="${c}" opacity="0.9" style="transform-box:fill-box;transform-origin:center;transform:scale(${1 - gap2})"/>`;
      });
      return `
        <div class="bg-dark-500 rounded-[6px] p-1 border border-dark-700 inline-flex">
          <svg viewBox="${data.viewBox}" width="110" height="200">
            <rect width="100%" height="100%" fill="none" rx="2"/>
            ${svgPaths}
          </svg>
        </div>
        <div class="flex flex-col gap-[3px] text-[11px]">
          ${data.keys.map(k =>
            `<div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-[3px] border border-dark-700 shrink-0" style="background:${colors[k]}"></div>
              <span class="font-mono font-bold text-gray-300 text-[10px] min-w-[28px]">${k}</span>
              <span class="text-gray-550 text-[9px]">${data.desc[k] || ''}</span>
            </div>`
          ).join('')}
        </div>`;
    },

    get glyphSVG() {
      const set = this.currentSet;
      if (!set) return '';
      const onSegs = this.onSegs;
      const gap2 = 0.15;
      return `<svg viewBox="${set.viewBox}" width="180" style="max-width:100%;height:auto">
        ${set.keys.map(k => {
          const on = onSegs.includes(k);
          return `<path class="seg${on ? ' on' : ''}" d="${set.paths[k]}" data-key="${k}" style="transform-box:fill-box;transform-origin:center;transform:scale(${1 - gap2})"/>`;
        }).join('')}
      </svg>`;
    },

    get outputText() {
      const ch = this.char || '?';
      if (ch === '?') return `'${ch}': [],`;
      const arrStr = this.variants.map(v => `['${v.join("','")}']`).join(',');
      return `'${ch}': [${arrStr}],`;
    },

    get activeSegsHTML() {
      const segs = this.onSegs;
      if (segs.length === 0) return '<em class="not-italic text-gray-500">&mdash;</em>';
      return `<em class="not-italic text-gray-300">${segs.join(', ')}</em>`;
    },

    get mapChars() {
      const map = this.savedMap[this.mode];
      return map ? Object.keys(map).sort() : [];
    },

    get mapText() {
      return this.mapChars.map(ch => {
        const arrStr = this.savedMap[this.mode][ch].map(v => `['${v.join("','")}']`).join(',');
        return `  '${ch}': [${arrStr}],`;
      }).join('\n');
    },

    get mapCountText() {
      const n = this.mapChars.length;
      return `${n} entry${n !== 1 ? 's' : ''}`;
    },

    // ── init ──
    async init() {
      const segtype = await window.__SEGTYPE_READY__;
      this._MODES = segtype.MODES;
      this._getCharVariants = segtype.getCharVariants;

      this.$watch('mode', () => {
        this.loadChar();
      });

      this._ready = true;
      this.loadChar();
    },

    loadChar() {
      const saved = this.savedMap[this.mode]?.[this.char];
      if (saved) {
        this.variants = saved.map(v => [...v]);
      } else {
        const variants = this._getCharVariants(this.char, this.mode);
        this.variants = variants && variants.length > 0
          ? variants.map(v => [...v])
          : [[]];
      }
      this.current = 0;
    },

    onCharInput() {
      const raw = this.$refs.charInp.value;
      if (raw.length === 0) {
        this.char = '';
        this.variants = [[]];
        this.current = 0;
        return;
      }
      const ch = raw[0];
      if (ch === this.char) return;
      this.$refs.charInp.value = ch;
      this.char = ch;
      this.loadChar();
    },

    onGlyphClick(e) {
      const path = e.target.closest('path.seg');
      if (!path) return;
      const key = path.getAttribute('data-key');
      this.toggleSegment(key);
    },

    toggleSegment(key) {
      const segs = [...this.variants[this.current]];
      const idx = segs.indexOf(key);
      if (idx >= 0) segs.splice(idx, 1);
      else {
        segs.push(key);
        segs.sort((a, b) => this.currentSet.keys.indexOf(a) - this.currentSet.keys.indexOf(b));
      }
      this.variants[this.current] = segs;
    },

    addVariant() {
      this.variants.push([]);
      this.current = this.variants.length - 1;
    },

    removeVariant() {
      if (this.variants.length <= 1) return;
      this.variants.splice(this.current, 1);
      if (this.current >= this.variants.length) this.current = this.variants.length - 1;
    },

    addToMap() {
      if (!this.char) return;
      if (!this.savedMap[this.mode]) this.savedMap[this.mode] = {};
      this.savedMap[this.mode][this.char] = this.variants.map(v => [...v]);
      this.savedMap = { ...this.savedMap };
    },

    removeFromMap(ch) {
      delete this.savedMap[this.mode][ch];
      if (Object.keys(this.savedMap[this.mode]).length === 0) delete this.savedMap[this.mode];
      this.savedMap = { ...this.savedMap };
    },

    async copyOutput() {
      const text = this.outputText;
      try { await navigator.clipboard.writeText(text); } catch {
        const ta = document.createElement('textarea');
        ta.value = text; document.body.appendChild(ta); ta.select();
        document.execCommand('copy'); document.body.removeChild(ta);
      }
      this._showToast();
    },

    async copyAll() {
      const map = this.savedMap[this.mode];
      if (!map || Object.keys(map).length === 0) return;
      const chars = Object.keys(map).sort();
      const lines = chars.map(ch => {
        const arrStr = map[ch].map(v => `['${v.join("','")}']`).join(',');
        return `  '${ch}': [${arrStr}],`;
      });
      const text = lines.join('\n');
      try { await navigator.clipboard.writeText(text); } catch {
        const ta = document.createElement('textarea');
        ta.value = text; document.body.appendChild(ta); ta.select();
        document.execCommand('copy'); document.body.removeChild(ta);
      }
      this._showToast();
    },

    _showToast() {
      const toast = document.querySelector('.copy-toast');
      if (!toast) return;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 1200);
    },

    _colorFor(i, total) {
      return `hsl(${((i * 360 / total) + 15) % 360}, 85%, 55%)`;
    },
  }));
});
