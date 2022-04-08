algorithms = {
  ...algorithms,
  minimumSpanningTree: (nodes, tree) => {
    var nodesUsed = [];
    var retTree = [...tree];
    if (retTree.length == 0) {
      nodesUsed = [0];
    }
    var shortestPath = -1;
    for (var i = 0; i < tree.length; i++) {
      if (!nodesUsed.includes(tree[i][0])) {
        nodesUsed[nodesUsed.length] = tree[i][0];
      }
      if (!nodesUsed.includes(tree[i][1])) {
        nodesUsed[nodesUsed.length] = tree[i][1];
      }
    }
    for (var i = 0; i < nodesUsed.length; i++) {
      for (var j = 0; j < nodes.length; j++) {
        if (!nodesUsed.includes(j)) {
          if (
            shortestPath == -1 ||
            getRouteDistance([j, nodesUsed[i]], edges) <
              getRouteDistance(shortestPath, edges)
          ) {
            shortestPath = [j, nodesUsed[i]];
          }
        }
      }
    }
    if (shortestPath != -1) {
      retTree = [...retTree, shortestPath];
    } else {
      retTree = -1;
    }
    return retTree;
  },
  immediateMinimumSpanningTree: (nodes) => {
    var fullTree = [];
    for (var i = 0; i < nodes.length; i++) {
      for (var j = i + 1; j < nodes.length; j++) {
        if (i != j) {
          if (fullTree.length == 0) {
            fullTree[0] = [i, j];
          } else {
            var k = 0;
            while (
              k < fullTree.length &&
              getRouteDistance([i, j], edges) >
                getRouteDistance(fullTree[k], edges)
            ) {
              k++;
            }
            fullTree.splice(k, 0, [i, j]);
          }
        }
      }
    }
    var msTreeNodes = [fullTree[0][0], fullTree[0][1]];
    var msTree = [fullTree[0]];
    var shortestEdge = -1;
    while (msTreeNodes.length < nodes.length) {
      shortestEdge = -1;
      for (var i = 0; i < nodes.length; i++) {
        if (!msTreeNodes.includes(i)) {
          for (var j = 0; j < msTreeNodes.length; j++) {
            if (
              shortestEdge == -1 ||
              getRouteDistance([i, msTreeNodes[j]], edges) <
                getRouteDistance(shortestEdge, edges)
            ) {
              if (!checkForCircuit(msTree, [i, msTreeNodes[j]])) {
                shortestEdge = [i, msTreeNodes[j]];
              }
            }
          }
        }
      }
      if (shortestEdge != -1) {
        msTree[msTree.length] = shortestEdge;
        msTreeNodes[msTreeNodes.length] = msTreeNodes.includes(shortestEdge[0])
          ? shortestEdge[1]
          : shortestEdge[0];
      }
    }
    return msTree;
  },
};
