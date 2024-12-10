function render_wait() {
    $('#Modal_load').modal('show');

}

function clear_wait() {

    $('#Modal_load').modal("hide");
    $(".info-wait").html("Please Wait ...");

}