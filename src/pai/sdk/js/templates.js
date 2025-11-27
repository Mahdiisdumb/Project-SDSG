// ==== Templates ====
sdk.templates = {};

// --- Welcome Page ---
sdk.templates['Welcome'] = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Welcome to SDSG SDK</title>
<style>
  body {
    margin: 0;
    font-family: 'Orbitron', sans-serif;
    background: linear-gradient(135deg, #0f0f0f, #1a1a1a);
    color: #00ff99;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
    padding: 20px;
  }
  h1 {
    font-size: 4em;
    margin-bottom: 0.2em;
    text-shadow: 0 0 10px #00ff99;
  }
  h2 {
    font-size: 1.5em;
    margin-bottom: 1em;
    color: #ccc;
  }
  .intro {
    max-width: 700px;
    font-size: 1.1em;
    line-height: 1.6;
    margin-bottom: 2em;
  }
  .btn {
    background: #00ff99;
    color: #000;
    padding: 15px 30px;
    font-size: 1em;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s ease;
  }
  .btn:hover {
    background: #00cc77;
  }
  footer {
    position: absolute;
    bottom: 20px;
    font-size: 0.9em;
    color: #666;
  }
</style>
</head>
<body>
<h1>SDSG SDK</h1>
<h2>School-Defying Software Games</h2>
<div class="intro">
Born from the chaos of Mahdi Studios, SDSG began when we discovered Chromebooks could run HTML files. We injected code onto a USB, and the grandfather of SDSG was born. It wasn’t offline — and if teachers found out we were sharing it, it was DOOMED. So we backed it up to Google Drive as <strong>USB.zip</strong>, renamed it, and made it fully offline. Now, SDSG SDK is your local dev platform to store, play, and build rebellious games. Join the movement. Defy the system. Code your legacy.
</div>
<footer>© 2025 Mahdi Studios. Powered by students. Protected by USB.zip.</footer>
</body>
</html>`;

// --- Blank Site ---
sdk.templates['Blank Site'] = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Blank Page</title>
</head>
<body>
fill data through the SDK editor
</body>
</html>`;

// --- HTML Basics ---
sdk.templates['HTML CSS JS Swiss Army Knife'] = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>HTML5, CSS3 & JS Swiss Army Template</title>
<style>
/* === GLOBAL STYLES === */
body {
  font-family: Arial, sans-serif;
  background: #f4f4f9;
  color: #333;
  line-height: 1.6;
  margin: 0;
  padding: 20px;
}

h1, h2, h3 { color: #2c3e50; margin-top: 1em; margin-bottom: 0.5em; }
h1 { font-size: 2.5em; }
h2 { font-size: 2em; }
h3 { font-size: 1.4em; }

p, li { margin-bottom: 10px; }
ul { margin-bottom: 20px; }
code, pre { background: #eee; padding: 2px 5px; border-radius: 4px; font-family: monospace; }
pre { overflow-x: auto; }

button {
  padding: 10px 20px;
  background: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}
button:hover { background: #2980b9; }

.dictionary { background: #eef; padding: 10px; border-left: 4px solid #3498db; margin-bottom: 15px; }
.example { background: #f4f4f4; padding: 10px; border-radius: 5px; margin-bottom: 15px; }
.section-toggle { cursor: pointer; color: #3498db; text-decoration: underline; }
.hidden { display: none; }

.flex-container { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 10px; }
.flex-box { background: #fff; padding: 10px; border-radius: 5px; border: 1px solid #ccc; flex: 1 1 200px; }

input, select, textarea { padding: 5px; margin: 5px 0; width: 100%; }
table { border-collapse: collapse; margin-top: 10px; width: 100%; }
td, th { border: 1px solid #ccc; padding: 5px; text-align: left; }
th { background-color: #3498db; color: #fff; }
</style>
</head>
<body>
<h1>HTML5, CSS3 & JS Swiss Army Template</h1>
<p>This template is a full interactive reference for HTML5, CSS3, and JavaScript with examples.</p>

<!-- === HTML SECTION === -->
<h2 class="section-toggle" onclick="toggleSection('htmlSection')">HTML Dictionary (click to toggle)</h2>
<div id="htmlSection" class="dictionary">
  <strong>&lt;!DOCTYPE html&gt;</strong> — Declare HTML5.<br>
  <strong>&lt;html&gt;</strong> — Root element.<br>
  <strong>&lt;head&gt;</strong> — Metadata like <code>&lt;title&gt;</code>, <code>&lt;link&gt;</code>, <code>&lt;meta&gt;</code>.<br>
  <strong>&lt;body&gt;</strong> — Visible content.<br>
  <strong>&lt;h1&gt; to &lt;h6&gt;</strong> — Headings.<br>
  <strong>&lt;p&gt;</strong> — Paragraph.<br>
  <strong>&lt;ul&gt;/&lt;ol&gt;/&lt;li&gt;</strong> — Lists.<br>
  <strong>&lt;a&gt;</strong> — Hyperlink.<br>
  <strong>&lt;img&gt;</strong> — Images.<br>
  <strong>&lt;div&gt;</strong> — Block container.<br>
  <strong>&lt;span&gt;</strong> — Inline container.<br>
  <strong>&lt;button&gt;</strong> — Button.<br>
  <strong>&lt;form&gt;</strong> — Form.<br>
  <strong>&lt;input&gt;</strong> — Input field.<br>
  <strong>&lt;canvas&gt;</strong> — Draw graphics.<br>
  <strong>&lt;video&gt;/&lt;audio&gt;</strong> — Media elements.<br>
  <strong>&lt;iframe&gt;</strong> — Embed another page.<br>
  <strong>&lt;table&gt;/&lt;tr&gt;/&lt;td&gt;/&lt;th&gt;</strong> — Tables.<br>
  <strong>&lt;section&gt;/&lt;article&gt;/&lt;aside&gt;/&lt;footer&gt;</strong> — Semantic HTML5 sections.<br>
</div>

<div class="example">
<h3>HTML Example</h3>
<pre><code>&lt;h1&gt;Hello World&lt;/h1&gt;
&lt;p&gt;Paragraph text.&lt;/p&gt;
&lt;ul&gt;
  &lt;li&gt;Item 1&lt;/li&gt;
  &lt;li&gt;Item 2&lt;/li&gt;
&lt;/ul&gt;
&lt;a href="https://example.com"&gt;Visit Example&lt;/a&gt;</code></pre>
</div>

<!-- === CSS SECTION === -->
<h2 class="section-toggle" onclick="toggleSection('cssSection')">CSS Dictionary (click to toggle)</h2>
<div id="cssSection" class="dictionary">
  <strong>color</strong> — Text color.<br>
  <strong>background-color</strong> — Background.<br>
  <strong>font-family / font-size / font-weight</strong> — Text styling.<br>
  <strong>padding / margin</strong> — Spacing.<br>
  <strong>border / border-radius</strong> — Borders & rounded corners.<br>
  <strong>width / height</strong> — Size.<br>
  <strong>display</strong> — block / inline / flex / grid.<br>
  <strong>position / top / left / right / bottom</strong> — Positioning.<br>
  <strong>z-index</strong> — Layer order.<br>
  <strong>transition / transform / animation</strong> — Effects.<br>
  <strong>:hover / :focus / :active</strong> — Pseudo-classes.<br>
  <strong>@keyframes</strong> — Animations.<br>
  <strong>flex / justify-content / align-items</strong> — Flexbox layout.<br>
  <strong>grid / grid-template-columns</strong> — Grid layout.<br>
</div>

<div class="example">
<h3>CSS Example</h3>
<pre><code>p {
  color: red;
  background-color: yellow;
  padding: 10px;
  border-radius: 5px;
}

button:hover {
  background-color: green;
}

.container {
  display: flex;
  justify-content: space-around;
}</code></pre>
</div>

<!-- === JS SECTION === -->
<h2 class="section-toggle" onclick="toggleSection('jsSection')">JavaScript Dictionary (click to toggle)</h2>
<div id="jsSection" class="dictionary">
  <strong>document.getElementById()</strong> — Select by ID.<br>
  <strong>querySelector()</strong> — Select by CSS selector.<br>
  <strong>addEventListener()</strong> — Attach events.<br>
  <strong>textContent / innerHTML</strong> — Change text/HTML.<br>
  <strong>createElement() / appendChild()</strong> — Create & add elements.<br>
  <strong>setInterval() / clearInterval()</strong> — Timed loops.<br>
  <strong>setTimeout()</strong> — Delay execution.<br>
  <strong>console.log()</strong> — Debug.<br>
  <strong>Math.random()</strong> — Random numbers.<br>
  <strong>for / while loops</strong> — Repetition.<br>
  <strong>if / else / switch</strong> — Conditionals.<br>
  <strong>let / const / var</strong> — Variables.<br>
  <strong>function name() {}</strong> — Functions.<br>
  <strong>Array / Object</strong> — Data storage.<br>
  <strong>Date()</strong> — Date/time.<br>
  <strong>JSON.parse / JSON.stringify</strong> — JSON.<br>
  <strong>events: click, load, mouseover, keyup...</strong> — Event handling.<br>
  <strong>DOM manipulation</strong> — Modify HTML dynamically.<br>
</div>

<div class="example">
<h3>JavaScript Example</h3>
<button id="clickMeBtn">Click Me!</button>
<div id="jsOutput">Output will appear here</div>
</div>

<!-- === INTERACTIVE EXAMPLES === -->
<h2>Interactive Examples</h2>
<div class="flex-container">
  <div class="flex-box">
    <h3>Change Text</h3>
    <input id="txtInput" placeholder="Type something">
    <button onclick="document.getElementById('txtOutput').textContent = document.getElementById('txtInput').value">Update</button>
    <div id="txtOutput">Your text will appear here</div>
  </div>
  <div class="flex-box">
    <h3>Random Color</h3>
    <button onclick="document.body.style.backgroundColor = '#' + Math.floor(Math.random()*16777215).toString(16)">Change Background</button>
  </div>
  <div class="flex-box">
    <h3>Countdown</h3>
    <button onclick="startCountdown()">Start</button>
    <div id="countdownOutput"></div>
  </div>
</div>

<script>
function toggleSection(id) {
  const section = document.getElementById(id);
  section.classList.toggle('hidden');
}

// JS Button example
const btn = document.getElementById('clickMeBtn');
const output = document.getElementById('jsOutput');
btn.addEventListener('click', () => {
  const now = new Date();
  output.textContent = 'Button clicked at ' + now.toLocaleTimeString();
  output.style.color = '#e74c3c';
  output.style.fontWeight = 'bold';
});

// Dynamic paragraph
const newPara = document.createElement('p');
newPara.textContent = "This paragraph was added dynamically via JavaScript!";
document.body.appendChild(newPara);

// Countdown example
function startCountdown() {
  let sec = 10;
  const cd = document.getElementById('countdownOutput');
  cd.textContent = sec;
  const interval = setInterval(() => {
    sec--;
    cd.textContent = sec;
    if(sec <= 0) clearInterval(interval);
  }, 1000);
}

// Live title timer
let count = 0;
setInterval(() => {
  count++;
  document.title = \`You've been here \${count} seconds\`;
}, 1000);
</script>

</body>
</html>`;




// --- Sliding Cube ---
sdk.templates['Sliding Cube'] = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>My Game</title>
<style>
body { background: black; color: lime; text-align: center; }
canvas { border: 1px solid lime; margin-top: 20px; }
</style>
</head>
<body>
<h1>Cube</h1>
<canvas id="gameCanvas"></canvas>
<script>
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 400; canvas.height = 200;
let x = 0;
function loop() {
  ctx.fillStyle = 'black'; ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = 'lime'; ctx.fillRect(x,80,40,40);
  x = (x+2) % canvas.width;
  requestAnimationFrame(loop);
}
loop();
</script>
</body>
</html>`;

// --- Bouncing Ball ---
sdk.templates['Bouncing Ball'] = `<!DOCTYPE html>
<html>
<body>
<h1>Bouncing Ball</h1>
<canvas id="c" width="400" height="200"></canvas>
<script>
const c = document.getElementById('c'); const ctx = c.getContext('2d');
let x=200,y=100,vx=2,vy=2,r=20;
function loop(){
  ctx.fillStyle='black'; ctx.fillRect(0,0,c.width,c.height);
  ctx.fillStyle='red'; ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill();
  x+=vx; y+=vy; if(x+r>c.width||x-r<0) vx*=-1; if(y+r>c.height||y-r<0) vy*=-1;
  requestAnimationFrame(loop);
}
loop();
</script>
</body>
</html>`;

// --- Kabby Lame Ahh ---
sdk.templates['Kabby Lame Ahh'] = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Kabby-lame Mechanism</title>
<style>
body { background: black; color: lime; text-align: center; font-family: monospace; }
canvas { border: 1px solid lime; margin-top: 20px; }
h1,h2 { margin: 10px 0; }
</style>
</head>
<body>
<h1>Kabby lame ahh</h1>
<h2>Made with the SDK</h2>
<canvas id="gameCanvas" width="400" height="200"></canvas>
<script>
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let angle = 0;
function drawKhabyGesture() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  const boxWidth=60, boxHeight=60, boxX=canvas.width/2-boxWidth/2, boxY=canvas.height/2-boxHeight/2;
  ctx.fillStyle='#4b2e2b'; ctx.fillRect(boxX,boxY,boxWidth,boxHeight);
  const orbitY = Math.sin(angle)*30, baseY = boxY + boxHeight/2, baseRadius = 15, scale = 1 + Math.cos(angle)*0.5;
  const leftX = boxX-80, leftY = baseY+orbitY, leftRadius = baseRadius*scale;
  ctx.beginPath(); ctx.arc(leftX,leftY,leftRadius,0,Math.PI*2); ctx.fillStyle='brown'; ctx.fill();
  const rightX = boxX+boxWidth+80, rightY = baseY+orbitY, rightRadius = baseRadius*scale;
  ctx.beginPath(); ctx.arc(rightX,rightY,rightRadius,0,Math.PI*2); ctx.fillStyle='brown'; ctx.fill();
  angle+=0.05; requestAnimationFrame(drawKhabyGesture);
}
drawKhabyGesture();
</script>
</body>
</html>`;

// --- 6-7 Meme ---
sdk.templates['6-7'] = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>6-7 Meme</title>
<style>
body { margin:0; background:#000; color:#fff; font-family:'Comic Sans MS', cursive,sans-serif; overflow:hidden; display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; }
h1 { font-size:5em; margin-bottom:20px; animation:pulse 1.5s infinite; }
.ball { width:100px; height:100px; background:radial-gradient(circle,#ff0,#f00); border-radius:50%; position:absolute; animation:bounce 2s infinite ease-in-out; }
.ball.left { left:30%; animation-delay:0s; }
.ball.right { right:30%; animation-delay:1s; }
@keyframes bounce { 0%,100%{ transform:translateY(0);} 50%{transform:translateY(-150px);} }
@keyframes pulse {0%,100%{transform:scale(1);}50%{transform:scale(1.1);} }
.caption { position:absolute; bottom:30px; font-size:1.5em; color:#ccc; }
</style>
</head>
<body>
<h1>6-7</h1>
<div class="ball left"></div>
<div class="ball right"></div>
<div class="caption">Mahdiisdumb: Here I don’t get it, why is it funny?</div>
</body>
</html>`;
// --- Animated Backgrounds ---
sdk.templates['Animated Gradient'] = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Animated Gradient Background</title>
<style>
body { margin:0; height:100vh; background: linear-gradient(270deg, #ff6ec4, #7873f5); background-size: 400% 400%; animation: gradientBG 10s ease infinite; }
@keyframes gradientBG { 0%{background-position:0% 50%;} 50%{background-position:100% 50%;} 100%{background-position:0% 50%;} }
h1 { color:#fff; text-align:center; padding-top:40vh; font-size:4em; text-shadow:0 0 10px #000; }
</style>
</head>
<body>
<h1>Nice Gradient!</h1>
</body>
</html>`;

// --- Typing Text Effect ---
sdk.templates['Typing Text'] = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<title>Typing Effect</title>
<style>
body { font-family: monospace; display:flex; justify-content:center; align-items:center; height:100vh; background:#222; color:#0f0; }
#typewriter { border-right: 2px solid #0f0; padding-right:5px; font-size:2em; }
</style>
</head>
<body>
<div id="typewriter"></div>
<script>
const text = "Welcome to SDSG SDK!";
let index = 0;
const element = document.getElementById('typewriter');
function type() { if(index <= text.length){ element.textContent = text.slice(0,index++); setTimeout(type,150); } }
type();
</script>
</body>
</html>`;

// --- Particle Explosion ---
sdk.templates['Particle Explosion'] = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<title>Particle Explosion</title>
<style>canvas{display:block;margin:0 auto;background:#000;}</style>
</head>
<body>
<canvas id="canvas" width="600" height="400"></canvas>
<script>
const c=document.getElementById('canvas');const ctx=c.getContext('2d');let particles=[];
function createParticles(x,y){for(let i=0;i<100;i++){particles.push({x,y,vx:(Math.random()-0.5)*6,vy:(Math.random()-0.5)*6,r:Math.random()*3+2})}}
canvas.addEventListener('click',e=>createParticles(e.offsetX,e.offsetY));
function loop(){ctx.fillStyle='rgba(0,0,0,0.2)';ctx.fillRect(0,0,c.width,c.height);
for(let p of particles){p.x+=p.vx;p.y+=p.vy;p.r*=0.95;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle='lime';ctx.fill();}
particles=particles.filter(p=>p.r>0.5);requestAnimationFrame(loop);}
loop();
</script>
</body>
</html>`;

// --- Click Counter Game ---
sdk.templates['Click Counter'] = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<title>Click Counter</title>
<style>body{text-align:center;font-family:sans-serif;margin-top:50px;} button{padding:20px;font-size:1.5em;}</style>
</head>
<body>
<h1>Click Counter</h1>
<button id="btn">Click Me!</button>
<p>Clicks: <span id="count">0</span></p>
<script>
let count=0; document.getElementById('btn').addEventListener('click',()=>{count++;document.getElementById('count').textContent=count;});
</script>
</body>
</html>`;

// --- Snake Game ---
sdk.templates['Snake Game Starter'] = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Snake Game Starter (Pause Enabled)</title>
<style>
  body {
    margin: 0;
    font-family: 'Arial', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #111;
    color: #0f0;
    height: 100vh;
  }
  canvas {
    background-color: #000;
    display: block;
    margin: 20px 0;
    border: 2px solid #0f0;
  }
  h1 {
    margin: 10px;
  }
  #score, #status {
    font-size: 1.2em;
  }
</style>
</head>
<body>
<h1>Snake Game</h1>
<div id="score">Score: 0</div>
<div id="status">Press SPACE to pause/resume</div>
<canvas id="gameCanvas" width="400" height="400"></canvas>

<script>
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const scale = 20;
const rows = canvas.height / scale;
const cols = canvas.width / scale;

let snake = [{x: 10*scale, y: 10*scale}];
let direction = {x: 1, y: 0};
let food = {};
let score = 0;
let paused = false;

// Place food in random location
function placeFood() {
  food.x = Math.floor(Math.random() * cols) * scale;
  food.y = Math.floor(Math.random() * rows) * scale;
}
placeFood();

// Handle arrow keys + pause (space)
window.addEventListener('keydown', e => {
  if(e.key === ' ') {
    paused = !paused;
    document.getElementById('status').textContent = paused ? 'PAUSED' : 'Press SPACE to pause/resume';
    return;
  }
  if(paused) return; // ignore other keys when paused
  switch(e.key) {
    case 'ArrowUp': if(direction.y===0){direction={x:0,y:-1}} break;
    case 'ArrowDown': if(direction.y===0){direction={x:0,y:1}} break;
    case 'ArrowLeft': if(direction.x===0){direction={x:-1,y:0}} break;
    case 'ArrowRight': if(direction.x===0){direction={x:1,y:0}} break;
  }
});

function draw() {
  if(paused) return;

  ctx.fillStyle = '#000';
  ctx.fillRect(0,0,canvas.width,canvas.height);

  ctx.fillStyle = '#f00';
  ctx.fillRect(food.x, food.y, scale, scale);

  const head = {x: snake[0].x + direction.x*scale, y: snake[0].y + direction.y*scale};

  if(head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || snake.some((s,i)=> i>0 && s.x===head.x && s.y===head.y)) {
    alert("Game Over! Score: " + score);
    snake = [{x: 10*scale, y: 10*scale}];
    direction = {x:1, y:0};
    score = 0;
    document.getElementById('score').textContent = score;
    placeFood();
    paused = false;
    document.getElementById('status').textContent = 'Press SPACE to pause/resume';
    return;
  }

  snake.unshift(head);

  if(head.x === food.x && head.y === food.y) {
    score++;
    document.getElementById('score').textContent = score;
    placeFood();
  } else {
    snake.pop();
  }

  ctx.fillStyle = '#0f0';
  snake.forEach(segment => ctx.fillRect(segment.x, segment.y, scale, scale));
}

setInterval(draw, 100);

// Dynamic paragraph for demonstration (optional)
const newPara = document.createElement('p');
newPara.textContent = "This paragraph was added dynamically via JavaScript!";
document.body.appendChild(newPara);
</script>
</body>
</html>

`;



// --- Bouncing Balls Playground ---
sdk.templates['Bouncing Balls'] = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<title>Bouncing Balls</title>
<style>canvas{display:block;margin:0 auto;background:#111;}</style>
</head>
<body>
<canvas id="canvas" width="500" height="300"></canvas>
<script>
const c=document.getElementById('canvas');const ctx=c.getContext('2d');
let balls=[];for(let i=0;i<10;i++){balls.push({x:Math.random()*500,y:Math.random()*300,vx:(Math.random()-0.5)*4,vy:(Math.random()-0.5)*4,r:15})}
function loop(){ctx.clearRect(0,0,500,300);balls.forEach(b=>{b.x+=b.vx;b.y+=b.vy;if(b.x+b.r>500||b.x-b.r<0)b.vx*=-1;if(b.y+b.r>300||b.y-b.r<0)b.vy*=-1;
ctx.beginPath();ctx.arc(b.x,b.y,b.r,0,Math.PI*2);ctx.fillStyle='yellow';ctx.fill();});requestAnimationFrame(loop);}
loop();
</script>
</body>
</html>`;

// --- Starfield Animation ---
sdk.templates['Starfield'] = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<title>Starfield</title>
<style>canvas{display:block;margin:0 auto;background:black;}</style>
</head>
<body>
<canvas id="canvas" width="600" height="400"></canvas>
<script>
const c=document.getElementById('canvas');const ctx=c.getContext('2d');let stars=[];
for(let i=0;i<200;i++){stars.push({x:Math.random()*600,y:Math.random()*400,z:Math.random()*1.5})}
function draw(){ctx.fillStyle='black';ctx.fillRect(0,0,600,400);stars.forEach(s=>{s.x-=s.z*2;if(s.x<0){s.x=600;s.y=Math.random()*400;s.z=Math.random()*1.5;}
ctx.fillStyle='white';ctx.fillRect(s.x,s.y,s.z*2,s.z*2);});requestAnimationFrame(draw);}
draw();
</script>
</body>
</html>`;

// --- Add more categories easily: typing games, mini RPGs, canvas experiments, physics demos, music visualizers, CSS tricks, interactive learning tools, etc. ---
// --- Digital Clock ---
sdk.templates['Digital Clock'] = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Digital Clock</title>
<style>
  body { background:#222; color:#0f0; font-family:monospace; display:flex; justify-content:center; align-items:center; height:100vh; }
  #clock { font-size:4em; }
</style>
</head>
<body>
<div id="clock"></div>
<script>
function updateClock() {
  const now = new Date();
  document.getElementById('clock').textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();
</script>
</body>
</html>`;

// --- Color Picker Demo ---
sdk.templates['Color Picker'] = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Color Picker</title>
<style>
  body { font-family: Arial; display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; background:#eee; }
  #output { margin-top:20px; font-size:1.2em; }
</style>
</head>
<body>
<input type="color" id="colorPicker">
<div id="output">Pick a color!</div>
<script>
const picker = document.getElementById('colorPicker');
const output = document.getElementById('output');
picker.addEventListener('input', e => {
  document.body.style.backgroundColor = e.target.value;
  output.textContent = 'Selected color: ' + e.target.value;
});
</script>
</body>
</html>`;

// --- Countdown Timer ---
sdk.templates['Countdown Timer'] = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Countdown Timer</title>
<style>
  body { font-family: Arial; display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; }
  #timer { font-size:3em; margin-bottom:10px; }
</style>
</head>
<body>
<div id="timer">10</div>
<button onclick="startCountdown()">Start Countdown</button>
<script>
function startCountdown() {
  let sec = 10;
  const timerEl = document.getElementById('timer');
  const interval = setInterval(() => {
    timerEl.textContent = sec;
    sec--;
    if(sec < 0) clearInterval(interval);
  }, 1000);
}
</script>
</body>
</html>`;

// --- Random Quote Generator ---
sdk.templates['Random Quote'] = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Random Quote</title>
<style>
  body { display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; font-family:Arial; background:#fafafa; }
  #quote { font-size:1.5em; margin:20px; text-align:center; max-width:400px; }
</style>
</head>
<body>
<div id="quote">Click the button to get a quote!</div>
<button id="newQuote">New Quote</button>
<script>
const quotes = [
  "The best way to predict the future is to invent it.",
  "Code is like humor. When you have to explain it, it’s bad.",
  "First, solve the problem. Then, write the code.",
  "Experience is the name everyone gives to their mistakes.",
  "Simplicity is the soul of efficiency."
];
document.getElementById('newQuote').addEventListener('click', () => {
  const q = quotes[Math.floor(Math.random()*quotes.length)];
  document.getElementById('quote').textContent = q;
});
</script>
</body>
</html>`;

// --- Simple To-Do List ---
sdk.templates['To-Do List'] = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Simple To-Do</title>
<style>
  body { font-family: Arial; display:flex; flex-direction:column; align-items:center; margin-top:50px; }
  input { padding:5px; margin-right:5px; }
  ul { list-style:none; padding:0; margin-top:20px; }
  li { padding:5px; background:#eee; margin:5px 0; border-radius:5px; cursor:pointer; }
  li:hover { background:#ddd; }
</style>
</head>
<body>
<input id="task" placeholder="Add new task"><button onclick="addTask()">Add</button>
<ul id="tasks"></ul>
<script>
function addTask() {
  const val = document.getElementById('task').value;
  if(!val) return;
  const li = document.createElement('li');
  li.textContent = val;
  li.onclick = () => li.remove();
  document.getElementById('tasks').appendChild(li);
  document.getElementById('task').value='';
}
</script>
</body>
</html>`;

// --- Simple Platformer (Canvas) ---
sdk.templates['Platformer Demo'] = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Platformer Demo</title>
<style>
  body { margin:0; background:#222; display:flex; justify-content:center; align-items:center; height:100vh; }
  canvas { background:#444; display:block; }
</style>
</head>
<body>
<canvas id="gameCanvas" width="400" height="300"></canvas>
<script>
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player = {x:50, y:250, w:20, h:20, vy:0, grounded:false};
let gravity = 0.7;
let keys = {};

document.addEventListener('keydown', e => keys[e.key] = true);
document.addEventListener('keyup', e => keys[e.key] = false);

function loop() {
  ctx.clearRect(0,0,canvas.width,canvas.height);

  // controls
  if(keys['ArrowLeft']) player.x -=3;
  if(keys['ArrowRight']) player.x +=3;
  if(keys['ArrowUp'] && player.grounded){ player.vy=-12; player.grounded=false; }

  // physics
  player.vy += gravity;
  player.y += player.vy;

  // ground collision
  if(player.y + player.h > canvas.height-20) {
    player.y = canvas.height-20-player.h;
    player.vy = 0;
    player.grounded = true;
  }

  // draw player
  ctx.fillStyle = 'lime';
  ctx.fillRect(player.x,player.y,player.w,player.h);

  // draw ground
  ctx.fillStyle = 'brown';
  ctx.fillRect(0,canvas.height-20,canvas.width,20);

  requestAnimationFrame(loop);
}
loop();
</script>
</body>
</html>`;
// --- Mini RPG Starter ---
sdk.templates['Mini RPG Starter'] = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Mini RPG</title>
<style>
body { font-family:monospace; background:#222; color:#0f0; display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; }
button { margin:5px; padding:10px; }
#log { width:300px; height:150px; overflow:auto; border:1px solid #0f0; padding:5px; margin-top:10px; background:#111; }
</style>
</head>
<body>
<h1>Mini RPG</h1>
<div>HP: <span id="hp">100</span></div>
<div>Enemy HP: <span id="enemyHp">50</span></div>
<button id="attackBtn">Attack</button>
<div id="log"></div>
<script>
let hp=100, enemyHp=50;
const log=document.getElementById('log');
document.getElementById('attackBtn').addEventListener('click', ()=>{
  const dmg=Math.floor(Math.random()*10)+1;
  enemyHp-=dmg; if(enemyHp<0) enemyHp=0;
  log.innerHTML+="You hit enemy for "+dmg+"<br>";
  document.getElementById('enemyHp').textContent=enemyHp;
  if(enemyHp===0){log.innerHTML+="Enemy defeated!<br>"; return;}
  const edmg=Math.floor(Math.random()*8)+1; hp-=edmg; if(hp<0) hp=0;
  log.innerHTML+="Enemy hits you for "+edmg+"<br>";
  document.getElementById('hp').textContent=hp;
  if(hp===0) log.innerHTML+="You were defeated!<br>";
  log.scrollTop=log.scrollHeight;
});
</script>
</body>
</html>`;

// --- Typing Game Starter ---
sdk.templates['Typing Game'] = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Typing Game</title>
<style>
body { font-family:monospace; display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; background:#111; color:#0f0; }
input { padding:10px; font-size:1.2em; margin-top:10px; }
#word { font-size:2em; margin-bottom:10px; }
</style>
</head>
<body>
<h1>Typing Game</h1>
<div id="word"></div>
<input id="input" placeholder="Type here">
<div>Score: <span id="score">0</span></div>
<script>
const words=["apple","banana","cherry","dragon","elephant","flower","guitar"];
let score=0;
let currentWord="";
function nextWord(){
  currentWord=words[Math.floor(Math.random()*words.length)];
  document.getElementById('word').textContent=currentWord;
}
document.getElementById('input').addEventListener('input', e=>{
  if(e.target.value===currentWord){
    score++; document.getElementById('score').textContent=score;
    e.target.value=''; nextWord();
  }
});
nextWord();
</script>
</body>
</html>`;

// --- Particle Fountain ---
sdk.templates['Particle Fountain'] = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Particle Fountain</title>
<style>
body { margin:0; overflow:hidden; background:#000; }
canvas { display:block; }
</style>
</head>
<body>
<canvas id="canvas"></canvas>
<script>
const c=document.getElementById('canvas'); const ctx=c.getContext('2d');
c.width=window.innerWidth; c.height=window.innerHeight;
let particles=[];
function addParticles(){
  for(let i=0;i<5;i++){
    particles.push({x:c.width/2,y:c.height, vx:(Math.random()-0.5)*4, vy:-Math.random()*5-2, r:Math.random()*3+2});
  }
}
function loop(){
  ctx.fillStyle='rgba(0,0,0,0.2)'; ctx.fillRect(0,0,c.width,c.height);
  addParticles();
  particles.forEach(p=>{p.x+=p.vx; p.y+=p.vy; p.r*=0.96; ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle='lime'; ctx.fill();});
  particles=particles.filter(p=>p.r>0.5);
  requestAnimationFrame(loop);
}
loop();
</script>
</body>
</html>`;

// --- Music Visualizer Starter ---
sdk.templates['Music Visualizer'] = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Music Visualizer</title>
<style>
body { margin:0; background:#000; display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; color:#fff; }
canvas { display:block; margin-top:20px; background:#111; }
</style>
</head>
<body>
<h1>Music Visualizer</h1>
<input type="file" id="fileInput" accept="audio/*">
<canvas id="canvas" width="600" height="200"></canvas>
<script>
const canvas=document.getElementById('canvas'); const ctx=canvas.getContext('2d');
const audioCtx=new (window.AudioContext||window.webkitAudioContext)();
let analyser, source, dataArray;
document.getElementById('fileInput').addEventListener('change', e=>{
  const file=e.target.files[0];
  const url=URL.createObjectURL(file);
  const audio=new Audio(url);
  audio.crossOrigin="anonymous"; audio.loop=true; audio.play();
  source=audioCtx.createMediaElementSource(audio);
  analyser=audioCtx.createAnalyser();
  source.connect(analyser); analyser.connect(audioCtx.destination);
  analyser.fftSize=64;
  dataArray=new Uint8Array(analyser.frequencyBinCount);
  draw();
});
function draw(){
  requestAnimationFrame(draw);
  if(!analyser) return;
  analyser.getByteFrequencyData(dataArray);
  ctx.fillStyle='#111'; ctx.fillRect(0,0,canvas.width,canvas.height);
  const barWidth=canvas.width/dataArray.length;
  dataArray.forEach((v,i)=>{
    ctx.fillStyle='lime';
    ctx.fillRect(i*barWidth,canvas.height-v,barWidth-2,v);
  });
}
</script>
</body>
</html>`;

// --- Maze Generator Demo ---
sdk.templates['Maze Generator'] = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Maze Generator</title>
<style>
body { background:#111; color:#0f0; display:flex; flex-direction:column; align-items:center; justify-content:center; font-family:monospace; }
canvas { margin-top:20px; border:1px solid #0f0; }
</style>
</head>
<body>
<h1>Maze Generator</h1>
<canvas id="canvas" width="400" height="400"></canvas>
<script>
const c=document.getElementById('canvas'); const ctx=c.getContext('2d');
const rows=20, cols=20, cell=20;
for(let r=0;r<rows;r++){
  for(let col=0;col<cols;col++){
    ctx.strokeStyle='#0f0'; ctx.strokeRect(col*cell,r*cell,cell,cell);
    if(Math.random()<0.3){ctx.fillStyle='#0f0'; ctx.fillRect(col*cell,r*cell,cell,cell);}
  }
}
</script>
</body>
</html>`;

// --- Simple Physics Sandbox ---
sdk.templates['Physics Sandbox'] = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Physics Sandbox</title>
<style>
body { margin:0; overflow:hidden; background:#111; }
canvas { display:block; }
</style>
</head>
<body>
<canvas id="canvas"></canvas>
<script>
const c=document.getElementById('canvas'); const ctx=c.getContext('2d');
c.width=window.innerWidth; c.height=window.innerHeight;
let balls=[];
for(let i=0;i<20;i++){
  balls.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:0,vy:0,r:Math.random()*20+10});
}
function loop(){
  ctx.fillStyle='rgba(0,0,0,0.2)'; ctx.fillRect(0,0,c.width,c.height);
  balls.forEach(b=>{
    b.vy+=0.2;
    b.x+=b.vx; b.y+=b.vy;
    if(b.y+b.r>c.height){b.y=c.height-b.r; b.vy*=-0.7;}
    ctx.beginPath(); ctx.arc(b.x,b.y,b.r,0,Math.PI*2); ctx.fillStyle='lime'; ctx.fill();
  });
  requestAnimationFrame(loop);
}
loop();
</script>
</body>
</html>`;

// --- Fireworks Simulation ---
sdk.templates['Fireworks'] = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Fireworks</title>
<style>
body { margin:0; overflow:hidden; background:#000; }
canvas { display:block; }
</style>
</head>
<body>
<canvas id="canvas"></canvas>
<script>
const c=document.getElementById('canvas'); const ctx=c.getContext('2d');
c.width=window.innerWidth; c.height=window.innerHeight;
let particles=[];
function createFirework(x,y){
  for(let i=0;i<50;i++){
    particles.push({x,y,vx:(Math.random()-0.5)*5,vy:(Math.random()-0.5)*5, r:Math.random()*2+1, alpha:1});
  }
}
c.addEventListener('click', e=>createFirework(e.clientX,e.clientY));
function loop(){
  ctx.fillStyle='rgba(0,0,0,0.2)'; ctx.fillRect(0,0,c.width,c.height);
  particles.forEach(p=>{
    p.x+=p.vx; p.y+=p.vy; p.alpha-=0.02;
    ctx.fillStyle='rgba(255,255,255,'+p.alpha+')';
    ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
  });
  particles=particles.filter(p=>p.alpha>0);
  requestAnimationFrame(loop);
}
loop();
</script>
</body>
</html>`;

// --- Infinite Runner Starter ---
sdk.templates['Infinite Runner'] = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Infinite Runner</title>
<style>
body { margin:0; background:#111; overflow:hidden; }
canvas { display:block; }
</style>
</head>
<body>
<canvas id="canvas" width="600" height="200"></canvas>
<script>
const c=document.getElementById('canvas'); const ctx=c.getContext('2d');
let player={x:50,y:150,w:20,h:20,vy:0,gravity:0.8,jump:12};
let obstacles=[]; let score=0;
document.addEventListener('keydown',e=>{if(e.key===' ') player.vy=-player.jump;});
function loop(){
  ctx.fillStyle='#111'; ctx.fillRect(0,0,c.width,c.height);
  player.vy+=player.gravity; player.y+=player.vy;
  if(player.y>180){player.y=180; player.vy=0;}
  ctx.fillStyle='lime'; ctx.fillRect(player.x,player.y,player.w,player.h);
  if(Math.random()<0.02) obstacles.push({x:c.width, y:180, w:20, h:20});
  obstacles.forEach(o=>{o.x-=5; ctx.fillStyle='red'; ctx.fillRect(o.x,o.y,o.w,o.h);});
  obstacles=obstacles.filter(o=>o.x+o.w>0);
  requestAnimationFrame(loop);
}
loop();
</script>
</body>
</html>`;

// --- 3D Cube (Canvas) ---
sdk.templates['3D Rotating Cube'] = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>3D Cube</title>
<style>body{margin:0;background:#000;display:flex;justify-content:center;align-items:center;height:100vh;}canvas{border:1px solid #0f0;}</style>
</head>
<body>
<canvas id="canvas" width="400" height="400"></canvas>
<script>
const c=document.getElementById('canvas'); const ctx=c.getContext('2d');
let angle=0;
function drawCube(){
  ctx.clearRect(0,0,400,400);
  ctx.save(); ctx.translate(200,200); ctx.rotate(angle);
  ctx.strokeStyle='lime'; ctx.strokeRect(-50,-50,100,100);
  ctx.restore(); angle+=0.01;
  requestAnimationFrame(drawCube);
}
drawCube();
</script>
</body>
</html>`;

// --- Add more as needed: typing games, mini RPGs, canvas experiments, physics demos, music visualizers, CSS tricks, interactive learning tools, etc. ---
// --- Rainbow Text Effect ---
sdk.templates['Rainbow Text'] = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Rainbow Text</title>
<style>
  body { display:flex; justify-content:center; align-items:center; height:100vh; background:#000; color:#fff; font-family:monospace; }
  h1 { font-size:4em; animation: rainbow 3s linear infinite; }
  @keyframes rainbow {
    0%{color:red;} 16%{color:orange;} 32%{color:yellow;} 48%{color:green;} 64%{color:blue;} 80%{color:indigo;} 100%{color:violet;}
  }
</style>
</head>
<body>
<h1>Rainbow Text!</h1>
</body>
</html>`;

// --- Simple Pong Game ---
sdk.templates['Pong Game'] = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Pong Game</title>
<style>
  body { display:flex; justify-content:center; align-items:center; height:100vh; background:#000; color:#fff; }
  canvas { border:2px solid #fff; }
</style>
</head>
<body>
<canvas id="pong" width="500" height="300"></canvas>
<script>
const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');
let ball = {x:250, y:150, vx:3, vy:3, r:10};
let paddleLeft = {x:10, y:120, w:10, h:60};
let paddleRight = {x:480, y:120, w:10, h:60};
let upArrow=false, downArrow=false;

document.addEventListener('keydown', e => {if(e.key==='ArrowUp') upArrow=true; if(e.key==='ArrowDown') downArrow=true;});
document.addEventListener('keyup', e => {if(e.key==='ArrowUp') upArrow=false; if(e.key==='ArrowDown') downArrow=false;});

function loop(){
  ctx.fillStyle='black'; ctx.fillRect(0,0,canvas.width,canvas.height);

  // Ball
  ball.x += ball.vx; ball.y += ball.vy;
  if(ball.y-ball.r<0 || ball.y+ball.r>canvas.height) ball.vy*=-1;
  if(ball.x-ball.r<0 || ball.x+ball.r>canvas.width) ball.vx*=-1;
  ctx.beginPath(); ctx.arc(ball.x,ball.y,ball.r,0,Math.PI*2); ctx.fillStyle='white'; ctx.fill();

  // Paddles
  if(upArrow && paddleRight.y>0) paddleRight.y-=5;
  if(downArrow && paddleRight.y+paddleRight.h<canvas.height) paddleRight.y+=5;
  ctx.fillStyle='white'; ctx.fillRect(paddleLeft.x,paddleLeft.y,paddleLeft.w,paddleLeft.h);
  ctx.fillRect(paddleRight.x,paddleRight.y,paddleRight.w,paddleRight.h);

  requestAnimationFrame(loop);
}
loop();
</script>
</body>
</html>`;

// --- Falling Snow Animation ---
sdk.templates['Snowfall'] = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Snowfall</title>
<style>
  body { margin:0; overflow:hidden; background:#001; }
  canvas { display:block; }
</style>
</head>
<body>
<canvas id="snow"></canvas>
<script>
const c=document.getElementById('snow'); const ctx=c.getContext('2d');
c.width=window.innerWidth; c.height=window.innerHeight;
let flakes=[];
for(let i=0;i<200;i++){flakes.push({x:Math.random()*c.width, y:Math.random()*c.height, r:Math.random()*4+1, d:Math.random()*1})}
function draw(){
  ctx.clearRect(0,0,c.width,c.height);
  ctx.fillStyle='white';
  flakes.forEach(f=>{ctx.beginPath(); ctx.arc(f.x,f.y,f.r,0,Math.PI*2); ctx.fill(); f.y+=f.d; if(f.y>c.height){f.y=0; f.x=Math.random()*c.width;}});
  requestAnimationFrame(draw);
}
draw();
</script>
</body>
</html>`;

// --- Colorful Bouncing Squares ---
sdk.templates['Bouncing Squares'] = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Bouncing Squares</title>
<style>
  body { margin:0; overflow:hidden; background:#111; }
  canvas { display:block; }
</style>
</head>
<body>
<canvas id="canvas"></canvas>
<script>
const c=document.getElementById('canvas'); const ctx=c.getContext('2d');
c.width=window.innerWidth; c.height=window.innerHeight;
let squares=[];
for(let i=0;i<30;i++){
  squares.push({x:Math.random()*c.width, y:Math.random()*c.height, vx:(Math.random()-0.5)*5, vy:(Math.random()-0.5)*5, size:Math.random()*30+10, color:'hsl('+Math.random()*360+',100%,50%)'});
}
function loop(){
  ctx.fillStyle='rgba(0,0,0,0.2)'; ctx.fillRect(0,0,c.width,c.height);
  squares.forEach(s=>{
    s.x+=s.vx; s.y+=s.vy;
    if(s.x<0 || s.x+s.size>c.width) s.vx*=-1;
    if(s.y<0 || s.y+s.size>c.height) s.vy*=-1;
    ctx.fillStyle=s.color; ctx.fillRect(s.x,s.y,s.size,s.size);
  });
  requestAnimationFrame(loop);
}
loop();
</script>
</body>
</html>`;

// --- Digital Counter with Buttons ---
sdk.templates['Incremental Counter'] = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Incremental Counter</title>
<style>
  body { font-family:Arial; display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; }
  button { padding:15px; margin:10px; font-size:1.2em; }
  #counter { font-size:2em; margin:10px; }
</style>
</head>
<body>
<div id="counter">0</div>
<button onclick="count++ ; document.getElementById('counter').textContent=count;">Increase</button>
<button onclick="count-- ; document.getElementById('counter').textContent=count;">Decrease</button>
<script>let count=0;</script>
</body>
</html>`;

sdk.templates['Parry'] = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Parry Test — HTML5 Mini-Game</title>
  <style>
    html,body{height:100%;margin:0;background:#111;color:#fff;font-family:system-ui,Segoe UI,Roboto,Arial}
    .wrap{display:flex;align-items:center;justify-content:center;height:100%;flex-direction:column}
    canvas{background:linear-gradient(#6aa,#2b6);border:6px solid #222;border-radius:10px;box-shadow:0 8px 30px rgba(0,0,0,.6)}
    .hud{margin-top:12px;display:flex;gap:18px;align-items:center}
    .hp{display:flex;gap:6px}
    .hp .heart{width:20px;height:20px;background:#e33;border-radius:4px;box-shadow:inset 0 -3px rgba(0,0,0,.2)}
    .hp .heart.empty{background:#451}
    .msg{font-size:14px;opacity:.9}
    .controls{margin-top:8px;font-size:13px;color:#ddd}
    button{margin-left:8px}
  </style>
</head>
<body>
  <div class="wrap">
    <canvas id="game" width="900" height="520"></canvas>
    <div class="hud">
      <div class="hp" id="hp"></div>
      <div class="score msg" id="score">Score: 0</div>
      <div class="msg">Parries heal 1 HP (max 3)</div>
      <div class="msg">Pink = parryable</div>
      <button id="restart">Restart</button>
    </div>
    <div class="controls">Move: ← →  •  Jump/Parry: Z (hold to jump higher, press midair to parry)</div>
  </div>

<script>
(() => {
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;

  const state = { running: true, score: 0, hp: 3, maxHp: 3, spawnTimer: 0, spawnInterval: 80, frames: 0 };
  const keys = {};
  addEventListener('keydown', e => { keys[e.key.toLowerCase()] = true; e.preventDefault && e.preventDefault(); });
  addEventListener('keyup', e => { keys[e.key.toLowerCase()] = false; });

  const player = { x: 120, y: H-120, w: 46, h: 64, vx: 0, vy: 0, speed: 3.6, onGround: false, jumped: false, parryActive: false, parryTimer: 0, parryDelay: 0, flash: 0 };
  const bullets = [];
  function spawnBullet(){
    const speed = 2.4 + Math.min(3, state.frames/1200);
    const y = H - 90 - Math.random()*220;
    const isPink = Math.random() < 0.45;
    bullets.push({x: W + 40, y, r: 14 + Math.random()*6, vx: - (speed + Math.random()*1.6), pink: isPink});
  }

  const hpEl = document.getElementById('hp');
  const scoreEl = document.getElementById('score');
  function updateHUD(){
    hpEl.innerHTML = '';
    for(let i=0;i<state.maxHp;i++){
      const div = document.createElement('div');
      div.className = 'heart' + (i < state.hp ? '' : ' empty');
      hpEl.appendChild(div);
    }
scoreEl.textContent = "Score: " + state.score;
  }
  updateHUD();

  document.getElementById('restart').addEventListener('click', ()=>{
    state.score = 0; state.hp = state.maxHp; bullets.length = 0; state.running = true; state.frames = 0; updateHUD();
    player.x = 120; player.y = H-120; player.vx = player.vy = 0; player.onGround = false; player.jumped = false; player.parryActive=false; player.parryTimer=0; player.flash=0;
    requestAnimationFrame(step);
  });

  function step(){
    if(!state.running) return;
    state.frames++;
    state.spawnTimer++;
    if(state.spawnTimer >= state.spawnInterval){ state.spawnTimer = 0; spawnBullet(); if(state.spawnInterval>35) state.spawnInterval *= 0.995; }

    let left = keys['arrowleft']; let right = keys['arrowright']; let jumpKey = keys['z'];

    if(left) player.vx = -player.speed;
    else if(right) player.vx = player.speed;
    else player.vx = 0;

    // Jump
    if(jumpKey && player.onGround && !player.jumped){
      player.vy = -10; // increased jump height
      player.onGround = false; player.jumped = true;
    }
    if(!player.onGround && jumpKey && player.vy < 0) player.vy -= 0.08;

    // Parry activation (mid-air)
    if(!player.onGround && !player.parryActive && player.parryTimer <= 0 && player.jumped && jumpKey){
      player.parryDelay = 6; player.parryTimer = 30;
    }
    if(player.parryDelay > 0){ player.parryDelay--; if(player.parryDelay === 0) player.parryActive = true; }
    if(player.parryActive){ player.parryTimer--; if(player.parryTimer <= 0) player.parryActive = false; }

    player.vy += 0.45; player.x += player.vx; player.y += player.vy;
    const ground = H - 64;
    if(player.y + player.h > ground){ player.y = ground - player.h; player.vy = 0; player.onGround = true; player.jumped = false; player.parryActive = false; player.parryDelay = 0; player.parryTimer = 0; }
    else player.onGround = false;
    if(player.x < 6) player.x = 6; if(player.x + player.w > W-6) player.x = W-6 - player.w;

    for(let i=bullets.length-1;i>=0;i--){
      const b = bullets[i]; b.x += b.vx;
      const px = player.x + player.w/2, py = player.y + player.h/2;
      const d = Math.hypot(b.x - px, b.y - py);
      if(d < b.r + 28){
        if(b.pink && player.parryActive){ bullets.splice(i,1); state.score += 10; state.hp = Math.min(state.maxHp, state.hp + 1); player.flash = 10; updateHUD(); continue; }
        else { bullets.splice(i,1); state.hp -= 1; player.flash = 30; updateHUD(); if(state.hp<=0){state.running=false;} continue; }
      }
      if(b.x < -40) bullets.splice(i,1);
    }

    draw(); if(state.running) requestAnimationFrame(step);
  }

  function draw(){
    ctx.clearRect(0,0,W,H);
    ctx.fillStyle = '#9fe'; ctx.fillRect(0,0,W,H/2);
    ctx.fillStyle = '#2b7'; ctx.fillRect(0,H-70,W,70);

    ctx.save();
    ctx.beginPath(); ctx.ellipse(player.x + player.w/2, player.y + player.h + 6, 28, 10, 0, 0, Math.PI*2); ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.fill();
    ctx.fillStyle = '#222'; ctx.fillRect(player.x, player.y, player.w, player.h);
    ctx.fillStyle = '#fff'; ctx.fillRect(player.x+10, player.y+14, 8, 8); ctx.fillRect(player.x+28, player.y+14, 8, 8);

    if(player.flash > 0){ ctx.globalAlpha = 0.5 + 0.5*Math.sin(Date.now()/50); ctx.strokeStyle = 'rgba(255,100,200,0.9)'; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(player.x + player.w/2, player.y + player.h/2, 70, 0, Math.PI*2); ctx.stroke(); ctx.globalAlpha = 1; player.flash--; }
    if(player.parryActive){ ctx.beginPath(); ctx.arc(player.x + player.w/2, player.y + player.h/2, 68, 0, Math.PI*2); ctx.strokeStyle = 'rgba(255,180,220,0.85)'; ctx.lineWidth = 6; ctx.stroke(); }
    ctx.restore();

    for(const b of bullets){
      ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI*2);
      if(b.pink){ const g = ctx.createRadialGradient(b.x-6,b.y-6,1,b.x,b.y,b.r*1.6); g.addColorStop(0,'#fff'); g.addColorStop(0.3,'#ffb6d8'); g.addColorStop(1,'#ff69b4'); ctx.fillStyle = g; ctx.fill(); ctx.lineWidth = 2; ctx.strokeStyle = '#7a0030'; ctx.stroke(); }
      else { ctx.fillStyle = '#444'; ctx.fill(); ctx.lineWidth = 2; ctx.strokeStyle = '#111'; ctx.stroke(); }
    }
  }

  requestAnimationFrame(step);
})();
</script>
</body>
</html>
`


// ==== Populate template dropdown ====
function updateTemplateDropdown() {
    const templateSelect = document.getElementById('templateSelect');
    if (!templateSelect) return;
    templateSelect.innerHTML = '';
    Object.keys(sdk.templates).forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        templateSelect.appendChild(option);
    });

    // Load first template by default
    if (templateSelect.value) sdk.loadTemplate(templateSelect.value);
}

// Wait until DOM is ready
document.addEventListener('DOMContentLoaded', updateTemplateDropdown);
