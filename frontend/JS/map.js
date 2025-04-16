let sets = {
	URL : 'person/',
}


let map = L.map('map',{
	center   : [50.380049, 20.606890],
	zoom     : 4,
	maxZoom  : 100,
	minZoom  : 4,
})

let markerCluster = L.markerClusterGroup({
	iconCreateFunction: function(cluster) {
		let count = cluster.getChildCount();

		let size = 'small';
		if (count >= 3) size = 'medium';
		if (count >= 5) size = 'large';

		return L.divIcon({
			html: `<span>${count}</span>`,
			className: 'custom-cluster custom-cluster-' + size,
			iconSize: L.point(40, 40)
		});
	},
	showCoverageOnHover: false,
	spiderfyOnMaxZoom: true,
	disableClusteringAtZoom: 10,
});

markerCluster.on('clusterclick', function (a) {
	// Отменить автоматический зум
	a.originalEvent.preventDefault();

	// Получить координаты кластера
	let latlng = a.layer.getLatLng();

	// Установить нужный зум (например, 6 вместо max)
	map.setView(latlng, 6); // можно подставить любое число (например, 6, 7, 8 и т.д.)
});

map.addLayer(markerCluster);

L.tileLayer.provider('CartoDB.DarkMatter').addTo(map);

function addMarker( info={} ) {
	//create icon
	let icon = L.icon({
		iconUrl      : './src/star.svg',
		shadowUrl    : './src/shadow.png',

		iconSize     : [30,30],
		iconAnchor   : [15,15],

		shadowSize   : [60,60],
		shadowAnchor : [30,30],
	})
	if (info.location != false) {
		info.location = info.location.split(" ").map(Number);
	}

	if (info.location == false) info.location = [0, 0];
	
	
	//create marker
	let marker = L.marker([info.location[0], info.location[1]], { icon: icon });
	console.log(info.location)

	//connect with shadow
	if(marker._icon) marker._icon.shadow = marker._shadow;

	marker.bindPopup('<div class="content"><div class="image"><img src="'+info.img_url+'"/></div><div class="info">'+info.name+'<br/>'+info.surname+'</div><div class="goTo"><a href="'+sets.URL+'?id='+info.id+'&year='+year+'"><div class="hov_line"></div><span>ПЕРЕЙТИ</span></div></a></div>');

	//remove shadow
	if(marker._shadow) {
		marker._shadow.style.opacity    = '0';
		marker._shadow.style.transition = '.8s';
	}

	//hover function
	$( marker._icon ).hover(
		function() { this.shadow.style.opacity = '1' },
		function() { this.shadow.style.opacity = '0' }
	)

	//open function
	marker.custom_openPopup = marker.openPopup;
	marker.openPopup = function() {
		this.custom_openPopup()
		$(".leaflet-popup-content-wrapper").css("height",    "0px"  );
		$(".leaflet-popup-content-wrapper").css("transition",".9s"  );
		$(".leaflet-popup-content-wrapper").css("height",    "330px");
	}

	//close function
	marker.custom_closePopup = marker.closePopup;
	marker.closePopup = function() {
		this.custom_closePopup()
		$(".leaflet-popup-content-wrapper").css("transition",".9s");
		$(".leaflet-popup-content-wrapper").css("height",    "0px");
	}

	//disable double click
	marker.on("dblclick",function() { return false })
	
	marker.x        = info.location[0];
	marker.y        = info.location[1];
	marker.location = info.location;
	marker.link     = sets.URL + '?id='+info.id+'&year='+year+'';
	mark_list_2[[info.name, info.surname, info.patronymic].join('_')] = marker;
	markerCluster.addLayer(marker);
	

	return marker
}

function clickMark( mark ) {
	mark.openPopup();
	map.setView( [ mark.x,mark.y ] );
}