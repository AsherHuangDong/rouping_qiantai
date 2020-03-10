<template>
  <div style="padding:24px;background:#ffffff">
    <div style="padding-top:30px;display:flex;justify-content:space-between;align-items:center">
      <span
        style="font-size:20px;
        font-family:Source Han Sans CN;
        font-weight:500;
        color:rgba(51,51,51,1);"
      >说明：具体数值已经隐藏，比较结果只展示由低到高排名及数值差距</span>
      <Button
        style="width:90px;
            height:42px;
            background:rgba(44,174,255,1);
            border-radius:6px;"
        @click="goback"
      >
        <span
          style="font-size:18px;
            font-family:Source Han Sans CN;
            font-weight:400;
            color:rgba(255,255,255,1);"
        >返回</span>
      </Button>
    </div>

    <div v-if="compareData.length!=0">
      <div id="box">
        <div id="right">
          <div class="watch">
            <div class="tab">
              <h1>猪种</h1>
            </div>
            <div v-for="(item,index) in compareData" :key="index" class="tab3">
              <span>{{item.pigBreed}}</span>
            </div>
          </div>
          <div class="watch">
            <div class="tab">
              <h1>纯/杂种</h1>
            </div>
            <div v-for="(item,index) in compareData" :key="index" class="tab3">
              <span>{{item.typeName}}</span>
            </div>
          </div>
          <div class="watch">
            <div class="tab">
              <h1>性别</h1>
            </div>
            <div v-for="(item,index) in compareData" :key="index" class="tab3">
              <span>{{item.sexName}}</span>
            </div>
          </div>
          <div class="watch">
            <div class="tab">
              <h1>饲养周期</h1>
            </div>
            <div v-for="(item,index) in compareData" :key="index" class="tab3">
              <span>{{item.feedPeriod}}</span>
            </div>
          </div>
          <div class="watch">
            <div class="tab">
              <h1>取样位置</h1>
            </div>
            <div v-for="(item,index) in compareData" :key="index" class="tab3">
              <span>{{item.sampPoint}}</span>
            </div>
          </div>
          <div class="watch">
            <div class="tab">
              <h1>取样时间</h1>
            </div>
            <div v-for="(item,index) in compareData" :key="index" class="tab3">
              <span>{{item.samp}}</span>
            </div>
          </div>
          <div class="watch">
            <div class="tab">
              <h1>饲料信息</h1>
            </div>
            <div v-for="(item,index) in compareData" :key="index" class="tab3">
              <span>{{item.feedInformation}}</span>
            </div>
          </div>
          <div class="watch">
            <div class="tab">
              <h1>屠宰方式</h1>
            </div>
            <div v-for="(item,index) in compareData" :key="index" class="tab3">
              <span>{{item.butcherWay}}</span>
            </div>
          </div>
          <div class="watch">
            <div class="tab">
              <h1>冷却方式</h1>
            </div>
            <div v-for="(item,index) in compareData" :key="index" class="tab3">
              <span>{{item.coolWay}}</span>
            </div>
          </div>
          <div class="watch">
            <div class="tab">
              <h1>贮藏条件</h1>
            </div>
            <div v-for="(item,index) in compareData" :key="index" class="tab3">
              <span>{{item.storeCondition}}</span>
            </div>
          </div>
          <div class="watch">
            <div class="tab">
              <h1>运输条件</h1>
            </div>
            <div v-for="(item,index) in compareData" :key="index" class="tab3">
              <span>{{item.transportationCondition}}</span>
            </div>
          </div>
        </div>
      </div>
      <div
        v-for="(item,index) in target"
        :key="index"
        :style="{width:50*(compareData.length+1)}"
        class="zhibiao"
      >
        <div class="type">
          <h1>{{item.parentName==null?item.indexTypeName:item.parentName+'-'+item.indexTypeName}}</h1>
        </div>
        <div>
          <div
            v-for="(item1,index1) in item.list"
            :key="index1"
            style="display:flex;justify-content:space-between;align-items:center"
          >
            <h1 class="tab2" style="width:200px" :title="item.indexName">{{item1.indexName}}</h1>
            <div class="tab1" v-for="(item2,index2) in item1.ranking" :key="index2">{{item2}}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="compareData.length==0">
        <h1>{{msg}}</h1>
    </div>
  </div>
</template>
<script>
export default {
  name: "dataCompare",
  data() {
    return {
      literatureIdList: [],
      compareData: [],
      target: [],
      msg:''
    };
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    getData() {
      let form = new FormData();
      form.append("literatureIdList", this.literatureIdList);
      this.$axios
        .post("/api/literature/getLiteratureByCompare", form)
        .then(res => {
          console.log(res);
          if (res.data.code == 100) {
            this.compareData = res.data.data[1];
            if (res.data.data[0].length != 0) {
              res.data.data[0].forEach(item => {
                if (item.list !== null) {
                  this.target.push(item);
                }
              });
            }
            console.log(this.target);
            this.target.forEach(item => {
              item.list.forEach(item1 => {
                item1.ranking = [];
              });
            });
            this.target.forEach(item => {
              item.list.forEach(item1 => {
                for (let i in item1.stringMap) {
                  item1.ranking.push(item1.stringMap[i]);
                }
              });
            });
            console.log(this.target);
          } else {
            this.msg = res.data.msg;
          }
        });
    }
  },
  mounted() {
    this.literatureIdList = this.$route.query.literatureIdList;
    this.getData();
  }
};
</script>
<style lang="" scoped>
#box {
  border: 1px solid #eee;
  margin-top: 20px;
  max-width: 1145px;
  overflow: scroll;
}
#right {
  min-width: 1145px;
}
.watch {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.tab {
  border: 1px solid #eee;
  overflow: scroll;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 150px;
  height: 50px;
}
.tab3 {
  overflow: scroll;
  text-overflow: ellipsis;
  border: 1px solid #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex: 1;
  height: 50px;
}
.zhibiao {
  border: 1px solid #eee;
}
.type {
  border: 1px solid #eee;
  text-align: center;
  background: rgba(225, 230, 241, 1);
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.tab1 {
  border: 1px solid #eee;
  height: 30px;
  display: flex;
  overflow: scroll;
  text-overflow: ellipsis;
  white-space: nowrap;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 50px;
}
.tab2 {
  border: 1px solid #eee;
  overflow: scroll; 
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  justify-content: center;
  align-items: center;
  flex: 0 0 150px;
  height: 50px;
}
.tab3 span{
    text-align: center;
}
</style>