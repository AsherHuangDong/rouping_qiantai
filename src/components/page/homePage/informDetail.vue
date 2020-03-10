<template>
  <div style="padding:24px;background:#ffffff">
    <div class="title">{{inform.title}}</div>
    <div class="date">{{inform.cTime}}</div>
    <div class="point">
      <p class="ql-editor" v-html="inform.content">
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: "informDetail",
  data(){
    return{
      announcementId:'',
      inform:{}
    }
  },
  methods:{
    
  },
  mounted(){
    this.announcementId = this.$route.query.announcementId;
    console.log(this.announcementId);
    let form = new FormData()
    form.append('announcementId',this.announcementId)
    this.$axios.post('/api/announcement/getAnnounce',form).then(res=>{
      this.inform = res.data.data;
    })
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
  line-height:48px;
}
</style>