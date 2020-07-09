Date.prototype.format = function(fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

function dateFormat(fmt, date) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(), // 年
        "m+": (date.getMonth() + 1).toString(), // 月
        "d+": date.getDate().toString(), // 日
        "H+": date.getHours().toString(), // 时
        "M+": date.getMinutes().toString(), // 分
        "S+": date.getSeconds().toString() // 秒
            // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}


var registration = {
    template: `
    <div id="app">

        <el-container v-show="!isshow">
            <el-main style=" text-align: center;">
                <el-rate
                   
                    :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
                </el-rate>
            </el-main>
           
        </el-container>

        <el-container style="height: 500px; border: 1px solid #eee"  v-loading="iszj" v-show="isshow">

            <!-- 顶部内容 -->
            <el-header>
                <!-- 步骤条 -->
                <el-steps :active="active" ple align-center>
                    <el-step title="选择科室"></el-step>
                    <el-step title="选择科室和医生"></el-step>

                    <el-step title="完成挂号"></el-step>
                </el-steps>
            </el-header>
            <!-- 顶部内容结束 -->
            <el-container>
                <!-- 侧边栏 -->
               
                <el-aside width="200px">
                <el-scrollbar style="height:398px;width:150px" class="scrollbar_df">
                        <el-menu width="150px" default-active="1" class="el-menu-vertical-demo" @select="selectOK" @open="handleOpen" @close="handleClose">
                        
                            <el-submenu :index="li.id+''" v-for="li in deptdata">
                                <template slot="title">
                                    <i class="el-icon-location"></i>
                                    <span>{{li.name}}</span>
                                </template>
                                <el-menu-item :index="li.id+'-'+lime.id"  v-for="lime in li.subdept">{{lime.name}}</el-menu-item>
                            </el-submenu>
                        
                          
                        </el-menu>
                        </el-scrollbar>
                </el-aside>
                
                <!-- 侧边栏结束 -->
                <el-main >

                   
                    <el-tabs :stretch="true" value="date" v-if="active>=1"  @tab-click="bodyhandleClick"  >
                       
                        <el-tab-pane label="按日期预约" name="date">
                            <el-scrollbar style="height:348px;width:100%;overflow-x: none;">
                            <!-- 时间标签  {{ data.day == now[0] && page.date == null? '✔️' : ''}}-->
                            <el-calendar :range="now" :first-day-of-week="day" >
                                <template slot="dateCell" slot-scope="{date, data}">
                                    <p :class="data.isSelected ? 'is-selected' : ''">
                                        {{ data.day.split('-').slice(1).join('-') }}
                                        {{data.isSelected ? getdateysdata(page.dept,data.day):''}}
                                        {{ data.isSelected ? '✔️' : ''}}
                                       
                                      <br>
                                      <!-- 中间可以添加方法  {{dealMyDate(data.day)}} -->
                                    
                                      
                                    </p>
                                  </template>
                            </el-calendar>
                            <el-table height="250" @row-click="setreg" :data="dateysdata.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())  || data.title.toLowerCase().includes(search.toLowerCase()) )" style="width: 100%">
                                <el-table-column label="名称" prop="name">
                                </el-table-column>
                                <el-table-column label="年龄" prop="age">
                                </el-table-column>
                                <el-table-column label="级别" prop="title">
                                </el-table-column>
                                <el-table-column label="诊费" prop="fee">
                                </el-table-column>
                                <el-table-column align="right">
                                    <template slot="header" slot-scope="scope">
                                        <el-input v-model="search" size="mini" placeholder="输入名字查询医生"  />
                                    </template>
                                    <template slot-scope="scope">
                                        <el-button type="primary"  >挂号</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            </el-scrollbar>
                        </el-tab-pane>
                        
                        <el-tab-pane label="按专家预约" name="second"  >
                            <el-scrollbar style="height:348px;width:100%;overflow-x: none;" >
                                <el-table @row-click="setdeptret" :data="ysdata.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())  || data.title.toLowerCase().includes(search.toLowerCase()) )" style="width: 100%">
                                <el-table-column label="名称" prop="name">
                                </el-table-column>
                                <el-table-column label="年龄" prop="age">
                                </el-table-column>
                                <el-table-column label="级别" prop="title">
                                </el-table-column>
                                <el-table-column label="诊费" prop="fee">
                                </el-table-column>
                                <el-table-column align="right">
                                    <template slot="header" slot-scope="scope">
                                        <el-input v-model="search" size="mini" placeholder="输入名字查询医生"/>
                                    </template>
                                    <template slot-scope="scope">
                                        <el-button type="primary">查看</el-button>
                                    </template>
                                </el-table-column>
                                </el-table>
                            </el-scrollbar>
                        
                       
                        </el-tab-pane>
                        
                    </el-tabs>
                    <el-dialog   title="进行挂号"
                    :visible.sync="dialogVisible"
                    width="30%"  :before-close="handleClose">
                    <el-tabs value="first"  @tab-click="handleClick" :stretch="true">

                        <el-dialog
                        width="30%"
                        title="确认付款"
                        :visible.sync="innerVisible"
                        append-to-body >
                        <el-form >
                            
                            <el-form-item label="挂号编号:" label-width="120px">
                                {{reginfo.id}}
                            </el-form-item>
                            <el-form-item label="挂号人姓名:" label-width="120px">
                                {{reginfo.name}}
                            </el-form-item>
                            <el-form-item label="创建时间:" label-width="120px">
                            {{reginfo.time}}
                            </el-form-item>
                            <el-form-item label="挂号时间:" label-width="120px">
                            	{{reginfo.date}}
                            </el-form-item>
                            <el-form-item label="挂号金额:" label-width="120px">
                                <b style="color:#f00">
                                ￥{{reginfo.fee}}
                                </b>
                            
                            </el-form-item>
                        </el-form >
                        <span slot="footer" class="dialog-footer">
                                <el-button @click="close">取 消</el-button>
                                <el-button type="primary" @click="updateReg(reginfo.data)">确认付款</el-button>
                         </span>
	                    </el-dialog>

                        <el-tab-pane label="为自己挂号" name="first"   @tab-click="form.is=true">
                            <el-form >
                                <el-form-item label="挂号日期" label-width="120px">
                                    {{page.date}}
                                </el-form-item>
                                <el-form-item label="挂号时间" label-width="120px">
                                    <el-time-picker
                                        v-model="form.date2"
                                        :picker-options="{
                                        selectableRange: '08:00:00 - 20:30:00'
                                        }"
                                        placeholder="选择时间">
                                    </el-time-picker>
                                </el-form-item>
                                <el-form-item label="手机码号" label-width="120px">
                                    <el-input v-model="form.phone"  ></el-input>
                                </el-form-item>
                                <el-form-item label="挂号金额" label-width="120px">
                                        ￥{{form.fee}}
                                </el-form-item>
                            </el-form>
                            
                        </el-tab-pane>
                        <el-tab-pane label="为他人挂号" name="second"  >
                        <el-scrollbar style="height:348px;width:100%;overflow-x: none;">
                            <el-form >
                                <el-form-item label="挂号人姓名" label-width="120px">
                                    <el-input v-model="form.name"  ></el-input>
                                </el-form-item>
                                <el-form-item label="挂号人民族" label-width="120px">
                                    <el-input v-model="form.nation"  ></el-input>
                                </el-form-item>
                                <el-form-item label="挂号人身份证" label-width="120px">
                                    <el-input v-model="form.card"  ></el-input>
                                </el-form-item>
                                    <el-form-item label="挂号人性别" label-width="120px">
                                    <template>
                                        <el-radio v-model="form.sex" label="男">男</el-radio>
                                        <el-radio v-model="form.sex" label="女">女</el-radio>
                                    </template>
                                 </el-form-item>
                                
                                <el-form-item label="挂号时间" label-width="120px">
                                    <el-time-picker
                                        v-model="form.date2"
                                        :picker-options="{
                                        selectableRange: '08:00:00 - 20:30:00'
                                        }"
                                        placeholder="选择时间">
                                    </el-time-picker>
                                </el-form-item>
                                <el-form-item label="手机码号" label-width="120px">
                                    <el-input v-model="form.phone"  ></el-input>
                                </el-form-item>
                                <el-form-item label="挂号金额" label-width="120px">
                                        ￥{{form.fee}}
                                </el-form-item>
                            </el-form>
                        
                            </el-scrollbar>
                        </el-tab-pane>
                       
                    </el-tabs>
                    
                    
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="close">取 消</el-button>
                        <el-button type="primary" @click="postReg">挂 号 </el-button>
                    </span>
                    </el-dialog>

                    <el-dialog   title="进行挂号"
                    :visible.sync="dialogVisibledept"
                    width="30%"  :before-close="handleClose">
                    <el-tabs value="first"  @tab-click="handleClick" :stretch="true">

                        <el-dialog
                        width="30%"
                        title="确认付款"
                        :visible.sync="innerVisibledept"
                        append-to-body >
                        <el-form >
                            
                            <el-form-item label="挂号编号:" label-width="120px">
                                {{reginfo.id}}
                            </el-form-item>
                            <el-form-item label="挂号人姓名:" label-width="120px">
                                {{reginfo.name}}
                            </el-form-item>
                            <el-form-item label="创建时间:" label-width="120px">
                            {{reginfo.time}}
                            </el-form-item>
                            <el-form-item label="挂号时间:" label-width="120px">
                            	{{reginfo.date}}
                            </el-form-item>
                            <el-form-item label="挂号金额:" label-width="120px">
                                <b style="color:#f00">
                                ￥{{reginfo.fee}}
                                </b>
                            
                            </el-form-item>
                        </el-form >
                        <span slot="footer" class="dialog-footer">
                                <el-button @click="close">取 消</el-button>
                                <el-button type="primary" @click="updateReg(reginfo.data)">确认付款</el-button>
                         </span>
	                    </el-dialog>

                        <el-tab-pane label="为自己挂号" name="first"   @tab-click="form.is=true">
                            <el-form >
                                
                                <el-form-item label="挂号时间" label-width="120px">
                                        <el-date-picker
                                        v-model="form.date2"
                                        type="datetime"
                                        placeholder="选择日期时间"
                                        align="right"
                                        :picker-options="pickerOptions">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item label="手机码号" label-width="120px">
                                    <el-input v-model="form.phone"  ></el-input>
                                </el-form-item>
                                <el-form-item label="挂号金额" label-width="120px">
                                        ￥{{form.fee}}
                                </el-form-item>
                            </el-form>
                            
                        </el-tab-pane>
                        <el-tab-pane label="为他人挂号" name="second"  >
                        <el-scrollbar style="height:348px;width:100%;overflow-x: none;">
                            <el-form >
                                <el-form-item label="挂号人姓名" label-width="120px">
                                    <el-input v-model="form.name"  ></el-input>
                                </el-form-item>
                                <el-form-item label="挂号人民族" label-width="120px">
                                    <el-input v-model="form.nation"  ></el-input>
                                </el-form-item>
                                <el-form-item label="挂号人身份证" label-width="120px">
                                    <el-input v-model="form.card"  ></el-input>
                                </el-form-item>
                                    <el-form-item label="挂号人性别" label-width="120px">
                                    <template>
                                        <el-radio v-model="form.sex" label="男">男</el-radio>
                                        <el-radio v-model="form.sex" label="女">女</el-radio>
                                    </template>
                                 </el-form-item>
                                
                                <el-form-item label="挂号时间" label-width="120px">
                                    
                                    <el-date-picker
                                        v-model="form.date2"
                                        type="datetime"
                                        placeholder="选择日期时间"
                                        align="right"
                                        :picker-options="pickerOptions">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item label="手机码号" label-width="120px">
                                    <el-input v-model="form.phone"  ></el-input>
                                </el-form-item>
                                <el-form-item label="挂号金额" label-width="120px">
                                        ￥{{form.fee}}
                                </el-form-item>
                            </el-form>
                        
                            </el-scrollbar>
                        </el-tab-pane>
                       
                    </el-tabs>
                    
                    
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="close">取 消</el-button>
                        <el-button type="primary" @click="postdeptReg">挂 号 </el-button>
                    </span>
                    </el-dialog>
                    
                  <!--
                    <button @click="active != 3 ? active++:active ">下一步</button>
                    <button @click="active != 0 ? active--:active ">返回上一步</button>
                    -->
                    <el-dialog   title="登录" :visible.sync="islogin"
                    width="30%"  :before-close="handleClose">
                        sadfasdlfjlk
                    </el-dialog>
                </el-main>
            </el-container>
        </el-container>
    </div>
    
    `,
    data() {
        return {
            // 登录信息
            islogin: false,
            //  是否显示内容
            isshow: false,

            // 用于显示星期
            weekinfo: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期天"],
            // 用于保存当前时间显示
            dateActive: 1,
            // 页面的科室信息
            subment: 1,
            // 步骤条的位置
            active: 0,
            // 加载信息
            iszj: true,
            // 查询医生的数据
            search: "",
            deptdata: [],
            // 直接医生数据
            ysdata: [],
            // 选择时间的医生数据
            dateysdata: [],
            dialogVisibledept: false,
            // 子模态框显示
            innerVisibledept: false,
            // 是否显示弹出框
            dialogVisible: false,
            // 子模态框显示
            innerVisible: false,
            //  保存页面中的信息
            page: {},
            form: {},
            reginfo: {},
            // 当前显示的时间
            now: [],

            day: new Date().getDay(),
            pickerOptions: {
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                        picker.$emit('pick', new Date());
                    }
                }, {
                    text: '明天',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() + 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                    }
                }, {
                    text: '两天后',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() + 3600 * 1000 * 24 * 2);
                        picker.$emit('pick', date);
                    }
                }, {
                    text: '一周后',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                    }
                }]
            },
            resDate: [{
                "date": "2020-07-01",
                "content": "放假"
            }, {
                "date": "2020-07-03",
                "content": "去交电费"
            }, {
                "date": "2020-06-28",
                "content": "去学习vue"
            }]
        }

    },
    created() {
        this.initDate();
        console.log("created");
    },
    beforeMount() {
        console.log("beforeMount");
    },
    mounted() {
        console.log("mounted");
    },
    methods: {
        // 模态框中tabs切换事件
        handleClick(tab, event) {
            if (tab.name == 'first') {

                this.form.is = true;
            } else {

                this.form.is = null;
            }
        },
        // 主体tabs切换事件
        bodyhandleClick(tab, event) {

            if (tab.name == 'date') {
                // this.iszj = true;
                // this.getdateysdata(this.page.dept, this.page.date);
            } else {
                // this.getdeptid(this.page.dept);
            }
        },
        // 初始化方法
        initDate() {

            let str = localStorage.getItem("token")
            console.log(str);
            //localStorage.removeItem("token");
            // 判断koken是否有值
            if (localStorage.getItem("token") == null) {
                this.$message('未登录');
                return;
            }
            //{ headers: { 'token': Cookies.get('token'), 'platform': 'web' } }
            axios.get("/reg/dept", {}, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") } })
                .then(res => {
                    console.log(res);
                    this.deptdata = res.data;
                    this.iszj = false;
                    this.dialogVisible = false;
                })
                .catch(err => {
                    console.error(err);
                });
            this.getDate();
            this.$message('登录成功！！');
            this.isshow = true;
        },

        // 下一个事件
        next() {
            if (this.active++ > 2) this.active = 0;
        },
        // 导航栏点击事件
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
            console.log("123123");
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);

        },
        // 科室的点击事件
        selectOK(key, keyPath) {
            console.log(key, keyPath);
            this.active = 2;
            // 进去进入加载状态
            this.iszj = true;
            let da = key.split('-');
            console.log(da);
            this.page.dept = da[1];
            this.getdeptid(da[1]);
            this.getdateysdata(da[1], this.page.date);
        },
        // 传入子科室id得到医生
        getdeptid(i) {
            axios.get("reg/dept/" + i, {}, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") } })
                .then(res => {
                    console.log(res);
                    this.ysdata = res.data;
                    // 取消加载状态
                    this.iszj = false;
                })
                .catch(err => {
                    console.error(err);
                    this.iszj = false;
                })
        },
        // 从服务器获取时间
        getDate() {
            axios.get('reg/date', {}, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") } })
                .then(res => {
                    console.log(res);
                    this.now[0] = res.data.startdate;
                    this.now[1] = res.data.tailDate;
                    console.log("adfasdf");
                    console.log(this.now);
                })
                .catch(err => {
                    console.error(err);
                })
        },
        // 通过科室和时间
        getdateysdata(k, d) {

            this.iszj = true;
            // p判断是否为空
            if (d == null) {
                console.log("d为空");
                d = this.now[0];
            }
            // 页面上的科室信息
            this.page.date = d;
            axios.get(`reg/doct/${k}?d=${d}`, {}, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") } })
                .then(res => {
                    console.log(res);
                    this.dateysdata = res.data;
                    // 取消加载状态
                    this.iszj = false;
                })
                .catch(err => {
                    console.error(err);
                })
            console.log(k);
            console.log(d);
        },
        // 进行挂号
        setreg(doct) {
            console.log(doct);
            this.form.fee = doct.fee + 0.0;
            this.form.doct = doct.id;
            this.form.is = true; // 为自己挂号
            this.dialogVisible = true;
        },
        setdeptret(doct) {
            console.log(doct);
            this.form.fee = doct.fee + 0.0;
            this.form.doct = doct.id;
            this.form.is = true; // 为自己挂号
            this.dialogVisibledept = true;
        },
        postReg() {
            if (this.form.phone == null || this.form.date2 == null) {
                this.$message({
                    message: '信息没有输入',
                    type: 'warning'
                });
                return;
            }
            //
            if (this.form.is == null) {
                if (this.form.name == null || this.form.sex == null || this.form.card == null || this.form.nation == null) {
                    this.$message({
                        message: '信息没有输入',
                        type: 'warning'
                    });
                    return;
                }
            }
            this.form.date = this.page.date + ' ' + dateFormat("HH:MM:SS", this.form.date2);
            this.form.time = dateFormat("YYYY-mm-dd HH:MM:SS", new Date());
            console.log(this.form.time);
            axios.post("/reg", this.form, {
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") }
                })
                .then(res => {
                    console.log(res.data.info)


                    // this.form = {};
                    // this.dialogVisible = false;
                    if (res.data.operation == "ok") {
                        this.innerVisible = true;
                        this.reginfo = res.data.content;
                        this.reginfo.data = {
                            id: this.reginfo.id,
                            type: 1
                        }
                    } else {
                        this.$message({
                            message: res.data.info,
                            type: 'warning'
                        });
                    }

                })
                .catch(err => {
                    console.error(err);
                })

        },
        postdeptReg() {
            if (this.form.phone == null || this.form.date2 == null) {
                this.$message({
                    message: '信息没有输入',
                    type: 'warning'
                });
                return;
            }
            //
            if (this.form.is == null) {
                if (this.form.name == null || this.form.sex == null || this.form.card == null || this.form.nation == null) {
                    this.$message({
                        message: '信息没有输入',
                        type: 'warning'
                    });
                    return;
                }
            }
            this.form.date = dateFormat("YYYY-mm-dd HH:MM:SS", this.form.date2);
            this.form.time = dateFormat("YYYY-mm-dd HH:MM:SS", new Date());
            console.log(this.form.time);
            axios.post("/reg", this.form, {
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") }
                })
                .then(res => {
                    console.log(res.data.info)


                    // this.form = {};
                    // this.dialogVisible = false;
                    if (res.data.operation == "ok") {
                        this.innerVisibledept = true;
                        this.reginfo = res.data.content;
                        this.reginfo.data = {
                            id: this.reginfo.id,
                            type: 1
                        }
                    } else {
                        this.$message({
                            message: res.data.info,
                            type: 'warning'
                        });
                    }

                })
                .catch(err => {
                    console.error(err);
                })

        },
        // 关闭窗口
        close() {
            this.form = {};
            this.reginfo = {};
            this.dialogVisible = false;
            this.innerVisible = false;
            this.dialogVisibledept = false;

            this.innerVisibledept = false;
        },
        // 修改挂号状态信息
        updateReg(data) {
            axios.put(`/reg/state/${data.id}?t=${data.type}`, {}, {
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") }
                })
                .then(res => {

                    if (res.data.operation == "ok") {
                        this.$message({
                            message: '挂号成功',
                            type: 'warning'
                        });
                        this.active++;
                    }
                    // 关闭窗口
                    this.close();

                    //console.log(res)
                })
                .catch(err => {
                    console.error(err);
                })
        },
        // 日历的备注信息
        dealMyDate(v) {
            console.log(v)
            let len = this.resDate.length
            let res = ""
            for (let i = 0; i < len; i++) {
                if (this.resDate[i].date == v) {
                    res = this.resDate[i].content
                    break
                }
            }
            return res
        }
    }
}