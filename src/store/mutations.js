export default {
  set_header: (state, payload) => {
    state.header = payload
  },
  set_navbar: (state, payload) => {
    state.navbar = payload
  },
  set_navbarItem: (state, payload) => {
    state.navbarItem = payload
  }
}
