<template>
  <div class="card-box">
    <van-list
      class="card-list"
      v-model="loading"
      :finished="finished"
      finished-text=""
      @load="onLoad"
    >
      <div v-for="(item,index) in list" :key="index" class="card-item">
        <i class="iconfont iconxuanze1" v-if="! item.state" @click="setState(item.state,index)"></i>
        <i class="iconfont iconxuanze active" v-else @click="setState(item.state,index)"></i>
        <div class="card-item-info">
          <img :src="imgUrl + item.company.logo" alt="" @click="setState(item.state,index)">
          <div class="card-item-text">
            <h3 @click="setState(item.state,index)">{{item.company.name}}</h3>
            <p @click="setState(item.state,index)">最近预约：<span>{{item.company.order_num}}</span>次</p>
            <div>
              <span @click="closeItem(item.id)">删除</span>
            </div>
          </div>
        </div>
      </div>
    </van-list>

    <van-submit-bar
      :price="totla"
      :decimal-length="0"
      button-text="提交订单"
      @submit="onSubmit"
    >
      <van-checkbox v-model="checked" checked-color="#0c9c35" @click="allChiose">全选</van-checkbox>
      <span slot="tip">
    预约规则：首次可免费预约3家，若多预约需支付1元/家
  </span>
    </van-submit-bar>
  </div>
</template>

<script>
  import config from "../../config";
  import {Toast} from 'vant';

  export default {
    name: "mycard",
    data() {
      return {
        imgUrl: config.urlStr + '/',
        totla: 0,
        checked: false,
        list: [],
        loading: false,
        finished: false,
        nodata: false,
        chiose: []
      }
    },
    created() {
    },
    methods: {
      getMoney() {
        this.chiose = []
        this.list.map(item => {
          if (item.state) {
            this.chiose.push(item.id)
          }
        })
        this.$api.apiContent.preOrder({
          id: this.chiose.join(','),
          sign: this.$store.state.user.sgin,
          timestamp: parseInt(new Date().getTime() / 1000),
          token: this.$store.state.user.token
        }).then(res => {
          this.totla = res.amount*100
        }).catch(e => {
          this.totla = e.amount*100
        })
      },
      allChiose() {
        if (this.list.length === 0) {
          this.totla = 0
          return
        }
        this.checked = !this.checked
        this.list.map(item => {
          if (this.checked) {
            item.state = true
          } else {
            item.state = false
            this.totla = 0
          }
        })
        if (this.checked) {
          this.getMoney()
        }
      },
      setState(state, index) {
        this.list[index].state = !state
        let num = 0
        this.list.map(item => {
          if (item.state) {
            num++
            this.chiose.push(this.list[index].id)
          }
        })
        if (num === this.list.length) {
          this.checked = true
        } else {
          this.checked = false
        }
        if (num > 0) {
          this.getMoney()
        } else {
          this.totla = 0
        }
      },
      // 异步更新数据
      onLoad() {
        Toast.loading({
          message: '加载中...',
          forbidClick: true
        });
        this.$api.apiContent.OrderList({
          sign: this.$store.state.user.sgin,
          timestamp: parseInt(new Date().getTime() / 1000),
          token: this.$store.state.user.token
        }).then(res => {
          res.data.map(item => {
            item.state = false
          })
          this.list = res.data
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
      onSubmit() {
        if(this.chiose.length === 0){
          return
        }
        this.$router.push({
          path:'/contents/orderother',
          query:{
            id:this.chiose.join(',')
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .card-box {
    height: 100vh;
    overflow-y: scroll;
    background: #f6f6f6;

    .card-list {
      height: 100%;

      padding-bottom: 100px;

      .card-item {
        display: flex;
        align-items: center;
        padding: 10px;
        background: #fff;
        border-bottom: 1px solid #e2e2e2;

        i {
          font-size: 22px;
          margin-right: 10px;

          &.active {
            color: #0c9c35;
          }
        }

        .card-item-info {
          display: flex;
          align-items: center;
          flex: 1;
          overflow: hidden;

          img {
            display: block;
            width: 50px;
            height: 50px;
            border-radius: 50px;
            margin-right: 10px;
            border: 1px solid #e2e2e2;
          }

          .card-item-text {
            flex: 1;
            overflow: hidden;

            h3 {
              font-size: 16px;
              line-height: 150%;
            }

            p {
              color: #999;
              line-height: 150%;
              font-size: 12px;

              span {
                color: #FF6B64;
              }
            }

            div {
              display: flex;
              align-items: center;
              justify-content: flex-end;

              span {
                display: block;
                width: 50px;
                height: 20px;
                text-align: center;
                line-height: 20px;
                color: #999;
                font-size: 12px;
                border-radius: 4px;
                border: 1px solid #999;
              }
            }

          }
        }
      }
    }
  }
</style>