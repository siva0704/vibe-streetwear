// VIBE Streetwear - JavaScript with 3D Effects + TRAE Cursor Motion

document.addEventListener('DOMContentLoaded', () => {
    initScrollHeader();
    initSmoothScroll();
    initCountdownTimer();
    initScrollAnimations3D();
    initParallaxScroll();
    init3DCardTilt();
    initScrollProgress();
    initTraeCursorEffect(); // TRAE-style cursor effect
    initMagneticButtons();  // Magnetic button effect
    initVybeCanvas();       // TRAE-style text distortion canvas
});

// Header scroll effect
function initScrollHeader() {
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

// Smooth scroll for navigation links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Countdown timer for Limited Edition
function initCountdownTimer() {
    const now = new Date();
    const targetDate = new Date(now.getTime() + (2 * 24 * 60 * 60 * 1000) + (13 * 60 * 60 * 1000) + (22 * 60 * 1000));

    function updateCountdown() {
        const currentTime = new Date();
        const diff = targetDate - currentTime;

        if (diff <= 0) {
            document.getElementById('days').textContent = '00d';
            document.getElementById('hours').textContent = '00h';
            document.getElementById('minutes').textContent = '00m';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        document.getElementById('days').textContent = String(days).padStart(2, '0') + 'd';
        document.getElementById('hours').textContent = String(hours).padStart(2, '0') + 'h';
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0') + 'm';
    }

    updateCountdown();
    setInterval(updateCountdown, 60000);
}

// 3D Scroll-triggered animations
function initScrollAnimations3D() {
    const observerOptions = {
        root: null,
        rootMargin: '-50px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, index * 100);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.product-card').forEach((el, i) => {
        el.classList.add('scroll-reveal-3d');
        el.style.transitionDelay = `${i * 0.1}s`;
        observer.observe(el);
    });

    document.querySelectorAll('.collection-card').forEach((el, i) => {
        el.classList.add(i % 2 === 0 ? 'slide-in-left-3d' : 'slide-in-right-3d');
        observer.observe(el);
    });

    document.querySelectorAll('.challenge-card, .member-card, .style-challenge-card').forEach(el => {
        el.classList.add('pop-up-3d');
        observer.observe(el);
    });

    document.querySelectorAll('.inner-circle-card').forEach(el => {
        el.classList.add('scroll-reveal-3d');
        observer.observe(el);
    });

    document.querySelectorAll('.limited-product-card').forEach((el, i) => {
        el.classList.add('pop-up-3d');
        el.style.transitionDelay = `${i * 0.15}s`;
        observer.observe(el);
    });
}

// Parallax scroll effect
function initParallaxScroll() {
    const heroModel = document.querySelector('.hero-model');
    const heroCard = document.querySelector('.hero-card');
    const sections = document.querySelectorAll('section');

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const viewportHeight = window.innerHeight;

                if (heroModel && scrolled < viewportHeight) {
                    const rate = scrolled * 0.4;
                    heroModel.style.transform = `translateY(${rate}px) translateZ(${-rate * 0.5}px)`;
                }

                if (heroCard && scrolled < viewportHeight) {
                    const rotation = Math.min(scrolled * 0.01, 5);
                    heroCard.style.transform = `perspective(1000px) rotateX(${2 + rotation}deg) translateY(${scrolled * 0.1}px)`;
                }

                sections.forEach(section => {
                    const rect = section.getBoundingClientRect();
                    const sectionCenter = rect.top + rect.height / 2;
                    const windowCenter = viewportHeight / 2;
                    const distance = (sectionCenter - windowCenter) / viewportHeight;

                    if (Math.abs(distance) < 1) {
                        const tiltX = distance * 3;
                        section.style.transform = `perspective(1000px) rotateX(${tiltX}deg)`;
                    }
                });

                ticking = false;
            });
            ticking = true;
        }
    });
}

// 3D Card tilt on mouse move
function init3DCardTilt() {
    const cards = document.querySelectorAll('.product-card, .featured-product-card, .collection-card, .hero-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / centerY * -8;
            const rotateY = (x - centerX) / centerX * 8;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    const heroCard = document.querySelector('.hero-card');
    if (heroCard) {
        heroCard.addEventListener('mouseleave', () => {
            heroCard.style.transform = 'perspective(1000px) rotateX(2deg) rotateY(0deg)';
        });
    }
}

// Scroll progress indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.prepend(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.pageYOffset;
        const progress = scrolled / windowHeight;

        progressBar.style.transform = `scaleX(${progress})`;
    });
}

