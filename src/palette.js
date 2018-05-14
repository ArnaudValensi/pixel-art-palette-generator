function createColorString(h, s, b) {
  return `hsb(${h}, ${s}%, ${b}%)`;
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
    this.attenuationSSteps = [15, 15, 25, 35, 35, 35, 25];
    this.attenuationBSteps = [10, 10, 10, 10, 5, 3, 0];
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
    let line = [];

    for (let i = 0; i < 9; i++) {
      h = (h + this.hSteps[i]) % 360;
      s += this.sSteps[i];
      b += this.bSteps[i];

      line.push({ h, s, b });
    }

    const reverseLine = line.slice(1, -1).reverse();
    const desaturedLine = reverseLine.map(({ h, b, s }, index) => {
      let saturation = s - this.attenuationSSteps[index];

      if (saturation < 0) {
        saturation = 0;
      }

      return { h, s: saturation, b: b - this.attenuationBSteps[index] };
    });
    line = line.concat(desaturedLine);

    return line.map(color => createColorString(color.h, color.s, color.b));
  }
}
