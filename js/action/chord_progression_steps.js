var song_list = [be_be_bang_bong, beo_dat_may_troi, you_are_my_sunshine, chenh_venh, silent_night, lullaby, donna_donna]
var song = be_be_bang_bong
var step = 1
var show_hint = false

show_songs(song)
var key_note = new Note(song["key_signature"][0], song["key_signature"][1])
var scale = new Scale(key_note, song["key_signature"][2])
var bar_chords = find_chord_progression(song)



//-------------- Visualize

function generate_line(index){
    return "<div class='row' id='music-line-" + index + "'></div>"
}
function generate_answer_line(index){
    return "<div class='row d-flex flex-wrap justify-content-left' style='margin:5px; padding:5px;' id='answer-line-" + index + "'></div>"
}

function generate_answer_box(index){
    return "<div class='col-md-3' id='answer-box-" + index + "'>" +
               "<div class='input-group mb-2 mb-md-0'>" +
                   "<input id='answer-chord-" + index +  "' type='text' class='form-control' aria-label='answer-chord-" + index + "' placeholder='" + (index + 1) + "' data-toggle='tooltip' data-placement='bottom' title='eg. C, Am/E, Fmajor, E#minor, Cdim, etc.'>" +
                   "<div class='input-group-append'>" +
                       "<span id='song-chords-submit-button' style='padding:0px;font-size=10px;' onclick='click_song_chords_submit(" + index + ")' class='input-group-text btn-custom-grey'><i class='ion-ios-paper-plane icon-custom'></i></span>" +
                   "</div>" +
               "</div>" +
           "</div>"
}

function show_songs(song){
    $("#song-title").text(song["title"])

    let song_lines = ""
    let answer_lines = ""

    for (let i = 0; i < song["lines"].length; i++) {
//        song_lines += generate_line(i)
        answer_lines+= generate_answer_line(i)
    }
//    $("#music-sheet").html(song_lines)
    $("#music-sheet").attr("src", song["path"])
    $("#step-4").html(answer_lines)

    current_bar = 0
    for (let i = 0; i < song["lines"].length; i++) {
        last_bar = current_bar + song["lines"][i]
        bars = song["bars"].slice(current_bar, last_bar)

//        div_name = "music-line-" + i
//
//        key_signature = song["vexflow_key_signature"]
//        time_signature = song["time_signature"]
//
//        if (i==0) is_showed_time_signature = true
//        else is_showed_time_signature = false
//
//        visualize_lines(bars, div_name, key_signature, time_signature, is_showed_time_signature)

        let answer_cols = ""
        for (let j = current_bar; j < last_bar; j++) {
            answer_cols += generate_answer_box(j)
        }
        $("#answer-line-" + i).html(answer_cols)

        current_bar = last_bar
    }
}

function show_answer_step_1(){
    $("#scale-note-ans").val(song["key_signature"][0] + song["key_signature"][1]).prop("readonly", true)
    $("#scale-type-ans").val(song["key_signature"][2]).prop("readonly", true)
}

function show_answer_step_2(){
    for (let i=0; i < scale["notes"].length; i++){
        $("#scale-note-" + i).val(scale["notes"][i].name).prop("readonly", true)
    }
}

function show_answer_step_3(){
    for (let i=0; i < scale["chords"].length; i++){
        $("#chords-note-" + i).val(scale["chords"][i].name).prop("readonly", true)

        let message = scale["chords"][i].name + ": "
                        + scale["chords"][i]["notes"][0].name + ", "
                        + scale["chords"][i]["notes"][1].name + ", "
                        + scale["chords"][i]["notes"][2].name

        $("#chords-note-" + i).attr('title', message).tooltip('dispose').tooltip('show').tooltip("hide")
    }
}

function remove_answer_step_1(){
    $("#scale-note-ans").val("").prop("readonly", false)
    $("#scale-type-ans").val("").prop("readonly", false)
}

