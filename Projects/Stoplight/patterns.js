Toggle RYG
Hold RYG

Base Patttern..  Hold RYG
Base Pattern
Base Patttern..  Toggle RYG (Base pattern persists)

Base Pattern.. Hold RYG
Base Pattern.. Hold RYG (Base pattern persists)


RYG Standard Sequence
RYG Standard Sequence (Press to change/hold)

RYG Random time/placement sequence

Color/Pattern/placement Sequence


//// Interactive sequence
// Hold A - Single RYG on when pushed. (Alows combo)
// Hold B - ALL RYG on when pushed. (Last pushed override)
// 
// Toggle background pattern on/off
// Push - Switch background pattern


//// Interactive/RYG Sequence
// Default - Cycle through colors on regular interval
// Hold A - Single RYG on when pushed. Resume cycle when let go (after pause)
// Hold B - ALL RYG on when pushed. Resume cycle when let go (after reducing to single, and  pause)
//
// Toggle background pattern on/off
// Push - Switch background pattern


//// RYG/Pattern Random color/pattern/placement
// Hold - ALL RYG on when pushed. Resume cycle after let go


//// Standard pattern - Spinner (2d)
//// Standard pattern - (2d ??)
//// Standard pattern - Swirly?
//// Standard pattern - Swirly?
//// Standard pattern - Chill
//// Standard pattern - Chill / Low power usage
//// Standard pattern -  ???

//- ?? How to return to default pattern??





// BlinkFade
values = array(pixelCount)
hues = array(pixelCount)

export function beforeRender(delta) {
	for (i = 0; i < pixelCount; i++) {
  	values[i] -= .005 * delta * .1

      if (values[i] <= 0) {
  	  values[i] = random(1) // Bump it back up to a random number 0..1
  	  
  	  hues[i] = time(4.6 / 65.536) + 0.2 * triangle(i / pixelCount)
  	}
	}
}

export function render(index) {
  h = hues[index]    // Retrieve the hue for this pixel
  v = values[index]  // Retrieve the brightness value for this pixel
  v = v * v          // Gamma scaling: v is in 0..1 so this makes small v smaller 
	hsv(h, 1, v)       // Saturation is 1 -- no white is mixed in
}





/*
  Color bands
  
  Color bands has a chill vibe that comes from applying slower phase shifts to
  shorter wavelengths.
*/
export function beforeRender(delta) {
    t1 = time(.25)
    t2 = time(.15)
  }
  
  export function render(index) {
    h = index / (pixelCount / 2) // Notice how each hue appears twice
    s = wave(-index / 3 + t1)
    s = 1 - s * s * s * s
    v = wave(index / 2 + t2) * wave(index / 5 - t2) + wave(index / 7 + t2)
    hsv(h, s, v)
  }
  




/*
  Color fade pulse
  */

export function beforeRender(delta) {
    t1 = time(.01) // For hue movement
    t2 = time(.02) // For pulse movement
    t3 = time(.1)  // White / desaturation movement
  }
  
  export function render(index) {
    h = index / pixelCount * 2 - t1
    v = triangle(index / pixelCount * 4 + t2) 
    v = v * v * v * v
    hsv(h, s, v)
  }
  




  /* 
  Color twinkle bounce

*/

export function beforeRender(delta) {
    t1 = time(.05) * PI2
  }
  
  export function render(index) {
    h = 1 + sin(index / 2 + 5 * sin(t1))
    h += time(.1)
    v = (1 + sin(index / 2 + 5 * sin(t1))) / 2
    v = v * v * v * v // Gamma correction
    hsv(h, 1, v)
  }
  




  /*
  Color twinkles
*/

export function beforeRender(delta) {
    t1 = time(.50) * PI2 
    t2 = time(.15) * PI2 // 3.33 times faster than t1
  }
  
  export function render(index) {
    h = sin(index / 3 + PI2 * sin(index / 2 + t1))
    v = wave(index / 3 / PI2 + sin(index / 2 + t2))
    v = v * v * v * v // Gamma correction
    v = v > .1 ? v : 0
    
    hsv(h, 1, v)
  }
  







  /*
  FireFlies

*/

sparkHue = .05       // Set the hue for each spark
sparkSaturation = 1  // Set the saturation for each spark (0 = white)
numSparks = 1 + floor(pixelCount / 10)  // Scale number of sparks based on # LEDs
decay = .99          // Decay their energy/speed. Use .999 for slower
maxSpeed = .4        // The maximum initial speed of any spark / firefly
newThreshhold = .01  // Recycle any spark under this energy