// ===== TRAE-STYLE CURSOR & DISCO EFFECT =====
function initTraeCursorEffect() {
    // Check if mobile
    const isMobile = window.innerWidth < 768;

    // Create border glow container
    const borderGlow = document.createElement('div');
    borderGlow.className = 'trae-border-glow';
    document.body.appendChild(borderGlow);

    // Create corner glows
    const corners = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
    corners.forEach(corner => {
        const cornerGlow = document.createElement('div');
        cornerGlow.className = `trae-corner-glow ${corner}`;
        borderGlow.appendChild(cornerGlow);
    });

    // Create cursor elements (Only create on desktop to save DOM weight on mobile)
    let spotlight, cursorDot, cursorRing;

    if (!isMobile) {
        spotlight = document.createElement('div');
        spotlight.className = 'trae-cursor-spotlight';
        document.body.appendChild(spotlight);

        cursorDot = document.createElement('div');
        cursorDot.className = 'trae-cursor-dot';
        document.body.appendChild(cursorDot);

        cursorRing = document.createElement('div');
        cursorRing.className = 'trae-cursor-ring';
        document.body.appendChild(cursorRing);
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let spotlightX = mouseX, spotlightY = mouseY;
    let dotX = mouseX, dotY = mouseY;
    let ringX = mouseX, ringY = mouseY;

    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        updateBorderGlow(mouseX, mouseY);
    });

    // Track touch movement (Mobile)
    document.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        mouseX = touch.clientX;
        mouseY = touch.clientY;
        updateBorderGlow(mouseX, mouseY);
    }, { passive: true });

    // Gyroscope tracking (Mobile Tilt)
    window.addEventListener('deviceorientation', (e) => {
        if (!e.gamma || !e.beta) return;

        const tiltX = (e.gamma / 45) * (window.innerWidth / 2);
        const tiltY = (e.beta / 45) * (window.innerHeight / 2);

        updateBorderGlow(window.innerWidth / 2 + tiltX, window.innerHeight / 2 + tiltY);
    });

    // Update border glow intensity
    function updateBorderGlow(x, y) {
        const width = window.innerWidth;
        const height = window.innerHeight;

        const distTop = y / height;
        const distBottom = (height - y) / height;
        const distLeft = x / width;
        const distRight = (width - x) / width;

        const topLeft = document.querySelector('.trae-corner-glow.top-left');
        const topRight = document.querySelector('.trae-corner-glow.top-right');
        const bottomLeft = document.querySelector('.trae-corner-glow.bottom-left');
        const bottomRight = document.querySelector('.trae-corner-glow.bottom-right');

        if (topLeft) topLeft.style.opacity = Math.max(0.3, 1 - Math.sqrt(distTop * distTop + distLeft * distLeft));
        if (topRight) topRight.style.opacity = Math.max(0.3, 1 - Math.sqrt(distTop * distTop + distRight * distRight));
        if (bottomLeft) bottomLeft.style.opacity = Math.max(0.3, 1 - Math.sqrt(distBottom * distBottom + distLeft * distLeft));
        if (bottomRight) bottomRight.style.opacity = Math.max(0.3, 1 - Math.sqrt(distBottom * distBottom + distRight * distRight));
    }

    // Animation loop
    function animate() {
        if (!isMobile && spotlight && cursorDot && cursorRing) {
            const spotlightSpeed = 0.08;
            spotlightX += (mouseX - spotlightX) * spotlightSpeed;
            spotlightY += (mouseY - spotlightY) * spotlightSpeed;
            spotlight.style.left = `${spotlightX}px`;
            spotlight.style.top = `${spotlightY}px`;

            const dotSpeed = 0.25;
            dotX += (mouseX - dotX) * dotSpeed;
            dotY += (mouseY - dotY) * dotSpeed;
            cursorDot.style.left = `${dotX}px`;
            cursorDot.style.top = `${dotY}px`;

            const ringSpeed = 0.12;
            ringX += (mouseX - ringX) * ringSpeed;
            ringY += (mouseY - ringY) * ringY; // Smoother trailing
            cursorRing.style.left = `${ringX}px`;
            cursorRing.style.top = `${ringY}px`;
        }

        requestAnimationFrame(animate);
    }

    animate();

    // Click/Touch interactions
    if (!isMobile) {
        const clickHandler = () => {
            cursorRing.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorDot.style.transform = 'translate(-50%, -50%) scale(0.8)';
            setTimeout(() => {
                cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 150);
        };

        document.addEventListener('mousedown', clickHandler);

        // Hover states
        const hoverElements = document.querySelectorAll('a, button, .product-card');
        hoverElements.forEach(el => {
            const enter = () => {
                cursorRing.classList.add('hover');
                cursorDot.classList.add('hover');
            };
            const leave = () => {
                cursorRing.classList.remove('hover');
                cursorDot.classList.remove('hover');
            };
            el.addEventListener('mouseenter', enter);
            el.addEventListener('mouseleave', leave);
        });
    }
}

