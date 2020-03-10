<template>
  <div class="layout" id="indexAll">
    <!-- 退出登录 -->
    <Modal v-model="modal1" width="388" :closable="false" footer-hide style="padding:0">
      <div
        style="display:flex;justify-content:center;align-items:center;width:100%;height:67px;background:#8A2E31;border-radius:4px 4px 0px 0px;"
      >
        <span style="font-size:20px;font-weight:400;color:rgba(255,255,255,1);">退出登录</span>
      </div>
      <div style="display:flex;justify-content:center;align-items:center;height:103px;">
        <span style="font-size:16px;font-weight:400;color:rgba(51,51,51,1);">确定要退出当前登录吗？</span>
      </div>
      <div style="text-align:center;">
        <Button
          style="width:90px;margin-right:40px;margin-bottom:28px;border:1px solid rgba(138,46,49,1);
        border-radius:6px;"
          @click="cancel"
        >
          <span
            style="font-size:18px;
            font-family:Source Han Sans CN;
            font-weight:400;
            color:rgba(138,46,49,1);"
          >取消</span>
        </Button>
        <Button
          style="width:90px;margin-bottom:28px;background:rgba(138,46,49,1);
        border-radius:6px;"
          @click="ok"
        >
          <span
            style="font-size:18px;
            font-family:Source Han Sans CN;
            font-weight:400;
            color:rgba(255,255,255,1);"
          >确定</span>
        </Button>
      </div>
    </Modal>
    <!-- 修改密码 -->
    <Modal v-model="modal2" width="482" :closable="false" footer-hide style="padding:0">
      <div
        style="display:flex;justify-content:center;align-items:center;width:100%;height:67px;background:#8A2E31;border-radius:4px 4px 0px 0px;"
      >
        <span style="font-size:20px;font-weight:400;color:rgba(255,255,255,1);">修改密码</span>
      </div>
      <div style="padding:0 20px 0 20px;margin-top:25px">
        <Form ref="changePassword" :model="changePassword" :rules="ruleValidate" :label-width="90">
          <FormItem label="原密码" prop="originalPassword">
            <Input
              placeholder="请输入当前密码"
              style="width:310px;"
              type="password"
              v-model="changePassword.originalPassword"
            ></Input>
          </FormItem>
          <FormItem label="新密码" prop="presentPassword">
            <Input
              placeholder="设置新密码"
              style="width:310px;"
              type="password"
              v-model="changePassword.presentPassword"
            ></Input>
          </FormItem>
          <FormItem label="确认密码" prop="affirmPassword">
            <Input
              placeholder="再次输入新密码"
              style="width:310px;"
              type="password"
              v-model="changePassword.affirmPassword"
            ></Input>
          </FormItem>
          <FormItem>
            <div style="display:flex;">
              <Button
                style="width:90px;margin-right:40px;margin-bottom:28px;border:1px solid rgba(138,46,49,1);
        border-radius:6px;"
                @click="cancel1('changePassword')"
              >
                <span
                  style="font-size:18px;
            font-family:Source Han Sans CN;
            font-weight:400;
            color:rgba(138,46,49,1);"
                >取消</span>
              </Button>
              <Button
                style="width:90px;margin-bottom:28px;background:rgba(138,46,49,1);
        border-radius:6px;"
                @click="ok1('changePassword')"
              >
                <span
                  style="font-size:18px;
            font-family:Source Han Sans CN;
            font-weight:400;
            color:rgba(255,255,255,1);"
                >确定</span>
              </Button>
            </div>
          </FormItem>
        </Form>
      </div>
    </Modal>

    <Layout :style="{height:height+'px',position: 'fixed', width: '100%',overflow: 'scroll'}">
      <Header class="header">
        <Menu mode="horizontal" theme="dark" :active-name="active" @on-select="getType">
          <div
            style="font-size:20px;height:48px;display:flex;justify-content:space-between;align-items:center"
          >
            <span
              style="font-size:20px;
              font-family:PingFang SC;
              font-weight:600;
              color:rgba(255,255,255,1);"
            >肉品品质安全数据库</span>

            <div
              style="font-size:20px;height:48px;display:flex;justify-content:space-between;align-items:center"
            >
              <div>
                <img src alt />
              </div>
              <div v-if="userType==1">
                <MenuItem name="2" style="width:40px;height:48px;">
                  <Icon
                    size="25"
                    type="ios-notifications-outline"
                    style="border-right:1px solid #eee;padding-right:5px"
                    @click="gotoInform"
                  />
                </MenuItem>
                <Submenu name="3">
                  <template slot="title" style="color:#fff;">{{name}}</template>
                  <MenuItem name="3-1">个人中心</MenuItem>
                  <MenuItem name="3-2">修改密码</MenuItem>
                  <MenuItem name="3-3">退出登录</MenuItem>
                </Submenu>
              </div>
              <div v-if="userType==2">
                <Submenu name="3">
                  <template slot="title" style="color:#fff;">普通用户</template>
                  <MenuItem name="3-2">修改密码</MenuItem>
                  <MenuItem name="3-3">退出登录</MenuItem>
                </Submenu>
              </div>
            </div>
          </div>
        </Menu>
      </Header>

      <Layout>
        <Sider v-model="isCollapsed" :style="{background: '#fff'}">
          <Menu
            v-if="userType==1"
            theme="light"
            width="auto"
            accordion
            @on-select="selectMenu"
            :class="menuitemClasses"
          >
            <div
              v-for="(item,index) in menuList"
              :key="item.name"
              style="border:0.5px solid rgba(238,238,238,1);"
            >
              <Submenu v-if="item.show&&item.children" :name="item.name">
                <template slot="title">
                  <div
                    v-if="item.title=='数据检索'"
                    style="display:flex;justify-content:flex-start;align-items:center;"
                  >
                    <img
                      src="static/img/dataSearch.png"
                      style="width:18px;height:18px;margin-right:14px"
                    />
                    <span
                      style="font-size:18px;
                    font-family:Source Han Sans CN;
                    font-weight:400;
                    color:rgba(51,51,51,1);"
                    >{{item.title}}</span>
                  </div>
                  <div
                    v-if="item.title=='数据上传'"
                    style="display:flex;justify-content:flex-start;align-items:center;"
                  >
                    <img
                      src="static/img/dataUpload.png"
                      style="width:18px;height:18px;margin-right:14px"
                    />
                    <span
                      class="menus"
                      style="font-size:18px;
                    font-family:Source Han Sans CN;
                    font-weight:400;
                    color:rgba(51,51,51,1);"
                    >{{item.title}}</span>
                  </div>
                  <div
                    v-if="item.title=='我的小组'"
                    style="display:flex;justify-content:flex-start;align-items:center;"
                  >
                    <img
                      src="static/img/myGroup.png"
                      style="width:18px;height:18px;margin-right:14px"
                    />
                    <span
                      class="menus"
                      style="font-size:18px;
                      font-family:Source Han Sans CN;
                      font-weight:400;
                      color:rgba(51,51,51,1);"
                    >{{item.title}}</span>
                  </div>
                </template>
                <div
                  v-if="item2.show || item2.name==='other'"
                  v-for="(item2,index2) in item.children"
                  :key="index2"
                  style="border:0.3px solid rgba(238,238,238,1);"
                >
                  <MenuItem v-if="!item2.children" :key="item2.name" :name="item2.name">
                    <span
                      class="menus"
                      style="font-size:18px;
                      font-family:Source Han Sans CN;
                      font-weight:400;
                      color:rgba(51,51,51,1);margin-left:20px;"
                    >{{item2.title}}</span>
                  </MenuItem>
                  <Submenu v-else :key="item2.name" :name="item2.name">
                    <template slot="title">{{item2.title}}</template>
                    <MenuItem
                      v-if="item3.show"
                      v-for="(item3,index3) in item2.children"
                      :key="item3.name"
                      :name="item3.name"
                    >
                      <span
                        class="menus"
                        style="font-size:18px;
                        font-family:Source Han Sans CN;
                        font-weight:400;
                        color:rgba(51,51,51,1);"
                      >{{item3.title}}</span>
                    </MenuItem>
                  </Submenu>
                </div>
              </Submenu>
              <MenuItem v-if="item.show&&!item.children" :name="item.name">
                <template>
                  <div
                    v-if="item.title=='首页'"
                    style="display:flex;justify-content:flex-start;align-items:center;"
                  >
                    <img src="static/img/home.png" style="width:18px;height:18px;margin-right:14px" />
                    <span
                      class="menus"
                      style="font-size:18px;
                    font-family:Source Han Sans CN;
                    font-weight:400;
                    color:rgba(51,51,51,1);"
                    >{{item.title}}</span>
                  </div>
                  <div
                    v-if="item.title=='我的下载'"
                    style="display:flex;justify-content:flex-start;align-items:center"
                  >
                    <img
                      src="static/img/mydownload.png"
                      style="width:18px;height:18px;margin-right:14px"
                    />
                    <span
                      class="menus"
                      style="font-size:18px;
                    font-family:Source Han Sans CN;
                    font-weight:400;
                    color:rgba(51,51,51,1);"
                    >{{item.title}}</span>
                  </div>
                </template>
              </MenuItem>
            </div>
          </Menu>

          <Menu
            v-if="userType==2"
            theme="light"
            width="auto"
            accordion
            @on-select="selectMenu"
            :class="menuitemClasses"
          >
            <div style="border:0.5px solid rgba(238,238,238,1);">
              <Submenu v-if="menuList[0].show&&menuList[0].children" :name="menuList[0].name">
                <template slot="title">
                  <div
                    v-if="menuList[0].title=='数据检索'"
                    style="display:flex;justify-content:flex-start;align-items:center;"
                  >
                    <img
                      src="static/img/dataSearch.png"
                      style="width:18px;height:18px;margin-right:14px"
                    />
                    <span
                      style="font-size:18px;
                    font-family:Source Han Sans CN;
                    font-weight:400;
                    color:rgba(51,51,51,1);"
                    >{{menuList[0].title}}</span>
                  </div>
                </template>
                <div
                  v-if="menuList[0].show || menuList[0].name==='other'"
                  v-for="(item2,index2) in menuList[0].children"
                  :key="index2"
                  style="border:0.3px solid rgba(238,238,238,1);"
                >
                  <MenuItem v-if="!item2.children" :key="item2.name" :name="item2.name">
                    <span
                      class="menus"
                      style="font-size:18px;
                      font-family:Source Han Sans CN;
                      font-weight:400;
                      color:rgba(51,51,51,1)"
                    >{{item2.title}}</span>
                  </MenuItem>
                </div>
              </Submenu>
            </div>
          </Menu>
        </Sider>
        <Layout :style="{padding: '0 24px 24px'}">
          <Breadcrumb
            style="margin:12px 0;height:43px;display:flex;align-items:center;justify-content:space-between;padding:0 10px"
          >
            <span style="font-size:14px;font-size:18px;color:#666666">{{$route.meta.title}}</span>

            <span
              style="font-size:12px;
              font-family:PingFang SC;
              font-weight:400;
              color:rgba(19,112,218,1);"
            >如有新闻活动消息展示需要，请联系 {{userName }}</span>
          </Breadcrumb>

          <Content :style="{padding: '',height: 'calc(100vh - 140px)', background: '#fff'}">
            <router-view />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import menuList from "../../perm/menuList";
