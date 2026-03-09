document.addEventListener("DOMContentLoaded", () => {
    /* Setup Intersection Observer for scroll animations */
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15,
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    animatedElements.forEach((el) => {
        observer.observe(el);
    });

    /* Navbar Scroll Effect */
    const navbar = document.querySelector(".navbar");
    if (navbar) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 20) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        });
    }

    /* Mobile menu toggle (if added later) */
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    /* EmailJS Inquiry Form Integration */
    // NOTE FOR DEVELOPER: You MUST setup an EmailJS account at https://www.emailjs.com/
    // and replace the placeholder keys below with your actual Keys/IDs!!
    if (typeof emailjs !== 'undefined') {
        emailjs.init({ publicKey: "0ZgsRM1SWo_OvREGO" }); // Replace "YOUR_PUBLIC_KEY" with your EmailJS Public Key
    }

    const inquiryForm = document.getElementById('inquiryForm');
    const submitBtn = document.getElementById('submitBtn');

    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // UI state
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Sending...';
            submitBtn.disabled = true;

            // Note: Make sure to map these variables identically in your EmailJS Dashboard Email Template
            const templateParams = {
                school_name: document.getElementById('schoolName').value,
                contact_person: document.getElementById('contactPerson').value,
                email_address: document.getElementById('userEmail').value,
                phone_number: document.getElementById('userPhone').value,
                message: document.getElementById('userMessage').value,

                // As requested by the user, both emails should be notified. 
                // Ensure your EmailJS template variable {{to_emails}} handles this in the "To Email" setting.
                to_emails: 'dannitaliya3@gmail.com, sanghani_rohit@hotmail.com',
                submission_time: new Date().toLocaleString()
            };

            // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual EmailJS IDs
            emailjs.send('service_xzrpowh', 'template_evvq2ea', templateParams)
                .then(function (response) {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                    inquiryForm.reset();

                    // Hide form and show animated inline success message
                    inquiryForm.style.display = 'none';
                    const successMsg = document.getElementById('successMessage');
                    if (successMsg) {
                        successMsg.style.display = 'block';
                    }
                }, function (error) {
                    console.error('Email sending failed:', error);
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                    alert('Something went wrong while sending your inquiry. Please try again.');
                });
        });
    }
});
