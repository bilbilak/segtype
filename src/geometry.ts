export interface SegmentSet {
  keys: readonly string[];
  viewBox: string;
  paths: Record<string, string>;
  desc: Record<string, string>;
}

const vb7 = '-1 -1 12 20';

export const SEG7: SegmentSet = {
  keys: ['a','b','c','d','e','f','g'],
  viewBox: vb7,
  paths: {
    a: 'M 1 1 L 2 0 L 8 0 L 9 1 L 8 2 L 2 2 z',
    b: 'M 9 1 L 10 2 L 10 8 L 9 9 L 8 8 L 8 2 z',
    c: 'M 9 9 L 10 10 L 10 16 L 9 17 L 8 16 L 8 10 z',
    d: 'M 9 17 L 8 18 L 2 18 L 1 17 L 2 16 L 8 16 z',
    e: 'M 1 17 L 0 16 L 0 10 L 1 9 L 2 10 L 2 16 z',
    f: 'M 1 9 L 0 8 L 0 2 L 1 1 L 2 2 L 2 8 z',
    g: 'M 1 9 L 2 8 L 8 8 L 9 9 L 8 10 L 2 10 z',
  },
  desc: { a:'top H', b:'upper-right V', c:'lower-right V', d:'bottom H', e:'lower-left V', f:'upper-left V', g:'middle H' },
};

const vb9 = '0 0 192 320';

export const SEG9: SegmentSet = {
  keys: ['a','b','c','d','e','f','g','h','i'],
  viewBox: vb9,
  paths: {
    a: 'M 33 32 L 50 15 L 143 15 L 160 33 L 143 50 L 50 50 z',
    b: 'M 160 33 L 178 50 L 178 143 L 161 160 L 143 143 L 143 50 z',
    c: 'M 161 160 L 178 178 L 178 271 L 161 288 L 143 271 L 143 178 z',
    d: 'M 161 288 L 143 306 L 50 306 L 33 288 L 50 271 L 143 271 z',
    e: 'M 33 288 L 15 271 L 15 178 L 33 160 L 50 178 L 50 271 z',
    f: 'M 33 160 L 15 143 L 15 50 L 33 32 L 50 50 L 50 143 z',
    g: 'M 33 160 L 50 143 L 143 143 L 161 160 L 143 178 L 50 178 z',
    h: 'M 143 50 L 143 73 L 73 143 L 50 143 L 50 120 L 120 50 z',
    i: 'M 143 178 L 143 201 L 73 271 L 50 271 L 50 248 L 120 178 z',
  },
  desc: { a:'top H', b:'upper-right V', c:'lower-right V', d:'bottom H', e:'lower-left V', f:'upper-left V', g:'middle H', h:'upper-right diag \\', i:'lower-right diag /' },
};

const vb14 = '0 0 142 201.99995';

export const SEG14: SegmentSet = {
  keys: ['a','b','c','d','e','f','g1','g2','h','i','j','k','l','m'],
  viewBox: vb14,
  paths: {
    a: 'M 11 11 L 21 1 L 121 1 L 131 11 L 121 21 L 21 21 Z',
    b: 'M 121 91 L 121 21 L 131 11 L 141 21 L 141 91 L 131 101 Z',
    c: 'M 121 181 L 121 111 L 131 101 L 141 111 L 141 181 L 131 191 Z',
    d: 'M 11 191 L 21 181 L 121 181 L 131 191 L 121 201 L 21 201 Z',
    e: 'M 1 181 L 1 111 L 11 101 L 21 111 L 21 181 L 11 191 Z',
    f: 'M 1 91 L 1 21 L 11 11 L 21 21 L 21 91 L 11 101 Z',
    g1: 'M 21 91 L 61 91 L 71 101 L 61 111 L 21 111 L 11 101 Z',
    g2: 'M 81 91 L 121 91 L 131 101 L 121 111 L 81 111 L 71 101 Z',
    h: 'M 31 21 L 61 71 L 61 91 L 51 91 L 21 41 L 21 21 Z',
    i: 'M 61 91 L 61 21 L 81 21 L 81 91 L 71 101 Z',
    j: 'M 111 21 L 81 71 L 81 91 L 91 91 L 121 41 L 121 21 Z',
    k: 'M 31 181 L 61 131 L 61 111 L 51 111 L 21 161 L 21 181 Z',
    l: 'M 61 181 L 61 111 L 71 101 L 81 111 L 81 181 Z',
    m: 'M 111 181 L 81 131 L 81 111 L 91 111 L 121 161 L 121 181 Z',
  },
  desc: { a:'top H', b:'upper-right V', c:'lower-right V', d:'bottom H', e:'lower-left V', f:'upper-left V', g1:'middle H left', g2:'middle H right', h:'upper-left diag \\', i:'upper-center V', j:'upper-right diag /', k:'lower-left diag /', l:'lower-center V', m:'lower-right diag \\' },
};

const vb16 = '0 0 142 201.99995';

export const SEG16: SegmentSet = {
  keys: ['a1','a2','b','c','d1','d2','e','f','g1','g2','h','i','j','k','l','m'],
  viewBox: vb16,
  paths: {
    a1: 'M 21 1 L 61 1 L 71 11 L 61 21 L 21 21 L 11 11 z',
    a2: 'M 81 1 L 121 1 L 131 11 L 121 21 L 81 21 L 71 11 z',
    b: 'M 121 91 L 121 21 L 131 11 L 141 21 L 141 91 L 131 101 z',
    c: 'M 121 181 L 121 111 L 131 101 L 141 111 L 141 181 L 131 191 z',
    d1: 'M 21 181 L 61 181 L 71 191 L 61 201 L 21 201 L 11 191 z',
    d2: 'M 81 181 L 121 181 L 131 191 L 121 201 L 81 201 L 71 191 z',
    e: 'M 1 181 L 1 111 L 11 101 L 21 111 L 21 181 L 11 191 z',
    f: 'M 1 91 L 1 21 L 11 11 L 21 21 L 21 91 L 11 101 z',
    g1: 'M 21 91 L 61 91 L 71 101 L 61 111 L 21 111 L 11 101 z',
    g2: 'M 81 91 L 121 91 L 131 101 L 121 111 L 81 111 L 71 101 z',
    h: 'M 31 21 L 61 71 L 61 91 L 51 91 L 21 41 L 21 21 z',
    i: 'M 61 91 L 61 21 L 71 11 L 81 21 L 81 91 L 71 101 z',
    j: 'M 111 21 L 81 71 L 81 91 L 91 91 L 121 41 L 121 21 z',
    k: 'M 31 181 L 61 131 L 61 111 L 51 111 L 21 161 L 21 181 z',
    l: 'M 61 181 L 61 111 L 71 101 L 81 111 L 81 181 L 71 191 z',
    m: 'M 111 181 L 81 131 L 81 111 L 91 111 L 121 161 L 121 181 z',
  },
  desc: { a1:'top H left', a2:'top H right', b:'upper-right V', c:'lower-right V', d1:'bottom H left', d2:'bottom H right', e:'lower-left V', f:'upper-left V', g1:'middle H left', g2:'middle H right', h:'upper-left diag \\', i:'upper-center V', j:'upper-right diag /', k:'lower-left diag /', l:'lower-center V', m:'lower-right diag \\' },
};

export const MODES: Record<string, SegmentSet> = {
  '7seg': SEG7,
  '9seg': SEG9,
  '14seg': SEG14,
  '16seg': SEG16,
};
