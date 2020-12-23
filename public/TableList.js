const TotalTableList = document.querySelector("#tableListBody");

  
  function TotalItemList(doc) {
    let tr = document.createElement("tr");
    let Indate = document.createElement("td");
    let PID = document.createElement("td");
    let productType = document.createElement("td");
    let Name = document.createElement("td");
    let Pdesc = document.createElement("td");
    let exDate = document.createElement("td");
    let lowAlert = document.createElement("td");
    let quantity_ = document.createElement("td");
    let UnitM = document.createElement("td");

    quantity_.style.textAlign = "center";

    tr.setAttribute("data-id", doc.id);

    Indate.textContent = doc.data().inputDate.toDate().toString().slice(0, 15);
    PID.textContent = doc.data().ProductID;
    productType.textContent = doc.data().ProductType;
    Name.textContent = doc.data().ProductName;
    Pdesc.textContent = doc.data().Description;
    exDate.textContent = doc.data().expiryDate;
    lowAlert.textContent = doc.data().lowAlertQuantity;
    quantity_.textContent = doc.data().quantity;
    UnitM.textContent = doc.data().unitOfMeasure;
  
    tr.appendChild(Indate);
    tr.appendChild(PID);
    tr.appendChild(productType);
    tr.appendChild(Name);
    tr.appendChild(Pdesc);
    tr.appendChild(exDate);
    tr.appendChild(lowAlert);
    tr.appendChild(quantity_);
    tr.appendChild(UnitM);
    TotalTableList.appendChild(tr);
  }
  
  //Query for most items used and rendering.
  db.collection("Items")
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        TotalItemList(doc);
      });
    });