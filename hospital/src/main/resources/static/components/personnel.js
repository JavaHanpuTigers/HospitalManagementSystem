let viewDoct = {
    data() {
        return {
            list: [],
            pagesize: 5,
            currpage: 1,
            search: '',
            dialogVisible: false,
            doct: {
                id: undefined,
                name: undefined,
                subment: undefined,
                age: undefined,
                sex: undefined,
                nation: undefined,
                itle: undefined,
                fee: undefined
            },
            submentList: [],
            flag: false
        }
    },
    methods: {
        getlist() {
            this.flag = true;
            // axios.get('hr/doct')
            axios({
                    method: 'get',
                    url: 'hr/doct',
                    // 传递参数
                    data: undefined,
                    // 设置请求头信息
                    headers: {
                        //key: value
                        // 令牌添加方式 (每个apido要添加)
                        'Authorization': 'Bearer ' + localStorage.getItem("token"),
                        //'Content-Type': 'multipart/form-data'
                    },
                    responseType: 'json'
                })
                .then(res => {
                    this.list = res.data.Allcontent;
                    console.log(res.data);
                    this.flag = false;
                })
                .catch(err => {
                    console.error(err);
                })
        },
        handleCurrentChange(cpage) {
            this.currpage = cpage;
        },
        handleSizeChange(psize) {
            this.pagesize = psize;
        },
        getRow(row) {
            this.dialogVisible = true;
            this.doct.id = row.id;
            this.doct.name = row.name;
            this.doct.subment = row.subment.id;
            this.doct.age = row.age;
            this.doct.sex = row.sex;
            this.doct.nation = row.nation;
            this.doct.title = row.title;
            this.doct.fee = row.fee;
        },
        alterDoct() {
            this.flag = true;
            this.dialogVisible = false;
            id = this.doct.id;
            params = {
                    "name": this.doct.name,
                    "sex": this.doct.sex,
                    "age": this.doct.age,
                    "nation": this.doct.nation,
                    "title": this.doct.title,
                    "fee": this.doct.fee,
                    "subment": { "id": this.doct.subment }
                }
                // axios.put(`hr/doct/${id}`, params)
            axios({
                    method: 'put',
                    url: `hr/doct/${id}`,
                    // 传递参数
                    data: params,
                    // 设置请求头信息
                    headers: {
                        //key: value
                        // 令牌添加方式 (每个apido要添加)
                        'Authorization': 'Bearer ' + localStorage.getItem("token"),
                        //'Content-Type': 'multipart/form-data'
                    },
                    responseType: 'json'
                })
                .then(res => {
                    this.getlist();
                    this.$message('修改成功');
                })
                .catch(err => {
                    console.error(err);
                })
            this.flag = false;
        },
        deleteRow(row) {
            axios({
                    method: 'get',
                    url: `hr/arge/doct/${row.id}`,
                    // 传递参数
                    data: undefined,
                    // 设置请求头信息
                    headers: {
                        //key: value
                        // 令牌添加方式 (每个apido要添加)
                        'Authorization': 'Bearer ' + localStorage.getItem("token"),
                        //'Content-Type': 'multipart/form-data'
                    },
                    responseType: 'json'
                })
                .then(res => {
                    if (res.data.length == 0) {
                        axios({
                                method: 'get',
                                url: `hr/reg/doct/${row.id}`,
                                // 传递参数
                                data: undefined,
                                // 设置请求头信息
                                headers: {
                                    //key: value
                                    // 令牌添加方式 (每个apido要添加)
                                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                                    //'Content-Type': 'multipart/form-data'
                                },
                                responseType: 'json'
                            })
                            .then(res => {
                                console.log(row.id);
                                if (res.data.length > 0) {
                                    this.$message(row.name + '还有工作，不能删除');
                                } else {
                                    axios({
                                            method: 'delete',
                                            url: `/hr/doct/${row.id}`,
                                            // 传递参数
                                            data: undefined,
                                            // 设置请求头信息
                                            headers: {
                                                //key: value
                                                // 令牌添加方式 (每个apido要添加)
                                                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                                                //'Content-Type': 'multipart/form-data'
                                            },
                                            responseType: 'json'
                                        })
                                        .then(res => {
                                            this.getlist();
                                            this.$message('删除成功');
                                        })
                                        .catch(err => {
                                            console.error(err);
                                        })
                                    console.log("删除成功");
                                }
                            })
                            .catch(err => {
                                console.error(err);
                            });
                    } else {
                        this.$message(row.name + '还有工作，不能删除');
                    }
                })
                .catch(err => {
                    console.error(err);
                });

            // axios.get(`hr/arge/doct/${row.id}`)
            //     .then(res => {
            //         if (res.data == '') {
            //             axios.get(`hr/reg/doct/${row.id}`)
            //                 .then(res => {
            //                     console.log(row.id);
            //                     if (res.data.length > 0) {
            //                         this.$message(row.name + '还有工作，不能删除');
            //                     } else {
            //                         axios.delete(`/hr/doct/${row.id}`)
            //                             .then(res => {
            //                                 this.getlist();
            //                                 this.$message('删除成功');
            //                             })
            //                             .catch(err => {
            //                                 console.error(err);
            //                             })
            //                         console.log("删除成功");
            //                     }
            //                 })
            //                 .catch(err => {
            //                     console.error(err);
            //                 });
            //         } else {
            //             this.$message(row.name + '还有工作，不能删除');
            //         }
            //     })
            //     .catch(err => {
            //         console.error(err);
            //     });
        }

    },
    mounted() {
        this.getlist();
        // axios.get('hr/subment')
        axios({
                method: 'get',
                url: 'hr/subment',
                // 传递参数
                data: undefined,
                // 设置请求头信息
                headers: {
                    //key: value
                    // 令牌添加方式 (每个apido要添加)
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    //'Content-Type': 'multipart/form-data'
                },
                responseType: 'json'
            })
            .then(res => {
                this.submentList = res.data.Allcontent;
            })
            .catch(err => {
                console.error(err);
            })
    },
    template: `
    <div>
        <div v-loading="flag">
            <el-table :data="list.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())).slice((currpage - 1) * pagesize, currpage * pagesize)" border height="330" style="width: 100%">
                <el-table-column fixed prop="id" label="编号" width="180"></el-table-column>
                <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                <el-table-column prop="subment.name" label="科室" width="180"></el-table-column>
                <el-table-column prop="age" label="年龄" width="180"></el-table-column>
                <el-table-column prop="sex" label="性别" width="180"></el-table-column>
                <el-table-column prop="nation" label="民族" width="180"></el-table-column>
                <el-table-column prop="title" label="职称" width="180"></el-table-column>
                <el-table-column prop="fee" label="费用" width="180"></el-table-column>
                <el-table-column fixed="right" align="right" width="200">
                    <template slot="header" slot-scope="scope">
                        <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
                    </template>
                    <template slot-scope="scope">
                        <el-button type="text" @click="getRow(scope.row)">编辑</el-button>
                        <el-button @click="deleteRow(scope.row)" type="danger" size="small">移除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog title="表单弹框" :visible.sync="dialogVisible" width="40%">
                <el-scrollbar style="height:348px;width:100%;overflow-x: none;">
                    <el-form ref="form" :model="doct">
                        <el-form-item label="姓名">
                            <el-input v-model="doct.name"></el-input>
                        </el-form-item>
                        <el-form-item label="科室">
                            <el-select v-model="doct.subment" placeholder="科室">
                                <el-option v-for="(item, index) in submentList" :key="index" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="年龄">
                            <el-input v-model="doct.age"></el-input>
                        </el-form-item>
                        <el-form-item label="性别">
                            <el-radio-group v-model="doct.sex">
                                <el-radio label="男"></el-radio>
                                <el-radio label="女"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="民族">
                            <el-input v-model="doct.nation"></el-input>
                        </el-form-item>
                        <el-form-item label="职称">
                            <el-input v-model="doct.title"></el-input>
                        </el-form-item>
                        <el-form-item label="费用">
                            <el-input v-model="doct.fee"></el-input>
                        </el-form-item>
                    </el-form>
                </el-scrollbar>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="alterDoct">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <div style="width:100%;margin-top:20px;margin-left:100px">
            <el-pagination background layout="prev, pager, next, sizes, total, jumper" :page-sizes="[5, 10, 15, 20]" :page-size="pagesize" :total="list.length" @current-change="handleCurrentChange" @size-change="handleSizeChange"></el-pagination>
        </div>
    </div>
    `
}


