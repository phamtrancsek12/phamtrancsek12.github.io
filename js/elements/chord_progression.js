function get_chord_map(song_scale){
    let note_to_chord = {}
    let chord_to_index = {}
    for (let i = 0; i < song_scale["chords"].length; i++) {
        let chord = song_scale["chords"][i]
        chord_to_index[chord.name] = i
        for (let j = 0; j < chord["notes"].length; j++) {
            let note = chord["notes"][j].name
            if (note_to_chord[note] == undefined) note_to_chord[note] = []
            note_to_chord[note].push(chord)
        }
    }
    return {"note_to_chord": note_to_chord, "chord_to_index": chord_to_index}
}

function can_move_to(chord1, chord2, chord_map){
    let chord_1_id = chord_map["chord_to_index"][chord1.name]
    if (D.includes(chord_1_id)){
        let chord_2_id = chord_map["chord_to_index"][chord2.name]
        if (D_cant_move.includes(chord_2_id)) return false
    }
    return true
}

function find_chord_progression(song){
    let key_note = song["key_signature"][0]
    let key_acc = song["key_signature"][1]
    let key_type = song["key_signature"] [2]
    key_note = new Note(key_note, key_acc)

    let song_scale = new Scale(key_note, key_type)
    chord_map = get_chord_map(song_scale)

    let bar_chord = []
    let list_chord = []
    for (let i = 0; i < song["bars"].length; i++) {
        let first_note_bar = song["bars"][i][0].name
        if (!Object.keys(chord_map["note_to_chord"]).includes(first_note_bar)) {
            for (let j=0; j < song_scale["notes"].length; j++){
                if (song_scale["notes"][j].name.includes(first_note_bar)){
                    first_note_bar = song_scale["notes"][j].name
                }
            }
        }

        if (i == 0){
            list_chord = []
            for (let j = 0; j < chord_map["note_to_chord"][first_note_bar].length; j++) {
                list_chord.push(chord_map["note_to_chord"][first_note_bar][j])
            }
            bar_chord.push(list_chord)
        }
        else {
            let temp_list_chord = []
            for (let z = 0; z < chord_map["note_to_chord"][first_note_bar].length; z++) {
                let chord_2 = chord_map["note_to_chord"][first_note_bar][z]
                for (let j = 0; j < list_chord.length; j++) {
                    let chord_1 = list_chord[j]
                    if (can_move_to(chord_1, chord_2, chord_map)){
                        temp_list_chord.push(chord_2)
                        break
                    }
                }
            }
            bar_chord.push(temp_list_chord)
            list_chord = temp_list_chord
        }
    }
    return bar_chord
}