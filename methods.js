var algorithms = {};

const checkForCircuit = (tree, node) => {
  var ret = false;
  for (var i = 0; i < tree.length; i++) {
    if (tree[i][0] == node || tree[i][1] == node) {
      ret = true;
    }
  }
  return ret;
};

const getRouteDistance = (route, edges) => {
  var distance = 0;
  for (var i = 0; i < route.length - 1; i++) {
    distance += getEdgeDistance(route[i], route[i + 1], edges);
  }
  return distance;
};

const getEdgeDistance = (node1, node2, edges) => {
  for (var i = 0; i < edges.length; i++) {
    if (
      (edges[i][0] == node1 && edges[i][1] == node2) ||
      (edges[i][0] == node2 && edges[i][1] == node1)
    ) {
      return edges[i][2];
    }
  }
};

const getActualDistance = (node1, node2, nodes) => {
  var distance = 0;
  var pointAX = nodes[node1].x;
  var pointAY = nodes[node1].y;
  var pointBX = nodes[node2].x;
  var pointBY = nodes[node2].y;
  distance = Math.sqrt(
    Math.pow(Math.abs(pointAX - pointBX), 2) +
      Math.pow(Math.abs(pointAY - pointBY), 2)
  );
  return distance / 10;
};

const getTreeDistance = (tree, edges) => {
  var dis = 0;
  for (var i = 0; i < tree.length; i++) {
    dis += getRouteDistance(tree[i], edges);
  }
  return dis;
};

const numToSSColumn = (num) => {
  //https://www.codegrepper.com/code-examples/javascript/javascript+convert+number+to+letter+of+alphabet
  let s = "",
    t;

  while (num > 0) {
    t = (num - 1) % 26;
    s = String.fromCharCode(65 + t) + s;
    num = ((num - t) / 26) | 0;
  }
  return s || undefined;
};

const containsEdge = (tree, edge) => {
  ret = false;
  for (var i = 0; i < tree.length; i++) {
    if (
      (tree[i][0] == edge[0] && tree[i][1] == edge[1]) ||
      (tree[i][0] == edge[1] && tree[i][1] == edge[0])
    ) {
      ret = true;
    }
  }

  return ret;
};

const getConnectedNodes = (tree, node, nodes) => {
  var connectedNodes = [];
  var orderedNodes = [];
  for (var i = 0; i < tree.length; i++) {
    if (tree[i].includes(node)) {
      connectedNodes[connectedNodes.length] =
        tree[i][0] == node ? tree[i][1] : tree[i][0];
    }
  }
  var angle;
  var j;
  for (var i = 0; i < connectedNodes.length; i++) {
    angle = getAngle(nodes, node, connectedNodes[i]);
    j = 0;
    while (
      orderedNodes.length > 0 &&
      j < orderedNodes.length &&
      angle > getAngle(nodes, node, orderedNodes[j])
    ) {
      j++;
    }
    orderedNodes.splice(j, 0, connectedNodes[i]);
  }
  return orderedNodes;
};

const getEdge = (tree, edge) => {
  var index = 0;
  for (var i = 0; i < tree.length; i++) {
    if (tree[i].includes(edge[0]) && tree[i].includes(edge[1])) {
      index = i;
    }
  }
  return index;
};

const getAngle = (nodes, j, i) => {
  var temp =
    (Math.atan2(nodes[j].y - nodes[i].y, nodes[j].x - nodes[i].x) * 180) /
    Math.PI;
  return temp >= 0 ? temp : 360 + temp;
};

const addEdge = (tree, edge) => {
  const retTree = [...tree];
  var contained = false;
  for (var i = 0; i < retTree.length; i++) {
    if (retTree[i].includes(edge[0]) && retTree[i].includes(edge[1])) {
      contained = true;
      break;
    }
  }
  if (contained) {
    return -1;
  } else {
    retTree[retTree.length] = edge;
    return retTree;
  }
};

const getAllOddNodes = (tree, nodes) => {
  var temp = [];
  var ret = [];
  for (var i = 0; i < nodes.length; i++) {
    count = 0;
    for (var j = 0; j < tree.length; j++) {
      count += tree[j].includes(i);
    }
    if (count % 2) {
      temp[temp.length] = i;
    }
  }
  for (var i = 0; i < temp.length; i++) {
    var j = 0;
    while (
      j < ret.length &&
      getConnectedNodes(tree, temp[i], nodes).length >
        getConnectedNodes(tree, ret[j], nodes).length
    ) {
      j++;
    }
    if (j == ret.length) {
      ret[j] = temp[i];
    } else {
      ret.splice(j, 0, temp[i]);
    }
  }
  return ret.reverse();
};

const getAllOpenNodes = (fullTree, currentTree, nodes) => {
  var currentNodes = [];
  var openNodes = [];
  for (var i = 0; i < currentTree.length; i++) {
    if (!currentNodes.includes(currentTree[i][0])) {
      currentNodes[currentNodes.length] = currentTree[i][0];
    }
    if (!currentNodes.includes(currentTree[i][1])) {
      currentNodes[currentNodes.length] = currentTree[i][1];
    }
  }
  for (var i = 0; i < currentNodes.length; i++) {
    if (
      getConnectedNodes(fullTree, currentNodes[i], nodes).length >
      getConnectedNodes(currentTree, currentNodes[i], nodes).length
    ) {
      openNodes[openNodes.length] = currentNodes[i];
    }
  }
  return openNodes;
};

const findCircuit = (fullTree, nodes, entry) => {
  var currentTree = [[entry, getConnectedNodes(fullTree, entry, nodes)[0]]];
  var openNodes = getAllOpenNodes(fullTree, currentTree, nodes);
  var connectedNodes;
  while (openNodes.length > 0) {
    for (var i = 0; i < openNodes.length; i++) {
      connectedNodes = getConnectedNodes(fullTree, openNodes[i], nodes);
      for (var j = 0; j < connectedNodes.length; j++) {
        if (!containsEdge(currentTree, [openNodes[i], connectedNodes[j]])) {
          currentTree = addEdge(currentTree, [openNodes[i], connectedNodes[j]]);
        }
      }
    }
    openNodes = getAllOpenNodes(fullTree, currentTree, nodes);
  }
  return currentTree;
};

const checkForComplete = (tree, nodes, edge) => {
  var testTree = [...tree, edge];
  var testCircuit = findCircuit(testTree, nodes, edge[0]);
  var usedNodes = [];
  var allDegreeTwo = true;
  for (var i = 0; i < testCircuit.length; i++) {
    if (!usedNodes.includes(testCircuit[i][0])) {
      usedNodes = [...usedNodes, testCircuit[i][0]];
    }
    if (!usedNodes.includes(testCircuit[i][1])) {
      usedNodes = [...usedNodes, testCircuit[i][1]];
    }
  }
  for (var i = 0; i < usedNodes.length; i++) {
    if (getConnectedNodes(testTree, usedNodes[i], nodes).length != 2) {
      allDegreeTwo = false;
      break;
    }
  }
  return allDegreeTwo;
};
