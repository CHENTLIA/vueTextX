<template>
  <div class="column-d">
    <div class="column-head">
      <img v-lazy="columnsH.icon" class="icon" alt="">
      <p class="column-name">
        {{columnsH.name}}
      </p>
      <p class="column-des">
        {{columnsH.description}}
      </p>
    </div>
    <div class="post" v-for="item in columnsA" :key="item.id" @click="enterDetail(item)">
      <p class="title">
        {{item.title}}
      </p>
      <div class="post-d" :class="{width_full: (item.thumbs.length==0 || item.abstract.length<40)}">
        <div class="post-detail"  v-if="item.abstract.length>40">
          {{item.abstract.length > 80 ? item.abstract.substr(0, 80) + '...' : item.abstract}}
        </div>
        <div class="post-thumb" v-if="item.thumbs.length>0">
          <img v-lazy="item.thumbs[0].large.url" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
// import {substr} from '@/common/js/dom'
export default {
  data () {
    return {
      columnsA: [],
      columnsH: {}
    }
  },
  created () {
    console.log(this.$route)
    this.getTheColumn(this.$route.params.id)
  },
  methods: {
    ...mapMutations(['set_header']),
    getTheColumn (id) {
      var self = this
      this.$http.get('/api/column/' + id + '/posts').then((res) => {
        console.log(res)
        self.columnsH = res.data.column
        self.columnsA = res.data.posts
        self.set_header({
          show: false,
          title: self.columnsH.name,
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

<style>
  .column-head{
    text-align: center;
    /* padding: 10px 0; */
    padding-top: 20px;
  }
  .column-head .icon{
    width: 40px;
    height: 40px;
  }
  .column-head .column-name{
    font-size: 1rem;
    font-weight: bold;
    padding: 4px 0;
    color: #42b983
  }
  .column-head .column-des{
    font-size: 0.8rem;
    /* font-weight: bold; */
    padding: 4px 0;
    color: #999
  }
  .column-d .width_full{
    width: 100%
  }
  .column-d .width_ban{
    width: 50%;
  }
  .column-d .post{
    border-bottom: 1px solid #ddd;
    position: relative;
    padding: 10px 4%;
    cursor: pointer;
  }
  .column-d .title{
    font-size: 1.2rem;
    line-height: 2rem;
    margin-top: 5px;
    font-weight: bold;
  }
  .column-d .post-d{
    display: flex;
    justify-content: space-between;
  }
  .column-d .post-detail{
    width: 60%;
    line-height: 2;
  }
  .column-d .post-d.width_full .post-detail{
    width: 100%;
  }
  .column-d .post-d.width_full .post-thumb{
    width: 100%;
  }
  .column-d .post-d .post-thumb{
    width: 40%;
    text-align: center
  }
  .column-d .post-thumb img{
    width: 60%;
    background: #ccc;
  }
</style>
