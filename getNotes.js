const DOM = {
    yourNotes: null,
    year: null,
    time: null,
    notesContainer: null,
}

const CONFIG = { NOTES: "notes"};
const state = { notes: [] };



function init() {
    DOM.yourNotes = document.querySelector("#yourNotes");
    DOM.year = document.querySelector("#year");
    DOM.time = document.querySelector("#time");
    DOM.notesContainer = document.querySelector("#notesContainer");
    const button = document.querySelector("#addNotes");
    button.addEventListener("click", addNotes);

    try {
        const notesString = localStorage.getItem(CONFIG.NOTES);
        const notes = JSON.parse(notesString);
        if (!notes) return;
        state.notes = notes;
    } catch {}

    draw(state.notes);
 };

 init()









function draw(notes) {
    DOM.notesContainer.innerHTML = "";
    for (let index = 0; index < notes.length; index++) {
        const notesCard = getNotesUI(notes[index]);
        if (!notesCard) return;
        DOM.notesContainer.append(notesCard);
        
    }

}

function addNotes() {
    
    const id = _getNoteId();
    const yourNotesValue = DOM.yourNotes.value;
    const yearValue = DOM.year.value;
    const timeValue = DOM.time.value;
    const note = getNotes(yourNotesValue, yearValue, timeValue, id);
    state.notes.push(note);
    localStorage.setItem(CONFIG.NOTES, JSON.stringify(state.notes));

    draw(state.notes);
    setNotes(state.notes);

    function _getNoteId() {
        const note = DOM.yourNotes || "";
        return `location_${note}_${Math.ceil(Math.random() * 999)}`;
    };

};



function getNotes(yourNotes, year, time) {
    return {
        yourNotes,
        year,
        time,
    };
}







function getNotesUI(note) {
    const outerDiv = document.createElement("div");
    outerDiv.className = "card";
    outerDiv.style.width = "18rem";
    outerDiv.style.height = "250px"


    const insideDiv = document.createElement("div");
    insideDiv.className = "card-body row sticker";

    const getDate = document.createElement("h5");
    getDate.innerText = note.year;
    getDate.classList.add("card-title");

    const getTime = document.createElement("h6");
    getTime.innerText = note.time;
    getTime.classList.add("card-subtitle");
    
    const getText = document.createElement("p");
    getText.innerText = note.yourNotes;
    getText.className = "card-text fst-italic";

    const deleteButton = _deleteButton();

    outerDiv.append(insideDiv);
    insideDiv.append(getDate, getTime, getText, deleteButton);

    outerDiv.addEventListener("mouseenter" , function() {
        const currentNote = getNoteById(note.id, state.notes);
        draw(state.notes);

    })


    
    return outerDiv;


    function _deleteButton() {
        const button = document.createElement("button");
        button.classList.add("btn", "btn-danger");
        // button.style.display = "none";
        button.classList.add("fade-in-visible");
        button.classList.add("deleteMeButton");
        button.onclick = function () {
            const noteIndex = getNoteByIndex(note.id, state.notes);
            // if (noteIndex === undefined) return;
            state.notes.splice(noteIndex, 1);
            draw(state.notes);
            localStorage.setItem(CONFIG.NOTES, JSON.stringify(state.notes));
            setNotes(state.notes);

        };
        const trashIcon = document.createElement("i");
        trashIcon.classList.add("bi", "bi-x");
        button.append(trashIcon);

        return button;
    }
};

function getNoteById(id, notes) {
    if (typeof id !== "string") return;
    if (!Array.isArray(notes)) return;
    for (let index = 0; index < notes.length; index++) {
        const currentNote = notes[index];
        if (currentNote.id === id) {
            return currentNote;
        }
        
    }
}

function getNoteByIndex (id, notes) {
    // if (typeof id !== "string") return;
    for (let index = 0; index < notes.length; index++) {
        const currentNote = notes[index];
        if (currentNote.id === id) {
            return index;
        }
    
        
    
}}

function setNotes(notes) {
    localStorage.setItem(CONFIG.NOTES, JSON.stringify(notes));
    draw(state.notes);
}


