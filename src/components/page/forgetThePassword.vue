<template>
  <div class="box">
    <div class="cont_box">
      <h3 style="font-size:36px;color:#8A2E31;">肉品品质安全数据库</h3>
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
            <Input
              type="text"
              size="large"
              v-model="account.mobile"
              placeholder="11位手机号"
              style="width:399.8px;text-align:left;"
            >
              <p slot="prepend" style="margin-left:10px;margin-right:10px;background:#FFFFFF">+86</p>
            </Input>
          </div>
        </FormItem>
        <FormItem>
          <div class="user_item" style="display:flex">
            <Input
              type="text"
              size="large"
              v-model="account.verifyCode"
              placeholder="输入验证码"
              style="width:250px;"
            ></Input>
            <Button
              :disabled="!show"
              style="margin-left:25px;color:#1370DA;width:136px"
              @click="sendCode"
            >
              <span v-if="show">获取验证码</span>
              <span v-if="!show" style="color:#ccc">({{count}})之后重新获取</span>
            </Button>
          </div>
        </FormItem>
        <FormItem>
          <div class="user_item">
            <Input
              type="password"
              v-model="account.password"
              size="large"
              placeholder="设置新密码，6 - 16位密码，区分大小写"
              style="width:399.8px;text-align:left"
            ></Input>
          </div>
        </FormItem>
        <FormItem>
          <div class="user_item">
            <Input
              type="password"
              size="large"
              v-model="confirm_password"
              placeholder="确认密码"
              style="width:399.8px;text-align:left"
            ></Input>
          </div>
        </FormItem>
        <FormItem>
          <div class="user_item">
            <Button style="width:400px;background:#8A2E31" @click="complete">
              <span
                style="font-size:20px;
                font-family:Source Han Sans CN;
                font-weight:400;
                color:rgba(255,255,255,1);"
              >完成</span>
            </Button>
          </div>
          <div
            style="color:#1890FE;cursor:pointer;margin-top:24px;"
            @click="$router.push('/')"
          >使用已有账号登录</div>
        </FormItem>
      </Form>
      <div style="font-size:10px;margin-top:142px;">copyright@2019 中国农业科学院农业质量标准与检测技术研究所出品</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: true,
      count: "",
      timer: "",
      confirm_password: "",
      account: {
        mobile: "",
        password: "",
        verifyCode: ""
      }
    };
  },
  methods: {
    sendCode: function(params) {
      let _this = this;
      let form = new FormData();
      if (!this.account.mobile) {
        this.$Message.error("请输入手机号");
        return false;
      }
      form.append("mobile", this.account.mobile);
      this.$axios.post("/api/user/getverifyCode", form).then(res => {
        console.log(res.data);
        console.log(res.data.code);
        if (res.data.code != 100) {
          _this.$Message.error(res.data.msg);
        } else {
          _this.$Message.success("验证成功！");
          this.getCode();
        }
      });
    },
    complete: function() {
      let _this = this;
      if (!this.account.mobile) {
        this.$Message.error("请输入手机号");
        return false;
      }
      if (!this.account.verifyCode) {
        this.$Message.error("请输入验证码");
        return false;
      }
      if (!this.account.password) {
        this.$Message.error("请输入密码");
        return false;
      }
      if (!this.confirm_password) {
        this.$Message.error("请输入确认密码");
        return false;
      }
      if (this.account.password !== this.confirm_password) {
        this.$Message.error("确认密码和新密码不相同,请重新输入");
        return false;
      }
      let form = new FormData();
      form.append("password", this.account.password);
      form.append("mobile", this.account.mobile);
      form.append("verifyCode", this.account.verifyCode);
      this.$axios.post("/api/user/forgetPassword", form).then(res => {
        console.log(res.data);
        console.log(res.data.code);
        if (res.data.code != 100) {
          _this.$Message.error("验证码错误");
        } else {
          // localStorage.setItem("res", res.data);
          // localStorage.setItem("token", res.data.data.token);
          // console.log(res.data.data.token);
          _this.$Message.success("操作成功！");
          // _this.$router.push("/index");
          _this.$router.push('/')
        }
      });
    },
    getCode() {
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
html,
body,
.box {
  width: 100%;
  height: 100%;
  padding-top: 177px;
  background: #f7f8fa;
  .cont_box {
    width: 400px;
    margin: 0 auto;
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
  }
}
</style>


