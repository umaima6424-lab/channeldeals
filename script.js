const progressBar = document.getElementById("progress-bar");

window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    const progress = (scrollTop / documentHeight) * 100;

    progressBar.style.width = progress + "%";
});

const stats = document.getElementById("stats");
const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver((entries, observer) => {
    if (entries[0].isIntersecting) {

        counters.forEach(counter => {
            const target = Number(counter.dataset.target);
            let current = 0;

            const updateCounter = () => {
                if (current < target) {
                    current += target / 100;

                    if (target === 99) {
                        counter.textContent = Math.ceil(current) + "%";
                    } else {
                        counter.textContent = Math.ceil(current).toLocaleString() + "+";
                    }

                    requestAnimationFrame(updateCounter);
                } else {
                    if (target === 99) {
                        counter.textContent = target + "%";
                    } else {
                        counter.textContent = target.toLocaleString() + "+";
                    }
                }
            };

            updateCounter();
        });

        observer.unobserve(stats);
    }
}, {
    threshold: 0.3
});

observer.observe(stats);

