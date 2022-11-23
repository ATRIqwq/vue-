<template>
    <ContentBase>
        <div class="row">
            <div class="col-3">
                <UserInfo @follow="follow" @unfollow="unfollow" v-bind:user="user" />
                <UserEditor v-if="is_me" @post_a_post="post_a_post" />
            </div>
            <div class="col-9">
                <UserPost @delete_a_post="delete_a_post" :user="user" :posts="posts" />
            </div>
        </div>

    </ContentBase>
</template>
// v-bind:可以绑定要传参数的子组件
// 子组件 @+事件名称："父组件函数名" 可以触发父组件事件从而来修改父组件中的参数




<script>

// 导入的组件
import ContentBase from '../components/ContentBase';
import UserInfo from '../components/UserInfo';
import UserPost from '../components/UserPost';
import UserEditor from '../components/UserEditor';
import { reactive } from 'vue';
import $ from 'jquery';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { computed } from 'vue';   //动态计算当前用户的id

//
export default {
    name: 'UserprofileView',          //当前组件的名称
    components: {                     //用到的组件
        ContentBase,
        UserInfo,
        UserPost,
        UserEditor,
    },


    //用setup(){}初始化变量和函数   定义完后记得要return定义的变量和函数,返回key: value 可以简写为value
    //注意：在哪个组件定义的变量或函数只能在哪个组件中修改
    //父组件通过Props向子组件传递参数，子组件通过props来接收父组件传递的参数
    //子组件通过事件触发来使父组件修改父组件中的参数

    setup() {
        const store = useStore();
        const route = useRoute();
        const userId = parseInt(route.params.userId);
        const user = reactive({

        }
        );

        const posts = reactive({

        });

        //调用API从服务器调取用户信息；
        $.ajax({
            url: "https://app165.acapp.acwing.com.cn/myspace/getinfo/",
            type: "GET",
            data: {
                user_id: userId,           //传递参数
            },
            headers: {                    //服务器进行jwt验证
                'Authorization': "Bearer " + store.state.user.access,
            },
            success(resp) {             //验证成功返回用户数据
                user.id = resp.id;
                user.username = resp.username;
                user.photo = resp.photo;
                user.followerCount = resp.followerCount;
                user.is_followed = resp.is_followed;
            }
        });


        $.ajax({
            url: "https://app165.acapp.acwing.com.cn/myspace/post/",
            type: "GET",
            data: {
                user_id: userId,
            },
            headers: {                    //服务器进行jwt验证
                'Authorization': "Bearer " + store.state.user.access,
            },
            success(resp) {
                posts.count = resp.length;
                posts.posts = resp;
            }

        })
        const follow = () => {
            if (user.is_followed) return;
            user.is_followed = true;
            user.followerCount++;
        };

        const unfollow = () => {
            if (!user.is_followed) return;
            user.is_followed = false;
            user.followerCount--;
        };

        const post_a_post = (content) => {
            posts.count++;
            posts.posts.unshift({
                id: posts.count,
                userId: 1,
                content: content,
            })
        };

        const delete_a_post = post_id => {
            posts.posts = posts.posts.filter(post => post.id !== post_id); //判断post_id是否相同，为true保留，为false删除
        }

        const is_me = computed(() => userId === store.state.user.id);

        return {
            user,
            follow,
            unfollow,
            posts,
            post_a_post,
            is_me,
            delete_a_post,
        };
    }


}

</script>


  <!-- 加scoped目的：防止组件之间的css相互干扰 -->
<style scoped>

</style>