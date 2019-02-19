<template>
  <div class="daily">
    <div class="post-list">
      <p class="date">{{date}}</p>
      <div class="post" v-for="item in daily" :key="item.id" @click="enterDetail(item)">
        <span class="column" v-if="item.column.length>0">{{item.column}}</span>
        <p class="title">
          {{item.title}}
        </p>
        <div class="post-d" :class="{width_full: (item.thumbs.length==0 || item.abstract.length<40)}">
          <div class="post-detail"  v-if="item.abstract.length>40">
            {{item.abstract}}
          </div>
          <div class="post-thumb" v-if="item.thumbs.length>0">
            <img v-lazy="item.thumbs[0].large.url" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {date} from '../common/js/date.js'
import {mapMutations} from 'vuex'
export default {
  data () {
    return {
      daily: [],
      date: ''
    }
  },
  created () {
    this.getDaily()
    this.date = date(new Date())
  },
  methods: {
    ...mapMutations(['set_header']),
    getDaily () {
      let self = this
      let theDate = date(new Date())
      this.$http.get(`/api/stream/date/${theDate}`).then((res) => {
        console.log(res.data.posts)
        self.daily = res.data.posts
        self.set_header({
          show: true,
          title: '',
          icon: false
        })
      })
    },
    enterDetail (item) {
      this.$router.push({path: `/post/${item.id}/?douban_rec=1`})
    }
  }
}
</script>

<style scoped>

  .daily{
    background: #fff;
    padding: 0 0.5rem;
  }
  /* .width_full{
    width: 100%
  }
  .width_ban{
    width: 50%;
  } */
  .date{
    height: 30px;
    font-size: 0.8rem;
    line-height: 30px;
    border-bottom: 1px solid #ddd;
  }
  /* .post{
    min-height: 150px;
    border-bottom: 1px solid #ddd;
    position: relative;
  } */
  .column{
    position: relative;
    left: 1rem;
    padding: 2px 5px;
    border-radius: 5px;
    font-size: 0.6rem;
    background: #ccc;
  }
  /* .title{
    font-size: 0.9rem;
    line-height: 1.5rem;
    margin-top: 5px;
    font-weight: bold;
  } */
  .width_full{
    width: 100%
  }
  .width_ban{
    width: 50%;
  }
  .post{
    border-bottom: 1px solid #ddd;
    position: relative;
    padding: 10px 4%;
    cursor: pointer;
  }
  .title{
    font-size: 1.2rem;
    line-height: 2rem;
    margin-top: 5px;
    font-weight: bold;
  }
  .post-d{
    display: flex;
    justify-content: space-between;
  }
  .post-detail{
    width: 60%;
    line-height: 2;
  }
  .post-d.width_full .post-detail{
    width: 100%;
  }
  .post-d.width_full .post-thumb{
    width: 100%;
  }
  .post-d .post-thumb{
    width: 40%;
    text-align: center
  }
  .post-thumb img{
    width: 60%;
    background: #ccc;
  }
</style>
