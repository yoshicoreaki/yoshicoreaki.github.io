import { ensureLvl, getLvl, setLvl, num } from "./storage.js";
import { normalizeTower } from "./tower.js";
import { openModalUI, closeModalUI, renderModal, isOpen } from "./ui.js";

let current = null;

const modal = document.getElementById("towerModal");
const tcUp  = document.getElementById("tcUp");
const tcSell= document.getElementById("tcSell");

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
    const maxLvl = num(current.maxlvl, 0);
    const lvl = getLvl(current.id);
    if (lvl >= maxLvl) return;

    setLvl(current.id, lvl + 1);
    renderModal(current);
});

if (tcSell) {
    tcSell.addEventListener("click", () => {
        if (!current) return;
        setLvl(current.id, 0);
        renderModal(current);
    });
}
