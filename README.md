# KissAnime.ru Captcha Solver

![KissAnime.ru](https://i.imgur.com/Uq4KHkL.png)


## Introduction

This script is for the auto-completion of KissAnime captcha. If a solution is unknown, you click the answer manually. If it is known, then the correct answer will automatically be clicked. Supports any number of images in the captcha, and multiple images can match a single description.*

If you would like to help your fellow users out, please post your solution list using the "export" option

It's a fork and update of [https://greasyfork.org/en/scripts/369923-kissanime-captcha-solver](https://greasyfork.org/en/scripts/369923-kissanime-captcha-solver).

## Change-Log

> Added ban interception feature.

> Added dynamic element ID's generation and search (use-case of formVerify), because KissAnime site owner was detecting '#importExport'.

> Changed the data being stored inside localStorage (now it stores image urls instead of decoding an image). Note: Hopefully, the urls aren't dynamically created :)

> Changes to the image storing algorithm, since KissAnime Captcha has multiple images on same keywords.

> Import compatability tweaks.

## Installation

Requires [TamperMonkey](https://tampermonkey.net) extension in your browser to work, because this is a userscript.

Requires a dataset of correct keyword-url pairs to work (lucky you, this repository includes a small dataset).

## How-To Gather Data.. faster?

Although, I do not like it, right now we have to gather data manually by solving captchas. 

To do that faster, I created another userscript (KissAnime.ru Captcha Data Miner.user.js) that prevents the POST request from the form. In other words, you will never get redirected after solving the captcha successfully and instead you'll get a new captcha to solve. This way, you have 4 images per page refresh to solve instead of just 2.