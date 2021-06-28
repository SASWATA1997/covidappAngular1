const URL1="https://covid19.mathdro.id/api";
let app = angular.module("MyApp",[]);

app.controller("MyCtrl",($scope,$http) => {
    //this is controller

    $scope.title="stay home stay safe";
    $scope.showhome = true;
    $scope.showreprt = false;
    $scope.showmed = false;
    $scope.showcheck = false;
$scope.getShow1 = function() {
        $scope.showhome = true;
        $scope.showreprt = false;
        $scope.showmed = false;
        $scope.showcheck = false;
        $scope.active='home';
    }
    $scope.getShow2 = function() {
        $scope.showhome=false
        $scope.showreprt = true;
        $scope.showmed = false;
        $scope.showcheck = false;
        $scope.active='report';
    }
    $scope.getShow3 = function() {
        $scope.showhome=false;
        $scope.showreprt=false;
        $scope.showmed = true;
        $scope.showcheck=false;
        $scope.active='medicine';
    }
    $scope.getShow4 = function() {
        $scope.showcheck = true;
        $scope.showhome=false;
        $scope.showreprt=false;
        $scope.showmed=false;
        $scope.active='check';
    }
    $http.get(URL1).then( (response)=>{

        //success
        console.log("inside success");
        console.log(response.data);

        $scope.all_data= response.data;
    },
    (error)=>{

        //error
        console.log(error);

    } 
    
    );
   

    //get country data

  $scope.get_c_data = ({ch}) => {

    console.log($scope.ch);
    let country= $scope.country;

    $scope.country = ch;
    let country_url= "https://covid19.mathdro.id/api/countries/"+country;
    if(country == " "){
        return;

    }
    $http.get(country_url).then( (response)=>{

        //success
        console.log("inside success");
        console.log(response.data);

        $scope.c_data= response.data;
    },
    (error)=>{

        //error
        console.log(error);

    } 
    
    );

  };

  //CHECK BOX

    
  $scope.services = [
    {
        name: 'MASK',
        active:true
    },{
        name: 'SOCIAL DISTANCE',
        active:false
    },{
        name: 'HANDWASH',
        active:false
    },{
        name: 'VACCINE',
        active:false
    }
];

$scope.toggleActive = function(s){
    s.active = !s.active;
};

// Helper method for calculating the total price

$scope.total = function(){

    var item=0

    var total = 0;

    // Use the angular forEach helper method to
    // loop through the services array:

    angular.forEach($scope.services, function(s){
        if (s.active){
           // total+= s.price;
            item++;
            if(s.name=="VACCINE")
            {
                $scope.msg="FULLY SECURED IF YOU WASH HAND WEAR MASK & MADE SOCIAL DISTANCE OTHERWISE PARITALLY SECURED WITH HEALTH RISK";
            }
            else if(item==1)
           {
            $scope.msg="PARTIALLY SECURED WITH HEALTH ISSUE";
           }
           else if(item>1)
           {
            $scope.msg="PARTIALLY SECURED BUT HAVE RISK";
           }
           else
           {
               $scope.msg="please select 1"
           }
        }
        //$scope.msg="abce";
    });

    //return  $scope.msg ;
};


//----  END CHECK BOX
  
}
);

//scripting for grid view

var elements = document.getElementsByClassName("column");

// Declare a loop variable
var i;

// List View
function listView() {
  for (i = 0; i < elements.length; i++) {
    elements[i].style.width = "70%";
  }
}

// Grid View
function gridView() {
  for (i = 0; i < elements.length; i++) {
    elements[i].style.width = "30%";
  }
}

/* Optional: Add active class to the current button (highlight it) */
var container = document.getElementById("btnContainer");
var btns = container.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}
