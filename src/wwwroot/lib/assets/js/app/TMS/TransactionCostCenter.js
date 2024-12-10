
//$('#btn-create-new-cost-center').click(function () {
//    window.location.replace(UrlOrigin + '/CostCenter/detail');
//});

$('#btn-create-new-cost-center').click(function () {
    $('#modal-add-fico-file').modal('show');
});

$('#btn-close-modal-add-fico-file').click(function () {
    $('#modal-add-fico-file').modal('hide');
});