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

/* 3. Live Code Playground System */
function initPlayground() {
  const editors = document.querySelectorAll('.live-editor');

  editors.forEach(editor => {
    const targetId = editor.dataset.target; // ID of style block or element to update
    const preview = document.getElementById(targetId);

    // Auto-resize
    editor.addEventListener('input', () => {
      if (targetId.startsWith('style-')) {
        // It's a <style> block
        preview.textContent = editor.value;
      } else {
        // direct inline style injection (simpler)
        preview.setAttribute('style', editor.value);
      }
    });
  });
}

/* 4. Gamified Progress Tracker */
function initProgress() {
  const path = window.location.pathname;
  const page = path.split('/').pop() || 'index.html';

  if (page.includes('html')) {
    let progress = JSON.parse(localStorage.getItem('css_mastery_progress') || '[]');
    if (!progress.includes(page) && page !== 'index.html') {
      progress.push(page);
      localStorage.setItem('css_mastery_progress', JSON.stringify(progress));

      // Show toast
      showToast('🎓 Module Completed! +100 XP');
    }
  }

  // Update UI if on index
  if (document.querySelector('.progress-ring')) {
    updateProgressUI();
  }
}

function showToast(msg) {
  const toast = document.createElement('div');
  toast.className = 'glass-panel';
  toast.style.cssText = `
        position: fixed; bottom: 2rem; right: 2rem; padding: 1rem 2rem;
        border: 1px solid var(--color-primary); color: var(--color-primary);
        font-weight: bold; transform: translateY(100px); opacity: 0;
        transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    `;
  toast.textContent = msg;
  document.body.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
  });

  // Remove
  setTimeout(() => {
    toast.style.transform = 'translateY(100px)';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initPlayground();
  initProgress();
});
