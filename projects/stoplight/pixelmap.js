// Generates pixelmap for concentric rings of LEDs
//
// Based on https://forum.electromage.com/t/concentric-rings-circle-mapping/649

function (pixelCount) {
    var map = [];

    var pixelsPerRing = [
        1, 8, 12, 16, 24, 32, 40, 48, 
        1, 8, 12, 16, 24, 32, 40, 48, 
        1, 8, 12, 16, 24, 32, 40, 48,
        1, 8, 12, 16, 24, 32, 40, 48,
        1, 8, 12, 16, 24, 32, 40, 48,
        1, 8, 12, 16, 24, 32, 40, 48
    ];

    for (ring = 0; ring < pixelsPerRing.length; ring++) {
        if (pixelsPerRing[ring] == 1) {
            map.push([0, 0]);
        } else {
            for (i = 0; i < pixelsPerRing[ring]; i++) {
                c = i / pixelsPerRing[ring] * Math.PI * 2

                // To change the initial start pixel location from 12 o'clock,
                // or the spin direction (clockwise or counterclockwise)
                // adjust +/-sign(s) (for 180 + spin) 
                // and/or swap sin/cos locations (for 90/270 start points)
                map.push([0 - Math.sin(c) * ring, 0 - Math.cos(c) * ring])
            }
        }
    }

    return map;
}