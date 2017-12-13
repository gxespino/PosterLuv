function PurchaseProcessor() {
  this.selectedOption = document.getElementById('print-size').selectedOptions[0]
  this.params = {
    instagramPostUrl:  document.getElementById('Instagram-URL').value,
    customerName:      document.getElementById('customer-name').value,
    shippingAddress:   document.getElementById('shipping-address').value,
    printSize:         this.selectedOption.dataset.size,
    amount:            this.selectedOption.dataset.amount
  }

  this.postToPurchases = function(token, params) {
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
        console.log(data);

        new PreviewChanger(data).change();
        spinner.stop();
      }
    })
  }

  this.process = function() {
    var spinnerContainer = document.getElementById('spinner-container');
    var spinner = new Spinner().spin(spinnerContainer);
    var params = this.params;
    var postFunction = this.postToPurchases

    var handler = StripeCheckout.configure({
      key: 'pk_test_U55DMkw44K26t5XA6k4aPzjS',
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      locale: 'auto',
      token: function(token) {
        postFunction(token, params)
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
