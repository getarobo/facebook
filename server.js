var postsdb = useDatabase("posts");

serveFiles("");

route('/post', handlePostRequest);

function run(request){
        request.respond("<html><body><h1>run</h1></body></html>");
}


function handlePostRequest(request){
  console.log("got handlePostRequest");
  console.log("name:" + request.fields.input_name + 
              " pw:" + request.fields.input_pw + 
              " comment:" + request.fields.input_comment );
  var newpost = { nameis: request.fields.input_name, 
                  pw: request.fields.input_pw, 
                  comment: request.fields.input_comment};
  postsdb.add(newpost);

}