<template>
  <div class="detail">
    <div class="detail-swiper">
      <van-swipe :autoplay="6000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <a href="javascript:void 0" class="seiper-items">
            <img v-lazy="imgUrl + image"/>
          </a>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="detail-name">
      <img :src="imgUrl + logo" alt="">
      <div class="detail-name-text">
        <h3>{{name}}</h3>
        <div class="item-num">
          <span>设计师:<b>{{designer}}</b>套</span>
          <span>案例:<b>{{anli}}</b>套</span>
          <span>预约:<b>{{order_num}}</b>次</span>
          <span>浏览量:<b>{{browse}}</b></span>
        </div>
      </div>
    </div>
    <div class="pingjia-box">
      <div><span>设计:</span>
        <van-rate v-model="sheji" readonly size="10" color="#FF6B64"/>
      </div>
      <div><span>服务:</span>
        <van-rate v-model="server" readonly size="10" color="#FF6B64"/>
      </div>
      <div><span>施工:</span>
        <van-rate v-model="shigong" readonly size="10" color="#FF6B64"/>
      </div>
    </div>
    <div class="detail-style">
      <span v-for="(item,index) in style" :key="index">{{item}}</span>
    </div>
    <a :href="'/contents/orgText?id=' + id" class="org-text">
      <span>查看公司简介</span>
      <i class="iconfont iconarrowright"></i>
    </a>
    <div class="jiange"></div>
    <div class="detail-title">
      <span>装修案例</span>
      <a :href="'/contents/orgAnliList?id=' + id">查看更多</a>
    </div>
    <div class="anli-box">
      <div v-for="(item,index) in anliList" :key="index">
        <a :href="'/contents/orgAnliDetail?id=' + item.id">
          <img :src="imgUrl + item.img" alt="">
          <h3 class="ovDna">{{item.title}} <span>(共{{item.num}}张)</span></h3>
          <p class="ovDuo2">{{item.desc}}</p>
        </a>
      </div>
    </div>
    <div class="jiange"></div>
    <div class="detail-title">
      <span>设计师团队</span>
    </div>
    <div class="sheji-box">
      <a :href="'/contents/orgSheji?id=' + item.id" v-for="(item,index) in shijiList" :key="index" class="sheji-item">
        <div class="sheji-item-left">
          <img :src="imgUrl + item.pic" alt="">
          <div>
            <h3 class="ovDna">{{item.name}} <span>{{item.touxian}}</span></h3>
            <p class="ovDuo2">{{item.year}}年经验 {{item.anli}}套案例</p>
          </div>
        </div>
        <i class="iconfont iconarrowright"></i>
      </a>
    </div>
    <div class="jiange"></div>
    <div class="detail-title">
      <span>施工团队</span>
    </div>
    <ul class="list-table">
      <li>
        <div class="table-title active" style="width: 25%">
          <b class="table-title-item1">工种</b>
          <b class="table-title-item2 ">人数</b>
          <b class="table-title-item3">级别</b>
        </div>
        <span class="active">瓦工</span>
        <span class="active">木工</span>
        <span class="active">油漆工</span>
        <span class="active">电工</span>
        <span class="active">水暖工</span>
      </li>
      <li>
        <div class="active active2" style="width: 25%">初级</div>
        <span>{{shigongList[0].wa}}人</span>
        <span>{{shigongList[0].mu}}人</span>
        <span>{{shigongList[0].you}}人</span>
        <span>{{shigongList[0].dian}}人</span>
        <span>{{shigongList[0].shui}}人</span>
      </li>
      <li>
        <div class="active active2" style="width: 25%">中级</div>
        <span>{{shigongList[1].wa}}人</span>
        <span>{{shigongList[1].mu}}人</span>
        <span>{{shigongList[1].you}}人</span>
        <span>{{shigongList[1].dian}}人</span>
        <span>{{shigongList[1].shui}}人</span>
      </li>
      <li>
        <div class="active active2" style="width: 25%">高级</div>
        <span>{{shigongList[2].wa}}人</span>
        <span>{{shigongList[2].mu}}人</span>
        <span>{{shigongList[2].you}}人</span>
        <span>{{shigongList[2].dian}}人</span>
        <span>{{shigongList[2].shui}}人</span>
      </li>
      <li>
        <div class="active active2" style="width: 25%">合计</div>
        <span>{{shigongList[3].wa}}人</span>
        <span>{{shigongList[3].mu}}人</span>
        <span>{{shigongList[3].you}}人</span>
        <span>{{shigongList[3].dian}}人</span>
        <span>{{shigongList[3].shui}}人</span>
      </li>
    </ul>
    <div class="jiange"></div>
    <div class="detail-title">
      <span>用户评价</span>
    </div>
    <div class="pingjia-list">
      <div class="pingjia-item" v-for="(item,index) in pingjiaList" :key="index">
        <img :src="item.pic" alt="">
        <div class="pingjia-item-text">
          <h3>{{item.phone}} </h3>
          <div class="pingjia-box">
            <div><span>设计:</span>
              <van-rate v-model="item.sheji" readonly size="8" color="#FF6B64"/>
            </div>
            <div><span>服务:</span>
              <van-rate v-model="item.server" readonly size="8" color="#FF6B64"/>
            </div>
            <div><span>施工:</span>
              <van-rate v-model="item.shigong" readonly size="8" color="#FF6B64"/>
            </div>
          </div>
        </div>
      </div>
      <p style="color: #0c9c35;line-height: 60px;text-align: center;padding-bottom: 60px;">
        {{pingjiaList.length>0?'没有评价了~':'暂无评价'}}</p>
    </div>
    <div class="footer-btn">
      <a href="/contents/mycard" class="to-yuyue">查看预约单</a>
      <div class="add-yuyue" v-if="is_cart === 0" @click="addYuyue">加入预约单</div>
      <div class="ok-yuyue" v-if="is_cart === 1">已加入预约单</div>
    </div>
  </div>
