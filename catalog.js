// Updated script.js

// Get elements
const books = document.querySelectorAll('.book');
const featuredImg = document.getElementById('featuredImg');
const featuredTitle = document.getElementById('featuredTitle');
const featuredDescription = document.getElementById('featuredDescription');
const featuredBook = document.getElementById('featuredBook');
const checkoutButton = document.getElementById('checkout-button');

let currentPrice = 5999;  // Default price in cents
let featuredBuyLink = featuredBook.getAttribute('data-link');

// Update featured book details when a book is clicked
books.forEach(book => {
    book.addEventListener('click', () => {
        const title = book.getAttribute('data-title');
        const description = book.getAttribute('data-description');
        const price = book.getAttribute('data-price');
        const imgSrc = book.getAttribute('data-img');
        const buyLink = book.getAttribute('data-link');

        featuredImg.src = imgSrc;
        featuredTitle.textContent = title;
        featuredDescription.textContent = description;
        featuredBuyLink = buyLink;
        currentPrice = parseFloat(price) * 100;  // Convert to cents

        // Update button text
        checkoutButton.textContent = `Buy Now for $${(currentPrice / 100).toFixed(2)}`;
    });
});

// Redirect to homepage when "Explore" button is clicked
document.getElementById('exploreBtn').addEventListener('click', () => {
    window.location.href = '/index.html';
});

// Stripe checkout logic
const stripe = Stripe('your-publishable-key-here');

checkoutButton.addEventListener('click', async () => {
    try {
        const response = await fetch('https://duoskilss-stripe-b7100e8cf8b9.herokuapp.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount: currentPrice,
                currency: 'usd'
            })
        });

        if (!response.ok) {
            throw new Error('Failed to create checkout session');
        }

        const session = await response.json();
        
        const result = await stripe.redirectToCheckout({ sessionId: session.id });
        if (result.error) {
            alert(result.error.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
    }
});