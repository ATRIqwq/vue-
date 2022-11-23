import $ from 'jquery';
import jwt_decode from 'jwt-decode';

const ModuleUser = {
    state: {              //state用于存储全局变量,以字典的形式存放
        username: "",
        id: "",
        photo: "",
        followerCount: 0,
        access: "",
        refresh: "",
        is_login: false,
    },
    getters: {            //getters用于获取state中需要计算得到的一些值
    },
    mutations: {
        updateUser(state, user) {
            state.id = user.id;
            state.username = user.username;
            state.photo = user.photo;
            state.followerCount = user.followerCount;
            state.access = user.access;
            state.refresh = user.refresh;
            state.is_login = user.is_login;
        },

        updateAccess(state, access) {
            state.access = access;
        },

        logout(state) {
            state.id = "";
            state.username = "";
            state.photo = "";
            state.followerCount = 0;
            state.access = "";
            state.refresh = "";
            state.is_login = "";
        }
    },
    actions: {
        login(context, data) {    //login进行登录验证,context用来传输一些API,data用来传自己的一些参数(用户名，密码)
            //调用API
            $.ajax({
                url: "https://app165.acapp.acwing.com.cn/api/token/", //获取jwt验证的API
                type: "POST",
                data: {      //传参(用户名和密码)
                    username: data.username,
                    password: data.password,
                },
                success(resp) {
                    const { access, refresh } = resp;
                    const access_obj = jwt_decode(access);   //将jwt解码出来

                    setInterval(() => {         //每个5分钟刷新一次令牌
                        $.ajax({
                            url: "https://app165.acapp.acwing.com.cn/api/token/refresh/",
                            type: "POST",
                            data: {
                                refresh,
                            },
                            success(resp) {
                                context.commit('updateAccess', resp.access);
                            }

                        });
                    }, 4.5 * 60 * 1000);

                    $.ajax({
                        url: "https://app165.acapp.acwing.com.cn/myspace/getinfo/", //获取当前登录的用户信息的API
                        type: "GET",
                        data: {
                            //通过user_id才能获取这个用户的信息，而用户user_id包含在server端发送jwt中
                            user_id: access_obj.user_id,
                        },
                        headers: {               //进行登录验证的令牌
                            'Authorization': "Bearer " + access,
                        },
                        success(resp) {
                            context.commit("updateUser", {
                                ...resp,
                                access: access,
                                refresh: refresh,
                                is_login: true,
                            });
                            data.success();
                        },

                    });
                },
                error() {
                    data.error();
                }
            });
        },

    },
    modules: {            //modules可以维护state中单独的变量，简单来说就是分文件进行编写state中的一些对象
    }
};


export default ModuleUser;