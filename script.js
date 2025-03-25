// Function to toggle the sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    sidebar.classList.toggle('active');
    content.classList.toggle('shift');
}

// Function to handle sidebar navigation
function setupSidebarNavigation() {
    // Handle main navigation links (top-level)
    document.querySelectorAll('#sidebar > ul > li > a').forEach(mainLink => {
        mainLink.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const parentLi = this.parentElement;
            const subMenu = parentLi.querySelector('.sub-menu');
            
            // If it's a parent item with sub-menu
            if (subMenu) {
                // Only prevent default for # links
                if (href === '#' || href === '#projects' || href === '#resume' || href === '#skills') {
                    e.preventDefault();
                    subMenu.style.display = subMenu.style.display === 'block' ? 'none' : 'block';
                }
                return;
            }
            
            // For regular links without sub-menus
            toggleSidebar();
            
            // Handle anchor links
            if (href.startsWith('#') && href !== '#') {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    setTimeout(() => {
                        targetSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, 300);
                }
            }
        });
    });

    // Handle sub-menu item clicks
    document.querySelectorAll('#sidebar .sub-menu a').forEach(subLink => {
        subLink.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Close sidebar first
            toggleSidebar();
            
            // Handle anchor links after a small delay
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    setTimeout(() => {
                        targetSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, 300);
                }
            }
        });
    });
}

// Close sidebar when clicking outside
document.addEventListener('click', function(e) {
    const sidebar = document.getElementById('sidebar');
    const hamburger = document.querySelector('.hamburger');
    if (sidebar && hamburger) {
        if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
            sidebar.classList.remove('active');
            document.getElementById('content').classList.remove('shift');
        }
    }
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupSidebarNavigation();
    
    // Remove animation from education items if they exist
    const educationItems = document.querySelectorAll('.education-item');
    if (educationItems) {
        educationItems.forEach(item => {
            item.style.animation = 'none';
            item.style.opacity = '1';
        });
    }
});