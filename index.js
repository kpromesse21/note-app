const btnEl = document.getElementById('btn');
const appEl = document.getElementById('app');

getNotes().forEach(note => {
    const noteEl = createNoteEl(note.id, note.content);
    appEl.insertBefore(noteEl, btnEl);
});
function createNoteEl(id, content) {
    const element = document.createElement('textarea')
    element.classList.add('note');
    element.placeholder = "Empty Note";
    element.value = content;

    element.addEventListener("dblclick", () => {
        const warning = confirm("do you want to delete this note ?");
        if (warning) {
            deleteNote(id, element)
        }
    })

    element.addEventListener('input', () => {
        updateNote(id, element.value)
    })
    return element;
}
/**
 * @description deleteNote supprime une note juste en possedant son id
 * @param {*} id l'identifiant de la note
 * @param {*} element contenue de la note
 */
function deleteNote(id, element) {
    const notes = getNotes().filter((note) => note.id != id)
    saveNote(notes);
    appEl.removeChild(element);
}
/**
 * 
 * @param {*} id 
 * @param {*} content 
 */
function updateNote(id, content) {
    const notes = getNotes();
    const target = notes.filter((note) => note.id == id)[0];
    target.content = content;
    saveNote(notes);
}
/**
 * @description est une fonction qui permet d'ajouter une note à l'objet notes en localstorage
 */
function addNote() {
    const notes = getNotes();
    const noteObj = {
        id: Math.floor(Math.random() * 100000),
        content: ""
    };
    const noteEl = createNoteEl(noteObj.id, noteObj.content);
    appEl.insertBefore(noteEl, btnEl);
    notes.push(noteObj);
    saveNote(notes)
}

/**
 *  @description getNote est une fonction qui permet de recuperer les notes sous json de puis le navigateur
 * @returns  la valeur soquet en memoire de toutes les notes
 */
function getNotes() {
    return JSON.parse(localStorage.getItem("note-app") || "[]");
}

/**
 * @param {*} notes 
 *  @description saveNote nous sert à l'enregistrement des notes dans le navigateur 
 */
function saveNote(notes) {
    localStorage.setItem("note-app", JSON.stringify(notes))
}

btnEl.addEventListener('click', addNote);