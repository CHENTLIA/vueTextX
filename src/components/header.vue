<template>
  <yd-navbar bgcolor="#42b983" color="#fff" height="3rem" fontsize="1rem" :title="header.show?'':header.title">
    <span to="#" slot="left" @click="tabmenu"  v-if="header.show">
      <yd-icon name="type"></yd-icon>
      <span>{{navbar.info === '' || navbar.info === '一刻' ? '一刻': navbarItem}}</span>
    </span>
    <span slot="left" v-if="!header.show" @click="back">
        <yd-navbar-back-icon></yd-navbar-back-icon>
        <!-- <span></span> -->
    </span>
    <span slot="center" v-if="!header.show" style="font-size: 0.8rem;">{{header.title}}</span>
    <!-- <router-link to="#" slot="right">
      <yd-icon name="search"></yd-icon>
    </router-link> -->
    <span slot="right" v-if="!header.show&&header.icon">
      <yd-icon name="like" fontSize="2rem"></yd-icon>
    </span>
  </yd-navbar>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
export default {
  computed: {
    ...mapState(['navbar', 'navbarItem', 'header'])
  },
  created () {
    console.log(this.navbar)
  },
  methods: {
    ...mapMutations(['set_navbar', 'set_navbarItem']),
    back () {
      history.back()
    },
    tabmenu () {
      console.log(this.navbar)
      var self = this
      if (this.navbar.show === true) {
        this.set_navbar({
          show: false,
          info: self.navbarItem,
          showInfo: self.navbar.info
        })
      } else {
        this.set_navbar({
          show: true,
          info: '',
          showInfo: self.navbar.info
        })
      }
    }
  }
}
</script>

<style>
  .yd-navbar{
    /* background: #42b983!important; */
    /* height: 2rem!important; */
    padding: 0 0.5rem;
    font-size: 1rem;
    display: flex;
    justify-content: space-between;
    z-index: 101;
  }
</style>
