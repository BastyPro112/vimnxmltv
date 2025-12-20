const { XMLParser, XMLBuilder } = require("fast-xml-parser"); 
const moment = require("moment"); 
const axios = require("axios"); 
const fs = require("fs"); 
const channels = require("./channels.json"); 
const builder = new XMLBuilder({
    ignoreAttributes: false, 
    attributeNamePrefix: "@_", 
    parseAttributeValue: true, 
    format: true 
}); 
const parser = new XMLParser({
    ignoreAttributes: false, 
    attributeNamePrefix: "@_", 
    parseAttributeValue: true, 
    format: true 
}); 

const afterDays = 5; 
const beforeDays = -2; 
let datesXMLArray = []; 

for(let i = beforeDays; i <= afterDays; i++) {
    datesXMLArray.push(moment().add(i, "days").format("YYYYMMDD") + ".xml"); 
}

console.log(datesXMLArray); 

channels.forEach(async channel => {
    for(let fi = beforeDays; i <= afterDays; i++) {
        let i = fi + 2; 
        let epgPath = channel.epg + datesXMLArray[i]; 
        console.log("Intentando hacer una solicitud a " + epgPath); 
        try {
            const epgXml = await axios.get(epgPath) 
            const epgJson = parser.parse(epgXml); 
            
        } catch(e) {

        }
    }
})