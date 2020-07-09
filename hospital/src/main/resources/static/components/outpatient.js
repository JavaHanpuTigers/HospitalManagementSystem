var regs=null;
//排队信息
let call = {
        props: {

        },
        data() {
            return {
                search:'',
                tableData: []
            }
        },
        computed:{ 
        	filterTableData() {
        		//定义一个数组
        		let list = [];
        		//判断输入框不为空，为空则显示全部内容
        		if (this.search != '') {
        			//遍历数组
        			for (let v of this.tableData) {
        				//判断条件是否符合
        				if (v.date.includes(this.search) || v.name.includes(this.search) || v.sex.includes(this.search) || v.nation.includes(this.search) || v.phone.includes(this.search) || v.card.includes(this.search)|| v.doct.subment.name.includes(this.search)) {
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
        },
         mounted() {
             axios.get("doct/reg/2",{headers:{'Authorization':'Bearer '+localStorage.getItem("token")}}).then(resp=>{
                 this.tableData=resp.data;
             })
         },
        template: `<div>
	<el-container>
        <el-main>
            <span>排队信息</span>
            <el-divider></el-divider>
        <div>
        <el-input
        v-model="search"
        size="mini"
        placeholder="搜索关键字"/><br/>  
            <el-table
                :data="filterTableData"
                height="350"
                border
                style="width: 100%">
                <el-table-column
                    label="排名"
                    type="index"
                    width="50">
                </el-table-column>
                <el-table-column
                label="时间"
                prop="date"
                width="150">
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
                label="民族"
                prop="nation"
                width="50">
                </el-table-column>
                <el-table-column
                label="电话"
                prop="phone"
                width="120">
                </el-table-column>
                <el-table-column
                label="身份证号"
                prop="card"
                width="180">
                </el-table-column>
                <el-table-column
                label="科室"
                prop="doct.subment.name"
                width="120">
                </el-table-column>
            </el-table>
        </div>
        </el-main>
    </el-container>
	</div>`
    }
    //面诊
let prescribe = {
        data() {
            return {
                list:{
                    card: "未叫号",
                    doct: {
                        subment:{
                            name:"未叫号"
                        }
                    },
                    id: null,
                    name: "未叫号",
                    nation: "未叫号",
                    phone: "未叫号",
                    sex: "未叫号"
                },
                sym:'',
                content:''
            }
        },
        methods: {
            next() {
                this.$confirm('是否叫号下一位', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.get("doct/reg/2/byOne",{headers:{'Authorization':'Bearer '+localStorage.getItem("token")}}).then(resp=>{
                        if(resp.data!=''){
                            this.list=resp.data;
                            this.$message({
                                type: 'success',
                                message: '已叫号,等待患者!'
                            });
                        }else{
                            this.$message({
                                type: 'info',
                                message: '无患者！'
                            });
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            create() {
                if(this.list.id==null){
                    alert("请先叫号！");
                }else{
                    this.$confirm('是否开处方单', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        axios.post("doct/pret",{
                            reg:{
                                id:this.list.id
                            },
                            sym:this.sym,
                            content:this.content
                        },{headers:{'Authorization':'Bearer '+localStorage.getItem("token")}}).then(resp=>{
                            this.list={
                                card: "未叫号",
                                doct: {
                                    subment:{
                                        name:"未叫号"
                                    }
                                },
                                id: null,
                                name: "未叫号",
                                nation: "未叫号",
                                phone: "未叫号",
                                sex: "未叫号"
                            };
                            regs=null;
                            this.sym="";
                            this.content="";
                            this.$message({
                                type: 'success',
                                message: `已开单!处方编号为${resp.data.id}`
                            });
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    });
                }
            },
            state(){
                if(this.list.id!=null){
                    this.$confirm('将患者挂号状态修改为检查中, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                      }).then(() => {
                          axios.put(`doct/reg/${this.list.id}`,{headers:{'Authorization':'Bearer '+localStorage.getItem("token")}}).then(resp=>{
                              if(resp.data){
                                this.$message({
                                    type: 'success',
                                    message: '成功!'
                                  });
                              }else{
                                this.$message({
                                    type: 'info',
                                    message: '失败!'
                                  }); 
                              }
                          })
    
                      }).catch(() => {
                        this.$message({
                          type: 'info',
                          message: '已取消'
                        });          
                      });
                }
            },
            nogo(){
                if(this.list.id!=null){
                    this.$confirm('将患者挂号状态设置为未打卡, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                      }).then(() => {
                        axios.put(`doct/reg1/${this.list.id}`,{headers:{'Authorization':'Bearer '+localStorage.getItem("token")}}).then(resp=>{
                            if(resp.data){
                              this.$message({
                                  type: 'success',
                                  message: '成功!'
                                });
                            }else{
                              this.$message({
                                  type: 'info',
                                  message: '失败!'
                                }); 
                            }
                        })
                      }).catch(() => {
                        this.$message({
                          type: 'info',
                          message: '已取消'
                        });          
                      });
                }
            }
        },
        created() {
            if(regs!=null){
                alert("补号面诊");
                this.list=regs;
            }
        },
        template: `<div>
	<el-container>
        <el-main>
            <span>面诊</span>
            <span><el-button @click="create" style="float: right;" type="primary" plain>开处方</el-button></span>
            <span><el-button @click="next" style="float: right;" type="primary" plain>叫号</el-button></span>
            <span><el-button @click="state" style="float: right;" type="primary" plain>检查</el-button></span>
            <span><el-button @click="nogo" style="float: right;" type="primary" plain>未到</el-button></span>
            <el-divider></el-divider>
        <div>
            <p>
            姓名:  {{list.name}}  ,性别:  {{list.sex}}  ,民族:  {{list.nation}}  <br/>
            身份证号码:  {{list.card}} <br/>
            患者电话:  {{list.phone}}  <br/>
            科室:  {{list.doct.subment.name}}  ,挂号编号:  {{list.id}}  <br/>
            <h5>临床诊断:</h5>
            <el-input
                placeholder="请输入内容"
                v-model="sym"
                clearable>
            </el-input>
            </p>
            <p>
            <h4>RP:</h4>
            <el-input
            type="textarea"
            :rows="8"
            placeholder="请输入内容"
            v-model="content"
            >
            </el-input>
            </p>
        </div>
        </el-main>
    </el-container>
	</div>`
    }
    //处方记录
let prescriptionRecords = {
        data() {
            return {
                tableData: [],
                search: ''
            }
        },
        computed:{
        	filterTableData() {
        		//定义一个数组
        		let list = [];
        		//判断输入框不为空，为空则显示全部内容
        		if (this.search != '') {
        			//遍历数组
        			for (let v of this.tableData) {
        				//判断条件是否符合
        				if (v.time.includes(this.search) || v.reg.name.includes(this.search) || v.reg.sex.includes(this.search) || v.reg.nation.includes(this.search) || v.reg.phone.includes(this.search) || v.reg.card.includes(this.search)|| v.sym.includes(this.search)) {
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
            download(row){
                axios.get(`doct/pret/download/${row.id}`,{headers:{'Authorization':'Bearer '+localStorage.getItem("token")},responseType: 'blob'}).then(resp=>{
                    console.log(resp.data);
                    // this.download(response)
                    let url = window.URL.createObjectURL(resp.data)
                    let link = document.createElement('a')
                    link.style.display = 'none'
                    link.href = url
                    link.setAttribute('download', `${row.reg.name}的处方表.doc`)
                    document.body.appendChild(link)
                    link.click();
                    document.body.removeChild(link);
                })
            }
        },
        mounted() {
            axios.get("doct/pret",{headers:{'Authorization':'Bearer '+localStorage.getItem("token")}}).then(resp=>{
                this.tableData=resp.data;                
            })
        },
        template: `<div>
    <el-container>
        <el-main>
            <span>处方记录</span>
            <el-divider></el-divider>
        <div>
        <el-input
        v-model="search"
        size="mini"
        placeholder="搜索关键字"/><br/>  
            <el-table
                :data="filterTableData"
                height="350"
                border
                style="width: 100%">
                <el-table-column
                label="时间"
                prop="time"
                width="150">
                </el-table-column>
                <el-table-column
                label="姓名"
                prop="reg.name"
                width="60">
                </el-table-column>
                <el-table-column
                label="性别"
                prop="reg.sex"
                width="50">
                </el-table-column>
                <el-table-column
                label="民族"
                prop="reg.nation"
                width="50">
                </el-table-column>
                <el-table-column
                label="电话"
                prop="reg.phone"
                width="110">
                </el-table-column>
                <el-table-column
                label="身份证号"
                prop="reg.card"
                width="160">
                </el-table-column>
                <el-table-column
                label="诊断"
                prop="sym"
                width="140">
                </el-table-column>
                <el-table-column
                align="center"
                label="下载">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    type="primary"
                    @click="download(scope.row)" icon="el-icon-download"></el-button>
                </template>
                </el-table-column>
            </el-table>
            <a id="a"></a>
        </div>
        </el-main>
    </el-container>
    </div>`
    }
    //查看预约
let lookAppointment = {
    data() {
        return {
            tableData: [],
            search: '',
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
                    if (v.time.includes(this.search) || v.name.includes(this.search) || v.sex.includes(this.search) || v.nation.includes(this.search) || v.phone.includes(this.search) || v.card.includes(this.search)|| v.doct.subment.name.includes(this.search)) {
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
       
    },
    mounted() {
        axios.get("doct/reg/1",{headers:{
            'Authorization':'Bearer '+localStorage.getItem("token"),
        }}).then(resp=>{
            this.tableData=resp.data;
        })
    },
    template: `<div>
    <el-container>
        <el-main>
            <span>查看预约</span>
            <el-divider></el-divider>
        <div>
        <el-input
        v-model="search"
        size="mini"
        placeholder="搜索关键字"/><br/>  
            <el-table
                :data="filterTableData"
                height="350"
                border
                style="width: 100%">
                <el-table-column
                label="时间"
                prop="time"
                width="150">
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
                label="民族"
                prop="nation"
                width="50">
                </el-table-column>
                <el-table-column
                label="电话"
                prop="phone"
                width="120">
                </el-table-column>
                <el-table-column
                label="身份证号"
                prop="card"
                width="180">
                </el-table-column>
                <el-table-column
                label="科室"
                prop="doct.subment.name"
                width="150">
                </el-table-column>
            </el-table>
        </div>
        </el-main>
    </el-container>
    </div>`
}
//补号
let patch={
    data() {
        return {
            list:{
                name:'',sex:'',card:'',nation:'汉族',phone:''
            }
        }
    },
    methods: {
        create(){           
            if(this.list.name!=''&&this.list.name!=''&&this.list.card!=''&&this.list.nation!=''&&this.list.phone!=''){              
                axios.post("doct/reg",this.list,{headers:{'Authorization':'Bearer '+localStorage.getItem("token")}}).then(resp=>{
                    regs={
                        doct:{
                            id:resp.data.doct.id,
                            subment:{
                                name:'补号(急诊)'
                            }
                        },
                        id:resp.data.id,
                        card:resp.data.card,
                        name:resp.data.name,
                        nation:resp.data.nation,
                        phone:resp.data.phone,
                        sex:resp.data.sex,
                    }
                    this.$router.push({path:'/prescribe'});
                })
            }else{
                alert("所有选项不能为空!");
            }
            
        }
    },
    template:`
    <div>
	<el-container>
        <el-main>
            <span>补号</span>
            <el-divider></el-divider>
        <div>
            <p>
            姓名:<el-input
            placeholder="请输入姓名"
            v-model="list.name"
            clearable>
            </el-input>
            性别:<br/>
            <el-radio v-model="list.sex" label="男">男</el-radio>
            <el-radio v-model="list.sex" label="女">女</el-radio><br/>
            身份证号码:<el-input
            placeholder="请输入身份证号码"
            v-model="list.card"
            clearable>
            </el-input>
            民族:<el-input
            placeholder="请输入民族"
            v-model="list.nation"
            clearable>
            </el-input>
            电话号码:<el-input
            placeholder="请输入电话号码"
            v-model="list.phone"
            clearable>
            </el-input>
            </p>
            <span><el-button @click="create" type="primary">创建挂号(补号)信息</el-button></span>
        </div>
        </el-main>
    </el-container>
	</div>
    `
}
