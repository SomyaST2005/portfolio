const projects = [
  // --- This is the object you added in the last task ---
  {
    title: "Portfolio Project (This Website!)",
    description: "A responsive personal portfolio built from scratch using HTML, CSS, and vanilla JavaScript. Features a dynamic theme switcher and is populated by a JavaScript data structure.",
    imageUrl: "./images/profile-placeholder-1.jpg",
    liveUrl: "https://your-live-site.com", // Replace with your actual deployed URL
    codeUrl: "https://github.com/your-username/your-repo-name" // Replace with your actual GitHub repo
  },
  // A comma is required to separate objects in an array.

  // --- NEW PROJECT OBJECT 1 ---
  // Copy the structure above and fill it with your second project's details.
  {
    title: "E-commerce Website Concept",
    description: "A concept design and front-end implementation for an e-commerce platform. Focused on a clean UI, responsive product grids, and a streamlined checkout process using modern CSS techniques.",
    imageUrl: "./images/profile-placeholder-2.jpg", // Make sure to add this image to your 'images' folder!
    liveUrl: "#", // Use "#" if there's no live link yet
    codeUrl: "https://github.com/your-username/ecommerce-repo" // Replace with your repo link
  },
  // Another comma to separate this object from the next one.

  // --- NEW PROJECT OBJECT 2 ---
  // Add as many projects as you like by following this pattern.
  {
    title: "Task Management App",
    description: "A client-side task management application built with vanilla JavaScript. Allows users to add, edit, delete, and mark tasks as complete, with all data saved to localStorage.",
    imageUrl: "./images/profile-placeholder-1.jpg", // Add this image to your 'images' folder
    liveUrl: "#",
    codeUrl: "https://github.com/your-username/task-app-repo" // Replace with your repo link
  }
  // A "trailing comma" after the last object is valid in modern JavaScript
  // and is a good practice as it makes version control diffs cleaner.
];

// This line selects the HTML element with the ID 'theme-toggle' and stores a reference to it in a constant variable named 'themeToggle'.
// 'const' is used because this reference will not be reassigned to a different element later in our code.
const themeToggle = document.querySelector('#theme-toggle');

// NEW: Select the root <html> element of the document.
// We will add/remove the 'data-theme' attribute to this element to switch themes.
const htmlElement = document.documentElement;
const projectsContainer = document.querySelector('.projects-container');

// --- NEW CODE STARTS HERE ---
const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');



/**
 * =======================================
 * RENDER PROJECTS FUNCTION
 * =======================================
 * This function is responsible for rendering the project cards to the DOM.
 */
const renderProjects = () => {
  // --- NEW CODE STARTS HERE ---

  // 1. Create an empty string to hold all the generated HTML.
  let allProjectsHTML = '';

  // --- MODIFIED LOGIC ---

  // 2. We iterate over the 'projects' array.
  projects.forEach(project => {
    // We create the HTML for a single card.
    const projectCardHTML = `
      <div class="project-card">
        <div class="project-image-container">
            <img 
              src="${project.imageUrl}" 
              alt="Screenshot of the ${project.title} project" 
              class="project-image"
            >
        </div>
        <div class="project-info">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="project-links">
            <a 
              href="${project.liveUrl}" 
              class="btn" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Live Demo
            </a>
            <a 
              href="${project.codeUrl}" 
              class="btn btn-secondary" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              View Code
            </a>
          </div>
        </div>
      </div>
    `;
    
    // 3. Instead of logging, we append the card's HTML to our 'allProjectsHTML' string.
    allProjectsHTML += projectCardHTML;
  });

  // 4. After the loop has finished, we perform ONE update to the DOM.
  // This is far more efficient than updating the DOM in every loop iteration.
  projectsContainer.innerHTML = allProjectsHTML;

  // --- NEW CODE ENDS HERE ---
};



// NEW CODE STARTS HERE:
// ===================================
// ADD A 'CLICK' EVENT LISTENER
// ===================================
// We now add an event listener to our theme toggle switch.
// This will execute a function every time the element is clicked.

