document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.main-nav a');
    
    const currentPath = window.location.pathname;
    
    function pathContains(fullPath, checkPath) {
        if (checkPath === '/index.html' || checkPath === '/') {
            return fullPath === '/' || fullPath === '/index.html';
        }
        const cleanPath = fullPath.split('?')[0].split('#')[0];
        return cleanPath === checkPath || cleanPath.includes(checkPath);
    }
    
    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (pathContains(currentPath, linkPath)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    if (!document.querySelector('.main-nav a.active')) {
        const currentPathSegments = currentPath.split('/').filter(Boolean);
        if (currentPathSegments.length > 0) {
            const firstSegment = '/' + currentPathSegments[0];
            navLinks.forEach(link => {
                const linkPathSegments = new URL(link.href).pathname.split('/').filter(Boolean);
                if (linkPathSegments.length > 0 && ('/' + linkPathSegments[0]) === firstSegment) {
                    link.classList.add('active');
                }
            });
        }
    }
}); 