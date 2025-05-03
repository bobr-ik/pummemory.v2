// Вся ответственность за эту страницу лежит на const name = "Береговой Лев Владимирович"; :)

let GeneralDict = new Map()
GeneralDict.isInfoAdd = false

let YearDict = new Map()
YearDict.isInfoAdd = false

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
    GeneralDict = getInfo("GeneralDict")
    YearDict = getInfo("YearDict")
    console.log("GeneralDict", GeneralDict);
    console.log("YearDict", YearDict);

    const parametrs = new URLSearchParams(window.location.search);
    GeneralDict._token = parametrs.searchParams.get("token");

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
                console.log(option);
            }
        }
        award.appendChild(option);
    }

    if (award.children.length == data.length) {
        setTimeout(() => startChoices(), 0)
    }

    const response = await fetch(`http://localhost:8000/api/check_token_if_admin?token=${GeneralDict._token}`);
    const isMark = await response.json();

    if (isMark) {
        document.getElementById('share-button').dataset.view = true;
    }

    GeneralDict._year == undefined ? GeneralDict._year = 1940 : GeneralDict._year
    document.getElementById(GeneralDict._year).classList.add('active-year')
    saveInfo("GeneralDict", GeneralDict);

    prepareInfo();
    addPhoto(GeneralDict.avatar);
    mapWork();
}

function prepareInfo() {
    if (!(GeneralDict.isInfoAdd)) {
        GeneralDict._token = undefined
        GeneralDict.avatar = "media/person.jpg"
        GeneralDict.secondName = undefined
        GeneralDict.firstName = undefined
        GeneralDict.thirdName = undefined
        GeneralDict.generalBiography = undefined
        GeneralDict.yearBiography = undefined
        GeneralDict.awards = []
        GeneralDict.photo = []
        saveInfo("GeneralDict", GeneralDict)
    } 
    else {
        addPhoto(GeneralDict.avatar)

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
        textarea.value = YearDict[GeneralDict._year]['description']
        YearDict[GeneralDict._year]['description'] === "" ? textarea.placeholder = `События года` : textarea.value = YearDict[GeneralDict._year]['description']
    }
}

function changeYear(year) {
    document.getElementById(GeneralDict._year).classList.remove('active-year');
    document.getElementById(year).classList.add('active-year')
    GeneralDict._year = year
    saveInfo("GeneralDict", GeneralDict);

    // Запускаем все функции
    prepareInfo();
    addPhoto(GeneralDict.avatar);
    mapWork();
}

function addPhoto(file) {
    let photo = document.getElementById("person-img");
    photo.src = file;
}

function saveStaticInfo(key) {
    const info = document.getElementById(key);
    GeneralDict[key] = info.value;

    GeneralDict.isInfoAdd = true
    saveInfo("GeneralDict", GeneralDict);
}

function saveYearInfo() {
    const info = document.getElementById('yearBiography');
    YearDict[GeneralDict._year]['description'] = info.value;

    YearDict.isInfoAdd = true
    saveInfo("YearDict", YearDict);
}

async function useLinkPopup() {
    document.getElementById('link-popup').classList.toggle('close');

    
    const response = await fetch('http://pummemory.pumibari.ru/api/create_token', {
        method: 'POST'
    });
    const data = await response.json();
    
    const token = encodeURIComponent(data);
    const url = `http://pummemory.pumibari.ru/form?token=${token}&year=1940`; //TODO заменить на домен и добавить qr
    
    const copyButton = document.getElementById('copy-button');
    copyButton.style.backgroundImage = "url('media/copy-icon.png')";

    const qrCode = new QRCode(document.getElementById("popup-qr"), url);

    const link = document.createElement('a');
    link.href = url;
    link.textContent = url;
    link.id = 'copy-link'
    
    if (document.getElementById('copy-link') == undefined) {
        document.getElementById('link').appendChild(link);
    }
}

