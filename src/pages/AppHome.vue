<script>
export default {
    name: 'AppHome'
}
</script>

<template>

    <div class="container">
        
        <h1 class="text-center text-secondary">Welcome, this is the Home Page</h1>
        <div class="page">
            <router-link :to="{name: 'apartment_list'}" class="btn btn-secondary fw-bold button-home">
                Click here
            </router-link>
        </div>


    </div>
</template>

<style lang="scss" scoped>


 h1 {
    margin-top: 36px;
    font-size: 55px;
    font-weight: bold;
 }

 .page {
    text-align: center;
    margin-top: 20px;

    .button-home {
        height: 40px;
        width: 130px;
        font-size: 20px;
    }
 }
</style>
