let person_photo = "media/person.jpg";

addEventListener("load", () => addPhoto());

function addPhoto() {
    let photo = document.getElementById("person-photo");
    photo.style.backgroundImage = `url('${person_photo}')`;
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

function sendForm() {
    let form = document.getElementById("main-form");
    let inputs = form.querySelectorAll("input");
    let data = {};
    for (let i = 0; i < inputs.length; i++) {
        data[inputs[i].getAttribute("placeholder")] = inputs[i].value;
    }
    console.log(data);
    form.reset();
}

function usePopup() {
    document.getElementById('main-popup').classList.toggle('close');
}