// const { listenerCount } = require("process");
const TotalTableList = document.querySelector("#tableListBody");
const DeleteTableList = document.querySelector("#historyListBody");
const form = document.querySelector('#addingNewData');
const UPform = document.querySelector('#updateForm');

/* Refernces to the tables.html elemets */
var table = document.getElementById("tableListBody");
var modal = document.getElementById("modal");
var modalAddNew = document.getElementById("modalAddNew");

//Query for most items used and rendering.
db.collection("Items")
    .get()
    .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
            TotalItemList(doc);
        });
    });

// document.getElementById('NewInputDate').value = new Date().toDateInputValue();

var newDate = new Date();
// console.log(newDate.toString().slice(0, 25));

form.addEventListener('submit', (e) => { //PnewDate
    e.preventDefault();
    var strType = form.PType.value;
    var strName = form.Pname.value;

    var resType = strType.substring(0, 3);
    var resName = strName.substring(0, 3);
    var productId = resType.concat(resName);

    db.collection("Items").add({
        ProductID: productId,
        ProductType: form.PType.value,
        ProductName: form.Pname.value,
        Description: form.Pdesc.value,
        expiryDate: form.Pexp.value,
        lowAlertQuantity: form.PlowQ.value,
        quantity: form.PnewQ.value,
        unitOfMeasure: form.Pmes.value,
        inputDate: newDate

    }).then(function () {
        console.log("data added!");
        setTimeout(function () {
            window.location.reload();
        }, 1000);
    }).catch(function (error) {
        console.log("Error: ", error);
    });
})



// function newItems () {
//     newProductType = document.getElementById('NewproductType').value;
//     newproductName = document.getElementById('NewproductName').value;
//     newdescriptionLocation = document.getElementById('NewdescriptionLocation').value;
//     newexpiryDate = document.getElementById('NewexpiryDate').value;
//     newlowAlertQuantity = document.getElementById('NewlowAlertQuantity').value;
//     newquantity = document.getElementById('Newquantity').value;
//     newunitOfMeasure = document.getElementById('NewunitOfMeasure').value;

// }


function TotalItemList(doc) {
    let tr = document.createElement("tr");
    let Indate = document.createElement("td");
    //let PID = document.createElement("td");
    let productType = document.createElement("td");
    let Name = document.createElement("td");
    let Pdesc = document.createElement("td");
    let exDate = document.createElement("td");
    let lowAlert = document.createElement("td");
    let quantity_ = document.createElement("td");
    let UnitM = document.createElement("td");
    let edit = document.createElement("td");

    let btn = document.createElement("button");
    let deleteBtn = document.createElement("button");

    deleteBtn.setAttribute('class', 'btn-large');
    deleteBtn.setAttribute('className', 'btn-large');

    // let remove = document.getElementById("btnRemove");
    // remove.onclick = function () {
    //     DeletedItem(doc.id);
    // }

    btn.setAttribute('class', 'btn-large');
    btn.setAttribute('className', 'btn-large');
    btn.onclick = function () {
        ModalListData(doc.data(), doc.id);
        modal.style.visibility = "visible";
    };
    btn.innerHTML = '<i class = "fas fa-pencil-alt"></i>';
    edit.appendChild(btn);


    Indate.style.textAlign = "center";
    //PID.style.textAlign = "center";
    productType.style.textAlign = "center";
    Name.style.textAlign = "center";
    Pdesc.style.textAlign = "center";
    exDate.style.textAlign = "center";
    lowAlert.style.textAlign = "center";
    quantity_.style.textAlign = "center";
    UnitM.style.textAlign = "center";

    tr.setAttribute("data-id", doc.id);


    Indate.textContent = doc.data().inputDate.toDate().toString().slice(0, 15);

    // if (doc.data().inputDate.toString().length)
    // console.log(doc.data().inputDate.toString().length);
    //PID.textContent = doc.data().ProductID;
    productType.textContent = doc.data().ProductType;
    Name.textContent = doc.data().ProductName;
    Pdesc.textContent = doc.data().Description;
    exDate.textContent = doc.data().expiryDate;
    lowAlert.textContent = doc.data().lowAlertQuantity;
    quantity_.textContent = doc.data().quantity;
    UnitM.textContent = doc.data().unitOfMeasure;

    tr.appendChild(Indate);
    //tr.appendChild(PID);
    tr.appendChild(productType);
    tr.appendChild(Name);
    tr.appendChild(Pdesc);
    tr.appendChild(exDate);
    tr.appendChild(lowAlert);
    tr.appendChild(quantity_);
    tr.appendChild(UnitM);
    tr.appendChild(edit);

    if (doc.data().quantity > 0) {
        TotalTableList.appendChild(tr);
    } else {
        DeleteTableList.appendChild(tr);
    }
}


// function DeletedItem(pid) {

