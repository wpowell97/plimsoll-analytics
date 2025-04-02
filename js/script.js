  // Red line animation for the hero heading //
  document.addEventListener("DOMContentLoaded", function () {
    const heading = document.getElementById("hero-heading");
    if (!heading) return;
  
    const redLine = heading.querySelector(".red-line-animation");
  
    // Fallback + debug logging
    setTimeout(() => {
      if (redLine) {
        redLine.classList.add("active");
        console.log("✅ .active applied to red line");
      } else {
        console.warn("⚠️ red-line-animation span not found inside heading");
      }
    }, 2500);
  });
  
// Wait until the DOM is fully loaded before executing the script
document.addEventListener("DOMContentLoaded", function () {
  // Select the navigation bar
  const navbar = document.querySelector(".navbar");

  // Select the "scroll to top" button
  const toTopBtn = document.querySelector("#to-top");

  // Select sections with the classes "stats" and "findings"
  const sections = document.querySelectorAll(
    ".stats, .findings, .order-today, .pricing, .companies"
  );

  // Create a set to track which sections have been animated
  const animatedSections = new Set();

  // Function to handle scroll events for navbar and "to top" button visibility
  function userScroll() {
    // Check if the user has scrolled down more than 50 pixels
    if (window.scrollY > 50) {
      navbar.classList.add("navbar-sticky", "scrolled");
      if (toTopBtn) toTopBtn.classList.add("show");
    } else {
      navbar.classList.remove("navbar-sticky", "scrolled");
      if (toTopBtn) toTopBtn.classList.remove("show");
    }
  }

  window.addEventListener("scroll", userScroll);

  // Function to smoothly scroll to the top when the button is clicked
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Add event listener to "to top" button if it exists
  if (toTopBtn) {
    toTopBtn.addEventListener("click", scrollToTop);
  }

  // Function to animate number counters within a section
  function incrementStats(section) {
    // Select all elements with class "counter" inside the given section
    const counters = section.querySelectorAll(".counter");

    counters.forEach((counter) => {
      // Initialize the counter value to 0
      counter.innerText = "0";

      // Get the target number from data attribute
      const target = +counter.getAttribute("data-target");

      // Calculate increment step
      const increment = target / 200;
      // Function to update the counter gradually
      function updateCounter() {
        const c = +counter.innerText;
        if (c < target) {
          // Increment the counter value and update the text
          counter.innerText = Math.ceil(c + increment);
          setTimeout(updateCounter, 10); // Update every 10ms for a smooth animation
        } else {
          counter.innerText = target; // Ensure the final value is the target
        }
      }
      updateCounter();
    });
  }

  // Create an IntersectionObserver to trigger animations when sections come into view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Check if the section is visible and hasn't been animated before
        if (entry.isIntersecting && !animatedSections.has(entry.target)) {
          incrementStats(entry.target); // Start counter animation
          animatedSections.add(entry.target); // Mark section as animated
        }
      });
    },
    { threshold: 0.5 } // Trigger when 50% of the section is visible
  );

  // Observe each section to detect when it comes into view
  sections.forEach((section) => observer.observe(section));

  // Select the first <h1> element on the page
  const target = document.querySelector("h1");
  if (target) {
    // Create an IntersectionObserver for the <h1> animation
    const h1Observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // If the <h1> is in view, add animation classes
          if (entry.isIntersecting) {
            entry.target.classList.remove("hidden");
            entry.target.classList.add("animate__lightSpeedInLeft");
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the <h1> is visible
    );
    h1Observer.observe(target);
  }

  // Smooth scrolling for anchor links (e.g., <a href="#section">)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent default jump-to behavior

      // Get the target element's ID from the href attribute
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        // Calculate position considering an offset of 100px (for fixed navbar)
        const targetPosition =
          targetElement.getBoundingClientRect().top + window.scrollY - 100;

        // Smoothly scroll to the target element
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
      }
    });
  });

  // ✅ Animate headings on scroll
  const headings = document.querySelectorAll('h2[data-animate]');

  headings.forEach((heading) => {
    const bounceClass = heading.dataset.animate;
    heading.classList.remove('animate__animated', `animate__${bounceClass}`);
    heading.style.visibility = 'hidden';
    heading.dataset.bounceClass = `animate__${bounceClass}`;
  });

  const headingObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
        const el = entry.target;
        el.style.visibility = 'visible';
        el.classList.add('animate__animated', el.dataset.bounceClass);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  headings.forEach((heading) => headingObserver.observe(heading));

  // Initialize scroll event listener for navbar and "to top" button
  userScroll();
});

