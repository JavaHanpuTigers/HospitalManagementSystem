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



var registration = {
    template: `
    <div id="app">



        <el-container style="height: 500px; border: 1px solid #eee">

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
                <el-aside width="150px">
                    <el-menu default-active="1" class="el-menu-vertical-demo" @select="selectOK" @open="handleOpen" @close="handleClose">
                        <el-menu-item index="1">
                            <i class="el-icon-menu"></i>
                            <span slot="title">急诊科</span>
                        </el-menu-item>
                        <el-submenu index="2">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>内科</span>
                            </template>
                            <el-menu-item index="2-1">风湿科</el-menu-item>
                            <el-menu-item index="2-2">感染病科</el-menu-item>
                            <el-menu-item index="2-3">呼吸内科</el-menu-item>
                            <el-menu-item index="2-4">内分泌科</el-menu-item>
                            <el-menu-item index="2-5">神经内科</el-menu-item>
                            <el-menu-item index="2-6">消化内科</el-menu-item>
                            <el-menu-item index="2-7">心血管内科</el-menu-item>
                        </el-submenu>
                        <el-submenu index="3">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>外科</span>
                            </template>
                            <el-menu-item index="3-1">选项1</el-menu-item>
                            <el-menu-item index="3-2">选项2</el-menu-item>
                        </el-submenu>

                    </el-menu>
                </el-aside>
                <!-- 侧边栏结束 -->
                <el-main >
                    <el-tabs :stretch="true" value="date" v-show="active>=1">
                        <el-tab-pane label="按日期预约" name="date">
                            
                            <!-- 时间标签 -->
                            <el-calendar :range="now" :first-day-of-week="day">
                                <template slot="dateCell" slot-scope="{date, data}">
                                    <p :class="data.isSelected ? 'is-selected' : ''">
                                      {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}
                                      <br>
                                      <!-- 中间可以添加方法 -->
                                      {{dealMyDate(data.day)}}
                                    </p>
                                  </template>
                            </el-calendar>
                            <el-table height="250" :data="ysdata.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())  || data.rank.toLowerCase().includes(search.toLowerCase()) )" style="width: 100%">
                                <el-table-column label="名称" prop="name">
                                </el-table-column>
                                <el-table-column label="级别" prop="rank">
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
                        </el-tab-pane>
                        <el-tab-pane label="按专家预约" name="second" >
                            <div style="overflow:hidden">
                                <el-table :data="ysdata.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())  || data.rank.toLowerCase().includes(search.toLowerCase()) )" style="width: 100%">
                                <el-table-column label="名称" prop="name">
                                </el-table-column>
                                <el-table-column label="级别" prop="rank">
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
                            </div>    
                        
                       
                        </el-tab-pane>

                    </el-tabs>
                    <button @click="active != 4 ? active++:active ">下一步</button>
                    <button @click="active != 0 ? active--:active ">返回上一步</button>
                </el-main>
            </el-container>
        </el-container>
    </div>
    
    `,
    data() {
        return {
            // 用于显示星期
            weekinfo: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期天"],
            // 用于保存当前时间显示
            dateActive: 1,
            // 步骤条的位置
            active: 0,
            // 查询医生的数据
            search: "",
            // 医生数据
            ysdata: [{
                "name": "张三",
                rank: "主任医生"
            }, {
                "name": "李四",
                rank: "副主任医生"
            }, {
                "name": "张力",
                rank: "副主任医生"
            }, {
                "name": "王西",
                rank: "主任医生"
            }, {
                "name": "张三峰",
                rank: "副主任医生"
            }, {
                "name": "李莉",
                rank: "主任医生"
            }, ],
            // 当前显示的时间
            now: [],
            day: new Date().getDay(),
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
        // 初始化时间方法
        initDate() {
            let datetiem = new Date();
            this.now[0] = datetiem.format("yyyy-MM-dd");
            datetiem = datetiem.setDate(new Date().getDate() + 6);
            this.now[1] = new Date(datetiem).format("yyyy-MM-dd");

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
        selectOK(key, keyPath) {
            console.log(key, keyPath);
            this.active = 2;
        },
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