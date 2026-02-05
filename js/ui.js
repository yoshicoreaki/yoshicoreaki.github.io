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
const tcDetect = document.getElementById("tcDetect");

const DETECT_ICONS = {
  hidden: "img/icons/hidden_detection.png",
  lead: "img/icons/lead_detection.png",
  flying: "img/icons/flying_detection.png"
};

function parseDetection(raw) {
  if (!raw) return {};
  const out = {};
  raw.split(",").forEach((part) => {
    const trimmed = part.trim();
    if (!trimmed) return;
    const [type, lvl] = trimmed.split(":");
    const key = (type || "").trim().toLowerCase();
    if (!key) return;
    const n = Number.parseInt((lvl || "").trim(), 10);
    out[key] = Number.isFinite(n) ? n : 1;
  });
  return out;
}

export function openModalUI(tower) {
  mName.textContent = tower.name || "Tower";
  mType.textContent = tower.type || "Type";

  if (tower.img) {
    mImg.src = tower.img;
    mImg.alt = tower.name || "";
  } else {
    mImg.removeAttribute("src");
    mImg.alt = tower.name || "";
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

  if (tcDetect) {
    tcDetect.innerHTML = "";
    const detection = parseDetection(tower.detection);
    Object.keys(detection).forEach((type) => {
      const req = detection[type];
      if (lvl < req) return;
      const src = DETECT_ICONS[type];
      if (!src) return;
      const img = document.createElement("img");
      img.className = "detect__ico";
      img.src = src;
      img.alt = `${type} detection`;
      tcDetect.appendChild(img);
    });
  }
}
