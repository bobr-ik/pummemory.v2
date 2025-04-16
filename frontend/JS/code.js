//create background map
let mark_list     = [];
let mark_list_2   = {};
let images        = data.map( (x) => x.img_url );
let li_names      = $('.hints ul li').map(function(x,y) {return y.innerText});
let loaded_images = 0;


//load images
// for( let i in images ) {
// 	let img = new Image;
// 	img.src = images[i];
// 	img.onload = function() {
// 		loaded_images++;
// 		// setProgress( loaded_images/images.length*100 );
// 		console.log( loaded_images/images.length*100 );
// 	}
// }

//generate markers
for( let i = 0; i < data.length; i++ ) {
	let li  = document.createElement("li");
	let man = data[i];
	
	li.innerText = man.name+" "+man.surname+" "+man.patronymic;
	li.mark = mark_list[mark_list.push( addMarker(man) )-1];

	li.onclick = function() {
		if(this.mark && this.mark.x!=0 && this.mark.y!=0) clickMark(this.mark);
		else window.location.href = this.mark.link;
	}

	$(".hints ul")[0].appendChild( li );
}

addBubbleClick( '.search-btn' );
imgToSvg("#preloader .icon");

//init choosed year
c = $("."+String(year))[0].getAttribute("class");
$("."+String(year))[0].setAttribute("class",c+" choosed");