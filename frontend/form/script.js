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

addEventListener("load", () => startSite());

async function startSite() {
    const parametrs = new URLSearchParams(window.location.search); //* В url нужно передавать токен и год: ?person=...&year=...

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

        for (const i in YearDict['awards']) {
            if (data[index] === YearDict['awards'][i]) {
                option.selected = true
            }
        }

        award.appendChild(option);
    }
    if (award.children.length == data.length) {
        setTimeout(() => startChoices(), 0)
    }
    console.log(URLParams);
    const response = await fetch(`http://localhost:8000/api/check_token_if_admin?token=${URLParams.token}`);
    const isMark = await response.json();
    console.log(isMark);
    
    if (isMark) {
        document.getElementById('share-button').dataset.view = true;
    }

    const yearBlock = document.getElementById('year-button-block');
    for (let year of yearBlock.children) {
        if (year.textContent === URLParams.year) {
            year.classList.add('active-year');
        }
    }
}

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
            YearDict['awards'] = []
            saveInfo("YearDict", YearDict)
        }
    }
    else {
        const textarea = document.getElementById('yearBiography')
        YearDict[URLParams.year] === undefined ? textarea.placeholder = `События года` : textarea.value = YearDict[URLParams.year]
        
        const awards = document.getElementById('awards');
        YearDict['awards'].forEach(award => {
            for (let option of awards.options) {
                if (option.value === award) {
                    option.selected = true;
                }
            }
        });
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

    const response = await fetch('http://localhost:8000/api/create_token', {
        method: 'POST'
    });
    const data = await response.json();

    const token = encodeURIComponent(data);
    const url = `http://localhost:8001/form?token=${token}&year=1940`; //TODO заменить на домен и добавить qr

    const link = document.getElementById('link');
    link.href = url;
    link.textContent = url;
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
                } else {
                    YearDict[`${URLParams.year}-photo`].push(adress);
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
        if (awards.options[elem].selected && !YearDict['awards'].includes(awards.options[elem].value)) {
            YearDict['awards'].push(awards.options[elem].value)
        }
    }
    YearDict.isInfoAdd = true
    saveInfo("YearDict", YearDict)
}


async function sendAllInfo() {
    // saveInfo('GeneralDict', {})   //! Убрать эти строчки 
    // saveInfo('YearDict', {})
    // location.reload()

    const awards = [];
    for (const elem in document.getElementById('awards').options) {
        if (document.getElementById('awards').options[elem].selected) {
            awards.push(document.getElementById('awards').options[elem].value)
        }
    }

    const SendDict = {
        name: GeneralDict.secondName + ' ' + GeneralDict.firstName + ' ' + GeneralDict.thirdName, 
        desc: GeneralDict.generalBiography,
        avatar: GeneralDict.photo,
        info: YearDict,
        awards: awards,
    }

    const response = await fetch(`http://localhost:8000/api/check_token?token=${URLParams.person}`);
    const data = await response.json();
    if (!data.content) {
        alert('В доступе отказано, проверьте ссылку');
    } else {
        const response = await fetch('http://localhost:8000/api/insert_person', {method: 'POST', body: JSON.stringify(SendDict)});
        data = await response.json();
    }
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
    if (YearDict[`${URLParams.year}-cord`] === undefined) {
        map = L.map('map-block').setView([55.75, 37.61], 8); // Москва, масштаб 10
    } else {
        map = L.map('map-block').setView([YearDict[`${URLParams.year}-cord`].Lat, YearDict[`${URLParams.year}-cord`].Lng], 8);
        marker = L.marker([YearDict[`${URLParams.year}-cord`].Lat, YearDict[`${URLParams.year}-cord`].Lng], {icon:icon}).addTo(map);
        
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
        YearDict[`${URLParams.year}-cord`] = selectedCoords

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
        for (const index in YearDict['awards']) {
            if (item.detail.label === YearDict['awards'][index]) {
                YearDict['awards'].splice(index, 1)
            }
        }
        saveInfo("YearDict", YearDict)
    }, false);
}