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
      name: 'Test',
      url: '/test',
      icon: 'Anchor',
    },
  ],
  bottom: [
    {
      name: 'Admin settings',
      icon: 'Tool',
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