function remove_answer_step_2(){
    for (let i=0; i < scale["notes"].length; i++){
        $("#scale-note-" + i).val("").prop("readonly", false)
    }
}

function remove_answer_step_3(){
    for (let i=0; i < scale["chords"].length; i++){
        $("#chords-note-" + i).val("").prop("readonly", false)
        $("#chords-note-" + i).attr('title', "eg. C, Am, Fmajor, E#minor, Cdim, etc.").tooltip('dispose').tooltip('show').tooltip("hide")
    }
}

function remove_answer_step_4(){
    for (let i=0; i < song["bars"].length; i++){
        $("#answer-chord-" + i).val("").prop("readonly", false)
    }
}


//---------------------- Buttons

function click_get_song(index){
    song = song_list[index]

    show_songs(song)
    key_note = new Note(song["key_signature"][0], song["key_signature"][1])
    scale = new Scale(key_note, song["key_signature"][2])
    bar_chords = find_chord_progression(song)

    click_restart()
}

function click_hint(){
    if (!show_hint) {
        $("#hint-step-" + step).removeClass("custom-hidden")
        $("#hint-button").addClass("hint-icon-custom-clicked")
        show_hint = !show_hint;
    }
    else {
        $("#hint-step-" + step).addClass("custom-hidden")
        $("#hint-button").removeClass("hint-icon-custom-clicked")
        show_hint = !show_hint;
    }
}

function click_back(){
    if (step > 1) {
        $("#step-" + step).addClass("custom-hidden")
        $("#hint-step-" + step).addClass("custom-hidden")
        $("#title-step-" + step).addClass("custom-hidden")
        step = step - 1
        if (step == 1) remove_answer_step_1()
        if (step == 2) remove_answer_step_2()
        if (step == 3) remove_answer_step_3()
        $("#step-" + step).removeClass("custom-hidden")
        $("#title-step-" + step).removeClass("custom-hidden")
    }
}

function click_next(){
    if (step < 4) {
        $("#hint-step-" + step).addClass("custom-hidden")
        $("#title-step-" + step).addClass("custom-hidden")
        $("#hint-button").removeClass("hint-icon-custom-clicked")
        if (step == 1) show_answer_step_1()
        if (step == 2) show_answer_step_2()
        if (step == 3) show_answer_step_3()
        show_hint = false
        step = step + 1
        $("#step-" + step).removeClass("custom-hidden")
        $("#title-step-" + step).removeClass("custom-hidden")
    }
}

function click_restart(){
    for (let i=1; i<5; i++) {
        $("#step-" + i).addClass("custom-hidden")
        $("#hint-step-" + i).addClass("custom-hidden")
        $("#title-step-" + i).addClass("custom-hidden")
    }

    step = 1
    $("#step-1").removeClass("custom-hidden")
    $("#title-step-1").removeClass("custom-hidden")

    show_hint = false

    remove_answer_step_1()
    remove_answer_step_2()
    remove_answer_step_3()
    remove_answer_step_4()
}

//---------------------- Utils

