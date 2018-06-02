'use strict';

new Vue({
  el: '#app',
  data: function data() {
    var columns = {
      likes_count: 'いいね数',
      title: 'タイトル'
    };
    var sortOrders = {};
    Object.keys(columns).forEach(function (key) {
      sortOrders[key] = 1;
    });

    return {
      columns: columns,
      qiitaPosts: [],
      searchNum: '3000',
      sortKey: '',
      sortOrders: sortOrders
    };
  },
  methods: {
    getQiitaPosts: function getQiitaPosts(num) {
      var _this = this;

      var url = 'https://qiita.com/api/v2/items?page=1&per_page=100&query=stocks%3A%3E' + num;
      console.log(url);
      axios.get(url).then(function (response) {
        console.log(response.data);
        _this.qiitaPosts = response.data;
        _this.sortOrders['likes_count'] = 1;
        _this.sortBy('likes_count');
      });
    },

    sortBy: function sortBy(key) {
      this.sortKey = key;
      this.sortOrders[key] = this.sortOrders[key] * -1;
    }
  },
  computed: {
    filteredQiitaPosts: function filteredQiitaPosts() {
      var data = this.qiitaPosts;

      var sortKey = this.sortKey;
      var order = this.sortOrders[sortKey] || 1;

      if (sortKey) {
        data = data.slice().sort(function (a, b) {
          a = a[sortKey];
          b = b[sortKey];
          return (a === b ? 0 : a > b ? 1 : -1) * order;
        });
      }
      return data;
    }
  },
  mounted: function mounted() {
    this.getQiitaPosts(this.searchNum);
  }
});
