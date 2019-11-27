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
            <div class="button" @click="imgAdd=!imgAdd">
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
        <div class="img">
          <div class="add-warp" v-show="imgAdd" @click="imgAdd=!imgAdd">
            <i class="add"></i>
            <p class="fs-20">点击添加</p>
            <p>jpg、png、psd格式</p>
          </div>
          <img :src="cropperImg" style="max-width: 100%" ref="img" id="img">
        </div>
      </div>
      <dialog-box :show="!imgAdd" :title="'添加图纸'" :button="'保 存'" :image=true @imgUrl="uploadPicture" @close="imgAdd=!imgAdd"></dialog-box>
    </div>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.min.css'

import dialogBox from '@/base/dialog'
export default {
  data() {
    return {
      switchModule: 1, // 切换模块选项
      switchModuleList: [ // 切换模块
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
      ],
      imgAdd: true, // 添加图片
      cropperImg: '',
      cropper: '', // 截图api挂载在这里
      imgName: ''
    }
  },
  components: {
    dialogBox
  },
  mounted() {
    this.initCropper()
  },
  methods: {
    // 返回
    back() {
      this.$router.go(-1)
    },

    // 点击上传图片
    uploadPicture(val) {
      this.imgAdd = !this.imgAdd
      console.log(val)
    },

    // 初始化截图工具
    initCropper () {
      console.log(this.$slots)
      let cropper = new Cropper(this.$refs.img, {
        viewMode: 1,
        aspectRatio: 16/9,
        dragMode: 'move'
      })
      this.cropper = cropper
    },

    // 点击确定按钮
    getPic() {
      let canvasDiv = this.$refs.img.cropper('getCroppedCanvas', {
        width: 1920,
        height: 1080
      })
      console.log(canvasDiv.toDataURL())
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
    .nav-wrap:after {
      display: block;
      content: '';
      clear: both;
    }
    .img {
      width: 1371px;
      height: 702px;
      margin: auto;
      margin-top: 20px;
      border:1px solid #c5e8ff;
      position: relative;
      .add-warp{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        cursor: pointer;
        text-align: center;
        .fs-20 {
          margin-top: .1rem;
          font-size: .2rem;
          font-weight: 600;
        }
      }
      .add {
        display: inline-block;
        width: .81rem;
        height: .81rem;
        background-image: url('../../../../../static/images/boardAddIcon.png');
      }
    }
  }
}
</style>