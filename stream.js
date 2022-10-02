 var nyokenStream = {
        data: [
            {
                value: 52, text: "You Lost"
            },
            {
                value: 57, text: "No hands (5 seconds)"
            },
            {
                value: 61, text: "No game timer"
            },
            {
                value: 66, text: "Kill an SCV"
            },
            {
                value: 72, text: "Mouse Only (20 seconds)"
            },
            {
                value: 75, text: "Compliment Opponent"
            },
            {
                value: 78, text: "Cancel a building"
            },
            {
                value: 81, text: "Nuke or Lockdown"
            },
            {
                value: 85, text: "Firebat drop"
            },
            {
                value: 87, text: "Choose my strategy (or race)"
            },
            {
                value: 89, text: "Wraiths vs Z or P"
            },
            {
                value: 91, text: "Can't lift off buildings"
            },
            {
                value: 93, text: "Can't build a specific unit"
            },
            {
                value: 94, text: "Can't hotkey scanners"
            },
            {
                value: 97, text: "Close one eye (30 seconds)"
            },
            {
                value: 99, text: "Play in old skin"
            },
            {
                value: 100, text: "Exit room, close door, reenter"
            }

        ],
        audio: new Audio("https://uploads.twitchalerts.com/sound-defaults/positive-game-sound-4.ogg"),

        nukeAudio: new Audio("https://www.myinstants.com/media/sounds/tadupd04.mp3"),

        setDeceleratingTimeout: function (callback, factor, times) {
            var internalCallback = function (tick, counter) {
                return function () {
                    if (--tick >= 0) {
                        setTimeout(internalCallback, ++counter * factor);
                        callback();
                    }
                }
            }(times, 0);

            setTimeout(internalCallback, factor);
        },

        findIndex: function () {
            var randomNumber = Math.floor(Math.random() * 100) + 1;
             var tmp = -1;

            for (var i = 0; i < this.data.length; i++) {

                if (randomNumber <= this.data[i].value) {
                    tmp = i;
                    break;
                }
            }
            return tmp;
        },

        spin: function () {
            pickedIndex = this.findIndex();
            var iterations = 0;
            var endingTimeoutCount = 0;

            this.setDeceleratingTimeout(function () {

                if (endingTimeoutCount == 10) {
                    nyokenStream.playAudioAndAddResult(pickedIndex);
                    nyokenStream.wheelElem.innerHTML = nyokenStream.data[pickedIndex].text;
                    return;
                }
                if (iterations >= nyokenStream.data.length) {
                    iterations = 0;
                }
                nyokenStream.wheelElem.innerHTML = nyokenStream.data[iterations].text;
                iterations++;

            }, 10, 10);

            this.setDeceleratingTimeout(function () {
                endingTimeoutCount++;
                if (endingTimeoutCount == 10) {
                    nyokenStream.wheelElem.innerHTML = nyokenStream.data[pickedIndex].text;
                    nyokenStream.playAudioAndAddResult(pickedIndex);
                    endingTimeoutCount = 0;
                    return;
                }

                if (iterations >= nyokenStream.data.length) {
                    iterations = 0;
                }

                nyokenStream.wheelElem.innerHTML = nyokenStream.data[iterations].text;
                iterations++;
            }, 70, 10);
        },
        playAudioAndAddResult: function (index) {
            if (nyokenStream.data[index].text.toUpperCase().includes("NUKE", 0)) {
                nyokenStream.nukeAudio.play();
            }
            else {
                nyokenStream.audio.play();
            }

            if (!nyokenStream.data[index].text.toUpperCase().includes("LOST", 0)) {
                nyokenStream.resultElem.innerHTML += "<br/>" + nyokenStream.data[index].text;
            }
            else {
                nyokenStream.resultElem.innerHTML += "<br/><strike>&nbsp;&nbsp;" + nyokenStream.data[index].text + "&nbsp;&nbsp;</strike>";
            }

        },
        wheelElem: document.getElementById("wheel"),
        resultElem: document.getElementById("penaltyResults")
    }
 