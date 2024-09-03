import { home, authentication, chooseSide, goodSide, badSide, notFound } from './render.js';

 // Create routing for pages
 const routes = [
    //  { path: '/', page: home },
     { path: '/', page: authentication },
     { path: '/authentication', page: authentication },
     { path: '/choose-side', page: chooseSide },
     { path: '/good-side', page: goodSide },
     { path: '/bad-side', page: badSide },
 ];

 // Function to find route and render a page
 export function renderPage(path) {
    console.log('Rendering page for path:', path); // Debug line
    const route = routes.find(r => r.path === path);
    console.log('Found route:', route); // Debug line

    if (route) {
        route.page();
    } else {
        home(); // Default to home if no match is found
    }
}