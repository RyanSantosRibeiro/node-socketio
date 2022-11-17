function inventory() {
  // Fundo
    push();
    fill(0, 0, 0 ,200);
    noStroke();
    quad(
        width, 0 ,
         0 , 0,
        0, height,
        width, height
    );
    pop();
}