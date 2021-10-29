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
      node.insertAdjacentHTML('afterbegin', loader);
    } else {
      node.prepend(loader);
    }

    if(window.BaseComponent) {
      window.BaseComponent.loaderClass = loaderClass;
    }

    import(`${url}${nodeName}.js`)
    .then(() => {
      console.log(`imported ${nodeName}.js`);
    })
    .catch(console.log);
  }
}