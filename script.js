/**
 * Mubeen Shaik - Portfolio Interactive Script
 * Features:
 * - Dynamic Role Typing Effect
 * - Theme Switcher (Dark/Light) with persistence
 * - Interactive Spring Boot REST API Simulator
 * - Interactive Skills Category Filtering
 * - Project Architecture Modal Viewers
 * - Clipboard Copying with Toast Notification
 * - Working Form Handler & Smooth Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTypingEffect();
  initMobileMenu();
  initSkillsFilter();
  initTerminalSimulator();
  initProjectModals();
  initClipboardCopy();
  initContactForm();
  initScrollEffects();
});

/* ===================================================================
   1. Theme Switcher (Dark / Light)
   =================================================================== */
function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const htmlEl = document.documentElement;
  
  // Check stored theme or default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  htmlEl.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlEl.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlEl.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      showToast(`Switched to ${newTheme} mode`);
    });
  }
}

/* ===================================================================
   2. Dynamic Typing Effect for Roles
   =================================================================== */
function initTypingEffect() {
  const typedEl = document.getElementById('typedRole');
  if (!typedEl) return;

  const roles = [
    'Software Developer Intern',
    'Java Full Stack Developer',
    'Spring Boot Specialist',
    'REST API & Microservices Developer',
    'PostgreSQL & MySQL Database Tuner',
    'Problem Solver & Backend Engineer'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 70;
  const deleteSpeed = 35;
  const pauseEnd = 1600;

  function type() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
      typedEl.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedEl.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      setTimeout(() => { isDeleting = true; type(); }, pauseEnd);
      return;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(type, 350);
      return;
    }

    setTimeout(type, isDeleting ? deleteSpeed : typeSpeed);
  }

  type();
}

/* ===================================================================
   3. Mobile Navigation Menu
   =================================================================== */
function initMobileMenu() {
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });

    // Close on link click
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
      });
    });
  }
}

/* ===================================================================
   4. Skills Matrix Filtering
   =================================================================== */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillItems = document.querySelectorAll('.skill-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      skillItems.forEach(item => {
        const itemCategories = item.getAttribute('data-category') || '';
        if (filterVal === 'all' || itemCategories.includes(filterVal)) {
          item.style.display = 'flex';
          setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'translateY(0)'; }, 20);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(10px)';
          setTimeout(() => { item.style.display = 'none'; }, 200);
        }
      });
    });
  });
}

/* ===================================================================
   5. Interactive Spring Boot API Simulator
   =================================================================== */
