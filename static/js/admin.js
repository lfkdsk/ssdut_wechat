/**
 * Created by li-rz on 16-3-31.
 */
$(document).ready(function () {
    var editor = new Simditor({
        textarea: $('#editor')
    });

    var page_type = 'about_college';

    $.post('/gethistory', {label: page_type}, function (response) {
        console.log(response);
    })
});