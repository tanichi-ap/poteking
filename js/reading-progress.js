// Reading progress bar functionality
document.addEventListener('DOMContentLoaded', function() {
    const progressBar = document.getElementById('reading-progress');
    const article = document.querySelector('.article-content');
    
    if (progressBar && article) {
        function updateReadingProgress() {
            const articleHeight = article.offsetHeight;
            const articleTop = article.offsetTop;
            const scrollTop = window.pageYOffset;
            const windowHeight = window.innerHeight;
            
            // Calculate how much of the article has been scrolled through
            const scrolled = scrollTop + windowHeight - articleTop;
            const progress = Math.min(Math.max(scrolled / articleHeight, 0), 1);
            
            progressBar.style.width = (progress * 100) + '%';
        }
        
        window.addEventListener('scroll', updateReadingProgress);
        updateReadingProgress(); // Initial call
    }
    
    // Table of contents smooth scrolling
    const tocLinks = document.querySelectorAll('.toc-list a');
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Highlight the clicked TOC item
                tocLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Auto-highlight TOC items based on scroll position
    function highlightCurrentSection() {
        const sections = document.querySelectorAll('[id]');
        const headerHeight = document.querySelector('.header').offsetHeight;
        const scrollPosition = window.pageYOffset + headerHeight + 100;
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.id;
            }
        });
        
        // Update TOC highlighting
        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightCurrentSection);
    highlightCurrentSection(); // Initial call
    
    // Social share functionality
    const shareButtons = document.querySelectorAll('.share-btn');
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const url = window.location.href;
            const title = document.title;
            const text = document.querySelector('meta[name="description"]').content;
            
            if (this.classList.contains('twitter')) {
                const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
                window.open(twitterUrl, '_blank', 'width=600,height=400');
            } else if (this.classList.contains('facebook')) {
                const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                window.open(facebookUrl, '_blank', 'width=600,height=400');
            } else if (this.classList.contains('line')) {
                const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`;
                window.open(lineUrl, '_blank', 'width=600,height=400');
            } else if (this.classList.contains('copy')) {
                // Copy URL to clipboard
                navigator.clipboard.writeText(url).then(function() {
                    // Show copy success message
                    const originalText = button.textContent;
                    button.textContent = 'コピー済み';
                    button.style.background = '#28a745';
                    
                    setTimeout(() => {
                        button.textContent = originalText;
                        button.style.background = '#6c757d';
                    }, 2000);
                }).catch(function(err) {
                    console.error('Could not copy text: ', err);
                });
            }
        });
    });
    
    // Checklist functionality
    const checkboxes = document.querySelectorAll('.checklist input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const checkedCount = document.querySelectorAll('.checklist input[type="checkbox"]:checked').length;
            const totalCount = checkboxes.length;
            
            if (checkedCount === totalCount) {
                // Show completion message
                showCompletionMessage();
            }
            
            // Save state to localStorage
            localStorage.setItem(`checkbox-${this.id}`, this.checked);
        });
        
        // Restore state from localStorage
        const saved = localStorage.getItem(`checkbox-${checkbox.id}`);
        if (saved === 'true') {
            checkbox.checked = true;
        }
    });
    
    function showCompletionMessage() {
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #068200;
            color: white;
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 10000;
            text-align: center;
            max-width: 400px;
        `;
        
        message.innerHTML = `
            <h3 style="margin-bottom: 1rem;">🎉 完了しました！</h3>
            <p>すべてのチェック項目を確認されました。<br>面接準備は万全ですね！</p>
            <button onclick="this.parentElement.remove()" style="
                background: white;
                color: #068200;
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 5px;
                margin-top: 1rem;
                cursor: pointer;
                font-weight: 600;
            ">閉じる</button>
        `;
        
        document.body.appendChild(message);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (message.parentElement) {
                message.remove();
            }
        }, 5000);
    }
    
    // Lazy loading for images
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
    
    // Reading time estimation
    function estimateReadingTime() {
        const article = document.querySelector('.article-content');
        if (!article) return;
        
        const text = article.textContent || article.innerText;
        const wordsPerMinute = 400; // Average reading speed for Japanese
        const words = text.length;
        const minutes = Math.ceil(words / wordsPerMinute);
        
        const readingTimeElement = document.querySelector('.reading-time span');
        if (readingTimeElement) {
            readingTimeElement.textContent = `読了目安：${minutes}分`;
        }
    }
    
    estimateReadingTime();
    
    // Word count estimation
    function updateWordCount() {
        const article = document.querySelector('.article-content');
        if (!article) return;
        
        const text = article.textContent || article.innerText;
        const wordCount = text.length;
        
        const wordCountElement = document.querySelector('.word-count span');
        if (wordCountElement) {
            wordCountElement.textContent = `約${wordCount.toLocaleString()}文字`;
        }
    }
    
    updateWordCount();
    
    // Smooth reveal animations for content sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe content sections for animations
    const contentSections = document.querySelectorAll('.content-section, .example-card, .method-card');
    contentSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        sectionObserver.observe(section);
    });
    
    // Back to top functionality
    function addBackToTop() {
        const backToTopButton = document.createElement('button');
        backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backToTopButton.style.cssText = `
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
        
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        document.body.appendChild(backToTopButton);
        
        // Show/hide based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.style.opacity = '1';
                backToTopButton.style.visibility = 'visible';
            } else {
                backToTopButton.style.opacity = '0';
                backToTopButton.style.visibility = 'hidden';
            }
        });
    }
    
    addBackToTop();
    
});

// Add CSS for active TOC items
const style = document.createElement('style');
style.textContent = `
    .toc-list a.active {
        background: #e8f5e8;
        padding-left: 1rem;
        font-weight: 600;
        color: #068200;
    }
    
    .content-section {
        scroll-margin-top: 100px;
    }
    
    @media print {
        .header, .sidebar, .social-share, .reading-progress {
            display: none !important;
        }
        
        .main-content {
            grid-template-columns: 1fr !important;
        }
        
        .article {
            box-shadow: none !important;
            padding: 1rem !important;
        }
    }
`;
document.head.appendChild(style);