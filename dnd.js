var cp = 98;
var sp = 631;
var ep = 0;
var gp = 0;
var pp = 0;

function removeCp(cost) {
    if (pp * 1000 + gp * 100 + ep * 50 + sp * 10 + cp) {
        if (cp >= cost) {
            cp = cp - cost
            return [cp, sp, ep, gp, pp]
        } else if (sp * 10 + cp >= cost) {
            for (i = sp; cp < cost; i--) {
                sp = sp - 1
                cp = cp + 10
            }
            cp = cp - cost
            return [cp, sp, ep, gp, pp]
        } else if (ep * 50 + sp * 10 + cp >= cost) {
            for (i = ep; sp * 10 + cp < cost; i--) {
                ep = ep - 1
                sp = sp + 5
            }
            for (i = sp; cp < cost; i--) {
                sp = sp - 1
                cp = cp + 10
            }
            cp = cp - cost
            return [cp, sp, ep, gp, pp]
        } else if (gp * 100 + ep * 50 + sp * 10 + cp >= cost) {
            for (i = gp; ep * 50 + sp * 10 + cp < cost; i--) {
                gp = gp - 1
                ep = ep + 2
            }
            for (i = ep; sp * 10 + cp < cost; i--) {
                ep = ep - 1
                sp = sp + 5
            }
            for (i = sp; cp < cost; i--) {
                sp = sp - 1
                cp = cp + 10
            }
            cp = cp - cost
            return [cp, sp, ep, gp, pp]
        } else if (pp * 1000 + gp * 100 + ep * 50 + sp * 10 + cp >= cost) {
            for (i = pp; gp * 100 + ep * 50 + sp * 10 + cp < cost; i--) {
                pp = pp - 1
                gp = gp + 10
            }
            for (i = gp; ep * 50 + sp * 10 + cp < cost; i--) {
                gp = gp - 1
                ep = ep + 2
            }
            for (i = ep; sp * 10 + cp < cost; i--) {
                ep = ep - 1
                sp = sp + 5
            }
            for (i = sp; cp < cost; i--) {
                sp = sp - 1
                cp = cp + 10
            }
            cp = cp - cost
            return [cp, sp, ep, gp, pp]
        }
    } else {
        return "Too expensive"
    }
}

function removeSp(cost) {
    if (pp * 1000 + gp * 100 + ep * 50 + sp * 10 + cp >= cost * 10) {
        if (cp / 10 >= cost) {
            cp = cp - cost * 10
            sp = cost + sp
        }
        if (sp >= cost) {
            sp = sp - cost
            return [cp, sp, ep, gp, pp]
        } else if (ep * 5 + sp >= cost) {
            for (i = ep; sp < cost; i--) {
                ep = ep - 1
                sp = sp + 5
            }
            sp = sp - cost
            return [cp, sp, ep, gp, pp]
        } else if (gp * 10 + ep * 5 + sp >= cost) {
            for (i = gp; ep * 5 + sp < cost; i--) {
                gp = gp - 1
                ep = ep + 2
            }
            for (i = ep; sp < cost; i--) {
                ep = ep - 1
                sp = sp + 5
            }
            sp = sp - cost
            return [cp, sp, ep, gp, pp]
        } else if (pp * 100 + gp * 10 + ep * 5 + sp >= cost) {
            for (i = pp; gp * 10 + ep * 5 + sp < cost; i--) {
                pp = pp - 1
                gp = gp + 10
            }
            for (i = gp; ep * 5 + sp < cost; i--) {
                gp = gp - 1
                ep = ep + 2
            }
            for (i = ep; sp < cost; i--) {
                ep = ep - 1
                sp = sp + 5
            }
            sp = sp - cost
            return [cp, sp, ep, gp, pp]
        }
    } return "Too Expensive"
}

