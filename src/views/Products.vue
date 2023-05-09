<script setup>
    import {useRoute} from "vue-router"
    import {ref, watch, onMounted, computed} from "vue"
    import Spinner from "../components/Spinner.vue"

    const URL = "/data/products.json";
    const loads = ref(true);
    let products = ref([]);
    const isChecked = ref(false);

    const setSpinnerFalse = () => {
        loads.value = false;
    }
    const runSpinner = () => {
        setTimeout(setSpinnerFalse, 1000);
    }

    watch(loads, runSpinner());

    const isCheckedClass = computed(() => {
        return isChecked.value ? 'checked' : '';
    });

    
    function toggleChecked(index) {
        products.value[index].isChecked = !products.value[index].isChecked;
    }

    function setProducts(product) {
        products.value = product;
        products.value = products.value.map((product) => {
            if (!product.hasOwnProperty('isChecked')) {
                product.isChecked = false;
            }
        return product;
        });
        sessionStorage.setItem('products', JSON.stringify(products.value));
    }

    function getProductsFromServer(){
        fetch(URL)
        .then(response => response.json())
        .then(data => setProducts(data))
        .catch(error => console.log(error))
    }

    function loadProducts(){
        const storageProducts = sessionStorage.getItem('products');
        if(storageProducts){
            setProducts(JSON.parse(storageProducts));
        } else {
            getProductsFromServer();
        }
    }

    onMounted(() => {
        loadProducts();
    });


    function deleteProductFun() {
        const checkedProducts = products.value.filter((product) => product.isChecked);
        if (checkedProducts.length === 1) {
            if (confirm("Are you sure you want to delete this product?")) {
                products.value = products.value.filter(product => !product.isChecked);
                sessionStorage.setItem("products", JSON.stringify(products.value));
            }
        } else if (checkedProducts.length > 1) {
            alert("Please choose only one product");
        } else {
            alert("Please choose one product");
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
                <h1>Products</h1>
                <div class="deleteProduct">
                    <button @click="deleteProductFun">Delete</button>
                </div>
            </div>
            <table class="productsTable">
                <tr>
                    <th scope="col" class="leftColTitle">CODE</th>
                    <th scope="col" class="rightColTitle">DESCRIPTION</th>
                </tr>
                <tr
                v-for="(product, index) in products"
                :key="product.code"
                :class="{ checked: product.isChecked }"
                class="productsList"
                >
                <td>
                    <input
                    type="checkbox"
                    name="productBox"
                    :id="`productBox_${product.code}`"
                    :checked="product.isChecked"
                    @click="toggleChecked(index)"
                    />
                    <label :for="`productBox_${product.code}`">{{ product.code }}</label>
                </td>
                <td>{{ product.name }}</td>
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
    display: inline-block;
}


    .deleteProduct {
        display: inline-block;
        position: relative;
        left: 60%;
        top: 15px;
    }

    .deleteProduct button {
        border-radius: 20px;
        padding: 7px 15px;
    }
    .deleteProduct button:hover {
        cursor: pointer;
    }


    .productsTable {
        top: 80px;
        left: 150px;
        border-collapse: collapse;
        position: relative;
        width: 80%;
    }

    .productsTable td {
        border-bottom: 1px solid #e9ecee;
        padding: 20px 100px;
        text-align: left;
    }
    
    .productsTable th {
        border-bottom: 1px solid #e9ecee;
        padding-bottom: 20px;
        padding-top: 30px;
    }




    .rightColTitle {
        position: relative;
        right:14%;
    }

    .leftColTitle {
        position: relative;
        right: 14%;
    }

    .checked {
        background-color: #e9ecee;
    }

    @media screen and (max-width: 1100px) {
        .deleteProduct {
            left: 40%;
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

        .productsTable th, .productsTable td {
            font-size: 0.8em;
        }

        .productsTable td {
            padding-left: 60px;
            padding-right: 20px;
        }

        .productsTable {
            left: 120px;
            top: 60px;
        }

        .deleteProduct {
            left: 10%;
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

        .productsTable {
            left: 50px;
        }

        .deleteProduct button{
            font-size: 0.6em;
        }

        .productsTable th {
            padding-left: 10px;
        }

    }

    @media screen and (max-width: 270px) {
        .top-menu h1 {
            left: 5px;
        }

        .deleteProduct {
            left: 10px;
        }

    }




</style>