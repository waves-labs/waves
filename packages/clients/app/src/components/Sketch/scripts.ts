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
  let colRand = false;
  let filling = true;
  let colorLines = false;
  let sw = 3;
  let extraBlack = 0;
  let extraBlackAlph = 255;

  p5.setup = () => {
    const canvas = p5.createCanvas(600, 400, p5.WEBGL);
  };

  let colors: string[] = ["#ff0000", "#00ff00", "#0000ff"];

  p5.updateWithProps = (props: P5Props) => {
    if (props.colors) {
      colors = props.colors;
    }
  };

  // function setup() {
  //   let canv = createCanvas(windowWidth - 20, windowHeight - 20);

  //   if (lines) {
  //     stroke(0, 0, 0, extraBlackAlph);
  //     strokeWeight(sw);
  //   } else {
  //     noStroke();
  //   }

  //   angleMode(DEGREES);

  //   let end = height / 2 + 500;
  //   for (let i = 0; i < layers; i++) {
  //     drawLayer(i, end);
  //   }
  // }

  // function drawLayer(i, end) {
  //   let y1 = (i == 0) ? -height / 2 - 300 : -height / 2 + (height / layers) * i;
  //   let y2 = y1, y3 = y1, y4 = y1, y5 = y1, y6 = y1;

  //   let rotLayer = random(359);
  //   let rotThisStripe = 0;

  //   while ((y1 < end) && (y2 < end) && (y3 < end) && (y4 < end) && (y5 < end) && (y6 < end)) {
  //     y1 += random(minYchange, maxYchange);
  //     y2 += random(minYchange, maxYchange);
  //     y3 += random(minYchange, maxYchange);
  //     y4 += random(minYchange, maxYchange);
  //     y5 += random(minYchange, maxYchange);
  //     y6 += random(minYchange, maxYchange);

  //     let chosenColor = random(colors);
  //     let [r, g, b] = hexToRgb(chosenColor);

  //     if (filling) {
  //       fill(r, g, b, alph);
  //     } else {
  //       noFill();
  //     }

  //     if (colorLines) {
  //       stroke(r, g, b, alph);
  //     }

  //     push();
  //     translate(width / 2, height / 2);
  //     rotThisStripe += rotStripe;
  //     rotate(rotThisStripe + rotLayer);
  //     drawShape(y1, y2, y3, y4, y5, y6);
  //     pop();
  //   }
  // }

  // function drawShape(y1, y2, y3, y4, y5, y6) {
  //   let xStart = -width / 2;
  //   beginShape();
  //   curveVertex(xStart - 300, height / 2 + 500);
  //   curveVertex(xStart - 300, y1);
  //   curveVertex(xStart + (width / 5) * 1, y2);
  //   curveVertex(xStart + (width / 5) * 2, y3);
  //   curveVertex(xStart + (width / 5) * 3, y4);
  //   curveVertex(xStart + (width / 5) * 4, y5);
  //   curveVertex(width / 2 + 300, y6);
  //   curveVertex(width / 2 + 300, height / 2 + 500);
  //   endShape(CLOSE);
  // }

  // function hexToRgb(hex) {
  //   let r = parseInt(hex.slice(1, 3), 16),
  //       g = parseInt(hex.slice(3, 5), 16),
  //       b = parseInt(hex.slice(5, 7), 16);
  //   return [r, g, b];
  // }
  p5.draw = () => {
    p5.background(250);
    p5.normalMaterial();
    p5.push();
    p5.rotateZ(p5.frameCount * 0.01);
    p5.rotateX(p5.frameCount * 0.01);
    p5.rotateY(p5.frameCount * 0.01);
    p5.plane(100);
    p5.pop();
  };
};

export const shapesSketch: Sketch = (p5) => {
  p5.setup = () => p5.createCanvas(600, 400, p5.WEBGL);

  let colors: string[] = ["#ff0000", "#00ff00", "#0000ff"];

  p5.updateWithProps = (props: P5Props) => {
    if (props.colors) {
      colors = props.colors;
    }
  };

  p5.draw = () => {
    p5.background(250);
    p5.normalMaterial();
    p5.push();
    p5.rotateZ(p5.frameCount * 0.01);
    p5.rotateX(p5.frameCount * 0.01);
    p5.rotateY(p5.frameCount * 0.01);
    p5.plane(100);
    p5.pop();
  };
};

export const noiseSketch: Sketch = (p5) => {
  let canvSize, rez1, rez2, gap, len, startVary, startCol;

  let colors: string[] = ["#ff0000", "#00ff00", "#0000ff"];

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
        p5.stroke(
          h + p5.random(-8, 8),
          80 + p5.random(-15, 15),
          80 + p5.random(-15, 15),
          200,
        );
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

export const flowSketch: Sketch = (p5) => {
  p5.setup = () => p5.createCanvas(600, 400, p5.WEBGL);

  let colors: string[] = ["#ff0000", "#00ff00", "#0000ff"];

  p5.updateWithProps = (props: P5Props) => {
    if (props.colors) {
      colors = props.colors;
    }
  };

  p5.draw = () => {
    p5.background(250);
    p5.normalMaterial();
    p5.push();
    p5.rotateZ(p5.frameCount * 0.01);
    p5.rotateX(p5.frameCount * 0.01);
    p5.rotateY(p5.frameCount * 0.01);
    p5.plane(100);
    p5.pop();
  };
};
