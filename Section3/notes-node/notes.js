const fs = require('fs');

var fetchNote = () => {
    try {
        var notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    } catch (e) {
        return [];
    }
}

var saveNote = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}

var addNote = (title, body) => {
    var notes = fetchNote();
    var note = {
        title,
        body
    };
    var dumplicates = notes.filter((note) => note.title === title);
    if (dumplicates.length === 0) {
        notes.push(note);
        saveNote(notes);
        return note;
    }
}

var readNote = (title) => {
    var notes = fetchNote();
    var target = notes.filter((note) => note.title === title);
    return target[0];
}

var getAll = () => {
    return fetchNote();
}

var removeNote = (title) => {
    var notes = fetchNote();
    var remain = notes.filter((note) => note.title !== title);
    saveNote(remain);
    return notes.length !== remain.length;
}

var logNote = (note) => {
    console.log('--');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
}

module.exports = {
    addNote,
    readNote,
    getAll,
    removeNote,
    logNote
};