const billAmount = document.querySelector('#bill-amount');
const inputLabel = document.querySelector('#cash-label');
const paidAmount = document.querySelector('#paid-amount');
const checkBtn = document.querySelector('#check-btn');
const errorMsg = document.querySelector('#error-msg');
const returnMsg = document.querySelector('#return-msg');
const returnTable = document.querySelector('.return-table');
const noOfNotes = document.querySelectorAll('.no-of-notes');

const availableDenominations = [2000, 500, 200, 100, 20, 10, 5, 1];

checkBtn.addEventListener('click', validateAmount);

function hideMessage() {
  errorMsg.style.display = 'none';
}

function showMessage(msg) {
  errorMsg.style.display = 'block';
  errorMsg.innerText = msg;
}

function hideInput() {
  inputLabel.style.display = 'none'; //#cash-label
  paidAmount.style.display = 'none'; //#paid-amount
}

function showInput() {
  inputLabel.style.display = 'block';
  paidAmount.style.display = 'block';
}

function calculateChange(returnAmount) {
  showMessage(`Balance amount to be returned: ₹${returnAmount}`);
  for (let i = 0; i < availableDenominations.length; i++) {
    let num = Math.trunc(returnAmount / availableDenominations[i]);
    returnAmount = returnAmount % availableDenominations[i];
    noOfNotes[i].innerText = num;
  }
}

hideInput();
function validateAmount() {
  hideMessage();
  if (billAmount.value === '') showMessage('enter Bill Amount to proceed!');
  else {
    if (billAmount.value > 0) {
      showInput();
      if (paidAmount.value >= billAmount.value) {
        const amountToBeReturned = Math.trunc(
          paidAmount.value - billAmount.value
        );
        calculateChange(amountToBeReturned);
      } else if (paidAmount.value !== '')
        showMessage(
          'Insufficient amount! Customer should pay the complete bill.'
        );
      else if (paidAmount.value === '')
        showMessage('enter Paid Amount to proceed.');
    } else
      showMessage(
        'Amount cannot be zero or negative. enter valid Bill Amount to proceed!'
      );
  }
}
