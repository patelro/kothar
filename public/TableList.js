const TotalTableList = document.querySelector("#tableListBody");

/* Refernces to the tables.html elemets */
var table = document.getElementById("tableListBody");
var modal = document.getElementById("modal");

/* Function to append a cell to the table */
function createCell(cell, text, style) {
    var btn = document.createElement('button');
    var txt = document.createTextNode(text);

    btn.appendChild(txt);
    btn.setAttribute('class', style);
    btn.setAttribute('className', style);
    btn.onclick = function() { modal.style.visibility = "visible"; };
    btn.innerHTML = '<i class = "fas fa-pencil-alt"></i>';
    cell.appendChild(btn);
} //end createCell()

/* loop through the table */
for (var i = 1; i < table.rows.length; i++) {
    createCell(table.rows[i].insertCell(table.rows[i].cells.length), i, 'btn-large');
} //end forloop()

/* hide modal */
function hideModal() {
    modal.style.visibility = "hidden";
} //end hideModal()

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

    Indate.style.textAlign = "center";
    PID.style.textAlign = "center";
    productType.style.textAlign = "center";
    Name.style.textAlign = "center";
    Pdesc.style.textAlign = "center";
    exDate.style.textAlign = "center";
    lowAlert.style.textAlign = "center";
    quantity_.style.textAlign = "center";
    UnitM.style.textAlign = "center";

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