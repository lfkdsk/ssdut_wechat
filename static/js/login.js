/**
 * Created by li-rz on 16-3-30.
 */
$(document).ready(function () {
    var VALID_SIGN = /^([a-z]|[A-Z]|[0-9]|_){1,20}$/;

    $('form button').on('click', function (event) {
        var back = false;

        function warning (event) {
            var note = container.find('p');
            note.removeClass('disappear');
            container.find('input').each(function (value, element) {
                element.value = '';
            })
        }

        event.preventDefault();
        var container = $('form'),
            value = {},
            legal = true,
            form = $('form .form-group');

        form.each(function (num, element) {
            var type = element.querySelector('input').type,
                form_value = element.querySelector('input').value;
            if ((!VALID_SIGN.test(form_value) && num === 0)
                || (form_value.length < 6 && type === 'password'))
            {
                warning('illegal');
                legal = false;
                back = true;
            } else if (legal) {
                value[type] = form_value;
            }
        });


        if (back) {
            return;
        }


        var token,
            host = window.location.host;
        $.post('', value['username'], function (data) {
            token = data;
        });
        value['token'] = token;
        value.password  = md5(value.password);
        $.ajax({
            url: '/admin/login',
            type: 'POST',
            data: JSON.stringify(value),
            success: function () {
                window.location.replace(host + '/admin/index');
            },
            error: function () {
                warning();
            }
        });
    });
});