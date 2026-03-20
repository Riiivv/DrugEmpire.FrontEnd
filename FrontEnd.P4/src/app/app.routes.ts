import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Category } from './category/category';
import { Contact } from './contact/contact';
import { About } from './about/about';
import { Login } from './login/login';
import { Register } from './register/register';
import { CategoryDetails } from './category-details/category-details';



export const routes: Routes = [
    { path: '', component: Home, title: 'Forside'},
    { path: 'login', component: Login, title: 'Login'},
    { path: 'register', component: Register, title: 'Register'},
    { path: 'home', component: Home, title: 'Forside'},
    { path: 'category', component: Category, title: 'Category'},
    { path: 'category/:name', component: CategoryDetails, title: 'Category Details'},
    { path: 'contact', component: Contact, title: 'Contact'},
    { path: 'about', component: About, title: 'About'},
    { path: '**', redirectTo: ''},
];
