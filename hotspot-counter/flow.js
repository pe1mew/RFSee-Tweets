[
    {
        "id": "b511c5ecdd874f5e",
        "type": "tab",
        "label": "Flow 2",
        "disabled": false,
        "info": ""
    },
    {
        "id": "6749e5f0c1ecde37",
        "type": "twitter out",
        "z": "b511c5ecdd874f5e",
        "twitter": "",
        "name": "RFSeeTweets",
        "x": 960,
        "y": 120,
        "wires": []
    },
    {
        "id": "3edaf71eac2e9442",
        "type": "function",
        "z": "b511c5ecdd874f5e",
        "name": "Ask Helium API",
        "func": "// var helium_api_url = \"https://api.helium.io/v1/cities/\";\n// var city = \"YXBlbGRvb3JuZ2VsZGVybGFuZG5ldGhlcmxhbmRz\"; // Apeldoorn\n// var request_url = helium_api_url + city + \"/hotspots\";\n\n// https://api.helium.io/v1/hotspots/location/distance?lat=52.211157&lon=5.9699231&distance=50000\n\n// var helium_api_url = \"https://api.helium.io/v1/hotspots/location/distance?\";\n// var latitudeName = \"lat=\";\n// var longitudeName = \"&lon=\";\n// var distanceName = \"&distance=\";\n// var latitude = 52.211157;\n// var longitude = 5.9699231;\n// var distance = 70000;\n\nvar request_url = \"https://api.helium.io/v1/cities/YXBlbGRvb3JuZ2VsZGVybGFuZG5ldGhlcmxhbmRz/hotspots\";\n\nvar msg1 = {\n    \"method\" : \"GET\",\n    \"url\" : request_url,\n    \"headers\" : {\n                // \"Content-Type\": \"application/json\"\n                // \"User-Agent\" : \"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.5 Safari/605.1.15\"\n                \"User-Agent\" : \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36 Edg/99.0.1150.36\"\n                },\n    // \"payload\" : JSON.stringify(data)\n    };\n\nreturn msg1;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 320,
        "y": 120,
        "wires": [
            [
                "5c377d40e0b7b4f7"
            ]
        ]
    },
    {
        "id": "5c377d40e0b7b4f7",
        "type": "https-node",
        "z": "b511c5ecdd874f5e",
        "name": "",
        "method": "use",
        "ret": "obj",
        "url": "",
        "authorized": true,
        "agent": true,
        "x": 490,
        "y": 120,
        "wires": [
            [
                "4eb82529fdba553a"
            ]
        ]
    },
    {
        "id": "528b0c8a71c6d313",
        "type": "inject",
        "z": "b511c5ecdd874f5e",
        "name": "At 12:00",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "00 12 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payloadType": "date",
        "x": 160,
        "y": 120,
        "wires": [
            [
                "3edaf71eac2e9442"
            ]
        ]
    },
    {
        "id": "4eb82529fdba553a",
        "type": "function",
        "z": "b511c5ecdd874f5e",
        "name": "Iterate miners",
        "func": "// var msg1 = {}\n// var data = {};\nmsg.payload.hotspotCount = msg.payload.data.length;\nmsg.payload.hotspotOnline = 0;\n\nmsg.dateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');\n\nfor (var i=0 ; i < msg.payload.hotspotCount ; i++) {\n\n    // online count\n    if(msg.payload.data[i].status.online === \"online\"){\n        msg.payload.hotspotOnline++;\n    }\n\n}\nvar proc = (msg.payload.hotspotOnline / msg.payload.hotspotCount * 100);\nmsg.payload.hotspotOnlineProc = Number(proc.toFixed(1));\n\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 660,
        "y": 120,
        "wires": [
            [
                "e8928ddc2b52c840"
            ]
        ]
    },
    {
        "id": "e8928ddc2b52c840",
        "type": "template",
        "z": "b511c5ecdd874f5e",
        "name": "Tweet",
        "field": "payload",
        "fieldType": "msg",
        "format": "handlebars",
        "syntax": "mustache",
        "template": "@Helium In Apeldoorn {{payload.hotspotOnline}} of {{payload.hotspotCount}} #ThePeoplesNetwork Hotspots are online. ({{payload.hotspotOnlineProc}}%)",
        "output": "str",
        "x": 810,
        "y": 120,
        "wires": [
            [
                "6749e5f0c1ecde37"
            ]
        ]
    }
]
