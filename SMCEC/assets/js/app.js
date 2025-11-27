/* ======================
   SMCEC Website Effects
   ====================== */

// Smooth fade-in for whole page
document.addEventListener("DOMContentLoaded", () => {
    document.body.style.opacity = "1";
    document.body.style.transition = "opacity 0.8s ease";
});

// Button glow on hover
const buttons = document.querySelectorAll('.btn, .btn-outline');
buttons.forEach(btn => {
    btn.addEventListener("mouseenter", () => {
        btn.style.boxShadow = "0 0 18px rgba(255,180,0,0.7)";
    });
    btn.addEventListener("mouseleave", () => {
        btn.style.boxShadow = "";
    });
});

// Scroll animation for course boxes
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll(".course-box").forEach(box => {
    observer.observe(box);
});
// ==========================
// Button Ripple Effect
// ==========================
document.querySelectorAll('.btn, .btn-outline').forEach(btn => {
    btn.addEventListener('click', function(e) {
        let ripple = document.createElement('span');
        ripple.classList.add('ripple');

        let x = e.clientX - e.target.getBoundingClientRect().left;
        let y = e.clientY - e.target.getBoundingClientRect().top;

        ripple.style.left = '${x}px';
        ripple.style.top = '${y}px';

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});