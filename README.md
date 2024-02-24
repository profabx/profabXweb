# web


1. 工艺墙交互表格
2. 翻译是否有自动化工具
3. SEO优化
4. 流畅性优化
5. 图片存储位置
6. CSS:首页5个方框内容链接，需要优化对应的布局形式，同时蓝色需要和logo的克莱因蓝颜色同步
7. 英文版是否有中英文翻译工具（文字、图片）
8. 网址去除#
9. 预留评论、搜索（profabx和google/bing/baidu）
10. 主页内容宽度最大化
   



****
## Update time
* 20221010:build (参考主题：https://github.com/jhildenbiddle/docsify-themeable)
* 20221015:每个导航栏对应一个侧边栏；
* 20231004:相关类目完成




## faq

1. git push origin main
fatal: unable to access 'https://github.com/profabx/web.git/': HTTP/2 stream 1 was not closed cleanly before end of the underlying stream
wubo@BobsMacBook-Pro web % git push origin main
fatal: unable to access 'https://github.com/profabx/web.git/': LibreSSL SSL_read: error:02FFF03C:system library:func(4095):Operation timed out, errno 60

//取消http代理或取消https代理 

 ```
git config --global --unset http.proxy
 ```

```
git config --global --unset https.proxy
```
