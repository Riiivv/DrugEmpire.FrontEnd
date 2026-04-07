import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Category } from './category/category';
import { Contact } from './contact/contact';
import { About } from './about/about';
import { Login } from './login/login';
import { Register } from './register/register';
import { CategoryDetails } from './category-details/category-details';
import { Cart } from './cart/cart';
import { MyOrders } from './my-orders/my-orders';



export const routes: Routes = [
    { path: '', component: Home, title: 'Forside'},
    { path: 'login', component: Login, title: 'Login'},
    { path: 'register', component: Register, title: 'Register'},
    { path: 'cart', component: Cart, title: 'Cart' },
    { path: 'my-orders', component: MyOrders },
    { path: 'home', component: Home, title: 'Forside'},
    { path: 'category', component: Category, title: 'Category'},
    { path: 'category/:name', component: CategoryDetails, title: 'Category Details'},
    { path: 'contact', component: Contact, title: 'Contact'},
    { path: 'about', component: About, title: 'About'},
    { path: '**', redirectTo: ''},
];
