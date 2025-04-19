let GeneralDict = new Map()
GeneralDict.isInfoAdd = false

const URLParams = new Map()

if (!("GeneralDict" in localStorage)) {
    saveInfo("GeneralDict", GeneralDict);
}

function saveInfo(key, value) {
    const jsonString = JSON.stringify(value);
    localStorage.setItem(key, jsonString);
}

function getInfo(key) {
    const jsonString = localStorage.getItem(key);
    return JSON.parse(jsonString);
}

addEventListener("load", () => { //func Начальная функция проверки пользователя и работы с аргументами
    const location = window.location.pathname;
    const parametrs = new URLSearchParams(window.location.search); //* В url нужно передавать токен и год: ?person=...&year=...

    for (const [key, value] of parametrs.entries()) {
        URLParams[key] = value;
    }

    console.log(URLParams)
    
    if (URLParams.person === 'MarkToken') {
        document.getElementById('share-button').dataset.view = 'true';
    }
});

addEventListener("load", () => {
    GeneralDict = getInfo("GeneralDict")
    if (!(GeneralDict.isInfoAdd)) {
        GeneralDict.photo = "media/person.jpg"
        GeneralDict.secondName = undefined
        GeneralDict.firstName = undefined
        GeneralDict.thirdName = undefined
    } 
    else {
        addPhoto(GeneralDict.photo)

        document.querySelectorAll('#main-form input').forEach((input, index) => {
            const nameList = ['secondName', 'firstName', 'thirdName']
            const nameDict = {secondName: 'Фамилия', firstName: 'Имя', thirdName: 'Отчество'}
            GeneralDict[nameList[index]] === undefined ? input.placeholder = nameDict[nameList[index]] : input.value = GeneralDict[nameList[index]]
        });
    }
})

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
    console.log(GeneralDict)
    saveInfo("GeneralDict", GeneralDict);
}

async function usePopup() {
    document.getElementById('main-popup').classList.toggle('close');
    // response = await fetch('http://localhost:8000/api/create_token', {method: 'POST'});
    // data = await response.json();
    
    data = 'Ультра супер классный единоразовый токен';
    const link = document.getElementById('link');
    link.innerHTML = data;
}

function closePopup() {
    document.getElementById('main-popup').classList.toggle('close');
}

const pht_button = document.getElementById('photo-button');
const pht_input = document.getElementById('photo-input');

pht_button.addEventListener('click', () => {
    pht_input.click();
});

pht_input.addEventListener('change', () => {
    const file = pht_input.files[0];
    
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        
        reader.onload = function (e) {
            GeneralDict.photo = e.target.result;
            GeneralDict.isInfoAdd = true
            saveInfo("GeneralDict", GeneralDict)
            addPhoto(e.target.result)
        };
        
        reader.readAsDataURL(file);
    }
});


function sendAllInfo() {
    saveInfo('GeneralDict', {})
    location.reload()
}