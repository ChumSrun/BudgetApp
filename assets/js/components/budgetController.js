 const budgetController = (() => {
     class Money {
         constructor(id, description, value) {
             this.id = id;
             this.description = description;
             this.value = value;
         }
     }

     class Income extends Money {
         constructor(id, description, value) {
             super(id, description, value);
         }
     }

     class Expense extends Money {
         constructor(id, description, value, percentage) {
             super(id, description, value);
             this.percentage = percentage;
         }
         calcPercentage(total) {
             if (total > 0) {
                 this.percentage = Math.round((this.value / total) * 100);
             } else {
                 this.percentage = 0;
             }
         }
         getPercentage() {
             return this.percentage;
         }
     }

     let data = {
         allItems: {
             inc: [],
             exp: []
         },
         totals: {
             inc: 0,
             exp: 0
         },
         budget: 0,
         percentage: 0
     };

     const calculateTotal = type => {
         let sum = 0;
         data.allItems[type].forEach(value => {
             sum += +value.value;
         });
         data.totals[type] = sum;
     };

     return {
         get totalBudget() {
             return data;
         },
         addItem(type, description, value) {
             let newItem, ID;
             if (data.allItems[type].length > 0) {
                 ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
             } else {
                 ID = 0;
             }

             newItem =
                 type === "inc" ?
                 new Income(ID, description, value) :
                 new Expense(ID, description, value);

             data.allItems[type].push(newItem);
             return newItem;
         },
         calculateBudget() {
             calculateTotal("inc");
             calculateTotal("exp");

             data.budget = data.totals.inc - data.totals.exp;
             if (data.budget > 0) {
                 data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
             }
         },
         deleteItem(type, id) {
             let items = data.allItems[type];
             let ids = items.map(value => {
                 return value.id;
             });
             let index = ids.indexOf(id);
             if (index > -1) {
                 items.splice(index, 1);
             }
         },
         calculatePercentages() {
             data.allItems.exp.forEach(value => {
                 value.calcPercentage(data.totals.inc);
             });
         },
         getPercentages() {
             return (data.allItems.exp.map(value => {
                 return value.getPercentage();
             }))

         }
     };
 })();

 export {
     budgetController
 };