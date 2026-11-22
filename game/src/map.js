import { TILE, COLS, ROWS, W, H } from './util.js';

export const MAP = [
  '########################',
  '#......#.......#...##..#',
  '#......#.......#...##..#',
  '#......#.......#.......#',
  '#.##...#.......+..##...#',
  '#.##...#.......#.......#',
  '#......#.......#.......#',
  '#......#.......#.......#',
  '###.########.####.######',
  '#......................#',
  '#..##....##....##...##.#',
  '#..##....##....##...##.#',
  '#......................#',
  '####EE##################',
  '~~~~~~~~~~~~~~~~~~~~~~~~',
];

export const ROOMS = [
  { name: 'WEST WING', x: 40, y: 40, w: 240, h: 280, tint: 'rgba(214,160,74,0.05)' },
  { name: 'VAULT', x: 320, y: 40, w: 280, h: 280, tint: 'rgba(255,196,80,0.06)' },
  { name: 'EAST WING', x: 640, y: 40, w: 280, h: 280, tint: 'rgba(96,150,214,0.05)' },
  { name: 'MAIN HALL', x: 40, y: 360, w: 880, h: 160, tint: 'rgba(150,160,190,0.03)' },
];

export const THIEF_START = { x: 4.5 * TILE, y: 12.4 * TILE };
export const EXIT_TILES = [
  { tx: 4, ty: 13 },
  { tx: 5, ty: 13 },
];
export const VAN = { x: 158, y: 556, w: 104, h: 34 };

export const LAMPS = [
  { x: 140, y: 420, r: 120 },
  { x: 430, y: 500, r: 130 },
  { x: 700, y: 420, r: 120 },
  { x: 884, y: 500, r: 110 },
  { x: 176, y: 176, r: 130 },
  { x: 760, y: 150, r: 130 },
  { x: 460, y: 300, r: 120 },
];

export const GUARDS = [
  {
    name: 'HALL',
    speed: { patrol: 54, suspicious: 72, chase: 99 },
    fov: 1.24,
    range: 252,
    wps: [
      { x: 2.5, y: 9.4 },
      { x: 8.5, y: 9.4 },
      { x: 8.5, y: 12.6 },
      { x: 14, y: 12.6 },
      { x: 14, y: 9.4 },
      { x: 22.5, y: 9.4 },
      { x: 22.5, y: 12.6 },
      { x: 2.5, y: 12.6 },
    ],
  },
  {
    name: 'WEST',
    speed: { patrol: 50, suspicious: 68, chase: 94 },
    fov: 1.16,
    range: 224,
    wps: [
      { x: 1.6, y: 1.8 },
      { x: 5.5, y: 1.8 },
      { x: 5.5, y: 6.3 },
      { x: 1.6, y: 6.3 },
    ],
  },
  {
    name: 'EAST',
    speed: { patrol: 52, suspicious: 70, chase: 96 },
    fov: 1.2,
    range: 238,
    wps: [
      { x: 22.3, y: 3.2 },
      { x: 16.4, y: 4.2 },
      { x: 13.9, y: 4.6 },
      { x: 13.9, y: 6.2 },
      { x: 9.1, y: 6.2 },
      { x: 9.1, y: 2.3 },
      { x: 12.2, y: 2.3 },
      { x: 13.9, y: 4.6 },
      { x: 16.4, y: 4.2 },
    ],
  },
];

export const CAMERAS = [
  { x: 420, y: 362, base: Math.PI / 2, amp: 0.85, spd: 0.55, phase: 0, range: 195, fov: 0.62 },
  { x: 912, y: 110, base: 2.5, amp: 0.6, spd: 0.42, phase: 2.1, range: 260, fov: 0.56 },
  { x: 326, y: 130, base: 0.42, amp: 0.5, spd: 0.48, phase: 4.2, range: 205, fov: 0.56 },
];

export const LOOT = [
  { id: 'gold', label: 'GOLD BARS', value: 850000, dur: 1.2, x: 180, y: 104, w: 44, h: 30, kind: 'gold' },
  { id: 'gem', label: 'STAR SAPPHIRE', value: 1100000, dur: 1.2, x: 664, y: 236, w: 44, h: 30, kind: 'gem' },
  { id: 'crown', label: 'VAULT', value: 3200000, dur: 2.4, x: 460, y: 168, w: 0, h: 0, kind: 'vault' },
];

export const DECOR_CASES = [
  { x: 110, y: 292, w: 44, h: 30, kind: 'vase' },
  { x: 856, y: 268, w: 44, h: 30, kind: 'urn' },
];

export function tileAt(tiles, tx, ty) {
  if (ty < 0 || tx < 0 || ty >= ROWS || tx >= COLS) return '#';
  return tiles[ty][tx];
}

export function solidFor(tiles, tx, ty, who, doorOpen) {
  const t = tileAt(tiles, tx, ty);
  if (t === '#') return true;
  if (t === 'E') return who === 'guard' ? true : !doorOpen;
  if (t === '~') return who === 'guard';
  return false;
}

export function assertMap() {
  if (MAP.length !== ROWS) throw new Error('bad map rows');
  for (const row of MAP) if (row.length !== COLS) throw new Error('bad map width: ' + row);
}
