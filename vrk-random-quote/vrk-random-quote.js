class VrkRandomQuote extends HTMLElement {
  constructor() {
    super();
    this._quotes = [
      "Cane canuto / sempre piaciuto (Rohypnol)",
      "La buzza è una bazza",
      "La guerra di Piero / che mangia le pere / sotto il pero / tutte le sere",
      "Custom elements are just a fancy way to avoid jQuery $this",
      "yPack rules"
    ];
    this._quoteEl = null;
    this._interval = null;
  }
  connectedCallback() {
    this.innerHTML = /*html*/ `
      <style>
        .vrk-container {
          width: 500px;
          border: dotted 1px #999;
          padding: 20px;
          margin: 2rem auto;
        }
        h1 {
          margin: 0;
          font-weight: normal;
          font-size: 1rem;
        }
        blockquote {
          font-style: italic;
          font-size: 2rem;
        }
        blockquote::before,
        blockquote::after {
          content: '"';
          color: #999;
        }
      </style>
      <div class="vrk-container">
        <h1>Random quote:</h1>
        <blockquote id="quote"></blockquote>
      </div>
    `;
    this._quoteEl = this.querySelector("#quote");
    this._interval = setInterval(() => {
      this._render;
    }, 10000);
    this._render();
  }
  _render() {
    if (this._quoteEl) {
      this._quoteEl.innerHTML = this._quotes[
        Math.floor(Math.random() * this._quotes.length)
      ];
    }
  }
  disconnectedCallback() {
    clearInterval(this._interval);
  }
}

window.customElements.define("vrk-random-quote", VrkRandomQuote);
