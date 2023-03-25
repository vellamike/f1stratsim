function updateCarPosition(carElement, trackPath, pathLength, progress) {
    const distance = pathLength * progress;
    const position = trackPath.getPointAtLength((1 - progress) * pathLength);
    const tangent = trackPath.getPointAtLength(distance + 1);

    carElement.setAttribute("x", position.x);
    carElement.setAttribute("y", position.y);
}