sparks = array(numSparks)
sparkX = array(numSparks)
pixels = array(pixelCount)


export function beforeRender(delta) {
  delta *= .1
  
  for (i = 0; i < pixelCount; i++) pixels[i] *= .9 // Air cooling
  
  for (i = 0; i < numSparks; i++) {
    // Recycle dead sparks
    if (abs(sparks[i]) <= newThreshhold) {
      sparks[i] = (maxSpeed / 2) - random(maxSpeed)
      sparkX[i] = random(pixelCount)
    }
    
    sparks[i] *= decay  // Spark energy decay
    sparkX[i] += sparks[i] * delta  // Advance each position ∝ its energy
    
    // Allow sparks to loop around each end
    if (sparkX[i] >= pixelCount) sparkX[i] = 0
    if (sparkX[i] < 0) sparkX[i] = pixelCount - 1
    
    // Heat up the pixel at this spark's X position
    pixels[floor(sparkX[i])] += sparks[i]
  }
}

export function render(index) {
  v = pixels[index]
  hsv(sparkHue, sparkSaturation, v * v * 10)
}








/*
  Firework dust is for sparkle ponies.
*/

export function render(index) {
    h = random(1)
    s = random(100) < 90
    v = random(1) > .995
    hsv(h, s, v)
  }










  /*
  Glitch bands 

  Glitch bands is the result of two sharply convex, peaked waves, traveling
  in opposite directions. 
*/


export function beforeRender(delta) {
    t1 = time(.1) * PI2 // Notice we go from 0..2*Pi for timers fed to sin()
    t2 = time(.1)       // And 0..1 for timers fed to traingle()
    t3 = time(.5)
    t4 = time(.2) * PI2
    t5 = time(.05)
    t6 = time(.02)
  }
  
  export function render(index) {
    h = sin(t1)
    h += (index - pixelCount / 2) / pixelCount * (triangle(t3) * 10 + 4 * sin(t4)) 
    m = .3 + triangle(t2) * .2
    h %= m
    s1 = triangle(t5 + index / pixelCount * 5)
    s1 = s1 * s1
    s2 = triangle(t6 - index / pixelCount)
    s2 = s2 * s2 * s2 * s2
    s = 1 - triangle(s1 * s2)
    v = (s1 > s2) + .5  
    hsv(h, s, v)
  }






  /*
  Marching rainbow
*/

export function beforeRender(delta) {
    t1 = time(.1)
    t2 = time(.05)
  }
  
  export function render(index) {
    pct = index / pixelCount // Percent this pixel is into the overall strip
    h = wave(wave(wave(t1 + pct)) - pct)
    w1 = wave(t1 + pct)
    w2 = wave(t2 - pct * 10)
    v = w1 - w2
    hsv(h, 1, v)
  }
  







  /*
  Millipede
*/

speed = 20
legs = 10

export function beforeRender(delta) {
  t1 = time(1 / speed)
  t2 = time(2 / speed)
}

export function render(index) {
  h = index / pixelCount + wave(t1)
  h += (index / pixelCount + t2) * legs / 2 % .5
  v = wave(h + t2)
  v = v * v // Gamma correction
  hsv(h, 1, v)
}





/*
  Rainbow fonts
*/
scale = pixelCount / 2

export function beforeRender(delta) {
  t1 = time(.1) // Time it takes to melt = 0.1 * 65.536s
  offset = sin(time(.2) * PI2) * pixelCount / 10
}

export function render(index) {
  c1 = 1 - abs((index + offset) - scale) / scale
  c2 = wave(c1)
  c3 = wave(c2 + t1)
  hsv(c3, 1, 1)
}





/*
  Rainbow melt

*/

scale = pixelCount / 2

export function beforeRender(delta) {
  t1 = time(.1)  // Time it takes for regions to move and melt 
}

export function render(index) {
  c1 = 1 - abs(index - scale) / scale  // 0 at strip endpoints, 1 in the middle
  c2 = wave(c1)
  c3 = wave(c2 + t1)
  v = wave(c3 + t1)  // Separate the colors with dark regions
  v = v * v
  hsv(c1 + t1, 1, v)
}






/*
  Slow color shift
*/

l4 = pixelCount * 4     // 4 times the strip length

export function beforeRender(delta) {
  t1 = time(.15) * PI2
  t2 = time(.1)
}

