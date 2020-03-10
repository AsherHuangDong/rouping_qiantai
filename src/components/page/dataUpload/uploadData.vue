<template>
  <div class="all" id="start" style="padding:24px;background:#ffffff">
    <!-- 指示名称错误预警 -->
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
          @click="cancel"
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
          @click="cancel1"
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
          style="width:110px;margin-right:40px;height:42px;border-radius:6px;border:1px solid rgba(138,46,49,1);"
          @click="cancel"
        >
          <span style="color:rgba(138,46,49,1);font-size:18px;">取消上传</span>
        </Button>
        <Button
          style="width:110px;height:42px;border-radius:6px;background:rgba(138,46,49,1);"
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
          style="width:110px;margin-right:40px;height:42px;border-radius:6px;border:1px solid rgba(138,46,49,1);"
          @click="cancel1"
        >
          <span style="color:rgba(138,46,49,1);font-size:18px;">取消上传</span>
        </Button>
        <Button
          style="width:110px;height:42px;border-radius:6px;background:rgba(138,46,49,1);"
          @click="saveUpload1"
        >
          <span style="font-size:18px;font-weight:400;color:rgba(255,255,255,1);">继续上传</span>
        </Button>
      </div>
    </Modal>

    <div class="part">
      <div class="content1">
        <div class="options">选择文件:</div>
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
      </div>

      <div class="content2">
        <span class="options">是否公开:</span>
        <div class="upload">
          <RadioGroup v-model="power" @on-change="select">
            <Radio :label="1">
              <span>公开</span>
            </Radio>
            <Radio :label="2">
              <span>不公开</span>
            </Radio>
            <Radio :label="3" :disabled="list1.length==0?true:false">
              <span>对小组公开</span>
            </Radio>
          </RadioGroup>
        </div>
      </div>
      <div v-if="power==3" class="arrow_box1">
        <div class="content">
          <CheckboxGroup
            v-model="groupIdList"
            @on-change="checkAllGroupChange"
            style=" display:flex;flex-wrap:wrap"
          >
            <Checkbox :value="checkAll" @click.prevent.native="handleCheckAll">全选</Checkbox>
            <Checkbox v-for="(item,index) in list1" :key="index" :label="item.id">{{item.groupName}}</Checkbox>
          </CheckboxGroup>
        </div>
      </div>

      <Button
        style="background:rgba(138,46,49,1);width:90px;height:42px;border-radius:6px;margin-top:100px"
        @click="saveAll"
      >
        <span
          style="font-size:16px;
              font-family:Source Han Sans CN;
              font-weight:400;
              color:rgba(250,250,250,1);"
        >保存</span>
      </Button>
    </div>
  </div>
