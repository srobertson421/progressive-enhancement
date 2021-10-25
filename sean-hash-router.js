class SeanHashRouter extends window.BaseComponent {
  onMount() {
    this.currentPage = location.hash;

    window.addEventListener('hashchange', e => {
      this.currentPage = location.hash;
      this.renderPage();
    });
  }

  afterMount() {
    this.renderPage();
  }

  template() {
    return `
      <div id="render-zone"></div>
    `;
  }

  renderPage() {
    if(this.currentPage.includes('about')) {
      this.querySelector('#render-zone').innerHTML = '<h4>About</h4>';
    } else {
      this.querySelector('#render-zone').innerHTML = '<h4>Home</h4>';
    }
  }
}

window.customElements.define('sean-hash-router', SeanHashRouter);