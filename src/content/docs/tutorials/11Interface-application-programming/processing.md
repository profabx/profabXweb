---
title: "Processing"
sidebar:
  attrs: { id: tutorial }
---



## [Processing](https://processing.org/)
[Processing is a flexible software sketchbook and a language for learning how to code within the context of the visual arts. Since 2001, Processing has promoted software literacy within the visual arts and visual literacy within technology. There are tens of thousands of students, artists, designers, researchers, and hobbyists who use Processing for learning and prototyping.](https://processing.org/)

## 1. Software download
[Dowload according to your PC's OS](https://processing.org/download/)

## [2. Languge](https://processing.org/examples/)

#### [2.1. The structure of language](https://processing.org/examples/setupdraw.html)
```java
/**
 * Setup and Draw. 
 * The code in setup() is run once when the program starts.
 * The code inside the draw() function runs continuously from top to bottom until the program is stopped. The
 * Reference from https://processing.org/examples/setupdraw.html
 
 **/

int y = 180;
void setup() {
  size(640, 360);  // Size must be the first statement
  stroke(255);  // Set line drawing color to white
}

void draw() { 
  background(0);  // Clear the screen with a black background
  line(0, y, width, y); 
  y = y - 1; 
  if (y < 0) { 
    y = height;
  }
} 

```
#### [2.2. Shape](https://processing.org/examples/shapeprimitives.html)
```java
/**
Reference from https://processing.org/examples/shapeprimitives.html

 **/
void setup(){
size(640, 360);
background(0);
noStroke();
}

void draw(){

fill(204);
triangle(18, 18, 18, 360, 81, 360);           //design triangle(3 points coordinate)

fill(102);
rect(81, 81, 63, 63);                          //design rectangle    left top coordinate,width,height,also we have aother method to express rectange

fill(204);
quad(189, 18, 216, 18, 216, 360, 144, 360);    //design quadrangle  4 points coordinate

fill(255);
ellipse(252, 144, 72, 72);                      //design ellipse  x-coordinate of the ellipse,y-coordinate of the ellipse,width of the ellipse by default,height of the ellipse by default

fill(204);
triangle(288, 18, 351, 360, 288, 360);           

fill(255);
arc(479, 300, 280, 280, PI, TWO_PI);    //arc(center x,centery,x diameter,y diameter,start angle,end angle)HALF_PI is π/2,QUARTER_PI is π/4,TWO_PI  is 2π
}
```

#### [2.3. The define of shape](https://processing.org/tutorials/color)

```java
void setup() {
size(200,200);

}

void draw() 
{
  background(255,255,255); //Setting the background to white
  fill(237,28,36); //Setting the interior of a shape (fill)
  stroke(0,0,0); // Setting the outline (stroke) to black
  strokeWeight(5); //the define of bold
  point(23,34); //just the color of fill
  ellipse(40,50,20,40);  // center x,center y, widtd,heigh
  rect(60,60,30,30);   //x and y is the coordinate of the rectangle. w and h is rectangle's width and height.
}
```


#### [2.4.Input: Mouse](https://processing.org/examples/mousepress.html)

```java
/**
 * Mouse Press. 
 * 
 * Move the mouse to position the shape. 
 * Press the mouse button to invert the color. 
 */

void setup() {
  size(640, 360);
  noSmooth();
  fill(126);
  background(255);
}

void draw() {
  if (mousePressed) {
    stroke(255);
  } else {
    stroke(0);
  }
  line(mouseX-66, mouseY, mouseX+66, mouseY);
  line(mouseX, mouseY-66, mouseX, mouseY+66); 
}
```

#### [2.5. GUI:button](https://processing.org/examples/button.html)

```java
/**
 * Button. 
 * 
 * Click on one of the colored shapes in the 
 * center of the image to change the color of 
 * the background. 
 */
 
int rectX, rectY;      // Position of square button
int circleX, circleY;  // Position of circle button
int rectSize = 90;     // Diameter of rect
int circleSize = 93;   // Diameter of circle
color rectColor, circleColor, baseColor;
color rectHighlight, circleHighlight;
color currentColor;
boolean rectOver = false;
boolean circleOver = false;

void setup() {
  size(640, 360);
  rectColor = color(0);
  rectHighlight = color(51);
  circleColor = color(255);
  circleHighlight = color(204);
  baseColor = color(102);
  currentColor = baseColor;
  circleX = width/2+circleSize/2+10;
  circleY = height/2;
  rectX = width/2-rectSize-10;
  rectY = height/2-rectSize/2;
  ellipseMode(CENTER);
}

void draw() {
  update(mouseX, mouseY);
  background(currentColor);
  
  if (rectOver) {
    fill(rectHighlight);
  } else {
    fill(rectColor);
  }
  stroke(255);
  rect(rectX, rectY, rectSize, rectSize);
  
  if (circleOver) {
    fill(circleHighlight);
  } else {
    fill(circleColor);
  }
  stroke(0);
  ellipse(circleX, circleY, circleSize, circleSize);
}

void update(int x, int y) {
  if ( overCircle(circleX, circleY, circleSize) ) {
    circleOver = true;
    rectOver = false;
  } else if ( overRect(rectX, rectY, rectSize, rectSize) ) {
    rectOver = true;
    circleOver = false;
  } else {
    circleOver = rectOver = false;
  }
}

void mousePressed() {
  if (circleOver) {
    currentColor = circleColor;
  }
  if (rectOver) {
    currentColor = rectColor;
  }
}

boolean overRect(int x, int y, int width, int height)  {
  if (mouseX >= x && mouseX <= x+width && 
      mouseY >= y && mouseY <= y+height) {
    return true;
  } else {
    return false;
  }
}

boolean overCircle(int x, int y, int diameter) {
  float disX = x - mouseX;
  float disY = y - mouseY;
  if (sqrt(sq(disX) + sq(disY)) < diameter/2 ) {
    return true;
  } else {
    return false;
  }
}
```


```java
/**
 * Arm. 
 * 
 * The angle of each segment is controlled with the mouseX and
 * mouseY position. The transformations applied to the first segment
 * are also applied to the second segment because they are inside
 * the same pushMatrix() and popMatrix() group.
*/

float x, y;
float angle1 = 0.0;
float angle2 = 0.0;
float segLength = 100;

void setup() {
  size(640, 360);
  strokeWeight(30);
  stroke(255, 160);//grey data and transparent data;
  
  x = width * 0.3;
  y = height * 0.5;
}

void draw() {
  background(0);
  
  angle1 = (mouseX/float(width) - 0.5) * -PI;
  angle2 = (mouseY/float(height) - 0.5) * PI;
  
  pushMatrix();
  segment(x, y, angle1); 
  segment(segLength, 0, angle2);
  popMatrix();
}

void segment(float x, float y, float a) {
  translate(x, y);
  rotate(a);
  line(0, 0, segLength, 0);
}

```


<iframe src="https://openprocessing.org/sketch/102329/embed/" width="400" height="400"></iframe>


## 3. Example


``` java
int fireworkCount = 0;  // 烟花计数器
ArrayList<Firework> fireworks = new ArrayList<Firework>();  // 存储烟花对象

// 游戏状态变量
boolean gameStarted = false;
boolean gameEnded = false;
int score = 0;  // 分数
float timer = 60.0;  // 计时器（60秒）
ArrayList<Fruit> fruits = new ArrayList<Fruit>();  // 存储掉落的水果
float giftBoxX = width / 2;  // 礼物盒位置
int giftBoxWidth = 100;  // 礼物盒宽度

// 水果生成的频率参数
float fruitGenerationInterval = 0.05;  // 每帧生成水果的概率（0到1之间，值越大生成频率越高）

void setup() {
  size(1000, 800);
  textAlign(CENTER, CENTER);
  fill(255, 0, 0);
  textSize(30);
}

void draw() {
  background(0);

  if (!gameStarted) {
    drawStartScreen();  // 显示开始界面
    return;
  }

  if (gameEnded) {
    drawGameOverScreen();  // 显示游戏结束界面
    return;
  }

  // 更新计时器
  timer -= 0.016;  // 每帧减少大约1/60秒
  if (timer <= 0) {
    gameEnded = true;  // 时间到达后结束游戏
    return;
  }

  // 显示计分板和计时器
  drawScoreBoard();
  drawTimer();

  // 生成水果
  if (random(1) < fruitGenerationInterval) {
    fruits.add(new Fruit(random(width), 0));  // 在顶部随机生成水果
  }



  // 绘制掉落的水果
  for (int i = fruits.size() - 1; i >= 0; i--) {
    Fruit fruit = fruits.get(i);
    fruit.update();  // 更新水果的位置
    fruit.display();  // 显示水果

    // 检查水果是否被接住
    if (fruit.isCaught(giftBoxX, height - 50, giftBoxWidth)) {
      score++;  // 加分
      fruits.remove(i);  // 从水果列表中移除已被接住的水果
    }

    // 检查水果是否掉出屏幕
    if (fruit.y > height) {
      fruits.remove(i);  // 从列表中移除掉落出屏幕的水果
    }
  }

  // 控制礼物盒的左右移动
  if (keyPressed) {
    if (keyCode == LEFT) {
      giftBoxX -= 10;  // 向左移动
    } else if (keyCode == RIGHT) {
      giftBoxX += 10;  // 向右移动
    }
  }

  // 绘制礼物盒
  drawGiftBox(giftBoxX, height - 50);

  // 绘制烟花
  for (Firework fw : fireworks) {
    fw.update();
    fw.display();
  }

  // 移除已经完成的烟花
  fireworks.removeIf(fw -> fw.isFinished());
}

// 显示开始界面
void drawStartScreen() {
  fill(255);
  textSize(60);
  text("Click to Start Game", width / 2, height / 2);
  fill(255);
  textSize(30);
  text("Use ← or → on the keyboard to move the box to catch the ball", width / 2, height / 2+200);
}

void mousePressed() {
  if (!gameStarted && !gameEnded) {
    gameStarted = true;
    timer = 60.0;  // 重新开始计时
    score = 0;  // 重置分数
    fruits.clear();  // 清空已掉落的水果
  }

  // 鼠标点击时创建新的烟花
  if (gameStarted) {
    Firework newFirework = new Firework(mouseX, mouseY);
    fireworks.add(newFirework);
  }
}

// 显示计分板
void drawScoreBoard() {
  fill(255);
  textSize(30);
  text("Score: " + score, width - 100, 30);  // 在右上角显示分数
  if (score >= 10) {
      fill(255, 0, 0);
      textSize(60);
      text("Merry Christmas!", width / 2, 100);
      // 绘制圣诞树
      drawChristmasTree(width / 2, 300);
      fill(255, 255, 255);
      textSize(30);
      text("Click to set off fireworks", width / 2, height / 2+200);
    }
}

// 显示计时器
void drawTimer() {
  fill(255);
  textSize(30);
  text("Time: " + int(timer), 100, 30);  // 在左上角显示剩余时间
}

// 绘制圣诞树（仅为示例，可以根据需要调整）
void drawChristmasTree(float x, float y) {
  fill(34, 139, 34);
  triangle(x - 100, y + 150, x, y - 50, x + 100, y + 150);
  triangle(x - 90, y + 100, x, y - 100, x + 90, y + 100);
  triangle(x - 80, y + 50, x, y - 150, x + 80, y + 50);
  fill(139, 69, 19);
  rect(x - 25, y + 150, 50, 80);
}

// 绘制礼物盒
void drawGiftBox(float x, float y) {
  fill(255, 0, 0);
  rect(x - giftBoxWidth / 2, y - 20, giftBoxWidth, 40);
}

// 游戏结束界面
void drawGameOverScreen() {
  fill(255);
  textSize(40);
  text("Game Over", width / 2, height / 2 - 50);
  textSize(20);
  text("Final Score: " + score, width / 2, height / 2 + 50);
}

// 水果类
class Fruit {
  float x, y;
  int size = 30;
  color fruitColor;

  Fruit(float x, float y) {
    this.x = x;
    this.y = y;
    fruitColor = color(random(255), random(255), random(255));  // 随机颜色
  }

  void update() {
    y += 5;  // 水果下落速度
  }

  void display() {
    fill(fruitColor);
    noStroke();
    ellipse(x, y, size, size);  // 绘制水果
  }

  // 判断水果是否被接住
  boolean isCaught(float giftBoxX, float giftBoxY, float giftBoxWidth) {
    return (x > giftBoxX - giftBoxWidth / 2 && x < giftBoxX + giftBoxWidth / 2 && y > giftBoxY - size / 2 && y < giftBoxY + size / 2);
  }
}

// 烟花类
class Firework {
  float x, y;
  ArrayList<Particle> particles;  // 烟花的粒子
  boolean finished = false;  // 是否完成
  
  Firework(float x, float y) {
    this.x = x;
    this.y = y;
    particles = new ArrayList<Particle>();
    
    // 创建烟花的粒子
    for (int i = 0; i < 100; i++) {
      float angle = random(TWO_PI);
      float speed = random(1, 5);
      float vx = cos(angle) * speed;
      float vy = sin(angle) * speed;
      particles.add(new Particle(x, y, vx, vy));
    }
  }
  
  void update() {
    for (int i = particles.size() - 1; i >= 0; i--) {
      Particle p = particles.get(i);
      p.update();
      if (p.isFinished()) {
        particles.remove(i);
      }
    }
    if (particles.isEmpty()) {
      finished = true;
    }
  }
  
  void display() {
    for (Particle p : particles) {
      p.display();
    }
  }
  
  boolean isFinished() {
    return finished;
  }
}

// 烟花粒子类
class Particle {
  float x, y;
  float vx, vy;
  float lifespan;
  
  Particle(float x, float y, float vx, float vy) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.lifespan = 255;
  }
  
  void update() {
    x += vx;
    y += vy;
    lifespan -= 2;
  }
  
  void display() {
    noStroke();
    fill(255,165,0, lifespan);
    ellipse(x, y, 5, 5);
  }
  
  boolean isFinished() {
    return lifespan <= 0;
  }
}

```


## 4. Reference
* [Official website](http://www.processing.org)
* [English tutorial](https://www.youtube.com/channel/UCvjgXvBlbQiydffZU7m1_aw)
* [Chinese tutorial](https://space.bilibili.com/9004724/#/channel/detail?cid=39462)
* [Basic information](https://www.iqiyi.com/w_19rs7xqamt.html)
* [Open source case](http://www.openprocessing.org)
* [爱上Processing](http://product.dangdang.com/25097342.html)
* [Learning Processing](https://www.amazon.com/gp/product/0123944430/ref=as_li_ss_tl?ref_=nav_ya_signin&linkCode=sl1&tag=processing09-20&linkId=fb0eeedd8fb1016a790e83d538a1c030)
* [Nature of code](http://product.dangdang.com/1088027649.html)
* [Processing, second edition: A Programming Handbook for Visual Designers and Artists](https://www.amazon.com/Processing-Programming-Handbook-Designers-Artists/dp/026202828X/ref=pd_sbs_14_3/138-9470288-0889131?_encoding=UTF8&pd_rd_i=026202828X&pd_rd_r=8f1bcb45-4a4d-4af7-bf79-6402171eeddf&pd_rd_w=uu2rD&pd_rd_wg=IrIOR&pf_rd_p=d2a3ee7d-5d69-4331-b32f-a3ce40b5e0d3&pf_rd_r=AHJNDP88XYMEQZQ2834M&psc=1&refRID=AHJNDP88XYMEQZQ2834M)