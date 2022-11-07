<template>
    <div class="titlediv">
        <img alt="logo" class="logo" src="../assets/gtjrpa-logo.gif" />
        <h2 class="rpatitle">{{ brand  }} <br /> {{ msg }} </h2>
    </div>
    <div class="loginformdiv">
        <form id="rpalogin" name="rpalogin">
            <table align="center" style="cursor=none">
                <tr style="height: 18px">
                    <td> </td>
                </tr>
                <tr>
                    <td class="inputlabel">Username</td>
                </tr>
                <tr>
                    <td><input class="inputbox" type="text" id="uid" name="uid" /></td>
                </tr>
                <tr style="height: 18px">
                    <td> </td>
                </tr>
                <tr>
                    <td class="inputlabel">Password</td>
                </tr>
                <tr>
                    <td><input class="inputbox" type="password" id="pwd" name="pwd" /></td>
                </tr>
                <tr style="text-align:center; height: 32px;">
                    <td><input class="checkbox" type="checkbox" id="remuid" name="remuid" value="checked"><label class="checktitle" for="remuid">Remember my username</label></td>
                </tr>
                <tr style="height: 18px">
                    <td> </td>
                </tr>
                <tr style="height: 24px; text-align: center">
                    <td><button class="button" style=" background-color: #EFEFEF;" type="submit" id="submit" name="submit">Login</button></td>
                </tr>
                <tr style="height: 5px">
                    <td> </td>
                </tr>
                <tr style="height: 24px; text-align:center">
                    <td><button class="button" style=" background-color: #FFFFFF; " type="submit" id="submit" name="submit">Forgot Password</button></td>
                </tr>
            </table>

        </form>
    </div>
</template>

<script>
    import { mapMutations } from "vuex";
    export default {
        name: 'login',

        props: {
            brand: String,
            msg: String
        },

        data () {
            return {
                loginForm: {
                    username: '',
                    password: ''
                },
                userToken: ''
            };
        },


        methods: {
            ...mapMutations(['changeLogin']),
            login() {
                let _this = this;
                if (this.loginForm.username === '' || this.loginForm.password === '') {
                    alert('账号或密码不能为空');
                } else {
                    this.axios({
                        method: 'post',
                        url: '../index',
                        data: _this.loginForm
                    }).then(res => {
                        console.log(res.data);
                        _this.userToken = 'Bearer ' + res.data.data.body.token;
                        // 将用户token保存到vuex中
                        _this.changeLogin({ Authorization: _this.userToken });
                        _this.$router.push('/home');
                        alert('登陆成功');
                    }).catch(error => {
                        alert('账号或密码错误');
                        console.log(error);
                    });
                }
            }
        }
    }
</script>

<style scoped>
    .titlediv {
        position: absolute;
        width: 100%;
        height: 42px;
        top: 288px;
        text-align: center;
        background-color: #EFEFEF;
        background-size: cover;
        z-index: 0;
    }

    .loginformdiv {
        position: absolute;
        width: 100%;
        top: 360px;
        text-align:left;
        font-size: 8px;
        background-size: cover;
        z-index: -1;
    }

    .inputlabel {
        font-family: Arial;
        font-size: 8px;
        font-weight: bold;
        color: #7E7E7E;
    }

    .inputbox{
        border: 1px solid gray;
        border-radius:10px;
        height: 18px;
    }

    .inputbox:hover {
        border: 1px solid black;
    }

    .checkbox{
        display: inline-block;
    }

    .checktitle {
        display: inline-block;
        font-family: Calibri;
        color: #7E7E7E;
        position: relative;
        top: -3px;
    }

    .rpatitle {
        text-align: right;
        font-family: Arial;
        color: #A1A1A1;
        display: inline-block;
        margin-left: -43px;
        margin-top: -1px;
        white-space: nowrap;
        line-height: 23px;
        user-select: none;
    }

    .button {
        font-size: 8px;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: normal;
        width: 170px;
        height: 22px;
        border-color: #EFEFEF;
        border-style:solid;
        border-width:1px;
        border-radius: 8px;
    }

    .button:hover {
        border: 1px solid gray;
    }

    .logo {
        top: 200px;
        width: 114px;
        height: 128px;
        margin-top: -120px;
        vertical-align: middle;
        display: inline-block;
    }
</style>