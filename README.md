# web

## Q
   
1. 多语言开发；
2. 评论；
3. 搜索栏设置；
4. 主页内容宽度最大化
5. 背景gif/png
   



****
## Update time
* 20221010:build (参考主题：https://github.com/jhildenbiddle/docsify-themeable)
* 20221015:每个导航栏对应一个侧边栏；




## faq

1. git push origin main
fatal: unable to access 'https://github.com/profabx/web.git/': HTTP/2 stream 1 was not closed cleanly before end of the underlying stream
wubo@BobsMacBook-Pro web % git push origin main
fatal: unable to access 'https://github.com/profabx/web.git/': LibreSSL SSL_read: error:02FFF03C:system library:func(4095):Operation timed out, errno 60
解决方式

//取消http代理或取消https代理 

 ```
git config --global --unset http.proxy
 ```

```
git config --global --unset https.proxy
```