// Step 1: Simulate User Behavior
// - Add event listeners for button clicks and form submissions.
// - Use JavaScript to dynamically update the DOM based on user actions.

// Step 2: DOM Manipulation Functions
// - Implement functions to add, update, and remove DOM elements.
// - Ensure all elements are dynamically created with appropriate attributes and content.

// Step 3: Error Handling
// - Display error messages in the DOM for invalid inputs or missing elements.
// - Create reusable functions to handle common error cases.

// Step 4: Reusable Utilities
// - Create modular utility functions, such as createElement(tag, attributes).
// - Ensure all functions follow DRY principles for maintainability.

// Utility function to create an element
function createElement(tag, attributes = {}) {
  const element = document.createElement(tag);
  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }
  return element;
}

// Function to add content to a DOM element
function addElementToDOM(targetId, content) {
  const target = document.getElementById(targetId);
  if (target) {
    target.textContent = content;
  } else {
    console.error(`Element with id ${targetId} not found`);
  }
}

// Function to remove an element from the DOM
function removeElementFromDOM(id) {
  const element = document.getElementById(id);
  if (element) {
    element.remove();
  } else {
    console.error(`Element with id ${id} not found`);
  }
}

// Function to simulate a click (for testing, directly update DOM)
function simulateClick(targetId, message) {
  addElementToDOM(targetId, message);
}

// Function to handle form submission
function handleFormSubmit(formId, targetId) {
  const form = document.getElementById(formId);
  const input = document.getElementById('user-input');
  const errorMessage = document.getElementById('error-message');

  if (input && input.value.trim() === '') {
    errorMessage.textContent = 'Input cannot be empty';
    errorMessage.classList.remove('hidden');
    return;
  }

  if (errorMessage) {
    errorMessage.classList.add('hidden');
  }

  addElementToDOM(targetId, input.value);
}

// Add event listeners
document.addEventListener('DOMContentLoaded', () => {
  const simulateClickButton = document.getElementById('simulate-click');
  if (simulateClickButton) {
    simulateClickButton.addEventListener('click', () => {
      simulateClick('dynamic-content', 'Button Clicked!');
    });
  }

  const userForm = document.getElementById('user-form');
  if (userForm) {
    userForm.addEventListener('submit', (event) => {
      event.preventDefault();
      handleFormSubmit('user-form', 'dynamic-content');
    });
  }
});

// Export functions for testing
module.exports = {
  addElementToDOM,
  removeElementFromDOM,
  simulateClick,
  handleFormSubmit,
  createElement
};
