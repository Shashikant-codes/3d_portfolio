// ===== Theme Toggle =====
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Persist theme
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
});

// ===== Live Time =====
function updateTime() {
    const now = new Date();
    const time = now.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Asia/Kolkata'
    });
    document.getElementById('liveTime').textContent = time + ' IST';
}
updateTime();
setInterval(updateTime, 1000);

// ===== View More Buttons =====
document.querySelectorAll('.view-more-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        const details = document.getElementById(targetId);

        if (details.classList.contains('open')) {
            details.classList.remove('open');
            btn.classList.remove('expanded');
            btn.innerHTML = 'View More <span class="chevron">›</span>';
        } else {
            details.classList.add('open');
            btn.classList.add('expanded');
            btn.innerHTML = 'View Less <span class="chevron">›</span>';
        }
    });
});

// ===== Scroll-based Fade In =====
const fadeElements = document.querySelectorAll('.section, .exp-entry, .project-entry, .tech-item, .edu-entry');
fadeElements.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

fadeElements.forEach(el => observer.observe(el));

// ===== Terminal Mode =====
const humanModeBtn = document.getElementById('humanMode');
const terminalModeBtn = document.getElementById('terminalMode');
const terminalOverlay = document.getElementById('terminalOverlay');
const terminalContent = document.getElementById('terminalContent');
const mainContent = document.querySelector('.content');

const terminalText = `<span class="t-heading"># Shashikant Chauhan</span>
<span class="t-muted">/ʃɑːʃiˈkɑːnt tʃɔːˈhɑːn/ · noun</span>

a **java full stack developer** and [software engineer](https://en.wikipedia.org/wiki/Software_engineering)
focused on building robust, scalable backend architectures and intuitive
digital experiences.

specializes in transforming complex requirements into clean, maintainable
code — from database schemas to pixel-perfect frontends.

---

<span class="t-heading">## EXPERIENCE</span>

<span class="t-heading">### Full Stack Developer</span>
<span class="t-muted">Java · Spring Boot · React</span>

Built and maintained enterprise-grade web applications using Spring Boot
microservices, React frontends, and PostgreSQL databases.

- Architected microservices handling 10K+ daily requests
- Implemented JWT-based auth and RBAC across services
- Set up CI/CD pipelines with GitHub Actions + Docker
- Led code reviews, mentored junior developers

<span class="t-heading">### Backend Engineer Intern</span>
<span class="t-muted">Java · Hibernate · MySQL</span>

Developed RESTful APIs and database-driven features for internal tools.

- Developed endpoints consumed by 3 internal frontends
- Optimized Hibernate queries, reducing DB load by 40%
- Created test suites with JUnit 5 — 85% coverage

---

<span class="t-heading">## PROJECTS</span>

<span class="t-heading">### Online Learning Platform</span> <span class="t-muted">// E-Learning App</span>
A full-stack platform with features like video streaming, course management,
and user authentication using robust REST APIs and scalable backend logic.
<span class="t-muted">[React] [Java] [Spring Boot] [MySQL]</span>
<span class="t-link">[source code ↗](https://github.com/Shashikant-codes/Online-learning-platform)</span>

<span class="t-heading">### CodeSphere</span> <span class="t-muted">// Online Code Editor</span>
A collaborative, browser-based IDE with real-time syntax highlighting,
WebSocket-powered live collaboration, and instant code execution.
<span class="t-muted">[React] [Node.js] [WebSockets] [Monaco Editor]</span>
<span class="t-link">[live demo ↗](#)</span>  <span class="t-link">[source code ↗](#)</span>

<span class="t-heading">### Transit Flow</span> <span class="t-muted">// Bus Booking System</span>
A scalable ticket reservation platform with dynamic seating arrays,
payment gateway integration, and user dashboards.
<span class="t-muted">[Java] [Spring Boot] [MySQL] [Thymeleaf]</span>
<span class="t-link">[live demo ↗](#)</span>  <span class="t-link">[source code ↗](#)</span>

---

<span class="t-heading">## TECH STACK</span>

Java · Spring Boot · React · Next.js · TypeScript · JavaScript
Node.js · PostgreSQL · MySQL · MongoDB · Docker · AWS · Git

---

<span class="t-heading">## GET IN TOUCH</span>

connect with me on <span class="t-link">[linkedin](https://linkedin.com/)</span>
or shoot an <span class="t-link">[email](mailto:shashikant@example.com)</span>

<span class="t-muted">// EOF</span>`;

