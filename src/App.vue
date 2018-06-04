<template>
  <div id="app" class="app">
    <div class="login" v-show="loginShow">
      <img class="loginPic" src="./logo.png" alt="">
      <el-form
        label-width="45px"
        class="demo-ruleForm loginIn"
        @keydown="keyEvent($event)"
        :model="ruleForm2"
        status-icon
        :rules="rules2"
        ref="ruleForm2">
          <el-form-item label="账号" prop="username">
            <el-input
              autofocus="true"
              v-model="ruleForm2.username"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="ruleForm2.password"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item v-if="menuShow === true">
            <el-button type="primary" @click="submitFormManager('ruleForm2')">登录</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
            <!--<el-button type="text" @click="clearLocalStorage">清除</el-button>-->
          </el-form-item>
      </el-form>
    </div>
    <el-button @click="changeMenuShow" class="menu-control-button" icon="el-icon-d-arrow-right" circle v-if="menuClass === 'menu-class'" v-show="!menuShow"></el-button>
    <el-row v-show="loginstate" class="main-content" id="main-content" ref="main-content" v-loading.fullscreen.lock="fullscreenLoading">
      <el-popover
        placement="bottom"
        width="350"
        v-model="showServiceMsg">
        <el-tabs v-model="activeService">
          <el-tab-pane label="未处理" name="first">
            <div v-for="item in 20" class="serviceList">
              <span>餐桌：{{item}}</span>
              <span>酒水</span>
              <span>
                <el-button size="mini" type="text" @click="showServiceMsg = false">删除</el-button>
                <el-button type="primary" size="mini" @click="showServiceMsg = false">已处理</el-button>
              </span>
            </div>
          </el-tab-pane>
          <el-tab-pane label="已处理" name="second">已处理</el-tab-pane>
        </el-tabs>
        <div class="service-log" slot="reference">
          <el-button size="mini" type="primary" icon="el-icon-bell" round @click="pullService">服务推送</el-button>
        </div>
      </el-popover>
      <i style="color: #ff525b" class="el-icon-circle-close person-close" @click="loginOut"></i>
      <el-col :class="menuClass" :span="menuStyle.menuWidth" v-show="menuShow">
        <img v-if="menuStyle.logoShow === 1" @click="changeSize" src="./logo.png" alt="">
        <img v-if="menuStyle.logoShow === 2" @click="changeSize" src="./favicon.png" alt="">
        <el-button @click="changeMenuShow" class="menu-control-button" icon="el-icon-d-arrow-left" circle v-if="menuClass === 'menu-class'"></el-button>
        <!--<div @click.once="changeMenuShow" class="menu-mask" v-if="menuClass === 'menu-class'"></div>-->
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          :collapse="menuStyle.menuCollapse">
          <router-link :to="{path:'/manager/xwfs'}" class="vlink">
            <el-menu-item index="1">
              <svg t="1527586395170" class="icon" style="width: 24px; height: 24px;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1664"><path d="M189.905455 819.665455h644.18909v46.545454H189.905455z" fill="#2c2c2c" p-id="1665"></path><path d="M375.156364 842.938182h-46.545455v-116.363637H148.945455a23.272727 23.272727 0 0 1-23.272728-23.272727V181.061818a23.272727 23.272727 0 0 1 23.272728-23.272727h726.10909a23.272727 23.272727 0 0 1 23.272728 23.272727v522.24a23.272727 23.272727 0 0 1-23.272728 23.272727h-137.30909v-46.545454h114.036363V204.334545H172.218182v475.694546h179.665454a23.272727 23.272727 0 0 1 23.272728 23.272727z" fill="#2c2c2c" p-id="1666"></path><path d="M695.389091 842.938182h-46.545455v-116.363637H423.563636v-46.545454h248.087273a23.272727 23.272727 0 0 1 23.272727 23.272727z" fill="#2c2c2c" p-id="1667"></path><path d="M506.88 418.909091a23.272727 23.272727 0 0 1-20.014545-11.636364L401.687273 263.912727l40.029091-23.738182 65.163636 110.312728 65.163636-110.312728 40.029091 23.738182-85.178182 143.825455a23.272727 23.272727 0 0 1-20.014545 11.170909z" fill="#2c2c2c" p-id="1668"></path><path d="M396.101818 372.363636h231.796364v46.545455H396.101818zM396.101818 465.454545h231.796364v46.545455H396.101818z" fill="#2c2c2c" p-id="1669"></path><path d="M483.607273 395.636364h46.545454v231.796363h-46.545454z" fill="#2c2c2c" p-id="1670"></path></svg>
              <span slot="title" class="title">餐桌收银</span>
            </el-menu-item>
          </router-link>
          <router-link :to="{path:'/manager/xwfs/order'}" class="vlink">
            <el-menu-item index="2">
              <svg class="icon" style="width: 24px; height: 24px;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4631">
                <path d="M299.18014 452.272343h358.991785" fill="#FFFFFF" p-id="4632"></path><path d="M658.171925 478.864327H299.18014a26.591984 26.591984 0 0 1 0-53.183968h358.991785a26.591984 26.591984 0 0 1 0 53.183968z" fill="" p-id="4633"></path><path d="M299.18014 611.824247h465.359721" fill="#FFFFFF" p-id="4634"></path><path d="M764.539861 638.416231H299.18014a26.591984 26.591984 0 0 1 0-53.183968h465.359721a26.591984 26.591984 0 0 1 0 53.183968z" fill="" p-id="4635"></path><path d="M299.18014 771.376152h332.399801" fill="#FFFFFF" p-id="4636"></path><path d="M631.579941 797.968136H299.18014a26.591984 26.591984 0 0 1 0-53.183969h332.399801a26.591984 26.591984 0 0 1 0 53.183969z" fill="" p-id="4637"></path><path d="M737.947877 1024H285.884148A186.143888 186.143888 0 0 1 99.74026 837.856112V332.608415a186.143888 186.143888 0 0 1 186.143888-186.143889 26.591984 26.591984 0 0 1 0 53.183968A132.95992 132.95992 0 0 0 152.924228 332.608415v505.247697a132.95992 132.95992 0 0 0 132.95992 132.95992h452.063729a132.95992 132.95992 0 0 0 132.95992-132.95992V332.608415a132.95992 132.95992 0 0 0-132.95992-132.959921 26.591984 26.591984 0 0 1 0-53.183968 186.143888 186.143888 0 0 1 186.143888 186.143889v505.247697a186.143888 186.143888 0 0 1-186.143888 186.143888z" fill="" p-id="4638"></path><path d="M644.875933 292.720439H378.956092a106.367936 106.367936 0 0 1 0-212.735873h29.915982a106.367936 106.367936 0 0 1 206.087877 0H644.875933a106.367936 106.367936 0 0 1 0 212.735873zM378.956092 133.168534a53.183968 53.183968 0 0 0 0 106.367937h265.919841a53.183968 53.183968 0 0 0 0-106.367937h-53.183968a26.591984 26.591984 0 0 1-26.591984-26.591984 53.183968 53.183968 0 0 0-106.367937 0 26.591984 26.591984 0 0 1-26.591984 26.591984z" fill="" p-id="4639"></path></svg>
              <span slot="title" class="title">订单管理</span>
            </el-menu-item>
          </router-link>
          <router-link :to="{path:'/manager/xwfs/goods'}" class="vlink">
            <el-menu-item index="3">
              <svg class="icon" style="width: 25px; height: 24px;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3916">
                <path d="M72.576 914.07h878.848v-41.85H72.576v41.85m62.857-209.252h40.117l2.156-39.566C187.394 488.372 334.014 349.095 512 349.095c177.948 0 324.59 139.276 334.277 316.157l2.198 39.566h40.112c11.552 0 21.007 9.418 21.007 20.928 0 11.507-9.477 20.923-21.007 20.923H135.433c-11.59 0-21.007-9.416-21.007-20.923 0-11.51 9.438-20.928 21.007-20.928zM512 181.695c34.513 0.219 62.372 28.26 62.372 62.773 0 34.513-27.859 62.554-62.372 62.777-34.669 0-62.773-28.107-62.773-62.777 0-34.669 28.104-62.773 62.773-62.773zM135.433 788.521h753.133c34.678-0.013 62.803-28.096 62.857-62.774 0-34.593-28.142-62.777-62.857-62.777-9.835-172.357-135.279-313.704-299.896-347.77a103.978 103.978 0 0 0 27.956-70.731c0-57.782-46.846-104.623-104.627-104.623-57.782 0-104.623 46.841-104.623 104.623a103.988 103.988 0 0 0 28.205 71.043C284.21 347.654 168.203 472.804 139.998 624.528a380.216 380.216 0 0 0-4.083 38.441c-35.092 0-63.339 28.105-63.339 62.777 0 34.59 28.125 62.775 62.857 62.775z m0 0M326.9 526.12c43.36-58.756 112.075-93.401 185.1-93.324 11.557 0 20.927-9.371 20.927-20.927 0-11.557-9.37-20.923-20.927-20.923-86.292-0.073-167.484 40.858-218.747 110.271-6.878 9.296-4.92 22.4 4.37 29.278 9.291 6.873 22.4 4.916 29.277-4.375z m0 0" p-id="3917"></path></svg>
              <span slot="title" class="title">菜品管理</span>
            </el-menu-item>
          </router-link>
          <router-link :to="{path:'/manager/xwfs/finance'}" class="vlink">
            <el-menu-item index="4">
              <svg class="icon" style="width: 24px; height: 24px;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2214">
                <path d="M849.822716 315.545252 176.769047 315.545252c-60.418236 0-109.566514 49.148277-109.566514 109.566514l0 414.788973c0 60.418037 49.148277 109.566514 109.566514 109.566514l673.05347 0c60.403446 0 109.566514-49.148477 109.566514-109.566514L959.38903 425.111766C959.38903 364.67794 910.225963 315.545252 849.822716 315.545252L849.822716 315.545252zM896.77948 839.900739c0 25.889047-21.067116 46.956963-46.956963 46.956963L176.769047 886.857702c-25.889047 0-46.956963-21.068715-46.956963-46.956963L129.812083 425.111766c0-25.889847 21.067916-46.956963 46.956963-46.956963l673.05347 0c25.889847 0 46.956963 21.067116 46.956963 46.956963L896.77948 839.900739 896.77948 839.900739zM658.972912 606.178803c13.524031 0 24.52797-10.98835 24.52797-24.52797 0-13.53962-11.004139-24.54276-24.52797-24.54276l-91.800959 0 93.617727-93.601138c9.578506-9.594295 9.578506-25.122367 0-34.701672-9.579505-9.594295-25.106578-9.594295-34.701672 0l-111.461629 111.493008-111.492208-111.493008c-9.579505-9.594295-25.106578-9.594295-34.701672 0-9.578506 9.563716-9.578506 25.107377 0 34.701672l93.617727 93.601138-94.446365 0c-13.555409 0-24.52797 11.00314-24.52797 24.54276 0 13.53962 10.97276 24.52797 24.52797 24.52797l121.149061 0 0 54.063545-121.149061 0c-13.555409 0-24.52797 10.98835-24.52797 24.543759 0 13.53962 10.97276 24.510582 24.52797 24.510582l121.149061 0 0 115.592628c0 13.53962 10.97276 24.52797 24.52797 24.52797 13.53962 0 24.526371-10.98835 24.526371-24.52797l0-115.592628 121.149061 0c13.523031 0 24.52797-10.971761 24.52797-24.510582 0-13.555409-11.004139-24.543759-24.52797-24.543759l-121.149061 0 0-54.063545L658.972912 606.178803 658.972912 606.178803zM179.696862 276.663814l667.18325 0c17.280284 0 31.304376-14.023292 31.304376-31.304376 0-17.295873-14.024891-31.305175-31.304376-31.305175l-667.18325 0c-17.280284 0-31.305175 14.008502-31.305175 31.305175C148.391487 262.640522 162.416578 276.663814 179.696862 276.663814L179.696862 276.663814zM262.857678 176.239302l500.876606 0c17.281083 0 31.305175-14.024891 31.305175-31.304376 0-17.295873-14.023292-31.304376-31.305175-31.304376L262.857479 113.63055c-17.280284 0-31.305175 14.009302-31.305175 31.304376C231.552304 162.214411 245.561605 176.239302 262.857678 176.239302L262.857678 176.239302z" p-id="2215"></path></svg>
              <span slot="title" class="title">财务信息</span>
            </el-menu-item>
          </router-link>
          <router-link :to="{path:'/manager/xwfs/coupon'}" class="vlink">
            <el-menu-item index="5">
              <svg class="icon" style="width: 24px; height: 24px;vertical-align: middle;fill: currentColor;overflow: hidden;"
                   viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10081">
                <path d="M928.16687 1024 95.83313 1024 95.83313 0l167.693776 128.66748 117.703761-115.261067 116.226784 113.840896 119.010318-113.159214 126.395207 115.601908 185.417508-126.849662L928.280484 1024zM138.438256 981.394874l747.123488 0L885.561744 83.562854l-146.561633 100.377677L616.97903 72.3151 496.946189 186.383224 381.17386 72.996782 266.878509 184.963053 138.438256 86.403195 138.438256 981.394874zM263.072451 518.873627l180.020859 0c12.611117-16.644403 23.51803-34.084101 32.777544-52.205481L295.338733 466.668146 295.338733 428.891601l107.251304 0C379.583269 406.680129 356.974148 385.604793 334.762676 365.55198l27.210474-29.482747c25.563076 21.132142 49.649173 42.264285 72.258294 63.339621L406.452901 428.891601l87.255298 0C506.26251 397.818263 516.601354 364.30223 524.781538 328.343504l42.832353 8.350605c-8.521025 32.607123-18.178187 63.339621-28.914679 92.254299l114.465772 0-26.131144-26.131144c25.165428-22.949961 46.865639-45.161433 65.043826-66.691224l33.91368 27.210474c-18.519028 18.916676-41.298569 40.787307-68.338622 65.555087l119.464773 0 0 37.776545-253.926551 0C514.953955 484.448685 505.3536 501.888383 494.219461 518.873627l311.131033 0 0 37.776545-153.321647 0c40.7305 41.866637 93.844891 68.90669 159.456785 81.176967-11.077333 13.292799-22.268279 27.437701-33.345612 42.207478-73.735271-24.086098-132.587152-65.157439-176.669256-123.384445L465.87285 556.650172c-43.002774 51.126151-101.513813 96.287585-175.589926 135.597914-10.395651-13.292799-21.302563-25.563076-32.777544-36.697215 61.521802-26.301564 112.079885-59.249528 151.674248-98.900699L263.072451 556.650172 263.072451 518.873627zM356.462887 657.823144l118.896705 0c3.351603-20.734495 6.078331-43.854876 8.350605-69.474759l43.343615 0c-2.556308 25.165428-5.339842 48.342616-8.350605 69.474759l190.530123 0c-3.351603 60.726506-6.6464 104.638189-9.998003 131.678243-6.248752 52.603129-36.526795 79.075114-90.550094 79.415955-28.17619 0.340841-62.08987 0.170421-101.684234-0.568068-1.874626-14.485743-4.65816-29.482747-8.293798-44.991013 42.207478 2.215467 77.030068 3.351603 104.410962 3.351603 31.130145 0 49.081105-14.485743 53.909686-43.400422 3.294796-22.893154 5.907911-52.205481 7.782536-87.766559L511.431932 695.542883c-22.552313 86.346389-91.118163 148.322645-205.527127 186.09919-8.521025-12.213469-17.666926-24.654166-27.210474-37.208477 104.80861-32.209475 167.580162-81.801842 188.314657-148.890713L356.462887 695.542883 356.462887 657.823144z" p-id="10082"></path></svg>
              <span slot="title" class="title">卡券管理</span>
            </el-menu-item>
          </router-link>
          <router-link :to="{path:'/manager/xwfs/member'}" class="vlink">
            <el-menu-item index="6">
              <svg class="icon" style="width: 24px; height: 24px;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1596">
                <path d="M877.909 302.285c-28.763 0-52.065 23.301-52.065 52.065 0 7.282 1.456 14.199 4.127 20.511l-169.665 70.39-119.299-204.982c13.593-9.467 22.452-25.122 22.452-42.841 0-28.763-23.301-52.065-52.065-52.065s-52.065 23.301-52.065 52.065c0 17.598 8.738 33.132 22.087 42.598l-132.406 205.104-154.738-69.298c2.913-6.554 4.611-13.714 4.611-21.36 0-28.763-23.301-52.065-52.065-52.065s-52.307 23.18-52.307 51.943c0 28.399 22.695 51.458 50.973 52.065l80.706 347.948c3.035 13.229 14.806 22.574 28.399 22.574h513.244c13.593 0 25.364-9.345 28.399-22.574l80.828-347.948h0.85c28.763 0 52.065-23.301 52.065-52.065s-23.301-52.065-52.065-52.065zM744.774 718.681h-467.005l-62.501-269.548 132.65 59.468c13.107 5.825 28.641 1.334 36.409-10.801l125.732-194.909 112.746 193.695c7.282 12.622 22.816 17.84 36.287 12.257l148.79-61.774-63.109 271.611zM762.371 819.655l-502.201 0.122c-16.142 0-29.127 12.986-29.127 29.127s12.986 29.127 29.127 29.127l502.201-0.122c16.142 0 29.127-12.986 29.127-29.127s-12.986-29.127-29.127-29.127z" fill="" p-id="1597"></path></svg>
              <span slot="title" class="title">会员管理</span>
            </el-menu-item>
          </router-link>
          <router-link :to="{path:'/manager/xwfs/setting'}" class="vlink">
            <el-menu-item index="7">
              <svg class="icon" style="width: 24px; height: 24px;vertical-align: middle;fill: currentColor;overflow: hidden;"
                   viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10668"><path d="M659.2 985.6c-19.2 0-38.4-6.4-44.8-19.2-12.8-19.2-64-64-102.4-64-38.4 0-89.6 44.8-102.4 57.6-12.8 12.8-32 19.2-44.8 19.2-6.4 0-19.2 0-25.6-6.4l-121.6-70.4c-19.2-12.8-32-44.8-19.2-70.4 0 0 12.8-25.6 12.8-51.2 0-70.4-57.6-128-128-128H64c-19.2 0-38.4-19.2-44.8-44.8 0 0-12.8-57.6-12.8-96 0-44.8 12.8-96 12.8-96 6.4-32 25.6-51.2 44.8-51.2h6.4c70.4 0 128-57.6 128-128 0-25.6-6.4-51.2-6.4-51.2-12.8-25.6 0-57.6 19.2-70.4l128-70.4c6.4 0 12.8-6.4 25.6-6.4 19.2 0 38.4 6.4 44.8 19.2 12.8 19.2 64 57.6 102.4 57.6 38.4 0 89.6-38.4 102.4-57.6 12.8-12.8 32-19.2 44.8-19.2 6.4 0 19.2 0 25.6 6.4l128 70.4c19.2 12.8 32 44.8 19.2 70.4 0 0-12.8 25.6-12.8 51.2 0 70.4 57.6 128 128 128h12.8c19.2 0 38.4 19.2 44.8 44.8 0 0 12.8 57.6 12.8 96 0 44.8-12.8 96-12.8 96-6.4 25.6-25.6 44.8-44.8 44.8h-6.4c-70.4 0-128 57.6-128 128 0 25.6 12.8 51.2 12.8 51.2 12.8 25.6 0 57.6-19.2 70.4l-128 70.4c-12.8 19.2-19.2 19.2-32 19.2m0-57.6l121.6-64c0-6.4-12.8-38.4-12.8-70.4 0-102.4 76.8-185.6 179.2-192 0-6.4 6.4-51.2 6.4-83.2s-6.4-76.8-6.4-83.2c-102.4-6.4-179.2-89.6-179.2-192 0-32 12.8-64 12.8-70.4l-115.2-64h-6.4s-19.2 19.2-44.8 38.4c-32 12.8-70.4 25.6-102.4 25.6s-64-12.8-102.4-38.4c-19.2-12.8-38.4-32-38.4-38.4h-6.4l-121.6 64c0 6.4 12.8 38.4 12.8 70.4 0 102.4-76.8 185.6-179.2 192 0 6.4-6.4 51.2-6.4 83.2s6.4 76.8 6.4 83.2c102.4 6.4 179.2 89.6 179.2 192 0 32-12.8 64-12.8 70.4l115.2 64h6.4s19.2-19.2 44.8-38.4c38.4-25.6 70.4-38.4 102.4-38.4s70.4 12.8 102.4 38.4c25.6 25.6 38.4 44.8 44.8 51.2M512 684.8c-96 0-172.8-76.8-172.8-172.8 0-96 76.8-172.8 172.8-172.8 96 0 172.8 76.8 172.8 172.8 0 96-76.8 172.8-172.8 172.8m0-288C448 396.8 396.8 448 396.8 512S448 627.2 512 627.2 627.2 576 627.2 512C620.8 448 569.6 396.8 512 396.8m0 0z" fill="" p-id="10669"></path></svg>
              <span slot="title" class="title">系统设置</span>
            </el-menu-item>
          </router-link>
          <!--<router-link :to="{path:'/manager/xwfs/test'}" class="vlink">-->
            <!--<el-menu-item index="8">-->
              <!--<svg class="icon" style="width: 24px; height: 24px;vertical-align: middle;fill: currentColor;overflow: hidden;"-->
                   <!--viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10668"><path d="M659.2 985.6c-19.2 0-38.4-6.4-44.8-19.2-12.8-19.2-64-64-102.4-64-38.4 0-89.6 44.8-102.4 57.6-12.8 12.8-32 19.2-44.8 19.2-6.4 0-19.2 0-25.6-6.4l-121.6-70.4c-19.2-12.8-32-44.8-19.2-70.4 0 0 12.8-25.6 12.8-51.2 0-70.4-57.6-128-128-128H64c-19.2 0-38.4-19.2-44.8-44.8 0 0-12.8-57.6-12.8-96 0-44.8 12.8-96 12.8-96 6.4-32 25.6-51.2 44.8-51.2h6.4c70.4 0 128-57.6 128-128 0-25.6-6.4-51.2-6.4-51.2-12.8-25.6 0-57.6 19.2-70.4l128-70.4c6.4 0 12.8-6.4 25.6-6.4 19.2 0 38.4 6.4 44.8 19.2 12.8 19.2 64 57.6 102.4 57.6 38.4 0 89.6-38.4 102.4-57.6 12.8-12.8 32-19.2 44.8-19.2 6.4 0 19.2 0 25.6 6.4l128 70.4c19.2 12.8 32 44.8 19.2 70.4 0 0-12.8 25.6-12.8 51.2 0 70.4 57.6 128 128 128h12.8c19.2 0 38.4 19.2 44.8 44.8 0 0 12.8 57.6 12.8 96 0 44.8-12.8 96-12.8 96-6.4 25.6-25.6 44.8-44.8 44.8h-6.4c-70.4 0-128 57.6-128 128 0 25.6 12.8 51.2 12.8 51.2 12.8 25.6 0 57.6-19.2 70.4l-128 70.4c-12.8 19.2-19.2 19.2-32 19.2m0-57.6l121.6-64c0-6.4-12.8-38.4-12.8-70.4 0-102.4 76.8-185.6 179.2-192 0-6.4 6.4-51.2 6.4-83.2s-6.4-76.8-6.4-83.2c-102.4-6.4-179.2-89.6-179.2-192 0-32 12.8-64 12.8-70.4l-115.2-64h-6.4s-19.2 19.2-44.8 38.4c-32 12.8-70.4 25.6-102.4 25.6s-64-12.8-102.4-38.4c-19.2-12.8-38.4-32-38.4-38.4h-6.4l-121.6 64c0 6.4 12.8 38.4 12.8 70.4 0 102.4-76.8 185.6-179.2 192 0 6.4-6.4 51.2-6.4 83.2s6.4 76.8 6.4 83.2c102.4 6.4 179.2 89.6 179.2 192 0 32-12.8 64-12.8 70.4l115.2 64h6.4s19.2-19.2 44.8-38.4c38.4-25.6 70.4-38.4 102.4-38.4s70.4 12.8 102.4 38.4c25.6 25.6 38.4 44.8 44.8 51.2M512 684.8c-96 0-172.8-76.8-172.8-172.8 0-96 76.8-172.8 172.8-172.8 96 0 172.8 76.8 172.8 172.8 0 96-76.8 172.8-172.8 172.8m0-288C448 396.8 396.8 448 396.8 512S448 627.2 512 627.2 627.2 576 627.2 512C620.8 448 569.6 396.8 512 396.8m0 0z" fill="" p-id="10669"></path></svg>-->
              <!--<span slot="title" class="title">系统设置</span>-->
            <!--</el-menu-item>-->
          <!--</router-link>-->
        </el-menu>
      </el-col>
      <audio id="orderAudio"><source src="http://data.huiyi8.com/yinxiao/mp3/73913.mp3" type="audio/mpeg"></audio>

      <el-col :span="menuStyle.mainWidth" @click.native.once="changeSize(true)">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  // 信息推送
  export default {
  name: 'App',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === ''){
        callback(new Error('请输入账号'));
      }else{
        if (this.ruleForm2.password !== '') {
          this.$refs.ruleForm2.validateField('password');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {

      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (value !== this.ruleForm2.username) {
        callback(new Error('密码不对'));
      } else {
        callback();
      }
    };
    return {
      screenWidth: document.body.clientWidth,
      screenHeight: document.body.clientHeight,
      menuStyle:{
        menuWidth: 4,
        mainWidth: 20,
        logoShow: 1,
        menuCollapse: false,
        switchTab: true
      },
      showServiceMsg:false,
      fullscreenLoading: false,
      activeService:'first',
      loginstate: false,
      loginShow: true,
      menuShow: true,
      menuClass:'menu',
      ruleForm2: {
        username: '',
        password: '',
      },
      settingForm: {},
      printerTable: [],
      printerTemplateTable: [],
      rules2: {
        username: [
          { validator: validatePass, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    };
  },
  watch:{
    watchOrder(val){
      this._pullSetting()
      if(this.settingForm.serviceRemindType){
        let audio = document.getElementById('orderAudio')
        audio.play();
      }
      // console.log(this.settingForm.serviceRemindType);
      // 收银台
      var id = this.settingForm.cashierPrinterId  //打印机id  用来获得打印名
      var num = this.settingForm.cashierPrinterNum
      var templateId = this.settingForm.cashierPrinterTemplate  //打印机模板

      // 厨房
      var idKitchen = this.settingForm.kitchenPrinterId  //打印机id  用来获得打印名
      var numKitchen = this.settingForm.kitchenPrinterNum
      var templateIdKitchen = this.settingForm.kitchenPrinterTemplate  //打印机模板

      var printerName
      var printerTemplate
      var printerNameKitchen
      var printerTemplateKitchen

      for(let i = 0; i<this.printerTable.length; i++){
        if(this.printerTable[i].id === id){
          printerName = this.printerTable[i].driverName  //获得打印机名
        }
      }
      for(let i = 0; i<this.printerTemplateTable.length; i++){
        if(this.printerTemplateTable[i].id === templateId){
          printerTemplate = this.printerTemplateTable[i].name  //获得打印机模板
        }
      }

      for(let i = 0; i<this.printerTable.length; i++){
        if(this.printerTable[i].id === idKitchen){
          printerNameKitchen = this.printerTable[i].driverName  //获得打印机名
        }
      }
      for(let i = 0; i<this.printerTemplateTable.length; i++){
        if(this.printerTemplateTable[i].id === templateIdKitchen){
          printerTemplateKitchen = this.printerTemplateTable[i].name  //获得打印机模板
        }
      }

      // 收银台打印
      console.log('收银台准备打印-----清单：',val, '打印机名：',printerName,'数量：', num,'打印模板名：',printerTemplate);
      if(printerTemplate === '80mm-价格-订单号'){
        this.cashier80(val,printerName,num)
        console.log('正在打印 启动的是收银台80mm模板，打印机器是' + printerName);
      }else if(printerTemplate === '60mm-价格-订单号'){
        this.cashier60(val,printerName,num)
        console.log('正在打印 启动的是收银台60mm模板，打印机器是' + printerName);
      }else if(printerTemplate === '80mm-无价格'){
        this.kitchen80(val,printerName,num)
        console.log('正在打印 启动的是厨房80mm模板，打印机器是'+ printerName)
      }else if(printerTemplate === '60mm-无价格'){
        this.kitchen60(val,printerName,num)
        console.log('正在打印 启动的是厨房60mm模板，打印机器是'+ printerName)
      }

      // 厨房打印
      console.log('厨房准备打印-----清单：',val, '打印机名：',printerNameKitchen,'数量：', numKitchen,'打印模板名：',printerTemplateKitchen);
      if(printerTemplateKitchen === '80mm-无价格'){
        this.kitchen80(val,printerNameKitchen,numKitchen)
        console.log('正在打印 启动的是厨房80mm模板，打印机器是' + printerNameKitchen);
      }else if(printerTemplateKitchen === '60mm-无价格'){
        this.kitchen60(val,printerNameKitchen,numKitchen)
        console.log('正在打印 启动的是厨房60mm模板，打印机器是' + printerNameKitchen);
      }else if(printerTemplateKitchen === '80mm-价格-订单号'){
        this.cashier80(val,printerNameKitchen,numKitchen)
        console.log('正在打印 启动的是收银台80mm模板，打印机器是' + printerNameKitchen);
      }else if(printerTemplateKitchen === '60mm-价格-订单号'){
        this.cashier60(val,printerNameKitchen,numKitchen)
        console.log('正在打印 启动的是收银台60mm模板，打印机器是' + printerNameKitchen);
      }
    }
  },
  computed:{
    watchOrder(){
      return this.$store.state.orderStatus
    }
  },
  methods: {
    _pullSetting(){
      this.$request(this.url.restaurantSetting,'json',[]).then((res)=>{
        this.settingForm = res.data.data[0]
      }).catch((err)=>{
        console.log(err);
      })
    },
    _pullPrinter(){
      this.$request(this.url.printerComplexPageQuery,'json',[]).then((res)=>{
        this.printerTable = res.data.data
      }).catch((err)=>{
        console.log(err);
      })
    },
    _pullPrinterTemplate(){
      this.$request(this.url.printerTemplateComplexPageQuery,'json',[{
        feild:"status",
        value:"enable",
        joinType:"eq"
      }]).then((res)=>{
        this.printerTemplateTable = res.data.data
      }).catch((err)=>{
        console.log(err);
      })
    },
    _pullService(){
      let data = [
        {
          feild:'status',
          value:'123',
          joinType:'ne'
        }
      ]
      // this.$request(this.url.restaurantServiceComplexPageQuery,'json',data).then((res)=>{
      //   // this.dishesCategory = res.data.data
      //   console.log(res);
      // }).catch((err)=>{
      //   console.log(err);
      // })
    },
    pullService() {
      this._pullService()
      this.$notify({
        title: '茶水',
        offset: 100,
        onClick:function () {
          alert('处理中')
        },
        message:'点击处理',
        duration: 3500,
        iconClass:'el-icon-bell'
      });
    },
    submitFormManager(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            username:this.ruleForm2.username,
            password:this.ruleForm2.password
          }
          this.$request(this.url.loginRestaurantManager,'form',data).then((res)=>{
            if(res.data.msg === 'username is not exist'){
              this.$message({
                duration: 1000,
                type: 'info',
                message: '用户名不存在'
              });
            }else if(res.data.msg === 'success'){
              let rid = res.data.data.rid
              localStorage.setItem('rid',JSON.stringify(rid))

              this.loginstate = true
              this.loginShow = false
              this.$message({
                duration: 1000,
                type: 'success',
                message: '欢迎登录新沃丰系统'
              });
              this.$router.push({path:'/manager/xwfs/'})
            }else if(res.data.msg === "username is not exist or password is incorrect"){
              this.$message({
                duration: 1000,
                type: 'info',
                message: '用户不存在或者密码不正确'
              });
            }
          }).catch((err)=>{
            console.log(err);
          })
        } else {
          console.log('提交失败');
          return false;
        }
      });
    },
    changeMenuShow(){
      this.menuShow = !this.menuShow
    },
    changeSize(e){
      this.menuStyle.switchTab = !this.menuStyle.switchTab
      if(this.menuStyle.switchTab){
        this.menuStyle = {
          menuWidth: 4,
          mainWidth: 20,
          logoShow: 1,
          menuCollapse: false,
          switchTab: true
        }
      }else {
        this.menuStyle = {
          menuWidth: 2,
          mainWidth: 22,
          logoShow: 2,
          menuCollapse: true,
          switchTab: false
        }
      }
      this.fitSize()
      if(this.screenWidth > 820) {
        if (e === true) {
          this.$notify({
            message: '点击图标可以切换',
            position: 'top-left',
            duration: 2000,
            offset: 48,
            customClass: 'notify',
            iconClass: 'el-icon-arrow-up',
            showClose: false
          });
        }
      }
    },
    clearLocalStorage(){
      localStorage.clear()
    },
    loginOut(){
      this.$confirm('即将退出系统, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loginstate = false
        this.loginShow = true
        this.$message({
          duration: 1500,
          type: 'success',
          message: '退出成功，感谢您的使用！'
        });

      }).catch(() => {
        this.$message({
          duration: 1500,
          type: 'info',
          message: '已取消'
        });
      });
    },
    _pullDishes(){
      var Data = [
        {
          feild:'status',
          value:'123',
          joinType:'ne'
        }
      ]
      this.$request(this.url.dishes2,'json',Data).then((res)=>{
        let response = res.data.data
        this.dishesDataTable = response
        this.$store.state.dishesDataTable = response
        // console.log(response);
      }).catch((err)=>{
        console.log(err);
      })
    },
    resetForm(formName) {
      this.ruleForm2 = {
        username: '',
        password: '',
      }
      this.$refs[formName].resetFields();
    },
    fitSize(){

      if(this.screenWidth < 820){
        this.menuClass = 'menu-class'
        this.menuStyle = {
          menuWidth: 5,
          mainWidth: 24,
          logoShow: 1,
          menuCollapse: false,
          switchTab: true
        }
      }
    }
  },
  created() {
    this._pullSetting()
    this._pullDishes()
    this._pullService()
    this._pullPrinter()
    this._pullPrinterTemplate()
    if (localStorage.rid){
      this.ruleForm2.username = 17375636967
      this.ruleForm2.password = 17375636967
    }
    this.$store.state.screenWidth = this.screenWidth

    if (this.screenHeight < 380) {
      this.$store.state.tableHeight = 260
    }
    console.log(this.screenHeight);
    console.log(this.screenHeight);
    this.fitSize()
  }
}

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "App.styl"
</style>
