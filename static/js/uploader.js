/**
 * Created by li-rz on 16-4-18.
 */
$(document).ready(function () {
    var $list = $('table').find('tbody');
    var temp = '';
    var uploader = WebUploader.create({

        // 不压缩image
        resize: false,
        chunked: false,
        fileNumLimit: 1,
        // swf文件路径
        swf: '../../static/js/vendor/webuploader/dist/Uploader.swf',
        dnd: '#container',
        // 文件接收服务端。
        server: '/uploadfile',
        auto: true,
        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: '#picker',
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/*'
        }
    });

    // 当有文件添加进来的时候
    uploader.on('fileQueued', function (file) {
        temp = file.id;
        $list.append('<tr>'
            + '<td>file.name</td>'
            + '<td>file.size</td>'
            + '<td id="' + file.id + '">等待上传...</td>'
            + '</tr>>');
        // $list.append('<div id="' + file.id + '" class="item">' +
        //     '<p class="info">' + '<span class="fname">' + file.name + '</span>' +
        //     '<span class="state">等待上传...</span>' +
        //      + '</p>' + '</div>');
    });

    // 文件上传过程中创建进度条实时显示。
    uploader.on('uploadProgress', function (file, percentage) {
        var $li = $('#' + file.id),
            $percent = $li.find('.progress .progress-bar');

        // 避免重复创建
        if (!$percent.length) {
            $percent = $('<div class="row"><div class="col-md-1"></div>'
                + '<div class="col-md-9"><div class="progress progress-striped active">'
                + '<div class="progress-bar" role="progressbar" style="width:0%;">'
                + '</div>' + '</div></div></div>').appendTo($li).find('.progress-bar');
        }

        $li.find('span.state').text('上传中');

        $percent.css('width', percentage * 100 + '%');
    });

    uploader.on('uploadSuccess', function (file) {
        $('#' + file.id).text('已上传');
        temp = file.id;
    });

    uploader.on('uploadError', function (file) {
        $('#' + file.id).text('上传出错');
    });

    uploader.on('uploadComplete', function (file) {
        $('#' + file.id).fadeOut();
    });

    uploader.on('uploadAccept', function (object, ret) {
        
    });
});