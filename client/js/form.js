$('#submit').click(function() {
    var formData = {
        restName: $('#restName').val(),
        restAddress: $('#restAddress').val(),
        restCity: $('#restCity').val(),
        restZip: $('#restZip').val(),
        restPhone: $('#restPhone').val(),
        restFoodType: $('#restFoodType').val(),
        restAvgCustRating: $('#restAvgCustRating').val()
    };

    $.ajax({
        url: 'http://localhost:5000/write-record',
        type: 'post',
        data: formData,
        success: function(response) {
            var returnData = JSON.parse(response);

            if(returnData.msg === "Success!") {
                alert("Success");
                console.log("Success");
            } else {
                console.log(response);
            }
        },
        error: function(response) {
            console.log(response);
        }
    });
    return false;
});