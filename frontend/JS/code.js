async function get_points() {
	const url_params = new URLSearchParams(window.location.search)
	year_from_url = url_params.get('year')

	year = year_from_url ? Math.min(Math.max(parseInt(year_from_url, 10), 1940), 1945) : 1940
	res = await fetch('http://127.0.0.1:8000/get_points?year=' + year);
	data = await res.json(); 
	console.log(data);
	return data
	
}

//TODO

let mark_list_2   = {};


async function init() {

	//create background map
	data = await get_points(year)
	
	let mark_list     = [];
	
	let li_names      = $('.hints ul li').map(function(x,y) {return y.innerText});
	let loaded_images = 0;


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
	$("." + String(year))[0].setAttribute("class", c + " choosed");
}	

init();