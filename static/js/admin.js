/**
 * Created by li-rz on 16-3-31.
 */
$(document).ready(function () {
    var editor = new Simditor({
        textarea: $('#editor')
    });

    var page_type = $('ul.nav-sidebar li.active').find('a').get(0).dataset.goTo,
        $element = {},
        data,
        history_ul = document.querySelector('#editor-article ul'),
        new_li;

    /**
     * 获取历史列表
     */
    $.post('/gethistory', {label: page_type}, function (response) {
    //     data = [{
    //         Id : 1,
    //         Type: 'about_college',
    //         Istrue: 1,
    //         Content: 'fuck lllllll',
    //         Modifytime: 'ffff'
    //     }, {
    //         Id: 2,
    //         Type: 'about_college',
    //         Istrue: 0,
    //         Content: 'fuck',
    //         Modifytime: '6666'
    //     }];
        data = JSON.parse(response);
        for (var i = data.length - 1; i >= 0; --i) {
            new_li = createNewHistoryList(data[i]);
            if (data[i].Istrue) {
                history_ul.insertBefore(new_li, history_ul.firstChild);
            } else {
                history_ul.appendChild(new_li);
            }
        }
        historyCallback();
    });


    /**
     * 初始化元素
     */
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
        var append_element = {
            text : document.createTextNode('编辑时间：' + data.Modifytime),
            edit_button: createNewHistoryButton('edit'),
            delete_button: createNewHistoryButton('delete')
        };

        for (var i in append_element) {
            if (append_element.hasOwnProperty(i)) {
                new_li.appendChild(append_element[i])
            }
        }
        new_li.dataset.id = data.Id;
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
        new_button.className = 'btn btn-sm';
        new_button.dataset.target = '#' + type + '-article';
        switch (type) {
            case 'edit':
                new_button.appendChild(document.createTextNode('编辑'));
                new_button.className += ' btn-success';
                break;
            case 'delete':
                new_button.appendChild(document.createTextNode('删除'));
                new_button.className += ' btn-danger';
                break;
            default:
                new_button = null;
                break;
        }

        return new_button;
    }
});