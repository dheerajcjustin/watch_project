
// window.addEventListener('scroll', (event) => {
//     console.log("scroll ed")   
//     $('#loginModal').modal('show')
    
    
// });
const otpButton=document.getElementById("otpButton");
const otpText=document.getElementById("otpText");

const CreateAcountButton=document.getElementById("CreateAcountButton")
console.log("hai js kitti");

CreateAcountButton.addEventListener('click',(e)=>{
    $('#signupModal').modal('show')  

})
const userName=document.getElementById("userCheck");
if(userName){

    console.log("user under");
}
else{
    console.log("user ila");
}

const loginButton=document.getElementById("loginButton")
loginButton.addEventListener('click', (event) => {
    const email=document.getElementById("loginEmail").value
    const password=document.getElementById("loginPassword").value
    
    console.log("loginButton email ",email,"and password",password);
    fetch("/login", {
        method: "post",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email,password })
    }).then(res => res.json()).then(data => {
        
        console.log(data);
        if(data.login===true)
           {  
        const loginLink=document.getElementById("loginLink")        
        document.getElementById("loginLink").remove()
        console.log(loginLink);
        
      
        location.reload();

        }else{
            document.getElementById("loginAlert").innerHTML="invalid user name or password"
        }
       
    });//fetch end   
     
        
    });//loginbutton eventlis end


    const signupForm=document.getElementById("signupForm")
    console.log(signupForm);
    let name=signupForm.elements['name'].value
    let email=signupForm.elements['email'].value
    let password=signupForm.elements["password"].value
    let passwordConfirm=signupForm.elements["passwordConfirm"].value
    const signupAlert=document.getElementById("signupAlert")
  
    signupForm.addEventListener("submit", (event) => {
        event.preventDefault();
        let name = signupForm.elements['name'].value
        let email = signupForm.elements['email'].value
        let password = signupForm.elements["password"].value
        let passwordConfirm = signupForm.elements["passwordConfirm"].value
        if (password !== passwordConfirm) {
            signupAlert.innerHTML = "password dose not match"
        } else {
            fetch("/signup", {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            }).then(res => res.json()).then(data => {
    
                console.log(data.signup);
                if (data.signup === true) {
    
                    $('#signupModal').modal('hide')
                    swal({
                        title: "signup",
                        text: "You have scucess sign in",
                        type: "success",
                        timer: 500
                    });
                    $('#otpVarify').modal('show')    
                    fetch("/verify/email/otpsend", {
                        method: "post",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ email })
                    }).then(res => res.json()).then(data => {

    
                        console.log(data);
                    })
    
                    otpButton.addEventListener("click", optVerify);
                    otpResendButton = document.getElementById("resendOTPbutton");
                    otpResendButton.addEventListener("click", otpResend) //otpresend button event end      
    
                } else { // if signup failed
                    signupAlert.innerHTML = data.meg
                }
    
            }) //ftech end
        }
    
    
    }) //event lister end
    const otpResend=(event,email)=>{
        fetch("/verify/email/otpresend", {
            method: "get",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify()
        }).then(res => res.json()).then(data => {

            console.log(data);
        })

    }

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

         }else{
            document.getElementById("otpAlert").innerHTML="Enter Correct OTP"
         }
     })               
    }