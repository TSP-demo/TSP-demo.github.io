algorithms = {
  ...algorithms,
  christofides: (tree, nodes) => {
    var retTree = [...tree];
    var testTree;
    var testCiruit;
    var oddNodes = getAllOddNodes(tree, nodes);
    var shortestPath;
    var connectedNodes;
    if (retTree.length == 0) {
      retTree = algorithms.immediateMinimumSpanningTree(nodes);
    } else if (oddNodes.length > 0) {
      shortestPath = -1;
      for (var i = 1; i < oddNodes.length; i++) {
        if (
          (shortestPath == -1 ||
            getRouteDistance([oddNodes[0], oddNodes[i]], edges) <
              getRouteDistance(shortestPath, edges)) &&
          !containsEdge(retTree, [oddNodes[0], oddNodes[i]])
        ) {
          shortestPath = [oddNodes[0], oddNodes[i]];
        }
      }
      if (shortestPath != -1) {
        retTree = addEdge(retTree, shortestPath);
      }
    } else {
      var i = 0;
      connectedNodes = getConnectedNodes(retTree, i, nodes);
      while (i < nodes.length - 1 && connectedNodes.length < 4) {
        i++;
        connectedNodes = getConnectedNodes(retTree, i, nodes);
      }
      if (connectedNodes.length >= 4) {
        //delete two edges, write one
        shortestTree = -1;
        for (var j = 0; j < connectedNodes.length; j++) {
          if (j < connectedNodes.length - 1) {
            testTree = [...retTree];
            testTree.splice(getEdge(testTree, [i, connectedNodes[j]]), 1);
            testTree.splice(getEdge(testTree, [i, connectedNodes[j + 1]]), 1);
            testCiruit = findCircuit(testTree, nodes, 0);
            if (
              testCiruit.length == testTree.length &&
              (shortestTree == -1 ||
                getTreeDistance(testTree, edges) <
                  getTreeDistance(shortestTree, edges)) &&
              !containsEdge(testTree, [
                connectedNodes[j],
                connectedNodes[j + 1],
              ])
            ) {
              shortestTree = [...testTree];
            }
          } else {
            testTree = [...retTree];
            testTree.splice(getEdge(testTree, [i, connectedNodes[j]]), 1);
            testTree.splice(getEdge(testTree, [i, connectedNodes[0]]), 1);
            testCiruit = findCircuit(testTree, nodes, 0);
            if (
              testCiruit.length == testTree.length &&
              (shortestTree == -1 ||
                getTreeDistance(testTree, edges) <
                  getTreeDistance(shortestTree, edges)) &&
              !containsEdge(testTree, [connectedNodes[j], connectedNodes[0]])
            ) {
              shortestTree = [...testTree];
            }
          }
        }
        retTree = [...shortestTree];
      } else {
        retTree = -1;
      }
    }
    return retTree;
  },
};
