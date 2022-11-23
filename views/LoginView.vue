<template>
    <ContentBase>
        <form @submit.prevent="login">
            <div class="row justify-content-md-center">
                <div class="col-3">
                    <div class="mb-3">
                        <label for="username" class="form-label">用户名</label>
                        <input v-model="username" type="text" class="form-control" id="username">

                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">密码</label>
                        <input v-model="password" type="password" class="form-control" id="password">
                    </div>
                    <div class="error-message">{{ error_message }}</div>
                    <button type="submit" class="btn btn-primary">登录</button>
                </div>
            </div>

        </form>
    </ContentBase>
</template>

<script>

import ContentBase from '../components/ContentBase';
import { ref } from 'vue';
import { useStore } from 'vuex';
import router from '@/router/index';

export default {
    name: 'LoginView',
    components: {
        ContentBase,
    },

    setup() {
        const store = useStore(); //运用store中的全局变量或者函数时，先声明
        let username = ref('');
        let password = ref('');
        let error_message = ref('');
        const login = () => {
            //dispatch用来调用store中action的函数 
            store.dispatch("login", {
                username: username.value,
                password: password.value,
                success() {
                    router.push({ name: 'userlist' });  //如果用户登录成功，就跳转到用户列表
                },
                error() {
                    error_message.value = "用户名或密码错误";
                },
            })
        };

        return {
            username,
            password,
            login,
            error_message,
        };
    }
}

</script>


<style scoped>
button {
    width: 100%;
}

.form-label {
    float: left;
}

.error-message {
    color: red,
}
</style>