export function render(index) {
  h = (t2 + 1 + sin(index / 2 + 5 * sin(t1)) / 5) + index / l4
  v = wave((index / 2 + 5 * sin(t1)) / PI2)
  v = v * v * v * v
  hsv(h, 1, v)
}



/*
  Spin cycle
*/

export function beforeRender(delta) {
    t1 = time(.1)
  }
  
  export function render(index) {
    pct = index / pixelCount  // Percent this pixel is into the overall strip
    h = pct * (5 * wave(t1) + 5) + 2 * wave(t1)
    h = h % .5 + t1  // Remainder has precedence over addition
    v = triangle(5 * pct + 10 * t1)
    v = v * v * v
    hsv(h, 1, v)
  }

  









/*
  Spiral twirls 2D
  
  A configurable 2D pattern that creates a variety of rotating and swirling
  circular and spiral effects.
  
  Output demo: https://youtu.be/Qa7B59CbYNw
  
  For best results a matrix of 16x16 or greater is recommended.
  
  It's suggested to start with all the sliders at zero, then try each of them
  one at a time to see what impact it has on the resultant pattern. That way it
  should be easier to understand how to combine them all to get the effect you'd
  like.
  
  There's a limited 3D and 1D projection provided.
  
  Generously contributed by ChrisNZ (Chris) from the Pixelblaze forums.
    https://forum.electromage.com/u/chrisnz
*/

var twistSpeed = .015
var rotateSpeed = .002
var startingColor = .3
var colorSpeed = .015
var twist, rotation, colorShift, arms


// How quickly the spiral should rotate back and forth
export function sliderTwistSpeed(v) { twistSpeed = v = 0 ? 0 : .015 / v }

// How quickly the entire pattern should rotate
export function sliderRotationSpeed(v) { rotateSpeed = v = 0 ? 0 : .005 / v }

// What initial colors to display. If colorSpeed is zero then the pattern will
// stay this color
export function sliderInitialColor(v) { startingColor = v * 2 }

// How quickly the colors of the pattern should change
export function sliderColorSpeed(v) { colorSpeed = v = 0 ? 0 : .015 / v }

// How many arms of symmetry the pattern should have (1-3)
export function sliderArms(v) { arms = 1 + floor(v * 2.999) }


export function beforeRender(delta) {
  twist = wave(time(twistSpeed)) * 2 - 1
  rotation = time(rotateSpeed)
  colorShift = time(colorSpeed)
}

export function render2D(index, x0, y0) {
  x = (x0 - .5) * 2
  y = (y0 - .5) * 2
  dist = sqrt(x * x + y * y)
  angle = (atan2shim(y, x) + PI) / PI / 2
  angle += dist * twist / 2
  
  h = angle * arms - rotation + 10
  h = h - floor(h)
  v = (1.01 - dist) * (h < .5 ? h * h * h : h)
  h = (h + startingColor) / 2 + colorShift
  
  hsv(h, 1, v)
}

// Render the line sliced across the horizon, y = .5
export function render(index) {
  pct = index / pixelCount
  render2D(index, pct, 0.5)
}

// You can remove this shim if you're running v3.8 or newer
function atan2shim(y, x) {
  if (x == 0 || y == 0) {
    return 0 
  } else {
    return atan2(y, x)
  }
}







/* 
  Static random colors
*/

var seed = random(0xffff) 

var xs
function xorshift() {
  xs ^= xs << 7
  xs ^= xs >> 9
  xs ^= xs << 8
  return xs
}

function pseudorandomFraction() {
  return xorshift() / 100 % 1
}

export function beforeRender(delta) {
  xs = seed   
  t1 = time(5.4 / 65.536) // Used to fade each pixel in and out
}

export function render(index) {
  h = pseudorandomFraction()
  s = pseudorandomFraction()
  s = 1 - s * s * s 
  v = wave(t1 + pseudorandomFraction())
  hsv(h, s, v * v)
}








/*
  Xorcery 2D/3D
*/

export function beforeRender(delta) {
    t1 = time(.1)
    t2 = time(.1) * PI2
    t3 = time(.5)
    t4 = time(.2) * PI2
  }
  
  export function render2D(index, x, y) {
    render3D(index, x, y, 0)
  }
  
  // Repeat the top line of the matrix 4X for a more granular 1D
  export function render(index) {
    pct = index / pixelCount
    render3D(index, 4 * pct, 0, 0)
  }
  