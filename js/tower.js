import { num } from "./storage.js";

export function normalizeTower(ds) {
  const levels = TOWER_LEVELS[ds.id] || [];
  const maxFromTable = Math.max(0, levels.length - 1);

  return {
    id: ds.id,
    name: ds.name,
    type: ds.type,
    img: ds.img,

    maxlvl: levels.length ? maxFromTable : num(ds.maxlvl, 0),

    levels
  };
}

export function getStatsAtLevel(tower, lvl) {
  return tower.levels[lvl] || tower.levels[0] || {
    dmg: 0, range: 0, rate: 0, cost: 0
  };
}

export const TOWER_LEVELS = {
  Scout: [
    { dmg: 1,  range: 12, rate: 1.108, cost: 150 },
    { dmg: 1,  range: 12, rate: 0.808, cost: 50 },
    { dmg: 2,  range: 14, rate: 0.808, cost: 200 },
    { dmg: 6,  range: 14, rate: 0.708, cost: 950 },
    { dmg: 8,  range: 16, rate: 0.358, cost: 2500 }
  ],
  Sniper: [
    { dmg: 4, range: 27.5, rate: 4.008, cost: 300 },
    { dmg: 6, range: 27.5, rate: 3.508, cost: 150 },
    { dmg: 12, range: 32.5, rate: 3.508, cost: 500 },
    { dmg: 30, range: 35, rate: 3.508, cost: 1500 },
    { dmg: 40, range: 40, rate: 2.008, cost: 4000 }
  ]
};