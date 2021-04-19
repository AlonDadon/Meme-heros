'use strict'

var gKeywords = { 'happy': 12, 'funny puk': 1 }
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I never eat Falafel',
            size: 22,
            align: 'left',
            color: 'red',
            pos: {
                x: 105,
                y: 50
            }
        }
    ]
}
var gImgs = []
createImgs(18)

function switchLine() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx >= gMeme.lines.length) {
        gMeme.selectedLineIdx = 0
    }

}

function createLine() {
    let line = {
        txt: 'Add text',
        size: 22,
        align: 'left',
        color: 'red',
        pos: {
            x: 250,
            y: 250
        }
    }
    gMeme.lines.push(line)
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
}

function updateImg(id) {
    gMeme.selectedImgId = id
}

function updateFontSize(fontSize) {
    let idx = gMeme.selectedLineIdx
    gMeme.lines[idx].size = fontSize
}

function updateLinePos(diff) {
    let idx = gMeme.selectedLineIdx
    gMeme.lines[idx].pos.y += diff
}