export const dockItems = [
  {
    id: 'finder',
    title: 'Finder',
    icon: '/assets/icons/dock/finder.svg',
    appType: null, // Finder doesn't open a window
  },
  {
    id: 'about',
    title: 'About Me',
    icon: '/assets/icons/dock/user.svg',
    appType: 'About',
    windowSize: { width: 600, height: 450 },
  },
  {
    id: 'resume',
    title: 'Resume',
    icon: '/assets/icons/dock/preview.svg',
    appType: 'Resume',
    windowSize: { width: 700, height: 500 },
  },
  {
    id: 'projects',
    title: 'Projects',
    icon: '/assets/icons/dock/folder.svg',
    appType: 'Projects',
    windowSize: { width: 800, height: 500 },
  },
  {
    id: 'contact',
    title: 'Contact',
    icon: '/assets/icons/dock/mail.svg',
    appType: 'Contact',
    windowSize: { width: 500, height: 400 },
  },
  { type: 'separator' },
  {
    id: 'notes',
    title: 'Notes',
    icon: '/assets/icons/dock/notes.svg',
    appType: 'Notes',
    windowSize: { width: 500, height: 400 },
  },
  {
    id: 'calculator',
    title: 'Calculator',
    icon: '/assets/icons/dock/calculator.svg',
    appType: 'Calculator',
    windowSize: { width: 240, height: 320 },
  },
  { type: 'separator' },
  {
    id: 'trash',
    title: 'Trash',
    icon: '/assets/icons/dock/trash.svg',
    appType: null,
  },
];
