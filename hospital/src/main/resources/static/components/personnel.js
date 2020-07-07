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
            flag: true
        }
    },
    methods: {
        getlist() {
            axios.get('hr/doct')
                .then(res => {
                    this.flag = false;
                    this.list = res.data.content;
                    this.totalPages = res.data.count;
                    this.pagesize = res.data.size;
                    console.log(res.data);
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
                })
                .catch(err => {
                    console.error(err);
                })
            this.flag = false;
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
                fee: undefined
            },
            submentList: undefined
        }
    },
    methods: {
        addDoct() {
            params = {
                "name": this.doct.name,
                "sex": this.doct.sex,
                "age": this.doct.age,
                "nation": this.doct.nation,
                "title": this.doct.title,
                "fee": this.doct.fee,
                "subment": { "id": this.doct.subment }
            }
            axios.post('hr/doct', params)
                .then(res => {
                    alert("添加成功");
                    this.doct = {}
                })
                .catch(err => {
                    console.error(err);
                })
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
    },
    template: `
        <div>
            <div>
            <el-scrollbar style="height:348px;width:100%;overflow-x: none;">
                <el-form ref="form" :model="doct" label-width="80px">
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
                        <el-button>取消</el-button>
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
    template: `查看科室`
}

let addDept = {
    template: `添加科室`
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
    template: `查看科室`
}

let addSubment = {
    template: `添加科室`
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
    template: `查看科室`
}

let addArge = {
    template: `添加科室`
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
    template: `添加科室`
}

let reg = {
    template: `添加科室`
}

let prescript = {
    template: `添加科室`
}

// let addStaff = {
//     data() {
//         return {
//             form: {
//                 name: '',
//                 region: '',
//                 date1: '',
//                 date2: '',
//                 delivery: false,
//                 type: [],
//                 resource: '',
//                 desc: ''
//             }
//         }
//     },
//     methods: {
//         onSubmit() {
//             console.log('submit!');
//         }
//     },
//     template: `
//         <div>
//                     <el-form ref="form" :model="form" label-width="80px">
//             <el-form-item label="活动名称">
//                 <el-input v-model="form.name"></el-input>
//             </el-form-item>
//             <el-form-item label="活动区域">
//                 <el-select v-model="form.region" placeholder="请选择活动区域">
//                 <el-option label="区域一" value="shanghai"></el-option>
//                 <el-option label="区域二" value="beijing"></el-option>
//                 </el-select>
//             </el-form-item>
//             <el-form-item label="活动时间">
//                 <el-col :span="11">
//                 <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
//                 </el-col>
//                 <el-col class="line" :span="2">-</el-col>
//                 <el-col :span="11">
//                 <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
//                 </el-col>
//             </el-form-item>
//             <el-form-item label="活动性质">
//                 <el-checkbox-group v-model="form.type">
//                 <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
//                 <el-checkbox label="地推活动" name="type"></el-checkbox>
//                 <el-checkbox label="线下主题活动" name="type"></el-checkbox>
//                 <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
//                 </el-checkbox-group>
//             </el-form-item>

//             <el-form-item>
//                 <el-button type="primary" @click="onSubmit">立即创建</el-button>
//                 <el-button>取消</el-button>
//             </el-form-item>
//             </el-form>
//         </div>

//     `
// }
// let checkStaff = {
//     data() {
//         return {
//             list: [],
//             pagesize: 5,
//             currpage: 1,
//             search: '',
//             obj: {
//                 id: undefined,
//                 name: undefined,
//                 price: undefined
//             }
//         }
//     },
//     methods: {
//         getlist() {
//             axios.get("json/test.json")
//                 .then(res => {
//                     console.log(res.data)
//                     this.list = res.data;
//                 })
//                 .catch(err => {
//                     console.error(err);
//                 })
//         },
//         handleCurrentChange(cpage) {
//             this.currpage = cpage;
//         },
//         handleSizeChange(psize) {
//             this.pagesize = psize;
//         },
//         uodateEdit(index, row) {
//             console.log(row[index]);
//             this.obj.id = row[index].id;
//             this.obj.name = row[index].name;
//             this.obj.price = row[index].price;
//         },
//         deleteRow(index, rows) {
//             rows.splice(index, 1);
//         }

//     },
//     mounted() {
//         this.getlist();
//         console.log(this.list);
//     },
//     template: `
//     <div>
//         <div>
//             <el-table :data="list.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())).slice((currpage - 1) * pagesize, currpage * pagesize)" border height="330" style="width: 100%">
//                 <el-table-column fixed prop="id" label="编号" width="180"></el-table-column>
//                 <el-table-column prop="name" label="姓名" width="180"></el-table-column>
//                 <el-table-column prop="price" label="价值"></el-table-column>
//                 <el-table-column fixed="right" align="right" width="200">
//                     <template slot="header" slot-scope="scope">
//                         <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
//                     </template>
//                     <template slot-scope="scope">
//                         <button @click="uodateEdit(scope.$index, list)" style="height: 30px;font-size: 12px;" type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">修改</button>
//                         <el-button @click.native.prevent="deleteRow(scope.$index, list)" type="danger" size="small">移除</el-button>
//                     </template>
//                 </el-table-column>
//             </el-table>
//             <div class="modal fade" id="myModal">
//             <div class="modal-dialog">
//                 <div class="modal-content">
//                     <div class="modal-header">
//                         <h4 class="modal-title">模态框头部</h4>
//                         <button type="button" class="close" data-dismiss="modal">&times;</button>
//                     </div>
//                     <div class="modal-body">
//                         <input type="text" v-model="obj.id"><br>
//                         <input type="text" v-model="obj.name"><br>
//                         <input type="text" v-model="obj.price"><br>
//                     </div>
//                     <div class="modal-footer">
//                         <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         </div>
//         <div style="width:100%;margin-top:20px">
//             <el-pagination background layout="prev, pager, next, sizes, total, jumper" :page-sizes="[5, 10, 15, 20]" :page-size="pagesize" :total="list.length" @current-change="handleCurrentChange" @size-change="handleSizeChange"></el-pagination>
//         </div>
//     </div>
//     `
// }

// let staff = {

//     template: `
//         <div>
//             <div class="list-group list-group-horizontal text-center">
//                 <router-link tag="p" to="/staff/checkStaff" class="list-group-item list-group-item-action">查看员工</router-link>
//                 <router-link tag="p" to="/staff/addStaff" class="list-group-item list-group-item-action" >添加员工</router-link>
//             </div>     
//             <div style="margin-top:40px">
//                 <router-view></router-view>
//             </div>
//         </div>
//     `
// }