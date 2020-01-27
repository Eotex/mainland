<template>
    <div class="navigation">
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                 <div class="navbar-header" v-if="isLoggedin">
                    <a class="navbar-brand">
                        <img src="/static/images/logo.png" alt="logo"/>
                    </a>
                </div>
                <div class="navbar-header" v-else>
                    <router-link to="/">
                        <a class="navbar-brand">
                            <img src="/static/images/logo.png" alt="logo"/>
                        </a>
                    </router-link>
                </div>
                <ul class="nav navbar-nav navbar-right">
                    <li v-if="isLoggedin"><button class="btn btn-default navbar-btn" @click="Logout">Logout</button></li>
                    <li v-if="!isLoggedin"><router-link to="/login">Login</router-link></li>
                </ul>
            </div>
        </nav>
    </div>
</template>
<script>
import firebase from 'firebase'
export default{
    name: 'navigation',
    data(){
        return{
            isLoggedin: false,
            currentUser: false
        }
    },
    mounted(){
        if(firebase.auth().currentUser){
            this.isLoggedin = true
            this.currentUser = firebase.auth().currentUser
        }
    },
    methods:{
        Logout(){
            firebase.auth().signOut().then(()=> {
                this.$router.go({path: "/login"})
            })
        }
    }
}
</script>
<style scoped>
@import '../../assets/css/mainland.css';
.nav .btn-default{
    margin-right:10px;
    background:rgba(29, 173, 0, 0.75);
    color:#fff;
}
</style>