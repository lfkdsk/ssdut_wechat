/**
 * Created by li-rz on 16-3-25.
 */
$(document).ready(function () {

    var start_dir = '',
        former_route = '',
        page_stack = [];

    $('body').load(start_dir + 'main.html', function () {

        function resetHeight (windows, list) {
            var element = {
                    list : list,
                    carousel : $('#carousel-generic')
                },
                height = {};
            Object.keys(element)
                .filter(function (value) {
                    return value !== 'screen'
                })
                .forEach(function (value) {
                    if (value === 'carousel') {
                        height[value] = windows.height() - height.list;
                    } else {
                        height[value] = element[value].get(0).clientHeight;
                    }
                });
            element.carousel.css('height', height.carousel+ 'px');
        }

        function checkLengthWidthRatio() {
            var list_height = $list.get(0).clientHeight;
            return screen.width / (screen.height - list_height) < image_length_width_ratio;
        }

        function loadPage (element) {
            if (page_stack[length - 1] == element) {
                return;
            }
            if (page_stack.length >= 20) {
                page_stack.shift();
            }
            page_stack.push(element);
        }

        function checkData(data) {
            var now_data = former_route.split('/')
                .pop()
                .replace('.html', '');

            return data !== now_data;
        }

        function menuEvent (value, element) {
            element.addEventListener('click', function () {
                var route = element.dataset.goTo;
                var dir = start_dir + 'content/'; //    挂上服务器要改
                $('body').load(dir + 'content.html', function () {

                    loadPage(start_dir + 'index.html');

                    // function loadContent (dir, route) {
                    //     $('.sec-content').load(dir + route + '.html');
                    //     former_route = dir + route + '.html';
                    // }

                    $('.sec-back').on('click', function () {
                        var page = page_stack.pop(),
                            data = page.split('/')
                            .pop()
                            .replace('.html', '');
                        if (data === 'index') {
                            $('body').load(start_dir + 'main.html', initPage);
                        } else {
                            //loadContent(start_dir + 'content/', data);
                        }
                    });

                    // loadContent(dir, route);

                    // 跳转
                    var $content_menu = $('.sec-footer > li');
                    $content_menu
                        .filter(function (value, element) {
                            return element.dataset.goTo;
                        })
                        .each(function (value, element) {
                            element.addEventListener('click', function () {
                                var data = element.dataset.goTo;
                                if (data === 'index') {
                                    $('body').load(start_dir + 'main.html', initPage);
                                } else {
                                    if (checkData(data)) {
                                        loadPage(former_route);
                                    }
                                    // loadContent(dir, data);
                                }
                            });
                        });

                            // 延展菜单
                    $content_menu
                        .filter(function (value, element) {
                        return element.dataset.goTo === '';
                    })
                        .each(function (value, element) {
                        var $element = $(element);

                        element.addEventListener('click', function () {
                            $element.toggleClass('item-active');
                            $element
                                .find('.footer-extend')
                                .toggleClass('show-extend');
                        });

                        $element
                            .find('.footer-extend li')
                            .each(function (value, element) {
                                var data = element.dataset.goTo;
                                element.addEventListener('click', function () {
                                    if (checkData(data)) {
                                        loadPage(former_route);
                                    }
                                    loadContent(dir, data);
                                });
                            });
                        });

                });
            });
        }

        function initPage () {
            $window = $(window);
            $list = $('.list');
            screen = {
                width: $window.width(),
                height: $window.height()
            };

            if (checkLengthWidthRatio()) {
                var former_list_height = parseInt($list.css('height').replace('px', '')),
                    later_list_height = screen.height - (screen.width / image_length_width_ratio),
                    former_padding = parseInt($list.css('padding-top').replace('px', '')),
                    later_padding = former_padding + (later_list_height - former_list_height) / 2;
                $list.attr("style", "padding:" + later_padding + 'px 0');
            }
            resetHeight($window, $list);

            $list.find('li').each(menuEvent);
        }

        var $window,
            $list,
            image_length_width_ratio = 640 / 1000,
            screen;
        initPage();

        $window.on('resize' || 'orientationchange', function () {
            resetHeight($window, $list);
        });

    });

});