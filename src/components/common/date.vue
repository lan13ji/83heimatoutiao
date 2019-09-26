<template>
  <div class="date">
      <div class="hour" :style="hourStyle"></div>
      <div class="min" :style="minStyle"></div>
      <div class="second" :style="secondStyle"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      hour: 12,
      min: 60,
      second: 60
    }
  },
  methods: {
    updateTime () {
      let currentDate = new Date()
      this.hour = currentDate.getHours()
      this.min = currentDate.getMinutes()
      this.second = currentDate.getSeconds()
    }
  },
  created () {
    setInterval(() => {
      this.updateTime()
    }, 1000)
  },
  computed: {
    hourStyle () {
      let hour = this.hour - 12 ? this.hour - 12 : this.hour
      let rowDeg = 30 * hour + this.min / 60 * 30
      return { transform: `rotate(${rowDeg}deg)` }
    },
    minStyle () {
      let rowDeg = 6 * this.min
      return { transform: `rotate(${rowDeg}deg)` }
    },
    secondStyle () {
      let rowDeg = 6 * this.second
      return { transform: `rotate(${rowDeg}deg)` }
    }
  }
}
</script>

<style lang="less" scoped>
.date {
    background-image: url('../../assets/img/back.png');
    background-size: cover;
    width: 400px;
    height: 400px;
    display: flex;
    justify-content: center;
    position: relative;
    .hour,.min,.second{
        position:absolute;
        bottom: 200px;
        transform-origin: 0 100%
    }
    .hour {
        background-image: url('../../assets/img/hou.png');
        width: 8px;
        height: 100px;
    }
    .min {
        background-image: url('../../assets/img/min.png');
        width: 6px;
        height: 120px;
    }
    .second {
        background-image: url('../../assets/img/sec.png');
        width: 4px;
        height: 160px;
    }
}
</style>
