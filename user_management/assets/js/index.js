$("#add_user").submit(function(event){
    //alert("Data inserted Successfully!")
    event.preventDefault();

    // Check if all required fields are filled
    let isValid = true;

    // Loop through all input fields in the form
    $("#add_user input").each(function () {
        if ($(this).val().trim() === "") {
            isValid = false;
            // Highlight the empty field (optional)
            $(this).css("border", "1px solid red");
        } else {
            $(this).css("border", ""); // Reset border if field is filled
        }
    });

    if (isValid) {
        alert("Data inserted Successfully!");
        // You can proceed with the form submission if needed
        this.submit(); // Submit the form after validation
    } else {
        alert("Please fill all required fields.");
    }
})

$("#update_user").submit(function(event){
    event.preventDefault();

    var unindexed_array=$(this).serializeArray();
    var data={}

    $.map(unindexed_array,function(n,i){
        data[n['name']]=n['value']
    })
    console.log(data);

    var request={
        "url": "http://localhost:3000/api/users/" + data.id,
        "method":"PUT",
        "data":data
    }

    $.ajax(request).done(function(response){
        alert("Data Updated Successfully")
    })
})

if (window.location.pathname === "/") {
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id");

        var request = {
            "url": `http://localhost:3000/api/users/${id}`, // Use backticks for URL
            "method": "DELETE"
        };

        if (confirm("Do you want to delete this record?")) {
            $.ajax(request).done(function(response) {
                alert("Data Deleted Successfully");
                location.reload();
            });
        }
    });
}