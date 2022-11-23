

<template>
    <div class="card edit-field">
        <div class="card-body">
            <label for="edition" class="form-label">编辑区</label>
            <textarea v-model="content" class="form-control" id="edition" rows="3"></textarea>
            <button @click="post_a_post" type="button" class="btn btn-info btn-sm">发帖</button>

        </div>
    </div>
</template>

//ref用来定义一个变量 reactiv用来定义一个对象
//使用ref和reactive之前记得先import进来
//取得一个标签内的内容:在标签属性中使用v-model
//context.emit('触发父组件中的函数名','传递给父组件的参数')


<script>
import { ref } from 'vue';
import $ from 'jquery';
import { useStore } from 'vuex';  //调用当前已登录用户的全局变量中的变量或者函数

export default {
    name: "UserEditor",
    setup(props, context) {
        const content = ref('');
        const store = useStore();
        const post_a_post = () => {
            $.ajax({
                url: "https://app165.acapp.acwing.com.cn/myspace/post/",
                type: "POST",
                headers: {                    //服务器进行jwt验证
                    'Authorization': "Bearer " + store.state.user.access,
                },
                data: {
                    content: content.value,
                },
                success(resp) {
                    if (resp.result === "success") {
                        context.emit('post_a_post', content.value);
                        content.value = "";
                    }
                }
            })

        }


        return {
            content,
            post_a_post,
        }
    }

}
</script>

<style scoped>
.edit-field {
    margin-top: 20px;
}

button {
    margin-top: 10px;
    float: left;
}
</style>