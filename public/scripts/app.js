(function($) {
  'use strict';

  /**
   * Gestion des erreurs de l'application
   */

  socket.on('err', function(obj) {
    if (obj.request_name === 'login')
      return handleLoginError(obj);
  });

  // Erreur pendant la connexion
  function handleLoginError(obj) {
    // obj.description
  }

  /**
   * Formulaire de "connexion"
   */

  var $formLogin = $('.form-signin');

  $formLogin.on('submit', onLogin);

  function onLogin(evt) {
    evt.preventDefault();

    console.log('Envoi socket.login = ', $('#pseudo').val())

    socket.emit('login', $('#pseudo').val());
  }

  /**
   * Listing des postits
   */

  socket.on('postits', function(listPostits) {
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