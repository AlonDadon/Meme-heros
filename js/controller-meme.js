'use strict'

var gElCanvas;
var gCtx;

function onInit() {
    let imgs = getImgs()
    renderGallery(imgs)
    gElCanvas = document.querySelector('#canvas')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
    renderFontSize(getEl('[name="fontSize"]').value)
}
function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

function renderGallery(imgs) {
    var strHtml = imgs.map(function (img) {
        return `  
        <img data-id="${img.id}" onclick="onUpdateImg(this)"  src="${img.src}" alt="">`
    })
    getEl('.grid-container').innerHTML = strHtml.join('')
}

function renderCanvas() {
    let meme = getMeme()
    let idx = meme.selectedLineIdx
    getEl('[name="addTxt"]').value = meme.lines[idx].txt
    const img = new Image()
    img.src = `img/${meme.selectedImgId}.jpg`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        meme.lines.forEach(function (line) {
            drawTxt(line.txt, line.pos, line.size)
        })
    }
}
function drawTxt(txt, pos, fontSize) {
    gCtx.beginPath();
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'red'
    gCtx.fillStyle = 'white'
    console.log();
    gCtx.font = `${fontSize}px IMPACT`
    gCtx.textAlign = 'center'
    gCtx.fillText(txt, pos.x, pos.y, gElCanvas.width)
    gCtx.strokeText(txt, pos.x, pos.y, gElCanvas.width)
    // syntax gCtx.fillText(txt, x, y,canvasWidth)
}

function onUpdateImg(elImg) {
    updateImg(elImg.dataset.id)
    renderCanvas()
}

function onAddTxt(txt) {
    addTxt(txt)
    renderCanvas()
}
function onUpdateFontSize(fontSize) {
    updateFontSize(fontSize)
    renderFontSize(fontSize)
    renderCanvas()
}
function renderFontSize(fontSize) {
    getEl('.font-size').innerText = fontSize
}
function onMoveLine(diff) {
    updateLinePos(diff)
    renderCanvas()
}

function onAddLine() {
    createLine()
    switchLine()
    renderCanvas()
}
function onSwitchLine() {
    switchLine()
    renderCanvas()
}



function toggleMenu() {
    document.body.classList.toggle('menu-open')
}