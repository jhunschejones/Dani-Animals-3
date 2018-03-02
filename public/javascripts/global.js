// setting up array variable for data
var animalListData = [];

$(document).ready(function() {
    // call populate table on page load
    populateTable();
    // Animal name link click
    $('#animalList table tbody').on('click', 'td a.linkshowanimal', showAnimalInfo);
    // Add animal button click
    $('#btnAddAnimal').on('click', addAnimal);
    // Delete animal link click
    $('#animalList table tbody').on('click', 'td a.linkdeleteanimal', deleteAnimal);
})


function populateTable(){
    var tableContent = '';

    // adding rows and cells for each item in JSON
    // remember, this URL is where the router is pulling the data
    $.getJSON( '/users/animallist', function( data ) {
        animalListData = data;
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowanimal" rel="' + this.name + '"> '+ this.name + '</a></td>';
            tableContent += '<td>' + this.age + '</td>';
            tableContent += '<td>' + this.type + '</td>';
            tableContent += '<td><a href="#" class="linkdeleteanimal" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>'
        })

        // insert table content into table
        $('#animalList table tbody').html(tableContent);
    })
}

function showAnimalInfo(event) {
    // preven'ts the link from firing
    event.preventDefault();
    // retrieve username from link rel atribute
    var thisAnimalName = $(this).attr('rel');
    // Get index of ojbect based on id
    var arrayPosition = animalListData.map(function(arrayItem){ return arrayItem.name }).indexOf(thisAnimalName);

    var thisAnimalObject = animalListData[arrayPosition];

    // Populate Info Box
    $('#animalInfoName').text(thisAnimalObject.name);
    $('#animalInfoAge').text(thisAnimalObject.age);
    $('#animalInfoType').text(thisAnimalObject.type)
    $('#animalInfoFood').text(thisAnimalObject.food)
    $('#animalInfoColor').text(thisAnimalObject.color);
};

function addAnimal(event) {
    event.preventDefault();

    var errorCount = 0;
    $('#addAnimal input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    if(errorCount === 0) {
        var newAnimal = {
            'name': $('#addAnimal fieldset input#inputAnimalName').val(),
            'age': $('#addAnimal fieldset input#inputAnimalAge').val(),
            'type': $('#addAnimal fieldset input#inputAnimalType').val(),
            'food': $('#addAnimal fieldset input#inputAnimalFood').val(),
            'color': $('#addAnimal fieldset input#inputAnimalColor').val()
        }

        // Use AJAX to post the object to our addanimal service
        $.ajax({
            type: 'POST',
            data: newAnimal,
            url: 'users/addanimal',
            dataType: 'JSON'
        }).done(function( response ){
            if (response.msg === '') {
                // Clear form inputs
                $('#addAnimal fieldset input').val('');

                // Update the table
                populateTable();
            }
            else {
                // Sending alert if something goes wrong
                alert('Error: ' + response.msg);
            }
        });
    }
    else {
        // Here's the error if a field is blank
        alert('Please fill in all the fields.');
        return false;
    }
};

// Delete animal
function deleteAnimal(event) {
    event.preventDefault();

    // Raise a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this friend?');

    // Check if the user confirmed
    if (confirmation === true) {
        
        //Preform the delete
        $.ajax({
            type: 'DELETE',
            url: '/users/deleteanimal/' + $(this).attr('rel')
        }).always(function( response ) {
            // Check if delete was successful i.e. blank response
            if (response.msg === '') {
                // nothing left to do!
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table either way
            populateTable();
        });
    }
    else {
        // if the user says no, do nothing
        return false;
    }
};
