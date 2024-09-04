import { home, authentication, chooseSide, goodSide, badSide, pageNotFound } from './app.js';

 // Create routing for pages
 const routes = [
     { path: '/', page: home },
     { path: '/authentication', page: authentication },
     { path: '/choose-side', page: chooseSide },
     { path: '/good-side', page: goodSide },
     { path: '/bad-side', page: badSide },
 ];

 // Function to find route and render a page
 export function renderPage(path) {
     // Find the correct route given the path
     const route = routes.find(r => r.path === path);

     if (route) {
         route.page();
     } else {
         pageNotFound(); // Render 404 if page is not found 
     }
 }