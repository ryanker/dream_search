let bg = chrome.extension.getBackgroundPage()
let searchList = bg.searchList

// 生成按钮
let s = ''
searchList && searchList.forEach(v => {
    s += `<div class="dmx_button" data-url="${v.url}">${v.title}</div>`
})
$('but_box').innerHTML = s

// 绑定事件
A('.dmx_button').forEach(el => {
    el.addEventListener('click', function () {
        let text = $('search_input').value.trim()
        text && open(el.dataset.url.replace('{0}', decodeURIComponent(text)))
    })
})

function $(id) {
    return document.getElementById(id)
}

function A(s) {
    return document.querySelectorAll(s)
}
