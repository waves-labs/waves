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
