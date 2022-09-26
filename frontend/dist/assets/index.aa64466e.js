const c=function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function s(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerpolicy&&(n.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?n.credentials="include":e.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(e){if(e.ep)return;e.ep=!0;const n=s(e);fetch(e.href,n)}};c();function l(t){return window.go.main.App.GetXDeviceInfo(t)}function u(){return window.go.main.App.ListDisplays()}function d(){return window.go.main.App.ListXDevices()}document.querySelector("#app").innerHTML=`
    <button class="btn" onclick="listxdevices()">list devices on the virtual pointer</button>
    <button class="btn" onclick="listDisplays()">list display names</button>
    <div>
        <input id="deviceId" type="text">
    </div>
    <button class="btn" onclick="getXDeviceInfo()">Get X Devices Info by id</button>


    <div id="result"></div>
`;window.listxdevices=function(){try{d().then(t=>{document.querySelector("#result").innerHTML=t})}catch(t){console.error(t)}};window.getXDeviceInfo=function(){var t;t=document.getElementById("deviceId").value;try{l(t).then(i=>{document.querySelector("#result").innerHTML=i})}catch(i){console.error(i)}};window.listDisplays=function(){try{u().then(t=>{displayList=JSON.parse(t),document.querySelector("#result").innerHTML=displayList.displayname})}catch(t){console.error(t)}};
