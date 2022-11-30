const num = document.getElementsByClassName("sumando");
const btn = document.getElementsByClassName("change-num");
const settingsBtn = document.getElementsByClassName("settings-btn");
const resultBtn = document.getElementsByClassName("show-result");
const totalStr = document.getElementsByClassName("total");
const wrapper = document.getElementsByClassName("wrapper");
const settings = document.getElementsByClassName("settings");

let total = 0;
let i = 0;
let choosenTime = 1;

btn[0].addEventListener("click", nuevoJuevo);
settingsBtn[0].addEventListener("click", () => showSettings(settings[0]));
resultBtn[0].addEventListener("click", showResult);


function showSettings(element, hide = false) {
    if (hide === true) {
        element.classList.add("hidden")
    } else {
        element.classList.toggle("hidden")
    }
}

function createNewArray(n, rango, neg) {
    if (neg) {
        newArray = Array.from(
            { length: n },
            () => Math.floor((Math.random() - 0.5) * 2 * rango))
    } else {
        newArray = Array.from(
            { length: n },
            () => Math.floor(Math.random() * rango))
    };
    return newArray
};

// esta funcion se usa con: await sleep(i * 1000);
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Esta función cambia el color y escribe el texto de los números 
function formatText(element, num) {
    if (Number.isInteger(num)) {
        element.innerText = (num).toString();
        if (num > 0) {
            element.innerText = "+" + element.innerText;
            element.classList.add("verde");
        } else {
            element.classList.add("rojo")
        }
    } else {
        element.innerText = num;
        element.style.fontSize = "50px";
    }
};

// Esta función elimina el viejo número, crea el nuevo h2 y lo agrega
function changeText(num) {
    const newNum = document.createElement("h2");
    const oldNum = document.body.getElementsByClassName("sumando")
    oldNum[0].remove()
    newNum.classList.add("sumando")
    formatText(newNum, num);
    wrapper[0].prepend(newNum);
};

// función que maneja todo el cambio de los números
async function changeNum(num_array, time) {
    while (i < num_array.length) {
        total += num_array[i];
        changeText(num_array[i]);
        i++;
        await sleep((time * (4 / 9) + (5 / 9)) * 1000);
    }
};

function showResult() {
    showSettings(btn[0]);
    totalStr[0].innerText = `El total es: ${total}`;
    showSettings(totalStr[0]);
    showSettings(resultBtn[0]);
}

async function nuevoJuevo() {
    total = 0;
    i = 0;
    showSettings(btn[0], true);
    showSettings(totalStr[0], true);
    showSettings(settings[0], true);
    choosenTime = elementValue("tiempo");
    amountOfNums = elementValue("cantidad");
    rangeOfNums = elementValue("rango");
    negativeNums = document.getElementById("neg-num").checked;
    totalStr[0].innerText = `El total es: 0`;
    newArray = createNewArray(amountOfNums, rangeOfNums, negativeNums);
    await changeNum(newArray, choosenTime);
    changeText("¿Cuánto es el total?")
    showSettings(resultBtn[0]);
};

function elementValue(id) {
    const value = document.getElementById(id).value
    return value
};
