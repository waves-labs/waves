let gridColors = 
{
  color1: [247, 37, 133, 1],
  color2: [181, 23, 158, 1],
  color3: [114, 9, 183, 1],
  color4: [86, 11, 173, 1],
  // color5: [58, 12, 163, 1],
  // color6: [63, 55, 201, 1],
  // color7: [67, 97, 238, 1],
  // color8: [72, 149, 239, 1],
  // color9: [76, 201, 240, 1],
};


function setup() {
  let c = createCanvas(400, 400);
  drawGrid(2, 2, 400, 400);
}

function drawGrid(rows, cols, canvasWidth, canvasHeight) {
  let cellWidth = canvasWidth / cols;
  let cellHeight = canvasHeight / rows;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let x = j * cellWidth;
      let y = i * cellHeight;
      stroke(255);
      strokeWeight(0);
      //fill(gridColors['color1'][0], gridColors['color1'][1], gridColors['color1'][2]);
      fill(random(255), random(255), random(255));
      rect(x, y, cellWidth, cellHeight);
    }
  }
}
