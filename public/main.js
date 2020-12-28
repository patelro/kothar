  // do not touch the code below
  var uid = null;
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      uid = user.uid;
      console.log(uid);
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


db.collection("Items")
  .get()
  .then((snapshot) => {
    let div = document.createElement("div");
    let h5 = document.createElement("h5");
    h5.id = "totalItems";

    h5.textContent = snapshot.docs.length.toString() + " Kothar Items";
    div.appendChild(h5);
    TotalCount.appendChild(div);
  });

// create elements for most used items and appending
function MostItemsUsed(doc) {
  let tr = document.createElement("tr");
  let Name = document.createElement("td");
  let PID = document.createElement("td");
  let Quan = document.createElement("td");

  tr.setAttribute("data-id", doc.id);
  Name.textContent = doc.data().ProductName;
  PID.textContent = doc.data().ProductID;
  Quan.textContent = doc.data().quantity;

  tr.appendChild(Name);
  tr.appendChild(PID);
  tr.appendChild(Quan);
  MostUsed.appendChild(tr);
}

//Query for most items used and rendering.
db.collection("Items")
  .where("quantity", ">", 0)
  .orderBy("quantity", "desc")
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
  let Name = document.createElement("td");
  let PID = document.createElement("td");
  let Quan = document.createElement("td");

  tr.setAttribute("data-id", doc.id);
  Name.textContent = doc.data().ProductName;
  PID.textContent = doc.data().ProductID;
  Quan.textContent = doc.data().quantity;

  tr.appendChild(Name);
  tr.appendChild(PID);
  tr.appendChild(Quan);
  ItemList2.appendChild(tr);
}

//Query for most items used and rendering.
db.collection("Items")
  .where("quantity", ">=", 0)
  .orderBy("quantity", "asc")
  .limit(5)
  .get()
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      LeastUsedItems(doc);
    });
  });

function CloseToExpiry(doc) {
  let tr = document.createElement("tr");
  let Name = document.createElement("td");
  let PID = document.createElement("td");
  let expD = document.createElement("td");
  let Quan = document.createElement("td");

  tr.setAttribute("data-id", doc.id);
  Name.textContent = doc.data().ProductName;
  PID.textContent = doc.data().ProductID;
  expD.textContent = doc.data().expiryDate;
  Quan.textContent = doc.data().quantity;

  tr.appendChild(Name);
  tr.appendChild(PID);
  tr.appendChild(expD);
  tr.appendChild(Quan);
  expDate.appendChild(tr);
}

//Query for most items used and rendering.
db.collection("Items")
  // .where("expiryDate", "!=", " ")
  .orderBy("expiryDate", "desc")
  .limit(5)
  .get()
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      CloseToExpiry(doc);
    });
  });





