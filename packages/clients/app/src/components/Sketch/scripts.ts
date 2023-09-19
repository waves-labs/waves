import { Sketch, SketchProps } from "@p5-wrapper/react";

export type ArtStyles = "curves" | "shapes" | "noise" | "flow";

interface P5Props extends SketchProps {
  colors?: string[];
}

export const curvesSketch: Sketch = (p5) => {
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

  //   let minYchange = 0;
  // let maxYchange = 50;
  // let layers = 5;
  // let rotStripe = 0;
  // let lines = true;
  // let alph = 255;
  // let colRand = false;
  // let filling = true;
  // let colorLines = false;
  // let sw = 3;
  // let extraBlack = 0;
  // let extraBlackAlph = 255;

  // let colors = ['#D1CCC0', '#8D8D92', '#A3D2CA', '#6A057F', '#AB83A1'];

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
  p5.setup = () => {
    p5.createCanvas(600, 400, p5.WEBGL);
  };

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
