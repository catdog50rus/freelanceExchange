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
        headTable = document.getElementById('headTable');
  
  const orders = JSON.parse(localStorage.getItem('freeOrders')) || [];

  const toStorage = () => {
    localStorage.setItem('freeOrders', JSON.stringify(orders));
  };

  // расчет количества дней до сдачи проекта
  const calcDeadline = (deadline) => {
    const nowDate = new Date();
    const date = new Date(deadline);
    const remain = (date - nowDate)/(1000*3600);
    if (remain / 24 > 2){
      return declOfNum(Math.floor(remain / 24), ['день', 'дня', 'дней']);
    }
    return declOfNum(Math.floor(remain), ['час', 'часа', 'часов']);
  };

  // функция склонения чисел
  const declOfNum = (number, titles) => number + ' ' +
     titles[(number % 100 > 4 && number % 100 < 20) ?
     2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? number % 10 : 5]];

  

  //рендер таблицы заказов
  const renderOrders = () => {
    ordersTable.textContent = '';
    
    orders.forEach((order, i) => {
      // если заказ в работе, присваиваем класс "taken" и заказ отмечается зеленым
      ordersTable.innerHTML += `
      <tr class="order ${order.active ? 'taken': ''}"
        data-number-order="${i}"> 
        <td>${i+1}</td> 
        <td>${order.description}</td> 
        <td class="${order.currency}"></td> 
        <td>${calcDeadline(order.deadline)}</td> 
      </tr>`;

    });
    
  };

  //обработка события при нажатии на модальное окно
  const handlerModal = (event) => {
    const target = event.target;
    const modal = target.closest('.order-modal');
    const order = orders[modal.numberOrder];

    //закрытие модального окна
    if(target.closest('.close') || target === modal){
      modal.style.display = 'none';
    };

    // основное действие с модальным окном
    /*Закрытие окна, 
      запись в локал сторедж
      рендер таблицы*/
    const baseAction = () => {
      modal.style.display = 'none';
      toStorage();
      renderOrders();
    };

    //взятие заказа
    if (target.closest('.get-order')) {
      order.active = true;
      baseAction();
      
    }

    //отказ от заказа
    if (target.closest('#capitulation')) {
      order.active = false;
      baseAction();
    }

    //выполнение заказа
    if (target.closest('#ready')) {
      orders.splice(orders.indexOf(order), 1);
      baseAction();
    }

  }

  const openModal = (numberOrder) => {
    const order = orders[numberOrder];
    
    const { title, firstName, email, description, deadline, currency, 
          amount, phone, active } = order;
    
    const modal = active ? modalOrderActive : modalOrder;
      
    const 
          titleBock = modal.querySelector('.modal-title'),
          firstNameBlock = modal.querySelector('.firstName'),
          emailBlock = modal.querySelector('.email'),
          descriptionBlock = modal.querySelector('.description'),
          deadlineBlock = modal.querySelector('.deadline'),
          currencyBlock = modal.querySelector('.currency_img'),
          countBlock = modal.querySelector('.count'),
          phoneBlock = modal.querySelector('.phone');
          
    modal.numberOrder = numberOrder;
    titleBock.textContent = title;
    firstNameBlock.textContent = firstName;
    emailBlock.textContent = email;
    emailBlock.href = 'mailto:' + email;
    descriptionBlock.textContent = description;
    deadlineBlock.textContent = calcDeadline(deadline);
    currencyBlock.className = 'currency_img';
    currencyBlock.classList.add(currency);
    countBlock.textContent = amount;
    phoneBlock ? phoneBlock.href = 'tel:' + phone : '';
    
    modal.style.display = 'flex';

    modal.addEventListener('click', handlerModal);

    
  };

  headTable.addEventListener('click', (event) => {
    const target = event.target;
    const targetSort = target.classList.contains('head-sort');
    if (targetSort){
      if (target.id === 'taskSort') {
        sortOrder(orders, 'title');
      }

      if (target.id === 'currencySort') {
        sortOrder(orders, 'currency');
      }

      if (target.id === 'deadlineSort') {
        sortOrder(orders, 'deadline');
      }
    };
    toStorage();
    renderOrders();


  });

  const sortOrder = (arr, property) => {
    arr.sort((a, b) => a[property] > b[property] ? 1 : -1)
  }

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
    //установка минимальной даты выполнения заказа(не меньше текущей)
    const toDay = new Date().toISOString().substring(0, 10);
    document.getElementById('deadline').min = toDay;

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
        

    toStorage();

    

  });

  

});