function extract_chord(user_ans){
    let note = ""
    let acc = ""
    let bass = ""
    let type = ""

    if (user_ans.includes("major") || user_ans.includes("minor") || user_ans.includes("dim") || user_ans.includes("-") || user_ans.includes("o") || user_ans.includes("O") || user_ans.includes("0")){
        note = user_ans.substring(0,1).toUpperCase()
        acc = user_ans.substring(1,2).toLowerCase()
        if (!accepted_acc.includes(acc)) acc = ""
        if (user_ans.includes("major")) type = "major"
        else if (user_ans.includes("minor")) type = "minor"
        else if (user_ans.includes("dim") || user_ans.includes("-") || user_ans.includes("o") || user_ans.includes("O") || user_ans.includes("0")) type = "dim"
        if (user_ans.includes("/")) bass = user_ans.substring(user_ans.length-1)
    } else {
        note = user_ans.substring(0,1).toUpperCase()
        acc = user_ans.substring(1,2).toLowerCase()
        if (!accepted_acc.includes(acc)) acc = ""
        let index_type = 2
        if (acc == "") index_type = 1
        if (user_ans.substring(index_type, index_type + 1).toLowerCase() == "m") type = "minor"
        else if (user_ans.includes("dim")) type = "dim"
        else type = "major"
        if (user_ans.includes("/")) bass = user_ans.split("/")[1]
    }

    if (note == "" || type == "") return ""
    if (bass == "") bass = note + acc


    let note_obj = new Note(note, acc)
    let chord_obj = new Chord(note_obj, type)
    if (bass != chord_obj["notes"][0].name && bass != chord_obj["notes"][1].name && bass != chord_obj["notes"][2].name)
        bass = "" // Invalid bass
    chord_obj.bass = bass
    return chord_obj
}

//---------------------- Step 1


function submit_step1(){
    let user_answer_note = $("#scale-note-ans").val().trim().substring(0,1).toUpperCase()
    let user_answer_acc = $("#scale-note-ans").val().trim().substring(1).toLowerCase()
    let user_answer_type = $("#scale-type-ans").val().trim().toLowerCase()
    let message = ""
    let whole_name = user_answer_note + user_answer_acc + user_answer_type
    if (whole_name == song["key_signature"][3]){
        $("#scale-note-ans").removeClass("border-error-custom")
        $("#scale-note-ans").prop("readonly", true)
        $("#scale-type-ans").removeClass("border-error-custom")
        $("#scale-type-ans").prop("readonly", true)
        message = "Đúng rồi \\(^_^)/ Bấm NEXT để làm tiếp nhé!"
        $("#scale-note-ans").attr('title', message).tooltip('dispose').tooltip('show').tooltip("hide")
        $("#scale-type-ans").attr('title', message).tooltip('dispose').tooltip('show').tooltip("hide")
        return
    }

    if (siblings_scale[whole_name] != undefined){
        if (siblings_scale[whole_name] == song["key_signature"][3]){
            $("#scale-note-ans").addClass("border-error-custom")
            $("#scale-type-ans").addClass("border-error-custom")
            message = "Xem lại nốt cuối cùng của bài để xác định đúng giọng Trưởng hay Thứ nhé ;)"
            $("#scale-note-ans").attr('title', message).tooltip('dispose').tooltip('show').tooltip("hide")
            $("#scale-type-ans").attr('title', message).tooltip('dispose').tooltip('show').tooltip("hide")
            return
        }
    }

    if (user_answer_note != song["key_signature"][0] || user_answer_acc != song["key_signature"][1]) {
        $("#scale-note-ans").addClass("border-error-custom")
        if (user_answer_note == "") message = "Bạn chưa nhập tên nốt rồi :'("
        else {
            if (!natural_note.includes(user_answer_note) || !"#b".includes(user_answer_acc))
                message = "Tên nốt không hợp lệ! Chỉ nhập các chữ cái A - G và dấu #/b nhé!"
            else {
                message = "Chưa đúng rồi! Hãy nhìn kĩ dấu hoá đầu bản nhạc nhé! Bấm (?) để xem gợi ý nếu bạn chưa nhớ nhé!"
            }
        }
        $("#scale-note-ans").attr('title', message).tooltip('dispose').tooltip('show').tooltip("hide")
    } else {
        $("#scale-note-ans").removeClass("border-error-custom")
        $("#scale-note-ans").prop("readonly", true)
        message = "Đúng rồi \\(^_^)/"
        $("#scale-note-ans").attr('title', message).tooltip('dispose').tooltip('show').tooltip("hide")
    }

    if (user_answer_type != song["key_signature"][2]) {
        $("#scale-type-ans").addClass("border-error-custom")
        if (user_answer_type != "major" && user_answer_type != "minor") message = "Nhập 'major' hoặc 'minor nhé ;)'"
        else message = "Chưa đúng rồi! Hãy nhìn kĩ dấu hoá đầu bản nhạc nhé! Bấm (?) để xem gợi ý nếu bạn chưa nhớ nè!"
        $("#scale-type-ans").attr('title', message).tooltip('dispose').tooltip('show').tooltip("hide")
    } else {
        $("#scale-types-ans").removeClass("border-error-custom")
        $("#scale-types-ans").prop("readonly", true)
        message = "Đúng rồi \\(^_^)/"
        $("#scale-types-ans").attr('title', message).tooltip('dispose').tooltip('show').tooltip("hide")
    }

}

