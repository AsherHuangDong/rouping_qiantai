<template>
  <div id="end">
    <!-- 编辑公开信息 -->
    <Modal v-model="modal1" width="681" :closable="false" footer-hide transfer>
      <div
        style="display:flex;justify-content:center;align-items:center;width:100%;height:67px;background:#8A2E31;border-radius:4px 4px 0px 0px;"
      >
        <span style="font-size:20px;font-weight:400;color:rgba(255,255,255,1);">编辑公开信息</span>
      </div>
      <div
        style="display:flex;justify-content:flex-start;align-items:flex-start;margin-top:26px;margin-bottom:21px;padding-left:48px"
      >
        <div>
          <div>
            <RadioGroup v-model="power" @on-change="select">
              <Radio :label="1">
                <span>公开</span>
              </Radio>
              <Radio :label="2">
                <span>不公开</span>
              </Radio>
              <Radio :label="3" :disabled="list.length==0?true:false">
                <span>对小组公开</span>
              </Radio>
              <div v-if="power==3" class="arrow_box2">
                <div class="content">
                  <CheckboxGroup
                    v-model="groupIdList"
                    @on-change="checkAllGroupChange"
                    style=" display:flex;flex-wrap:wrap"
                  >
                    <Checkbox :value="checkAll" @click.prevent.native="handleCheckAll">全选</Checkbox>
                    <Checkbox
                      v-for="(item,index) in list"
                      :key="index"
                      :label="item.id"
                    >{{item.groupName}}</Checkbox>
                  </CheckboxGroup>
                </div>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>
      <div style="text-align:center;margin-top:100px;">
        <Button
          style="width:110px;margin-right:40px;height:42px;border-radius:6px;border:1px solid rgba(138,46,49,1);;margin-bottom:49px;"
          @click="cancel"
        >
          <span style="color:rgba(138,46,49,1);;font-size:18px;">取消</span>
        </Button>
        <Button
          style="width:110px;height:42px;border-radius:6px;background:rgba(138,46,49,1);margin-bottom:49px;"
          @click="ok"
        >
          <span style="font-size:18px;font-weight:400;color:rgba(255,255,255,1);">确定</span>
        </Button>
      </div>
    </Modal>

    <!-- 删除文献 -->
    <Modal v-model="modal2" width="388" :closable="false" footer-hide>
      <div
        style="display:flex;justify-content:center;align-items:center;width:100%;height:67px;background:#8A2E31;border-radius:4px 4px 0px 0px;"
      >
        <span style="font-size:20px;font-weight:400;color:rgba(255,255,255,1);">是否删除该条数据？</span>
      </div>

      <div style="display:flex;justify-content:center;align-items:center;margin-top:26px">
        <span
          style="font-size:16px;
        font-family:Source Han Sans CN;
        font-weight:400;
        color:rgba(51,51,51,1);"
        >删除后将无法被恢复</span>
      </div>
      <div style="text-align:center;margin-top:32px;">
        <Button
          style="width:90px;margin-right:40px;margin-bottom:28px;border:1px solid rgba(138,46,49,1);
        border-radius:6px;"
          @click="cancel1"
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
          @click="ok1"
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

    <!-- 上传文件 -->
    <Modal v-model="modal3" width="700" :closable="false" footer-hide>
      <div
        style="display:flex;justify-content:center;align-items:center;width:100%;height:67px;background:#8A2E31;border-radius:4px 4px 0px 0px;"
      >
        <span style="font-size:20px;font-weight:400;color:rgba(255,255,255,1);">上传文件</span>
      </div>

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
              @click="Delete1(index)"
            >删除</a>
          </div>
        </div>
      </div>
      <div style="text-align:center;margin-top:32px;">
        <Button
          style="width:90px;margin-right:40px;margin-bottom:28px;border:1px solid rgba(138,46,49,1);
        border-radius:6px;"
          @click="cancel2"
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
          @click="ok2"
        >
          <span
            style="font-size:18px;
            font-family:Source Han Sans CN;
            font-weight:400;
            color:rgba(255,255,255,1);"
          >保存</span>
        </Button>
      </div>
    </Modal>

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
          @click="cancel3"
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
          @click="cancel4"
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

    <div style="display:flex;flex-direction:column;">
      <div
        class="container"
        style="display:flex;justify-content:space-between;align-items:center;height:100px;"
      >
        <div style="display:flex;justify-content:space-between;align-items:center">
          <span
            style="font-size:18px;font-weight:400;color:rgba(51,51,51,1);margin-right:14px"
          >猪种/品牌名称</span>
          <Input v-model="pageParams.keyWords" style="width:300px" />
        </div>

        <div style="display:flex;justify-content:space-between;align-items:center ">
          <span style="font-size:18px;font-weight:400;color:rgba(51,51,51,1);margin-right:15px">上传时间</span>
          <DatePicker
            type="date"
            v-model="pageParams.startTime"
            format="yyyy-MM-dd"
            style="width: 133px"
          ></DatePicker>
          <span style="font-size:14px;font-weight:400;color:rgba(0,0,0,1);margin:0 10px 0 10px">至</span>
          <DatePicker
            type="date"
            v-model="pageParams.endTime"
            format="yyyy-MM-dd"
            style="width: 133px"
          ></DatePicker>
        </div>

        <div style="display:flex;justify-content:space-between;align-items:center">
          <Button
            style="width:68px;height:40px;background:rgba(242,155,118,1);border-radius:4px;margin-right:30px"
            @click="search"
          >
            <span
              style="font-size:16px;
          font-family:Source Han Sans CN;
          font-weight:400;
          color:rgba(250,250,250,1);"
            >搜索</span>
          </Button>
          <Button
            style="width:97px;height:40px;background:rgba(44,174,255,1);border-radius:4px;"
            @click="downloadAll"
          >
            <span
              style="font-size:16px;
          font-family:Source Han Sans CN;
          font-weight:400;
          color:rgba(250,250,250,1);"
            >全部下载</span>
          </Button>
        </div>
      </div>

      <div style="overflow-x:scroll">
        <Table border ref="selection" :columns="columns1" :data="data1" :loading="loading">
          <template slot-scope="{ row, index }" slot="edit">
            <div
              style="padding:0 17px 0 17px;display:flex;justify-content:space-between;align-items:center"
            >
              <Dropdown @on-click="getName" trigger="click" transfer>
                <a
                  @click="opnow(row)"
                  style="font-size:12px;
                font-family:Source Han Sans CN;
                font-weight:400;
                color:rgba(19,112,218,1);"
                >更新数据</a>
                <DropdownMenu slot="list">
                  <DropdownItem name="uploadFile">上传文件</DropdownItem>
                  <DropdownItem name="update">手动更新</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <a
                v-if="row.resource==2"
                @click="editInform(row.literatureId,row.power)"
                style="font-size:12px;
                font-family:Source Han Sans CN;
                font-weight:400;
                color:rgba(19,112,218,1);"
              >编辑公开信息</a>
              <a
                @click="download(row.literatureId)"
                style="font-size:12px;
                font-family:Source Han Sans CN;
                font-weight:400;
                color:rgba(19,112,218,1);"
              >下载</a>
              <a
                @click="Delete(row.literatureId)"
                style="font-size:12px;
                font-family:Source Han Sans CN;
                font-weight:400;
                color:rgba(19,112,218,1);"
              >删除</a>
            </div>
          </template>
        </Table>
      </div>

      <div style="text-align:center;margin-top:43px">
        <Page
          :total="total"
          :current="pageParams.current"
          :page-size="pageParams.size"
          show-total
          show-sizer
          show-elevator
          @on-change="changePage"
          @on-page-size-change="changePageSize"
        ></Page>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "myDownload",
  data() {
    let self = this;
    return {
      loading: false,
      literatureId: "",
      obj: [],
      power: 1,
      list: [],
      groupIdList: [],
      downloadList: [],
      index: 0,
      checkAll: false,
      type: 1,
      modal1: false,
      modal2: false,
      modal3: false,
      showResult: false,
      showResult1: false,
      obj: [],
      fileList: [],
      total: 0,
      pageParams: {
        keyWords: "",
        current: 1,
        size: 10,
        startTime: "",
        endTime: ""
      },
      columns1: [
        {
          title: "序号",
          align: "center",
          width: 50,
          render: (h, params) => {
            return h(
              "span",
              params.index +
                (this.pageParams.current - 1) * this.pageParams.size +
                1
            );
          }
        },
        {
          title: "数据来源",
          align: "center",
          width: 66,
          ellipsis: true,
          key: "resource",
          render(h, param) {
            if (param.row.resource == 1) {
              return h("span", {}, "文献数据");
            }
            if (param.row.resource == 2) {
              return h("span", {}, "填报数据");
            }
          }
        },
        {
          title: "参考文献",
          align: "center",
          width: 163,
          ellipsis: true,
          key: "referLiterature"
        },
        {
          title: "猪种",
          align: "center",
          width: 66,
          ellipsis: true,
          key: "pigBreed"
        },
        {
          title: "纯/杂种  ",
          align: "center",
          width: 66,
          ellipsis: true,
          key: "typeName"
        },
        {
          title: "性别",
          align: "center",
          width: 50,
          ellipsis: true,
          key: "sexName"
        },
        {
          title: "饲养周期",
          align: "center",
          width: 80,
          ellipsis: true,
          key: "feedPeriod"
        },
        {
          title: "取样位置",
          align: "center",
          width: 80,
          ellipsis: true,
          key: "sampPoint"
        },
        {
          title: "产地",
          align: "center",
          width: 80,
          ellipsis: true,
          key: "place"
        },
        {
          title: "饲料信息",
          width: 80,
          ellipsis: true,
          align: "center",
          key: "feedInformation"
        },
        {
          title: "屠宰方式",
          width: 80,
          ellipsis: true,
          align: "center",
          key: "butcherWay"
        },
        {
          title: "操作",
          align: "center",
          width: 280,
          slot: "edit"
        }
      ],
      data1: [],
      row: ""
    };
  },
  methods: {
    deleteRecords() {
      const params = new FormData();
      params.append("downloadId", this.id);
      this.$axios
        .post("/api/downloadRecord/deleteDownloadRecord", params)
        .then(res => {
          if (res.data.code == 100) {
            this.$Message.success({
              content: "删除成功！"
            });
            this.getDownloadList();
          } else {
            this.$Message.error(res.data.msg);
          }
        });
    },
    search() {
      this.loading = true;
      const params = new FormData();
      params.append("page", this.pageParams.current);
      params.append("pageSize", this.pageParams.size);
      if (this.pageParams.keyWords) {
        params.append("pigBreed", this.pageParams.keyWords);
      }
      if (this.pageParams.startTime) {
        params.append("startTime", this.pageParams.startTime.valueOf());
      }
      if (this.pageParams.endTime) {
        params.append("endTime", this.pageParams.endTime.valueOf());
      }
      const url = "/api/literature/getLiteratureByUserIdAndPigBreedAndTime";
      this.$axios.post(url, params).then(res => {
        this.loading = false;
        console.log(url, res);
        if (res.msg === "未查询到数据") {
          this.$message(res.msg);
          this.tableData = null;
        } else {
          this.data1 = res.data.data.records;
          this.total = res.data.data.total;
        }
      });
    },
    getDownloadList() {
      this.loading = true;
      const url = "/api/literature/getLiteratureByUserIdAndPigBreedAndTime";
      let params = new FormData();
      params.append("page", this.pageParams.current);
      params.append("pageSize", this.pageParams.size);
      this.$axios.post(url, params).then(res => {
        this.loading = false;
        console.log(url, res);
        if (res.msg === "未查询到数据") {
          this.$message(res.msg);
          this.tableData = null;
        } else {
          console.log("res.data", res.data);
          this.data1 = res.data.data.records;
          this.total = res.data.data.total;

          this.data1.forEach(item => {
            this.downloadList.push(item.literatureId);
          });
        }
      });
    },
    changePage(current) {
      this.pageParams.current = current;
      this.search();
    },
    changePageSize(size) {
      this.pageParams.size = size;
      this.search();
    },
    //下载单个
    download(literatureId) {
      window.location.href =
        "/api/literatureExcel/exportUserExcel?literatureId=" + literatureId;
      this.getDownload(literatureId);
    },
    //下载全部
    downloadAll() {
      if (this.index < this.downloadList.length) {
        window.location.href =
          "/api/literatureExcel/exportUserExcel?literatureId=" +
          this.downloadList[this.index];
        this.getDownload(this.downloadList[this.index]);
        setTimeout(() => {
          this.index = this.index + 1;
          this.downloadAll();
        }, 1000);
      } else {
        this.index = 0;
        this.$Message.success("下载完成！");
      }
    },
    //下载接口
    getDownload(literatureId) {
      this.$axios
        .get(
          "/api/literatureExcel/exportUserExcel?literatureId=" + literatureId
        )
        .then(res => {
          console.log(res);
        });
    },
    editInform(literatureId, power) {
      this.literatureId = literatureId;
      this.power = power;
      console.log(this.literatureId);
      this.modal1 = true;
      let form = new FormData();
      form.append("literatureId", this.literatureId);
      this.$axios
        .post("/api/noticeGroup/getNoticeGroupByList", form)
        .then(res => {
          console.log(res);
          this.list = res.data.data;
        });
    },
    update(literatureId) {
      this.$router.push({
        path: "/refreshData",
        query: { literatureId, literatureId }
      });
    },
    Delete(literatureId) {
      this.literatureId = literatureId;
      this.modal2 = true;
    },
    ok() {
      console.log(this.literatureId);
      console.log(this.power);
      console.log(this.groupIdList);
      let form = new FormData();
      form.append("literatureId", this.literatureId);
      form.append("power", this.power);
      form.append("groupIdList", this.groupIdList);
      this.$axios
        .post(
          "/api/literature/updateLiteratureByUserIdAndPigBreedAndTime",
          form
        )
        .then(res => {
          if (res.data.code == 100) {
            this.$Message.success("修改成功！");
            this.modal1 = false;
            this.getDownloadList();
          } else {
            this.$Message.info("修改失败！");
          }
        });
    },
    cancel() {
      this.modal1 = false;
    },
    ok1() {
      console.log(this.literatureId);
      let form = new FormData();
      form.append("literatureId", this.literatureId);
      this.$axios.post("/api/literature/deleteLiterature", form).then(res => {
        if (res.data.code == 100) {
          this.$Message.success("删除成功！");
          this.modal2 = false;
          this.getDownloadList();
        } else {
          this.$Message.info("修改失败！");
        }
      });
    },
    cancel1() {
      this.modal2 = false;
    },
    handleCheckAll() {
      this.checkAll = !this.checkAll;
      let list = [];
      this.list.forEach(item => {
        list.push(item.id);
      });
      if (this.checkAll) {
        this.groupIdList = list;
      } else {
        this.groupIdList = [];
      }
    },
    checkAllGroupChange(data) {
      console.log(data);
      if (data.length === this.list.length) {
        this.checkAll = true;
      } else {
        this.checkAll = false;
      }
    },
    opnow(row) {
      this.row = row;
    },
    getName(name) {
      console.log(this.row);
      if (name == "uploadFile") {
        this.modal3 = true;
      }
      if (name == "update") {
        this.update(this.row.literatureId);
      }
    },
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
    ok2() {
      this.saveAll();
      this.fileList = [];
      this.modal3 = false;
      this.getDownloadList();
    },
    cancel2() {
      this.fileList = [];
      this.modal3 = false;
    },
    cancel3() {
      this.fileList = [];
      this.obj = [];
      this.showResult = false;
    },
    cancel4() {
      this.fileList = [];
      this.obj = [];
      this.showResult1 = false;
    },
    saveAll() {
      if (this.obj.length != 0) {
        let form = new FormData();
        let literatureList = this.obj[0];
        console.log(this.obj[3][1]);
        let literatureDataListMap = this.obj[3];
        let power = this.power;
        let groupIdList = this.groupIdList;
        this.$axios
          .post("/api/literatureExcel/updateImportExcel", {
            literatureDataListMap: this.obj[3],
            literatureList: this.obj[0],
            literatureId: this.row.literatureId,
            power: power,
            groupIdList: groupIdList
          })
          .then(res => {
            if (res.data.code == 100) {
              this.$Message.success("上传成功");
            } else {
              this.$Message.error(res.data.msg);
            }
          });
      } else {
        this.$Message.error("上传数据失败！");
      }
    },
    gotoModal() {
      window.location.href = "/api/literatureExcel/exportExcelTemplate";
    },
    Delete1(index) {
      this.fileList.splice(index, 1);
    },
    select(e) {
      console.log(e);
      console.log(this.power);
    }
  },
  mounted() {
    this.getDownloadList();
  }
};
</script>

