<script setup>
    import {useRoute} from "vue-router"
    import {ref, watch} from "vue"
    import Spinner from "../components/Spinner.vue"

    const loads = ref(true);

    const setSpinnerFalse = () => {
        loads.value = false;
    }
    const runSpinner = () => {
        setTimeout(setSpinnerFalse, 1000);
    }

    watch(loads, runSpinner());
</script>

<template>
    <div>
        <div v-if="loads">
            <Spinner />

        </div>
        <div v-else>
            
            <div class="top-menu">
                <h1>Welcome</h1>
            </div>
        </div>
    </div>
    
</template>

<style scoped>

    .top-menu {
        position: fixed;
        width: 100vw;
        margin-left: 200px;
        top: 0;
        z-index: 1;
        background: #ffffff;
        border-bottom: 5px solid #e9ecee;
    }

    .top-menu h1 {
        position: relative;
        top: 20px;
        left: 30px;
    }

    @media screen and (max-width: 920px) {
        .top-menu {
            margin-left: 150px;
            padding-bottom: 15px;
        }

        .top-menu h1 {
            font-size: 1.2em;
        }

    }

    @media screen and (max-width: 470px) {
        .top-menu {
            margin-left: 80px;
            padding-bottom: 15px;
        }

        .top-menu h1 {
            font-size: 1em;
        }
    
    }


</style>