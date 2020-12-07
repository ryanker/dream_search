let bg = chrome.extension.getBackgroundPage()

let nameEl = document.querySelectorAll('[name]')
nameEl.forEach(el => {
    el.value = (localStorage[el.name] || '').trim()
})

document.getElementById('save_option').onclick = function () {
    let obj = {}
    nameEl.forEach(el => {
        obj[el.name] = el.value.trim()
    })
    bg.saveOption(obj)
    setTimeout(() => {
        location.reload()
    }, 300)
}
