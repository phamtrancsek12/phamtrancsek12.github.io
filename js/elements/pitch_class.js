class Note {
    constructor(note, acc, duration="q", octave="4", has_dot=false) {
        this.note = note
        this.acc = acc
        this.duration = duration
        this.has_dot = has_dot
        this.octave = octave
        this.name = note + acc
    }
    update_name(){
        this.name = this.note + this.acc
        return this.name
    }
}

class Chord {
    constructor(note, type) {
        this.tone_note = note
        this.type = type
        this.name = note.note + note.acc + type
        this.notes = get_chord(note, type)
        this.bass = note.note
    }
}

class Scale {
    constructor(note, type) {
        this.tone_note = note
        this.type = type
        this.name = note.note + note.acc + type
        if (type == "major") this.visualize_name = note.note + note.acc
        if (type == "minor") this.visualize_name = note.note + note.acc + "m"
        this.notes = get_scale_note(note, type)
        this.chords = get_scale_chords(note, type)
    }
}

class ChordTree {
    constructor(chord){
        this.chord = chord
        this.next_chords = []
    }
}