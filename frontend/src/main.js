import './style.css';

import {ListXDevices} from '../wailsjs/go/main/App';
import {GetXDeviceInfo} from '../wailsjs/go/main/App';
import {ListDisplays} from '../wailsjs/go/main/App';

document.querySelector('#app').innerHTML = `
    <button class="btn" onclick="listxdevices()">list devices on the virtual pointer</button>
    <button class="btn" onclick="listDisplays()">list display names</button>
    <div>
        <input id="deviceId" type="text">
    </div>
    <button class="btn" onclick="getXDeviceInfo()">Get X Devices Info by id</button>


    <div id="result"></div>
`;

window.listxdevices = function () {
    try {
        ListXDevices().then((result) => {
            document.querySelector('#result').innerHTML = result;
        });
    } catch (err) {
        console.error(err);
    }
};

window.getXDeviceInfo = function () {
    var id
    id = document.getElementById('deviceId').value

    try {
        GetXDeviceInfo(id).then((result) => {
            document.querySelector('#result').innerHTML = result;
        });
    } catch (err) {
        console.error(err);
    }
};


window.listDisplays = function () {
    try {
        ListDisplays().then((result) => {
            result = atob(result)
            var displaylist = JSON.parse(result)
            displaylist.forEach(monitorInfo => {
                var displayDiv = document.createElement("div")
                displayDiv.innerHTML = monitorInfo.displayname
                document.querySelector('#result').appendChild(displayDiv)
                
            })
        });
    } catch (err) {
        console.error(err);
    }
};
