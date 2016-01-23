
function onBlur() {
    console.log('BLUR!')
    var id = $(this).attr('id');

    app.socket.emit('release', id);
  }

(function($) {
  'use strict';

  var app = {};
  window.app = app;

  app.socket = io('http://localhost:4000');
  app.pseudo = null;

  /**
   * Gestion des erreurs de l'application
   */

  app.socket.on('err', function(obj) {
    if (obj.request_name === 'login')
      return handleLoginError(obj);
  });

  // Erreur pendant la connexion
  function handleLoginError(obj) {
    console.error(obj.description);
  }

  /**
   * Formulaire de "connexion"
   */

  var $formLogin = $('.form-signin');

  $formLogin.on('submit', onLogin);

  function onLogin(evt) {
    evt.preventDefault();

    app.pseudo = $('#pseudo').val();
    app.socket.emit('login', pseudo);
  }

  /**
   * Listing des postits
   */

  app.socket.on('postits', function(listPostits) {
    
    $('#view-login').hide();
    $('#view-postits').show();

    // Build des postits

    var list = '';
    listPostits.forEach(function(postit) {

      list +=
        '<div class="postit col-md-3">'+
        '  <button class="pull-left btn btn-danger btn-sm glyphicon glyphicon-remove remove"></button>'+
        '  <h4>'+ postit.title +'</h4>'+
        '  <div id="p_'+ postit.id +'" class="postit-content" '+ (!postit.locked ? 'contenteditable':'') +'>'+
        '    '+postit.desc +
        '  </div>'+
        '</div>';

      $('.postits-container').empty().append(list);
    });

    /*
    listPostits = [
      {
        "id":...
        "locked":...
        "locker":...
        "title":...
        "desc":...
      }
    ]
    */
  });

  /**
   * Création d'un postit
   */

  app.socket.on('new_postit', function(postit) {
    var postit =
      '<div class="postit col-md-3">'+
      '  <button class="pull-left btn btn-danger btn-sm glyphicon glyphicon-remove remove"></button>'+
      '  <h4>'+ postit.title +'</h4>'+
      '  <div id="'+ postit.id +'" class="postit-content" '+ (!postit.locked ? 'contenteditable onblur="onBlur()"':'') +'>'+
      '    '+postit.desc +
      '  </div>'+
      '</div>';

    $('.postits-container').append(postit);
  });

  $('#create').on('click', function createPostit() {
    app.socket.emit('create');
  });

  /** 
   * Ecoute d'un evenement lock/release
   */

  $('.postits-container').on('keydown', '.postit-content', function onFocus() {
    var $postit = $(this).parents('.postit');

    var sending = {
      "id": $postit.find('.postit-content').attr('id'),
      "locker": app.pseudo,
      "title": $postit.find('h4').text(),
      "desc": $postit.find('.postit-content').text()
    }
    console.log(sending)
    app.socket.emit('edit', sending);
  });

  app.socket.on('update_postit', function(postit) {
    console.log('updating ', postit.desc);
    var $postit = $('#'+postit.id).parents('.postit');

    var postitContent =''+
      '  <button class="pull-left btn btn-danger btn-sm glyphicon glyphicon-remove remove"></button>'+
      '  <h4>'+ postit.title +'</h4>'+
      '  <div id="'+ postit.id +'" class="postit-content">'+
      '    '+postit.desc +
      '  </div>'+
      '  <div class="postit-status">'+
      '    Actuellement en écriture par <b>'+postit.locker+'</b>'+
      '  </div>';

    $postit.empty().html(postitContent)
  });

  app.socket.on('release', function(postitId) {
    var postitContent = $('#'+postitId).attr('contenteditable', 'true');
  });



})(jQuery);
