// This line selects the HTML element with the ID 'theme-toggle' and stores a reference to it in a constant variable named 'themeToggle'.
// 'const' is used because this reference will not be reassigned to a different element later in our code.
const themeToggle = document.querySelector('#theme-toggle');

// NEW: Select the root <html> element of the document.
// We will add/remove the 'data-theme' attribute to this element to switch themes.
const htmlElement = document.documentElement;


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

