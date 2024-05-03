console.log("hai product sort and fliter");
const ProductSort=document.getElementById("ProductSort");
const productContainer=document.getElementById("productContainer");
const brandFliter=document.getElementById("brandFileter");
const productCount=document.getElementById("productCount");

let sort;
let brand=[];
let materials=[];
function doSomething() {
    console.log("value changed");
    console.log(ProductSort.value)
    sort=ProductSort.value; 
    sortAndFilter();   

}
 
 function brandChange(id)
 {
    sort=ProductSort.value; 
    const brands=document.getElementById(id)
    if(brands.checked == true){
        brand.push(id);
    }   
    else{
      brand=brand.filter(item => item !== id)
    }
    
    console.log(brand);
    sortAndFilter();

    
 }

 function materialChange(id) {
    sort=ProductSort.value; 
    // console.log("matirla change with id ",id);
    const material=document.getElementById(id)
    if(material.checked == true){
        materials.push(id);
    }   
    else{
        materials=materials.filter(item => item !== id)
    }
    console.log(materials);
    sortAndFilter();


 }


 function sortAndFilter() {
    fetch("/product/filter", {
        method: "post",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sort,brand,materials })
    }).then(res => res.json()).then(data => {
        let card="";
        console.log(data)
       
               
            for ( item of data.products ) {

                if(document.getElementById("userCheck"))
                {
                    type= ' <li><button type="button" style="padding: 0;'+
                    '      border: none;'+
                    ' background: none;"'+
                    `  onclick="wishlistAdd(event,'`+item._id+`');">`+
                    '<img src="/user/img/icon/heart.png" alt="">'+
                    '       </button></li>' 
                }else{
                    type='<li> <button type="button" data-toggle="modal"'+
                    ' data-target="#loginModal"'+
                  '   style="border:none;background:none;"><img'+
                       '  src="/user/img/icon/heart.png" alt="">'+
              '   </button></li>'
                    
                }
    
    
               
                
              
                card += '<div class="col-lg-4 col-md-6 col-sm-6">'+
                '  <div class="product__item sale">'+
                ' <div class="product__item__pic"' +'style="background-image:url('+ item.phots[0].url+');background-size: 400px;">'+
                ' <span class="label">Sale</span>'+
                '  <ul class="product__hover">'+type+                   
                '   </ul>'+
                '   </div>'+
                '  <div class="product__item__text">'+
                '  <h6>'+
                             item.name+
                '           </h6>'+
                '   <a href="/product/'+item._id+'" class="add-cart">+ Add To Cart</a>'+
                '      <div class="rating">'+
                '  <span>Brands:'+item.brand[0].name+
                '    </span> <br>'+
                ' <span>Material :'+
                   item.material[0].name+ 
            '</span>'+
                '          </div>'+
                '   <h5 class="productPrice">'+
                      item.price +' ₹'+
                '           </h5>'+
                '    </div>'+
                '  </div>'+
                '  </div>'  
            
       
        }
      
         productContainer.innerHTML=card;
         productCount.innerText=  "Showing "+  data.products.length+ " results" ;
        
    
    })
 }






