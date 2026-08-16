import { paginatePoem } from './paginate';

const poems = [
  { id: 'rain', title: 'The Rain Remembered', date: '14 October', note: 'she never knew.', body: 'I remember the rain—\nnot the weather of it,\nbut how it waited on the glass\nlike a thought that had nowhere else to go.\n\nYou were leaving then.\nOr perhaps I was.\n\nThe room went quiet\nin the shape of your name.' },
  { id: 'window', title: 'A Window Left Open', date: '3 November', body: 'Some nights the window is open\nonly because I cannot bear\nthe room knowing I am alone.\n\nThe wind enters quietly.\nIt does not ask what happened.\n\nIt only moves the curtain\nlike someone leaving.' },
];

const manuscript = [
  { id: 'flyleaf', type: 'blank' },
  { id: 'intro', type: 'intro' },
  { id: 'interleaf', type: 'blank' },
  ...paginatePoem(poems[0]),
  ...paginatePoem(poems[1]),
  { id: 'letter', type: 'letter', date: 'Tuesday, after midnight', body: 'Dear you,\n\nI have tried to make a home\nout of every room you left behind.\n\nIt is a poor kind of architecture,\nbut it keeps the rain out.\n\n— M.' },
  { id: 'fragment', type: 'fragment', body: 'I do not remember what she said after that.\n\nI only remember the rain.\nAnd the door.' },
  { id: 'missing', type: 'missing', body: 'The rest of this page has been carefully removed.' },
];

export const pages = manuscript.map((page, index) => ({ ...page, pageNumber: index + 1 }));
