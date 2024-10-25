const express = require('express');
const WebSocket = require('ws');
const fs = require('fs')
const path = require('path');

let hostport = 5000;
let resoniteport = 5001;

let wordreplacementlist = {}
let isRunning = false;

function loadConfig() {
    fs.readFile('./config.cfg', (err, data) => {
        let rawcfg = data.toString().split(/\r?\n/)

        let hostportconfig = rawcfg.filter((a) => {return a.startsWith('hostport')})[0]
        hostport = (''+hostportconfig).split('|')[1] ?? hostport;

        let resoniteportconfig = rawcfg.filter((a) => {return a.startsWith('resoniteport')})[0]
        resoniteport = (''+resoniteportconfig).split('|')[1] ?? resoniteport;

        let wordreplacementstartindex = rawcfg.indexOf("[word-replacement]")
        let wordreplacementconfig = rawcfg
        wordreplacementconfig.splice(0,1+wordreplacementstartindex);

        let newwrlist = {}
        for(let word of wordreplacementconfig) {
            if (!word.includes('|')) continue;
            newwrlist[word.split('|')[0]] = word.split('|')[1];
        }
        wordreplacementlist = newwrlist;
        console.log("Config loaded")
        if(!isRunning)main();
    });
}


(() => {
    loadConfig();
    fs.watch('./config.cfg', (event) => {
        if (event != 'change') return
        loadConfig();
    });
})();
function main() {
    isRunning = true;

    const app = express()
    app.use(express.json())
    
    const wss = new WebSocket.Server({port: resoniteport}, () => {
        console.log(`Connect Resonite websocket to ws://localhost:${resoniteport}`)
    })

    app.listen(hostport, () => {
        console.log(`Go to http://localhost:${hostport}`)
    })
    
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '/index.html'))
    })
    
    
    wss.on('connection', (ws) => {
        ws.on('message', (message) => {
            message = message.toString()
            let msg = JSON.parse(message)
            
            if(msg.voice_result) {
                let message = msg.voice_result;
                message = message.split(' ').map(word => wordreplacementlist[word] || word).join(' ');
                console.log(`${message}`)
                
                wss.clients.forEach(client => client.send(`${message}`))
            }
        })
    })
};