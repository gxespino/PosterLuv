function PurchaseProcessor() {
  this.selectedOption = document.getElementById('print-size').selectedOptions[0]
  this.publishableKey = document.getElementById('key-button').dataset.key
  this.params = {
    instagramPostUrl:  document.getElementById('Instagram-URL').value,
    customerName:      document.getElementById('customer-name').value,
    shippingAddress:   document.getElementById('shipping-address').value,
    printSize:         this.selectedOption.dataset.size,
    amount:            this.selectedOption.dataset.amount
  }

  this.postToPurchases = function(token, params) {
    var successFlash = document.getElementById('success-flash')
    var errorFlash   = document.getElementById('error-flash')
    var inputs       = document.getElementsByTagName('input');

    $.ajax({
      url: '/purchases',
      type: 'POST',
      data: {
        instagramPostUrl: params.instagramPostUrl,
        printSize:        params.printSize,
        customerName:     params.customerName,
        shippingAddress:  params.shippingAddress,
        amount:           params.amount,
        stripeToken:      token.id,
        stripeEmail:      token.email
      },
      success: function(data) {
        successFlash.style.display = 'flex'

        for (index = 0; index < inputs.length; ++index) {
          inputs[index].value = ''
        }
      },
      error: function(data) {
        errorFlash.style.display = 'flex'

        for (index = 0; index < inputs.length; ++index) {
          inputs[index].value = ''
        }
      }
    })
  }

  this.process = function() {
    var spinnerContainer = document.getElementById('spinner-container');
    var spinner = new Spinner().spin(spinnerContainer);
    var params = this.params;
    var postFunction = this.postToPurchases

    var handler = StripeCheckout.configure({
      key: this.publishableKey,
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      locale: 'auto',
      token: function(token) {
        postFunction(token, params)
        spinner.stop();
      }
    });

    // Open Checkout with further options:
    handler.open({
      name:        'Posterluv',
      description: this.params.printSize + " Poster",
      amount:      parseInt(this.params.amount)
    });

    // Close Checkout on page navigation:
    window.addEventListener('popstate', function() {
      handler.close();
      spinner.stop();
    });
  }
}
