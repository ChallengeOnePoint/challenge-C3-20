(function($) {
  'use strict';

  var app = {};

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

})(jQuery);