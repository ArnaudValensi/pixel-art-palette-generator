function createColorString(h, b, s) {
  return `hsb(${h}, ${b}%, ${s}%)`;
}

function computeStartValue(steps, middleValue) {
  const offset = steps.slice(0, 5).reduce((acc, n) => acc + n, 0);

  return (360 + middleValue - offset) % 360;
}

export default class Palette {
  constructor(baseHue = 180, baseSaturation = 75, baseBrightness = 70) {
    this.baseHue = baseHue;
    this.baseSaturation = baseSaturation;
    this.baseBrightness = baseBrightness;

    this.hSteps = [20, 20, 20, 20, 20, 20, 20, 20, 20];
    this.sSteps = [20, 20, 20, 10, 5, -15, -15, -15, -15];
    this.bSteps = [15, 15, 15, 15, 10, 10, 10, 5, 5];
    this.rampStep = 45;
  }

  getLines() {
    const lines = [];

    for (let i = 0; i < 8; i++) {
      lines.push(this.getLine(i));
    }

    return lines;
  }

  getLine(n) {
    const hue = (this.baseHue + n * this.rampStep) % 360;

    let h = computeStartValue(this.hSteps, hue);
    let b = 0;
    let s = 0;
    const line = [];

    for (let i = 0; i < 9; i++) {
      h = (h + this.hSteps[i]) % 360;
      b += this.sSteps[i];
      s += this.bSteps[i];

      const color = createColorString(h, b, s);

      line.push(color);
    }

    return line;
  }
}
