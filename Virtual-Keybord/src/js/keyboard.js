export class Keyboard {
  #swichEl;
  #fontSelectEl;
  #containerEl;
  #keyboardEl;
  #inputGroupEl;
  #inputEl;
  #keyPress = false;
  #mousePress = false;
  constructor() {
    this.#assignElement();
    this.#addEvent();
  }

  #assignElement() {
    this.#containerEl = document.getElementById('container');
    this.#swichEl = this.#containerEl.querySelector('#switch');
    this.#fontSelectEl = this.#containerEl.querySelector('#font');
    this.#keyboardEl = this.#containerEl.querySelector('#keyboard');
    this.#inputGroupEl = this.#containerEl.querySelector('#input-group');
    this.#inputEl = this.#inputGroupEl.querySelector('#input');
  }

  #addEvent() {
    this.#swichEl.addEventListener('change', this.#onChangeTheme);
    this.#fontSelectEl.addEventListener('change', this.#onChangeFont);
    document.addEventListener('keydown', this.#onkeydown.bind(this));
    document.addEventListener('keyup', this.#onKeyup.bind(this));
    this.#inputEl.addEventListener('input', this.#onInput);
    this.#keyboardEl.addEventListener(
      'mousedown',
      this.#onMouseDown.bind(this)
    );
    document.addEventListener('mouseup', this.#onMouseUp.bind(this));
  }
  #onMouseUp(event) {
    if (this.#keyPress) return;
    this.#mousePress = false;
    const keyEl = event.target.closest('div.key');
    const isActive = !!keyEl?.classList.contains('active');
    const val = keyEl?.dataset.val;
    if (isActive && val && val !== 'Space' && val !== 'Backspace') {
      this.#inputEl.value += val;
    }
    if (isActive && val === 'Space') {
      this.#inputEl.value += ' ';
    }
    if (isActive && val === 'Backspace') {
      this.#inputEl.value = this.#inputEl.value.slice(0, -1);
    }
    this.#keyboardEl.querySelector('.active')?.classList.remove('active');
  }
  #onMouseDown(event) {
    if (this.#keyPress) return;
    this.#mousePress = true;
    event.target.closest('div.key')?.classList.add('active');
  }

  #onInput(event) {
    event.target.value = event.target.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/, '');
  }

  #onkeydown(event) {
    if (this.#mousePress) return;
    this.#keyPress = false;
    this.#inputGroupEl.classList.toggle(
      'error',
      /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(event.key)
    );
    this.#keyboardEl
      .querySelector(`[data-code=${event.code}]`)
      ?.classList.add('active');
  }

  #onKeyup(event) {
    if (this.#mousePress) return;
    this.#keyPress = true;
    if (this.#keyboardEl.querySelector(`[data-code=${event.code}]`)) {
      this.#keyboardEl
        .querySelector(`[data-code=${event.code}]`)
        ?.classList.remove('active');
    }
  }

  #onChangeTheme(event) {
    document.documentElement.setAttribute(
      'theme',
      event.target.checked ? 'dark-mode' : ''
    );
  }
  #onChangeFont(event) {
    document.body.style.fontFamily = event.target.value;
  }
}
