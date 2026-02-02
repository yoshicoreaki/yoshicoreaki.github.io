import { num } from "./storage.js";

export function normalizeTower(ds) {
    return {
        id: ds.id,
        name: ds.name,
        type: ds.type,
        img: ds.img,

        maxlvl: num(ds.maxlvl, 0),

        levels: TOWER_LEVELS[ds.id] || []
    };
}

export function getStatsAtLevel(tower, lvl) {
    return tower.levels[lvl] || tower.levels[0] || {
        dmg: 0,
        range: 0,
        rate: 0,
        cost: 0
    };
}

export const TOWER_LEVELS = {
    Scout: [
        { dmg: 2,  range: 12, rate: 0.80, cost: 200 },
        { dmg: 3,  range: 13, rate: 0.75, cost: 250 },
        { dmg: 4,  range: 14, rate: 0.70, cost: 350 },
        { dmg: 6,  range: 16, rate: 0.65, cost: 500 },
        { dmg: 8,  range: 18, rate: 0.60, cost: 700 },
        { dmg: 10, range: 20, rate: 0.55, cost: 950 }
    ]
};
