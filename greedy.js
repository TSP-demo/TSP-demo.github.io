algorithms = {
  ...algorithms,
  greedy: (tree, nodes, edges) => {
    var availableEdges = [];
    var shortestEdge = -1;

    edges.forEach((edge) => {
      if (
        !containsEdge(tree, [edge[0], edge[1]]) &&
        (getConnectedNodes(tree, edge[0], nodes).length +
          getConnectedNodes(tree, edge[1], nodes).length <
          2 ||
          (getConnectedNodes(tree, edge[0], nodes).length == 1 &&
            getConnectedNodes(tree, edge[1], nodes).length == 1 &&
            !checkForComplete(tree, nodes, edge)))
      ) {
        availableEdges[availableEdges.length] = edge;
      }
    });

    for (var i = 0; i < availableEdges.length; i++) {
      if (shortestEdge == -1 || availableEdges[i][2] < shortestEdge[2]) {
        shortestEdge = availableEdges[i];
      }
    }

    if (shortestEdge == -1) {
      shortestEdge = getAllOddNodes(tree, nodes);
    }

    return shortestEdge.length != 0
      ? [...tree, [shortestEdge[0], shortestEdge[1]]]
      : -1;

    //return [...tree, [shortestEdge[0], shortestEdge[1]]];
  },
};
