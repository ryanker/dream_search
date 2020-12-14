let bg = chrome.extension.getBackgroundPage()
let searchList = bg.searchList

// 生成按钮
let s = ''
searchList && searchList.forEach(v => {
    s += `<div class="dmx_button" data-url="${v.url}">${v.title}</div>`
})
$('but_box').innerHTML = s

// 绑定事件
let inpEl = $('search_input')
let rmEl = $('search_remove')
let butEl = $('search_but')
inpEl.value = bg.searchText || ''
inpEl.focus()
rmEl.style.display = bg.searchText ? 'block' : 'none'
document.querySelector('.search_main').style.width = (bg.searchWidth || 360) + 'px'
butEl.onclick = function () {
    $('but_box').querySelector('.dmx_button')?.click()
}
rmEl.onclick = function () {
    inpEl.value = ''
    bg.searchText = ''
    rmEl.style.display = 'none'
}
inpEl.onkeyup = function (e) {
    e.key === 'Enter' && butEl.click()
    rmEl.style.display = inpEl.value ? 'block' : 'none'
}
inpEl.onchange = function () {
    let text = this.value.trim()
    bg.searchText = text
    rmEl.style.display = text ? 'block' : 'none'
}
A('.dmx_button').forEach(el => {
    el.addEventListener('click', function () {
        let text = inpEl.value.trim()
        let url = el.dataset.url
        if (text) chrome.tabs.create({url: url.replace('{0}', decodeURIComponent(text))})
    })
})

function $(id) {
    return document.getElementById(id)
}

function A(s) {
    return document.querySelectorAll(s)
}
