/* Auto-Hide Navbar Enhancement */
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('nav.glass-panel');
    if (!nav) return;

    // Track mouse position
    let isTopZone = false;

    document.addEventListener('mousemove', (e) => {
        const mouseY = e.clientY;

        // If mouse is in top 80px, show navbar
        if (mouseY < 80) {
            if (!isTopZone) {
                nav.style.transform = 'translateY(0)';
                isTopZone = true;
            }
        } else if (mouseY > 150) {
            // If mouse moves away from nav area, hide it
            if (isTopZone && !nav.matches(':hover')) {
                nav.style.transform = 'translateY(-100%)';
                isTopZone = false;
            }
        }
    });

    // Keep navbar visible while hovering
    nav.addEventListener('mouseenter', () => {
        nav.style.transform = 'translateY(0)';
    });

    nav.addEventListener('mouseleave', (e) => {
        // Only hide if mouse is not in top zone
        if (e.clientY > 150) {
            nav.style.transform = 'translateY(-100%)';
            isTopZone = false;
        }
    });
});
