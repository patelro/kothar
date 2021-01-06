// do not touch the code below
var uid = null;
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    uid = user.uid;
  } else {
    // redirect to login page
    uid = null;
    window.location.replace("loginPage.html");
  }
});

function logOut() {
  firebase.auth().signOut();
}
// do not touch the code above


// db.collection("Items")
//   .get()
//   .then((snapshot) => {
//     console.log(snapshot.docs.length);
//   });

const MostUsed = document.querySelector("#table_body");
const ItemList2 = document.querySelector("#table_body2");
const expDate = document.querySelector("#table_body3");
const TotalCount = document.querySelector("#counting1");


db.collection("KotharItems")
  .get()
  .then((snapshot) => {
    let div = document.createElement("div");
    let h5 = document.createElement("h5");
    h5.id = "totalItems";
    console.log(snapshot.docs.length);
    h5.textContent = snapshot.docs.length.toString() + " Kothar Items";
    div.appendChild(h5);
    TotalCount.appendChild(div);
  });

// create elements for most used items and appending
function MostItemsUsed(doc) {
  let tr = document.createElement("tr");
  let PID = document.createElement("td");
  let Name = document.createElement("td");
  let Quan = document.createElement("td");

  tr.setAttribute("data-id", doc.id);
  PID.textContent = doc.data().ProductType;
  Name.textContent = doc.data().ProductName;
  Quan.textContent = doc.data().Quantity;

  Name.style.textAlign = "center";
  PID.style.textAlign = "center";
  Quan.style.textAlign = "center";

  tr.appendChild(PID);
  tr.appendChild(Name);
  tr.appendChild(Quan);
  MostUsed.appendChild(tr);
}

//Query for most items used and rendering.
db.collection("KotharItems")
  .where("Quantity", ">", 0)
  .orderBy("Quantity", "desc")
  .limit(5)
  .get()
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      MostItemsUsed(doc);
    });
  });

// create elements for most used items and appending
function LeastUsedItems(doc) {
  let tr = document.createElement("tr");
  let PID = document.createElement("td");
  let Name = document.createElement("td");
  let Quan = document.createElement("td");
  let LowAlert = document.createElement("td");


  tr.setAttribute("data-id", doc.id);
  PID.textContent = doc.data().ProductType;
  Name.textContent = doc.data().ProductName;
  Quan.textContent = doc.data().Quantity;
  LowAlert.textContent = doc.data().LowAlertQuantity;

  PID.style.textAlign = "center";
  Name.style.textAlign = "center";
  Quan.style.textAlign = "center";
  LowAlert.style.textAlign = "center";

  tr.appendChild(PID);
  tr.appendChild(Name);
  tr.appendChild(Quan);
  tr.appendChild(LowAlert);

  ItemList2.appendChild(tr);
}

//Query for most items used and rendering.
db.collection("KotharItems")
  .where("Quantity", "<=", "LowAlertQuantity")
  .orderBy("Quantity", "desc")
  .limit(10)
  .get()
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      LeastUsedItems(doc);
    });
  });

function CloseToExpiry(doc) {
  let tr = document.createElement("tr");
  let Ptype = document.createElement("td");
  let Name = document.createElement("td");
  let expD = document.createElement("td");
  // let Quan = document.createElement("td");

  tr.setAttribute("data-id", doc.id);
  Ptype.textContent = doc.data().ProductType;
  Name.textContent = doc.data().ProductName;
  expD.textContent = doc.data().ExpiryDate;


  Ptype.style.textAlign = "center";
  Name.style.textAlign = "center";
  expD.style.textAlign = "center";


  tr.appendChild(Ptype);
  tr.appendChild(Name);
  tr.appendChild(expD);
  expDate.appendChild(tr);
}
let currentDate = new Date();
//Query for most items used and rendering.
db.collection("KotharItems")
  .where("ExpiryDate", "!=", " ")
  .orderBy("ExpiryDate", "desc")
  .limit(10)
  .get()
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      CloseToExpiry(doc);
      console.log(doc);
    });
  });
