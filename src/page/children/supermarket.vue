<template>
  <div class="supermarket">
    <div class="supermarket-nav">
      <span :class="chiose=== 0?'active':''" @click="setChiose(0)">排序
        <i class="iconfont" :class="chiose === 0?'iconarrowup':'iconarrowdown'"></i>
      </span>
      <span :class="chiose=== 1?'active':''" @click="setChiose(1)">服务区域
        <i class="iconfont" :class="chiose === 1?'iconarrowup':'iconarrowdown'"></i>
      </span>
      <span :class="chiose=== 2?'active':''" @click="setChiose(2)">装修类型
        <i class="iconfont" :class="chiose === 2?'iconarrowup':'iconarrowdown'"></i>
      </span>
      <span :class="chiose=== 3?'active':''" @click="setChiose(3)">更多
        <i class="iconfont" :class="chiose === 3?'iconarrowup':'iconarrowdown'"></i>
      </span>
    </div>
    <van-list
      v-if="!nodata"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      class="supermarket-list"
    >
      <div class="list-item" v-for="item in list" :key="item.id" @click="toChaoshi(item.id)">

        <div class="item-title" >
          <img :src="imgUrl + item.logo" alt="">
          <span>{{item.name}}</span>
        </div>
        <div class="item-num">
          <span>设计:<b>{{item.designer}}</b>套</span>
          <span>案例:<b>{{item.anli}}</b>套</span>
          <span>预约:<b>{{item.order_num}}</b>次</span>
          <span>浏览量:<b>{{item.browse}}</b></span>
        </div>
        <div class="pingjia-box">
          <div><span>设计:</span>
            <van-rate v-model="item.sheji" readonly size="10" color="#FF6B64"/>
          </div>
          <div><span>服务:</span>
            <van-rate v-model="item.server" readonly size="10" color="#FF6B64"/>
          </div>
          <div><span>施工:</span>
            <van-rate v-model="item.shigong" readonly size="10" color="#FF6B64"/>
          </div>
        </div>
        <div class="item-img">
          <img v-for="(items,j) in item.img_list" :key="j" :src="imgUrl + items" alt="">
        </div>
      </div>
    </van-list>
    <div class="nodata" v-else>
      <div>
        <img src="../../assets/img/empty.svg" alt="">
        <p> 暂无数据</p>
      </div>
    </div>

    <div class="fengge-prop">
      <van-popup
        v-model="show"
        position="top"
        :style="{top:'50px'}"
      >
        <div class="other-chiose" v-if="chiose === 0">
          <span :class="sort === 1?'active':''" @click="sort = 1">综合排序</span>
          <span :class="sort === 2?'active':''" @click="sort = 2">口碑优先</span>
          <span :class="sort === 3?'active':''" @click="sort = 3">人气优先</span>
        </div>
        <div class="other-chiose" v-if="chiose === 1">
          <span :class="area === 0?'active':''" @click="area = 0">全部</span>
          <span :class="area === 1?'active':''" @click="area = 1">定州</span>
          <span :class="area === 2?'active':''" @click="area = 2">望都</span>
          <span :class="area === 3?'active':''" @click="area = 3">安国</span>
          <span :class="area === 4?'active':''" @click="area = 4">唐县</span>
          <span :class="area === 5?'active':''" @click="area = 5">曲阳</span>
          <span :class="area === 6?'active':''" @click="area = 6">行唐</span>
          <span :class="area === 7?'active':''" @click="area = 7">新乐</span>
          <span :class="area === 8?'active':''" @click="area = 8">无极</span>
          <span :class="area === 9?'active':''" @click="area = 9">深泽</span>
          <span :class="area === 10?'active':''" @click="area = 10">博野</span>
          <span :class="area === 11?'active':''" @click="area = 11">安平</span>
        </div>
        <div class="other-chiose" v-if="chiose === 2">
          <span :class="area === 0?'active':''" @click="type = 0">全部</span>
          <h3>家装</h3>
          <span :class="type === -1?'active':''" @click="type = -1">全部</span>
          <span :class="type === 1?'active':''" @click="type = 1">小户型</span>
          <span :class="type === 2?'active':''" @click="type = 2">普通住宅</span>
          <span :class="type === 3?'active':''" @click="type = 3">复式</span>
          <span :class="type === 4?'active':''" @click="type = 4">别墅</span>
          <span :class="type === 5?'active':''" @click="type = 5">局部装修</span>
          <span :class="type === 6?'active':''" @click="type = 6">其他</span>
          <h3>工装</h3>
          <span :class="type === -2?'active':''" @click="type = -2">全部</span>
          <span :class="type === 7?'active':''" @click="type = 7">餐厅</span>
          <span :class="type === 8?'active':''" @click="type = 8">商铺</span>
          <span :class="type === 9?'active':''" @click="type = 9">展厅</span>
          <span :class="type === 10?'active':''" @click="type = 10">办公室</span>
          <span :class="type === 11?'active':''" @click="type = 11">休闲娱乐</span>
          <span :class="type === 12?'active':''" @click="type = 12">酒店</span>
          <span :class="type === 13?'active':''" @click="type = 13">其他</span>
        </div>
        <div class="other-chiose" v-if="chiose === 3" style=" padding-bottom: 120px;">
          <h3>装修风格</h3>
          <span :class="style === 0?'active':''" @click="style = 0">全部</span>
          <span :class="style === 1?'active':''" @click="style = 1">欧式</span>
          <span :class="style === 2?'active':''" @click="style = 2">田园</span>
          <span :class="style === 3?'active':''" @click="style = 3">中式</span>
          <span :class="style === 4?'active':''" @click="style = 4">新古典 </span>
          <span :class="style === 5?'active':''" @click="style = 5">现代简约</span>
          <span :class="style === 6?'active':''" @click="style = 6">混搭</span>
          <span :class="style === 7?'active':''" @click="style = 7">loft</span>
          <span :class="style === 8?'active':''" @click="style = 8">工业</span>
          <span :class="style === 9?'active':''" @click="style = 9">后现代</span>
          <span :class="style === 10?'active':''" @click="style = 10">地中海</span>
          <span :class="style === 11?'active':''" @click="style = 11">经典</span>
          <span :class="style === 12?'active':''" @click="style = 12">复古</span>
          <span :class="style === 13?'active':''" @click="style = 13">巴洛克</span>
          <span :class="style === 14?'active':''" @click="style = 14">洛可可</span>
          <span :class="style === 15?'active':''" @click="style = 15">美式</span>
          <span :class="style === 16?'active':''" @click="style = 16">法式</span>
          <span :class="style === 17?'active':''" @click="style = 17">日式</span>
          <span :class="style === 18?'active':''" @click="style = 18">轻奢</span>
          <span :class="style === 19?'active':''" @click="style = 19">东南亚</span>
          <h3>房屋状态</h3>
          <span :class="fwzt === 0?'active':''" @click="fwzt = 0">全部</span>
          <span :class="fwzt === 1?'active':''" @click="fwzt = 1">新房装修</span>
          <span :class="fwzt === 2?'active':''" @click="fwzt = 2">旧房改造</span>
          <h3>施工方式</h3>
          <span :class="sgfs === 0?'active':''" @click="sgfs = 0">全部</span>
          <span :class="sgfs === 1?'active':''" @click="sgfs = 1">纯设计</span>
          <span :class="sgfs === 2?'active':''" @click="sgfs = 2">半包装修</span>
          <span :class="sgfs === 3?'active':''" @click="sgfs = 3">全包装修</span>
          <span :class="sgfs === 4?'active':''" @click="sgfs = 4">软装</span>

          <h3>施工队伍工种(可多选)</h3>
          <span :class="sggz.indexOf(0)!==-1?'active':''" @click="sggzSet(0)">全部</span>
          <span :class="sggz.indexOf(1)!==-1?'active':''" @click="sggzSet(1)">瓦工</span>
          <span :class="sggz.indexOf(2)!==-1?'active':''" @click="sggzSet(2)">木工</span>
          <span :class="sggz.indexOf(3)!==-1?'active':''" @click="sggzSet(3)">油漆工</span>
          <span :class="sggz.indexOf(4)!==-1?'active':''" @click="sggzSet(4)">电工</span>
          <span :class="sggz.indexOf(5)!==-1?'active':''" @click="sggzSet(5)">水暖工</span>
          <h3>经营年限</h3>
          <span :class="year === 0?'active':''" @click="year = 0">全部</span>
          <span :class="year === 1?'active':''" @click="year = 1">1年以上</span>
          <span :class="year === 2?'active':''" @click="year = 2">3年以上</span>
          <span :class="year === 3?'active':''" @click="year = 3">5年以上</span>
          <span :class="year === 4?'active':''" @click="year = 4">8年以上</span>
          <span :class="year === 5?'active':''" @click="year = 5">13年以上</span>
          <h3>设计案例</h3>
          <span :class="anli === 0?'active':''" @click="anli = 0">全部</span>
          <span :class="anli === 1?'active':''" @click="anli = 1">50套以上</span>
          <span :class="anli === 2?'active':''" @click="anli = 2">100套以上</span>
          <span :class="anli === 3?'active':''" @click="anli = 3">200套以上</span>
          <span :class="anli === 4?'active':''" @click="anli = 4">500套以上</span>
          <span :class="anli === 5?'active':''" @click="anli = 5">1000套以上</span>
          <h3>设计师从业年限</h3>
          <span :class="sj_year === 0?'active':''" @click="sj_year = 0">全部</span>
          <span :class="sj_year === 1?'active':''" @click="sj_year = 1">1年以上</span>
          <span :class="sj_year === 2?'active':''" @click="sj_year = 2">3年以上</span>
          <span :class="sj_year === 3?'active':''" @click="sj_year = 3">5年以上</span>
          <span :class="sj_year === 4?'active':''" @click="sj_year = 4">8年以上</span>
          <span :class="sj_year === 5?'active':''" @click="sj_year = 5">13年以上</span>
          <h3>服务保障(可多选)</h3>
          <span :class="fwbz.indexOf(0)!==-1?'active':''" @click="fwbzSet(0)">全部</span>
          <span :class="fwbz.indexOf(1)!==-1?'active':''" @click="fwbzSet(1)">免息分期</span>
          <span :class="fwbz.indexOf(2)!==-1?'active':''" @click="fwbzSet(2)">装修贷款</span>
          <span :class="fwbz.indexOf(3)!==-1?'active':''" @click="fwbzSet(3)">质保合同</span>
          <span :class="fwbz.indexOf(4)!==-1?'active':''" @click="fwbzSet(4)">延期保赔</span>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
  import config from "../../config";
  import {Toast} from 'vant';

  export default {
    name: "supermarket",
    data() {
      return {
        imgUrl: config.urlStr + '/',
        chiose: -1,
        list: [],
        loading: false,
        finished: false,
        nodata: false,
        anli: 0,
        area: 0,
        fwbz: [0],
        fwzt: 0,
        sgfs: 0,
        sggz: [0],
        sj_year: 0,
        sort: 1,
        style: 0,
        type: 0,
        year: 0,
        show: false
      }
    },
    created() {
      if (!this.$store.state.user) {
        this.$router.push('/contents/login')
        return
      }
      this.$emit('tabBerSet', 3)
    },
    methods: {
      toChaoshi(id){
        this.$router.push({
          path:'/contents/orgDetail',
          query:{
            id:id
          }
        })
      },
      setChiose(num) {
        if(this.chiose === num){
          this.show = false
        }else{
          this.chiose = num
          this.show = true
        }

      },
      sggzSet(num){
        if(num === 0){
          this.sggz = [0]
        }else{
          if(this.sggz.indexOf(0)!==-1){
            this.sggz.splice(this.sggz.indexOf(0),1)
          }
          let index =  this.sggz.indexOf(num)
          if(index === -1){
            this.sggz.push(num)
          }else{
            this.sggz.splice(index,1)
            if(this.sggz.length === 0){
              this.sggz = [0]
            }
          }
        }
      },
      fwbzSet(num){
        if(num === 0){
          this.fwbz = [0]
        }else{
          if(this.fwbz.indexOf(0)!==-1){
            this.fwbz.splice(this.fwbz.indexOf(0),1)
          }
          let index =  this.fwbz.indexOf(num)
          if(index === -1){
            this.fwbz.push(num)
          }else{
            this.sggz.fwbz(index,1)
            if(this.fwbz.length === 0){
              this.fwbz = [0]
            }
          }
        }
      },
      // 异步更新数据
      onLoad() {
        Toast.loading({
          message: '加载中...',
          forbidClick: true
        });
        this.$api.apiContent.supermarkeList({
          anli: this.anli,
          area: this.area,
          fwbz: this.fwbz.join(','),
          fwzt: this.fwzt,
          sgfs: this.sgfs,
          sggz: this.sggz.join(','),
          sj_year: this.sj_year,
          sort: this.sort,
          style: this.style,
          type: this.type,
          year: this.year,
          limit: 2000,
          page: 1,
          sign: this.$store.state.user.sgin,
          timestamp: parseInt(new Date().getTime() / 1000),
          token: this.$store.state.user.token
        }).then(res => {
          this.list = res.data.list
          // 加载状态结束
          this.loading = false;
          // 数据全部加载完成
          this.finished = true;
        }).catch(() => {
          this.list = []
          // 加载状态结束
          this.loading = false;
          // 数据全部加载完成
          this.finished = true;
          this.nodata = true
        })
      },
    },
    watch: {
      show() {
        if (!this.show) {
          this.chiose = -1
        }
      },
      anli() {
        this.onLoad()
      },
      area() {
        this.onLoad()
        this.show = false
      },
      fwbz() {
        this.onLoad()
      },
      fwzt() {
        this.onLoad()
      },
      sgfs() {
        this.onLoad()
      },
      sggz() {
        this.onLoad()
      },
      sj_year() {
        this.onLoad()
      },
      sort() {
        this.onLoad()
        this.show = false
      },
      style() {
        this.onLoad()

      },
      type() {
        this.onLoad()
        this.show = false
      },
      year() {
        this.onLoad()
      },
    }
  }
