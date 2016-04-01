/**
 * Created by li-rz on 16-3-30.
 */
$(document).ready(function () {
    var VALID_SIGN = /^([a-z]|[A-Z]|[0-9]|_){1,20}$/;

    function Container(container) {
        this.container = container;
    }

    Container.prototype.setDisable = function () {
        var $container = this.container;
        var $input = $container.find('input');
        var $button = $container.find('button');
        $input.each(function (value, element) {
            element.setAttribute('disabled', '');
        });

        $button.each(function (value, element) {
            element.setAttribute('disabled', '');
        });
    };

    Container.prototype.removeDisable = function () {
        var $input = this.container.find('input');
        var $button = this.container.find('button');

        $input.each(function (value, element) {
            element.removeAttribute('disabled');
        });

        $button.each(function (value, element) {
            element.removeAttribute('disabled');
        });
    };

    $('form button').on('click', function (event) {
        var back = false;

        function warning(event) {
            var note = container.container.find('p');
            note.removeClass('disappear');
            container.container.find('input').each(function (value, element) {
                element.value = '';
            })
        }


        event.preventDefault();
        var container = new Container($('form')),
            value = {},
            legal = true,
            form = $('form .form-group');
        container.setDisable();
        console.log(container);
        form.each(function (num, element) {
            var type = element.querySelector('input').id,
                form_value = element.querySelector('input').value;
            if ((!VALID_SIGN.test(form_value) && num === 0)
                || (form_value.length < 6 && type === 'password')) {
                warning('illegal');
                legal = false;
                back = true;
            } else if (legal) {
                value[type] = form_value;
            }
        });


        if (back) {
            container.removeDisable();
            return;
        }


        var token,
            confirm_token = {username: value['username']},
            host = window.location.host;
        $.post('/admin/tokenget', confirm_token, function (data) {
            token = data;
            value['token'] = token;
            value.password = md5(value.password);
            $.ajax({
                url: '/admin/jump',
                type: 'POST',
                data: value,
                success: function (response) {
                    if (parseInt(response)) {
                        window.location.replace("http://" + host + '/admin/index');
                        return;
                    }
                    warning();
                    container.removeDisable();
                },
                error: function () {
                    warning();
                    container.removeDisable();
                }
            });
        });
    });
});