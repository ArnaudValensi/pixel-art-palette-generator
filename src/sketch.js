import Palette from './palette';

const P5 = p5;

// sketch starting point must be a function
const sketch = (p5) => {
  const p = p5;
  const lineSize = 9 + 7;
  const nbLines = 8;
  const squareSize = 64;
  let slider;

  function drawSquare(x, y, color) {
    p.fill(color);
    p.rect(x * squareSize, y * squareSize, squareSize, squareSize);
  }

  function drawLine(y, colors) {
    for (let x = 0; x < colors.length; x++) {
      drawSquare(x, y, p.color(colors[x]));
    }
  }

  function drawLines(lines) {
    for (let y = 0; y < lines.length; y++) {
      drawLine(y, lines[y]);
    }
  }

  // runs once to set up the canvas
  p.setup = () => {
    p.createCanvas(lineSize * squareSize, nbLines * squareSize + 80);
    p.noStroke();

    slider = p.createSlider(0, 359, 180, 1);
    slider.position(10, nbLines * squareSize + 30);
    slider.style('width', `${lineSize * squareSize - 20}px`);
  };

  // runs at every frame
  p.draw = () => {
    p.background(50);

    const hueValue = slider.value();

    const palette = new Palette(hueValue);
    const lines = palette.getLines();

    drawLines(lines);
  };
};

// runs the sketch
new P5(sketch);  // 2nd param can be a canvas html element
