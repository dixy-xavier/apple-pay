document.get('applepay-radio').addEventListener("click", showApplePay);
const showApplePay = () => {
  if (window.ApplePaySession) {
    const showApplePayButton = ApplePaySession.canMakePayments();
    if (showApplePayButton) {
      const applePayButton = document.querySelector('apple-pay-button');
      applePayButton.classList.add('show');
    }
    const methodData = [
      {
        supportedMethods: "https://apple.com/apple-pay",
        data: {
          merchantIdentifier: process.env.MERCHANT_IDENTIFIER,
          countryCode: "80686",
          merchantCapabilities: ["supports3DS"],
          supportedNetworks: ["masterCard", "visa"],
        },
      },
    ];
    const details = {
      id: "super-store-order-123-12312",
      displayItems: [
        {
          label: "Sub-total",
          amount: { currency: "GBP", value: "55.00" },
        },
        {
          label: "Value-Added Tax (VAT)",
          amount: { currency: "GBP", value: "5.00" },
        },
        {
          label: "Standard shipping",
          amount: { currency: "GBP", value: "5.00" },
        },
      ],
      total: {
        label: "Total due",
        // The total is GBP£65.00 here because we need to
        // add tax and shipping.
        amount: { currency: "GBP", value: "65.00" },
      },
    };
    async function doPaymentRequest() {
      try {
        const request = new PaymentRequest(methodData, details);
        const response = await request.show();
        console.log(response);
      } catch (err) {
        // AbortError, SecurityError
        console.error(err);
      }
    }
    // async function validateResponse(response) {
    //   try {
    //     const errors = await checkAllValuesAreGood(response);
    //     if (errors.length) {
    //       await response.retry(errors);
    //       return validateResponse(response);
    //     }
    //     await response.complete("success");
    //   } catch (err) {
    //     // Something went wrong...
    //     await response.complete("fail");
    //   }
    // }
    // Must be called as a result of a click
    // or some explicit user action.
    doPaymentRequest();
  }
}
