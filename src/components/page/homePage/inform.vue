<template>
  <div style="background:rgba(255,255,255,1);padding:24px">
    <div>
      <div>
        <div
          style="padding:0 38px 0 38px;display:flex;justify-content:space-between;align-items:center;height:75px;border-bottom:1px solid rgba(247,248,250,1);"
        >
          <div>
            <span
              style="font-size:18px;font-weight:500;color:rgba(51,51,51,1);margin-right:13px"
            >通知公告</span>
            <span
              style="font-weight:400;color:rgba(19,112,218,1);font-size:18px;"
            >{{inform.disread}}条未读消息</span>
          </div>
          <Button
            style="background:rgba(138,46,49,1);
            border-radius:4px;width:97px;
            height:40px;"
            @click="readAll"
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

      <div>
        <div
          style="padding:0 40px 0 40px"
          v-for="(item,index) in inform.announcementUserIPage.records"
          :key="index"
        >
          <div
            style="height:116px;padding:22px 0 25px 0;border-bottom:1px solid rgba(238,238,238,1);"
          >
            <div style="display:flex;justify-content:space-between;">
              <span
                v-if="item.isRead==2"
                style="font-size:16px;font-weight:500;color:rgba(51,51,51,1);margin-bottom:19px;cursor:pointer;white-space: nowrap;  
                            display: inline-block;  
                            width: 80%; 
                            overflow: hidden;  
                            text-overflow: ellipsis;"
                @click="gotoDetail(item.announcementId)"
              >{{item.title}}</span>
              <span
                v-if="item.isRead==1"
                style="font-size:16px;font-weight:500;color:#AAAAAA;margin-bottom:19px;cursor:pointer;white-space: nowrap;  
                            display: inline-block;  
                            width: 80%; 
                            overflow: hidden;  
                            text-overflow: ellipsis;"
                @click="gotoDetail(item.announcementId)"
              >{{item.title}}</span>
              <span style="font-size:14px;font-weight:400;color:rgba(102,102,102,1);">{{item.cTime}}</span>
            </div>
            <div
              style="height:40px;text-overflow: -o-ellipsis-lastline;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;line-clamp: 2;-webkit-box-orient: vertical;"
            >
              <p
                v-if="item.isRead==2"
                style="font-size:14px;font-weight:400;color:rgba(51,51,51,1);"
                v-html="item.content"
              ></p>
              <p
                v-if="item.isRead==1"
                style="font-size:14px;font-weight:400;color:#AAAAAA"
                v-html="item.content"
              ></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br />
    <div style="height:230px;text-align:center;padding:115px 0 115px 0">
      <Page
        :total="total"
        :current="getSearch.page"
        :page-size="getSearch.pageSize"
        show-total
        @on-change="changePage"
        @on-page-size-change="changePageSize"
      ></Page>
    </div>
  </div>
</template>
<script>
export default {
  name: "inform",
  data() {
    return {
      getSearch: {
        page: 1,
        pageSize: 10
      },
      inform: {
        announcementUserIPage: {
          records: []
        }
      },
      total: 0
    };
  },
  methods: {
    getData() {
      let form = new FormData();
      form.append("page", this.getSearch.page);
      form.append("pageSize", this.getSearch.pageSize);
      this.$axios.post("/api/announcement/getAllAnnounce", form).then(res => {
        console.log(res);
        this.inform = res.data.data;
        this.total = res.data.data.announcementUserIPage.total;
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
    gotoDetail(announcementId) {
      let form = new FormData();
      form.append("announcementIdList", announcementId);
      this.$axios
        .post("/api/announcement/getAllReadAnnounce", form)
        .then(res => {
          console.log(res);
        });
      this.$router.push({
        path: "/informDetail",
        query: {
          announcementId
        }
      });
    },
    readAll() {
      let form = new FormData()
      form.append('announcementIdList','')
      this.$axios.post("/api/announcement/getAllReadAnnounce", form).then(res => {
        console.log(res);
        this.getData();
      });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
<style lang="">
</style>