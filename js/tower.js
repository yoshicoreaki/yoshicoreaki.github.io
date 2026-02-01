import { num } from "./storage.js";

export function normalizeTower(ds) {
    return {
        id: ds.id || ds.name || "tower",
        name: ds.name || "Tower",
        type: ds.type || "",
        img: ds.img || "",

        maxlvl: ds.maxlvl,

        baseDmg: ds.baseDmg,
        baseRange: ds.baseRange,
        baseFirerate: ds.baseFirerate,
        baseCost: ds.baseCost,

        incDmg: ds.incDmg,
        incRange: ds.incRange,
        incFirerate: ds.incFirerate,
        incCost: ds.incCost,
    };
}

export function computeStats(tower, lvl) {
    return {
        dmg:   num(tower.baseDmg) + num(tower.incDmg) * lvl,
        range: num(tower.baseRange) + num(tower.incRange) * lvl,
        rate:  +(num(tower.baseFirerate) + num(tower.incFirerate) * lvl).toFixed(2),
        cost:  num(tower.baseCost) + num(tower.incCost) * lvl,
    };
}