//---------------------- Step 2


function add_tool_tips_scale(index, user_ans, correct_ans){
    let note = user_ans.substring(0,1).toUpperCase()
    let acc = user_ans.substring(1).toLowerCase()
    let message = ""

    if (user_ans == "") message = "Bạn chưa nhập tên nốt rồi :'("
    else {
        if (index == 0){
            if (!natural_note.includes(note)) message = "Tên nốt không hợp lệ! Chỉ nhập các chữ cái A - G và dấu #/b nhé!"
            else if (note != correct_ans["note"]) message = "Oops! Nốt đầu tiên chính là tên của giọng đấy ^_^"
            else if (acc != correct_ans["acc"]) {
                if (!accepted_acc.includes(acc)) message = "Các dấu hoá bao gồm b/bb/#/## đó!"
                else message = "Oops! Nốt đầu tiên chính là tên của giọng đấy!"
            }
        } else {

            if (!natural_note.includes(note)) message = "Tên nốt không hợp lệ! Chỉ nhập các chữ cái A - G và dấu #/b nhé!"
            else if (note != correct_ans["note"]) message = "Cùng đếm lại từ " + song["key_signature"][0] + " đến nốt thứ " + (index + 1) + " nào!"
            else if (acc != correct_ans["acc"]) {
                if (!accepted_acc.includes(acc)) message = "Các dấu hoá bao gồm b/bb/#/## đó!"
                else message = "Kiểm tra lại dấu hoá nhé! " + "Nếu chưa nhớ được công thức của giọng " + song["key_signature"][2] + ", bấm vào (?) để xem gợi ý nhé!"
            }
        }
    }

    $("#scale-note-" + index).attr('title', message).tooltip('dispose').tooltip('show').tooltip("hide")
}

function click_scale_submit_answer(){
    let count_correct = 0
    for (let i = 0; i < scale["notes"].length; i++) {
        let user_ans = $("#scale-note-" + i).val().trim()
        if (user_ans.toLowerCase() != scale["notes"][i]["name"].toLowerCase()) {
            $("#scale-note-" + i).addClass("border-error-custom")
            add_tool_tips_scale(i, user_ans,  scale["notes"][i])
        } else {
            count_correct += 1
            $("#scale-note-" + i).removeClass("border-error-custom")
            $("#scale-note-" + i).prop("readonly", true)
            $("#scale-note-" + i).attr('title', "Đúng rồi \\(^_^)/").tooltip('dispose').tooltip('show').tooltip("hide")
        }
    }
    if (count_correct == 7) {
        for (let i = 0; i < 7; i++) {
            $("#scale-note-" + i).attr('title', "Đúng rồi \\(^_^)/ Bấm NEXT để làm tiếp nhé!").tooltip('dispose').tooltip('show').tooltip("hide")
        }
    }
}

//---------------------- Step 3

