const defaultPoems = [
  { title: "The night knows", date: "June 2026", body: "There are things the night understands\nwithout asking for an explanation.\n\nThe way a window stays awake.\nThe way a name can fill a room.\nThe way we become quieter\nwhen we are almost honest." },
  { title: "A room with no answers", date: "May 2026", body: "I left the lamp on for you.\n\nNot because I thought you would come back,\nbut because some absences\nare easier to sit beside\nwhen they have somewhere warm to go." },
  { title: "The familiar dark", date: "April 2026", body: "The dark was never empty.\nIt had your footsteps in it,\na little rain,\nand every word I held back\nfor fear it might become true." }
];
const storageKey = "quiet-poetry-collection";
let poems = JSON.parse(localStorage.getItem(storageKey) || "null") || defaultPoems;
const safe = text => String(text).replace(/[&<>\"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[char]));
function render() {
  document.querySelector("#contentsList").innerHTML = poems.map((poem, i) => `<li><a href="#poem-${i}"><span>${safe(poem.title)}</span><time>${safe(poem.date)}</time></a></li>`).join("");
  document.querySelector("#writing").innerHTML = poems.map((poem, i) => `<article class="piece" id="poem-${i}"><p class="piece-number">${String(i + 1).padStart(2, "0")}</p><h3>${safe(poem.title)}</h3><p class="date">${safe(poem.date)}</p><p class="poem-text">${safe(poem.body)}</p><p class="piece-sign">— her name</p></article>`).join("");
}
const dialog = document.querySelector("#poemDialog");
document.querySelectorAll("#openEditor, #openEditorList").forEach(button => button.addEventListener("click", () => dialog.showModal()));
document.querySelector("#poemForm").addEventListener("submit", event => { event.preventDefault(); const form = new FormData(event.currentTarget); poems.unshift({ title:form.get("title"), date:"new", body:form.get("body") }); localStorage.setItem(storageKey, JSON.stringify(poems)); render(); event.currentTarget.reset(); dialog.close(); });
addEventListener("scroll", () => { document.querySelector("#progress").style.width = `${scrollY / (document.documentElement.scrollHeight - innerHeight) * 100}%`; });
render();
