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
    btn.onclick = function () {
        modal.style.visibility = "visible";
        //document.getElementById("productType").innerHTML(productType);
    };
    btn.innerHTML = '<i class = "fas fa-pencil-alt"></i>';
    cell.appendChild(btn);

} //end createCell()


// /* loop through the table */
// for (var i = 1; i < table.rows.length; i++) {
//     createCell(table.rows[i].insertCell(table.rows[i].cells.length), i, 'btn-large');
// } //end forloop()

/* hide modal */
function hideModal() {
    modal.style.visibility = "hidden";
} //end hideModal()