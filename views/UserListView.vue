<template>
    <ContentBase>
        <div class="card" v-for="user in users" :key="user.id" @click="open_user_profile(user.id)">
            <div class="card-body">
                <div class="row">
                    <div class="col-1">
                        <img class="img-fluid" :src="user.photo" alt="">
                    </div>
                    <div class="col-11 mod-col">
                        <div class="username">{{ user.username }}</div>
                        <div class="followerCount">{{ user.followerCount }}</div>
                    </div>
                </div>
            </div>
        </div>
    </ContentBase>
</template>

<script>
import ContentBase from '../components/ContentBase';
import $ from 'jquery';
import { ref } from 'vue';
import router from '@/router/index';
import { useStore } from 'vuex';
export default {
    name: 'UserListView',
    components: {
        ContentBase,
    },

    setup() {
        const users = ref([]);
        const store = useStore();
        $.ajax({
            url: 'https://app165.acapp.acwing.com.cn/myspace/userlist/',
            type: "get",
            success(resp) {
                users.value = resp;
            }
        });
        const open_user_profile = (userId) => {
            if (store.state.user.is_login) {
                router.push({                   //路由到userprofile页面
                    name: "userprofile",
                    params: {                   //传递route中userprofile的参数:userId
                        userId,
                    }
                })
            } else {
                router.push({
                    name: "login",
                })
            }

        }
        return {
            users,
            store,
            open_user_profile,
        }
    }
}
</script>


<style scoped>
img {
    border-radius: 50%;
}

.mod-col {
    display: flex;
    flex-direction: column;
}

.username {
    font-size: 20px;
    font-weight: bolder;
    color: lightblue;
    text-align: left;
    height: 50%;

}

.followerCount {
    font-size: 10px;
    color: gray;
    text-align: left;
    height: 50%;
}

.card {
    margin-bottom: 20px;
    cursor: pointer;

}

.card:hover {
    box-shadow: 2px 2px 1px rgba(183, 202, 255);
    transition: 500ms;
}
</style>