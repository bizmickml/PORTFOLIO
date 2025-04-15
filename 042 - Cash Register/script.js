let price = 1.87;
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

document.getElementById('total-due').textContent = price;
const cashInput = document.getElementById('cash');
const changeElement = document.getElementById('change-due');
const drawerElement = document.getElementById('drawer');
const purchaseBtn = document.getElementById('purchase-btn');

class Register {
  constructor() {
    this.price = 0;
    this.cash = 0;
    this.change = 0;
    this.changeAsInt = 0;
    this.drawer = [
      {
        name: "",
        val: 1,
        qty: 0,
      },  
      {
        name: "",
        val: 5,
        qty: 0,
      },
      {
        name: "",
        val: 10,
        qty: 0,
      },  
      {
        name: "",
        val: 25,
        qty: 0,
      },
      {
        name: "",
        val: 100,
        qty: 0,
      },
      {
        name: "",
        val: 500,
        qty: 0,
      },
      {
        name: "",
        val: 1000,
        qty: 0,
      },
      {
        name: "",
        val: 2000,
        qty: 0,
      },
      {
        name: "",
        val: 10000,
        qty: 0,
      },
    ];
    this.insufFunds = false;
    this.registerOpen = true;
    this.changeDue = {};
  };

  displayMessage() {
    changeElement.insertAdjacentHTML("beforeend", `<p><strong>Status: ${this.getStatus()}</strong></p>`)

    Object.keys(this.changeDue).forEach((key) => {

      this.drawer.forEach((obj) => {
        if (obj.name === key) {
          let qtyNeeded = this.changeDue[key] * obj.val / 100;
          changeElement.insertAdjacentHTML("beforeend", `<p>${key}: $${qtyNeeded.toFixed(2)}</p>`)
        }
      })
    })

    this.drawer.forEach((obj) => {
      let qtyNeeded = obj.qty * obj.val / 100;
      drawerElement.insertAdjacentHTML("afterbegin", `<p>${obj.name}: $${qtyNeeded.toFixed(2)}</p>`)
    })
    
    drawerElement.insertAdjacentHTML("afterbegin", `<p><strong>NEW DRAWER BALANCE:</strong></p>`)
    
  };

  getStatus() { 
    if (this.registerOpen) {
      return "OPEN";
    } else {
      return "CLOSED";
    }
  }

  updateDrawer() {
    let drawBal = 0;
    
    Object.keys(this.changeDue).forEach((key) => {
      let qty = this.changeDue[key];

      this.drawer.forEach((obj) => {
        if (obj.name === key) {
          obj.qty -= qty;
        }
      })
    }) 

    this.drawer.forEach((obj) => {
      drawBal += obj.qty * obj.val
    })

    if (drawBal === 0) {
      this.registerOpen = false;
    }

    this.displayMessage();
  };

  isInsufFunds() {
    if (this.insufFunds) {
      changeElement.insertAdjacentHTML("beforeend", `<p>Status: INSUFFICIENT_FUNDS</p>`)
      this.changeDue = {};
      return;
    } else {
      this.updateDrawer();
    }
  };

  calcChangeDrawer() {
    let changeInt = this.changeAsInt;

    for (let i = this.drawer.length - 1; i >= 0; i--) {
      let qtyNeeded = Math.floor(changeInt / this.drawer[i].val);
      let drawQty = this.drawer[i].qty;

      if (qtyNeeded > 0 && drawQty > 0) { 
        let changeQty = qtyNeeded <= drawQty ? qtyNeeded : drawQty; 
        this.changeDue[this.drawer[i].name] = changeQty;
        changeInt -= changeQty * this.drawer[i].val;
      }
    }

    if (changeInt > 0) {
      this.insufFunds = true;
    } 

    this.isInsufFunds();
  };

  checkForCalcs() {
    if (this.cash < this.price) {
      alert("Customer does not have enough money to purchase the item");
      return;
    } else if (this.cash === this.price) {
      changeElement.innerText = "No change due - customer paid with exact cash";
      return;
    } else {
      this.calcChangeDrawer();
    }
  
  };

  reset() {
    this.price = price;
    this.cash = Number(cashInput.value);
    this.change = Number(this.cash - this.price).toFixed(2);
    this.changeAsInt = Math.round(Number(this.change) * 100);
    this.changeDue = {};
    changeElement.innerText = "";
    drawerElement.innerHTML = "";

    for (let i = cid.length - 1; i >= 0; i--) {
      this.drawer[i].qty = Math.round(cid[i][1] * 100 / this.drawer[i].val);
      this.drawer[i].name = cid[i][0];
    }

    this.checkForCalcs();
  };

  testInsufFunds() {
    this.drawer.forEach((obj) => {
      obj.qty = 0;
    })
  };

};

purchaseBtn.addEventListener("click", () => {
  const reg1 = new Register();
  reg1.reset();
})
