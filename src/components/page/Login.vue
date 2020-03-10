<template>
  <div class="account">
    <div class="container">
      <div class="content">
        <div class="wapper">
          <div class="title1">
            <span>肉品品质安全数据库</span>
          </div>

          <div class="introduce">
            <div class="iLeft">
              <span>国家生猪产业技术体系</span>
              <span>中国农业科学院农业质量标准与检测技术研究所</span>
            </div>
            <div class="iRight">
              <span>&研发</span>
            </div>
          </div>

          <Form :model="account" ref="login" id="login">
            <FormItem>
              <div class="user_item">
                <img src="/static/img/userName.png" class="userName" />
                <input v-model="account.account" placeholder="请输入账号" />
              </div>
            </FormItem>
            <FormItem>
              <div class="user_item">
                <img src="/static/img/password.png" class="userName" />
                <input type="password" v-model="account.password" placeholder="请输入密码" />
              </div>
            </FormItem>
            <FormItem>
              <div class="remember">
                <div class="remember-password">
                  <div :class="remberPassword?'choiced':'check'" @click="isRemember"></div>
                  <span
                    style="font-size:16px;font-family:Adobe Heiti Std;font-weight:normal;color:rgba(148,148,148,1);margin-left:13px"
                  >记住密码</span>
                </div>
                <a @click="forgetPassword">忘记密码</a>
              </div>
            </FormItem>
            <FormItem class="m-b-15">
              <Button style="width:349px;background:rgba(138,46,49,1);" @click="login">
                <span
                  style="font-size:20px;
                font-family:Source Han Sans CN;
                font-weight:400;
                color:rgba(255,255,255,1);"
                >登录</span>
              </Button>
            </FormItem>
          </Form>

          <div class="downPart">
            <span
              style="font-size:16px;
            font-family:Source Han Sans CN;
            font-weight:400;
            color:rgba(148,148,148,1);"
            >还没有账号？</span>
            <a
              style="font-size:16px;
            font-family:Source Han Sans CN;
            font-weight:400;
            color:#8A2E31;"
              @click="$router.push('/register')"
            >立即注册</a>
          </div>
        </div>
        <div class="foot">
          <div style="margin-top:33px">
            <span
              style="font-size:10px;
          font-family:Source Han Sans CN;
          font-weight:400;
          color:rgba(0,0,0,1);"
            >copyright@2019 中国农业科学院农业质量标准与检测技术研究所出品</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      remberPassword: false,
      account: { account: "", password: "" }
    };
  },
  methods: {
    login: function() {
      let _this = this;
      if (_this.remberPassword) {
        if (_this.account.account && _this.account.password) {
          localStorage.setItem("userName", this.account.account);
          localStorage.setItem("password", this.account.password);
          localStorage.setItem("remberPassword", "yes");
        }
      } else {
        localStorage.clear();
      }

      let form = new FormData();
      if (_this.account.account && _this.account.password) {
        form.append("emailAccount", this.account.account);
        form.append("password", this.account.password);
        this.$axios.post("/api/user/login", form).then(res => {
          console.log(res.data);
          console.log(res.data.code);
          if (res.data.code != 100) {
            _this.$Message.error(res.data.msg);
          } else {
            localStorage.setItem("res", res.data);
            localStorage.setItem("token", res.data.data.token);
            localStorage.setItem("userId", res.data.data.userId);
            this.$store.commit("name/setName", res.data.data.name);
            localStorage.setItem("userType", res.data.data.userType);
            console.log(res.data.data.userType);
            console.log(res.data.data.token);
            _this.$Message.success("登录成功！");
            if (res.data.data.userType == 1) {
              if (res.data.data.status == 1) {
                _this.$router.push("/supplement");
              } else {
                _this.$router.push("/homePage");
              }
            }
            if (res.data.data.userType == 2) {
              _this.$router.push("/documDataSearch");
            }
          }
        });
      }
    },
    forgetPassword() {
      this.$router.push("/forgetThePassword");
    },
    getPassword() {
      this.account.account = localStorage.getItem("userName");
      this.account.password = localStorage.getItem("password");
      this.remberPassword =
        localStorage.getItem("remberPassword") == "yes" ? true : false;
    },
    isRemember(){
      this.remberPassword = !this.remberPassword;
    }
  },
  mounted() {
    this.getPassword();
  }
};
</script>
<style lang="scss" scoped>
.account {
  .container {
    width: 100%;
    position: absolute;
    background: url("../../../static/img/back.png") no-repeat;
    background-size: cover;
    background-position: center center;
    height: 100%;
    top: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      .wapper {
        width: 490px;
        height: 522px;
        background: rgba(247, 248, 250, 1);
        box-shadow: 0px 24px 26px 9px rgba(2, 13, 26, 0.19);
        border-radius: 19px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 60px 65px 45px 76px;
        .title1 span {
          font-size: 36px;
          font-family: Source Han Sans CN;
          font-weight: 500;
          color: rgba(138, 46, 49, 1);
        }
        .introduce {
          margin: 22px 0 26px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          .iLeft {
            display: flex;
            flex-direction: column;
          }
          .iLeft span {
            font-size: 12px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: rgba(148, 148, 148, 1);
          }
          .iRight span {
            font-size: 12px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: rgba(148, 148, 148, 1);
          }
        }
        .user_item {
          width: 349px;
          height: 45px;
          padding: 0 16px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0px 0px 5px 0px rgba(7, 0, 2, 0.2);
          img {
            width: 18px;
            height: 19px;
            margin-right: 12px;
          }
          input {
            border: none;
            outline: none;
            outline: medium;
            width: 300px;
          }
        }
        .remember {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 349px;
          .remember-password {
            display: flex;
            justify-content: space-between;
            align-items: center;
            a {
              font-size: 16px;
              font-family: Source Han Sans CN;
              font-weight: 400;
              color: rgba(138, 46, 49, 1);
            }
            .check {
              width: 24px;
              height: 24px;
              border: 1px solid rgba(51, 48, 48, 0.918);
              border-radius: 5px;
            }
            .choiced {
              width: 24px;
              height: 24px;
              background: url("../../../static/img/remember.png") no-repeat;
              background-size: cover;
            }
          }
        }
        .downPart{
          
        }
      }
    }
  }
}
</style>