//     db.collection("Items").doc(pid).delete().then(function () {
//         console.log("Document successfully deleted!");
//         let tr = document.createElement("tr");
//         // let Indate = document.createElement("td");
//         // let PID = document.createElement("td");
//         let productType = document.createElement("td");
//         let Name = document.createElement("td");
//         let Pdesc = document.createElement("td");
//         let exDate = document.createElement("td");
//         let lowAlert = document.createElement("td");
//         let quantity_ = document.createElement("td");
//         let UnitM = document.createElement("td");

//         // Indate.style.textAlign = "center";
//         // PID.style.textAlign = "center";
//         productType.style.textAlign = "center";
//         Name.style.textAlign = "center";
//         Pdesc.style.textAlign = "center";
//         exDate.style.textAlign = "center";
//         lowAlert.style.textAlign = "center";
//         quantity_.style.textAlign = "center";
//         UnitM.style.textAlign = "center";

//         tr.setAttribute("data-id", pid);

//         //PID.textContent = document.getElementById("productTypeUpdate").value;
//         productType.textContent = document.getElementById("productTypeUpdate").value;
//         Name.textContent = document.getElementById("productNameUdpate").value;
//         Pdesc.textContent = document.getElementById("descriptionLocationUpdate").value;
//         exDate.textContent = document.getElementById("expiryDateUpdate").value;
//         lowAlert.textContent = document.getElementById("lowAlertQuantityUpdate").value;
//         quantity_.textContent = document.getElementById("quantityUpdate").value;
//         UnitM.textContent = document.getElementById("unitOfMeasureUpdate").value;

//         tr.appendChild(productType);
//         tr.appendChild(Name);
//         tr.appendChild(Pdesc);
//         tr.appendChild(exDate);
//         tr.appendChild(lowAlert);
//         tr.appendChild(quantity_);
//         tr.appendChild(UnitM);

//         DeleteTableList.appendChild(tr);

//     }).catch(function (error) {
//         console.error("Error removing document: ", error);
//     });



// }



function ModalListData(data, pid) {

    document.getElementById("productTypeUpdate").value = data.ProductType;
    document.getElementById("productNameUdpate").value = data.ProductName;
    document.getElementById("descriptionLocationUpdate").value = data.Description;
    document.getElementById("expiryDateUpdate").value = data.expiryDate;
    document.getElementById("lowAlertQuantityUpdate").value = data.lowAlertQuantity;
    document.getElementById("quantityUpdate").value = data.quantity;
    document.getElementById("unitOfMeasureUpdate").value = data.unitOfMeasure;

    UPform.addEventListener('submit', (e) => {
        e.preventDefault();
        db.collection("Items").doc(pid).update({
            ProductType: UPform.pTypeUpdate.value,
            ProductName: UPform.pNameUpdate.value,
            Description: UPform.pLocationUpdate.value,
            expiryDate: UPform.pExpDateUpdate.value,
            lowAlertQuantity: UPform.pLowUpdate.value,
            quantity: UPform.pQuantityUpdate.value,
            unitOfMeasure: UPform.pMeasueUpdate.value
        }).then(function () {
            console.log("data updated!");
            // setTimeout(function () {
            //     window.location.reload();
            // }, 1000);
        }).catch(function (error) {
            console.log("Error: ", error);
        });

    })

    $(document).ready(function () {
        M.updateTextFields();
    });


}

// function myFunction() {
//     $("modal").modal('toggle');
// }

// function updateData() {
//     db.collection("Items").doc(doc.id).update({
//         ProductType: document.getElementById("productTypeUpdate").value,
//         ProductName: document.getElementById("productNameUdpate").value,
//         Description: document.getElementById("descriptionLocationUpdate").value,
//         expiryDate: document.getElementById("expiryDateUpdate").value,
//         lowAlertQuantity: document.getElementById("lowAlertQuantityUpdate").value,
//         quantity: document.getElementById("quantityUpdate").value,
//         unitOfMeasure: document.getElementById("unitOfMeasureUpdate").value
//     }).then(function () {
//         console.log("data updated!");
//         // setTimeout(function () {
//         //     window.location.reload();
//         // }, 1000);
//     }).catch(function (error) {
//         console.log("Error: ", error);
//     });
// }


function filterInputDate() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("table-filter-inputDate");
    filter = input.value.toUpperCase();
    table = document.getElementById("inventoryTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function filterProductType() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("table-filter-productType");
    filter = input.value.toUpperCase();
    table = document.getElementById("inventoryTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function filterProductName() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("table-filter-productName");
    filter = input.value.toUpperCase();
    table = document.getElementById("inventoryTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[2];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

/* hide modal */
function hideModal() {
    modal.style.visibility = "hidden";

} //end hideModal()

function hideAddNewModal() {
    modalAddNew.style.visibility = "hidden";
}