let addDoct = {
    data() {
        var checkAge = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('年龄不能为空'));
            }
            setTimeout(() => {
                if (!Number.isInteger(value)) {
                    callback(new Error('请输入数字值'));
                } else {
                    if (value < 18) {
                        callback(new Error('必须年满18岁'));
                    } else {
                        callback();
                    }
                }
            }, 1000);
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.doct.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.doct.pass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            doct: {
                name: '',
                subment: '',
                age: '',
                sex: '',
                nation: '',
                title: '',
                fee: '',
                username: '',
                pass: '',
                checkpass: '',
            },
            submentList: undefined,
            flag: false,
            rules: {
                username: [{
                    required: true,
                    message: '请输入用户名',
                    trigger: 'blur'
                }, {
                    min: 3,
                    max: 10,
                    message: '长度在 3 到 10 个字符',
                    trigger: 'blur'
                }],
                pass: [{
                    required: true,
                    validator: validatePass,
                    trigger: 'blur'
                }],
                checkPass: [{
                    required: true,
                    validator: validatePass2,
                    trigger: 'blur'
                }],
                name: [{
                    required: true,
                    message: '请输入姓名',
                    trigger: 'blur'
                }],
                age: [{
                    required: true,
                    validator: checkAge,
                    trigger: 'blur'
                }],
                subment: [{
                    required: true,
                    message: '请输入科室',
                    trigger: 'blur'
                }],
                sex: [{
                    required: true,
                    message: '请输入性别',
                    trigger: 'blur'
                }],
                nation: [{
                    required: true,
                    message: '请输入民族',
                    trigger: 'blur'
                }],
                title: [{
                    required: true,
                    message: '请输入职称',
                    trigger: 'blur'
                }],
                fee: [{
                    required: true,
                    message: '请输入费用',
                    trigger: 'blur'
                }],
            }
        }
    },
    methods: {
        addDoct(ruleForm) {
            this.$refs[ruleForm].validate((valid) => {
                if (valid) {
                    this.flag = true;
                    params = {
                            "name": this.doct.name,
                            "sex": this.doct.sex,
                            "age": this.doct.age,
                            "nation": this.doct.nation,
                            "title": this.doct.title,
                            "fee": this.doct.fee,
                            "subment": { "id": this.doct.subment },
                            "user": {
                                "name": this.doct.username,
                                "password": this.doct.pass
                            }
                        }
                        // axios.post('hr/doct', params)
                    axios({
                            method: 'post',
                            url: 'hr/doct',
                            // 传递参数
                            data: params,
                            // 设置请求头信息
                            headers: {
                                //key: value
                                // 令牌添加方式 (每个apido要添加)
                                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                                //'Content-Type': 'multipart/form-data'
                            },
                            responseType: 'json'
                        })
                        .then(res => {
                            this.resetForm(ruleForm);
                            this.$message('添加成功');
                        })
                        .catch(err => {
                            console.error(err);
                        })
                    this.flag = false;
                } else {
                    this.$message('不符合要求');
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(ruleForm) {
            this.$refs[ruleForm].resetFields();
        },
    },
    created() {
        // axios.get('hr/subment')
        axios({
                method: 'get',
                url: 'hr/subment',
                // 传递参数
                data: undefined,
                // 设置请求头信息
                headers: {
                    //key: value
                    // 令牌添加方式 (每个apido要添加)
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    //'Content-Type': 'multipart/form-data'
                },
                responseType: 'json'
            })
            .then(res => {
                this.submentList = res.data.Allcontent;
            })
            .catch(err => {
                console.error(err);
            })
    },
    template: `
        <div>
        <div v-loading="flag">
            <el-scrollbar style="height:348px;width:100%;overflow-x: none;">
                <el-form ref="ruleForm" :model="doct" :rules="rules" label-width="80px"  class="demo-ruleForm">
                    <el-form-item label="用户名"  prop="username">
                        <el-input v-model="doct.username"></el-input>
                    </el-form-item>
                     <el-form-item label="密码" prop="pass">
                        <el-input type="password" v-model="doct.pass" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="password" v-model="doct.checkPass" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="doct.name"></el-input>
                    </el-form-item>
                    <el-form-item label="科室"  prop="subment">
                        <el-select v-model="doct.subment" placeholder="科室">
                            <el-option v-for="(item, index) in submentList" :key="index" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="年龄" prop="age">
                        <el-input v-model.number="doct.age"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="sex">
                        <el-radio-group v-model="doct.sex">
                            <el-radio label="男"></el-radio>
                            <el-radio label="女"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="民族" prop="nation">
                        <el-input v-model="doct.nation"></el-input>
                    </el-form-item>
                    <el-form-item label="职称" prop="title">
                        <el-input v-model="doct.title"></el-input>
                    </el-form-item>
                    <el-form-item label="费用" prop="fee">
                        <el-input v-model="doct.fee"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="addDoct('ruleForm')">立即创建</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-scrollbar>
            </div>
        </div>
        `
}

let doct = {
    template: `
         <div>
             <div class="list-group list-group-horizontal text-center">
                 <router-link tag="p" to="/doct/viewDoct" class="list-group-item list-group-item-action">查看医生</router-link>
                 <router-link tag="p" to="/doct/addDoct" class="list-group-item list-group-item-action" >添加医生</router-link>
             </div>     
             <div style="margin-top:40px">
                 <router-view></router-view>
             </div>
         </div>
     `
}

let viewDept = {
    data() {
        return {
            // list: [],
            // pagesize: 0,
            // currpage: 1,
            // totalPages: 0,
            // search: '',
            list: [],
            pagesize: 5,
            currpage: 1,
            search: '',
            dialogVisible: false,
            dept: {
                id: undefined,
                name: undefined
            },
            flag: false
        }
    },
    methods: {
        getlist() {
            this.flag = true;
            // axios.get('hr/dept')
            axios({
                    method: 'get',
                    url: 'hr/dept',
                    // 传递参数
                    data: undefined,
                    // 设置请求头信息
                    headers: {
                        //key: value
                        // 令牌添加方式 (每个apido要添加)
                        'Authorization': 'Bearer ' + localStorage.getItem("token"),
                        //'Content-Type': 'multipart/form-data'
                    },
                    responseType: 'json'
                })
                .then(res => {
                    this.list = res.data.Allcontent;
                    // this.list = res.data.content;
                    // this.totalPages = res.data.count;
                    // this.pagesize = res.data.size;
                    // console.log(res.data);
                    this.flag = false;
                })
                .catch(err => {
                    console.error(err);
                })
        },
        // handleCurrentChange(cpage) {
        //     this.flag = true;
        //     axios.get('hr/dept', {
        //             params: {
        //                 p: cpage - 1
        //             }
        //         })
        //         .then(res => {
        //             this.list = res.data.content;
        //             this.totalPages = res.data.count;
        //             this.pagesize = res.data.size;
        //             this.flag = false;
        //         })
        // },
        handleCurrentChange(cpage) {
            this.currpage = cpage;
        },
        handleSizeChange(psize) {
            this.pagesize = psize;
        },
        getRow(row) {
            this.dialogVisible = true;
            this.dept.id = row.id;
            this.dept.name = row.name;
        },
        alterDoct() {
            this.flag = true;
            this.dialogVisible = false;
            id = this.dept.id;
            params = {
                    "name": this.dept.name
                }
                // axios.put(`hr/dept/${id}`, params)
            axios({
                    method: 'put',
                    url: `hr/dept/${id}`,
                    // 传递参数
                    data: params,
                    // 设置请求头信息
                    headers: {
                        //key: value
                        // 令牌添加方式 (每个apido要添加)
                        'Authorization': 'Bearer ' + localStorage.getItem("token"),
                        //'Content-Type': 'multipart/form-data'
                    },
                    responseType: 'json'
                })
                .then(res => {
                    this.getlist();
                    this.$message('修改成功');
                })
                .catch(err => {
                    console.error(err);
                })
            this.flag = false;
        },
        deleteRow(row) {
            // axios.get(`/hr/subment/dept/${row.id}`)
            axios({
                    method: 'get',
                    url: `hr/subment/dept/${row.id}`,
                    // 传递参数
                    data: undefined,
                    // 设置请求头信息
                    headers: {
                        //key: value
                        // 令牌添加方式 (每个apido要添加)
                        'Authorization': 'Bearer ' + localStorage.getItem("token"),
                        //'Content-Type': 'multipart/form-data'
                    },
                    responseType: 'json'
                })
                .then(res => {
                    if (res.data.length > 0) {
                        this.$message(row.name + '下有子科室，不能删除！');
                    } else {
                        // axios.delete(`/hr/dept/${row.id}`)
                        axios({
                                method: 'delete',
                                url: `hr/dept/${row.id}`,
                                // 传递参数
                                data: undefined,
                                // 设置请求头信息
                                headers: {
                                    //key: value
                                    // 令牌添加方式 (每个apido要添加)
                                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                                    //'Content-Type': 'multipart/form-data'
                                },
                                responseType: 'json'
                            })
                            .then(res => {
                                this.getlist();
                                this.$message('删除成功');
                            })
                            .catch(err => {
                                console.error(err);
                            })
                    }
                })
                .catch(err => {
                    console.error(err);
                })
        }

    },
    mounted() {
        this.getlist();
    },
    template: `
    <div>
        <div v-loading="flag">
            <el-table :data="list.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())).slice((currpage - 1) * pagesize, currpage * pagesize)" border height="330" style="width: 100%">
                <el-table-column fixed prop="id" label="编号" width="250"></el-table-column>
                <el-table-column prop="name" label="姓名" width="300"></el-table-column>
                <el-table-column fixed="right" align="right" width="200">
                    <template slot="header" slot-scope="scope">
                        <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
                    </template>
                    <template slot-scope="scope">
                        <el-button type="text" @click="getRow(scope.row)">编辑</el-button>
                        <el-button @click="deleteRow(scope.row)" type="danger" size="small">移除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog title="表单弹框" :visible.sync="dialogVisible" width="40%">
                <el-scrollbar style="height:348px;width:100%;overflow-x: none;">
                    <el-form ref="form" :model="dept">
                        <el-form-item label="科室名">
                            <el-input v-model="dept.name"></el-input>
                        </el-form-item>
                    </el-form>
                </el-scrollbar>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="alterDoct">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <div style="width:100%;margin-top:20px;margin-left:100px">
            <el-pagination background layout="prev, pager, next, sizes, total, jumper" :page-sizes="[5, 10, 15, 20]" :page-size="pagesize" :total="list.length" @current-change="handleCurrentChange" @size-change="handleSizeChange"></el-pagination>
        </div>
        <!-- <div style="width:100%;margin-top:20px">
            <el-pagination background layout="prev, pager, next, jumper" :page-size="pagesize" :total="totalPages" @current-change="handleCurrentChange"></el-pagination>
        </div> -->
    </div>
    `
}

let addDept = {
    data() {
        return {
            dept: {
                name: ''
            },
            flag: true,
            rules: {
                name: [{
                    required: true,
                    message: '请输入科室名称',
                    trigger: 'blur'
                }]
            }
        }
    },
    methods: {
        addDoct(ruleForm) {
            this.$refs[ruleForm].validate((valid) => {
                if (valid) {
                    this.flag = true;
                    params = {
                            "name": this.dept.name
                        }
                        // axios.post('hr/dept', params)
                    axios({
                            method: 'post',
                            url: 'hr/dept',
                            // 传递参数
                            data: params,
                            // 设置请求头信息
                            headers: {
                                //key: value
                                // 令牌添加方式 (每个apido要添加)
                                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                                //'Content-Type': 'multipart/form-data'
                            },
                            responseType: 'json'
                        })
                        .then(res => {
                            this.resetForm(ruleForm)
                            this.$message('添加成功');
                        })
                        .catch(err => {
                            console.error(err);
                        })
                    this.flag = false;
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(ruleForm) {
            this.$refs[ruleForm].resetFields();
        }
    },
    created() {
        this.flag = false;
    },
    template: `
        <div>
            <div  v-loading="flag">
            <el-scrollbar style="height:348px;width:100%;overflow-x: none;">
                <el-form :rules="rules" ref="ruleForm" :model="dept" label-width="80px" class="demo-ruleForm">
                    <el-form-item label="科室名称" prop="name">
                        <el-input v-model="dept.name"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="addDoct('ruleForm')">立即创建</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-scrollbar>
            </div>
        </div>
        `
}

let dept = {
    template: `
         <div>
             <div class="list-group list-group-horizontal text-center">
                 <router-link tag="p" to="/dept/viewDept" class="list-group-item list-group-item-action">查看科室</router-link>
                 <router-link tag="p" to="/dept/addDept" class="list-group-item list-group-item-action" >添加科室</router-link>
             </div>     
             <div style="margin-top:40px">
                 <router-view></router-view>
             </div>
         </div>
     `
}

let viewSubment = {
    data() {
        return {
            list: [],
            pagesize: 5,
            currpage: 1,
            search: '',
            dialogVisible: false,
            subment: {
                id: undefined,
                name: undefined,
                dept: undefined
            },
            submentList: [],
            flag: false
        }
    },
    methods: {
        getlist() {
            this.flag = true;
            // axios.get('hr/subment')
            axios({
                    method: 'get',
                    url: 'hr/subment',
                    // 传递参数
                    data: undefined,
                    // 设置请求头信息
                    headers: {
                        //key: value
                        // 令牌添加方式 (每个apido要添加)
                        'Authorization': 'Bearer ' + localStorage.getItem("token"),
                        //'Content-Type': 'multipart/form-data'
                    },
                    responseType: 'json'
                })
                .then(res => {
                    this.list = res.data.Allcontent;
                    this.flag = false;
                })
                .catch(err => {
                    console.error(err);
                })
        },
        handleCurrentChange(cpage) {
            this.currpage = cpage;
        },
        handleSizeChange(psize) {
            this.pagesize = psize;
        },
        getRow(row) {
            this.dialogVisible = true;
            this.subment.id = row.id;
            this.subment.name = row.name;
            this.subment.dept = row.dept.id;
        },
        alterDoct() {
            this.flag = true;
            this.dialogVisible = false;
            id = this.subment.id;
            params = {
                    "name": this.subment.name,
                    "dept": { "id": this.subment.dept }
                }
                // axios.put(`hr/subment/${id}`, params)
            axios({
                    method: 'put',
                    url: `hr/subment/${id}`,
                    // 传递参数
                    data: params,
                    // 设置请求头信息
                    headers: {
                        //key: value
                        // 令牌添加方式 (每个apido要添加)
                        'Authorization': 'Bearer ' + localStorage.getItem("token"),
                        //'Content-Type': 'multipart/form-data'
                    },
                    responseType: 'json'
                })
                .then(res => {
                    this.getlist();
                    this.$message('修改成功');
                })
                .catch(err => {
                    console.error(err);
                })
            this.flag = false;
        },
        deleteRow(row) {
            // axios.get(`hr/doct/subment/${row.id}`)
            axios({
                    method: 'get',
                    url: `hr/doct/subment/${row.id}`,
                    // 传递参数
                    data: undefined,
                    // 设置请求头信息
                    headers: {
                        //key: value
                        // 令牌添加方式 (每个apido要添加)
                        'Authorization': 'Bearer ' + localStorage.getItem("token"),
                        //'Content-Type': 'multipart/form-data'
                    },
                    responseType: 'json'
                })
                .then(res => {
                    if (res.data.length > 0) {
                        this.$message(row.name + '下还有医生工作，不能工作！');
                    } else {
                        // axios.delete(`/hr/subment/${row.id}`)
                        axios({
                                method: 'delete',
                                url: `hr/subment/${row.id}`,
                                // 传递参数
                                data: undefined,
                                // 设置请求头信息
                                headers: {
                                    //key: value
                                    // 令牌添加方式 (每个apido要添加)
                                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                                    //'Content-Type': 'multipart/form-data'
                                },
                                responseType: 'json'
                            })
                            .then(res => {
                                this.getlist();
                                this.$message('删除成功');
                            })
                            .catch(err => {
                                console.error(err);
                            })
                    }
                })
                .catch(err => {
                    console.error(err);
                })
        }

    },
    mounted() {
        this.getlist();
        axios.get('hr/dept')
            .then(res => {
                this.submentList = res.data.Allcontent;
            })
            .catch(err => {
                console.error(err);
            })
    },
    template: `
    <div>
        <div v-loading="flag">
            <el-table :data="list.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())).slice((currpage - 1) * pagesize, currpage * pagesize)" border height="330" style="width: 100%">
                <el-table-column fixed prop="id" label="编号" width="180"></el-table-column>
                <el-table-column prop="name" label="姓名" width="280"></el-table-column>
                <el-table-column prop="dept.name" label="科室" width="180"></el-table-column>
                <el-table-column fixed="right" align="right" width="200">
                    <template slot="header" slot-scope="scope">
                        <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
                    </template>
                    <template slot-scope="scope">
                        <el-button type="text" @click="getRow(scope.row)">编辑</el-button>
                        <el-button @click="deleteRow(scope.row)" type="danger" size="small">移除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog title="表单弹框" :visible.sync="dialogVisible" width="40%">
                <el-scrollbar style="height:348px;width:100%;overflow-x: none;">
                    <el-form ref="form" :model="subment">
                        <el-form-item label="姓名">
                            <el-input v-model="subment.name"></el-input>
                        </el-form-item>
                        <el-form-item label="科室">
                            <el-select v-model="subment.dept" placeholder="科室">
                                <el-option v-for="(item, index) in submentList" :key="index" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </el-scrollbar>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="alterDoct">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <div style="width:100%;margin-top:20px;margin-left:100px">
            <el-pagination background layout="prev, pager, next, sizes, total, jumper" :page-sizes="[5, 10, 15, 20]" :page-size="pagesize" :total="list.length" @current-change="handleCurrentChange" @size-change="handleSizeChange"></el-pagination>
        </div>
    </div>
    `
}

let addSubment = {
    data() {
        return {
            subment: {
                name: undefined,
                dept: undefined
            },
            submentList: undefined,
            flag: true,
            rules: {
                name: [{
                    required: true,
                    message: '请输入科室名称',
                    trigger: 'blur'
                }],
                dept: [{
                    required: true,
                    message: '请选择归属科',
                    trigger: 'blur'
                }],

            }
        }
    },
    methods: {
        addDoct(ruleForm) {
            let pd = true;
            this.$refs[ruleForm].validate((valid) => {
                if (valid) {
                    this.flag = true;
                    params = {
                            "name": this.subment.name,
                            "dept": {
                                "id": this.subment.dept
                            }
                        }
                        // axios.post('hr/subment', params)
                    axios({
                            method: 'post',
                            url: 'hr/subment',
                            // 传递参数
                            data: params,
                            // 设置请求头信息
                            headers: {
                                //key: value
                                // 令牌添加方式 (每个apido要添加)
                                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                                //'Content-Type': 'multipart/form-data'
                            },
                            responseType: 'json'
                        })
                        .then(res => {
                            this.resetForm(ruleForm);
                            this.$message('添加成功');
                        })
                        .catch(err => {
                            console.error(err);
                        })
                    this.flag = false;
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(ruleForm) {
            this.$refs[ruleForm].resetFields();
        }
    },
    created() {
        axios.get('hr/dept')
            .then(res => {
                this.submentList = res.data.Allcontent;
                this.flag = false;
            })
            .catch(err => {
                console.error(err);
            })
    },
    template: `
        <div>
            <div  v-loading="flag">
            <el-scrollbar style="height:348px;width:100%;overflow-x: none;">
                <el-form :rules="rules" ref="ruleForm" :model="subment" label-width="80px" class="demo-ruleForm">
                    <el-form-item label="科室名称" prop="name">
                        <el-input v-model="subment.name"></el-input>
                    </el-form-item>
                    <el-form-item label="归属科" prop="dept">
                        <el-select v-model="subment.dept" placeholder="归属科">
                            <el-option v-for="(item, index) in submentList" :key="index" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="addDoct('ruleForm')">立即创建</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-scrollbar>
            </div>
        </div>
        `
}

let subment = {
    template: `
         <div>
             <div class="list-group list-group-horizontal text-center">
                 <router-link tag="p" to="/subment/viewSubment" class="list-group-item list-group-item-action">查看子科室</router-link>
                 <router-link tag="p" to="/subment/addSubment" class="list-group-item list-group-item-action" >添加子科室</router-link>
             </div>     
             <div style="margin-top:40px">
                 <router-view></router-view>
             </div>
         </div>
     `
}

let viewArge = {
    data() {
        return {
            list: [],
            pagesize: 5,
            currpage: 1,
            search: '',
            dialogVisible: false,
            arge: {
                id: undefined,
                time: undefined,
                doct: undefined
            },
            submentList: [],
            flag: false
        }
    },
    methods: {
        getlist() {
            this.flag = true;
            // axios.get('hr/arge')
            axios({
                    method: 'get',
                    url: 'hr/arge',
                    // 传递参数
                    data: undefined,
                    // 设置请求头信息
                    headers: {
                        //key: value
                        // 令牌添加方式 (每个apido要添加)
                        'Authorization': 'Bearer ' + localStorage.getItem("token"),
                        //'Content-Type': 'multipart/form-data'
                    },
                    responseType: 'json'
                })
                .then(res => {
                    this.list = res.data.Allcontent;
                    this.flag = false;
                })
                .catch(err => {
                    console.error(err);
                })
        },
        handleCurrentChange(cpage) {
            this.currpage = cpage;
        },
        handleSizeChange(psize) {
            this.pagesize = psize;
        },
        getRow(row) {
            this.dialogVisible = true;
            this.arge.id = row.id;
            this.arge.time = row.time;
            this.arge.doct = row.doct.id;
        },
        alterDoct() {
            this.flag = true;
            this.dialogVisible = false;
            id = this.arge.id;
            params = {
                    "time": this.arge.time,
                    "doct": { "id": this.arge.doct }
                }
                // axios.put(`hr/arge/${id}`, params)
            axios({
                    method: 'get',
                    url: `hr/arge/${id}`,
                    // 传递参数
                    data: params,
                    // 设置请求头信息
                    headers: {
                        //key: value
                        // 令牌添加方式 (每个apido要添加)
                        'Authorization': 'Bearer ' + localStorage.getItem("token"),
                        //'Content-Type': 'multipart/form-data'
                    },
                    responseType: 'json'
                })
                .then(res => {
                    this.getlist();
                    this.$message('修改成功');
                })
                .catch(err => {
                    console.error(err);
                })
            this.flag = false;
        },
        deleteRow(row) {
            this.flag = true;
            // axios.delete(`/hr/arge/${row.id}`)
            axios({
                    method: 'delete',
                    url: `hr/arge/${row.id}`,
                    // 传递参数
                    data: undefined,
                    // 设置请求头信息
                    headers: {
                        //key: value
                        // 令牌添加方式 (每个apido要添加)
                        'Authorization': 'Bearer ' + localStorage.getItem("token"),
                        //'Content-Type': 'multipart/form-data'
                    },
                    responseType: 'json'
                })
                .then(res => {
                    this.getlist();
                    this.$message('删除成功');
                })
                .catch(err => {
                    console.error(err);
                })
            this.flag = false;
        }

    },
    mounted() {
        this.getlist();
        // axios.get('hr/doct')
        axios({
                method: 'get',
                url: 'hr/doct',
                // 传递参数
                data: undefined,
                // 设置请求头信息
                headers: {
                    //key: value
                    // 令牌添加方式 (每个apido要添加)
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    //'Content-Type': 'multipart/form-data'
                },
                responseType: 'json'
            })
            .then(res => {
                this.submentList = res.data.Allcontent;
            })
            .catch(err => {
                console.error(err);
            })
    },
    template: `
    <div>
        <div v-loading="flag">
            <el-table :data="list.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())).slice((currpage - 1) * pagesize, currpage * pagesize)" border height="330" style="width: 100%">
                <el-table-column fixed prop="id" label="编号" width="200"></el-table-column>
                <el-table-column prop="time" label="时间" width="250"></el-table-column>
                <el-table-column prop="doct.name" label="医生" width="250"></el-table-column>
                <el-table-column fixed="right" align="right" width="200">
                    <template slot="header" slot-scope="scope">
                        <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
                    </template>
                    <template slot-scope="scope">
                        <el-button type="text" @click="getRow(scope.row)">编辑</el-button>
                        <el-button @click="deleteRow(scope.row)" type="danger" size="small">移除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog title="表单弹框" :visible.sync="dialogVisible" width="40%">
                <el-scrollbar style="height:348px;width:100%;overflow-x: none;">
                    <el-form ref="form" :model="arge">
                        <el-form-item label="时间">
                            <el-input v-model="arge.time"></el-input>
                        </el-form-item>
                        <el-form-item label="医生">
                            <el-select v-model="arge.doct" placeholder="医生">
                                <el-option v-for="(item, index) in submentList" :key="index" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </el-scrollbar>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="alterDoct">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <div style="width:100%;margin-top:20px;margin-left:100px">
            <el-pagination background layout="prev, pager, next, sizes, total, jumper" :page-sizes="[5, 10, 15, 20]" :page-size="pagesize" :total="list.length" @current-change="handleCurrentChange" @size-change="handleSizeChange"></el-pagination>
        </div>
    </div>
    `
}

let addArge = {
    data() {
        return {
            arge: {
                time: undefined,
                doct: undefined
            },
            submentList: undefined,
            flag: true,
            rules: {
                time: [{
                    required: true,
                    message: '请输入排班时间',
                    trigger: 'blur'
                }],
                doct: [{
                    required: true,
                    message: '请选择医生',
                    trigger: 'blur'
                }]
            }
        }
    },
    methods: {
        addDoct(ruleForm) {
            this.$refs[ruleForm].validate((valid) => {
                if (valid) {
                    this.flag = true;
                    params = {
                            "time": this.arge.time,
                            "doct": { "id": this.arge.doct }
                        }
                        // axios.post('hr/arge', params)
                    axios({
                            method: 'post',
                            url: 'hr/arge',
                            // 传递参数
                            data: params,
                            // 设置请求头信息
                            headers: {
                                //key: value
                                // 令牌添加方式 (每个apido要添加)
                                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                                //'Content-Type': 'multipart/form-data'
                            },
                            responseType: 'json'
                        })
                        .then(res => {
                            this.resetForm(ruleForm)
                            this.$message('添加成功');
                        })
                        .catch(err => {
                            console.error(err);
                        })
                    this.flag = false;
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(ruleForm) {
            this.$refs[ruleForm].resetFields();
        }
    },
    created() {
        // axios.get('hr/doct')
        axios({
                method: 'get',
                url: 'hr/doct',
                // 传递参数
                data: undefined,
                // 设置请求头信息
                headers: {
                    //key: value
                    // 令牌添加方式 (每个apido要添加)
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    //'Content-Type': 'multipart/form-data'
                },
                responseType: 'json'
            })
            .then(res => {
                this.submentList = res.data.Allcontent;
            })
            .catch(err => {
                console.error(err);
            })
        this.flag = false;
    },
    template: `
        <div>
            <div  v-loading="flag">
            <el-scrollbar style="height:348px;width:100%;overflow-x: none;">
                <el-form :rules="rules" ref="ruleForm" :model="arge" label-width="80px" class="demo-ruleForm">
                    <el-form-item label="排班时间" prop="time">
                        <el-input v-model="arge.time"></el-input>
                    </el-form-item>
                    <el-form-item label="排班医生" prop="doct">
                        <el-select v-model="arge.doct" placeholder="排班医生">
                            <el-option v-for="(item, index) in submentList" :key="index" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="addDoct('ruleForm')">立即创建</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-scrollbar>
            </div>
        </div>
        `
}

let arge = {
    template: `
        <div>
             <div class="list-group list-group-horizontal text-center">
                 <router-link tag="p" to="/arge/viewArge" class="list-group-item list-group-item-action">查看排班</router-link>
                 <router-link tag="p" to="/arge/addArge" class="list-group-item list-group-item-action" >添加排班</router-link>
             </div>     
             <div style="margin-top:40px">
                 <router-view></router-view>
             </div>
         </div>
     `
}

let pant = {
    data() {
        return {
            list: [],
            pagesize: 5,
            currpage: 1,
            search: '',
            dialogVisible: false,
            pant: {
                id: undefined,
                name: undefined,
                card: undefined,
                age: undefined,
                sex: undefined,
                nation: undefined
            },
            submentList: [],
            flag: false
        }
    },
    methods: {
        getlist() {
            this.flag = true;
            // axios.get('hr/pant')
            axios({
                    method: 'get',
                    url: 'hr/pant',
                    // 传递参数
                    data: undefined,
                    // 设置请求头信息
                    headers: {
                        //key: value
                        // 令牌添加方式 (每个apido要添加)
                        'Authorization': 'Bearer ' + localStorage.getItem("token"),
                        //'Content-Type': 'multipart/form-data'
                    },
                    responseType: 'json'
                })
                .then(res => {
                    this.list = res.data.Allcontent;
                    this.flag = false;
                })
                .catch(err => {
                    console.error(err);
                })
        },
        handleCurrentChange(cpage) {
            this.currpage = cpage;
        },
        handleSizeChange(psize) {
            this.pagesize = psize;
        },
        // getRow(row) {
        //     this.dialogVisible = true;
        //     this.pant.id = row.id;
        //     this.pant.name = row.name;
        //     this.pant.card = row.card;
        //     this.pant.age = row.age;
        //     this.pant.sex = row.sex;
        //     this.pant.nation = row.nation;
        // },
        // alterDoct() {
        //     this.flag = true;
        //     this.dialogVisible = false;
        //     id = this.pant.id;
        //     params = {
        //         "name": this.pant.name,
        //         "sex": this.pant.sex,
        //         "age": this.pant.age,
        //         "nation": this.pant.nation,
        //         "card": this.pant.card
        //     }
        //     axios.put(`hr/pant/${id}`, params)
        //         .then(res => {
        //             this.getlist();
        //             this.$message('修改成功');
        //         })
        //         .catch(err => {
        //             console.error(err);
        //         })
        //     this.flag = false;
        // },
        // deleteRow(row) {
        //     this.flag = true;
        //     axios.delete(`/hr/pant/${row.id}`)
        //         .then(res => {
        //             this.getlist();
        //             this.$message('删除成功');
        //         })
        //         .catch(err => {
        //             console.error(err);
        //         })
        //     this.flag = false;
        // }

    },
    mounted() {
        this.getlist();
    },
    template: `
    <div>
        <div v-loading="flag" style="margin-top:50px">
        <el-table :data="list.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())).slice((currpage - 1) * pagesize, currpage * pagesize)" border height="330" style="width: 100%">
                <el-table-column fixed prop="id" label="编号" width="180"></el-table-column>
                <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                <el-table-column prop="user.name" label="用户名" width="180"></el-table-column>
                <el-table-column prop="card" label="身份证" width="180"></el-table-column>
                <el-table-column prop="age" label="年龄" width="180"></el-table-column>
                <el-table-column prop="sex" label="性别" width="180"></el-table-column>
                <el-table-column prop="nation" label="民族" width="180"></el-table-column>
            </el-table>
        </div>
        <div style="width:100%;margin-top:40px;margin-left:100px">
            <el-pagination background layout="prev, pager, next, sizes, total, jumper" :page-sizes="[5, 10, 15, 20]" :page-size="pagesize" :total="list.length" @current-change="handleCurrentChange" @size-change="handleSizeChange"></el-pagination>
        </div>
    </div>
    `
}

let reg = {
    data() {
        return {
            list: [],
            pagesize: 5,
            currpage: 1,
            search: '',
            flag: false,
            states: ["", "未签到", "签到完成", "就诊中", "检测中", "未支付状态", "取消支付", ]
        }
    },
    methods: {
        getlist() {
            this.flag = true;
            // axios.get('hr/reg')
            axios({
                    method: 'get',
                    url: 'hr/reg',
                    // 传递参数
                    data: undefined,
                    // 设置请求头信息
                    headers: {
                        //key: value
                        // 令牌添加方式 (每个apido要添加)
                        'Authorization': 'Bearer ' + localStorage.getItem("token"),
                        //'Content-Type': 'multipart/form-data'
                    },
                    responseType: 'json'
                })
                .then(res => {
                    this.list = res.data.Allcontent;
                    this.flag = false;
                })
                .catch(err => {
                    console.error(err);
                })
        },
        handleCurrentChange(cpage) {
            this.currpage = cpage;
        },
        handleSizeChange(psize) {
            this.pagesize = psize;
        },
    },
    mounted() {
        this.getlist();
    },
    template: `
    <div>
        <div v-loading="flag" style="margin-top:50px">
            <el-table :data="list.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())).slice((currpage - 1) * pagesize, currpage * pagesize)" border height="330" style="width: 100%">
                <el-table-column fixed prop="id" label="编号" width="180"></el-table-column>
                <el-table-column prop="pant.name" label="用户" width="180"></el-table-column>
                <el-table-column prop="doct.name" label="医生" width="180"></el-table-column>
                <el-table-column prop="time" label="预约时间" width="180"></el-table-column>
                <el-table-column prop="date" label="挂号时间" width="180"></el-table-column>
                <el-table-column prop="name" label="患者" width="180"></el-table-column>
                <el-table-column prop="sex" label="性别" width="180"></el-table-column>
                <el-table-column prop="card" label="身份证" width="180"></el-table-column>
                <el-table-column prop="nation" label="民族" width="180"></el-table-column>
                <el-table-column prop="fee" label="费用" width="180"></el-table-column>
                <el-table-column prop="phone" label="电话" width="180"></el-table-column>
                <el-table-column label="状态" width="180">
                    <template slot-scope="scope">
                        {{states[scope.row.state]}}
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div style="width:100%;margin-top:40px;margin-left:100px">
            <el-pagination background layout="prev, pager, next, sizes, total, jumper" :page-sizes="[5, 10, 15, 20]" :page-size="pagesize" :total="list.length" @current-change="handleCurrentChange" @size-change="handleSizeChange"></el-pagination>
        </div>
    </div>
    `
}

let prescript = {
    data() {
        return {
            list: [],
            pagesize: 5,
            currpage: 1,
            search: '',
            prescript: {
                id: undefined,
                sym: undefined,
                content: undefined,
                time: undefined,
                reg: undefined
            },
            flag: false
        }
    },
    methods: {
        getlist() {
            this.flag = true;
            // axios.get('hr/prescript')
            axios({
                    method: 'get',
                    url: 'hr/prescript',
                    // 传递参数
                    data: undefined,
                    // 设置请求头信息
                    headers: {
                        //key: value
                        // 令牌添加方式 (每个apido要添加)
                        'Authorization': 'Bearer ' + localStorage.getItem("token"),
                        //'Content-Type': 'multipart/form-data'
                    },
                    responseType: 'json'
                })
                .then(res => {
                    this.list = res.data.Allcontent;
                    this.flag = false;
                })
                .catch(err => {
                    console.error(err);
                })
        },
        handleCurrentChange(cpage) {
            this.currpage = cpage;
        },
        handleSizeChange(psize) {
            this.pagesize = psize;
        },

    },
    mounted() {
        this.getlist();
    },
    template: `
    <div>
        <div v-loading="flag" style="margin-top:50px">
            <el-table :data="list.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())).slice((currpage - 1) * pagesize, currpage * pagesize)" border height="330" style="width: 100%">
                <el-table-column fixed prop="id" label="编号" width="180"></el-table-column>
                <el-table-column prop="sym" label="症状信息" width="180"></el-table-column>
                <el-table-column prop="content" label="处方内容" width="180"></el-table-column>
                <el-table-column prop="time" label="开处方时间" width="180"></el-table-column>
                <el-table-column fixed="right" prop="reg.id" label="挂号编号" width="180"></el-table-column>
            </el-table>
        </div>
        <div style="width:100%;margin-top:40px;margin-left:100px">
            <el-pagination background layout="prev, pager, next, sizes, total, jumper" :page-sizes="[5, 10, 15, 20]" :page-size="pagesize" :total="list.length" @current-change="handleCurrentChange" @size-change="handleSizeChange"></el-pagination>
        </div>
    </div>
    `
}