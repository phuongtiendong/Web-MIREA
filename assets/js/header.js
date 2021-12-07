
function showChangePassword(){
    $('#modal-change-password').modal('show');
    $('#modal-info').modal('hide');
}

function checkPasswordMatch() {
    var password = $("#password_new").val();
    var confirmPassword = $("#password_confirm").val();
    if (password != confirmPassword){
        $("#CheckPasswordMatch").html("<p style=\"color: red\">Passwords do not match.</p>");
    } else {
        $("#CheckPasswordMatch").html("<p style=\"color: green\">Passwords match.</p>");
    }
    if (!password || !confirmPassword){
        $("#CheckPasswordMatch").html("");
    }
        
}


function checkCurrentPassword(){
    var password_current = $("#password_current").val();
    var password_correct = $("#password_correct").val();
    if (password_current != password_correct) {
        $("#CheckPasswordCorrect").html("<p style=\"color: red\">Incorrect password.</p>");
    } else {
        $("#CheckPasswordCorrect").html("<p style=\"color: green\">Correct password.</p>");
    }
    if (!password_current){
        $("#CheckPasswordCorrect").html("");
    }
}

function checkSecurityPassword(){
    var password_new = $("#password_new").val();
    var password_correct = $("#password_correct").val();

    if (password_new.length <= 6 ){
        if (!password_new.length){
            $("#CheckSecurityPassword").html("");
        } else {
            $("#CheckSecurityPassword").html("<p style=\"color: red\">Passwords need more than 6 characters.</p>");            
        }
        return false;
    } else if (password_correct == password_new){
        $("#CheckSecurityPassword").html("<p style=\"color: red\">This password is the same as the current password.</p>"); 
        return false;
    } else {
        $("#CheckSecurityPassword").html("<p style=\"color: green\">Valid password.</p>");
        return true;
    }
}

$(document).ready(function () {
   $("#password_confirm").keyup(checkPasswordMatch);
});

$(document).ready(function () {
    $("#password_current").keyup(checkCurrentPassword);
 });

$(document).ready(function () {
    $("#password_new").keyup(checkSecurityPassword);
 });

function updatePassword(){
    var password_current = $("#password_current").val();
    var password_correct = $("#password_correct").val();
    var password_new = $("#password_new").val();
    var password_confirm = $("#password_confirm").val();

    if (!password_current || !password_new || !password_confirm){
        Toastify({
            text: "Please enter all fields! Try again!",
            duration: 5000,
            close: true,
            gravity: "bottom",
            position: "center",
            backgroundColor: "#F55260",
            stopOnFocus: true,
            }).showToast();
    } else {
        if (password_current != password_correct){
            Toastify({
                text: "Incorrect password! Try again!",
                duration: 5000,
                close: true,
                gravity: "bottom",
                position: "center",
                backgroundColor: "#F55260",
                stopOnFocus: true,
                }).showToast();
        } else if (!checkSecurityPassword()){
            Toastify({
                text: "Invalid password! Try again!",
                duration: 5000,
                close: true,
                gravity: "bottom",
                position: "center",
                backgroundColor: "#F55260",
                stopOnFocus: true,
                }).showToast();
        } else if (password_new != password_confirm){
            Toastify({
                text: "Passwords do not match! Try again!",
                duration: 5000,
                close: true,
                gravity: "bottom",
                position: "center",
                backgroundColor: "#F55260",
                stopOnFocus: true,
                }).showToast();
        } else {

            var password_id = $("#password_id").val();
            var action = "update-password";
            $.ajax({
                type: 'POST',
                url: 'action_for_person_info.php',
                data: {
                password: password_new,
                action: action,
                id: password_id
                },
                success: function(data){
                    Toastify({
                        text: "Password updated!",
                        duration: 5000,
                        close: true,
                        gravity: "bottom",
                        position: "center",
                        backgroundColor: "#39DA8A",
                        stopOnFocus: true,
                        }).showToast();
                }
            });
        }
    }
    
}