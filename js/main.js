  listWeeklyItems(links,"weeklist")

  function listWeeklyItems(weekitems, listElementName)
    let ol = document.getElementById('weeklist');
    if(ol) {
        weekitems.forEach(element => {
            let a = document.createElement('a')
            a.innerHTML = element.label;
            a.href = element.url;

            let li = document.createElement('li')
            li.appendChild(a);

            ol.appendChild(li);
        });
    }
