let cp;
let sp;
let ep;
let gp;
let pp;

let userWallet = {
  "Copper": 0,
  "Silver": 0,
  "Electrum": 0,
  "Gold": 0,
  "Platinum": 0
}

let conversionTable = {
  "Copper": 1,
  "Silver": 10,
  "Electrum": 50,
  "Gold": 100,
  "Platinum": 1000
}

document.addEventListener("DOMContentLoaded", function() {
  // remove event handlers
  document.getElementById("minusCp").addEventListener("click", removeCp);
  document.getElementById("minusSp").addEventListener("click", removeSp);
  document.getElementById("minusEp").addEventListener("click", removeEp);
  document.getElementById("minusGp").addEventListener("click", removeGp);
  document.getElementById("minusPp").addEventListener("click", removePp);
  document.getElementById("minusAll").addEventListener("click", minusAll);

  // add event handlers
  document.getElementById("addCp").addEventListener("click", addCp);
  document.getElementById("addSp").addEventListener("click", addSp);
  document.getElementById("addEp").addEventListener("click", addEp);
  document.getElementById("addGp").addEventListener("click", addGp);
  document.getElementById("addPp").addEventListener("click", addPp);
  document.getElementById("addAll").addEventListener("click", addAll);
});


// wallet?
function getTotals() {
  cp = parseInt(document.getElementById("cpTotal").value, 10);
  sp = parseInt(document.getElementById("spTotal").value, 10);
  ep = parseInt(document.getElementById("epTotal").value, 10);
  gp = parseInt(document.getElementById("gpTotal").value, 10);
  pp = parseInt(document.getElementById("ppTotal").value, 10);
}

function removeBitches() {
  //totals is the wallet
  getTotals();
  //change [0] for variable later
  let coin = Object.keys(userWallet)[0]

  //0 until someone changes it
  // cost is what they are minusing from the getTotals()
  let cost = parseInt(document.getElementById(coin).value, 10) * conversionTable[coin];

  let totalCopper = (pp * 1000 + gp * 100 + ep * 50 + sp * 10 + cp);
  //if copper base of everything then do more:
  // say 100 cp, 10 sp remove 15sp  = 50 cp == 5s?
  // looking for 5sp at the end
  if (totalCopper >= cost) {
    // ^ after you check if you have enough money for the coin
    // remove everything starting from copper till you have amount
    let totalCopperAmount = totalCopper - cost;
  } else {
    alert("Too Expensive");
  }

}

function removeCp() {
  getTotals();
  let cost = parseInt(document.getElementById("cp").value, 10);
  if (pp * 1000 + gp * 100 + ep * 50 + sp * 10 + cp) {
    if (cp > cost) {
      cp = cp - cost
      balances([cp, sp, ep, gp, pp]);
    } else if (sp * 10 + cp >= cost) {
      for (i = sp; cp < cost; i--) {
        sp = sp - 1
        cp = cp + 10
      }
      cp = cp - cost
      balances([cp, sp, ep, gp, pp]);
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
      balances([cp, sp, ep, gp, pp])
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
      balances([cp, sp, ep, gp, pp])
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
      balances([cp, sp, ep, gp, pp]);
    }
  } else {
    alert("Too Expensive");
  }
}

function removeSp() {
  getTotals();
  let cost = parseInt(document.getElementById("sp").value, 10);
  if (pp * 1000 + gp * 100 + ep * 50 + sp * 10 + cp >= cost / 10) {
    if (cp / 10 >= cost) {
      // cp -= 10
      cp = cp - cost * 10
      // sp += cost
      sp = cost + sp
    } else if (cp / 10 + sp >= cost) {
      while (sp < cost & cp > 9) {
        cp -= 10
        sp++
      }
    }
    if (sp >= cost) {
      sp = sp - cost
      balances([cp, sp, ep, gp, pp])
    } else if (ep * 5 + sp >= cost) {
      for (i = ep; sp < cost; i--) {
        ep = ep - 1
        sp = sp + 5
      }
      sp = sp - cost
      balances([cp, sp, ep, gp, pp])
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
      balances([cp, sp, ep, gp, pp])
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
      balances([cp, sp, ep, gp, pp]);
    }
  } else {
    alert("Too Expensive");
  }
}

