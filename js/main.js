  listWeeklyItems(links,"weeklist")

  function listWeeklyItems(weekitems, listElementName)
    let ol = document.getElementById(listElementName);
    if(ol) {
        weekitems.forEach(element => {
            let anchor = document.createElement('a')
            anchor.innerHTML = element.label;
            anchor.href = element.url;

            let li = document.createElement('li')
            li.appendChild(anchor);

            ol.appendChild(li);
        });
    }
