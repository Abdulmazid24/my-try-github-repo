/* Copy-to-Clipboard Functionality */
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Show toast notification
        const toast = document.createElement('div');
        toast.className = 'copy-toast';
        toast.textContent = '✓ Copied to clipboard!';
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// Initialize copy buttons for all code blocks
document.addEventListener('DOMContentLoaded', () => {
    const codeBlocks = document.querySelectorAll('pre code, .live-editor');

    codeBlocks.forEach((block) => {
        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';

        const button = document.createElement('button');
        button.className = 'copy-btn';
        button.innerHTML = '📋 Copy';
        button.onclick = () => copyToClipboard(block.textContent);

        block.parentNode.insertBefore(wrapper, block);
        wrapper.appendChild(block);
        wrapper.appendChild(button);
    });
});
