import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { About } from './features/about/about';
import { Login } from './features/auth/login/login';
import { Signup } from './features/auth/signup/signup';
import { Dashboard } from './features/dashboard/dashboard';
import { Profile } from './features/dashboard/components/profile/profile';
import { Products } from './features/dashboard/components/products/products';
import { Users } from './features/dashboard/components/users/users';
import { Chat } from './features/dashboard/components/chat/chat';
import { NotFound } from './shared/components/not-found/not-found';
import { authGuard } from './core/guards/auth-guard';
import { userResolver } from './core/resolvers/user-resolver';
import { productResolver } from './core/resolvers/product-resolver';
import { chatResolver } from './core/resolvers/chat-resolver';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'about', component: About },
    { path: 'login', component: Login },
    { path: 'signup', component: Signup },

    {
        path: 'dashboard',
        component: Dashboard,
        canActivate: [authGuard],
        resolve: { user: userResolver },
        children: [
            {
                path: '',
                redirectTo: 'profile',
                pathMatch: 'full'
            },
            {
                path: 'profile',
                component: Profile
            },
            {
                path: 'products',
                component: Products,
                resolve: { products: productResolver }
            },
            {
                path: 'users',
                component: Users
            },
            {
                path: 'chat',
                component: Chat,
                resolve: { chats: chatResolver }
            }
        ]
    },

    { path: '**', component: NotFound }
];
