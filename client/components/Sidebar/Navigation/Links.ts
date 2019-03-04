export const rootLinks = [
  {
    label: 'Project List',
    path: '/',
    icon: { prefix: 'far', iconName: 'clipboard-list' },
  },
];

export const getProjectLinks = (projectId: string) => {
  return [
    {
      label: 'Financials',
      path: `/project/${projectId}/`,
      icon: { prefix: 'far', iconName: 'usd-square' },
    },
    {
      label: 'Time',
      path: `/project/${projectId}/time`,
      icon: { prefix: 'far', iconName: 'clock' },
    },
    {
      label: 'Photos',
      path: `/project/${projectId}/photos`,
      icon: { prefix: 'far', iconName: 'camera-retro' },
    },
    {
      label: 'Sprint',
      path: `/project/${projectId}/sprint`,
      icon: { prefix: 'far', iconName: 'sticky-note' },
    },
  ];
};
