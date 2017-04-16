/*global $, console, alert, confirm, prompt*/

$(document).ready(function () {
    "use strict";
    var fm,
        fname,
        email,
        subject,
        message,
        collect,
        err,
        dt,
        i;
    err = [];
    dt = {};
    
    
    //fb.innerHTML = "";
    //handle ajax request
    function handleResponse(rsp) {
        $('.feedback').html(rsp);
        $('#name').val('');
        $('#email').val('');
        $('#subject').val('');
        $('#message').val('');
    }

    function handleErrors(jqXHR, textStatus, errorThrown) {
        console.log("textStatus: " + textStatus + "\n" +
                            "errorThrown: " + errorThrown);
    }

    $('#submit').on('click', function validateForm(ev) {
        ev.preventDefault();

    //start with empty buckets
    //empty array [] and empty object {}
    //accessing elements
        fname = $.trim(document.querySelector("#name").value);
        email = $.trim(document.querySelector("#email").value);
        subject = $.trim(document.querySelector("#subject").value);
        message = $.trim(document.querySelector("#message").value);

    //evaluate first name
        if (fname !== "") {
            dt.users_name = fname;
        } else {
            err.push("<p> name? </p>");
        }

    //evaluate last name
        if (email !== "") {
            dt.users_email = email;
        } else {
            err.push("<p> email? </p>");
        }

    //evaluate last name
        if (subject !== "") {
            dt.users_subject = subject;
        } else {
            err.push("<p> subject? </p>");
        }

    //evaluate last name
        if (message !== "") {
            dt.users_message = message;
        } else {
            err.push("<p> message? </p>");
        }
    //create feedback
        if (err.length === 0) {

        //pack use input into query string
//            data = "fname=" + dt.users_name + "&email=" + dt.users_email + "&subject=" + dt.users_subject + "&message=" + dt.users_message;

            $.ajax({
                type: "POST",
                url: "./web-service.php",
                data: dt,
                dataType: "text"
            }).done(handleResponse).fail(handleErrors);

        } else {
            
            collect = '<p>' + 'Please fix the following errors: ' + '</p>' + '<ul>';
            for (i = 0; i < err.length; i += 1) {
                collect +=  '<li>' + err[i] + '</li>';
            }
            collect += '</ul>';
            $('.feedback').html(collect);
            err = [];
            collect = '';
        }

    });
});