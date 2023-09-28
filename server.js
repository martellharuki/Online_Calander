const express = require('express');
const app = express();
const { spawn } = require('child_process')
const signUpPath = ".\\hoogle_calander_database\\sign_up.py"
const logInPath = ".\\hoogle_calander_database\\log_in.py"
const addEventPath = ".\\hoogle_calander_database\\add_event.py"
const delEventPath = ".\\hoogle_calander_database\\delete_event.py"
app.use(express.static(__dirname +'/public'))
app.set('view engine', 'ejs');
const parser = require('body-parser')
app.use(parser.json());
const path = require('path');

app.listen(3888)

app.get('/', (req, res) => {
    let key = req.query.key
    if(typeof key == 'undefined'){
        key = "false"
    }
    res.render("home", { logChecked: key})
});

app.get('/about', (req, res) =>{
    let key = req.query.key
    if(typeof key == 'undefined'){
        key = "false"
    }
    res.render("about", { logChecked: key})
});

app.get('/log_in', (req, res) => {
    res.render("log_in")
})

app.get('/sign_up', (req, res) => {
    res.render("sign_up")
})

app.get('/calander', (req, res) =>{
    res.render("calander")
})

app.post('/submit-sign_up', (req, res) => {
    const signData = req.body
    console.log(signData)
    const signUpProcess = spawn('python3', [signUpPath, signData['group'], signData['username'], signData['first'], signData['last'], signData['email'], signData['password'], signData['new']])
    let signOutput = ""
    let errOutput = Buffer.alloc(0)
    signUpProcess.stdout.on('data', (data) => {
        signOutput += data.toString()
    })
    signUpProcess.stderr.on('data', (data) => {
        errOutput = Buffer.concat([errOutput, data])
    })
    signUpProcess.on('close', (code) => {
        if(code===0) {
            try{
                const resData = JSON.parse(signOutput)
                console.log("Response: ", resData)
                res.json(resData)
            } catch (error) {
                console.log("Error on base", error)
            }
        } else {
            console.log("Exit error", code)
            console.log("Transalted Error: ",errOutput.toString('utf8'))
        }
    })
})

app.post('/submit-log_in', (req, res) => {
    const signData = req.body
    console.log(signData)
    const signUpProcess = spawn('python3', [logInPath, signData['group'], signData['username'], signData['password']])
    let signOutput =""
    let errOutput = Buffer.alloc(0)
    signUpProcess.stdout.on('data', (data) => {
        signOutput += data.toString()
    })
    signUpProcess.stderr.on('data', (data) => {
        errOutput = Buffer.concat([errOutput, data])
    })
    signUpProcess.on('close', (code) => {
        if(code===0) {
            try{
                const resData = JSON.parse(signOutput)
                console.log("Response: ", resData)
                res.json(resData)
            } catch (error) {
                console.log("Error on base", error)
            }
        } else {
            console.log("Exit error", code)
            console.log("Transalted Error: ",errOutput.toString('utf8'))
        }
    })
})

app.post('/add_event', (req, res) => {
    let eventData = req.body
    console.log("Send out: ", addEventPath, eventData['group'], eventData['username'], eventData['shared'], eventData['title'], eventData['month'], eventData['day'], eventData['year'], eventData['startHour'], eventData['startMinute'],
    eventData['startAMPM'], eventData['endHour'], eventData['endMinute'], eventData['endAMPM'], processArray(eventData['attend']), processArray(eventData['coord']),
    eventData['location'], eventData['description'])
    const addEventProcess = spawn('python3', [addEventPath, eventData['group'], eventData['username'], eventData['shared'], eventData['title'], eventData['month'], eventData['day'], eventData['year'], eventData['startHour'], eventData['startMinute'],
        eventData['startAMPM'], eventData['endHour'], eventData['endMinute'], eventData['endAMPM'], processArray(eventData['attend']), processArray(eventData['coord']),
        eventData['location'], eventData['description']])
    let signOutput =""
    let errOutput = Buffer.alloc(0)
    addEventProcess.stdout.on('data', (data) => {
        signOutput += data.toString()
    })
    addEventProcess.stderr.on('data', (data) => {
        errOutput = Buffer.concat([errOutput, data])
    })
    addEventProcess.on('close', (code) => {
        if(code===0) {
            try{
                const resData = JSON.parse(signOutput)
                console.log("Response: ", resData)
                res.json(resData)
            } catch (error) {
                console.log("Error on base", error)
            }
        } else {
            console.log("Exit error", code)
            console.log("Transalted Error: ",errOutput.toString('utf8'))
        }
    })
})

