<html lang="ru">
<head>
  <meta charset="utf-8" />
  <title>Истории с Войны</title>


  <style type="text/css">
   form {
    margin: 20px;
   }
   html {
zoom: 150%;
}
   img {
     vertical-align: middle;
   }
   .wrapper{
     width: 940px;
     margin: 10px auto;
   }
   .clear{
    clear: both;
   }
   .tab { margin-left: 40px; }
   .header{
     background: #090909;
     width: 100%;
     height: 40px;

   }
   @font-face {
font-family: 'Bebas Neue Thin';
src: url('BebasNeue-Thin.eot');
src: url('BebasNeue-Thin.eot?#iefix') format('embedded-opentype'),
url('BebasNeue-Thin.woff') format('woff'),
url('BebasNeue-Thin.ttf') format('truetype');
font-weight: normal;
font-style: normal;
}
   h1 {
     letter-spacing: 2px;
     text-transform: uppercase;
     font: 20px "Lato", sans-serif ;
     color: #111;
     text-align: center;
   }
   h3 {
     letter-spacing: 2px;
     text-transform: uppercase;
     font: 20px "Lato", sans-serif ;
     color: #111;
     margin-left: 40px;
   }
   h5 {
     letter-spacing: 2px;
     font: 22px "Lato", sans-serif ;
     color: #111;
     margin: 40px;
   }
   h6 {
     letter-spacing: 1px;
     text-transform: uppercase;
     font: 15px "Lato", sans-serif;
     color: #696969;
     text-align:;

   }
   #user{
     color: grey;
     left:100px;
   }
   .content{
     background: #ffffff;
     width: 100%;
     margin-top: 12px;
     height: 500px auto;
     border-radius: 10px;
     padding: 10px 10px;
     border:8px #808080  ridge;
     float: left;

   }
   .content1{
     width: 940px;
     margin-top: 12px;
     height: 500px auto;
     border-radius: 10px;
     padding: 10px 10px;


   }
   .footer{
     background: #ffffff;
     width: 100%;
     margin-top: 12px;
     height: 70px auto;
     border-radius: 10px;
     border:8px #999999  ridge;
     left: 50px;
   }
   body {
    background: url(https://sun1-27.userapi.com/hycr7hzcNVMWLgHDEZCvBo1VLyeiK5XEjGyeaA/ymFWwRWl4Pk.jpg) ; /* https://hexcolor16.com/4a4a4a-200x200.png - просто серый подходящий фон */
    -moz-background-size: 100%;
    -webkit-background-size: 100%;
    -o-background-size: 100%;
    background-size: 100%;
  }
  @media only screen and (max-device-width: 1024px) {
      .bgimg-1, .bgimg-2, .bgimg-3 {
          background-attachment: scroll;
      }
  }
  #myBtn {

    position: fixed;
    bottom: 20px;
    right: 30px;
    z-index: 99;
    font-size: 35px;
    height: 40px;
    border: none;
    outline: none;
    background-color: #090909;
    color: white;
    cursor: pointer;
    padding: 5px;
    border-radius: 30px;
    transition: 0.5s;
  }

  #myBtn:hover {
    background-color: #ffffff;
    color: #090909;
    padding: 9px;
    border-radius: 4px;
    transition: 0.5s;
  }


.button span:after {


  color: #262626;
  position: absolute;
  opacity: 0;
  top: 0;

  transition: 0.4s;
}

.button:hover span {
  padding-right: 0px;
}

.button:hover span:after {
  opacity: 1;
  right: 0;
}
.slider {
    width: 100%;
    margin: 10px auto;
}

.slick-slide {
  margin: 0px 10px;
}

.slick-slide img {
  width: 100%;
}

.slick-prev:before,
.slick-next:before {
  color: black;
}


.slick-slide {
  transition: all ease-in-out .3s;
  opacity: .4;
}

.slick-active {
  opacity: .5;
}

.slick-current {
  opacity: 1;
}
.accordion {
    background-color: #bbb;
    color: #444;
    cursor: pointer;
    padding: 10px;
    width: 100%;
    border: none;
    text-align: left;
    outline: none;
    font-size: 30px;
    transition: 0.4s;
}
.title {
  color: grey;
}
.active, .accordion:hover {
    background-color: #eee;
}

.panel {
    padding: 10px 10px;
    display: none;
    background-color: white;
    overflow: hidden;
}
.pagination a {
    color: black;

    padding: 8px 16px;
    text-decoration: none;
    transition: background-color .3s;
    text-align: center;

}

