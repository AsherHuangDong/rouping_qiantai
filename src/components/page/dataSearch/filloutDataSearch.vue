<template>
  <div id="fillout">
    <!-- 发送申请模态框 -->
    <Modal :id="modal" v-model="modal" width="617" :footer-hide="true">
      <p slot="header">
        <span style="font-size:20px">获取数据权限</span>
      </p>

      <div style="width:100%;">
        <div
          style="height:30px;background:rgba(238,238,238,1);padding-left:28px;display:flex;justify-content:start;align-items:center"
        >
          <div
            style="height:14px;width:79px;padding-left:7px;border-left:1px solid rgba(153,153,153,1);display:flex;justify-content:start;align-items:center"
          >
            <span
              style="font-size:14px;font-family:Microsoft YaHei UI;font-weight:400;color:rgba(153,153,153,1);"
            >上传者</span>
          </div>
          <div
            style="height:14px;width:164px;padding-left:7px;border-left:1px solid rgba(153,153,153,1);display:flex;justify-content:start;align-items:center"
          >
            <span
              style="font-size:14px;font-family:Microsoft YaHei UI;font-weight:400;color:rgba(153,153,153,1);"
            >单位</span>
          </div>
          <div
            style="height:14px;width:223px;padding-left:7px;border-left:1px solid rgba(153,153,153,1);display:flex;justify-content:start;align-items:center"
          >
            <span
              style="font-size:14px;font-family:Microsoft YaHei UI;font-weight:400;color:rgba(153,153,153,1);"
            >邮箱</span>
          </div>
          <div
            style="height:14px;width:119px;padding-left:7px;border-left:1px solid rgba(153,153,153,1);display:flex;justify-content:start;align-items:center"
          >
            <span
              style="font-size:14px;font-family:Microsoft YaHei UI;font-weight:400;color:rgba(153,153,153,1);"
            >申请权限</span>
          </div>
        </div>

        <div
          v-for="(item,index) in data2"
          :key="index"
          style="padding-left:35px;display:flex;justify-content:start;align-items:center;height:45px;border-bottom:1px solid rgba(238,238,238,1);"
        >
          <span
            style="font-size:16px;
          font-family:Microsoft YaHei UI;
          font-weight:400;
          color:rgba(51,51,51,1);width:79px"
          >{{item.name}}</span>
          <span
            style="font-size:16px;
          font-family:Microsoft YaHei UI;
          font-weight:400;
          color:rgba(51,51,51,1);width:164px;"
          >{{item.unitName}}</span>
          <span
            style="font-size:16px;
          font-family:Microsoft YaHei UI;
          font-weight:400;
          color:rgba(51,51,51,1);width:223px;"
          >{{item.emailAccount}}</span>
          <a
            :id="'apply'+index"
            style="font-size:16px;
          font-family:Microsoft YaHei UI;
          font-weight:400;
          color:rgba(19,112,218,1);width:119px;"
            @click="apply(item.literatureId,index)"
          >发送申请</a>
        </div>
      </div>
    </Modal>

    <!-- 搜索条件 -->
    <div>
      <Form ref="formValidate" :model="formValidate" :label-width="120">
        <FormItem prop="keyword">
          <template slot="label">
            <span>
              搜索
              <span style="color:#FC0202">*</span>
            </span>
          </template>

          <div style="display:flex;justify-content:flex-start;align-items:center">
            <Input
            v-model="formValidate.keyword"
            placeholder="按文献作者;猪种名称;产地搜索"
            style="width:400px;margin-left:4px"
            @on-keyup.enter="getData"
          >
            <Button
              slot="append"
              style="color:#fff;background:#2CAEFF"
              icon="ios-search"
              @click="getData"
            ></Button>
          </Input>

          <span style="color:#ccc;margin-left:10px">(提示：支持多关键词搜索，不同关键词中间用分号隔开)</span>
          </div>
        </FormItem>
        <FormItem label="发表时间">
          <Row>
            <Col span="11">
              <FormItem prop="date">
                <DatePicker
                  v-model="formValidate.startDate"
                  format="yyyy-MM-dd"
                  type="date"
                  placeholder="Select date"
                  @on-change="changeStartDate"
                  style="width: 133px;margin-left:4px"
                ></DatePicker>
                <span style="margin:0 10px 0 10px">至</span>
                <DatePicker
                  v-model="formValidate.endDate"
                  format="yyyy-MM-dd"
                  type="date"
                  @on-change="changeEndDate"
                  placeholder="Select date"
                  style="width: 133px"
                ></DatePicker>
              </FormItem>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="杂交信息" prop="breedType">
          <CheckboxGroup v-model="formValidate.breedType" @on-change="checkAllGroupChange1">
            <Checkbox
              style="width:130px;margin-left:4px"
              :value="checkAll1"
              @click.prevent.native="handleCheckAll1"
            >全选</Checkbox>
            <Checkbox style="width:130px;" :label="1">纯种</Checkbox>
            <Checkbox style="width:130px;" :label="2">杂交</Checkbox>
            <Checkbox style="width:130px;" :label="4">其他</Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem label="性别" prop="animalSex">
          <CheckboxGroup v-model="formValidate.animalSex" @on-change="checkAllGroupChange2">
            <Checkbox
              style="width:130px;margin-left:4px"
              :value="checkAll2"
              @click.prevent.native="handleCheckAll2"
            >全选</Checkbox>
            <Checkbox style="width:130px;" :label="1">公猪</Checkbox>
            <Checkbox style="width:130px;" :label="2">阉公猪</Checkbox>
            <Checkbox style="width:130px;" :label="3">母猪</Checkbox>
            <Checkbox style="width:130px;" :label="4">其他</Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem v-for="(item,index) in typeList" :key="index" :label="item.indexTypeName">
          <div :id="'more'+index" style="overflow:hidden;height:70px;display:flex;flex-wrap:wrap;">
            <div style="margin-left:4px">
              <Checkbox
                style="width:130px;"
                label="-1"
                v-model="item.all"
                @on-change="changeIndexId(item)"
              >全选</Checkbox>
            </div>
            <div v-for="(item1,index1) in item.indexLists" :key="index1">
              <Poptip trigger="hover" placement="bottom">
                <template slot="content">
                  <div
                    style="width:380px;display:flex;flex-wrap:wrap;justify-content:space-between"
                  >
                    <Checkbox
                      v-for="(item2,index2) in item1.indexLists"
                      :key="index2"
                      :label="item2.indexId"
                      v-model="item2.checked"
                      @on-change="getIndexId2(item,item1,item1.indexTypeId,item2.indexId)"
                      style="width:130px"
                    >{{item2.indexName}}</Checkbox>
                  </div>
                </template>
                <Checkbox
                  v-if="item1.indexTypeName"
                  v-model="item1.checked"
                  @on-change="getIndexId1(item,item1.indexTypeId)"
                  style="width:130px"
                >
                  {{item1.indexTypeName}}
                  <span style="font-size:10px;color:#2db7f5">(更多)</span>
                </Checkbox>
              </Poptip>
              <Checkbox
                v-if="!item1.indexTypeName"
                :label="item1.indexId"
                v-model="item1.checked"
                @on-change="getIndexId(item,item1.indexId)"
                style="width:130px"
              >{{item1.indexName}}</Checkbox>
            </div>
          </div>
          <a
            v-if="item.indexLists.length>=14"
            style="color:blue;margin-left:4px;"
            :id="'getAttr'+index"
            @click="getMore(index)"
          >查看更多选项</a>
        </FormItem>
      </Form>
    </div>

    <div style="background:#f5f7f9;width:1240px;height:20px;margin-right:120px"></div>
    <br />
    <div>
      <div>
        <div style="display:inline-block">
          <h1 style="font-size:18px">搜索结果</h1>
          <span style="color:#07175D">本次搜索共为您找到{{allData}}条数据,</span>
          <span style="color:#07175D">其中{{total}}条展示如下，</span>
          <span style="color:#07175D">
            另有
            <a @click="getPermission(notOpen)" style="color:blue">{{notOpenData}}条数据</a>须获得数据上传者同意方可查看
          </span>
        </div>
        <div style="display:inline-block;float:right">
          <Button
            type="warning"
            style="margin-right:10px;width:97px;height:40px;"
            @click="gotoCompare"
          >数据比较</Button>
          <Button type="info" style="width:97px;height:40px;" @click="downloadMore">批量下载</Button>
        </div>
      </div>
      <br />
      <div v-if="userType==1" style="overflow-x:scroll">
        <Table
          border
          ref="selection"
          :columns="columns1"
          :data="data1"
          :loading="loading"
          @on-select-all="selectAll"
          @on-select="select"
          @on-select-cancel="selectCancel"
          @on-select-all-cancel="selectAllCancel"
        >
          <template slot-scope="{ row, index }" slot="download">
            <a
              size="small"
              @click="download(row.literatureId)"
              style="margin-top:2px;width:60px;font-size:12px;color:rgba(19,112,218,1);"
            >下载</a>
          </template>
        </Table>
      </div>
      <div v-if="userType==2" style="overflow-x:scroll">
        <Table
          border
          ref="selection"
          :columns="columns2"
          :data="data1"
          :loading="loading"
          @on-select-all="selectAll"
          @on-select="select"
          @on-select-cancel="selectCancel"
          @on-select-all-cancel="selectAllCancel"
        ></Table>
      </div>
      <br />
      <Row>
        <Col span="24" style="text-align:right;">
          <Page
            :total="total"
            :current="formValidate.page"
            :page-size="formValidate.pageSize"
            show-total
            show-sizer
            show-elevator
            @on-change="changePage"
            @on-page-size-change="changePageSize"
          ></Page>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
