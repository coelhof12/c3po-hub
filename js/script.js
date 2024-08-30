document.addEventListener('DOMContentLoaded', () => {
    
    // Countdown timer functionality
    const countdownDate = new Date('Sep 3, 2024 23:59:59').getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const timeLeft = countdownDate - now;

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = days;
        document.getElementById('hours').innerText = hours;
        document.getElementById('minutes').innerText = minutes;
        document.getElementById('seconds').innerText = seconds;

        if (timeLeft < 0) {
            clearInterval(timerInterval);
            document.getElementById('countdown').innerHTML = "Launched!";
        }
    };

    updateCountdown(); // Initial call
    const timerInterval = setInterval(updateCountdown, 1000); // Update every second
});
