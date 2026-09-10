/* ============================================================
 * 黑洞背景 —— WebGL 片元着色器
 * 基于史瓦西度规的零测地线近似做光线弯曲（引力透镜），
 * 叠加多普勒集束吸积盘、相对论喷流、光子环、银河带与星空，
 * 全部在 GPU 上逐像素计算。
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
    "  for(int i = 0; i < 4; i++){",
    "    float s = float(i);",
    "    vec3 p = dir * (150.0 + s * 190.0);",
    "    vec3 id = floor(p);",
    "    vec3 f = fract(p) - 0.5;",
    "    float h = hash31(id + s * 17.1);",
    "    float d = length(f);",
    "    float bright = smoothstep(0.32, 0.0, d);",
    "    bright *= smoothstep(0.935, 0.999, h);",
    "    vec3 sc = mix(vec3(0.60, 0.74, 1.0), vec3(1.0, 0.86, 0.60), hash31(id + 3.7));",
    "    float tw = 0.68 + 0.32 * sin(t * 1.2 + h * 62.0);",
    "    col += sc * bright * tw;",
    "  }",
    "  return col;",
    "}",
    "vec3 nebula(vec3 dir){",
    "  float n1 = fbm(dir.xy * 2.2 + dir.z * 1.6);",
    "  float n2 = fbm(dir.yz * 3.1 - dir.x * 1.4 + 19.0);",
    "  vec3 base = mix(vec3(0.010, 0.015, 0.052), vec3(0.085, 0.035, 0.17), n1);",
    "  base += vec3(0.02, 0.05, 0.11) * n2;",
    "  vec3 nrm = normalize(vec3(0.35, 0.75, 0.25));",
    "  float band = exp(-pow(dot(dir, nrm) * 3.2, 2.0));",
    "  float clouds = fbm(dir.xz * 4.0 + dir.y * 3.0 + 7.0);",
    "  vec3 mw = mix(vec3(0.055, 0.05, 0.10), vec3(0.17, 0.14, 0.23), clouds);",
    "  base += mw * band * 0.95;",
    "  return base * 0.6;",
    "}",
    "",
    "void main(){",
    "  vec2 uv = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;",
    "  uv += u_mouse * 0.02;",
    "  uv.y += 0.28;",
    "",
    "  float R = 15.0;",
    "  float ang = u_time * 0.04;",
    "  vec3 camPos = vec3(sin(ang) * R, 1.65 + 0.55 * sin(u_time * 0.11), cos(ang) * R);",
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
    "  for(int i = 0; i < 240; i++){",
    "    float r = length(pos);",
    "    if(r < 1.0){ captured = 1.0; break; }",
    "    if(r > 44.0 && dot(pos, dir) > 0.0){ break; }",
    "    float dt = clamp(0.07 * r, 0.05, 0.6);",
    "    vec3 prev = pos;",
    "    vec3 acc = -1.5 * h2 * pos / pow(r, 5.0);",
    "    dir += acc * dt;",
    "    pos += dir * dt;",
    "",
    "    // ---- 相对论喷流（沿自转轴） ----",
    "    float ay = abs(pos.y);",
    "    float cyl = length(pos.xz);",
    "    if(ay > 1.0 && cyl < 2.2){",
    "      float jc = exp(-cyl * cyl / 0.30);",
    "      float jl = smoothstep(1.0, 3.2, ay) * (1.0 - smoothstep(11.0, 20.0, ay));",
    "      float j = jc * jl * dt;",
    "      color += vec3(0.32, 0.58, 1.0) * j * 0.55 * (1.0 - alpha);",
    "      alpha += j * 0.30 * (1.0 - alpha);",
    "    }",
    "",
    "    // ---- 吸积盘（在 y=0 平面上的穿越采样） ----",
    "    if(prev.y * pos.y < 0.0){",
    "      float f = prev.y / (prev.y - pos.y);",
    "      vec3 hit = mix(prev, pos, f);",
    "      float rr = length(hit.xz);",
    "      if(rr > 2.3 && rr < 14.0){",
    "        float phi = atan(hit.z, hit.x);",
    "        float orbit = u_time * 0.6 / pow(rr, 1.5);",
    "        float spiral = phi + log(rr) * 2.6 - orbit;",
    "        float n = fbm(vec2(spiral * 2.1, rr * 1.25));",
    "        float n2 = fbm(vec2(phi * 6.0 - orbit * 3.0, rr * 3.0 + 5.0));",
    "        float dens = smoothstep(2.3, 3.0, rr) * (1.0 - smoothstep(8.5, 14.0, rr));",
    "        dens *= (0.32 + 1.15 * n) * (0.5 + 0.85 * n2);",
    "",
    "        // 开普勒轨道速度 → 相对论多普勒集束（一侧显著变亮）",
    "        vec3 radial = normalize(vec3(hit.x, 0.0, hit.z));",
    "        vec3 velDir = normalize(cross(vec3(0.0, 1.0, 0.0), radial));",
    "        float beta = clamp(0.62 / sqrt(rr), 0.0, 0.72);",
    "        float los = dot(velDir, normalize(-dir));",
    "        float beam = pow(clamp(1.0 + beta * los, 0.0, 3.0), 3.0);",
    "        dens *= 0.55 + 0.75 * beam;",
    "",
    "        float temp = clamp((6.2 - rr) / 3.4, 0.0, 1.0);",
    "        vec3 dc = mix(vec3(1.0, 0.30, 0.04), vec3(1.0, 0.93, 0.80), temp);",
    "        dc = mix(dc, vec3(0.58, 0.80, 1.0), smoothstep(0.85, 1.0, temp));",
    "        float glow = dens * 1.15;",
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
    "  // 光子环 + 柔和辉光",
    "  float ring = exp(-pow((b - 2.598) / 0.10, 2.0));",
    "  float bloom = exp(-pow((b - 2.598) / 0.55, 2.0));",
    "  color += vec3(1.0, 0.66, 0.30) * ring * 0.45;",
    "  color += vec3(1.0, 0.55, 0.22) * bloom * 0.10;",
    "",
    "  color *= 0.80;",
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
