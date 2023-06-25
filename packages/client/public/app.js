function getAllFiles() {
  return performance.getEntriesByType('resource').reduce((acc, { name }) => {
    const host = 'http://localhost:3000/';
    if (name.startsWith(`${host}@`) || name.startsWith(`${host}node_modules`)) return acc;
    acc.push(name.slice(host.length));
    return acc;
  }, [])
}

window.addEventListener('load', async () => {
  if ('serviceWorker' in navigator) {
    try {
      const serviceWorker = await navigator.serviceWorker.register('/sw.js');
      serviceWorker.active.postMessage(getAllFiles())
      console.info('Service Worker register success: ', serviceWorker);
    } catch(e) {
      console.log(e);
      console.error('Service Worker register fail');
    }
  }
})
