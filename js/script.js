// Wait until the DOM is fully loaded before executing the script
document.addEventListener("DOMContentLoaded", function () {
    // Select the navigation bar
    const navbar = document.querySelector(".navbar");
   
    // Select the "scroll to top" button
    const toTopBtn = document.querySelector("#to-top");
   
    // Select sections with the classes "stats" and "findings"
    const sections = document.querySelectorAll(".stats, .findings, .order-today, .pricing, .companies");
 
    // Create a set to track which sections have been animated
    const animatedSections = new Set();
 
    // Function to handle scroll events for navbar and "to top" button visibility
    function userScroll() {
      window.addEventListener("scroll", () => {
        // Check if the user has scrolled down more than 50 pixels
        if (window.scrollY > 50) {
          // Add sticky and scrolled classes to navbar
          navbar.classList.add("navbar-sticky", "scrolled");
 
          // Show the "to top" button if it exists
          if (toTopBtn) toTopBtn.classList.add("show");
        } else {
          // Remove sticky and scrolled classes from navbar
          navbar.classList.remove("navbar-sticky", "scrolled");
 
          // Hide the "to top" button if it exists
          if (toTopBtn) toTopBtn.classList.remove("show");
        }
      });
    }
 
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
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default jump-to behavior
 
        // Get the target element's ID from the href attribute
        const targetId = this.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);
 
        if (targetElement) {
          // Calculate position considering an offset of 100px (for fixed navbar)
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - 100;
         
          // Smoothly scroll to the target element
          window.scrollTo({ top: targetPosition, behavior: "smooth" });
        }
      });
    });
 
    // Initialize scroll event listener for navbar and "to top" button
    userScroll();
  });
 
  // Another DOMContentLoaded event listener for a separate animation
  document.addEventListener("DOMContentLoaded", function () {
    // Select the element with class "order-today"
    const target = document.querySelector('.order-today');
 
    // Create an IntersectionObserver to detect when "order-today" comes into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // If the element is in view, trigger the animation
        if (entry.isIntersecting) {
          target.classList.remove('order-today-hidden');
          target.classList.add('animate__slideInRight');
 
          // Stop observing once animation is triggered to avoid repeating
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5 // Trigger when 50% of the element is visible
    });
 
    // Start observing the target element
    observer.observe(target);
  });
 
 
// ...existing code...
 
document.addEventListener("DOMContentLoaded", function () {
  const dropdownItems = document.querySelectorAll('.nav-link');
 
  dropdownItems.forEach(item => {
    item.addEventListener('click', function (event) {
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
 
      if (targetElement) {
        const offcanvasElement = document.querySelector('.offcanvas');
        const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
        bsOffcanvas.hide();
 
        setTimeout(() => {
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: targetPosition, behavior: 'smooth' });
 
          // Remove the offcanvas backdrop manually
          const backdrop = document.querySelector('.offcanvas-backdrop');
          if (backdrop) {
            backdrop.remove();
          }
        }, 300); // Adjust the timeout to match the offcanvas transition duration
      }
    });
  });
});
 
// ...existing code...
 
  document.addEventListener('DOMContentLoaded', function () {
    var offcanvasElementList = [].slice.call(document.querySelectorAll('.offcanvas'))
    var offcanvasList = offcanvasElementList.map(function (offcanvasEl) {
      return new bootstrap.Offcanvas(offcanvasEl)
    })
 
    document.querySelectorAll('.offcanvas a.nav-link').forEach(function (element) {
      element.addEventListener('click', function () {
        offcanvasList.forEach(function (offcanvas) {
          offcanvas.hide()
        })
      })
    })
  })