vR = 100; //Right wheel velocity
vL = 50; //Left wheel velocity
d = 50; //Distance from wheel to center of axis
t = 3.14; //Time 

// console.log("omega", omega(vR, vL, d), "R", R(vR, vL, d), "V", V(vR, vL),
//   "Vx", Vx(vR, vL, d, t), "Vy", Vy(vR, vL, d, t))
// console.log("deltaX", deltaX(vR, vL, d, t),
//   "deltaY", deltaY(vR, vL, d, t), "deltaHeading", deltaHeading(vR, vL, d, t),
//   "deltaHeadingDeg", radiansToDegrees(deltaHeading(vR, vL, d, t)));

function radiansToDegrees(rad) { //convert degrees to radians
  return rad * 180 / Math.PI;
}

function omega(vR, vL, d) { //rotation rate
  return ((vR - vL) / d);
}

function R(vR, vL, d) { //Radius of rotation circle
  return (d * (vR + vL) / (vR, vL))
}

function V(vR, vL) { //Forward velocity, average of both wheels
  return ((vR + vL) / 2)
}

function Vx(vR, vL, d, t) { //x-velocity
  return V(vR, vL) * Math.cos(t * omega(vR, vL, d));
}

function Vy(vR, vL, d, t) { //y-velocity
  return V(vR, vL) * Math.sin(t * omega(vR, vL, d));
}

function deltaX(vR, vL, d, t) { //how much x has changed
  return V(vR, vL) * Math.sin(t * omega(vR, vL, d)) / omega(vR, vL, d);
}

function deltaY(vR, vL, d, t) { //how much y has changed
  return -1 * V(vR, vL) * Math.cos(t * omega(vR, vL, d)) / omega(vR, vL, d) + V(vR, vL) / omega(vR, vL, d);
}

function deltaHeading(vR, vL, d, t) { //how much heading has changed
  return omega(vR, vL, d) * t;
}
