<template>
  <div id="myDownload" style="padding:24px;background:#ffffff"> 
    <!-- 删除记录 -->
    <Modal v-model="modal" width="388" :closable="false" footer-hide>
      <div
        style="display:flex;justify-content:center;align-items:center;width:100%;height:67px;background:#8A2E31;border-radius:4px 4px 0px 0px;"
      >
        <span style="font-size:20px;font-weight:400;color:rgba(255,255,255,1);">是否删除该条记录？</span>
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
          style="width:90px;margin-bottom:28px;border:1px solid rgba(138,46,49,1);
        border-radius:6px;margin-right:40px"
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
        border-radius:6px"
          @click="ok"
        >
          <span
            style="font-size:18px;
            font-family:Source Han Sans CN;
            font-weight:400;
            color:rgba(255,255,255,1);"
          >删除</span>
        </Button>
      </div>
    </Modal>

    <!-- 清空所有记录 -->
    <Modal v-model="modal1" width="388" :closable="false" footer-hide>
      <div
        style="display:flex;justify-content:center;align-items:center;width:100%;height:67px;background:#8A2E31;border-radius:4px 4px 0px 0px;"
      >
        <span style="font-size:20px;font-weight:400;color:rgba(255,255,255,1);">是否清空所有记录？</span>
      </div>

      <div style="display:flex;justify-content:center;align-items:center;margin-top:26px">
        <span
          style="font-size:16px;
        font-family:Source Han Sans CN;
        font-weight:400;
        color:rgba(51,51,51,1);"
        >清空后将无法恢复</span>
      </div>
      <div style="text-align:center;margin-top:32px;">
         <Button
          style="width:90px;margin-bottom:28px;border:1px solid rgba(138,46,49,1);
        border-radius:6px;margin-right:40px"
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
        border-radius:6px"
          @click="ok1"
        >
          <span
            style="font-size:18px;
            font-family:Source Han Sans CN;
            font-weight:400;
            color:rgba(255,255,255,1);"
          >清空</span>
        </Button>
      </div>
    </Modal>

    <div style="display:flex;justify-content:space-between;align-items:center;width:100%">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <span
          style="font-size:18px;
        font-family:Source Han Sans CN;
        font-weight:400;
        color:rgba(51,51,51,1);margin-right:28px"
        >文件名</span>
        <Input style="width:372px" v-model="keyWords"></Input>
      </div>

      <div>
        <Button
          style="width:68px;
        height:40px;
        background:rgba(242,155,118,1);
        border-radius:4px;
        margin-right:30px"
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
          type="info"
          style="width:97px;
        height:40px;
        background:rgba(44,174,255,1);
        border-radius:4px;"
        @click="clear"
        >
          <span
            style="font-size:16px;
        font-family:Source Han Sans CN;
        font-weight:400;
        color:rgba(250,250,250,1);"
          >清空记录</span>
        </Button>
      </div>
    </div>

    <div style="margin-top:30px;overflow-x:scroll">
      <Table border :columns="columns1" :data="data1" :loading="loading">
        <template slot-scope="{ row, index }" slot="edit">
          <div style="display:flex;justify-content:space-between;align-items:center;padding-left:30px;padding-right:30px">
            <a v-if="row.isdelete==1"
              style="font-size:12px;
              font-family:Source Han Sans CN;
              font-weight:400;
              color:#eee"
            >已删除</a>
            <a
              v-else
              @click="download(row.literatureId)"
              style="font-size:12px;
              font-family:Source Han Sans CN;
              font-weight:400;
              color:rgba(19,112,218,1);"
            >下载</a>
            <a
              @click="Delete(row.downloadId)"
              style="font-size:12px;
              font-family:Source Han Sans CN;
              font-weight:400;
              color:rgba(19,112,218,1);"
            >删除记录</a>
          </div>
        </template>
      </Table>
    </div>
    <br />
    <Row>
      <Col span="24" style="text-align:right;">
        <Page
          :total="total"
          :current="getSearch.page"
          :page-size="getSearch.pageSize"
          show-total
          show-sizer
          show-elevator
          @on-change="changePage"
          @on-page-size-change="changePageSize"
        ></Page>
      </Col>
    </Row>
  </div>
