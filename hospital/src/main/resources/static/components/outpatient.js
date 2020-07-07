//排队信息
let call = {
        props: {

        },
        data() {
            return {
                tableData: [
                    { id: 1, name: "谢心", sex: "女", age: 12, phone: '243543543', idcard: '3333333' },
                    { id: 1, name: "谢心", sex: "女", age: 12, phone: '243543543', idcard: '3333333' },
                    { id: 1, name: "谢心", sex: "女", age: 12, phone: '243543543', idcard: '3333333' },
                    { id: 1, name: "谢心", sex: "女", age: 12, phone: '243543543', idcard: '3333333' },
                    { id: 1, name: "谢心", sex: "女", age: 12, phone: '243543543', idcard: '3333333' },
                    { id: 1, name: "谢心", sex: "女", age: 12, phone: '243543543', idcard: '3333333' },
                    { id: 1, name: "谢心", sex: "女", age: 12, phone: '243543543', idcard: '3333333' },
                    { id: 1, name: "谢心", sex: "女", age: 12, phone: '243543543', idcard: '3333333' },
                    { id: 1, name: "谢心", sex: "女", age: 12, phone: '243543543', idcard: '3333333' },
                    { id: 1, name: "谢心", sex: "女", age: 12, phone: '243543543', idcard: '3333333' },
                    { id: 1, name: "谢心", sex: "女", age: 12, phone: '243543543', idcard: '3333333' },
                    { id: 1, name: "谢心", sex: "女", age: 12, phone: '243543543', idcard: '3333333' },
                    { id: 1, name: "谢心", sex: "女", age: 12, phone: '243543543', idcard: '3333333' },
                    { id: 1, name: "谢心", sex: "女", age: 12, phone: '243543543', idcard: '3333333' },
                    { id: 1, name: "谢心", sex: "女", age: 12, phone: '243543543', idcard: '3333333' },
                    { id: 1, name: "谢心", sex: "女", age: 12, phone: '243543543', idcard: '3333333' },
                ]
            }
        },
        methods: {

        },
        mounted() {

        },
        template: `<div>
	<el-container>
        <el-main>
            <span>排队信息</span>
            <el-divider></el-divider>
        <div>
            <el-row :gutter="5">
                <el-col :span="20"><div>
                    <el-table
                    :data="tableData"
                    height="350"
                    border
                    style="width: 551px">
                    <el-table-column
                    prop="id"
                    label="排名"
                    width="50">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="姓名"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    prop="sex"
                    label="性别"
                    width="50">
                    </el-table-column>
                    <el-table-column
                    prop="age"
                    label="年龄"
                    width="50">
                    </el-table-column>
                    <el-table-column
                    prop="phone"
                    label="电话"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    prop="idcard"
                    label="身份证号"
                    width="200">
                    </el-table-column>
                    </el-table>
                </div></el-col>
                <el-col :span="4"><div>
                    <span>值班进度:</span><br>
                    <el-progress type="circle" :percentage="25"></el-progress>
                </div></el-col>
                </el-row>
        </div>
        </el-main>
    </el-container>
	</div>`
    }
    //面诊
