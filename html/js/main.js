// public/js/main.js

// Function to handle email obfuscation
function setupEmail() {
  const user = "aldirjr";
  const domain = "gmail.com";
  const element = document.getElementById('email-link');
  
  if (element) {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = `mailto:${user}@${domain}`;
    });
  }
}

// Wait for the page to load before running the code
document.addEventListener('DOMContentLoaded', setupEmail);