</template>
<script>
export default {
  name: "uploadData",
  data() {
    return {
      showResult: false,
      showResult1: false,
      id: "",
      obj: [],
      power: 1,
      list: [],
      list1: [],
      groupIdList: [],
      checkAll: false,
      fileList: [],
      poptip: {}
    };
  },
  methods: {
    //检测文件
    handleUpload(file) {
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
            //this.jixu();
            //this.fileList = file;
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
        //this.jixu();
        this.showResult = false;
      }
    },
    saveUpload1() {
      console.log(this.fileList);
      this.showResult1 = false;
    },
    saveAll() {
      if (this.obj.length != 0) {
        if (this.id) {
          let form = new FormData();
          let literatureList = this.obj[0];
          console.log(this.obj[3][1]);
          let literatureDataListMap = this.obj[3];
          let power = this.power;
          let groupIdList = this.groupIdList;
          this.$axios
            .post("/api/literatureExcel/saveImportExcel", {
              literatureDataListMap: this.obj[3],
              literatureList: this.obj[0],
              power: power,
              groupIdList: groupIdList
            })
            .then(res => {
              if (res.data.code == 100) {
                this.$Message.success("上传成功");
                this.$router.go(-1);
              } else {
                this.$Message.error(res.data.msg);
              }
            });
        } else {
          let form = new FormData();
          let literatureList = this.obj[0];
          console.log(this.obj[3][1]);
          let literatureDataListMap = this.obj[3];
          let power = this.power;
          let groupIdList = this.groupIdList;
          this.$axios
            .post("/api/literatureExcel/saveImportExcel", {
              literatureDataListMap: this.obj[3],
              literatureList: this.obj[0],
              power: power,
              groupIdList: groupIdList
            })
            .then(res => {
              if (res.data.code == 100) {
                this.$Message.success("上传成功");
                this.$router.go(-1);
              } else {
                this.$Message.error(res.data.msg);
              }
            });
        }
      } else {
        this.$Message.error("上传数据失败！");
      }
    },
    gotoModal() {
      window.location.href = "/api/literatureExcel/exportExcelTemplate";
    },
    getGroup() {
      let form = new FormData();
      form.append("id", this.id);
      this.$axios
        .post("/api/noticeGroup/getNoticeGroupByList", form)
        .then(res => {
          console.log(res);
          this.list1 = res.data.data;
        });
    },
    cancel() {
      this.fileList = [];
      this.obj = [];
      this.showResult = false;
    },
    cancel1() {
      this.fileList = [];
      this.obj = [];
      this.showResult1 = false;
    },
    Delete(index) {
      this.fileList.splice(index, 1);
    },
    handleCheckAll() {
      this.checkAll = !this.checkAll;
      let list1 = [];
      this.list1.forEach(item => {
        list1.push(item.id);
      });
      if (this.checkAll) {
        this.groupIdList = list1;
      } else {
        this.groupIdList = [];
      }
    },
    checkAllGroupChange(data) {
      console.log(data);
      if (data.length === this.list1.length) {
        this.checkAll = true;
      } else {
        this.checkAll = false;
      }
    },
    select(e) {
      console.log(e);
    }
  },
  mounted() {
    this.id = this.$route.query.id;
    console.log(this.id);
    this.getGroup();
  }
};
</script>
<style>
#start .part {
  width: 845px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 18px;
  padding-top: 20px;
}
#start .part .content1 {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
#start .content1 .options {
  font-size: 18px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  margin-right: 28px;
}
#start .content1 .upload {
}
#start .content1 .upload .choice {
  font-size: 18px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: rgba(19, 112, 218, 1);
}
#start .content1 .upload .discription {
  font-size: 12px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
#start .content2 {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 80px;
}
#start .content2 .options {
  font-size: 18px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  margin-right: 28px;
}

#start .ivu-radio-inner:after {
  background: rgba(242, 155, 118, 1);
}
#start .ivu-radio-checked .ivu-radio-inner {
  border-color: rgba(191, 191, 191, 1);
}
#start .ivu-poptip-body {
  padding: 0;
}
#start .ivu-checkbox-checked .ivu-checkbox-inner {
  border-color: rgba(153, 153, 153, 1);
  background: url("../../../../static/img/choice.png");
  background-size: 15px;
}
#start .el-upload-dragger {
  width: 700px;
  height: 90px;
  background: rgba(253, 253, 255, 1);
  border: 1px solid rgba(191, 191, 191, 1);
  border-radius: 3px;
}
.el-upload-dragger {
  width: 700px;
  height: 90px;
  background: rgba(253, 253, 255, 1);
  border: 1px solid rgba(191, 191, 191, 1);
  border-radius: 3px;
  margin-top: 3px;
}
.ivu-modal-body {
  padding: 0 !important;
}

.arrow_box1 {
  position: relative;
  border: 1px solid #c2e1f5;
  width: 500px;
  padding: 10px;
  margin-top: 10px;
}
.arrow_box1:after,
.arrow_box1:before {
  bottom: 100%;
  left: 50%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}

.arrow_box1:after {
  border-color: rgba(136, 183, 213, 0);
  border-bottom-color: #fff;
  border-width: 14px;
}
.arrow_box1:before {
  border-color: rgba(194, 225, 245, 0);
  border-bottom-color: #c2e1f5;
  border-width: 15px;
}
.content {
  display: flex;
  flex-wrap: wrap;
}
</style>