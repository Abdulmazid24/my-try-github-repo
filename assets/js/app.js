/* 
  CSS3 Mastery Application Logic 
  Handles custom routing and interactive elements.
*/

/* 
  CSS3 Mastery Application Logic 
  Handles custom routing and interactive elements.
*/

console.log('CSS3 Mastery: Core System Online');

/* 1. 3D Tilt Effect for Cards */
const cards = document.querySelectorAll('.glass-panel');

cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg rotation
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

    // Add dynamic sheen effect
    card.style.background = `
            radial-gradient(
                circle at ${x}px ${y}px, 
                rgba(255,255,255,0.1) 0%, 
                rgba(255,255,255,0.01) 80%
            ),
            var(--gradient-glass)
        `;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    card.style.background = 'var(--gradient-glass)';
  });
});

/* 2. View Transition Helper (Fallback for older browsers) */
if (!document.startViewTransition) {
  console.warn('View Transitions API not supported in this browser. Fallback to standard navigation.');
}
