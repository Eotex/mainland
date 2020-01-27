<template>
    <div class="footer">
       <footer>
           <div class="container-fluid">
                <div class="row">
                    <div class="footer-wrapper">
                        <div class="col-md-4 col-sm-6 col-xs-12">
                            <div class="footer-brand">
                                <img src="/static/images/logo.png" alt="logo" />
                            </div>
                        </div>

                        <div class="col-md-8 col-sm-6 col-xs-12">
                            <div class="copyright">
                                <p>&copy; Copyright <span style="color:#82ca9c">{{ date }}</span> 
                                Mainland Oil and Gas LTD. All right reserved.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       </footer>
    </div>
</template>
<script>
export default {
    name: 'footer',
    data(){
        return{
            date: new Date().getFullYear(),
        }
    },
}
</script>
<style scoped>
@import '../../assets/css/mainland.css';
</style>