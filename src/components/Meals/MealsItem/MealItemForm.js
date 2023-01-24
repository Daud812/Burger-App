import React, { useRef, useState } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import { Modal } from "../../UI/Modal";
const MealsItemForm = (props) => {
  const amountRef = useRef();
  const [amountIsValid, setAmountIsValid] = useState(true);
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountRef.current.value;
    const enteredAmountNumber = +enteredAmount;
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }
    props.onAddToCart(enteredAmountNumber);
  };
  const closeModal = () => {
    setAmountIsValid(true);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>Add</button>

      {!amountIsValid && (
        <Modal onAmountModalClick={closeModal}>
          <div className={classes.actions}>
            <h3>Please Enter Valid Amount (1-5)</h3>
            <button className={classes["button--alt"]} onClick={closeModal}>
              Close
            </button>
          </div>
        </Modal>
      )}
    </form>
  );
};
export default MealsItemForm;
