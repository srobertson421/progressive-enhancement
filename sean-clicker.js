class SeanClicker extends window.BaseComponent {
  onMount() {
    this.count = 0;
  }

  afterMount() {
    this.countEl = this.querySelector('.click-count');

    this.addEventListener('click', e => {
      e.preventDefault();
      if(e.target.classList.contains('inc')) {
        this.count++;
      } else if(e.target.classList.contains('dec')) {
        this.count--;
      }

      this.countEl.innerText = `Count: ${this.count}`;
    });
  }

  template() {
    return `
      <div class="click-count">Count: ${this.count}</div>
      <button class="inc">Inc</button>
      <button class="dec">Dec</button>
    `;
  }
}

window.customElements.define('sean-clicker', SeanClicker);