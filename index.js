const { XMLBuilder } = require("fast-xml-parser"); 
const moment = require("moment"); 
const axios = require("axios"); 
const fs = require("node:fs"); 
const channels = require("./channels.json"); 
const builder = new XMLBuilder({
    ignoreAttributes: false, 
    attributeNamePrefix: "@_", 
    parseAttributeValue: true, 
    format: true 
}); 
let channelList = {
    "?xml": {
        "@_version": "1.0" 
    }, 
    tv: {
        channel: [], 
        programme: []
    }
}; 

let channelEPGLinkList = {}; 

channels.forEach(channel => {
    channelList.tv.channel.push({
            "display-name": channel.name,
            "icon": {
                "@_src": channel.logo
            },
            "@_id": channel.id 
    }); 
    channelEPGLinkList[channel.id] = channel.epg; 
    console.log(`Canal ${channel.name} con id ${channel.id} encontrado.`)
}); 

channelList.tv.channel.forEach(async channel => {   
    const id = channel["@_id"]; 
    console.log("Generando para " + id); 
    let epgs = []; 
    try {
        const epgreq = await axios.get(channelEPGLinkList[id], {
             "headers": {
                 "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36",
                 "Sec-Fetch-Site": "same-origin"}}); 
        if (!epgreq.status == 200) {
            console.log(`Error al generar ${id}: ${epgreq.status}`)
            return; 
        } 
        const epgJson = epgreq.data; 
        let epg; 
        epgJson.programacion.forEach(program => {
            channelList.tv.programme.push({
                "title": program["titulo"], 
                "desc": program["subtitulo"], 
                "@_start": moment(program["inicio"]).format("YYYYMMDDhhmmss ZZ"), 
                "@_stop": moment(program["fin"]).format("YYYYMMDDhhmmss ZZ"), 
            })
        }); 
        try {
            let epg = builder.build(channelList); 
            console.log("Intentando escribir a la ruta establecida")
            fs.writeFileSync('./epg.xml', epg); 
            console.log("Escrito exitosamente")
        } catch (err) {
            console.error("Error al escribir: " + err);
        }
    } catch(e) { 
        console.error("Error al generar: " + e); 
        return; 
    }
})



console.log(JSON.stringify(channelList)); 
// console.log(builder.build(channelList)) 