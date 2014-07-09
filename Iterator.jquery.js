function Iterator( inIterator, inButton ) {
	var button, iterator, index = -1, events = {start:[],beforeSave:[],afterSave:[],end:[],error:[]};
	// Setters
	this.setIterator = function( i ) { iterator = i; }
	this.setButton = function( b ) { button = b; }
	
	// Setting on creation
	if( typeof inIterator !== 'undefined' ) this.setIterator( inIterator );
	if( typeof inButton !== 'undefined' ) this.setButton( inButton );
	
	// Add an event
	this.on = function( event, callback ) {
		if( typeof callback === 'function' && typeof events[event] !== 'undefined' )
			events[event].push( callback );
		return this;
	}
	
	// Raise an event
	function raiseEvent( type, data ) {
		if( events[type].length ) {
			var out = [0];
			for( var i=0,l=events[type].length; i<l; i++ )
				out.push( events[type][i].apply( this, data ) === false );
			return out.reduce(function(a,b){return a+b;}) === 0;
		} else {
			return true;
		}
	}
	
	// Start iterating
	this.start = function() {
		// Brick out if the button is missing
		if( typeof button === 'undefined' ) {
			console.error('Iteration button not provided');
			return false;
		}
		
		// Reset the index
		index = -1;
		
		// Hide the go button
		raiseEvent('start');
		this.resume();
	}
	
	// Create an iterating function that runs the TUD for each row
	function onSave() {
		if( index > -1 && raiseEvent('afterSave', [ iterator[index], index ]) === false )
			return false;
		iterate();
	}
	
	// When an error occurs, bail if we're told to
	function onError( xhr, textStatus, errorThrown ) {
		if( !raiseEvent('error', [errorThrown, xhr, textStatus]) )
			onSave();
	}
	
	// The iterative function
	function iterate() {
		index++;
		if( index > iterator.length - 1 ) {
			raiseEvent('end');
			return false;
		}
		if( raiseEvent('beforeSave', [ iterator[index], index ]) )
			save().done( onSave ).fail( onError );
	}
	
	this.resume = function() {
		// Start iterating
		iterate();
		return this;
	}
	
	// Overwrite the save function with AJAX
	function save() {
		var $button = $( button ),
			$form = $button.parents('form').first(),
			url = $form.attr('action'),
			data = $form.serialize();

		// Add the clicked button to the sent data, otherwise SITS won't be fooled!
		data = data + '&' + encodeURIComponent($button.attr('name')) + '=' + encodeURIComponent($button.val());

		// Send the submission over AJAX
		return $.ajax({
			type: "POST",
			url: url,
			data: data
		});
	}
}