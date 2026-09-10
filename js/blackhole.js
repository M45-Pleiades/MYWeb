/* ============================================================
 * 黑洞背景 —— WebGL 片元着色器
 * 基于史瓦西度规的零测地线近似做光线弯曲（引力透镜），
 * 叠加吸积盘、光子环与星空，全部在 GPU 上逐像素计算。
 * ============================================================ */
(function () {
  "use strict";

  var canvas = document.getElementById("blackhole");
  if (!canvas) return;

  var gl = canvas.getContext("webgl", {
    antialias: false,
    alpha: false,
    depth: false,
    stencil: false,
    powerPreference: "high-performance"
  }) || canvas.getContext("experimental-webgl");

  if (!gl) {
    document.documentElement.classList.add("no-webgl");
    return;
  }

  var VERT = [
    "attribute vec2 a_pos;",
    "void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }"
  ].join("\n");

  var FRAG = [
    "precision highp float;",
    "uniform vec2  u_res;",
    "uniform float u_time;",
    "uniform vec2  u_mouse;",
    "",
    "float hash21(vec2 p){",
    "  p = fract(p * vec2(123.34, 456.21));",
    "  p += dot(p, p + 45.32);",
    "  return fract(p.x * p.y);",
    "}",
    "float noise(vec2 p){",
    "  vec2 i = floor(p), f = fract(p);",
    "  vec2 u = f * f * (3.0 - 2.0 * f);",
    "  float a = hash21(i);",
    "  float b = hash21(i + vec2(1.0, 0.0));",
    "  float c = hash21(i + vec2(0.0, 1.0));",
    "  float d = hash21(i + vec2(1.0, 1.0));",
    "  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);",
    "}",
    "float fbm(vec2 p){",
    "  float v = 0.0, a = 0.5;",
    "  for(int i = 0; i < 5; i++){",
    "    v += a * noise(p);",
    "    p = p * 2.03 + vec2(1.7, 9.2);",
    "    a *= 0.5;",
    "  }",
    "  return v;",
    "}",
    "float hash31(vec3 p){",
    "  p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3));",
    "  p *= 17.0;",
    "  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));",
    "}",
    "vec3 starField(vec3 dir, float t){",
    "  vec3 col = vec3(0.0);",
    "  for(int i = 0; i < 3; i++){",
    "    float s = float(i);",
    "    vec3 p = dir * (160.0 + s * 210.0);",
    "    vec3 id = floor(p);",
    "    vec3 f = fract(p) - 0.5;",
    "    float h = hash31(id + s * 13.7);",
    "    float d = length(f);",
    "    float bright = smoothstep(0.34, 0.0, d);",
    "    bright *= smoothstep(0.955, 0.998, h);",
    "    vec3 sc = mix(vec3(0.65, 0.78, 1.0), vec3(1.0, 0.86, 0.62), hash31(id + 7.3));",
    "    float tw = 0.75 + 0.25 * sin(t * 0.8 + h * 40.0);",
    "    col += sc * bright * tw;",
    "  }",
    "  return col;",
    "}",
    "vec3 nebula(vec3 dir){",
    "  float n1 = fbm(dir.xy * 2.6 + dir.z * 1.8);",
    "  float n2 = fbm(dir.yz * 3.4 - dir.x * 1.2 + 21.0);",
    "  vec3 c = mix(vec3(0.015, 0.02, 0.07), vec3(0.10, 0.04, 0.19), n1);",
    "  c += vec3(0.02, 0.05, 0.12) * n2;",
    "  return c * 0.55;",
    "}",
    "",
    "void main(){",
    "  vec2 uv = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;",
    "  uv += u_mouse * 0.02;",
    "  uv.y += 0.30;",
    "",
    "  float R = 15.0;",
    "  float ang = u_time * 0.035;",
    "  vec3 camPos = vec3(sin(ang) * R, 1.7 + 0.5 * sin(u_time * 0.11), cos(ang) * R);",
    "  vec3 fwd = normalize(-camPos);",
    "  vec3 right = normalize(cross(fwd, vec3(0.0, 1.0, 0.0)));",
    "  vec3 up = cross(right, fwd);",
    "  vec3 rd = normalize(uv.x * right + uv.y * up + 1.55 * fwd);",
    "",
    "  vec3 pos = camPos;",
    "  vec3 dir = rd;",
    "  vec3 hv = cross(pos, dir);",
    "  float h2 = dot(hv, hv);",
    "  float b = sqrt(h2);",
    "",
    "  vec3 color = vec3(0.0);",
    "  float alpha = 0.0;",
    "  float captured = 0.0;",
    "",
    "  for(int i = 0; i < 256; i++){",
    "    float r = length(pos);",
    "    if(r < 1.0){ captured = 1.0; break; }",
    "    if(r > 42.0 && dot(pos, dir) > 0.0){ break; }",
    "    float dt = clamp(0.07 * r, 0.05, 0.6);",
    "    vec3 prev = pos;",
    "    vec3 acc = -1.5 * h2 * pos / pow(r, 5.0);",
    "    dir += acc * dt;",
    "    pos += dir * dt;",
    "    if(prev.y * pos.y < 0.0){",
    "      float f = prev.y / (prev.y - pos.y);",
    "      vec3 hit = mix(prev, pos, f);",
    "      float rr = length(hit.xz);",
    "      if(rr > 2.35 && rr < 13.5){",
    "        float phi = atan(hit.z, hit.x);",
    "        float orbit = u_time * 0.45 / pow(rr, 1.5);",
    "        float n = fbm(vec2(phi * 3.0 + orbit * 5.0, rr * 0.9 - orbit * 2.0));",
    "        float n2 = fbm(vec2(phi * 7.0 - orbit * 4.0, rr * 2.1 + 3.0));",
    "        float dens = smoothstep(2.35, 3.1, rr) * (1.0 - smoothstep(8.5, 13.5, rr));",
    "        dens *= (0.45 + 1.0 * n) * (0.55 + 0.7 * n2);",
    "        float temp = clamp((6.0 - rr) / 3.4, 0.0, 1.0);",
    "        vec3 dc = mix(vec3(1.0, 0.32, 0.05), vec3(1.0, 0.94, 0.82), temp);",
    "        dc = mix(dc, vec3(0.55, 0.78, 1.0), smoothstep(0.86, 1.0, temp));",
    "        float glow = dens * 1.0;",
    "        color += dc * glow * (1.0 - alpha);",
    "        alpha += glow * 0.5 * (1.0 - alpha);",
    "      }",
    "    }",
    "  }",
    "",
    "  if(captured < 0.5){",
    "    vec3 bg = nebula(normalize(dir)) + starField(normalize(dir), u_time);",
    "    color += bg * (1.0 - alpha);",
    "  }",
    "",
    "  float ring = exp(-pow((b - 2.598) / 0.14, 2.0));",
    "  color += vec3(1.0, 0.62, 0.28) * ring * 0.22;",
    "",
    "  color *= 0.72;",
    "  color = color / (1.0 + color);",
    "  color = pow(color, vec3(0.4545));",
    "  gl_FragColor = vec4(color, 1.0);",
    "}"
  ].join("\n");

  function compile(type, src) {
    var sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      console.warn(gl.getShaderInfoLog(sh));
      gl.deleteShader(sh);
      return null;
    }
    return sh;
  }

  var vs = compile(gl.VERTEX_SHADER, VERT);
  var fs = compile(gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) {
    document.documentElement.classList.add("no-webgl");
    return;
  }

  var prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.warn(gl.getProgramInfoLog(prog));
    document.documentElement.classList.add("no-webgl");
    return;
  }
  gl.useProgram(prog);

  var buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  var loc = gl.getAttribLocation(prog, "a_pos");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  var uRes = gl.getUniformLocation(prog, "u_res");
  var uTime = gl.getUniformLocation(prog, "u_time");
  var uMouse = gl.getUniformLocation(prog, "u_mouse");

  var SCALE = 0.7;
  var mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function resize() {
    var w = Math.max(1, Math.floor(window.innerWidth * SCALE));
    var h = Math.max(1, Math.floor(window.innerHeight * SCALE));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    }
    gl.uniform2f(uRes, w, h);
  }
  window.addEventListener("resize", resize, { passive: true });
  resize();

  window.addEventListener("mousemove", function (e) {
    mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2.0;
    mouse.ty = -(e.clientY / window.innerHeight - 0.5) * 2.0;
  }, { passive: true });

  var t0 = performance.now();
  var visible = true;
  document.addEventListener("visibilitychange", function () {
    visible = !document.hidden;
    if (visible && !reduced) requestAnimationFrame(frame);
  });

  var last = 0;
  var FPS_CAP = 32;

  function draw(now) {
    var t = (now - t0) / 1000;
    mouse.x += (mouse.tx - mouse.x) * 0.05;
    mouse.y += (mouse.ty - mouse.y) * 0.05;
    gl.uniform1f(uTime, t);
    gl.uniform2f(uMouse, mouse.x, mouse.y);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  function frame(now) {
    if (!visible) return;
    if (now - last >= 1000 / FPS_CAP) {
      last = now;
      draw(now);
    }
    requestAnimationFrame(frame);
  }

  if (reduced) {
    draw(performance.now());
  } else {
    requestAnimationFrame(frame);
  }
})();
