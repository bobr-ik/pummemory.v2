function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        id: params.get('id') || 1,
        year_from_url: params.get('year') || '1941'
    };
}


function back_button() {
    const { year_from_url } = getUrlParams();
    window.location = `../?year=${year_from_url}`;
}

const personData = {
    id: 1,
    name: "Иванов Иван Иванович",
    biography: "Георгий Васильевич поступил в распоряжение Коломенского артиллерийского учебного лагеря. В нём под руководством полковника Коваленко и подполковника Остроухова с 17 декабря 1943 года по 5 июня 1944 года шло формирование 1972 истребительного противотанкового полка. За время боевых действий полком было уничтожено 46 танков, около 200 пулемётов и свыше 2000 солдат противника. \nВ этом полку прадед служил в должности наводчика орудия, а также бесперебойно обеспечивал связь в качестве телефониста I батареи.",
    rewards: "Медаль «За отвагу», Орден Красной Звезды",
    avatar: "../src/photo.jpg",
    years: [
        {
            year: "1940",
            story: "В 1940 году Иван Иванов был призван в армию...",
            images: ["path/to/1940_image1.jpg", "path/to/1940_image2.jpg"]
        },
        {
            year: "1941",
            story: "В 1941 году Иван участвовал в обороне Москвы...",
            images: ["path/to/1941_image1.jpg"]
        },
        {
            year: "1942",
            story: "В 1942 году Иван был ранен в бою под Сталинградом...",
            images: ["path/to/1942_image1.jpg", "path/to/1942_image2.jpg"]
        },
        {
            year: "1943",
            story: "После госпиталя в 1943 году вернулся на фронт...",
            images: ["path/to/1943_image1.jpg"]
        },
        {
            year: "1944",
            story: "В 1944 году участвовал в операции «Багратион»...",
            images: ["path/to/1944_image1.jpg"]
        },
        {
            year: "1945",
            story: "День Победы встретил в Берлине...",
            images: ["path/to/1945_image1.jpg", "path/to/1945_image2.jpg", "path/to/1945_image3.jpg"]
        }
    ],
};


function createMap() {
    let map = L.map('map',{
        center   : [50.881176, 30.371177],
        zoom     : 5,
        maxZoom  : 100,
        minZoom  : 4,
    })

    L.tileLayer('https://tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=jFVHTIg2WK3xJlt5wfqJ7F41zVI76aPnnsvSD3Pm4pjbR1J2mpnmUEMyUFjWKQY8', {}).addTo(map);

    return map
}

function addMarker(map, location) {
    //create icon
    let icon = L.icon({
        iconUrl: './src/star.svg',
        shadowUrl: './src/shadow.png',

        iconSize: [30, 30],
        iconAnchor: [15, 15],

        shadowSize: [60, 60],
        shadowAnchor: [30, 30],
    })
    if (info.location != false) {
        info.location = info.location.split(" ").map(Number);
    }

    if (info.location == false) info.location = [0, 0];
    
    
    //create marker
    let marker = L.marker([info.location[0], info.location[1]], { icon: icon });
    console.log(info.location)
    

    //connect with shadow
    if (marker._icon) marker._icon.shadow = marker._shadow;

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

    marker.addTo(map);
}

function initPage() {
    const { year_from_url } = getUrlParams();

    name_elem = document.getElementById('name');
    avatar_elem = document.getElementById('avatar');
    biography_elem = document.getElementById('biography');
    rewards_elem = document.getElementById('rewards');
    timeline_elem = document.getElementById('timeline');
    map_elem = document.getElementById('map');
    year_description_elem = document.getElementById('year_description');
    photo_slider_elem = document.getElementById('photo_slider');

    name_elem.textContent = personData.name;
    avatar_elem.src = personData.avatar;
    biography_elem.textContent = personData.biography;
    rewards_elem.textContent = personData.rewards;

    const map = createMap();  

    personData.years.forEach(year => {
        const year_button = document.createElement('button');
        year_button.textContent = year.year;

        console.log(year.year, year_from_url);
        if (year.year === year_from_url) {
            addMarker(map, year.location);
            year_button.classList.add('active');
            year_description_elem.textContent = year.story;
            photo_slider_elem.innerHTML = year.images.map(image => `<img class="img-fluid" src="${image}">`).join('');
        }
        year_button.addEventListener('click', () => {
            year_description_elem.textContent = year.story;
            photo_slider_elem.innerHTML = year.images.map(image => `<img class="img-fluid" src="${image}">`).join(''); 
        });
        timeline_elem.appendChild(year_button);
    });


    

}

initPage();

