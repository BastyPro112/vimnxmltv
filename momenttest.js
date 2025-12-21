const moment = require("dayjs"); 
const axios = require("axios"); 
//const fetch = import("node-fetch"); 

console.log(moment("2026-01-20T11:44:19-0300").format("YYYYMMDDhhmmss ZZ")); 

const afterDays = 5; 
const beforeDays = -2; 
let datesXMLArray = []; 

for(let i = beforeDays; i <= afterDays; i++) {
    datesXMLArray.push(moment().add(i, "days").format("YYYYMMDD") + ".xml"); 
}

console.log(datesXMLArray); 
/*axios.get("https://myip.wtf/headers", {
             "headers": {
                 "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36",
                 "Sec-Ch-Ua": '"Google Chrome";v="143", "Chromium";v="143", "Not A(Brand";v="24"'}}) 
.then(resp => console.log(resp.data))*/ 


