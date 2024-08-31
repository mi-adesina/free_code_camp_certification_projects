// Get references to the necessary DOM elements
const cash = document.getElementById("cash"); // Input field where the customer enters the cash amount
const changeDueDiv = document.getElementById("change-due"); // Div where the change due will be displayed
const purchaseBtn = document.getElementById("purchase-btn"); // Button to initiate the purchase and calculate change

// Define the price of the item being purchased
let price = 19.5; 

// Define the cash-in-drawer (cid), representing the available currency denominations and their amounts
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

// Define the value of each currency unit for easy reference
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

// Function to calculate and return the change due
const printChange = (cid, change) => {
  let changeArr = []; // Array to store the change to be returned
  let output = "Status: CLOSED"; // Default status, can be changed later

  // Loop through the cid array from highest to lowest denomination
  for (let i = cid.length - 1; i >= 0; i--) {
    let denomination = cid[i][0]; // Get the currency denomination name
    let amount = cid[i][1]; // Get the available amount of that denomination
    let unitValue = currencyUnit[denomination]; // Get the value of one unit of this denomination
    let count = 0; // To keep track of how much of this denomination is used

    // While the remaining change is larger than the unit value and there's still currency left, subtract from change
    while (change >= unitValue && amount > 0) {
      change = parseFloat((change - unitValue).toFixed(2)); // Subtract the unit value from change and fix precision
      amount = parseFloat((amount - unitValue).toFixed(2)); // Subtract the unit value from the amount in cid
      count += unitValue; // Increase the count of how much of this denomination is used
    }

    // If some of this denomination is used, add it to the change array
    if (count > 0) {
      changeArr.push(`${denomination}: $${count.toFixed(2)}`);
      cid[i][1] = amount; // Update the cid array with the new amount
    }
  }

  // If there's still change left after going through all denominations, return insufficient funds
  if (change > 0) {
    return "Status: INSUFFICIENT_FUNDS";
  }
  
  // Check if there's still money left in the drawer
  for (let i = 0; i < cid.length; i++) {
    if (cid[i][1] !== 0) {
      output = "Status: OPEN"; // If there's money left, the status should be OPEN
    }
  }

  // Combine the status with the change details and return the output
  output += changeArr.join(", ");
  return output;
};

// Event listener for the purchase button
purchaseBtn.addEventListener("click", () => {
  let cashPaid = parseFloat(cash.value); // Get the cash amount entered by the customer

  // Check if the customer has enough cash to make the purchase
  if (cashPaid < price) {
    alert("Customer does not have enough money to purchase the item");
  } else if (cashPaid === price) {
    // If the customer paid the exact amount, no change is due
    changeDueDiv.innerText = "No change due - customer paid with exact cash";
  } else {
    // Calculate the change due
    let change = parseFloat((cashPaid - price).toFixed(2)); // Calculate the change and fix floating-point precision
    let output = printChange([...cid], change); // Call the function to get the change and pass a copy of cid
    changeDueDiv.innerText = output; // Display the output in the change due div
  }
});
