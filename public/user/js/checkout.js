console.log("set annu js work akkunude")
let couponButton=document.getElementById('couponButton');

console.log(couponButton);
couponButton.addEventListener("click",(e)=>{
    
    console.log("clicke is working");
    couponCode=document.getElementById("couponCode").value;
       fetch('/coupon/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ couponCode })
    }).then(res => res.json()).then(data => {
      console.log("fetch is working ");
      console.log("data is ",data);
      if(data.couponSuccess===true)
    {
        console.log(data.couponCheck);
        couponCodeDisplay=document.getElementById("couponCodeDisplay");
        couponCodeDisplay.innerHTML="coupon code : "+data.couponCheck.couponCode ;
        document.getElementById("bill").innerHTML="₹" +Math.round(data.bill);
         

    }else{
        swal("invalid ", "coupon Code is invalid ", "error");
      
    }
      
    })
    
    
})


//  totalAmount = document.getElementById("price").innerHTML;
console.log("toatal amount")
function edit(name, address, town, state, country, pin, phone, index,email) {
   console.log("mailis",email);
    editName = document.getElementById("editName");
    editAddress = document.getElementById("editAddress")
    editTown = document.getElementById("editTown")
    editState = document.getElementById("editState")
    editCountry = document.getElementById("editCountry")
    editPin = document.getElementById("editPin")
    editPhone = document.getElementById("editPhone")
    editEmail = document.getElementById("editEmail")

    editIndex = document.getElementById("index");

    editName.value = name;
    editAddress.value = address;
    editTown.value = town;
    editState.value = state;
    editCountry.value = country;
    editPin.value = pin;
    editPhone.value = phone;
    editEmail.value=email
    editIndex.value = String(index);
}

let addresForm = document.querySelector('#addresForm')
console.log(addresForm);
addresForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("submited")

    const paymentType = addresForm.elements.paymentType.value;
    const addressIndex = addresForm.elements.addressIndex.value;
    if (paymentType == "COD") {

        addresForm.submit();
        // window.location.href = '/profile';
    }
    else {
        console.log("payment type and addressindex", paymentType, addressIndex);

        fetch('/payment/razorpay', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ addressIndex, paymentType })
        }).then(res => res.json()).then(data => {
            console.log("data is ", data.couponCheck)
            console.log("user details ", data.userDetails);
            razerpayFunction(data.options, data.userDetails, data.orderId)
            // razerpayFunction(data.options, data.userDetails, data.orderId)

        })
    }

})
function razerpayFunction(payDetails, userDetails, orderId) {

    let options = {
        "key": "rzp_test_PHlKN4lGr8tSz9",
        "amount": payDetails.amount,
        "currency": "INR",
        "name": "watch project",
        "description": "MyStore Payment",
        "image": "http://localhost:3000/user/img/logo.png",
        "order_id": orderId,
        "handler": function (response) {
            paymentSuccess(response, payDetails, userDetails, orderId);
        },
        "prefill": {
            "name": userDetails.fullName,
            "email": userDetails.email,
            "contact": userDetails.mobile
        },
        "notes": {
            "address": userDetails.address
        },
        "theme": {
            "color": "#3399cc"
        }



    };
    let rzp1 = new Razorpay(options);
    rzp1.on('payment.failed', function (response) {
        setTimeout(errorShow, 2000);

        function errorShow() {
            window.location = '/checkout';
        }
    });
    rzp1.open();
    e.preventDefault();
}
function paymentSuccess(response, payDetails, userDetails, orderId) {
    fetch('/checkout/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ response, payDetails, userDetails, orderId })
    }).then(res => res.json()).then(data => {
        // console.log(data.paymentStatus)
        if (data.paymentStatus == 'success') {
            swal("Payment successs", "Payment success", "success");
            const myTimeout = setTimeout(myGreeting, 2000);

            function myGreeting() {

                window.location = '/MyOrder';
            }

        } else {

            setTimeout(errorShow, 5000);

            function errorShow() {

                window.location = '/checkout';

            }

        }
    });
};





