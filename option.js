let bg = chrome.extension.getBackgroundPage()

let nameEl = document.querySelectorAll('[name]')
let saveEl = document.getElementById('save_option')
let resetEl = document.getElementById('reset_option')

// 加载
nameEl.forEach(el => {
    el.value = (localStorage[el.name] || '').trim()
})

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
