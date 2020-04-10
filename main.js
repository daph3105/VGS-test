//Include script with VGS Collect form initialization
// VGS Collect form initialization

const form = VGSCollect.create("tntipfh6dlx", function(state) {}); 

// Create VGS Collect field for credit card number
form.field('#cc-number', {
  type: 'card-number',
  name: 'card_number',
  successColor: '#4F8A10',
  errorColor: '#D8000C',
  placeholder: '4111 1111 1111 1111',
  validations: ['required', 'validCardNumber'],
});

// Create VGS Collect field for CVV
form.field('#cc-cvv', {
  type: 'card-security-code',
  name: 'card_cvv',
  placeholder: '344',
  validations: ['required', 'validCardSecurityCode'],
});

// Create VGS Collect field for credit card expiration date
form.field('#cc-expiration-date', {
  type: 'card-expiration-date',
  name: 'card_expirationDate',
  placeholder: '01 / 2022',
  validations: ['required', 'validCardExpirationDate']
});

let encrypted;

// Submits all of the form fields by executing a POST request.
document.getElementById('cc-form').addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('redact').style.visibility = 'visible';
    form.submit('/post', {
    }, function(status, data) {
      document.getElementById('result').innerHTML = JSON.stringify(data.json, null, 4);
      encrypted = data.json
      console.log(encrypted)
    });
  }, function (errors) {
    document.getElementById('result').innerHTML = errors;
  });


  document.getElementById("reveal-btn").onclick = function(e) {
      e.preventDefault(); 
      console.log(encrypted)
      const proxyurl = "https://cors-anywhere.herokuapp.com/";
      fetch(proxyurl+'https://vgs-app.herokuapp.com/post', {
      method: 'POST', 
      headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(encrypted),
      })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        document.getElementById('reveal-box').style.visibility = 'visible';
        document.getElementById('revealed').innerHTML = JSON.stringify(data, null, 4);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  } 
 
  

