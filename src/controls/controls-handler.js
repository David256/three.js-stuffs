var ControlsHandler = function () {
  this.enable = true;

  this.onKeyUp = function ( event ) {
    
    if (event.code === 'Escape') {

      this.enable = !this.enable;
      console.log( 'enable controls changed to', this.enable );

    }

  }

  this.dispose = function () {

    window.removeEventListener( 'keyup', _onKeyUp );

  }

  var _onKeyUp = bind( this, this.onKeyUp );

  window.addEventListener( 'keyup', _onKeyUp );

  function bind( scope, fn ) {

		return function () {

			fn.apply( scope, arguments );

		};

	}
}

export { ControlsHandler };