terminalModeBtn.addEventListener('click', () => {
    humanModeBtn.classList.remove('active');
    terminalModeBtn.classList.add('active');
    terminalOverlay.classList.add('active');
    mainContent.style.visibility = 'hidden';
    terminalContent.innerHTML = terminalText;
    // Force dark theme in terminal mode
    html.setAttribute('data-theme', 'dark');
});

humanModeBtn.addEventListener('click', () => {
    terminalModeBtn.classList.remove('active');
    humanModeBtn.classList.add('active');
    terminalOverlay.classList.remove('active');
    mainContent.style.visibility = 'visible';
    // Restore saved theme
    const saved = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', saved);
});

// ===== Hero Photo - subtle parallax on mouse move =====
const heroPhoto = document.getElementById('heroPhoto');
const heroWrapper = document.getElementById('heroPhotoWrapper');
if (heroPhoto && heroWrapper) {
    heroWrapper.addEventListener('mousemove', (e) => {
        const rect = heroWrapper.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const moveX = ((e.clientX - centerX) / (rect.width / 2)) * 8;
        const moveY = ((e.clientY - centerY) / (rect.height / 2)) * 8;
        heroPhoto.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
    });
    heroWrapper.addEventListener('mouseleave', () => {
        heroPhoto.style.transform = `translate(0px, 0px) scale(1)`;
    });
}

// ===== Three.js Geometry on Hover =====
const canvas = document.getElementById('geometryCanvas');
if (canvas && typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    
    // Alpha true makes background transparent
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(450, 450);
    // Adjust scaling for high DPI displays
    renderer.setPixelRatio(window.devicePixelRatio);
    
    camera.position.z = 3.2;

    // Create cool tech-like geometric wireframes
    const geometry1 = new THREE.IcosahedronGeometry(1.6, 1);
    const material1 = new THREE.MeshBasicMaterial({ 
        color: 0x888888, 
        wireframe: true,
        transparent: true,
        opacity: 0.25
    });
    const mesh1 = new THREE.Mesh(geometry1, material1);
    
    const geometry2 = new THREE.IcosahedronGeometry(2.2, 0);
    const material2 = new THREE.MeshBasicMaterial({ 
        color: 0x888888, 
        wireframe: true,
        transparent: true,
        opacity: 0.15
    });
    const mesh2 = new THREE.Mesh(geometry2, material2);

    // Group to apply global rotation
    const group = new THREE.Group();
    group.add(mesh1);
    group.add(mesh2);
    scene.add(group);

    // Animation variables
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    if (heroWrapper) {
        heroWrapper.addEventListener('mousemove', (e) => {
            const rect = heroWrapper.getBoundingClientRect();
            mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        });
        heroWrapper.addEventListener('mouseleave', () => {
            mouseX = 0;
            mouseY = 0;
        });
    }

    function animateGeometry() {
        requestAnimationFrame(animateGeometry);
        
        // Dynamically match theme color
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const hexColor = isDark ? 0xffffff : 0x000000;
        material1.color.setHex(hexColor);
        material2.color.setHex(hexColor);

        // Constant automatic rotation
        mesh1.rotation.x += 0.002;
        mesh1.rotation.y += 0.003;
        mesh2.rotation.x -= 0.001;
        mesh2.rotation.y -= 0.0015;

        // Interactive mouse rotation tracking
        targetX = mouseY * 0.5;
        targetY = mouseX * 0.5;
        group.rotation.x += 0.05 * (targetX - group.rotation.x);
        group.rotation.y += 0.05 * (targetY - group.rotation.y);

        renderer.render(scene, camera);
    }
    
    animateGeometry();
}
