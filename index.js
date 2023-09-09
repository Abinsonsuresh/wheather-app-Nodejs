const http = require('http')
const fs = require('fs')
var requests = require('requests');

const homeFile = fs.readFileSync("index.html", "utf-8")

const replaceVal = (tempvalue, originalvalue)=>{
let temprature = tempvalue.replace("{%temp%}", originalvalue.main.temp)
return temprature
}

const server = http.createServer((req, res) => {
    if (req.url == "/") {
        requests("http://api.openweathermap.org/data/2.5/weather?q=kochi,in&APPID=14f5fc262f3672d944f809a6e2e6c833")
            .on('data',  (chunk) => {
                const objdata = JSON.parse(chunk)
                const arraydata = [objdata]
                // console.log(arraydata[0].main.temp)
                const realtimedata = arraydata.map((value)=> 
                (

                    replaceVal(homeFile, value))
                ).join("")
                // console.log(realtimedata)
                res.write(realtimedata)
            })
            .on('end',  (err) => {
                if (err) return console.log('connection closed due to errors', err);

                // console.log('end');
                res.end()
            });
    }
    else{
        console.log("ERROR")
    }
})

server.listen(5000, "127.0.0.1")