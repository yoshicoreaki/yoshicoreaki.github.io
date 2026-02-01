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

let current = null;

const num = (x, fallback=0) => {
    const n = Number(x);
    return Number.isFinite(n) ? n : fallback;
};

const key = (id) => "lvl_" + id;

function getLvl(id){ return num(localStorage.getItem(key(id)), 0); }
function setLvl(id, lvl){ localStorage.setItem(key(id), String(lvl)); }

function compute(d, lvl){
    return {
        dmg:   num(d.baseDmg) + num(d.incDmg) * lvl,
        range: num(d.baseRange) + num(d.incRange) * lvl,
        rate:  +(num(d.baseFirerate) + num(d.incFirerate) * lvl).toFixed(2),
        cost:  num(d.baseCost) + num(d.incCost) * lvl
    };
}

function render(){
    if (!current) return;

    const maxLvl = num(current.maxlvl, 0);
    let lvl = Math.min(getLvl(current.id), maxLvl);

    const s = compute(current, lvl);

    mDmg.textContent = s.dmg;
    mRange.textContent = s.range;
    mRate.textContent = s.rate;
    mCost.textContent = s.cost;

    tcLvl.textContent = `LVL ${lvl} / ${maxLvl}`;
    tcBar.style.width = maxLvl ? `${(lvl / maxLvl) * 100}%` : "0%";

    if (lvl >= maxLvl){
        tcUp.disabled = true;
        tcUp.textContent = "MAXED";
        tcNext.textContent = "Max level reached.";
    } else {
        tcUp.disabled = false;
        tcUp.textContent = "UPGRADE";
        tcNext.textContent =
            `Next: +${current.incDmg} dmg, +${current.incRange} range, ${current.incFirerate} rate, +${current.incCost}$`;
    }
}

function openModal(ds){
    // ds — это card.dataset
    current = {
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

    mName.textContent = current.name;
    mType.textContent = current.type;

    if (current.img) {
        mImg.src = current.img;
        mImg.alt = current.name;
    }

    modal.classList.add("is-open");
    document.body.classList.add("modal-lock");
    modal.setAttribute("aria-hidden", "false");

    if (localStorage.getItem(key(current.id)) === null) setLvl(current.id, 0);

    render();
}

function closeModal(){
    modal.classList.remove("is-open");
    document.body.classList.remove("modal-lock");
    modal.setAttribute("aria-hidden", "true");
}

document.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (card) {
        e.preventDefault();
        if (!card.dataset.name) return;
        openModal(card.dataset);
        return;
    }
    if (e.target.matches("[data-close]")) closeModal();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
});

tcUp.addEventListener("click", () => {
    if (!current) return;
    const maxLvl = num(current.maxlvl, 0);
    const lvl = getLvl(current.id);
    if (lvl >= maxLvl) return;
    setLvl(current.id, lvl + 1);
    render();
});
tcSell.addEventListener("click", () => {
    if (!current) return;
    setLvl(current.id, 1);

    render();
});