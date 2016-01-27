import { List, Map } from 'immutable';
// import $ from 'jquery';
import * as _ from 'underscore';
import React from 'react';
import { render } from 'react-dom';
import * as axios from 'axios';

class Pref extends React.Component {
    render() {
        return (
            <li className={ this.props.visited ? 'js-pref visited js-visited' : 'js-pref' } data-date={this.props.date} data-msg={this.props.message}>
                {this.props.name}
            </li>
       );
    }
};

class PrefList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const PrefNodes = this.props.prefs.map((pref) => {
            return (
                <Pref key={pref.name} name={pref.name} date={pref.date} visited={pref.visited} message={pref.message} />
            );
        });

        return (
            <div className="js-content content">
                <ul>
                    {PrefNodes}
                </ul>
            </div>
       );
    }
};

class Control extends React.Component {
    render() {
        return (
            <div id="ctrl" className="pure-hidden-phone">
                <nav className="nav">
                    <h5>
                        <i className="icon-filter"></i>
                        表示オプション
                    </h5>
                    <ul>
                        <li>
                            <a className="js-filter_visited" href="#">
                                <i className="icon-check-empty"></i>
                                行ったことのある都道府県のみ表示
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
};

class Sidebar extends React.Component {
    render() {
        return (
            <div className="sidebar js-sidebar pure-u">
                <header className="header">
                    <hgroup>
                        <h1 className="brand-title">これまでに夫婦で行った都道府県</h1>
                    </hgroup>
                    <div className="percentage-box js-percentage_box" />
                    <div className="message-box js-message_box pure-hidden-phone">
                        <p className="js-message" />
                        <div className="date-box">
                            <i className="icon-time" />
                            <span className="js-date" />
                        </div>
                    </div>
                </header>
                <footer className="footer js-footer pure-hidden-phone">
                    <nav className="nav">
                        <div className="nav-list">
                            <div className="social">
                                <a className="twitter-share-button" href="https://twitter.com/share" data-via="kyokutyo" data-lang="ja">ツイート</a>
                                <div className="fb-like" data-width="180" data-height="23" data-colorscheme="light" data-layout="button_count" data-action="like" data-show-faces="false" data-send="false" />
                            </div>
                            <p className="nav-items">
                                kyokutyo
                                <span className="icon" />
                                <a href="https://twitter.com/kyokutyo">Twitter</a>
                                |  &bull;
                                <a href="http://kyokutyo.tumblr.com/">Tumblr</a>
                            </p>
                        </div>
                    </nav>
                </footer>
            </div>
        );
    }
};

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {prefs: []};
    }

    loadData() {
        axios.get(this.props.url)
             .then((response) => {
                 this.setState({prefs: response.data.prefs});
        });
    }

    componentDidMount() {
        this.loadData();
    }

    render() {
        return (
            <div className="pure-u-1 main">
                <Control />
                <PrefList prefs={this.state.prefs} />
            </div>
        );
    }
};

class App extends React.Component {
    render() {
        return (
            <div id="layout" className="pure-g-r">
                <Sidebar />
                <Main url="/javascripts/data.json" />
            </div>
        );
    }
};

render(
  <App />,
  document.getElementById('app')
);

$(() => {
    const $items = $('.js-item');
    const $visitedItems = $items.filter('.js-visited');
    const $messageBox = $('.js-message_box');
    const $percentageBox = $('.js-percentage_box');
    const $btnFilterVisited = $('.js-filter_visited');
    const isSmartphone = !$('.js-sidebar').find('.js-footer').is(':visible');

    // message
    $visitedItems.hover(function() {
        const $t = $(this);

        $messageBox.find('.js-message').html($t.data('msg')).end()
                   .find('.js-date').html($t.data('date')).end()
                   .show();
    },
    () => {
        $messageBox.hide();
    });

    // percentage
    const percentage = Math.floor($visitedItems.length/$items.length * 100);
    const percentage_box_width = $percentageBox.width() + 17; // 余白があるので大きめの画像を取得
    const bg_color = $.fmtColor($('body').css("background-color")).replace('#','');

    $percentageBox.html(`<strong>${$visitedItems.length}</strong>/${$items.length}`)
                   .css('background-image', `url("http://chart.apis.google.com/chart?cht=p&chd=t:${percentage},${(100 - percentage)}&chs=${percentage_box_width}x${percentage_box_width}&chco=${bg_color}")`);
    // filter_visited
    $btnFilterVisited.on('click', function() {
        const $t = $(this);
        const $li = $t.closest('li');

        if ($li.hasClass('on')) {
            $items.show();
            $li.removeClass('on')
               .find('i').attr('class', 'icon-check-empty');

        } else {
            $items.not($visitedItems).hide();
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
    if (isSmartphone) {
        $items.not($visitedItems).hide();
        $('.js-footer').clone()
                       .addClass('pure-hidden-tablet')
                       .addClass('pure-hidden-desktop')
                       .appendTo($('.js-content'));
    }
});
