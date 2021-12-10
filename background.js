'use strict'

let searchDefault = `
百度搜索|https://www.baidu.com/s?wd={0}
谷歌搜索|https://www.google.com/search?q={0}
必应搜索|https://cn.bing.com/search?q={0}
360搜索|https://www.so.com/s?q={0}
搜狗搜索|https://www.sogou.com/web?query={0}
维基百科|https://zh.wikipedia.org/w/index.php?search={0}
百度百科|https://baike.baidu.com/search/word?word={0}
Github|https://github.com/search?q={0}
CSDN|https://so.csdn.net/so/search?q={0}
知乎|https://www.zhihu.com/search?type=content&q={0}
微博|https://s.weibo.com/weibo?q={0}
微信文章|https://weixin.sogou.com/weixin?type=2&query={0}
微信公众号|https://weixin.sogou.com/weixin?type=1&query={0}
bilibili|https://search.bilibili.com/all?keyword={0}
bt|https://a8.fan55.top/s?word={0}
淘宝|https://s.taobao.com/search?q={0}
Yandex|https://yandex.com/search/?text={0}
京东|https://search.jd.com/Search?keyword={0}
百度学术|https://xueshu.baidu.com/s?wd={0}
PUBMED|https://pubmed.ncbi.nlm.nih.gov/?term={0}
duckduckgo|https://duckduckgo.com/?t={0}
`
let menuDefault = `百度搜索|https://www.baidu.com/s?wd={0}`
let widthDefault = 640

let l = localStorage
var menuList, searchList, searchWidth, searchText
init()

String.prototype.format = function () {
    let args = arguments
    return this.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined' ? args[number] : match
    })
}

function init() {
    l.menuText = l.menuText || menuDefault
    l.searchText = l.searchText || searchDefault
    l.searchWidth = l.searchWidth || widthDefault
    initVal()
}

function initVal() {
    menuList = optionFormat(l.menuText)
    searchList = optionFormat(l.searchText)
    searchWidth = l.searchWidth
    initMenu(menuList)
}

function saveOption(options) {
    l.menuText = options.menuText || menuDefault
    l.searchText = options.searchText || searchDefault
    l.selectAll = options.selectAll || false

    let w = options.searchWidth
    l.searchWidth = w ? w < 360 ? 360 : w > 760 ? 760 : w : widthDefault
    initVal()
}

function optionFormat(s) {
    let r = []
    s = s.trim()
    if (!s) return r

    let arr = s.split('\n')
    arr.forEach((v, k) => {
        v = v.trim()
        if (!v) return
        let [name, url] = v.split('|')
        name = name.trim()
        url = url.trim()
        if (name && url) r.push({key: k, title: name, url: url})
    })
    return r
}

function initMenu(menuList) {
    chrome.contextMenus.removeAll()
    setTimeout(() => {
        menuList.forEach(v => {
            addMenu(v)
        })
    }, 300)
}

function addMenu(v) {
    let create = chrome.contextMenus.create
    // create({id: "separator1", type: "separator", contexts: ['selection']})
    create({
        id: v.key + '_page',
        title: v.title + '首页',
        contexts: ['page'],
        onclick: function () {
            chrome.tabs.create({url: (new URL(v.url)).origin})
        }
    })
    create({
        id: v.key + '_selection',
        title: v.title + '“%s”',
        contexts: ['selection'],
        onclick: function (info) {
            chrome.tabs.create({url: v.url.format(decodeURIComponent(info.selectionText))})
        }
    })
}
