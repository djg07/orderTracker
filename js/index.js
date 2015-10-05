var people = {
    people: [/*{name: "Kids Bed", cf: 35},{name: "Adult Bed", cf: 75}*/],
    init: function() {
        this.cacheDom();
        this.bindEvents();
        this.render();
    },
    cacheDom: function() {
        this.$el = $('#peopleModule');
        this.$button = this.$el.find('button');
        this.$input = this.$el.find('input');
        this.$ul = this.$el.find('ul');
        this.template = this.$el.find('#people-template').html();
    },
    bindEvents: function() {
        this.$button.on('click', this.addPerson.bind(this));
        this.$ul.delegate('span', 'click', this.alertPersonName.bind(this));
        this.$ul.delegate('i.del', 'click', this.deletePerson.bind(this));
    },
    render: function() {
       var data = {
           people: this.people,
       };
       this.$ul.html(Mustache.render(this.template, data));
    },
    addPerson: function(itemName, itemCF) {
      var inputObj = {"name": itemName, "cf": itemCF}  
      this.people.push(inputObj);  
      this.$input.val('');
      this.render();
      orderTotal.updateTotal(itemCF);
      orderTotal.render();
    },
    deletePerson: function(event) {
        
      //var inputObj = {"name": this.itemName, "cf": this.itemCF}  
      var $remove = $(event.target).closest('li');
      var i = this.$ul.find('li').index($remove);
      var itemToBeRemoved = this.people[i];  
      console.log(itemToBeRemoved);
      orderTotal.updateTotal(itemToBeRemoved["cf"] - (itemToBeRemoved["cf"]*2));
      orderTotal.render();
      this.people.splice(i, 1);
      this.render();
        
    },
   alertPersonName: function(event, name) {
     var clickedName = ($(event.target).closest('.personName').text());
     alert(clickedName);
     
   }

};

people.init();

var orderTotal = {
    orderTotal: [0],
    init: function() {
      this.cacheDom();
      this.render();
    },
    cacheDom: function() {
        this.$el = $('#orderTotalContainer');
        this.template = this.$el.find('#order-template').html();
        
    },
    render: function() {
      var data = {
           orderTotal: this.orderTotal
       };    
      this.$el.html(Mustache.render(this.template, data));
      
    },
    updateTotal: function(amt) {
      this.orderTotal[0] += amt;
      
    },
  
  
};

orderTotal.init();
orderTotal.render();
source = [
  {value: "Kids Bed", data: 35},
  {value: "Single Bed", data: 35},
  {value: "Queen Size Bed", data: 52.5},
  {value: "King Size Bed", data: 70},
];
$("#orderAutocomplete" ).autocomplete({
  lookup: source,
  onSelect: function (suggestion) {
        console.log('You selected: ' + suggestion.value + ', ' + suggestion.data);
        people.addPerson(suggestion.value, suggestion.data);
    }
  
});




