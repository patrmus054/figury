let mouseX;
let mouseY;
let mouseX0;
let mouseY0;

let elementWidth;
let elementHeight;
let elementPositionTop;
let elementPositionLeft;

const page = document.querySelector("main");
const canvas = document.querySelector(".canvas");
const canvasWidth = canvas.offsetWidth;
const canvasHeight = canvas.offsetHeight;
const figures = canvas.querySelectorAll(".figure");

function getMouseCoordinates(event) {
    mouseX = event.pageX;
    mouseY = event.pageY;
}

function getStartingMouseCoordinates(event) {
    mouseX0 = event.pageX;
    mouseY0 = event.pageY;
}

function getTouchCoordinates(event) {
    mouseX = event.changedTouches[0].pageX;
    mouseY = event.changedTouches[0].pageY;
}

function getStartingTouchCoordinates(event) {
    mouseX0 = event.changedTouches[0].pageX;
    mouseY0 = event.changedTouches[0].pageY;
}

function getTop(element) {
    return parseInt(getComputedStyle(element).getPropertyValue("top"));
}

function getBottom(element) {
    return parseInt(getComputedStyle(element).getPropertyValue("bottom"));
}

function getLeft(element) {
    return parseInt(getComputedStyle(element).getPropertyValue("left"));
}

function getRight(element) {
    return parseInt(getComputedStyle(element).getPropertyValue("right"));
}

function getWidth(element) {
    return parseInt(getComputedStyle(element).getPropertyValue("width"));
}

function getHeight(element) {
    return parseInt(getComputedStyle(element).getPropertyValue("height"));
}


function setTop(element, value) {
    element.style.setProperty("top", `${value}px`);
}

function setBottom(element, value) {
    element.style.setProperty("bottom", `${value}px`);
}

function setLeft(element, value) {
    element.style.setProperty("left", `${value}px`);
}

function setRight(element, value) {
    element.style.setProperty("right", `${value}px`);
}