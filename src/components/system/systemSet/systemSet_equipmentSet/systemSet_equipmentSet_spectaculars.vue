<template>
  <div>
    <div class="content-box">
      <!-- <p @click="back">返回</p> -->
      <div class="title">看板设置</div>
      <!-- 中心区域 -->
      <div class="body">
        <!-- 按钮 -->
        <div class="nav-wrap">
          <div class="left">
            <p>切换模块:</p>
            <el-select v-model="switchModule" placeholder="请选择">
              <el-option
                v-for="item in switchModuleList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="right">
            <div class="button">
              <!-- <i class="spectaculars_drawing"></i> -->
              <i class="el-icon-picture-outline"></i>
              添加图纸
            </div>
            <div class="button">
              <i class="el-icon-circle-plus-outline"></i>
              添加设备
            </div>
            <div class="button">
              <i class="el-icon-remove-outline"></i>
              删除设备
            </div>
          </div>
        </div>
        <!-- 图片显示位置 -->
        <div class="img"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      switchModule: 1, // 切换模块选项
      switchModuleList: [
        {
          label: '设备管理',
          value: 1
        },
        {
          label: '深基坑',
          value: 2
        },
        {
          label: '高支模',
          value: 3
        }
      ]
    }
  },
  mounted() {},
  methods: {
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="less">
.content-box {
  border-radius: 0.04rem;
  background-color: #fff;
  box-shadow: 0 0 0.5rem -0.3rem #666;
  padding:0 0.3rem 0.3rem;
  height: 9rem;
  overflow-y: auto;
  .title {
    height: 1.06rem;
    border-bottom: .35rem solid #c5e8ff;
    font-size: 0.24rem;
    text-align: center;
    line-height: 0.7rem;
  }
  .body {
    height: calc(100% - 1.06rem);
    padding: .2rem 0;
    .nav-wrap {
      font-size: .16rem;
      .left {
        float: left;
        p {
          display: inline-block;
          margin-right: .1rem;
        }
        /deep/input {
          border: 1px solid #c0c0c0;
          border-radius: 5px;
          color: #c0c0c0;
        }
      }
      .right {
        float: right;
        .button {
          display: inline-block;
          border: 1px solid #0090ff;
          color: #0090ff;
          border-radius: 5px;
          padding: 5px 10px;
          margin-left: .1rem;
          cursor: pointer;
          transition: .5s all;
          i {
            display: inline-block;
            width: 21px;
            height: 21px;
            font-size: .18rem;
            vertical-align: middle;
          }
        }
        .button:hover {
          color: #fff;
          background: #0090ff;
        }
      }
    }
    .img:before {
      display: block;
      content: '';
      clear: both;
    }
    .img {
      width: 100%;
      height: 100%;
      border: 1px solid red;
    }
  }
}
</style>