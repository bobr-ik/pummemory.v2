//set to start position
$("#preloader .logo").css({
	width  :'20vw',
	height :'20vw',
	opacity:'1',
}) 

setTimeout(function() {
	$("#preloader .prompt").css({ opacity:'1' })
},1000)

function close() {
	$("#preloader .logo").css({
		width   : "0",
		height  : "0",
		opacity : "0",
	})
	
	setTimeout(function() {
		$("#preloader").css("opacity","0");
	},400)
	
	setTimeout(function() {
		$("#preloader").css("display","none");
	},800)
}

//set progress
function setProgress( pr ) {
	pr = 100-pr;

	let h   = Number($("#preloader .logo .back-frame img").css("height").replace("px",""));
	let pos = pr/100*h+"px";

	$("#preloader .logo .back-frame").css("top",pos);
	$("#preloader .logo .back-frame img").css("top","-"+pos);

	//if 95%+ remove all
	if( pr<=5 ) { 
		setTimeout(function() {
			$("#preloader .logo .pict").css("opacity","1");
		},1000)	
		setTimeout(function() {
			close();
		},2000)

		$("#preloader")[0].onclick = close;
	}

} 

function skip() {
	setProgress(100);
}