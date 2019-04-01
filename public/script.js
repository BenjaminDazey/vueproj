
new Vue({
  el: '#app',
  data: {
    images: [
      'presidents/adams.jpg',
      'presidents/ajohnson.jpg',
      'presidents/arthur.jpg',
      'presidents/buchanan.jpg',
      'presidents/bush.jpg',
      'presidents/carter.jpg',
      'presidents/cleveland.jpg',
      'presidents/clinton.jpg',
      'presidents/coolidge.jpg',
      'presidents/donald-trump.jpg',
      'presidents/fdr.jpg',
      'presidents/fillmore.jpg',
      'presidents/ford.jpg',
      'presidents/garfield.jpg',
      'presidents/grant.jpg',
      'presidents/h_harrison.jpg',
      'presidents/harding.jpg',
      'presidents/harrison.jpg',
      'presidents/hayes.jpg',
      'presidents/hoover.jpg',
      'presidents/ike.jpg',
      'presidents/jackson.jpg',
      'presidents/jefferson.jpg',
      'presidents/jfk.jpg',
      'presidents/johnson.jpg',
      'presidents/lincoln.jpg',
      'presidents/madison.jpg',
      'presidents/mckinley.jpg',
      'presidents/monroe.jpg',
      'presidents/nixon.jpg',
      'presidents/obama.jpg',
      'presidents/pierce.jpg',
      'presidents/polk.jpg',
      'presidents/quincyadams.jpg',
      'presidents/reagan.jpg',
      'presidents/roosevelt.jpg',
      'presidents/taft.jpg',
      'presidents/taylor.jpg',
      'presidents/truman.jpg',
      'presidents/tyler.jpg',
      'presidents/vanburen.jpg',
      'presidents/washington.jpg',
      'presidents/wbush.jpg',
      'presidents/wilson.jpg',
    ],
    names: [
      'John Adams',
      'Andrew Johnson',
      'Chester Alan Arthur',
      'James Buchanan',
      'George Herbert Walker Bush',
      'James Earl Carter, Jr.',
      'Grover Cleveland',
      'William Jefferson Clinton',
      'Calvin Coolidge',
      'Donald John Trump',
      'Franklin Delano Roosevelt',
      'Millard Fillmore',
      'Gerald Rudolph Ford',
      'James Abram Garfield',
      'Ulysses Simpson Grant',
      'William Henry Harrison',
      'Warren Gamaliel Harding',
      'Benjamin Harrison',
      'Rutherford Birchard Hayes',
      'Herbert Clark Hoover',
      'Dwight David Eisenhower',
      'Andrew Jackson',
      'Thomas Jefferson',
      'John Fitzgerald Kennedy',
      'Lyndon Baines Johnson',
      'Abraham Lincoln',
      'James Madison',
      'William McKinley',
      'James Monroe',
      'Richard Milhous Nixon',
      'Barack Obama',
      'Franklin Pierce',
      'James Knox Polk',
      'John Quincy Adams',
      'Ronald Wilson Reagan',
      'Theodore Roosevelt',
      'William Howard Taft',
      'Zachary Taylor',
      'Harry S. Truman',
      'John Tyler',
      'Martin Van Buren',
      'George Washington',
      'George Walker Bush',
      'Woodrow Wilson',
    ],
    items: [],
    selectedImage: '',
    imageIndex: 0,
    info: null,
    quote: "",
    newItemQuote: "Type a new Quote.",
  },
  created() {
    this.imageIndex = Math.floor(Math.random() * this.images.length);
    this.selectedImage = this.images[this.imageIndex];
    this.getItems();
  },
  mounted() {
    axios
      .get('https://ron-swanson-quotes.herokuapp.com/v2/quotes')
      .then(response => (this.info = response))
  },
  methods: {
    async upload() {
      try {
        this.quote = this.info.data[0];
        let r2 = await axios.post('/api/items', {
          quote: this.quote,
          path: this.imageIndex
        }).then(this.getItems());
        this.addItem = r2.data;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteItem(item) {
      try {
        let response = axios.delete("/api/items/" + item._id);
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editItem(item) {
      try {
        let response = await axios.put("/api/items/" + item._id, {
          quote: this.newItemQuote,
          path: item.path,
        });
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
})

Vue.filter('reverse', function(value) {
  // slice to make a copy of array, then reverse the copy
  return value.slice().reverse();
});
