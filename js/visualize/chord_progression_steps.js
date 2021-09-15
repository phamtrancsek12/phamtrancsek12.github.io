var render_size = [450, 100]

function visualize_lines(bars, div_name, key_signature, time_signature, is_showed_time_signature){
    VF = Vex.Flow;
    div = document.getElementById(div_name)
    div.innerHTML = ''
    renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
    renderer.resize(render_size[0], render_size[1]);

    context = renderer.getContext();

    current_x = 0
    current_width = 10
    stave_size = Math.floor((render_size[0] - 20)/bars.length)

    for (let bar_index=0; bar_index < bars.length; bar_index++){
        list_note = bars[bar_index]

        stave = new Vex.Flow.Stave(current_x + current_width, 0, stave_size);
        if (bar_index == 0) {
            stave.addClef("treble")
            stave.setKeySignature(key_signature)
            if (is_showed_time_signature) stave.setTimeSignature(time_signature)
        }
        stave.setContext(context).draw();

        notes = []
        for (let i = 0; i < list_note.length; i++) {
            key_name = list_note[i].name.toLowerCase() + "/" + list_note[i].octave
            temp = new Vex.Flow.StaveNote({ keys: [key_name], duration: list_note[i].duration })
            if (list_note[i].has_dot) temp.addDot(0)
            notes.push(temp)
            if (list_note[i].note == "B") octave = "/5"
        }
        beams = VF.Beam.generateBeams(notes);
        Vex.Flow.Formatter.FormatAndDraw(context, stave, notes);
        beams.forEach(function(b) {b.setContext(context).draw()})

        current_x = stave.x
        current_width = stave.width
    }
}