// Utility to evaluate math expressions safely
const evaluate = (expr, x) => {
  try {
    return math.evaluate(expr, { x });
  } catch (e) {
    return 0;
  }
};

// Global Charts
let charts = {
  riemann: null,
  integral: null,
  physics: null,
};

const EXERCISES = {
    A: { fn: "sqrt(x+1)", a: 0, b: 3, n: 3, method: "right" },
    B: { fn: "1/(x+1)^2", a: 0, b: 2, n: 4, method: "left" },
    C: { fn: "(2x-1)^3", a: 1, b: 3, n: 4, method: "right" },
    D: { fn: "cos(x)*sin(x)^2", a: 0, b: 1.57, n: 4, method: "left" },
    E: { fn: "x*sqrt(x^2+5)", a: 0, b: 2, n: 4, method: "right" }
};

let currentLetter = 'A';

// Tab switching logic
const initTabs = () => {
    const btns = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.tab-content');

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;
            btns.forEach(b => b.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(tab).classList.add('active');
            
            if (tab === 'riemann') updateRiemann();
            if (tab === 'integral') renderIntegral();
            if (tab === 'physics') renderPhysics();
        });
    });

    const lBtns = document.querySelectorAll('.l-btn');
    lBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentLetter = btn.dataset.letter;
            lBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Apply preset
            const config = EXERCISES[currentLetter];
            document.getElementById('fn-input').value = config.fn;
            document.getElementById('a-input').value = config.a;
            document.getElementById('b-input').value = config.b;
            document.getElementById('n-input').value = config.n;
            document.getElementById('method-input').value = config.method;
            
            updateRiemann();
        });
    });
};

// --- Riemann Sum Logic ---
const updateRiemann = () => {
  const fnStr = document.getElementById("fn-input").value;
  const a = parseFloat(document.getElementById("a-input").value);
  const b = parseFloat(document.getElementById("b-input").value);
  const n = parseInt(document.getElementById("n-input").value);
  const method = document.getElementById("method-input").value;

  document.getElementById("n-val").innerText = n;

  const dx = (b - a) / n;
  let sum = 0;
  const labels = [];
  const dataPoints = [];
  const rectData = [];

  // Precise data for the function curve
  const resolution = 100;
  for (let i = 0; i <= resolution; i++) {
    const x = a + (i * (b - a)) / resolution;
    labels.push(x.toFixed(2));
    dataPoints.push(evaluate(fnStr, x));
  }

  // Riemann rectangles
  for (let i = 0; i < n; i++) {
    let xEval;
    if (method === "left") xEval = a + i * dx;
    else if (method === "right") xEval = a + (i + 1) * dx;
    else xEval = a + (i + 0.5) * dx;

    const h = evaluate(fnStr, xEval);
    sum += h * dx;

    // Rectangle representation for chart (4 points per rectangle)
    const xStart = a + i * dx;
    const xEnd = a + (i + 1) * dx;
    rectData.push({ x: xStart, y: 0 });
    rectData.push({ x: xStart, y: h });
    rectData.push({ x: xEnd, y: h });
    rectData.push({ x: xEnd, y: 0 });
  }

  document.getElementById("riemann-res").innerText = sum.toFixed(4);
  renderRiemannChart(labels, dataPoints, rectData);
};

const renderRiemannChart = (labels, fnData, rectData) => {
  const ctx = document.getElementById("riemannChart").getContext("2d");

  if (charts.riemann) charts.riemann.destroy();

  charts.riemann = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "f(x)",
          data: fnData,
          borderColor: "#6366f1",
          borderWidth: 3,
          fill: false,
          tension: 0.4,
          pointRadius: 0,
        },
        {
          label: "Rectángulos",
          data: rectData,
          backgroundColor: "rgba(34, 211, 238, 0.3)",
          borderColor: "#22d3ee",
          borderWidth: 1,
          fill: true,
          type: "scatter",
          showLine: true,
          pointRadius: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: "linear",
          position: "bottom",
          grid: { color: "rgba(255,255,255,0.05)" },
          ticks: { color: "#94a3b8" },
        },
        y: {
          grid: { color: "rgba(255,255,255,0.05)" },
          ticks: { color: "#94a3b8" },
        },
      },
      plugins: {
        legend: { labels: { color: "#f8fafc" } },
      },
    },
  });
};

// --- Integral Logic (Exercise A) ---
const renderIntegral = () => {
  const ctx = document.getElementById("integralChart").getContext("2d");
  if (charts.integral) charts.integral.destroy();

  const expr = "(x^2+1)*(x^2-2) / (x^(2/3))";
  const labels = [];
  const data = [];
  const fillData = [];

  for (let x = 0.5; x <= 9; x += 0.1) {
    const y = evaluate(expr, x);
    labels.push(x.toFixed(1));
    data.push(y);
    if (x >= 1 && x <= 8) fillData.push({ x, y });
  }

  charts.integral = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "f(x)",
          data: data,
          borderColor: "#a855f7",
          borderWidth: 2,
          fill: false,
          pointRadius: 0,
        },
        {
          label: "Área ∫₁⁸",
          data: fillData,
          backgroundColor: "rgba(168, 85, 247, 0.4)",
          fill: "origin",
          pointRadius: 0,
          type: "line",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { type: "linear", position: "bottom" },
        y: { type: "linear" },
      },
    },
  });
};

// --- Physics Logic (Exercise A) ---
const renderPhysics = () => {
  const ctx = document.getElementById("physicsChart").getContext("2d");
  if (charts.physics) charts.physics.destroy();

  const vFunc = "3*x^2 - 6*x";
  const labels = [];
  const vData = [];
  const absVData = [];

  for (let t = 0; t <= 4.1; t += 0.1) {
    const v = evaluate(vFunc, t);
    labels.push(t.toFixed(1));
    vData.push(v);
    absVData.push(Math.abs(v));
  }

  charts.physics = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Velocidad v(t)",
          data: vData,
          borderColor: "#f87171",
          fill: false,
          borderDash: [5, 5],
          pointRadius: 0,
        },
        {
          label: "Distancia (Integral |v|)",
          data: absVData,
          borderColor: "#4ade80",
          backgroundColor: "rgba(74, 222, 128, 0.2)",
          fill: true,
          pointRadius: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { type: "linear", title: { display: true, text: "Tiempo (s)" } },
        y: { title: { display: true, text: "v (m/s)" } },
      },
    },
  });
};

// --- Initialization ---
document.addEventListener("DOMContentLoaded", () => {
  initTabs();
  updateRiemann();

  // Event listeners
  ["fn-input", "a-input", "b-input", "method-input"].forEach((id) => {
    document.getElementById(id).addEventListener("change", updateRiemann);
  });
  document.getElementById("n-input").addEventListener("input", updateRiemann);
});
