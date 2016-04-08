/**
 * Created by li-rz on 16-3-31.
 */
$(document).ready(function () {
    var editor = new Simditor({
        textarea: $('#editor')
    });
    
    var uploader = Qiniu.uploader({
        runtimes: 'html5, flash, html4',
        browse_button: 'upload-img',
        uptoken_url: '/getfiletoken',
        domain: 'http://7xsnz4.com2.z0.glb.qiniucdn.com',
        get_new_uptoken: false,
        container: 'container', 
        max_file_size: '4mb',
        flash_swf_url: '../../static/js/vendor/plupload/js/Moxie.swf',
        max_retries: 5,
        dragdrop: true,
        drop_element: 'container',
        chunk_size: '2mb',
        auto_start: true,
        init: {}
        
    })
});