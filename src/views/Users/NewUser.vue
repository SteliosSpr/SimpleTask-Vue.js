<script setup>
    import {useRoute, RouterLink} from "vue-router"
    import {ref, watch, onMounted} from "vue"
    import Spinner from "../../components/Spinner.vue"


    const loads = ref(true);
    const nameInput = ref('');
    const codeInput = ref('');
    let storageUsers = ref([]);


    const setSpinnerFalse = () => {
        loads.value = false;
    }
    const runSpinner = () => {
        setTimeout(setSpinnerFalse, 1000);
    }

    watch(loads, runSpinner());


    function setUsers(user) {
        storageUsers = user;
        sessionStorage.setItem('users', JSON.stringify(storageUsers));
    }




    const createUserFun = () => {
        if (nameInput.value == '' || codeInput.value == '') {
            window.alert('Please fill in both Username and Password in order to create the User');
        } else {
            let newUserObject = {name: nameInput.value, code: codeInput.value}
            console.log(newUserObject);
            storageUsers = sessionStorage.getItem('users');
            setUsers(JSON.parse(storageUsers));
            storageUsers.unshift(newUserObject);
            sessionStorage.setItem('users', JSON.stringify(storageUsers));
            window.location.href = "/users"
        }
    }



</script>

<template>
    <div>
        <div v-if="loads">
            <Spinner />
        </div>
        <div v-else>
            <div class="top-menu">
                    <a href="/users">&#8592;</a>
                <h1>Add new user</h1>
                <div class="createUser">
                    <button id="createButton" @click="createUserFun()">Create</button>
                </div>
            </div>
            <div class="userForm">
                <label for="userName">Name:</label><br>
                <input type="text" name="userName" id="userName" v-model.trim="nameInput" required><br><br>
                <label for="userCode">Code:</label><br>
                <input type="number" name="userCode" id="userCode" v-model.trim="codeInput" required>
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
    display: inline-block;
    top: 20px;
    left: 30px;
}

    .createUser {
        display: inline-block;
        position: relative;
        top: 15px;
        left: 50%;
    }

    .createUser button {
        border-radius: 20px;
        padding: 7px 15px;
    }

    .createUser button:hover {
        cursor: pointer;
    }

    .top-menu a {
        display: inline-block;
        font-size: 2em;
        text-decoration: none;
        color: #000000;
        position: relative;
        top: 20px;
    }

    .userForm {
        margin-top: 170px;
        margin-left: 240px;
    }

    #userName {
        width: 80%;
        height: 40px;
        border-top: 0;
        border-left: 0;
        border-right: 0;
        border-color: #e9ecee;
        cursor: pointer;
    }

    #userCode {
        width: 80%;
        height: 40px;
        border-top: 0;
        border-left: 0;
        border-right: 0;
        border-color: #e9ecee;
        cursor: pointer;
    }

    .userTable {
        left: 220px;
        top: 120px;
        width: 80vw;
        text-align: left;
        border-collapse: collapse;
        position: relative;
    }

    .userTable td, th {
        border-bottom: 1px solid #e9ecee;
        padding: 20px;
    }

    @media screen and (max-width: 1060px) {
        .createUser {
            left: 30%;
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

        .userForm {
            margin-top: 120px;
        }
    }

    @media screen and (max-width: 760px) {
        .createUser {
            left: 10%;
        }

        .userForm {
            margin-left: 170px;
            margin-top: 120px;
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

        .createUser button{
            font-size: 0.6em;
        }

        .userForm {
            margin-left: 80px;
        }

    }

    @media screen and (max-width: 470px) {
        .top-menu a {
            display: block;
        }

        .createUser {
            display: block;
        }

        .top-menu h1 {
            left: 2px;
        }

        .userForm {
            margin-top: 150px;
        }

    }



</style>