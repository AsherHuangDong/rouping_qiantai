<template>
  <div id="Group" class="GroupData" style="padding:24px;background:#ffffff">
    <!-- 修改小组名称 -->
    <Modal v-model="modal" :closable="false" width="482" footer-hide>
      <div
        style="display:flex;justify-content:center;align-items:center;width:100%;height:67px;background:#8A2E31;border-radius:4px 4px 0px 0px;"
      >
        <span style="font-size:20px;font-weight:400;color:rgba(255,255,255,1);">修改小组名称</span>
      </div>
      <div style="margin-top:25px;padding:0 36px 0 36px;display:flex;flex-direction:column;">
        <span
          style="font-size:16px;
              font-family:Source Han Sans CN;
              font-weight:400;
              color:rgba(51,51,51,1);"
        >小组名称</span>
        <Input placeholder="请输入小组名称" style="width:400px" v-model="groupName"></Input>
      </div>
      <div style="text-align:center;margin-top:32px;">
        <Button
          style="width:90px;height:42px;margin-right:40px;margin-bottom:18px;background:rgba(138,46,49,1);
          border-radius:6px;"
          @click="ok"
        >
          <span
            style="font-size:18px;
        font-family:Source Han Sans CN;
        font-weight:400;
        color:rgba(255,255,255,1);"
          >确认</span>
        </Button>
        <Button
          style="width:90px;height:42px;margin-bottom:18px;border:1px solid rgba(138,46,49,1);
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
      </div>
    </Modal>
    <!-- 修改小组说明 -->
    <Modal v-model="modal1" :closable="false" width="482" footer-hide>
      <div
        style="display:flex;justify-content:center;align-items:center;width:100%;height:67px;background:#8A2E31;border-radius:4px 4px 0px 0px;"
      >
        <span style="font-size:20px;font-weight:400;color:rgba(255,255,255,1);">修改小组说明</span>
      </div>

      <div style="margin-top:25px;padding:0 36px 0 36px;display:flex;flex-direction:column;">
        <span
          style="font-size:16px;
              font-family:Source Han Sans CN;
              font-weight:400;
              color:rgba(51,51,51,1);"
        >小组说明</span>
        <Input
          placeholder="请输入小组说明"
          type="textarea"
          :rows="4"
          style="width:400px;margin-top:10px"
          v-model="introduce"
        ></Input>
      </div>
      <div style="text-align:center;margin-top:32px;">
        <Button
          style="width:90px;height:42px;margin-right:40px;margin-bottom:18px;background:rgba(138,46,49,1);
          border-radius:6px;"
          @click="ok1"
        >
          <span
            style="font-size:18px;
        font-family:Source Han Sans CN;
        font-weight:400;
        color:rgba(255,255,255,1);"
          >确认</span>
        </Button>
        <Button
          style="width:90px;height:42px;margin-bottom:18px;border:1px solid rgba(138,46,49,1);
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
    <!-- 邀请新成员 -->
    <Modal v-model="modal2" :closable="false" width="482" footer-hide>
      <div
        style="display:flex;justify-content:center;align-items:center;width:100%;height:67px;background:#8A2E31;border-radius:4px 4px 0px 0px;"
      >
        <span style="font-size:20px;font-weight:400;color:rgba(255,255,255,1);">邀请新成员</span>
      </div>

      <div
        style="margin-top:30px;padding:0 42px 0 55px;display:flex;justify-content:space-between;align-items:center"
      >
        <span
          style="font-size:16px;
              font-family:Source Han Sans CN;
              font-weight:400;
              color:rgba(51,51,51,1);"
        >姓名</span>
        <Select
          v-model="model14"
          filterable
          remote
          placeholder="请输入成员姓名"
          :remote-method="remoteMethod2"
          :loading="loading2"
          style="width:310px"
        >
          <Option
            v-for="(item, index) in list"
            :value="item.userId+'+'+item.name"
            :key="index"
          >{{item.name}}</Option>
        </Select>
      </div>
      <div style="text-align:center;margin-top:32px;">
        <Button
          style="width:90px;height:42px;margin-right:40px;margin-bottom:18px;background:rgba(138,46,49,1);
          border-radius:6px;"
          @click="ok2"
        >
          <span
            style="font-size:18px;
        font-family:Source Han Sans CN;
        font-weight:400;
        color:rgba(255,255,255,1);"
          >确认</span>
        </Button>
        <Button
          style="width:90px;height:42px;margin-bottom:18px;border:1px solid rgba(138,46,49,1);
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
    <!-- 解散或退出小组 -->
    <Modal v-model="modal3" width="388" :closable="false" footer-hide>
      <div
        style="display:flex;justify-content:center;align-items:center;width:100%;height:67px;background:#8A2E31;border-radius:4px 4px 0px 0px;"
      >
        <span
          v-if="type==1"
          style="font-size:20px;font-weight:400;color:rgba(255,255,255,1);"
        >是否解散该小组？</span>
        <span
          v-if="type==2"
          style="font-size:20px;font-weight:400;color:rgba(255,255,255,1);"
        >是否退出该小组？</span>
      </div>

      <div style="display:flex;justify-content:center;align-items:center;margin-top:26px">
        <span
          v-if="type==1"
          style="font-size:16px;
        font-family:Source Han Sans CN;
        font-weight:400;
        color:rgba(51,51,51,1);"
        >解散小组不会删除数据，但不再共享成员数据</span>
        <span
          v-if="type==2"
          style="font-size:16px;
        font-family:Source Han Sans CN;
        font-weight:400;
        color:rgba(51,51,51,1);"
        >退出小组后无法共享成员数据</span>
      </div>

      <div style="text-align:center;margin-top:32px;">
        <Button
          style="width:90px;height:42px;margin-right:40px;margin-bottom:28px;background:#8A2E31"
          @click="ok3"
        >
          <span style="font-size:18px;color:rgba(255,255,255,1);" v-if="type == 1">解散</span>
          <span style="font-size:18px;color:rgba(255,255,255,1);" v-if="type == 2">退出</span>
        </Button>
        <Button
          style="width:90px;height:42px;margin-bottom:28px;border:1px solid rgba(138,46,49,1);
          border-radius:6px;"
          @click="cancel3"
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
    <!-- 编辑公开信息 -->
    <Modal v-model="modal4" width="681" :closable="false" footer-hide>
      <div
        style="display:flex;justify-content:center;align-items:center;width:100%;height:67px;background:#8A2E31;border-radius:4px 4px 0px 0px;"
      >
        <span style="font-size:20px;font-weight:400;color:rgba(255,255,255,1);">编辑公开信息</span>
      </div>
      <div
        style="display:flex;justify-content:flex-start;align-items:flex-start;margin-top:26px;margin-bottom:21px;padding-left:48px"
      >
        <div style="display:flex;flex-direction:column">
          <div>
            <RadioGroup v-model="power">
              <Radio :label="1">
                <span>公开</span>
              </Radio>
              <Radio :label="2">
                <span>不公开</span>
              </Radio>
              <Radio :label="3" :disabled="list1.length==0?true:false">
                <span>对小组公开</span>
              </Radio>
            </RadioGroup>
          </div>
          <div v-if="power==3" class="arrow_box2">
            <div class="content">
              <CheckboxGroup
                v-model="groupIdList"
                @on-change="checkAllGroupChange"
                style=" display:flex;flex-wrap:wrap"
              >
                <Checkbox :value="checkAll" @click.prevent.native="handleCheckAll">全选</Checkbox>
                <Checkbox
                  v-for="(item,index) in list1"
                  :key="index"
                  :label="item.id"
                >{{item.groupName}}</Checkbox>
              </CheckboxGroup>
            </div>
          </div>
        </div>
      </div>
      <div style="text-align:center;margin-top:100px;">
        <Button
          style="width:110px;margin-right:40px;height:42px;border-radius:6px;border:1px solid #8A2E31;margin-bottom:49px;"
          @click="cancel4"
        >
          <span style="color:#8A2E31;font-size:18px;">取消</span>
        </Button>
        <Button
          style="width:110px;height:42px;border-radius:6px;background:#8A2E31;margin-bottom:49px;"
          @click="ok4"
        >
          <span style="font-size:18px;font-weight:400;color:rgba(255,255,255,1);">确定</span>
        </Button>
      </div>
    </Modal>
    <!-- 删除文献 -->
    <Modal v-model="modal5" width="388" :closable="false" footer-hide>
      <div
        style="display:flex;justify-content:center;align-items:center;width:100%;height:67px;background:#8A2E31;border-radius:4px 4px 0px 0px;"
      >
        <span style="font-size:20px;font-weight:400;color:rgba(255,255,255,1);">是否删除该条数据？</span>
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
          @click="cancel5"
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
          @click="ok5"
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

    <!-- 上传文件 -->
    <Modal v-model="modal6" width="700" :closable="false" footer-hide>
      <div
        style="display:flex;justify-content:center;align-items:center;width:100%;height:67px;background:#8A2E31;border-radius:4px 4px 0px 0px;"
      >
        <span style="font-size:20px;font-weight:400;color:rgba(255,255,255,1);">上传文件</span>
      </div>

      <div>
        <el-upload
          class="upload-demo"
          drag
          action
          :before-upload="handleUpload"
          accept=".xls, .xlsx"
        >
          <div style="display:flex;flex-direction:column;align-items:center;margin-top:20px">
            <div class="el-upload__text">
              <em
                style="font-size:18px;
            font-family:Source Han Sans CN;
            font-weight:400;
            color:rgba(19,112,218,1);"
              >+选择/拖拽上传文件</em>
            </div>
            <div>
              <span
                style="font-size:12px;
            font-family:Source Han Sans CN;
            font-weight:400;
            color:rgba(153,153,153,1);"
              >
                支持xls和xlsx文件格式，数据格式参照
                <a
                  @click.stop="gotoModal"
                  style="font-size:12px;
            font-family:Source Han Sans CN;
            font-weight:400;
            color:#1370DA;"
                >肉品品质安全数据库上传模板</a>
              </span>
            </div>
          </div>
        </el-upload>

        <div v-if="fileList.lenght!=0">
          <div
            v-for="(item,index) in fileList"
            :key="index"
            style="display:flex;justify-content:flex-start;align-items:center"
          >
            <img src="static/img/file.png" style="width:14px;height:14px" />
            <span
              style="font-size:14px;
              font-family:Source Han Sans CN;
              font-weight:400;
              color:rgba(51,51,51,1);
              margin-left:8px;margin-right:27px"
            >{{item.name}}</span>
            <a
              style="font-size:14px;
              font-family:Source Han Sans CN;
              font-weight:400;
              color:rgba(19,112,218,1);"
              @click="Delete1(index)"
            >删除</a>
          </div>
        </div>
      </div>
      <div style="text-align:center;margin-top:32px;">
        <Button
          style="width:90px;margin-right:40px;margin-bottom:28px;border:1px solid rgba(138,46,49,1);
        border-radius:6px;"
          @click="cancel6"
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
          @click="ok6"
        >
          <span
            style="font-size:18px;
            font-family:Source Han Sans CN;
            font-weight:400;
            color:rgba(255,255,255,1);"
          >保存</span>
        </Button>
      </div>
    </Modal>
    <!-- 指示名称错误预警 -->
    <Modal v-model="showResult" width="440" draggable :closable="false" footer-hide>
      <div
        style="display:flex;justify-content:center;align-items:center;width:100%;height:67px;background:#8A2E31;border-radius:4px 4px 0px 0px;"
      >
        <span style="font-size:20px;font-weight:400;color:rgba(255,255,255,1);">预警提示</span>
      </div>
      <div
        style="display:flex;justify-content:center;align-items:center;margin-top:26px;margin-bottom:21px"
      >
        <span style="font-size:16px;font-weight:400;color:rgba(51,51,51,1);">系统指标库中不存在下列指标，是否继续上传？</span>
      </div>
      <div style="display:flex;flex-direction:column;padding-left:52px">
        <span
          style="font-size:16px;font-weight:400;color:rgba(102,102,102,1);"
          v-for="(item,index) in list"
          :key="index"
        >{{item}}</span>
      </div>
      <div style="text-align:center;margin-bottom:36px;margin-top:49px">
        <Button
          style="width:110px;margin-right:40px;height:42px;border-radius:6px;border:1px solid #8A2E31;"
          @click="cancel3"
        >
          <span style="color:#8A2E31;font-size:18px;">取消上传</span>
        </Button>
        <Button
          style="width:110px;height:42px;border-radius:6px;background:#8A2E31;"
          @click="saveUpload"
        >
          <span style="font-size:18px;font-weight:400;color:rgba(255,255,255,1);">继续上传</span>
        </Button>
      </div>
    </Modal>
    <!-- 指示数值错误预警 -->
    <Modal v-model="showResult1" width="440" draggable :closable="false" footer-hide>
      <div
        style="display:flex;justify-content:center;align-items:center;width:100%;height:67px;background:#8A2E31;border-radius:4px 4px 0px 0px;"
      >
        <span style="font-size:20px;font-weight:400;color:rgba(255,255,255,1);">预警提示</span>
      </div>
      <div
        style="display:flex;justify-content:center;align-items:center;margin-top:26px;margin-bottom:21px"
      >
        <span style="font-size:16px;font-weight:400;color:rgba(51,51,51,1);">下列指标数据可能有误，是否继续上传？</span>
      </div>
      <div style="display:flex;flex-direction:column;padding-left:52px">
        <span
          style="font-size:16px;font-weight:400;color:rgba(102,102,102,1);"
          v-for="(item,index) in list"
          :key="index"
        >{{item}}</span>
      </div>
      <div style="text-align:center;margin-bottom:36px;margin-top:49px">
        <Button
          style="width:110px;margin-right:40px;height:42px;border-radius:6px;border:1px solid #8A2E31;"
          @click="cancel4"
        >
          <span style="color:#8A2E31;font-size:18px;">取消上传</span>
        </Button>
        <Button
          style="width:110px;height:42px;border-radius:6px;background:#8A2E31;"
          @click="saveUpload1"
        >
          <span style="font-size:18px;font-weight:400;color:rgba(255,255,255,1);">继续上传</span>
        </Button>
      </div>
    </Modal>
    <div class="groupContent">
      <div class="group">
        <div style="display:flex;flex-direction:column;align-items:flex-start;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span
              style="font-size:18px;
            font-family:Source Han Sans CN;
            font-weight:400;
            color:rgba(51,51,51,1);
            margin-right:28px"
            >小组名称:</span>
            <span
              style="font-size:16px;
            font-family:Source Han Sans CN;
            font-weight:400;
            color:rgba(102,102,102,1);
            margin-right:10px"
            >{{group.noticeGroup.groupName}}</span>
            <a
              v-if="type==1"
              @click="rename"
              style="font-size:12px;
            font-family:Source Han Sans CN;
            font-weight:400;
            color:rgba(19,112,218,1);"
            >修改</a>
          </div>
          <div style>
            <span
              style="font-size:18px;
            font-family:Source Han Sans CN;
            font-weight:400;
            color:rgba(51,51,51,1);
            margin-right:28px"
            >小组说明:</span>
            <span
              style="font-size:16px;
            font-family:Source Han Sans CN;
            font-weight:400;
            color:rgba(102,102,102,1);
            margin-right:10px"
            >{{group.noticeGroup.groupIntroduction}}</span>
            <a
              v-if="type==1"
              @click="renameContent"
              style="font-size:12px;
            font-family:Source Han Sans CN;
            font-weight:400;
            color:rgba(19,112,218,1);"
            >修改</a>
          </div>
        </div>
        <div>
          <span
            style="font-size:18px;
          font-family:Source Han Sans CN;
          font-weight:400;
          color:rgba(51,51,51,1);
          margin-right:28px"
          >小组成员:</span>
          <span
            style="font-size:16px;
          font-family:Source Han Sans CN;
          font-weight:400;
          color:rgba(102,102,102,1);
          margin-right:10px"
          >{{group.noticeGroup.name}}</span>

          <span
            v-for="(item,index) in group.name"
            :key="index"
            style="font-size:16px;
              font-family:Source Han Sans CN;
              font-weight:400;
              color:rgba(102,102,102,1);
              margin-right:10px"
          >{{item}}</span>

          <a
            v-if="type==1"
            @click="addMember"
            style="font-size:12px;
          font-family:Source Han Sans CN;
          font-weight:400;
          color:rgba(19,112,218,1);"
          >+邀请新成员</a>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center">
        <Button
          @click="gotoUpload"
          type="info"
          style="width:97px;
        height:40px;
        background:rgba(44,174,255,1);
        border-radius:4px;"
        >+上传数据</Button>
        <Button
          style="width:97px;
        height:40px;
        background:rgba(247,248,250,1);
        border-radius:4px;margin-top:12px"
          @click="remove"
        >
          <span
            v-if="type == 1"
            style="font-size:16px;
          font-family:Source Han Sans CN;
          font-weight:400;
          color:rgba(102,102,102,1);"
          >解散小组</span>
          <span
            v-if="type == 2"
            style="font-size:16px;
          font-family:Source Han Sans CN;
          font-weight:400;
          color:rgba(102,102,102,1);"
          >退出小组</span>
        </Button>
      </div>
    </div>
    <br />
    <Tabs type="card">
      <TabPane label="数据检索">
        <div>
          <!-- 搜素条件 -->
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
                <div
                  :id="'more'+index"
                  style="overflow:hidden;height:70px;display:flex;flex-wrap:wrap;"
                >
                  <div style="margin-left:4px">
                    <Checkbox
                      style="width:130px;"
                      label="-1"
                      v-model="item.all"
                      @on-change="changeIndexId(item)"
                    >全选</Checkbox>
                  </div>
                  <div v-for="(item1,index1) in item.indexLists" :key="index1">
                    <Poptip trigger="hover" placement="bottom-start" transfer>
                      <template slot="content">
                        <div
                          style="width:380px;display:flex;flex-wrap:wrap;justify-content:space-between;padding:10px;"
                        >
                          <Checkbox
                            v-for="(item2,index2) in item1.indexLists"
                            :key="index2"
                            :label="item2.indexId"
                            v-model="item2.checked"
                            @on-change="getIndexId2(item,item1,item1.indexTypeId,item2.indexId)"
                            style="width:130px;display:flex;align-items:center;justify-content:flex-start"
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
          <!-- 搜索结果 -->
          <div>
            <div>
              <div style="display:inline-block">
                <h1
                  style="font-size:18px;
                font-family:Source Han Sans CN;
                font-weight:400;
                color:rgba(51,51,51,1);"
                >搜索结果</h1>
                <span
                  style="font-size:12px;
                font-family:Source Han Sans CN;
                font-weight:400;
                color:rgba(42,96,228,1);"
                >本次搜索共为您找到{{total}}条数据</span>
              </div>
              <div style="float:right;margin-top:10px">
                <Button
                  type="primary"
                  @click="downloadMore"
                  style="width:97px;
                height:40px;
                background:rgba(44,174,255,1);
                border-radius:4px;"
                >批量下载</Button>
              </div>
            </div>
            <br />
            <div style="overflow-x:scroll">
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
            <br />
            <Row>
              <Col span="24" style="text-align:right;">
                <Page
                  :total="total"
                  :current="formValidate.page"
                  :page-size="formValidate.pageSize"
                  :loading="loading"
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
      </TabPane>

      <TabPane label="我的小组数据">
        <div
          class="container"
          style="display:flex;justify-content:space-between;align-items:center;height:100px;"
        >
          <div style="display:flex;justify-content:space-between;align-items:center">
            <span
              style="font-size:18px;font-weight:400;color:rgba(51,51,51,1);margin-right:14px"
            >猪种/品牌名称</span>
            <Input v-model="getSearch.keyWords" style="width:300px" />
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center ">
            <span
              style="font-size:18px;font-weight:400;color:rgba(51,51,51,1);margin-right:15px"
            >上传时间</span>
            <DatePicker
              type="date"
              v-model="getSearch.startTime"
              format="yyyy-MM-dd"
              style="width: 133px"
            ></DatePicker>
            <span style="font-size:14px;font-weight:400;color:rgba(0,0,0,1);margin:0 10px 0 10px">至</span>
            <DatePicker
              type="date"
              v-model="getSearch.endTime"
              format="yyyy-MM-dd"
              style="width: 133px"
            ></DatePicker>
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center">
            <Button
              style="width:68px;height:40px;background:rgba(242,155,118,1);border-radius:4px;margin-right:30px"
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
              style="width:97px;height:40px;background:rgba(44,174,255,1);border-radius:4px;"
              @click="downloadAll"
            >
              <span
                style="font-size:16px;
                font-family:Source Han Sans CN;
                font-weight:400;
                color:rgba(250,250,250,1);"
              >全部下载</span>
            </Button>
          </div>
        </div>

        <div style="overflow-x:scroll">
          <Table border ref="selection" :columns="columns2" :data="data2">
            <template slot-scope="{ row, index }" slot="edit">
              <div
                style="padding:0 17px 0 17px;display:flex;justify-content:space-between;align-items:center"
              >
                <Dropdown @on-click="getName" trigger="click" transfer>
                  <a
                    @click="opnow(row)"
                    style="font-size:12px;
                    font-family:Source Han Sans CN;
                    font-weight:400;
                    color:rgba(19,112,218,1);"
                  >更新数据</a>
                  <DropdownMenu slot="list">
                    <DropdownItem name="uploadFile">上传文件</DropdownItem>
                    <DropdownItem name="update">手动更新</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <a
                  v-if="row.resource==2"
                  @click="editInform(row.literatureId,row.power)"
                  style="font-size:12px;
                font-family:Source Han Sans CN;
                font-weight:400;
                color:rgba(19,112,218,1);"
                >编辑公开信息</a>
                <a
                  @click="download(row.literatureId)"
                  style="font-size:12px;
                font-family:Source Han Sans CN;
                font-weight:400;
                color:rgba(19,112,218,1);"
                >下载</a>
                <a
                  @click="Delete(row.literatureId)"
                  style="font-size:12px;
                font-family:Source Han Sans CN;
                font-weight:400;
                color:rgba(19,112,218,1);"
                >删除</a>
              </div>
            </template>
          </Table>
        </div>
        <br />
        <Row>
          <Col span="24" style="text-align:right;">
            <Page
              :total="total2"
              :current="getSearch.page"
              :page-size="getSearch.pageSize"
              :loading="loading1"
              show-total
              show-sizer
              show-elevator
              @on-change="changePage1"
              @on-page-size-change="changePageSize1"
            ></Page>
          </Col>
        </Row>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
