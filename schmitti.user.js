// ==UserScript==
// @name         Schmittis Functions
// @namespace    schmitti
// @version      0.2
// @description  Functions written by s-schmitti for the-west
// @author       s-schmitti
// @include      http*://*.the-west.*/game.php*
// @grant        none
// ==/UserScript==

function loadScript(scriptUrl){
    (function(document, tag) {
        let scriptTag = document.createElement(tag), 
        firstScriptTag = document.getElementsByTagName(tag)[0]; 
        scriptTag.src = scriptUrl; 
        firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag); 
    }(document, 'script'));
}
loadScript("https://s-schmitti.github.io/TW-Schmittis_Functions/main.js")
