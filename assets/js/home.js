var color = ["#8479E1", "#4FBDBA", "#FF85B3", "#DD4A48", "#00FFC6", "#FFD124"];
var boxes = document.getElementsByClassName("category-box");

for(let box of boxes) {
  box.style.backgroundColor = color[Math.floor(Math.random() * color.length)];
}
