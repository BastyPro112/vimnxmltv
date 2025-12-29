const axios = require("axios"); 
const fs = require("fs")
const { XMLParser } = require("fast-xml-parser"); 
const parser = new XMLParser({
     ignoreAttributes: false, // Set to false to parse attributes
  attributeNamePrefix: "@_", // Add a prefix to attribute names
  parseAttributeValue: true, 
  format: true 
})
axios.get("https://epg.vimn.com/nickelodeon_north/xmltvlegal/las/20260131.xml")
.then(resp => {
    let d = JSON.stringify(parser.parse(resp.data)) 
    //console.log(); 
    fs.writeFileSync("./outtest.json", d)
}); 













