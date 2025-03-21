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
 
 
// Wait until the DOM is fully loaded before executing the script
document.addEventListener("DOMContentLoaded", function () {

  // Select all navigation links inside the offcanvas menu
  const dropdownItems = document.querySelectorAll('.nav-link');

  // Add a click event listener to each navigation link
  dropdownItems.forEach(item => {
    item.addEventListener('click', function (event) {

      // Get the ID of the target section (removing '#' from the href)
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      // If the target section exists on the page
      if (targetElement) {

        // Select the offcanvas menu and create a Bootstrap Offcanvas instance
        const offcanvasElement = document.querySelector('.offcanvas');
        const bsOffcanvas = new bootstrap.Offcanvas(offcanvasElement);
        
        // Close the offcanvas menu
        bsOffcanvas.hide();

        // Wait for the offcanvas menu to fully close before scrolling
        offcanvasElement.addEventListener("hidden.bs.offcanvas", () => {

          // Calculate the position of the target element (offset by 100px for spacing)
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - 100;

          // Smoothly scroll to the target section
          window.scrollTo({ top: targetPosition, behavior: 'smooth' });

          // Remove any lingering offcanvas backdrop (prevents overlay issues)
          const backdrop = document.querySelector('.offcanvas-backdrop');
          if (backdrop) {
            backdrop.remove();
          }
        });
      }
    });
  });
});
 
document.addEventListener('DOMContentLoaded', function () {
  
  // Select all offcanvas elements and create Bootstrap Offcanvas instances
  var offcanvasElementList = [].slice.call(document.querySelectorAll('.offcanvas'));
  var offcanvasList = offcanvasElementList.map(function (offcanvasEl) {
    return new bootstrap.Offcanvas(offcanvasEl);
  });

  // Attach an event listener to every navigation link inside the offcanvas menu
  document.querySelectorAll('.offcanvas a.nav-link').forEach(function (element) {
    element.addEventListener('click', function () {

      // Loop through all offcanvas instances and close them
      offcanvasList.forEach(function (offcanvas) {
        offcanvas.hide();
      });
    });
  });

});
  // Detection of active link to then turn text bold and black
  document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section"); // Select all sections
    const navLinks = document.querySelectorAll(".nav-link"); // Select all nav links
    const firstSection = sections.length > 0 ? sections[0] : null; // Get the first section
    let lastActiveSection = ""; // Store last active section to persist highlight
  
    function changeActiveLink() {
      let currentSection = lastActiveSection; // Default to the last detected section
      // Check if the user has scrolled above the first section
      if (firstSection && window.scrollY < firstSection.offsetTop - 150) {
        navLinks.forEach((link) => link.classList.remove("active")); // Remove active class
        lastActiveSection = ""; // Reset last active section
        return;
      }
      // Loop through sections and find which one is currently in view
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 200; // Adjust for better detection
        const sectionBottom = sectionTop + section.offsetHeight + 200; // added buffer

        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
          currentSection = section.getAttribute("id");
        }
      });

      // Update the active link only if the section has changed
      if (currentSection !== lastActiveSection) {
        lastActiveSection = currentSection;

        navLinks.forEach((link) => {
          link.classList.remove("active");
          const href = link.getAttribute("href");
          if (href && href.includes(currentSection)) {
            link.classList.add("active");
          }
        });
      }
    }
    // Run on scroll event
    window.addEventListener("scroll", changeActiveLink);
  
    // Also run when page loads (e.g., if the user refreshes while scrolled down)
    changeActiveLink();
  });