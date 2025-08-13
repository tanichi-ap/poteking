// Navigation toggle for mobile
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navList = navMenu.querySelector('.nav-list');

    navToggle.addEventListener('click', function() {
        navList.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', function() {
            navList.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Tab functionality for industry guide
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    // Function to activate a specific tab
    function activateTab(tabName) {
        const targetButton = document.querySelector(`.tab-button[data-tab="${tabName}"]`);
        const targetContent = document.getElementById(tabName);
        
        if (targetButton && targetContent) {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to the target tab
            targetButton.classList.add('active');
            targetContent.classList.add('active');
            return true;
        }
        return false;
    }

    // Check URL hash for industry tab on page load and hash change
    function checkHashForIndustryTab() {
        const hash = window.location.hash;
        if (hash.startsWith('#industry-guide-')) {
            const tabName = hash.replace('#industry-guide-', '');
            if (activateTab(tabName)) {
                // Scroll to industry guide section
                const industrySection = document.getElementById('industry-guide');
                if (industrySection) {
                    setTimeout(() => {
                        industrySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                }
            }
        }
    }

    // Check on page load
    checkHashForIndustryTab();
    
    // Check on hash change
    window.addEventListener('hashchange', checkHashForIndustryTab);

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Update URL hash when tab is clicked
            history.replaceState(null, null, '#industry-guide-' + targetTab);
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    // Observe all cards for animation
    document.querySelectorAll('.card, .site-card, .school-card, .resource-card').forEach(card => {
        card.style.animationPlayState = 'paused';
        observer.observe(card);
    });

    // Add loading animation to cards
    const cards = document.querySelectorAll('.card, .site-card, .school-card, .resource-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Header scroll effect
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Add transition to header
    header.style.transition = 'transform 0.3s ease-in-out';
});

// Function to navigate to specific pages
function navigateToPage(page) {
    // Check if page exists, otherwise show coming soon message
    const pages = [
        'self-introduction.html',
        'motivation.html',
        'student-achievements.html',
        'strengths-skills.html',
        'short-answers.html',
        'reverse-questions.html',
        'weakness-perfectionism.html',
        'weakness-concentration.html',
        'weakness-worry.html',
        'weakness-public-speaking.html',
        'weakness-indecisive.html',
        'weakness-impatient.html',
        'weakness-competitive.html',
        'weakness-meddlesome.html',
        'it-newgrad.html',
        'it-career.html',
        'it-internet.html',
        'it-communication.html',
        'it-cloud.html',
        'it-software.html',
        'it-network.html',
        'it-security.html',
        'media-broadcasting.html',
        'media-newspaper.html',
        'media-advertising.html',
        'media-publishing.html',
        'media-internet.html',
        'media-film.html',
        'media-animation.html',
        'media-production.html',
        'trading-general.html',
        'trading-textile.html',
        'trading-it.html',
        'trading-food.html',
        'trading-machinery.html',
        'trading-chemicals.html',
        'ai-es-writing.html',
        'ai-application-form.html',
        'ai-interview-prep.html',
        'ai-email-response.html',
        'ai-self-analysis.html',
        'ai-company-research.html',
        'ai-resume-optimization.html',
        'ai-portfolio-creation.html',
        'ai-networking.html',
        'ai-salary-negotiation.html',
        'ai-career-planning.html',
        'banking-megabank.html',
        'banking-regional.html',
        'banking-foreign.html',
        'banking-online.html',
        'banking-investment.html',
        'banking-insurance.html',
        'interview-qa.html',
        'self-analysis.html',
        'interview-practice.html',
        'interview-mindset.html',
        'manufacturing-automotive.html',
        'manufacturing-electronics.html',
        'manufacturing-chemicals.html',
        'manufacturing-steel.html',
        'manufacturing-machinery.html',
        'manufacturing-food.html',
        'manufacturing-pharmaceutical.html',
        'manufacturing-cosmetics.html',
        'consulting-strategy.html',
        'consulting-big4.html',
        'consulting-it.html',
        'consulting-thinktank.html',
        'consulting-business.html',
        'consulting-boutique.html',
        'infrastructure-transport.html',
        'infrastructure-railway.html',
        'infrastructure-aviation.html',
        'infrastructure-energy.html',
        'infrastructure-gas.html',
        'fmcg-consumer.html',
        'fmcg-food.html',
        'fmcg-cosmetics.html',
        'fmcg-household.html',
        'fmcg-furniture.html',
        'fmcg-apparel.html',
        'real-estate-construction.html',
        'real-estate-developer.html',
        'general-contractor.html',
        'housing-manufacturer.html',
        'real-estate-brokerage.html',
        'construction-materials.html',
        'logistics-transport.html',
        'shipping-logistics.html',
        'air-cargo.html',
        'trucking-transport.html',
        'warehouse-3pl.html',
        'delivery-lastmile.html',
        'rail-freight.html',
        'government-publicsector.html',
        'government-national.html',
        'government-local.html',
        'government-public-corporation.html',
        'government-infrastructure.html',
        'government-education.html',
        'ec-retail-service.html',
        'ec-platform.html',
        'retail-furniture.html',
        'retail-gms.html',
        'retail-apparel.html',
        'service-food.html',
        'service-entertainment.html',
        'retail-convenience.html',
        'hospitality-travel-hotel.html',
        'travel-tourism.html',
        'hotel-lodging.html',
        'theme-park-leisure.html',
        'airline-transportation.html',
        'restaurant-dining.html',
        'wedding-event.html',
        'agriculture-primary-industry.html'
    ];

    if (pages.includes(page)) {
        window.location.href = page;
    } else {
        showComingSoon();
    }
}

// Show coming soon modal
function showComingSoon() {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 15px;
        text-align: center;
        max-width: 400px;
        margin: 0 20px;
    `;

    modalContent.innerHTML = `
        <h3 style="color: #2c3e50; margin-bottom: 1rem;">準備中</h3>
        <p style="color: #666; margin-bottom: 1.5rem;">このページは現在準備中です。<br>しばらくお待ちください。</p>
        <button onclick="this.closest('.modal').remove()" style="
            background: #068200;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-weight: 600;
        ">閉じる</button>
    `;

    modal.className = 'modal';
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Add scroll-to-top button
function addScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #068200;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 18px;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;

    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    document.body.appendChild(scrollBtn);

    // Show/hide scroll button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
}

// Initialize scroll-to-top button
document.addEventListener('DOMContentLoaded', addScrollToTop);

// Add search functionality
function addSearchFunctionality() {
    const searchContainer = document.createElement('div');
    searchContainer.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 999;
    `;

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = '検索...';
    searchInput.style.cssText = `
        padding: 8px 12px;
        border: 2px solid #068200;
        border-radius: 20px;
        outline: none;
        font-size: 14px;
        width: 200px;
        transition: all 0.3s ease;
    `;

    searchInput.addEventListener('focus', function() {
        this.style.width = '250px';
    });

    searchInput.addEventListener('blur', function() {
        this.style.width = '200px';
    });

    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            searchContent(this.value);
        }
    });

    searchContainer.appendChild(searchInput);
    document.body.appendChild(searchContainer);
}

// Search functionality
function searchContent(query) {
    if (!query.trim()) return;

    const sections = document.querySelectorAll('section');
    let found = false;

    sections.forEach(section => {
        const text = section.textContent.toLowerCase();
        if (text.includes(query.toLowerCase())) {
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            found = true;
            return;
        }
    });

    if (!found) {
        alert('検索結果が見つかりませんでした。');
    }
}

// Add search functionality when page loads
document.addEventListener('DOMContentLoaded', function() {
    if (window.innerWidth > 768) {
        addSearchFunctionality();
    }
});

// Performance optimization: Lazy loading for images
function lazyLoadImages() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Add click tracking for analytics (if needed)
function trackClicks() {
    document.querySelectorAll('a, button, .card').forEach(element => {
        element.addEventListener('click', function() {
            const elementType = this.tagName.toLowerCase();
            const elementText = this.textContent.trim().substring(0, 50);
            
            // Here you can add analytics tracking
            console.log(`Clicked: ${elementType} - ${elementText}`);
        });
    });
}

// Initialize click tracking
document.addEventListener('DOMContentLoaded', trackClicks);