function removeEp() {
  getTotals();
  let cost = parseInt(document.getElementById("ep").value, 10);
  if (pp * 1000 + gp * 100 + ep * 50 + sp * 10 + cp >= cost / 50) {
    if (cp / 50 >= cost) { //check if enough copper on its own
      // ep = cp - (cost )
      cp = cp - cost * 50
      // ep = 0 + cost
      ep = ep + cost
    } else if ((ep + sp / 5 + cp / 50) >= cost) { 
      while (cp / 50 + sp / 5 + ep >= cost & cp > 9) {
        cp = cp - 10
        sp = sp + 1
      }
      while (sp / 5 + ep >= cost & sp > 4) {
        sp -= 5
        ep += 1
      }
    } else if ((sp / 5 + cp / 50) >= cost) { //checks if cp + silver is enough
      while (cp / 50 + sp / 5 >= cost & cp > 9) {
        cp -= 10
        sp += 1
      }
      while (sp / 5 >= cost & sp > 4) {
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
      balances([cp, sp, ep, gp, pp])
    } else if (gp * 2 + ep >= cost) { //gold check
      for (i = gp; ep < cost; i--) {
        gp = gp - 1
        ep = ep + 2
      }
      ep = ep - cost
      balances([cp, sp, ep, gp, pp])
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
      balances([cp, sp, ep, gp, pp]);
    }
  } else {
    alert("Too Expensive");
  }
}

function removeGp() {
  getTotals();
  let cost = parseInt(document.getElementById("gp").value, 10);
  if (pp * 1000 + gp * 100 + ep * 50 + sp * 10 + cp >= cost / 100) {
    if (cp / 100 >= cost) {
      cp = cp - cost * 100
      gp = cost + gp
    } else if ((sp / 10) + cp / 100 >= cost) {
      while (sp / 10 < cost & cp > 9) {
        cp -= 10
        sp += 1
      }
      while (gp < cost & sp > 9) {
        sp -= 10
        gp += 1
      }
    } else if (ep / 2 + sp / 10 + cp / 100 >= cost) {
      while (sp / 10 + ep / 2 < cost & cp > 9) {
        cp -= 10
        sp += 1
      }
      while (ep / 2 < cost & sp > 4) {
        sp -= 5
        ep += 1
      }
      while (gp < cost & ep > 1) {
        ep -= 2
        gp += 1
      }
    } else if (gp + ep / 2 + sp / 10 + cp / 100 >= cost) {
      while (cp / 100 + sp / 10 + ep / 2 < cost & cp > 9) {
        cp -= 10
        sp += 1
      }
      while (sp / 10 + ep / 2 < cost & sp > 4) {
        sp -= 5
        ep += 1
      }
      while (ep / 2 < cost & ep > 1) {
        ep -= 2
        gp += 1
      }
    }
    if (gp >= cost) { //gold check
      gp = gp - cost
      balances([cp, sp, ep, gp, pp])
    } else if (pp * 10 + gp >= cost) { //gold check
      for (i = pp; gp < cost; i--) {
        pp = pp - 1
        gp = gp + 10
      }
      gp = gp - cost
      balances([cp, sp, ep, gp, pp]);
    }
  } else {
    alert("Too Expensive");
  }
}

function removePp() {
  getTotals();
  let cost = parseInt(document.getElementById("pp").value, 10);
  if (pp * 1000 + gp * 100 + ep * 50 + sp * 10 + cp >= cost / 1000) {
    if (cp / 1000 >= cost) {
      cp = cp - cost * 1000
      pp = cost + pp
    } else if ((sp / 100) + cp / 1000 >= cost) {
      while (sp / 100 < cost & cp > 9) {
        cp -= 10
        sp += 1
      }
      while (pp < cost & sp > 99) {
        sp -= 100
        pp += 1
      }
    } else if (ep / 20 + sp / 100 + cp / 1000 >= cost) {
      while (ep / 20 + sp / 100 < cost & cp > 9) {
        cp -= 10
        sp += 1
      }
      while (ep / 20 < cost & sp > 4) {
        sp -= 5
        ep += 1
      }
      while (pp < cost & ep > 19) {
        ep -= 20
        pp += 1
      }
    } else if (gp / 10 + ep / 20 + sp / 100 + cp / 1000 >= cost) {
      while (gp / 10 + ep / 20 + sp / 100 < cost & cp > 9) {
        cp -= 10
        sp += 1
      }
      while (gp / 10 + ep / 20 < cost & sp > 4) {
        sp -= 5
        ep += 1
      }
      while (gp / 10 < cost & ep > 1) {
        ep -= 2
        gp += 1
      }
      while (pp < cost & gp > 9) {
        gp -= 10
        pp += 1
      }
    } else if (pp + gp / 10 + ep / 20 + sp / 100 + cp / 1000 >= cost) {
      while (pp + gp / 10 + ep / 20 + sp / 100 < cost & cp > 9) {
        cp -= 10
        sp += 1
      }
      while (pp+ gp / 10 + ep / 20 < cost & sp > 4) {
        sp -= 5
        ep += 1
      }
      while (pp + gp / 10 < cost & ep > 1) {
        ep -= 2
        gp += 1
      }
      while (pp < cost & gp > 9) {
        gp -= 10
        pp += 1
      }
    }
    if (pp >= cost) {
      pp = pp - cost
      balances([cp, sp, ep, gp, pp]);
    }
  } else {
    alert("Too Expensive");
  }
}

function addCp() {
  getTotals();
  let cost = parseInt(document.getElementById("cp").value, 10);
  cp = cp + cost
  balances([cp, sp, ep, gp, pp]);
}

function addSp() {
  getTotals();
  let cost = parseInt(document.getElementById("sp").value, 10);
  sp = sp + cost
  balances([cp, sp, ep, gp, pp]);
}

function addEp() {
  getTotals();
  let cost = parseInt(document.getElementById("ep").value, 10);
  ep = ep + cost
  balances([cp, sp, ep, gp, pp]);
}

function addGp() {
  getTotals();
  let cost = parseInt(document.getElementById("gp").value, 10);
  gp = gp + cost
  balances([cp, sp, ep, gp, pp]);
}

function addPp() {
  getTotals();
  let cost = parseInt(document.getElementById("pp").value, 10);
  pp = pp + cost
  balances([cp, sp, ep, gp, pp]);
}

// fix warning about getting NAN for values not set
function balances(wallet) {
  document.getElementById("cpTotal").value = wallet[0];
  document.getElementById("spTotal").value = wallet[1];
  document.getElementById("epTotal").value = wallet[2];
  document.getElementById("gpTotal").value = wallet[3];
  document.getElementById("ppTotal").value = wallet[4];
}

function minusAll() {
  //add a check if cost > wallet
  getTotals();
  removePp();
  removeGp();
  removeEp();
  removeSp();
  removeCp();
}

function addAll() {
  getTotals();
  addPp();
  addGp();
  addEp();
  addSp();
  addCp();
}

