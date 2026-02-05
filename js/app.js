import { ensureLvl, getLvl, setLvl, getBranch, setBranch, clearBranch } from "./storage.js";
import { normalizeTower, getBranchData, resolveLevels } from "./tower.js";
import { openModalUI, closeModalUI, renderModal, isOpen } from "./ui.js";

let current = null;

const modal = document.getElementById("towerModal");
const tcUp  = document.getElementById("tcUp");
const tcSell= document.getElementById("tcSell");
const tcUpA = document.getElementById("tcUpA");
const tcUpB = document.getElementById("tcUpB");

function openTower(ds) {
    current = normalizeTower(ds);
    ensureLvl(current.id, 0);
    openModalUI(current);
    renderModal(current);
}

document.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (card) {
        e.preventDefault();
        if (!card.dataset.name) return;
        openTower(card.dataset);
        return;
    }

    if (e.target.matches("[data-close]")) closeModalUI();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) closeModalUI();
});

tcUp.addEventListener("click", () => {
    if (!current) return;
    const branch = getBranch(current.id);
    const levels = resolveLevels(current, branch);
    const maxLvl = Math.max(0, levels.length - 1);
    const lvl = getLvl(current.id);
    if (lvl >= maxLvl) return;

    const branchData = getBranchData(current);
    if (branchData && !branch && lvl >= (branchData.base.length - 1)) return;

    setLvl(current.id, lvl + 1);
    renderModal(current);
});

if (tcUpA) {
    tcUpA.addEventListener("click", () => {
        if (!current) return;
        const branchData = getBranchData(current);
        if (!branchData) return;
        const lvl = getLvl(current.id);
        if (lvl < (branchData.base.length - 1)) return;
        setBranch(current.id, "a");
        setLvl(current.id, lvl + 1);
        renderModal(current);
    });
}

if (tcUpB) {
    tcUpB.addEventListener("click", () => {
        if (!current) return;
        const branchData = getBranchData(current);
        if (!branchData) return;
        const lvl = getLvl(current.id);
        if (lvl < (branchData.base.length - 1)) return;
        setBranch(current.id, "b");
        setLvl(current.id, lvl + 1);
        renderModal(current);
    });
}

if (tcSell) {
    tcSell.addEventListener("click", () => {
        if (!current) return;
        setLvl(current.id, 0);
        clearBranch(current.id);
        renderModal(current);
    });
}
