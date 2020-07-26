/*
 * @Author: Alter 
 * @Date: 2020-07-25 14:54:56 
 * @Last Modified by: Alter
 * @Last Modified time: 2020-07-26 23:23:08
 */
<template>
  <section class="real-app">
    <input
      ref="userInput"
      type="text"
      class="add-input"
      autofocus="autofocus"
      placeholder="接下来做什么"
      @keyup.enter="addTodo"
    />
    <item 
      v-for="todo in filtedTodos" 
      :todo="todo" 
      :key="todo.id" 
      @del="deleteTodo"></item>
    <tabs 
      :filter="filter"
      :todos="todos"
      @toggle = "toggleFilter"
      @clearAllCompleted = "clearAllCompleted"
      @rest = "setUserInput"
    />
  </section>
</template>

<script>
import Item from "./item.vue";
import Tabs from "./tabs.vue";
let id = 0;
export default {
  components: {
    Item,
    Tabs,
  },
  computed:{
    filtedTodos(){
      if(this.filter === 'all')
        return this.todos
      const completed = this.filter === 'completed' ;
      return this.todos.filter(todo => todo.completed === completed)

    }
    
  },
  data() {
    return {
      todos: [],
      filter: "all",
    };
  },
  methods: {
    // e是event对象
    addTodo(e) {
      // methods中方法的this指向组件实例本身
      // todos数组包含的todo对象传递给item组件
      // 父组件和子组件的传递
      this.todos.unshift({
        id: id++,
        // e.target代表直接接受事件或者绑定事件的DOM元素，这里是input。
        // input的value属性是输入的值，trim()是去除字符串头尾空格
        content: e.target.value.trim(),
        completed: false,
      });
      e.target.value='';
      console.log(this);
    },
    deleteTodo(id){
      this.todos.splice(this.todos.findIndex(todo => todo.id === id),1)
    },
    toggleFilter(state){
      this.filter = state
    },
    clearAllCompleted(){
      this.todos = this.todos.filter(todo => !todo.completed)
    },
    setUserInput(input_string){
      this.$refs.userInput.value = input_string
      this.$refs.userInput.focus()
      // console.log(input_string);
    }

  },
};
</script>

<style lang="stylus" scoped>
.real-app {
  width: 600px;
  margin: 0 auto;
  box-shadow: 0 0 5px #666;
}

.add-input {
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: none;
  outline: none;
  color: inherit;
  box-sizing: border-box;
  font-smoothing: antialiased;
  padding: 16px 16px 16px 36px;
  border: none;
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
}
</style>