/* ============================
   SMCEC — GLOBAL EFFECTS JS
   ============================ */

/* ----------------------------
   1. 3D Tilt Effect on Buttons
   ---------------------------- */
document.querySelectorAll(".btn, .btn-outline, .course-box").forEach(el => {
    el.addEventListener("mousemove", function(e) {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = 'translateY(-3px) rotateX(${ -y / 25 }deg) rotateY(${ x / 25 }deg)';
    });

    el.addEventListener("mouseleave", () => {
        el.style.transform = "translateY(0) rotateX(0) rotateY(0)";
    });
});


/* -------------------------------------
   2. Parallax Header Logo (Moves Slightly)
   ------------------------------------- */
const logo = document.querySelector(".logo, .home-logo");
if (logo) {
    document.addEventListener("mousemove", (e) => {
        let x = (window.innerWidth - e.pageX) / 80;
        let y = (window.innerHeight - e.pageY) / 80;
        logo.style.transform = 'translate(${x}px, ${y}px)';
    });
}


/* -------------------------------
   3. Soft Glow Animation for Buttons
   ------------------------------- */
setInterval(() => {
    document.querySelectorAll(".btn, .btn-outline").forEach(btn => {
        btn.classList.toggle("glow");
    });
}, 2000);


/* -----------------------------------
   4. Floating Particles Background
   ----------------------------------- */

const particleContainer = document.createElement("div");
particleContainer.className = "particles";
document.body.appendChild(particleContainer);

for (let i = 0; i < 25; i++) {
    const particle = document.createElement("span");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDuration = 5 + Math.random() * 10 + "s";
    particle.style.animationDelay = Math.random() * 5 + "s";
    particleContainer.appendChild(particle);
}


/* -------------------------------
   5. Smooth Page Loader Animation
   ------------------------------- */
const loader = document.createElement("div");
loader.className = "page-loader";
loader.innerHTML = <div class="spinner"></div>;
document.body.appendChild(loader);

window.addEventListener("load", () => {
    setTimeout(() => {
        loader.style.opacity = "0";
        loader.style.pointerEvents = "none";
    }, 800);
});


/* -------------------------------
   6. Back To Top Floating Button
   ------------------------------- */
const backToTop = document.createElement("button");
backToTop.className = "top-btn";
backToTop.innerHTML = "⬆";
document.body.appendChild(backToTop);

window.addEventListener("scroll", () => {
    backToTop.style.display = window.scrollY > 300 ? "block" : "none";
});

backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});