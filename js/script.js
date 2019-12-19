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
        modalOrderActive = document.getElementById('order_active');
  
  const orders = [];

  const renderOrders = () => {
    ordersTable.textContent = '';
    
    orders.forEach((order, i) => {
           
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
    
    const { title, firstName, email, description, deadline, currency, 
          amount, phone, active } = order;
    
    const modal = active ? modalOrderActive : modalOrder;
    const formClose = modal.querySelector('.close');
    
    const 
          titleBock = modal.querySelector('.modal-title'),
          firstNameBlock = modal.querySelector('.firstName'),
          emailBlock = modal.querySelector('.email'),
          descriptionBlock = modal.querySelector('.description'),
          deadlineBlock = modal.querySelector('.deadline'),
          currencyBlock = modal.querySelector('.currency_img'),
          countBlock = modal.querySelector('.count'),
          phoneBlock = modal.querySelector('.phone');
          
    
    titleBock.textContent = title;
    firstNameBlock.textContent = firstName;
    emailBlock.textContent = email;
    emailBlock.href = 'mailto:' + email;
    descriptionBlock.textContent = description;
    deadlineBlock.textContent = deadline;
    currencyBlock.className = 'currency_img';
    currencyBlock.classList.add(currency);
    countBlock.textContent = amount;
    phoneBlock ? phoneBlock.href = 'tel:' + phone : '';
    
    modal.style.display = 'block';

    formClose.addEventListener('click', () => {
        modal.style.display = 'none';
        
    });

  };

  

  ordersTable.addEventListener('click', (event) => {
    const target = event.target;
    
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