$(() => {
  const { $, History, NProgress } = window,
        $ajaxContainer = $('#ajax-container');

  let loading = false,
      showIndex = false,
      $latestPost = $('#latest-post'),
      $postIndex = $('#post-index');

  $('.js-jump-top').on('click', (e) => {
    $('html, body').animate({'scrollTop': 0});
    return false;
  });

  // Initially hide the index and show the latest post
  $latestPost.show();
  $postIndex.hide();

  // Show the index if the url has "page" in it (a simple
  // way of checking if we're on a paginated page.)
  if (window.location.pathname.indexOf('page') === 1) {
    $latestPost.hide();
    $postIndex.show();
  }

  // Check if history is enabled for the browser
  if ( !History.enabled) {
    return false;
  }

  History.Adapter.bind(window, 'statechange', () => {
    let state = History.getState();

    // Get the requested url and replace the current content
    // with the loaded content
    $.get(state.url, (result) => {
      const $html = $(result),
            $newContent = $('#ajax-container', $html).contents();

      $('html, body').animate({'scrollTop': 0});

      $ajaxContainer.fadeOut(500, () => {
        $latestPost = $newContent.filter('#latest-post');
        $postIndex = $newContent.filter('#post-index');

        if (showIndex) {
          $latestPost.hide();
        }
        else {
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

    const $this = $(this);

    if (loading === false) {
      let currentState = History.getState(),
          url = $this.attr('href'),
          title = $this.attr('title') || null;

      // If the requested url is not the current states url push
      // the new state and make the ajax call.
      if (url !== currentState.url.replace(/\/$/, '')) {
        loading = true;

        // Check if we need to show the post index after we've
        // loaded the new content
        if ($this.hasClass('js-show-index') || $this.parent('.pagination').length) {
          showIndex = true;
        }

        NProgress.start();

        History.pushState({}, title, url);
      }
      else {
        // Swap in the latest post or post index as needed
        if ($this.hasClass('js-show-index')) {
          $('html, body').animate({'scrollTop': 0});

          NProgress.start();

          $latestPost.fadeOut(300, () => {
            $postIndex.fadeIn(300);
            NProgress.done();
          });
        }
        else {
          $('html, body').animate({'scrollTop': 0});

          NProgress.start();

          $postIndex.fadeOut(300, () => {
            $latestPost.fadeIn(300);
            NProgress.done();
          });
        }
      }
    }
  });
});
