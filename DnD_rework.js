// var transaction = {
//     "Copper": 0,
//     "Silver": 0,
//     "Electrum": 0,
//     "Gold": 0,
//     "Platinum": 0
// }

// let userWallet = {
//     "Copper": 0,
//     "Silver": 0,
//     "Electrum": 0,
//     "Gold": 0,
//     "Platinum": 0
// }
  
//   let conversionTable = {
//     "Copper": 1,
//     "Silver": 10,
//     "Electrum": 50,
//     "Gold": 100,
//     "Platinum": 1000
// }

//found bug: cost = [360,500,10,50,3], wallet= [0,0,0,0,13]
var cost = [360,500,10,0,0]

var transaction = [0,0,0,0,0]

var userWallet = [0,0,0,130,0]
  
var conversionTable = [1,10,50,100,1000]g

var costSum = [0,0,0,0,0]

var transactionSum = [0,0,0,0,0]

var walletSum = [0,0,0,0,0]


function transferBitches() {
    let i = 0
    checkWallet() //check to see total copper base in user wallet
    let walletCp = walletSum.reduce((partialSum, a) => partialSum + a, 0) //doesnt convert? drunk so dont pay attention
    let costCp = costSum.reduce((partialSum, a) => partialSum + a, 0)
    let transactionCp = transactionSum.reduce((partialSum, a) => partialSum + a, 0)
    if (costCp <= walletCp){ //if total user wallet in copper > total cost in copper 
        for (let k = 0; k <= 4; k++) { //loops next while 4 times
            while (userWallet[i] > 0) { //subtract all coins in i of user wallet (i = 0 = copper, i = 1 = silver, i = 2 = electrum...)
                userWallet[i] -- // - 1 coin from user wallet
                transaction[i] ++ //+1 coin to new transactions wallet
                checkTransactionSum() //gets the sum of the transaction
                checkCostSum()// get the sum of the cost
            if (transactionCp >= costCp) { // converts sum of cost and sum of transaction and checks against each other
                break //if transaction wallet > cost break loop
            }
        }
        i++
        }
    } else { //else not enough copper in wallet, too expensive
    console.log("Too Expensive")
    }
}

function removeBitches() {
    let change = transactionSum.reduce((partialSum, a) => partialSum + a, 0) - costSum.reduce((partialSum, a) => partialSum + a, 0) //take the transaction convert to copper, and subtract the sum converted to copper
    for (let i = 4; i >= 0; i--) {
        userWallet[i] = Math.floor(change / conversionTable[i])  //add coins based on conversion rate to i (the coin selected)
        change -= Math.floor(change / conversionTable[i]) * conversionTable[i] //subtract what change was converted
    }
}


transferBitches()
removeBitches()


function checkWallet(){
    for (j = 0; j <= 4; j++) {
        walletSum[j] = userWallet[j] * conversionTable[j]
    }
    return walletSum
}
function checkTransactionSum() {
    for (j = 0; j <= 4; j++) {
        transactionSum[j] = transaction[j] * conversionTable[j]
    }
    return transactionSum
}
function checkCostSum() {
    for (j = 0; j <= 4; j++) {
        costSum[j] = cost[j] * conversionTable[j]
    }
    return costSum
}

console.log("wallet in cp: "+walletSum.reduce((partialSum, a) => partialSum + a, 0))
console.log("cost in cp: "+costSum.reduce((partialSum, a) => partialSum + a, 0))
console.log("wallet: "+userWallet)
console.log("transaction: "+transaction)
console.log("sum of transaction: "+transactionSum.reduce((partialSum, a) => partialSum + a, 0))
console.log("sum of cost: "+costSum.reduce((partialSum, a) => partialSum + a, 0))