export default {
  inject: ["reload"],
  name: "filloutDataSearch",
  data() {
    return {
      userType: 2,
      modal: false,
      loading: false,
      formValidate: {
        keyword: "",
        breedType: [],
        animalSex: [],
        startDate: "",
        endDate: "",
        indexIdList: [],
        date: "",
        page: 1,
        pageSize: 10
      },
      checkAll1: false,
      checkAll2: false,
      typeList: [],
      notOpen: [],
      allData: 0,
      notOpenData: 0,
      columns1: [
        {
          type: "selection",
          width: 30,
          align: "center"
        },
        {
          title: "序号",
          align: "center",
          width: 50,
          render: (h, params) => {
            return h(
              "span",
              params.index +
                (this.formValidate.page - 1) * this.formValidate.pageSize +
                1
            );
          }
        },
        {
          title: "上传者",
          align: "center",
          key: "name",
          ellipsis: true,
          width: 66
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
          key: "pigBreed",
          ellipsis: true,
          width: 66
        },
        {
          title: "纯/杂种",
          align: "center",
          key: "typeName",
          ellipsis: true,
          width: 66
        },
        {
          title: "性别",
          align: "center",
          key: "sexName",
          ellipsis: true,
          width: 50
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
          title: "饲养信息",
          align: "center",
          width: 80,
          ellipsis: true,
          key: "feedInformation"
        },
        {
          title: "屠宰方式",
          align: "center",
          width: 80,
          ellipsis: true,
          key: "butcherWay"
        },
        {
          title: "冷却方式",
          align: "center",
          ellipsis: true,
          width: 66,
          key: "coolWay"
        },
        {
          title: "贮藏时间",
          align: "center",
          ellipsis: true,
          width: 66,
          key: "storeCondition"
        },
        {
          title: "运输条件",
          align: "center",
          width: 66,
          ellipsis: true,
          key: "transportationCondition"
        },
        {
          title: "操作",
          align: "center",
          ellipsis: true,
          width: 50,
          slot: "download"
        }
      ],
      columns2: [
        {
          type: "selection",
          width: 33,
          align: "center"
        },
        {
          title: "序号",
          align: "center",
          width: 54,
          render: (h, params) => {
            return h(
              "span",
              params.index +
                (this.formValidate.page - 1) * this.formValidate.pageSize +
                1
            );
          }
        },
        {
          title: "上传者",
          align: "center",
          key: "name",
          ellipsis: true,
          width: 69
        },
        {
          title: "参考文献",
          align: "center",
          width: 166,
          ellipsis: true,
          key: "referLiterature"
        },
        {
          title: "猪种",
          align: "center",
          key: "pigBreed",
          ellipsis: true,
          width: 69
        },
        {
          title: "纯/杂种",
          align: "center",
          key: "typeName",
          ellipsis: true,
          width: 69
        },
        {
          title: "性别",
          align: "center",
          key: "sexName",
          ellipsis: true,
          width: 53
        },
        {
          title: "饲养周期",
          align: "center",
          width: 83,
          ellipsis: true,
          key: "feedPeriod"
        },
        {
          title: "取样位置",
          align: "center",
          width: 83,
          ellipsis: true,
          key: "sampPoint"
        },
        {
          title: "产地",
          align: "center",
          width: 83,
          ellipsis: true,
          key: "place"
        },
        {
          title: "饲养信息",
          align: "center",
          width: 83,
          ellipsis: true,
          key: "feedInformation"
        },
        {
          title: "屠宰方式",
          align: "center",
          width: 83,
          ellipsis: true,
          key: "butcherWay"
        },
        {
          title: "冷却方式",
          align: "center",
          ellipsis: true,
          width: 70,
          key: "coolWay"
        },
        {
          title: "贮藏时间",
          align: "center",
          ellipsis: true,
          width: 70,
          key: "storeCondition"
        },
        {
          title: "运输条件",
          align: "center",
          width: 70,
          ellipsis: true,
          key: "transportationCondition"
        }
      ],
      data1: [],
      data2: [],
      total: 0,
      downloadList: [],
      index: 0,
      compareList: []
    };
  },
  methods: {
    changePage(page) {
      this.formValidate.page = page;
      this.getData();
    },
    changePageSize(pageSize) {
      this.formValidate.pageSize = pageSize;
      this.getData();
    },
    //查看更多
    getMore(index) {
      let getAttr = document.getElementById("getAttr" + index);
      let more = document.getElementById("more" + index);
      if (more.style.overflow == "hidden") {
        more.style.overflow = "visible";
        more.style.height = "auto";
        getAttr.innerText = "收起";
      } else {
        more.style.overflow = "hidden";
        more.style.height = "70px";
        getAttr.innerText = "查看更多选项";
      }
    },
    //获取所有数据
    getData() {
      this.loading = true;
      let form = new FormData();
      form.append("page", this.formValidate.page);
      form.append("pageSize", this.formValidate.pageSize);
      this.typeList.forEach(item => {
        item.indexIdList.forEach(item1 => {
          this.formValidate.indexIdList.push(item1);
        });
      });
      console.log(this.formValidate.indexIdList);
      form.append("indexIdList", this.formValidate.indexIdList.join(","));
      //form.append("animalSex", this.formValidate.animalSex.join(","));
      if (this.formValidate.breedType.length == 3) {
        form.append("breedType", "");
      } else {
        form.append("breedType", this.formValidate.breedType.join(","));
      }
      if (this.formValidate.animalSex.length == 4) {
        form.append("animalSex", "");
      } else {
        form.append("animalSex", this.formValidate.animalSex.join(","));
      }
      // if (this.formValidate.breedType.length == 1) {
      //   form.append("breedType", this.formValidate.breedType[0]);
      // }
      this.formValidate.keyword
        ? form.append("keyword", this.formValidate.keyword)
        : "";
      if (this.formValidate.startDate) {
        form.append("startTime", this.formValidate.startDate.valueOf());
      }
      if (this.formValidate.endDate) {
        form.append("endTime", this.formValidate.endDate.valueOf());
      }
      this.$axios
        .post("/api/literature/getLiteratureByFillPage", form)
        .then(res => {
          this.formValidate.indexIdList = [];
          this.data1 =
            res.data.data == null ? [] : res.data.data.literatureData.list;
          this.total =
            res.data.data == null ? 0 : res.data.data.literatureData.total;
          this.notOpen = res.data.data.notOpen;
          this.notOpenData = res.data.data.notOpen.length;
          this.allData = this.total + this.notOpenData;
          this.loading = false;
        });
    },
    //杂交信息
    handleCheckAll1() {
      this.checkAll1 = !this.checkAll1;
      if (this.checkAll1) {
        this.formValidate.breedType = [1, 2, 4];
      } else {
        this.formValidate.breedType = [];
      }
      //this.getData();
    },
    checkAllGroupChange1(data1) {
      console.log(data1);
      if (data1.length === 2) {
        this.checkAll1 = true;
      } else {
        this.checkAll1 = false;
      }
      //this.getData();
    },
    //性别
    handleCheckAll2() {
      this.checkAll2 = !this.checkAll2;
      if (this.checkAll2) {
        this.formValidate.animalSex = [1, 2, 3, 4];
      } else {
        this.formValidate.animalSex = [];
      }
      //this.getData();
    },
    checkAllGroupChange2(data2) {
      console.log(data2);
      if (data2.length === 3) {
        this.checkAll2 = true;
      } else {
        this.checkAll2 = false;
      }
      //this.getData();
    },
    //获取权限列表
    getPermission(notOpen) {
      this.modal = true;
      let form = new FormData();
      form.append("literatureIdList", this.notOpen);
      this.$axios
        .post("/api/literature/getLiteratureByPower", form)
        .then(res => {
          this.data2 = res.data.data;
          console.log(this.data2);
        });
    },
    //获取种类
    getType() {
      this.$axios
        .post("/api/literature/getIndexTypeAndIndexList", {})
        .then(res => {
          let list = {};
          let k = 1;
          res.data.data.forEach(item => {
            if (item.indexLists !== null) {
              if (item.indexTypeName == "其他指标") {
                list = item;
                k = 2;
              } else {
                this.typeList.push(item);
              }
            }
          });
          if (k == 2) {
            this.typeList.push(list);
          }
          console.log(this.typeList);
          this.typeList.forEach(item => {
            item.all = false;
            item.indexIdList = [];
            item.indexLists.forEach(item1 => {
              item1.checked = false;
            });
          });
          let indexList = [];
          this.typeList.forEach(item => {
            if (item.parentName == null) {
              indexList.push(item);
            }
            if (item.parentName != null) {
              item.checked = false;
            }
          });
          indexList.forEach(item => {
            this.typeList.forEach(item1 => {
              if (item1.parentName == item.indexTypeName) {
                item.indexLists.push(item1);
              }
            });
          });
          console.log("indexList", indexList);
          this.typeList = JSON.parse(JSON.stringify(indexList));
          console.log("typeList", this.typeList);
        });
    },
    //全选方法
    changeIndexId(item1) {
      let list = this.typeList;
      list.forEach((item, index) => {
        if (item1.indexTypeId == item.indexTypeId) {
          if (item.all) {
            item.indexLists.forEach(item2 => {
              item2.checked = true;
              if (!item2.indexTypeName) {
                item.indexIdList.push(item2.indexId);
              } else {
                item2.indexLists.forEach(item3 => {
                  item.indexIdList.push(item3.indexId);
                  item3.checked = true;
                });
              }
            });
            item.all = true;
            console.log("arr", list);
          } else {
            item.indexIdList.splice(0, item.indexIdList.length);
            item.indexLists.forEach(item2 => {
              item2.checked = false;
              if (item2.indexTypeName) {
                item2.indexLists.forEach(item3 => {
                  item3.checked = false;
                });
              }
            });
            item.all = false;
          }
          this.typeList = list;
          console.log("typeList", this.typeList);
          //this.getData();
        }
      });
    },
    //一级目录单选框
    getIndexId(item1, indexId) {
      let list = this.typeList;
      console.log(indexId);
      list.forEach((item, index) => {
        if (item1.indexTypeId == item.indexTypeId) {
          item1.indexLists.forEach((item2, index2) => {
            if (indexId == item2.indexId) {
              if (item2.checked) {
                item.indexIdList.push(indexId);
              } else {
                item.indexIdList.splice(
                  item.indexIdList.findIndex(item3 => item3 === indexId),
                  1
                );
              }
            }
          });
          console.log(item1.indexLists);
          if (item.indexIdList.length != item.indexLists.length) {
            item.all = false;
          } else {
            item.all = true;
          }
        }
      });
      this.typeList = list;
      console.log("this.typeList", this.typeList);
      //this.getData();
    },
    //二级目录全选框
    getIndexId1(item1, indexTypeId) {
      let list = this.typeList;
      console.log(indexTypeId);
      list.forEach((item, index) => {
        if (item1.indexTypeId == item.indexTypeId) {
          item1.indexLists.forEach((item2, index2) => {
            if (indexTypeId == item2.indexTypeId) {
              if (item2.checked) {
                item2.indexLists.forEach(item3 => {
                  item.indexIdList.push(item3.indexId);
                  item3.checked = true;
                });
              } else {
                // item.indexIdList.splice(
                //   item.indexIdList.findIndex(item3 => item3 === indexId),
                //   1
                // );
                item2.indexLists.forEach(item3 => {
                  item.indexIdList.splice(
                    item.indexIdList.findIndex(item4 => item4 == item3.indexId),
                    1
                  );
                  item3.checked = false;
                });
              }
            }
          });
          console.log(item1.indexLists);
          if (item.indexIdList.length != item.indexLists.length) {
            item.all = false;
          } else {
            item.all = true;
          }
        }
      });
      this.typeList = list;
      console.log("this.typeList", this.typeList);
      //this.getData();
    },
    //二级目录单选框
    getIndexId2(item1, item2, indexTypeId, indexId) {
      let list = this.typeList;
      console.log(indexId);
      console.log(item2.checked);
      list.forEach((item, index) => {
        if (item1.indexTypeId == item.indexTypeId) {
          item1.indexLists.forEach((item3, index3) => {
            if (item3.indexTypeId == indexTypeId) {
              item3.indexLists.forEach(item4 => {
                if (indexId == item4.indexId) {
                  if (item4.checked) {
                    item.indexIdList.push(indexId);
                  } else {
                    item.indexIdList.splice(
                      item.indexIdList.findIndex(item5 => item5 === indexId),
                      1
                    );
                  }
                }
              });
            }
          });
        }
      });
      this.typeList = list;
      console.log("this.typeList", this.typeList);
    },
    changeStartDate() {
      //this.getData();
    },
    changeEndDate() {
      //this.getData();
    },
    select(e) {
      console.log(e);
      this.downloadList = [];
      this.compareList = [];
      e.forEach(item => {
        this.downloadList.push(item.literatureId);
        this.compareList.push(item.literatureId);
      });
    },
    selectAll(e) {
      console.log(e);
      this.downloadList = [];
      this.compareList = [];
      e.forEach(item => {
        this.downloadList.push(item.literatureId);
        this.compareList.push(item.literatureId);
      });
    },
    selectCancel(e) {
      console.log(e);
      this.downloadList = [];
      this.compareList = [];
      if (e) {
        e.forEach(item => {
          this.downloadList.push(item.literatureId);
          this.compareList.push(item.literatureId);
        });
      } else {
        this.downloadList = e;
      }
    },
    selectAllCancel(e) {
      this.downloadList = [];
      this.compareList = [];
      console.log(e);
      this.downloadList = e;
    },
    download(literatureId) {
      window.location.href =
        "/api/literatureExcel/exportUserExcel?literatureId=" + literatureId;
      this.getDownload(literatureId);
    },
    downloadMore() {
      console.log(this.downloadList);
      if (this.downloadList.length != 0) {
        if (this.index < this.downloadList.length) {
          window.location.href =
            "/api/literatureExcel/exportUserExcel?literatureId=" +
            this.downloadList[this.index];
          this.getDownload(this.downloadList[this.index]);
          setTimeout(() => {
            this.index = this.index + 1;
            this.downloadMore();
          }, 1000);
        } else {
          this.index = 0;
          this.$Message.success("下载完成！");
        }
      } else {
        this.$Message.info("您还没有选择要下载的数据");
      }
    },
    getDownload(literatureId) {
      this.$axios
        .get(
          "/api/literatureExcel/exportUserExcel?literatureId=" + literatureId
        )
        .then(res => {
          console.log(res);
        });
    },
    //发送请求
    apply(literatureId, index) {
      console.log(literatureId);
      let modal = document.getElementById("apply" + index);
      let form = new FormData();
      form.append("literatureId", literatureId);
      this.$axios
        .post("/api/literature/saveLiteratureByPower", form)
        .then(res => {
          console.log(res);
          if (res.data.code == 100) {
            modal.style.color = "rgba(153,153,153,1)";
            modal.style.pointerEvents = "none";
            modal.innerHTML = "✓ 已发送";
          } else {
            this.$Message.error("发送失败！请稍后重试");
          }
        });
    },
    //数据比较
    gotoCompare() {
      if (this.compareList.length != 0) {
        if (this.compareList.length < 10) {
          this.$router.push({
            path: "/dataCompare",
            query: { literatureIdList: this.compareList }
          });
        } else {
          this.$Message.info("最多能比较9条");
        }
      } else {
        this.$Message.info("请选择要比较的数据");
      }
    }
  },
  mounted() {
    this.userType = localStorage.getItem("userType");
    this.getType();
    this.getData();
  }
};
</script>
<style>
#fillout {
  background: #ffffff;
  padding: 24px;
}
#fillout .ivu-table-cell {
  padding: 0;
}
#fillout .ivu-table-wrapper {
  width: 1140px;
}
#fillout .rightControl .ivu-table-header .ivu-table-cell {
  color: rgba(153, 153, 153, 1);
  font-size: 14px;
}
#fillout .rightControl .ivu-table-body .ivu-table-cell span {
  color: rgba(51, 51, 51, 1);
  font-size: 16px;
}
#fillout .ivu-table-overflowX {
  overflow-x: hidden;
}
.ivu-modal-body {
  padding: 0 !important;
}
</style>