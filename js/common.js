// Common functionality for all pages

// Load footer from external file
function loadFooter() {
    // Get the current page path to determine the correct relative path
    const currentPath = window.location.pathname;
    const pathDepth = (currentPath.match(/\//g) || []).length - 1;
    
    // Determine the correct relative path to includes/footer.html
    let relativePath = 'includes/footer.html';
    if (pathDepth > 1) {
        relativePath = '../'.repeat(pathDepth - 1) + 'includes/footer.html';
    }
    
    // Try the main path first, then fallback to root-relative path
    fetch(relativePath)
        .then(response => {
            if (!response.ok) {
                // If the relative path fails, try from root
                return fetch('/poteking/includes/footer.html');
            }
            return response;
        })
        .then(response => {
            if (!response.ok) {
                // Final fallback - try without /poteking/
                return fetch('/includes/footer.html');
            }
            return response;
        })
        .then(response => response.text())
        .then(data => {
            const footerContainer = document.getElementById('footer-container');
            if (footerContainer) {
                footerContainer.innerHTML = data;
            }
        })
        .catch(error => {
            console.error('Error loading footer:', error);
            // Fallback: Create footer inline if fetch fails
            createInlineFooter();
        });
}

// Fallback function to create footer inline
function createInlineFooter() {
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = `
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h4>就職・転職まとめ＠面接対策</h4>
                    <p>就職・転職活動を成功に導く面接対策情報を提供。新卒就活から中途転職まで、内定獲得に必要な面接テクニック、ES対策、業界研究、自己分析方法を網羅した就活・転職支援サイト</p>
                </div>
                <div class="footer-section">
                    <h4>サイト情報</h4>
                    <ul>
                        <li><a href="privacy.html">プライバシーポリシー</a></li>
                        <li><a href="contact.html">お問い合わせ</a></li>
                        <li><a href="sitemap.html">サイトマップ</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>面接対策</h4>
                    <ul>
                        <li><a href="short-answers.html">短所回答</a></li>
                        <li><a href="motivation.html">志望動機</a></li>
                        <li><a href="reverse-questions.html">逆質問</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 就職・転職まとめ＠面接対策. All rights reserved.</p>
            </div>
        </div>
    </footer>`;
    }
}

// Initialize common components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadFooter();
});