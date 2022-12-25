const Raspi = require("raspi-io").RaspiIO;
const board = new five.Board({
    io: new Raspi()
});

const API = {}

board.on("ready", function() {
    API.blink = (state) => {
        var led = new five.Led("P1-13");
        if (state == "start") {
            led.blink();
            return
        } 

        return led.stop()
    };

})

module.exports = API