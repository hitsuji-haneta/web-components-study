const template = document.createElement('template');

template.innerHTML = `
  <style>
    .container {
      padding: 8px;
    }

    button {
      display: block;
      overflow: hidden;
      position: relative;
      padding: 0 16px;
      font-size: 16px;
      font-weight: bold;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
      outline: none;

      box-sizing: border-box;
      border: 1px solid #a1a1a1;
      height: 70px;
      background: #007777;
      box-shadow: 0 2px 4px 0 rgba(0,0,0, 0.05), 0 2px 8px 0 rgba(161,161,161, 0.4);
      color: #ffffff;
    }
  </style>

  <div class="container">
    <button>Label</button>
  </div>
`;

class Button extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.$button = this._shadowRoot.querySelector('button');
    this.$container = this._shadowRoot.querySelector('.container');
    this.$button.addEventListener('click', () => this.onClick(this.message));
  }

  connectedCallback() {
    if(this.hasAttribute('as-atom')) {
      this.$container.getElementsByClassName.padding = '0';
    }
  }

  get label() {
    return this.getAttribute('label');
  }

  set label(value) {
    this.setAttribute('label', value);
  }

  get message() {
    return this.getAttribute('message');
  }

  set message(value) {
    this.setAttribute('message', value);
  }

  static get observedAttributes() {
    return ['label'];
  }

  attributeChangedCallback(_name, _oldVal, _newVal) {
    this.render();
  }

  render() {
    this.$button.innerHTML = this.label;
  }
}

window.customElements.define('my-button', Button);