export default {
  name: "myGroup",
  data() {
    return {
      power: 1,
      type: 1,
      id: 0,
      literatureId: "",
      list1: [],
      loading: false,
      loading1: false,
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
      checkAll: false,
      checkAll1: false,
      checkAll2: false,
      getSearch: {
        keyWords: "",
        page: 1,
        animalSex: [],
        indexIdList: [],
        pageSize: 10,
        startTime: "",
        endTime: ""
      },
      typeList: [],
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
          width: 53,
          slot: "download"
        }
      ],
      data1: [],
      total: 0,
      columns2: [
        {
          title: "序号",
          align: "center",
          width: 50,
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
          title: "数据来源",
          align: "center",
          width: 66,
          ellipsis: true,
          key: "resource",
          render(h, param) {
            if (param.row.resource == 1) {
              return h("span", {}, "文献数据");
            }
            if (param.row.resource == 2) {
              return h("span", {}, "填报数据");
            }
          }
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
          width: 66,
          ellipsis: true,
          key: "pigBreed"
        },
        {
          title: "纯/杂种  ",
          align: "center",
          width: 66,
          ellipsis: true,
          key: "typeName"
        },
        {
          title: "性别",
          align: "center",
          width: 50,
          ellipsis: true,
          key: "sexName"
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
          title: "饲料信息",
          width: 80,
          ellipsis: true,
          align: "center",
          key: "feedInformation"
        },
        {
          title: "屠宰方式",
          width: 80,
          ellipsis: true,
          align: "center",
          key: "butcherWay"
        },
        {
          title: "操作",
          align: "center",
          width: 280,
          slot: "edit"
        }
      ],
      data2: [],
      total2: 0,
      modal: false,
      modal1: false,
      modal2: false,
      modal3: false,
      modal4: false,
      modal5: false,
      modal6: false,
      showResult: false,
      showResult1: false,
      fileList: [],
      obj: [],
      groupIdList: [],
      groupName: "",
      name: "",
      introduce: "",
      group: {
        noticeGroup: {}
      },
      list: [],
      userIdList: [],
      model14: [],
      loading2: false,
      downloadList: [],
      index: 0,
      allList: []
    };
  },
  methods: {
    remove() {
      this.modal3 = true;
    },
    rename() {
      this.modal = true;
    },
    renameContent() {
      this.modal1 = true;
    },
    ok() {
      let form = new FormData();
      if (this.groupName) {
        form.append("id", this.id);
        form.append("groupName", this.groupName);
        this.$axios
          .post("/api/noticeGroup/updateNoticeGroupByGroupName", form)
          .then(res => {
            this.$Message.success("修改成功!");
            this.getGroup(this.id);
            this.modal = false;
            this.groupName = "";
          });
      } else {
        this.$Message.error("名称不能为空!");
      }
    },
    cancel() {
      this.getGroup(this.id);
      this.modal = false;
    },
    ok1() {
      let form = new FormData();
      if (this.introduce) {
        form.append("id", this.id);
        form.append("groupIntroduction", this.introduce);
        this.$axios
          .post("/api/noticeGroup/updateNoticeGroupByGroupIntroduction", form)
          .then(res => {
            this.$Message.success("修改成功!");
            this.getGroup(this.id);
            this.modal1 = false;
            this.introduce = "";
          });
      } else {
        this.$Message.error("小组说明不能为空!");
      }
    },
    cancel1() {
      this.getGroup(this.id);
      this.modal1 = false;
    },
    ok2() {
      if (this.model14) {
        console.log(this.model14);
        let form = new FormData();
        form.append("userId", parseInt(this.model14.split("+")[0]));
        form.append("id", this.id);
        this.$axios.post("/api/noticeGroup/inviteByUser", form).then(res => {
          console.log(res);
          this.userIdList = [];
          this.model14 = [];
          this.modal2 = false;
        });
      } else {
        this.$Message.error("您还没有邀请小组成员");
      }
    },
    cancel2() {
      this.model14 = [];
      this.modal2 = false;
    },
    ok3() {
      if (this.type == 1) {
        let form = new FormData();
        form.append("id", this.id);
        this.$axios
          .post("/api/noticeGroup/deleteNoticeGroup", form)
          .then(res => {
            this.$Message.success("解散成功!");
            this.modal3 = false;
            this.$router.go(-1);
          });
      }
      if (this.type == 2) {
        let form = new FormData();
        form.append("id", this.id);
        this.$axios.post("/api/noticeGroup/exitNoticeGroup", form).then(res => {
          this.$Message.success("退出成功!");
          this.modal3 = false;
          this.$router.go(-1);
        });
      }
      this.modal3 = false;
    },
    cancel3() {
      this.modal3 = false;
    },
    ok4() {
      console.log(this.groupIdList);
      console.log(this.literatureId);
      console.log(this.power);
      console.log(this.groupIdList);
      let form = new FormData();
      form.append("literatureId", this.literatureId);
      form.append("power", this.power);
      form.append("groupIdList", this.groupIdList);
      this.$axios
        .post(
          "/api/literature/updateLiteratureByUserIdAndPigBreedAndTime",
          form
        )
        .then(res => {
          if (res.data.code == 100) {
            this.$Message.success("修改成功！");
            this.modal4 = false;
            this.search();
          } else {
            this.$Message.info("修改失败！");
          }
        });
    },
    cancel4() {
      this.modal4 = false;
    },
    getGroup(id) {
      let form = new FormData();
      form.append("id", id);
      this.$axios
        .post("/api/noticeGroup/getNoticeGroupByGroupId", form)
        .then(res => {
          this.group = res.data.data;
          this.groupName = res.data.data.noticeGroup.groupName;
          this.introduce = res.data.data.noticeGroup.groupIntroduction;
        });
    },
    //获取所有数据
    getData() {
      this.loading = true;
      this.loading1 = true;
      let form = new FormData();
      form.append("groupId", this.id);
      form.append("page", this.formValidate.page);
      form.append("pageSize", this.formValidate.pageSize);
      this.typeList.forEach(item => {
        item.indexIdList.forEach(item1 => {
          this.formValidate.indexIdList.push(item1);
        });
      });
      form.append("indexIdList", this.formValidate.indexIdList.join(","));

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
        .post("/api/literature/getLiteratureByGroupPage", form)
        .then(res => {
          this.loading = false;
          this.loading1 = false;
          this.formValidate.indexIdList = [];
          this.data1 = res.data.data == "没有数据" ? [] : res.data.data.records;
          this.data2 = res.data.data == "没有数据" ? [] : res.data.data.records;
          this.total = res.data.data == "没有数据" ? 0 : res.data.data.total;
          this.total2 = res.data.data == "没有数据" ? 0 : res.data.data.total;
          if (this.data2.length != 0) {
            this.data2.forEach(item => {
              this.allList.push(item.literatureId);
            });
          }
        });
    },

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
    //我的小组数据编辑公开信息
    handleCheckAll() {
      this.checkAll = !this.checkAll;
      let list = [];
      this.list1.forEach(item => {
        list.push(item.id);
      });
      if (this.checkAll) {
        this.groupIdList = list;
      } else {
        this.groupIdList = [];
      }
    },
    checkAllGroupChange(data) {
      console.log(data);
      if (data.length === this.list1.length) {
        this.checkAll = true;
      } else {
        this.checkAll = false;
      }
    },
    getMore(index) {
      console.log(index);
      let getAttr = document.getElementById("getAttr" + index);
      let more = document.getElementById("more" + index);
      console.log(getAttr);
      if (more.style.overflow == "hidden") {
        more.style.overflow = "visible";
        more.style.height = "auto";
        getAttr.innerText = "收起";
        console.log(",,,,,");
      } else {
        more.style.overflow = "hidden";
        more.style.height = "70px";
        getAttr.innerText = "查看更多选项";
        console.log(".....");
      }
    },
    changePage(page) {
      this.formValidate.page = page;
      this.getData();
    },
    changePageSize(pageSize) {
      this.formValidate.pageSize = pageSize;
      this.getData();
    },
    changePage1(page) {
      this.getSearch.page = page;
      this.search();
    },
    changePageSize1(pageSize) {
      this.getSearch.pageSize = pageSize;
      this.search();
    },
    editInform(literatureId, power) {
      this.literatureId = literatureId;
      this.power = power;
      console.log(this.literatureId);
      this.modal4 = true;
      let form = new FormData();
      form.append("literatureId", this.literatureId);
      this.$axios
        .post("/api/noticeGroup/getNoticeGroupByList", form)
        .then(res => {
          console.log(res);
          this.list1 = res.data.data;
        });
    },
    //手动更新数据
    update(literatureId) {
      this.$router.push({
        path: "/refreshData",
        query: { literatureId, literatureId }
      });
    },
    //删除文献
    Delete(literatureId) {
      this.literatureId = literatureId;
      this.modal5 = true;
    },
    ok5() {
      let form = new FormData();
      form.append("literatureId", this.literatureId);
      this.$axios.post("/api/literature/deleteLiterature", form).then(res => {
        console.log(res);
        this.$Message.success("删除成功！");
        this.modal5 = false;
        this.search();
      });
    },
    cancel5() {
      this.modal5 = false;
    },
    select(e) {
      console.log(e);
      this.downloadList = [];
      e.forEach(item => {
        this.downloadList.push(item.literatureId);
      });
    },
    selectAll(e) {
      console.log(e);
      this.downloadList = [];
      e.forEach(item => {
        this.downloadList.push(item.literatureId);
      });
    },
    selectCancel(e) {
      console.log(e);
      this.downloadList = [];
      if (e) {
        e.forEach(item => {
          this.downloadList.push(item.literatureId);
        });
      } else {
        this.downloadList = e;
      }
    },
    selectAllCancel(e) {
      this.downloadList = [];
      console.log(e);
      this.downloadList = e;
    },
    //下载单个
    download(literatureId) {
      window.location.href =
        "/api/literatureExcel/exportUserExcel?literatureId=" + literatureId;
      this.getDownload(literatureId);
    },
    //下载更多
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
    //全部下载
    downloadAll() {
      if (this.index < this.allList.length) {
        window.location.href =
          "/api/literatureExcel/exportUserExcel?literatureId=" +
          this.allList[this.index];
        this.getDownload(this.allList[this.index]);
        setTimeout(() => {
          this.index = this.index + 1;
          this.downloadAll();
        }, 1000);
      } else {
        this.index = 0;
        this.$Message.success("下载完成！");
      }
    },
    changeStartDate() {
      //this.getData();
    },
    changeEndDate() {
      //this.getData();
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
    //我的小组数据 搜索
    search() {
      this.loading1 = true;
      let form = new FormData();
      form.append("groupId", this.id);
      form.append("page", this.formValidate.page);
      form.append("pageSize", this.formValidate.pageSize);
      form.append("indexIdList", this.getSearch.indexIdList);
      form.append("breedType", "");
      form.append("animalSex", "");
      if (this.getSearch.keyWords) {
        form.append("keyword", this.getSearch.keyWords);
      }
      if (this.getSearch.startTime) {
        form.append("startTime", this.getSearch.startTime.valueOf());
      }
      if (this.getSearch.endTime) {
        form.append("endTime", this.getSearch.endTime.valueOf());
      }
      this.$axios
        .post("/api/literature/getLiteratureByGroupPage", form)
        .then(res => {
          this.loading1 = false;
          this.data2 = res.data.data == null ? [] : res.data.data.records;
          this.total2 = res.data.data == null ? 0 : res.data.data.total;
        });
    },
    //添加成员
    addMember() {
      this.modal2 = true;
      let name = "";
      let form = new FormData();
      form.append("name", name);
      form.append("groupId", this.id);
      this.$axios.post("/api/user/getUserByDisableList", form).then(res => {
        console.log(res);
        this.list = res.data.data;
      });
    },
    remoteMethod2(query) {
      console.log(query);
    },
    opnow(row) {
      this.row = row;
    },
    getName(name) {
      console.log(this.row);
      if (name == "uploadFile") {
        this.modal6 = true;
      }
      if (name == "update") {
        this.update(this.row.literatureId);
      }
    },
    //检测文件
    handleUpload(file) {
      console.log(file);
      this.fileList.push(file);
      let form = new FormData();
      form.append("file", file);
      this.$axios.post("/api/literatureExcel/importExcel", form).then(res => {
        if (res.data.code == 100) {
          this.obj = res.data.data;
          if (res.data.data[1].length > 0) {
            this.showResult = true;
            this.showResult1 = false;
            this.list = res.data.data[1];
          } else if (res.data.data[2].length > 0) {
            this.showResult = false;
            this.showResult1 = true;
            this.list = res.data.data[2];
          } else {
            //this.jixu();
            //this.fileList = file;
          }
        } else {
          this.$Message.error(res.data.msg);
        }
      });
      return false;
    },
    //是否继续上传
    saveUpload() {
      console.log(this.fileList);
      if (this.obj[2].length > 0) {
        this.list = this.obj[2];
        this.showResult1 = true;
        this.showResult = false;
      } else {
        //this.jixu();
        this.showResult = false;
      }
    },
    //是否继续上传
    saveUpload1() {
      console.log(this.fileList);
      this.showResult1 = false;
    },
    ok6() {
      this.saveAll();
      this.modal6 = false;
      this.search();
    },
    cancel6() {
      this.fileList = [];
      this.modal6 = false;
    },
    cancel7() {
      this.fileList = [];
      this.obj = [];
      this.showResult = false;
    },
    cancel8() {
      this.fileList = [];
      this.obj = [];
      this.showResult1 = false;
    },
    //继续上传
    saveAll() {
      if (this.obj.length != 0) {
        let form = new FormData();
        let literatureList = this.obj[0];
        console.log(this.obj[3][1]);
        let literatureDataListMap = this.obj[3];
        let power = this.power;
        let groupIdList = this.groupIdList;
        this.$axios
          .post("/api/literatureExcel/updateImportExcel", {
            literatureDataListMap: this.obj[3],
            literatureList: this.obj[0],
            literatureId: this.row.literatureId,
            power: power,
            groupIdList: groupIdList
          })
          .then(res => {
            if (res.data.code == 100) {
              this.$Message.success("上传成功");
            } else {
              this.$Message.error(res.data.msg);
            }
          });
      } else {
        this.$Message.error("上传数据失败！");
      }
    },
    gotoModal() {
      window.location.href = "/api/literatureExcel/exportExcelTemplate";
    },
    Delete1(index) {
      this.fileList.splice(index, 1);
    },
    gotoUpload() {
      this.$router.push({
        path: "/uploadData",
        query: {
          id: this.group.noticeGroup.id
        }
      });
    }
  },
  mounted() {
    let self = this;
    this.id = this.$route.query.id;
    console.log("fffff", this.id);
    console.log(typeof this.id);
    let form = new FormData();
    form.append("id", this.id);
    this.$axios
      .post("/api/noticeGroup/getNoticeGroupByGroupId", form)
      .then(res => {
        self.group = res.data.data;
        let userId = localStorage.getItem("userId");
        this.groupName = res.data.data.noticeGroup.groupName;
        this.introduce = res.data.data.noticeGroup.groupIntroduction;
        console.log(userId);
        if (self.group.noticeGroup.userId == userId) {
          self.type = 1;
        } else {
          self.type = 2;
        }
        console.log(self.type);
      });
    this.getType();
    this.getData();
  }
};
</script>
<style>
#Group .groupContent {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#Group .ivu-table-cell {
  padding: 0;
}
#Group .ivu-table-wrapper {
  width: 1140px;
}
#Group .ivu-table-overflowX {
  overflow-x: hidden;
}
#Group .ivu-table-tip {
  overflow: hidden;
}
#Group .ivu-poptip-body {
  padding: 0;
}
.ivu-modal-body {
  padding: 0 !important;
}
.el-upload-dragger {
  width: 700px;
  height: 90px;
  background: rgba(253, 253, 255, 1);
  border: 1px solid rgba(191, 191, 191, 1);
  border-radius: 3px;
  margin-top: 3px;
}
#Group .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
  margin: 0px;
}
.arrow_box2 {
  position: relative;
  border: 1px solid #c2e1f5;
  width: 500px;
  padding: 10px;
  margin-top: 20px;
}
.arrow_box2:after,
.arrow_box2:before {
  bottom: 100%;
  left: 50%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}

.arrow_box2:after {
  border-color: rgba(136, 183, 213, 0);
  border-bottom-color: #fff;
  border-width: 14px;
  margin-left: -120px;
}
.arrow_box2:before {
  border-color: rgba(194, 225, 245, 0);
  border-bottom-color: #c2e1f5;
  border-width: 15px;
  margin-left: -120px;
}
.content {
  display: flex;
  flex-wrap: wrap;
}
</style>