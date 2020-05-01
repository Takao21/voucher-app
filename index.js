let dt = new Date();
document.getElementById("datetime").innerHTML = (("0" + dt.getDate()).slice(-2)) + "." + (("0" + (dt.getMonth() + 1)).slice(-2)) + "." + (dt.getFullYear()) + " " + (("0" + dt.getHours()).slice(-2)) + ":" + (("0" + dt.getMinutes()).slice(-2));
document.getElementById("voucherID").innerHTML = parseInt((Date.now() + Math.random()) / 2500);

const sumArray = [];
let globaltotal = 0;
let globalpaid = 0;
let globalchange = 0;

function endingFunc() {
  WritePaid();
  GetChange();
}

function GetFormData() {

  if (document.getElementById("Stacks").value > 0) {
    document.getElementById("Count").value = document.getElementById("Stacks").value * 300;
  }

  let item = document.getElementById("item").value;
  let itemWt = document.getElementById("itemWt").value;
  let itemStk = document.getElementById("Stacks").value;
  let itemQty = document.getElementById("Count").value;
  let itemPrice = document.getElementById("Rate").value;

  let lineSum = itemQty * itemPrice;
  // sumArray.push(lineSum);



  if (item == "ကဒ်​ပေါင်(200)" || item == "ကဒ်​ပေါင်(400)") {
    const printLine = `${item}ကျပ်တန် # ${itemQty} ကဒ်`;
    document.getElementById("listItem").textContent = printLine;
    if (item == "ကဒ်​ပေါင်(200)") {
      lineSum = itemQty * 200;
      // sumArray.push(lineSum);
    } else {
      lineSum = itemQty * 400;
      // sumArray.push(lineSum);
    }
  } else {
    const printLine = `* ${item} #${itemWt} KG, ${itemStk} ${itemStk > 0 ? "တွဲ":""} (${itemQty} လုံး​) @ ${itemPrice} ကျပ်နှုန်း `;
    document.getElementById("listItem").textContent = printLine;
  }
  sumArray.push(lineSum);
  const printPrice = `${lineSum} ကျပ်`;
  document.getElementById("linePrice").textContent = printPrice;

  //DOM editing procedures for going next line
  document.getElementById("listItem").removeAttribute("id");
  document.getElementById("linePrice").removeAttribute("id");
  document.getElementById("printDivID").classList.remove("printDiv");
  document.getElementById("printDivID").removeAttribute("id");

  newPrintDiv = document.createElement("div");
  newPrintDiv.setAttribute("id", "printDivID");

  listItemChild = document.createElement("span");
  listItemChild.setAttribute("id", "listItem");
  linePriceChild = document.createElement("span");
  linePriceChild.setAttribute("id", "linePrice");

  document.getElementsByClassName("listingArea")[0].appendChild(newPrintDiv);
  document.getElementById("printDivID").appendChild(listItemChild);
  document.getElementById("printDivID").appendChild(linePriceChild);

  //Concept for summations
  const summingFunc = (a, b) => a + b;
  const totalAmt = sumArray.reduce(summingFunc);
  document.getElementById("TOTAL").innerHTML = totalAmt + " ကျပ်";

  //Assigning to distinct global variable to calculate overall total
  globaltotal = totalAmt;

  //Reset input fields after writing out one item line
  document.getElementById("fakeForm").reset();
}

//Writing paid amount
function WritePaid() {
  let paidAmt = document.getElementById("paidCash").value;
  document.getElementById("PAID").innerHTML = `${paidAmt} ကျပ်`;
  globalpaid = paidAmt;
}

//Calculating change depending on paid amount and total
function GetChange() {
  globalchange = globalpaid - globaltotal;
  document.getElementById("CHANGE").innerHTML = `${globalchange} ကျပ်`;
}

//Copy, Print & Refresh Page
function CopyAndPrint() {
  copyVoucherID();
  printDiv();
  reloadFunc();
}

//Easy Copy for ID to Save as PDF
function copyVoucherID() {
  var copyText = document.getElementById("voucherID");
  var textArea = document.createElement("textarea");
  textArea.value = copyText.textContent;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("Copy");
  textArea.remove();
}

function printDiv() {
  var divContents = document.getElementById("printArea").innerHTML;
  var a = window.open('', '', 'height=500, width=500');
  a.document.write('<html>');
  a.document.write(divContents);
  var link = document.createElement('link');
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("href", "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");

  var style = document.createElement('style');
  style.innerHTML = `
  * {
    box-sizing: border-box;
  }

  body {
    margin: 5px 5px;
    font-family: sans-serif;
    font-weight: bold;
    /* background: linear-gradient(#26c5de, #bdd1f0); */
    height: 100vh;
    position: relative;

    animation-name: DancingBG;
    animation-duration: 3s;
    animation-timing-function: ease;
    animation-iteration-count: infinite;
  }

  @keyframes DancingBG {
    0% {background: linear-gradient(#ead0f5, #bdd1f0);}
    30% {background: linear-gradient( #bdd1f0, #ead0f5 , #bdd1f0)}
    70% {background: linear-gradient(#bdd1f0, #ead0f5);}
    100% {background: linear-gradient(#ead0f5, #bdd1f0);}

  }

  select:hover , input:hover {
    background-color: #87ffaf;
  }

  input:focus {
    background-color: #f5d8b5;
  }

  input , select {
    height: 30px;
  }

  input[type=number]::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  button {
    padding: 7px 9px;
    margin: 5px 10px;
  }

  button:hover {
    cursor: pointer;
    box-shadow: 0px 3px 5px #4cf579, 0px -3px 5px #4cf579, 3px 0px 5px #4cf579, -3px 0px 5px #4cf579;
    font-weight: bold;
  }

  #printArea {
    border: 3px dashed #283bb0;
  }

  .heading {
    text-align: center;
  }

  .id_div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .id_div > p {
    margin: 0px 5px;
  }

  .titles {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .titles > h3 {
    margin: 0px 5px;

  }

  .inline-p {
    display: inline-block;
  }

  .listingArea > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 3px 5px;
  }

  .summationArea , .paidcashArea , .changeArea {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 3px 5px;
  }

  #Thankyou {
    text-align: center;
  }

  #printvoucher {
    margin: 6px 0px;
    box-shadow: 0px -3px 6px black;
    opacity: 0.4;
    transition: opacity 0.3s ease-out;

    position: relative;
    left: 50%;
    transform: translate(-50%);
    width: 35%;
    padding: 20px 50px;
    font-size: 1.2em;

    position: sticky;
    bottom: 0;
  }

  #printvoucher:hover {
    opacity: 1;
    transform: translate(0);
    width: 100%;
    transition: all 0.3s ease-out;
  }

`;
  a.document.head.appendChild(link);
  a.document.head.appendChild(style);
  a.document.write('</body></html>');
  a.document.close();
  a.print();
  a.print();
}

function reloadFunc() {
  location.reload();
}
