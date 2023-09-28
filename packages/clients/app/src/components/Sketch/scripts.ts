import { Sketch, SketchProps } from "@p5-wrapper/react";

export type ArtStyles = "curves" | "shapes" | "noise" | "flow";

interface P5Props extends SketchProps {
  colors?: string[];
}

export const curvesSketch: Sketch = (p5) => {
  let minYchange = 0;
  let maxYchange = 50;
  let layers = 5;
  let rotStripe = 0;
  let lines = true;
  let alph = 255;
  // let colRand = false;
  let filling = true;
  let colorLines = false;
  let sw = 3;
  // let extraBlack = 0;
  let extraBlackAlph = 255;

  let colors = ["#A1CCD1", "#E9B384", "#7C9D96", "#F4F2DE"];

  p5.updateWithProps = (props: P5Props) => {
    if (props.colors) {
      colors = props.colors;
    }
  };

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth - 20, p5.windowHeight - 20);

    if (lines) {
      p5.stroke(0, 0, 0, extraBlackAlph);
      p5.strokeWeight(sw);
    } else {
      p5.noStroke();
    }

    p5.angleMode(p5.DEGREES);

    let end = p5.height / 2 + 500;
    for (let i = 0; i < layers; i++) {
      drawLayer(i, end);
    }
  };

  function drawLayer(i: number, end: number) {
    let y1 =
      i == 0 ? -p5.height / 2 - 300 : -p5.height / 2 + (p5.height / layers) * i;
    let y2 = y1,
      y3 = y1,
      y4 = y1,
      y5 = y1,
      y6 = y1;

    let rotLayer = p5.random(359);
    let rotThisStripe = 0;

    while (
      y1 < end &&
      y2 < end &&
      y3 < end &&
      y4 < end &&
      y5 < end &&
      y6 < end
    ) {
      y1 += p5.random(minYchange, maxYchange);
      y2 += p5.random(minYchange, maxYchange);
      y3 += p5.random(minYchange, maxYchange);
      y4 += p5.random(minYchange, maxYchange);
      y5 += p5.random(minYchange, maxYchange);
      y6 += p5.random(minYchange, maxYchange);

      let chosenColor = p5.random(colors);
      let [r, g, b] = hexToRgb(chosenColor);

      if (filling) {
        p5.fill(r, g, b, alph);
      } else {
        p5.noFill();
      }

      if (colorLines) {
        p5.stroke(r, g, b, alph);
      }

      p5.push();
      p5.translate(p5.width / 2, p5.height / 2);
      rotThisStripe += rotStripe;
      p5.rotate(rotThisStripe + rotLayer);
      drawShape(y1, y2, y3, y4, y5, y6);
      p5.pop();
    }
  }

  function drawShape(
    y1: number,
    y2: number,
    y3: number,
    y4: number,
    y5: number,
    y6: number,
  ) {
    let xStart = -p5.width / 2;
    p5.beginShape();
    p5.curveVertex(xStart - 300, p5.height / 2 + 500);
    p5.curveVertex(xStart - 300, y1);
    p5.curveVertex(xStart + (p5.width / 5) * 1, y2);
    p5.curveVertex(xStart + (p5.width / 5) * 2, y3);
    p5.curveVertex(xStart + (p5.width / 5) * 3, y4);
    p5.curveVertex(xStart + (p5.width / 5) * 4, y5);
    p5.curveVertex(p5.width / 2 + 300, y6);
    p5.curveVertex(p5.width / 2 + 300, p5.height / 2 + 500);
    p5.endShape(p5.CLOSE);
  }

  function hexToRgb(hex: string) {
    let c = p5.color(hex);
    let r = p5.red(c);
    let g = p5.green(c);
    let b = p5.blue(c);
    return [r, g, b];
  }
};

export const noiseSketch: Sketch = (p5) => {
  let canvSize, rez1, rez2, gap, len, startVary, startCol;

  let colors: string[] = ["#3AA6B9", "#FF9EAA", "#F4F2DE", "FFD0D0"];

  p5.updateWithProps = (props: P5Props) => {
    if (props.colors) {
      colors = props.colors;
    }
  };

  p5.setup = () => {
    canvSize = Math.min(p5.windowWidth, p5.windowHeight);
    p5.createCanvas(canvSize, canvSize);
    p5.colorMode(p5.HSB, 360, 120, 100, 255);
    p5.background(0);
    p5.background(220, 80, 50);
    p5.noStroke();
    p5.fill(0, 80, 80);
    p5.circle(p5.width / 3, p5.height / 3, p5.width * 0.6);
    p5.strokeWeight(0.6);
    rez1 = 0.006; // angle
    rez2 = 0.005; // color
    gap = 15;
    len = 10;
    startVary = 25;
    startCol = p5.random(360);
    p5.strokeCap(p5.SQUARE);

    let n1, n2, h, x, y, k, ang, newX, newY;

    for (let i = -20; i < p5.width + 20; i += gap) {
      for (let j = -20; j < p5.height + 20; j += gap) {
        n2 = (p5.noise(i * rez2, j * rez2) - 0.2) * 1.7;
        h = p5.floor(n2 * 5) * 72 + startCol;
        if (h > 360) {
          h -= 360;
        }
        let chosenColor = p5.random(colors);

        p5.stroke(chosenColor);
        x = i + p5.random(-startVary, startVary);
        y = j + p5.random(-startVary, startVary);
        for (k = 10; k > 0; k--) {
          p5.strokeWeight(k * 0.3);
          //strokeWeight(p5.random(6));
          n1 = (p5.noise(x * rez1, y * rez1) - 0.2) * 1.7;
          ang = n1 * p5.PI * 2;
          newX = p5.cos(ang) * len + x;
          newY = p5.sin(ang) * len + y;
          p5.line(x, y, newX, newY);
          x = newX;
          y = newY;
        }
      }
    }

    paperTexture(1);
    paperTexture(0);
  };

  function paperTexture(textureType: number) {
    //based on color present
    p5.noFill();
    const colVary2 = 15; //40
    let textureNum: number = 0;
    let alph2;
    //textureType = 1;//random(2);
    if (textureType < 1.0) {
      //blurring
      textureNum = 10000;
      p5.strokeWeight(p5.width * 0.02);
      alph2 = 15; //random(10, 20);
    } else if (textureType < 2) {
      //regular paper texture
      textureNum = 15000;
      p5.strokeWeight(p5.max(1, p5.width * 0.0011)); //1.5
      alph2 = 210; //random(100, 220);
    }

    p5.colorMode(p5.RGB);
    for (let i = 0; i < textureNum; i++) {
      const x = p5.random(p5.width);
      const y = p5.random(p5.height);
      const col = p5.get(x, y);
      p5.stroke(
        col[0] + p5.random(-colVary2, colVary2),
        col[1] + p5.random(-colVary2, colVary2),
        col[2] + p5.random(-colVary2, colVary2),
        alph2,
      );
      p5.push();
      p5.translate(x, y);
      p5.rotate(p5.random(p5.PI * 2));
      p5.curve(
        p5.height * p5.random(0.035, 0.14),
        0,
        0,
        p5.height * p5.random(-0.03, 0.03),
        p5.height * p5.random(-0.03, 0.03),
        p5.height * p5.random(0.035, 0.07),
        p5.height * p5.random(0.035, 0.07),
        p5.height * p5.random(0.035, 0.14),
      );
      p5.pop();
    }
    p5.colorMode(p5.HSB, 360, 120, 100, 255);
  }
};
