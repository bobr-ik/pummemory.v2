let GeneralDict = new Map()
GeneralDict.isInfoAdd = false

let YearDict = new Map()
YearDict.isInfoAdd = false

const URLParams = {}
const awardList = ''

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

// ================================================ Статичный блок

addEventListener("load", () => startSite());

addEventListener("load", () => {
    GeneralDict = getInfo("GeneralDict")
    YearDict = getInfo("YearDict")
    console.log(GeneralDict);

    if (!(GeneralDict.isInfoAdd)) {
        GeneralDict.photo = "media/person.jpg"
        GeneralDict.secondName = undefined
        GeneralDict.firstName = undefined
        GeneralDict.thirdName = undefined
        GeneralDict.generalBiography = undefined
        GeneralDict.yearBiography = undefined
        GeneralDict.awards = []
        saveInfo("GeneralDict", GeneralDict)
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
            YearDict[year] = {
                description: "",
                photo: "",
                cord: "",
            }
            saveInfo("YearDict", YearDict)
        }
    }
    else {
        const textarea = document.getElementById('yearBiography')
        YearDict[URLParams.year]['description'] === "" ? textarea.placeholder = `События года` : textarea.value = YearDict[URLParams.year]['description']
    }
})

addEventListener("load", () => addPhoto(GeneralDict.photo));

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

document.getElementById('manual').addEventListener('click', () => {
    document.getElementById('manual-popup').classList.toggle('close');
});

// ================================================ Блок функций

async function startSite() {
    const parametrs = new URLSearchParams(window.location.search);
    for (const [key, value] of parametrs.entries()) {
        URLParams[key] = value;
    }

    const response_award = await fetch(`http://localhost:8000/api/get_rewards`)
    const data = await response_award.json()

    const award = document.getElementById('awards');
    for (const index in data) {
        const option = document.createElement('option');
        option.value = data[index];
        option.textContent = data[index];

        for (const i in GeneralDict['awards']) {
            if (data[index] === GeneralDict['awards'][i]) {
                option.selected = true
            }
        }
        award.appendChild(option);
    }

    if (award.children.length == data.length) {
        setTimeout(() => startChoices(), 0)
    }

    const response = await fetch(`http://localhost:8000/api/check_token_if_admin?token=${URLParams.token}`);
    const isMark = await response.json();

    if (isMark) {
        document.getElementById('share-button').dataset.view = true;
    }

    const yearBlock = document.getElementById('year-button-block');
    for (let year of yearBlock.children) {
        if (year.textContent === URLParams.year) {
            year.classList.add('active-year');
        }
    }

    GeneralDict.isFirstOpen = true
    saveInfo("GeneralDict", GeneralDict);
}

function changeYear(year) {
    const path = `${window.location.pathname}?token=${URLParams.token}&year=${year}`;
    window.location.href = path;
}

function addPhoto(file) {
    let photo = document.getElementById("person-photo");
    photo.style.backgroundImage = `url('${file}')`;
}

function saveStaticInfo(key) {
    const info = document.getElementById(key);
    GeneralDict[key] = info.value;

    GeneralDict.isInfoAdd = true
    saveInfo("GeneralDict", GeneralDict);
}

function saveYearInfo() {
    const info = document.getElementById('yearBiography');
    YearDict[URLParams.year]['description'] = info.value;

    YearDict.isInfoAdd = true
    saveInfo("YearDict", YearDict);
}

async function useLinkPopup() {
    document.getElementById('link-popup').classList.toggle('close');

    
    const response = await fetch('http://localhost:8000/api/create_token', {
        method: 'POST'
    });
    const data = await response.json();
    
    const token = encodeURIComponent(data);
    const url = `http://localhost:8001/form?token=${token}&year=1940`; //TODO заменить на домен и добавить qr
    
    const copyButton = document.getElementById('copy-button');
    copyButton.style.backgroundImage = "url('media/copy-icon.png')";

    const qrCode = new QRCode(document.getElementById("popup-qr"), url);

    const link = document.createElement('a');
    link.href = url;
    link.textContent = url;
    link.id = 'copy-link'
    
    console.log(document.getElementById('copy-link'));
    if (document.getElementById('copy-link') == undefined) {
        document.getElementById('link').appendChild(link);
    }
}

function usePhotoPopup(status = 0) {
    if (status === 0) {
        document.getElementById('photo-popup').classList.toggle('close');
    }

    const photoBlock = document.getElementById('photo-block');
    if (YearDict[URLParams.year]['photo'] === "") {
        photoBlock.innerHTML = 'На этот год фотографии отсутствуют';
    } else {
        photoBlock.innerHTML = '';
        YearDict[URLParams.year]['photo'].forEach(adress => {
            const photo = document.createElement('img');
            photo.classList.add('year-photo');
            photo.src = adress;
            photoBlock.appendChild(photo);
        });
    }
}

function copyLink() {
    const link = document.getElementById('copy-link');
    navigator.clipboard.writeText(link.href);

    const copyButton = document.getElementById('copy-button');
    copyButton.style.backgroundImage = "url('media/galochchchka.png')";
}