app.post('/edit_event', (req, res) => {
    let eventData = req.body
    let type = eventData['username']
    if(eventData['shared'] == "true"){
        type = "group"
    }
    console.log("Delete: ", delEventPath, eventData['group'], type, eventData['index'])
    const editEventProcess = spawn('python3', [delEventPath, eventData['group'], type, eventData['index']])
    let signOutput =""
    let errOutput = Buffer.alloc(0)
    editEventProcess.stdout.on('data', (data) => {
        signOutput += data.toString()
    })
    editEventProcess.stderr.on('data', (data) => {
        errOutput = Buffer.concat([errOutput, data])
    })
    editEventProcess.on('close', (code) => {
        if(code===0) {
            try{
                const resData = JSON.parse(signOutput)
                console.log("Response For Delete: ", resData)
            } catch (error) {
                console.log("Error on base", error)
            }
        } else {
            console.log("Exit error", code)
            console.log("Transalted Error: ",errOutput.toString('utf8'))
        }
    })
    console.log("Send out: ", addEventPath, eventData['group'], eventData['username'], eventData['shared'], eventData['title'], eventData['month'], eventData['day'], eventData['year'], eventData['startHour'], eventData['startMinute'],
    eventData['startAMPM'], eventData['endHour'], eventData['endMinute'], eventData['endAMPM'], processArray(eventData['attend']), processArray(eventData['coord']),
    eventData['location'], eventData['description'])
    const addEventProcess = spawn('python3', [addEventPath, eventData['group'], eventData['username'], eventData['shared'], eventData['title'], eventData['month'], eventData['day'], eventData['year'], eventData['startHour'], eventData['startMinute'],
        eventData['startAMPM'], eventData['endHour'], eventData['endMinute'], eventData['endAMPM'], processArray(eventData['attend']), processArray(eventData['coord']),
        eventData['location'], eventData['description']])
    let addOutput =""
    errOutput = Buffer.alloc(0)
    addEventProcess.stdout.on('data', (data) => {
        addOutput += data.toString()
    })
    addEventProcess.stderr.on('data', (data) => {
        errOutput = Buffer.concat([errOutput, data])
    })
    addEventProcess.on('close', (code) => {
        if(code===0) {
            try{
                console.log("\n\n\nOutput: ", signOutput, "\n\n\n")
                const resData = JSON.parse(addOutput)
                console.log("Response: ", resData)
                res.json(resData)
            } catch (error) {
                console.log("Error on base", error)
            }
        } else {
            console.log("Exit error", code)
            console.log("Transalted Error: ",errOutput.toString('utf8'))
        }
    })
})

app.post("/delete_event", (req, res) => {
    let eventData = req.body
    let type = eventData['username']
    if(eventData['shared'] == "true"){
        type = "group"
    }
    console.log("Delete: ", delEventPath, eventData['group'], type, eventData['index'])
    const editEventProcess = spawn('python3', [delEventPath, eventData['group'], type, eventData['index']])
    let signOutput =""
    let errOutput = Buffer.alloc(0)
    editEventProcess.stdout.on('data', (data) => {
        signOutput += data.toString()
    })
    editEventProcess.stderr.on('data', (data) => {
        errOutput = Buffer.concat([errOutput, data])
    })
    editEventProcess.on('close', (code) => {
        if(code===0) {
            try{
                const resData = JSON.parse(signOutput)
                console.log("Response For Delete: ", resData)
                res.json(resData)
            } catch (error) {
                console.log("Error on base", error)
            }
        } else {
            console.log("Exit error", code)
            console.log("Transalted Error: ",errOutput.toString('utf8'))
        }
    })
})
function processArray(arr){
    let returnString = ""
    for(let i = 0; i < arr.length; i++){
        returnString = returnString + arr[i] + ":"
    }
    returnString = returnString.substring(0, returnString.lastIndexOf(":")) + "!"
    return returnString
}
