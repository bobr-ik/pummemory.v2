async function get_points(year) {
	res = await fetch('https://pummemory.pumibari.ru/api/get_points?year=' + year);
	data = await res.json(); 
	console.log(data);
	return data
	
}

//TODO

let mark_list_2 = {};
let mark_list = [];

async function init() {

	//create background map
	data = await get_points(year)
	console.log(data)
	
	
	
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
	console.log(year)
	all_years = document.getElementsByClassName("year");
	for (let i = 0; i < all_years.length; i++) {
		all_years[i].classList.remove("choosed");
	}
	c = $("."+String(year))[0].getAttribute("class");
	$("." + String(year))[0].setAttribute("class", c + " choosed");
}	

init();


async function change_year(year_new) {
	year_new = Number(year_new);
	map.removeLayer(markerCluster);
	
	createMarkerCluster();
	year = year_new;
	await init();
}