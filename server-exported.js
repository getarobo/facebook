var servi = require('servi');


var app = new servi(true);


var postsdb = useDatabase("posts");

port(80);
serveFiles("");

route('/post', handlePostRequest);
route('/view', handleViewRequest);
route('/delete', handleDeleteRequest);
route('/privacy', handlePrivacyRequest);
route('/service', handleServiceRequest);
route('/postFriend', handlePostFriendRequest);



function run(request){
        request.respond("<html><body><h1>run</h1></body></html>");
}


function handlePrivacyRequest(request){
	request.render("privacy.html");
}

function handleServiceRequest(request){
	request.render("service.html");
}


function handlePostFriendRequest(req){
	var fList =[];
	var request = req.fields;
	console.log("REEQ:",request);
	
		var name;
		for ( name in request){
			fList.push( name);
		}
	console.log(fList);
}


function handlePostRequest(request){
	var jsonPost = JSON.parse(request.fields.data );
	console.log( "GOT JSON:", jsonPost);
	postsdb.findOne({name:jsonPost.name}, function (error, result){
		
		console.log(result);
		if(  result == null){
			console.log("ADD:", jsonPost.name);
			var newpost = { name:jsonPost.name, email:jsonPost.email, 
					gender:jsonPost.gender,fblink:jsonPost.link, uid:jsonPost.id,
					friends:jsonPost.friends};
			postsdb.add(newpost);
		}else{
			console.log("Update This:", typeof result._id, result._id);
			console.log("Update TO:", jsonPost.friends);
//			postsdb.remove({_id: result._id},{});
	/*			
			var newpost = { name:jsonPost.name, email:jsonPost.email, 
					gender:jsonPost.gender,fblink:jsonPost.link, uid:jsonPost.id,
					friends:jsonPost.friends};
			postsdb.add(newpost);
*/	
			postsdb.db.update({_id:result._id}, {$set :{friends:jsonPost.friends}}, {});
	
			//postsdb.change(result._id,{email:'hahah@ha'});
			
			/*
			false, function (error, result){
				
				console.log("DELETE:", jsonPost.name);
				console.log("DELETE error:",error);
				console.log("DELTE result:", result);
			});*/
			/*postsdb.remove( {name:jsonPost.name}, true, function (error, result){
				console.log("DELETE:", jsonPost.name);
				console.log("DELETE error:",error);
				console.log("DELTE result:", result);
			});*/
		}
	});
	
}

function handleViewRequest(request){
	console.log("got handleViewRequest");
  postsdb.getAll(gotPosts);
  function gotPosts(posts){
    var renderData = {theposts:posts};
    request.render("viewtemplate.html", renderData);
  
  }
}

function handleDeleteRequest(request){
	var cmId = Object.keys(request.fields)[0];
	postsdb.delete(cmId);

  postsdb.getAll(gotPosts);
  function gotPosts(posts){
    var renderData = {theposts:posts};
    request.render("viewtemplate.html", renderData);
  
  }
  

 
}




if (typeof run === 'function') {
  app.defaultRoute(run);
}
start();
