import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { FoodService } from 'src/app/services/food/food.service';
import { Cart } from 'src/app/shared/models/Cart';
import { CartItem } from 'src/app/shared/models/CartItem';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  // Google pay method
  buttonColor = "black";
  buttonType="buy";
  isCustomSize=250;
  buttonHeight =50;
  isTop =window===window.top;

  paymentRequest={
    apiVersion:2,
    apiVersionMinor:0,
    allowedPaymentMethods:[
      {
        type:"CARD",
        paramerters:{
          allowedPaymentMethod:["PAN_ONLY","CRYPTOGRAM_3DS"],
          allowedCardNetworks:["AMEX","VISA","MASTERCARD"]
        },
        tokenization:{
          type:"PAYMENT_GATEWAY",
          paramerters:{
            gateway:"example",
            gatewayMerchantI:"exampleGatewayMerchantId",
          }
        }
      }
    ],
    maerchatInfo:{
      merchantId:"12345678901234567890",
      merchnatName:"demo Merchant"
    },
    transactionInfo:{
      totalPriceStatus:"FINAL",
      totalPriceLabel:"Total",
      totalprice:"100.00",
      currenyCode:"USD",
      countryCode:"US"
    }
  };
  onLoadPaymentData(event:any):void{
    console.log("Payment Data",event.details);
  }
  

  cart!:Cart;

  constructor(private cartService: CartService) {
      
    this.setCart();
   }

  ngOnInit(): void {
  }

  removeFromCart(cartItem:CartItem){
    this.cartService.removeFromCart(cartItem.food.id);
    this.setCart();
  }

  changeQuantity(cartItem:CartItem, quantityInString:string){
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.food.id,quantity);
    this.setCart();
  }

  setCart(){
    this.cart= this.cartService.getCart();
  }

 

}
