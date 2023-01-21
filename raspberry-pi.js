const {RaspiIO} = require("raspi-io");
const {Led, Board} = require("johnny-five");
const board = new Board({
    io: new RaspiIO()
});

const API = {}

board.on("ready", function() {
    var led = new Led("P1-7"); // P1-13    https://github.com/nebrius/raspi-io voor uitleg onder important note
    
    API.blink = (state) => {
        if (state == "start") {
            led.blink();
            return
        } 
        return led.stop()
    };

})

module.exports = API