// ===== MAGNETIC BUTTON EFFECT (Updated for Touch) =====
function initMagneticButtons() {
    const magneticElements = document.querySelectorAll('.btn-primary, .join-tribe-btn, .newsletter-btn, .add-to-cart-btn');

    // Helper to apply magnetic pull
    const applyMagnet = (el, clientX, clientY) => {
        const rect = el.getBoundingClientRect();
        const x = clientX - rect.left - rect.width / 2;
        const y = clientY - rect.top - rect.height / 2;
        const strength = 0.3;
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };

    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => applyMagnet(el, e.clientX, e.clientY));

        // Touch Magnetic Effect
        el.addEventListener('touchmove', (e) => {
            const touch = e.touches[0];
            applyMagnet(el, touch.clientX, touch.clientY);
        }, { passive: true });

        const reset = () => { el.style.transform = ''; };
        el.addEventListener('mouseleave', reset);
        el.addEventListener('touchend', reset);
    });
}

// Add to cart with 3D animation
document.addEventListener('click', (e) => {
    if (e.target.closest('.add-to-cart-btn') || e.target.closest('.add-cart-mini')) {
        const btn = e.target.closest('.add-to-cart-btn') || e.target.closest('.add-cart-mini');

        btn.style.transform = 'scale(1.3) translateZ(30px) rotateZ(10deg)';

        setTimeout(() => {
            btn.style.transform = '';
        }, 300);

        const cartBtn = document.querySelector('.cart-btn span');
        if (cartBtn) {
            const text = cartBtn.textContent;
            const match = text.match(/\d+/);
            const currentCount = match ? parseInt(match[0]) : 1;
            cartBtn.textContent = `${currentCount + 1} products`;

            const cartBtnEl = document.querySelector('.cart-btn');
            cartBtnEl.style.transform = 'translateY(-5px) translateZ(20px) scale(1.1)';
            setTimeout(() => {
                cartBtnEl.style.transform = '';
            }, 300);
        }
    }
});

// Intersection observer for section reveals
function initSectionReveals() {
    const sections = document.querySelectorAll('.shop-section, .story-section, .community-section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateZ(0)';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateZ(-50px)';
        observer.observe(section);
    });
}

setTimeout(initSectionReveals, 500);

// Newsletter form validation with 3D feedback
const emailInput = document.querySelector('.email-input-group input[type="email"]');
if (emailInput) {
    emailInput.addEventListener('focus', () => {
        const card = emailInput.closest('.inner-circle-card');
        if (card) {
            card.style.transform = 'perspective(1000px) rotateX(-2deg) translateZ(30px)';
        }
    });

    emailInput.addEventListener('blur', () => {
        const card = emailInput.closest('.inner-circle-card');
        if (card) {
            card.style.transform = '';
        }
    });

    emailInput.addEventListener('input', () => {
        const email = emailInput.value;
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        if (isValid) {
            emailInput.style.borderColor = '#2D8C7F';
            emailInput.style.boxShadow = '0 0 15px rgba(45, 140, 127, 0.3)';
        } else if (email.length > 0) {
            emailInput.style.borderColor = '#F47B6C';
            emailInput.style.boxShadow = '0 0 15px rgba(244, 123, 108, 0.3)';
        } else {
            emailInput.style.borderColor = '#E8E8E8';
            emailInput.style.boxShadow = 'none';
        }
    });
}

// Console welcome message
console.log('%c VIBE ', 'background: linear-gradient(135deg, #F47B6C, #F89A8E); color: white; font-size: 24px; font-weight: bold; padding: 10px 20px; border-radius: 10px; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);');
console.log('%c Own the Edge, Keep the Vibe ', 'color: #F47B6C; font-size: 14px; font-style: italic;');
console.log('%c TRAE Cursor Effect Enabled ✨ ', 'color: #2D8C7F; font-size: 12px;');

