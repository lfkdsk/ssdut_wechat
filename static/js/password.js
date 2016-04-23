/**
 * Created by Administrator on 2016/4/22.
 */
$(document).ready(function () {
    
    function Container (container) {
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
    
    Container.prototype.clearData = function (arr) {
        var $input = this.container.find('input');
        $input.filter(function (index) {
            return $(this).attr('type') !== 'button' &&
                    arr.indexOf($(this).attr('id')) === -1;
        })
            .each(function (value, element) {
                element.value = '';
        });
    };
    
    
    var $form = $('form');
    var $button = $('#submit');
    var $warning = $('p.bg-danger');
    var VALID_SIGN = /^([a-z]|[A-Z]|[0-9]|_){1,20}$/;
    $button.click(function (event) {
        event.preventDefault();
        var container = new Container($form);
        var data = {
            username: $form.find('#username').val(),
            old_password: $form.find('#old-password').val(),
            new_password: $form.find('#new-password').val(),
            verify_password: $form.find('#verify-password').val()
        };
        container.setDisable();
        if (data.new_password !== data.verify_password || !VALID_SIGN.test(data.username) || data.new_password.length < 6) {
            $warning.addClass('show');
            container.removeDisable();
            container.clearData(['username']);
            return;
        }
        
        delete data.verify_password;
        $.ajax({
            url: '',
            type: 'POST',
            data: JSON.stringify(data),
            success: function (response) {
                container.clearData(['all']);
                container.removeDisable();
            },
            error: function (error) {
                $warning.addClass('show');
                container.removeDisable();
                alert('修改成功！');
            }
        })
    })
});