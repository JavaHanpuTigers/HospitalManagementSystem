// 主界面的组件
let index = {
        template: `
            <div>
                 欢迎使用医院管理系统
                <div style="background:url('images/hope.jpg') no-repeat 4px 5px;
                            width: 639px;
                            height: 300px;">
                </div>
            </div>
        `
    }
    // 用户信息组件
let userinfo = {
        template: `
            <div>
                 在这里查看或者修改你的用户信息
            </div>
    `
    }
    // 用户设置组件
let userset = {
        template: `
            <div>
                 在这里进行你的账户设置
            </div>
    `
    }
    // 注销账号组件
let useredit = {
    template: `
             <div>
                账户注销
            </div>
    `
}

// 主界面暂时使用的组件路由
let user = {
    template: `
            <div>
                 这里您可以进行挂号服务
            </div>
        `
}
let doctor = {
    template: `
            <div>
                 医生可以叫病人啦
            </div>
        `
}
let person = {
    template: `
            <div>
                 在这里可以进行员工管理
            </div>
        `
}
let other = {
        template: `
            <div>
                 未开发的模块....
            </div>
        `
    }
    // 新建路由
const router = new VueRouter({
    routes: [{
            path: '/',
            component: index
        }, {
            path: '/userinfo',
            component: userinfo
        }, {
            path: '/userset',
            component: userset
        }, {
            path: '/useredit',
            component: useredit
        }, {
            path: '/user',
            component: user
        },
        {
            path: '/call',
            component: call
        }, {
            path: '/prescribe',
            component: prescribe
        }, {
            path: '/prescriptionRecords',
            component: prescriptionRecords
        }, {
            path: '/lookAppointment',
            component: lookAppointment
        }, {
            path: '/person',
            component: person
        }, {
            path: '/other',
            component: other
        }
    ]
})