function usePhotoPopup(status, key) {
    if (status == 0) {
        document.getElementById('photo-popup').classList.toggle('close');
    }

    const photoBlock = document.getElementById('photo-block');
    const button = document.getElementById('popup-photo-button');
    button.dataset.key = key;

    if (key == 'year') {
        if (YearDict[GeneralDict._year]['photo'] === "") {
            photoBlock.innerHTML = 'На этот год фотографии отсутствуют';
        } else {
            photoBlock.innerHTML = '';
            YearDict[GeneralDict._year]['photo'].forEach(adress => {
                const photo = document.createElement('img');
                photo.classList.add('year-photo');
                photo.src = adress;
                photoBlock.appendChild(photo);
            });
        }
    } if (key == 'general') {
        if (GeneralDict['photo'].length === 0) {
            photoBlock.innerHTML = 'На этот год фотографии отсутствуют';
        } else {
            photoBlock.innerHTML = '';
            GeneralDict['photo'].forEach(adress => {
                const photo = document.createElement('img');
                photo.classList.add('year-photo');
                photo.src = adress;
                photoBlock.appendChild(photo);
            });
        }
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

function useInput(id, key=undefined) {
    const input = document.getElementById(id);
    if (key !== undefined) {
        input.dataset.key = key
    }
    input.click();
}

function saveInputPhoto(key) {
    let input;
    key === 'avatar-input' ? input = document.getElementById(key) : input = document.getElementById('popup-photo-input');   
    const file = input.files[0];

    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        
        reader.onload = function (e) {
            adress = e.target.result

            if (key === 'avatar-input') {
                GeneralDict.avatar = e.target.result;
                GeneralDict.isInfoAdd = true
                saveInfo("GeneralDict", GeneralDict)
                addPhoto(e.target.result)
            } else {
                if (key === 'year') {
                    if (YearDict[GeneralDict._year]['photo'] === "") {
                        YearDict[GeneralDict._year]['photo'] = [adress];
                    } else {
                        YearDict[GeneralDict._year]['photo'].push(adress);
                    }
                    YearDict.isInfoAdd = true
                    saveInfo("YearDict", YearDict)
                }
                if (key === 'general') {
                    if (GeneralDict['photo'].length === 0) {
                        GeneralDict['photo'] = [adress];
                    } else {
                        GeneralDict['photo'].push(adress);
                    }
                    GeneralDict.isInfoAdd = true
                    saveInfo("GeneralDict", GeneralDict)
                }
                usePhotoPopup(1, key)
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

function mapWork() {
    const icon = L.icon({
        iconUrl: '../src/star.svg',
        iconSize: [30, 30],
        iconAnchor: [15, 15],
    });

    const defaultCoords = [55.75, 37.61]; // Москва
    const zoom = 8;

    const currentCoords = YearDict[GeneralDict._year]?.cord;
    const hasCoords = currentCoords && currentCoords.Lat && currentCoords.Lng;

    const coordsToUse = hasCoords ? [parseFloat(currentCoords.Lat), parseFloat(currentCoords.Lng)] : defaultCoords;

    if (!map) {
        map = L.map('map-block').setView(coordsToUse, zoom);

        L.tileLayer(
            'https://tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=jFVHTIg2WK3xJlt5wfqJ7F41zVI76aPnnsvSD3Pm4pjbR1J2mpnmUEMyUFjWKQY8',
            {}
        ).addTo(map);

        map.on('click', function (e) {
            const { lat, lng } = e.latlng;

            if (marker) {
                map.removeLayer(marker);
            }

            marker = L.marker([lat, lng], { icon }).addTo(map);

            const Lat = lat.toFixed(2);
            const Lng = lng.toFixed(2);

            selectedCoords = { Lat, Lng };
            YearDict[GeneralDict._year].cord = selectedCoords;

            YearDict.isInfoAdd = true;
            saveInfo("YearDict", YearDict);
        });
    } else {
        if (marker) {
            map.removeLayer(marker);
            marker = null;
        }

        map.setView(coordsToUse, zoom);
    }
    if (hasCoords) {
        marker = L.marker(coordsToUse, { icon }).addTo(map);
    }
}

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
        avatar: GeneralDict.avatar === 'media/person.jpg' ? "" : GeneralDict.avatar,
        photo: GeneralDict.photo.length === 0 ? "" : GeneralDict.photo,
        info: YearDict,
        awards: awards,
    }

    console.log(SendDict);
    // const response = await fetch(`http://localhost:8000/api/check_token?token=${GeneralDict._token}`);
    // const data = await response.json();
    // if (!data) {
    //     alert('В доступе отказано, проверьте ссылку');
    // } else {
    //     const response = await fetch('http://localhost:8000/api/insert_person', {method: 'POST', body: JSON.stringify(SendDict)});
    //     data = await response.json();
    // }
}