window.addEventListener('load', async () => {
  if ('serviceWorker' in navigator) {
    try {
      const serviceWorker = await navigator.serviceWorker.register('/sw.js')
      console.info('Service Worker register success: ', serviceWorker)
    } catch {
      console.error('Service Worker register fail')
    }
  }
})
