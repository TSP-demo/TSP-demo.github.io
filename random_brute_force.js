algorithms = {
  ...algorithms,
  randomBruteForce: (nodes, startingPoint) => {
    var returnRoute = [startingPoint];
    var random = Math.floor(Math.random() * nodes.length);
    while (returnRoute.length < nodes.length) {
      while (returnRoute.includes(random)) {
        random = Math.floor(Math.random() * nodes.length);
      }
      returnRoute[returnRoute.length] = random;
    }
    returnRoute[returnRoute.length] = startingPoint;
    return returnRoute;
  },
};
