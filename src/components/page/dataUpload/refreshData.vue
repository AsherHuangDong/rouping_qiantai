<template>
  <div style="padding:24px;background:#ffffff">
    <div class="bottom">
      <div style="display:flex;justify-content:space-between;align-items:flex-start">
        <div class="sidebar">
          <div class="search-box">
            <Input
              suffix="ios-search"
              placeholder="搜索指标名称"
              style="width: 258px;"
              search
              v-model="keyWord"
              @on-search="getType"
            />
          </div>
          <div style="width:330px;overflow:hidden;">
            <div style="max-height:500px;overflow-y:scroll;width:350px">
              <Menu
                style="max-height:450px;width:308px;background:rgba(238,240,247,1);font-size:18px"
                theme="light"
                @on-select="select"
                :active-name="indexId"
                accordion
              >
                <Submenu :name="-1">
                  <template slot="title">
                    <span class="title1">产品信息</span>
                  </template>
                  <MenuItem :name="-1" class="menuItem">
                    <span>猪种</span>
                    <span>{{detail.pigBreed?detail.pigBreed:'<空>'}}</span>
                  </MenuItem>
                  <MenuItem :name="-2" class="menuItem">
                    <span>杂交信息</span>
                    <span>{{detail.typeName==null?'<空>':detail.typeName}}</span>
                  </MenuItem>
                  <MenuItem :name="-3" class="menuItem">
                    <span>性别</span>
                    <span>{{detail.sexName==null?'<空>':detail.sexName}}</span>
                  </MenuItem>
                  <MenuItem :name="-4" class="menuItem">
                    <span>饲养周期</span>
                    <span>{{detail.feedPeriod?detail.feedPeriod:'<空>'}}</span>
                  </MenuItem>
                  <MenuItem :name="-5" class="menuItem">
                    <span>取样位置</span>
                    <span>{{detail.sampPoint?detail.sampPoint:'<空>'}}</span>
                  </MenuItem>
                  <MenuItem :name="-6" class="menuItem">
                    <span>产地</span>
                    <span>{{detail.place?detail.place:'<空>'}}</span>
                  </MenuItem>
                  <MenuItem :name="-7" class="menuItem">
                    <span>饲料信息</span>
                    <span>{{detail.feedInformation?detail.feedInformation:'<空>'}}</span>
                  </MenuItem>
                  <MenuItem :name="-8" class="menuItem">
                    <span>屠宰方式</span>
                    <span>{{detail.butcherWay?detail.butcherWay:'<空>'}}</span>
                  </MenuItem>
                  <MenuItem :name="-9" class="menuItem">
                    <span>冷却方式</span>
                    <span>{{detail.coolWay?detail.coolWay:'<空>'}}</span>
                  </MenuItem>
                  <MenuItem :name="-10" class="menuItem">
                    <span>运输方式</span>
                    <span>{{detail.transportationCondition?detail.transportationCondition:'<空>'}}</span>
                  </MenuItem>
                  <MenuItem :name="-11" class="menuItem">
                    <span>贮藏条件</span>
                    <span>{{detail.storeCondition?detail.storeCondition:'<空>'}}</span>
                  </MenuItem>
                </Submenu>

                <Submenu
                  :name="item.indexTypeId"
                  v-for="item in typeList"
                  :key="item.indexTypeId"
                  v-if="item.indexLists"
                >
                  <template slot="title">
                    <span
                      class="title1"
                    >{{item.parentName?item.parentName + '-':''}}{{item.indexTypeName}}</span>
                  </template>
                  <MenuItem
                    :name="item1.indexId"
                    class="menuItem"
                    v-for="item1 in item.indexLists"
                    :key="item1.indexId"
                    ref="menuOpen"
                  >
                    <span>{{item1.indexName}}</span>
                    <span v-if="!item1.literatureData"><空></span>
                    <span
                      v-if="item1.literatureData"
                    >{{item1.literatureData.quantityValue?item1.literatureData.unit?item1.literatureData.pc?item1.literatureData.ybl?item1.literatureData.testMethod?item1.literatureData.quantityValue+'±'+item1.literatureData.pc+item1.literatureData.unit+'(样本量：'+item1.literatureData.ybl+')':'':'':"":'':''}}</span>
                  </MenuItem>
                </Submenu>
              </Menu>
            </div>
          </div>
        </div>
        <div class="con">
          <div v-if="indexId==-1">
            <span>请输入猪种</span>
            <Input style="width:300px;" v-model="detail.pigBreed"></Input>
            <div style="padding:20px 100px;">
              <Button type="info" @click="save">保存</Button>
            </div>
          </div>
          <div v-if="indexId==-2">
            <span>杂交信息</span>
            <Input style="width:300px" v-model="detail.typeName"></Input>

            <div style="padding:20px 100px;">
              <Button type="info" @click="save">保存</Button>
            </div>
          </div>
          <div v-if="indexId==-3">
            <span>性别</span>
            <Input style="width:300px;" v-model="detail.sexName"></Input>
            <div style="padding:20px 100px;">
              <Button type="info" @click="save">保存</Button>
            </div>
          </div>
          <div v-if="indexId==-4">
            <span>饲养周期</span>
            <Input style="width:300px;" v-model="detail.feedPeriod"></Input>
            <div style="padding:20px 100px;">
              <Button type="info" @click="save">保存</Button>
            </div>
          </div>
          <div v-if="indexId==-5">
            <span>取样位置</span>
            <Input style="width:300px;" v-model="detail.sampPoint"></Input>
            <div style="padding:20px 100px;">
              <Button type="info" @click="save">保存</Button>
            </div>
          </div>
          <div v-if="indexId==-6">
            <span>产地</span>
            <Input style="width:300px;" v-model="detail.place"></Input>
            <div style="padding:20px 100px;">
              <Button type="info" @click="save">保存</Button>
            </div>
          </div>
          <div v-if="indexId==-7">
            <span>饲养信息</span>
            <Input style="width:300px;" v-model="detail.feedInformation"></Input>
            <div style="padding:20px 100px;">
              <Button type="info" @click="save">保存</Button>
            </div>
          </div>
          <div v-if="indexId==-8">
            <span>屠宰方式</span>
            <Input style="width:300px;" v-model="detail.butcherWay"></Input>
            <div style="padding:20px 100px;">
              <Button type="info" @click="save">保存</Button>
            </div>
          </div>
          <div v-if="indexId==-9">
            <span>冷却方式</span>
            <Input style="width:300px;" v-model="detail.coolWay"></Input>
            <div style="padding:20px 100px;">
              <Button type="info" @click="save">保存</Button>
            </div>
          </div>
          <div v-if="indexId==-10">
            <span>运输方式</span>
            <Input style="width:300px;" v-model="detail.transportationCondition"></Input>
            <div style="padding:20px 100px;">
              <Button type="info" @click="save">保存</Button>
            </div>
          </div>
          <div v-if="indexId==-11">
            <span>贮藏条件</span>
            <Input style="width:300px;" v-model="detail.storeCondition"></Input>
            <div style="padding:20px 100px;">
              <Button type="info" @click="save">保存</Button>
            </div>
          </div>
          <div v-if="indexId >= 0">
            <Form class="form" label-position="right" :label-width="70" ref="form">
              <FormItem label="量值">
                <Input v-model="obj.quantityValue" style="width:200px;"></Input>
              </FormItem>
              <FormItem label="单位">
                <Input v-model="obj.unit" style="width:200px;"></Input>
              </FormItem>
              <FormItem label="偏差">
                <Input v-model="obj.pc" style="width:200px;"></Input>
              </FormItem>
              <FormItem label="样本量" prop="unitName">
                <Input v-model="obj.ybl" style="width:200px;"></Input>
              </FormItem>
              <FormItem label="测定方法" prop="jobTitle">
                <Input v-model="obj.testMethod" style="width:200px;"></Input>
              </FormItem>
              <div style="padding:20px 100px;">
                <Button type="info" @click="save">保存</Button>
              </div>
            </Form>
          </div>
        </div>
        <div style="margin-top:16px;margin-left:30px  ">
          <Button type="primary" style="width:100px;height:40px;" @click="goback">返回</Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "refreshData",
  data() {
    let _this = this;
    return {
      isEdit: false,
      isDelete: false,
      formValidate: {},
      obj: {},
      id: "",
      detail: {},
      showDel: false,
      selObj: {},
      indexId: -20,
      indexName: "",
      keyWord: "",
      bigObj: {},
      typeList: [],
      list: []
    };
  },
  watch: {
    $route: function(to, from) {
      //   if (from.query.parents) {
      //     let obj = {
      //       indexTypeId: from.query.parents
      //     };
      //   }
    }
  },
  methods: {
    select(e) {
      this.indexId = e;
      if (this.indexId >= 0) {
        let form = new FormData();
        form.append("literatureId", this.id);
        form.append("indexId", this.indexId);
        this.$axios
          .post("/api/literature/getLiteratureData", form)
          .then(res => {
            if (res.data.data) {
              this.isEdit = true;
              this.isDelete = true;
              this.obj = res.data.data;
              console.log(this.obj);
            } else {
              this.obj = {};
              this.isEdit = false;
            }
          });
      }
      // this.typeList.forEach(item => {
      //   if (item.indexLists) {
      //     item.indexLists.forEach(item1 => {
      //       if (item1.indexId == e) {
      //         this.indexName = item1.indexName;
      //       }
      //     });
      //   }
      // });
      // this.getList(e);
    },
    save() {
      let form = new FormData();
      form.append("literatureId", this.id);
      let obj = {};
      this.indexId == -1
        ? (obj.pigBreed = this.detail.pigBreed)
        : this.indexId == -2
        ? (obj.typeName = this.detail.typeName)
        : this.indexId == -3
        ? (obj.sexName = this.detail.sexName)
        : this.indexId == -4
        ? (obj.feedPeriod = this.detail.feedPeriod)
        : this.indexId == -5
        ? (obj.sampPoint = this.detail.sampPoint)
        : this.indexId == -6
        ? (obj.place = this.detail.place)
        : this.indexId == -7
        ? (obj.feedInformation = this.detail.feedInformation)
        : this.indexId == -8
        ? (obj.butcherWay = this.detail.butcherWay)
        : this.indexId == -9
        ? (obj.coolWay = this.detail.coolWay)
        : this.indexId == -10
        ? (obj.transportationCondition = this.detail.transportationCondition)
        : this.indexId == -11
        ? (obj.storeCondition = this.detail.storeCondition)
        : "";
      if (this.indexId < 0) {
        for (let i in obj) {
          form.append(i, obj[i]);
        }
        this.$axios
          .post("/api/literature/updateLiteratureByLiteratureId", form)
          .then(res => {
            if (res.data.code == 100) {
              this.indexId = -20;
              this.$Message.success("保存成功！");
            }
          });
      } else {
        for (let i in this.obj) {
          form.append(i, this.obj[i]);
        }
        form.append("indexId", this.indexId);
        let url = "";
        if (this.isEdit) {
          if (
            !this.obj.quantityValue &&
            !this.obj.unit &&
            !this.obj.pc &&
            !this.obj.ybl &&
            !this.obj.testMethod
          ) {
            url = "/api/literature/deleteLiteratureData";
          } else {
            url = "/api/literature/updateLiteratureData";
          }
        } else {
          url = "/api/literature/saveLiteratureData";
        }
        this.$axios.post(url, form).then(res => {
          if (res.data.code == 100) {
            this.obj = {};
            this.indexId = -20;
            this.$Message.success("保存成功！");
            this.getType();
          }
        });
      }
    },
    getList(e) {
      let form = new FormData();
      form.append("indexId", e);
      this.$axios
        .post("/api/indexNumberScope/getNumberScopeByindexId", form)
        .then(res => {
          if (res.data.code == 100) {
            this.list = res.data.data;
          }
        });
    },
    //根据指标名称 进行模糊查询
    getType() {
      let form = new FormData();
      form.append("indexName", this.keyWord);
      form.append("literatureId", this.id);
      this.$axios
        .post("/api/literature/likeIndexListAndLiteratureData", form)
        .then(res => {
          if (res.data.code == 100) {
            console.log(res);
            this.typeList = res.data.data;
            for (let i = 0; i < this.typeList.length; i++) {
              //let a = true;
              if (this.typeList[0].indexLists) {
                this.indexId = this.typeList[0].indexLists[0].indexId;
                this.indexName = this.typeList[0].indexLists[0].indexName;
                //a = false;
              }
              //return a;
            }
            this.$nextTick(()=>{
                let ref = this.$refs.menuOpen;
                for(let i = 0 ; i < ref.length ; i++){
                    // MenuItem 处于选中状态就展开 Submenu
                    if(ref[i].name === this.indexId){
                        ref[i].active = true;
                        ref[i].$parent.opened = true;
                    }
                }
            })
          }
        });
    },
    add() {
      this.$router.push({
        path: "/addnumlimits",
        query: {
          indexId: this.indexId,
          indexName: this.indexName
        }
      });
    },
    del() {
      let form = new FormData();
      form.append("indexNumberScopeId", this.selObj.indexNumberScopeId);
      this.$axios
        .post("/api/indexNumberScope/deleteIndexNumberScope", form)
        .then(res => {
          if (res.data.code == 100) {
            this.showDel = false;
            this.getList(this.indexId);
            this.$Message.success("删除成功！");
          } else {
            this.$Message.error(res.data.msg);
          }
        });
    },
    cancel() {
      this.showDel = false;
    },
    //获取单个文献
    getDetail() {
      let form = new FormData();
      form.append("literatureId", this.id);
      this.$axios
        .post("/api/literature/getLiteratureByLiteratureId", form)
        .then(res => {
          this.detail = res.data.data;
          console.log(this.detail);
        });
    },
    goback() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.id = this.$route.query.literatureId;
    // this.id=9891
    this.getDetail();
    this.getType();
  }
};
</script>
<style scoped>
.top {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  width: 100%;
  height: 100px;
  align-items: center;
  border-radius: 8px;
  border: 1px solid #eee;
  margin-bottom: 20px;
}
.ivu-menu-dark {
  background: rgba(238, 240, 247, 1);
}
.bottom {
  display: flex;
}
.sidebar {
  width: 337px;
  height: calc(100vh - 170px);
  background: rgba(238, 240, 247, 1);
}
.menuItem {
  display: flex;
  justify-content: space-between;
  width: 308px;
  background: rgba(238, 240, 247, 1);
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.search-box {
  background: rgba(238, 240, 247, 1);
  padding: 20px;
}
.con {
  width: 70%;
  margin-left: 30px;
  margin-top: 20px;
}
.con span {
  font-size: 18px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: rgba(85, 111, 181, 1);
}
.menuItem .ivu-menu-item {
  padding-left: 0;
}
.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item {
  padding-left: 0;
}
.ivu-menu {
  position: static;
}
.title1 {
  font-size: 18px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}
</style>