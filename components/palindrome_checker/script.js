const inputValue = document.getElementById('input');
const result = document.getElementById('validate');


inputValue.addEventListener('input', (event) => {

    let liveValue = event.target.value;
    result.innerHTML = liveValue ? check(liveValue) ?
        `<span class="true">${liveValue}</span> is`
        :
        `<span class="false">${liveValue}</span> isn't`
        : ``;

})

function check(liveValue) {
    liveValue = liveValue.replace(/[^a-z,0-9]/gi, '').toLowerCase();
    let reversedValue = liveValue.split("").reverse().join("");
    if (liveValue === reversedValue) {
        return true;
    }
}





