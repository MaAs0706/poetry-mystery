export default function PageContent({ page, introText, author, editable, draft, onDraft }) {
  if (!page || page.type === 'blank') return <div className="paper-empty" />;
  if (editable) return <div className="author-page"><input aria-label="Poem title" value={draft.title} placeholder="title" onChange={e => onDraft({ ...draft, title: e.target.value })}/><input aria-label="Poem date" value={draft.date} placeholder="date" onChange={e => onDraft({ ...draft, date: e.target.value })}/><textarea aria-label="Write a poem" value={draft.body} placeholder="Begin here..." onChange={e => onDraft({ ...draft, body: e.target.value })}/><div className="fresh-ink">{draft.body}</div></div>;
  if (page.type === 'intro') return <div className="intro-page"><p>{introText[0]}</p><p>{introText[1]}</p><p className="signature">{introText[2]}</p></div>;
  if (page.type === 'letter') return <article className="page-letter"><span>{page.date}</span><p>{page.body}</p></article>;
  if (page.type === 'fragment') return <article className="page-fragment"><p>{page.body}</p><i>— {author}</i></article>;
  if (page.type === 'missing') return <article className="page-missing"><div className="torn-edge"/><p>{page.body}</p><small>page {page.pageNumber}</small></article>;
  return <article className={`page-poem ${page.pagePart > 1 ? 'is-continuation' : ''}`}>{page.title && <><h2>{page.title}</h2><time>{page.date}</time></>}<p>{page.body}</p>{page.note && <i className="hidden-note">{page.note}</i>}</article>;
}
