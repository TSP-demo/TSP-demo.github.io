const context = canvas.getContext("2d");

const drawRoute = (route, width, color) => {
  if (route.length > 1) {
    route.forEach((nodeIndex, routeIndex) => {
      context.lineWidth = width;
      context.strokeStyle = color;
      if (routeIndex < route.length - 1) {
        context.beginPath();
        context.moveTo(nodes[nodeIndex].x, nodes[nodeIndex].y);
        context.lineTo(
          nodes[route[routeIndex + 1]].x,
          nodes[route[routeIndex + 1]].y
        );
        context.stroke();
        context.fillStyle = "white";
        context.fillText(
          Math.round(
            getRouteDistance([nodeIndex, route[routeIndex + 1]], edges)
          ),
          (nodes[nodeIndex].x + nodes[route[routeIndex + 1]].x) / 2,
          (nodes[nodeIndex].y + nodes[route[routeIndex + 1]].y) / 2 + 8
        );
        context.strokeStyle = "black";
        context.lineWidth = 1;
        context.strokeText(
          Math.round(
            getRouteDistance([nodeIndex, route[routeIndex + 1]], edges)
          ),
          (nodes[nodeIndex].x + nodes[route[routeIndex + 1]].x) / 2,
          (nodes[nodeIndex].y + nodes[route[routeIndex + 1]].y) / 2 + 8
        );
      }
    });
  }
};

const drawTree = (tree, width, color) => {
  for (var i = 0; i < tree.length; i++) {
    drawRoute(tree[i], width, color);
  }
};

const updateCanvas = () => {
  context.canvas.width = window.innerWidth - 320;
  context.canvas.height = window.innerHeight - 16;
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  context.textAlign = "center";
  context.fillStyle = "gray";
  context.font = "24px Arial";
  if (nodes.length < 9) {
    edges.forEach((edge) => {
      drawRoute([edge[0], edge[1]], 3, "lightgray");
    });
  }
  nodes.forEach((node, index) => {
    if (index == selectedNode) {
      context.strokeStyle = "black";
    } else {
      context.strokeStyle = "gray";
    }
    context.lineWidth = 3;
    context.beginPath();
    context.arc(node.x, node.y, nodeRadius, 0, 2 * Math.PI);
    context.stroke();
    if (index == startingNode) {
      context.textAlign = "center";
      context.fillStyle = "gray";
      context.font = "24px Arial";
      context.fillText(">", node.x, node.y + 9);
    } else {
      context.textAlign = "center";
      context.fillStyle = "gray";
      context.font = "24px Arial";
      context.fillText(
        numToSSColumn(index == 0 ? startingNode : index),
        node.x,
        node.y + 9
      );
    }
  });
  if (!playing && lastSelectedNode != null && selectedNode != null) {
    drawRoute([selectedNode, lastSelectedNode], 3, "orange");
  }
  drawTree(animatedTree, 3, "red");
  drawTree(finishedTree, 2, "green");
  drawRoute(animatedRoute, 3, "red");
  drawRoute(finishedRoute, 2, "green");
  requestAnimationFrame(updateCanvas);
};

requestAnimationFrame(updateCanvas);
