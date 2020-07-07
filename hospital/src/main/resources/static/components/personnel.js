let viewDoct = {
    data() {
        return {
            list: [],
            pagesize: 0,
            currpage: 1,
            totalPages: 0,
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
            axios.get('hr/doct')
                .then(res => {
                    this.list = res.data.content;
                    this.totalPages = res.data.count;
                    this.pagesize = res.data.size;
                    console.log(res.data);
                    this.flag = false;
                })
                .catch(err => {
                    console.error(err);
                })
        },
        handleCurrentChange(cpage) {
            this.flag = true;
            axios.get('hr/doct', {
                    params: {
                        p: cpage - 1
                    }
                })
                .then(res => {
                    this.list = res.data.content;
                    this.totalPages = res.data.count;
                    this.pagesize = res.data.size;
                    this.flag = false;
                })
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
            axios.put(`hr/doct/${id}`, params)
                .then(res => {
                    this.getlist();
                    this.flag = false;
                })
                .catch(err => {
                    console.error(err);
                })
        },
        deleteRow(row) {
            this.flag = true;
            axios.delete(`/hr/doct/${row.id}`)
                .then(res => {
                    this.getlist();
                    this.flag = false;
                })
                .catch(err => {
                    console.error(err);
                })
        }

    },
    mounted() {
        this.getlist();
        axios.get('hr/subment')
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
            <el-table :data="list.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" border height="330" style="width: 100%">
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
        <div style="width:100%;margin-top:20px">
            <el-pagination background layout="prev, pager, next, jumper" :page-size="pagesize" :total="totalPages" @current-change="handleCurrentChange"></el-pagination>
        </div>
    </div>
    `
}


let addDoct = {
    data() {
        return {
            doct: {
                name: undefined,
                subment: undefined,
                age: undefined,
                sex: undefined,
                nation: undefined,
                itle: undefined,
                fee: undefined,
                user: {
                    name: undefined,
                    password: undefined
                }
            },
            submentList: undefined,
            flag: true
        }
    },
    methods: {
        addDoct() {
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
                    "name": this.doct.user.name,
                    "password": this.doct.user.password
                }
            }
            axios.post('hr/doct', params)
                .then(res => {
                    this.dept = {
                        name: '',
                        subment: '',
                        age: '',
                        sex: '',
                        nation: '',
                        itle: '',
                        fee: '',
                        user: {
                            name: '',
                            password: ''
                        }
                    };
                    alert("添加成功");
                })
                .catch(err => {
                    console.error(err);
                })
            this.flag = false;
        }
    },
    created() {
        axios.get('hr/subment')
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
                <el-form ref="form" :model="doct" label-width="80px">
                    <el-form-item label="用户名">
                        <el-input v-model="doct.user.name"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="doct.user.password"></el-input>
                    </el-form-item>
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
                    <el-form-item>
                        <el-button type="primary" @click="addDoct">立即创建</el-button>
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
            list: [],
            pagesize: 0,
            currpage: 1,
            totalPages: 0,
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
            axios.get('hr/dept')
                .then(res => {
                    this.list = res.data.content;
                    this.totalPages = res.data.count;
                    this.pagesize = res.data.size;
                    console.log(res.data);
                    this.flag = false;
                })
                .catch(err => {
                    console.error(err);
                })
        },
        handleCurrentChange(cpage) {
            this.flag = true;
            axios.get('hr/dept', {
                    params: {
                        p: cpage - 1
                    }
                })
                .then(res => {
                    this.list = res.data.content;
                    this.totalPages = res.data.count;
                    this.pagesize = res.data.size;
                    this.flag = false;
                })
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
            axios.put(`hr/dept/${id}`, params)
                .then(res => {
                    this.getlist();
                    this.flag = false;
                })
                .catch(err => {
                    console.error(err);
                })
        },
        deleteRow(row) {
            this.flag = true;
            axios.delete(`/hr/doct/${row.id}`)
                .then(res => {
                    this.getlist();
                    this.flag = false;
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
            <el-table :data="list.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" border height="330" style="width: 100%">
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
        <div style="width:100%;margin-top:20px">
            <el-pagination background layout="prev, pager, next, jumper" :page-size="pagesize" :total="totalPages" @current-change="handleCurrentChange"></el-pagination>
        </div>
    </div>
    `
}

let addDept = {
    data() {
        return {
            dept: {
                name: undefined
            },
            flag: true
        }
    },
    methods: {
        addDoct() {
            this.flag = true;
            params = {
                "name": this.dept.name
            }
            axios.post('hr/dept', params)
                .then(res => {
                    this.dept = {
                        name: ''
                    };
                    alert("添加成功");
                })
                .catch(err => {
                    console.error(err);
                })
            this.flag = false;
        }
    },
    created() {
        this.flag = false;
    },
    template: `
        <div>
            <div  v-loading="flag">
            <el-scrollbar style="height:348px;width:100%;overflow-x: none;">
                <el-form ref="form" :model="dept" label-width="80px">
                    <el-form-item label="用户名">
                        <el-input v-model="dept.name"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="addDoct">立即创建</el-button>
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
            pagesize: 0,
            currpage: 1,
            totalPages: 0,
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
            this.flag = false;
            axios.get('hr/subment')
                .then(res => {
                    this.list = res.data.content;
                    this.totalPages = res.data.count;
                    this.pagesize = res.data.size;
                    console.log(res.data);
                    this.flag = true;
                })
                .catch(err => {
                    console.error(err);
                })
        },
        handleCurrentChange(cpage) {
            this.flag = true;
            axios.get('hr/subment', {
                    params: {
                        p: cpage - 1
                    }
                })
                .then(res => {
                    this.list = res.data.content;
                    this.totalPages = res.data.count;
                    this.pagesize = res.data.size;
                    this.flag = false;
                })
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
            axios.put(`hr/subment/${id}`, params)
                .then(res => {
                    this.getlist();
                    this.flag = false;
                })
                .catch(err => {
                    console.error(err);
                })
        },
        deleteRow(row) {
            this.flag = true;
            axios.delete(`/hr/subment/${row.id}`)
                .then(res => {
                    this.getlist();
                    this.flag = false;
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
            <el-table :data="list.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" border height="330" style="width: 100%">
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
        <div style="width:100%;margin-top:20px">
            <el-pagination background layout="prev, pager, next, jumper" :page-size="pagesize" :total="totalPages" @current-change="handleCurrentChange"></el-pagination>
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
            flag: true
        }
    },
    methods: {
        addDoct() {
            this.flag = true;
            params = {
                "name": this.subment.name,
                "dept": {
                    "id": this.subment.dept
                }
            }
            axios.post('hr/subment', params)
                .then(res => {
                    this.subment = {
                        name: '',
                        dept: ''
                    };
                    alert("添加成功");
                })
                .catch(err => {
                    console.error(err);
                })
            this.flag = false;
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
                <el-form ref="form" :model="subment" label-width="80px">
                    <el-form-item label="用户名">
                        <el-input v-model="subment.name"></el-input>
                    </el-form-item>
                    <el-form-item label="科室">
                        <el-select v-model="subment.dept" placeholder="科室">
                            <el-option v-for="(item, index) in submentList" :key="index" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="addDoct">立即创建</el-button>
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
            pagesize: 0,
            currpage: 1,
            totalPages: 0,
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
            this.flag = false;
            axios.get('hr/arge')
                .then(res => {
                    this.list = res.data.content;
                    this.totalPages = res.data.count;
                    this.pagesize = res.data.size;
                    console.log(res.data);
                    this.flag = true;
                })
                .catch(err => {
                    console.error(err);
                })
        },
        handleCurrentChange(cpage) {
            this.flag = true;
            axios.get('hr/arge', {
                    params: {
                        p: cpage - 1
                    }
                })
                .then(res => {
                    this.list = res.data.content;
                    this.totalPages = res.data.count;
                    this.pagesize = res.data.size;
                    this.flag = false;
                })
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
            axios.put(`hr/arge/${id}`, params)
                .then(res => {
                    this.getlist();
                    this.flag = false;
                })
                .catch(err => {
                    console.error(err);
                })
        },
        deleteRow(row) {
            this.flag = true;
            axios.delete(`/hr/arge/${row.id}`)
                .then(res => {
                    this.getlist();
                })
                .catch(err => {
                    console.error(err);
                })
            this.flag = false;
        }

    },
    mounted() {
        this.getlist();
        axios.get('hr/doct')
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
            <el-table :data="list.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" border height="330" style="width: 100%">
                <el-table-column fixed prop="id" label="编号" width="180"></el-table-column>
                <el-table-column prop="time" label="时间" width="180"></el-table-column>
                <el-table-column prop="doct.name" label="医生" width="180"></el-table-column>
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
                        <el-form-item label="姓名">
                            <el-input v-model="arge.time"></el-input>
                        </el-form-item>
                        <el-form-item label="科室">
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
        <div style="width:100%;margin-top:20px">
            <el-pagination background layout="prev, pager, next, jumper" :page-size="pagesize" :total="totalPages" @current-change="handleCurrentChange"></el-pagination>
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
            flag: true
        }
    },
    methods: {
        addDoct() {
            this.flag = true;
            params = {
                "time": this.arge.time,
                "doct": { "id": this.arge.doct }
            }
            axios.post('hr/arge', params)
                .then(res => {
                    this.arge = {
                        time: '',
                        doct: ''
                    };
                    alert("添加成功");
                })
                .catch(err => {
                    console.error(err);
                })
            this.flag = false;
        }
    },
    created() {
        axios.get('hr/doct')
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
                <el-form ref="form" :model="arge" label-width="80px">
                    <el-form-item label="姓名">
                        <el-input v-model="arge.time"></el-input>
                    </el-form-item>
                    <el-form-item label="排班">
                        <el-select v-model="arge.doct" placeholder="排班">
                            <el-option v-for="(item, index) in submentList" :key="index" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="addDoct">立即创建</el-button>
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
            pagesize: 0,
            currpage: 1,
            totalPages: 0,
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
            this.flag = false;
            axios.get('hr/pant')
                .then(res => {
                    this.list = res.data.content;
                    this.totalPages = res.data.count;
                    this.pagesize = res.data.size;
                    console.log(res.data);
                    this.flag = true;
                })
                .catch(err => {
                    console.error(err);
                })
        },
        handleCurrentChange(cpage) {
            this.flag = true;
            axios.get('hr/pant', {
                    params: {
                        p: cpage - 1
                    }
                })
                .then(res => {
                    this.list = res.data.content;
                    this.totalPages = res.data.count;
                    this.pagesize = res.data.size;
                    this.flag = false;
                })
        },
        getRow(row) {
            this.dialogVisible = true;
            this.pant.id = row.id;
            this.pant.name = row.name;
            this.pant.card = row.card;
            this.pant.age = row.age;
            this.pant.sex = row.sex;
            this.pant.nation = row.nation;
        },
        alterDoct() {
            this.flag = true;
            this.dialogVisible = false;
            id = this.pant.id;
            params = {
                "name": this.pant.name,
                "sex": this.pant.sex,
                "age": this.pant.age,
                "nation": this.pant.nation,
                "card": this.pant.card
            }
            axios.put(`hr/pant/${id}`, params)
                .then(res => {
                    this.getlist();
                    this.flag = false;
                })
                .catch(err => {
                    console.error(err);
                })
        },
        deleteRow(row) {
            this.flag = true;
            axios.delete(`/hr/pant/${row.id}`)
                .then(res => {
                    this.getlist();
                    this.flag = false;
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
            <el-table :data="list.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" border height="330" style="width: 100%">
                <el-table-column fixed prop="id" label="编号" width="180"></el-table-column>
                <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                <el-table-column prop="user.name" label="用户名" width="180"></el-table-column>
                <el-table-column prop="card" label="身份证" width="180"></el-table-column>
                <el-table-column prop="age" label="年龄" width="180"></el-table-column>
                <el-table-column prop="sex" label="性别" width="180"></el-table-column>
                <el-table-column prop="nation" label="民族" width="180"></el-table-column>
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
                    <el-form ref="form" :model="pant">
                        <el-form-item label="姓名">
                            <el-input v-model="pant.name"></el-input>
                        </el-form-item>
                        <el-form-item label="年龄">
                            <el-input v-model="pant.age"></el-input>
                        </el-form-item>
                        <el-form-item label="性别">
                            <el-radio-group v-model="pant.sex">
                                <el-radio label="男"></el-radio>
                                <el-radio label="女"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="民族">
                            <el-input v-model="pant.card"></el-input>
                        </el-form-item>
                        <el-form-item label="民族">
                            <el-input v-model="pant.nation"></el-input>
                        </el-form-item>
                    </el-form>
                </el-scrollbar>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="alterDoct">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <div style="width:100%;margin-top:20px">
            <el-pagination background layout="prev, pager, next, jumper" :page-size="pagesize" :total="totalPages" @current-change="handleCurrentChange"></el-pagination>
        </div>
    </div>
    `
}

let reg = {
    data() {
        return {
            list: [],
            pagesize: 0,
            currpage: 1,
            totalPages: 0,
            search: '',
            reg: {
                id: undefined,
                pant: undefined,
                doct: undefined,
                time: undefined,
                date: undefined,
                name: undefined,
                sex: undefined,
                card: undefined,
                nation: undefined,
                fee: undefined,
                phone: undefined,
                state: undefined
            },
            flag: false
        }
    },
    methods: {
        getlist() {
            this.flag = true;
            axios.get('hr/reg')
                .then(res => {
                    this.list = res.data.content;
                    this.totalPages = res.data.count;
                    this.pagesize = res.data.size;
                    console.log(res.data);
                    this.flag = false;
                })
                .catch(err => {
                    console.error(err);
                })
        },
        handleCurrentChange(cpage) {
            this.flag = true;
            axios.get('hr/reg', {
                    params: {
                        p: cpage - 1
                    }
                })
                .then(res => {
                    this.list = res.data.content;
                    this.totalPages = res.data.count;
                    this.pagesize = res.data.size;
                    this.flag = false;
                })
        }
    },
    mounted() {
        this.getlist();
    },
    template: `
    <div>
        <div v-loading="flag">
            <el-table :data="list.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" border height="330" style="width: 100%">
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
                <el-table-column prop="state" label="状态" width="180"></el-table-column>
            </el-table>
        </div>
        <div style="width:100%;margin-top:20px">
            <el-pagination background layout="prev, pager, next, jumper" :page-size="pagesize" :total="totalPages" @current-change="handleCurrentChange"></el-pagination>
        </div>
    </div>
    `
}

let prescript = {
    data() {
        return {
            list: [],
            pagesize: 0,
            currpage: 1,
            totalPages: 0,
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
            axios.get('hr/prescript')
                .then(res => {
                    this.list = res.data.content;
                    this.totalPages = res.data.count;
                    this.pagesize = res.data.size;
                    this.flag = false;
                    console.log(res.data);
                })
                .catch(err => {
                    console.error(err);
                })
        },
        handleCurrentChange(cpage) {
            this.flag = true;
            axios.get('hr/prescript', {
                    params: {
                        p: cpage - 1
                    }
                })
                .then(res => {
                    this.list = res.data.content;
                    this.totalPages = res.data.count;
                    this.pagesize = res.data.size;
                    this.flag = false;
                })
        }

    },
    mounted() {
        this.getlist();
    },
    template: `
    <div>
        <div v-loading="flag">
            <el-table :data="list.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" border height="330" style="width: 100%">
                <el-table-column fixed prop="id" label="编号" width="180"></el-table-column>
                <el-table-column prop="sym" label="症状信息" width="180"></el-table-column>
                <el-table-column prop="content" label="处方内容" width="180"></el-table-column>
                <el-table-column prop="time" label="开处方时间" width="180"></el-table-column>
                <el-table-column prop="reg.id" label="挂号编号" width="180"></el-table-column>
            </el-table>
        </div>
        <div style="width:100%;margin-top:20px">
            <el-pagination background layout="prev, pager, next, jumper" :page-size="pagesize" :total="totalPages" @current-change="handleCurrentChange"></el-pagination>
        </div>
    </div>
    `
}