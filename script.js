const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const themeToggle = document.querySelector('.theme-toggle');
const htmlElement = document.documentElement;

// Theme toggle
themeToggle.addEventListener('click', () => {
    const isDark = htmlElement.getAttribute('data-theme') === 'dark';
    htmlElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
    themeToggle.textContent = isDark ? '🌞' : '🌙';
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
});

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', savedTheme);
themeToggle.textContent = savedTheme === 'dark' ? '🌙' : '🌞';

// Mobile menu toggle
menuToggle.addEventListener('click', (e) => {
    navLinks.classList.toggle('active');
    e.stopPropagation();
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});
      // Function to show success message
      function showSuccessMessage() {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('success')) {
          alert("Successfully, thank you!");
        }
      }

      function toggleTheme() {
        const logoImage = document.getElementById('logoImage');
        const isDarkMode = document.body.classList.toggle('dark-mode'); // Toggle dark mode class
      
        // Update the logo image based on the theme
        if (isDarkMode) {
          logoImage.src = logoImage.getAttribute('data-dark'); // Use dark mode logo
        } else {
          logoImage.src = logoImage.getAttribute('data-light'); // Use light mode logo
        }
      }
      
      // Add event listener to the theme toggle button
      const themeToggleButton = document.querySelector('.theme-toggle');
      themeToggleButton.addEventListener('click', toggleTheme);

     // Handle form submission
document.getElementById("contactForm").addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent the default form submission

  // Get form data
  const formData = new FormData(event.target);
  const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
  };

  try {
      // Send data to the backend API
      const response = await fetch("http://localhost:3001/api/contact", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
      });

      const result = await response.json();

      // Display a success message
      document.getElementById("responseMessage").textContent = result.message;

      // Reset the form after submission
      event.target.reset();

      // Show a pop-up message
      alert("Your message has been successfully submitted!");

  } catch (error) {
      console.error("Error submitting form:", error);
      document.getElementById("responseMessage").textContent = "An error occurred. Please try again.";
  }
});