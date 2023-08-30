const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Show new quote
function newQuote() {
  showLoadingSpinner();
  // Pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  // Check if author field is blank
  if (!quote.author || quote?.author == "type.fit") {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote?.author?.replace(/, type\.fit/, "");
  }

  // Check quote length to determine styling
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  // Set quote & hide loader
  quoteText.textContent = quote.text;
  removeLoadingSpinner();
}

// Get quotes from API
async function getQuote() {
  showLoadingSpinner();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    let errorCounter = 0;
    errorCounter++;
    if (errorCounter > 10) {
      alert(`Sorry, there's something is wrong with the page.`);
      return;
    }
  }
}

// Tweet quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On load
getQuote();

// alternate approach using localQuotes in quotes.js
// comment out let apiQuotes = []; & get quotes from API section
// const quote = localQuotes[Math.floor(Math.random() * apiQuotes.length)];