</template>
<script>
export default {
  name: "myDownload",
  data() {
    let self = this;
    return {
      modal:false,
      modal1: false,
      loading: false,
      id: "",
      isdelete: false,
      isdeleteall: false,
      total: 0,
      keyWords: "",
      downloadId:'',
      getSearch:{
        page: 1,
        pageSize: 10
      },
      data1: [],
      columns1: [
        {
          width: 80,
          align: "center",
          title: "序号",
          render: (h, params) => {
            return h(
              "span",
              params.index +
                (this.getSearch.page - 1) * this.getSearch.pageSize +
                1
            );
          }
        },
        {
          title: "文件名",
          align: "center",
          key: "documentName"
        },
        {
          title: "数据量",
          align: "center",
          key: "dataNumber"
        },
        {
          title: "最近下载时间",
          align: "center",
          key: "createTime"
        },
        {
          title: "操作",
          width: 200,
          align: "center",
          slot: "edit"
        }
      ]
    };
  },
  methods: {
    search() {
      const params = new FormData();
      params.append("page", this.getSearch.page);
      params.append("pageSize", this.getSearch.pageSize);
      if (this.keyWords != "") {
        params.append("keyWords", this.keyWords);
      }
      const url = "/api/downloadRecord/getAllDownloadRecordByPage";
      this.$axios.post(url, params).then(res => {
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
      const url = "/api/downloadRecord/getAllDownloadRecordByPage";
      let params = new FormData();
      params.append("page", this.getSearch.page);
      params.append("pageSize", this.getSearch.pageSize);
      this.$axios.post(url, params).then(res => {
        console.log(url, res);
        this.loading = false;
        if (res.msg === "未查询到数据") {
          this.$message(res.msg);
          this.tableData = null;
        } else {
          console.log("res.data", res.data);
          this.data1 = res.data.data.records;
          this.total = res.data.data.total;
        }
      });
    },
    clear(){
      this.modal1 = true;
    },
    changePage(page){
      this.getSearch.page = page;
      this.getDownloadList();
    },
    changePageSize(pageSize){
      this.getSearch.pageSize = pageSize;
      this.getDownloadList();
    },
    download(literatureId) {
      console.log(literatureId)
       window.location.href =
        "/api/literatureExcel/exportUserExcel?literatureId=" + literatureId;
      this.getDownload(literatureId);
      setTimeout(()=>{this.getDownloadList()},1000) 
    },
    Delete(downloadId){
      this.downloadId = downloadId;
      this.modal = true;
    },
    //确认清空所有记录

    ok1(){
      this.$axios.post('/api/downloadRecord/deleteAllDownloadRecord',{}).then(res=>{
        console.log(res);
        this.$Message.success('清空完成！')
        this.modal1 = false;
        this.getDownloadList();
      })
    },
    //确认删除记录
    ok(){
      console.log(this.downloadId);
      let form = new FormData()
      form.append('downloadId',this.downloadId)
      this.$axios.post('/api/downloadRecord/deleteDownloadRecord',form).then(res=>{
        console.log(res)
        this.$Message.success('删除成功！');
        this.modal = false
        this.getDownloadList()
      })
    },
    cancel(){
      this.modal = false;
      this.modal1 = false;
    },
    getDownload(literatureId){
       this.$axios.get('/api/literatureExcel/exportUserExcel?literatureId=' + literatureId).then(res=>{
        console.log(res);
      })
    },
  },
  mounted() {
    this.getDownloadList();
  }
};
</script>
<style>
#myDownload .ivu-table-wrapper {
  width: 1140px;
}
.ivu-table-overflowX{
  overflow-x: hidden;
}
.ivu-table-tip{
  overflow-x: hidden;
}
.ivu-modal-body {
  padding: 0 !important;
}
</style>