</script>

<style scoped lang="scss">
  .supermarket {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: #f6f6f6;
    overflow-y: scroll;

    .supermarket-nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 50px;
      line-height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #e2e2e2;
      background: #fff;
      z-index: 9;

      span {
        display: block;
        width: 25%;
        text-align: center;

        &.active {
          color: #0c9c35;
        }

        i {
          font-size: 14px;
        }
      }
    }

    .supermarket-list {
      /*height: 100vh;*/
      padding: 50px 0 60px;

      .list-item {
        background: #fff;
        padding: 10px 20px;
        margin-bottom: 10px;

        .item-title {
          display: flex;
          align-items: center;
          font-size: 18px;
          font-weight: bold;

          img {
            display: block;
            width: 30px;
            height: 30px;
            border-radius: 30px;
            margin-right: 10px;
          }
        }

        .item-num {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 10px;

          span {
            display: block;
            width: 25%;
            font-size: 12px;
            color: #666;
            position: relative;

            &:after {
              position: absolute;
              top: 0;
              right: 8px;
              content: '';
              width: 1px;
              height: 12px;
              background: #e2e2e2;
            }

            &:last-child {
              &:after {
                display: none;
              }

            }

            b {
              font-weight: normal;
              color: #FF6B64;
            }
          }
        }

        .pingjia-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 10px 0;

          div {
            display: flex;
            align-items: center;

            span {
              font-size: 12px;
            }
          }
        }

        .item-img {
          display: flex;
          align-items: center;
          justify-content: flex-start;

          img {
            display: block;
            width: 25%;
            height: 70px;
            padding: 10px 5px 10px 0;

            &:last-child {
              padding-right: 0;
            }
          }
        }
      }

    }
  }

  .other-chiose {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 10px;
    flex-wrap: wrap;

    h3 {
      width: 100%;
      padding: 0 12px;
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 10px;
      margin-top: 10px;

      &:first-child {
        margin-top: 0;
      }
    }

    span {
      display: block;
      width: 93px;
      height: 30px;
      line-height: 30px;
      background: #e2e2e2;
      text-align: center;
      margin: 10px;

      &.active {
        background: #0c9c35;
        color: #fff;
      }
    }
  }
</style>