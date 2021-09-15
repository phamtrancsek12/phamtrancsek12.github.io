function get_pitch_natural(note1, note2){
    current_note = note1
    total_pitch = 0
    while (current_note != note2) {
        next_note = natural_note_up[current_note]
        total_pitch += natural_note_pitch[ current_note + "-" + next_note]
        current_note = next_note
    }
    return total_pitch
}


function get_pitch(note1, note2){
    total_pitch = get_pitch_natural(note1.note, note2.note)

    if (note1.acc == "#") total_pitch -= 0.5
    if (note1.acc == "##") total_pitch -= 1
    if (note1.acc == "b") total_pitch += 0.5
    if (note1.acc == "bb") total_pitch += 1

    if (note2.acc == "#") total_pitch += 0.5
    if (note2.acc == "##") total_pitch += 1
    if (note2.acc == "b") total_pitch -= 0.5
    if (note2.acc == "bb") total_pitch -= 1

    return total_pitch
}


function add_accidental(note1, note2, pitch){
    total_pitch = get_pitch(note1, note2)
    if (pitch == total_pitch) note2.acc = ""
    if (pitch - total_pitch == 0.5) note2.acc = "#"
    if (pitch - total_pitch == 1) note2.acc = "##"
    if (pitch - total_pitch == -0.5) note2.acc = "b"
    if (pitch - total_pitch == -1) note2.acc = "bb"
    note2.update_name()
    return note2
}


function get_scale_note(tone_note, type) {
    scale_pitch = []
    if (type == "major") scale_pitch = major_scale_pitch
    if (type == "minor") scale_pitch = minor_scale_pitch

    list_note = [tone_note]
    current_note = tone_note

    for (let i = 0; i < 7; i++) {
        next_note = new Note("", "")
        next_note.note = natural_note_up[current_note.note]
        pitch = scale_pitch[i]
        next_note = add_accidental(current_note, next_note, pitch)
        next_note.update_name()
        list_note.push(next_note)
        current_note = next_note
    }
    return list_note
}


function get_chord(tone_note, type){
    chord_pitch = []
    if (type == "major") chord_pitch = major_chord_pitch
    if (type == "minor") chord_pitch = minor_chord_pitch
    if (type == "dim") chord_pitch = dim_chord_pitch
    if (type == "aug") chord_pitch = aug_chord_pitch

    list_note = [tone_note]
    current_note = tone_note

    for (let i = 0; i < 2; i++) {
        next_note = new Note("", "")
        next_note.note = natural_note_up[current_note.note]
        next_note.note = natural_note_up[next_note.note]
        pitch = chord_pitch[i]
        next_note = add_accidental(current_note, next_note, pitch)
        next_note.update_name()
        list_note.push(next_note)
        current_note = next_note
    }

    return list_note
}


function get_scale_chords(tone_note, type){
    chord_scale = []
    if (type == "major") chord_scale = major_chord_scale
    if (type == "minor") chord_scale = minor_chord_scale

    scale_note = get_scale_note(tone_note, type)

    list_chords = []

    for (let i = 0; i < 7; i++) {
        current_note = scale_note[i]
        current_type = chord_scale[i]
        chord = new Chord(current_note, current_type)
        list_chords.push(chord)
    }
    return list_chords
}

