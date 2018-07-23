const yargs = require('yargs');
const fs = require('fs');
const _ = require('lodash');
const notes = require('./notes.js');

const titleOption = {
    describe: 'Title of note',
    demand : true,
    alias : 't' 
};

const bodyOption = {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
};

const argv = yargs
.command('add', 'Add a new note', {
    title: titleOption,
    body: bodyOption
})
.command('read', 'Read a note', {
    title: titleOption
})
.command('list', 'List all notes')
.command('remove', 'Remove a note', {
    title: titleOption
})
.help()
.argv;

var command = argv._[0];

if (command === 'add') {
    var note = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log('Note created');
        notes.logNote(note);
    } else {
        console.log('Note title taken');
    }
} else if (command === 'read') {
    var note = notes.readNote(argv.title);
    if (note) {
        console.log('Note found');
        notes.logNote(note);
    } else {
        console.log('Note not found')
    }
} else if (command === 'list') {
    var allNotes = notes.getAll();
    if (allNotes) {
        console.log(`Printing ${allNotes.length} note(s).`);
        allNotes.forEach((note) => notes.logNote(note));
    } else {
        console.log('Note not found');
    }
} else if (command === 'remove') {
    var removedNote = notes.removeNote(argv.title);
    if (removedNote) {
        console.log('Note removed');
    } else {
        console.log('Note not found');
    }
} else {
    console.log('Command not recognized');
}

