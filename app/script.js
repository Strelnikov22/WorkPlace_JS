'use strict'


const cabinet = {
    item: document.querySelectorAll('.item'),
    tbody: document.querySelector('tbody'),
    checkAll: document.querySelector('.check-all'),
    footer: document.querySelector('.footer'),
    countLots: document.querySelector('.countLots'),
    activeClass: {},
    activeClassCount:0,
    deleteRow:{},
    deleteRowCount:0,
    deleteBtn: document.querySelectorAll('.delete'),
    deleteModal: document.querySelector('#deleteModal'),
    deleteFooter: document.querySelector('.deleteAll'),
    countDelete: document.querySelector('.countDelete'),



    // Делаем все айтемы активными при нажатии
    selectAll: function(){
        this.checkAll.addEventListener('click', function(){
            if(cabinet.checkAll.getAttribute('data-click')){
                cabinet.item.forEach(function(elem){
                    elem.classList.remove('active');
                })
                
                cabinet.checkAll.removeAttribute('data-click')
            } else {
                cabinet.item.forEach(function(elem){
                    elem.classList.add('active');
                })

                cabinet.checkAll.setAttribute('data-click', true);
            };

            cabinet.getActive();
            cabinet.footerDisplay();
        })
    },

    //При щелчке айтема, сравниваем количество айтемов, и количество ектив,если количество равно, то добавить data-atributte, иначе, убрать его.
    checkItems: function(){
        if(this.activeClassCount === this.item.length){
            cabinet.checkAll.setAttribute('data-click', true);
        }else{
            cabinet.checkAll.removeAttribute('data-click');
        }
    },
    
    // Добавляем класс актив тому на который нажали (одиночное)
    selectItem: function() {
        cabinet.tbody.addEventListener('click', function(even){
            let target = even.target;
           
            if(target.classList.contains('check-box')) {
                    target.closest('.item').classList.toggle('active');
                    cabinet.getActive();
                    // cabinet.getCounter('.active', cabinet.activeClass, cabinet.activeClassCount);
                    cabinet.footerDisplay();
                    cabinet.checkItems();
            }
            
        });
      
    },
    // -------------------------------------------------------------------------Удаление
    // Добавляем класс almostDelete тому, на который нажали (одиночное)
    getClassDelete: function() {
        this.tbody.addEventListener('click', function(even) {
            let target = even.target;

            if (target.classList.contains('delete')){
                target.closest('.item').classList.add('almostDelete');
                cabinet.getDelete();
                cabinet.modalVisible();
                cabinet.deleteTarget();
            }
        });
    },

    // Отобразить/спрятать подвал таблицы
    footerDisplay: function(){

        this.generateFooterText();
        if(this.activeClassCount >= 2) {
            this.footer.style.display = 'table-row';
        } else {
            this.footer.style.display = 'none';
        }
    },

    // Пишем в подвале сколько лотов выделенно 
    generateFooterText: function() {
        let c = this.activeClassCount;
        let t = this.declinationWords(c);
        this.countLots.textContent = `Выделено ${c} ${t}`;
        
    },

    // Функция сбора активных строк и опредления их количества
    getActive: function() {
        this.activeClass = document.querySelectorAll('.active');
        this.activeClassCount = this.activeClass.length;
    },

    // Функция сбора удаляемых строк и опредления их количества
    getDelete: function() {
        this.deleteRow = document.querySelectorAll('.almostDelete');
        this.deleteRowCount = this.deleteRow.length;

        console.log(this.deleteRow);
    },

    // Склонение слова "лот"
    declinationWords: function(c) {
        if(c === 1) {
            return 'лот';
        } else if (c >= 2 && c <= 4) {
            return 'лота';
        } else {
            return 'лотов';
        }
    },

    //-------------------------------УДАЛЕНИЕ-------------------------------


    // Удаление всех выделенных
    deleteAll: function() {
        this.deleteFooter.addEventListener('click', function(){
           cabinet.item.forEach(function(elem){
                if(elem.classList.contains('active')) {
                    elem.classList.add('almostDelete');
                    cabinet.getDelete();
                    cabinet.modalVisible();
                    cabinet.deleteTarget();
                }
                
           })  
        }); 
    },

    //открываем модальное окно
    modalVisible: function(){
        let c = cabinet.deleteRowCount;
        let t = cabinet.declinationWords(c);
        this.countDelete.textContent = `Вы действительно хотите удалить ${c} ${t} ?`;
        this.deleteModal.style.display = 'block';
    },
    //закрываем модальное окно
    modalNotVisible: function(){
        this.deleteModal.style.display = 'none';
        this.notClassDelete();
    },
    //убираем класс удаления
    notClassDelete: function(){
        this.item.forEach(function(elem){
            elem.classList.remove('almostDelete');
        });
    },
    //Удаление элемента
    delete: function(){
        let almostDelete = document.querySelectorAll('.almostDelete');
        almostDelete.forEach(function(elem){
            elem.remove();
        })
    },

    // При нажатии на кнопку удалить, удаляем
    deleteTarget: function(){
        this.deleteModal.addEventListener('click', function(even){
            let target = even.target;
           
            if(target.classList.contains('del')) {
                cabinet.delete();
                cabinet.modalNotVisible();
                // Прячем подвал после удаления
                cabinet.getActive();
                cabinet.footerDisplay();
            }else if (target.classList.contains('close')){
                cabinet.modalNotVisible();
            }
        });
    },

};
cabinet.deleteAll();
cabinet.selectAll();
cabinet.selectItem();
cabinet.getClassDelete();


// class workPlace {
//     constructor({
//         item,
//         tbody,
//     }) {
//         this.item = item;
//         this.tbody = document.querySelector(tbody);
//     }
   

//     myClick() {
//         super();
//         this.tbody.addEventListener('click', this.callback(even));
//     }

//     callback(even){
//         let target = even.target;

//         if(target.classList.contains(this.item)){
//             console.log('message');
//         }
//     }

//     init(){
//         this.myClick();  
       
//     }

// }

// //-----------------//
// const elem = {
//     item: '.item',
//     tbody: 'tbody',
// };


// const d = new workPlace(elem);

// d.init();

// const elem2 = {
//     item: '.itemdff',
//     tbody: 'tbody',
// };

// const dd = new workPlace(elem2);

// dd.init()