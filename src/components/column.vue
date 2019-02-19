<template>
  <div>
    <!-- <yd-grids-group :rows="2">
      <yd-grids-item v-for="(item, index) in columns" :key="index">
        <img slot="icon" v-lazy="item.icon" alt="">
        <span slot="text">{{item.name}}</span>
        <p>{{item.description}}</p>
      </yd-grids-item>
    </yd-grids-group> -->
    <ul class="column-list">
      <li v-for="(item, index) in columns" :key="index" @click="gotoColumnD(item.id)">
        <img class="icon" v-lazy="item.icon" alt="">
        <p class="column-name">{{item.name}}</p>
        <p class="column-des">{{item.description}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  data () {
    return {
      columns: []
    }
  },
  created () {
    this.getColumn()
  },
  methods: {
    ...mapMutations(['set_header']),
    getColumn () {
      var self = this
      this.$http.get('/api/columns').then(res => {
        // console.log(res)
        self.columns = res.data.columns
        self.set_header({
          show: true,
          icon: false
          // title: '栏目浏览'
        })
      })
    },
    gotoColumnD (id) {
      this.$router.push({path: `/column-d/${id}`})
    }
  }
}
</script>

<style>
  .yd-grids-icon{
    height: 2rem;
  }
  .column-list{
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .column-list li {
    width: 50%;
    text-align: center;
    position: relative;
    padding: 10px 0;
  }
  .column-list li::after{
    content: '';
    width: 100%;
    height: 1px;
    background: #dedede;
    transform: scale(0 50%);
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .column-list li:nth-of-type(2n+1)::before{
    content: '';
    width: 1px;
    height: 100%;
    background: #dedede;
    transform: scaleX(50%);
    position: absolute;
    top: 0;
    right: 0;
  }
  .column-list li .icon{
    width: 30px;
    height: 30px;
  }
  .column-list .column-name{
    font-size: 1rem;
    font-weight: bold;
    padding: 4px 0;
    color: #42b983
  }
  .column-list .column-des{
    font-size: 0.7rem;
    /* font-weight: bold; */
    padding: 4px 0;
    color: #999
  }
</style>
