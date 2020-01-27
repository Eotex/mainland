<template>
    <div class="index">
        <header class="header">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12">
                        <h1 class="title">
                            Welcome to Mainland Oil and Gas Limited
                        </h1>
                    </div>
                </div>
            </div>
        </header>
        <section class="section">
            <div class="overall-section">
                <div class="container text-center">
                    <div class="section-wrapper">
                        <h1>Welcome to Daily Sales Portal</h1>
                        <p>Number One mega station in Nigeria</p>
                    </div>
                </div>
            </div>
        </section>
        <Footer/>
    </div>
</template>
<script>
import Footer from '../include/footer.vue'
export default{
    name: 'index',
    data(){
        return{

        }
    },
    components:{
        Footer
    }
}
</script>
<style scoped>
@import '../../assets/css/mainland.css';
</style>