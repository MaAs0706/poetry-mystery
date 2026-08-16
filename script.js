const defaultPoems = [
  { title: "The house keeps secrets", date: "2026-08-14", author: "M.", body: "At night, the hallway learns\nto hold its breath.\n\nEven the doors are listening." },
  { title: "A small constellation", date: "2026-08-03", author: "M.", body: "I kept your name\nunder my tongue\nuntil it became\na light I could follow." },
  { title: "After the rain", date: "2026-07-28", author: "M.", body: "The garden was full\nof silver evidence —\nevery leaf remembering\nwhere the sky had been." }
];
const key = "veiled-verses-poems";
let poems = JSON.parse(localStorage.getItem(key) || "null") || defaultPoems;
const grid = document.querySelector("#poemGrid");
const count = document.querySelector("#poemCount");
const dialog = document.querySelector("#poemDialog");
const escape = value => String(value).replace(/[&<>\"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c]));
function render() {
  grid.innerHTML = poems.map((poem, i) => `<article class="poem"><div class="poem-meta"><span>${String(i + 1).padStart(2, "0")}</span><time>${new Date(poem.date + "T12:00:00").toLocaleDateString("en", { month:"short", year:"numeric" }).toUpperCase()}</time></div><h3>${escape(poem.title)}</h3><p class="poem-preview">${escape(poem.body.split("\n").slice(0, 4).join("\n"))}</p><span class="poem-author">${escape(poem.author || "Anonymous")}</span></article>`).join("");
  count.textContent = `${poems.length} ${poems.length === 1 ? "piece" : "pieces"}, for now.`;
}
document.querySelectorAll("#openEditor, #openEditorFooter").forEach(button => button.addEventListener("click", () => { dialog.showModal(); document.querySelector("input[name=title]").focus(); }));
document.querySelector("#poemForm").addEventListener("submit", event => { event.preventDefault(); const data = Object.fromEntries(new FormData(event.currentTarget)); poems.unshift(data); localStorage.setItem(key, JSON.stringify(poems)); render(); dialog.close(); event.currentTarget.reset(); });
render();
