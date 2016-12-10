
function subtractVectors(a, b) 
{
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function sumVectors(a, b)
{
	return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

function makeTranslation(tx, ty, tz) 
{
  return [
     1,  0,  0,  0,
     0,  1,  0,  0,
     0,  0,  1,  0,
    tx, ty, tz,  1
  ];
}

function makeYRotation(angleInRadians) 
{
  var c = Math.cos(angleInRadians);
  var s = Math.sin(angleInRadians);
  return [
    c, 0, -s, 0,
    0, 1, 0, 0,
    s, 0, c, 0,
    0, 0, 0, 1
  ];
};
function makeXRotation(angleInRadians) 
{
  var c = Math.cos(angleInRadians);
  var s = Math.sin(angleInRadians);
  return [
    1, 0, 0, 0,
    0, c, s, 0,
    0, -s, c, 0,
    0, 0, 0, 1
  ];
};
function makeZRotation(angleInRadians) 
{
  var c = Math.cos(angleInRadians);
  var s = Math.sin(angleInRadians);
  return [
     c, s, 0, 0,
    -s, c, 0, 0,
     0, 0, 1, 0,
     0, 0, 0, 1
  ];
}

function scale(x, y, z) {
  
  return [x, 0, 0, 0,
          0, y, 0, 0,
          0, 0, z, 0,
          0, 0, 0, 1];
};

function normalizar(v) 
{
  var length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
  var x =v[0] / length;
  var y =v[1] / length;
  var z =v[2] / length;
  if (length > 0.00001) 
  {
    return [x, y, z];
  } 
  else 
  {
    return [0, 0, 0];
  }
}

function cross(a, b) 
{
  return [a[1] * b[2] - a[2] * b[1],
          a[2] * b[0] - a[0] * b[2],
          a[0] * b[1] - a[1] * b[0]];
}

function VectorIsEqual(v0, v1)
{
  if(v0[0] == v1[0] && v0[1] == v1[1] && v0[2] == v1[2])
    return true;

  return false;
}

function Identity()
{
	return [1,0,0,0,
		0,1,0,0,
		0,0,1,0,
		0,0,0,1];
}

function degToRad(d) 
{
    return d * Math.PI / 180.0;
}


function dot(vec1, vec2)
{
return (vec1[0]*vec2[0] + vec1[1]*vec2[1] + vec1[2]*vec2[2])
}

function length(v)
{    

    var length = Math.sqrt((v[0] * v[0]) + ( v[1] * v[1] ) + ( v[2] * v[2] ));

    if(length < 0)
        length *= -1;

    return length;
}

function lerp(v0, v1, t)
{
    var m0 = (1.0-t)*v0[0] + t*v1[0];
    var m1 = (1.0-t)*v0[1] + t*v1[1];
    var m2 = (1.0-t)*v0[2] + t*v1[2];

    return [m0, m1, m2];
}

function slerp(v0, v1, t)
{   
  if (t == 0) return v0;
  if (VectorIsEqual(v0, v1) || t == 1.0) return v1;

  var theta = Math.acos(dot(v0, v1)/(length(v0) * length(v1)));

  if (theta == 0) return v1;

  var sinTheta = Math.sin(theta);

  var resA0 = (v0[0] * (Math.sin((1 - t) * theta) / sinTheta));
  var resA1 = (v0[1] * (Math.sin((1 - t) * theta) / sinTheta));
  var resA2 = (v0[2] * (Math.sin((1 - t) * theta) / sinTheta));

  var resB0 = (v1[0] * (Math.sin(t * theta) / sinTheta));
  var resB1 = (v1[1] * (Math.sin(t * theta) / sinTheta));
  var resB2 = (v1[2] * (Math.sin(t * theta) / sinTheta));

  return sumVectors([resA0, resA1, resA2], [resB0, resB1, resB2]);
}

function makePerspective(fieldOfViewInRadians, aspect, near, far) 
{
  var f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewInRadians);
  var rangeInv = 1.0 / (near - far);
  return [
    f / aspect, 0, 0, 0,
    0, f, 0, 0,
    0, 0, (near + far) * rangeInv, -1,
    0, 0, near * far * rangeInv * 2, 0
  ];
};

function makeLookAt(cameraPosition, target, up) 
{
  var zAxis = normalizar(subtractVectors(cameraPosition, target));
  var xAxis = cross(up, zAxis);
  var yAxis = cross(zAxis, xAxis);
  return makeInverse([
     xAxis[0], xAxis[1], xAxis[2], 0,
     yAxis[0], yAxis[1], yAxis[2], 0,
     zAxis[0], zAxis[1], zAxis[2], 0,
     cameraPosition[0],
     cameraPosition[1],
     cameraPosition[2],
     1]);
}


function matrixMultiply(a, b) 
{
  var a00 = a[0*4+0];
  var a01 = a[0*4+1];
  var a02 = a[0*4+2];
  var a03 = a[0*4+3];
  var a10 = a[1*4+0];
  var a11 = a[1*4+1];
  var a12 = a[1*4+2];
  var a13 = a[1*4+3];
  var a20 = a[2*4+0];
  var a21 = a[2*4+1];
  var a22 = a[2*4+2];
  var a23 = a[2*4+3];
  var a30 = a[3*4+0];
  var a31 = a[3*4+1];
  var a32 = a[3*4+2];
  var a33 = a[3*4+3];
  var b00 = b[0*4+0];
  var b01 = b[0*4+1];
  var b02 = b[0*4+2];
  var b03 = b[0*4+3];
  var b10 = b[1*4+0];
  var b11 = b[1*4+1];
  var b12 = b[1*4+2];
  var b13 = b[1*4+3];
  var b20 = b[2*4+0];
  var b21 = b[2*4+1];
  var b22 = b[2*4+2];
  var b23 = b[2*4+3];
  var b30 = b[3*4+0];
  var b31 = b[3*4+1];
  var b32 = b[3*4+2];
  var b33 = b[3*4+3];
  return [a00 * b00 + a01 * b10 + a02 * b20 + a03 * b30,
          a00 * b01 + a01 * b11 + a02 * b21 + a03 * b31,
          a00 * b02 + a01 * b12 + a02 * b22 + a03 * b32,
          a00 * b03 + a01 * b13 + a02 * b23 + a03 * b33,
          a10 * b00 + a11 * b10 + a12 * b20 + a13 * b30,
          a10 * b01 + a11 * b11 + a12 * b21 + a13 * b31,
          a10 * b02 + a11 * b12 + a12 * b22 + a13 * b32,
          a10 * b03 + a11 * b13 + a12 * b23 + a13 * b33,
          a20 * b00 + a21 * b10 + a22 * b20 + a23 * b30,
          a20 * b01 + a21 * b11 + a22 * b21 + a23 * b31,
          a20 * b02 + a21 * b12 + a22 * b22 + a23 * b32,
          a20 * b03 + a21 * b13 + a22 * b23 + a23 * b33,
          a30 * b00 + a31 * b10 + a32 * b20 + a33 * b30,
          a30 * b01 + a31 * b11 + a32 * b21 + a33 * b31,
          a30 * b02 + a31 * b12 + a32 * b22 + a33 * b32,
          a30 * b03 + a31 * b13 + a32 * b23 + a33 * b33];
}
function makeInverse(m) 
{
  var m00 = m[0 * 4 + 0];
  var m01 = m[0 * 4 + 1];
  var m02 = m[0 * 4 + 2];
  var m03 = m[0 * 4 + 3];
  var m10 = m[1 * 4 + 0];
  var m11 = m[1 * 4 + 1];
  var m12 = m[1 * 4 + 2];
  var m13 = m[1 * 4 + 3];
  var m20 = m[2 * 4 + 0];
  var m21 = m[2 * 4 + 1];
  var m22 = m[2 * 4 + 2];
  var m23 = m[2 * 4 + 3];
  var m30 = m[3 * 4 + 0];
  var m31 = m[3 * 4 + 1];
  var m32 = m[3 * 4 + 2];
  var m33 = m[3 * 4 + 3];
  var tmp_0  = m22 * m33;
  var tmp_1  = m32 * m23;
  var tmp_2  = m12 * m33;
  var tmp_3  = m32 * m13;
  var tmp_4  = m12 * m23;
  var tmp_5  = m22 * m13;
  var tmp_6  = m02 * m33;
  var tmp_7  = m32 * m03;
  var tmp_8  = m02 * m23;
  var tmp_9  = m22 * m03;
  var tmp_10 = m02 * m13;
  var tmp_11 = m12 * m03;
  var tmp_12 = m20 * m31;
  var tmp_13 = m30 * m21;
  var tmp_14 = m10 * m31;
  var tmp_15 = m30 * m11;
  var tmp_16 = m10 * m21;
  var tmp_17 = m20 * m11;
  var tmp_18 = m00 * m31;
  var tmp_19 = m30 * m01;
  var tmp_20 = m00 * m21;
  var tmp_21 = m20 * m01;
  var tmp_22 = m00 * m11;
  var tmp_23 = m10 * m01;
  var t0 = (tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31) -
      (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
  var t1 = (tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31) -
      (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
  var t2 = (tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31) -
      (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
  var t3 = (tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21) -
      (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);
  var d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);
  return [
    d * t0,
    d * t1,
    d * t2,
    d * t3,
    d * ((tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30) -
          (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30)),
    d * ((tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30) -
          (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30)),
    d * ((tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30) -
          (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30)),
    d * ((tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20) -
          (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20)),
    d * ((tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33) -
          (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33)),
    d * ((tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33) -
          (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33)),
    d * ((tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33) -
          (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33)),
    d * ((tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23) -
          (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23)),
    d * ((tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12) -
          (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22)),
    d * ((tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22) -
          (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02)),
    d * ((tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02) -
          (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12)),
    d * ((tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12) -
          (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02))
  ];
}

function transpose(a) 
{

return [a[0], a[4], a[8], a[12],
	a[1], a[5], a[9], a[13],
	a[2], a[6], a[10], a[14],
	a[3], a[7], a[11], a[15]];

}

function prepararMatrices()
{
  model = Identity();
  view = Identity();
  projection = Identity();

  direccion = [0.0, 20.0, 0.0];
  posicion = [70.0, 80.0, 70.0];
  var cameraMatrix = Identity();
  //cameraMatrix = makeTranslation(posicion[0], posicion[1], posicion[2]);
  var yrot = makeYRotation(degToRad(0));
  cameraMatrix = makeLookAt(posicion, direccion, [0,1,0]);//matrixMultiply(cameraMatrix, yrot);
  var invView = makeInverse(cameraMatrix);
  var projection = makePerspective(degToRad(45), GL.drawingBufferWidth / GL.drawingBufferHeight, 0.1, 2000);
  matrix = makeTranslation(0, 0, 0);//makeLookAt([1, 1, 1], posicion, [0,1,0]);
  matrix = matrixMultiply(matrix, invView);
    matrix = matrixMultiply(matrix, projection);

}