// Loading Animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loading');
    setTimeout(() => {
        loader.style.display = 'none';
    }, 1000);
});

// Dark Mode Toggle
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const body = document.body;

// Check for saved dark mode preference
const darkMode = localStorage.getItem('darkMode');
if (darkMode === 'enabled') {
    body.classList.add('dark-mode');
}

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', null);
    }
});

// Skill Bars Animation
const skillBars = document.querySelectorAll('.skill-per');
const animateSkillBars = () => {
    skillBars.forEach(skill => {
        const percentage = skill.dataset.percentage;
        skill.style.width = percentage + '%';
    });
};

// Intersection Observer for Skill Bars
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

skillBars.forEach(bar => observer.observe(bar));

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animation on Scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(element => observer.observe(element));
};

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
});

// Hover Effects for Cards
document.querySelectorAll('.section').forEach(section => {
    section.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    section.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Dynamic Year in Footer
document.querySelector('.footer p').innerHTML = 
    `© ${new Date().getFullYear()} Weerapol chansawang. All rights reserved.`;

// Typing Animation for Header
const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    element.innerHTML = '';
    
    const typing = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(typing);
        }
    }, speed);
};

// Initialize typing animation
const headerTitle = document.querySelector('.glowing-text');
if (headerTitle) {
    typeWriter(headerTitle, headerTitle.textContent);
}

// Parallax Effect
window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(window.pageYOffset * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Form Validation (if you have forms)
const validateForm = (form) => {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });

    return isValid;
};


// Error Handling
window.onerror = function(msg, url, lineNo, columnNo, error) {
    console.error('Error: ', msg, '\nURL: ', url, '\nLine: ', lineNo, '\nColumn: ', columnNo, '\nError object: ', error);
    return false;
};

// Performance Optimization
document.addEventListener('DOMContentLoaded', () => {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// แก้ไข JavaScript สำหรับการย่อขยาย
document.querySelectorAll('.section-header').forEach((header, index) => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        const toggleBtn = header.querySelector('.toggle-btn');
        
        // Toggle active states
        header.classList.toggle('active');
        header.classList.toggle('collapsed');
        toggleBtn.classList.toggle('active');
        
        // Calculate proper height for animation
        const contentHeight = content.scrollHeight;
        
        // Toggle content with smooth animation
        if (content.classList.contains('collapsed')) {
            // Expanding
            content.classList.remove('collapsed');
            content.style.maxHeight = contentHeight + 'px';
            
            // Animate children
            content.querySelectorAll(':scope > *').forEach((child, i) => {
                child.style.animation = `slideDown 0.3s ease-out ${i * 0.1}s forwards`;
            });
        } else {
            // Collapsing
            content.classList.add('collapsed');
            content.style.maxHeight = '0';
            
            // Reset animations
            content.querySelectorAll(':scope > *').forEach(child => {
                child.style.animation = '';
            });
        }
        
        // Save state to localStorage
        localStorage.setItem(`section-${index}`, !content.classList.contains('collapsed'));
    });
});

// Load collapsed state with smooth animation
const loadCollapsedState = () => {
    document.querySelectorAll('.section-content').forEach((content, index) => {
        const isExpanded = localStorage.getItem(`section-${index}`) === 'true';
        const header = content.previousElementSibling;
        const toggleBtn = header.querySelector('.toggle-btn');
        
        if (!isExpanded) {
            content.classList.add('collapsed');
            header.classList.add('collapsed');
            toggleBtn.classList.add('active');
            content.style.maxHeight = '0';
        } else {
            content.style.maxHeight = content.scrollHeight + 'px';
            
            // Animate children
            content.querySelectorAll(':scope > *').forEach((child, i) => {
                child.style.animation = `slideDown 0.3s ease-out ${i * 0.1}s forwards`;
            });
        }
    });
};

// Initialize with smooth loading
document.addEventListener('DOMContentLoaded', () => {
    // Add initial transition delay
    document.querySelectorAll('.section-content').forEach(content => {
        content.style.transition = 'all 0s';
        setTimeout(() => {
            content.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        }, 100);
    });
    
    loadCollapsedState();
});

// Handle window resize
window.addEventListener('resize', () => {
    document.querySelectorAll('.section-content:not(.collapsed)').forEach(content => {
        content.style.maxHeight = content.scrollHeight + 'px';
    });
});

function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // สุ่มตำแหน่งเริ่มต้น
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        
        // สุ่มขนาด
        const size = Math.random() * 5 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // สุ่มความเร็ว animation
        particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// เรียกใช้ฟังก์ชันเมื่อหน้าเว็บโหลดเสร็จ
document.addEventListener('DOMContentLoaded', createParticles);