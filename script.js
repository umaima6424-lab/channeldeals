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


const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(question => {
    question.addEventListener("click", () => {

        const currentAnswer = question.nextElementSibling;
        const currentIcon = question.querySelector("b");

        faqQuestions.forEach(otherQuestion => {
            if (otherQuestion !== question) {
                otherQuestion.nextElementSibling.style.maxHeight = null;
                otherQuestion.querySelector("b").textContent = "+";
            }
        });

        if (currentAnswer.style.maxHeight) {
            currentAnswer.style.maxHeight = null;
            currentIcon.textContent = "+";
        } else {
            currentAnswer.style.maxHeight = currentAnswer.scrollHeight + "px";
            currentIcon.textContent = "−";
        }
    });
});

const buyButtons = document.querySelectorAll(
    'a[href*="wa.me"], a[href*="open.kakao.com"]'
);

buyButtons.forEach(button => {
    button.addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation();

        const whatsappLink = this.href;
        const isKorean = document.documentElement.lang === "ko";

        const popup = document.createElement("div");
        popup.className = "purchase-popup";

        popup.innerHTML = `
            <div class="popup-box">

                <button class="close-popup">&times;</button>

                <h2>
                    ${isKorean ? "구매 방법 선택" : "Choose Purchase Option"}
                </h2>

                <p>
                    ${isKorean
                        ? "연락 방법을 선택하세요"
                        : "Select how you want to contact us"}
                </p>

                ${
                    isKorean
                    ? `
                    <a href="https://open.kakao.com?o?sjHI5bMi"
                       target="_blank"
                       class="purchase-option purchase-kakao">
                        <i class="fa-solid fa-comment"></i>
                        KakaoTalk
                    </a>
                    `
                    : `
                    <a href="${whatsappLink}"
                       target="_blank"
                       class="purchase-option purchase-whatsapp">
                        <i class="fa-brands fa-whatsapp"></i>
                        WhatsApp
                    </a>
                    `
                }

                <a href="https://t.me/TubeYt"
                   target="_blank"
                   class="purchase-option purchase-telegram">
                    <i class="fa-brands fa-telegram"></i>
                    Telegram
                </a>

            </div>
        `;

        document.body.appendChild(popup);

        popup.querySelector(".close-popup").addEventListener("click", () => {
            popup.remove();
        });

        popup.addEventListener("click", (e) => {
            if (e.target === popup) {
                popup.remove();
            }
        });
    });
});