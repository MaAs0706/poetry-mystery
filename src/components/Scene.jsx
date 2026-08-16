import Lamp from './Lamp';import Book from './Book';
export default function Scene(props){return <main className="scene"><div className="table"/><Lamp/><Book {...props}/><button className="author-key" onClick={props.enterAuthor} aria-label="Enter author mode">✒</button><p className="scene-instruction">{props.phase==='CLOSED'?'open the book':'click the right page to continue'}</p></main>}
