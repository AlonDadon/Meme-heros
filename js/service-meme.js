'use strict'

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
    fontFamily: 'Impact',
    clickDistance: 8.5,
}
var gImgs = []
createImgs(18)

function removeLine() {
    let idx = gMeme.selectedLineIdx
    gMeme.lines.splice(idx, 1)
    gMeme.selectedLineIdx = 0
}

function updateTxtAlign(txtAlign) {
    let idx = gMeme.selectedLineIdx
    gMeme.lines[idx].txtAlign = txtAlign
}

function updateFontFamily(fontFamily) {
    gMeme.fontFamily = fontFamily
}

function updateStroke(color) {
    let idx = gMeme.selectedLineIdx
    gMeme.lines[idx].strokeColor = color
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
        size: 33,
        align: 'left',
        strokeColor: 'black',
        pos: {
            x: gMeme.canvasSize.width / 2,
            y: getLinePosY()
        },
        txtAlign: 'center',
        isDragging: false
    }
    line.lineSize = line.txt.length * gMeme.clickDistance
    gMeme.lines.push(line)
}
function getLinePosY() {
    const topLine = gMeme.lines.some(function (line) {
        return (line.pos.y === 40)
    })
    if (topLine) {
        var bottomLine = gMeme.lines.some(function (line) {
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
        src: `img/${imgNum}.jpg`,
        keywords: ['happy']
    }
}

function addTxt(txt) {
    let idx = gMeme.selectedLineIdx
    gMeme.lines[idx].txt = txt
    gMeme.lines[idx].lineSize = txt.length * gMeme.clickDistance
}

function updateImg(id) {
    gUserImg = null
    gMeme.selectedImgId = id
}

function updateFontSize(fontSize) {
    let idx = gMeme.selectedLineIdx
    gMeme.lines[idx].size = fontSize
}

function updateLinePosY(diff) {
    let idx = gMeme.selectedLineIdx
    gMeme.lines[idx].pos.y += diff
}
function isLineClicked(clickedPos) {
    return gMeme.lines.some(function (line) {
        const distanceX = Math.abs(line.pos.x - clickedPos.x)
        const distanceY = Math.abs(line.pos.y - clickedPos.y)
        return (distanceX <= line.lineSize && distanceY <= 20)
    })
}

function getLineIdxByPos(clickedPos) {
    return gMeme.lines.findIndex(function (line) {
        const distanceX = Math.abs(line.pos.x - clickedPos.x)
        const distanceY = Math.abs(line.pos.y - clickedPos.y)
        return (distanceX <= line.lineSize && distanceY <= 20)
    })
}

function updateIsDragging(isDragging) {
    let idx = gMeme.selectedLineIdx
    gMeme.lines[idx].isDragging = isDragging
}

function updateLinePos(pos) {
    let idx = gMeme.selectedLineIdx
    gMeme.lines[idx].pos.y = pos.y
    gMeme.lines[idx].pos.x = pos.x
}


function resizeCanvas() {
    let img = new Image()
    img.src = `img/${gMeme.selectedImgId}.jpg`;
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    // gElCanvas.height = elContainer.offsetHeight
    gElCanvas.height = (img.height * gElCanvas.width) / img.width
    updateCanvasSize(gElCanvas.width, gElCanvas.height)
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
