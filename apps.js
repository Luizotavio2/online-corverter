async function convert() {
  const input = document.getElementById('coin-value');
  const targetCurrency = document.getElementById('coin').value;
  const baseCurrency = 'USD';
  const resultArea = document.getElementById('result'); 


  const amount = parseFloat(input.value);

  if (input.value.trim() === '') {
    resultArea.textContent = 'You can not add empty values';
    return;
  }

  if (isNaN(amount)) {
    resultArea.textContent = 'You inserted a non-numeric value';
    return;
  }

  try {
    const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${baseCurrency}&to=${targetCurrency}`);
    const data = await response.json();

    const converted = data.rates[targetCurrency];
    resultArea.textContent = `${amount} ${baseCurrency} = ${converted.toFixed(2)} ${targetCurrency}`;
  } catch (error) {
    resultArea.textContent = 'Conversion failed. Please try again.';
    console.error('API error:', error);
  }
}
