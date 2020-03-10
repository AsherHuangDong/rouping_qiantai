<template>
  <div class="box">
    <div class="cont_box">
      <h3 style="font-size:36px;color:#8A2E31;">肉品品质安全数据库</h3>
      <div style="height:25px;margin-top:20px;color:#949494;font-size:12px;">国家生猪技术产业体系</div>
      <div style="height:25px;color:#949494;font-size:12px;">中国农业科学院农业质量标准与检测技术研究所研发</div>
      <Form :model="account" ref="login" id="login">
        <FormItem>
          <div class="user_item">
            <Input
              type="text"
              v-model="account.emailAccount"
              placeholder="邮箱"
              size="large"
              style="width:399.8px;text-align:left"
            ></Input>
          </div>
        </FormItem>
        <FormItem>
          <div class="user_item">
            <Input
              type="password"
              v-model="account.password"
              size="large"
              placeholder="设置密码，6 - 16位密码，区分大小写"
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
            <Input
              type="text"
              size="large"
              v-model="account.mobile"
              placeholder="11位手机号"
              style="width:399.8px;text-align:left"
            ></Input>
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
            <Button style="width:400px;background:#8A2E31;" @click="register">
              <span
                style="font-size:20px;
            font-family:Source Han Sans CN;
            font-weight:400;
            color:rgba(255,255,255,1);"
              >注册</span>
            </Button>
          </div>
          <div
            style="color:#1890FE;cursor:pointer;margin-top:24px;"
            @click="$router.push('/')"
          >使用已有账号登录</div>
        </FormItem>
      </Form>
      <div style="font-size:10px;margin-top:120px;">copyright@2019 中国农业科学院农业质量标准与检测技术研究所出品</div>
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
        emailAccount: "",
        mobile: "",
        password: "",
        verifyCode: ""
      }
    };
  },
  methods: {
    sendCode: function() {
      let _this = this;
      if (!this.account.mobile) {
        this.$Message.error("请输入手机号");
        return false;
      }
      let form = new FormData();
      console.log(_this.account.mobile);
      form.append("mobile", _this.account.mobile);
      _this.$axios.post("/api/user/getverifyCode", form).then(res => {
        console.log(res.data);
        console.log(res.data.code);
        if (res.data.code == 100) {
          _this.$Message.success("发送成功！");
          this.getCode();
        } else {
          _this.$Message.error(res.data.msg);
        }
      });
    },
    register: function() {
      let _this = this;
      if (!this.account.emailAccount) {
        this.$Message.error("请输入邮箱");
        return false;
      }
      if (!this.account.password) {
        this.$Message.error("请输入密码");
        return false;
      }
      if (!this.confirm_password) {
        this.$Message.error("请输入确认密码 ");
        return false;
      }
      if (!this.account.mobile) {
        this.$Message.error("请输入手机号");
        return false;
      }
      if (!this.account.verifyCode) {
        this.$Message.error("请输入验证码");
        return false;
      }
      if (this.account.password !== this.confirm_password) {
        this.$Message.error("密码和确认密码不相同，请重新输入");
        return false;
      }
      let form = new FormData();
      form.append("emailAccount", this.account.emailAccount);
      form.append("password", this.account.password);
      form.append("mobile", this.account.mobile);
      form.append("verifyCode", this.account.verifyCode);
      this.$axios.post("/api/user/register", form).then(res => {
        console.log(res.data);
        console.log(res.data.code);
        if (res.data.code == 100) {
          _this.$Message.success("注册成功！");
          _this.$router.push("/");
        } else {
          _this.$Message.error(res.data.msg);
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
    },
    //邮箱验证
    emailVerify(email) {
      var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (reg.test(email)) {
        return true;
      } else {
        return false;
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
}
.box {
  padding-top: 177px;
  background: #f7f8fa;
}
.cont_box {
  width: 400px;
  margin: 0 auto;
}
</style>