// ===== VIBE CANVAS TEXT DISTORTION (Laser Disco & Gyro Version) =====
function initVybeCanvas() {
    const canvas = document.getElementById('vybeCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let mouseX = 0, mouseY = 0;
    let isHovering = false;

    let particles = [];
    const text = 'VIBE';
    let hue = 0; // For disco color cycling

    // Gyroscope Permission logic
    const motionBtn = document.getElementById('enableMotionBtn');

    // Show button if iOS 13+ permission is needed
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        motionBtn.style.display = 'block';
        motionBtn.addEventListener('click', () => {
            DeviceOrientationEvent.requestPermission()
                .then(response => {
                    if (response === 'granted') {
                        motionBtn.style.display = 'none';
                        window.addEventListener('deviceorientation', handleGyro);
                    } else {
                        alert('Permission needed for VIBE effects!');
                    }
                })
                .catch(console.error);
        });
    } else {
        // Non-iOS or older devices usually allow by default
        window.addEventListener('deviceorientation', handleGyro);
    }

    function handleGyro(e) {
        if (!e.gamma || isHovering) return;
        const tilt = e.gamma / 2;
        mouseX = width / 2 + tilt * 8;
        mouseY = height / 2 + (e.beta - 45) * 5;
    }

    function resize() {
        width = canvas.offsetWidth;
        height = canvas.offsetHeight;
        canvas.width = width;
        canvas.height = height;
        createTextParticles();
    }

    function createTextParticles() {
        particles = [];
        // Reduce particle count significantly (10% density)
        // Previous gap was 6 or density 5/8. 
        // New gap: 15 (creates fewer, more spaced out particles for "laser grid" look)
        const gap = 15;

        const fontSize = Math.min(width * 0.3, height * 0.8);
        ctx.font = `900 ${fontSize}px Outfit, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const textWidth = ctx.measureText(text).width;
        ctx.fillStyle = '#F47B6C';
        ctx.fillText(text, width / 2, height / 2);

        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;

        for (let y = 0; y < height; y += gap) {
            for (let x = 0; x < width; x += gap) {
                const index = (y * width + x) * 4;
                const alpha = data[index + 3];

                if (alpha > 128) {
                    particles.push({
                        x: x, y: y,
                        originX: x, originY: y,
                        size: gap * 0.6, // Smaller dots
                        color: '#F47B6C',
                        vx: 0, vy: 0
                    });
                }
            }
        }
        ctx.clearRect(0, 0, width, height);
    }

    function distance(x1, y1, x2, y2) {
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Cycle hue for disco laser
        hue = (hue + 2) % 360; // Faster cycle for high energy
        const discoColor = `hsl(${hue}, 100%, 60%)`;

        const effectRadius = window.innerWidth < 768 ? 100 : 180; // Larger interaction radius
        const pushStrength = 40;

        // Draw Particles
        particles.forEach(p => {
            const dist = distance(mouseX, mouseY, p.originX, p.originY);

            if (isHovering && dist < effectRadius) {
                const angle = Math.atan2(p.originY - mouseY, p.originX - mouseX);
                const force = (effectRadius - dist) / effectRadius;

                // Add more randomness for "scattered laser" look
                p.x = p.originX + Math.cos(angle) * force * pushStrength + (Math.random() - 0.5) * 10;
                p.y = p.originY + Math.sin(angle) * force * pushStrength + (Math.random() - 0.5) * 10;

                p.color = discoColor;
            } else {
                // Spring back
                p.x += (p.originX - p.x) * 0.1;
                p.y += (p.originY - p.y) * 0.1;
                p.color = '#F47B6C';
            }

            // Draw rounded particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            ctx.closePath();
        });

        // === LASER CONNECTION EFFECT ===
        // Connect particles that are close to each other with lines
        // Only do this on hover or if Gyro is active (performance check)

        // Optimization: Only check a subset or nearby particles
        // For simplicity in this demo, we'll just connect active/moved particles to mouse

        if (isHovering) {
            ctx.beginPath();
            ctx.strokeStyle = `hsla(${hue}, 100%, 70%, 0.2)`;
            ctx.lineWidth = 1;

            particles.forEach(p => {
                const dist = distance(mouseX, mouseY, p.x, p.y);
                if (dist < 100) {
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouseX, mouseY);
                }
            });
            ctx.stroke();

            // Draw Laser Sweep scanline
            const time = Date.now() * 0.002;
            const scanY = (Math.sin(time) * 0.5 + 0.5) * height;

            ctx.fillStyle = `linear-gradient(90deg, transparent, hsla(${hue}, 100%, 80%, 0.8), transparent)`;
            ctx.fillRect(0, scanY - 2, width, 4);

            // Laser glow
            ctx.shadowBlur = 20;
            ctx.shadowColor = discoColor;
        } else {
            ctx.shadowBlur = 0;
        }

        requestAnimationFrame(animate);
    }

    // Interaction Events
    const updatePos = (x, y) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = x - rect.left;
        mouseY = y - rect.top;
        isHovering = true;
    };

    canvas.addEventListener('mousemove', e => updatePos(e.clientX, e.clientY));
    canvas.addEventListener('mouseleave', () => { isHovering = false; });

    // Touch
    canvas.addEventListener('touchmove', e => {
        e.preventDefault();
        const touch = e.touches[0];
        updatePos(touch.clientX, touch.clientY);
    }, { passive: false });

    canvas.addEventListener('touchend', () => { isHovering = false; });

    window.addEventListener('resize', resize);
    resize();
    animate();
}
