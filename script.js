// Add event listeners to social media icons
document.querySelectorAll('.social-icons a').forEach(icon => {
    icon.addEventListener('click', () => {
        // Open social media link in new tab
        window.open(icon.href, '_blank');
    });
});