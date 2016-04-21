/**
 * Created by li-rz on 16-3-25.
 */
$(document).ready(function () {

    // var start_dir = ''; // 起始路由
        // former_route = '', // 之前访问路由
        // page_stack = []; // 页面历史栈

    // $('body').load(start_dir + 'main.html', function () {



        /**
         * 载入页面历史列表
         * @param element - 上一次访问的页面
         */
        // function loadPage (element) {
        //     if (page_stack[length - 1] == element) {
        //         return;
        //     }
        //     if (page_stack.length >= 20) {
        //         page_stack.shift();
        //     }
        //     page_stack.push(element);
        // }

        /**
         * 检查数据合法性，不在同页面里进行二次载入
         * @param data - 要跳转的页面
         * @returns {boolean} - true: 进行跳转
         */
        // function checkData(data) {
        //     var now_data = former_route.split('/')
        //         .pop();
        //         //.replace('.html', '');
        //
        //     return data !== now_data;
        // }

        /**
         * 绑定内容页面菜单事件
         * @param value - key
         * @param element - 元素
         */
        // function menuEvent (value, element) {
        //     element.addEventListener('click', function () {
        //         var route = element.dataset.goTo;
        //         var dir = start_dir + 'content/'; //    挂上服务器要改
        //         $('body').load(dir + 'content.html', function () {
        //
        //             loadPage(start_dir + 'index');
        //
        //             // function loadContent (dir, route) {
        //             //     $('.sec-content').load(dir + route);
        //             //     former_route = dir + route;
        //             // }
        //
        //             $('.sec-back').on('click', function () {
        //                 var page = page_stack.pop(),
        //
        //                     // 之前路由
        //                     data = page.split('/')
        //                     .pop();
        //                     // .replace('.html', '');
        //                 if (data === 'index') {
        //                     $('body').load(start_dir + 'main.html', initPage);
        //                 } else {
        //                     $.post(data);
        //                 }
        //             });
        //             former_route = dir + route; //+ '.html';
        //             // loadContent(dir, route);
        //             $.post(route);
        //             // 跳转
        //             var $content_menu = $('.sec-footer > li');
        //             $content_menu
        //                 .filter(function (value, element) {
        //                     return element.dataset.goTo;
        //                 })
        //                 .each(function (value, element) {
        //                     element.addEventListener('click', function () {
        //                         var data = element.dataset.goTo;
        //                         if (data === 'index') {
        //                             $('body').load(start_dir + 'main.html', initPage);
        //                         } else {
        //                             if (checkData(data)) {
        //                                 loadPage(former_route);
        //                                 former_route = dir + route;// + '.html';
        //                                 $.post(data);
        //                             }
        //                             // loadContent(dir, data);
        //
        //                         }
        //                     });
        //                 });
        //
        //                     // 延展菜单
        //             $content_menu
        //                 .filter(function (value, element) {
        //                 return element.dataset.goTo === '';
        //             })
        //                 .each(function (value, element) {
        //                 var $element = $(element);
        //
        //                 element.addEventListener('click', function () {
        //                     $element.toggleClass('item-active');
        //                     $element
        //                         .find('.footer-extend')
        //                         .toggleClass('show-extend');
        //                 });
        //
        //                 $element
        //                     .find('.footer-extend li')
        //                     .each(function (value, element) {
        //                         var data = element.dataset.goTo;
        //                         element.addEventListener('click', function () {
        //                             if (checkData(data)) {
        //                                 loadPage(former_route);
        //                                 former_route = dir + route;
        //                                 $.post(data);
        //                             }
        //                             // loadContent(dir, data);
        //
        //                         });
        //                     });
        //                 });
        //
        //         });
        //     });
        // }


    /**
     * 设置高度
     * @param windows - $(window);
     * @param list - $('.list')
     */
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


    /**
     * 检查长宽比
     * @returns {boolean} - false :符合要求长宽比，list不需要改变高度
     */
    function checkLengthWidthRatio() {
        var list_height = $list.get(0).clientHeight;
        return screen.width / (screen.height - list_height) < image_length_width_ratio;
    }


        /**
         * 初始化页面元素
         */
        function initPage () {
            $window = $(window);
            $list = $('.list');
            screen = {
                width: $window.width(),
                height: $window.height()
            };

            if (checkLengthWidthRatio() && $list) {
                var former_list_height = parseInt($list.css('height').replace('px', '')),
                    later_list_height = screen.height - (screen.width / image_length_width_ratio),
                    former_padding = parseInt($list.css('padding-top').replace('px', '')),
                    later_padding = former_padding + (later_list_height - former_list_height) / 2;
                $list.attr("style", "padding:" + later_padding + 'px 0');
            }
            resetHeight($window, $list);

            // $list.find('li').each(menuEvent);
        }


        var $window, // window
            $list, // .list
            image_length_width_ratio = 640 / 1000, // 合法长宽比
            screen; // 屏幕宽高
        initPage();


        var $content_menu = $('.sec-footer > li');

        if ($content_menu) {
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
                });
        }
        /**
         * 页面可视区域长宽变化
         */
        $window.on('resize' || 'orientationchange', function () {
            resetHeight($window, $list);
        });

    // });

});