export const changePageTitle = (newTitle?: string) => {
  document.title = newTitle ? `${newTitle} | Amity` : 'Amity';
};
