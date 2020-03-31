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
