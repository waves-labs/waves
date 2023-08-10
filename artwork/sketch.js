let collectionArray = [1,0,0,0];

function setup() {
  createCanvas(400, 400);
  background(230);
  noStroke();
}

function draw() {
  if (collectionArray[0] == 1) {
    fill(247, 37, 133, 1)
    rect(0,0,200,200);
  }
  if (collectionArray[1] == 1) {
    fill(114, 9, 183, 1)
    rect(0,200,200,200);
  }
  if (collectionArray[2] == 1) {
    fill(6, 201, 240, 1)
    rect(200,0,200,200);
  }
  if (collectionArray[3] == 1) {
    fill(247, 100, 50, 1)
    rect(200,200,200,200);
  }
}