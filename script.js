// Get Quotes from API
//

let apiQuotes = [];
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");
const tweetBtn = document.getElementById("twitter");
const loader = document.getElementById("loader");
const quoteContainer = document.getElementById("quote-container");

//loader function load animation while waiting
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

function newQuote() {
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    if (!quote.author) {
        authorText.textContent = "unknown";
    } else {
    authorText.textContent = quote.author;

    }
    // Check quote length for styling: longer = smaller font
    if (quote.text.length > 90) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    complete();
}


async function getQuotes() {
    const apiUrl = 'https://type.fit/api/quotes';
    loading();
    try {
            const response = await fetch(apiUrl);
            apiQuotes = await response.json();
            newQuote();
    } catch (error) {
        // Catch error here//
        //  try getQuotes(), counter:  if let count > 10 then catch
        alert("oops, no quote!");
    }
}
// Tweet a quote - link, quote, author
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    //open new tab
    window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener("click", newQuote);
tweetBtn.addEventListener("click", tweetQuote);

//On Load//
getQuotes();
