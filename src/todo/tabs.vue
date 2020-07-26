<template>
  <div>
    <div class="helper">
      <span class="left">{{unCompleteTodoLength}} items left</span>
      <span class="tabs">
        <span
          v-for="state in states"
          :key="state"
          :class="[state, filter === state ? 'actived' : '']"
          @click="toggleFilter(state)"
        >{{state}}</span>
      </span>
      <span class="clear" @click="clearAllCompleted">Clear Completed</span>
    </div>
    <div class="helper">
      <span class="clear" @click="generateRestString">累了？</span>
    </div>
  </div>
</template>

<script>
let tmp = 0;
export default {
  props: {
    filter: {
      type: String,
      required: true,
    },
    todos: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      states: ["all", "active", "completed"],
      restString: ["泡杯茶", "活动一下颈椎", "来局文明6", "躺会儿"],
      
    };
  },
  computed: {
    unCompleteTodoLength() {
      return this.todos.filter((todo) => !todo.completed).length;
    },
  },
  methods: {
    clearAllCompleted() {
      this.$emit("clearAllCompleted");
    },
    toggleFilter(state) {
      this.$emit("toggle", state);
    },
    generateRestString() {
      let rand = Math.floor(Math.random() * this.restString.length);
      if(tmp === rand){
        let arr=[];for(let i=0;i<this.restString.length;i++)arr.push(i); 
        arr.splice(arr.findIndex(i => i === rand),1)
        rand = arr[Math.floor(Math.random() * arr.length)]
      }
      tmp = rand
      this.$emit("rest",this.restString[rand])
      
    },
  },
};
</script>

<style lang="stylus" scoped>
.helper {
  font-weight: 100;
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  line-height: 30px;
  background-color: #ffffff;
  font-size: 14px;
  font-smoothing: antialiased;
}

.left, .clear, .tabs {
  padding: 0 10px;
}

.left .clear {
  width: 150px;
}

.left {
  text-align: center;
}

.clear {
  text-align: right;
  cursor: pointer;
}

.tabs {
  width: 200px;
  display: flex;
  justify-content: space-between;

  * {
    display: inline-block;
    padding: 0 10px;
    cursor: pointer;
    border: 1px solid rgba(175, 47, 47, 0);

    &.actived {
      border-color: rgba(175, 47, 47, 0.4);
      border-radius: 5px;
    }
  }
}
</style>