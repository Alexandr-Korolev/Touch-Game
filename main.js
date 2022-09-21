const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');

let time = 0;
let score = 0;

startBtn.addEventListener('click', (e)=>{
    // отменим добавление сссылки по умолчанию
    e.preventDefault();
    screens[0].classList.add('up');

})

timeList.addEventListener('click', e =>{
    // делигирование событий
    if (e.target.classList.contains('time-btn')){
        time = parseInt(e.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame()
    }
})


board.addEventListener('click', e =>{
    if (e.target.classList.contains('circle')){
        score ++
        e.target.remove()
        createRandomCircle()
    }
})


function startGame(){
    // задаем таймер
    setInterval(decreaseTime, 1000)

    createRandomCircle()

    setTime(time)
    // вместо timeEl.innerHTML = `00:${time}`
}

function decreaseTime() {
    if (time === 0) {
        finishGame();
    }else {
        let current = --time;

        if(current < 10) {
            current = `0${current}`
        }
        setTime(current)
        // вместо timeEl.innerHTML = `00:${current}`
    }
}

// повторяющиеся элементы 
function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame(){
    // удаление родителя (можно через remove, но будет скачок)
    timeEl.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Ваш счет:<span class="primary">${score}</span></h1>`
}

// тач по объектам
function createRandomCircle() {
    const circle = document.createElement('div')

    // размер объекта
    const size = getRandomNumber(10, 60)
    const {width, height} = board.getBoundingClientRect()

    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);

    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height= `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;

    board.append(circle);
}

// генерация шариков
function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max-min) + min);
}