<style>
#end .ivu-table-wrapper {
  width: 1140px;
}

#end {
  padding: 24px;
  background: #ffffff;
}
#end .upload1 {
  width: 700px;
  height: 90px;
  background: rgba(253, 253, 255, 1);
  border-radius: 3px;
  margin-top: 143px;
  display: inline-block;
}
#end .ivu-radio-inner:after {
  background: rgba(242, 155, 118, 1);
}
#end .ivu-radio-checked .ivu-radio-inner {
  border-color: rgba(191, 191, 191, 1);
}
#end .ivu-checkbox-checked .ivu-checkbox-inner {
  border-color: rgba(153, 153, 153, 1);
  background: url("../../../../static/img/choice.png");
  background-size: 13px;
}
#end .ivu-table-cell {
  padding: 0;
}
#end .ivu-table-wrapper {
  width: 1140px;
}
#end .ivu-table-overflowX {
  overflow-x: hidden;
}
#end .ivu-table-tip {
  overflow: hidden;
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
.arrow_box2 {
  position: relative;
  border: 1px solid #c2e1f5;
  width: 500px;
  padding:10px;
  margin-top: 10px;
}
.arrow_box2:after,
.arrow_box2:before {
  bottom: 100%;
  left: 50%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}

.arrow_box2:after {
  border-color: rgba(136, 183, 213, 0);
  border-bottom-color: #fff;  
  border-width: 14px;
  margin-left: -120px;
}
.arrow_box2:before {
  border-color: rgba(194, 225, 245, 0);
  border-bottom-color: #c2e1f5;
  border-width: 15px;
  margin-left: -120px;
}
.content{
  display: flex;
  flex-wrap: wrap;

}
</style>