'use strict'

let searchDefault = `
百度搜索|https://www.baidu.com/s?wd={0}
谷歌搜索|https://www.google.com/search?q={0}
必应搜索|https://cn.bing.com/search?q={0}
360搜索|https://www.baidu.com/s?wd={0}
搜狗搜索|https://www.sogou.com/web?query={0}
维基百科|https://zh.wikipedia.org/w/index.php?search={0}
百度百科|https://baike.baidu.com/search/word?word={0}`

let menuDefault = `百度搜索|https://www.baidu.com/s?wd={0}`

let isChrome = typeof browser === "undefined" || Object.getPrototypeOf(browser) !== Object.prototype
var searchList, searchText, menuList
init()

String.prototype.format = function () {
    let args = arguments
    return this.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined' ? args[number] : match
    })
}

function init() {
    searchList = optionFormat(searchDefault)
    menuList = optionFormat(menuDefault)
    initMenu(menuList)
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
            open((new URL(v.url)).origin)
        }
    })
    create({
        id: v.key + '_selection',
        title: v.title + '“%s”',
        contexts: ['selection'],
        onclick: function (info) {
            open(v.url.format(decodeURIComponent(info.selectionText)))
        }
    })
}

function syncGet(options) {
    return apiToPromise(chrome.storage.sync.get, options)
}

function syncSet(options) {
    return apiToPromise(chrome.storage.sync.set, options)
}

function apiToPromise(api, options) {
    return new Promise((resolve, reject) => {
        if (isChrome) {
            api(options, function (r) {
                let err = chrome.runtime.lastError
                if (err) {
                    reject(err)
                } else {
                    resolve(r)
                }
            })
        } else {
            api(options).then(r => {
                resolve(r)
            }).catch(err => {
                reject(err)
            })
        }
    })
}
