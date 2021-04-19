class VrkPoll extends HTMLElement {
  constructor() {
    super();
    this._attached = false;
    this._data = null;
    this._selected = null;

    // DOM Elements
    this._$question = null;
    this._$answers = null;

    // Shadows
    this._root = this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this._attached = true;
    this._root.innerHTML = /*html*/ `
      <style>
        h3 { background: #333; color: white; font-weight: bold; margin: 0 }
        ul, li { margin: 0; list-style-type: none; padding: 0 }
        li, h3:not(:empty) { padding: 1rem; }
        li { background: #CCC; border: 1px solid #999; cursor: pointer; }
        .selected { background: darkgreen; color: white; }
      </style>
      <div class="vrk-poll-container">
        <h3 id="question"></h3>
        <ul id="answers"></ul>
      </div>
    `;
    this._$question = this._root.querySelector("#question");
    this._$answers = this._root.querySelector("#answers");
    this._$answers.addEventListener("click", (event) => {
      this._$answers.querySelectorAll("li").forEach(($li, index) => {
        if ($li === event.target) {
          this.selected = index;
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
  set data(data) {
    if (this._data === data) return;
    this._data = data;
    this._render();
  }
  get data() {
    return this._data;
  }
  set selected(indexToSelect) {
    const $answers = this._$answers.querySelectorAll("li");
    if ($answers.length === 0) return;
    if (indexToSelect < 0 || indexToSelect > $answers.length - 1) return;
    $answers.forEach(($li, index) => {
      const fn = index === indexToSelect ? "add" : "remove";
      $li.classList[fn]("selected");
    });
    this._selected = indexToSelect;
  }
  get selected() {
    return this._selected;
  }
}

window.customElements.define("vrk-poll", VrkPoll);
