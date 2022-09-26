const s=function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function r(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerpolicy&&(n.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?n.credentials="include":t.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(t){if(t.ep)return;t.ep=!0;const n=r(t);fetch(t.href,n)}};s();function l(e){return window.go.main.App.GetXDeviceInfo(e)}function d(){return window.go.main.App.ListDisplays()}function u(){return window.go.main.App.ListXDevices()}document.querySelector("#app").innerHTML=`
    <button class="btn" onclick="listxdevices()">list devices on the virtual pointer</button>
    <button class="btn" onclick="listDisplays()">list display names</button>
    <div>
        <input id="deviceId" type="text">
    </div>
    <button class="btn" onclick="getXDeviceInfo()">Get X Devices Info by id</button>


    <div id="result"></div>
`;window.listxdevices=function(){try{u().then(e=>{document.querySelector("#result").innerHTML=e})}catch(e){console.error(e)}};window.getXDeviceInfo=function(){var e;e=document.getElementById("deviceId").value;try{l(e).then(i=>{document.querySelector("#result").innerHTML=i})}catch(i){console.error(i)}};window.listDisplays=function(){try{d().then(e=>{e=atob(e);var i=JSON.parse(e);i.forEach(r=>{var o=document.createElement("div");o.innerHTML=r.displayname,document.querySelector("#result").appendChild(o)})})}catch(e){console.error(e)}};
