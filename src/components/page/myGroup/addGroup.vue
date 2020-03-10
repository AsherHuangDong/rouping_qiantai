<template>
  <div style="margin-left:200px;padding:24px;background:#ffffff">
    <!-- 邀请新成员 -->
    <Modal v-model="modal" :closable="false" width="482" footer-hide>
      <div
        style="display:flex;justify-content:center;align-items:center;width:100%;height:67px;background:#8A2E31;border-radius:4px 4px 0px 0px;"
      >
        <span style="font-size:20px;font-weight:400;color:rgba(255,255,255,1);">邀请新成员</span>
      </div>

      <div
        style="margin-top:30px;padding:0 42px 0 55px;display:flex;justify-content:space-between;align-items:center"
      >
        <span
          style="font-size:16px;
              font-family:Source Han Sans CN;
              font-weight:400;
              color:rgba(51,51,51,1);"
        >姓名</span>
        <Select
          v-model="model14"
          multiple
          filterable
          remote
          placeholder="请输入成员姓名"
          :remote-method="remoteMethod2"
          :loading="loading2"
          style="width:310px"
        >
          <Option
            v-for="(item, index) in list"
            :value="item.userId+'+'+item.name"
            :key="index"
          >{{item.name}}</Option>
        </Select>
      </div>

      <div style="text-align:center;margin-top:32px;">
        <Button
          style="margin-bottom:32px;width:110px;margin-right:40px;height:42px;border-radius:6px;background:#8A2E31;"
          @click="ok"
        >
          <span style="font-size:18px;font-weight:400;color:rgba(255,255,255,1);">确认</span>
        </Button>
        <Button
          style="margin-bottom:32px;width:110px;height:42px;border-radius:6px;border:1px solid #8A2E31;"
          @click="cancel"
        >
          <span style="color:#8A2E31;font-size:18px;">取消</span>
        </Button>
      </div>
    </Modal>
    <!-- 指标名称预警 -->
    <!-- <Modal v-model="showResult" width="440" draggable :closable="false" footer-hide>
      <div
        style="display:flex;justify-content:center;align-items:center;width:100%;height:67px;background:rgba(234,243,252,1);border-radius:4px 4px 0px 0px;"
      >
        <span style="font-size:20px;font-weight:400;color:rgba(19,112,218,1);">预警提示</span>
      </div>
      <div
        style="display:flex;justify-content:center;align-items:center;margin-top:26px;margin-bottom:21px"
      >
        <span style="font-size:16px;font-weight:400;color:rgba(51,51,51,1);">系统指标库中不存在下列指标，是否继续上传？</span>
      </div>
      <div style="display:flex;flex-direction:column;padding-left:52px">
        <span
          style="font-size:16px;font-weight:400;color:rgba(102,102,102,1);"
          v-for="(item,index) in list"
          :key="index"
        >{{item}}</span>
      </div>
      <div style="text-align:center;margin-bottom:36px;margin-top:49px">
        <Button
          style="width:110px;margin-right:40px;height:42px;border-radius:6px;border:1px solid rgba(19,112,218,1);"
          @click="cancel1"
        >
          <span style="color:rgba(19,112,218,1);font-size:18px;">取消上传</span>
        </Button>
        <Button
          style="width:110px;height:42px;border-radius:6px;background:rgba(19,112,218,1);"
          @click="saveUpload"
        >
          <span style="font-size:18px;font-weight:400;color:rgba(255,255,255,1);">继续上传</span>
        </Button>
      </div>
    </Modal>-->

    <!-- 指示数值错误预警 -->
    <!-- <Modal v-model="showResult1" width="440" draggable :closable="false" footer-hide>
      <div
        style="display:flex;justify-content:center;align-items:center;width:100%;height:67px;background:rgba(234,243,252,1);border-radius:4px 4px 0px 0px;"
      >
        <span style="font-size:20px;font-weight:400;color:rgba(19,112,218,1);">预警提示</span>
      </div>
      <div
        style="display:flex;justify-content:center;align-items:center;margin-top:26px;margin-bottom:21px"
      >
        <span style="font-size:16px;font-weight:400;color:rgba(51,51,51,1);">下列指标数据可能有误，是否继续上传？</span>
      </div>
      <div style="display:flex;flex-direction:column;padding-left:52px">
        <span
          style="font-size:16px;font-weight:400;color:rgba(102,102,102,1);"
          v-for="(item,index) in list"
          :key="index"
        >{{item}}</span>
      </div>
      <div style="text-align:center;margin-bottom:36px;margin-top:49px">
        <Button
          style="width:110px;margin-right:40px;height:42px;border-radius:6px;border:1px solid rgba(19,112,218,1);"
          @click="cancel2"
        >
          <span style="color:rgba(19,112,218,1);font-size:18px;">取消上传</span>
        </Button>
        <Button
          style="width:110px;height:42px;border-radius:6px;background:rgba(19,112,218,1);"
          @click="saveUpload1"
        >
          <span style="font-size:18px;font-weight:400;color:rgba(255,255,255,1);">继续上传</span>
        </Button>
      </div>
    </Modal>-->

    <!-- 指示名称错误预警 -->
    <Modal v-model="showResult" width="440" draggable :closable="false" footer-hide>
      <div
        style="display:flex;justify-content:center;align-items:center;width:100%;height:67px;background:#8A2E31;border-radius:4px 4px 0px 0px;"
      >
        <span style="font-size:20px;font-weight:400;color:rgba(255,255,255,1);">预警提示</span>
      </div>
      <div
        style="display:flex;justify-content:center;align-items:center;margin-top:26px;margin-bottom:21px"
      >
        <span style="font-size:16px;font-weight:400;color:rgba(51,51,51,1);">系统指标库中不存在下列指标，是否继续上传？</span>
      </div>
      <div style="display:flex;flex-direction:column;padding-left:52px">
        <span
          style="font-size:16px;font-weight:400;color:rgba(102,102,102,1);"
          v-for="(item,index) in list"
          :key="index"
        >{{item}}</span>
      </div>
      <div style="text-align:center;margin-bottom:36px;margin-top:49px">
        <Button
          style="width:110px;margin-right:40px;height:42px;border-radius:6px;border:1px solid #8A2E31;"
          @click="cancel1"
        >
          <span style="color:#8A2E31;font-size:18px;">取消上传</span>
        </Button>
        <Button
          style="width:110px;height:42px;border-radius:6px;background:#8A2E31;"
          @click="saveUpload"
        >
          <span style="font-size:18px;font-weight:400;color:rgba(255,255,255,1);">继续上传</span>
        </Button>
      </div>
    </Modal>
    <!-- 指示数值错误预警 -->
    <Modal v-model="showResult1" width="440" draggable :closable="false" footer-hide>
      <div
        style="display:flex;justify-content:center;align-items:center;width:100%;height:67px;background:#8A2E31;border-radius:4px 4px 0px 0px;"
      >
        <span style="font-size:20px;font-weight:400;color:rgba(255,255,255,1);">预警提示</span>
      </div>
      <div
        style="display:flex;justify-content:center;align-items:center;margin-top:26px;margin-bottom:21px"
      >
        <span style="font-size:16px;font-weight:400;color:rgba(51,51,51,1);">下列指标数据可能有误，是否继续上传？</span>
      </div>
      <div style="display:flex;flex-direction:column;padding-left:52px">
        <span
          style="font-size:16px;font-weight:400;color:rgba(102,102,102,1);"
          v-for="(item,index) in list"
          :key="index"
        >{{item}}</span>
      </div>
      <div style="text-align:center;margin-bottom:36px;margin-top:49px">
        <Button
          style="width:110px;margin-right:40px;height:42px;border-radius:6px;border:1px solid #8A2E31;"
          @click="cancel2"
        >
          <span style="color:#8A2E31;font-size:18px;">取消上传</span>
        </Button>
        <Button
          style="width:110px;height:42px;border-radius:6px;background:#8A2E31;"
          @click="saveUpload1"
        >
          <span style="font-size:18px;font-weight:400;color:rgba(255,255,255,1);">继续上传</span>
        </Button>
      </div>
    </Modal>

    <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="80">
      <FormItem prop="groupName" label="小组名称">
        <Input v-model="formItem.groupName" placeholder="请输入小组名称" style="width:400px"></Input>
      </FormItem>

      <FormItem prop="groupIntroduction" label="小组说明">
        <Input
          v-model="formItem.groupIntroduction"
          type="textarea"
          :autosize="{minRows: 2,maxRows: 5}"
          placeholder="请输入小组说明"
          style="width:400px"
        ></Input>
      </FormItem>

      <FormItem prop="userIdList" label="小组成员">
        <div style="display:flex;flex-wrap:wrap">
          <span
            v-for="(item,index) in userIdList"
            style="margin-right:20px;color:rgba(51,51,51,1);"
            :key="index"
          >{{item.name}}</span>
          <a style="color:blue" @click="addMember">+邀请新成员</a>
        </div>
      </FormItem>
      <FormItem label="上传数据(选填)">
        <div>
          <el-upload
            class="upload-demo"
            drag
            action
            :before-upload="handleUpload"
            accept=".xls, .xlsx"
          >
            <div style="display:flex;flex-direction:column;align-items:center;margin-top:20px">
              <div class="el-upload__text">
                <em
                  style="font-size:18px;
            font-family:Source Han Sans CN;
            font-weight:400;
            color:rgba(19,112,218,1);"
                >+选择/拖拽上传文件</em>
              </div>
              <div>
                <span
                  style="font-size:12px;
            font-family:Source Han Sans CN;
            font-weight:400;
            color:rgba(153,153,153,1);"
                >
                  支持xls和xlsx文件格式，数据格式参照
                  <a
                    @click.stop="gotoModal"
                    style="font-size:12px;
            font-family:Source Han Sans CN;
            font-weight:400;
            color:#1370DA;"
                  >肉品品质安全数据库上传模板</a>
                </span>
              </div>
            </div>
          </el-upload>

          <div v-if="fileList.lenght!=0">
            <div
              v-for="(item,index) in fileList"
              :key="index"
              style="display:flex;justify-content:flex-start;align-items:center"
            >
              <img src="static/img/file.png" style="width:14px;height:14px" />
              <span
                style="font-size:14px;
              font-family:Source Han Sans CN;
              font-weight:400;
              color:rgba(51,51,51,1);
              margin-left:8px;margin-right:27px"
              >{{item.name}}</span>
              <a
                style="font-size:14px;
              font-family:Source Han Sans CN;
              font-weight:400;
              color:rgba(19,112,218,1);"
                @click="Delete(index)"
              >删除</a>
            </div>
          </div>
        </div>
      </FormItem>
      <FormItem>
        <Button
          style="background:rgba(138,46,49,1);
            border-radius:4px;
            margin-left:100px;width:100px;"
          @click="save('formItem')"
        >
          <span
            style="font-size:16px;
              font-family:Source Han Sans CN;
              font-weight:400;
              color:rgba(250,250,250,1);"
          >保存</span>
        </Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
  name: "addGroup",
  data() {
    return {
      model14: [],
      loading2: false,
      options2: [],
      list: [],
      userIdList: [],
      fileList: [],
      modal: false,
      showResult: false,
      showResult1: false,
      content: "",
      power: 3,
      formItem: {
        groupName: "",
        groupIntroduction: "",
        file: [],
        userIdList: []
      },
      ruleValidate: {
        groupName: [
          {
            required: true,
            message: "小组名称不能为空",
            trigger: "blur"
          }
        ],
        groupIntroduction: [
          {
            required: true,
            message: "小组描述不能为空",
            trigger: "blur"
          }
        ]
      },
      obj: []
    };
  },
  methods: {
    //获取小组列表
    addMember() {
      this.modal = true;
      let name = "";
      let form = new FormData();
      form.append("name", name);
      form.append("groupId", "");
      this.$axios.post("/api/user/getUserByDisableList", form).then(res => {
        console.log(res);
        this.list = res.data.data;
      });
    },
    ok() {
      this.userIdList = [];
      this.model14.forEach(item => {
        this.userIdList.push({
          userId: parseInt(item.split("+")[0]),
          name: item.split("+")[1]
        });
      });
      this.modal = false;
    },
    cancel() {
      this.content = "";
      this.modal = false;
    },
    gotoModal() {
      window.location.href = "/api/literatureExcel/exportExcelTemplate";
    },
    save(name) {
      console.log(this.userIdList);
      if (this.userIdList.length != 0) {
        this.userIdList.forEach(item => {
          this.formItem.userIdList.push(item.userId);
        });
        if (this.fileList.length != 0) {
          this.saveAll();
        }
      }else{
        this.$Message.info("请邀请小组成员");
        return false;
      }
      this.$refs[name].validate(valid => {
        if (valid) {
          let form = new FormData();
          form.append("userIdList", this.formItem.userIdList);
          form.append("groupName", this.formItem.groupName);
          form.append("groupIntroduction", this.formItem.groupIntroduction);
          this.$axios
            .post("/api/noticeGroup/saveNoticeGroup", form)
            .then(res => {
              console.log(res);
              this.$Message.success("新建成功!");
              this.$router.push("/groupDetail");
            });
        }
      });
    },
    remoteMethod2(query) {
      console.log(query);
    },
    handleUpload(file) {
      console.log("lllllll");
      console.log(file);
      this.fileList.push(file);
      let form = new FormData();
      form.append("file", file);
      this.$axios.post("/api/literatureExcel/importExcel", form).then(res => {
        if (res.data.code == 100) {
          this.obj = res.data.data;
          if (res.data.data[1].length > 0) {
            this.showResult = true;
            this.showResult1 = false;
            this.list = res.data.data[1];
          } else if (res.data.data[2].length > 0) {
            this.showResult = false;
            this.showResult1 = true;
            this.list = res.data.data[2];
          } else {
            //this.saveAll();
          }
        } else {
          this.$Message.error(res.data.msg);
        }
      });
      return false;
    },
    saveUpload() {
      console.log(this.fileList);
      if (this.obj[2].length > 0) {
        this.list = this.obj[2];
        this.showResult1 = true;
        this.showResult = false;
      } else {
        this.showResult = false;
        //this.saveAll();
      }
    },
    saveUpload1() {
      this.showResult1 = false;
      console.log(this.fileList);
      //this.saveAll();
    },
    cancel1() {
      this.fileList = [];
      this.obj = {};
      this.showResult = false;
    },
    cancel2() {
      this.fileList = [];
      this.obj = {};
      this.showResult1 = false;
    },
    saveAll() {
      let power = this.power;
      let groupIdList = [];
      if (this.userIdList.length != 0) {
        this.userIdList.forEach(item => {
          groupIdList.push(item.userId);
        });
        let form = new FormData();
        let literatureList = this.obj[0];
        console.log(this.obj[3][1]);
        let literatureDataListMap = this.obj[3];
        this.$axios
          .post("/api/literatureExcel/saveImportExcel", {
            literatureDataListMap: this.obj[3],
            literatureList: this.obj[0],
            power: power,
            groupIdList: groupIdList
          })
          .then(res => {
            if (res.data.code == 100) {
              //this.$Message.success("上传成功");
              //this.$router.go(-1);
            } else {
              this.$Message.error(res.data.msg);
            }
          });
      } else {
        this.$Message.error("存在未填写的选项");
      }
    },
    Delete(index) {
      this.fileList.splice(index, 1);
    }
  }
};
</script>
<style>
.all .part .content1 {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
.all .content1 .options {
  font-size: 18px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  margin-right: 28px;
}
.all .content1 .upload {
}
.all .content1 .upload .choice {
  font-size: 18px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: rgba(19, 112, 218, 1);
}
.all .content1 .upload .discription {
  font-size: 12px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
.el-upload-dragger {
  width: 700px;
  height: 90px;
  background: rgba(253, 253, 255, 1);
  border: 1px solid rgba(191, 191, 191, 1);
  border-radius: 3px;
}
.ivu-modal-body {
  padding: 0 !important;
}
</style>