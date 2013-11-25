require.config({
  baseUrl: '/assets/js/',
  paths: {'jquery': 'vendor/jquery'},
  shim: {
    'vendor/history': {
      deps: ['jquery'],
      exports: 'History'
    },
    'vendor/nprogress': {
      deps: ['jquery'],
      exports: 'NProgress'
    }
  }
});
define(function(require) {
  var $ = require('jquery'), History = require('vendor/history'), NProgress = require('vendor/nprogress');
  $('.js-jump-top').on('click', function(e) {
    $('html, body').animate({'scrollTop': 0});
    return false;
  });
  var loading = false, showIndex = false, $ajaxContainer = $('#ajax-container'), $latestPost = $('#latest-post'), $postIndex = $('#post-index');
  $latestPost.show();
  $postIndex.hide();
  if (window.location.pathname.indexOf('page') === 1) {
    $latestPost.hide();
    $postIndex.show();
  }
  if (!History.enabled) {
    return false;
  }
  History.Adapter.bind(window, 'statechange', function() {
    var State = History.getState();
    $.get(State.url, function(result) {
      var $html = $(result);
      var $newContent = $('#ajax-container', $html).contents();
      $('html, body').animate({'scrollTop': 0});
      $ajaxContainer.fadeOut(500, function() {
        $latestPost = $newContent.filter('#latest-post');
        $postIndex = $newContent.filter('#post-index');
        if (showIndex === true) {
          $latestPost.hide();
        } else {
          $latestPost.show();
          $postIndex.hide();
        }
        $ajaxContainer.html($newContent);
        $ajaxContainer.fadeIn(500);
        NProgress.done();
        loading = false;
        showIndex = false;
      });
    });
  });
  $('body').on('click', '.js-ajax-link, .pagination a', function(e) {
    e.preventDefault();
    if (loading === false) {
      var currentState = History.getState();
      var url = $(this).attr('href');
      var title = $(this).attr('title') || null;
      if (url !== currentState.url.replace(/\/$/, "")) {
        loading = true;
        if ($(this).hasClass('js-show-index') || $(this).parent('.pagination').length > 0) {
          showIndex = true;
        }
        NProgress.start();
        History.pushState({}, title, url);
      } else {
        if ($(this).hasClass('js-show-index')) {
          $('html, body').animate({'scrollTop': 0});
          NProgress.start();
          $latestPost.fadeOut(300, function() {
            $postIndex.fadeIn(300);
            NProgress.done();
          });
        } else {
          $('html, body').animate({'scrollTop': 0});
          NProgress.start();
          $postIndex.fadeOut(300, function() {
            $latestPost.fadeIn(300);
            NProgress.done();
          });
        }
      }
    }
  });
});
