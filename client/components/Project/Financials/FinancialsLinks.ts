export const getFinancialsLinks = (projectId: string) => {
  return [
    {
      title: 'Overview',
      to: `/project/${projectId}/`,
      exact: true,
    },
    {
      title: 'Prime Contract',
      to: `/project/${projectId}/prime-contract`,
    },
    {
      title: 'Schedule of Values',
      to: `/project/${projectId}/schedule-of-values`,
    },
  ];
};
