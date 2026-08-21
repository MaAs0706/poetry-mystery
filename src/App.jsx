import { useEffect, useRef, useState } from 'react';
import Scene from './components/Scene';
import { BOOK_CONFIG } from './data/config';
import { pages as seedPages } from './data/pages';
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

export default function App() {
  

  const [phase, setPhase] = useState('CLOSED'); const [spreadStart, setSpreadStart] = useState(0); const [turning, setTurning] = useState(false); const [turnDirection, setTurnDirection] = useState('forward'); const [typed, setTyped] = useState(['', '', '']);
  const [pages, setPages] = useState(() => JSON.parse(localStorage.getItem('found-book-pages-v2') || 'null') || seedPages); const [authorMode, setAuthorMode] = useState(false); const [draft, setDraft] = useState({ title: 'Untitled', date: '', body: '' }); const lock = useRef(false);
  async function open() { if (lock.current) return; lock.current = true; setPhase('OPENING'); await wait(1300); setPhase('BLANK'); lock.current = false; }
  async function writeIntro() { if (lock.current) return; lock.current = true; setPhase('WRITING_INTRO'); for (let line = 0; line < 3; line += 1) { for (let index = 0; index <= BOOK_CONFIG.introLines[line].length; index += 1) { setTyped(old => old.map((value, item) => item === line ? BOOK_CONFIG.introLines[line].slice(0, index) : value)); await wait(line === 2 ? 30 : 22); } await wait(430); } setPhase('INTRO_COMPLETE'); lock.current = false; }
  async function advance() { if (lock.current || spreadStart + 3 >= pages.length) return; lock.current = true; setTurnDirection('forward'); setTurning(true); await wait(1050); setSpreadStart(value => value + 2); setTurning(false); setPhase('READING'); await wait(120); lock.current = false; }
  async function previous() { if (lock.current || spreadStart < 2) return; lock.current = true; setTurnDirection('backward'); setTurning(true); await wait(1050); setSpreadStart(value => value - 2); setTurning(false); setPhase(spreadStart === 2 ? 'INTRO_COMPLETE' : 'READING'); await wait(120); lock.current = false; }
  function interact() { if (authorMode) return; if (phase === 'CLOSED') open(); else if (phase === 'BLANK') writeIntro(); else if (phase === 'INTRO_COMPLETE' || phase === 'READING') advance(); }
  function enterAuthor() { if (phase === 'CLOSED') return; setAuthorMode(true); setPhase('AUTHOR_MODE'); }
  function seal(event) { event.stopPropagation(); if (!draft.body.trim()) return; const next = [...pages, { id: Date.now().toString(), type: 'poem', pagePart: 1, pageNumber: pages.length + 1, ...draft }]; if (next.length % 2) next.push({ id: `${Date.now()}-blank`, type: 'blank', pageNumber: next.length + 1 }); setPages(next); localStorage.setItem('found-book-pages-v2', JSON.stringify(next)); setSpreadStart(next.length - 2); setAuthorMode(false); setPhase('READING'); setDraft({ title: 'Untitled', date: '', body: '' }); }
  useEffect(() => { const key = event => { if (event.key.toLowerCase() === 'a') enterAuthor(); if (event.key === 'ArrowRight') interact(); if (event.key === 'ArrowLeft') previous(); }; addEventListener('keydown', key); return () => removeEventListener('keydown', key); });
  useEffect(() => { let timeout; const flicker = () => { document.documentElement.classList.add('flicker'); timeout = setTimeout(() => { document.documentElement.classList.remove('flicker'); timeout = setTimeout(flicker, 3800 + Math.random() * 6200); }, 150 + Math.random() * 110); }; timeout = setTimeout(flicker, 2800); return () => clearTimeout(timeout); }, []);
  useEffect(() => { let cooldown; const wheel = event => { if (Math.abs(event.deltaY) < 12 || lock.current) return; clearTimeout(cooldown); cooldown = setTimeout(() => event.deltaY > 0 ? interact() : previous(), 70); }; addEventListener('wheel', wheel, { passive: true }); return () => removeEventListener('wheel', wheel); });
  
  return <Scene phase={phase} spreadStart={spreadStart} pages={pages} introText={typed} turning={turning} turnDirection={turnDirection} onInteract={interact} onPrevious={previous} authorMode={authorMode} draft={draft} setDraft={setDraft} seal={seal} enterAuthor={enterAuthor}/>;
}
