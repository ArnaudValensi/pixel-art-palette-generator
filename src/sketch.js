import Palette from './palette';

const P5 = p5;

// sketch starting point must be a function
const sketch = (p5) => {
  const p = p5;
  const lineSize = 9 + 7;
  const nbLines = 8;
  const squareSize = 64;
  const palette = new Palette();

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
    p.createCanvas(lineSize * squareSize, nbLines * squareSize);
    p.noStroke();
  };

  // runs at every frame
  p.draw = () => {
    p.background(50);

    const lines = palette.getLines();

    console.log(JSON.stringify(lines, null, 2));

    drawLines(lines);
  };
};

// runs the sketch
new P5(sketch);  // 2nd param can be a canvas html element
