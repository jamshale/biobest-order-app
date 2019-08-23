function Session() {}

Session.prototype.init = function() {
//   console.log('inside Session.init()');

  //capturing all click, touch and keypress events
	window.addEventListener('touchstart',Timeout,false);
	window.addEventListener('click',Timeout,false);
	window.addEventListener('keypress', Timeout, false);

	function _timeout(){
		return function() {
			$("#session_timeout_modal").modal("toggle")
			//implement your logic here to make
      		//a server side call (REST maybe?)
      		//that kills the server side sessiom
		}	
	}
	function Timeout() {
	//console.log('inside goTimeout()');
		if(typeof(timer) != 'undefined'){
			
			timer = clearTimeout(timer); //reset as soon as something is clicked
		}
	timer = setTimeout(_timeout(), 720000 /*test timemout period in millisec*/);
	}
}

$("#session_timeout_modal").on("hidden.bs.modal", function(){
	window.location.href = "/logout.html";
})

var sessionTimeout = new Session();
sessionTimeout.init();