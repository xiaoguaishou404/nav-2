const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
  { logo: 'Q', url: 'https://www.qq.com/' },
  { logo: 'W', url: 'https://www.weixin.qq.com/' },
  { logo: 'C', url: 'https://css-tricks.com/' },
   { logo: 'T', url: 'https://www.acfun.cn/' },
  { logo: 'G', url: 'https://www.github.com/' },
   { logo: 'S', url: 'https://codesandbox.io/' }, 
   { logo: 'M', url: 'developer.mozilla.org' },
  { logo: 'F', url: '键盘F未添加' },
   { logo: 'G', url: '键盘G未添加' },
  { logo: 'Z', url: '键盘Z未添加' }, 
  { logo: 'X', url: '键盘X未添加' },
  { logo: 'C', url: '键盘C未添加' }
];
const simplifyUrl = (url) => {
  return url.replace('https://', '')
    .replace('http://', '')
    .replace('www.', '')
    .replace(/\/.*/, '')
}
const render = () => {
  $siteList.find('li:not(.last)').remove()

  hashMap.forEach((node, index) => {
    const $li = $(`<li>
        <div class="site">
            <div class="logo">
            ${node.logo}
            </div>
            <div class="link">${simplifyUrl(node.url)}</div>
            <div class='close'>
              <svg class="icon">
                <use xlink:href="#icon-cuowu"></use>
              </svg>
            </div>
        </div>
    </li >
    `).insertBefore($lastLi)

    $li.on('click', () => {
      window.open(node.url)
    })

    $li.on('click', '.close', (e) => {
      e.stopPropagation()
      hashMap.splice(index, 1)
      render()
    })
  })
}


render()
$(".addButton").on("click", () => {
  let url = window.prompt("填写网址");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  console.log(url);
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    url: url
  })
  render()

});


window.onbeforeunload = () => {
  const String = JSON.stringify(hashMap)
  localStorage.setItem('x', String)
}

$(document).on('keypress', (e) => {
  const { key } = e
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url)
    }
  }
})
