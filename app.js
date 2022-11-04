const algorithmButton = document.getElementById("select-algorithm-text");
const playButton = document.getElementById("play-button");
const resetButton = document.getElementById("reset-button");
const speedSlider = document.getElementById("speed-slider");
const distanceSpan = document.getElementById("distance-span");
const edgeDistanceInput = document.getElementById("edge-distance");
const clearButton = document.getElementById("clear-button");
const canvas = document.getElementById("canvas");

var nodes = [];
var animatedTree = [];
var finishedTree = [];
var animatedRoute = [];
var finishedRoute = [];
var edges = [];

var selectedNode = null;
var lastSelectedNode = null;
var selectedAlgorithm = "";

var stepMs = 1000;

var clicked = false;
var playing = false;
var nodeRadius = 32;
var startingNode = 0;
var routeDistance = 0;

window.addEventListener("load",()=>{
  let response = window.prompt("example?","input")
})

const edgeInputHandler = (e) => {
  for (var i = 0; i < edges.length; i++) {
    if (
      (edges[i][0] == selectedNode && edges[i][1] == lastSelectedNode) ||
      (edges[i][0] == lastSelectedNode && edges[i][1] == selectedNode)
    ) {
      edges[i][2] = Number(e.target.value);
    }
  }
};

const mouseDownHandler = (e) => {
  if (!playing) {
    clicked = true;
    var temp = selectedNode;
    selectedNode = null;
    nodes.forEach((node, index) => {
      var dis = Math.sqrt(
        Math.pow(Math.abs(e.offsetX - node.x), 2) +
          Math.pow(Math.abs(e.offsetY - node.y), 2)
      );
      if (dis <= nodeRadius) {
        if (temp != null && index != temp) {
          lastSelectedNode = temp;
        }
        selectedNode = index;
      }
    });
    edgeDistanceInput.value = getRouteDistance(
      [lastSelectedNode, selectedNode],
      edges
    );
    if (selectedNode == null && nodes.length < 27) {
      animatedRoute - [];
      finishedRoute = [];
      animatedTree = [];
      finishedTree = [];
      nodes[nodes.length] = {
        x: e.offsetX,
        y: e.offsetY,
      };
      for (var i = 0; i < nodes.length - 1; i++) {
        edges[edges.length] = [
          nodes.length - 1,
          i,
          getActualDistance(i, nodes.length - 1, nodes)
        ];
      }
    }
  }
};

const mouseUpHandler = () => {
  clicked = false;
};

const moveHandler = (e) => {
  if (clicked && selectedNode != null && !playing) {
    nodes[selectedNode].x = e.offsetX;
    nodes[selectedNode].y = e.offsetY;
  }
};

const sliderInputHandler = (e) => {
  stepMs = 2001 - e.target.value;
};

edgeDistanceInput.addEventListener("input", edgeInputHandler);
playButton.addEventListener("mousedown", () => {
  if (playing) {
    pause();
  } else {
    play();
  }
});
resetButton.addEventListener("mousedown", () => {
  reset();
});
clearButton.addEventListener("mousedown", () => {
  nodes = [];
  animatedTree = [];
  finishedTree = [];
  animatedRoute = [];
  finishedRoute = [];
  edges = [];
  routeDistance = 0;
  distanceSpan.textContent = routeDistance;

  selectedNode = null;
  lastSelectedNode = null;

  clicked = false;
  playing = false;
});
canvas.addEventListener("mousedown", mouseDownHandler);
canvas.addEventListener("mouseup", mouseUpHandler);
canvas.addEventListener("mousemove", moveHandler);
speedSlider.addEventListener("input", sliderInputHandler);
