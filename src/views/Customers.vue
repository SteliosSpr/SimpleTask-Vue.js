<script setup>
    import {useRoute} from "vue-router"
    import {ref, watch, onMounted} from "vue"
    import Spinner from "../components/Spinner.vue"

    const customers = ref([])
    const loads = ref(true);

    const setSpinnerFalse = () => {
        loads.value = false;
    }
    const runSpinner = () => {
        setTimeout(setSpinnerFalse, 1000);
    }

    watch(loads, runSpinner());

    async function getCustomers() {
            const res = await fetch("/data/customers.json");
            const data = await res.json();
            customers.value = data;
    }

    onMounted(() => getCustomers());

</script>

<template>
    <div>
        <div v-if="loads">
            <Spinner />

        </div>
        <div v-else>
            <div class="top-menu">
                <h1>Customers</h1>
            </div>
            <table class="customerTable">
                <tr>
                    <th scope="col">CODE</th>
                    <th scope="col">NAME</th>
                    <th scope="col">ADDRESS</th>
                </tr>
                <tr v-for="customer in customers" :key="customer.code">
                    <td>{{ customer.code }}</td>
                    <td>{{ customer.name }}</td>
                    <td>{{ customer.address }}</td>
                </tr>
            </table>
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

    .customerTable {
        width: 80%;
        text-align: left;
        border-collapse: collapse;
        left: 220px;
        top: 100px;
        position: absolute;
    }

    .customerTable th {
        padding-top: 30px;
    }

    .customerTable td, th {
        border-bottom: 1px solid #e9ecee;
        padding: 20px;
    }

    @media screen and (max-width: 920px) {
        .top-menu {
            margin-left: 150px;
            padding-bottom: 15px;
        }

        .top-menu h1 {
            font-size: 1.2em;
        }

        .customerTable th, .customerTable td {
            font-size: 0.8em;
        }

        .customerTable {
            left: 160px;
            top: 60px;
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

        .customerTable {
            left: 80px;
        }

    }

    @media screen and (max-width: 470px) {
        .top-menu h1 {
            left: 5px;
        }

    }




</style>