</template>

<script>
  import config from "../../config";
  import {Toast} from 'vant';

  export default {
    name: "caoshiDetail",
    data() {
      return {
        imgUrl: config.urlStr + '/',
        images: [],//  轮播
        anli: '',
        browse: '',
        content: '',
        designer: '',
        id: '',
        is_cart: 0,
        logo: '',
        name: '',
        order_num: '',
        server: 0,
        sheji: 0,
        shigong: 0,
        style: [],
        tsfw: [],
        zizhi: [],
        anliList: [],
        shijiList: [],
        shigongList: [
          {wa: 0, mu: 0, you: 0, dian: 0, shui: 0, level: 0},
          {wa: 0, mu: 0, you: 0, dian: 0, shui: 0, level: 0},
          {wa: 0, mu: 0, you: 0, dian: 0, shui: 0, level: 0},
          {level: 0, shui: 0, dian: 0, you: 0, mu: 0, wa: 0}
        ],
        pingjiaList: []
      }
    },
    created() {
      this.getDetail()
      this.getAnli()
      this.getSheji()
      this.getPingjia()
    },
    methods: {
      addYuyue() {
        Toast.loading({
          message: '添加中...',
          forbidClick: true
        });
        this.$api.apiContent.addCart({
          id: this.$route.query.id,
          sign: this.$store.state.user.sgin,
          timestamp: parseInt(new Date().getTime() / 1000),
          token: this.$store.state.user.token
        }).then(() => {
          this.is_cart = 1
          Toast('添加成功');
        }).catch((e) => {
          Toast(e.msgs);
        })
      },
      getPingjia() {
        this.$api.apiContent.getPingjia({
          id: this.$route.query.id,
          sign: this.$store.state.user.sgin,
          timestamp: parseInt(new Date().getTime() / 1000),
          token: this.$store.state.user.token
        }).then(res => {
          this.pingjiaList = res.data.list
        }).catch(() => {
          this.pingjiaList = []
        })
      },
      getSheji() {
        this.$api.apiContent.sheji({
          id: this.$route.query.id,
          sign: this.$store.state.user.sgin,
          timestamp: parseInt(new Date().getTime() / 1000),
          token: this.$store.state.user.token
        }).then(res => {
          this.shijiList = res.data.sheji
          this.shigongList = res.data.shigong
        }).catch(() => {
        })
      },
      getAnli() {
        this.$api.apiContent.anli({
          id: this.$route.query.id,
          sign: this.$store.state.user.sgin,
          timestamp: parseInt(new Date().getTime() / 1000),
          token: this.$store.state.user.token
        }).then(res => {
          this.anliList = res.data.list.length > 4 ? res.data.list.splice(4, res.data.list.length - 1) : res.data.list
        }).catch(() => {
          this.anliList = []
        })
      },
      //  获取公司详情
      getDetail() {
        this.$api.apiContent.orgDetail({
          id: this.$route.query.id,
          sign: this.$store.state.user.sgin,
          timestamp: parseInt(new Date().getTime() / 1000),
          token: this.$store.state.user.token
        }).then(res => {
          this.images = res.data.img_list
          this.anli = res.data.anli
          this.browse = res.data.browse
          this.content = res.data.content
          this.designer = res.data.designer
          this.id = res.data.id
          this.is_cart = res.data.is_cart
          this.logo = res.data.logo
          this.name = res.data.name
          this.order_num = res.data.order_num
          this.server = res.data.server
          this.sheji = res.data.sheji
          this.shigong = res.data.shigong
          this.style = res.data.style ? res.data.style : []
          this.tsfw = res.data.tsfw
          this.zizhi = res.data.zizhi ? res.data.zizhi : []
        })
      },
    }
  }