function removeEp(cost) {
    if (pp * 1000 + gp * 100 + ep * 50 + sp * 10 + cp >= cost * 50) {
        if (cp / 50 >= cost) { //check if enough copper on its own
            cp = cp - cost * 50
            ep = ep + cost
        } else if ((cp / 50) + (sp / 5) >= cost) { //checks if cp + silver is enough
            while (sp / 5 < cost) {
                cp -= 10
                sp += 1
            }
            while (ep < cost) {
                sp -= 5
                ep += 1
            }
        } else if (sp / 5 >= cost) { //checks if enough silver on its own
            sp = sp - cost * 5
            ep = ep + cost
        } else {
            for (i = cp; i / 50 >= 1; i = i - 50) {
                cp = cp - 50
                ep = ep + 1
            }
            for (i = sp; i / 5 >= 1; i = i - 5) {
                sp = sp - 5
                ep = ep + 1
            }
        }
        if (ep >= cost) { //electrum check
            ep = ep - cost
            return [cp, sp, ep, gp, pp]
        } else if (gp * 2 + ep >= cost) { //gold check
            for (i = gp; ep < cost; i--) {
                gp = gp - 1
                ep = ep + 2
            }
            ep = ep - cost
            return [cp, sp, ep, gp, pp]
        } else if (pp * 20 + gp * 2 + ep >= cost) { //plat check
            for (i = pp; gp * 2 + ep < cost; i--) {
                pp = pp - 1
                gp = gp + 10
            }
            for (i = gp; ep < cost; i--) {
                gp = gp - 1
                ep = ep + 2
            }
            ep = ep - cost
            return [cp, sp, ep, gp, pp]
        }
    } else {
        return "Too expensive"
    }
}

function removeGp(cost) {
    if (pp * 1000 + gp * 100 + ep * 50 + sp * 10 + cp >= cost * 100) {
        if (cp / 100 >= cost) {
            cp = cp - cost * 100
            gp = cost + gp
        } else if ((sp / 10) + cp / 100 >= cost) {
            while (sp / 10 < cost) {
                cp -= 10
                sp += 1
            }
            while (gp < cost) {
                sp -= 10
                gp += 1
            }
        } else if (ep / 2 + sp / 10 + cp / 100 >= cost) {
            while (sp / 10 + ep / 2 < cost) {
                cp -= 10
                sp += 1
            }
            while (ep / 2 < cost) {
                sp -= 5
                ep += 1
            }
            while (gp < cost) {
                ep -= 2
                gp += 1
            }
        }
        if (gp >= cost) { //gold check
            gp = gp - cost
            return [cp, sp, ep, gp, pp]
        } else if (pp * 10 + gp >= cost) { //gold check
            for (i = pp; gp < cost; i--) {
                pp = pp - 1
                gp = gp + 10
            }
            gp = gp - cost
            return [cp, sp, ep, gp, pp]
        }
    } else {
        return "Too Expensive"
    }
}

function removePp(cost) {
    if (pp * 1000 + gp * 100 + ep * 50 + sp * 10 + cp >= cost * 1000) {
        if (cp / 1000 >= cost) {
            cp = cp - cost * 100
            gp = cost + gp
        } else if ((sp / 100) + cp / 1000 >= cost) {
            while (sp / 100 < cost) {
                cp -= 10
                sp += 1
            }
            while (pp < cost) {
                sp -= 100
                pp += 1
            }
        } else if (ep / 20 + sp / 100 + cp / 1000 >= cost) {
            while (ep / 20 + sp / 100 < cost) {
                cp -= 10
                sp += 1
            }
            while (ep / 20 < cost) {
                sp -= 5
                ep += 1
            }
            while (pp < cost) {
                ep -= 20
                pp += 1
            }
        } else if (gp / 10 + ep / 20 + sp / 100 + cp / 1000 >= cost) {
            while (gp / 10 + ep / 20 + sp / 100 < cost) {
                cp -= 10
                sp += 1
            }
            while (gp / 10 + ep / 20 < cost) {
                sp -= 5
                ep += 1
            }
            while (gp / 10 < cost) {
                ep -= 2
                gp += 1
            }
            while (pp < cost) {
                gp -= 10
                pp += 1
            }
        }
        if (pp >= cost) {
            pp = pp - cost
            return [cp, sp, ep, gp, pp]
        }
    } else {
        return "Too Expensive"
    }
}

// console.log(removeCp(1));
// console.log(removeSp(1));
// console.log(removeEp(1));
// console.log(removeGp(1));
// console.log(removePp(1));