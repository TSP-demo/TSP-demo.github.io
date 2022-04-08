algorithms = {
  ...algorithms,
  cheapestInsertion: (nodes, startingNode, animatedRoute) => {
    var returnRoute = animatedRoute;
    if (returnRoute.length == 0) {
      returnRoute[0] = startingNode;
      var shortestStart = -1;
      nodes.forEach((node, index) => {
        if (
          index != startingNode &&
          (shortestStart == -1 ||
            getRouteDistance([startingNode, index, startingNode], edges) <
              getRouteDistance([startingNode, shortestStart, startingNode], edges))
        ) {
          shortestStart = index;
        }
      });
      returnRoute = [startingNode, shortestStart, startingNode];
    } else {
      var shortestRoute = -1;
      var tempRoute = [...returnRoute];
      nodes.forEach((node, index) => {
        if (!returnRoute.includes(index)) {
          returnRoute.forEach((nodeIndex, returnRouteIndex) => {
            if (
              returnRouteIndex != 0
            ) {
              tempRoute = [...returnRoute];
              tempRoute.splice(returnRouteIndex, 0, index);
              if (
                shortestRoute == -1 ||
                getRouteDistance(tempRoute, edges) < getRouteDistance(shortestRoute, edges)
              ) {
                shortestRoute = tempRoute;
              }
            }
          });
        }
      });
      returnRoute = shortestRoute;
    }
    return returnRoute;
  }
};
