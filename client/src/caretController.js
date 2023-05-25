/*
 * TODO
 * - Correction for caret position when the text is
 *   overflowing the container
 * - Improve the slider progress track update lag
 * - Customize the resize handle on textarea
 * - Use custom scrollbar
 */

import * as caretPos from "https://cdn.skypack.dev/caret-pos@2.0.0";

// General utility functions
// 30 seconds of code
// https://www.30secondsofcode.org/js/s/hex-to-rgb
const hexToRGB = (hex) => {
  let alpha = false,
    h = hex.slice(hex.startsWith("#") ? 1 : 0);
  if (h.length === 3) h = [...h].map((x) => x + x).join("");
  else if (h.length === 8) alpha = true;
  h = parseInt(h, 16);
  return (
    "rgb" +
    (alpha ? "a" : "") +
    "(" +
    (h >>> (alpha ? 24 : 16)) +
    ", " +
    ((h & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8)) +
    ", " +
    ((h & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0)) +
    (alpha ? `, ${h & 0x000000ff}` : "") +
    ")"
  );
};

// Get input controls
const colorInput = document.getElementById("color-input");
const shapeSelector = document.getElementsByName("shape");
const sizeInput = document.getElementById("size-input");
const radiusInput = document.getElementById("radius-input");
const animationSelector = document.getElementsByName("animation");
const blurInput = document.getElementById("blur-input");
const glowInput = document.getElementById("glow-input");
const colorSelects = document.getElementsByClassName("color-selector");

// Define color select behavior
for (let _input of colorSelects) {
  // Get sub-components of the color selector
  const colorPresets = _input.querySelectorAll("input[type=radio]");
  const colorBox = _input.querySelector("input[type=color]");
  const colorInput = _input.querySelector("input[type=text]");

  // Add event listener to each color choice preset
  // When a preset is selected, the color input changes to the preset
  colorPresets.forEach((color) => {
    color.addEventListener("click", () => {
      if (color.checked) {
        colorBox.value = color.value;
        colorBox.dispatchEvent(new Event("input"));
      }
    });
  });

  // Add event listener to the color input text field
  // When the text field is changed, the color input changes to match
  colorInput.addEventListener("change", () => {
    colorBox.value = colorInput.value;
    colorBox.dispatchEvent(new Event("input"));
  });

  // Add event listener to the color box
  // When the color box changes, the input field changes to match
  // Preset colors are deselected if they don't match
  colorBox.addEventListener("input", () => {
    colorInput.value = colorBox.value.toUpperCase();
    colorPresets.forEach((color) => {
      if (color.value.toUpperCase() !== colorBox.value.toUpperCase()) {
        color.checked = false;
      } else {
        color.checked = true;
      }
    });
  });
}

// Get scalar input controls
const scalarInputs = document.getElementsByClassName("scalar-input");

// Define scalar input behavior
for (let _input of scalarInputs) {
  // Get sub-components of the scalar input
  const numberInput = _input.querySelector("input[type=number]");
  const stepUp = _input.getElementsByClassName("step")[0];
  const stepDown = _input.getElementsByClassName("step")[1];
  const slider = _input.querySelector("input[type=range]");

  _input.value = numberInput.value;

  // Initialize the slider progress track
  slider.style.setProperty("--value", slider.value);
  slider.style.setProperty("--min", slider.min == "" ? "0" : slider.min);
  slider.style.setProperty("--max", slider.max == "" ? "100" : slider.max);

  // Define the update functions
  function setSlider(val) {
    slider.value = val;
    _input.value = val;
    slider.style.setProperty("--value", val);
    _input.dispatchEvent(new Event("input"));
  }

  function setNumber(val) {
    slider.style.setProperty("--value", val);
    numberInput.value = val;
    _input.value = val;
    _input.dispatchEvent(new Event("input"));
  }

  function increment() {
    numberInput.stepUp();
    setSlider(numberInput.value);
  }

  function decrement() {
    numberInput.stepDown();
    setSlider(numberInput.value);
  }

  // Add event listeners to the sub-components
  numberInput.addEventListener("change", () => setSlider(numberInput.value));
  slider.addEventListener("input", () => setNumber(slider.value));
  stepUp.addEventListener("click", increment);
  stepDown.addEventListener("click", decrement);
}

