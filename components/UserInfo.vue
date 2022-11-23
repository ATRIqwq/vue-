<template>

    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-4 img-field">
                    <img class="img-fluid" :src="user.photo" alt="">
                </div>
                <div class="col-8 mod-col">
                    <div class="username">{{ user.username }}</div>
                    <div class="fans">粉丝:{{ user.followerCount }}</div>
                    <button @click="follow" v-if="!user.is_followed" class="btn btn-outline-info btn-sm">+关注</button>
                    <button @click="unfollow" v-if="user.is_followed" class="btn btn-outline-info btn-sm">取消关注</button>
                </div>
            </div>
        </div>
    </div>



</template>


<!-- //子组件通过props来接收父组件传来的参数
//context用来触发父组件绑定的函数 -->

<script>

import $ from 'jquery';
import { useStore } from 'vuex';


export default {
    name: "UserInfo",
    props: {
        user: {
            type: Object,
            required: true,
        }
    },

    setup(props, context) {
        const store = useStore();
        const follow = () => {

            $.ajax({
                url: "https://app165.acapp.acwing.com.cn/myspace/follow/",
                type: "POST",
                headers: {                    //服务器进行jwt验证
                    'Authorization': "Bearer " + store.state.user.access,
                },
                data: {
                    target_id: props.user.id,
                },
                success(resp) {
                    if (resp.result === "success") {
                        context.emit('follow');
                    }

                }
            })
        };
        const unfollow = () => {
            $.ajax({
                url: "https://app165.acapp.acwing.com.cn/myspace/follow/",
                type: "POST",
                headers: {                    //服务器进行jwt验证
                    'Authorization': "Bearer " + store.state.user.access,
                },
                data: {
                    target_id: props.user.id,
                },
                success(resp) {
                    if (resp.result === "success") {
                        context.emit('unfollow');
                    }

                }
            })

        }
        return {

            follow,
            unfollow,
        }
    }

}

</script>

<style scoped>
.col-3 {
    padding-right: 0;
}

.mod-col {
    display: flex;
    flex-direction: column;
    padding-left: 0;
}

.username {
    text-align: left;
    font-weight: bolder;
    font-size: 20px;
    color: lightblue;
    float: left;
}

.fans {
    text-align: left;
    color: gray;
    font-size: 8px;
    margin-bottom: 5px;
    float: left;

}

button {
    /* float: left; */
    padding: 2px 4px;
}

.img-field {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

image {
    border-radius: 50%;
}
</style>