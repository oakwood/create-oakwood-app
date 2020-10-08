export const menuPrimary = [
  {
    label: 'Work',
    links: Array.from(new Array(6), (_, idx) => {
      const link = {
        label: `Link ${idx + 1}`,
        url: `link-${idx + 1}`,
      }

      if (idx === 0) {
        link.links = Array.from(new Array(2), (__, idx2) => ({
          label: `Another link ${idx2 + 1}`,
          url: `sublink-${idx + 1}`,
        }))
      }

      return link
    }),
    mediaSrc: '//source.unsplash.com/300x200',
    url: '/work',
  },
  {
    label: 'News',
    mediaSrc: '//source.unsplash.com/300x201',
    url: '/news',
  },
  {
    label: 'Press',
    mediaSrc: '//source.unsplash.com/300x202',
    url: '/press',
  },
  {
    label: 'About',
    url: '/about',
  },
]

export const menuFooter = [
  {
    label: 'Work',
    url: '/work',
  },
  {
    label: 'News',
    url: '/news',
  },
  {
    label: 'Press',
    url: '/press',
  },
  {
    label: 'About',
    url: '/about',
  },
]

export default {
  menus: {
    menuPrimary,
    menuFooter,
  },
  settings: {},
}
