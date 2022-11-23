//v-for:循环渲染一个组件 每个组件有一个key

<template>
    <div class="card">
        <div class="card-body">
            <div v-for="post in posts.posts" :key="post.id">
                <div class="card single-post">
                    <div class="card-body post-content">
                        {{ post.content }}
                        <button @click="delete_a_post(post.id)" v-if="is_me" type="button"
                            class="btn btn-danger btn-sm">删除</button>
                    </div>
                </div>
            </div>

        </div>
    </div>

</template>


<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import $ from 'jquery';


export default {
    name: "UserPost",
    props: {
        posts: {
            type: Object,
            required: true,
        },

        user: {
            Object,
            required: true,
        }
    },

    setup(props, context) {
        const store = useStore();
        let is_me = computed(() => store.state.user.id === props.user.id);

        const delete_a_post = post_id => {
            $.ajax({
                url: "https://app165.acapp.acwing.com.cn/myspace/post/",
                type: "DELETE",
                headers: {                    //服务器进行jwt验证
                    'Authorization': "Bearer " + store.state.user.access,
                },
                data: {
                    post_id: post_id,
                },
                success(resp) {
                    if (resp.result === "success") {
                        context.emit("delete_a_post", post_id);
                    }

                }
            })

        }

        return {
            is_me,
            delete_a_post,
        }
    }

}

</script>

<style scoped>
.single-post {
    margin-bottom: 15px;

}

.post-content {
    text-align: left;
}

button {
    float: right;
}
</style>