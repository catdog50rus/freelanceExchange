'use strict';
document.addEventListener('DOMContentLoaded', () => {
  const customer = document.getElementById('customer'),
        freelancer = document.getElementById('freelancer'),
        blockCustomer = document.getElementById('block-customer'),
        blockFreelancer = document.getElementById('block-freelancer'),
        blockChoice = document.getElementById('block-choice'),
        btnExit = document.getElementById('btn-exit'),
        formCustomer = document.getElementById('form-customer');
  
  const orders = [];

  customer.addEventListener('click', () => {
    blockFreelancer.style.display = 'none';
    blockChoice.style.display = 'none';
    blockCustomer.style.display = 'block';
    btnExit.style.display = 'block';
    
  });

  freelancer.addEventListener('click', () => {
    blockCustomer.style.display = 'none';
    blockChoice.style.display = 'none';
    blockFreelancer.style.display = 'block';
    btnExit.style.display = 'block';
    
  });


  btnExit.addEventListener('click', () => {
    blockFreelancer.style.display = 'none';
    blockCustomer.style.display = 'none';
    btnExit.style.display = 'none';
    blockChoice.style.display = 'block';
    
    
  });

  formCustomer.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const obj = {};
    /* for (const elem of formCustomer.elements){
      
      if((elem.tagName === 'INPUT' && elem.type !== 'radio') ||
        (elem.type === 'radio' && elem.checked) ||
        elem.tagName === 'TEXTAREA') {
        
        obj[elem.name] = elem.value;
        
         
      }
    }; */

    const elements = [...formCustomer.elements]
      .filter(elem => 
        ((elem.tagName === 'INPUT' && elem.type !== 'radio') ||
        (elem.type === 'radio' && elem.checked) ||
        elem.tagName === 'TEXTAREA'));
    
    elements.forEach((item) => {
      obj[item.name] = item.value;
    });
    
    formCustomer.reset();
    
    orders.push(obj);

    console.log('orders: ', orders); 

    

  });



  //console.log(customer, freelancer);
});