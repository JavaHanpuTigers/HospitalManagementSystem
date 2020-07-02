let addStaff = {
    data() {
        return {
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            }
        }
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        }
    },
    template: `
        <div>
                    <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="活动名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="活动区域">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="活动时间">
                <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="活动性质">
                <el-checkbox-group v-model="form.type">
                <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                <el-checkbox label="地推活动" name="type"></el-checkbox>
                <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
            </el-form>
        </div>

    `
}
let checkStaff = {
    data() {
        return {
            list: [],
            pagesize: 5,
            currpage: 1,
            search: '',
            obj: {
                id: undefined,
                name: undefined,
                price: undefined
            }
        }
    },
    methods: {
        getlist() {
            axios.get("json/test.json")
                .then(res => {
                    console.log(res.data)
                    this.list = res.data;
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
        uodateEdit(index, row) {
            console.log(row[index]);
            this.obj.id = row[index].id;
            this.obj.name = row[index].name;
            this.obj.price = row[index].price;
        },
        deleteRow(index, rows) {
            rows.splice(index, 1);
        }

    },
    mounted() {
        this.getlist();
        console.log(this.list);
    },
    template: `
    <div>
        <div>
            <el-table :data="list.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())).slice((currpage - 1) * pagesize, currpage * pagesize)" border height="330" style="width: 100%">
                <el-table-column fixed prop="id" label="编号" width="180"></el-table-column>
                <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                <el-table-column prop="price" label="价值"></el-table-column>
                <el-table-column fixed="right" align="right" width="200">
                    <template slot="header" slot-scope="scope">
                        <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
                    </template>
                    <template slot-scope="scope">
                        <button @click="uodateEdit(scope.$index, list)" style="height: 30px;font-size: 12px;" type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">修改</button>
                        <el-button @click.native.prevent="deleteRow(scope.$index, list)" type="danger" size="small">移除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="modal fade" id="myModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">模态框头部</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <input type="text" v-model="obj.id"><br>
                        <input type="text" v-model="obj.name"><br>
                        <input type="text" v-model="obj.price"><br>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <div style="width:100%;margin-top:20px">
            <el-pagination background layout="prev, pager, next, sizes, total, jumper" :page-sizes="[5, 10, 15, 20]" :page-size="pagesize" :total="list.length" @current-change="handleCurrentChange" @size-change="handleSizeChange"></el-pagination>
        </div>
    </div>
    `
}

let staff = {

    template: `
        <div>
            <div class="list-group list-group-horizontal text-center">
                <router-link tag="p" to="/staff/checkStaff" class="list-group-item list-group-item-action">查看员工</router-link>
                <router-link tag="p" to="/staff/addStaff" class="list-group-item list-group-item-action" >添加员工</router-link>
            </div>     
            <div style="margin-top:40px">
                <router-view></router-view>
            </div>
        </div>
    `
}

let addDept = {
    data() {
        return {
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            }
        }
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        }
    },
    template: `
        <div>
                    <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="活动名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="活动区域">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="活动时间">
                <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="活动性质">
                <el-checkbox-group v-model="form.type">
                <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                <el-checkbox label="地推活动" name="type"></el-checkbox>
                <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
            </el-form>
        </div>

    `
}
let checkDept = {
    data() {
        return {
            list: [],
            pagesize: 5,
            currpage: 1,
            search: '',
            obj: {
                id: undefined,
                name: undefined,
                price: undefined
            }
        }
    },
    methods: {
        getlist() {
            axios.get("json/test.json")
                .then(res => {
                    console.log(res.data)
                    this.list = res.data;
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
        uodateEdit(index, row) {
            console.log(row[index]);
            this.obj.id = row[index].id;
            this.obj.name = row[index].name;
            this.obj.price = row[index].price;
        },
        deleteRow(index, rows) {
            rows.splice(index, 1);
        }

    },
    mounted() {
        this.getlist();
    },
    template: `
    <div>
        <div>
            <el-table :data="list.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())).slice((currpage - 1) * pagesize, currpage * pagesize)" border height="330" style="width: 100%">
                <el-table-column fixed prop="id" label="编号" width="180"></el-table-column>
                <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                <el-table-column prop="price" label="价值"></el-table-column>
                <el-table-column fixed="right" align="right" width="200">
                    <template slot="header" slot-scope="scope">
                        <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
                    </template>
                    <template slot-scope="scope">
                        <button @click="uodateEdit(scope.$index, list)" style="height: 30px;font-size: 12px;" type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">修改</button>
                        <el-button @click.native.prevent="deleteRow(scope.$index, list)" type="danger" size="small">移除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="modal fade" id="myModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">模态框头部</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <input type="text" v-model="obj.id"><br>
                        <input type="text" v-model="obj.name"><br>
                        <input type="text" v-model="obj.price"><br>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <div style="width:100%;margin-top:20px">
            <el-pagination background layout="prev, pager, next, sizes, total, jumper" :page-sizes="[5, 10, 15, 20]" :page-size="pagesize" :total="list.length" @current-change="handleCurrentChange" @size-change="handleSizeChange"></el-pagination>
        </div>
    </div>
    `
}
let dept = {
    template: `
    <div>
    <div class="list-group list-group-horizontal text-center">
        <router-link tag="p" to="/dept/checkDept" class="list-group-item list-group-item-action">查看科室</router-link>
        <router-link tag="p" to="/dept/addDept" class="list-group-item list-group-item-action" >添加科室</router-link>
    </div>     
    <div style="margin-top:40px">
        <router-view></router-view>
    </div>
</div>
    `
}

let addScheduling = {
    data() {
        return {
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            }
        }
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        }
    },
    template: `
        <div>
                    <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="活动名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="活动区域">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="活动时间">
                <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="活动性质">
                <el-checkbox-group v-model="form.type">
                <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                <el-checkbox label="地推活动" name="type"></el-checkbox>
                <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
            </el-form>
        </div>

    `
}
let checkScheduling = {
    data() {
        return {
            list: [],
            pagesize: 5,
            currpage: 1,
            search: '',
            obj: {
                id: undefined,
                name: undefined,
                price: undefined
            }
        }
    },
    methods: {
        getlist() {
            axios.get("json/test.json")
                .then(res => {
                    console.log(res.data)
                    this.list = res.data;
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
        uodateEdit(index, row) {
            console.log(row[index]);
            this.obj.id = row[index].id;
            this.obj.name = row[index].name;
            this.obj.price = row[index].price;
        },
        deleteRow(index, rows) {
            rows.splice(index, 1);
        }

    },
    mounted() {
        this.getlist();
    },
    template: `
    <div>
        <div>
            <el-table :data="list.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())).slice((currpage - 1) * pagesize, currpage * pagesize)" border height="330" style="width: 100%">
                <el-table-column fixed prop="id" label="编号" width="180"></el-table-column>
                <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                <el-table-column prop="price" label="价值"></el-table-column>
                <el-table-column fixed="right" align="right" width="200">
                    <template slot="header" slot-scope="scope">
                        <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
                    </template>
                    <template slot-scope="scope">
                        <button @click="uodateEdit(scope.$index, list)" style="height: 30px;font-size: 12px;" type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">修改</button>
                        <el-button @click.native.prevent="deleteRow(scope.$index, list)" type="danger" size="small">移除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="modal fade" id="myModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">模态框头部</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <input type="text" v-model="obj.id"><br>
                        <input type="text" v-model="obj.name"><br>
                        <input type="text" v-model="obj.price"><br>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <div style="width:100%;margin-top:20px">
            <el-pagination background layout="prev, pager, next, sizes, total, jumper" :page-sizes="[5, 10, 15, 20]" :page-size="pagesize" :total="list.length" @current-change="handleCurrentChange" @size-change="handleSizeChange"></el-pagination>
        </div>
    </div>
    `
}
let scheduling = {
    template: `
    <div>
    <div class="list-group list-group-horizontal text-center">
        <router-link tag="p" to="/scheduling/checkScheduling" class="list-group-item list-group-item-action">查看排班</router-link>
        <router-link tag="p" to="/scheduling/addScheduling" class="list-group-item list-group-item-action" >添加排班</router-link>
    </div>     
    <div style="margin-top:40px">
        <router-view></router-view>
    </div>
</div>
    `
}