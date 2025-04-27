function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        id: params.get('id') || 1,
        year_from_url: params.get('year') || '1941'
    };
}


function back_button() {
    const { year_from_url } = getUrlParams();
    window.location = `../index.html?year=${year_from_url}`;
}

// let personData = {
//     //TODO

//     id: 1,
//     name: "Иванов Иван Иванович",
//     biography: "Георгий Васильевич поступил в распоряжение Коломенского артиллерийского учебного лагеря. В нём под руководством полковника Коваленко и подполковника Остроухова с 17 декабря 1943 года по 5 июня 1944 года шло формирование 1972 истребительного противотанкового полка. За время боевых действий полком было уничтожено 46 танков, около 200 пулемётов и свыше 2000 солдат противника. \nВ этом полку прадед служил в должности наводчика орудия, а также бесперебойно обеспечивал связь в качестве телефониста I батареи.",
//     rewards: [
//         {
//             name: "Орден Отечественной Войны",
//             image: "../src/reward.jpg"
//         },
//         {
//             name: "Орден Красной Звезды",
//             image: "../src/reward2.jpg"
//         },
//         {
//             name: "Орден Суворова",
//             image: "../src/reward1.jpg"
//         },
//         {
//             name: "Орден Отечественной Войны",
//             image: "../src/reward.jpg"
//         },
//         {
//             name: "Орден Красной Звезды",
//             image: "../src/reward2.jpg"
//         },
//         {
//             name: "Орден Суворова",
//             image: "../src/reward1.jpg"
//         }
//     ],
//     avatar: ["../src/photo.jpg", "../src/photo.jpg", "../src/photo.jpg"],
//     years: [
//         {
//             year: "1940",
//             story: "В 1940 году Иван Иванов был призван в армию...Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur natus perspiciatis aliquam distinctio ipsum deserunt doloribus doloremque voluptatem numquam adipisci earum iusto eos unde dolore laudantium, cupiditate blanditiis quibusdam rerum!Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur natus perspiciatis aliquam distinctio ipsum deserunt doloribus doloremque voluptatem numquam adipisci earum iusto eos unde dolore laudantium, cupiditate blanditiis quibusdam rerum!Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur natus perspiciatis aliquam distinctio ipsum deserunt doloribus doloremque voluptatem numquam adipisci earum iusto eos unde dolore laudantium, cupiditate blanditiis quibusdam rerum!Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur natus perspiciatis aliquam distinctio ipsum deserunt doloribus doloremque voluptatem numquam adipisci earum iusto eos unde dolore laudantium, cupiditate blanditiis quibusdam rerum!",
//             images: ["../src/photo.jpg", "../src/photo.jpg", "../src/photo.jpg", "../src/photo.jpg"],
//             location: '55.7558 37.6173'
//         },
//         {
//             year: "1941",
//             story: "В 1941 году Иван участвовал в обороне Москвы...",
//             images: ["path/to/1941_image1.jpg", "../src/photo.jpg", "../src/phdoto.jpg"],
//             location: '55.7558 37.6173'

//         },
//         {
//             year: "1942",
//             story: "В 1942 году Иван был ранен в бою под Сталинградом...",
//             images: ["../src/photo.jpg"],
//             location: ''

//         },
//         {
//             year: "1943",
//             story: "После госпиталя в 1943 году вернулся на фронт...",
//             images: [],
//             location: '55.7558 37.6173'

//         },
//         {
//             year: "1944",
//             story: "В 1944 году участвовал в операции «Багратион»...",
//             images: ["path/to/1944_image1.jpg"],
//             location: '75.7558 37.6173'
//         },
//         {
//             year: "1945",
//             story: "День Победы встретил в Берлине...",
//             images: ["path/to/1945_image1.jpg", "path/to/1945_image2.jpg", "path/to/1945_image3.jpg"],
//             location: '55.7558 37.6173'
//         }
//     ],
// };


function createMap() {
    let map = L.map('map',{
        center   : [50.881176, 30.371177],
        zoom     : 5,
        maxZoom  : 100,
        minZoom  : 2,
    })

    L.tileLayer('https://tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=jFVHTIg2WK3xJlt5wfqJ7F41zVI76aPnnsvSD3Pm4pjbR1J2mpnmUEMyUFjWKQY8', {}).addTo(map);

    return map
}

function addMarker(map, location) {
    let icon = L.icon({
		iconUrl      : '../src/star.svg',
		shadowUrl    : '../src/shadow.png',

		iconSize     : [30,30],
		iconAnchor   : [15,15],

		shadowSize   : [60,60],
		shadowAnchor : [30,30],
    })
    
    if (location == false) {
        document.getElementById('map').style.display = 'none';
        document.getElementById('description_by_years').style.gridTemplateColumns = '1fr';
        location = [0, 0];
    }
    else {
        document.getElementById('map').style.display = 'block'
        document.getElementById('description_by_years').style.gridTemplateColumns = '1fr 2fr';

    }

	
    //create marker
	let marker = L.marker( [location[0], location[1]],{icon:icon} );
	marker.addTo(map);

	//connect with shadow
	if(marker._icon) marker._icon.shadow = marker._shadow;

	//remove shadow
	if(marker._shadow) {
		marker._shadow.style.opacity    = '0';
		marker._shadow.style.transition = '.8s';
	}

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
    return marker
}