document.addEventListener("DOMContentLoaded", function () {
  // ✅ Animate elements with fadeIn on scroll (or any Animate.css class)
  const animatedEls = document.querySelectorAll('[data-animate]');

  animatedEls.forEach((el) => {
    const animationClass = `animate__${el.dataset.animate}`;
    el.classList.remove('animate__animated', animationClass);
    el.style.visibility = 'hidden';
    el.dataset.animationClass = animationClass;
  });

  const fadeInObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
        const el = entry.target;
        el.style.visibility = 'visible';
        el.classList.add('animate__animated', el.dataset.animationClass);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  animatedEls.forEach((el) => fadeInObserver.observe(el));
});

document.addEventListener("DOMContentLoaded", function () {
  // Animate elements with lightSpeedInLeft on scroll
  const animatedEls = document.querySelectorAll('[data-animate="lightSpeedInLeft"]');

  animatedEls.forEach((el) => {
    const animationClass = 'animate__lightSpeedInLeft';
    el.classList.remove('animate__animated', animationClass);
    el.style.visibility = 'hidden';
    el.dataset.animationClass = animationClass;
  });

  const lightSpeedObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
        const el = entry.target;
        el.style.visibility = 'visible';
        el.classList.add('animate__animated', el.dataset.animationClass);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  animatedEls.forEach((el) => lightSpeedObserver.observe(el));
});

// Another DOMContentLoaded event listener for a separate animation
document.addEventListener("DOMContentLoaded", function () {
  // Select the element with class "order-today"
  const target = document.querySelector(".order-today");

  // Create an IntersectionObserver to detect when "order-today" comes into view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // If the element is in view, trigger the animation
        if (entry.isIntersecting) {
          target.classList.remove("order-today-hidden");
          target.classList.add("animate__slideInRight");

          // Stop observing once animation is triggered to avoid repeating
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.5, // Trigger when 50% of the element is visible
    }
  );

  // Start observing the target element
  observer.observe(target);
});

