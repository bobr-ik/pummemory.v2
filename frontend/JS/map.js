let sets = {
	URL : 'person/index.html',
}


let map = L.map('map',{
	center   : [50.881176, 30.371177],
	zoom     : 5,
	maxZoom  : 100,
	minZoom: 2,
})
let markerCluster

function createMarkerCluster() {
	markerCluster = L.markerClusterGroup({
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

	markerCluster.on('animationend', function () {
		markerCluster.eachLayer(marker => {
			// Убедимся, что это маркер, а не кластер
			if (marker instanceof L.Marker && marker._icon && marker._shadow) {
				marker._shadow.style.opacity = '0';
				marker._shadow.style.transition = '.8s';
	
				// Сбросим старые обработчики
				marker._icon.onmouseenter = null;
				marker._icon.onmouseleave = null;
	
				// Добавим новые
				marker._icon.addEventListener("mouseenter", () => {
					marker._shadow.classList.add('shadow-visible');
				});
				marker._icon.addEventListener("mouseleave", () => {
					marker._shadow.classList.remove('shadow-visible');
				});
			}
		});
	});
	
	
	map.addLayer(markerCluster);
}
createMarkerCluster();

// L.tileLayer.provider('CartoDB.DarkMatter').addTo(map);
L.tileLayer('https://tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=jFVHTIg2WK3xJlt5wfqJ7F41zVI76aPnnsvSD3Pm4pjbR1J2mpnmUEMyUFjWKQY8', {}).addTo(map);
        


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

	if (info.location == false) return NaN;
	
	
	//create marker
	let marker = L.marker([info.location[0], info.location[1]], { icon: icon });
	console.log(info.location)
	

	//connect with shadow
	if (marker._icon) marker._icon.shadow = marker._shadow;
	
	if (!(info.img_url)) info.img_url = './src/no_photo.png'; 

	marker.bindPopup('<div class="content"><div class="image"><img src="'+info.img_url+'"/></div><div class="info">'+info.name+'<br/>'+info.surname+'</div><div class="goTo"><a href="'+sets.URL+'?id='+info.id+'&year='+year+'"><div class="hov_line"></div><span>ПЕРЕЙТИ</span></div></a></div>');


	//hover function
	setTimeout(() => {
		if (marker._icon && marker._shadow) {
			marker._icon.addEventListener("mouseenter", () => {
				marker._shadow.classList.add('shadow-visible');
			});
			marker._icon.addEventListener("mouseleave", () => {
				marker._shadow.classList.remove('shadow-visible');
			});
		}
	}, 0);

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

