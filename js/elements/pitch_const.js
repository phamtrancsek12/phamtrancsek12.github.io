accepted_acc = ["", "b", "#", "bb", "##"]
natural_note = ["C", "D", "E", "F", "G", "A", "B", "C"]
scale_type= ["major", "minor"]
chord_types = ["major", "minor", "dim", "aug"]


natural_note_up = {}
for (let i = 0; i < natural_note.length - 1; i++) natural_note_up[natural_note[i]] = natural_note[i + 1]
natural_note_down = {}
for (let i = 1; i < natural_note.length; i++) natural_note_down[natural_note[i]] = natural_note[i - 1]

natural_note_pitch = {
    "C-D": 1,
    "D-E": 1,
    "E-F": 0.5,
    "F-G": 1,
    "G-A": 1,
    "A-B": 1,
    "B-C": 0.5
};

major_scale_pitch = [1, 1, 0.5, 1, 1, 1, 0.5]
minor_scale_pitch = [1, 0.5, 1, 1, 0.5, 1, 1]

major_chord_pitch = [2, 1.5]
minor_chord_pitch = [1.5, 2]
dim_chord_pitch = [1.5, 1.5]
aug_chord_pitch = [2, 2]

major_chord_scale = ["major", "minor", "minor", "major", "major", "minor", "dim"]
minor_chord_scale = ["minor", "dim", "major", "minor", "major", "major", "major"]



siblings_scale = {
    "Cmajor": "Aminor",
    "Gmajor": "Eminor",
    "Dmajor": "Bminor",
    "Amajor": "F#minor",
    "Emajor": "C#minor",
    "Bmajor": "G#minor",
    "F#major": "D#minor",
    "Gbmajor": "Ebminor",
    "Dbmajor": "Bbminor",
    "Abmajor": "Fminor",
    "Ebmajor": "Cminor",
    "Bbmajor": "Gminor",
    "Fbmajor": "Dminor",
}
keys = Object.keys(siblings_scale)
for (let i = 0; i < keys.length; i++)
    siblings_scale[siblings_scale[keys[i]]] = keys[i]

T = [0, 2, 5]
S = [1, 3]
D = [4, 6]
D_cant_move = S