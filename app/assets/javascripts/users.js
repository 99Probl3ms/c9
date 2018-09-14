// document ready
/* global $, Stripe */
$(document).on('turbolinks:load', function() {
  var theForm = $('pro_form');
  var submitBtn = $('form-submit-btn');
  // set stripe public key
  Stripe.setPublishableKey ($('meta ["name=stripe-key"]').attr('content') );
  // when user clicks form submit btn
  // prevent default submission behavior
  submitBtn.click(function(event){
    event.preventDefault()
  
  // collect credit card fields
  var ccNum = $('card_number').val(),
      cvcNum = $('card_code').val(),
      expMonth = $('card_month'),
      expYear = $('card_year');
  // send to stripe
  Stripe.createToken({
      number: ccNum,
      cvc: cvcNum,
      exp_month: expMonth,
      exp_year: expYear
    }, stripeResponseHandler);
  });
  // return token
  // inject token to hidden field
  // submit form to app
});