// Get color chip controls
const colorChips = document.getElementsByClassName("color-chip");

// Set up color swatches
for (let _chip of colorChips) {
  const swatch = _chip.querySelector(".swatch");
  const input =
    _chip.previousSibling.nodeType === 3
      ? _chip.previousSibling.previousSibling
      : _chip.previousSibling;
  swatch.style.backgroundColor = input.value;
}

// Get the initial caret properties
let color, size, shape, radius, animation, blur, glow, glowColor;
color = colorInput.value;
shapeSelector.forEach((radio) => {
  if (radio.checked) {
    shape = radio.value;
  }
});
size = sizeInput.value;
radius = radiusInput.value;
animationSelector.forEach((radio) => {
  if (radio.checked) {
    animation = radio.value;
    if (animation === "expand") {
      animation = shape === "line" ? "expandVertical" : "expandHorizontal";
    }
  }
});
blur = blurInput.value;
glow = glowInput.value;
glowColor = hexToRGB(color).replace(/\)/, ", " + glow / 10 + ")");

// Define animations
const expandVertical = [{ transform: "scaleY(0)" }, { transform: "scaleY(1)" }];
const expandHorizontal = [
  { transform: "scaleX(0)" },
  { transform: "scaleX(1)" }
];
const blink = [{ opacity: 0 }, { opacity: 1 }];
const fade = [{ opacity: 0 }, { opacity: 1 }];
const solid = [{ opacity: 1 }];
const motionBlur = [
  { opacity: 0.4, filter: "blur(0px)" },
  { opacity: 0, filter: "blur(2px)" }
];
const expandTiming = {
  duration: 500,
  delay: 400,
  fill: "forwards",
  direction: "alternate",
  easing: "cubic-bezier(0.22, 1, 0.36, 1)",
  iterations: Infinity
};
const expandPreviewTiming = { ...expandTiming };
expandPreviewTiming.iterations = 9;
const blinkTiming = {
  duration: 1000,
  delay: 400,
  easing: "steps(2, jump-none)",
  iterations: Infinity
};
const blinkPreviewTiming = { ...blinkTiming };
blinkPreviewTiming.iterations = 5;
const fadeTiming = {
  duration: 500,
  delay: 400,
  fill: "forwards",
  direction: "alternate",
  easing: "cubic-bezier(0.22, 1, 0.36, 1)",
  iterations: Infinity
};
const fadePreviewTiming = { ...fadeTiming };
fadePreviewTiming.iterations = 9;
const solidTiming = {};
let motionBlurTiming = {
  duration: blur * 100,
  iterations: 1
};
const animationMap = {
  expandHorizontal: [expandHorizontal, expandTiming],
  expandVertical: [expandVertical, expandTiming],
  blink: [blink, blinkTiming],
  fade: [fade, fadeTiming],
  solid: [solid, solidTiming]
};
const animationPreviewMap = {
  expandHorizontal: [expandHorizontal, expandPreviewTiming],
  expandVertical: [expandVertical, expandPreviewTiming],
  blink: [blink, blinkPreviewTiming],
  fade: [fade, fadePreviewTiming],
  solid: [solid, solidTiming]
};

// Utility functions for motion blur
/*
 * Creates a tracer element that lags behind the caret
 * @param {HTMLInputElement} input - The input element
 * @param {HTMLElement} caret - The caret element
 * @returns {HTMLElement} - The tracer element
 */
function traceElement(element) {
  const tracer = document.createElement("div");

  tracer.style.position = "absolute";
  tracer.style.top = element.style.top;
  tracer.style.left = element.style.left;
  tracer.style.width = element.style.width;
  tracer.style.height = element.style.height;
  tracer.style.backgroundColor = element.style.backgroundColor;
  tracer.style.transformOrigin = element.style.transformOrigin;
  tracer.style.transform = element.style.transform;
  tracer.style.borderRadius = element.style.borderRadius;

  return tracer;
}

