import PageContent from './PageContent';

export default function Book({ phase, spreadStart, pages, introText, turning, turnDirection, onInteract, onPrevious, authorMode, draft, setDraft, seal }) {
  const closed = phase === 'CLOSED';
  const left = pages[spreadStart];
  const right = pages[spreadStart + 1];
  const forward = turnDirection === 'forward';
  const destinationLeft = forward ? pages[spreadStart + 2] : pages[spreadStart - 2];
  const destinationRight = forward ? pages[spreadStart + 3] : pages[spreadStart - 1];
  const rightIsIntro = right?.type === 'intro';
  const canAdvance = !authorMode && (phase === 'BLANK' || phase === 'INTRO_COMPLETE' || phase === 'READING') && spreadStart + 3 < pages.length;
  const canReverse = !authorMode && phase === 'READING' && spreadStart >= 2;
  const sheetPage = forward ? right : left;
  const undersidePage = forward ? left : right;

  return <div className={`book-stage ${closed ? 'is-closed' : 'is-open'}`}>
    <button className="closed-book" onClick={onInteract} aria-label="Open the book"><span>✦</span><em>Things Never Said</em><small>open the book</small></button>
    <div className="open-book">
      <div className="page-stack left-stack" aria-hidden="true"/><div className="page-stack right-stack" aria-hidden="true"/>
      <section className="page-bed left-page" aria-label="Left book page"><PageContent page={turning ? destinationLeft : left} introText={introText}/><span className="page-number">{turning ? destinationLeft?.pageNumber : left?.pageNumber}</span>{canReverse && !turning && <button className="left-hit-area" onClick={onPrevious} aria-label="Turn to the previous pages"/>}</section>
      <section className="page-bed right-page" aria-label="Right book page"><PageContent page={turning ? destinationRight : authorMode ? { id: 'author' } : right} introText={introText} author="Her Name" editable={authorMode} draft={draft} onDraft={setDraft}/>{!turning && !authorMode && phase === 'INTRO_COMPLETE' && <small className="turn-hint">turn the page</small>}<span className="page-number">{turning ? destinationRight?.pageNumber : right?.pageNumber}</span>{canAdvance && !turning && <button className="page-hit-area" onClick={onInteract} aria-label={rightIsIntro && phase === 'BLANK' ? 'Reveal the writing' : 'Turn the page'}/>}</section>
      {turning && <div className={`turning-sheet ${forward ? 'turn-forward' : 'turn-backward'}`} aria-hidden="true"><div className="sheet-face sheet-front"><PageContent page={sheetPage} introText={introText} author="Her Name"/><span className="page-number">{sheetPage?.pageNumber}</span></div><div className="sheet-face sheet-back"><PageContent page={undersidePage} introText={introText} author="Her Name"/></div><div className="sheet-edge"/></div>}
      <div className="spine" aria-hidden="true"/>{authorMode && <button className="seal" onClick={seal}>seal this page</button>}
    </div>
  </div>;
}
