const megaMenu = ({
  refetch,
  setForceRerender,
  setSelectedGenre,
  setSelectedLanguage,
  setSelectedSort,
}) => {
  return [
    {
      label: 'Language',
      icon: 'pi pi-fw pi-language',
      items: [
        [
          {
            label: 'All',
            items: [
              {
                command: async () => {
                  setSelectedLanguage(null)
                  await refetch(undefined, undefined, {
                    onSuccess: () => setForceRerender((prev) => !prev),
                  })
                },
                label: 'Language free search',
              },
            ],
          },
        ],
        [
          {
            label: 'National',
            items: [
              {
                label: 'Hindi',
                command: async () => {
                  setSelectedLanguage('Hindi')
                  await refetch(undefined, undefined, {
                    onSuccess: () => setForceRerender((prev) => !prev),
                  })
                },
              },
            ],
          },
          {
            label: 'International',
            items: [
              {
                label: 'English',
                command: async () => {
                  await setSelectedLanguage('English')
                  await refetch(undefined, undefined, {
                    onSuccess: () => setForceRerender((prev) => !prev),
                  })
                },
              },
            ],
          },
        ],
      ],
    },
    {
      label: 'Sort',
      icon: 'pi pi-fw pi-sort-alt',
      items: [
        [
          {
            label: 'Title',
            items: [
              {
                label: 'Ascending',
                command: async () => {
                  await setSelectedSort('title-asc')
                  await refetch(undefined, undefined, {
                    onSuccess: () => setForceRerender((prev) => !prev),
                  })
                },
              },
              {
                label: 'Descending',
                command: async () => {
                  await setSelectedSort('title-desc')
                  await refetch(undefined, undefined, {
                    onSuccess: () => setForceRerender((prev) => !prev),
                  })
                },
              },
            ],
          },
        ],
      ],
    },
    {
      label: 'Genres',
      icon: 'pi pi-fw pi-sitemap',
      items: [
        [
          {
            label: 'Fiction',
            items: [
              {
                label: 'Fantasy',
                command: async () => {
                  await setSelectedGenre('Fantasy')
                  await refetch(undefined, undefined, {
                    onSuccess: () => setForceRerender((prev) => !prev),
                  })
                },
              },
              // ... (other genre items)
            ],
          },
          {
            label: 'Nonfiction genres',
            items: [
              // ... (other genre items)
            ],
          },
        ],
      ],
    },
  ]
}

export default megaMenu