/*
 * Fades out an element and removes it from the DOM
 * @param {HTMLElement} element - The element that will be blurred
 * @param {animation} transition - The animation that will be applied
 * @param {animation} timing - The animation timing object
 */
function fadeOutElement(element, transition, timing) {
  const blurAnimation = element.animate(transition, timing);
  blurAnimation.onfinish = () => {
    element.style.opacity = 0;
    element.remove();
  };
}

// Get textbox components
const textBoxes = document.getElementsByClassName("textbox");
const textBoxItems = Array.from(textBoxes);
const carets = [];
const animatedCarets = [];
const inputs = [];

// Get preview
const caretPreview = document.getElementById("preview");

function setCaretProperties() {
  caretPreview.style.width = shape === "line" ? size + "px" : "0.75em";
  caretPreview.style.height = shape === "line" ? "1.1875em" : size + "px";
  caretPreview.style.borderRadius = radius + "px";
  caretPreview.style.backgroundColor = color;
  glowColor = hexToRGB(color).replace(/\)/, ", " + glow / 10 + ")");
  caretPreview.style.boxShadow = "0 0 8px " + glowColor;
  caretPreview.style.transformOrigin = shape === "line" ? "50% 50%" : "0 0";
  for (let i = 0; i < carets.length; i++) {
    carets[i].style.width = shape === "line" ? size + "px" : "0.75em";
    carets[i].style.height = shape === "line" ? "1.1875em" : size + "px";
    carets[i].style.borderRadius = radius + "px";
    carets[i].style.backgroundColor = color;
    carets[i].style.boxShadow = "0 0 8px " + glowColor;
    carets[i].style.transformOrigin = shape === "line" ? "50% 50%" : "0 0";
  }
}

// Initialize the caret preview animation
let animatedCaretPreview = caretPreview.animate(
  animationPreviewMap[animation][0],
  animationPreviewMap[animation][1]
);

function setCaretAnimation() {
  animatedCaretPreview.cancel();
  animatedCaretPreview = caretPreview.animate(
    animationPreviewMap[animation][0],
    animationPreviewMap[animation][1]
  );
  animatedCaretPreview.play();
  for (let i = 0; i < animatedCarets.length; i++) {
    animatedCarets[i].cancel();
    animatedCarets[i] = carets[i].animate(
      animationMap[animation][0],
      animationMap[animation][1]
    );
    animatedCarets[i].play();
  }
}

function caretPosition(i) {
  const position = caretPos.position(inputs[i]);
  const height = parseInt(carets[i].style.height);

  // Adjust the caret position for the scroll offset
  const { scrollLeft, scrollTop, clientHeight } = inputs[i];
  const left = position.left - scrollLeft;
  let top = position.top - scrollTop;

  // Slight vertical adjustment for the caret depending on whether the
  // input is <textarea> or <input>
  // Why is this necessary? 😕
  top = inputs[i].tagName === "TEXTAREA" ? top + 0.5 : top - 0.5;

  // Adjust the caret position in case it jumped to the next or previous line
  // before the input was scrolled
  top = top >= clientHeight ? clientHeight - height : top;
  top = top <= 0 ? 0 : top;

  return { left, top };
}

function placeCaret(i) {
  const { left, top } = caretPosition(i);
  carets[i].style.transformOrigin = shape === "line" ? "50% 50%" : "0 0";
  carets[i].style.left = left + "px";
  carets[i].style.top = shape === "line" ? top + "px" : top + 16 + "px";
}

function resetCaretPosition(i) {
  animatedCarets[i].cancel();
  placeCaret(i);
  carets[i].style.opacity =
    inputs[i].selectionStart === inputs[i].selectionEnd ? 1 : 0;
  animatedCarets[i] = carets[i].animate(
    animationMap[animation][0],
    animationMap[animation][1]
  );
  animatedCarets[i].play();
}

function setCaretPosition(i) {
  animatedCarets[i].cancel();
  placeCaret(i);
  carets[i].style.opacity = 1;
  if (blur > 0) {
    let tracer = traceElement(carets[i]);
    inputs[i].parentNode.appendChild(tracer);
    fadeOutElement(tracer, motionBlur, motionBlurTiming);
  }
}

/*
 * Set the caret size (width or height depending on the shape)
 * @param {number} val - The size of the caret
 */
