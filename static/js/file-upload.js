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
            'FilesAdded': function (up, files) {},
            'BeforeUpload': function (up, file) {},
            'UploadProgress': function (up, file) {},
            'UploadComplete': function () {
            },
            'FileUploaded': function (up, file, info) {},
            'Error': function (up, err, errTip) {}
        }
    });
    uploader.bind('FileUploaded', function () {
        console.log('hello man,a file is uploaded');
    });
    
});