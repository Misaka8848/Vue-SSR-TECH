笔记使用typora软件编写，并非原生markdown语法。
## 导学课
[课程地址](https://www.imooc.com/learn/935)
### 前端的价值

1. 搭建前端工程：数据缓存、es6和less（可以加快开发效率）。

2. 网络优化，使用webpack：

   - 减少http请求
   - 压缩静态资源文件
   - 使用浏览器强缓存使浏览器的流量变更小、加载速度更快

   重点难点不是业务开发、性能要求并不是很高，不会做在线ps一样的应用

   最重要的是前端工程化的问题。

3. api定制。

4. node.js层:作为中间件或者后端，webpack等工具的环境也是node.js。

### vue-cli

vue-cli是通过webpack来实现的一个通用化的模板，但是业务开发过程中需要对这个模板进行改造，所以需要知道其中的一些原理，结构对应的功能，以及如何构造的。

 

### 业务开发和技术

- 重心不要放在业务开发上 :arrow_up_small:，因为业务逻辑通常都不会很复杂。
- 要会主流技术，研究框架的细节
- 补习基础，计网，计组，数据结构。:arrow_up_small:
- html，css，js也要系统化的学习。



## 环境配置

### 初始化

1. 使用`npm init`初始化一个npm项目，生成一个`package.json`文件

2. 使用`cnpm i webpack vue vue-loader vue-template-compiler --save`来安装后面这三个包到项目的`node_modules`这里不会安装到全局环境中。`cnpm` 是用中文的源来下载，代替`npm`比较快

   ![image-20200723203534094](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20200723203534094.png)

   这个警告代表刚装的包里有依赖没装

   
   
### 文件目录结构 

![image-20200724142752638](G:\笔记\web\前端vue小项目TODO随堂记录.assets\image-20200724142752638.png)

 

### devserver配置

#### package.json

环境变量

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "cross-env NODE_ENV=production webpack",
    "dev": "cross-env NODE_ENV=development webpack-dev-server --open"
  },
```



#### webpack.config.js



  坑：`vue-loader `版本15后不能单独使用

### vscode 插件配置

[插件集合](https://www.cnblogs.com/zzhqdkf/p/12452498.html)



### npm指令

   ```python
   生产环境安装/卸载
   npm install module_name --save-dev 写入devDependencies
   npm install module_name --save 写入dependencies
   
   npm uninstall module_name --save-dev 写入devDependencies
   npm uninstall module_name --save 写入dependencies
   
   开发环境安装/卸载
   npm install module_name -D
   npm install module_name --save-dev 写入devDependencies
   
   npm uninstall module_name -D
   npm uninstall module_name --save-dev 写入devDependencies
   
   查看模块
   查看所有全局安装的模块 npm ls -g
   查看npm默认设置（部分） npm config ls
   查看npm默认设置（全部） npm config ls -l
   
   清除多余的包
   npm prune
   ```

   

## VUE2介绍

### 数据绑定

基于MS的双向绑定的前端库，一般情况下都是用JS来操作html来实现插入数据等，缺点是每次需要改变数据都要操作好多JS。数据绑定简化了这个操作。

### 组件化

一个应用包含多个组件，提高了灵活性和复用性。

在一个文件里写组件里需要的所有部分。

- `template`,
- `script`, 
- `style`

### render方法

vue2之后核心实现已经成为vitalDOM，加入了render方法，当组件发生更改的时候，执行render方法重新生成新的HTML，`<template>`标签也是用render来实现的。

### 核心API

#### 生命周期方法

知道应该在什么时候请求数据等

#### reactive，computed

- reactive：更改数据，对应的`<template>`内容也会改变
- computed：是一种对reactive的深入使用，减少请求量



## jsx和postcss

### jsx

使用`babel`

```json
 "devDependencies":{
    "babel-core": "^6.26.3",
    "babel-helper-vue-jsx-merge-props": "^2.0.3",
    "babel-loader": "^8.1.0",
    "babel-plugin-transform-vue-jsx": "^3.7.0",
    "babel-preset-env": "^1.7.0"
}
```

创建配置文件` .babelrc`

```json
{
  "presets": [
    "env"
  ],
  "plugins": [
    "transform-vue-jsx"
  ]
}
```

jsx的语法
```jsx
import '../assets/styles/footer.styl'

