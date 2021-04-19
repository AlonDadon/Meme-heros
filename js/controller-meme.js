'use strict'

var gElCanvas;
var gCtx;

function onInit() {
    let imgs = getImgs()
    renderGallery(imgs)
    gElCanvas = document.querySelector('#canvas')
    gCtx = gElCanvas.getContext('2d')
}

function renderGallery(imgs) {
    var strHtml = imgs.map(function (img) {
        return `  
             <img data-id="${img.id}" onclick="onUpdateImg(this)"  src="${img.src}" alt="">`
    })
    getEl('.grid-container').innerHTML = strHtml.join('')
}

function onAddTxt(txt) {
    addTxt(txt)
    renderCanvas()
}

function drawText(text, x, y) {
    let meme = getMeme()
    if (!meme.lines.txt) meme.lines.txt = 'Add text'
    gCtx.beginPath();
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'red'
    gCtx.fillStyle = 'white'
    gCtx.font = '40px IMPACT'
    gCtx.textAlign = 'center'
    // todo add dynmic txt
    gCtx.fillText(meme.lines.txt, 100, 50, gElCanvas.width)
    gCtx.strokeText(meme.lines.txt, 100, 50, gElCanvas.width)
    // syntax gCtx.fillText(txt, x, y,canvasWidth)
}

function renderCanvas() {
    let currImg = getMeme()
    const img = new Image()
    img.src = `img/${currImg.selectedImgId}.jpg`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        drawText();
    }
}

function onUpdateImg(elImg) {
    updateImg(elImg.dataset.id)
    renderCanvas()
}

function toggleMenu() {
    document.body.classList.toggle('menu-open')
}


