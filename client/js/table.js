getData();

function getData() {
    $.ajax({
    url: 'http://localhost:5000/get-record',
    type: 'get',
    success: function(response) {
        var returnData = JSON.parse(response);

        if(returnData.msg === "Success!") {
            writeTable(JSON.parse(returnData.restData)); // Without using JSON.parse, the object being passed had an index for 
        } else {                                         // each character instead of each JSON object resulting in way too many  
            console.log(response);                       // rows in my table as well as a bunch of "Undefined" entries
        }
    },
    error: function(response) {
        console.log(response);
    }
});
}

function writeTable(restaurantArray) {
    var tableStr = "";
    for (var i = 0; i < restaurantArray.length; i++) {
        tableStr += "<tr>";
            tableStr += "<td>" + restaurantArray[i].restName + "</td>";
            tableStr += "<td>" + restaurantArray[i].restAddress + "</td>";
            tableStr += "<td>" + restaurantArray[i].restCity + "</td>";
            tableStr += "<td>" + restaurantArray[i].restZip + "</td>";
            tableStr += "<td>" + restaurantArray[i].restPhone + "</td>";
            tableStr += "<td>" + restaurantArray[i].restFoodType + "</td>";
            tableStr += "<td>" + restaurantArray[i].restAvgCustRating + "</td>";
            tableStr += "<td><button class='deleteRec' data-ID='" + restaurantArray[i].id + "'>Delete</button></td>"
        tableStr += "</tr>";
    }

    $('#tableBody').html(tableStr);

    enableDelete();
}




function enableDelete() {

    $('.deleteRec').click(function() {

        var id = this.getAttribute('data-ID');
        console.log(id);
        $.ajax({
            url: 'http://localhost:5000/delete-record',
            type: 'delete',
            data: {id:id},
            success: function(response) {
                var returnData = JSON.parse(response);
    
                if(returnData.msg === "Success!") {
                    console.log("Success"); 
                    getData();  
                } else {                                           
                    console.log(response);                       
                }
            },
            error: function(response) {
                console.log(response);
            }
        });
    });
}