themeToggle.addEventListener('click', () => {
  // When the toggle is clicked, we execute the logic inside this function.
  // We are replacing the previous console.log with the actual theme-switching code.

  // 1. Determine the new theme.
  //    We use a ternary operator as a compact if/else statement.
  //    - The condition is 'themeToggle.checked'. Is the checkbox currently checked?
  //    - If it's true (checked), the value of newTheme will be 'dark'.
  //    - If it's false (unchecked), the value of newTheme will be 'light'.
  const newTheme = themeToggle.checked ? 'dark' : 'light';

  // 2. Apply the new theme.
  //    The setAttribute method changes the 'data-theme' attribute on the <html> element.
  //    This triggers the CSS rules you defined earlier for html[data-theme='dark'].
  htmlElement.setAttribute('data-theme', newTheme);

  // NEW CODE STARTS HERE:
  // 3. Save the user's choice to localStorage.
  //    - 'localStorage' is a global browser object.
  //    - '.setItem()' is the method to save a key-value pair.
  //    - We use 'theme' as our key to identify this piece of data.
  //    - 'newTheme' is the value ('dark' or 'light') we want to save.
  localStorage.setItem('theme', newTheme);
});

// NEW CODE STARTS HERE:
// ===================================
// APPLY THE SAVED THEME ON PAGE LOAD
// ===================================
// We use an Immediately Invoked Function Expression (IIFE) to run this code once on script load.
(() => {
  // 1. Check for a saved theme in localStorage.
  //    localStorage.getItem('theme') will return 'dark', 'light', or null.
  const savedTheme = localStorage.getItem('theme');

  // 2. If a saved theme exists, apply it.
  if (savedTheme) {
    // a. Apply the theme to the <html> element.
    htmlElement.setAttribute('data-theme', savedTheme);

    // b. Crucially, update the toggle switch's state to match the saved theme.
    //    If the saved theme is 'dark', we need to make sure the checkbox is checked.
    if (savedTheme === 'dark') {
      themeToggle.checked = true;
    }
    // No 'else' is needed because the checkbox is unchecked by default.
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  // Render the projects when the DOM is ready.
  renderProjects();

  // --- NEW CODE STARTS HERE: ASYNCHRONOUS FORM SUBMISSION ---

  // Check if the contact form exists on the page before adding the listener.
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      // 1. Prevent the default form submission behavior (the page redirect).
      event.preventDefault();

      // 2. Collect the form data using the FormData API.
      // This is a modern way to get all form fields.
      const formData = new FormData(contactForm);
      const submitButton = contactForm.querySelector('button[type="submit"]');

      // Provide immediate user feedback: show a "sending" state.
      formStatus.innerHTML = 'Sending...';
      formStatus.className = 'info'; // You could add an .info style for this
      formStatus.style.display = 'block';
      submitButton.disabled = true;

      // 3. Use the fetch API to send the data.
      fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        // We tell Formspree we want to receive a JSON response.
        headers: {
            'Accept': 'application/json'
        }
      }).then(response => {
        // 4. Handle the response from the server.
        if (response.ok) {
          // Success! Show the success message.
          formStatus.innerHTML = "Thank you! Your message has been sent.";
          formStatus.className = 'success';
          // Clear the form fields after a successful submission.
          contactForm.reset();
        } else {
          // The server responded with an error. Try to parse the error message.
          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              // This is a validation error from Formspree.
              formStatus.innerHTML = data["errors"].map(error => error["message"]).join(", ");
            } else {
              // This is a generic server error.
              formStatus.innerHTML = "Oops! Something went wrong. Please try again later.";
            }
            formStatus.className = 'error';
          })
        }
      }).catch(error => {
        // 5. Handle network errors (e.g., user is offline).
        formStatus.innerHTML = "Oops! A network error occurred. Please check your connection and try again.";
        formStatus.className = 'error';
      }).finally(() => {
        // Re-enable the submit button regardless of success or failure.
        submitButton.disabled = false;
      });
    });
  }
});

