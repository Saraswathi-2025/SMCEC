/* =========================
   GLOBAL SAFE EFFECTS
========================= */

// Page fade-in
document.addEventListener("DOMContentLoaded", () => {
    document.body.style.opacity = "1";
    document.body.style.transition = "opacity 0.6s ease";
});

// Button hover glow
document.querySelectorAll('.btn, .btn-outline').forEach(btn => {
    btn.addEventListener("mouseenter", () => {
        btn.style.boxShadow = "0 0 18px rgba(255,180,0,0.7)";
    });
    btn.addEventListener("mouseleave", () => {
        btn.style.boxShadow = "";
    });
});

// Course card animation (SAFE)
const courseBoxes = document.querySelectorAll(".course-box");
if (courseBoxes.length > 0) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.2 });

    courseBoxes.forEach(box => observer.observe(box));
}

/* =========================
   REGISTRATION PAGE LOGIC
========================= */

const form = document.getElementById("registrationForm");
if (form) {

    const successMsg = document.getElementById("successMsg");

    const name = document.getElementById("name");
    const gender = document.getElementById("gender");
    const dob = document.getElementById("dob");
    const phone = document.getElementById("phone");
    const email = document.getElementById("email");
    const address = document.getElementById("address");
    const course = document.getElementById("course");
    const fee = document.getElementById("fee");
    const timing = document.getElementById("timing");
    const agree = document.getElementById("agree");
    const clearBtn = document.getElementById("clearBtn");

    // Course → Fee mapping
    const fees = {
        "Basic Computer": "3000",
        "DCA": "5000",
        "DOA": "4000",
        "Programming": "1000"
    };

    // Auto-select course from URL
    const params = new URLSearchParams(window.location.search);
    const urlCourse = params.get("course");

    if (urlCourse && course) {
        course.value = urlCourse;
        fee.value = fees[urlCourse] || "";
    }

    if (course) {
        course.addEventListener("change", e => {
            fee.value = fees[e.target.value] || "";
        });
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        successMsg.textContent = "";

        if (!validate()) return;

        const formData = new FormData();
        formData.append("entry.1835902401", name.value);
        formData.append("entry.573258770", gender.value);
        formData.append("entry.111060359", dob.value);
        formData.append("entry.2129112387", phone.value);
        formData.append("entry.1913667015", email.value);
        formData.append("entry.1586931255", address.value);
        formData.append("entry.882098224", course.value);
        formData.append("entry.991857823", fee.value);
        formData.append("entry.840998961", timing.value);
        formData.append("entry.7504698", "I agree");

        fetch("https://docs.google.com/forms/d/e/1FAIpQLSf_mQST76IFnopGiWCD7JUK3oUJ94oZm_kgJn5aUC_u0DbH4A/formResponse", {
            method: "POST",
            body: formData,
            mode: "no-cors"
        }).then(() => {
            successMsg.textContent = "Registration successful!";
            successMsg.style.color = "green";
            form.reset();
        });
    });

    if (clearBtn) {
        clearBtn.onclick = () => {
            form.reset();
            successMsg.textContent = "";
        };
    }

    function validate() {
        let ok = true;
        document.querySelectorAll(".error").forEach(e => e.textContent = "");

        if (!name.value.trim()) error(name, "Required"), ok = false;
        if (!gender.value) error(gender, "Required"), ok = false;
        if (!dob.value) error(dob, "Required"), ok = false;
        if (!/^[0-9]{10}$/.test(phone.value)) error(phone, "Invalid phone"), ok = false;
        if (!email.value.includes("@")) error(email, "Invalid email"), ok = false;
        if (!address.value.trim()) error(address, "Required"), ok = false;
        if (!course.value) error(course, "Required"), ok = false;
        if (!timing.value) error(timing, "Required"), ok = false;
        if (!agree.checked) error(agree, "Required"), ok = false;

        return ok;
    }

    function error(input, msg) {
        input.parentElement.querySelector(".error").textContent = msg;
    }
}