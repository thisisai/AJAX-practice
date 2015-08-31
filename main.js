$(function(){

	$list = $('#friend-list');
	$name = $('#name');
	$age = $('#age');

	var friendListTemplate = $('#list-template').html();

	function addFriend(item){
		$list.append(Mustache.render(friendListTemplate, item));
	}

	$.ajax({
	  type: 'GET',
	  url: 'http://rest.learncode.academy/api/tony/friends',
	  success: function(data) {
	  	$.each(data, function(index, item){
	  		addFriend(item);
	  	});
	    console.log("Load friend list successfully!", data); //returns all friends
	  },
	  error: function(){
	  	alert("network error...")
	  }
	});

	/*****************
	  ADD NEW FRIEND
	******************/
	$('#add-friend').on('click', function(){

	 	$.ajax({
		  type: 'POST',
		  url: 'http://rest.learncode.academy/api/tony/friends',
		  data: { 
		  	name: $name.val(), 
		  	age: $age.val()
		  },
		  success: function(data) {
		  	addFriend(data);
		  	$name.val("");
		  	$age.val("") ;
		    console.log("Add friend list successfully!", data); //returns all friends
		  },
		  error: function(){
		  	alert("network error...")
		  }
		});

	});

	/*****************
	  DELETE FRIEND
	******************/

	// listen to the event on the .remove class, why dont use $('.remove').on(click)?
	// BECAUSE the $('.remove') lists are created dynamically, 
	// it DOES NOT EXIST when jQuery first loads, so we can only listen to its parent

	// Be Careful, the .deleget()'s parameter order matters! (element -> event)

	$list.delegate( '.remove','click', function(){
		$li = $(this).closest('li');

		$.ajax({
		  type: 'DELETE',
		  url: 'http://rest.learncode.academy/api/tony/friends/'+ $(this).attr('data-id'),
		  success: function(){
		  	$li.fadeOut(400, function(){
		  		$(this).remove();	
		  	});

		  },
		});

	});

	/*****************
	  UPDATE(EDIT) FRIEND
	******************/
	$list.delegate('.edit-friend','click', function(){
		$li = $(this).closest('li');

		$li.find("input.name").val( $li.find('span.name').html() );
		$li.find("input.age").val( $li.find('span.age').html() );
		$li.addClass('edit');
	});

	$list.delegate('.cancel-edit','click', function(){
		$(this).closest('li').removeClass('edit');
	});

	$list.delegate('.save-edit' , 'click', function(){
		$li = $(this).closest('li');
		var updateData = {
			name: $li.find("input.name").val(),
			age: $li.find("input.age").val(),
		};

		$.ajax({
			type: 'PUT',
			url: 'http://rest.learncode.academy/api/tony/friends/'+ $li.attr('data-id'),
			data: updateData,
			success: function(data){
				$li.find("span.name").html(updateData.name);
				$li.find("span.age").html(updateData.age);
				$li.removeClass('edit');	
			}
		});
	});












	


});