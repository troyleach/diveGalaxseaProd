var HEADERS={headers:{Authorization:'Token "b32b59ec8d08206981481033e1d6cac3"'}},URL="https://staging-divegalaxsea.herokuapp.com/",WEATHER_URL="http://api.worldweatheronline.com/free/v2/weather.ashx?q=20.511138%2C-86.949234&format=json&num_of_days=5&key=91e6dc741ca2f99fa18e1408ee471",WEATHER_MARINE_URL="http://api.worldweatheronline.com/free/v2/marine.ashx?q=20.511138%2C-86.949234&format=json&key=91e6dc741ca2f99fa18e1408ee471";!function(){"use strict";var e=angular.module("myApp",["ngRoute","myApp.utilityService","myApp.constants","myApp.directives","myApp.filters","myApp.services","myApp.controller","ngSanitize","jkuri.gallery","ngAnimate","ui.bootstrap","gm.datepickerMultiSelect","ui.mask","checklist-model","angularSpinner","ngIntlTelInput"]);e.config(["ngIntlTelInputProvider",function(e){e.set({defaultCountry:"us"})}]),e.config(["$routeProvider",function(e){e.when("/admin",{templateUrl:"partials/admin.html",controller:"AdminCtrl",controllerAs:"admin",resolve:{auth:["$q","AuthenticationService","$location",function(e,i,t){var r=i.getUserInfo();return r?e.when(r):(window.localStorage.alerts="Not a Authorized Diver",window.localStorage.alertType="alert-danger",t.path("/home"),e.reject({authenticated:!1}))}]}}),e.when("/home",{templateUrl:"partials/home.html",controller:"HomeCtrl",controllerAs:"home"}),e.when("/reef_map",{templateUrl:"partials/reef_map.html",controller:"ReefMapCtrl",controllerAs:"reefMap"}),e.when("/current_pricing",{templateUrl:"partials/current_pricing.html",controller:"CurrentPricingCtrl",controllerAs:"pricing"}),e.when("/about_cozumel",{templateUrl:"partials/about_cozumel.html",controller:"AboutCozumelCtrl",controllerAs:"aboutCozumel"}),e.when("/gallery",{templateUrl:"partials/gallery.html",controller:"GalleryCtrl",controllerAs:"gallery"}),e.when("/reservations",{templateUrl:"partials/reservations.html",controller:"ReservationsCtrl",controllerAs:"reservation"}),e.otherwise({redirectTo:"/home"})}]),e.run(["$rootScope","$location",function(e,i){e.$on("$routeChangeSuccess",function(e){console.log(e)}),e.$on("$routeChangeError",function(e,t,r,n){n.authenticated===!1&&(console.log("do I end up hre at some point"),i.path("/login"))})}])}(),function(){"use strict";var e=angular.module("myApp.controller",[]);e.controller("IndexCtrl",["$scope","getWeatherFactory","$uibModal","AuthenticationService","$location","$window",function(e,i,t,r,n,s){function o(e){var i;return angular.forEach(c.weatherDescMap,function(t,r){r==e&&(i=t)}),i}function a(e){var i=new Date(e),t=["Sun","Mon","Tue","Wed","Thur","Fri","Sat"],r=t[i.getUTCDay()];return r}var c=this;c.tempScale=!0,c.tripAdvisorReview=["You looking for a great, custom experience rather than a cattle boat in CZM???? Call Kim. But do it before you get there... the word will get out and she'll fill up.","Kim truly is a pro. I did my open water dives with her last week. She was prepared, knowledgable, reassuring, relaxed, professional, and funny. The time under and above water with her was great."],c.daysOfTheWeek=[],c.weatherInCity="Current Weather in Cozumel...",c.weatherDescMap={395:'<i class="wi wi-snow"></i>',392:'<i class="wi wi-snow"></i>',389:'<i class="wi wi-thunderstorm"></i>',386:'<i class="wi wi-thunderstorm"></i>',377:'<i class="wi wi-showers"></i>',374:'<i class="wi wi-showers"></i>',371:'<i class="wi wi-snow"></i>',368:'<i class="wi wi-snow"></i>',365:'<i class="wi wi-sleet"></i>',362:'<i class="wi wi-sleet"></i>',359:'<i class="wi wi-thunderstorm"></i>',356:'<i class="wi wi-thunderstorm"></i>',353:'<i class="wi wi-showers"></i>',350:'<i class="wi wi-snow"></i>',338:'<i class="wi wi-snow"></i>',335:'<i class="wi wi-snow"></i>',332:'<i class="wi wi-snow"></i>',329:'<i class="wi wi-snow"></i>',326:'<i class="wi wi-snow"></i>',323:'<i class="wi wi-snow"></i>',320:'<i class="wi wi-sleet"></i>',317:'<i class="wi wi-sleet"></i>',314:'<i class="wi wi-day-showers"></i>',311:'<i class="wi wi-day-showers"></i>',308:'<i class="wi wi-storm-showers"></i>',305:'<i class="wi wi-day-showers"></i>',302:'<i class="wi wi-day-showers"></i>',299:'<i class="wi wi-day-showers"></i>',296:'<i class="wi wi-day-showers"></i>',293:'<i class="wi wi-day-showers"></i>',284:'<i class="wi wi-sleet"></i>',281:'<i class="wi wi-sleet"></i>',266:'<i class="wi wi-sleet"></i>',263:'<i class="wi wi-sleet"></i>',260:'<i class="wi wi-day-fog"></i>',248:'<i class="wi wi-fog"></i>',230:'<i class="wi wi-day-snow-wind"></i>',227:'<i class="wi wi-day-snow-wind"></i>',200:'<i class="wi wi-thunderstorm"></i>',185:'<i class="wi wi-day-sleet"></i>',182:'<i class="wi wi-day-sleet"></i>',179:'<i class="wi wi-snow"></i>',176:'<i class="wi wi-showers"></i>',143:'<i class="wi wi-day-sleet"></i>',122:'<i class="wi wi-cloudy"></i>',119:'<i class="wi wi-cloudy"></i>',116:'<i class="wi wi-day-cloudy"></i>',113:'<i class="wi wi-day-sunny"></i>'},window.sessionStorage.userInfo?this.isLoggedIn=!0:this.isLoggedIn=!1,c.toggleTemperature=function(e){"farenheit"===e?c.tempScale=!0:c.tempScale=!1},i.getWeather().then(function(e){for(var i=e.data.weather,t=0;t<i.length;t++)c.daysOfTheWeek.push({date:i[t].date,weekDay:a(i[t].date),maxtempC:i[t].maxtempC,maxtempF:i[t].maxtempF,mintempC:i[t].mintempC,mintempF:i[t].mintempF,weatherCode:o(i[t].hourly[3].weatherCode)});return c.currentWeather=c.daysOfTheWeek.splice(0,1),c.daysOfTheWeek}),i.getMarineWeather().then(function(e){var i=e.data.weather[0].hourly[3];return c.marineWeather={humidity:i.humidity,waterTempC:i.waterTemp_C,waterTempF:i.waterTemp_F,weatherDesc:i.weatherDesc[0].value,windDir:i.winddir16Point,windSpeed:i.windspeedMiles},c.marineWeather}),this.userLogin=function(){e.message="Show Form Button Clicked ONE this happens when user clicks admin login",console.log(e.message);var i=t.open({templateUrl:"/partials/modal/login.html",controller:"LoginCtrl",scope:e});i.result.then(function(e){r.login(e.useremail,e.password);console.log("there i am after sign in"),n.path("/admin"),window.location.reload()},function(){$log.info("Modal dismissed at: "+new Date)})},this.userLogout=function(){window.sessionStorage.clear(),n.path("/home"),window.location.reload()}}])}(),function(){"use strict";var e=angular.module("myApp.controller");e.controller("HomeCtrl",["$scope","getWeatherFactory","$window","$uibModal",function(e,i,t,r){this.pageIdentifier="Home",this.panelTitle="Explore the Mystical Underwater World of Cozumel with Dive GalaxSea",this.alertType=window.localStorage.alertType,this.alertMsg=window.localStorage.alerts,localStorage.clear()}])}(),function(){"use strict";var e=angular.module("myApp.controller");e.controller("ReefMapCtrl",["$scope",function(e){this.pageIdentifier="Reef Map",this.panelTitle="Don't Imagine Paradise, Visit Cozumel!"}])}(),function(){"use strict";var e=angular.module("myApp.controller");e.controller("CurrentPricingCtrl",["$scope","getPricingFactory","usSpinnerService",function(e,i,t){var r=this;r.showSpinner=!0,r.pageIdentifier="Current Pricing",r.panelTitle="Learn About our Scuba Dive Courses & Diving Rates",r.diving="partials/pricing_partials/diving.html",r.rental="partials/pricing_partials/rental_gear.html",r.training="partials/pricing_partials/training.html",r.policies="partials/pricing_partials/policies.html",i.getDivingPricing().then(function(e){r.currentPricingDiving=e}),i.getTrainingPricing().then(function(e){r.currentPricingTraining=e}),i.getRentalPricing().then(function(e){r.currentPricingRentals=e}),i.getSpecialtiesPricing().then(function(e){r.showSpinner=!1,r.currentPricingSpecialties=e}),i.getMiscellaneousPricing().then(function(e){r.showSpinner=!1;var i=e;r.parkFee=i[0].price})}])}(),function(){"use strict";var e=angular.module("myApp.controller");e.controller("AboutCozumelCtrl",["$scope",function(e){this.pageIdentifier="About Cozumel",this.panelTitle="Go Diving in Cozumel and Explore the Mesmerizing Coral Reefs!"}])}(),function(){"use strict";var e=angular.module("myApp.controller");e.controller("GalleryCtrl",["$scope",function(e,i){var t=this;t.pageIdentifier="Gallery",t.panelTitle="Explore the Underwater Galaxy of Cozumel",t.picOfTheMonth={src:"images/img15.jpg",title:"Picture of the Month",description:"Contrats to Judi",user:"Troy Leach"},t.images=[{thumb:"images/img1.jpg",img:"images/img1.jpg"},{thumb:"images/img2.jpg",img:"images/img2.jpg"},{thumb:"images/img3.jpg",img:"images/img3.jpg"},{thumb:"images/img4.jpg",img:"images/img4.jpg"},{thumb:"images/img8.jpg",img:"images/img8.jpg"},{thumb:"images/img6.jpg",img:"images/img6.jpg"},{thumb:"images/img9.jpg",img:"images/img9.jpg"},{thumb:"images/img10.jpg",img:"images/img10.jpg"},{thumb:"images/img11.jpg",img:"images/img11.jpg"},{thumb:"images/img12.jpg",img:"images/img12.jpg"},{thumb:"images/img13.jpg",img:"images/img13.jpg"},{thumb:"images/img14.jpg",img:"images/img14.jpg"}]}])}(),function(){"use strict";var e=angular.module("myApp.controller");e.controller("ReservationsCtrl",["$scope","$http","$route","$location","$window","getPricingFactory",function(e,i,t,r,n,s){var o=this;o.showspinner=!1,o.pageIdentifier="Reservations",o.panelTitle="kim@divegalaxsea.com | 52-987-112-9630 | From the US: 011-52-1-987-112-9630",o.checkboxModel=!1,o.user={firstName:void 0,lastName:void 0,email:void 0,selectedDiving:[],selectedTraining:[],selectedDates:[]},o.checkFirst=function(){o.user.selectedDiving.splice(0,o.user.selectedDiving.length),o.user.selectedDiving.push("guest")},s.getDivingPricing().then(function(e){o.diving=e}),s.getTrainingPricing().then(function(e){o.training=e}),s.getRentalPricing().then(function(e){o.rentals=e}),s.getSpecialtiesPricing().then(function(e){o.specialties=e}),o.twoTank=!1,o.reset=function(){o.user={}},o.saveData=function(){o.showspinner=!0;var e={user:{first_name:o.user.firstName,last_name:o.user.lastName,email:o.user.email,phone:o.user.phone,comments:o.user.message,vacations_attributes:[{dates_array:o.user.selectedDates,diving_objects:o.user.selectedDiving,training_objects:o.user.selectedTraining,number_of_divers:o.user.numberOfDivers,resort:o.user.resort}]}};i.post(URL+"users",e).success(function(e,i){o.showSpinner=!1,n.localStorage.setItem("alerts"," I have your information and I will contact you shortly."),n.localStorage.setItem("alertType","Success!"),n.location.href="/"}).error(function(e,i){console.log(i)})},o.addDiving=function(e){o.user.selectedDiving.push(e)},o.activeDate=null,o.selectedDates=[(new Date).setHours(0,0,0,0)],o.type="individual",o.removeFromSelected=function(e){o.user.selectedDates.splice(o.user.selectedDates.indexOf(e),1)},e.roles=["guest","user","customer","admin"],e.user={roles:["user"]},e.checkAll=function(){e.user.roles=angular.copy(e.roles)},e.uncheckAll=function(){e.user.roles=[]},e.checkFirst=function(){e.user.roles.splice(0,e.user.roles.length),e.user.roles.push("guest")}}])}(),function(){"use strict";var e=angular.module("myApp.controller");e.controller("AdminCtrl",["$scope","getWeatherFactory","$window","getPricingFactory","updatePricingFactory","$uibModal","$log",function(e,i,t,r,n,s,o){var a=this;this.pageIdentifier="Admin Dashboard",this.panelTitle="Single Day Rates",a.singleDay="partials/edit_pricing_partials/single_day.html",a.rentalGear="partials/edit_pricing_partials/rental_gear.html",a.training="partials/edit_pricing_partials/training.html",a.specialties="partials/edit_pricing_partials/specialties.html",a.miscellaneous="partials/edit_pricing_partials/miscellaneous_pricings.html",e.editPrice=function(i,t){e.message="Show Form Button Clicked",console.log(e.message),e.pricing_object=i,e.category=t+"Ctrl";var r=s.open({templateUrl:"/partials/modal/edit_single_day_rates.html",controller:e.category,scope:e,resolve:{userForm:function(){return e.userForm}}});r.result.then(function(i){var t={},r={SpecialtiesCtrl:"specialty",TrainingsCtrl:"training",DivingsCtrl:"diving",MiscellaneousCtrl:"miscellaneous_pricing",RentalsCtrl:"rental"},s=r[e.category];t.id=i.id,t[s]={title:i.title,price:i.price,description:i.description},"SpecialtiesCtrl"==e.category?n.updateSpecialtiesPricing(t):"TrainingsCtrl"==e.category?n.updateTrainingsPricing(t):"RentalsCtrl"==e.category?n.updateRentalsPricing(t):"DivingsCtrl"==e.category?n.updateDivingsPricing(t):"MiscellaneousCtrl"==e.category&&n.updateMiscellaneousPricing(t)},function(){o.info("Modal dismissed at: "+new Date)})},r.getDivingPricing().then(function(e){a.currentPricingDiving=e}),r.getTrainingPricing().then(function(e){a.currentPricingTraining=e}),r.getRentalPricing().then(function(e){a.currentPricingRentals=e}),r.getSpecialtiesPricing().then(function(e){a.currentPricingSpecialties=e}),r.getMiscellaneousPricing().then(function(e){a.currentPricingMiscellaneous=e})}])}(),function(){"use strict";var e=angular.module("myApp.controller");e.controller("SpecialtiesCtrl",["$scope","$modalInstance","userForm",function(e,i,t,r){e.form={},e.pricing=e.stuff,e.submitForm=function(){e.form.userForm.$valid?(console.log("user form is in scope"),i.close(e.pricing)):console.log("userform is not in scope")},e.cancel=function(){i.dismiss("cancel")}}])}(),function(){"use strict";var e=angular.module("myApp.controller");e.controller("TrainingsCtrl",["$scope","$modalInstance","userForm",function(e,i,t,r){e.pricing=e.stuff,e.submitForm=function(){e.form.userForm.$valid?(console.log("user form is in scope"),i.close(e.pricing)):console.log("userform is not in scope")},e.cancel=function(){i.dismiss("cancel")}}])}(),function(){"use strict";var e=angular.module("myApp.controller");e.controller("RentalsCtrl",["$scope","$modalInstance","userForm",function(e,i,t,r){e.pricing=e.stuff,e.submitForm=function(){e.form.userForm.$valid?(console.log("user form is in scope"),i.close(e.pricing)):console.log("userform is not in scope")},e.cancel=function(){i.dismiss("cancel")}}])}(),function(){"use strict";var e=angular.module("myApp.controller");e.controller("DivingsCtrl",["$scope","$modalInstance","userForm",function(e,i,t,r){e.pricing=e.pricing_object,e.submitForm=function(){e.form.userForm.$valid?(console.log("user form is in scope"),i.close(e.pricing)):console.log("userform is not in scope")},e.cancel=function(){i.dismiss("cancel")}}])}(),function(){"use strict";var e=angular.module("myApp.controller");e.controller("MiscellaneousCtrl",["$scope","$modalInstance","userForm",function(e,i,t,r){e.pricing=e.stuff,e.submitForm=function(){e.form.userForm.$valid?(console.log("user form is in scope"),i.close(e.pricing)):console.log("userform is not in scope")},e.cancel=function(){i.dismiss("cancel")}}])}(),function(){"use strict";var e=angular.module("myApp.controller");e.controller("LoginCtrl",["$scope","$modalInstance","AuthenticationService","$window",function(e,i,t,r,n){e.submit=function(){e.loginForm.$valid?i.close(e.credentials):console.log("userform is not in scope")},e.cancel=function(){i.dismiss("cancel")}}])}(),function(){"use strict";var e=angular.module("myApp.services",[]);e.factory("getWeatherFactory",["$http","$q",function(e,i){return{getWeather:function(){var t=i.defer();return e.get(WEATHER_URL).success(function(e){t.resolve(e)}).error(function(){t.reject()}),t.promise},getMarineWeather:function(){var t=i.defer();return e.get(WEATHER_MARINE_URL).success(function(e){t.resolve(e)}).error(function(){t.reject()}),t.promise}}}])}.call(this),function(){"use strict";var e=angular.module("myApp.services");e.factory("getPricingFactory",["$http","$q",function(e,i){return{getDivingPricing:function(){var t=i.defer();return e.get(URL+"divings",HEADERS).success(function(e){t.resolve(e)}).error(function(){t.reject()}),t.promise},getTrainingPricing:function(){var t=i.defer();return e.get(URL+"trainings",HEADERS).success(function(e){t.resolve(e)}).error(function(){t.reject()}),t.promise},getRentalPricing:function(){var t=i.defer();return e.get(URL+"rentals",HEADERS).success(function(e){t.resolve(e)}).error(function(){t.reject()}),t.promise},getSpecialtiesPricing:function(){var t=i.defer();return e.get(URL+"specialties",HEADERS).success(function(e){t.resolve(e)}).error(function(){t.reject()}),t.promise},getMiscellaneousPricing:function(){var t=i.defer();return e.get(URL+"miscellaneous_pricings",HEADERS).success(function(e){t.resolve(e)}).error(function(){t.reject()}),t.promise}}}])}.call(this),function(){"use strict";var e=angular.module("myApp.services");e.factory("updatePricingFactory",["$http","$q",function(e,i){return{updateDivingsPricing:function(t){var r=i.defer();return e.patch(URL+"divings/"+t.id,t,HEADERS).success(function(e){r.resolve(e)}).error(function(){r.reject()}),r.promise},updateRentalsPricing:function(t){var r=i.defer();return e.patch(URL+"rentals/"+t.id,t,HEADERS).success(function(e){r.resolve(e)}).error(function(){r.reject()}),r.promise},updateTrainingsPricing:function(t){var r=i.defer();return e.patch(URL+"trainings/"+t.id,t,HEADERS).success(function(e){r.resolve(e)}).error(function(){r.reject()}),r.promise},updateSpecialtiesPricing:function(t){var r=i.defer();return e.patch(URL+"specialties/"+t.id,t,HEADERS).success(function(e){r.resolve(e)}).error(function(){r.reject()}),r.promise},updateMiscellaneousPricing:function(t){var r=i.defer();return e.patch(URL+"miscellaneous_pricings/"+t.id,t,HEADERS).success(function(e){r.resolve(e)}).error(function(){r.reject()}),r.promise}}}])}.call(this),function(){"use strict";var e=angular.module("myApp.services");e.factory("AuthenticationService",["$http","$q","$window",function(e,i,t){function r(r,n){var s=i.defer(),o={users_information:{email:r,password:n}};return e.post(URL+"login",o,HEADERS).then(function(e){a={accessToken:e.data.access_token},t.sessionStorage.userInfo=JSON.stringify(a),s.resolve(a)},function(e){window.localStorage.alerts="Not a Authorized Diver",window.localStorage.alertType="alert-danger",s.reject(e)}),s.promise}function n(){var r=i.defer();return e({method:"POST",url:URL+"logout",headers:{access_token:a.accessToken}}).then(function(e){a=null,t.sessionStorage.userInfo=null,r.resolve(e)},function(e){r.reject(e)}),r.promise}function s(){return a}function o(){t.sessionStorage.userInfo&&(a=JSON.parse(t.sessionStorage.userInfo))}var a;return o(),{login:r,logout:n,getUserInfo:s}}])}.call(this),function(){"use strict";var e=angular.module("myApp.directives",[]);e.directive("sampleDirective",["$scope",function(e){return{restrict:"E",transclude:!0,scope:{},controller:function(e){},link:function(e,i,t){},replace:!0,templateUrl:""}}])}(),function(){"use strict";var e=angular.module("myApp.filters",[]);e.filter("simpleFilter",function(){return function(e){try{}catch(i){console.log("utcToDate :::::: ERROR: "+i)}return e}})}(),function(){"use strict";var e=angular.module("myApp.constants",[]);e.constant("liaisonConstants",{appName:"Liaison My Psych Track",loginErrorUsernamePassword:"You must enter username and password to log in",loginErrorInvalidCredentials:"Invalid credentials,Try Again!"})}(),function(){"use strict";var e=angular.module("myApp.utilityService",[]);e.service("utilService",["$timeout",function(e){this.showLoader=function(){e(function(){},2e3)},this.dismissProgress=function(){e(function(){},2e3)}}])}(),$(document).ready(function(){$(".picture-carousel").slick({autoplay:!0}),$(".autoplay").slick({slidesToShow:1,slidesToScroll:1,autoplay:!0,autoplaySpeed:2e3})});