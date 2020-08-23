$('input[type=file]').on('change', function(event){
    files = event.target.files;
    event.stopPropagation(); // Stop stuff happening
    event.preventDefault(); // Totally stop stuff happening
    $("#avatar-status").text("Loading new avatar...");
    $("#avatar").css("opacity", "0.4");
    $("#avatar").css("filter", "alpha(opacity=40);");
    //Create a formdata object and add the files
    var data = new FormData();
    $.each(files, function(key, value) {
        data.append(key, value);
    });
    $.ajax({
        url: '/ajax/upload-new-avatar.ajax.php?files',
        type: 'POST',
        data: data,
        cache: false,
        dataType: 'json',
        processData: false, // Don't process the files
        contentType: false, // Set content type to false as jQuery will tell the server its a query string request
        success: function(data, textStatus, jqXHR) {
            if(typeof data.error === 'undefined') {
                //Success so call function to process the form
                //submitForm(event, data);
                $("#avatar-status").text("Powered by Gravatar");
                $("#avatar").css("opacity", "");
                $("#avatar").css("filter", "");
            } else {
                //Handle errors here
                alert('ERRORS: ' + textStatus);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            //Handle errors here
            alert('ERRORS: ' + textStatus);

        }
    });
});