export default {
  name: "index",
  //components: { UserSetting },
  data() {
    return {
      active: "",
      modal1: false,
      modal2: false,
      height: 0,
      menuList: [
        {
          show: false
        }
      ],
      isCollapsed: false,
      changePassword: {
        originalPassword: "",
        presentPassword: "",
        affirmPassword: ""
      },
      ruleValidate: {
        originalPassword: [
          {
            required: true,
            message: "原密码不能为空",
            trigger: "blur"
          }
        ],
        presentPassword: [
          {
            required: true,
            message: "新密码不能为空",
            trigger: "blur"
          }
        ],
        affirmPassword: [
          {
            required: true,
            message: "确认密码不能为空",
            trigger: "blur"
          }
        ]
      },
      userType: 2,
      userName: ""
    };
  },
  methods: {
    loginout() {
      localStorage.clear();
      this.$router.push("/");
    },
    selectMenu(name) {
      this.$router.push("/" + name);
    },
    // 生成左侧菜单
    getSideBar() {
      // console.log(111)
      let M = [];
      if (this.userType == 1) {
        M = menuList();
      }
      if (this.userType == 2) {
        M.push(menuList()[1]);
      }
      console.log(M);
      //let permPath = JSON.parse(localStorage.getItem("permPath"));
      function f(arr) {
        for (let i = 0; i < arr.length; i++) {
          arr[i].show = true;
          if (arr[i].children) {
            f(arr[i].children);
          }
        }
      }
      f(M);
      this.menuList = M;
      console.log(this.menuList);
      console.log(M);
    },
    getUserType() {
      this.userType = localStorage.getItem("userType");
      console.log(this.userType);
    },
    getType(name) {
      console.log(name);

      if (name == "3-1") {
        this.$router.push("/personalCenter");
      }
      if (name == "3-2") {
        this.modal2 = true;
      }
      if (name == "3-3") {
        this.modal1 = true;
      }
    },
    ok() {
      this.modal1 = false;
      this.loginout();
    },
    cancel(name) {
      this.modal1 = false;
    },
    ok1(name) {
      let form = new FormData();
      if (
        this.changePassword.presentPassword ==
        this.changePassword.affirmPassword
      ) {
        if (
          this.changePassword.originalPassword ==
          this.changePassword.presentPassword
        ) {
          this.$Message.error("新旧密码不能相同！");
        } else {
          form.append("originalPassword", this.changePassword.originalPassword);
          form.append("presentPassword", this.changePassword.presentPassword);
          this.$axios.post("/api/user/updatePasswordByUser", form).then(res => {
            if (res.data.code == 100) {
              console.log(res);
              this.$Message.success("修改成功，请使用新密码登录!");
              localStorage.clear();
              this.$refs[name].resetFields();
              this.modal2 = false;
              this.$router.push("/");
            } else {
              this.$Message.info(res.data.msg);
            }
          });
        }
      } else {
        this.$Message.error("新密码与确认密码不一致！");
      }
    },
    cancel1(name) {
      this.$refs[name].resetFields();
      this.modal2 = false;
    },
    gotoInform() {
      this.$router.push("/informCenter");
    }
  },
  mounted() {
    let _this = this;
    _this.height = document.documentElement.clientHeight - 2;
    window.onresize = function() {
      _this.height = document.documentElement.clientHeight - 2;
    };
    this.getUserType();
    this.getSideBar();
    this.userName = localStorage.getItem("userName");
  },
  computed: {
    menuitemClasses: function() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    },
    name: {
      get() {
        return this.$store.getters["name/getName"];
      },
      set(value) {
        this.$store.commit("name/setName", value);
      }
    }
  }
};
</script>
<style scoped>
.layout {
  overflow-y: scroll !important;
}
#indexAll .ivu-menu-horizontal {
  height: 64px;
  line-height: 64px;
}
#indexAll .header .ivu-menu-submenu .ivu-menu-submenu-title {
  color: #fff;
}
#indexAll .ivu-modal-body {
  padding: 0;
}
#indexAll .ivu-layout-header {
  height: 48px;
  background: rgba(138, 46, 49, 1);
}
#indexAll .ivu-menu-dark {
  height: 48px;
  background: rgba(138, 46, 49, 1);
}

#indexAll .ivu-menu .ivu-menu-dark .ivu-menu-horizontal .ivu-menu-item {
  font-size: 20px;
  font-family: PingFang SC;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
}
#indexAll .ivu-layout-header {
  padding: 0 16px 0 29px;
}
#indexAll .ivu-modal-body {
  padding: 0 !important;
}
</style>
