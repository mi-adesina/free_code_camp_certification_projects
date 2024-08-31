const cash = document.getElementById("cash");
const changeDueDiv = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");

let price = 19.5;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

const currencyUnit = {
  'PENNY': 0.01,
  'NICKEL': 0.05,
  'DIME': 0.10,
  'QUARTER': 0.25,
  'ONE': 1.00,
  'FIVE': 5.00,
  'TEN': 10.00,
  'TWENTY': 20.00,
  'ONE HUNDRED': 100.00
};

const printChange = (cid, change) => {
  let changeArr = [];
  let output = "Status: CLOSED";

  for (let i = cid.length - 1; i >= 0; i--) {
    let denomination = cid[i][0];
    let amount = cid[i][1];
    let unitValue = currencyUnit[denomination];
    let count = 0;

    while (change >= unitValue && amount > 0) {
      change = parseFloat((change - unitValue).toFixed(2)); // Fix floating-point precision
      amount = parseFloat((amount - unitValue).toFixed(2));
      count += unitValue;
    }

    if (count > 0) {
      changeArr.push(`${denomination}: $${count.toFixed(2)}`);
      cid[i][1] = amount; // Update the cid array with the new amount
    }
  }

  if (change > 0) {
    return "Status: INSUFFICIENT_FUNDS";
  }
  
  for (let i = 0; i < cid.length; i++) {
    if (cid[i][1] !== 0) {
      output = "Status: OPEN";
    }
  }


  output += changeArr.join(", ");
  return output;
};

purchaseBtn.addEventListener("click", () => {
  let cashPaid = parseFloat(cash.value);

  if (cashPaid < price) {
    alert("Customer does not have enough money to purchase the item");
  } else if (cashPaid === price) {
    changeDueDiv.innerText = "No change due - customer paid with exact cash";
  } else {
    let change = parseFloat((cashPaid - price).toFixed(2)); // Fix floating-point precision
    // alert(`${change}`)
    let output = printChange([...cid], change); // Pass a copy of cid
    changeDueDiv.innerText = output;
  }
});
