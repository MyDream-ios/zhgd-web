<template>
  <div id="systemSchedule_home">
    <div class="content">
      <!-- 上部分 -->
      <div class="top-box">
        <!-- 实际进度 -->
        <div class="top-left">
          <div class="title">
            <span>实际进度</span>
            <a>
              {{getDay()}}
            </a>
          </div>
          <div class="carousel">
            <el-carousel trigger="click">
              <el-carousel-item>
                <img src="../../../../static/images/systemSchedule-bg.png" alt />;
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
        <!-- 进度计划对比图与节点预警 -->
        <div class="top-right">
          <!-- 进度计划 -->
          <div class="plan">
            <div class="title">
              <span>进度计划对比图</span>
              <div class="label">
                <div>
                  <div class="line" style="background-color:#0090ff"></div>计划完成
                </div>
                <div>
                  <div class="line" style="background-color:#3ada76"></div>实际完成
                </div>
              </div>
              <div class="unit">单位：%</div>
            </div>
            <div id="plan" style="width:100%;height:2.61rem"></div>
          </div>
          <!-- 节点预警 -->
          <div class="warning">
            <div class="button-box">
              <a :class="tab==1?'active':''" @click="clickTab(1)">节点预警({{selectWarningZhNodeListTotal}})</a>
              <a :class="tab==2?'active':''" @click="clickTab(2)">即将开始节点提醒({{selectBeginZhNodeListTotal}})</a>
              <a :class="tab==3?'active':''" @click="clickTab(3)">即将完成节点提醒({{selectEndZhNodeListTotal}})</a>
            </div>
            <div class="first">
              <span style="width:1.4rem">节点名称</span>
              <span style="width:1.2rem">计划开始时间</span>
              <span style="width:1.2rem">计划完成时间</span>
              <span style="width:.9rem">状态</span>
            </div>
            <ul v-if="tab==1 && selectWarningZhNodeList.length>0">
              <li v-for="item in selectWarningZhNodeList" :key="item.id">
                <span style="width:1.4rem">
                  {{item.name}}
                </span>
                <span style="width:1.2rem">{{item.predictStart}}</span>
                <span style="width:1.2rem">{{item.predictEnd}}</span>
                <span style="width:.9rem">{{obtainState(item)}}</span>
              </li>
            </ul>
            <ul v-if="tab==2 && selectBeginZhNodeList.length>0">
              <li v-for="item in selectBeginZhNodeList" :key="item.id">
                <span style="width:1.4rem">
                  {{item.name}}
                </span>
                <span style="width:1.2rem">{{item.predictStart}}</span>
                <span style="width:1.2rem">{{item.predictEnd}}</span>
                <span style="width:.9rem">距离开始时间还有{{getDelay(item.predictStart)}}天</span>
              </li>
            </ul>
            <ul v-if="tab==3 && selectEndZhNodeList.length>0">
              <li v-for="item in selectEndZhNodeList" :key="item.id">
                <span style="width:1.4rem">
                  {{item.name}}
                </span>
                <span style="width:1.2rem">{{item.predictStart}}</span>
                <span style="width:1.2rem">{{item.predictEnd}}</span>
                <span style="width:.9rem">距离结束时间还有{{getDelay(item.predictEnd)}}天</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 下部分 -->
      <div class="bottom-box">
        <div class="title">工程进度</div>
        <div class="day" style="left:.5rem;top:1rem">
          <div class="top-text">已施工（天）</div>
          <div class="bottom-text">1304</div>
        </div>
        <div class="body">
          <a class="btn" style="left:30px" @click="addRight">
            <i class="el-icon-arrow-left"></i>
          </a>
          <div class="schedule-bar" ref="scrolls">
            <ul v-if="selectZhNodeLists.length">
              <li v-for="item in selectZhNodeLists" :key="item.id">
                <div class="top-box">
                  <div class="dot" :style="item.progress == 100?'':'border-color:#d1e4fd'">
                    <div class="sub-dot" :style="item.progress == 100?'':'background-color:#d1e4fd'"></div>
                  </div>
                  <div class="line" :style="item.progress == 100?'':'background-color:#d1e4fd'"></div>
                </div>
                <div class="bottom-box">
                  <p>{{item.predictStart}}</p>
                  <p>{{item.name}}</p>
                </div>
              </li>
            </ul>
          </div>
          <a class="btn" style="right:30px" @click="addLeft">
            <i class="el-icon-arrow-right"></i>
          </a>
        </div>
        <div class="day" style="right:.5rem;top:1rem">
          <div class="top-text">总工期（天）</div>
          <div class="bottom-text">2000</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
