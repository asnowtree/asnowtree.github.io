---
title: 'github网站访问问题'
date: 2022-11-13 23:37:00 +0800
author: narule
categories: [issue]
---

主要解决在git拉取GitHub.com上面的代码的时候，出现 time out 连接超时，不能成功 pull push的情况

{: .note}
DNS污染及解决


通过cmd 输入 `ping github.com` 甚至都没有ip显示，网络有文章说大部分情况是dns污染


{: .note}
解决方案


### 1 找到域名正确的IP 自定义域名ip映射关系 

[域名网站监测工具](https://mping.chinaz.com/github.com)

通过mping.chinaz.com 可以获取访问github.com域名成功的ip，从而获取域名正确的IP

DNS是在我们访问域名的时候，经过路由器DNS解析服务器获取域名对应的IP，dns被污染或说明域名对应的ip是错的；
系统设计之初可能也考虑到这个问题，我们可以直接告诉电脑github.com正确的IP，直接访问不经过不可靠的DNS解析服务器。

### 2 配置映射
window 配置域名IP映射

修改C盘 Windows\System32\drivers\etc\ 文件夹下面的host文件，添加 ip 和域名映射关系

```
140.82.114.4 github.com

```

修改完保存之后， 运行cmd，输入命令
`ipconfig /flushdns`

如果试了之后还是不行，可是重启电脑在尝试
