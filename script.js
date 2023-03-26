const btn = document.querySelector(".btn");
const rootEl = document.documentElement;
const hourHand = document.querySelector(".hour-hand");
const minuteHand = document.querySelector(".minute-hand");
const secondHand = document.querySelector(".second-hand");
const timeValueEl = document.querySelector(".time__value");
const timeInfoEl = document.querySelector(".time__info");
const dateDayEl = document.querySelector(".date__day");
const dateMonthEl = document.querySelector(".date__month");
const dateValueEl = document.querySelector(".date__value");

const dayList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

btn.addEventListener("click", ev => {
    updateColorMode();
})

function updateColorMode () {
    if (rootEl.classList.contains("dark-mode")) {
        rootEl.classList.remove("dark-mode");
        btn.innerHTML = `Dark Mode`;
    }
    else {
        rootEl.classList.add("dark-mode");
        btn.innerHTML = `Light Mode`;
    }
}

function updateTime () {
    const data = new Date;
    const hourRaw = data.getHours();
    const hour = hourRaw % 12;
    const minuteRaw = data.getMinutes();
    const minute = (minuteRaw).toString().length == 2 ? `${(minuteRaw)}` : `0${(minuteRaw)}`;
    const second = data.getSeconds();
    const timeInfo = hourRaw >= 12? "PM" : "AM";
    const day = dayList[data.getDay()];
    const month = monthList[data.getMonth()];
    const date = data.getDate();

    timeValueEl.innerHTML = `${hour}:${minute}`;
    timeInfoEl.innerHTML = timeInfo;
    dateDayEl.innerHTML = day;
    dateMonthEl.innerHTML = month;
    dateValueEl.innerHTML = date;

    hourHand.style.transform = `translateX(-50%) rotate(${mapRange(hour, 0, 11, 0, 360)}deg)`;
    minuteHand.style.transform = `translateX(-50%) rotate(${mapRange(minuteRaw, 0, 59, 0, 360)}deg)`;
    secondHand.style.transform = `translateX(-50%) rotate(${mapRange(second, 0, 59, 0, 360)}deg)`;
}

function mapRange(value, originalStart, originalEnd, targetStart, targetEnd) {
    const originalRange = originalEnd - originalStart;
    const targetRange = targetEnd - targetStart;
    const scaledValue = (value - originalStart) / originalRange;
    const targetValue = targetStart + (scaledValue * targetRange);
    return targetValue;
}  

updateTime();

setInterval(updateTime, 1000);
