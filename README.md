# 项目名称：爱问医生用户端

> aiwen_user_h5（基于vue2.0+vue-router+vuex）

## Build Setup

``` bash
# 安装依赖 (install dependencies)

npm install cnpm -g
cnpm install

# 开启本地带有热重载的开发服务器，端口为3033，serve with hot reload at localhost:3033
npm run dev

# 打包上线版本 build for production with minification
npm run build

# 查看打包报告 build for production and view the bundle analyzer report
npm run build --report
```
# 项目说明

```
路由短连接解释
m => moment 圈子
u => user 用户
t => topic 帖子
cw => commonweal 公益活动
heal => health 健康-科普
cdc => Center for Disease Control 疾病中心

状态解释
组件中前缀【VX_】的表示此状态保存在 vuex
```
# App内嵌H5时的参数
```
?appToken=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTMwNjgzODE3OTEsInBheWxvYWQiOiJcIjEzNjkyMTUxNzc0XCIifQ.pxIUcAG_UhlcqLy6ILM3cCCpZHgxOLjdZrI5i7j55Y8&isApp=2&clientType=app&versioncode=1&source=android&appChannel=channel_name&forceIng=true
```

# app 内嵌H5的userAgent

```
Mozilla/5.0 (Linux; Android 7.1.1; OD105 Build/NMF26F; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/62.0.3202.84 Mobile Safari/537.36;app/{"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTI5OTc5NDk5ODEsInBheWxvYWQiOiJcIjEzNzI4ODQyMjU4XCIifQ.6LDnWjF8YkaG8IC0AcyGhDf1yC9QDCLGT5CIW8bftjk","appToken":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTI5OTc5NDk5ODEsInBheWxvYWQiOiJcIjEzNzI4ODQyMjU4XCIifQ.6LDnWjF8YkaG8IC0AcyGhDf1yC9QDCLGT5CIW8bftjk","isApp":"2","clientType":"app","versionCode":"1","source":"android","appChannel":"freeTest","forceIng":"true"}
```

# 项目代码规范

* 1 缩进使用空格替换 tab
* 2 缩进使用2个空格
* 3 语句结束必须使用";"结尾
* 4 字符串定义必须用双引号
* 5 路由定义为小写
```
path: '/web_spa/:spaid'
```
* 6 代码中组件或变量定义了，但是未使用需要删除
* 7 页面或组件内要写明组件的用处和使用方法
* 8 上线代码中不能有 console.log()之类的调试信息

# 上线日志
* 2019 1.7 *  医生诊室的样式及逻辑优化 新浪健康首页 更新运营信息
* 2018 09 27 *  微博轻应用iframe嵌套无法获取window.top 导致布局错乱
* 2018 09 26 *  医媒视频，视频集功能迭代，加粉约定修改
* 2018 08 25 *  v1.3.1医生诊室图文咨询按钮 点击之后链接增加 ?bizType=NOR 参数
* 2018 08 01 *  v1.3公益活动医生诊室 页面分享微信回调增加名额 webpack 代码压缩配置更新
* 2018 07 25 *  v1.3导航钩子 next() 重定向导航需增加replace属性
* 2018 07 24 *  v1.3上线
* 2018 06 12 *  v1.2上线
* 2018 05 14 *  解决页面ios下被iframe嵌套导致的底部固定导航显示不全问题
* 2018-04-27 * 为优化查询速度，删除【推荐医生】页面 文章数和服务数的显示
* 2018-04-3 * 患者自述
