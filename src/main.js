new Vue({
  el: '#app',
  data: function () {
    let columns = {
      likes_count: 'いいね数',
      title: 'タイトル',
    };
    let sortOrders = {};
    Object.keys(columns).forEach(function (key) {
      sortOrders[key] = 1
    });

    return {
      columns: columns,
      qiitaPosts: [],
      searchNum: '3000',
      sortKey: '',
      sortOrders: sortOrders
    }
  },
  methods: {
    getQiitaPosts(num) {
      let url = `https://qiita.com/api/v2/items?page=1&per_page=100&query=stocks%3A%3E${num}`
      console.log(url)
      axios.get(url)
        .then(response => {
          console.log(response.data)
          this.qiitaPosts = response.data
          this.sortOrders['likes_count'] = 1
          this.sortBy('likes_count')
        })
    },
    sortBy: function (key) {
      this.sortKey = key;
      this.sortOrders[key] = this.sortOrders[key] * -1;
    }
  },
  computed: {
    filteredQiitaPosts: function () {
      let data = this.qiitaPosts;

      let sortKey = this.sortKey;
      let order = this.sortOrders[sortKey] || 1;

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
  mounted() {
    this.getQiitaPosts(this.searchNum)
  }
})