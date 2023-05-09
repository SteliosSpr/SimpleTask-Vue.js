<script setup>
    import {RouterView, RouterLink, useRoute, useRouter} from "vue-router"
    import {ref, watch, onMounted} from "vue"
    import Spinner from "../../components/Spinner.vue"

    const URL = "/data/users.json";
    const loads = ref(true);
    let users = ref([]);
    const router = useRouter();
    const route = useRoute();

    const setSpinnerFalse = () => {
        loads.value = false;
    }
    const runSpinner = () => {
        setTimeout(setSpinnerFalse, 1000);
    }

    watch(loads, runSpinner());



    function setUsers(user) {
        users = user;
        sessionStorage.setItem('users', JSON.stringify(users));
    }

    function getUsersFromServer(){
        fetch(URL)
        .then(response => response.json())
        .then(data => setUsers(data))
        .catch(error => console.log(error))
    }

    function loadUsers(){
        const storageUsers = sessionStorage.getItem('users');
        if(storageUsers){
            setUsers(JSON.parse(storageUsers));
        } else {
            getUsersFromServer();
        }
    }

    onMounted(() => {
        loadUsers();
    });

</script>

<template>
    <div>
        <div v-if="loads">
            <Spinner />

        </div>
        <div v-else >
            <div class="top-menu">
                <h1>Users</h1>
                <div class="userLink">
                    <button @click="router.push('/users/newUser')">Add New</button>
                </div>
            </div>
            <table class="userTable">
                <tr>
                    <th scope="col">NAME</th>
                    <th scope="col">CODE</th>
                </tr>
                    <tr v-for="user in users" :key="user.code">
                        <td>{{ user.name }}</td>
                        <td>{{ user.code }}</td>
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
    display: inline-block;
    top: 20px;
    left: 30px;
}


    .userTable {
        left: 220px;
        top: 90px;
        width: 80vw;
        text-align: left;
        border-collapse: collapse;
        position: relative;
    }

    .userTable td, th {
        border-bottom: 1px solid #e9ecee;
        padding: 20px;
    }

    .userLink {
        display: inline-block;
        position: relative;
        margin-left: 70%;
        top: 15px;
    }

    .userLink button {
        border-radius: 20px;
        padding: 7px 15px;
    }
    .userLink button:hover {
        cursor: pointer;
    }

    @media screen and (max-width: 1300px) {
        .userLink {
            margin-left: 50%;
        }
    }

    @media screen and (max-width: 920px) {
        .top-menu {
            margin-left: 150px;
            padding-bottom: 15px;
        }

        .top-menu h1 {
            font-size: 1.2em;
        }

        .userTable th, .userTable td {
            font-size: 0.8em;
        }

        .userTable td {
            padding-left: 60px;
            padding-right: 20px;
        }

        .userTable th {
            padding-left: 40px;
        }

        .userTable {
            left: 120px;
            top: 60px;
        }

        .userLink {
            margin-left: 20%;
        }

    }

    @media screen and (max-width: 470px) {
        .top-menu {
            margin-left: 80px;
            padding-bottom: 15px;
        }

        .top-menu h1 {
            font-size: 1em;
            left: 10px;
        }

        .userTable {
            left: 50px;
        }

        .userLink button{
            font-size: 0.6em;
        }

    }

    @media screen and (max-width: 470px) {
        .top-menu h1 {
            left: 5px;
        }

        .userLink {
            margin-left: 10%;
        }

    }


</style>