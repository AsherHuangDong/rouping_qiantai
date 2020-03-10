<template>
  <div style="padding:24px;background:#ffffff">
      <div style="background:rgba(255,255,255,1);border-radius:4px;width:604px;padding-top:28px">
        <div>
          <div style>
            <Form ref="personCenter" :model="personCenter" :rules="ruleValidate" :label-width="90">
              <FormItem label="姓名" prop="name">
                <Input style="width:438px;" v-model="personCenter.name"></Input>
              </FormItem>
              <FormItem label="单位类型" prop="unitTypeId">
                <Select v-model="personCenter.unitTypeId" style="width:438px;">
                  <Option :value="1">养殖企业</Option>
                  <Option :value="2">屠宰企业</Option>
                  <Option :value="3">科研单位</Option>
                </Select>
              </FormItem>
              <FormItem label="单位名称" prop="unitName">
                <Input style="width:438px;" v-model="personCenter.unitName"></Input>
              </FormItem>
              <FormItem label="职称">
                <Input style="width:438px;" v-model="personCenter.jobTitle"></Input>
              </FormItem>
              <FormItem label="职务">
                <Input style="width:438px;" v-model="personCenter.position"></Input>
              </FormItem>
              <FormItem label="电话">
                <Input style="width:438px;" v-model="personCenter.phone"></Input>
              </FormItem>
              <FormItem label="传真">
                <Input style="width:438px;" v-model="personCenter.fax"></Input>
              </FormItem>
              <FormItem label="手机" prop="mobile">
                <Input style="width:438px;" v-model="personCenter.mobile"></Input>
              </FormItem>
              <FormItem label="邮箱" prop="emailAccount">
                <Input disabled style="width:438px;" v-model="personCenter.emailAccount"></Input>
              </FormItem>
              <FormItem label="QQ号">
                <Input style="width:438px;" v-model="personCenter.qq"></Input>
              </FormItem>
              <FormItem label="微信号">
                <Input style="width:438px;" v-model="personCenter.weChat"></Input>
              </FormItem>
              <FormItem>
                 <Button
                  style="width:110px;background:rgba(138,46,49,1);
                  border-radius:6px;"
                  @click="save">
                  <span
                  style="font-size:18px;
                  font-family:Source Han Sans CN;
                  font-weight:400;
                  color:rgba(255,255,255,1);"
                  >更新资料</span>
                </Button>
              </FormItem>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "personalCenter",
  data() {
    return {
      personCenter: {
        unitTypeId: 1,
        name: "", //姓名
        unitName: "", //单位
        jobTitle: "", //职称
        position: "", //职务
        phone: "", //电话
        fax: "", //传真
        mobile: "", //手机
        emailAccount: "", //邮箱
        qq: "", //QQ号
        weChat: "", //微信号,
        updateTime: "" //更新时间
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "姓名不能为空",
            trigger: "blur"
          }
        ],
        unitTypeId: [
          {
            required: true,
            message: "请选择单位类型",
            trigger: "blur"
          }
        ],
        unitName: [
          {
            required: true,
            message: "单位不能为空",
            trigger: "blur"
          }
        ],
        mobile: [
          {
            required: true,
            message: "手机不能为空",
            trigger: "blur"
          }
        ],
        emailAccount: [
          {
            required: true,
            message: "邮箱不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    save() {
      console.log(this.personCenter);
      let form = new FormData();
      form.append("name", this.personCenter.name);
      form.append("unitName", this.personCenter.unitName);
      form.append("mobile", this.personCenter.mobile);
      form.append("emailAccount", this.personCenter.emailAccount);
      form.append("unitTypeId", this.personCenter.unitTypeId);

      if (this.personCenter.jobTitle) {
        form.append("jobTitle", this.personCenter.jobTitle);
      }
      if (this.personCenter.position) {
        form.append("position", this.personCenter.position);
      }
      if (this.personCenter.phone) {
        form.append("phone", this.personCenter.phone);
      }
      if (this.personCenter.fax) {
        form.append("fax", this.personCenter.fax);
      }
      if (this.personCenter.qq) {
        form.append("qq", this.personCenter.qq);
      }
      if (this.personCenter.weChat) {
        form.append("weChat", this.personCenter.weChat);
      }

      this.$axios.post("/api/user/saveUser", form).then(res => {
        if (res.data.code == 100) {
          this.$Message.success("操作成功！");
          localStorage.setItem('name',this.personCenter.name)
          this.$store.commit("name/setName", this.personCenter.name);
          this.$router.push("/homePage");
        } else {
          this.$Message.info(res.data.msg);
        }
      });
    },
    getData() {
      this.$axios.post("/api/user/getUser", {}).then(res => {
        console.log(res);
        this.personCenter = res.data.data;
      });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
