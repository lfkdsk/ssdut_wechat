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
            element_data = JSON.parse(response[i]);
            var new_li = createNewHistoryList(element_data);
            node.push(new_li);

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

    /**
     * 创建历史列表
     * @param data (obj)
     */
    function createNewHistoryList (data) {
        var new_li = document.createElement('li');
        var edit_button = createNewHistoryButton('edit');
        var delete_button = createNewHistoryButton('delete');
        new_li.appendChild(document.createTextNode('编辑时间：' + data.Modifytime) + edit_button + delete_button)
        new_li.dataset.id = data.id;
        new_li.className = 'admin-item';
        return new_li;
    }


    /**
     * 创建新按钮
     * @param type (string - edit | delete)
     */
    function createNewHistoryButton (type) {
        var new_button = document.createElement('button');
        new_button.dataset.toDo = type;
        new_button.dataset.toggle = 'modal';
        new_button.className = 'btn btn-success btn-sm';
        new_button.dataset.target = '#' + type + '-article';
        switch (type) {
            case 'edit':
                new_button.appendChild(document.createTextNode('编辑'));
                break;
            case 'delete':
                new_button.appendChild(document.createTextNode('删除'));
                break;
            default:
                new_button = null;
                break;
        }

        return new_button;
    }
});