class VrkStarRating extends HTMLElement {
  constructor() {
    super();
    // Shadow root
    this._root = this.attachShadow({ mode: "open" });
    // Elements
    this._$top = null;
    this._$bottom = null;
    // Private props
    this._value = 0;
  }
  connectedCallback() {
    this._attached = true;
    this._root.innerHTML = /*html*/ `
      <style>
        :host {
          width: 5em;
          height: 1em;
          display: inline-block;
          overflow: hidden;
          user-select: none;
          vertical-align: middle;
          box-sizing: border-box;
        }
        .container {
          color: #c5c5c5;
          font-size: 1em;
          line-height: 1em;
          margin: 0 auto;
          position: relative;
          padding: 0;
          cursor: pointer;
        }
        .top {
          color: #e7bd06;
          padding: 0;
          position: absolute;
          z-index: 1;
          display: block;
          top: 0;
          left: 0;
          width: 0;
          overflow: hidden;
        }
        .container:hover .top {
          display: none;
        }
        .bottom {
          padding: 0;
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          unicode-bidi: bidi-override;
          direction: rtl;
        }
        .bottom > span:hover,
        .bottom > span:hover ~ span {
          color: #e7bd06;
        }
      </style>
      <div class="container">
        <div class="top">
          <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
        </div>
        <div class="bottom">
          <span data-value="5">★</span><span data-value="4">★</span
          ><span data-value="3">★</span><span data-value="2">★</span
          ><span data-value="1">★</span>
        </div>
      </div>
    `;
    this._$top = this._root.querySelector(".top");
  }
  _render() {
    if (this._$top) {
      this._$top.style.width = `${this._value * 10 * 2}%`;
    }
  }
  set value(value) {
    if (this._value === value) return;
    if (value < 1 || value > 5) return;
    this._value = value;
    this._render();
  }
  get value() {
    return this._value;
  }
}

window.customElements.define("vrk-star-rating", VrkStarRating);
