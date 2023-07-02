(function () {
  const quotesEl = document.querySelector(".quotes");
  const loaderEl = document.querySelector(".loader");

  // get the quotes from API
  const getQuotes = async (page) => {
    const API_URL = `https://api.javascripttutorial.net/v1/quotes/?page=${page}&limit=10`;
    const response = await fetch(API_URL);
    // handle 404
    if (!response.ok) {
      throw new Error(`An error occurred: ${response.status}`);
    }
    return await response.json();
  };

  // show the quotes
  const showQuotes = (quotes) => {
    quotes.forEach((quote) => {
      const quoteEl = document.createElement("blockquote");
      quoteEl.classList.add("quote");

      quoteEl.innerHTML = `
           
            ${quote.quote}
            <footer>${quote.author}</footer>
        `;

      quotesEl.appendChild(quoteEl);
    });
  };

  const hideLoader = () => {
    loaderEl.classList.remove("show");
  };

  const showLoader = () => {
    loaderEl.classList.add("show");
  };

  // load quotes
  const loadQuotes = async (page) => {
    // show the loader
    showLoader();

    // 0.5 second later
    setTimeout(async () => {
      try {
        // call the API to get quotes
        const response = await getQuotes(page);
        // show quotes
        showQuotes(response.data);
        // update the total
        if (!total) total = response.total;
        if (response.total === total) currentPage = 1;
      } catch (error) {
        console.log(error.message);
      } finally {
        hideLoader();
      }
    }, 500);
  };

  // control variables
  let currentPage = 1;
  const limit = 10;
  let total = 0;

  const hasMoreQuotes = (page, limit, total) => {
    const startIndex = (page - 1) * limit + 1;
    return total === 0 || startIndex < total;
  };

  window.addEventListener(
    "scroll",
    () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      if (
        scrollTop + clientHeight >= scrollHeight - 5 &&
        hasMoreQuotes(currentPage, limit, total)
      ) {
        currentPage++;
        loadQuotes(currentPage, limit);
      }
    },
    {
      //to use custom scroll
      passive: true,
    }
  );

  // initialize
  loadQuotes(currentPage, limit);
})();
