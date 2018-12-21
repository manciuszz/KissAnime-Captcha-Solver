// ==UserScript==
// @name         KissAnime.ru Captcha Data Miner
// @match        *://kissanime.ru/Special/AreYouHuman2*
// @author       Manciuszz
// @version      0.1
// @grant        none
// ==/UserScript==

(function() { // Literal piece of shit, unoptimized code below... It works tho!
    'use strict';

    let count = 0; // Count image clicks
    let imgData = $("#formVerify1").find("img").toArray();

    // Disable POST request sending from form.
    $("#formVerify1").submit(function(e) { e.preventDefault(); });

    // Bind image clicks to custom behaviour
    imgData.forEach(function(currentImage, imageIndex) {
        let oldFunc = currentImage.onclick; // Captcha Solver bindings...
        currentImage.onclick = function(event) {
            let words = JSON.parse(localStorage.getItem("KCS-lastDescriptions"));
            if (count < 2) {
                if (localStorage.getItem("KCS-" + words.firstWord) === null) {
                    localStorage.setItem("KCS-" + words.firstWord, JSON.stringify([currentImage.src]));
                } else {
                    let res = prompt(words.firstWord, words.firstWord.slice(-1));
                    if (res && res.length < 2) {
                        let arr = JSON.parse(localStorage.getItem("KCS-" + words.firstWord.slice(0, -1) + res)) || [];
                        if (arr && !arr.includes(currentImage.src))
                            arr.push(currentImage.src);
                        localStorage.setItem("KCS-" + words.firstWord.slice(0, -1) + res, JSON.stringify(arr));
                    } else {
                        let arr = JSON.parse(localStorage.getItem("KCS-" + res)) || [];
                        if (arr && !arr.includes(currentImage.src))
                            arr.push(currentImage.src);
                        localStorage.setItem("KCS-" + res, JSON.stringify(arr));
                    }
                }
                if (count == 1) oldFunc();
            } else if (count < 4) {
                if (localStorage.getItem("KCS-" + words.secondWord) === null)
                    localStorage.setItem("KCS-" + words.secondWord, JSON.stringify([currentImage.src]));
                else {
                    let res = prompt(words.secondWord, words.secondWord.slice(-1));
                    if (res && res.length < 2) {
                        let arr = JSON.parse(localStorage.getItem("KCS-" + words.secondWord.slice(0, -1) + res)) || [];
                        if (arr && !arr.includes(currentImage.src))
                            arr.push(currentImage.src);
                        localStorage.setItem("KCS-" + words.secondWord.slice(0, -1) + res, JSON.stringify(arr));
                    } else {
                        let arr = JSON.parse(localStorage.getItem("KCS-" + res)) || [];
                        if (arr && !arr.includes(currentImage.src))
                            arr.push(currentImage.src);
                        localStorage.setItem("KCS-" + res, JSON.stringify(arr));
                    }
                }
                if (count == 3) location.reload();
            } else {
                location.reload();
            }
            console.log(localStorage.getItem("KCS-lastDescriptions"));
            count++;
        };
    });

})();