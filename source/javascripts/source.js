import { List, Map } from 'immutable';

$(() => {
    const $items = $('.content li');
    const $visited_items = $items.filter('.v');
    const $message_box = $('#message');
    const $percentage_box = $('#percentage');
    const $btn_filter_visited = $('#filter_v');
    const is_smartphone = !$('.sidebar footer').is(':visible');

    // message
    $visited_items.hover(function() {
        const $t = $(this);

        $message_box.find('p').html($t.data('msg')).end()
                    .find('.date span').html($t.data('date')).end()
                    .show();
    },
    () => {
        $message_box.hide();
    });

    // percentage
    const percentage = Math.floor($visited_items.length/$items.length * 100);
    const percentage_box_width = $percentage_box.width() + 17; // 余白があるので大きめの画像を取得
    const bg_color = $.fmtColor($('body').css("background-color")).replace('#','');

    $percentage_box.html('<strong>' + $visited_items.length + '</strong>/' + $items.length)
                   .css('background-image', 'url("http://chart.apis.google.com/chart?cht=p&chd=t:' + percentage + ',' + (100 - percentage) + '&chs=' + percentage_box_width + 'x' + percentage_box_width + '&chco=' + bg_color + '")');

    // filter_visited
    $btn_filter_visited.on('click', function() {
        const $t = $(this);
        const $li = $t.closest('li');

        if ($li.hasClass('on')) {
            $items.show();
            $li.removeClass('on')
               .find('i').attr('class', 'icon-check-empty');

        } else {
            $items.not($visited_items).hide();
            $li.addClass('on')
               .find('i').attr('class', 'icon-check');
            $('body').scrollTop(0);
        }
    })
    .on('mouseover', function() {
        const $t = $(this);

        if ($t.closest('li').hasClass('on')) {
            $t.find('i').attr('class', 'icon-check-empty');
        } else {
            $t.find('i').attr('class', 'icon-check');
        }
    })
    .on('mouseout', function() {
        const $t = $(this);

        if ($t.closest('li').hasClass('on')) {
            $t.find('i').attr('class', 'icon-check');
        } else {
            $t.find('i').attr('class', 'icon-check-empty');
        }
    });

    // smartphone
    if (is_smartphone) {
        $items.not($visited_items).hide();
        $('.sidebar footer').clone()
                            .addClass('pure-hidden-tablet')
                            .addClass('pure-hidden-desktop')
                            .appendTo($('.content'));
    }
});
