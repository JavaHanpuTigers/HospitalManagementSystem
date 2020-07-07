// 主界面的组件
let index = {
        template: `
            <div>
            	<div class="infinite-list-wrapper" style="overflow:auto;height: 500px;width: 100%;">
	                 <h3 style="text-align:center;margin-right:30px;">欢迎使用医院管理系统</h3>
	            	<br><br>
	            	<el-carousel :interval="4000" type="card" height="200px">
	                <el-carousel-item v-for="item in imgs" :key="item">
	                    <img :src="item" alt="图片" style="width: 400px;height: 200px;">
	                </el-carousel-item>
	        		</el-carousel>
	        		<div class="hospital-info">
		                <p>医院建于1958年，国家卫生健康委委管医院，集医疗、教学、科研、预防、康复与保健为一体的综合性三甲医院。目前，在岗职工5883人。2019年，医院平均开放床位数2024张，期末实有床位数2057张。医院设有37个临床科室，10个医技科室。有34个博士点、1个临床博士后流动站。在岗博士生导师70人，中国科学院院士1人、中国工程院院士2人，国家千人计划1人，科技部创新领军人才青年领军1人，国家自然科学基金杰出青年基金获得者4人、科技部“973”首席科学家1人、教育部“长江学者特聘教授”2人，2人入选国家级“新世纪百千万人才工程”，青年千人计划1人，国家自然科学基金优秀青年科学基金获得者4人，卫生部突出贡献专家10人。</p>
		                <p> 医院以患者为中心创新举措，努力建设人民满意医院。重视人文关怀，关爱老年群体健康。2019年全面推行应用电子就医卡和门诊全预约就医。积极落实医改要求， 各项任务稳中求进。近年来医院管理水平和精细化程度不断提升，参与多个国家级重大项目和课题的研究，取得成果被政府相关管理部门所采纳。在临床路径、优质服务护理工程、对口支援、医联体建设、援藏援疆支边等方面发挥了国家级医院的作用。同时，医院还承担着国家重大活动的医疗保障工作，承担着重大突发事件的医疗救援任务。坚持精准帮扶策略，体现社会责任担当。2019年，出色完成了</p>
		                <p>70 周年庆祝活动、北京世界园艺博览会和第二届“一带一路”国际合作高峰论坛等各项医疗保障任务。先后派出专家团队为山西临汾山体滑坡、四川宜宾地震以及安徽蚌埠重大车祸提供医疗援助， 获得了各级主管部门的一致肯定。 　　　 作为全面建成小康社会和“十三五”规划收官之年， 2020已近半载，在后疫情新阶段， 我们将继续以“建设世界一流大学附属医院” 战略目标为指引，进一步加强党的领导， 在疫情防控常态化基础上，落实好现代医院管理制度和国家区域医疗中心建设试点工作要求；抓好疫情防控工作的前提下，积极有效推动复工复产。以“建设研究型医院”为抓手，推动医学科技创新，完善学科建设和人才培养机制，探索集团化管理新模式、新方法，确保医院持续稳定发展，为健康中国行动的实施贡献力量。</p>
	            	</div>
	            	<div style="background:url('images/hope.jpg') no-repeat 4px 5px;
	                            width: 639px;
	                            height: 300px;margin-left:70px;">
	        		</div>
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
    // 修改密码组件
let userinfo = {
        template: `
            <div>
                 	<div class="infinite-list-wrapper" style="overflow:auto;height: 500px;width: 100%;">         
	            	<h5>修改界面</h5><hr>
	            	<span style="color:red;margin-left:100px;">修改账户信息后，再次登录即生效!</span>
	            	<el-form label-width="80px" style="width:500px;">
	                <el-form-item label="用户名">
	                    <el-input maxlength="20" v-model="ruleForm.username"></el-input>
	                </el-form-item>
	                <el-form-item label="用户密码">
	                    <el-input v-model="ruleForm.password" maxlength="18" show-password placeholder="建议字母大小写区分+数字+符号"></el-input>
	                </el-form-item>
	                <el-form-item label="确认密码">
	                    <el-input show-password placeholder="请再次确认你的密码..." maxlength="18" v-model="ruleForm.again"></el-input>
	                </el-form-item>
	                	<el-row>
					  <el-col :span="12">
					  		<el-button type="primary" style="width:80%;margin-left:25px;">立即修改</el-button>
					  </el-col>
					  <el-col :span="12">
    						<el-button @click="resetForm()" style="width:80%;margin-left:25px;">重置</el-button>
					  </el-col>
					</el-row> 
	            	</el-form>
	        		</div>
            </div>
    `,data() {
            return {
                labelPosition: 'right',
                ruleForm: {
                    name: '',
                    sex: '',
                    age: '',
                    nation: '',
                    card: '',
                    username: '',
                    password: '',
                    again: ''
                }
            }
        },
        methods: {
            resetForm() {
                this.ruleForm = {
                    name: '',
                    sex: '',
                    age: '',
                    nation: '',
                    card: '',
                    username: '',
                    password: '',
                    again: ''
                }
            }
        }
    }
    // 用户帮助使用组件
let userset = {
        template: `
            <div>
                 <h5>用户使用手册</h5><hr>
                 【用户注册】:<br>
                   <div style="color:purple;">&nbsp;&nbsp;&nbsp;<span>用户可以注册属于自己的快捷账号，方便下次直接进入系统</span></div>
	        	 【忘记密码】:<br>
                   <div style="color:purple;">&nbsp;&nbsp;&nbsp;<span>用户忘记密码时，可以在首页填写实名信息，根据实名信息找回密码</span></div>
	        	 【修改密码】:<br>
	        	   <div style="color:purple;">&nbsp;&nbsp;&nbsp;<span>用户在登录后可直接通过原密码修改密码</span></div>
	        	 【挂号收费】:<br>
	        	   <div style="color:purple;">&nbsp;&nbsp;&nbsp;<span>用户可以在挂号收费一栏进行挂号面诊</span></div>
	        	 【实时天气】:<br>
	        	   <div style="color:purple;">&nbsp;&nbsp;&nbsp;<span>用户可以在系统中查看最近三天天气和当前气温等其他操作</span></div>
	        	 【医院相关】:<br>
	        	   <div style="color:purple;">&nbsp;&nbsp;&nbsp;<span>本系统不仅提供给患者，还有供本公司其他职工使用</span></div>
	        	 【注意事项】:<br>
	        	   <div style="color:purple;">&nbsp;&nbsp;&nbsp;<span>在使用系统的过程中如发现卡顿，代表是网络原因，是正常现象，如有其他使用不便请联系维护人员</span></div>
            </div>
    `
    }
    // 注册账号组件
let userregit = {
    template: `
             <div>
	               	<div class="infinite-list-wrapper" style="overflow:auto;height: 500px;width: 100%;">         
	            	<h5>注册界面</h5><hr>
	            	<span style="color:red;margin-left:100px;">请填写实名信息，方便医院登记!</span>
	            	<el-form label-width="80px" style="width:500px;">
	                <el-form-item label="姓名">
	                    <el-input maxlength="30" placeholder="提交后不可修改，请谨慎填写" v-model="ruleForm.name"></el-input>
	                </el-form-item>
	                <el-form-item label="年龄">
	                    <el-input maxlength="2" placeholder="提交后不可修改，请谨慎填写" v-model="ruleForm.sex"></el-input>
	                </el-form-item>
	                <el-form-item label="性别">
	                    <el-input maxlength="2" placeholder="提交后不可修改，请谨慎填写" v-model="ruleForm.age"></el-input>
	                </el-form-item>
	                <el-form-item label="民族">
	                    <el-input maxlength="10" placeholder="提交后不可修改，请谨慎填写" v-model="ruleForm.nation"></el-input>
	                </el-form-item>
	                <el-form-item label="身份证号">
	                    <el-input maxlength="18" placeholder="提交后不可修改，请谨慎填写" show-word-limit v-model="ruleForm.card"></el-input>
	                </el-form-item>
	                <el-form-item label="用户名">
	                    <el-input maxlength="20" v-model="ruleForm.username"></el-input>
	                </el-form-item>
	                <el-form-item label="用户密码">
	                    <el-input v-model="ruleForm.password" maxlength="18" show-password placeholder="建议字母大小写区分+数字+符号"></el-input>
	                </el-form-item>
	                <el-form-item label="确认密码">
	                    <el-input show-password placeholder="请再次确认你的密码..." maxlength="18" v-model="ruleForm.again"></el-input>
	                </el-form-item>
	                	<el-row>
					  <el-col :span="12">
					  		<el-button type="primary" style="width:80%;margin-left:25px;">立即注册</el-button>
					  </el-col>
					  <el-col :span="12">
    						<el-button @click="resetForm()" style="width:80%;margin-left:25px;">重置</el-button>
					  </el-col>
					</el-row> 
	            	</el-form>
	        		</div>
            </div>
    `,data() {
                return {
                    labelPosition: 'right',
                    ruleForm: {
                        name: '',
                        sex: '',
                        age: '',
                        nation: '',
                        card: '',
                        username: '',
                        password: '',
                        again: ''
                    }
                }
            },
            methods: {
                resetForm() {
                    this.ruleForm = {
                        name: '',
                        sex: '',
                        age: '',
                        nation: '',
                        card: '',
                        username: '',
                        password: '',
                        again: ''
                    }
                }
            }
}
// 忘记密码模块
let retrieve = {
        template: `
            <div>
                 <div class="infinite-list-wrapper" style="overflow:auto;height: 500px;width: 100%;">         
	            	<h5>修改界面</h5><hr>
	            	<span style="color:red;margin-left:100px;">只有填写正确的实名验证才可找回!</span>
	            	<el-form label-width="80px" style="width:500px;">
	                <el-form-item label="用户名">
	                    <el-input maxlength="20" v-model="ruleForm.username" placeholder="请输入你上一次使用的用户名"></el-input>
	                </el-form-item>
	                <el-form-item label="身份证号">
	                    <el-input v-model="ruleForm.card" maxlength="18" show-password placeholder="我们将根据实名信息找回"></el-input>
	                </el-form-item>
	                	<el-row>
					  <el-col :span="12">
					  		<el-button type="primary" style="width:80%;margin-left:25px;">立即找回</el-button>
					  </el-col>
					  <el-col :span="12">
    						<el-button @click="resetForm()" style="width:80%;margin-left:25px;">重置</el-button>
					  </el-col>
					</el-row> 
	            	</el-form>
	        		</div>
            </div>
        `,data() {
            return {
                labelPosition: 'right',
                ruleForm: {
                    name: '',
                    sex: '',
                    age: '',
                    nation: '',
                    card: '',
                    username: '',
                    password: '',
                    again: ''
                }
            }
        },
        methods: {
            resetForm() {
                this.ruleForm = {
                    name: '',
                    sex: '',
                    age: '',
                    nation: '',
                    card: '',
                    username: '',
                    password: '',
                    again: ''
                }
            }
        }
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
        },{
            path: '/retrieve',
            component: retrieve
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
            path: '/doct',
            component: doct,
            children: [{
                path: '/',
                component: viewDoct
            }, {
                path: 'viewDoct',
                component: viewDoct
            }, {
                path: 'addDoct',
                component: addDoct
            }]

        }, {
            path: '/dept',
            component: dept,
            children: [{
                path: '/',
                component: viewDept
            }, {
                path: 'viewDept',
                component: viewDept
            }, {
                path: 'addDept',
                component: addDept
            }]
        }, {
            path: '/subment',
            component: subment,
            children: [{
                path: '/',
                component: viewSubment
            }, {
                path: 'viewSubment',
                component: viewSubment
            }, {
                path: 'addSubment',
                component: addSubment
            }]
        }, {
            path: '/arge',
            component: arge,
            children: [{
                path: '/',
                component: viewArge
            }, {
                path: 'viewArge',
                component: viewArge
            }, {
                path: 'addArge',
                component: addArge
            }]

        }, {
            path: '/pant',
            component: pant

        }, {
            path: '/reg',
            component: reg

        }, {
            path: '/prescript',
            component: prescript

        },  {
            path: '/other',
            component: other
        }
    ]
})