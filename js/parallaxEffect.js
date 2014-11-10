/*
    parallaxEffect.js by Tuttube.pl darmowe kursy on-line
    <http://tuttube.pl/>
    Copyright (c) 2012 Tuttube.pl & Vivaweb.pl 
   
*/

window.onload = function() {
	console.log("onLoad");
	start_hello();
	bindEvents();
	bindRedraw();
/*	bindHistory();	*/
	$(window).bind('scroll',function(e){
    	parallaxScroll();
		var stateobj = { nav: "hello" };
		history.pushState(stateobj, "Hello", "hello");
    });
		
    $('a.nav1').click(function(){
		moveToNav1();
		var stateobj = { nav: "home" };
		console.log("pushState home");
		
		history.pushState(stateobj, "Hello", "hello");
		
    	return false;
	});
	
	$('a.nav2').click(function(){
		moveToNav2();
		var stateobj = { nav: "resume" };
		console.log("pushState resume");
		
		history.pushState(stateobj, "RESUME", "resume");
		
    	return false;
	});
	
	$('a.nav3').click(function(){
		moveToNav3();
		var stateobj = { nav: "projects" };
		console.log("pushState projects");
		
		history.pushState(stateobj, "PROJECTS", "projects");
		
    	return false;
	});
	
	$('a.nav4').click(function(){
		moveToNav4();
		var stateobj = { nav: "kpns" };
		console.log("pushState kpns");
		
		history.pushState(stateobj, "KPNA", "kpns");
		
    	return false;
	});
	
	
	
};


function bindRedraw(){
	window.addEventListener('load', onLoad, false);
	window.addEventListener('resize', onResize, false);
	window.addEventListener('scroll', onScroll, false);
}


function onLoad( evt ){
	console.log("---onLoad");
}
function onResize( evt ){
	console.log("---onResize");
}
function onScroll( evt ){
	console.log("---onScroll");
}

/*
window.addEventListener("popstate",
	function(e){
		console.log( "Current popstate.event.state:" + e.state.nav );
	}
	, false);
*/
function bindHistory(){
	if( !supports_history_api() ) { return; }
	fakeHistorySetUp();
	window.setTimeout( 
		function(){
			window.addEventListener("popstate", function(e) {
			fakeHistory(location.pathname);
			console.log(".ready(FakeHistry):" + location.pathname);
		}, false);
	}, 1); 
}

function bindEvents(){
	
	
	
	
	window.addEventListener('popstate', 
		function(e){
			console.log( "Current popstate.event.state:" + e.state );
			if( e.state && e.state.nav ){
				if( e.state.nav == "home"){
					console.log("moveTo  home");
					moveToNav1();
				}else if( e.state.nav == "portfolio"){
					console.log("moveTo  portfolio");
					moveToNav2();
				}else if( e.state.nav == "experiments"){
					console.log("moveTo  experiments");
					moveToNav3();
				}else if( e.state.nav == "kpns"){
					console.log("moveTo  todo");
					moveToNav4();
				}
			}else{
				console.log("no history");
			}		
		}
		,false);
		
	
}
function supports_history_api() {
  return !!(window.history && history.pushState);
}

function fakeHistorySetUp(){
	addClicker(document.getElementById("nav1"));
	addClicker(document.getElementById("nav2"));
	addClicker(document.getElementById("nav3"));
}

function addClicker(link){
		console.log("addclicker"+link);
		link.addEventListener("click", 
			function(e) {
				if( fakeHistory(link.herf) ){
					hisotry.pushState(null, null, link.href);
					e.preventDefault();
				}
			}, true );
}

function fakeHistory(href){
	var req = new XMLHttpRequest();
	req.open( "GET", "http://getarobo.com/" + href.split("/").pop(), false );
	req.send(null);
	if( req.status == 200 ){
		moveToNav1();
		fakeHistorySetUp();
		return true;
	}
	return false;
}


function parallaxScr(){
	var scrolled = $(window).scrollTop();
}




function moveToNav1(){
	console.log("moveToNav1");
	markNav1();
	$('#sections').animate( {scrollTop:$('#hello').height()*0 } , 350 , function(){parallaxScr();} );
}
function moveToNav2(){
	console.log("moveToNav2");
	markNav2();
	$('#sections').animate( {scrollTop:$('#hello').height()*1} , 350 , function(){parallaxScr();} );
}
function moveToNav3(){
	console.log("moveToNav3");
	markNav3();
	$('#sections').animate( {scrollTop:$('#hello').height()*2} , 350 , function(){parallaxScr();} );
}
function moveToNav4(){
	console.log("moveToNav4");
	markNav4();
	$('#sections').animate( {scrollTop:$('#hello').height()*3} , 350 , function(){parallaxScr();} );
}

function markNav1(){
	$( '#sectionMenu a.nav1').addClass('active');
	$( '#sectionMenu a.nav2').removeClass('active');
	$( '#sectionMenu a.nav3').removeClass('active');
	$( '#sectionMenu a.nav4').removeClass('active');
	
}
function markNav2(){
	$( '#sectionMenu a.nav1').removeClass('active');
	$( '#sectionMenu a.nav2').addClass('active');
	$( '#sectionMenu a.nav3').removeClass('active');
	$( '#sectionMenu a.nav4').removeClass('active');	
}
function markNav3(){
	$( '#sectionMenu a.nav1').removeClass('active');
	$( '#sectionMenu a.nav2').removeClass('active');
	$( '#sectionMenu a.nav3').addClass('active');
	$( '#sectionMenu a.nav4').removeClass('active');
}
function markNav4(){
	$( '#sectionMenu a.nav1').removeClass('active');
	$( '#sectionMenu a.nav2').removeClass('active');
	$( '#sectionMenu a.nav3').removeClass('active');
	$( '#sectionMenu a.nav4').addClass('active');
}




textLines=new Array("<span>Getter Robo</span>",
		    "<span> ITP </span>",
                    "<span>Electronic Music</span>",
                    "<span>Movies<span>",
					"<span>RTS</span>",
					"<span>ActionScript</span>",
                    "<span>Single gear bike</span>",
                    "<span>Robots</span>",
					"<span>C++</span>",
                    "<span>Optimization</span>",
                    "<span>Problem solving</span>",
                    "<span>Computer Graphics</span>");


// The Text Line to start on (The first line is line 0).
numOn=0;

// Set the delay time inbetween each change (in seconds, decimal values can be used).
delay=1.5;

// Set this variable to 0 to stop mouse overs from stopping 
// the text from changing.
stopOK=1;

change=1;



function start_hello(){
	console.log("Start_HEllo");
  setTimeout("Change()",1);
}


function Change(){

// Check to see if the user has their mouse over the text.
 if(change==1){

// Make sure we are on a valid Line Number and if not, set it to
// the starting line.
  if(numOn>=textLines.length||numOn<0){numOn=0}

// Set the text inside the <div> to the specified line number.
    document.getElementById('like').innerHTML = textLines[numOn];

// Increase the line number by one to get the next string.
  numOn++;
 }

// Call this function again to write the string to the <div>.
  setTimeout("Change()",delay*1000);
}










