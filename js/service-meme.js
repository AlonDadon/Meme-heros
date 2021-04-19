'use strict'

var gKeywords = { 'happy': 12, 'funny puk': 1 }
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I never eat Falafel',
            size: 20,
            align: 'left',
            color: 'red'
        }
    ]
}
var gImgs = []
createImgs(18)

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
    gMeme.lines.txt = txt
}

function updateImg(id) {
    gMeme.selectedImgId = id
}
