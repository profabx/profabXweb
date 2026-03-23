---
title: "Github And Docsify"
sidebar:
  attrs: { id: tutorial }
---



we would use github to build and deployment [github page](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages) from GitHub repository.In the meantime GitHub would  give a github domain.
For the style,we would introduce some method,
Method 1:GitHub+docsify；
Method 2:github+html；

![](https://gitlab.com/picbed/bed/uploads/6647643b3f2ea73c1c2613de905549cc/github.png)

## 1. Prepare
We would use the following tool to build our own webpage
* [Git](https://git-scm.com/downloads) is used to control our version in gitlab，mac don't need to install,it use to setting git and gitlab;
* [Github](https://github.com/) is used as a servicer for our webpage;
* [Github desktop](https://desktop.github.com/) easy for us to transport coding from local to github
* [nodejs](https://nodejs.org/en/)use to build environment;
* [VScode](https://code.visualstudio.com/) for write document;
* [Markdown  language](https://www.nexmaker.com/doc/1projectmanage/markdown.html) to write our document;
* [Image upload service](https://www.nexmaker.com/doc/1projectmanage/imageuploadservice.html) ，we use [Picgo](https://github.com/Molunerfinn/PicGo/releases/tag/v2.2.2) to storage our image on cloud( for example in gitlab) and used in markdwon document;


## 2.Web page setting
* build a repository with public
* setting page for empty
* get weblink

![](https://gitlab.com/picbed/bed/uploads/0fdf8460bab52411783f2cc68cdb12e2/WX20220929-104434.png)
![](https://gitlab.com/picbed/bed/uploads/8eabe7b8b3ad017663ddf5de5a60d52d/WX20220929-104641.png)
![](https://gitlab.com/picbed/bed/uploads/689791fd5d7b3423c0ecd5e305aba1dd/WX20220929-104857_2x.png)
![](https://gitlab.com/picbed/bed/uploads/338a1c0cd46a95c22266f002d78e37c8/WX20220929-105013.png)

## 3.Local setting
github desktop signin
![](https://gitlab.com/picbed/bed/uploads/5b33e9c1ad984acb1cd5615497c85dfc/WX20220929-123627_2x.png)
if success sign in in github desktop you have two method to clone to local
method 1:in github ,direct click open with githubdesktop
![](https://raw.githubusercontent.com/bobwu0214/imageuploadservice/main/img/WX20231019-072927@2x.png)
method2:in github desktop ,you can try to find your repository
![](https://raw.githubusercontent.com/bobwu0214/imageuploadservice/main/img/WX20231019-073129@2x.png)
method3: use terminal method to clone

``` 
  $ douboydeMacBook-Pro:gitlab douboy$ git clone git@gitlab.fabcloud.org:academany/fabacademy/2018/labs/fablaboshanghai/students/bob-wu.git
  Cloning into 'bob-wu'...
  remote: Counting objects: 670, done.
  remote: Compressing objects: 100% (48/48), done.
  remote: Total 670 (delta 64), reused 91 (delta 55)
  Receiving objects: 100% (670/670), 6.55 MiB | 1.11 MiB/s, done.
  Resolving deltas: 100% (378/378), done.
  $ douboydeMacBook-Pro:bob-wu douboy$ git pull origin master
  From gitlab.fabcloud.org:academany/fabacademy/2018/labs/fablaboshanghai/students/bob-wu
  * branch            master     -> FETCH_HEAD
  Already up-to-date. 
```

## 3.1 html/css method
the following code just for example
```html
   <!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>test1page</title>
</head>
<body>
	<nav>
	<a href="https://www.nexmaker.com">nexmaker</a>
	<a href="https://fabacademy.org">fabacademy</a>
	<a href="bobwu0214@gmail.com">conact</a>
	</nav>
	<h1>hello world head1	</h1>
	<h2>hello world head2	</h2>
	<h3>hello world head1	</h3>
	<h4 align="center">hello world head2	</h4>
	<h4 style="background-color:red">This is a heading</h4>
	<b>This text is bold</b>
	<strong>This text is strong</strong>
	<p>paragraph1</p>
	<p>paragraph2</p>
	<hr />
	<p>paragraph3</p>
	<a href="www.nexmaker.com">This is a link</a>
	<img src="image/nexmakerlogo.jpg" width="160" height="160" />
	<hr/>
	<li><a href="http://ng.cba.mit.edu">A</a></li> 
 	<li><a href="https://www.linkedin.com/in/saveriosilli">B</a></li> 
    <li><a href="https://www.linkedin.com/in/ted-hung-abbb806/">C</a></li> 
    <li><a href="https://www.linkedin.com/in/thunder-zhang-3b4090b">D</a></li> 
    <li><a href="xujunnature@gmail.com">E</a></li> 
<!--mark,not show anything in web。-->
</body>
</html>
```
## 3.2 Docsify method
#### 3.2.1 Install docsify
```
 npm i docsify-cli -g
 ```
 #### 3.2.2 make sure the position and then initialize environment
 ```
 docsify init ./docs
 ```
 #### 3.2.3 preview 
 ```
 docsify serve docs
 ```
 #### 3.2.4 browser visit  http://localhost:3000

#### 3.2.4  setting index.html
 
 ```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <meta name="description" content="Description">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0">
  <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/docsify@4/lib/themes/vue.css">
</head>
<body>
  <div id="app"></div>
  <script>
    window.$docsify = {
      name: 'zju-fab',
      repo: '',
      loadSidebar: true,  //prepare for sidebar
      loadNavbar: true,   //prepare for navbar

    }
  </script>
  <!-- Docsify v4 -->
  <script src="//cdn.jsdelivr.net/npm/docsify@4"></script>
  
</body>
</html>
 ```
 #### 3.2.5 Add navbar and sidebar
for sidebar.md, more detail in [[docsify  sidebar] (https://github.com/kn0sky/docsify-autosidebar)]
 
 ```
<!-- 侧边栏 docs/_sidebar.md -->
- Team introduce
- Daily homework
  - [1. PM]()
    - [how to build web](class/1pm/1pm-web.md)
    - introduce team
    - introduce finial project
  - [2. arduino basic]()
  - [3. CAD]()
  - [4. 3D printing]()
- Final project
  - topic
  - innovation
  - market
  - how to design 
  - how to make
  - SDGs
  ```

#### 3.2.6 write document


#### 3.2.7 Save all document

## 4. Upload
Use github desktop to upload new information
change the branch's fold from root to new fold

![](https://gitlab.com/picbed/bed/uploads/3108530ec4715eb40cb5f7891d17a6d7/WX20220929-125544_2x.png)

## 5.FAQ
#### 5.1 cannot be loaded because running scripts is disabled on this system
An error occurred during initialization docsify,can't load  docsify.ps1
The problem run in windows (If you are a Mac user, please skip this step)
```docsify init ./docs```

![](https://raw.githubusercontent.com/bobwu0214/imageuploadservice/main/img/202210122216237.png)
The reason is running mode is strict ,we  can change to Unrestricted or Bypass，use the following code
```Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted -Force```
 or
```Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Bypass -Force```
 
 or
```Get-ExecutionPolicy -List```

 ```Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser```

Then you can initialize it successfully.

reference link1: [YSD team](https://nexmaker-fab.github.io/2023zjude-YSD/#/_webbuild)
reference official document:[microsoft powershell](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.core/about/about_execution_policies?view=powershell-7.3)



#### 5.2 The term 'npm' is not recognized as the name of a cmdlet, function, script file, or 
operable program.

```npm i docsify-cli -g``` 

and then system would  warn

```
npm : The term 'npm' is not recognized as the name of a cmdlet, function, script file, or 
operable program. Check the spelling of the name, or if a path was included, verify that 
the path is correct and try again.
At line:1 char:2
+  npm i docsify-cli -g
+  ~~~
    + CategoryInfo          : ObjectNotFound: (npm:String) [], CommandNotFoundException     
    + FullyQualifiedErrorId : CommandNotFoundException
```  
![](https://raw.githubusercontent.com/bobwu0214/imageuploadservice/main/img/202210122228783.png)










## 6.Reference
* [docsify](https://docsify.js.org/#/?id=docsify)
* [docsify csdn](https://blog.csdn.net/Mark_md/article/details/121457115)
* [docsify  sidebar](https://github.com/kn0sky/docsify-autosidebar)
* [Github pages](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages)
* [docsify from 2023 The-Dynamic-Seven](https://nexmaker-fab.github.io/2023zjudem-The-Dynamic-Seven/#/PM/Howtobuild/githubpage)

