
const links = [
  {
    label: "Week1 notes",
    url: "week1/index.html",
  },
  {
    label: "Week2 notes",
    url: "week2/index.html",
  }
];

const populateContents = () => {
  const contentsList = document.querySelector("#weeklist")

  links.map((link) => {
    const list = document.createElement("li")
    const a = document.createElement("a")

    a.textContent = link.label
    a.setAttribute("href", link.url)

    list.appendChild(a)

    contentsList.appendChild(list)
  })
}

populateContents()
