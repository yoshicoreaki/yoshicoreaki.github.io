export const key = (id) => `lvl_${id}`;
export const branchKey = (id) => `branch_${id}`;

export const num = (x, fallback = 0) => {
    const n = Number(x);
    return Number.isFinite(n) ? n : fallback;
};

export function getLvl(id) {
    return num(localStorage.getItem(key(id)), 0);
}

export function setLvl(id, lvl) {
    localStorage.setItem(key(id), String(lvl));
}

export function ensureLvl(id, start = 0) {
    if (localStorage.getItem(key(id)) === null) setLvl(id, start);
}

export function clearLvl(id) {
    localStorage.removeItem(key(id));
}

export function getBranch(id) {
    return localStorage.getItem(branchKey(id)) || "";
}

export function setBranch(id, branch) {
    localStorage.setItem(branchKey(id), String(branch));
}

export function clearBranch(id) {
    localStorage.removeItem(branchKey(id));
}
