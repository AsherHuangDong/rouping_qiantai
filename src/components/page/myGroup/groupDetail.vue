<template>
  <div id="groupDetail" style="padding:24px;background:#ffffff">
    <!-- 解散小组 -->
    <Modal v-model="model1" width="388" :closable="false" footer-hide>
      <div
        style="display:flex;justify-content:center;align-items:center;width:100%;height:67px;background:#8A2E31;border-radius:4px 4px 0px 0px;"
      >
        <span style="font-size:20px;font-weight:400;color:rgba(255,255,255,1);">是否解散该小组？</span>
      </div>

      <div style="display:flex;justify-content:center;align-items:center;margin-top:26px">
        <span
          style="font-size:16px;
        font-family:Source Han Sans CN;
        font-weight:400;
        color:rgba(51,51,51,1);"
        >解散小组不会删除数据，但不再共享成员数据</span>
      </div>
      <div style="text-align:center;margin-top:32px;">
        <Button
          style="width:90px;margin-bottom:28px;background:rgba(138,46,49,1);
        border-radius:6px;margin-right:40px"
          @click="ok1"
        >
          <span
            style="font-size:18px;
            font-family:Source Han Sans CN;
            font-weight:400;
            color:rgba(255,255,255,1);"
          >解散</span>
        </Button>

        <Button
          style="width:90px;margin-bottom:28px;border:1px solid rgba(138,46,49,1);
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
      </div>
    </Modal>

    <!-- 退出小组 -->
    <Modal v-model="model2" width="388" :closable="false" footer-hide>
      <div
        style="display:flex;justify-content:center;align-items:center;width:100%;height:67px;background:#8A2E31;border-radius:4px 4px 0px 0px;"
      >
        <span style="font-size:20px;font-weight:400;color:rgba(255,255,255,1);">是否退出该小组？</span>
      </div>

      <div style="display:flex;justify-content:center;align-items:center;margin-top:26px">
        <span
          style="font-size:16px;
        font-family:Source Han Sans CN;
        font-weight:400;
        color:rgba(51,51,51,1);"
        >退出小组后无法共享成员数据</span>
      </div>

      <div style="text-align:center;margin-top:32px;">
        <Button
          style="width:90px;margin-bottom:28px;background:rgba(138,46,49,1);
        border-radius:6px;margin-right:40px"
          @click="ok2"
        >
          <span
            style="font-size:18px;
            font-family:Source Han Sans CN;
            font-weight:400;
            color:rgba(255,255,255,1);"
          >解散</span>
        </Button>

        <Button
          style="width:90px;margin-bottom:28px;border:1px solid rgba(138,46,49,1);
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
      </div>
    </Modal>

    <div style="display:flex;justify-content:space-between;align-items:center;width:100%">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <span
          style="font-size:18px;
        font-family:Source Han Sans CN;
        font-weight:400;
        color:rgba(51,51,51,1);margin-right:28px"
        >小组名称</span>
        <Input style="width:372px" v-model="groupName"></Input>
      </div>

      <div>
        <Button
          style="width:68px;
        height:40px;
        background:rgba(242,155,118,1);
        border-radius:4px;
        margin-right:30px"
          @click="getData"
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
          @click="gotoAdd"
        >
          <span
            style="font-size:16px;
        font-family:Source Han Sans CN;
        font-weight:400;
        color:rgba(250,250,250,1);"
          >新建小组</span>
        </Button>
      </div>
    </div>

    <div style="margin-top:30px;overflow-x:scroll">
      <Table border :columns="columns1" :data="data1" :loading="loading">
        <template slot-scope="{ row, index }" slot="groupName">
          <a
            size="small"
            style="font-size:12px;
            font-family:Source Han Sans CN;
            font-weight:400;
            color:blue"
            @click="gotoDetail(row.id)"
          >{{row.groupName}}</a>
        </template>

        <template slot-scope="{ row, index }" slot="edit">
          <div
            style="display:flex;justify-content:space-between;align-items:center;padding:0 65px 0 48px"
          >
            <a
              @click="uploadData(row.id)"
              style="font-size:12px;
              font-family:Source Han Sans CN;
              font-weight:400;
              color:rgba(19,112,218,1);"
            >上传数据</a>
            <a
              v-if="row.isCreate"
              @click="dissolve(row.id)"
              style="font-size:12px;
              font-family:Source Han Sans CN;
              font-weight:400;
              color:rgba(19,112,218,1);"
            >解散</a>
            <a
              v-if="!row.isCreate"
              @click="quit(row.id)"
              style="font-size:12px;
              font-family:Source Han Sans CN;
              font-weight:400;
              color:rgba(19,112,218,1);"
            >退出</a>
          </div>
        </template>
      </Table>
    </div>
    <br />
    <Row>
      <Col span="24" style="text-align:right;">
        <Page
          :total="total"
          :current="getsearch.page"
          :page-size="getsearch.pageSize"
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
  name: "groupDetail",
  data() {
    return {
      type: 1,
      model1: false,
      model2: false,
      groupName: "",
      getsearch: {
        page: 1,
        pageSize: 10
      },
      columns1: [
        {
          title: "序号",
          align: "center",
          width: 70,
           render: (h, params) => {
            return h(
              "span",
              params.index +
                (this.getsearch.page - 1) * this.getsearch.pageSize +
                1
            );
          }
        },
        {
          title: "小组名称",
          align: "center",
          slot: "groupName",
          width: 225
        },
        {
          title: "小组人数",
          key: "personCount",
          align: "center",
          width: 124
        },
        {
          title: "创建人",
          key: "name",
          align: "center",
          width: 230
        },
        {
          title: "创建时间",
          key: "createTime",
          align: "center",
          width: 226
        },
        {
          title: "操作",
          align: "center",
          slot: "edit",
          width: 270
        }
      ],
      id: "",
      userId: "",
      data1: [],
      total: 0,
      loading: false
    };
  },
  methods: {
    getData() {
      this.loading = true;
      let form = new FormData();
      form.append("page", this.getsearch.page);
      form.append("pageSize", this.getsearch.pageSize);
      if (this.groupName) {
        form.append("groupName", this.groupName);
      }
      this.$axios
        .post("/api/noticeGroup/getNoticeGroupByPage", form)
        .then(res => {
          this.loading = false;
          let userId = localStorage.getItem("userId");
          console.log(userId);
          this.data1 = res.data.data.records;
          this.total = res.data.data.total;
          this.data1.forEach(item => {
            if (item.userId == userId) {
              item.isCreate = true;
            } else {
              item.isCreate = false;
            }
          });
        });
    },
    changePage(page) {
      this.getsearch.page = page;
      this.getData();
    },
    changePageSize(pageSize) {
      this.getsearch.pageSize = pageSize;
      this.getData();
    },
    //新建小组
    gotoAdd() {
      this.$router.push("/addGroup");
    },
    //确定解散小组
    ok1() {
      this.model1 = false;
      let id = this.id;
      let form = new FormData();
      form.append("id", id);
      this.$axios.post("/api/noticeGroup/deleteNoticeGroup", form).then(res => {
        this.$Message.success("解散成功!");
        this.model1 = false;
        this.getData();
      });
    },
    cancel1() {
      this.model1 = false;
    },
    //确定退出小组
    ok2() {
      let form = new FormData();
      form.append("id", this.id);
      this.$axios.post("/api/noticeGroup/exitNoticeGroup", form).then(res => {
        this.$Message.success("退出成功!");
        this.model2 = false;
        this.getData();
      });
    },
    cancel2() {
      this.model2 = false;
    },
    gotoDetail(id) {
      this.$router.push({
        path: "/groupContent",
        query: {
          id: id
        }
      });
    },
    //解散小组
    dissolve(id) {
      this.id = id;
      this.model1 = true;
    },
    //退出小组
    quit(id) {
      this.id = id;
      this.model2 = true;
    },
    //上传数据
    uploadData(id) {
      this.$router.push({
        path: "/uploadData",
        query: {
          id: id
        }
      });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
<style>
#groupDetail .ivu-table-wrapper {
  width: 1140px;
}
.ivu-table-overflowX {
  overflow-x: hidden;
}
.ivu-modal-body {
  padding: 0 !important;
}
</style>