function initTerminalSimulator() {
  const terminalScreen = document.getElementById('terminalScreen');
  const terminalInput = document.getElementById('terminalInput');
  const executeBtn = document.getElementById('executeCurlBtn');
  const clearBtn = document.getElementById('clearTerminalBtn');
  const shortcutBtns = document.querySelectorAll('.api-btn');

  const apiResponses = {
    '/api/v1/profile': {
      status: 200,
      data: {
        candidateName: "Mubeen Shaik",
        title: "Software Developer Intern | Java Full Stack Developer",
        education: "B.Tech in Computer Science & Engineering (2022-2025)",
        institution: "Khaja Bandanawaz University, Kalaburgi",
        location: "Bangalore, Karnataka, India",
        email: "mdmubeenmubeen740@gmail.com",
        phone: "+91-8867046434",
        gitHub: "https://github.com/mubeenshaik740/projects",
        linkedIn: "https://linkedin.com/in/mubeen-shaik-a02717275",
        status: "Available for full-time employment"
      }
    },
    '/api/v1/skills/backend': {
      status: 200,
      data: {
        languages: ["Java (Core & Advanced)", "SQL", "Python"],
        frameworks: ["Spring Core", "Spring MVC", "Spring Boot", "Hibernate JPA", "Spring Security"],
        backendTechnologies: ["JDBC", "RESTful APIs", "Microservices"],
        databases: ["MySQL", "PostgreSQL", "Database Management"],
        frontend: ["HTML", "CSS", "JavaScript"],
        toolsAndPractices: ["Git / Version Control", "Agile", "Linux / Unix", "JUnit", "Postman", "Maven"],
        coreConcepts: ["OOP", "Data Structures & Algorithms", "Problem Solving", "Multithreading", "Exception Handling", "Design Patterns", "Collections Framework"]
      }
    },
    '/api/v1/projects/flight-system': {
      status: 200,
      data: {
        projectId: "FLIGHT-RES-01",
        title: "Flight Reservation Management System",
        techStack: ["Java", "Spring Boot", "MySQL", "Hibernate", "JPA", "REST API"],
        metrics: {
          endpoints: "20+ RESTful APIs",
          normalizedTables: "6+ entities (Flights, Bookings, Passengers, Payments)",
          performanceGain: "35% faster booking retrieval via JPA tuning",
          validationSuccess: "90% reduction in invalid booking entries",
          consistency: "100% transactional data consistency"
        },
        security: "Transactional Isolation, Concurrency Checks"
      }
    },
    '/api/v1/projects/hospital-system': {
      status: 200,
      data: {
        projectId: "HMS-HEALTH-02",
        title: "Hospital Management System",
        techStack: ["Java", "Spring Boot", "PostgreSQL", "Hibernate", "JPA", "Spring Security"],
        metrics: {
          endpoints: "25+ REST endpoints",
          rbacRoles: ["Admin", "Doctor", "Receptionist", "Patient"],
          latencyImprovement: "40% reduction in query response time with PostgreSQL indexing",
          features: "Appointment Scheduling, Patient History, Medical Records, Automated Billing Generation"
        }
      }
    },
    '/api/v1/certifications': {
      status: 200,
      data: [
        {
          credential: "Internship Completion Certificate (Software Development)",
          authority: "Cognifyz IT Solutions Pvt. Ltd.",
          topics: ["Spring Boot", "REST APIs", "Layered Architecture", "JUnit Unit Testing", "Postman", "Git"]
        },
        {
          credential: "QuizOff 2026 — India's Biggest AI Quiz",
          authority: "Unstop & CampusCrew",
          topics: ["Artificial Intelligence", "Algorithmic Problem Solving", "National Technical Assessment"]
        },
        {
          credential: "Java Full Stack Development",
          authority: "JSpider",
          topics: ["Core Java", "Advanced Java", "Spring Boot", "Hibernate JPA", "SQL", "REST APIs", "Microservices"]
        },
        {
          credential: "Claude AI 101",
          authority: "Anthropic",
          topics: ["LLM Fundamentals", "Prompt Engineering", "Linguistic & AI Evaluation"]
        }
      ]
    },
    '/api/v1/hire-status': {
      status: 200,
      data: {
        availability: "IMMEDIATELY AVAILABLE",
        preferredRoles: ["Software Developer Intern", "Java Developer", "Spring Boot Backend Engineer", "Java Full Stack Developer"],
        workPreference: "Remote / Hybrid / On-Site",
        relocationReady: true,
        contactMessage: "Reach out at mdmubeenmubeen740@gmail.com or +91-8867046434"
      }
    }
  };

  function runRequest(endpoint) {
    if (!endpoint) return;
    const cleanEndpoint = endpoint.trim().replace(/^curl\s+(-X\s+GET\s+)?/i, '').trim();

    // Echo command in terminal
    const cmdLine = document.createElement('div');
    cmdLine.className = 'terminal-line command';
    cmdLine.innerHTML = `<span class="prompt">$</span> curl -X GET http://localhost:8080${cleanEndpoint.startsWith('/') ? cleanEndpoint : '/' + cleanEndpoint}`;
    terminalScreen.appendChild(cmdLine);

    // Lookup response
    setTimeout(() => {
      const resp = apiResponses[cleanEndpoint] || apiResponses['/' + cleanEndpoint];

      const statusLine = document.createElement('div');
      const respBody = document.createElement('div');
      respBody.className = 'terminal-line json-response';

      if (resp) {
        statusLine.className = 'terminal-line status-200';
        statusLine.textContent = `HTTP/1.1 200 OK - Content-Type: application/json; charset=UTF-8`;
        respBody.textContent = JSON.stringify(resp.data, null, 2);
      } else {
        statusLine.className = 'terminal-line';
        statusLine.style.color = '#ef4444';
        statusLine.textContent = `HTTP/1.1 404 NOT_FOUND - Resource [${cleanEndpoint}] not mapped`;
        respBody.textContent = JSON.stringify({
          timestamp: new Date().toISOString(),
          status: 404,
          error: "Not Found",
          message: `Endpoint ${cleanEndpoint} not registered. Try clicking the shortcuts above!`,
          availableRoutes: Object.keys(apiResponses)
        }, null, 2);
      }

      terminalScreen.appendChild(statusLine);
      terminalScreen.appendChild(respBody);
      terminalScreen.scrollTop = terminalScreen.scrollHeight;
    }, 180);
  }

  // Button clicks
  shortcutBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const ep = btn.getAttribute('data-endpoint');
      terminalInput.value = ep;
      runRequest(ep);
    });
  });

  if (executeBtn && terminalInput) {
    executeBtn.addEventListener('click', () => {
      runRequest(terminalInput.value || '/api/v1/profile');
    });

    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        runRequest(terminalInput.value || '/api/v1/profile');
      }
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      terminalScreen.innerHTML = `
        <div class="terminal-line welcome">
          <span class="prompt">$</span> Terminal cleared. Ready for next HTTP request...
        </div>
      `;
    });
  }
}

