---
title: "Imageuploadservice"
sidebar:
  attrs: { id: tutorial }
---

# Image upload service
## picgo+gitlab
The function of Image upload service is to storage your picture or video on cloud and then you can use the link in your markdown document.Then Image upload service will export one link for your information(it would used in markdown document).The following show one method using [PicGo](https://github.com/Molunerfinn/PicGo) and gitlab to build.

1. Download [PicGo application from github](https://github.com/Molunerfinn/PicGo/releases) and install it.
2. Open PicGo and setting the software.Now we need open gitlab to get some information(obvious we have some other choice to storage our information ,for example Github ,Aliyun OSS ,Imgur,etc),

* url: gitlab url (eg:https://gitlab.com)
* group: gitlab project's group name
* project: gitlab project name
* token: gitlab's api token (Setting /Access Token/Click )

	![](https://gitlab.com/picbed/bed/uploads/f52be9d7e151da2311ca5065966fdbf9/picturebed.png)
	![](https://gitlab.com/picbed/bed/uploads/1a26b21c03c177d2241a6595ba38cd66/picgoinfor.png)

3. OK ,update picture to gitlab

* method1: right click and choice update picture with picgo
* method2:push picture to picgo
![](https://gitlab.com/picbed/bed/uploads/93c7be671e3913b6913a2c17a0e4c054/rightbotton.png
)
![](https://gitlab.com/picbed/bed/uploads/2a172fda6f4924325d05a598594e0c1e/method2.png
)
4. Click the picture you want and get the link
![](https://gitlab.com/picbed/bed/uploads/103e19a8b5ce9f1b97636497391e1c34/picgoclick.png)

## picgo+github
1. Create and log in your GitHub account.

2. Create a repo for GitHub Img.

   ![](https://raw.githubusercontent.com/bobwu0214/imageuploadservice/main/img/202210072254543.png)
   ![](https://raw.githubusercontent.com/bobwu0214/imageuploadservice/main/img/202210072254544.png)
3.  Generate a token for PicGo:

Access: https://github.com/setting/tokens

![](https://raw.githubusercontent.com/bobwu0214/imageuploadservice/main/img/202210072254542.png)

![](https://raw.githubusercontent.com/bobwu0214/imageuploadservice/main/img/202210072254545.png)
![](https://raw.githubusercontent.com/bobwu0214/imageuploadservice/main/img/202210072258995.png)
4. Configure your GitHub repository for PicGo.
![](https://raw.githubusercontent.com/bobwu0214/imageuploadservice/main/img/202210072259478.png)
[Also you can write the following to speed up the loading"https://cdn.jsdelivr.net/gh/username/repostory"](https://cdn.jsdelivr.net/gh/zimaStrawer/doubleQ_Image/picgo_peizhi.png)




## reference:

* [Picgo github](https://github.com/Molunerfinn/PicGo/releases) 
* [Picgo gitlab](https://github.com/bugwz/picgo-plugin-gitlab)
* [Picgo+github](https://github.com/Molunerfinn/PicGo/releases)
* [Cdn picgo from zju2022 doubleQ](https://nexmaker-fab.github.io/2022zjude1-doubleQ/#/Course_practice/Web/)
