export interface ThemeVars {
  on: string;
  off: string;
  bg: string;
  glow?: boolean;
  skew?: boolean;
}

export const THEMES: Record<string, ThemeVars> = {
  calculator: {
    on: '#172428',
    off: '#85a748',
    bg: '#90b34b',
  },
  'e-ink': {
    on: '#16101a',
    off: '#9ba2a8',
    bg: '#9ba2a8',
  },
  lcd: {
    on: '#121616',
    off: '#89bd94',
    bg: '#89bd94',
  },
  'lcd-backlit': {
    on: '#1a1a18',
    off: '#8cf126',
    bg: '#8cf126',
  },
  'neon-amber': {
    on: '#ffb300',
    off: '#5c3a00',
    bg: 'black',
    glow: true,
  },
  'neon-blue': {
    on: '#4fc3f7',
    off: '#1a3a4a',
    bg: 'black',
    glow: true,
  },
  'neon-green': {
    on: '#76ff03',
    off: '#315324',
    bg: 'black',
    glow: true,
  },
  'neon-red': {
    on: '#ff1744',
    off: '#4a0a14',
    bg: 'black',
    glow: true,
    skew: true,
  },
  'neon-vapor': {
    on: '#ff6ec7',
    off: '#2d1b3a',
    bg: '#1a0a2e',
    glow: true,
  },
};
