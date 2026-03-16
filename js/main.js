import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Scene Setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0f0c29);
scene.fog = new THREE.FogExp2(0x0f0c29, 0.03);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(4, 3, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 3;
controls.maxDistance = 10;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.5;

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7);
directionalLight.castShadow = true;
scene.add(directionalLight);

const pointLight1 = new THREE.PointLight(0xa8edea, 0.8, 20);
pointLight1.position.set(-5, 3, -5);
scene.add(pointLight1);

// Resume Data - EDIT THIS SECTION WITH YOUR INFO
const resumeData = [
    {
        title: "Professional Summary",
        color: "#FF6B6B",
        content: `<strong>Certifications:</strong> AWS Cloud Practitioner, Azure AI Fundamentals, Aviatrix Multicloud Network Associate<br><br>
<strong>Technical Stack:</strong> Java, Python, C/C++, Verilog-HDL, Data Structures, Embedded Systems, Machine Learning<br><br>
<strong>Expertise:</strong> AI-driven applications, IoT automation, hardware-software co-design (ESP32, Arduino, Cadence), data pipelines (Pandas, Scikit-learn, Streamlit)<br><br>
<strong>Objective:</strong> Seeking internship/entry-level role to build scalable cloud-AI-embedded systems and drive product innovation`
    },
    {
        title: "Education",
        color: "#4ECDC4",
        content: "B.Tech – Electronics & Communication Engineering (2023-2027)<br>KL University<br>CGPA: 9.59/10"
    },
    {
        title: "Technical Skills",
        color: "#45B7D1",
        content: `<strong>Programming & Scripting:</strong> C, C++, Java, Python, MATLAB, Verilog-HDL, SystemVerilog, SQL (MySQL), Assembly (8051/8086)<br><br>
<strong>Hardware & Embedded:</strong> ESP32, Arduino, 8051 MCU, 8086 µP, Sensors (IR, ultrasonic, load-cell, DHT11/22, PIR), Actuators, Blynk IoT<br><br>
<strong>Cloud / AI / Data:</strong> AWS Cloud Practitioner, Azure AI Fundamentals, Aviatrix Multicloud Networking, Machine-Learning (Scikit-learn, Pandas, NumPy), Data Visualization (Matplotlib, Seaborn, Streamlit)<br><br>
<strong>EDA / Simulation:</strong> Cadence Virtuoso, Cadence Genus, ModelSim, Xilinx Vivado, Spectre, LTSpice, Multisim, Proteus<br><br>
<strong>Tools & Platforms:</strong> Git, GitHub, ServiceNow (Fundamentals & Workflow Automation), Linux (Ubuntu), Windows<br><br>
<strong>Verification & Testing:</strong> Test-bench development, waveform debugging, timing analysis, functional verification`
    },
    {
        title: "Projects",
        color: "#96CEB4",
        content: "<strong>PayGrade AI</strong> – Income prediction system<br><strong>SmartAI Traffic</strong> – Traffic optimization"
    },
    {
        title: "Experience",
        color: "#FFEAA7",
        content: "<strong>AI Intern – Edunet Foundation</strong><br>June 2025 – August 2025<br>• Developed ML models"
    },
    {
        title: "Achievements",
        color: "#DDA0DD",
        content: "<strong>SuperCoder</strong> – 450+ DSA problems<br><strong>2nd Place</strong> – DevRush Hackathon"
    }
];

// Create Textures
function createTextTexture(data, index) {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createLinearGradient(0, 0, 1024, 1024);
    gradient.addColorStop(0, data.color);
    gradient.addColorStop(1, shadeColor(data.color, -20));
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1024, 1024);

    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 20;
    ctx.strokeRect(20, 20, 984, 984);

    ctx.fillStyle = 'white';
    ctx.font = 'bold 80px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    
    const words = data.title.split(' ');
    let line = '';
    let y = 300;
    
    for(let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > 900 && n > 0) {
            ctx.fillText(line, 512, y);
            line = words[n] + ' ';
            y += 100;
        } else {
            line = testLine;
        }
    }
    ctx.fillText(line, 512, y);

    ctx.font = '200px Arial';
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.fillText((index + 1).toString(), 512, 700);

    ctx.font = '40px Arial';
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.fillText('Click to view details', 512, 900);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
}

function shadeColor(color, percent) {
    const num = parseInt(color.replace("#",""),16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
}

// Create Cube
const geometry = new THREE.BoxGeometry(2.5, 2.5, 2.5);
const materials = resumeData.map((data, index) => {
    return new THREE.MeshStandardMaterial({
        map: createTextTexture(data, index),
        roughness: 0.3,
        metalness: 0.1,
    });
});

const cube = new THREE.Mesh(geometry, materials);
cube.castShadow = true;
cube.receiveShadow = true;
scene.add(cube);

// Particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 1000;
const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 20;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    color: 0xa8edea,
    transparent: true,
    opacity: 0.6
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Interaction
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let isModalOpen = false;

function onMouseClick(event) {
    if (isModalOpen) return;
    if (event.target.closest('#detail-modal') || event.target.closest('.close-btn')) return;

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(cube);

    if (intersects.length > 0) {
        const faceIndex = Math.floor(intersects[0].faceIndex / 2);
        showModal(faceIndex);
    }
}

function onMouseMove(event) {
    if (isModalOpen) return;
    
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(cube);

    if (intersects.length > 0) {
        document.body.style.cursor = 'pointer';
        controls.autoRotate = false;
    } else {
        document.body.style.cursor = 'default';
        controls.autoRotate = true;
    }
}

window.addEventListener('pointerdown', onMouseClick);
window.addEventListener('pointermove', onMouseMove);

// Modal Functions
function showModal(index) {
    isModalOpen = true;
    const modal = document.getElementById('detail-modal');
    const title = document.getElementById('modal-title');
    const content = document.getElementById('modal-content');
    
    title.textContent = resumeData[index].title;
    content.innerHTML = resumeData[index].content;
    
    modal.classList.add('active');
    controls.enabled = false;
    document.body.style.cursor = 'default';
}

function closeModal() {
    isModalOpen = false;
    const modal = document.getElementById('detail-modal');
    modal.classList.remove('active');
    controls.enabled = true;
    controls.autoRotate = true;
}

document.getElementById('close-btn').addEventListener('click', function(e) {
    e.stopPropagation();
    closeModal();
});

document.getElementById('detail-modal').addEventListener('click', function(event) {
    if (event.target === this) {
        closeModal();
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && isModalOpen) {
        closeModal();
    }
});

// Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Hide loading
setTimeout(() => {
    const loading = document.getElementById('loading');
    if (!loading) return;

    loading.classList.add('hidden');

    // Ensure the loader doesn't block interaction even if CSS is cached/old
    setTimeout(() => {
        loading.style.display = 'none';
    }, 400);
}, 1000);

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    particlesMesh.rotation.y += 0.001;
    particlesMesh.rotation.x += 0.0005;
    controls.update();
    renderer.render(scene, camera);
}

animate();