#systemSchedule_home {
  width: 100%;
  .content {
    padding: 0.3rem;
    border-radius: 0.04rem;
    background-color: #fff;
    box-shadow: 0 0 0.5rem -0.3rem #666;
    > .top-box {
      display: flex;
      justify-content: space-between;
      .top-left {
        width: 10rem;
        height: 6.4rem;
        background-color: #f2f9ff;
        .title {
          height: 0.78rem;
          display: flex;
          justify-content: space-between;
          padding: 0 0.3rem;
          span {
            height: 0.78rem;
            color: #4a4a4a;
            font-size: 0.3rem;
            line-height: 0.78rem;
            font-weight: bolder;
          }
          a {
            height: 0.78rem;
            color: #0089ff;
            font-size: 0.18rem;
            line-height: 0.78rem;
          }
        }
        .carousel {
          height: 5.62rem;
          .el-carousel {
            height: 5.62rem;
            width: 100%;
            .el-carousel__container {
              height: 5.62rem;
              width: 100%;
              img {
                height: 5.62rem;
                width: 100%;
              }
            }
          }
        }
      }
      .top-right {
        width: 5.95rem;
        height: 6.4rem;
        .plan {
          width: 5.95rem;
          height: 3.05rem;
          background-color: #f2f9ff;
          .title {
            display: flex;
            padding: 0 0.2rem;
            padding-top: 0.2rem;
            justify-content: space-between;
            position: relative;
            span {
              color: #0090ff;
              font-size: 0.18rem;
            }
            .label {
              display: flex;
              > div {
                color: #4a4a4a;
                font-size: 0.12rem;
                .line {
                  width: 0.3rem;
                  height: 0.02rem;
                  display: inline-block;
                  margin-left: 0.14rem;
                  margin-right: 0.07rem;
                  vertical-align: middle;
                }
              }
            }
            .unit {
              color: #0090ff;
              font-size: 0.12rem;
              position: absolute;
              bottom: -0.3rem;
              left: 0.2rem;
            }
          }
        }
        .warning {
          width: 5.95rem;
          height: 3.05rem;
          margin-top: 0.3rem;
          background-color: #f2f9ff;
          .button-box {
            display: flex;
            padding: 0 0.18rem;
            padding-top: 0.24rem;
            justify-content: space-between;
            a {
              height: 0.3rem;
              width: 1.8rem;
              color: #fff;
              font-size: 0.14rem;
              text-align: center;
              line-height: 0.3rem;
              border-radius: 0.04rem;
              background-color: #79c4ff;
              transition: .3s all;
              &.active {
                background-color: #0090ff;
              }
            }
          }
          .first {
            margin: 0.13rem 0.18rem 0;
            height: 0.3rem;
            color: #fff;
            font-size: 0.14rem;
            line-height: 0.3rem;
            text-align: center;
            background-color: #79c4ff;
            display: flex;
            justify-content: space-between;
          }
          ul {
            padding: 0 0.18rem;
            height: calc(100% - 1.2rem);
            overflow: auto;
            li {
              color: #5a5b5c;
              font-size: 0.14rem;
              display: flex;
              justify-content: space-between;
              text-align: center;
              margin-top: 0.13rem;
              span {
                position: relative;
                .dot {
                  width: 0.08rem;
                  height: 0.08rem;
                  position: absolute;
                  border-radius: 0.08rem;
                  background-color: #ff7a81;
                  left: 0;
                  top: 0.08rem;
                }
              }
            }
          }
          ul::-webkit-scrollbar {
            display: none
          }
        }
      }
    }
    > .bottom-box {
      width: 100%;
      height: 2.2rem;
      margin-top: 0.3rem;
      background-color: #f2f9ff;
      padding: 0 1.5rem;
      position: relative;
      .title {
        color: #4a4a4a;
        font-size: 0.24rem;
        text-align: center;
        font-weight: bolder;
        padding-top: 0.36rem;
      }
      .day {
        display: inline-block;
        position: absolute;
        .top-text {
          font-size: 0.16rem;
          text-align: center;
        }
        .bottom-text {
          font-size: 0.3rem;
          margin-top: 0.1rem;
          text-align: center;
        }
      }
      .body {
        display: inline-block;
        position: absolute;
        top: 1rem;
        width: calc(100% - 3rem);
        .btn {
          color: #3ada76;
          font-size: 0.36rem;
          font-weight: bolder;
          position: absolute;
        }
        .btn:hover {
          text-shadow: 3px 1px 3px #63d454;
        }
        .schedule-bar {
          display: inline-block;
          vertical-align: super;
          position: absolute;
          left: .65rem;
          width: 11.9rem;
          white-space: nowrap;
          overflow: auto;
          ul {
            display: inline-block;
            li {
              display: inline-block;
              .top-box {
                line-height: .36rem;
                .dot {
                  width: 0.2rem;
                  height: 0.2rem;
                  border-radius: 0.2rem;
                  display: inline-block;
                  position: relative;
                  border: 0.01rem solid #3ada76;
                  vertical-align: middle;
                  .sub-dot {
                    width: 0.11rem;
                    height: 0.11rem;
                    border-radius: 0.11rem;
                    background-color: #3ada76;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                  }
                }
                .line {
                  width: 1.5rem;
                  height: 0.04rem;
                  display: inline-block;
                  background-color: #3ada76;
                  vertical-align: middle;
                }
              }
              .bottom-box {
                display: inline-block;
                color: #4a4a4a;
                font-size: 0.16rem;
                font-weight: bolder;
              }
            }
          }
        }
        .schedule-bar::-webkit-scrollbar {
          display: none;
        }
      }
    }
  }
}
</style>

