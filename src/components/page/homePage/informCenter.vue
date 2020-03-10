<template>
  <div style="padding:24px;background:#ffffff">
    <!-- 删除消息 -->
    <Modal v-model="modal" width="388" :closable="false" footer-hide>
      <div
        style="display:flex;justify-content:center;align-items:center;width:100%;height:67px;background:#8A2E31;border-radius:4px 4px 0px 0px;"
      >
        <span style="font-size:20px;font-weight:400;color:rgba(255,255,255,1);">是否删除该条消息？</span>
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
    <!-- 是否删除 -->
    <Modal v-model="modal1" width="388" :closable="false" footer-hide>
      <div
        style="display:flex;justify-content:center;align-items:center;width:100%;height:67px;background:#8A2E31;border-radius:4px 4px 0px 0px;"
      >
        <span style="font-size:20px;font-weight:400;color:rgba(255,255,255,1);">您已经加入该小组</span>
      </div>

      <div style="display:flex;justify-content:center;align-items:center;margin-top:26px">
        <span
          style="font-size:16px;
        font-family:Source Han Sans CN;
        font-weight:400;
        color:rgba(51,51,51,1);"
        >是否删除该条数据？</span>
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
    <!-- 已读未读 -->
    <div>
      <div
        style="padding:0 38px 0 38px;display:flex;justify-content:space-between;align-items:center;height:75px;border-bottom:1px solid rgba(247,248,250,1);"
      >
        <div>
          <span style="font-size:18px;font-weight:500;color:rgba(51,51,51,1);margin-right:13px">站内消息</span>
          <span
            style="font-weight:400;color:rgba(19,112,218,1);font-size:18px;"
          >{{inform.count}}条未读消息</span>
        </div>
        <Button
          style="background:rgba(138,46,49,1);
            border-radius:4px;width:97px;
            height:40px;"
          @click="allRead"
        >
          <span
            style="font-size:16px;
              font-family:Source Han Sans CN;
              font-weight:400;
              color:rgba(250,250,250,1);"
          >全部已读</span>
        </Button>
      </div>
    </div>

    <div style="padding:0 38px 0 38px;margin-top:20px">
      <div
        v-for="(item,index) in inform.informationByPage.records"
        :key="index"
        :id="'more' + index"
        :class="item.isRead==1?'oldInfo':'newInfo'"
        style=" overflow: hidden;height: 86px;"
        @click="getMore(index,item)"
      >
        <!-- 小组邀请 -->
        <div v-if="item.noticeTypeId == 1">
          <div>
            <div style="display:flex;justify-content:space-between;">
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <img
                  v-if="item.noticeType=='小组邀请'"
                  src="static/img/memberGroup.png"
                  style="width:20px;height:20px;margin-right:10px"
                />
                <span style="font-size:16px;font-weight:400;color:#556FB5">{{item.noticeType}}</span>
              </div>
              <div>
                <span
                  style="font-size:14px;font-weight:400;color:rgba(102,102,102,1);"
                >{{item.groupData.createTime}}</span>
              </div>
            </div>
            <div
              style="font-size:14px;font-weight:500;color:rgba(51,51,51,1);margin-top:12px"
            >{{item.groupData.createUserName}}邀请您加入”{{item.groupData.groupName}}“研究小组</div>
          </div>

          <div>
            <div style="display:flex;flex-direction:column;margin-top:10px">
              <span>小组名称：{{item.groupData.groupName}}</span>
              <span>创建人：{{item.groupData.createUserName}}</span>
              <span>小组介绍：{{item.groupData.groupIntroduction}}</span>
            </div>
            <div style="margin-top:2px;text-align:right;">
              <a
                @click.stop="Delete(item.informationId)"
                style="font-size:14px;font-weight:400;color:rgba(153,153,153,1);margin-right:34px;"
              >删除</a>
              <a
                v-if="item.groupData.status!=1"
                :id="'join' + index"
                style="font-size:14px;font-weight:400;color:rgba(19,112,218,1);"
                @click.stop="joinGroup(item.informationId,index)"
              >加入该小组</a>
              <a
                v-else
                style="font-size:14px;font-weight:400;color:#999999;pointer-events:none;cursor:default"
              >✓ 已加入小组</a>
            </div>
          </div>
        </div>
        <!-- 数据申请 -->
        <div v-if="item.noticeTypeId == 2">
          <div>
            <div style="display:flex;justify-content:space-between;">
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <img
                  v-if="item.noticeType=='数据申请'"
                  src="static/img/dataApply.png"
                  style="width:20px;height:20px;margin-right:10px"
                />
                <span style="font-size:16px;font-weight:400;color:#556FB5;">{{item.noticeType}}</span>
              </div>
              <div>
                <span
                  style="font-size:14px;font-weight:400;color:rgba(102,102,102,1);"
                >{{item.applicationData.createTime}}</span>
              </div>
            </div>
            <div
              style="font-size:14px;font-weight:500;color:rgba(51,51,51,1);margin-top:12px"
            >{{item.applicationData.fromUName}}申请查看您的不公开数据</div>
          </div>

          <div>
            <div style="display:flex;flex-direction:column;margin-top:10px">
              <span>猪肉名称：{{item.applicationData.pigBreed==null?'无':item.applicationData.pigBreed}}</span>
              <span>纯种或杂种：{{item.applicationData.breedType==null?'无':item.applicationData.breedType==1?'纯种':'杂种'}}</span>
              <span>性别：{{item.applicationData.animalSex==null?'无':item.applicationData.animalSex==1?'公猪':item.applicationData.animalSex==2?'阉公猪':'母猪'}}</span>
              <span>饲养周期：{{item.applicationData.feedPeriod==null?'无':item.applicationData.feedPeriod}}</span>
              <span>取样位置：{{item.applicationData.sampPoint==null?'无':item.applicationData.sampPoint}}</span>
              <span>产地：{{item.applicationData.place==null?'无':item.applicationData.place}}</span>
              <span>饲料信息：{{item.applicationData.feedInformation==null?'无':item.applicationData.feedInformation}}</span>
              <span>冷却方式：{{item.applicationData.coolWay==null?'无':item.applicationData.coolWay}}</span>
              <span>运输方式：{{item.applicationData.transportationCondition==null?'无':item.applicationData.transportationCondition}}</span>
              <span>贮藏条件：{{item.applicationData.storeCondition==null?'无':item.applicationData.storeCondition}}</span>
              <!-- <span>申请指标：水份、活重、白蛋白</span> -->
            </div>
            <div style="margin-top:2px;text-align:right;">
              <a
                @click.stop="Delete(item.informationId)"
                style="font-size:14px;font-weight:400;color:rgba(153,153,153,1);margin-right:34px;"
              >删除</a>
              <a
                v-if="item.applicationData.status!=1"
                :id="'apply' + index"
                style="font-size:14px;font-weight:400;color:rgba(19,112,218,1);"
                @click.stop="apply(index,item.informationId)"
              >同意</a>
              <a
                v-else
                style="font-size:14px;font-weight:400;color:#999999;pointer-events:none;cursor:default"
              >✓ 已同意</a>
            </div>
          </div>
        </div>
        <!-- 申请反馈 -->
        <div v-if="item.noticeTypeId == 3">
          <div>
            <div style="display:flex;justify-content:space-between;">
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <img
                  v-if="item.noticeType=='申请反馈'"
                  src="static/img/applyReturn.png"
                  style="width:20px;height:20px;margin-right:10px"
                />
                <span style="font-size:16px;font-weight:400;color:#556FB5;">{{item.noticeType}}</span>
              </div>
              <div>
                <span
                  style="font-size:14px;font-weight:400;color:rgba(102,102,102,1);"
                >{{item.applicationFeedback.createTime}}</span>
              </div>
            </div>
            <div
              style="font-size:14px;font-weight:500;color:rgba(51,51,51,1);margin-top:12px"
            >{{item.applicationFeedback.userName}}{{item.applicationFeedback.status==1?'同意':'拒绝'}}了您的权限查看申请</div>
          </div>

          <div>
            <div style="display:flex;flex-direction:column;margin-top:10px">
              <span>申请时间：{{item.applicationFeedback.createTime}}</span>
              <span>申请结果：{{item.applicationFeedback.status==1?'同意':'拒绝'}}</span>
            </div>
            <div style="margin-top:2px;text-align:right;">
              <a
                style="font-size:14px;font-weight:400;color:rgba(153,153,153,1);margin-right:34px"
                @click.stop="Delete(item.informationId)"
              >删除</a>
              <a
                v-if="item.applicationFeedback.status==1"
                :id="'download' + index"
                style="font-size:14px;font-weight:400;color:rgba(19,112,218,1);"
                @click.stop="download(index,item.applicationFeedback.literatureId)"
              >下载申请数据</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div style="height:230px;display:flex;justify-content:center;padding:115px 0 115px 0">
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
    </div>
  </div>
