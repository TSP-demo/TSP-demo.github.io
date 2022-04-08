const play = () => {
  playButton.textContent = "pause";
  stepTimeout = setTimeout(step, stepMs);
  playing = true;
};

const pause = () => {
  playButton.textContent = "play_arrow";
  clearTimeout(stepTimeout);
  playing = false;
};

const reset = () => {
  pause();
  animatedTree = [];
  finishedTree = [];
  animatedRoute = [];
  finishedRoute = [];
  phase = 0;
  routeDistance = 0;
  distanceSpan.textContent = routeDistance;
};

const selectAlgorithm = (input) => {
  reset();
  selectedAlgorithm = input;
  algorithmButton.textContent = input;
};

var tempRoute;
var tempTree;

const step = () => {
  if (playing) {
    if (selectedAlgorithm == "Random Brute Force") {
      animatedRoute = algorithms.randomBruteForce(nodes, startingNode);
      finishedRoute = finishedRoute.length == 0 ? animatedRoute : finishedRoute;
      finishedRoute =
        getRouteDistance(animatedRoute, edges) <
        getRouteDistance(finishedRoute, edges)
          ? animatedRoute
          : finishedRoute;
      routeDistance = getRouteDistance(finishedRoute, edges);
    }
    if (selectedAlgorithm == "Nearest Neighbor") {
      finishedRoute = [];
      animatedRoute = algorithms.nearestNeighbor(
        nodes,
        startingNode,
        animatedRoute
      );
      routeDistance = getRouteDistance(animatedRoute, edges);
      if (animatedRoute.length == nodes.length + 1) {
        finishedRoute = animatedRoute;
        animatedRoute = [];
        pause();
      }
    }
    if (selectedAlgorithm == "Nearest Insertion") {
      finishedRoute = [];
      tempRoute = algorithms.nearestInsertion(
        nodes,
        startingNode,
        animatedRoute
      );
      if (tempRoute != -1) {
        animatedRoute = tempRoute;
        routeDistance = getRouteDistance(animatedRoute, edges);
      } else {
        finishedRoute = animatedRoute;
        animatedRoute = [];
        pause();
      }
    }
    if (selectedAlgorithm == "Furthest Insertion") {
      finishedRoute = [];
      tempRoute = algorithms.furthestInsertion(
        nodes,
        startingNode,
        animatedRoute
      );
      if (tempRoute != -1) {
        animatedRoute = tempRoute;
        routeDistance = getRouteDistance(animatedRoute, edges);
      } else {
        finishedRoute = animatedRoute;
        animatedRoute = [];
        pause();
      }
    }
    if (selectedAlgorithm == "Cheapest Insertion") {
      finishedRoute = [];
      tempRoute = algorithms.cheapestInsertion(
        nodes,
        startingNode,
        animatedRoute
      );
      if (tempRoute != -1) {
        animatedRoute = tempRoute;
        routeDistance = getRouteDistance(animatedRoute, edges);
      } else {
        finishedRoute = animatedRoute;
        animatedRoute = [];
        pause();
      }
    }
    if (selectedAlgorithm == "Minimum Spanning Tree") {
      finishedTree = [];
      tempTree = algorithms.minimumSpanningTree(nodes, animatedTree);
      if (tempTree != -1) {
        animatedTree = tempTree;
        routeDistance = getTreeDistance(animatedTree, edges);
      } else {
        finishedTree = animatedTree;
        animatedTree = [];
        pause();
      }
    }
    if (selectedAlgorithm == "Christofides") {
      finishedTree = [];
      tempTree = algorithms.christofides(animatedTree, nodes);
      if (tempTree != -1) {
        animatedTree = tempTree;
        routeDistance = getTreeDistance(animatedTree, edges);
      } else {
        finishedTree = animatedTree;
        animatedTree = [];
        pause();
      }
    }
    if (selectedAlgorithm == "Greedy") {
      finishedTree = [];
      tempTree = algorithms.greedy(animatedTree, nodes, edges);
      if (tempTree != -1) {
        animatedTree = tempTree;
        routeDistance = getTreeDistance(animatedTree, edges);
      } else {
        finishedTree = animatedTree;
        animatedTree = [];
        pause();
      }
    }
  }
  distanceSpan.textContent = Math.round(routeDistance*10)/10;
  clearTimeout(stepTimeout);
  if (playing) {
    stepTimeout = setTimeout(step, stepMs);
  }
};

var stepTimeout = setTimeout(step, stepMs);
