async function convert() {
  const input = document.getElementById('coin-value');
  const targetCurrency = document.getElementById('coin').value;
  const baseCurrency = 'USD';
  const resultArea = document.getElementById('result'); // precisa existir um elemento com id="result"

  const amount = parseFloat(input.value);

  if (input.value.trim() === '') {
    alert('Type a dollar value');
    return;
  }

  if (isNaN(amount)) {
    alert('Insert a number value');
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
