import { num } from "./storage.js";

export function normalizeTower(ds) {
  const levels = TOWER_LEVELS[ds.id] || [];
  let maxFromTable = 0;
  if (Array.isArray(levels)) {
    maxFromTable = Math.max(0, levels.length - 1);
  } else if (levels && Array.isArray(levels.base)) {
    maxFromTable = Math.max(0, levels.base.length - 1);
  }

  return {
    id: ds.id,
    name: ds.name,
    type: ds.type,
    img: ds.img,
    detection: ds.detection,

    maxlvl: levels.length ? maxFromTable : num(ds.maxlvl, 0),

    levels
  };
}

export function getStatsAtLevel(tower, lvl, branch) {
  const levels = resolveLevels(tower, branch);
  return levels[lvl] || levels[0] || {
    dmg: 0, range: 0, rate: 0, cost: 0
  };
}

export function resolveLevels(tower, branch) {
  const levels = tower.levels || [];
  if (Array.isArray(levels)) return levels;
  const base = Array.isArray(levels.base) ? levels.base : [];
  if (!branch) return base;
  const branches = levels.branches || {};
  const pick = branches[branch];
  if (Array.isArray(pick)) return base.concat(pick);
  return base;
}

export function getBranchData(tower) {
  const levels = tower.levels || [];
  if (Array.isArray(levels)) return null;
  if (!Array.isArray(levels.base) || !levels.branches) return null;
  return levels;
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
  ],
  Paintballer: [
    { dmg: 1, range: 7.5, rate: 1.708, cost: 100 },
    { dmg: 1, range: 9, rate: 1.708, cost: 25 },
    { dmg: 2, range: 9, rate: 1.408, cost: 150 },
    { dmg: 3, range: 9, rate: 0.708, cost: 600 },
    { dmg: 8, range: 10.5, rate: 0.708, cost: 1500 },
    { dmg: 20, range: 10.5, rate: 0.708, cost: 3600 }
  ],
  Demoman: [
    { dmg: 6, range: 10, rate: 2.808, cost: 550 },
    { dmg: 6, range: 12, rate: 2.008, cost: 225 },
    { dmg: 10, range: 12, rate: 2.008, cost: 500 },
    { dmg: 22, range: 14, rate: 1.708, cost: 2100 },
    { dmg: 47, range: 15.5, rate: 1.308, cost: 6500 }
  ],
  Soldier: [
    { dmg: 1, range: 17, rate: 0.158, cost: 350 },
    { dmg: 1, range: 17, rate: 0.108, cost: 50 },
    { dmg: 2, range: 19, rate: 0.108, cost: 650 },
    { dmg: 4, range: 19, rate: 0.108, cost: 2250 },
    { dmg: 8, range: 22, rate: 0.108, cost: 4600 }
  ],
  Shotgunner: [
    { dmg: "1x8", range: 7.5, rate: 2.008, cost: 400 },
    { dmg: "1x8", range: 7.5, rate: 1.508, cost: 150 },
    { dmg: "2x10", range: 9, rate: 1.508, cost: 1050 },
    { dmg: "4x10", range: 9.5, rate: 1.258, cost: 3000 },
    { dmg: "8x12", range: 11, rate: 1.008, cost: 8500 }
  ],
  Militant: [
    { dmg: 1, range: 13, rate: 0.208, cost: 600 },
    { dmg: 1, range: 17, rate: 0.208, cost: 150 },
    { dmg: 2, range: 17, rate: 0.158, cost: 1050 },
    { dmg: 5, range: 17, rate: 0.158, cost: 3125 },
    { dmg: 10, range: 19, rate: 0.158, cost: 5750 }
  ],
  Freezer: [
    { dmg: 1, range: 12, rate: 0.508, cost: 425 },
    { dmg: 2, range: 12, rate: 0.508, cost: 225 },
    { dmg: 2, range: 14, rate: 0.508, cost: 650 },
    { dmg: 3, range: 14, rate: 0.158, cost: 2000 },
    { dmg: 5, range: 16, rate: 0.158, cost: 4500 }
  ],
  Assassin: [
    { dmg: 3, range: 6, rate: 0.608, cost: 300 },
    { dmg: 6, range: 6, rate: 0.508, cost: 450 },
    { dmg: 6, range: 6, rate: 0.508, cost: 750 },
    { dmg: 14, range: 6, rate: 0.358, cost: 2400 },
    { dmg: 35, range: 6.5, rate: 0.358, cost: 6350 }
  ],
  Hunter: [
    { dmg: 45, range: 22, rate: 3.458, cost: 1625 },
    { dmg: 45, range: 22, rate: 2.458, cost: 725 },
    { dmg: 96, range: 24, rate: 2.458, cost: 2850 },
    { dmg: 156, range: 26, rate: 2.108, cost: 9400 },
    { dmg: 225, range: 27.5, rate: 1.808, cost: 20000 }
  ],
  Pyromancer: [
    { dmg: 1, range: 8, rate: 0.258, cost: 900 },
    { dmg: 1, range: 10, rate: 0.158, cost: 325 },
    { dmg: 2, range: 10, rate: 0.158, cost: 915 },
    { dmg: 3, range: 12.5, rate: 0.158, cost: 1750 },
    { dmg: 4, range: 12.5, rate: 0.158, cost: 3400 },
    { dmg: 6, range: 14, rate: 0.158, cost: 7000 }
  ],
  "Ace Pilot": [
    { dmg: 2, range: 9, rate: 0.208, cost: 500 },
    { dmg: 3, range: 9, rate: 0.208, cost: 225 },
    { dmg: 4, range: 9, rate: 0.208, cost: 625 },
    { dmg: 4, range: 10, rate: 0.108, cost: 1500 },
    { dmg: 6, range: 10, rate: 0.108, cost: 2500 },
    { dmg: 15, range: 10, rate: 0.108, cost: 9500 }
  ],
  Medic: [
    { dmg: 0, range: 12, rate: 0, cost: 400 },
    { dmg: 0, range: 12, rate: 0, cost: 400 },
    { dmg: 0, range: 14, rate: 0, cost: 675 },
    { dmg: 0, range: 15, rate: 0, cost: 2700 },
    { dmg: 0, range: 18, rate: 0, cost: 6000 },
    { dmg: 0, range: 20, rate: 0, cost: 15000 }
  ],
  Farm: [
    { dmg: 0, range: 0, rate: 0, cost: 300 },
    { dmg: 0, range: 0, rate: 0, cost: 250 },
    { dmg: 0, range: 0, rate: 0, cost: 500 },
    { dmg: 0, range: 0, rate: 0, cost: 1050 },
    { dmg: 0, range: 0, rate: 0, cost: 2100 },
    { dmg: 0, range: 0, rate: 0, cost: 4000 }
  ],
  Electroshocker: [
    { dmg: 3, range: 10, rate: 0.758, cost: 425 },
    { dmg: 4, range: 10, rate: 0.758, cost: 200 },
    { dmg: 8, range: 12.5, rate: 0.758, cost: 625 },
    { dmg: 20, range: 14, rate: 0.658, cost: 2500 },
    { dmg: 125, range: 16, rate: 2.258, cost: 6350 },
    { dmg: 200, range: 17, rate: 2.258, cost: 16935 }
  ],
  Rocketeer: [
    { dmg: 30, range: 20, rate: 4.008, cost: 2000 },
    { dmg: 30, range: 20, rate: 3.508, cost: 400 },
    { dmg: 50, range: 22.5, rate: 3.508, cost: 1600 },
    { dmg: 85, range: 22.5, rate: 3.008, cost: 5000 },
    { dmg: "85x4", range: 24, rate: 5.008, cost: 18500 }
  ],
  Trapper: [
    { dmg: 10, range: 7, rate: 5.258, cost: 500 },
    { dmg: 20, range: 7, rate: 5.008, cost: 500 },
    { dmg: 25, range: 9, rate: 5.008, cost: 1500 },
    { dmg: 40, range: 10, rate: 5.008, cost: 5000 },
    { dmg: 60, range: 10, rate: 4.508, cost: 13500 }
  ],
  "Military Base": [
    { dmg: 0, range: 5, rate: 0, cost: 400 },
    { dmg: 0, range: 5, rate: 0, cost: 200 },
    { dmg: 0, range: 5, rate: 0, cost: 400 },
    { dmg: 3, range: 35, rate: 0.208, cost: 1600 },
    { dmg: 8, range: 35, rate: 0.208, cost: 7500 },
    { dmg: 22, range: 35, rate: 0.158, cost: 25000 }
  ],
  "Crook Boss": [
    { dmg: 10, range: 14, rate: 0.908, cost: 1800 },
    { dmg: 12, range: 14, rate: 0.608, cost: 1200 },
    { dmg: 24, range: 17, rate: 0.608, cost: 3650 },
    { dmg: 24, range: 18.5, rate: 0.18, cost: 13750 },
    { dmg: 28, range: 18.5, rate: 0.128, cost: 30000 }
  ],
  Commander: [
    { dmg: 0, range: 10, rate: 0, cost: 650 },
    { dmg: 0, range: 10, rate: 0, cost: 400 },
    { dmg: 15, range: 13, rate: 0.608, cost: 2450 },
    { dmg: 30, range: 15, rate: 0.608, cost: 4500 },
    { dmg: 50, range: 17, rate: 0.608, cost: 14000 }
  ],
  Warden: [
    { dmg: 6, range: 6, rate: 0.608, cost: 800 },
    { dmg: 8, range: 6, rate: 0.608, cost: 350 },
    { dmg: 16, range: 7, rate: 0.608, cost: 1250 },
    { dmg: 35, range: 7, rate: 0.608, cost: 4500 },
    { dmg: 85, range: 8, rate: 0.508, cost: 17500 }
  ],
  "Dj Booth": [
    { dmg: 0, range: 12, rate: 0, cost: 850 },
    { dmg: 0, range: 15, rate: 0, cost: 300 },
    { dmg: 0, range: 15, rate: 0, cost: 1250 },
    { dmg: 0, range: 15, rate: 0, cost: 3000 },
    { dmg: 0, range: 16.5, rate: 0, cost: 8000 },
    { dmg: 0, range: 18, rate: 0, cost: 20000 }
  ],
  Tesla: [
    { dmg: 20, range: 16, rate: 2.508, cost: 2500 },
    { dmg: 25, range: 16, rate: 2.258, cost: 1856 },
    { dmg: 40, range: 16.5, rate: 1.808, cost: 8400 },
    { dmg: 84, range: 16.5, rate: 1.408, cost: 18450 },
    { dmg: 105, range: 17.5, rate: 1.208, cost: 50001 }
  ],
  Minigunner: [
    { dmg: 2, range: 15, rate: 0.158, cost: 1850 },
    { dmg: 2, range: 15, rate: 0.128, cost: 400 },
    { dmg: 3, range: 18, rate: 0.128, cost: 1500 },
    { dmg: 7, range: 18, rate: 0.108, cost: 7000 },
    { dmg: 15, range: 20, rate: 0.108, cost: 15500 }
  ],
  Ranger: [
    { dmg: 100, range: 70, rate: 6.008, cost: 4500 },
    { dmg: 100, range: 70, rate: 4.758, cost: 1500 },
    { dmg: 185, range: 70, rate: 4.758, cost: 5500 },
    { dmg: 430, range: 70, rate: 4.508, cost: 15750 },
    { dmg: 875, range: 70, rate: 8.508, cost: 25000 }
  ],
  Pursuit: {
    base: [
      { dmg: 7, range: 6, rate: 0.208, cost: 5000 },
      { dmg: 10, range: 6, rate: 0.208, cost: 1750 },
      { dmg: 10, range: 7, rate: 0.158, cost: 3000 },
      { dmg: 10, range: 7, rate: 0.158, cost: 5000 }
    ],
    branches: {
      a: [
        { dmg: 24, range: 7, rate: 0.128, cost: 18000 },
        { dmg: 50, range: 7, rate: 0.093, cost: 45000 }
      ],
      b: [
        { dmg: 24, range: 7, rate: 0.128, cost: 18000 },
        { dmg: 50, range: 7, rate: 0.093, cost: 45000 }
      ]
    }
  },
  "Gatling Gun": [
    { dmg: 5, range: 25, rate: 0.158, cost: 5250 },
    { dmg: 8, range: 30, rate: 0.158, cost: 3000 },
    { dmg: 12, range: 30, rate: 0.158, cost: 7500 },
    { dmg: 16, range: 35, rate: 0.128, cost: 15000 },
    { dmg: 25, range: 45, rate: 0.098, cost: 32500 },
    { dmg: 45, range: 50, rate: 0.098, cost: 50000 },
    { dmg: 85, range: 50, rate: 0.098, cost: 100000 }
  ],
  Turret: [
    { dmg: 10, range: 15, rate: 0.358, cost: 5000 },
    { dmg: 10, range: 20, rate: 0.308, cost: 1250 },
    { dmg: 20, range: 20, rate: 0.308, cost: 7250 },
    { dmg: 20, range: 22, rate: 0.158, cost: 15000 },
    { dmg: 40, range: 24, rate: 0.158, cost: 30000 },
    { dmg: 75, range: 27, rate: 0.158, cost: 52500 }
  ],
  Mortar: [
    { dmg: 15, range: 24, rate: 4.008, cost: 1000 },
    { dmg: 15, range: 27, rate: 2.758, cost: 500 },
    { dmg: 35, range: 27, rate: 2.758, cost: 2250 },
    { dmg: 65, range: 30, rate: 2.758, cost: 4250 },
    { dmg: 125, range: 34, rate: 2.758, cost: 19000 },
    { dmg: 290, range: 34, rate: 2.758, cost: 35000 }
  ],
  "Mercenary Base": [
    { dmg: 0, range: 6, rate: 0, cost: 2750 },
    { dmg: 0, range: 8, rate: 0, cost: 1350 },
    { dmg: 0, range: 8, rate: 0, cost: 2750 },
    { dmg: 0, range: 10, rate: 0, cost: 9650 },
    { dmg: 0, range: 10, rate: 0, cost: 10000 },
    { dmg: 0, range: 10, rate: 0, cost: 12500 },
    { dmg: 0, range: 10, rate: 0, cost: 45000 }
  ],
  Brawler: [
    { dmg: 6, range: 5.75, rate: 1.208, cost: 300 },
    { dmg: 6, range: 5.75, rate: 0.808, cost: 150 },
    { dmg: 10, range: 5.75, rate: 0.758, cost: 750 },
    { dmg: 22, range: 6.25, rate: 0.758, cost: 1500 },
    { dmg: 34, range: 6.5, rate: 0.608, cost: 3000 },
    { dmg: 66, range: 7.25, rate: 0.508, cost: 9999 }
  ],
  Necromancer: [
    { dmg: 15, range: 23, rate: 1.208, cost: 4200 },
    { dmg: 20, range: 23, rate: 1.108, cost: 3950 },
    { dmg: 30, range: 26, rate: 1.108, cost: 11320 },
    { dmg: 45, range: 28, rate: 0.808, cost: 26650 },
    { dmg: 30, range: 36, rate: 0.408, cost: 65000 }
  ],
  Accelerator: [
    { dmg: 12, range: 20, rate: 0.208, cost: 7500 },
    { dmg: 20, range: 20, rate: 0.208, cost: 2000 },
    { dmg: 25, range: 22, rate: 0.208, cost: 4800 },
    { dmg: 40, range: 22, rate: 0.208, cost: 9999 },
    { dmg: 50, range: 24, rate: 0.158, cost: 30000 },
    { dmg: 55, range: 26, rate: 0.108, cost: 67500 }
  ],
  Engineer: [
    { dmg: 4, range: 13, rate: 1.208, cost: 600 },
    { dmg: 6, range: 16, rate: 1.008, cost: 350 },
    { dmg: 8, range: 18, rate: 1.008, cost: 1000 },
    { dmg: 20, range: 18, rate: 1.008, cost: 2077 },
    { dmg: 25, range: 20, rate: 0.758, cost: 7500 },
    { dmg: 75, range: 20, rate: 0.758, cost: 12500 },
    { dmg: 85, range: 22.5, rate: 0.608, cost: 32500 }
  ],
  Hacker: {
    base: [
      { dmg: 0, range: 11, rate: 0.308, cost: 900 },
      { dmg: 0, range: 14, rate: 0.308, cost: 300 },
      { dmg: 0, range: 14, rate: 0.308, cost: 1337 },
      { dmg: 10, range: 15, rate: 0.308, cost: 7500 },
      { dmg: 20, range: 16, rate: 0.308, cost: 24000 }
    ],
    branches: {
      a: [
        { dmg: 25, range: 18.5, rate: 0.108, cost: 63500 }
      ],
      b: [
        { dmg: 20, range: 21, rate: 0.308, cost: 55320 }
      ]
    }
  ],
  "Golden Minigunner": [
    { dmg: 2, range: 16, rate: 0.128, cost: 2000 },
    { dmg: 2, range: 16, rate: 0.108, cost: 250 },
    { dmg: 3, range: 19, rate: 0.108, cost: 1500 },
    { dmg: 10, range: 19, rate: 0.108, cost: 9001 },
    { dmg: 17, range: 21, rate: 0.098, cost: 18624 }
  ],
  "Golden Pyromancer": [
    { dmg: 1, range: 7, rate: 0.258, cost: 800 },
    { dmg: 1, range: 9, rate: 0.258, cost: 350 },
    { dmg: 2, range: 9, rate: 0.258, cost: 1000 },
    { dmg: 3, range: 10, rate: 0.258, cost: 1800 },
    { dmg: 4, range: 10, rate: 0.258, cost: 4600 },
    { dmg: 8, range: 12, rate: 0.258, cost: 10000 }
  ],
  "Golden Crook Boss": [
    { dmg: 12, range: 15, rate: 0.808, cost: 2250 },
    { dmg: 14, range: 15, rate: 0.558, cost: 1325 },
    { dmg: 25, range: 17.5, rate: 0.558, cost: 3750 },
    { dmg: 25, range: 21, rate: 0.158, cost: 18500 },
    { dmg: 36, range: 21, rate: 0.128, cost: 35000 }
  ],
  "Golden Scout": [
    { dmg: 2, range: 14, rate: 0.808, cost: 250 },
    { dmg: 2, range: 15, rate: 0.508, cost: 150 },
    { dmg: 5, range: 15, rate: 0.508, cost: 500 },
    { dmg: 40, range: 18, rate: 1.208, cost: 2325 },
    { dmg: 50, range: 18, rate: 0.608, cost: 5500 }
  ],
  "Golden Cowboy": [
    { dmg: 4, range: 14, rate: 1.008, cost: 600 },
    { dmg: 4, range: 14, rate: 0.758, cost: 150 },
    { dmg: 6, range: 16, rate: 0.758, cost: 600 },
    { dmg: 10, range: 18, rate: 0.508, cost: 1750 },
    { dmg: 10, range: 20, rate: 0.258, cost: 4750 },
    { dmg: 24, range: 20, rate: 0.258, cost: 9500 }
  ],
  "Golden Soldier": [
    { dmg: 1, range: 18, rate: 0.108, cost: 500 },
    { dmg: 1, range: 18, rate: 0.088, cost: 250 },
    { dmg: 2, range: 20, rate: 0.088, cost: 800 },
    { dmg: 4, range: 20, rate: 0.088, cost: 5750 },
    { dmg: 10, range: 24, rate: 0.088, cost: 14500 }
  ],
  Gladiator: [
    { dmg: 5, range: 5.5, rate: 0.958, cost: 525 },
    { dmg: 7, range: 5.5, rate: 0.758, cost: 450 },
    { dmg: 17, range: 5.5, rate: 0.758, cost: 1250 },
    { dmg: 37, range: 5.75, rate: 1.148, cost: 4000 },
    { dmg: 77, range: 5.75, rate: 1.148, cost: 4000 },
    { dmg: 177, range: 5.75, rate: 1.358, cost: 13900 }
  ],
  Commando: [
    { dmg: 5, range: 13, rate: 0.208, cost: 2350 },
    { dmg: 5, range: 13, rate: 0.158, cost: 935 },
    { dmg: 8, range: 14.5, rate: 0.158, cost: 3250 },
    { dmg: 15, range: 16, rate: 0.138, cost: 8500 },
    { dmg: 24, range: 17, rate: 0.138, cost: 18000 }
  ],
  Slasher: [
    { dmg: 6, range: 6, rate: 0.508, cost: 1500 },
    { dmg: 6, range: 6, rate: 0.358, cost: 1250 },
    { dmg: 40, range: 7.5, rate: 0.758, cost: 4750 },
    { dmg: 50, range: 7.5, rate: 0.608, cost: 8250 },
    { dmg: 50, range: 8.5, rate: 0.508, cost: 25000 }
  ],
  "Frost Blaster": [
    { dmg: 5, range: 12, rate: 0.908, cost: 750 },
    { dmg: 5, range: 15, rate: 0.608, cost: 350 },
    { dmg: 9, range: 15, rate: 0.608, cost: 1100 },
    { dmg: 9, range: 17.5, rate: 0.258, cost: 3200 },
    { dmg: 75, range: 27.5, rate: 1.008, cost: 12000 }
  ],
  Swarmer: [
    { dmg: 2, range: 13, rate: 1.208, cost: 900 },
    { dmg: 2, range: 13, rate: 1.208, cost: 600 },
    { dmg: 4, range: 15, rate: 1.008, cost: 1200 },
    { dmg: 0, range: 18, rate: 2.008, cost: 2500 },
    { dmg: 0, range: 20, rate: 1.608, cost: 6000 },
    { dmg: 0, range: 20, rate: 1.208, cost: 12000 }
  ],
  "Toxic Gunner": [
    { dmg: 1, range: 10, rate: 0.108, cost: 525 },
    { dmg: 1, range: 10, rate: 0.108, cost: 200 },
    { dmg: 1, range: 14, rate: 0.108, cost: 800 },
    { dmg: 4, range: 14, rate: 0.108, cost: 3500 },
    { dmg: 11, range: 18, rate: 0.143, cost: 14000 }
  ],
  Sledger: [
    { dmg: 8, range: 6.5, rate: 1.208, cost: 950 },
    { dmg: 12, range: 6.5, rate: 1.208, cost: 400 },
    { dmg: 25, range: 7, rate: 1.208, cost: 1650 },
    { dmg: 45, range: 7, rate: 1.208, cost: 3200 },
    { dmg: 75, range: 7.5, rate: 1.208, cost: 8250 },
    { dmg: 140, range: 7.5, rate: 1.208, cost: 16000 }
  ],
  Executioner: [
    { dmg: 5, range: 14, rate: 3.008, cost: 750 },
    { dmg: 5, range: 14, rate: 2.008, cost: 250 },
    { dmg: 10, range: 14, rate: 2.008, cost: 750 },
    { dmg: 18, range: 18, rate: 2.008, cost: 1900 },
    { dmg: 35, range: 18, rate: 2.008, cost: 4500 },
    { dmg: 80, range: 18, rate: 2.008, cost: 12500 }
  ],
  "Elf Camp": [
    { dmg: 0, range: 1.5, rate: 0, cost: 300 },
    { dmg: 0, range: 1.5, rate: 0, cost: 350 },
    { dmg: 0, range: 1.5, rate: 0, cost: 1800 },
    { dmg: 0, range: 7.5, rate: 0, cost: 4500 },
    { dmg: 0, range: 7.5, rate: 0, cost: 10750 }
  ],
  Jester: [
    { dmg: 2, range: 10, rate: 1.508, cost: 500 },
    { dmg: 2, range: 12, rate: 1.008, cost: 100 },
    { dmg: 4, range: 12, rate: 1.008, cost: 550 },
    { dmg: 12, range: 12, rate: 1.008, cost: 2250 },
    { dmg: 22, range: 14, rate: 0.758, cost: 8500 }
  ],
  Cryomancer: [
    { dmg: 0, range: 10, rate: 0.208, cost: 300 },
    { dmg: 0, range: 12, rate: 0.208, cost: 250 },
    { dmg: 1, range: 13.5, rate: 0.208, cost: 935 },
    { dmg: 2, range: 13.5, rate: 0.208, cost: 4000 },
    { dmg: 5, range: 15, rate: 0.208, cost: 9500 }
  ],
  "Hallow Punk": [
    { dmg: 10, range: 20, rate: 5.008, cost: 450 },
    { dmg: 10, range: 23, rate: 4.008, cost: 300 },
    { dmg: 30, range: 23, rate: 4.008, cost: 2000 },
    { dmg: 120, range: 25, rate: 4.008, cost: 8500 }
  ],
  Harvester: [
    { dmg: 18, range: 20, rate: 1.75, cost: 1750 },
    { dmg: 18, range: 20, rate: 1.2, cost: 650 },
    { dmg: 30, range: 20, rate: 1.208, cost: 1800 },
    { dmg: 65, range: 20, rate: 1.2, cost: 4750 },
    { dmg: 105, range: 23.5, rate: 1, cost: 10000 },
    { dmg: 875, range: 27.5, rate: 3.5, cost: 37500 }
  ],
  Snowballer: [
    { dmg: 4, range: 11, rate: 2.258, cost: 250 },
    { dmg: 5, range: 13, rate: 2.008, cost: 75 },
    { dmg: 10, range: 15, rate: 2.008, cost: 375 },
    { dmg: 28, range: 19, rate: 1.758, cost: 1650 }
  ],
  Elementalist: [
    { dmg: 3, range: 12, rate: 0.208, cost: 2000 },
    { dmg: 5, range: 15, rate: 0.208, cost: 1500 },
    { dmg: 10, range: 17, rate: 0.208, cost: 4000 },
    { dmg: 13, range: 17, rate: 0.208, cost: 8000 },
    { dmg: 18, range: 17, rate: 0.133, cost: 15000 }
  ],
  "Firework Technecian": [
    { dmg: 5, range: 8, rate: 0, cost: 1500 },
    { dmg: 10, range: 8, rate: 0, cost: 2000 },
    { dmg: 20, range: 9, rate: 0, cost: 6500 },
    { dmg: 30, range: 9, rate: 0, cost: 12000 },
    { dmg: 45, range: 10, rate: 0, cost: 22000 }
  ],
  Biologist: [
    { dmg: 0, range: 4, rate: 1.008, cost: 750 },
    { dmg: 0, range: 4, rate: 1.008, cost: 600 },
    { dmg: 0, range: 4, rate: 1.008, cost: 1850 },
    { dmg: 0, range: 4, rate: 1.008, cost: 4500 },
    { dmg: 0, range: 4, rate: 1.008, cost: 20000 }
  ],
  Warlock: [
    { dmg: 25, range: 18, rate: 1.108, cost: 4200 },
    { dmg: 40, range: 19, rate: 1.108, cost: 2500 },
    { dmg: 60, range: 22, rate: 0.808, cost: 6800 },
    { dmg: 115, range: 22, rate: 0.808, cost: 12000 },
    { dmg: 190, range: 24, rate: 0.808, cost: 22500 },
    { dmg: 260, range: 24, rate: 0.708, cost: 32500 }
  ],
  "Spotlight Tech": [
    { dmg: 4, range: 30, rate: 0.308, cost: 3225 },
    { dmg: 4, range: 30, rate: 0.308, cost: 1865 },
    { dmg: 8, range: 35, rate: 0.308, cost: 4820 },
    { dmg: 12, range: 35, rate: 0.208, cost: 12560 },
    { dmg: 15, range: 40, rate: 0.208, cost: 19320 }
  ],
  "War Machine": [
    { dmg: 2, range: 12, rate: 0.108, cost: 2000 },
    { dmg: 2, range: 18, rate: 0.108, cost: 250 },
    { dmg: 3, range: 22, rate: 0.108, cost: 650 },
    { dmg: 8, range: 22, rate: 0.108, cost: 5000 },
    { dmg: 12, range: 24, rate: 0.108, cost: 12500 },
    { dmg: 40, range: 26, rate: 0.108, cost: 50000 }
  ],
  "Mecha Base": [
    { dmg: 8, range: 30, rate: 0.208, cost: 5000 },
    { dmg: 8, range: 30, rate: 0.208, cost: 400 },
    { dmg: 12, range: 25, rate: 0.158, cost: 900 },
    { dmg: 10, range: 25, rate: 0.088, cost: 2400 },
    { dmg: 10, range: 100, rate: 0.058, cost: 4500 },
    { dmg: 20, range: 100, rate: 0.058, cost: 6500 }
  ]
};
