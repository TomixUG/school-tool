export default {
  top: [
    {
      name: 'Home',
      url: '/home',
      icon: 'Home',
    },

    {
      divider: true,
    },
    {
      name: 'Flashcards',
      icon: 'Book',
      prefix: 'flashcards',
      url: '/flashcards/',
    },
  ],
  bottom: [
    {
      name: 'Admin settings',
      icon: 'Tool',
      prefix: 'admin',
      admin: true,
      children: [
        {
          name: 'Users',
          url: '/admin/users',
        },
      ],
    },
    {
      name: 'Account',
      url: '/account',
      icon: 'User',
    },
  ],
};
