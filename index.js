const { XMLParser, XMLBuilder } = require("fast-xml-parser"); 
const moment = require("dayjs"); 
const axios = require("axios"); 
const fs = require("node:fs"); 
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
    parseAttributeValue: true  
}); 

const afterDays = 7; 
const beforeDays = -3; 
let datesXMLArray = []; 

for(let i = beforeDays; i <= afterDays; i++) {
    datesXMLArray.push(moment().add(i, "days").format("YYYYMMDD") + ".xml"); 
}

console.log(datesXMLArray); 

let xmltv = {
    "?xml": {
        "@_version": "1.0"
    },
    tv: {
        channel: [],
        programme: []
    }
};
(async () => {
for (const channel of channels) {
    xmltv.tv.channel.push({
	"display-name": channel.name, 
    "img": {
        "@_src": channel.logo 
    }, 
	"@_id": channel.id
    });  
    for(let fi = beforeDays; fi <= afterDays; fi++) {
        let i = fi + 2; 
        let epgPath = channel.epg + datesXMLArray[i]; 
        console.log("Intentando hacer una solicitud a " + epgPath); 
        try {
            const epgXml = await axios.get(epgPath) 
	    if (epgXml.status != 200) {
		console.error(`Error en solicitud de ${epgPath}: ${epgXml.status}`);
		continue; 
	    } 
	    console.log("Parseando " + epgPath)
            const epgJson = parser.parse(epgXml.data).tv.programme;  
            xmltv.tv.programme.push(...epgJson);  
        } catch(e) {
		console.error("Error al hacer una solicitud: " + e); 
        } 
    } 
}
const savePath = "./out" 
const saveFile = "/guide.xml" 
try {
	let epg = builder.build(xmltv);
	console.log("Intentando escribir a la ruta establecida"); 
	if (!fs.existsSync(savePath)) {
		fs.mkdirSync(savePath, { recursive: true });
	}
	fs.writeFileSync('./out/guide.xml', epg); 
	console.log("Escrito exitosamente");
	} catch (err) {
	console.error("Error al escribir: " + err); 
	}
})(); 