/* Style the active/current link */
.pagination a.active {
    background-color: #090909;
    color: white;
}

/* Add a grey background color on mouse-over */
.pagination a:hover:not(.active) {background-color: #ddd;}
  </style>
  <style>

    .slider {
      position: relative;
      overflow: hidden;
      max-width: 1100px;
      margin-left: auto;
      margin-right: auto;
      text-align: center;
    }

    /* стили для обёртки, в которой заключены слайды */
    .slider__wrapper {
      position: relative;
      overflow: hidden;
    }

    /* стили для контейнера слайдов */
    .slider__items {
      display: flex;
      transition: transform 0.6s ease;
    }

    /* стили для слайдов */
    .slider__item {
      flex: 0 0 100%;
      max-width: 100%;
    }

    /* стили для кнопок "вперед" и "назад" */
    .slider__control {
      position: absolute;
      top: 50%;
      display: none;
      align-items: center;
      justify-content: center;
      width: 40px;
      color: #fff;
      text-align: center;
      opacity: 0.5;
      height: 50px;
      transform: translateY(-50%);
      background: rgba(0, 0, 0, 0.5);
    }

    .slider__control_show {
      display: flex;
    }

    .slider__control:hover,
    .slider__control:focus {
      color: #fff;
      text-decoration: none;
      outline: 0;
      opacity: 0.9;
    }

    .slider__control_prev {
      left: 0;
    }

    .slider__control_next {
      right: 0;
    }

    .slider__control::before {
      content: '';
      display: inline-block;
      width: 20px;
      height: 20px;
      background: transparent no-repeat center center;
      background-size: 100% 100%;
    }

    .slider__control_prev::before {
      background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 8 8'%3E%3Cpath d='M5.25 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3E%3C/svg%3E");
    }

    .slider__control_next::before {
      background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 8 8'%3E%3Cpath d='M2.75 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3E%3C/svg%3E");
    }

    /* стили для индикаторов */
    .slider__indicators {
      position: absolute;
      right: 0;
      bottom: 10px;
      left: 0;
      z-index: 15;
      display: flex;
      justify-content: center;
      padding-left: 0;
      margin-right: 15%;
      margin-left: 15%;
      list-style: none;
      margin-top: 0;
      margin-bottom: 0;
    }

    .slider__indicators li {
      box-sizing: content-box;
      flex: 0 1 auto;
      width: 30px;
      height: 4px;
      margin-right: 3px;
      margin-left: 3px;
      text-indent: -999px;
      cursor: pointer;
      background-color: rgba(255, 255, 255, 0.5);
      background-clip: padding-box;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
    }

    .slider__indicators li.active {
      background-color: #fff;
    }

    .img-fluid {
      display: inline-block;
      height: auto;
      max-width: 100%;
      text-align: center;
      align-items: center;

    }
  </style>
  <style>
  .row {
      display: -ms-flexbox; /* IE10 */
      display: flex;
      -ms-flex-wrap: wrap; /* IE10 */
      flex-wrap: wrap;
      padding: 0 4px;
  }

  /* Create four equal columns that sits next to each other */
  .column {
      -ms-flex: 25%; /* IE10 */
      flex: 25%;
      max-width: 25%;
      padding: 0 4px;
  }

  .column img {
      margin-top: 8px;
      vertical-align: middle;
  }

  /* Responsive layout - makes a two column-layout instead of four columns */
  @media screen and (max-width: 800px) {
      .column {
          -ms-flex: 50%;
          flex: 50%;
          max-width: 50%;
      }
  }

  /* Responsive layout - makes the two columns stack on top of each other instead of next to each other */
  @media screen and (max-width: 600px) {
      .column {
          -ms-flex: 100%;
          flex: 100%;
          max-width: 100%;
      }
  }
  .text-block {
    position: absolute;
    bottom: 20px;
    margin-left: 15%;
    width: 70%;
    background-color: black;
    color: white;
    padding-left: 20px;
    padding-right: 20px;
    opacity: 0.8;
}




.slider1 {
  position: relative;
  overflow: hidden;
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

/* стили для обёртки, в которой заключены слайды */
.slider__wrapper1 {
  position: relative;
  overflow: hidden;
}

/* стили для контейнера слайдов */
.slider__items1 {
  display: flex;
  transition: transform 0.6s ease;
}

/* стили для слайдов */
.slider__item1 {
  flex: 0 0 100%;
  max-width: 100%;
}

/* стили для кнопок "вперед" и "назад" */
.slider__control1 {
  position: absolute;
  top: 50%;
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  color: #fff;
  text-align: center;
  opacity: 0.5;
  height: 50px;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
}

.slider__control_show1 {
  display: flex;
}

.slider__control1:hover,
.slider__control1:focus {
  color: #fff;
  text-decoration: none;
  outline: 0;
  opacity: 0.9;
}

.slider__control_prev1 {
  left: 0;
}

.slider__control_next1 {
  right: 0;
}

.slider__control1::before {
  content: '';
  display: inline-block;
  width: 20px;
  height: 20px;
  background: transparent no-repeat center center;
  background-size: 100% 100%;
}

.slider__control_prev1::before {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 8 8'%3E%3Cpath d='M5.25 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3E%3C/svg%3E");
}

.slider__control_next1::before {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 8 8'%3E%3Cpath d='M2.75 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3E%3C/svg%3E");
}

/* стили для индикаторов */
.slider__indicators1 {
  position: absolute;
  right: 0;
  bottom: 10px;
  left: 0;
  z-index: 15;
  display: flex;
  justify-content: center;
  padding-left: 0;
  margin-right: 15%;
  margin-left: 15%;
  list-style: none;
  margin-top: 0;
  margin-bottom: 0;
}

.slider__indicators1 li {
  box-sizing: content-box;
  flex: 0 1 auto;
  width: 30px;
  height: 4px;
  margin-right: 3px;
  margin-left: 3px;
  text-indent: -999px;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.5);
  background-clip: padding-box;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
}

.slider__indicators1 li.active {
  background-color: #fff;
}

.img-fluid1 {
  display: inline-block;
  height: auto;
  max-width: 100%;
  text-align: center;
  align-items: center;

}
  </style>
  <script src="https://cdn.jsdelivr.net/npm/jquery@3.4.1/dist/jquery.min.js"></script>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.css" />
<script src="https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.js"></script>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
  <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
 <link rel="shortcut icon" href="icon/12.png" type="image/x-icon">
 <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/js/all.min.js" integrity="sha256-HkXXtFRaflZ7gjmpjGQBENGnq8NIno4SDNq/3DbkMgo=" crossorigin="anonymous"></script>
  </head>
  <body  >


<button onclick="topFunction()" id="myBtn" class="icofont fa fa-angle-up" title="Перенестить на верхушку страницы" ></button>
    <div class="header">
      <button class="button" id="button1" onclick="window.location='../?year=<?php echo($_GET["year"]); ?>'">Назад</button>
    </div>

    <div class="wrapper">
      <div class="footer">
        <?php
        $id = $_GET["id"];
        $year = $_GET["year"];
        $con_str=mysqli_connect('localhost:3306', 'pummemory_pummemory', 'zzGH908!', 'pummemory_persons');
  		mysqli_select_db($con_str, 'pummemory_persons') ;


        $result=mysqli_query($con_str, "SELECT * FROM `pummemory_persons`.`table 11` WHERE id='$id'");
        while($row = mysqli_fetch_array($result)){

       $col=$row['COL 5'];
       $buttonName=$row['COL 3'];
       $img=$row['COL 6'];
       $img1=$row['COL 6.1'];
       $img2=$row['COL 6.2'];
       $img3=$row['COL 6.3'];
       $user=$row['COL 2'];
       $medal=$row['COL 4'];
       if($year=="1940") {
         $col2=$row['COL 8'];
         $imag=$row['COL 9'];
         $imag1=$row['COL 9.1'];
         $imag2=$row['COL 9.2'];
       }
       if($year=="1941") {
         $col2=$row['COL 11'];
         $imag=$row['COL 12'];
         $imag1=$row['COL 12.1'];
         $imag2=$row['COL 12.2'];
       }
       if($year=="1942") {
         $col2=$row['COL 14'];
         $imag=$row['COL 15'];
         $imag1=$row['COL 15.1'];
       }
       if($year=="1943") {
         $col2=$row['COL 17'];
         $imag=$row['COL 18'];
       }
       if($year=="1944") {
         $col2=$row['COL 20'];
         $imag=$row['COL 21'];
       }
       if($year=="1945") {
         $col2=$row['COL 23'];
         $imag=$row['COL 24'];
         $imag1=$row['COL 24.1'];
         $imag2=$row['COL 24.2'];
       }
       }
      ?>
          <button class="accordion" id="Bee">Биография <?php echo $buttonName; ?></button>
<div class="panel">
  <h5><br/><?php echo $col; ?><br/><br/><?php if($medal!="")echo "Награды: &nbsp $medal"; ?></h5>

<div class="slider">
  <div class="slider__wrapper">
    <div class="slider__items">
    <?php if($img=="") echo "<h2 align='center'>У составителя статьи нет фотографий</h2>"; ?>
        <?php if ($img!="")echo "<div class='slider__item'>
          <img class='img-fluid' src='$img' >
        </div>";?>
        <?php if ($img1!="")echo "<div class='slider__item'>
          <img class='img-fluid' src='$img1' >
        </div>";?>
        <?php if ($img2!="")echo "<div class='slider__item'>
          <img class='img-fluid' src='$img2' >
        </div>";?>
        <?php if ($img3!="")echo "<div class='slider__item'>
          <img class='img-fluid' src='$img3' >
        </div>";?>
      </div>
  </div>
  <a class="slider__control slider__control_prev" href="#" role="button"></a>
  <a class="slider__control slider__control_next" href="#" role="button"></a>
</div>

<script>
  'use strict';
  var slideShow = (function () {
    return function (selector, config) {
      var
        _slider = document.querySelector(selector), // основный элемент блока
        _sliderContainer = _slider.querySelector('.slider__items'), // контейнер для .slider-item
        _sliderItems = _slider.querySelectorAll('.slider__item'), // коллекция .slider-item
        _sliderControls = _slider.querySelectorAll('.slider__control'), // элементы управления
        _currentPosition = 0, // позиция левого активного элемента
        _transformValue = 0, // значение транфсофрмации .slider_wrapper
        _transformStep = 100, // величина шага (для трансформации)
        _itemsArray = [], // массив элементов
        _timerId,
        _indicatorItems,
        _indicatorIndex = 0,
        _indicatorIndexMax = _sliderItems.length - 1,
        _stepTouch = 50,
        _config = {

          directionAutoplay: 'next', // направление смены слайдов
        };

      // настройка конфигурации слайдера в зависимости от полученных ключей
      for (var key in config) {
        if (key in _config) {
          _config[key] = config[key];
        }
      }

      // наполнение массива _itemsArray
      for (var i = 0, length = _sliderItems.length; i < length; i++) {
        _itemsArray.push({ item: _sliderItems[i], position: i, transform: 0 });
      }

      // переменная position содержит методы с помощью которой можно получить минимальный и максимальный индекс элемента, а также соответствующему этому индексу позицию
      var position = {
        getItemIndex: function (mode) {
          var index = 0;
          for (var i = 0, length = _itemsArray.length; i < length; i++) {
            if ((_itemsArray[i].position < _itemsArray[index].position && mode === 'min') || (_itemsArray[i].position > _itemsArray[index].position && mode === 'max')) {
              index = i;
            }
          }
          return index;
        },
        getItemPosition: function (mode) {
          return _itemsArray[position.getItemIndex(mode)].position;
        }
      };

      // функция, выполняющая смену слайда в указанном направлении
      var _move = function (direction) {
        var nextItem, currentIndicator = _indicatorIndex;;
        if (direction === 'next') {
          _currentPosition++;
          if (_currentPosition > position.getItemPosition('max')) {
            nextItem = position.getItemIndex('min');
            _itemsArray[nextItem].position = position.getItemPosition('max') + 1;
            _itemsArray[nextItem].transform += _itemsArray.length * 100;
            _itemsArray[nextItem].item.style.transform = 'translateX(' + _itemsArray[nextItem].transform + '%)';
          }
          _transformValue -= _transformStep;
          _indicatorIndex = _indicatorIndex + 1;
          if (_indicatorIndex > _indicatorIndexMax) {
            _indicatorIndex = 0;
          }
        } else {
          _currentPosition--;
          if (_currentPosition < position.getItemPosition('min')) {
            nextItem = position.getItemIndex('max');
            _itemsArray[nextItem].position = position.getItemPosition('min');
            _itemsArray[nextItem].transform -= _itemsArray.length * 100;
            _itemsArray[nextItem].item.style.transform = 'translateX(' + _itemsArray[nextItem].transform + '%)';
          }
          _transformValue += _transformStep;
          _indicatorIndex = _indicatorIndex - 1;
          if (_indicatorIndex < 0) {
            _indicatorIndex = _indicatorIndexMax;
          }
        }
        _sliderContainer.style.transform = 'translateX(' + _transformValue + '%)';
        _indicatorItems[currentIndicator].classList.remove('active');
        _indicatorItems[_indicatorIndex].classList.add('active');
      };

      // функция, осуществляющая переход к слайду по его порядковому номеру
      var _moveTo = function (index) {
        var i = 0, direction = (index > _indicatorIndex) ? 'next' : 'prev';
        while (index !== _indicatorIndex && i <= _indicatorIndexMax) {
          _move(direction);
          i++;
        }
      };

      // функция для запуска автоматической смены слайдов через промежутки времени
      var _startAutoplay = function () {
        if (!_config.isAutoplay) {
          return;
        }
        _stopAutoplay();
        _timerId = setInterval(function () {
          _move(_config.directionAutoplay);
        }, _config.delayAutoplay);
      };

      // функция, отключающая автоматическую смену слайдов
      var _stopAutoplay = function () {
        clearInterval(_timerId);
      };

      // функция, добавляющая индикаторы к слайдеру
      var _addIndicators = function () {
        var indicatorsContainer = document.createElement('ol');
        indicatorsContainer.classList.add('slider__indicators');
        for (var i = 0, length = _sliderItems.length; i < length; i++) {
          var sliderIndicatorsItem = document.createElement('li');
          if (i === 0) {
            sliderIndicatorsItem.classList.add('active');
          }
          sliderIndicatorsItem.setAttribute("data-slide-to", i);
          indicatorsContainer.appendChild(sliderIndicatorsItem);
        }
        _slider.appendChild(indicatorsContainer);
        _indicatorItems = _slider.querySelectorAll('.slider__indicators > li')
      };

      var _isTouchDevice = function () {
        return !!('ontouchstart' in window || navigator.maxTouchPoints);
      };

      // функция, осуществляющая установку обработчиков для событий
      var _setUpListeners = function () {
        var _startX = 0;
        if (_isTouchDevice()) {
          _slider.addEventListener('touchstart', function (e) {
            _startX = e.changedTouches[0].clientX;
            _startAutoplay();
          });
          _slider.addEventListener('touchend', function (e) {
            var
              _endX = e.changedTouches[0].clientX,
              _deltaX = _endX - _startX;
            if (_deltaX > _stepTouch) {
              _move('prev');
            } else if (_deltaX < -_stepTouch) {
              _move('next');
            }
            _startAutoplay();
          });
        } else {
          for (var i = 0, length = _sliderControls.length; i < length; i++) {
            _sliderControls[i].classList.add('slider__control_show');
          }
        }
        _slider.addEventListener('click', function (e) {
          if (e.target.classList.contains('slider__control')) {
            e.preventDefault();
            _move(e.target.classList.contains('slider__control_next') ? 'next' : 'prev');
            _startAutoplay();
          } else if (e.target.getAttribute('data-slide-to')) {
            e.preventDefault();
            _moveTo(parseInt(e.target.getAttribute('data-slide-to')));
            _startAutoplay();
          }
        });
        document.addEventListener('visibilitychange', function () {
          if (document.visibilityState === "hidden") {
            _stopAutoplay();
          } else {
            _startAutoplay();
          }
        }, false);
        if (_config.isPauseOnHover && _config.isAutoplay) {
          _slider.addEventListener('mouseenter', function () {
            _stopAutoplay();
          });
          _slider.addEventListener('mouseleave', function () {
            _startAutoplay();
          });
        }
      };

      // добавляем индикаторы к слайдеру
      _addIndicators();
      // установливаем обработчики для событий
      _setUpListeners();
      // запускаем автоматическую смену слайдов, если установлен соответствующий ключ
      _startAutoplay();

      return {
        // метод слайдера для перехода к следующему слайду
        next: function () {
          _move('next');
        },
        // метод слайдера для перехода к предыдущему слайду
        left: function () {
          _move('prev');
        },
        // метод отключающий автоматическую смену слайдов
        stop: function () {
          _config.isAutoplay = false;
          _stopAutoplay();
        },
        // метод запускающий автоматическую смену слайдов
        cycle: function () {
          _config.isAutoplay = true;
          _startAutoplay();
        }
      }
    }
  }());

  slideShow('.slider', {
    isAutoplay: true
  });
</script>





</div>

<button class="accordion" id="Bee">Фотографии, связанные с <?php echo $year; ?> годом</button>

<div class="panel">


  <div class="slider1">
    <div class="slider__wrapper1">
      <div class="slider__items1">
      <?php if($imag=="") echo "<h2 align='center'>У составителя статьи нет фотографий на этот год</h2>"; ?>
          <?php if ($imag!="")echo "<div class='slider__item1'>
            <img class='img-fluid1' src='$imag' >
          </div>";?>
          <?php if($year!="1943"&&$year!="1944"){if ($imag1!="")echo "<div class='slider__item1'>
            <img class='img-fluid1' src='$imag1' >
          </div>";
        }?>
          <?php if($year!="1943"&&$year!="1944"&&$year!="1942"){if ($imag2!="")echo "<div class='slider__item1'>
            <img class='img-fluid1' src='$imag2' >
          </div>";
        }?>
      </div>
    </div>
    <a class="slider__control1 slider__control_prev1" href="#" role="button"></a>
    <a class="slider__control1 slider__control_next1" href="#" role="button"></a>
  </div>
  </div>
  <script>
  'use strict';
  var slideShow = (function () {
    return function (selector, config) {
      var
      _slider = document.querySelector(selector), // основный элемент блока
      _sliderContainer = _slider.querySelector('.slider__items1'), // контейнер для .slider-item
      _sliderItems = _slider.querySelectorAll('.slider__item1'), // коллекция .slider-item
      _sliderControls = _slider.querySelectorAll('.slider__control1'), // элементы управления
      _currentPosition = 0, // позиция левого активного элемента
      _transformValue = 0, // значение транфсофрмации .slider_wrapper
      _transformStep = 100, // величина шага (для трансформации)
      _itemsArray = [], // массив элементов
      _timerId,
      _indicatorItems,
      _indicatorIndex = 0,
      _indicatorIndexMax = _sliderItems.length - 1,
      _stepTouch = 50,
      _config = {

        directionAutoplay: 'next1', // направление смены слайдов
      };

      // настройка конфигурации слайдера в зависимости от полученных ключей
      for (var key in config) {
        if (key in _config) {
          _config[key] = config[key];
        }
      }

      // наполнение массива _itemsArray
      for (var i = 0, length = _sliderItems.length; i < length; i++) {
        _itemsArray.push({ item: _sliderItems[i], position: i, transform: 0 });
      }

      // переменная position содержит методы с помощью которой можно получить минимальный и максимальный индекс элемента, а также соответствующему этому индексу позицию
      var position = {
        getItemIndex: function (mode) {
          var index = 0;
          for (var i = 0, length = _itemsArray.length; i < length; i++) {
            if ((_itemsArray[i].position < _itemsArray[index].position && mode === 'min') || (_itemsArray[i].position > _itemsArray[index].position && mode === 'max')) {
              index = i;
            }
          }
          return index;
        },
        getItemPosition: function (mode) {
          return _itemsArray[position.getItemIndex(mode)].position;
        }
      };

      // функция, выполняющая смену слайда в указанном направлении
      var _move = function (direction) {
        var nextItem, currentIndicator = _indicatorIndex;;
        if (direction === 'next1') {
          _currentPosition++;
          if (_currentPosition > position.getItemPosition('max')) {
            nextItem = position.getItemIndex('min');
            _itemsArray[nextItem].position = position.getItemPosition('max') + 1;
            _itemsArray[nextItem].transform += _itemsArray.length * 100;
            _itemsArray[nextItem].item.style.transform = 'translateX(' + _itemsArray[nextItem].transform + '%)';
          }
          _transformValue -= _transformStep;
          _indicatorIndex = _indicatorIndex + 1;
          if (_indicatorIndex > _indicatorIndexMax) {
            _indicatorIndex = 0;
          }
        } else {
          _currentPosition--;
          if (_currentPosition < position.getItemPosition('min')) {
            nextItem = position.getItemIndex('max');
            _itemsArray[nextItem].position = position.getItemPosition('min');
            _itemsArray[nextItem].transform -= _itemsArray.length * 100;
            _itemsArray[nextItem].item.style.transform = 'translateX(' + _itemsArray[nextItem].transform + '%)';
          }
          _transformValue += _transformStep;
          _indicatorIndex = _indicatorIndex - 1;
          if (_indicatorIndex < 0) {
            _indicatorIndex = _indicatorIndexMax;
          }
        }
        _sliderContainer.style.transform = 'translateX(' + _transformValue + '%)';
        _indicatorItems[currentIndicator].classList.remove('active');
        _indicatorItems[_indicatorIndex].classList.add('active');
      };

      // функция, осуществляющая переход к слайду по его порядковому номеру
      var _moveTo = function (index) {
        var i = 0, direction = (index > _indicatorIndex) ? 'next1' : 'prev1';
        while (index !== _indicatorIndex && i <= _indicatorIndexMax) {
          _move(direction);
          i++;
        }
      };

      // функция для запуска автоматической смены слайдов через промежутки времени
      var _startAutoplay = function () {
        if (!_config.isAutoplay) {
          return;
        }
        _stopAutoplay();
        _timerId = setInterval(function () {
          _move(_config.directionAutoplay);
        }, _config.delayAutoplay);
      };

      // функция, отключающая автоматическую смену слайдов
      var _stopAutoplay = function () {
        clearInterval(_timerId);
      };

      // функция, добавляющая индикаторы к слайдеру
      var _addIndicators = function () {
        var indicatorsContainer = document.createElement('ol');
        indicatorsContainer.classList.add('slider__indicators1');
        for (var i = 0, length = _sliderItems.length; i < length; i++) {
          var sliderIndicatorsItem = document.createElement('li');
          if (i === 0) {
            sliderIndicatorsItem.classList.add('active');
          }
          sliderIndicatorsItem.setAttribute("data-slide-to1", i);
          indicatorsContainer.appendChild(sliderIndicatorsItem);
        }
        _slider.appendChild(indicatorsContainer);
        _indicatorItems = _slider.querySelectorAll('.slider__indicators1 > li')
      };

      var _isTouchDevice = function () {
        return !!('ontouchstart' in window || navigator.maxTouchPoints);
      };

      // функция, осуществляющая установку обработчиков для событий
      var _setUpListeners = function () {
        var _startX = 0;
        if (_isTouchDevice()) {
          _slider.addEventListener('touchstart', function (e) {
            _startX = e.changedTouches[0].clientX;
            _startAutoplay();
          });
          _slider.addEventListener('touchend', function (e) {
            var
              _endX = e.changedTouches[0].clientX,
              _deltaX = _endX - _startX;
            if (_deltaX > _stepTouch) {
              _move('prev1');
            } else if (_deltaX < -_stepTouch) {
              _move('next1');
            }
            _startAutoplay();
          });
        } else {
          for (var i = 0, length = _sliderControls.length; i < length; i++) {
            _sliderControls[i].classList.add('slider__control_show1');
          }
        }
        _slider.addEventListener('click', function (e) {
          if (e.target.classList.contains('slider__control1')) {
            e.preventDefault();
            _move(e.target.classList.contains('slider__control_next1') ? 'next1' : 'prev1');
            _startAutoplay();
          } else if (e.target.getAttribute('data-slide-to1')) {
            e.preventDefault();
            _moveTo(parseInt(e.target.getAttribute('data-slide-to1')));
            _startAutoplay();
          }
        });
        document.addEventListener('visibilitychange', function () {
          if (document.visibilityState === "hidden") {
            _stopAutoplay();
          } else {
            _startAutoplay();
          }
        }, false);
        if (_config.isPauseOnHover && _config.isAutoplay) {
          _slider.addEventListener('mouseenter', function () {
            _stopAutoplay();
          });
          _slider.addEventListener('mouseleave', function () {
            _startAutoplay();
          });
        }
      };

      // добавляем индикаторы к слайдеру
      _addIndicators();
      // установливаем обработчики для событий
      _setUpListeners();
      // запускаем автоматическую смену слайдов, если установлен соответствующий ключ
      _startAutoplay();

      return {
        // метод слайдера для перехода к следующему слайду
        next: function () {
          _move('next1');
        },
        // метод слайдера для перехода к предыдущему слайду
        left: function () {
          _move('prev1');
        },
        // метод отключающий автоматическую смену слайдов
        stop: function () {
          _config.isAutoplay = false;
          _stopAutoplay();
        },
        // метод запускающий автоматическую смену слайдов
        cycle: function () {
          _config.isAutoplay = true;
          _startAutoplay();
        }
      }
    }
  }());

  slideShow('.slider1', {
    isAutoplay: true
  });
  </script>
</div>

      <div class="content">

        <h3 id="noc">История из <?php echo $year; ?> года</h3>
        <script>
        noc.style.fontWeight = "bold";

        </script>

        <?php
        $con_str=mysqli_connect('localhost:3306', 'pummemory_pummemory', 'zzGH908!', 'pummemory_persons');
  		mysqli_select_db($con_str, 'pummemory_persons') ;


        while($row = mysqli_fetch_array($result)){
        if($year=="1940") $col1=$row['COL 8'];
        if($year=="1941") $col1=$row['COL 11'];
        if($year=="1942") $col1=$row['COL 14'];
        if($year=="1943") $col1=$row['COL 17'];
        if($year=="1944") $col1=$row['COL 20'];
        if($year=="1945") $col1=$row['COL 23'];
       }
      ?>
      <h5><br/><?php echo $col2 ?></h5>
      <h6 id="user"><br/><?php echo $user ?></h6>
<br />
<nav class="text-center" aria-label="Последние новости">
        <ul class="pagination justify-content-center">
            <li><a id="br2" <?php if($year=="1940")echo "class='active'" ?> href="?year=1940&id=<?php echo $id ?>">1940</a></li>
            <li><a id="br3" <?php if($year=="1941")echo "class='active'" ?> href="?year=1941&id=<?php echo $id ?>">1941</a></li>
            <li><a id="br4" <?php if($year=="1942")echo "class='active'" ?> href="?year=1942&id=<?php echo $id ?>">1942</a></li>
            <li><a id="br5" <?php if($year=="1943")echo "class='active'" ?> href="?year=1943&id=<?php echo $id ?>">1943</a></li>
            <li><a id="br6" <?php if($year=="1944")echo "class='active'" ?> href="?year=1944&id=<?php echo $id ?>">1944</a></li>
            <li><a id="br7" <?php if($year=="1945")echo "class='active'" ?> href="?year=1945&id=<?php echo $id ?>">1945</a></li>

        </ul>
    </nav>
      </div>

      <div class="clear"></div>
    </div>
    <script>
    br1.style.fontWeight = "bold";
    br2.style.fontWeight = "bold";
    br3.style.fontWeight = "bold";
    br4.style.fontWeight = "bold";
    br5.style.fontWeight = "bold";
    br6.style.fontWeight = "bold";
    br7.style.fontWeight = "bold";
    window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            document.getElementById("myBtn").style.display = "block";
        } else {
            document.getElementById("myBtn").style.display = "none";
        }
    }
    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
    </script>
    <script>
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}
</script>
<footer id="subfooter" class="" >
  <div class="container-fluid">

    <div id="subfooter-inside" class="clearfix">
      <div class="row">
        <div class="col-md-12">
          <div class="subfooter-area">

                            <div class="region region-footer">
    <div id="block-footer" class="block block-block-content block-block-content9588d7fc-8753-4f22-83d5-35d7955b0e21">


      <div class="content1">
