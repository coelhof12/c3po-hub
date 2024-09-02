const container = document.getElementById('container');

export function home() {
    container.innerHTML = `
        <h1>Welcome to Star Wars Character Explorer</h1>
        <p>This is the homepage where you can begin your journey.</p>
    `
}

export function authentication() {
    container.innerHTML = `
        <h1>Authentication Page</h1>
        <p>Please log in to continue.</p>
    `
}

export function chooseSide() {
    container.innerHTML = `
        <h1>Choose Your Side</h1>
        <p>Will you join the Light Side or the Dark Side?</p>
    `
}

export function goodSide() {
    container.innerHTML = `
        <h1>The Light Side</h1>
        <p>Welcome to the Light Side. Here are the heroes of the Star Wars universe.</p>
    `
}

export function badSide() {
    container.innerHTML = `
        <h1>The Dark Side</h1>
        <p>Welcome to the Dark Side. Here are the villains of the Star Wars universe.</p>
    `
}
