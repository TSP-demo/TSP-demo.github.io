var algorithms = {
    ...algorithms,
    nearestNeighbor: (nodes, startingNode, animatedRoute) => {
        var returnRoute = animatedRoute;
        if (returnRoute.length == 0) {
          returnRoute[0] = startingNode;
        }
        var remainingNodes = [];
        nodes.forEach((node, index) => {
          if (!returnRoute.includes(index)) {
            remainingNodes[remainingNodes.length] = index;
          }
        });
    
        var shortestPath = startingNode;
        remainingNodes.forEach((nodeIndex) => {
          shortestPath = shortestPath == startingNode ? nodeIndex : shortestPath;
          shortestPath =
            getRouteDistance([returnRoute[returnRoute.length - 1], nodeIndex], edges) <
            getRouteDistance([returnRoute[returnRoute.length - 1], shortestPath], edges)
              ? nodeIndex
              : shortestPath;
        });
        returnRoute = [...returnRoute, shortestPath];
        return returnRoute;
      },
}