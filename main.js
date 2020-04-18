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

//Initialized variable to save encrypted object to reveal later
let encrypted;

//-----------------INBOUND REDACT----------------------------
// Submits all of the form fields by executing a POST request.
document.getElementById('cc-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Shows redact div area upon submit
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
//------------------------------------------------------------------

//------------OUTBOUND REVEAL---------------------------------------
//Executes POST request with encrypted data to local app.js server deployed on ngrok
  document.getElementById("reveal-btn").onclick = function(e) {
      e.preventDefault(); 
      fetch('https://vgs-app.herokuapp.com/post', 
      {method: 'POST', headers: {'Content-Type': 'application/json',},
      body: JSON.stringify(encrypted),}, {withCredentials:true})
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
  //Displays success box and the data returned
        document.getElementById('reveal-box').style.visibility = 'visible';
        document.getElementById('revealed').innerHTML = JSON.stringify(data, null, 4);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  } 