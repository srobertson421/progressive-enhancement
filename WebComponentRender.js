window.BaseComponent = class BaseComponent extends HTMLElement {
  constructor() {
    super();
  }

  onMount() {}

  afterMount() {}

  connectedCallback() {
    this.onMount();

    const templateString = this.template();
    if(templateString) {
      this.templateNode = document.createElement('template');
      this.templateNode.innerHTML = this.template();
    }

    if(this.templateNode) {
      this.appendChild(this.templateNode.content.cloneNode(true));
    }

    if(window.BaseComponent.loaderClass) {
      this.querySelector(`.${window.BaseComponent.loaderClass}`).remove();
    }

    this.afterMount();
  }

  template() {
    return ``;
  }

  onUnMount() {}

  disconnectedCallback() {
    this.onUnMount();
  }
}

window.WebComponentRender = async function({ url, tagPartial, loader, loaderClass }) {
  const snapshots = document.evaluate(
    `//*[starts-with(name(), "${tagPartial}")]`,
    document.body,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null
  );

  for(let i = 0; i < snapshots.snapshotLength; i++) {
    const node = snapshots.snapshotItem(i);
    const nodeName = node.nodeName.toLowerCase();

    if(typeof loader === 'string') {
      node.insertAdjacentHTML('beforeend', loader);
    } else {
      node.appendChild(loader);
    }

    window.BaseComponent.loaderClass = loaderClass;

    import(`${url}${nodeName}.js`)
    .then(() => {
      console.log(`imported ${nodeName}.js`);
    })
    .catch(console.log);
  }
}