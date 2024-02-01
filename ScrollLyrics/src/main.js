const lrc = `[00:00.00] Postcard (feat. Gordi)
[00:07.00] Artist: Troye Sivan
[00:12.50] I sent you a postcard from Tokyo baby
[00:17.73] You never picked it up
[00:22.61] I even wrote it in Japanese, baby
[00:27.61] You didn't give a fuck
[00:31.28] 'Cause I don't sleep like your body's on me
[00:33.90] I won't feel right until we can be
[00:36.46] Underneath everything that's between
[00:39.25] Yeah
[00:41.55] I'm undone about to burst at my seams
[00:44.15] 'Cause I am picturing you beside me
[00:46.68] So let me be everything that you need
[00:49.52] Yeah
[00:52.22] But you're still picking me up
[00:55.93] Don't put me back down like it's nothing to ya
[01:02.18] Yeah, you're still picking me up
[01:05.93] Don't you put me back down
[01:08.20] Don't you put me back down
[01:10.73] Like it's nothing to ya
[01:15.34] Like it's nothing to ya
[01:19.45] 
[01:22.28] I remember that night that you first called me crazy
[01:28.27] Only you picked it up
[01:32.55] Kissed me and said, "I love you, baby"
[01:37.39] You didn't give a fuck
[01:41.33] Now I don't sleep unless your body's on me
[01:43.97] I won't feel right until we can be
[01:46.46] Underneath everything that's between
[01:49.15] Yeah
[01:51.83] I'm undone about to burst at my seams
[01:53.95] 'Cause I am picturing you beside me
[01:56.64] So let me be everything that you need
[01:59.40] Yeah
[02:02.16] But you're still picking me up
[02:05.97] Don't put me back down like it's nothing to ya
[02:11.82] Yeah, you're still picking me up
[02:15.88] Don't you put me back down
[02:18.16] Don't you put me back down
[02:20.41] Like it's nothing to ya
[02:25.33] Like it's nothing to ya
[02:29.24] 
[02:31.61] Take your time
[02:32.97] Pull me in
[02:34.09] Push me out
[02:36.29] Simplify all the whispers of doubt
[02:40.89] 'Cause I know what you're thinking about
[02:49.22] But you're still picking me up
[02:53.13] Don't put me back down like it's nothing to ya
[02:59.18] Yeah, you're still picking me up
[03:02.65] Don't you put me back down
[03:05.14] Don't you put me back down
[03:07.40] Like it's nothing to ya
[03:12.19] Like it's nothing to ya
[03:17.02] Like it's nothing to ya
[03:22.08] Like it's nothing to ya
[03:27.15] Like it's nothing to ya
[03:30.50]`

let lines = []
let audio = document.querySelector('audio')
let container = document.querySelector('.lyrics-container')
let ul = document.querySelector('.lyrics-main')
let containerHeight = container.clientHeight

/**
 * 解析歌词  
 * 得到的结果是一个数组，每个元素是一个对象，包含两个属性：time 和 text
 */
function parseLrc() {
    const lrcArr = lrc.split('\n')
    for (let i = 0; i < lrcArr.length; i++) {
        const parts = lrcArr[i].split('] ')
        lines.push({
            time: parseTime(parts[0]),
            text: parts[1]
        })
    }
}

/**
 * 解析时间，返回歌词所在的开始时间，单位为秒
 * 时间为浮点数，最多保留两位小数
 * @param {string} str 
 * @returns 
 */
function parseTime(str) {
    const timeStr = str.slice(1);
    const [min, sec] = timeStr.split(':');
    return parseFloat((min * 60 + parseFloat(sec)).toFixed(2));
}

function createLrcDom() {
    let frag = document.createDocumentFragment()
    lines.forEach((line) => {
        let li = document.createElement('li')
        li.textContent = line.text
        frag.appendChild(li)
    })
    ul.appendChild(frag)    
}
/**
 * 找到当前播放时间对应的歌词的索引
 */
function findIndex() {
    for (let i = 0; i < lines.length; i++) {
        if (audio.currentTime < lines[i].time) {
            return i - 1
        }
    }
    return lines.length - 1
}

function updateLrc() {
    updateHighlight()
    updateScroll()
}

function updateHighlight() {
    const index = findIndex()
    // 去除之前的高亮
    const prev = document.querySelector('li.active')
    if (prev) {
        prev.classList.remove('active')
    }
    // 添加新的高亮
    const current = ul.children[index]
    if (current) {
        current.classList.add('active')
    }
}

function updateScroll() {
    const current = ul.children[findIndex()]
    let offset = containerHeight / 2 - current.offsetTop;
    ul.setAttribute('style', `transform: translateY(${offset}px)`)
}


// 解析歌词
parseLrc();
createLrcDom();
audio.addEventListener('timeupdate', updateLrc)


