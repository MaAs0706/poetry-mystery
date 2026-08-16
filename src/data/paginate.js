const LINES_PER_PAGE = 7;

export function paginatePoem(poem) {
  const lines = poem.body.trim().split('\n');
  const chunks = [];
  for (let index = 0; index < lines.length; index += LINES_PER_PAGE) chunks.push(lines.slice(index, index + LINES_PER_PAGE).join('\n'));
  return chunks.map((body, part) => ({
    id: `${poem.id}-${part + 1}`,
    type: 'poem',
    poemId: poem.id,
    pagePart: part + 1,
    title: part === 0 ? poem.title : '',
    date: part === 0 ? poem.date : '',
    body,
    note: part === 0 ? poem.note : '',
  }));
}
