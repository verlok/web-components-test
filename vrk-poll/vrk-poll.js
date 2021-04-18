class VrkPoll extends HTMLElement {
  constructor() {
    super();
    this._attached = false;
    this._data = {
      question: "What is the meaning of life, the universe and everything?",
      answers: ["Twenty-four", "Fourty-two"]
    };
    this._selected = null;

    // DOM Elements
    this._$question = null;
    this._$answers = null;
  }
  connectedCallback() {
    this._attached = true;
    this.innerHTML = /*html*/ `
      <style>
        h3 { background: #333; color: white; font-weight: bold; margin: 0 }
        ul, li { margin: 0; list-style-type: none; padding: 0 }
        li, h3 { padding: 1rem; }
        li { background: #CCC; border: 1px solid #999; cursor: pointer; }
        .selected { background: darkgreen; color: white; }
      </style>
      <div class="vrk-poll-container">
        <h3 id="question"></h3>
        <ul id="answers"></ul>
      </div>
    `;
    this._$question = this.querySelector("#question");
    this._$answers = this.querySelector("#answers");
    this._$answers.addEventListener("click", (event) => {
      this._$answers.querySelectorAll("li").forEach(($li, index) => {
        $li.classList.remove("selected");
        if ($li === event.target) {
          this._selected = index;
          $li.classList.add("selected");
        }
      });
    });
    this._render();
  }
  _render() {
    if (this._attached && this._data) {
      this._$answers.innerHTML = "";
      this._$question.innerHTML = this._data.question;
      this._$answers.innerHTML = this._data.answers.reduce(
        (previous, current) => previous + `<li>${current}</li>`,
        ""
      );
    }
  }
}

window.customElements.define("vrk-poll", VrkPoll);
