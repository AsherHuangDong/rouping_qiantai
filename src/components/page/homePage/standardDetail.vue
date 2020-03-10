<template>
  <div style="padding:24px;background:#ffffff">
    <div class="title">{{inform.title}}</div>
    <div class="date">{{inform.cTime}}</div>
    <div class="point">
      <p class="ql-editor" v-html="inform.content"></p>
    </div>
    <div v-if="inform.fileUrl!=null && inform.fileName!=null" class="download">
      <Icon type="ios-cloud-download" size="10px" color="#000099" />
      <a @click="download">{{inform.fileName}}</a>
    </div>
  </div>
</template>
<script>
export default {
  name: "standardDetail",
  data() {
    return {
      id: "",
      inform: {}
    };
  },
  methods: {
    download() {
      window.location.href = "/api/governmentStandard/export?id=" + this.id;
      this.$axios
        .get("/api/governmentStandard/export?id=" + this.id)
        .then(res => {
          console.log(res);
        });
    }
  },
  mounted() {
    this.id = this.$route.query.id;
    let form = new FormData();
    form.append("id", this.id);
    this.$axios
      .post("/api/governmentStandard/getGovernmentStandardById", form)
      .then(res => {
        this.inform = res.data.data;
      });
  }
};
</script>
<style>

.title {
  font-size: 18px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  margin-top: 59px;
  text-align: center;
}
.date {
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  text-align: center;
  margin-top: 19px;
  margin-bottom: 55px;
}
.point {
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  padding: 0 75px 0 75px;
  text-align: start;
  line-height: 48px;
}
.download {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 75px 0 75px;
  margin-top: 20px;
}
.download a {
  font-size: 10px;
  color: blue;
  text-decoration: underline;
  margin-left: 5px;
}
</style>