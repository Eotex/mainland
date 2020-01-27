<template>
    <div class="login">
        <header class="header">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12">
                        <h1 class="title">
                            Authenticate with your credentials
                        </h1>
                    </div>
                </div>
            </div>
        </header>
        <section>
            <div class="container">
                <div class="section_login">
                   <div class="row">
                       <div class="col-md-6 col-md-offset-3 addLoginColor">
                           <div class="title">Login with credentials</div>
                           <div class="form-group" :class="{'has-error':errors.has('email')}">
                               <input type="text" v-model="email" name="email" v-validate="'required|email'" class="form-control" placeholder="Email...">
                               <p class="text-danger" v-show="errors.has('email')">
                                   {{ errors.first('email')}}
                               </p>
                           </div>
                           <div class="form-group" :class="{'has.error':errors.has('password')}">
                               <input type="password" v-model="password" name="password" v-validate="'required'" class="form-control" placeholder="Password..." @keyup.enter="authenticateUser">
                               <p class="text-danger" v-show="errors.has('password')">
                                   {{ errors.first('password') }}
                               </p>
                           </div>
                           <button class="btn btn-default" v-on:click="authenticateUser">
                               <i class="fa fa-sign-in"></i> Login
                           </button>
                       </div>
                   </div>
                </div>
            </div>
        </section>
        <hr>
        <Footer/>
    </div>
</template>
<script>
import firebase from 'firebase'
import Footer from '../include/footer.vue'
import swal from 'sweetalert'
export default {
    name: 'login',
    data(){
        return{
            email: "",
            password: "",
        }
    },
    components:{
        Footer
    },
    methods:{
        authenticateUser(){
            this.$validator.validateAll().then(result => {
                if(result){
                    firebase.auth().signInWithEmailAndPassword(this.email,this.password).then(user => {
                        this.$router.go({path:'/dashboard'})
                    })
                    .catch(error => {
                        swal('fail to authenticate',{
                              buttons: false,
                              timer: 3000,
                        })
                        this.email = ""
                        this.password = ""
                    })
                }
            })
        }
    }
}
</script>
<style scoped>
@import '../../assets/css/mainland.css';
</style>