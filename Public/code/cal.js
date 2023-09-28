const date = new Date()
if(sessionStorage.getItem('calData') != "undefined"){
    console.log("Session: ", sessionStorage.getItem("calData"))
    let calData = JSON.parse(sessionStorage.getItem("calData"))
}

let displayData = {
    "currMonth": date.getMonth(),
    "currYear": date.getFullYear(),
    "currDate": date.getDate(),
    "monthList": ["Janurary", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    "lastDay":  [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    "daysOfWeek": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    "referenceDay": {
        "month": 8,
        "day": 0,
        "date": 10,
        "year": 2023
    },
    "previousDay": 0,
    "currDays": []
}
let attendHolder = []
let coordHolder = []
let addCoord = true
let addCheck = true
document.getElementById('current-month').textContent = displayData['monthList'][displayData['currMonth']] + " " + displayData['currYear']
displayData['previousDay'] = getDayInitializer()
console.log('previousDay: ', displayData['previousDay'])
currDayInitializer()
displayGrid()

function getDayInitializer(){
    let targetMonth = date.getMonth() - 1
    if(targetMonth == -1){
        targetMonth = 11
        targetYear--
    }
    let targetYear = date.getFullYear()
    let refMonth = 8
    let refDay = 0
    let currDay = 10
    let refYear = 2023
    let lastDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if(targetMonth < 8 && targetYear <= 2023){
        while(refMonth != targetMonth || refYear != targetYear || currDay != lastDay[refMonth]){
            refDay--
            if(refDay == -1){
                refDay = 6
            }
            currDay--
            if(currDay == 0){
                refMonth--
                if(refMonth == -1){
                    refMonth = 11
                    refYear--
                }
                currDay = lastDay[refMonth]
            }
            console.log(("iterated"))
        }
        console.log("Day", refDay)
        console.log("Months: ", refMonth, ": ", targetMonth)
        return refDay
    }
    while((refMonth != targetMonth || refYear != targetYear || currDay != lastDay[refMonth])){
        refDay = (refDay + 1) % 7
        currDay++
        if(currDay > lastDay[refMonth]){
            currDay = 1
            refMonth++
        }
        if(refMonth == 12){
            refMonth = 0
            refYear++
        }
        console.log(("iterated"))
    }
    console.log("Day", refDay)
    return refDay
}

function currDayInitializer(){
    let numDays = displayData['lastDay'][displayData['currMonth']]
    let temp = displayData['previousDay']
    for(let i = 0; i < numDays; i++){
        temp = (temp + 1) % 7
        displayData['currDays'].push(temp)
    }
    console.log("Sep days: ", displayData['currDays'])
}
function flipArray(array){
    let holder = ""
    for(let i = 0; i < array.length; i++){
        holder = array[i]
        array[i] = array[array.length - 1 - i]
        array[(array.length - 1) - i] = holder
    }
    return array
}

function prevMonth(){
    displayData['previousDay'] = displayData['currDays'][0]
    displayData['currDays'] = []
    displayData['currMonth'] = (displayData['currMonth'] - 1)
    if(displayData['currMonth'] == -1){
        displayData['currMonth'] = 11
        displayData['currYear']--
        if((displayData['currYear'] - 2020) % 4 == 0){
            displayData['lastDay'][1] = 29
        } else {
            displayData['lastDay'][1] = 28
        }
    }
    let temp = displayData['previousDay']
    for(i = displayData['lastDay'][displayData['currMonth']]; i > 0; i--){
        temp--
        if(temp == -1){
            temp = 6
        }
        displayData['currDays'].push(temp)
    }
    displayData['currDays'].reverse()
    document.getElementById('current-month').textContent = displayData['monthList'][displayData['currMonth']] + " " + displayData['currYear']
    displayGrid()
}

function nextMonth(){
    displayData['previousDay'] = displayData['currDays'][displayData['lastDay'][displayData['currMonth']] - 1]
    displayData['currMonth'] = (displayData['currMonth'] + 1)
    if(displayData['currMonth'] == 12){
        displayData['currMonth'] = 0
        displayData['currYear']++
        displayData['previousDay'] = displayData['currDays'][30]
        if((displayData['currYear'] - 2020) % 4 == 0){
            displayData['lastDay'][1] = 29
        } else {
            displayData['lastDay'][1] = 28
        }
    }
    displayData['currDays'] = []
    let temp = displayData['previousDay']
    for(let i = 0; i < displayData['lastDay'][displayData['currMonth']]; i++){
        temp = (temp + 1) % 7
        displayData['currDays'].push(temp)
    }
    document.getElementById('current-month').textContent = displayData['monthList'][displayData['currMonth']] + " " + displayData['currYear']
    displayGrid()
}

function displayGrid(){
    calData = JSON.parse(sessionStorage.getItem("calData"))
    console.log("Data: ", calData)
    let eventIndexGroup = 0
    let eventIndexUser = 0
    let grid = document.getElementById("grid-container")
    if(grid != null){
        grid.remove()
    }
    grid = document.createElement('div')
    grid.setAttribute("id", "grid-container")
    document.getElementById("perm-div-container").appendChild(grid)
    if(displayData['currMonth'] == 1 && displayData['currDays'][0] == 0){
        grid.setAttribute("class", "grid-container-2")
    } else if(displayData['lastDay'][displayData['currMonth']] + displayData['currDays'][0] <= 35){
        grid.setAttribute("class", "grid-container-0")
    }  else {
        grid.setAttribute("class", "grid-container-1")
    }
    for(let i = 0; i < 7; i++){
        divP = document.createElement('div')
        divP.setAttribute("class", "day-container")
        inputP = document.createElement('p')
        inputP.textContent = displayData['daysOfWeek'][i]
        divP.appendChild(inputP)
        grid.appendChild(divP)
    }
    for(let i = 0; i < displayData['currDays'][0]; i++){
        mainDiv = document.createElement('div')
        mainDiv.setAttribute("class", "date-container")
        grid.appendChild(mainDiv)
    }
    for(let i = 1; i <= displayData['lastDay'][displayData['currMonth']]; i++){
        mainDiv = document.createElement('div')
        mainDiv.setAttribute("class", "date-container")
        dateP = document.createElement('p')
        dateP.setAttribute("class", "date-text")
        dateP.textContent = i
        if(displayData['currDays'][i - 1] == 0){
            dateP.style.color = "#de6f6f"
        }
        mainDiv.appendChild(dateP)
        let tempInput = true
        let maxInput = 5
        for(let j = eventIndexGroup; j < calData['group_data']['events']['events_num'] && tempInput;  j++){
            if(checkEventDate(j, i, "group")){
                if(maxInput > 0){
                    let event = document.createElement("p")
                    console.log("Passed Event")
                    event.setAttribute("class", "event_text_group")
                    event.textContent = calData['group_data']['events']['event_' + j]['title']
                    mainDiv.appendChild(event)
                    maxInput--
                }
                eventIndexGroup++
                if(maxInput == 4){
                    mainDiv.style.cursor = "pointer"
                    mainDiv.addEventListener("click", () =>{
                        expandMaxDate(i)
                    })
                }
            } else if(checkNextMonth(j, "group")){
                tempInput = false
            }
        }
        tempInput = true
        for(let j = eventIndexUser; j < calData['user_data']['events']['events_num'] && tempInput;  j++){
            if(checkEventDate(j, i, "user")){
                if(maxInput > 0){
                let event = document.createElement("p")
                event.setAttribute("class", "event_text_user")
                event.textContent = calData['user_data']['events']['event_' + j]['title']
                maxInput--
                mainDiv.appendChild(event)
                }
                eventIndexUser++
                if(maxInput == 4){
                    mainDiv.style.cursor = "pointer"
                    mainDiv.addEventListener("click", () =>{
                        expandMaxDate(i)
                    })
                }
            } else if(checkNextMonth(j, "user")){
                console.log("Too big")
                tempInput = false
            }
        }
        grid.appendChild(mainDiv)
    }
}

function checkEventDate(index, day, type){
    return parseInt(calData[type + "_data"]['events']['event_' + index]['month']) == parseInt(displayData['currMonth']) && parseInt(calData[type + "_data"]['events']['event_' + index]['day']) == day && parseInt(calData[type + "_data"]['events']['event_' + index]['year']) == parseInt(displayData['currYear'])
}

function checkNextMonth(index, type){
    return (parseInt(calData[type + "_data"]['events']['event_' + index]['month']) == parseInt(displayData['currMonth']) && parseInt(calData[type + "_data"]['events']['event_' + index]['year']) == displayData['currYear']) || parseInt(calData[type + "_data"]['events']['event_' + index]['year']) > displayData['currYear']
}
function addEvent(){
    let eventDiv = document.getElementById("add-event-div-id")
    eventDiv.style.top = "10%"
    let outerDiv = document.getElementById('outer-add-div')
    outerDiv.style.display = "block"
    outerDiv.style.height = document.documentElement.scrollHeight + "px"
    let dropDiv = document.createElement("div")
    dropDiv.setAttribute("class", "add-inline-div")
    eventDiv.appendChild(dropDiv)
    let label = document.createElement("p")
    label.textContent = "Title: "
    let dropSelect = document.createElement("input")
    dropSelect.type = "text"
    dropSelect.setAttribute("class", "location-input")
    dropSelect.id = "title_entry"
    dropDiv.appendChild(label)
    dropDiv.appendChild(dropSelect)
    dropDiv = document.createElement("div")
    dropDiv.setAttribute("class", "add-inline-div")
    eventDiv.appendChild(dropDiv)
    dropSelect = document.createElement("select")
    dropSelect.setAttribute("class", "drop-select")
    dropSelect.id = "entry_0"
    dropSelect.addEventListener("change", () =>{
        setDateLimit()
    })
    label = document.createElement("p")
    label.textContent = "Event Date:"
    dropDiv.appendChild(label)
    let initial = document.createElement("option")
    initial.value = ""
    initial.text = ""
    dropSelect.appendChild(initial)
    for(let i = 0; i < 12; i++){
        let option = document.createElement("option")
        option.value = displayData['monthList'][i]
        option.text = option.value
        dropSelect.appendChild(option)
    }
    dropDiv.appendChild(dropSelect)
    dropSelect = document.createElement("select")
    dropSelect.id = "entry_1"
    dropSelect.setAttribute("class", "drop-select")
    initial = document.createElement("option")
    initial.value = ""
    initial.text = ""
    dropSelect.appendChild(initial)
    for(let i = 0; i < 31; i++){
        let option = document.createElement("option")
        option.value = i + 1
        option.text = option.value
        dropSelect.appendChild(option)
    }
    dropDiv.appendChild(dropSelect)
    dropSelect = document.createElement("select")
    dropSelect.id = "entry_2"
    dropSelect.addEventListener("change", () =>{
        setDateLimit()
    })
    dropSelect.setAttribute("class", "drop-select")
    initial = document.createElement("option")
    initial.value = ""
    initial.text = ""
    dropSelect.appendChild(initial)
    for(let i = 0; i < 20; i++){
        let option = document.createElement("option")
        option.value = 2023 + i
        option.text = option.value
        dropSelect.appendChild(option)
    }
    dropDiv.appendChild(dropSelect)

    dropDiv = document.createElement("div")
    dropDiv.setAttribute("class", "add-inline-div")
    eventDiv.appendChild(dropDiv)
    dropSelect = document.createElement("select")
    dropSelect.id = "entry_3"
    dropSelect.setAttribute("class", "drop-select")
    label = document.createElement("p")
    label.textContent = "Start Time:"
    dropDiv.appendChild(label)
    initial = document.createElement("option")
    initial.value = ""
    initial.text = ""
    dropSelect.appendChild(initial)
    for(let i = 0; i < 12; i++){
        let option = document.createElement("option")
        option.value = i + 1
        option.text = option.value
        dropSelect.appendChild(option)
    }
    dropDiv.appendChild(dropSelect)
    dropSelect = document.createElement("select")
    dropSelect.id = "entry_4"
    dropSelect.setAttribute("class", "drop-select")
    initial = document.createElement("option")
    initial.value = ""
    initial.text = ""
    dropSelect.appendChild(initial)
    for(let i = 0; i < 60; i++){
        let option = document.createElement("option")
        if(i < 10){
            option.text = "0" + i
        } else {
            option.text = "" + i
        }
        dropSelect.appendChild(option)
    }
    dropDiv.appendChild(dropSelect)
    dropSelect = document.createElement("select")
    dropSelect.id = "entry_5"
    dropSelect.setAttribute("class", "drop-select")
    initial = document.createElement("option")
    initial.value = ""
    initial.text = ""
    dropSelect.appendChild(initial)
    for(let i = 0; i < 2; i++){
        let option = document.createElement("option")
        option.value = i
        if (i == 0){
            option.text = "AM"
        } else {
            option.text = "PM"
        }
        dropSelect.appendChild(option)
    }
    dropDiv.appendChild(dropSelect)
    dropSelect = document.createElement("input")
    dropSelect.type = "checkbox"
    dropSelect.style.height = "20px";
    dropSelect.style.width = "20px"
    dropSelect.id = "all-day-check"
    dropSelect.addEventListener("click", () =>{
        const checkBox = document.getElementById("all-day-check")
        if (checkBox.checked){
            for(let i = 0; i < 3; i++){
                document.getElementById("entry_" + (6 + i)).remove()
            }
            document.getElementById("end-time-label").style.color = "#ababab"
        } else {
            createEndTime()
        }
    })
    label = document.createElement("label")
    label.hmtlFor = "all-day-check"
    label.style.marginLeft = "5px"
    dropSelect.style.marginLeft = "25px"
    label.appendChild(document.createTextNode("All-Day"))
    dropDiv.appendChild(dropSelect)
    dropDiv.appendChild(label)
    createEndTime()
    dropDiv = document.createElement("div")
    dropDiv.setAttribute("class", "add-inline-div")
    dropDiv.id = "attend-div"
    label = document.createElement("p")
    label.textContent = "Attendees:"
    dropDiv.appendChild(label)
    eventDiv.appendChild(dropDiv)
    createAttend()
    dropDiv = document.createElement("div")
    dropDiv.setAttribute("class", "add-inline-div")
    dropDiv.id = "coord-div"
    label = document.createElement("p")
    label.textContent = "Coordinators:"
    dropDiv.appendChild(label)
    eventDiv.appendChild(dropDiv)
    createCoord()
    dropDiv = document.createElement("div")
    dropDiv.setAttribute("class", "add-inline-div")
    eventDiv.appendChild(dropDiv)
    label = document.createElement("p")
    label.textContent = "Location: "
    dropSelect = document.createElement("input")
    dropSelect.type = "text"
    dropSelect.id = "entry_9"
    dropSelect.setAttribute("class", "location-input")
    dropDiv.appendChild(label)
    dropDiv.appendChild(dropSelect)
    dropDiv = document.createElement("div")
    dropDiv.setAttribute("class", "add-inline-div_0")
    eventDiv.appendChild(dropDiv)
    label = document.createElement("p")
    label.textContent = "Description: "
    dropSelect = document.createElement("textarea")
    dropSelect.setAttribute("class", "description-input")
    dropSelect.id = "entry_10"
    dropDiv.appendChild(label)
    dropDiv.appendChild(dropSelect)
    dropDiv = document.createElement("div")
    dropDiv.setAttribute("class", "add-inline-div")
    dropSelect = document.createElement("input")
    dropSelect.type = "checkbox"
    dropSelect.style.height = "20px";
    dropSelect.style.width = "20px"
    dropSelect.id = "share-check"
    label = document.createElement("label")
    label.hmtlFor = "share-check"
    label.style.marginLeft = "5px"
    dropSelect.style.marginLeft = "25px"
    label.appendChild(document.createTextNode("Share With Group"))
    dropDiv.appendChild(dropSelect)
    dropDiv.appendChild(label)
    eventDiv.appendChild(dropDiv)
    let errorDiv = document.createElement("div")
    errorDiv.id = "error-div"
    errorDiv.setAttribute("class", "error-box-log")
    errorDiv.style.marginTop = "20px"
    eventDiv.appendChild(errorDiv)
    dropDiv = document.createElement("div")
    dropDiv.setAttribute("class", "submit-event-button-div")
    button = document.createElement("button")
    button.id = "submit-event"
    button.textContent = "+ Add"
    button.setAttribute("class", "submit-event-button")
    button.addEventListener("click", () => {
        submitEvent("add", -1)
    })
    dropDiv.appendChild(button)
    eventDiv.appendChild(dropDiv)
}

function outsideAddClicked(){
    document.getElementById('outer-add-div').style.display = "none"
    let mainDiv = document.getElementById("add-event-div-id")
    mainDiv.style.top= '-4000px'
    document.body.style.overflow = 'auto'
    let parent = document.getElementById("add-event-div-id")
    while(parent.firstChild){
        parent.removeChild(parent.firstChild)
    }
    attendHolder = []
    coordHolder = []
}

function createEndTime(){
    let eventDiv = document.getElementById("add-event-div-id")
    let dropDiv = ""
    if(document.getElementById("end-time-label") == null){
        dropDiv = document.createElement("div")
        dropDiv.id = "end-time-div"
        dropDiv.setAttribute("class", "add-inline-div")
        eventDiv.appendChild(dropDiv)
        label = document.createElement("p")
        label.id = "end-time-label"
        label.textContent = "End Time:"
    } else {
        dropDiv = document.getElementById("end-time-div")
        label = document.getElementById("end-time-label")
    }
    let dropSelect = document.createElement("select")
    dropSelect.id = "entry_6"
    dropSelect.setAttribute("class", "drop-select")
    label.style.color = "#000"
    dropDiv.appendChild(label)
    let initial = document.createElement("option")
    initial.value = ""
    initial.text = ""
    dropSelect.appendChild(initial)
    for(let i = 0; i < 12; i++){
        let option = document.createElement("option")
        option.value = i + 1
        option.text = option.value
        dropSelect.appendChild(option)
    }
    dropDiv.appendChild(dropSelect)
    dropSelect = document.createElement("select")
    dropSelect.id = "entry_7"
    dropSelect.setAttribute("class", "drop-select")
    initial = document.createElement("option")
    initial.value = ""
    initial.text = ""
    dropSelect.appendChild(initial)
    for(let i = 0; i < 60; i++){
        let option = document.createElement("option")
        if(i < 10){
            option.text = "0" + i
        } else {
            option.text = "" + i
        }
        dropSelect.appendChild(option)
    }
    dropDiv.appendChild(dropSelect)
    dropSelect = document.createElement("select")
    dropSelect.id = "entry_8"
    dropSelect.setAttribute("class", "drop-select")
    initial = document.createElement("option")
    initial.value = ""
    initial.text = ""
    dropSelect.appendChild(initial)
    for(let i = 0; i < 2; i++){
        let option = document.createElement("option")
        option.value = i
        if (i == 0){
            option.text = "AM"
        } else {
            option.text = "PM"
        }
        dropSelect.appendChild(option)
    }
    dropDiv.appendChild(dropSelect)
}

function createAttend(){
    let dropDiv = document.getElementById("attend-div")
    let dropSelect = document.createElement("select")
    dropSelect.setAttribute("class", "attend-drop")
    dropSelect.id = "attend-drop-id"
    dropDiv.appendChild(dropSelect)
    let button = document.createElement("button")
    button.id = "add-attend"
    button.addEventListener("click", () => {
        addAttendee()
    })
    button.textContent = "+"
    button.setAttribute("class", "attend-button")
    dropDiv.appendChild(button)
    button = document.createElement("button")
    button.id = "subtract-attend"
    button.addEventListener("click",() => {
        removeAttendee()
    })
    button.textContent = "X"
    button.setAttribute("class", "attend-button")
    dropDiv.appendChild(button)
}

function addAttendee(){
    if(!addCheck){
        addCheck = true
        value = document.getElementById("attend-drop-id").value
        if(value != "" && value != "Name" && value != null){
            attendHolder.push(document.getElementById("attend-drop-id").value)
        }
        document.getElementById("attend-drop-id").remove()
        document.getElementById("add-attend").remove()
        document.getElementById("subtract-attend").remove()
        let dropDiv = document.getElementById("attend-div")
        let dropSelect = document.createElement("select")
        dropSelect.setAttribute("class", "attend-drop")
        dropSelect.id = "attend-drop-id"
        for(let i = 0; i < attendHolder.length; i++){
            let option = document.createElement("option")
            option.text = attendHolder[i]
            dropSelect.appendChild(option)
        }
        dropDiv.appendChild(dropSelect)
        let button = document.createElement("button")
        button.id = "add-attend"
        button.addEventListener("click", () => {
            addAttendee()
        })
        button.textContent = "+"
        button.setAttribute("class", "attend-button")
        dropDiv.appendChild(button)
        button = document.createElement("button")
        button.id = "subtract-attend"
        button.addEventListener("click",() => {
            removeAttendee()
        })
        button.textContent = "X"
        button.setAttribute("class", "attend-button")
        dropDiv.appendChild(button)
    } else {
        addCheck = false
        document.getElementById("attend-drop-id").remove()
        document.getElementById("add-attend").remove()
        document.getElementById("subtract-attend").remove()
        let dropDiv = document.getElementById("attend-div")
        let dropSelect = document.createElement("input")
        dropSelect.setAttribute("class", "attend-drop")
        dropSelect.type = "text"
        dropSelect.id = "attend-drop-id"
        dropSelect.placeholder = "Name"
        dropDiv.appendChild(dropSelect)
        let button = document.createElement("button")
        button.id = "add-attend"
        button.addEventListener("click", () => {
            addAttendee()
        })
        button.textContent = "✓"
        button.setAttribute("class", "attend-button")
        dropDiv.appendChild(button)
        button = document.createElement("button")
        button.id = "subtract-attend"
        button.addEventListener("click",() => {
            removeAttendee()
        })
        button.textContent = "X"
        button.setAttribute("class", "attend-button")
        dropDiv.appendChild(button)
    }
}
function createCoord(){
    let dropDiv = document.getElementById("coord-div")
    let dropSelect = document.createElement("select")
    dropSelect.setAttribute("class", "attend-drop")
    dropSelect.id = "coord-drop-id"
    dropDiv.appendChild(dropSelect)
    let button = document.createElement("button")
    button.id = "add-coord"
    button.addEventListener("click", () => {
        addCoords()
    })
    button.textContent = "+"
    button.setAttribute("class", "attend-button")
    dropDiv.appendChild(button)
    button = document.createElement("button")
    button.id = "subtract-coord"
    button.addEventListener("click",() => {
        removeCoord()
    })
    button.textContent = "X"
    button.setAttribute("class", "attend-button")
    dropDiv.appendChild(button)
}
function addCoords(){
    if(!addCoord){
        addCoord = true
        value = document.getElementById("coord-drop-id").value
        if(value != "" && value != "Name" && value != null){
            coordHolder.push(document.getElementById("coord-drop-id").value)
        }
        document.getElementById("coord-drop-id").remove()
        document.getElementById("add-coord").remove()
        document.getElementById("subtract-coord").remove()
        let dropDiv = document.getElementById("coord-div")
        let dropSelect = document.createElement("select")
        dropSelect.setAttribute("class", "attend-drop")
        dropSelect.id = "coord-drop-id"
        for(let i = 0; i < coordHolder.length; i++){
            let option = document.createElement("option")
            option.text = coordHolder[i]
            dropSelect.appendChild(option)
        }
        dropDiv.appendChild(dropSelect)
        let button = document.createElement("button")
        button.id = "add-coord"
        button.addEventListener("click", () => {
            addCoords()
        })
        button.textContent = "+"
        button.setAttribute("class", "attend-button")
        dropDiv.appendChild(button)
        button = document.createElement("button")
        button.id = "subtract-coord"
        button.addEventListener("click",() => {
            removeCoord()
        })
        button.textContent = "X"
        button.setAttribute("class", "attend-button")
        dropDiv.appendChild(button)
    } else {
        addCoord = false
        document.getElementById("coord-drop-id").remove()
        document.getElementById("add-coord").remove()
        document.getElementById("subtract-coord").remove()
        let dropDiv = document.getElementById("coord-div")
        let dropSelect = document.createElement("input")
        dropSelect.setAttribute("class", "attend-drop")
        dropSelect.type = "text"
        dropSelect.id = "coord-drop-id"
        dropSelect.placeholder = "Name"
        dropDiv.appendChild(dropSelect)
        let button = document.createElement("button")
        button.id = "add-coord"
        button.addEventListener("click", () => {
            addCoords()
        })
        button.textContent = "✓"
        button.setAttribute("class", "attend-button")
        dropDiv.appendChild(button)
        button = document.createElement("button")
        button.id = "subtract-coord"
        button.addEventListener("click",() => {
            removeCoord()
        })
        button.textContent = "X"
        button.setAttribute("class", "attend-button")
        dropDiv.appendChild(button)
    }
}

function removeAttendee(){
    if (!addCheck){
        document.getElementById("attend-drop-id").value = ""
        addAttendee()
    } else {
        attendHolder.splice(attendHolder.indexOf(document.getElementById("attend-drop-id").value), 1)
        document.getElementById("attend-drop-id").value = ""
        addCheck = false
        addAttendee() 
    }
}

function removeCoord(){
    if (!addCoord){
        document.getElementById("coord-drop-id").value = ""
        addCoords()
    } else {
        coordHolder.splice(coordHolder.indexOf(document.getElementById("coord-drop-id").value), 1)
        document.getElementById("coord-drop-id").value = ""
        addCoord = false
        addCoords() 
    }
}

function expandMaxDate(date){
    let eventDiv = document.getElementById("add-event-div-id")
    eventDiv.style.top = "10%"
    let outerDiv = document.getElementById('outer-add-div')
    outerDiv.style.display = "block"
    outerDiv.style.height = document.documentElement.scrollHeight + "px"
    for(let i = 0; i < calData['group_data']['events']['events_num']; i++){
        if(checkEventDate(i, date, "group")){
            let eventText = document.createElement("p")
            eventText.setAttribute("class", "expanded-event-text-group")
            eventText.textContent = calData['group_data']['events']['event_' + i]['title']
            eventText.addEventListener("click", () => {
                expandEvent("group", i)
            })
            eventDiv.appendChild(eventText)
        } else if(checkNextDay(i, date, "group")){
            break
        }
    }
    for(let i = 0; i < calData['user_data']['events']['events_num']; i++){
        if(checkEventDate(i, date, "user")){
            let eventText = document.createElement("p")
            eventText.setAttribute("class", "expanded-event-text-user")
            eventText.textContent = calData['user_data']['events']['event_' + i]['title']
            eventText.addEventListener("click", () => {
                expandEvent("user", i)
            })
            eventDiv.appendChild(eventText)
        } else if(checkNextDay(i, date, "user")){
            break
        }
    }
}

function expandEvent(type, index){
    outsideAddClicked()
    addEvent()
    document.getElementById("title_entry").value = calData[type + "_data"]['events']['event_' + index]['title']
    document.getElementById("entry_0").value = displayData['monthList'][parseInt(calData[type + "_data"]['events']['event_' + index]['month'])]
    document.getElementById("entry_1").value = calData[type + "_data"]['events']['event_' + index]['day']
    document.getElementById("entry_2").value = calData[type + "_data"]['events']['event_' + index]['year']
    document.getElementById("entry_3").value = calData[type + "_data"]['events']['event_' + index]['start_time']["hour"]
    document.getElementById("entry_4").value = calData[type + "_data"]['events']['event_' + index]['start_time']["minute"]
    document.getElementById("entry_5").value = calData[type + "_data"]['events']['event_' + index]['start_time']["AMPM"]
    if(calData[type + '_data']['events']['event_' + index]['end_time']['hour'] == ""){
        for(let i = 0; i < 3; i++){
            document.getElementById("entry_" + (6 + i)).remove()
        }
        document.getElementById("end-time-label").style.color = "#ababab"
        document.getElementById("all-day-check").checked = true
    } else {
        document.getElementById("entry_6").value = calData[type + "_data"]['events']['event_' + index]['end_time']["hour"]
        document.getElementById("entry_7").value = calData[type + "_data"]['events']['event_' + index]['end_time']["minute"]
        document.getElementById("entry_8").value = calData[type + "_data"]['events']['event_' + index]['end_time']["AMPM"]
    }
    for(let i = 0; i < calData[type + "_data"]['events']['event_' + index]['attend'].length; i++){
        let option = document.createElement("option")
        option.value = calData[type + "_data"]['events']['event_' + index]['attend'][i]
        attendHolder[i] = option.value
        option.text = calData[type + "_data"]['events']['event_' + index]['attend'][i]
        document.getElementById("attend-drop-id").appendChild((option))
    }
    for(let i = 0; i < calData[type + "_data"]['events']['event_' + index]['coord'].length; i++){
        let option = document.createElement("option")
        option.value = calData[type + "_data"]['events']['event_' + index]['coord'][i]
        coordHolder[i] = option.value
        option.text = calData[type + "_data"]['events']['event_' + index]['coord'][i]
        document.getElementById("coord-drop-id").appendChild((option))
    }
    document.getElementById("entry_9").value = calData[type + "_data"]['events']['event_' + index]['location']
    document.getElementById("entry_10").value = calData[type + "_data"]['events']['event_' + index]['description']
    if(type == "group"){
        document.getElementById("share-check").checked = true
    }
    document.getElementById("submit-event").remove()
    
    const eventDiv = document.getElementById("add-event-div-id")
    let button = document.createElement("button")
    button.id = "edit-event"
    button.textContent = "Edit"
    button.setAttribute("class", "submit-event-button")
    let tempDiv = document.createElement("div")
    tempDiv.setAttribute("class", "button-container")
    button.addEventListener("click", () =>{
        submitEvent("edit", index)
    })
    tempDiv.appendChild(button)
    button = document.createElement("button")
    button.id = "delete-event"
    button.textContent = "Delete"
    button.setAttribute("class", "submit-event-button")
    button.addEventListener("click", () =>{
        deleteEvent(index)
    })
    tempDiv.appendChild(button)
    eventDiv.appendChild(tempDiv)
}

function checkNextDay(index, date, type){
    return parseInt(calData[type + "_data"]["events"]['event_' + index]['day']) > parseInt(date) && parseInt(calData[type + "_data"]['events']['event_' + index]['month']) >= parseInt(displayData['currMonth']) && parseInt(calData[type + "_data"]['events']['event_' + index]['year']) >= parseInt(displayData['currYear'])
}

function submitEvent(type, index){
    console.log("Submit Event")
    let errorLog = document.getElementById("error-div")
    let eventStorage = {}
    eventStorage['group'] = calData['group_data']['group']
    eventStorage['username'] = calData['user_data']['username']
    let inputValue = document.getElementById("title_entry").value
    if(checkEntry(inputValue)){
        eventStorage['title'] = inputValue
        inputValue = document.getElementById("entry_0").value
    if(checkEntry(inputValue)){
        eventStorage['month'] = inputValue
        inputValue = document.getElementById("entry_1").value
        if(checkEntry(inputValue)){
            eventStorage['day'] = inputValue
            inputValue = document.getElementById("entry_2").value
            if(checkEntry(inputValue)){
                eventStorage['year'] = inputValue
                inputValue = document.getElementById("entry_3").value
                let inputValue1 = document.getElementById("entry_4").value
                console.log("Input value 1=", inputValue1)
                let inputValue2 = document.getElementById("entry_5").value
                if(!(checkDate(eventStorage['month'], eventStorage['day'], eventStorage['year']))){
                    errorLog.textContent = "Cannot Choose A Past Date"
                    return ""
                }
                if(checkEntry(inputValue) && checkEntry(inputValue1) && checkEntry(inputValue2)){
                    eventStorage['startHour'] = inputValue
                    eventStorage['startMinute'] = inputValue1
                    eventStorage['startAMPM'] = inputValue2
                    if(!document.getElementById("all-day-check").checked){
                        inputValue = document.getElementById("entry_6").value
                        inputValue1 = document.getElementById("entry_7").value
                        inputValue2 = document.getElementById("entry_8").value
                        if(checkEntry(inputValue) && checkEntry(inputValue1) && checkEntry(inputValue2)){
                            eventStorage['endHour'] = inputValue
                            eventStorage['endMinute'] = inputValue1
                            eventStorage['endAMPM'] = inputValue2
                        } else {
                            errorLog.textContent = "Pick An End Time"
                            return ""
                        }
                    } else {
                        eventStorage['endHour'] = ""
                        eventStorage['endMinute'] = ""
                        eventStorage['endAMPM'] = ""
                    }
                    eventStorage['attend'] = attendHolder
                    eventStorage['coord'] = coordHolder
                    eventStorage['location'] = document.getElementById("entry_9").value
                    eventStorage['description'] = document.getElementById("entry_10").value
                    if(document.getElementById("share-check").checked){
                        eventStorage['shared'] = "true"
                    } else {
                        eventStorage['shared'] = "false"
                    }
                    eventStorage['index'] = index
                    console.log("To Post: ", eventStorage)
                    fetch(window.location.origin + "/" + type + "_event", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(eventStorage)
                    })
                    .then(response => response.json())
                    .then(data => {
                        if(data['status'] == "Passed"){
                            calData = data['calData']
                            sessionStorage.setItem('calData', JSON.stringify(data['calData']))
                            console.log("Updated Events: ", calData)
                            outsideAddClicked()
                            displayGrid()
                        } else {
                            errorLog.textContent = "Failed To Add To Database"  
                        }
                    })
                    outsideAddClicked()
                } else {
                    errorLog.textContent = "Pick A Start Time"
                }
            }
        } else {
            errorLog.textContent = "Pick A Date"
        }
    } else {
        errorLog.textContent = "Pick A Date"
    }
} else {
    errorLog.textContent = "Enter A Title"
}
}

function deleteEvent(index){
    let eventStorage = {}
    type = ""
    if(document.getElementById("share-check").checked){
        eventStorage['shared'] = "true"
        type = "group"
    } else {
        eventStorage['shared'] = "false"
        type = "user"
    }
    eventStorage['username'] = calData['user_data']['username']
    eventStorage['index'] = index
    eventStorage['group'] = calData['group_data']['group']
    fetch(window.location.origin + "/delete_event", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventStorage)
    })
    .then(response => response.json())
    .then(data => {
        if(data['status'] == "Passed"){
            calData = JSON.parse(sessionStorage.getItem('calData'))
            calData[type + '_data'] = data['updated_data']
            sessionStorage.setItem('calData', JSON.stringify(calData))
            console.log("Updated Events: ", calData)
            outsideAddClicked()
            displayGrid()
        } else {
            errorLog.textContent = "Failed To Add To Database"  
        }
    })
}
function checkEntry(input){
    return input != "" && input != null
}

