/**
 * Created by li-rz on 16-3-31.
 */
$(document).ready(function () {
    var editor = new Simditor({
        textarea: $('#editor')
    });

    var page_type = $('ul.nav-sidebar li.active').find('a').get(0).dataset.goTo,
        $element = {

        },
        node,
        element_data,
        data;
    console.log(data[0]);
    $.post('/gethistory', {label: page_type}, function (response) {


        for (var i = 0; i < data.length; ++i) {
            element_data = JSON.parse(data[i]);
            node += document.createElement('li');
            console.log(node, element_data);
        }
        historyCallback();
    });



    function historyCallback () {
        var $editor = $('#editor-article');

        $element.editor =
            $editor.find('li');

        $element.history_list =
            $editor.find('button[data-to-do="delete"]');


    }
});