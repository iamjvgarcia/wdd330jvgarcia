(function () {
  //
  // Variables
  //
  const entryForm = document.querySelector(".create-journal");
  const entriesList = document.querySelector("#journal-list");
  const entryTitle = document.querySelector(".entry-title");
  const lastChangedSpan = document.querySelector(".date-updated");

  var entries = [];
  readData();
  updateEntries();
  //
  // Methods
  //

  function onEntrySubmit(event) {
    event.preventDefault();

    addNewEntry(entryTitle.value);
    updateEntries();
    clearInputFields();

    console.log(entries);
  }

  // Add entry
  function addNewEntry(title, description) {
    let entry = {
      entryTitle: title,
      entryDate: getCurrentDateTime(),
      
    };

    entries.push(entry);
    saveData();
  }

  function updateEntries() {
    // Clear out entires from list in html dom
    entriesList.innerHTML = "";

    entries.forEach(function (entry, index) {

      const journalItem = document.createElement("li");
      journalItem.className = "journal-items";
      journalItem.innerHTML = entry.entryTitle;
      entriesList.appendChild(journalItem);

    });

    getLastChangedDate();
  }

  function readData() {
    let parsedEntries = JSON.parse(localStorage.getItem("entries"));

    if (parsedEntries) {
      entries = parsedEntries;
    }

    getLastChangedDate();
  }

  function saveData() {
    localStorage.setItem("entries", JSON.stringify(entries));
    localStorage.setItem(
      "lastChangedDate",
      JSON.stringify(getCurrentDateTime())
    );
  }

  function deleteAtIndex(index) {
    console.log("Want to delete at index: " + index);
    entries.splice(index, 1);
    saveData();
    updateEntries();
  }

  function getLastChangedDate() {
    let parsedDate = JSON.parse(localStorage.getItem("lastChangedDate"));

    if (parsedDate) {
      lastChangedSpan.textContent = "Last updated: " + parsedDate;
      console.log(parsedDate);
    } else {
      lastChangedSpan.textContent = "";
    }
  }

  function clearInputFields() {
    entryTitle.value = "";
  }

  // Gets current date time
  function getCurrentDateTime() {
    let nowDate = new Date();
    nowDate.toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
    });

    return nowDate.toLocaleString();
  }

  //
  // Inits & Event Listeners
  //
  entryForm.addEventListener("submit", onEntrySubmit);
})();

