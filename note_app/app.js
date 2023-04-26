const fs = require('fs')
const yargs = require('yargs')
const note = require('./notes')

// fs.writeFileSync("node.txt",'this file was created by node application')
// fs.appendFileSync("node.txt","this is the second statment.")


yargs.command({
    command:"add",
    describe: "add a new  note",
    builder:{
        title:{
            describe:'note title',
            demandOption:true,
            type:"string"
        },
        body:{
            describe:'description of the new note',
            demandOption:true,
            type:"string"
        }
    },
    handler(argv){
        note.addNotes(argv.title, argv.body)
    }
})


yargs.command({
    command:'remove',
    describe:'removing note',
    builder:{
        title:{
            describe:"note title",
            demandOption:true,
            type:"string"
        }
    },
    handler(argv){
        note.removeNote(argv.title)
    }
})

yargs.command({
    command:'list',
    describe:'list of notes',
    builder:{
        title:{
            describe:"note title",
            demandOption:false,
            type:"string"
        }
    },
    handler(argv){
        note.listNotes(argv.title)
    }
})

yargs.command({
    command:'read',
    describe:'reading the notes',
    builder:{
        title:{
            describe:"note title",
            demandOption:true,
            type:"string"
        }
    },
    handler(argv){
        note.readNote(argv.title)
    }
})


yargs.parse()

// console.log(yargs.argv)