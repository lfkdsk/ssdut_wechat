/**
 * Created by li-rz on 16-3-31.
 */
$(document).ready(function () {

    /**
     * 获取历史列表
     */
    function getHistory() {
        $.post('/gethistory', {label: page_type}, function (response) {
            while(history_ul.hasChildNodes()) {
                history_ul.removeChild(history_ul.firstChild);
            }

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
     * 编码数据
     * @param type - 执行的方法
     * @param id - 发生事件的元素与数据id
     */
    function encodingData(type, id) {
        var encode_data = {
            label: page_type,
            code: type
        },
            i,
            new_content,
            new_title;
        
        if (type !== 'add' || type !== 'update') {
            for (i in data) {
                if (data.hasOwnProperty(i)) {

                    // 两个id可能会出现类型问题
                    if (data[i].Id == id) {
                        encode_data.content = JSON.stringify(data[i]);
                        break;
                    }
                }
            }
        }

        console.log(encode_data);

        switch (type) {
            case 'show':
                encode_data.istrue = true;
                break;

            case 'add':
                encode_data.istrue = false;
                new_content = editor.append.getValue();
                new_title = $('#add-title').val();
                if (!new_content || !new_title) {
                    alert("题目与内容不能为空");
                    return;
                }
                encode_data.istrue = false;
                encode_data.content.Content = '<h3>' + new_title + '</h3>' + new_content;
                encode_data.content = JSON.stringify(encode_data.content);
                break;

            case 'update':
                new_content = editor.update.getValue();
                new_title = $('#update-title').val();
                console.log(new_content, new_title);
                if (!new_content || !new_title) {
                    alert("题目与内容不能为空");
                    return;
                }
                for (i in data) {
                    if (data.hasOwnProperty(i)) {
                        if (data[i].Id == id) {
                            encode_data.content = data[i];
                        }
                    }
                }
                encode_data.istrue = false;
                encode_data.content.Content = '<h3>' + new_title + '</h3>' + new_content;
                encode_data.content.Modifytime = new Date();
                encode_data.content = JSON.stringify(encode_data.content);
                break;

            case 'delete':
            default:
                encode_data.istrue = false;
                break;

        }
        sendData('/execode', encode_data, type);
    }


    /**
     * 向服务器发送修改后的数据，并准备回调函数
     * @param url - 发送的url接口
     * @param data - 要发送的数据
     * @param type - 执行的方法
     */
    function sendData (url, data, type) {
        $.ajax({
            url: url,
            data: data,
            method: 'post',
            error: function (error) {
                console.log(error);
                $('#fail').modal();
            },
            success: function (response) {
                console.log(response);
                getHistory();
            }
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
        
        $element.show_button = 
            $editor_inbox.find('button[data-to-do="show"]');


        bindEvent();

    }

    /**
     * 绑定按钮事件
     */
    function bindEvent() {

        // function removeBind (element) {
        //     $.each(element ,function (value, element) {
        //         element.removeEventListener('click', bindAllEvent);
        //     })
        // }


        function bindEvent(element, type) {
            $.each(element, function (value, element) {
                $(element).on('click', function (event) {
                    var $this = $(this);
                    change.id = $this.get(0).dataset.id;
                    change.type = type;
                    console.log(event);
                    if (type === 'update') {
                        var value = content[change.id];
                        $('#update-article').get(0).dataset.id = change.id;
                        $('#update-title').val(title[change.id]);
                        editor.update.setValue(value);
                    } else if (type === 'show') {
                        var target = event.target;
                        console.log(event.target);
                        encodingData(target.dataset.toDo, target.dataset.id);
                    } else {
                        $('#delete-article').get(0).dataset.id = change.id;
                        // console.log($('#update-article').get(0).dataset.id);
                    }
                });
            });
        }


        // removeBind($element.update_button);
        // removeBind($element.delete_button);
        // removeBind($element.show_button);
        bindEvent($element.update_button, 'update');
        bindEvent($element.delete_button, 'delete');
        bindEvent($element.show_button, 'show');
    }

    /**
     * 创建历史列表
     * @param data (obj)
     */
    function createNewHistoryList(data) {
        var doc = document;
        var new_li = doc.createElement('li');

        /**
         * 
         * @type {
         * {
         *  title: Text,
         *  text: Text, 
         *  update_button: button, 
         *  delete_button: button, 
         *  show_button: button
         * }
         * }
         */
        var append_element = {
            text: doc.createTextNode('编辑时间：' + data.Modifytime),
            update_button: createNewHistoryButton('update', data.Id),
            delete_button: createNewHistoryButton('delete', data.Id),
            show_button: createNewHistoryButton('show', data.Id)
        };
        content[data.Id] = data.Content.replace(TITLE_REGEX, '');
        if (/<h3>(.+)<\/h3>/.test(data.Content)) {
            title[data.Id] = TITLE_REGEX.exec(data.Content)[0].replace(/<h3>(.+)<\/h3>/, '$1');
        } else {
            title[data.Id] = undefined;
        }
        append_element.title = doc.createTextNode('文章标题：' + title[data.Id]);
        for (var i in append_element) {
            if (append_element.hasOwnProperty(i)) {
                new_li.appendChild(append_element[i]);
            }
        }
        new_li.dataset.id = data.Id;
        new_li.className = 'admin-item admin-content';
        return new_li;
    }


    /**
     * 创建新按钮
     * @param type (string - update | delete)
     * @param target {String} (button data id)
     */
    function createNewHistoryButton(type, target) {
        var new_button = document.createElement('button');
        new_button.dataset.toDo = type;
        if (target !== 'show') {
            new_button.dataset.toggle = 'modal';
            new_button.dataset.target = '#' + type + '-article';
        }
        new_button.className = 'btn btn-sm';
        new_button.dataset.id = target;
        switch (type) {
            case 'update':
                new_button.appendChild(document.createTextNode('编辑'));
                new_button.className += ' btn-success';
                break;
            case 'delete':
                new_button.appendChild(document.createTextNode('删除'));
                new_button.className += ' btn-danger';
                break;
            case 'show':
                new_button.appendChild(document.createTextNode('设为展示文章'));
                new_button.className += ' btn-primary';
                break;
            default:
                new_button = null;
                break;
        }

        return new_button;
    }

    /**
     * 两个编辑器 - 更新和添加
     * @type {{append, update}}
     */
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

    $element.siderbar =
        $('.nav-sidebar');



    getHistory();


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


    // 迟早要合并


    var $update_article = $('#update-article');
    // 确认删除
    $('#delete-article').find('button.btn-danger')
        .on('click', function (event) {
            encodingData('delete',
                document.querySelector('#delete-article').dataset.id);
        });


    // 确认更新文章并同步至服务器
    $update_article.find('button.btn-success')
        .on('click', function (event) {
            encodingData('update',
                document.querySelector('#update-article').dataset.id);
        });

    // 添加文章
    $('#add-button').on('click', function (event) {
        encodingData('add');
    });

    // 更新文章但是不上传
    $update_article.find('button.btn-info')
        .on('click', function (event) {

            /**
             * id - 被修改文章的id
             * j - 计数器
             * title_val - 被修改文章的标题
             * content_val - 被修改文章的内容
             */
            var id = document.querySelector('#update-article').dataset.id,
                j,
                title_val =  $('#update-title').val(),
                content_val = editor.update.getValue();
            for (j in data) {
                if (data.hasOwnProperty(j)) {

                    // 两个id可能会出现类型问题
                    if (data[j].Id == id) {

                        data[j].Content = '<h3>' + title_val
                            + '</h3>' + content_val;

                        title[id] = title_val;
                        content[id] = content_val;
                        break;
                    }
                }
            }

            // 未保存提醒
            $('li[data-id="' + id + '"]').addClass('.bg-danger');
        });

});