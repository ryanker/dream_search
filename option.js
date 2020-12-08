let bg = chrome.extension.getBackgroundPage()

let nameEl = document.querySelectorAll('[name]')
let widthEl = document.querySelector('input[name="searchWidth"]')
let saveEl = document.getElementById('save_option')
let resetEl = document.getElementById('reset_option')

// 加载
nameEl.forEach(el => {
    el.value = (localStorage[el.name] || '').trim()
})

widthEl.onchange = function () {
    let w = this.value
    this.value = w < 360 ? 360 : w > 760 ? 760 : w
}

// 保存
saveEl.onclick = function () {
    let obj = {}
    nameEl.forEach(el => {
        obj[el.name] = el.value.trim()
    })
    bg.saveOption(obj)
    setTimeout(() => {
        location.reload()
    }, 300)
}

// 重置
resetEl.onclick = function () {
    let obj = {}
    nameEl.forEach(el => {
        obj[el.name] = ''
    })
    bg.saveOption(obj)
    setTimeout(() => {
        location.reload()
    }, 300)
}
