let GeneralDict = new Map()
GeneralDict.isInfoAdd = false

let YearDict = new Map()
YearDict.isInfoAdd = false

const URLParams = {}

if (!("GeneralDict" in localStorage)) {
    saveInfo("GeneralDict", GeneralDict);
}

if (!("YearDict" in localStorage)) {
    saveInfo("YearDict", YearDict);
}

function saveInfo(key, value) {
    const jsonString = JSON.stringify(value);
    localStorage.setItem(key, jsonString);
}

function getInfo(key) {
    const jsonString = localStorage.getItem(key);
    return JSON.parse(jsonString);
}

addEventListener("load", () => {
    const parametrs = new URLSearchParams(window.location.search); //* В url нужно передавать токен и год: ?person=...&year=...

    for (const [key, value] of parametrs.entries()) {
        URLParams[key] = value;
    }

    if (URLParams.person === 'MarkToken') {
        document.getElementById('share-button').dataset.view = true;
    }

    const yearBlock = document.getElementById('year-button-block');
    for (let year of yearBlock.children) {
        if (year.textContent === URLParams.year) {
            year.classList.add('active-year');
        }
    }
});

addEventListener("load", () => {
    GeneralDict = getInfo("GeneralDict")
    YearDict = getInfo("YearDict")

    if (!(GeneralDict.isInfoAdd)) {
        GeneralDict.photo = "media/person.jpg"
        GeneralDict.secondName = undefined
        GeneralDict.firstName = undefined
        GeneralDict.thirdName = undefined
        GeneralDict.generalBiography = undefined
        GeneralDict.yearBiography = undefined
    } 
    else {
        addPhoto(GeneralDict.photo)

        document.querySelectorAll('#main-form input').forEach((input, index) => {
            const nameList = ['secondName', 'firstName', 'thirdName']
            const nameDict = {secondName: 'Фамилия', firstName: 'Имя', thirdName: 'Отчество'}
            GeneralDict[nameList[index]] === undefined ? input.placeholder = nameDict[nameList[index]] : input.value = GeneralDict[nameList[index]]
        });

        const textarea = document.getElementById('generalBiography')
        GeneralDict['generalBiography'] === undefined ? textarea.placeholder = 'Общее описание' : textarea.value = GeneralDict['generalBiography']
    }

    if (!(YearDict.isInfoAdd)) {
        for (let year = 1940; year <= 1945; year++) {
            YearDict[year] = undefined
            YearDict[`${year}-photo`] = undefined
            YearDict[`${year}-cord`] = undefined
        }
    }
    else {
        const textarea = document.getElementById('yearBiography')
        YearDict[URLParams.year] === undefined ? textarea.placeholder = `Описаниe года` : textarea.value = YearDict[URLParams.year]
    }
})

function changeYear(year) {
    const path = `${window.location.pathname}?person=${URLParams.person}&year=${year}`;
    window.location.href = path;
}

addEventListener("load", () => addPhoto(GeneralDict.photo));

function addPhoto(file) {
    let photo = document.getElementById("person-photo");
    photo.style.backgroundImage = `url('${file}')`;
}

document.querySelectorAll('#main-form input').forEach((input, index, inputs) => {
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            let next = inputs[index + 1];
            if (next) {
                next.focus();
            }
        }
    });
});

function saveStaticInfo(key) {
    const info = document.getElementById(key);
    GeneralDict[key] = info.value;

    GeneralDict.isInfoAdd = true
    saveInfo("GeneralDict", GeneralDict);
}

function saveYearInfo() {
    const info = document.getElementById('yearBiography');
    YearDict[URLParams.year] = info.value;

    YearDict.isInfoAdd = true
    saveInfo("YearDict", YearDict);
}

document.getElementById('manual').addEventListener('click', () => {
    document.getElementById('manual-popup').classList.toggle('close');
});

async function useLinkPopup() {
    document.getElementById('link-popup').classList.toggle('close');
    // response = await fetch('http://localhost:8000/api/create_token', {method: 'POST'});
    // data = await response.json();

    data = 'Ультра супер классный единоразовый токен';
    const link = document.getElementById('link');
    link.innerHTML = data;
}

function usePhotoPopup(status = 0) {
    if (status === 0) {
        document.getElementById('photo-popup').classList.toggle('close');
    }

    const photoBlock = document.getElementById('photo-block');
    if (YearDict[`${URLParams.year}-photo`] === undefined) {
        photoBlock.innerHTML = 'На этот год фотографии отсутствуют';
    } else {
        photoBlock.innerHTML = '';
        YearDict[`${URLParams.year}-photo`].forEach(adress => {
            const photo = document.createElement('img');
            photo.classList.add('year-photo');
            photo.src = adress;
            photoBlock.appendChild(photo);
        });
    }
}

function copyLink() {
    const link = document.getElementById('link');
    navigator.clipboard.writeText(link.innerHTML);

    const copyButton = document.getElementById('copy-button');
    copyButton.innerHTML = 'copied';
}

function closePopup(id) {
    document.getElementById(id).classList.toggle('close');
}

function useInput(id) {
    document.getElementById(id).click();
}

function saveInputPhoto(id) {
    const input = document.getElementById(id);
    const file = input.files[0];

    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        
        reader.onload = function (e) {
            adress = e.target.result

            if (id === 'photo-input') {
                GeneralDict.photo = e.target.result;
                GeneralDict.isInfoAdd = true
                saveInfo("GeneralDict", GeneralDict)
                addPhoto(e.target.result)
            } else {
                if (YearDict[`${URLParams.year}-photo`] === undefined) {
                    YearDict[`${URLParams.year}-photo`] = [adress];
                    // console.log(YearDict)
                } else {
                    YearDict[`${URLParams.year}-photo`].push(adress);
                }
                console.log(YearDict)
                YearDict.isInfoAdd = true
                saveInfo("YearDict", YearDict)
                usePhotoPopup(1)
            }
        };
        
        reader.readAsDataURL(file);
    }
}


function sendAllInfo() {            //* Сейчас просто отчищаем все данные, потом будем формировать словарь и кидать его на бекенд
    saveInfo('GeneralDict', {})
    saveInfo('YearDict', {})
    location.reload()
}


// ======================================= Работа с картой

let map;
let marker;
let selectedCoords = null;
addEventListener('load', function () { 
    if (YearDict[`${URLParams.year}-cord`] === undefined) {
        map = L.map('map-block').setView([55.75, 37.61], 10); // Москва, масштаб 10
    } else {
        map = L.map('map-block').setView([YearDict[`${URLParams.year}-cord`].Lat, YearDict[`${URLParams.year}-cord`].Lng], 10);
        marker = L.marker([YearDict[`${URLParams.year}-cord`].Lat, YearDict[`${URLParams.year}-cord`].Lng]).addTo(map);
        
    }

    // Добавляем тайлы OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
      maxZoom: 19,
    }).addTo(map);

    map.on('click', function (e) {  
        const { lat, lng } = e.latlng;

        // Удаляем старую метку, если есть
        if (marker) {
            map.removeLayer(marker);
        }

        // Ставим новую метку
        marker = L.marker([lat, lng]).addTo(map);

        const Lat = lat.toFixed(2);
        const Lng = lng.toFixed(2);

        selectedCoords = { Lat, Lng };
        YearDict[`${URLParams.year}-cord`] = selectedCoords

        YearDict.isInfoAdd = true
        saveInfo("YearDict", YearDict)
    });
});