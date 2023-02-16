const showApplePay = () => {
  if (window.ApplePaySession) {
    const showApplePayButton = ApplePaySession.canMakePayments();
    if (showApplePayButton) {
      const applePayButton = document.querySelector('apple-pay-button');
      applePayButton.classList.add('show');
    }
    // promise.then(function (canMakePayments) {
    //   if (canMakePayments) {
        
    //   }
    // }).catch((err) => {
    //   console.log(err);
    // });
  }
}