/* ===================================================================
   6. Project Architecture Details Modal
   =================================================================== */
function initProjectModals() {
  const modal = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const closeBtn = document.getElementById('closeModalBtn');
  const closeActionBtn = document.getElementById('modalCloseAction');
  const openBtns = document.querySelectorAll('.open-modal-btn');

  const projectDetails = {
    flight: {
      title: "Flight Reservation System — Architecture & Deep Dive",
      html: `
        <h4>1. Architectural Blueprint</h4>
        <p>Built using strict multi-tier Spring Boot architecture:</p>
        <pre>Client (HTTP) ──&gt; FlightController / BookingController 
                 ──&gt; Service Layer (Business Validations &amp; Concurrency Checks) 
                 ──&gt; Spring Data JPA Repositories 
                 ──&gt; MySQL Database (InnoDB Engine, ACID Transactions)</pre>

        <h4>2. Key Backend Features</h4>
        <ul>
          <li><strong>20+ REST Endpoints:</strong> Covers flight scheduling, seat inventory, passenger manifests, payment verification, and automated cancellation refunds.</li>
          <li><strong>Relational Data Model:</strong> 6+ entities (<code>Flight</code>, <code>Passenger</code>, <code>Booking</code>, <code>Seat</code>, <code>Payment</code>, <code>User</code>) with normalized 3NF schema and cascading JPA mappings.</li>
          <li><strong>Seat Concurrency Management:</strong> Real-time checks prevent double booking during peak transaction windows.</li>
          <li><strong>Performance Optimization:</strong> Strategic JPA query tuning and indexed flight lookups reduced query latency by <strong>35%</strong>.</li>
        </ul>

        <h4>3. Testing &amp; Validation</h4>
        <ul>
          <li>Comprehensive Postman collections covering edge cases (e.g. invalid payment tokens, overbooked flights).</li>
          <li>Global exception handling via <code>@ControllerAdvice</code> returning standardized RFC 7807 error responses.</li>
        </ul>
      `
    },
    hospital: {
      title: "Hospital Management System — Architecture & Security",
      html: `
        <h4>1. System Architecture &amp; RBAC</h4>
        <p>Enterprise healthcare backend designed for strict HIPAA/compliance data isolation:</p>
        <pre>User Request ──&gt; Spring Security Filter Chain (RBAC Authorization)
             ──&gt; Role-Gated Controllers (/admin/**, /doctor/**, /patient/**)
             ──&gt; Layered Medical Services (@Transactional)
             ──&gt; PostgreSQL with B-Tree Indexing</pre>

        <h4>2. Core Capabilities</h4>
        <ul>
          <li><strong>25+ REST Endpoints:</strong> Full patient registry, doctor schedule assignment, appointment slots, clinical notes, and billing calculation.</li>
          <li><strong>Granular Role Security:</strong> Four isolated privilege tiers:
            <ul>
              <li><code>ADMIN:</code> Full clinic system configuration &amp; staff onboarding</li>
              <li><code>DOCTOR:</code> Consultation notes, prescription dispatch, schedule view</li>
              <li><code>RECEPTIONIST:</code> Patient intake, slot bookings, billing generation</li>
              <li><code>PATIENT:</code> Self-service appointment history &amp; bill retrieval</li>
            </ul>
          </li>
          <li><strong>PostgreSQL Query Tuning:</strong> Built composite indexes on high-traffic appointment queries, reducing execution times by up to <strong>40%</strong>.</li>
          <li><strong>Data Integrity:</strong> Robust multi-table transactional boundaries ensuring billing records never desynchronize.</li>
        </ul>
      `
    },
    task: {
      title: "Task Management & Algorithmic Engine — Deep Dive",
      html: `
        <h4>1. OOP &amp; Algorithmic Architecture</h4>
        <p>Engineered to demonstrate clean design patterns and advanced Java Collections performance:</p>
        <ul>
          <li><strong>Priority Task Scheduler:</strong> Custom scheduler utilizing Java PriorityQueue and ConcurrentHashMap for fast O(1) task retrieval and O(log N) priority dispatch.</li>
          <li><strong>State Machine Pattern:</strong> Clean encapsulation of task lifecycles (<code>PENDING</code>, <code>IN_PROGRESS</code>, <code>COMPLETED</code>, <code>BLOCKED</code>).</li>
          <li><strong>Algorithmic Modules:</strong> Matrix numerical pattern processors, temperature formula converter matrices, and mathematical algorithms.</li>
          <li><strong>Clean Code Principles:</strong> Adherence to SOLID principles, defensive copying, and immutable object patterns.</li>
        </ul>
      `
    }
  };

  function openModal(projectKey) {
    const data = projectDetails[projectKey];
    if (!data) return;
    modalTitle.textContent = data.title;
    modalBody.innerHTML = data.html;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-project');
      openModal(key);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (closeActionBtn) closeActionBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
}

/* ===================================================================
   7. Clipboard Copy with Toast Feedback
   =================================================================== */
function initClipboardCopy() {
  const copyTriggers = document.querySelectorAll('.copy-trigger');

  copyTriggers.forEach(el => {
    el.addEventListener('click', () => {
      const textToCopy = el.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied to clipboard: ${textToCopy}`);
      }).catch(() => {
        showToast(`Selected: ${textToCopy}`);
      });
    });
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('active');

  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.classList.remove('active');
  }, 3200);
}

/* ===================================================================
   8. Contact Form Handling
   =================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !subject || !message) {
      feedback.className = 'form-feedback error';
      feedback.textContent = 'Please fill out all required fields.';
      return;
    }

    // Prepare mailto link
    const mailtoUri = `mailto:mdmubeenmubeen740@gmail.com?subject=${encodeURIComponent('[Portfolio] ' + subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\nMessage:\n${message}`)}`;
    
    feedback.className = 'form-feedback success';
    feedback.innerHTML = `Thank you, <strong>${name}</strong>! Your message has been prepared. <a href="${mailtoUri}" style="color: #34d399; font-weight: bold; text-decoration: underline;" target="_blank">Click here to launch email client</a> or check your default mail app.`;

    // Attempt to open email client
    window.location.href = mailtoUri;

    // Reset form after a few moments
    setTimeout(() => {
      form.reset();
    }, 4000);
  });
}

/* ===================================================================
   9. Scroll Effects (Back to Top & Nav Active Spy)
   =================================================================== */
function initScrollEffects() {
  const backToTopBtn = document.getElementById('backToTop');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // Show/hide Back to Top button
    if (backToTopBtn) {
      if (scrollPos > 400) {
        backToTopBtn.classList.add('active');
      } else {
        backToTopBtn.classList.remove('active');
      }
    }

    // Scroll Spy for Navbar Links
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