</script>

<style scoped lang="scss">
  .detail {
    .detail-swiper {
      .seiper-items {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 100%;
        overflow: hidden;

        img {
          display: block;
          width: 100%;
          height: 195px;
        }
      }

    }

    .detail-name {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px;

      img {
        display: block;
        width: 53px;
        height: 53px;
        border-radius: 53px;
        margin-right: 10px;
      }

      .detail-name-text {
        flex: 1;
        overflow: hidden;

        h3 {
          font-size: 18px;
          font-weight: bold;
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
      }

    }

    .pingjia-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px;

      div {
        display: flex;
        align-items: center;

        span {
          font-size: 12px;
        }
      }
    }

    .detail-style {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 10px 10px 0;

      span {
        display: block;
        padding: 5px 10px;
        margin: 0 10px 10px 0;
        border: 1px solid #e2e2e2;
        font-size: 12px;
        color: #999;
      }
    }

    a.org-text {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 10px 5px;
      color: #666;
      line-height: 30px;

    }

    .jiange {
      height: 10px;
      background: #f7f7f7;
    }

    .detail-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 15px 10px;
      border-bottom: 1px solid #f7f7f7;

      span {
        padding-left: 10px;
        position: relative;
        font-size: 16px;
        color: #666;

        &:before {
          position: absolute;
          top: 0;
          left: 0;
          content: '';
          width: 4px;
          height: 16px;
          background: #0c9c35;
          border-radius: 2px;
        }
      }

      a {
        color: #666;
      }
    }

    .anli-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 10px;

      div {
        width: 50%;
        padding: 5px;

        img {
          display: block;
          width: 100%;
          height: 100px;
          border-radius: 5px;
        }

        h3 {
          margin-top: 5px;
          line-height: 150%;
          color: #333;

          span {
            font-size: 12px;
          }
        }

        p {
          height: 36px;
          line-height: 18px;
          font-size: 12px;
          color: #999;
        }
      }

    }

    .sheji-box {
      padding: 10px;

      .sheji-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        border-bottom: 1px solid #f7f7f7;

        .sheji-item-left {
          display: flex;
          align-items: center;
          flex: 1;
          overflow: hidden;

          img {
            display: block;
            width: 53px;
            height: 53px;
            border-radius: 53px;
            margin-right: 10px;
          }

          div {
            flex: 1;
            overflow: hidden;

            h3 {
              line-height: 150%;
              color: #333;

              span {
                font-size: 12px;
                color: #666;
              }
            }

            p {
              line-height: 18px;
              font-size: 12px;
              color: #999;
            }
          }
        }

        i {
          color: #999;
        }
      }
    }

    .pingjia-list {
      padding: 10px;

      .pingjia-item {
        display: flex;
        align-items: center;
        flex: 1;
        overflow: hidden;
        padding-bottom: 10px;
        margin-bottom: 10px;

        img {
          display: block;
          width: 45px;
          height: 45px;
          border-radius: 53px;
          margin-right: 10px;
        }

        .pingjia-item-text {
          flex: 1;
          overflow: hidden;

          h3 {
            line-height: 150%;
            font-weight: bold;
            margin-bottom: 5px;
          }

          .pingjia-box {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0;

            div {
              display: flex;
              align-items: center;

              span {
                font-size: 12px;
              }
            }
          }
        }
      }
    }

    .footer-btn {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 55px;
      padding: 5px 10px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      background: #fff;
      border-top: 1px solid #e2e2e2;

      .to-yuyue {
        display: block;
        width: 40%;
        height: 45px;
        line-height: 45px;
        border-radius: 23px;
        background: #0c9c35;
        color: #fff;
        font-size: 16px;
        text-align: center;
      }

      .add-yuyue {
        width: 55%;
        height: 45px;
        line-height: 45px;
        border-radius: 23px;
        background: #ff5a00;
        color: #fff;
        font-size: 16px;
        text-align: center;
      }

      .ok-yuyue {
        width: 55%;
        height: 45px;
        line-height: 45px;
        border-radius: 23px;
        background: #999;
        color: #fff;
        font-size: 16px;
        text-align: center;
      }
    }
  }

  .list-table {
    width: 100%;
    padding: 10px;
    background: #fff;
    margin: 0 auto;
    border-top: 2px solid #fff;
    border-left: 2px solid #fff;
  }

  .list-table li {
    overflow: hidden;
  }

  .list-table li div, .list-table li span {
    float: left;
    width: 15%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    border-bottom: 2px solid #fff;
    border-right: 2px solid #fff;
    font-size: 14px;
  }

  .list-table li .active {
    background: #9ec6a9;
    color: #fff;
    font-size: 14px;
  }

  .list-table li .active2 {
    color: #333;
  }

  .list-table li .active3 {
    color: #0c9c35;
  }

  .table-title {
    position: relative;
  }

  .table-title:before {
    position: absolute;
    top: 34px;
    left: -3px;
    content: '';
    width: 91px;
    height: 2px;
    background: #fff;
    -webkit-transform: rotate(12deg);
    transform: rotate(18deg);
  }

  .table-title:after {
    position: absolute;
    top: 22px;
    left: 17px;
    content: '';
    width: 76px;
    height: 2px;
    background: #fff;
    -webkit-transform: rotate(38deg);
    transform: rotate(38deg);
  }

  .table-title-item1 {
    position: absolute;
    top: 0px;
    right: 2px;
    font-size: 14px;
    line-height: 20px;
    font-weight: normal;
  }

  .table-title-item2 {
    position: absolute;
    top: 2px;
    left: 0;
    font-size: 14px;
    line-height: 20px;
    font-weight: normal;
  }

  .table-title-item3 {
    position: absolute;
    bottom: 0px;
    left: 3px;
    font-size: 12px;
    line-height: 20px;
    font-weight: normal;
  }
</style>