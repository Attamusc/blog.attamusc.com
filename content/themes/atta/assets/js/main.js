var $__Object = Object, $__getOwnPropertyNames = $__Object.getOwnPropertyNames, $__getOwnPropertyDescriptor = $__Object.getOwnPropertyDescriptor, $__getDescriptors = function(object) {
  var descriptors = {}, name, names = $__getOwnPropertyNames(object);
  for (var i = 0; i < names.length; i++) {
    var name = $traceurRuntime.elementGet(names, i);
    $traceurRuntime.elementSet(descriptors, name, $__getOwnPropertyDescriptor(object, name));
  }
  return descriptors;
}, $__createClassNoExtends = function(object, staticObject) {
  var ctor = object.constructor;
  Object.defineProperty(object, 'constructor', {enumerable: false});
  ctor.prototype = object;
  Object.defineProperties(ctor, $__getDescriptors(staticObject));
  return ctor;
};
var View = function() {
  'use strict';
  var $View = ($__createClassNoExtends)({constructor: function($el) {
      this.$el = $el;
    }}, {});
  return $View;
}();

var $__Object = Object, $__getOwnPropertyNames = $__Object.getOwnPropertyNames, $__getOwnPropertyDescriptor = $__Object.getOwnPropertyDescriptor, $__getDescriptors = function(object) {
  var descriptors = {}, name, names = $__getOwnPropertyNames(object);
  for (var i = 0; i < names.length; i++) {
    var name = $traceurRuntime.elementGet(names, i);
    $traceurRuntime.elementSet(descriptors, name, $__getOwnPropertyDescriptor(object, name));
  }
  return descriptors;
}, $__createClassNoExtends = function(object, staticObject) {
  var ctor = object.constructor;
  Object.defineProperty(object, 'constructor', {enumerable: false});
  ctor.prototype = object;
  Object.defineProperties(ctor, $__getDescriptors(staticObject));
  return ctor;
};
var AjaxRouter = function() {
  'use strict';
  var $AjaxRouter = ($__createClassNoExtends)({
    constructor: function(routes) {
      this.routingTable = routes;
    },
    init: function() {
      var History = window.History;
    }
  }, {});
  return $AjaxRouter;
}();

var View = function() {
  'use strict';
  var $View = ($__createClassNoExtends)({constructor: function($el) {
      this.$el = $el;
    }}, {});
  return $View;
}();

$((function() {
  var $__3 = window, $ = $__3.$, History = $__3.History, NProgress = $__3.NProgress, $ajaxContainer = $('#ajax-container');
  var loading = false, showIndex = false, $latestPost = $('#latest-post'), $postIndex = $('#post-index');
  $('.js-jump-top').on('click', (function(e) {
    $('html, body').animate({'scrollTop': 0});
    return false;
  }));
  $latestPost.show();
  $postIndex.hide();
  if (window.location.pathname.indexOf('page') === 1) {
    $latestPost.hide();
    $postIndex.show();
  }
  if (!History.enabled) {
    return false;
  }
  History.Adapter.bind(window, 'statechange', (function() {
    var state = History.getState();
    $.get(state.url, (function(result) {
      var $html = $(result), $newContent = $('#ajax-container', $html).contents();
      $('html, body').animate({'scrollTop': 0});
      $ajaxContainer.fadeOut(500, (function() {
        $latestPost = $newContent.filter('#latest-post');
        $postIndex = $newContent.filter('#post-index');
        if (showIndex) {
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
      }));
    }));
  }));
  $('body').on('click', '.js-ajax-link, .pagination a', function(e) {
    e.preventDefault();
    var $this = $(this);
    if (loading === false) {
      try {
        throw undefined;
      } catch (title) {
        try {
          throw undefined;
        } catch (url) {
          try {
            throw undefined;
          } catch (currentState) {
            {
              currentState = History.getState();
              url = $this.attr('href');
              title = $this.attr('title') || null;
            }
            if (url !== currentState.url.replace(/\/$/, '')) {
              loading = true;
              if ($this.hasClass('js-show-index') || $this.parent('.pagination').length) {
                showIndex = true;
              }
              NProgress.start();
              History.pushState({}, title, url);
            } else {
              if ($this.hasClass('js-show-index')) {
                $('html, body').animate({'scrollTop': 0});
                NProgress.start();
                $latestPost.fadeOut(300, (function() {
                  $postIndex.fadeIn(300);
                  NProgress.done();
                }));
              } else {
                $('html, body').animate({'scrollTop': 0});
                NProgress.start();
                $postIndex.fadeOut(300, (function() {
                  $latestPost.fadeIn(300);
                  NProgress.done();
                }));
              }
            }
          }
        }
      }
    }
  });
}));
