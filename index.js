const $add = document.getElementById("add");
const $update = document.getElementById("update");
const $peopleList = document.querySelector(".people-list");
const $tableParent = document.querySelector(".table-parent");

let gender;

let accountant = 1;

let currentUpdate;
let currentVar;

// Create
$add.addEventListener("click", e => {

  e.preventDefault();

  if ($add.classList.contains("blocked")) {
    return alert("Update current user first");
  }

  addTable();
})

// Update
$update.addEventListener("click", (e) => {

  e.preventDefault();

  if (!currentUpdate) {
    return alert("You must select an user to update");
  }

  let tables = document.querySelectorAll(".table-container");

  tables.forEach(table => {
    if (table.dataset.table === currentUpdate) {

      genderComparative();

      if (!gender) {
        return;
      }

      currentVar.querySelector(".gender").textContent = gender;
      
      currentVar.querySelector(".name").textContent = document.getElementById("name").value;

      currentVar.querySelector(".birthday").textContent = document.getElementById("birthday").value;
    }
  })

  if (gender) {
    $add.classList.remove("blocked");

    currentUpdate = false;
  }
})

// Read
document.addEventListener("click", e => {
  if (e.target.matches(".update")) {

    currentVar = e.target.parentElement;
    currentUpdate = e.target.parentElement.dataset.table;

    $add.classList.add("blocked");

    console.log(currentVar);
    console.log(currentUpdate);

    // Name
    document.getElementById("name").value = `${currentVar.querySelector(".name").textContent}`;

    // Birthday
    document.getElementById("birthday").value = `${currentVar.querySelector(".birthday").textContent}`;
  }
})

// Delete
document.addEventListener("click", e => {
  if (e.target.matches(".delete")) {
    let keys = document.querySelectorAll(".key");
    let btnDelete = document.querySelectorAll(".delete");

    // We run over all keys that are bigger that dataset from pushed delete button. Those keys are going to reduce the value from their id and context of the box inside the table.
    keys.forEach(key => {

      if (key.id > e.target.dataset.key) {
        // If dataset from pushed delete button is smaller than id from current id box, we are going to reduce id and context (Of course, id and context have to be equal) of the box that are running
        let value = key.id - 1;
        key.id = `${value}`;
        key.innerHTML = `${value}`;
      }
    })

    // This makes a substraction in data-key from "delete buttons". If we don´t do this, we could not keep an order 
    btnDelete.forEach(btn => {
      if (btn.dataset.key > e.target.dataset.key) {
        btn.dataset.key = btn.dataset.key - 1;
      }
    })

    e.target.parentElement.remove();

    // We have to reduce variable "accounter" because if we don´t, when we add another user, "accounter" won´t add the right id.
    accountant--;
  }
})

const addTable = () => {
  let name;

  // We see if input name is empty. If it is, we are going to launch an "alert"
  if (document.getElementById("name").value === "") {

    return alert("You must introduce a name");

  } else {
    name = document.getElementById("name").value;
  };

  genderComparative();

  if (!gender) {
    return;
  }

  let birthday = document.getElementById("birthday").value;

  let table = `
    <div class="table-container" data-table="${accountant - 1}">
      <table class="table-list">
        <thead>
          <tr class="row-head">
            <th>ID</th>
            <th>Name</th>
            <th>Date</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          <tr class="row-body">
            <td id="${accountant}" class="key">${accountant++}</td>
            <td class="name">${name}</td>
            <td class="birthday">${birthday}</td>
            <td class="gender">${gender}</td>
          </tr>
        </tbody>
      </table>
      <button data-key="${accountant - 1}" class="delete">Delete</button>
      <button class="update">Update</button>
    </div>`;

  $tableParent.insertAdjacentHTML("beforeend", table);
}

const genderComparative = () => {

  gender = false;

  if (document.getElementById("male").checked && document.getElementById("female").checked) {
    return alert("You can not have both genders");
  }
  
  gender = document.getElementById("male").checked? 
  "M" : document.getElementById("female").checked?
  "F" : false;

  if (!gender) {
    return alert("You must introduce a gender");
  }
}