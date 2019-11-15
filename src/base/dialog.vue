

<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="visible"
      center>
      <slot><p @click="initCropper">点击加载</p></slot>
      <div v-if="image">
        <div style="width: 910px; height: 480px; border: dashed #cacaca 1px; text-align: center;">
          <img :src="cropperImg" style="max-width: 100%" ref="img" id="img">
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="show = false">取消</el-button> -->
        <el-button type="primary" @click="getPic" v-if="image">{{button}}</el-button>
        <el-button type="primary" @click="confirm" v-else>{{button}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.min.css'

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '提 示'
    },
    button: {
      type: String,
      default: '确 定'
    },
    image: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      cropperImg: require('C:/Users/Administrator/Desktop/IMG_0040.jpg'),
      cropper: '', // 截图api挂载在这里
      imgName: ''
    }
  },
  mounted() {
    // this.initCropper()
  },
  computed: {
    visible: {
      get: function() {
        return this.show
      },
      set: function(value) {
        this.$emit('close')
      }
    }
  },
  methods: {
    // 确定按钮
    confirm() {
      this.$emit('confirm')
    },

    // 初始化截图工具
    initCropper () {
      let cropper = new Cropper(this.$refs.img, {
        viewMode: 1,
        aspectRatio: 16/9,
        dragMode: 'move'
      })
      this.cropper = cropper
    },

    // 点击确定按钮
    getPic() {
      let canvasDiv = this.$refs.img.cropper.getCroppedCanvas({
        width: 1920,
        height: 1080
      })
      this.$emit('imgUrl', canvasDiv.toDataURL())
    }
  }
}
</script>

<style lang="less" scoped>
.el-dialog__wrapper {
  background-color: rgba(0, 0, 0, 0.5);
}
/deep/.el-dialog__header {
  color: #fff;
  padding: 0;
  height: 0.6rem;
  font-size: 0.24rem;
  line-height: 0.6rem;
  text-align: center;
  position: relative;
  font-weight: bolder;
  background: linear-gradient(to right, #6cc4ff, #489cff);
}
/deep/.el-dialog {
  border-radius: .1rem;
  overflow: hidden;
}
/deep/.el-dialog__title {
  color: #fff;
  font-size: inherit
}
/deep/.el-dialog__headerbtn .el-dialog__close {
  color: #fff
}
/deep/.el-dialog__footer {
  height: .7rem;
  background-color: #f8f8f8;
  border-top: .01rem solid #dedede;
}
/deep/.el-dialog__footer {
  padding: .1rem;
}
.el-button {
  width: 1.63rem;
  height: .49rem;
  transition: all .5s;
  border-radius: .02rem;
  background-color: #ffd14f;
  border: .01rem solid #d9b759;
  font-size: .2rem;
  text-align: center;
  color: #fff;
}
</style>
