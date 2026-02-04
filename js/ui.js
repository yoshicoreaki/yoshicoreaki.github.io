 import { num, getLvl } from "./storage.js";
import { getStatsAtLevel } from "./tower.js";

const modal = document.getElementById("towerModal");

const mImg = document.getElementById("mImg");
const mName = document.getElementById("mName");
const mType = document.getElementById("mType");
const mDmg = document.getElementById("mDmg");
const mRange = document.getElementById("mRange");
const mRate = document.getElementById("mRate");
const mCost = document.getElementById("mCost");

const tcLvl = document.getElementById("tcLvl");
const tcBar = document.getElementById("tcBar");
const tcUp  = document.getElementById("tcUp");
const tcNext= document.getElementById("tcNext");
const tcSell= document.getElementById("tcSell");

export function openModalUI(tower) {
    mName.textContent = tower.name;
    mType.textContent = tower.type;

    if (tower.img) {
        mImg.src = tower.img;
        mImg.alt = tower.name || "";
        } else{
            mImg.removeattribute("src");
            m.Img.alt = tower.name || "";
        }
        const maxlvl = num(tower.maxlvl, 0);
        const lvl = Math.min(getLvl(tower.id), maxlvl);
        const s = getStatsAtLvl(tower, lvl);
        
    }

    modal.classList.add("is-open");
    document.body.classList.add("modal-lock");
    modal.setAttribute("aria-hidden", "false");
}

export function closeModalUI() {
    modal.classList.remove("is-open");
    document.body.classList.remove("modal-lock");
    modal.setAttribute("aria-hidden", "true");
}

export function isOpen() {
    return modal.classList.contains("is-open");
}

export function renderModal(tower) {
  const maxLvl = num(tower.maxlvl, 0);
  const lvl = Math.min(getLvl(tower.id), maxLvl);

  const s = getStatsAtLevel(tower, lvl);

  mDmg.textContent = s.dmg;
  mRange.textContent = s.range;
  mRate.textContent = s.rate;
  mCost.textContent = s.cost;

  tcLvl.textContent = `LVL ${lvl} / ${maxLvl}`;
  tcBar.style.width = maxLvl ? `${(lvl / maxLvl) * 100}%` : "0%";

  if (lvl >= maxLvl) {
    tcUp.disabled = true;
    tcUp.textContent = "MAXED";
    tcNext.textContent = "Max level reached.";
  } else {
    tcUp.disabled = false;
    tcUp.textContent = "UPGRADE";
    const next = getStatsAtLevel(tower, lvl + 1);
    tcNext.textContent = next
      ? `Next: ${next.dmg} dmg, ${next.range} range, ${next.rate} rate`
      : "Max level reached.";
  }

  if (tcSell) tcSell.disabled = lvl <= 1;
}
