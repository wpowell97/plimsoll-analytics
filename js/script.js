function userScroll() {
    const navbar = document.querySelector('.navbar');
    const toTopBtn = document.querySelector('#to-top');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('navbar-sticky');
        toTopBtn.classList.add('show');
      } else {
        navbar.classList.remove('navbar-sticky');
        toTopBtn.classList.remove('show');
      }
    });
}

function scrollToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".stats, .findings"); // Select both sections
  let animatedSections = new Set(); // Track which sections have been animated

  function incrementStats(section) {
    const counters = section.querySelectorAll(".counter");

    counters.forEach((counter) => {
      counter.innerText = "0";

      const updateCounter = () => {
        const target = +counter.getAttribute("data-target");
        const c = +counter.innerText;
        const increment = target / 200; // Adjust speed

        if (c < target) {
          counter.innerText = Math.ceil(c + increment);
          setTimeout(updateCounter, 10); // Adjust timing
        } else {
          counter.innerText = target;
        }
      };

      updateCounter();
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animatedSections.has(entry.target)) {
          incrementStats(entry.target);
          animatedSections.add(entry.target); // Prevent re-running
        }
      });
    },
    { threshold: 0.5 } // Trigger when 50% of the section is in view
  );

  sections.forEach((section) => observer.observe(section));
});

document.addEventListener('DOMContentLoaded', userScroll);
document.addEventListener('DOMContentLoaded', incrementStats);
document.addEventListener("DOMContentLoaded", function () {
    let navbar = document.querySelector(".navbar");
  
    window.addEventListener("scroll", function () {
      if (window.scrollY > 50) {
        navbar.classList.add("navbar-sticky");
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("navbar-sticky");
        navbar.classList.remove("scrolled");
      }
    });
  });
  document.querySelector('#to-top').addEventListener ('click', scrollToTop);
  
  document.addEventListener("DOMContentLoaded", function () {
    const target = document.querySelector("h1");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove("hidden");
                    entry.target.classList.add("animate__lightSpeedInLeft");
                }
            });
        },
        { threshold: 0.5 }
    );

    observer.observe(target);
});
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent the default anchor behavior

      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });
      }
    });
  });
});