import { renderPage } from "./router.js";

 // Set up event listener for navigation anchors
 document.querySelectorAll('nav a').forEach(anchor => {
     anchor.addEventListener('click', function(event) {
         event.preventDefault(); // Prevents browser from triggering GET request

         // Get the path from the anchor
         const path = event.target.getAttribute('href');
         // Change URL using pushState
         window.history.pushState({}, '', path);
         renderPage(path);
     });
 });

 // Handle browser back and forward buttons
 window.addEventListener('popstate', () => {
     renderPage(document.location.pathname);
 });

 // Handle initial load
 renderPage(document.location.pathname);