function add_tool_tips_chords(index, user_ans, correct_ans){
    let message = ""
    if (index == 0){
        if (user_ans.name != correct_ans.name) message = "Oops! Hợp âm đầu tiên cũng là tên của giọng đấy ^_^"
    } else {
        if (user_ans.name != correct_ans.name) {
            if ((index == 4) && (user_ans.tone_note.name == correct_ans.tone_note.name) && (user_ans.type == "minor") && (scale_chord_type_list[scale_chord_type] == "minor"))
                message = "Oups! Để ý trường hợp đặc biệt của bậc 5 giọng Thứ nhé!"
            else if (user_ans.tone_note.name != correct_ans.tone_note.name) message = "Chủ âm cũng chính là nốt thứ " + index + " trong giọng đấy ;)"
            else message = "Nếu chưa nhớ được thứ tự Trưởng - Thứ của hợp âm trong giọng, bấm vào (?) để xem gợi ý nhé!"
        }
    }

    return message
}

function click_chords_submit_answer(){
    let count_correct = 0

    for (let i = 0; i < 7; i++) {
        let user_ans = $("#chords-note-" + i).val().trim()
        let message = ""

        if (user_ans == "" || user_ans == undefined) message = "Bạn chưa nhập tên hợp âm rồi :'("
        else {
            user_ans = extract_chord(user_ans)
            if (user_ans == "") message = "Tên hợp âm không hợp lệ! Eg. C, Am/E, Fmajor, E#minor, Cdim"
            if (user_ans["bass"] != user_ans["tone_note"].name) message = "Nhập hợp âm gốc, không dùng hợp âm đảo bass nhé!"
        }

        if (message != "") {
            $("#chords-note-" + i).addClass("border-error-custom")
            $("#chords-note-" + i).attr('title', message).tooltip('dispose').tooltip('show').tooltip("hide")
        } else {
            message = add_tool_tips_chords(i, user_ans, scale["chords"][i])

            if (message != "") {
                $("#chords-note-" + i).addClass("border-error-custom")
                $("#chords-note-" + i).attr('title', message).tooltip('dispose').tooltip('show').tooltip("hide")
            } else {
                count_correct += 1
                $("#chords-note-" + i).removeClass("border-error-custom")
                $("#chords-note-" + i).prop("readonly", true)
                $("#chords-note-" + i).attr('title', "Đúng rồi \\(^_^)/").tooltip('dispose').tooltip('show').tooltip("hide")
            }
        }
    }
    if (count_correct == 7) {
        for (let i = 0; i < 7; i++) {
            $("#chords-note-" + i).attr('title', "Đúng rồi \\(^_^)/ Bấm NEXT để làm tiếp nhé!").tooltip('dispose').tooltip('show').tooltip("hide")
        }
    }
}


//---------------------- Step 4

function get_TDS(chord) {
    let i = 0
    for (i = 0; i < scale["chords"].length; i++){
        if (chord.name == scale["chords"][i].name) break
    }
    if (T.includes(i)) return "t"
    else if (S.includes(i)) return "s"
    else return "d"
}

