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
    submitBtn.val('Processing').prop('disabled',true);
  
   
  // collect credit card fields
  var ccNum = $('card_number').val(),
      cvcNum = $('card_code').val(),
      expMonth = $('card_month'),
      expYear = $('card_year');
  // send to stripe
   var error = false;
  // card validation
    if (!Stripe.card.validateCardNumber(ccNum)){
      error = true;
      alert('THe credit card number appears to be invalid')
    }
    
    if (!Stripe.card.validateCVC(cvcNum)){
      error = true;
      alert('The CVC appears to be invalid')
    }
    
    if (!Stripe.card.validateExpiry(expMonth, expYear)){
      error = true;
      alert('The expiration date appears to be invalid')
    }
    
    if (error){
      // dont send to stripe.
      submitBtn.prop('disabled', false).val("Sign Up");
    } else {
        Stripe.createToken({
            number: ccNum,
            cvc: cvcNum,
            exp_month: expMonth,
            exp_year: expYear
          }, stripeResponseHandler);
          return false;
    }
  });
  // return token
  function stripeResponseHandler(status, response){
    var token = response.id;
     // inject token to hidden field
     theForm.append($('input tpye="hidden" name="user[stripe_card_token]">').val(token));
  }
  // submit form to app
  theForm.get(0).submit();
});