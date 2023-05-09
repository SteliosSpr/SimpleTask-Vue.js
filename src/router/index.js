import {createRouter, createWebHistory} from "vue-router"
import Home from "../views/Home.vue"
import Customers from "../views/Customers.vue"
import Products from "../views/Products.vue"
import Users from "../views/Users/Users.vue"
import NewUser from "../views/Users/NewUser.vue"
import UsersList from "../views/Users/UsersList.vue"

const router = createRouter ({
    history : createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/customers",
            name: "customers",
            component: Customers
        },
        {
            path: "/products",
            name: "products",
            component: Products
        },
        {
            path: "/users",
            name: "users",
            component: Users,
            children: [
                {
                    path: "",
                    name: "",
                    component: UsersList
                },
                {
                    path: "newUser",
                    name: "newUser",
                    component: NewUser

                }

                
        

            ]
        }

    ]
})

export default router