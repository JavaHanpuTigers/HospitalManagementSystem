// 主界面的组件
let index = {
        template: `
            <div>
                 <h3 style="text-align:center;margin-right:30px;">欢迎使用医院管理系统</h3><br>
            	<el-carousel :interval="4000" type="card" height="200px">
                <el-carousel-item v-for="item in imgs" :key="item">
                    <img :src="item" alt="图片" style="width: 400px;height: 200px;">
                </el-carousel-item>
        		</el-carousel>
            	<div style="background:url('images/hope.jpg') no-repeat 4px 5px;
                            width: 639px;
                            height: 300px;margin-left:70px;border:1px blue solid">
        		</div>
            </div>
        `,
        data() {
            return {
                imgs: ['images/yy1.jpg',
                    'images/yy2.jpg',
                    'images/yy3.jpg',
                    'images/yy4.jpg',
                    'images/yy5.jpg',
                    'images/yy6.jpg'
                ]
            }
        }
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
let userregit = {
    template: `
             <div>
                这里是注册界面
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
            path: '/userregit',
            component: userregit
        }, {
            path: '/user',
            component: registration
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
            path: '/staff',
            component: staff,
            children: [{
                path: '/',
                component: checkStaff
            }, {
                path: 'addStaff',
                component: addStaff
            }, {
                path: 'checkStaff',
                component: checkStaff
            }]

        }, {
            path: '/dept',
            component: dept,
            children: [{
                path: '/',
                component: checkDept
            }, {
                path: 'addDept',
                component: addDept
            }, {
                path: 'checkDept',
                component: checkDept
            }]
        }, {
            path: '/scheduling',
            component: scheduling,
            children: [{
                path: '/',
                component: checkScheduling
            }, {
                path: 'addScheduling',
                component: addScheduling
            }, {
                path: 'checkScheduling',
                component: checkScheduling
            }]

        }, {
            path: '/other',
            component: other
        }
    ]
})