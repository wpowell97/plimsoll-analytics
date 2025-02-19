document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".navbar");
  const toTopBtn = document.querySelector("#to-top");
  const sections = document.querySelectorAll(".stats, .findings");
  const animatedSections = new Set();

  function userScroll() {
      window.addEventListener("scroll", () => {
          if (window.scrollY > 50) {
              navbar.classList.add("navbar-sticky", "scrolled");
              if (toTopBtn) toTopBtn.classList.add("show");
          } else {
              navbar.classList.remove("navbar-sticky", "scrolled");
              if (toTopBtn) toTopBtn.classList.remove("show");
          }
      });
  }

  function scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (toTopBtn) {
      toTopBtn.addEventListener("click", scrollToTop);
  }

  function incrementStats(section) {
      const counters = section.querySelectorAll(".counter");

      counters.forEach((counter) => {
          counter.innerText = "0";
          const target = +counter.getAttribute("data-target");
          const increment = target / 200;

          function updateCounter() {
              const c = +counter.innerText;
              if (c < target) {
                  counter.innerText = Math.ceil(c + increment);
                  setTimeout(updateCounter, 10);
              } else {
                  counter.innerText = target;
              }
          }
          updateCounter();
      });
  }

  const observer = new IntersectionObserver(
      (entries) => {
          entries.forEach((entry) => {
              if (entry.isIntersecting && !animatedSections.has(entry.target)) {
                  incrementStats(entry.target);
                  animatedSections.add(entry.target);
              }
          });
      },
      { threshold: 0.5 }
  );

  sections.forEach((section) => observer.observe(section));

  // Observer for H1 animation
  const target = document.querySelector("h1");
  if (target) {
      const h1Observer = new IntersectionObserver(
          (entries) => {
              entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                      entry.target.classList.remove("hidden");
                      entry.target.classList.add("animate__lightSpeedInLeft");
                  }
              });
          },
          { threshold: 0.5 }
      );
      h1Observer.observe(target);
  }

  // Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", function (event) {
          event.preventDefault();
          const targetId = this.getAttribute("href").substring(1);
          const targetElement = document.getElementById(targetId);

          if (targetElement) {
              const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - 100;
              window.scrollTo({ top: targetPosition, behavior: "smooth" });
          }
      });
  });

  userScroll();
});
