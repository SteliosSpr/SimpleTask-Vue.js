<script setup>
    import {RouterView, RouterLink} from "vue-router"
</script>

<template>
    <div class="container">
        <div class="side-menu">
            <div class="logo">
            <RouterLink to="/"> <img src="/logo/logo.svg" alt=""></RouterLink>
            </div>
            <ul class="menu">
            <li><RouterLink to="/customers" active-class="active" class="menuDefault">CUSTOMERS</RouterLink></li>
            <li><RouterLink to="/products" active-class="active" class="menuDefault">PRODUCTS</RouterLink></li>
            <li><RouterLink to="/users" active-class="active" class="menuDefault">USERS</RouterLink></li>
            </ul>
        </div>
    </div>

</template>

<style scoped>

    .container {
        display: flex;
        height: 100vh;
        margin-top: 0;
        position: fixed;
        z-index: 1;
    }

    .menu {
        margin-top: 20px;
        list-style: none;
    }

    .logo {
        padding: 20px;
    }

    .logo img {
        max-width: 100%;
    }

    .side-menu {
        position: fixed;
        left: 0;
        top: 0;
        width: 200px;
        height: 100%;
        background-color: #e9ecee;
        font-size: 20px;
        flex-direction: column;
        }

    .menu li {
    padding-bottom: 30px;
    }

    .menuDefault {
        text-decoration: none;
        color: #000000;
    }

    .active {
        color: #006bfD;
    }

    @media screen and (max-width: 920px) {
        .side-menu {
            width: 150px;
            font-size: 1em;
        }

    }


    @media screen and (max-width: 470px) {
    
        .side-menu {
            width: 80px;
            font-size: 0.8em;
        }

        .side-menu ul {
            padding-left: 2px;
        }



    }


    

</style>