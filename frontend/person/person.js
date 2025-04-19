function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        id: params.get('id') || 1,
        year: params.get('year') || '1941'
    };
}


function back_button() {
    const { year } = getUrlParams();
    window.location = `../?year=${year}`;
}

const personData = {
    id: 1,
    name: "Иванов Иван Иванович",
    biography: "Георгий Васильевич поступил в распоряжение Коломенского артиллерийского учебного лагеря. В нём под руководством полковника Коваленко и подполковника Остроухова с 17 декабря 1943 года по 5 июня 1944 года шло формирование 1972 истребительного противотанкового полка. За время боевых действий полком было уничтожено 46 танков, около 200 пулемётов и свыше 2000 солдат противника. \nВ этом полку прадед служил в должности наводчика орудия, а также бесперебойно обеспечивал связь в качестве телефониста I батареи.",
    rewards: "Медаль «За отвагу», Орден Красной Звезды",
    avatar: "path/to/avatar.jpg",
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

function initPage() {
    const { year } = getUrlParams();

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
    timeline_elem.textContent = personData.years.map(year => year.year).join(', ');
    map_elem.textContent = personData.years.find(year => year.year === year).story;
    year_description_elem.textContent = personData.years.find(year => year.year === year).story;
    photo_slider_elem.innerHTML = personData.years.find(year => year.year === year).images.map(image => `<img class="img-fluid" src="${image}">`).join('');
}

initPage();