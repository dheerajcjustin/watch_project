console.log("verfy th e edmail ");
function otpsend(email) {
        console.log(email)
    

fetch("/verify/email/otpsend", {
    method: "post",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email })
}).then(res => res.json()).then(data => {
    console.log(data);
})
const otpButto=document.getElementById("resendOTPbutton")
otpButton.addEventListener("click", optVerify);
otpResendButton = document.getElementById("resendOTPbutton");
otpResendButton.addEventListener("click", otpResend) 
}


// const otpResend=()=>{
//     fetch("/verify/email/otpresend", {
//         method: "get",
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify()
//     }).then(res => res.json()).then(data => {

//         console.log(data);
//     })

// }

const optVerify=(event)=>{
    console.log("otp clicked");
    let otp=document.getElementById("otpText");
    otp=otp.value;
    fetch("/verify/email/otpverify", {
     method: "post",
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ otp })
 }).then(res => res.json()).then(data => {

     console.log(data)
     if(data===true){
        $('#otpVarify').modal('hide')  
        swal({
            title: "OTP",
            text: "success fully varified otp",
            type: "success",
            timer: 500
        }); 
           
        location.reload();

     }else{
        document.getElementById("otpAlert").innerHTML="Enter Correct OTP"
     }
 })               
}