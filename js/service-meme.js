'use strict'

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']
var gKeywords = { 'happy': 12, 'funny puk': 1 }
var gMeme = {
    canvasSize: {
        width: 0,
        height: 0,
    },
    spaceBetweenLine: 40,
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [],
    fontFamily: 'rockSalt'
}
var gImgs = []
createImgs(18)

function removeLine() {
    const idx = gMeme.selectedLineIdx
    gMeme.lines.splice(idx, 1)
    gMeme.selectedLineIdx = 0
}

function updateTxtAlign(txtAlign) {
    const idx = gMeme.selectedLineIdx
    gMeme.lines[idx].txtAlign = txtAlign
}

function updateFontFamily(fontFamily) {
    gMeme.fontFamily = fontFamily
}

function updateStroke(color) {
    const idx = gMeme.selectedLineIdx
    gMeme.lines[idx].strokeColor = color
}

function updateFill(color) {
    const idx = gMeme.selectedLineIdx
    gMeme.lines[idx].fillColor = color
}

function updateCanvasSize(width, height) {
    gMeme.canvasSize.width = width
    gMeme.canvasSize.height = height
    gMeme.lines.forEach(line => {
        line.pos.x = width / 2
    })
}

function switchLine(idx) {
    if (idx || idx === 0) {
        gMeme.selectedLineIdx = idx
    } else {
        gMeme.selectedLineIdx++
        if (gMeme.selectedLineIdx >= gMeme.lines.length) {
            gMeme.selectedLineIdx = 0
        }
    }
}

function createLine() {
    let line = {
        txt: 'Add text',
        size: 50,
        align: 'left',
        strokeColor: 'black',
        fillColor: 'white',
        pos: {
            x: gMeme.canvasSize.width / 2,
            y: getLinePosY()
        },
        txtAlign: 'center',
        isDragging: false
    }
    line.lineWidth = 250
    gMeme.lines.push(line)
}

function getLinePosY() {
    const topLine = gMeme.lines.some((line)=>{
        return (line.pos.y === 40)
    })
    if (topLine) {
        var bottomLine = gMeme.lines.some((line)=> {
            return (line.pos.y === gMeme.canvasSize.height - gMeme.spaceBetweenLine)
        })
    }

    let posY
    if (!topLine) posY = 40
    else if (topLine && !bottomLine) {
        posY = gMeme.canvasSize.height - gMeme.spaceBetweenLine
    } else posY = gMeme.canvasSize.height / 2
    return posY
}

function getImgs() {
    return gImgs
}
function getMeme() {
    return gMeme
}
function createImgs(size) {
    for (let i = 0; i < size; i++) {
        gImgs.push(createImg(i + 1))
    }
}

function createImg(imgNum) {
    return {
        id: imgNum,
        src: `./img/${imgNum}.jpg`,
        keywords: ['happy']
    }
}

function addTxt(txt) {
    const idx = gMeme.selectedLineIdx
    gMeme.lines[idx].txt = txt
}

function updateImg(id) {
    gUserImg = null
    gMeme.selectedImgId = id
}

function updateFontSize(fontSize) {
    const idx = gMeme.selectedLineIdx
    gMeme.lines[idx].size = fontSize
}

function updateLinePosY(diff) {
    const idx = gMeme.selectedLineIdx
    gMeme.lines[idx].pos.y += diff
}
function isLineClicked(clickedPos) {
    return gMeme.lines.some(function (line) {
        const distanceX = Math.abs(line.pos.x - clickedPos.x)
        const distanceY = Math.abs(line.pos.y - clickedPos.y)
        return (distanceX <= line.lineWidth && distanceY <= 20)
    })
}

function getLineIdxByPos(clickedPos) {
    return gMeme.lines.findIndex(function (line) {
        const distanceX = Math.abs(line.pos.x - clickedPos.x)
        const distanceY = Math.abs(line.pos.y - clickedPos.y)
        return (distanceX <= line.lineWidth && distanceY <= 20)
    })
}

function updateIsDragging(isDragging) {
    const idx = gMeme.selectedLineIdx
    gMeme.lines[idx].isDragging = isDragging
}

function updateLinePos(pos) {
    const idx = gMeme.selectedLineIdx
    gMeme.lines[idx].pos.y = pos.y
    gMeme.lines[idx].pos.x = pos.x
}


function resizeCanvas() {
    let img = new Image()
    img.src = `img/${gMeme.selectedImgId}.jpg`;
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = (img.height * gElCanvas.width) / img.width
    updateCanvasSize(gElCanvas.width, gElCanvas.height)
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (TOUCH_EVS.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}

function restMeme() {
    gMeme.lines = []
}

function updateLineWidth(width) {
    const idx = gMeme.selectedLineIdx
    gMeme.lines[idx].lineWidth = width;
}