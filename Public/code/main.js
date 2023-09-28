featureText = ["Make different kinds of events such as tasks, events, and reminders. Set a time frame for each added event and save it. Add various other information such as location, comments, atendees, and planners", 
"Share your Calanders with people who also use Hoogle. They will be able to edit and view the calander. Collaborate with many different people in your group to make one organized calander",
"View the calander by clicking on a day. This will show an extended timeframe of different events that are occuring. Overlap is possible and information such as corresponders, attendies, emails, and time frame can be expaned by clicking on the event.",
"Send reminders to people who are in your group and attendies by providing emails. One day before an event, an email will be sent to all atendees.",
"Be notified when others change or add an event. Group members will be notified whern an event is added by another memeber. This will include all the information of the event as well as who updated it."]
let isLoggedIn = sessionStorage.getItem('isLoggedIn')
if (isLoggedIn == null){
    sessionStorage.setItem('isLoggedIn', 'false')
}
featureTextStatus = [false, false, false, false]
window.addEventListener('scroll', () =>{
    let menuDiv = document.getElementById("menu-div")
    let scrollValue = window.scrollY || window.pageYOffset
    menuDiv.style.top = scrollValue +"px"
});
let calMain = {}

function expandFeature(num) {
    if(!featureTextStatus[num]){
        featureTextStatus[num] = true
        targetDiv = document.getElementById("feature-box-" + num)
        targetDiv.style.paddingBottom = 15 + "px"
        newDiv = document.createElement('div')
        newDiv.classList.add('expand-feature')
        newDiv.setAttribute('id', 'featureExpandedDiv_' + num)
        featureParagraph = document.createElement('p')
        featureParagraph.setAttribute('class', 'feature-text')
        featureParagraph.setAttribute('id', 'expandedFeature_' + num)
        featureParagraph.textContent = featureText[num]
        newDiv.appendChild(featureParagraph)
        targetDiv.appendChild(newDiv)
    } else if (featureTextStatus[num]){
        featureTextStatus[num] = false
        document.getElementById('expandedFeature_' + num).remove()
        document.getElementById('featureExpandedDiv_' + num).remove()
        document.getElementById("feature-box-" + num).style.paddingBottom = 75 + 'px'
    } else {
        console.log("Feature Text Error")
    }
}

function menuClicked(){
    let mainDiv = document.getElementById("menu-toggled-div")
    mainDiv.style.right= '0px'
    document.body.style.overflow = 'hidden'
    let outerDiv = document.getElementById('outside-menu-div')
    outerDiv.style.display = "block"
    outerDiv.style.height = document.documentElement.scrollHeight + "px"
}

function outerMenuClicked(){
    document.getElementById('outside-menu-div').style.display = "none"
    let mainDiv = document.getElementById("menu-toggled-div")
    mainDiv.style.right= '-300px'
    document.body.style.overflow = 'auto'
}

function toHome(){
    const key = "key=" + encodeURIComponent(sessionStorage.getItem('isLoggedIn'))
    window.location.href = "/?" + key
}

function toAbout(){
    const key = "key=" + encodeURIComponent(sessionStorage.getItem('isLoggedIn'))
    window.location.href = "/About?" + key
}

function toHelp(){
    const key = "key=" + encodeURIComponent(sessionStorage.getItem('isLoggedIn'))
    window.location.href = "/Help?" + key 
}

function toLog(){
    window.location.href = "/log_in"
}

function toSign(){
    window.location.href = "/sign_up"
}

