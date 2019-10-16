import {
  budgetController
} from "./components/budgetController.js";
import {
  uiController
} from "./components/uiController.js"

const appController = ((budgetController, uiController) => {
  const setupEventListeners = () => {
    const addBtn = document.querySelector(uiController.DOMstrings.addBtn);
    addBtn.addEventListener("click", ctrlAddItem);

    document.body.addEventListener("keypress", e => {
      if (e.which == 13) {
        ctrlAddItem();
      }
    });

    const removeBtn = document.querySelector(uiController.DOMstrings.container);
    removeBtn.addEventListener("click", ctrlDeleteItem);
  };

  const updateBudget = () => {
    budgetController.calculateBudget();
    uiController.displayBudget(budgetController.totalBudget);
  };

  const updatePercentages = () => {
    budgetController.calculatePercentages();
    let percentage = budgetController.getPercentages();
    uiController.displayPercentages(percentage)
  };

  const ctrlAddItem = () => {
    let input;
    input = uiController.getInput();

    if (
      input.description !== " " &&
      input.description &&
      input.value &&
      input.value != 0
    ) {
      let newItem = budgetController.addItem(
        input.type,
        input.description,
        input.value
      );

      uiController.addListItem(input.type, newItem);
      updateBudget();
      uiController.clearFields();
      updatePercentages();

    }
  };

  const ctrlDeleteItem = e => {
    let itemID;
    itemID = e.target.parentNode.parentNode.parentNode.parentNode.id;
    if (itemID) {
      let splitNum = itemID.split("-");
      let ID = splitNum[1];
      let type = splitNum[0];
      budgetController.deleteItem(type, +ID);
      uiController.deleteListItem(itemID);

      updateBudget();
      updatePercentages();
    }
  };

  return {
    init() {
      setupEventListeners();
      uiController.displayBudget({
        totals: {
          inc: 0,
          exp: 0
        },
        budget: 0,
        percentage: 0
      });
      uiController.displayMonth();
    }
  };
})(budgetController, uiController);


appController.init();