function setSize(val) {
  size = val;
  setCaretProperties();
}

/*
 * Set the caret border radius
 * @param {number} val - The border radius of the caret
 */
function setRadius(val) {
  radius = val;
  setCaretProperties();
}

/*
 * Set the caret glow
 * @param {number} val - The glow of the caret
 */
function setGlow(val) {
  glow = val;
  glowColor = hexToRGB(color).replace(/\)/, ", " + glow / 10 + ")");
  setCaretProperties();
}

/*
 * Set the caret shape
 * @param {string} val - The shape value
 */
function setShape(val) {
  shape = val;
  if (animation === "expandVertical" || animation === "expandHorizontal") {
    animation = shape === "line" ? "expandVertical" : "expandHorizontal";
  }
  setCaretProperties();
  setCaretAnimation();
}

/*
 * Set the caret animation
 * @param {string} val - The animation value
 */
function setAnimation(val) {
  if (val === "expand") {
    animation = shape === "line" ? "expandVertical" : "expandHorizontal";
  } else {
    animation = val;
  }
  setCaretAnimation();
}

/*
 * Set the caret color
 * @param {string} val - The color value
 */
function setColor(val) {
  color = val;
  setCaretProperties();
}

function setBlur(val) {
  blur = val;
  motionBlurTiming.duration = blur * 100;
  setCaretAnimation();
}

// Get all the textboxes and carets
// Create an animated caret for each textbox
// Define the caret behavior
for (const [i, _textBox] of textBoxItems.entries()) {
  // Get sub-components of the textbox
  carets.push(_textBox.querySelector(".caret"));
  inputs[i] = _textBox.querySelector("input")
    ? _textBox.querySelector("input")
    : _textBox.querySelector("textarea");

  // Initialize the caret animation
  animatedCarets.push(
    carets[i].animate(animationMap[animation][0], animationMap[animation][1])
  );
  animatedCarets[i].pause();

  // Set up event listeners for the input
  inputs[i].addEventListener("input", () => setCaretPosition(i));
  inputs[i].addEventListener("keydown", () => setCaretPosition(i));
  inputs[i].addEventListener("click", () => resetCaretPosition(i));
  inputs[i].addEventListener("focus", () => resetCaretPosition(i));
  inputs[i].addEventListener("keyup", () => resetCaretPosition(i));
  inputs[i].addEventListener(
    "select",
    () =>
      (carets[i].style.opacity =
        inputs[i].selectionStart === inputs[i].selectionEnd ? 1 : 0)
  );
  inputs[i].addEventListener(
    "selectionchange",
    () =>
      (carets[i].style.opacity =
        inputs[i].selectionStart === inputs[i].selectionEnd ? 1 : 0)
  );
}

// Initialize the caret styles
setCaretProperties();
for (let i = 0; i < carets.length; i++) {
  resetCaretPosition(i);
}
setCaretAnimation();

// Update the caret color when the color input changes
colorInput.addEventListener("input", () => {
  setColor(colorInput.value);
  setCaretProperties();
});

// Update the caret shape when the shape selection changes
shapeSelector.forEach((radioButton) => {
  radioButton.addEventListener("change", () => {
    if (radioButton.checked) {
      setShape(radioButton.value);
    }
  });
});

// Update the caret size when the size input changes
sizeInput.addEventListener("input", () => {
  setSize(sizeInput.value);
});

// Update the caret border radius when the radius input changes
radiusInput.addEventListener("input", () => {
  setRadius(radiusInput.value);
});

// Update the caret border radius when the radius input changes
glowInput.addEventListener("input", () => {
  setGlow(glowInput.value);
});

// Update the caret animation when the animation input changes
animationSelector.forEach((radioButton) => {
  radioButton.addEventListener("change", () => {
    if (radioButton.checked) {
      setAnimation(radioButton.value);
    }
  });
  radioButton.addEventListener("click", () => {
    if (radioButton.checked) {
      setAnimation(radioButton.value);
    }
  });
});

// Update the caret motion blur when the blur input changes
blurInput.addEventListener("input", () => {
  setBlur(blurInput.value);
});
