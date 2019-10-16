 const uiController = (() => {
     const getDOMstrings = {
         budgetValueLabel: ".budget__value",
         budgetIncLabel: ".budget__income--value",
         budgetExpLabel: ".budget__expenses--value",
         budgetExpPercentLabel: ".budget__expenses--percentage",
         addType: ".add__type",
         addDesc: ".add__description",
         addValue: ".add__value",
         addBtn: ".add__btn",
         containerInc: ".income__list",
         containerExp: ".expenses__list",
         container: ".container",
         expPercentage: ".item__percentage",
         monthLabel: ".budget__title--month"
     };
     const formatNumber = function (num, type) {
         let numSplit, int;
         num = Math.abs(num).toFixed(2);
         numSplit = num.split(".");

         int = numSplit[0];
         if (int.length > 3) {
             int = int.substr(0, int.length - 3) + "," + int.substr(int.length - 3, 3);
         }
         return (type === "inc" ? "+" : "-") + " " + int + "." + numSplit[1];
     };
     return {
         get DOMstrings() {
             return getDOMstrings;
         },
         getInput() {
             return {
                 type: document.querySelector(getDOMstrings.addType).value,
                 description: document.querySelector(getDOMstrings.addDesc).value,
                 value: document.querySelector(getDOMstrings.addValue).value
             };
         },
         //get new item to UI

         addListItem(type, inputObj) {
             let html, elContainer;
             if (type === "inc") {
                 elContainer = getDOMstrings.containerInc;
                 html = `<div class="item clearfix" id="inc-${inputObj.id}">
          <div class="item__description">${inputObj.description}</div>
          <div class="right clearfix">
              <div class="item__value">${formatNumber(
                inputObj.value,
                "inc"
              )} $</div>
              <div class="item__delete">
                  <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
              </div>
          </div>
      </div>`;
             } else {
                 elContainer = getDOMstrings.containerExp;
                 html = `  <div class="item clearfix" id="exp-${inputObj.id}">
          <div class="item__description">${inputObj.description}</div>
          <div class="right clearfix">
              <div class="item__value">${formatNumber(
                inputObj.value,
                "exp"
              )} $</div>
              <div class="item__percentage">21%</div>
              <div class="item__delete">
                  <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
              </div>
          </div>
      </div>`;
             }

             document.querySelector(elContainer).insertAdjacentHTML("beforeend", html);
         },

         //clearFields
         clearFields() {
             const addDESC = document.querySelector(getDOMstrings.addDesc);
             document.querySelector(getDOMstrings.addValue).value = "";
             addDESC.value = "";
             addDESC.focus();
         },

         //display budget
         displayBudget(obj) {
             let type;

             type = obj.budget > 0 ? "inc" : "exp";
             document.querySelector(getDOMstrings.budgetValueLabel).textContent =
                 formatNumber(obj.budget, type) + " $";
             document.querySelector(getDOMstrings.budgetIncLabel).textContent =
                 formatNumber(obj.totals.inc, "inc") + " $";
             document.querySelector(getDOMstrings.budgetExpLabel).textContent =
                 formatNumber(obj.totals.exp, "exp") + " $";
             if (obj.percentage >= 1) {
                 document.querySelector(
                     getDOMstrings.budgetExpPercentLabel
                 ).textContent = obj.percentage + "%";
             } else {
                 document.querySelector(
                     getDOMstrings.budgetExpPercentLabel
                 ).textContent = "---";
             }
         },
         displayPercentages(percentage) {
             let fields = document.querySelectorAll(getDOMstrings.expPercentage);
             fields.forEach((value, key) => {
                 if (percentage[key] > 0) {
                     value.textContent = percentage[key] + "%";
                 } else {
                     value.textContent = "---";
                 }
             })
         },

         deleteListItem(id) {
             let el = document.getElementById(id);
             el.remove();
         },

         displayMonth() {
             let date = new Date();
             let month = date.toLocaleString('en-US', {
                 month: 'long'
             });

             document.querySelector(getDOMstrings.monthLabel).textContent = month;
         }
     };
 })();


 export {
     uiController
 };