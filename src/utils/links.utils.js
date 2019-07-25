export const filterLinks = (links, searchValue) => {
  if (!searchValue || searchValue.length < 1) return links;

  return links.filter(link => {
    return (
      link.title.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1 ||
      link.url.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1 ||
      (link.note &&
        link.note.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1)
    );
  });
};
