const fs = require('fs');
const chalk = require('chalk')

const getNotes = function(){
    return 'your Notes.....'
}

const addNotes = (title, body)=>{
    const notes= loadNotes()

    // const duplicate = notes.filter((note)=> note.title === title)
    const duplicate = notes.find((note)=> note.title === title)
    console.log(duplicate.length)
    if (!duplicate) {
        notes.push({
            title:title,
            body:body
        })
        console.log(notes)
        saveNotes(notes)
    }
}


const removeNote = (title)=>{
    const notes = loadNotes()
    const notesToKeep = notes.filter((note)=> note.title !== title)

    if (notes.length > notesToKeep.length){
        saveNotes(notesToKeep)
        console.log(chalk.green.inverse('note is removed'))
    }
    else {
        console.log(chalk.red.inverse('note is not removed'))
    }

    
}

const listNotes = (title)=>{
    const notes = loadNotes()
    console.log(chalk.inverse('your notes'))
    notes.forEach((element) => {
        console.log(element.title)
    });
}


const readNote = (title)=>{
    const notes = loadNotes()
    const note = notes.find((note)=>{
        if(note.title === title){
            console.log(chalk.green.inverse(note.title))
            console.log(chalk.green.inverse(note.body))
        }
        else {
            console.log(chalk.inverse('note not found'))
        }
    })
}

const saveNotes = (notes)=>{
    const data = JSON.stringify(notes)
    fs.writeFileSync('data.json',data)
}

const loadNotes = ()=>{
    try{
        const data = fs.readFileSync('data.json').toString()
        const datas= JSON.parse(data)
        return datas
    }
    catch (e){
        console.log('file is not created')
        return []
    }

    
}



module.exports = {
    getNotes: getNotes,
    addNotes:addNotes,
    removeNote:removeNote,
    listNotes :listNotes,
    readNote : readNote
}