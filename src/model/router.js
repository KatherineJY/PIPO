import Home from '../components/Home'
import Invest from '../components/Invest'
import InvestIntroduction from '../components/Invest/InvestIntroduction'
import IssueIntroduction from '../components/Issue/IssueIntroduction'
import PipoDetial from '../components/PipoDetail'

import Issue from '../components/Issue'
import IssueMain from '../components/Issue/IssueMain'
import InvestMain from '../components/Invest/InvestMain'
import Help from '../components/Help'
import AboutUs from '../components/AboutUs'
import Register from '../components/User/Register'
import UserCenter from '../components/UserCenter'
import Collection from '../components/UserCenter/Collection'
import Assets from '../components/UserCenter/Assets'

let routes = [
    {
        path: '/',
        title: 'HOME',
        component: Home,
        exact: true,
        inMenu: true,
    },
    {
        path: '/invest',
        title: 'INVEST',
        component: Invest,
        inMenu: true,
        routes: [
            {
                path: '/invest/',
                component: InvestIntroduction,
            },
            {
                path: '/invest/investMain',
                component: InvestMain,
            },
            {
                path: '/invest/pipoDetail',
                component: PipoDetial,
            }
        ]
    },
    {
        path: '/issue',
        title: 'ISSUE',
        component: Issue,
        inMenu: true,
        routes: [
            {
                path: '/issue/',
                component: IssueIntroduction,
            },
            {
                path: '/issue/issueMain',
                component: IssueMain,
            },
        ]
    },
    // {
    //     path: '/help',
    //     title: 'HELP',
    //     component: Help,
    //     inMenu: true,
    // },
    // {
    //     path: '/about',
    //     title: 'ABOUT US',
    //     component: AboutUs,
    //     inMenu: true,
    // },
    {
        path: '/register',
        component: Register,
    },
    {
        path:'/userCenter',
        component: UserCenter,
        routes: [
            {
                path:'/userCenter/collection',
                component: Collection
            },
            {
                path:'/userCenter/assets',
                component: Assets
            }
        ]
    }
]

export default routes;