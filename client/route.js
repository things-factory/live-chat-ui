export default function route(page) {
  switch (page) {
    case 'live-chat':
      import('./pages/live-chat')
      return page
  }
}
