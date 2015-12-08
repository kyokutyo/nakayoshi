'use strict';

$(function () {
    "use strict";

    var $items = $('.content li');
    var $visited_items = $items.filter('.v');
    var $next_items = $items.filter('.n');
    var $message_box = $('#message');
    var $percentage_box = $('#percentage');
    var $btn_filter_visited = $('#filter_v');
    var $btn_filter_next = $('#filter_n');
    var is_smartphone = !$('.sidebar footer').is(':visible');

    // message
    $visited_items.hover(function () {
        var $t = $(this);

        $message_box.find('p').html($t.data('msg')).end().find('.date span').html($t.data('date')).end().show();
    }, function () {
        $message_box.hide();
    });

    // percentage
    var percentage = Math.floor($visited_items.length / $items.length * 100);
    var percentage_box_width = $percentage_box.width() + 17; // 余白があるので大きめの画像を取得
    var bg_color = $.fmtColor($('body').css("background-color")).replace('#', '');

    $percentage_box.html('<strong>' + $visited_items.length + '</strong>/' + $items.length).css('background-image', 'url("http://chart.apis.google.com/chart?cht=p&chd=t:' + percentage + ',' + (100 - percentage) + '&chs=' + percentage_box_width + 'x' + percentage_box_width + '&chco=' + bg_color + '")');

    // filter_visited
    $btn_filter_visited.on('click', function () {
        var $t = $(this);
        var $li = $t.closest('li');

        if ($li.hasClass('on')) {
            $items.show();
            $li.removeClass('on').find('i').attr('class', 'icon-check-empty');
        } else {
            $items.not($visited_items).hide();
            $li.addClass('on').find('i').attr('class', 'icon-check');
            $('body').scrollTop(0);
        }
    }).on('mouseover', function () {
        var $t = $(this);

        if ($t.closest('li').hasClass('on')) {
            $t.find('i').attr('class', 'icon-check-empty');
        } else {
            $t.find('i').attr('class', 'icon-check');
        }
    }).on('mouseout', function () {
        var $t = $(this);

        if ($t.closest('li').hasClass('on')) {
            $t.find('i').attr('class', 'icon-check');
        } else {
            $t.find('i').attr('class', 'icon-check-empty');
        }
    });

    // smartphone
    if (is_smartphone) {
        $items.not($visited_items).hide();
        $('.sidebar footer').clone().addClass('pure-hidden-tablet').addClass('pure-hidden-desktop').appendTo($('.content'));
    }
});
