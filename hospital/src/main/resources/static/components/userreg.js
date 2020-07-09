var userreg = {
    template: `
    <el-container>
       
        <el-main v-loading="iszj">
            <el-scrollbar style="height:420px;width:100%;overflow-x: none;">
            <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">

                    <el-form  inline class="demo-table-expand" >
                            <el-form-item label="挂号人姓名:" style="width:100%">
                                {{ props.row.name }}
                            </el-form-item>
                            <el-form-item label="医生姓名:" style="width:40%">
                                <span>{{ props.row.doct.name }}</span>
                            </el-form-item>
                            <el-form-item label="医生级别:" style="width:40%">
                                <span>{{ props.row.doct.title }}</span>
                            </el-form-item>
                            <el-form-item label="挂号人身份证:" style="width:100%">
                                <span>{{ props.row.card }}</span>
                            </el-form-item>
                            <el-form-item label="挂号状态:" style="width:40%">
                                <span>{{ props.row.state }}</span>
                            </el-form-item>
                            <el-form-item label="挂号人民族:" style="width:40%">
                                <span>{{ props.row.nation }}</span>
                            </el-form-item>
                            <el-form-item label="预约时间:" style="width:100%">
                                <span>{{ props.row.time }}</span>
                            </el-form-item>
        
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                label="挂号 编号"
                prop="id">
                </el-table-column>
                </el-table-column>
                <el-table-column
                label="姓名"
                prop="name">
            </el-table-column>
                
                <el-table-column
                label="预约就诊时间"
                prop="date">
                </el-table-column>
                <el-table-column
                    prop="state"
                    label="标签"
                    width="100"
                    :filters="[{ text: '未签到', value: '1' }, { text: '签到完成', value: '2' }, { text: '就诊中', value: '3' }, { text: '检测中', value: '4' },{ text: '完成', value: '5' }, { text: '未支付', value: '6' }, { text: '取消', value: '7' }]"
                    :filter-method="filterTag"
                    filter-placement="bottom-end">
                        <template slot-scope="scope">
                            <el-tag
                            :type="color[scope.row.state-1]"
                            disable-transitions>{{into[scope.row.state-1]}}</el-tag>
                        </template>

                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button   @click="clickif(scope.row,scope.row.state)" :type="color[scope.row.state-1]" v-if="intodbutton[scope.row.state-1] != ''">{{intodbutton[scope.row.state-1]}}</el-button>
                       
                    </template>

                </el-table-column>
            </el-table>
            </el-scrollbar>
            <el-dialog   title="查看处方"
            :visible.sync="dialogVisibledept"
            width="40%"  >
            

                    <el-form >
                        
                        <el-form-item label="姓名" label-width="120px">
                            {{pres.reg.name}}
                        </el-form-item>
                        <el-form-item label="症状信息" label-width="120px">
                            {{pres.sym}}
                        </el-form-item>
                        <el-form-item label="处方内容" label-width="120px">
                                {{pres.content}}
                        </el-form-item>
                        <el-form-item label="处方内容" label-width="120px">
                                {{pres.time}}
                        </el-form-item>
                    </el-form>
         
               
           
            
            
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibledept = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisibledept = false">确定</el-button>
            </span>
            </el-dialog>
            
            
            </el-main>

    </el-container>
    `,
    data() {
        return {
            color: ["info", "primary", "danger", "info", "success", "primary", "danger"],
            into: ["未签到", "签到完成", "就诊中", "检测中", "完成", "未支付", "取消"],
            intodbutton: ["签到", "查看等待", "", "", "查看处方", "支付", ""],
            tableData: [],
            dialogVisibledept: false,
            pres: { reg: {} },
            form: {},
            // 加载信息
            iszj: true,
        }
    },
    created() {
        this.initData();

    },
    methods: {
        initData() {
            console.log(localStorage.getItem("token"), "initData"); //
            axios({
                method: 'get',
                url: '/reg/all',
                // 传递参数
                data: undefined,
                // 设置请求头信息
                headers: {
                    // 令牌添加方式 (每个apido要添加)
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                }

            }).then(res => {
                console.log(res)
                this.tableData = res.data;
                this.iszj = false;
            }).catch(error => {
                // 请求失败，
                console.log(error);
            });
        },
        setsign(i) {
            axios({
                method: 'put',
                url: `/reg/sign/${i}`,
                // 传递参数
                data: undefined,
                // 设置请求头信息
                headers: {
                    // 令牌添加方式 (每个apido要添加)
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                }

            }).then(res => {
                console.log(res)
                    //this.$message(res.data.info);
                this.$alert(res.data.info, res.data.operation != null ? '提示信息' : '错误信息', {
                    confirmButtonText: '确定',
                    type: res.data.operation != null ? 'success' : 'error',
                    callback: action => {

                    }
                });
                if (res.data.operation != null) {
                    this.initData();
                } else {
                    this.iszj = false;
                }

            }).catch(error => {
                // 请求失败，
                console.log(error);
            });
        },
        getPres(i) {
            console.log(i, "sdhfasdhfakjlsfdhkjlkh")
            axios({
                method: 'get',
                url: `/reg/pres/${i}`,
                // 传递参数
                data: undefined,
                // 设置请求头信息
                headers: {
                    // 令牌添加方式 (每个apido要添加)
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                }

            }).then(res => {
                console.log(res)
                this.pres = res.data;
                this.dialogVisibledept = true;
                this.iszj = false;
            }).catch(error => {
                // 请求失败，
                console.log(error);
            });
        },
        formatter(row, column) {
            console.log(row, column)
            return row.address;
        },
        filterTag(value, row) {

            return row.state === value;
        },
        filterHandler(value, row, column) {
            console.log(value, row, column)
            const property = column['property'];
            return row[property] === value;
        },
        clickif(data, i) {
            console.log(data, i);

            if (i == 5) {
                this.iszj = true;
                this.getPres(data.id);
            } else if (i == 1) {
                this.iszj = true;
                this.setsign(data.id);
            } else {
                this.$message("功能正在实现");
            }
        }
    }

}