</template>
<script>
export default {
  name: "informCenter",
  data() {
    return {
      modal: false,
      modal1: false,
      inform: {
        count: 0,
        informationByPage: {
          records: []
        }
      },
      getSearch: {
        page: 1,
        pageSize: 10
      },
      informationId: "",
      total: 0,
      msg: ""
    };
  },
  methods: {
    getData() {
      this.notRead = [];
      let form = new FormData();
      form.append("page", this.getSearch.page);
      form.append("pageSize", this.getSearch.pageSize);
      this.$axios
        .post("/api/information/getInformationByPage", form)
        .then(res => {
          this.inform = res.data.data;
          this.total = res.data.data.informationByPage.total;
          console.log(this.inform);
        });
    },
    allRead() {
      // let form = new FormData()
      // form.append('informationIdList',[])
      this.$axios.post("/api/information/updateAllRead").then(res => {
        console.log(res);
        this.getData();
      });
    },
    getMore(index, item) {
      if (item.isRead == 2) {
        let form = new FormData();
        form.append("informationIdList", [item.informationId]);
        this.$axios.post("/api/information/updateRead", form).then(res => {
          console.log(res);
          this.getData();
        });
      }
      let more = document.getElementById("more" + index);
      if (more.style.overflow == "hidden") {
        more.style.overflow = "visible";
        more.style.height = "auto";
      } else {
        more.style.overflow = "hidden";
        more.style.height = "86px";
      }
    },

    //加入该小组
    joinGroup(informationId, index) {
      let form = new FormData();
      this.informationId = informationId;
      form.append("informationId", informationId);
      this.$axios.post("/api/information/addGroup", form).then(res => {
        console.log(res);
        this.msg = res.data.data;
        if (this.msg == "加入小组成功") {
          this.$Message.success(this.msg);
          this.getData();
        } else {
          this.modal1 = true;
        }
      });
    },
    Delete(informationId) {
      console.log(informationId);
      this.informationId = informationId;
      this.modal = true;
    },
    //同意
    apply(index, informationId) {
      let form = new FormData();
      form.append("informationId", informationId);
      this.$axios
        .post("/api/information/saveApplicationFeedback", form)
        .then(res => {
          console.log(res);
          this.getData();
        });
    },
    //下载申请数据
    download(index, literatureId) {
      window.location.href =
        "/api/literatureExcel/exportUserExcel?literatureId=" + literatureId;
      this.getDownload(literatureId);
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
    changePage(page) {
      this.getSearch.page = page;
      this.getData();
    },
    changePageSize(pageSize) {
      this.getSearch.pageSize = pageSize;
      this.getData();
    },
    ok() {
      let form = new FormData();
      form.append("informationId", this.informationId);
      this.$axios
        .post("/api/information/deteleInformationByUpdate", form)
        .then(res => {
          console.log(res);
          this.modal = false;
          this.$Message.success("删除成功！");
          this.getData();
        });
    },
    cancel() {
      this.modal = false;
    },
    ok1() {
      let form = new FormData();
      form.append("informationId", this.informationId);
      this.$axios
        .post("/api/information/deteleInformationByUpdate", form)
        .then(res => {
          console.log(res);
          this.modal1 = false;
          this.$Message.success("删除成功！");
          this.getData();
        });
    },
    cancel1() {
      this.modal1 = false;
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
<style>
.ivu-modal-body {
  padding: 0 !important;
}
.oldInfo {
  padding: 20px 24px 20px 24px;
  background: rgba(247, 248, 250, 1);
  border-radius: 4px;
  margin-bottom: 10px;
  cursor: pointer;
}
.newInfo {
  padding: 20px 24px 20px 24px;
  background: rgb(210, 204, 235);
  border-radius: 4px;
  margin-bottom: 10px;
  cursor: pointer;
}
</style>