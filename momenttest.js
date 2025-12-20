const moment = require("moment"); 
const axios = require("axios"); 
//const fetch = import("node-fetch"); 

console.log(moment("2026-01-20T11:44:19-0300").format("YYYYMMDDhhmmss ZZ")); 

/*axios.get("https://myip.wtf/headers", {
             "headers": {
                 "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36",
                 "Sec-Ch-Ua": '"Google Chrome";v="143", "Chromium";v="143", "Not A(Brand";v="24"'}}) 
.then(resp => console.log(resp.data))*/ 

async function fetchtest() {
    const resp = await fetch("https://juno.epg.elektamedia.com/api/Programme/40mediaSpA/Juno/today?channel=ENT_Channel");
    console.log(resp.status); 
    console.log(await resp.text())
} 
fetchtest(); 
/*fetch("https://juno.epg.elektamedia.com/api/Programme/40mediaSpA/Juno/today?channel=ENT_Channel") 
.then(resp => console.log(resp.text()))*/ 

