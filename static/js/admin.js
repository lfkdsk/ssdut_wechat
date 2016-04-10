/**
 * Created by li-rz on 16-3-31.
 */
$(document).ready(function () {

    var editor = {
        append: new Simditor({
            textarea: $('#append')
        }),
        update: new Simditor({
            textarea: $('#update')
        })
    };

    const TITLE_REGEX = /<h3>.*<\/h3>/;

    var page_type = $('ul.nav-sidebar li.active').find('a').get(0).dataset.goTo,
        $element = {},
        change = {
            id: null,
            type: null
        },
        data,
        content = {},
        title = {},
        history_ul = document.querySelector('#editor-article ul'),
        new_li;

    getHistory();

    /**
     * 获取历史列表
     */
    function getHistory() {
        $.post('/gethistory', {label: page_type}, function (response) {
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
    }


    /**
     * 初始化元素
     */
    function historyCallback() {
        var $editor_inbox = $('#editor-article');

        $element.editor =
            $editor_inbox.find('li');

        $element.update_button =
            $editor_inbox.find('button[data-to-do="update"]');

        $element.delete_button =
            $editor_inbox.find('button[data-to-do="delete"]');

        $element.siderbar =
            $('.nav-sidebar');

        bindEvent();

        $element.siderbar.find('li').each(function (value, element) {
            var $element = $(element);
            $element.on('click', function () {
                var $former_active = $('ul.nav-sidebar li.active');
                $former_active.removeClass('active');
                var $this = $(this);
                $this.addClass('active');
                page_type = $former_active.find('a').get(0).dataset.goTo;
                getHistory();
            })
        });
        $('.bars').on('click', function (event) {
            $('.sidebar').toggleClass('show');
        });
    }

    /**
     * 绑定按钮事件
     */
    function bindEvent() {
        function bindEvent(element, type) {
            $.each(element, function (value, element) {
                $(element).on('click', function (event) {
                    var $this = $(this);
                    change.id = $this.get(0).dataset.id;
                    change.type = type;
                    //console.error(title);
                    var value = content[change.id];
                    $('#updata-title').val(title[change.id]);
                    editor.update.setValue(value);
                });
            });
        }

        bindEvent($element.update_button, 'update');
        bindEvent($element.delete_button, 'delete');
    }

    /**
     * 创建历史列表
     * @param data (obj)
     */
    function createNewHistoryList(data) {
        var new_li = document.createElement('li');
        var append_element = {
            text: document.createTextNode('编辑时间：' + data.Modifytime),
            update_button: createNewHistoryButton('update', data.Id),
            delete_button: createNewHistoryButton('delete', data.Id)
        };
        content[data.Id] = data.Content.replace(TITLE_REGEX, '');
        title[data.Id] = TITLE_REGEX.exec(data.Content)[0].replace(/<.+>(.+)<.+>/, '$1');
        for (var i in append_element) {
            if (append_element.hasOwnProperty(i)) {
                new_li.appendChild(append_element[i]);
            }
        }
        new_li.dataset.id = data.Id;
        new_li.className = 'admin-item';
        return new_li;
    }


    /**
     * 创建新按钮
     * @param type (string - update | delete)
     */
    function createNewHistoryButton(type, target) {
        var new_button = document.createElement('button');
        new_button.dataset.toDo = type;
        new_button.dataset.toggle = 'modal';
        new_button.className = 'btn btn-sm';
        new_button.dataset.id = target;
        new_button.dataset.target = '#' + type + '-article';
        switch (type) {
            case 'update':
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