let prescribe = {
        data() {
            return {
                textarea: ''
            }
        },
        methods: {
            next() {
                this.$confirm('是否叫号下一位', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '已叫号 第2位!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            create() {
                this.$confirm('是否开处方单', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '已开单!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            }
        },
        template: `<div>
	<el-container>
        <el-main>
            <span>面诊</span>
            <el-button @click="next" style="float: right; padding: 3px 0" type="text">下一位</el-button><el-button @click="create" style="float: right; padding: 3px 0;" type="text">开处方</el-button>
            <el-divider></el-divider>
        <div>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<u>
            姓名: 谢心&nbsp;&nbsp;&nbsp;&nbsp;性别：女&nbsp;&nbsp;&nbsp;&nbsp;年龄: 11&nbsp;&nbsp;&nbsp;&nbsp;时间: 2020-06-27<br>
            地址: 江西九江。。。。。&nbsp;&nbsp;&nbsp;&nbsp;电话: 1324354354<br>
            科别：妇产科&nbsp;&nbsp;&nbsp;&nbsp;诊断医生: 呵呵呵
            </u></p>
            <br>
            <el-input
            type="textarea"
            :rows="10"
            placeholder="请输入内容"
            v-model="textarea"
            >
            </el-input>
        </div>
        </el-main>
    </el-container>
	</div>`
    }
    //处方记录
let prescriptionRecords = {
        data() {
            return {
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    sex: '男',
                    age: 21,
                    phone: '1242342354',
                    idcard: '43654654657575765',
                    address: '湖南长沙',
                    division: '妇产科',
                    doctor: '呵呵呵',
                    content: '无解晚期安乐死'
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    sex: '男',
                    age: 21,
                    phone: '1242342354',
                    idcard: '43654654657575765',
                    address: '湖南长沙',
                    division: '妇产科',
                    doctor: '呵呵呵',
                    content: '无解晚期安乐死'
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    sex: '男',
                    age: 21,
                    phone: '1242342354',
                    idcard: '43654654657575765',
                    address: '湖南长沙',
                    division: '妇产科',
                    doctor: '呵呵呵',
                    content: '无解晚期安乐死'
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    sex: '男',
                    age: 21,
                    phone: '1242342354',
                    idcard: '43654654657575765',
                    address: '湖南长沙',
                    division: '妇产科',
                    doctor: '呵呵呵',
                    content: '无解晚期安乐死'
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    sex: '男',
                    age: 21,
                    phone: '1242342354',
                    idcard: '43654654657575765',
                    address: '湖南长沙',
                    division: '妇产科',
                    doctor: '呵呵呵',
                    content: '无解晚期安乐死'
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    sex: '男',
                    age: 21,
                    phone: '1242342354',
                    idcard: '43654654657575765',
                    address: '湖南长沙',
                    division: '妇产科',
                    doctor: '呵呵呵',
                    content: '无解晚期安乐死'
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    sex: '男',
                    age: 21,
                    phone: '1242342354',
                    idcard: '43654654657575765',
                    address: '湖南长沙',
                    division: '妇产科',
                    doctor: '呵呵呵',
                    content: '无解晚期安乐死'
                }],
                search: ''
            }
        },
        computed: {
            //过滤后的数组
            filterTableData() {
                //定义一个数组
                let list = [];
                //判断输入框不为空，为空则显示全部内容
                if (this.search != '') {
                    //遍历数组
                    for (let v of this.tableData) {
                        //判断条件是否符合
                        if (v.date.includes(this.search) || v.name.includes(this.search) || v.sex.includes(this.search) || v.age.toString().includes(this.search) || v.phone.includes(this.search) || v.idcard.includes(this.search)) {
                            //将符合内添加到局部的数组中
                            list.push(v);
                        }
                    }
                } else {
                    list = this.tableData;
                }
                return list;
            }
        },
        methods: {
            look(index, row) {
                console.log(index, row);
            }
        },
        template: `<div>
    <el-container>
        <el-main>
            <span>处方记录</span>
            <el-divider></el-divider>
        <div>
            <template>
                <el-table
                    :data="filterTableData"
                    height="350"
                    border
                    style="width: 100%">
                    <el-table-column
                    label="时间"
                    prop="date"
                    width="100">
                    </el-table-column>
                    <el-table-column
                    label="姓名"
                    prop="name"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    label="性别"
                    prop="sex"
                    width="50">
                    </el-table-column>
                    <el-table-column
                    label="年龄"
                    prop="age"
                    width="50">
                    </el-table-column>
                    <el-table-column
                    label="电话"
                    prop="phone"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="身份证号"
                    prop="idcard"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    align="center">
                    <template slot="header" slot-scope="scope">
                        <el-input
                        v-model="search"
                        size="mini"
                        placeholder="搜索关键字"/>
                    </template>
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="look(scope.$index, scope.row)">详情</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
        </el-main>
    </el-container>
    </div>`
    }
    //查看预约
let lookAppointment = {
    data() {
        return {
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                sex: '男',
                age: 21,
                phone: '1242342354',
                idcard: '43654654657575765',
                address: '湖南长沙',
                division: '妇产科',
                doctor: '呵呵呵',
                content: '无解晚期安乐死'
            }, {
                date: '2016-05-02',
                name: '王小虎',
                sex: '男',
                age: 21,
                phone: '1242342354',
                idcard: '43654654657575765',
                address: '湖南长沙',
                division: '妇产科',
                doctor: '呵呵呵',
                content: '无解晚期安乐死'
            }, {
                date: '2016-05-02',
                name: '王小虎',
                sex: '男',
                age: 21,
                phone: '1242342354',
                idcard: '43654654657575765',
                address: '湖南长沙',
                division: '妇产科',
                doctor: '呵呵呵',
                content: '无解晚期安乐死'
            }, {
                date: '2016-05-02',
                name: '王小虎',
                sex: '男',
                age: 21,
                phone: '1242342354',
                idcard: '43654654657575765',
                address: '湖南长沙',
                division: '妇产科',
                doctor: '呵呵呵',
                content: '无解晚期安乐死'
            }, {
                date: '2016-05-02',
                name: '王小虎',
                sex: '男',
                age: 21,
                phone: '1242342354',
                idcard: '43654654657575765',
                address: '湖南长沙',
                division: '妇产科',
                doctor: '呵呵呵',
                content: '无解晚期安乐死'
            }, {
                date: '2016-05-02',
                name: '王小虎',
                sex: '男',
                age: 21,
                phone: '1242342354',
                idcard: '43654654657575765',
                address: '湖南长沙',
                division: '妇产科',
                doctor: '呵呵呵',
                content: '无解晚期安乐死'
            }, {
                date: '2016-05-02',
                name: '王小虎',
                sex: '男',
                age: 21,
                phone: '1242342354',
                idcard: '43654654657575765',
                address: '湖南长沙',
                division: '妇产科',
                doctor: '呵呵呵',
                content: '无解晚期安乐死'
            }],
            search: ''
        }
    },
    computed: {
        //过滤后的数组
        filterTableData() {
            //定义一个数组
            let list = [];
            //判断输入框不为空，为空则显示全部内容
            if (this.search != '') {
                //遍历数组
                for (let v of this.tableData) {
                    //判断条件是否符合
                    if (v.date.includes(this.search) || v.name.includes(this.search) || v.sex.includes(this.search) || v.age.toString().includes(this.search) || v.phone.includes(this.search) || v.idcard.includes(this.search)) {
                        //将符合内添加到局部的数组中
                        list.push(v);
                    }
                }
            } else {
                list = this.tableData;
            }
            return list;
        }
    },
    methods: {
        look(index, row) {
            console.log(index, row);
        }
    },
    template: `<div>
    <el-container>
        <el-main>
            <span>查看预约</span>
            <el-divider></el-divider>
        <div>
            <template>
                <el-table
                    :data="filterTableData"
                    height="350"
                    border
                    style="width: 100%">
                    <el-table-column
                    label="时间"
                    prop="date"
                    width="100">
                    </el-table-column>
                    <el-table-column
                    label="姓名"
                    prop="name"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    label="性别"
                    prop="sex"
                    width="50">
                    </el-table-column>
                    <el-table-column
                    label="年龄"
                    prop="age"
                    width="50">
                    </el-table-column>
                    <el-table-column
                    label="电话"
                    prop="phone"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="身份证号"
                    prop="idcard"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    align="center">
                    <template slot="header" slot-scope="scope">
                        <el-input
                        v-model="search"
                        size="mini"
                        placeholder="搜索关键字"/>
                    </template>
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="look(scope.$index, scope.row)">详情</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
        </el-main>
    </el-container>
    </div>`
}


//路由配置
//new VueRouter({
//    routes: [{
//        path: '/call',
//        component: call
//    },{
//        path: '/prescribe',
//        component: prescribe
//    }, {
//        path: '/prescriptionRecords',
//        component: prescriptionRecords
//    }, {
//        path: '/lookAppointment',
//        component: lookAppointment
//    }]
//})