<br />
            <div id = "footerchic" class="clearfix text-formatted field field--name-body field--type-text-with-summary field--label-hidden field__item" style=" color: #ffffff;">© 2019 – 2021&nbsp;Сайт сделан при поддержке <a target="_blank" href="https://traektoria.mai.ru/">Технопарка МАИ</a> совместно с <a target="_blank" href="https://preduniversariy.mai.ru/">Предуниверсарием МАИ</a><br /> Время, данное на создание сайта спонсированно <a target="_blank" href="https://www.google.com/covid19/">COVID 19</a><br/><a class="text-muted" rel="nofollow" href="https://www.google.com/">Обратная связь</a>
</div>
<br />
    </div>
  </div>
<div id="block-scripts" class="block block-block-content block-block-content76badcf2-4e3a-4171-8015-57bfdf6a2a4a">


      <div class="content1">

            <div class="clearfix text-formatted field field--name-body field--type-text-with-summary field--label-hidden field__item"><!-- Yandex.Metrika counter --><script type="text/javascript">
<!--//--><![CDATA[// ><!--

(function (d, w, c) {
    (w[c] = w[c] || []).push(function() {
        try {
            w.yaCounter12726853 = new Ya.Metrika({id:12726853,
                    clickmap:true,
                    trackLinks:true,
                    accurateTrackBounce:true});
        } catch(e) { }
    });

    var n = d.getElementsByTagName("script")[0],
        s = d.createElement("script"),
        f = function () { n.parentNode.insertBefore(s, n); };
    s.type = "text/javascript";
    s.async = true;
    s.src = (d.location.protocol == "https:" ? "https:" : "http:") + "//mc.yandex.ru/metrika/watch.js";

    if (w.opera == "[object Opera]") {
        d.addEventListener("DOMContentLoaded", f, false);
    } else { f(); }
})(document, window, "yandex_metrika_callbacks");

//--><!]]>
</script></div>

    </div>
  </div>

  </div>


          </div>
        </div>
      </div>
    </div>

  </div>
</footer>
  </body>
  </html>
