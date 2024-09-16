
let startTime = 50

setInterval(function() {
    if (startTime > -1){
        const displayElement = document.getElementById("countDown");

        displayElement.innerHTML = `${startTime} seconds until explosion!`

        startTime = startTime - 1;
    }
}, 1000)


setTimeout(function() {
    if (startTime > -1){
        const displayElement = document.getElementById("timeout");

        displayElement.innerHTML = `${startTime + 1} seconds left. Time to panic!!!`

        startTime = startTime - 1;
    }
}, 6000)

setInterval(function() {
    alert(`You are running out of time`)

}, 10000)