import PageContent from './PageContent';

export default function Book({
  phase, pageIndex, pages, introText, turning, onInteract,
  authorMode, draft, setDraft, seal,
}) {
  const isClosed = phase === 'CLOSED';
  const current = phase === 'BLANK' ? null : pages[pageIndex];
  const previous = pageIndex > 0 ? pages[pageIndex - 1] : null;
  const following = pages[pageIndex + 1] || current;
  const isTurnable = !authorMode && (phase === 'BLANK' || phase === 'INTRO_COMPLETE' || phase === 'READING');

  return (
    <div className={`book-stage ${isClosed ? 'is-closed' : 'is-open'}`}>
      <button className="closed-book" onClick={onInteract} aria-label="Open the book">
        <span>✦</span><em>Things Never Said</em><small>open the book</small>
      </button>

      <div className="open-book">
        <div className="page-stack left-stack" aria-hidden="true" />
        <div className="page-stack right-stack" aria-hidden="true" />

        <section className="page-bed left-page" aria-label="Left book page">
          <PageContent page={previous} introText={introText} />
          <span className="page-number">{pageIndex || ''}</span>
        </section>

        <section className="page-bed right-page" aria-label="Right book page">
          <PageContent
            page={turning ? following : authorMode ? { id: 'author' } : current}
            introText={introText}
            author="Her Name"
            editable={authorMode}
            draft={draft}
            onDraft={setDraft}
          />
          {!turning && !authorMode && phase === 'INTRO_COMPLETE' && <small className="turn-hint">turn the page</small>}
          <span className="page-number">{phase === 'BLANK' ? '1' : pageIndex + 1}</span>
          {isTurnable && !turning && <button className="page-hit-area" onClick={onInteract} aria-label={phase === 'BLANK' ? 'Reveal the writing' : 'Turn the page'} />}
        </section>

        {turning && (
          <div className="turning-sheet" aria-hidden="true">
            <div className="sheet-face sheet-front">
              <PageContent page={current} introText={introText} author="Her Name" />
              <span className="page-number">{pageIndex + 1}</span>
            </div>
            <div className="sheet-face sheet-back">
              <PageContent page={previous || current} introText={introText} author="Her Name" />
            </div>
            <div className="sheet-edge" />
          </div>
        )}

        <div className="spine" aria-hidden="true" />
        {authorMode && <button className="seal" onClick={seal}>seal this page</button>}
      </div>
    </div>
  );
}
