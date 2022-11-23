import { createStore } from 'vuex'
import ModuleUser from './user'
export default createStore({
  state: {              //state用于存储全局变量
  },
  getters: {            //getters用于获取state中需要计算得到的一些值
  },
  mutations: {
  },
  actions: {            //action用于定义对state中数据的一些操作，但是不能直接修改，对于直接进行的修改操作，一般在mutations中进行
  },
  modules: {            //modules可以维护state中单独的变量，简单来说就是分文件进行编写state中的一些对象
    user: ModuleUser,
  }
})