function click_song_chords_submit(index) {

    $("#answer-chord-" + index).removeClass("border-suggest-custom")
    $("#answer-chord-" + index).removeClass("custom-readonly")

    let possible_chord = bar_chords[index]
    let first_note = song["bars"][index][0].name
    if (!Object.keys(chord_map["note_to_chord"]).includes(first_note)) {
        for (let j=0; j < scale["notes"].length; j++){
            if (scale["notes"][j].name.includes(first_note)){
                first_note = scale["notes"][j].name
            }
        }
    }
    let user_ans = $("#answer-chord-" + index).val().trim()
    let message = ""

    if (user_ans == "" || user_ans == undefined) message = "Bạn chưa nhập tên hợp âm rồi :'("
    else {
        user_ans = extract_chord(user_ans)
        if (user_ans == "") message = "Tên hợp âm không hợp lệ! Eg. C, Am/E, Fmajor, E#minor, Cdim"
        else if (user_ans["bass"] == "") message = "Nốt bass phải là nốt thuộc hợp âm!"
    }


    if (message != "") {
        $("#answer-chord-" + index).addClass("border-error-custom")
        $("#answer-chord-" + index).attr('title', message).tooltip('dispose').tooltip('show').tooltip("hide")
        return
    }

    // Check if chord in scale
    let is_possible_chord = false
    for (let i = 0; i < scale["chords"].length; i++){
        if (user_ans.name == scale["chords"][i].name) {
            is_possible_chord = true
            break
        }
    }

    if (!is_possible_chord) {
        message = "Hợp âm không thuộc giọng của bài hát rồi!"
        $("#answer-chord-" + index).addClass("border-error-custom")
        $("#answer-chord-" + index).attr('title', message).tooltip('dispose').tooltip('show').tooltip("hide")
        return
    }

    // Check if chord contains first note
    is_possible_chord = false
    let possible_chord_names = ""
    for (let i=0; i < possible_chord.length; i++){
        if (user_ans.name == possible_chord[i].name) {
            is_possible_chord = true
            break
        }
        possible_chord_names += possible_chord[i].name + ", "
    }

    if (!is_possible_chord) {
        message = "Nốt đầu tiên của ô nhịp là " + first_note + ". Hãy chọn hợp âm có chứa nốt này nhé! (" + possible_chord_names.substring(0, possible_chord_names.length - 2) + ")."
        $("#answer-chord-" + index).addClass("border-error-custom")
        $("#answer-chord-" + index).attr('title', message).tooltip('dispose').tooltip('show').tooltip("hide")
        return
    }

    // Check last bar
    if (index == song["bars"].length - 1) {
        if (user_ans.name != scale["chords"][0].name && user_ans.name != scale["chords"][4].name) {
            message = "Hợp âm kết bài thường là I/i hoặc V"
            $("#answer-chord-" + index).addClass("border-suggest-custom")
            $("#answer-chord-" + index).attr('title', message).tooltip('dispose').tooltip('show').tooltip("hide")
            return
        }
    }

    // Check if first note is also bass
    if (index != song["bars"].length - 1) {
        if (first_note == user_ans.bass){
            message = "Không nên chọn nốt bass trùng với giai điệu! Chọn một hợp âm khác hoặc đảo bass để phù hợp hơn nhé ~ Trừ trường hợp dùng hợp âm V để kết đoạn ;)"
            $("#answer-chord-" + index).addClass("border-suggest-custom")
            $("#answer-chord-" + index).attr('title', message).tooltip('dispose').tooltip('show').tooltip("hide")
            return
        }
    }

    // Check T/S/D
    if (index != 0) {
        let user_prev_ans = $("#answer-chord-" + (index - 1)).val().trim()
        user_prev_ans = extract_chord(user_prev_ans)
        if (index != song["bars"].length - 1 && user_prev_ans == "") {
            message = "Hãy điền hợp âm theo thứ tự để dễ xét điều kiện T/D/S nhé ^_^"
            $("#answer-chord-" + index).addClass("border-suggest-custom")
            $("#answer-chord-" + index).attr('title', message).tooltip('dispose').tooltip('show').tooltip("hide")
            return
        } else {
            let ans_tds = get_TDS(user_ans)
            let prev_ans_tds = get_TDS(user_prev_ans)
            if (prev_ans_tds == "d" && ans_tds == "s") {
                message = "Hợp âm D (" + user_prev_ans.name + ") không chuyển về S (" + user_ans.name + ")."
                $("#answer-chord-" + index).addClass("border-error-custom")
                $("#answer-chord-" + index).attr('title', message).tooltip('dispose').tooltip('show').tooltip("hide")
                return
            }
        }
    }

    $("#answer-chord-" + index).removeClass("border-error-custom")
    $("#answer-chord-" + index).addClass("custom-readonly")
    $("#answer-chord-" + index).attr('title', "Đúng rồi! Bạn thử lại trên đàn để xem đã hay chưa nhé!").tooltip('dispose').tooltip('show').tooltip("hide")
}