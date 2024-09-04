// Import functions from render.js
import { home, authentication, chooseSide, goodSide, badSide, notFound } from './render.js';

// Define routes with functions from render.js
const routes = {
    404: {
        handler: notFound,
        title: "404",
        description: "Page not found",
    },
    "/": {
        handler: home,
        title: "Home",
        description: "This is the home page",
    },
    "/home": {
        handler: home,
        title: "Home",
        description: "This is the home page",
    },
    "/authentication": {
        handler: authentication,
        title: "Authentication",
        description: "This is the authentication page",
    },
    "/choose-side": {
        handler: chooseSide,
        title: "Choose Your Side",
        description: "This is the choose your side page",
    },
    "/good-side": {
        handler: goodSide,
        title: "Good Side",
        description: "This is the good side page",
    },
    "/bad-side": {
        handler: badSide,
        title: "Bad Side",
        description: "This is the bad side page",
    },
};

// Route handling function
const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    locationHandler();
};

// Location handler function
const locationHandler = () => {
    let location = window.location.pathname;
    if (location.length === 0) {
        location = "/";
    }
    const route = routes[location] || routes["404"];
    // Use the handler function to get content
    const content = route.handler();
    document.getElementById("header").innerHTML = content;
    document.title = route.title;
    document.querySelector('meta[name="description"]').setAttribute("content", route.description);
};

// Event listeners
document.addEventListener("click", (e) => {
    if (!e.target.matches("nav a")) {
        return;
    }
    route(e);
});

window.onpopstate = locationHandler;
window.route = route;
locationHandler();