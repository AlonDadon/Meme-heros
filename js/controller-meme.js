'use strict'

var gElCanvas
var gCtx
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function onInit() {
    let imgs = getImgs()
    renderGallery(imgs)
    gElCanvas = document.querySelector('#canvas')
    gCtx = gElCanvas.getContext('2d')
    addListeners()
    createLine()
    renderFontSize(getEl('[name="fontSize"]').value)
}

function resizeCanvas() {
    let meme = getMeme()
    let img = new Image()
    img.src = `img/${meme.selectedImgId}.jpg`;
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = (img.height * gElCanvas.width) / img.width
    updateCanvasSize(gElCanvas.width, gElCanvas.height)
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
    let userImg = getUserImg()
    if (meme.lines[idx] || meme.lines.length) {
        renderUserController(meme.lines[idx].txt, meme.lines[idx].size)
    }
    let img = new Image()
    img.src = `img/${meme.selectedImgId}.jpg`;
    img.onload = () => {
        if (userImg) img = userImg
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        meme.lines.forEach(function (line) {
            drawTxt(line.txt, line.pos, line.size, line.strokeColor, line.txtAlign, meme.fontFamily)
        })
    }

}

function renderUserController(txt, fontSize) {
    getEl('[name="addTxt"]').value = txt
    getEl('[name="fontSize"]').value = fontSize
    renderFontSize(fontSize)
}

function drawTxt(txt, pos, fontSize, color, txtAlign, fontFamily) {
    gCtx.beginPath();
    gCtx.lineWidth = 2
    gCtx.strokeStyle = color
    gCtx.fillStyle = 'white'
    gCtx.font = `${fontSize}px ${fontFamily}`
    gCtx.textAlign = txtAlign
    gCtx.fillText(txt, pos.x, pos.y, gElCanvas.width)
    gCtx.strokeText(txt, pos.x, pos.y, gElCanvas.width)
}

function onUpdateImg(elImg) {
    updateImg(elImg.dataset.id)
    resizeCanvas()
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
    updateLinePosY(diff)
    renderCanvas()
}

function onAddLine() {
    createLine()
    renderCanvas()
}
function onSwitchLine() {
    switchLine()
    renderCanvas()
}
function onUpdateStroke(color) {
    updateStroke(color)
    renderCanvas()
}

function onUpdateFontFamily(fontFamily) {
    updateFontFamily(fontFamily)
    renderCanvas()
}

function onUpdateTxtAlign(align) {
    updateTxtAlign(align)
    renderCanvas()
}

function onRemoveLine() {
    removeLine()
    renderCanvas()
}

function onDownloadImg(elLink) {
    let imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}
function onImgInput(ev) {
    loadImageFromInput(ev, renderCanvas)
}

function toggleMenu() {
    document.body.classList.toggle('menu-open')
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderCanvas()
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
    gElCanvas.addEventListener('mouseleave', onLeave)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function isLineClicked(clickedPos) {
    return gMeme.lines.some(function (line) {
        const distance = Math.sqrt((line.pos.x - clickedPos.x) ** 2 + (line.pos.y - clickedPos.y) ** 2)
        return distance <= line.lineSize
    })
}

function onDown(ev) {
    const pos = getEvPos(ev)
    if (!isLineClicked(pos)) return
    let lineIdx = getLineIdxByPos(pos)
    switchLine(lineIdx)
    updateIsDragging(true)
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    let meme = getMeme()
    let idx = meme.selectedLineIdx
    let currLine = meme.lines[idx]
    if (currLine.isDragging) {
        const pos = getEvPos(ev)
        updateLinePos(pos)
        renderCanvas()
    }
}

function onUp() {
    updateIsDragging(false)
    document.body.style.cursor = 'grab'
}

function onLeave() {
    document.body.style.cursor = 'auto'
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}