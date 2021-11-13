
const links = [
  {
    label: "Week1 notes",
    url: "week1/index.html",
  },
  {
    label: "Week2 notes",
    url: "week2/index.html",
  },
    {
      label: "Week3 notes",
      url: "week3/index.html",
    } ,
    {
      label: "Week4 notes",
      url: "week4/index.html",
    } ,
    {
      label: "Week5 notes",
      url: "week5/index.html",
    } ,
    {
      label: "TODO",
      url: "todo/index.html",
    },
    {
      label: "Week7 notes",
      url: "week7/index.html",
    } ,
    {
      label: "Week8 notes",
      url: "week8/index.html",
    } ,
    {
      label: "Week9 notes",
      url: "week9/index.html",
    } ,
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
