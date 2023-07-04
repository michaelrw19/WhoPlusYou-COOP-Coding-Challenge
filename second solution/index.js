const nameRegex = /^[a-zA-Z]+$/;
const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w]{2,3}$/;
const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
const phoneNumberRegex = /^\d{10}$/;
const addressRegex = /^\w[\w\&\.\#\-\,\s]*$/;
const cityRegex = /^[a-zA-Z][a-zA-Z\s]*$/;

const caStates = ['Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Northwest Territories', 'Nova Scotia', 'Nunavut', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan', 'Yukon'];
const usStates = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'Baker Island', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Howland Island', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Jarvis Island', 'Johnston Atoll', 'Kansas', 'Kentucky', 'Kingman Reef', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Midway Atoll', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Navassa Island', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palmyra Atoll', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'United States Minor Outlying Islands', 'United States Virgin Islands', 'Utah', 'Vermont', 'Virginia', 'Wake Island', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

caStates.forEach(function(state) {
    $("#caProvince").append(`<option value='${state}'>${state}</option>`)
})
usStates.forEach(function(state) {
    $("#usProvince").append(`<option value='${state}'>${state}</option>`)
})

function showError(event){
    $(event).css("color", "red")
    $(event).css("border-color", "red")
    $(event).siblings("div.errorMessage").css("display", "block");
}
function hideError(event){
    $(event).css("color", "black")
    $(event).css("border-color", "gray")
    $(event).siblings("div.errorMessage").css("display", "none");
}
function showErrorInputWithPrefix(event){
    showError($(event))
    $(event).css("border-width", "1px 1px 1px 0px")
    $(event).parent().find("span.input-group-text").css("border-color", "red")
    $(event).parent().siblings("div.errorMessage").css("display", "block");
}
function hideErrorInputWithPrefix(event){
    hideError($(event))
    $(event).css("border-width", "1px 1px 1px 1px")
    $(event).parent().find("span.input-group-text").css("border-color", "gray")
    $(event).parent().siblings("div.errorMessage").css("display", "none");
}

function validate(id, value) {
    if(id == "firstName" || id == "lastName") {
        return nameRegex.test(value)
    } else if (id == "email") {
        return emailRegex.test(value)
    } else if (id == "password") {
        return passwordRegex.test(value)
    } else if (id == "phoneNumber") {
        return phoneNumberRegex.test(value)
    } else if (id == "address") {
        return addressRegex.test(value)
    } else if (id == "city") {
        return cityRegex.test(value)
    } 
}

function validateForm() {
    /* Return true if an error is present, false otherwise */
    var error = false
    if(!validate($("#firstName").attr("id"), $("#firstName").val())) {
        showError($("#firstName"));
        error = true;
    } if(!validate($("#lastName").attr("id"), $("#lastName").val())) {
        showError($("#lastName"));
        error = true;
    } if(!validate($("#email").attr("id"), $("#email").val())) {
        showError($("#email"));
        error = true;
    } if(!validate($("#password").attr("id"), $("#password").val())) {
        showErrorInputWithPrefix($("#password"));
        error = true;
    } if(!validate($("#phoneNumber").attr("id"), $("#phoneNumber").val())) {
        showErrorInputWithPrefix($("#phoneNumber"));
        error = true;
    } if(!validate($("#address").attr("id"), $("#address").val())) {
        showError($("#address"));
        error = true;
    } if(!validate($("#city").attr("id"), $("#city").val())) {
        showError($("#city"));
        error = true;
    } if($("#province").val() == " ") {
        showError($("#province"));
        error = true;
    } if($("#country").val() == " ") {
        showError($("#country"));
        error = true;
    }
    return error;
}

function submitUser(){
    const error = validateForm()
    if(!error) {
        $("form").trigger("submit");
    }
}

$("#submitButton").on("click", function(){
    submitUser();
})

$("input").on("blur", function(){
    if($(this).val() == "") {
        if($(this).hasClass("inputWithPrefix")) {
            showErrorInputWithPrefix($(this))
        } else {
            showError($(this))
        }
    }
});

$("input").on("input", function(){
    const id = $(this).attr("id");
    const value = $(this).val();
    const valid = validate(id, value)
    if (valid) {
        if($(this).hasClass("inputWithPrefix")) {
            hideErrorInputWithPrefix($(this))
        } else {
            hideError($(this))
        }
    } else {
        if($(this).hasClass("inputWithPrefix")) {
            showErrorInputWithPrefix($(this))
        } else {
            showError($(this))
        }
    }
})

$("select").on("change", function(){
    $(this).trigger('blur');
})

$("select").on("focus", function(){
    if($(this).val() == " ") {
        $(this).css("color", "black")
    }
})

$("select").on("blur", function(){
    const value = $(this).val()
    if(value == " ") {
        showError($(this))
        $(this).css("color", "gray") //Should be after the code above to override color property change in showError
    } else {
        hideError($(this))
        if($(this).attr("id") == "province") {
            if(caStates.includes(value)) {
                $("#country").val("Canada")
                $("#country option[value='USA']").attr("disabled", "")
            } else {
                $("#country").val("USA")
            }
            $("#country").css("color", "black")
        }
    }
})

$("#infoIconButton").on("click", function(){
    $("#passwordInfo").fadeToggle();
})