function logInButtonClicked(){
    console.log("Request Data")
    const group = document.getElementById("group-entry").value
    const username = document.getElementById("username-entry").value
    const password = document.getElementById("password-entry").value
    if(group.includes(" ") || group.includes("\\")|| group.length < 5){
        document.getElementById("error-box").textContent = "Group Must Have 5 Characters and cannot contain a space or \"\\\""
    } else if(username.includes(" ") || username.includes("\\")|| username.length < 5){
        document.getElementById("error-box").textContent = "Username Must Have 5 Characters and cannot contain a space or \"\\\""
    } else if(password.includes(" ") || password.includes("\\")|| password.length < 5){
        document.getElementById("error-box").textContent = "Password Must Have 5 Characters and cannot contain a space or \"\\\""
    } else {
        
        logInData = {}
        logInData['group'] = group
        logInData['username'] = username
        logInData['password'] = password
        fetch(window.location.origin + '/submit-log_in', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(logInData)
          })
            .then(response => response.json())
            .then(data => {
                if(data['status'] == "Group DNE"){
                    document.getElementById("error-box").textContent = "No Group By that Name"
                } else if(data['status'] == "Username DNE"){
                    document.getElementById("error-box").textContent = "Incorrect Username"
                } else if(data['status'] == "Password DNE"){
                    document.getElementById("error-box").textContent = "Incorrect Password"
                } else if(data['status'] == "passed"){
                    console.log("Passed")
                    sessionStorage.setItem('calData', JSON.stringify(data))
                    window.location.href = "/calander"
                }
                console.log("Server response: ", data)
            })
            .catch(error => {
              console.error('Error:', error);
            });
    }
}

function signUpButtonClicked(){
    console.log("Request Data")
    const group = document.getElementById("group-entry").value
    const username = document.getElementById("username-entry").value
    const password = document.getElementById("password-entry").value
    const first = document.getElementById("first-entry").value
    const last = document.getElementById("last-entry").value
    const email = document.getElementById("email-entry").value
    let newGroup = "1"
    if(document.getElementById("new-group-check").checked){
        newGroup = "0"
    }
    if(group.includes(" ") || group.includes("\\")|| group.length < 5){
        document.getElementById("error-box").textContent = "Group Must Have 5 Characters and cannot contain a space or \"\\\""
    } else if(!(checkNameValidity(first) || checkNameValidity(last))) {
        document.getElementById("error-box").textContent = "Invalid First or Last Name"
    }else if(!checkEmailValidity(email)){
        document.getElementById("error-box").textContent = "Invalid Email"
    }else if(username.includes(" ") || username.includes("\\")|| username.length < 5){
        document.getElementById("error-box").textContent = "Username Must Have 5 Characters and cannot contain a space or \"\\\""
    } else if(password.includes(" ") || password.includes("\\")|| password.length < 5){
        document.getElementById("error-box").textContent = "Password Must Have 5 Characters and cannot contain a space or \"\\\""
    } else {
        signUpData = {}
        signUpData['group'] = group
        signUpData['username'] = username
        signUpData['first'] = first
        signUpData['last'] = last
        signUpData['email'] = email
        signUpData['password'] = password
        signUpData['new'] = newGroup
        fetch(window.location.origin + '/submit-sign_up', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(signUpData)
          })
            .then(response => response.json())
            .then(data => {
                if(data['status'] == "Group Taken"){
                document.getElementById("error-box").textContent = "Group Name Already Exists"
                } else if(data['status'] == "Group DNE"){
                    document.getElementById("error-box").textContent = "No Group By that Name"
                } else if(data['status'] == "User taken"){
                    document.getElementById("error-box").textContent = "Username already Exists"
                } else if(data['status'] == "passed"){
                    console.log("Passed")
                    sessionStorage.setItem('calData', JSON.stringify(data))
                    window.location.href = "/calander"
                }
                console.log("Server response: ", data)
            })
            .catch(error => {
              console.error('Error:', error);
            });
    }
}

function checkNameValidity(name){
    const specialCharPattern = /^[a-zA-Z]+$/
    if(!specialCharPattern.test(name)){
        return false
    }
    return name.length >=2
}

function checkEmailValidity(email){
    const specialCharPattern2 = /^[a-zA-Z0-9\-_\.]+$/
    const listOfEmails = ["gmail.com", "yahoo.com", "outlook.com", "icloud.com", "aol.com", "comcast.net"]
    let index = email.lastIndexOf('@')
    if(index == -1){
        return false
    } else {
        firstParse = email.substring(0, index)
        lastParse = email.substring(index + 1)
        if(!listOfEmails.includes(lastParse)){
            return false
        }
        if(!specialCharPattern2.test(firstParse)){
            return false
        }
        return firstParse.length >= 2
    }
}

function signOut(){
    sessionStorage.removeItem('calData')
    sessionStorage.setItem('isLoggedIn', 'false')
    window.location.href = '/'
}
function printJson(){
    calMain = JSON.parse(sessionStorage.getItem('calData'))
    console.log("Json: ", calMain)
}