function create_slider(images) {
    const slider = document.getElementById('photo_slider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    slider.innerHTML = '';
    if (images.length == 0) {
        slider.style.display = 'none';
        return;
    }
    slider.style.display = 'block';


    // Добавляем изображения в слайдер
    images.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.classList.add('slider_item');
        slider.appendChild(img);
    });

    let currentIndex = 0;

    // Функция для обновления положения слайдера и скрытия стрелок
    function updateSlider() {
        const totalImages = images.length;

        // Показываем/скрываем кнопки
        prevBtn.classList.toggle('slider_control_hidden', currentIndex === 0);
        nextBtn.classList.toggle('slider_control_hidden', currentIndex === totalImages - 1);

        // Скрываем все изображения, кроме текущего
        const imgs = slider.querySelectorAll('img');
        imgs.forEach((img, index) => {
            if (index !== currentIndex) {
                img.style.display = 'none';
            } else {
                img.style.display = 'block';
            }
        });
    }

    // Функция для перехода к следующему изображению
    function nextSlide() {
        if (currentIndex < images.length - 1) {
            currentIndex++;
            updateSlider();
        }
    }

    // Функция для перехода к предыдущему изображению
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    }

    // Инициализация слайдера
    updateSlider();

    // Обработчики событий для кнопок
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

}



function create_avatar_slider(images) {
    const slider = document.getElementById('avatar_slider');
    const prevBtn = document.getElementById('prevBtn_avatar');
    const nextBtn = document.getElementById('nextBtn_avatar');

    slider.innerHTML = '';
    if (images.length == 0) {
        slider.style.display = 'none';
        return;
    }
    slider.style.display = 'block';


    // Добавляем изображения в слайдер
    images.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.classList.add('slider_item');
        slider.appendChild(img);
    });

    let currentIndex = 0;

    // Функция для обновления положения слайдера и скрытия стрелок
    function updateSlider() {
        const totalImages = images.length;

        // Показываем/скрываем кнопки
        prevBtn.classList.toggle('slider_control_hidden', currentIndex === 0);
        nextBtn.classList.toggle('slider_control_hidden', currentIndex === totalImages - 1);

        // Скрываем все изображения, кроме текущего
        const imgs = slider.querySelectorAll('img');
        imgs.forEach((img, index) => {
            if (index !== currentIndex) {
                img.style.display = 'none';
            } else {
                img.style.display = 'block';
            }
        });
    }

    // Функция для перехода к следующему изображению
    function nextSlide() {
        if (currentIndex < images.length - 1) {
            currentIndex++;
            updateSlider();
        }
    }

    // Функция для перехода к предыдущему изображению
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    }

    // Инициализация слайдера
    updateSlider();

    // Обработчики событий для кнопок
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

}



async function get_Person(id){
    const response = await fetch(`http://127.0.0.1:8000/user_info?id=${id}`);
    personData = await response.json();
    return personData
}


async function initPage() {
    const { year_from_url } = getUrlParams();
    const { id } = getUrlParams();
    

    name_elem = document.getElementById('name');
    avatar_elem = document.getElementById('avatar_slider');
    biography_elem = document.getElementById('biography');
    rewards_elem = document.getElementById('rewards');
    timeline_elem = document.getElementById('timeline');
    map_elem = document.getElementById('map');
    year_description_elem = document.getElementById('year_description');
    photo_slider_elem = document.getElementById('photo_slider');

    const personData = await get_Person(id); //TODO
    name_elem.textContent = personData.name;

    create_avatar_slider(personData.avatar);
    // avatar_elem.src = personData.avatar;
    biography_elem.textContent = personData.biography;


    personData.rewards.forEach(reward => {
        const reward_elem = document.createElement('div');
        reward_elem.classList.add('reward');
        console.log(reward.image)
        reward_elem.innerHTML = `<img src="${reward.image}.jpg" alt="${reward.name}"> <p class="reward_name">${reward.name}</p>`;
        rewards_elem.appendChild(reward_elem);
    });

    const map = createMap();  
    year_buttons = []
    let marker = null

    personData.years.sort((a, b) => parseInt(a.year) - parseInt(b.year))
        .forEach(year => {
        const year_button = document.createElement('button');
        year_button.textContent = year.year;
        year_button.classList.add('year_button');
        year_buttons.push(year_button);
        year.location = year.location.split(" ").map(Number);
        


        if (year.year === year_from_url) {
            activated = year_button
            marker = addMarker(map, year.location);
            if (year.location != false) {
                map.setView( [ year.location[0], year.location[1] ] );
            }
            year_button.classList.add('active');
            year_description_elem.textContent = year.story;
            create_slider(year.images);
        }
        year_button.addEventListener('click', () => {
            console.log(year)
            year_button.classList.add('active');
            year_buttons.forEach(button => {
                if (button !== year_button) {
                    button.classList.remove('active');
                }
            })
            if(marker) marker.remove();
            marker = addMarker(map, year.location);
            if (year.location != false) {
                map.setView( [ year.location[0], year.location[1] ] );
            }
            year_description_elem.textContent = year.story;
            photo_slider_elem.innerHTML = '';
            create_slider(year.images);
        });
        timeline_elem.appendChild(year_button);
    });


    

}

initPage();

