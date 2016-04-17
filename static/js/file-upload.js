/**
 * Created by li-rz on 16-4-17.
 */
$(document).ready(function () {
    var uploader = Qiniu.uploader({
        runtimes: 'html5,flash,html4',
        browse_button: 'upload-img',
        container: 'container',
        drop_element: 'container',
        max_file_size: '100mb',
        flash_swf_url: '../static/js/vendor/plupload/js/Moxie.swf',
        dragdrop: true,
        chunk_size: '4mb',
        uptoken_url: "/getfiletoken",
        domain: "http://7xsnz4.com2.z0.glb.qiniucdn.com/",
        get_new_uptoken: false,
        auto_start: true,
        log_level: 5,
        init: {
            'FilesAdded': function (up, files) {
                $('table').show();
                $('#success').hide();
                plupload.each(files, function (file) {
                    var progress = new FileProgress(file, 'fsUploadProgress');
                    progress.setStatus("等待...");
                    progress.bindUploadCancel(up);
                });
            },
            'BeforeUpload': function (up, file) {
                var progress = new FileProgress(file, 'fsUploadProgress');
                var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
                if (up.runtime === 'html5' && chunk_size) {
                    progress.setChunkProgess(chunk_size);
                }
            },
            'UploadProgress': function (up, file) {
                var progress = new FileProgress(file, 'fsUploadProgress');
                var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
                progress.setProgress(file.percent + "%", file.speed, chunk_size);
            },
            'UploadComplete': function () {
                $('#success').show();
            },
            'FileUploaded': function (up, file, info) {
                var progress = new FileProgress(file, 'fsUploadProgress');
                progress.setComplete(up, info);
            },
            'Error': function (up, err, errTip) {
                $('table').show();
                var progress = new FileProgress(err.file, 'fsUploadProgress');
                progress.setError();
                progress.setStatus(errTip);
            }
        }
    });
    uploader.bind('FileUploaded', function () {
        console.log('hello man,a file is uploaded');
    });

    $('#container').on(
        'dragenter',
        function (e) {
            e.preventDefault();
            $('#container').addClass('draging');
            e.stopPropagation();
        }
    ).on('drop', function (e) {
        e.preventDefault();
        $('#container').removeClass('draging');
        e.stopPropagation();
    }).on('dragleave', function (e) {
        e.preventDefault();
        $('#container').removeClass('draging');
        e.stopPropagation();
    }).on('dragover', function (e) {
        e.preventDefault();
        $('#container').addClass('draging');
        e.stopPropagation();
    });
    
});