const xhr = new XMLHttpRequest();
const url = 'https://ethgasstation.info/json/ethgasAPI.json';

const traderEl = document.getElementById("trader-value");
const fastEl = document.getElementById("fast-value");
const standardEl = document.getElementById("standard-value");
const btnRefresh = document.getElementById("btn_refresh");
const buttonText = document.getElementById("buttonText");
const buttonLoader = document.getElementById("buttonLoader");

let LOADING = false;
btnRefresh.addEventListener("click", requestGasPrices);

function requestGasPrices() {
    if(LOADING) return;

    setLoading(true);

    xhr.open("GET", url, true);

    xhr.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            let jsonData = undefined;

            try {
                jsonData = JSON.parse(xhr.responseText);
                updateValues(jsonData);
                setLoading(false);
            } 
            catch(e) {
                console.warn("Unable to parse JSON", xhr.responseText);
            }
        }
    }

    xhr.send();
}

function updateValues(data) {
    const trader = data.fastest * 0.1;
    const fast = data.fast * 0.1;
    const standard = data.average * 0.1;

    traderEl.textContent = format(trader);
    fastEl.textContent = format(fast);
    standardEl.textContent = format(standard);
}

function setLoading(isLoading) {
    if(isLoading) {
        buttonText.style.display = "none";
        buttonLoader.style.display = "block";
    } else {
        buttonText.style.display = "block";
        buttonLoader.style.display = "none";
    }
    LOADING = isLoading;
}

function format(number) {
    return Math.round(number*10)/10;
}

requestGasPrices();