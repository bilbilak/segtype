import { getSegments } from './charmap';
import { MODES, SegmentSet } from './geometry';
import { THEMES } from './themes';

const TAG = 'x-seglyph';

function css(viewBox: string): string {
  const [, , w, h] = viewBox.split(' ').map(Number);
  return `
  :host {
    display: inline-flex;
    max-width: 100%;
  }
  .display {
    display: inline-flex;
    flex-wrap: wrap;
    gap: var(--seg-gap, 3px);
    padding: var(--seg-padding, 4px);
    background: var(--seg-bg, transparent);
    border-radius: var(--seg-radius, 0px);
    line-height: 0;
  }
  .digit {
    display: block;
    overflow: visible;
    height: var(--seg-height, 22px);
    width: calc(var(--seg-height, 22px) * ${w} / ${h});
    transform: skewX(var(--seg-skew, 0deg));
  }
  .seg {
    fill: var(--seg-off, #315324);
    transition: fill var(--seg-transition, 200ms) ease;
    transform-box: fill-box;
    transform-origin: center;
    transform: scale(calc(1 - var(--seg-segment-gap, 0.15)));
  }
  .seg.on {
    fill: var(--seg-on, #76ff03);
    filter: var(--seg-filter, none);
  }
`;
}

function getMode(el: HTMLElement): string {
  return el.getAttribute('mode') || '7seg';
}

function getSet(el: HTMLElement): SegmentSet {
  return MODES[getMode(el)] || MODES['7seg'];
}

export class SegDisplay extends HTMLElement {
  static observedAttributes = ['value', 'mode', 'variant', 'theme', 'glow', 'glow-blur', 'color', 'off-color', 'bg', 'height', 'gap', 'segment-gap', 'skew', 'length', 'pad'];

  #display: HTMLDivElement;
  #style: HTMLStyleElement;

  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    this.#style = document.createElement('style');
    root.appendChild(this.#style);
    this.#display = document.createElement('div');
    this.#display.className = 'display';
    this.#display.part.add('display');
    root.appendChild(this.#display);
  }

  connectedCallback(): void {
    this.#updateCss();
    this.#applyTheme();
    this.#render();
  }

  attributeChangedCallback(name: string, _old: string | null, value: string | null): void {
    if (name === 'value' || name === 'variant' || name === 'length' || name === 'pad') {
      this.#render();
    } else if (name === 'mode') {
      this.#updateCss();
      this.#applyTheme();
      this.#render();
    } else {
      this.#applyTheme();
    }
  }

  #updateCss(): void {
    this.#style.textContent = css(getSet(this).viewBox);
  }

  #applyTheme(): void {
    const themeName = this.getAttribute('theme');
    const theme = themeName ? THEMES[themeName] : undefined;
    const style = this.style;

    if (theme) {
      style.setProperty('--seg-on', this.getAttribute('color') || theme.on);
      style.setProperty('--seg-off', this.getAttribute('off-color') || theme.off);
      style.setProperty('--seg-bg', this.getAttribute('bg') || theme.bg);
    } else {
      style.setProperty('--seg-on', this.getAttribute('color') || '#76ff03');
      style.setProperty('--seg-off', this.getAttribute('off-color') || '#315324');
      style.setProperty('--seg-bg', this.getAttribute('bg') || 'transparent');
    }

    const onColor = style.getPropertyValue('--seg-on').trim() || '#76ff03';
    if (this.hasAttribute('glow')) {
      const blur = this.getAttribute('glow-blur') || '1';
      style.setProperty('--seg-filter', `drop-shadow(0 0 ${blur}px ${onColor})`);
    } else {
      style.setProperty('--seg-filter', 'none');
    }

    if (this.hasAttribute('height')) {
      style.setProperty('--seg-height', this.getAttribute('height')!);
    }
    if (this.hasAttribute('gap')) {
      style.setProperty('--seg-gap', this.getAttribute('gap')!);
    }
    if (this.hasAttribute('segment-gap')) {
      style.setProperty('--seg-segment-gap', this.getAttribute('segment-gap')!);
    }
    if (this.hasAttribute('skew')) {
      const angle = this.getAttribute('skew');
      style.setProperty('--seg-skew', angle ? `${angle}deg` : '-6deg');
    } else if (theme?.skew === true) {
      style.setProperty('--seg-skew', '-6deg');
    } else {
      style.setProperty('--seg-skew', '0deg');
    }
  }

  #render(): void {
    const set = getSet(this);
    const value = this.getAttribute('value') ?? '';
    const mode = getMode(this);
    const variant = Math.max(0, parseInt(this.getAttribute('variant') || '1', 10) - 1);
    const pad = this.getAttribute('pad');
    let chars = [...value];

    const len = parseInt(this.getAttribute('length') || '0', 10);
    if (len > 0 && chars.length < len) {
      chars = Array(len - chars.length).fill(pad ?? ' ').concat(chars);
    }

    this.#display.innerHTML = chars.map((char) => {
      const on = getSegments(char, mode, variant);
      const paths = set.keys.map(
        (k) => `<path class="seg${on.includes(k) ? ' on' : ''}" d="${set.paths[k]}"/>`,
      ).join('');
      return `<svg class="digit" viewBox="${set.viewBox}" aria-hidden="true">${paths}</svg>`;
    }).join('');
  }
}

export function defineSeg(): void {
  if (!customElements.get(TAG)) {
    customElements.define(TAG, SegDisplay);
  }
}