export default {
  data(){
    return {
      author : "Alter"
    }
  },
  render(){
    return (
      <div id="footer">
        <span>Written by {this.author} </span>
      </div>
    )
  }
}
```



### postcss

使用`postcss-loader`

创建配置文件` postcss.config.js`

```javascript
const autoprefixer = require('autoprefixer')

module.exports = {
  plugins: [
    autoprefixer()
  ]
}
```

## 实现应用界面

### 单文件组件

一个标准的组件：

```javascript
//test.vue
<template>
    <div id="testdiv">
    <h2>{{testMsg}}</h2>
    </div>
</template>

<script>
    export default {
        name: "test",
        props:{//为组件注册属性
            testMsg:{//规范写法
                type:String,
                default:"测试字符串默认值"
            }
        },
        methods:{//为组件注册方法

        },
        data: function() {//为组件注册数据
            return{
            }
        }
    }
</script>

<style scoped>
#testdiv{
    color: red;
}
</style>
```

- ` export default` 只会输出一个` default`变量 所以花括号里面不能定义新的，用对象的方式导出这些属性。

在另一个组件中调用上面的组件

```javascript
//app.vue
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
        //:testMsg中冒号后面部分是父组件和子组件属性绑定，需要在子组件的props数组中注册
        //等号右面的是父组件给子组件的数据,在父组件的data中
    <test :testMsg="Msg"></test>
	<test testMsg="测试字符串"></test>
  </div>
</template>