function closePopup(id) {
    document.getElementById(id).classList.toggle('close');

    if (id == 'link-popup') {
        document.getElementById('popup-qr').removeChild(document.getElementById('popup-qr').lastChild);
    }
}

function useInput(id) {
    document.getElementById(id).click();
}

function saveInputPhoto(id) {
    const input = document.getElementById(id);
    const file = input.files[0];
    console.log(file);

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
                if (YearDict[URLParams.year]['photo'] === "") {
                    YearDict[URLParams.year]['photo'] = [adress];
                } else {
                    YearDict[URLParams.year]['photo'].push(adress);
                }
                YearDict.isInfoAdd = true
                saveInfo("YearDict", YearDict)
                usePhotoPopup(1)
            }
        };
        
        reader.readAsDataURL(file);
    }
}

function saveAward() {
    const awards = document.getElementById('awards');
    for (const elem in awards.options) {
        if (awards.options[elem].selected && !GeneralDict['awards'].includes(awards.options[elem].value)) {
            GeneralDict['awards'].push(awards.options[elem].value)
        }
    }
    GeneralDict.isInfoAdd = true
    saveInfo("GeneralDict", GeneralDict)
}

// ======================================= Работа с картой

let map;
let marker;
let selectedCoords = null;

addEventListener('load', function () { 
    let icon = L.icon({
        iconUrl      : '../src/star.svg',
        // shadowUrl    : '../src/shadow.png',

        iconSize     : [30,30],
        iconAnchor   : [15,15],

        // shadowSize   : [60,60],
        // shadowAnchor : [30,30],
    })
    if (YearDict[URLParams.year]['cord'] === "") {
        map = L.map('map-block').setView([55.75, 37.61], 8); // Москва, масштаб 10
    } else {
        map = L.map('map-block').setView([YearDict[URLParams.year]['cord'].Lat, YearDict[URLParams.year]['cord'].Lng], 8);
        marker = L.marker([YearDict[URLParams.year]['cord'].Lat, YearDict[URLParams.year]['cord'].Lng], {icon:icon}).addTo(map);
    }

    // Добавляем тайлы OpenStreetMap
    L.tileLayer('https://tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=jFVHTIg2WK3xJlt5wfqJ7F41zVI76aPnnsvSD3Pm4pjbR1J2mpnmUEMyUFjWKQY8', {}).addTo(map);

    map.on('click', function (e) {  
        
        const { lat, lng } = e.latlng;

        // Удаляем старую метку, если есть
        if (marker) {
            map.removeLayer(marker);
        }

        // Ставим новую метку
        marker = L.marker([lat, lng], {icon:icon}).addTo(map);

        const Lat = lat.toFixed(2);
        const Lng = lng.toFixed(2);

        selectedCoords = { Lat, Lng };
        YearDict[URLParams.year]['cord'] = selectedCoords

        YearDict.isInfoAdd = true
        saveInfo("YearDict", YearDict)
    });
});

// ======================================= Скрипт для списка с наградами

function startChoices() {
    awardsSelect = new Choices('#awards', {
        removeItemButton: true,
        itemSelectText: '',
        containerOuter: 'custom-outer',
        containerInner: 'custom-inner',
        input: 'custom-input',
        list: 'custom-list',
        item: 'custom-item',
        placeholder: 'custom-placeholder',
    });

    awardsSelect.passedElement.element.addEventListener('removeItem', (item) => {
        for (const index in GeneralDict['awards']) {
            if (item.detail.label === GeneralDict['awards'][index]) {
                GeneralDict['awards'].splice(index, 1)
            }
        }
        saveInfo("GeneralDict", GeneralDict)
    }, false);
}

// ======================================= Отправка информации 

async function sendAllInfo() {
    saveInfo('GeneralDict', {})   //! Убрать эти строчки 
    saveInfo('YearDict', {})
    // location.reload()

    const awards = [];
    for (const elem in document.getElementById('awards').options) {
        if (document.getElementById('awards').options[elem].selected) {
            awards.push(document.getElementById('awards').options[elem].value)
        }
    }
    let name = ''
    if (GeneralDict.secondName != undefined) {
        name += GeneralDict.secondName
    }
    if (GeneralDict.firstName != undefined) {
        name += ' ' + GeneralDict.firstName
    }
    if (GeneralDict.thirdName != undefined) {
        name += ' ' + GeneralDict.thirdName
    }

    delete YearDict['isInfoAdd'];

    const SendDict = {
        name: name, 
        desc: GeneralDict.generalBiography === undefined ? "" : GeneralDict.generalBiography,
        avatar: GeneralDict.photo === 'media/person.jpg' ? "" : GeneralDict.photo,
        info: YearDict,
        awards: awards,
    }

    console.log(SendDict);
    const response = await fetch(`http://localhost:8000/api/check_token?token=${URLParams.token}`);
    const data = await response.json();
    if (!data) {
        alert('В доступе отказано, проверьте ссылку');
    } else {
        const response = await fetch('http://localhost:8000/api/insert_person', {method: 'POST', body: JSON.stringify(SendDict)});
        data = await response.json();
    }
}