<script>
import mixin from '@/utils/mixin'
export default {
  mixins: [mixin],
  data() {
    return {
      nowDay: '', // 当前时间
      selectZhNodeLists: [], // 关键节点列表
      tab: 1, // tab切换
      selectWarningZhNodeList: [], // 预警节点列表
      selectWarningZhNodeListTotal: 0, // 节点预警数量
      selectBeginZhNodeList: [], // 即将开始节点列表
      selectBeginZhNodeListTotal: 0, // 即将开始节点数量
      selectEndZhNodeList: [], // 即将结束节点列表
      selectEndZhNodeListTotal: 0, // 即将结束节点数量
    };
  },
  mounted() {
    this.planECharts();
    this.selectZhNodeList();
    this.selectWarningZhNode();
    this.selectBeginZhNode();
    this.selectEndZhNode();
  },
  methods: {
    // 进度计划对比图：ECharts图渲染
    planECharts() {
      let plan = this.$echarts.init(document.getElementById("plan"));
      plan.setOption({
        // backgroundColor: "#FBFBFB",
        grid: {
          x: 30,
          y: 50,
          x2: 40,
          y2: 20,
          containLabel: true
        },
        tooltip: {
          trigger: "axis"
        },
        calculable: true,
        xAxis: [
          {
            axisLabel: {
              rotate: 0,
              interval: 0,
              color: "#000"
            },
            axisLine: {
              lineStyle: {
                color: "#132e6d"
              }
            },
            type: "category",
            boundaryGap: false,
            data: [
              "1月计划",
              "2月计划",
              "3月计划",
              "4月计划",
              "5月计划",
              "6月计划",
              "7月计划",
              "8月计划"
            ]
          }
        ],
        yAxis: [
          {
            type: "value",
            min: 0,
            interval: 20,
            axisLabel: {
              textStyle: {
                color: "#000"
              }
              //   formatter: "{value} 度"
            },
            axisLine: {
              lineStyle: {
                color: "#132e6d"
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: ["#ccc"],
                width: 1,
                type: "dashed"
              }
            }
          }
        ],
        series: [
          {
            name: "计划完成",
            type: "line",
            symbolSize: 10,
            smooth: 0.2,
            color: ["#0090ff"],
            data: [90, 60, 70, 40, 80, 60, 70, 50]
          },
          {
            name: "实际完成",
            type: "line",
            symbolSize: 10,
            smooth: 0.2,
            color: ["#3ada76"],
            data: [70, 50, 40, 40, 60, 55, 50, 45]
          }
        ]
      });
    },

    // 获取当前时间
    getDay() {
      let day = new Date()
      this.nowDay = day.getTime()
      let time = day.getFullYear() + '-' +
      ((day.getMonth() + 1)<10?'0' + (day.getMonth() + 1) : (day.getMonth() + 1)) + '-' +
      (day.getDate()<10?'0'+day.getDate():day.getDate())
      return time
    },

    // 查询关键节点列表
    selectZhNodeList() {
      this.$axios
        .post(`/api/Node/selectZhNodeList?projectId=${this.projectId}`)
        .then(res => {
          if (res.data.code == 0) {
            this.selectZhNodeLists = res.data.data
          }
        })
    },

    // 向右滚动
    addRight() {
      this.$refs.scrolls.scrollLeft += -170
    },

    // 向左滚动
    addLeft() {
      this.$refs.scrolls.scrollLeft += 170
    },

    // 表格切换tab
    clickTab(num) {
      this.tab = num
    },

    // 查询预警节点列表接口
    selectWarningZhNode() {
      this.$axios
        .post(`/api/Node/selectWarningZhNode?projectId=${this.projectId}`)
        .then(res => {
          if (res.data.code == 0) {
            this.selectWarningZhNodeList = res.data.data
            this.selectWarningZhNodeListTotal = res.data.data.length
          }
        })
    },

    // 开始节点列表
    selectBeginZhNode() {
      this.$axios
        .post(`/api/Node/selectBeginZhNode?projectId=${this.projectId}`)
        .then(res => {
          if (res.data.code == 0) {
            this.selectBeginZhNodeList = res.data.data
            this.selectBeginZhNodeListTotal = res.data.data.length
          }
        })
    },

    // 即将结束节点列表
    selectEndZhNode() {
      this.$axios
        .post(`/api/Node/selectEndZhNode?projectId=${this.projectId}`)
        .then(res => {
          if (res.data.code == 0) {
            this.selectEndZhNodeList = res.data.data
            this.selectEndZhNodeListTotal = res.data.data.length
          }
        })
    },

    // 计算延迟天数
    getDelay(time) {
      let temp = new Date(time).getTime()
      return Math.floor((temp - this.nowDay) / ( 1000 * 60 * 60 * 24 ))
    },

    // 节点预警返回值
    obtainState(item) {
      if (item.state == 1) {
        let temp = new Date(item.predictStart).getTime()
        return '未按时启动，延期' + Math.floor((temp - this.nowDay) / ( 1000 * 60 * 60 * 24 )) + '天'
      } else {
        let temp = new Date(item.predictEnd).getTime()
        return '未按时完成，延期' + Math.floor((this.nowDay - temp) / ( 1000 * 60 * 60 * 24 )) + '天'
      }
    }
  }
};
</script>