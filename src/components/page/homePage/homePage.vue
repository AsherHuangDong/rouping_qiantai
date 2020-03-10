<template>
  <div style="background:rgba(247,248,250,1);padding:24px">
    <div style="display:flex;justify-content:space-between;padding-top:10px">
      <!-- 通知公告 -->
      <div style="width:590px;max-height:500px;background:rgba(255,255,255,1);">
        <div
          style="display:flex;justify-content:space-between;align-items:center;padding:0 20px;border-bottom:1px solid rgba(238,238,238,1);height:64px"
        >
          <span style="font-size:18px;color:rgba(51,51,51,1);font-weight:500;">通知公告</span>
          <img
            style="width:30px;height:30px; cursor: pointer; "
            src="static/img/more.png"
            @click="gotoInform"
          />
        </div>

        <div v-if="homepage.announcementUsers.length==0" style="padding:20px">
          <h1>暂无公告</h1>
        </div>
        <div v-if="homepage.announcementUsers.length!=0">
          <div style="overflow-y:scroll;max-height:435px;">
            <div
              style="padding:0 20px"
              v-for="(item,index) in homepage.announcementUsers"
              :key="index"
            >
              <div
                style="height:116px;padding:22px 0 25px 0;border-bottom:1px solid rgba(238,238,238,1);"
              >
                <div style="display:flex;justify-content:space-between;">
                  <span
                    v-if="item.isRead==2"
                    style="font-size:15px;font-weight:500;color:rgba(51,51,51,1);margin-bottom:19px;cursor:pointer;white-space: nowrap;  
                            display: inline-block;  
                            width: 400px; 
                            overflow: hidden;  
                            text-overflow: ellipsis;"
                    @click="gotoDetail(item.isRead,item.announcementId)"
                  >{{item.title}}</span>
                  <span
                    v-if="item.isRead==1"
                    style="font-size:15px;font-weight:500;color:#AAAAAA;margin-bottom:19px;cursor:pointer;white-space: nowrap;  
                            display: inline-block;  
                            width: 400px; 
                            overflow: hidden;  
                            text-overflow: ellipsis;"
                    @click="gotoDetail(item.isRead,item.announcementId)"
                  >{{item.title}}</span>
                  <span
                    style="font-size:14px;font-weight:400;color:rgba(102,102,102,1);"
                  >{{item.cTime}}</span>
                </div>
                <div
                  style="height:40px;text-overflow: -o-ellipsis-lastline;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;line-clamp: 2;-webkit-box-orient: vertical;"
                >
                  <p
                    v-if="item.isRead==2"
                    style="font-size:13px;font-weight:400;color:rgba(51,51,51,1);"
                    v-html="item.content"
                   
                  ></p>
                  <p
                    v-if="item.isRead==1"
                    style="font-size:13px;font-weight:400;color:#AAAAAA"
                    v-html="item.content"
                    
                  ></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 标准法规 -->
      <div style="width:500px;max-height:500px;background:rgba(255,255,255,1);">
        <div
          style="display:flex;justify-content:space-between;align-items:center;padding:0 20px;border-bottom:1px solid rgba(238,238,238,1);height:64px"
        >
          <span style="font-size:18px;color:rgba(51,51,51,1);font-weight:500;">标准法规</span>
          <img
            style="width:30px;height:30px; cursor: pointer; "
            src="static/img/more.png"
            @click="gotoStandard"
          />
        </div>

        <div v-if="homepage.governmentStandards.length==0" style="padding:20px">
          <h1>暂无标准</h1>
        </div>
        <div v-if="homepage.governmentStandards.length!=0">
          <div style="overflow-y:scroll;max-height:435px;">
            <div
              style="padding:0 20px"
              v-for="(item,index) in homepage.governmentStandards"
              :key="index"
            >
              <div
                style="height:116px;padding:22px 0 25px 0;border-bottom:1px solid rgba(238,238,238,1);"
              >
                <div style="display:flex;justify-content:space-between;">
                  <span
                    v-if="item.isRead==2"
                    style="font-size:15px;font-weight:500;color:rgba(51,51,51,1);margin-bottom:19px;cursor:pointer;white-space: nowrap;  
                            display: inline-block;  
                            width: 300px; 
                            overflow: hidden;  
                            text-overflow: ellipsis;"
                    @click="gotoDetail1(item.isRead,item.id)"
                  >{{item.title}}</span>
                  <span
                    v-if="item.isRead==1"
                    style="font-size:15px;font-weight:500;color:#AAAAAA;margin-bottom:19px;cursor:pointer;white-space: nowrap;  
                            display: inline-block;  
                            width: 300px; 
                            overflow: hidden;  
                            text-overflow: ellipsis;"
                    @click="gotoDetail1(item.isRead,item.id)"
                  >{{item.title}}</span>
                  <span
                    style="font-size:14px;font-weight:400;color:rgba(102,102,102,1);width:135px"
                  >{{item.cTime}}</span>
                </div>
                <div
                  style="height:40px;text-overflow: -o-ellipsis-lastline;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;line-clamp: 2;-webkit-box-orient: vertical;"
                >
                  <p
                    v-if="item.isRead==2"
                    style="font-size:13px;font-weight:400;color:rgba(51,51,51,1);"
                    v-html="item.content"
                    
                  ></p>
                  <p
                    v-if="item.isRead==1"
                    style="font-size:13px;font-weight:400;color:#AAAAAA"
                    v-html="item.content"
                    
                  ></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 平台预览 -->
    <div style="max-height:320px;margin-top:20px;display:flex;justify-content:space-between;">
      <div style="width:590px;background:rgba(255,255,255,1);padding-bottom:60px">
        <div
          style="display:flex;justify-content:space-between;align-items:center;height:63px;padding:0 41px 0 41px;border-bottom:1px solid rgba(238,238,238,1);"
        >
          <span style="font-size:18px;font-weight:500;
          color:rgba(51,51,51,1);">平台预览</span>
          <img
            src="static/img/reload.png"
            style="width:16px;height:14px;cursor:pointer"
            @click="refresh"
          />
        </div>
        <div
          style="display:flex;justify-content:space-between;margin-top:30px;padding:0 41px 0 41px;"
        >
          <div
            class="number"
            style="width:160px;height:160px;
            border-radius:6px;
            display:flex;flex-direction:column;align-items:center;justify-content:center"
          >
            <span
              style="font-size:16px;font-weight:400;color:rgba(255,255,255,1);margin-bottom:20px"
            >平台总数据量</span>
            <span
              style="font-size:28px;font-weight:500;color:rgba(255,255,255,1);"
            >{{homepage.number}}</span>
          </div>

          <div
            class="Uploadednumber"
            style="width:160px;height:160px;
            border-radius:6px;
            display:flex;flex-direction:column;align-items:center;justify-content:center"
          >
            <span
              style="font-size:16px;font-weight:400;color:rgba(255,255,255,1);margin-bottom:20px"
            >近一周上传数据量</span>
            <span
              style="font-size:28px;font-weight:500;color:rgba(255,255,255,1);"
            >{{homepage.Uploadednumber}}</span>
          </div>
          <div
            class="downloadnumber"
            style="width:160px;height:160px;
            border-radius:6px;
            display:flex;flex-direction:column;align-items:center;justify-content:center"
          >
            <span
              style="font-size:16px;font-weight:400;color:rgba(255,255,255,1);margin-bottom:20px;"
            >近一周下载数据量</span>
            <span
              style="font-size:28px;font-weight:500;color:rgba(255,255,255,1);"
            >{{homepage.downloadnumber}}</span>
          </div>
        </div>
      </div>

      <!-- 最新消息 -->
      <div style="width:500px;padding-bottom:60px;background:rgba(255,255,255,1);">
        <div
          style="display:flex;justify-content:space-between;align-items:center;height:63px;padding:0 41px 0 41px;border-bottom:1px solid rgba(238,238,238,1);"
        >
          <span
            style="font-size:18px;
          font-family:Source Han Sans CN;
          font-weight:500;
          color:rgba(51,51,51,1);"
          >最新消息</span>
          <img
            style="width:30px;height:30px;cursor: pointer;"
            src="static/img/more.png"
            @click="gotoInformCenter"
          />
        </div>

        <div v-if="newInformation.length==0" style="padding:20px 41px 0 41px;">
          <h1>暂无最新消息</h1>
        </div>

        <div v-if="newInformation.length!=0" style="width:500px;overflow:hidden">
          <div style="height:256px;overflow-y:scroll;width:520px">
            <div
              style="padding:0 41px 0 41px;"
              v-for="(item1,index1) in newInformation"
              :key="index1"
            >
              <div v-if="item1.noticeTypeId==1">
                <div style="margin-top:12px;display:flex;justify-content:space-between;">
                  <div style="display:flex;justify-content:space-between;align-items:center;">
                    <img
                      src="static/img/memberGroup.png"
                      style="width:20px;height:20px;margin-right:10px"
                    />
                    <span style="font-size:16px;font-weight:400;color:#556FB5;">{{item1.noticeType}}</span>
                  </div>
                  <div>
                    <span
                      style="font-size:14px;font-weight:400;color:rgba(102,102,102,1);"
                    >{{item1.createTime}}</span>
                  </div>
                </div>
                <div
                  style="font-size:14px;font-weight:500;color:rgba(51,51,51,1);margin-top:12px"
                >{{item1.groupData.createUserName}}邀请您加入{{item1.groupData.groupName}}</div>
              </div>
              <div v-if="item1.noticeTypeId==2">
                <div style="margin-top:12px;display:flex;justify-content:space-between;">
                  <div style="display:flex;justify-content:space-between;align-items:center;">
                    <img
                      src="static/img/dataApply.png"
                      style="width:20px;height:20px;margin-right:10px"
                    />
                    <span style="font-size:16px;font-weight:400;color:#556FB5;">{{item1.noticeType}}</span>
                  </div>
                  <div>
                    <span
                      style="font-size:14px;font-weight:400;color:rgba(102,102,102,1);"
                    >{{item1.applicationData.createTime}}</span>
                  </div>
                </div>
                <div
                  style="font-size:14px;font-weight:500;color:rgba(51,51,51,1);margin-top:12px"
                >{{item1.applicationData.fromUName}}申请查看您的不公开数据</div>
              </div>
              <div v-if="item1.noticeTypeId==3">
                <div style="margin-top:12px;display:flex;justify-content:space-between;">
                  <div style="display:flex;justify-content:space-between;align-items:center;">
                    <img
                      src="static/img/applyReturn.png"
                      style="width:20px;height:20px;margin-right:10px"
                    />
                    <span style="font-size:16px;font-weight:400;color:#556FB5;">{{item1.noticeType}}</span>
                  </div>
                  <div>
                    <span
                      style="font-size:14px;font-weight:400;color:rgba(102,102,102,1);"
                    >{{item1.applicationFeedback.createTime}}</span>
                  </div>
                </div>
                <div
                  style="font-size:14px;font-weight:500;color:rgba(51,51,51,1);margin-top:12px"
                >{{item.applicationFeedback.userName}}{{item.applicationFeedback.status==1?'同意':'拒绝'}}了您的权限查看申请</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "homePage",
  data() {
    return {
      homepage: {
        announcementUsers: [],
        information: [],
        governmentStandards: []
      },
      newInformation: []
    };
  },
  methods: {
    //查看公告
    gotoInform() {
      this.$router.push("/inform");
    },
    //站内消息
    gotoInformCenter() {
      this.$router.push("/informCenter");
    },
    //国家标准
    gotoStandard() {
      this.$router.push("/standard");
    },
    getData() {
      this.newInformation = [];
      this.$axios.post("/api/announcement/getInfoAnnounce", {}).then(res => {
        console.log(res);
        this.homepage = res.data.data;
        this.homepage.information.forEach(item => {
          item.createTime =
            item.applicationData != null ? item.applicationData.createTime : "";
          if (item.isRead == 2) {
            this.newInformation.push(item);
          }
        });
        console.log(this.newInformation);
      });
    },
    gotoDetail(isRead, announcementId) {
      if (isRead == 2) {
        let form = new FormData();
        form.append("announcementIdList", announcementId);
        this.$axios
          .post("/api/announcement/getAllReadAnnounce", form)
          .then(res => {
            console.log(res);
          });
      }
      this.$router.push({
        path: "/informDetail",
        query: {
          announcementId
        }
      });
    },
    gotoDetail1(isRead, id) {
      if (isRead == 2) {
        let form = new FormData();
        form.append("id", id);
        this.$axios
          .post("/api/governmentStandard/updateGovernmentStandardRead", form)
          .then(res => {
            console.log(res);
          });
      }
      this.$router.push({
        path: "/standardDetail",
        query: {
          id
        }
      });
    },
    refresh() {
      this.getData();
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
<style lang="">
.ivu-layout {
  background: rgba(247, 248, 250, 1);
}
.ivu-layout-content {
  background: rgba(247, 248, 250, 1);
}
.number {
  background: url("../../../../static/img/number.png") no-repeat;
  background-size: cover;
}
.Uploadednumber {
  background: url("../../../../static/img/upload.png") no-repeat;
  background-size: cover;
}
.downloadnumber {
  background: url("../../../../static/img/download.png") no-repeat;
  background-size: cover;
}
</style>