function checkDateLimit(month, day, year){
    if(month != "Feburary"){
        return day <= displayData['lastDay'][displayData['monthList'].indexOf(month)]
    } else if ((year - 2020) % 4 == 0){
        return day <= 29
    }
    return day <= 28
}

function setDateLimit(){
    month = document.getElementById("entry_0")
    if(checkEntry(month.value)){
        let exception = false
        day = document.getElementById("entry_1")
        selected = day.value
        while (day.firstChild){
            day.removeChild(day.firstChild)
        }
        let option = document.createElement("option")
        option.value = ""
        option.text = ""
        day.appendChild(option)
        for(let i = 1; i <= displayData['lastDay'][displayData['monthList'].indexOf(month.value)]; i++){
            option = document.createElement("option")
            option.value = i
            option.text = i
            day.appendChild(option)
        }
        if(month.value == "Feburary" && (document.getElementById("entry_2").value - 2020) % 4 == 0){
            option = document.createElement("option")
            option.value = "29"
            option.text = "29"
            if(parseInt(selected) == 29){
                exception = true
            }
            day.appendChild(option)
        }
        if(exception || parseInt(selected) <= displayData['lastDay'][displayData['monthList'].indexOf(month.value)]){
            day.value = selected
        } else {
            day.value = ""
        }
    }
}
function checkDate(month, day, year){
    if(year > displayData['currYear']){
        console.log("Failed Year")
        return true
    } else if(year < displayData['currYear']){
        console.log("Failed Year")
        return false
    } else if((displayData['monthList'].indexOf(month)) > (displayData['currMonth'])){
        console.log("Failed")
        return true
    } else if((displayData['monthList'].indexOf(month)) < (displayData['currMonth'])){
        console.log("Failed")
        return false
    } else if (day >= displayData['currDate']){
        return true
    }
    return false
}