<script>
import test from './test.vue'
export default {
  name: 'app',
  data: function(){
  	Msg:{
          content:'通过数据绑定来发送测试字符串'，
          id:0
    }
  }
  components: {//局部注册使用组件
    test
  }
}
</script>
```

- import之后就可以写` <test>` 标签了
- ` :testMsg="Msg"` 会把Msg从app.vue传给test.vue。后者想要使用Msg的话，需要在`props`数组中注册testMsg作为标识。
- ` testMsg="..."`是显式直接赋值

## 业务逻辑

### 组件关系

![Component Relationship](G:\笔记\web\前端vue小项目TODO随堂记录.assets\Component Relationship.png)



### todo

todo是功能核心区，接收用户输入的todo内容，传递子组件todo对象，接收子组件监听的点击，改变todos中的数据来改变下拉列表，改变filter来确定状态，从而改变显示。有item和tabs两个子组件。

#### export default

##### data(){}

todos:[],初始化一个空列表，todos的内容是在addTodo()方法定义的

filter:"all"默认tab里选中all，表示当前页面tab里选中的状态

##### methods{}:

- addTodo(e)

  通过`@keyup.enter="addTodo"`绑定在了input元素上，

  向todos列表里面`.unshift()`一项todo，这里的todo是一个对象，表示用户输入完要做的事情后，展示在下面的

  ![image-20200726181306359](G:\笔记\web\前端vue小项目TODO随堂记录.assets\image-20200726181306359.png)

  todo有三个属性

  1. id:

     用来作为todo的标识，每一个todo都有一个唯一id，这里是在todo全局初始化了一个`let id = 0 `,然后每调用一次addTodo()都在里面`id++`来保证id不重复。

     :confused:应该还有别的方法，全局变量不妥

  2. content：

     表示todo的内容，`e.target.value.trim()` e.target访问Input Text对象,它的`.value`属性设置或返回文本域的 value 属性值，`.trim()`方法去掉字符串收尾的空格。

  3. completed：

     表示todo的完成状态，在item组件中有一个单选框，如果用户选中了就把这个属性设置为completed,刚添加完默认是false。

- deleteTodo(id)

  item监听单击删除按钮事件，传入ID，删除对应id的todo

  ```js
  this.todos.splice(this.todos.findIndex(todo => todo.id === id),1)
  ```

  splice操作直接修改todos，而不是副本

  :bulb:这里使用filter会怎样

  ```js
  this.todos = this.todos.filter(todo => ！todo.id === id )
  ```

  

- toggleFilter(state)

  tabs组件监听![image-20200726201804550](G:\笔记\web\前端vue小项目TODO随堂记录.assets\image-20200726201804550.png)的点击，传入state告知点击的是哪个，然后让filter=state并且传回tabs组件filter值，tabs组件通过

  ```js
  :class="[state, filter === state ? 'actived' : '']"
  ```

  来赋予被点击的那个span以actived伪类改变其表现。

   

- clearAllcompleted()

  ```js
  this.todos = this.todos.filter(todo => !todo.completed)
  ```

  用`.filter()`把completed的筛掉，注意filter不改变原数组。

  

  

##### computed:{}

filterTodos()

根据filter的状态，返回应该渲染的数组列表，供item标签使用





### tabs

### item

### header和footer

## 总结







## 其他技术细节

### js相关

#### `this`和`e.target`的区别：

1.先弄清楚e.target指向哪个元素，然后看看这个元素的value属性的值就可以得到了。

this就是指向当前事件所绑定的元素，而e.target指向事件执行时鼠标所点击区域的那个元素。一个判断依据是：看看事件绑定的元素内部有没有子元素，如果有子元素的话e.target指向这个子元素，如果没有，e.target和this都指向事件所绑定的元素。

#### 箭头函数

```javascript
todo => todo.id === id
//结构说明
(pram1,pram2) => {};
```

#### 数组方法

```javascript
.findIndex(x => 测试表达式)
```
findIndex() 方法传入一个测试条件（函数），返回符合条件的数组**第一个**元素位置。

findIndex() 方法为数组中的**每个元素**都调用一次函数执行：

```javascript
.splice(index,howmany,)
index是索引，
howmany是数量，默认删除从index开始到结尾的元素
```

如果仅删除一个元素，则返回一个元素的数组。 如果未删除任何元素，则返回空数组。

**注意：**这种方法会改变原始数组。

```javascript
.filter(x => 测试表达式)
```

filter() 方法传入一个测试条件（函数），返回符合条件的元素组成的数组。

元素置。) 方法为数组中的**每个元素**都调用一次函数执行：

## 需要补充

### Vue

#### vue父子组件通信

#### v-model

#### computed

compute当依赖的值发生变化时会重新计算，在computed里面用函数写法，但是使用的时候不带括号。

#### this和e.target、e.currentTarget

##### 在JavaScript中

在事件处理程序内部，对象this始终等于currentTarget的值，而target则只包含事件的实际目标。如果直接将事件处理程序指定给了目标元素，则**this、currentTarget和target**包含相同的值。来看下面的例子：

```javascript
1 var btn = document.getElementById("myBtn");
2 btn.onclick = function (event) {
3     alert(event.currentTarget === this); //ture
4     alert(event.target === this); //ture
5 };
```

这个例子检测了currentTarget和target与this的值。由于click事件的目标是按钮，一次这三个值是相等的。如果事件处理程序存在于按钮的父节点中，那么这些值是不相同的。再看下面的例子：

```js
1 document.body.onclick = function (event) {
2     alert(event.currentTarget === document.body); //ture
3     alert(this === document.body); //ture
4     alert(event.target === document.getElementById("myBtn")); //ture
5 };
```

当单击这个例子中的按钮时，this和currentTarget都等于document.body，因为事件处理程序是注册到这个元素的。然而，target元素却等于按钮元素，以为它是click事件真正的目标。由于按钮上并没有注册事件处理程序，结果click事件就冒泡到了document.body，在那里事件才得到了处理。

在需要通过一个函数处理多个事件时，可以使用**type**属性。例如：

```js
 1 var btn = document.getElementById("myBtn");
 2 var handler = function (event) {
 3         switch (event.type) {
 4         case "click":
 5             alert("Clicked");
 6             break;
 7         case "mouseover":
 8             event.target.style.backgroundColor = "red";
 9             bread;
10         case "mouseout":
11             event.target.style.backgroundColor = "";
12             break;
13         }
14     };
15 btn.onclick = handler;
16 btn.onmouseover = handler;
17 btn.onmouseout = handler;
```

##### 在vue中的情况

```js
<template>
	<input type="text" @keyup.enter="test"/>
</template>       
methods: {
    // e是event对象
    addTodo(e) {
    console.log(e.target)
    console.log(e.currentTarget)
    console.log(this)
 };

```

:question: 这里的this是组件实例，应该和@keyup的实现有关，实现上可能在更高的地方监听键盘事件。





---



### webpack 3.0

### http协议

