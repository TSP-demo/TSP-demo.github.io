algorithms = {
  ...algorithms,
  nearestInsertion: (nodes, startingNode, animatedRoute) => {
    var returnRoute = animatedRoute;
    var shortestStart = -1;
    if (returnRoute.length == 0) {
      returnRoute[0] = startingNode;
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
      var tempRoute = [...returnRoute];
      var shortestRoute = -1;
      var closestPoint = -1;
      var closestPointStart = -1;
      returnRoute.forEach((nodeIndex, returnRouteIndex) => {
        nodes.forEach((node, index) => {
          if (!returnRoute.includes(index)) {
            if (
              closestPoint == -1 ||
              getRouteDistance([nodeIndex, index], edges) <
                getRouteDistance([closestPointStart, closestPoint], edges)
            ) {
              closestPointStart = nodeIndex;
              closestPoint = index;
            }
          }
        });
      });
      if (closestPoint != -1) {
        returnRoute.forEach((nodeIndex, returnRouteIndex) => {
          if (
            returnRouteIndex != 0
          ) {
            tempRoute = [...returnRoute];
            tempRoute.splice(returnRouteIndex, 0, closestPoint);
            if (
              shortestRoute == -1 ||
              getRouteDistance(tempRoute, edges) < getRouteDistance(shortestRoute, edges)
            ) {
              shortestRoute = tempRoute;
            }
          }
        });
        returnRoute = [...shortestRoute];
      } else {
        returnRoute = -1;
      }
    }
    //console.log(returnRoute);
    return returnRoute;
  },
};
