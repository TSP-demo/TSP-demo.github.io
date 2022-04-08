algorithms = {
  ...algorithms,
  furthestInsertion: (nodes, startingNode, animatedRoute) => {
    var returnRoute = animatedRoute;
    var furthestStart = -1;
    if (returnRoute.length == 0) {
      returnRoute[0] = startingNode;
      nodes.forEach((node, index) => {
        if (
          index != startingNode &&
          (furthestStart == -1 ||
            getRouteDistance([startingNode, index, startingNode], edges) >
              getRouteDistance([startingNode, furthestStart, startingNode], edges))
        ) {
          furthestStart = index;
        }
      });
      returnRoute = [startingNode, furthestStart, startingNode];
    } else {
      var tempRoute = [...returnRoute];
      var shortestRoute = -1;
      var furthestPoint = -1;
      var furthestPointStart = -1;
      returnRoute.forEach((nodeIndex, returnRouteIndex) => {
        nodes.forEach((node, index) => {
          if (!returnRoute.includes(index)) {
            if (
              furthestPoint == -1 ||
              getRouteDistance([nodeIndex, index], edges) >
                getRouteDistance([furthestPointStart, furthestPoint], edges)
            ) {
              furthestPointStart = nodeIndex;
              furthestPoint = index;
            }
          }
        });
      });
      if (furthestPoint != -1) {
        returnRoute.forEach((nodeIndex, returnRouteIndex) => {
          if (
            returnRouteIndex != 0
          ) {
            tempRoute = [...returnRoute];
            tempRoute.splice(returnRouteIndex, 0, furthestPoint);
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
