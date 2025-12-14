const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropDownsSelects = document.querySelectorAll(".dropdown select");
const button = document.querySelector("form button");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const message = document.querySelector(".message");

for (let select of dropDownsSelects) {
  for (currencyCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currencyCode;
    newOption.value = currencyCode;
    if (select.name === "from" && currencyCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currencyCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (event) => {
    updateFlag(event.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSource = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSource;
};

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amountValue = amount.value;
  if (amountValue === "" || amountValue < 1) {
    amountValue = 1;
    amount.value = "1";
  }
  const fromCurrencyValue = fromCurrency.value.toLowerCase();
  const toCurrencyValue = toCurrency.value.toLowerCase();
  const URL = `${BASE_URL}/${fromCurrencyValue}.json`;
  let response = await fetch(URL);
  let data = await response.json();

  const conversionRate = data[fromCurrencyValue][toCurrencyValue];
  let finalAmount = Math.round(amountValue * conversionRate * 100) / 100;
  message.innerText = `${amountValue} ${fromCurrency.value} = ${finalAmount} ${toCurrency.value}`;
};

button.addEventListener("click", (event) => {
  event.preventDefault();
  updateExchangeRate();
});
window.addEventListener("load", () => {
  updateExchangeRate();
});
