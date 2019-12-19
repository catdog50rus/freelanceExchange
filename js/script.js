'use strict';
document.addEventListener('DOMContentLoaded', () => {
  const customer = document.getElementById('customer'),
        freelancer = document.getElementById('freelancer'),
        blockCustomer = document.getElementById('block-customer'),
        blockFreelancer = document.getElementById('block-freelancer'),
        blockChoice = document.getElementById('block-choice'),
        btnExit = document.getElementById('btn-exit'),
        formCustomer = document.getElementById('form-customer'),
        ordersTable = document.getElementById('orders'),
        modalOrder = document.getElementById('order_read'),
        modalOrderActive = document.getElementById('order_active'),
        formClose = document.querySelector('.close');
  
  const orders = [];

  const renderOrders = () => {
    ordersTable.textContent = '';
    
    orders.forEach((order, i) => {
      //console.log('order, i: ', order, i);
          
      ordersTable.innerHTML += `
      <tr class="order" data-number-order="${i}">
        <td>${i+1}</td> 
        <td>${order.description}</td> 
        <td class="${order.currency}"></td> 
        <td>${order.deadline}</td> 
      </tr>`;

    });
    
  };

  const openModal = (numberOrder) => {
    const order = orders[numberOrder];
    const modal = order.active ? modalOrderActive : modalOrder;

    const 
          titleBock = document.querySelector('.modal-title'),
          firstNameBlock = document.querySelector('.firstName'),
          emailBlock = document.querySelector('.email'),
          descriptionBlock = document.querySelector('.description'),
          deadlineBlock = document.querySelector('.deadline'),
          currencyBlock = document.querySelector('.currency_img'),
          countBlock = document.querySelector('.count'),
          phoneBlock = document.querySelector('.phone');
          
    
    titleBock.textContent = order.title;
    firstNameBlock.textContent = order.firstName;
    emailBlock.textContent = order.email;
    descriptionBlock.textContent = order.description;
    deadlineBlock.textContent = order.deadline;
    currencyBlock.classList.add(order.currency);
    countBlock.textContent = order.amount;
    phoneBlock.href = "tel:"+order.phone;
    






    


    modal.style.display = 'block';



  };

  formClose.addEventListener('click', () => {
    modalOrder.style.display = 'none';
    modalOrderActive.style.display = 'none';
  });

  ordersTable.addEventListener('click', (event) => {
    const target = event.target;
    //console.log('target: ', target);
    const targetOrder = target.closest('.order');

    if(targetOrder){
      openModal(targetOrder.dataset.numberOrder);
    }

    



  });

  customer.addEventListener('click', () => {
    blockFreelancer.style.display = 'none';
    blockChoice.style.display = 'none';
    blockCustomer.style.display = 'block';
    btnExit.style.display = 'block';
    
  });

  freelancer.addEventListener('click', () => {
    blockCustomer.style.display = 'none';
    blockChoice.style.display = 'none';
    renderOrders();
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
    /* 
    //вариант фильтрации с циклом "for of"
    for (const elem of formCustomer.elements){
      
      if((elem.tagName === 'INPUT' && elem.type !== 'radio') ||
        (elem.type === 'radio' && elem.checked) ||
        elem.tagName === 'TEXTAREA') {
        
        obj[elem.name] = elem.value;
        
         
      }
    }; */

    //вариант фильтрации методом "filter()" и перебором массива 
    const elements = [...formCustomer.elements]
      .filter(elem => (
        (elem.tagName === 'INPUT' && elem.type !== 'radio') ||
        (elem.type === 'radio' && elem.checked) ||
        elem.tagName === 'TEXTAREA'
        ));
    
    elements.forEach((item) => {
      obj[item.name] = item.value;
    });
    
    formCustomer.reset();
    
    orders.push(obj);

    console.log('orders: ', orders); 

    

  });

  

});