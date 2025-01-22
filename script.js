const words = ["Discovering", "Changing", "Mastering"];
let index = 0;

const dynamicText = document.getElementById("dynamic-text");

// Function to update the text with overlapping fade effect
function updateText() {
    // Set opacity to 0 to fade out the current word
    dynamicText.style.opacity = 0;

    // Update the word after 0.75s (half of the transition time) so it starts appearing while fading out
    setTimeout(() => {
        index = (index + 1) % words.length; // Move to the next word
        dynamicText.textContent = words[index]; // Update the text content
        dynamicText.style.opacity = 1; // Fade in the new word
    }, 750); // Trigger the text change halfway through the fade-out transition
}

// Change text every 3 seconds
setInterval(updateText, 1300);




document.getElementById("search-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const query = document.getElementById("search-input").value; // Получаем значение из поля ввода
    window.location.href = `/courses.html?q=${encodeURIComponent(query)}`; // Перенаправляем на hello.html с параметром
});


document.getElementById('exploreBtn').addEventListener('click', () => {
    window.location.href = '/catalog';
});





document.getElementById('coursesBtn').addEventListener('click', () => {
    window.location.href = '/courses.html';
});