// Wait until the DOM is fully loaded before executing the script
document.addEventListener("DOMContentLoaded", function () {
  // Select all navigation links inside the offcanvas menu
  const dropdownItems = document.querySelectorAll(".nav-link");

  // Add a click event listener to each navigation link
  dropdownItems.forEach((item) => {
    item.addEventListener("click", function (event) {
      // Get the ID of the target section (removing '#' from the href)
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      // If the target section exists on the page
      if (targetElement) {
        // Select the offcanvas menu and create a Bootstrap Offcanvas instance
        const offcanvasElement = document.querySelector(".offcanvas");
        const bsOffcanvas = new bootstrap.Offcanvas(offcanvasElement);

        // Close the offcanvas menu
        bsOffcanvas.hide();

        // Wait for the offcanvas menu to fully close before scrolling
        offcanvasElement.addEventListener("hidden.bs.offcanvas", () => {
          // Calculate the position of the target element (offset by 100px for spacing)
          const targetPosition =
            targetElement.getBoundingClientRect().top + window.scrollY - 100;

          // Smoothly scroll to the target section
          window.scrollTo({ top: targetPosition, behavior: "smooth" });

          // Remove any lingering offcanvas backdrop (prevents overlay issues)
          const backdrop = document.querySelector(".offcanvas-backdrop");
          if (backdrop) {
            backdrop.remove();
          }
        });
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Select all offcanvas elements and create Bootstrap Offcanvas instances
  var offcanvasElementList = [].slice.call(
    document.querySelectorAll(".offcanvas")
  );
  var offcanvasList = offcanvasElementList.map(function (offcanvasEl) {
    return new bootstrap.Offcanvas(offcanvasEl);
  });

  // Attach an event listener to every navigation link inside the offcanvas menu
  document
    .querySelectorAll(".offcanvas a.nav-link")
    .forEach(function (element) {
      element.addEventListener("click", function () {
        // Loop through all offcanvas instances and close them
        offcanvasList.forEach(function (offcanvas) {
          offcanvas.hide();
        });
      });
    });
});
// GOLD DUST - Detection of active link to then turn text bold
// Refactored JavaScript for tab activation and sidebar highlight sync

// Run once DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));
  const sidebarLinks = document.querySelectorAll(".sidebar .nav-link");
  const firstSection = sections.length > 0 ? sections[0] : null;
  let lastActiveSection = "";

  // Filter nav links that are true in-page links (not ?tab= style)
  const validScrollLinks = navLinks.filter((link) => {
    const href = link.getAttribute("href");
    return href && href.startsWith("#") && !href.includes("?tab=");
  });

  function highlightSidebarLink(tabId) {
    sidebarLinks.forEach((link) => {
      const href = link.getAttribute("href");
      const linkTab = href && href.includes("?tab=") ? href.split("?tab=")[1].split("#")[0] : null;
      link.classList.remove("fw-bold", "text-secondary", "active");
      if (linkTab === tabId) {
        link.classList.add("fw-bold", "text-secondary", "active");
      }
    });
  }

  function changeActiveLink() {
    let currentSection = lastActiveSection;

    // Reset above first section
    if (firstSection && window.scrollY < firstSection.offsetTop - 150) {
      validScrollLinks.forEach((link) =>
        link.classList.remove("active", "fw-bold", "text-secondary")
      );
      lastActiveSection = "";
      return;
    }

    // Find section in view
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 200;
      const sectionBottom = sectionTop + section.offsetHeight + 200;
      if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
        currentSection = section.getAttribute("id");
      }
    });

    // Remove bold from sidebar tab links if user scrolls past reports-nav
    const reportsSection = document.getElementById("reports-nav");
    if (
      reportsSection &&
      window.scrollY > reportsSection.offsetTop + reportsSection.offsetHeight
    ) {
      document
        .querySelectorAll('.sidebar .nav-link[href*="?tab="]')
        .forEach((link) => {
          link.classList.remove("fw-bold", "text-secondary", "active");
        });
    }

    if (currentSection !== lastActiveSection) {
      lastActiveSection = currentSection;

      validScrollLinks.forEach((link) => {
        const href = link.getAttribute("href");
        const targetId = href && href.startsWith("#") ? href.substring(1) : "";
        link.classList.remove("active", "fw-bold", "text-secondary");
        if (targetId === currentSection) {
          link.classList.add("active", "fw-bold", "text-secondary");
        }
      });
    }
  }

  // Initial scroll detection and on scroll
  window.addEventListener("scroll", changeActiveLink);
  changeActiveLink();

  // Tab click: Update tab + sidebar highlight
  document.querySelectorAll('a[data-bs-toggle="tab"]').forEach((tabLink) => {
    tabLink.addEventListener("shown.bs.tab", function () {
      const tabId = this.getAttribute("data-bs-target")?.substring(1);
      highlightSidebarLink(tabId);
    });
  });

  // On load: Handle tab param from URL
  const urlParams = new URLSearchParams(window.location.search);
  const tabId = urlParams.get("tab");

  if (tabId) {
    const tabTriggerEl = document.querySelector(`.nav-link[data-bs-target="#${tabId}"]`);
    const reportsSection = document.getElementById("reports-nav");

    if (tabTriggerEl && reportsSection) {
      const tab = new bootstrap.Tab(tabTriggerEl);
      tab.show();
      reportsSection.scrollIntoView({ behavior: "smooth" });
      history.replaceState(null, "", window.location.pathname + "#reports-nav");
    }

    highlightSidebarLink(tabId);
  }

  // Offcanvas nav tab handler
  document.querySelectorAll(".offcanvas a.nav-link").forEach((link) => {
    link.addEventListener("click", function (event) {
      const href = this.getAttribute("href");

      if (href && href.includes("?tab=")) {
        event.preventDefault();

        const [hash, query] = href.split("?");
        const params = new URLSearchParams(query);
        const tabId = params.get("tab");

        const targetSection = document.querySelector(hash);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: "smooth" });
        }

        const tabTriggerEl = document.querySelector(`.nav-link[data-bs-target="#${tabId}"]`);
        if (tabTriggerEl) {
          const tab = new bootstrap.Tab(tabTriggerEl);
          tab.show();
        }

        highlightSidebarLink(tabId);
        history.replaceState(null, "", window.location.pathname + hash);
      }
    });
  });

  // Optional ScrollSpy (if still needed)
  const scrollSpyContainer = document.getElementById("scrollspyContainer");
  if (scrollSpyContainer) {
    new bootstrap.ScrollSpy(scrollSpyContainer, {
      target: "#sideNav",
      offset: 100,
    });
  }

  // Sidebar hide/show based on intersection
  const sidebar = document.querySelector(".sidebar");
  const endTrigger = document.getElementById("sidebar-end-trigger");

  if (sidebar && endTrigger) {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        sidebar.classList.add("hidden");
      } else {
        sidebar.classList.remove("hidden");
      }
    }, {
      root: null,
      threshold: 0,
    });

    observer.observe(endTrigger);
  }
});