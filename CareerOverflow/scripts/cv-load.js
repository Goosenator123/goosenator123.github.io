let preson1 = {
    profilePic: '../images/feature.png',
    firstName: "John",
    lastName: "Smith",
    cv: 'sdfsf',
}

const list = document.getElementById('cv-list');

function stuff() {
    const div = document.createElement('div');
    const image = document.createElement('img');
    const input = document.createElement('button');
    const name = document.createElement('h1');

    input.textContent = "CV";
    input.style.width = "50px";
    input.style.height = "50px";
    name.textContent = "john smith";
    name.style.marginLeft = "10px";
    name.style.fontSize - "1.6rem"
    image.src = "./images/feature.png"
    image.style.height = "100px"
    image.style.width = "100px"
    div.style.padding = "20px";
    div.style.display = "flex";
    div.style.borderRadius = "20px";
    div.style.flexDirection = "row";
    div.style.margin = "10px"
    div.style.justifyContent = "space-between";
    div.appendChild(image);
    div.appendChild(name);
    div.appendChild(input);
    list.appendChild(div);
    div.style.backgroundColor = "#ca9ee6";
    div.style.width = "fit-content";
    div.style.height = "fit-content";
}

function execute() {
    for (let x = 1; x < 10; x++) {
        stuff();
    }
}

window.onload = execute();