var ConfigId;
var ConfigUrl;

if (UrlPath.length > 2) {
    NamaController = UrlPath[UrlPath.length - 2];
}
else {
    NamaController = UrlPath[UrlPath.length - 1];
}
switch (NamaController) {
    case 'config':
        ShowHomeConfig();
        break;
}

$('#btn-create-new-Config').click(function () {
    debugger

    $('#PageHome').hide(function () {
        $('#PageDetail').removeAttr('hidden');
        $('#PageDetail').show('fade');
    })

    $('#PageDetail .card-title').html("<i class='icon icon-lg' data-feather='plus-square'></i> &nbsp;New System Configuration");
    $('#btn-save-edit-config').addClass('hide');
    $('#btn-save-new-config').removeClass('hide');

    $('#txt_Type').val('');
    $('#txt_Category').val('');
    $('#txt_CategorySub').val('');
    $('#txt_Code').val('');
    $('#txt_Value').val('');
    $('#txt_Description').val('');
});

$('#btn-save-edit-config').click(function () {
    if ($('#txt_Type').val() == '') {
        Swal.fire("Validation", "Type Is Empty.", "warning");
        return
    }
    if ($('#txt_Category').val() == '') {
        Swal.fire("Validation", "Category Is Empty.", "warning");
        return
    }
    if ($('#txt_CategorySub').val() == '') {
        Swal.fire("Validation", "Category Sub Is Empty.", "warning");
        return
    }
    if ($('#txt_Code').val() == '') {
        Swal.fire("Validation", "Code Is Empty.", "warning");
        return
    }
    if ($('#txt_Value').val() == '') {
        Swal.fire("Validation", "Value Is Empty.", "warning");
        return
    }

    Swal.fire({
        title: "Do you want to save the changes?",
        text: "Save this change request ? You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it!"
    }).then((result) => {
        if (result.isConfirmed) {
            AjaxEditByIdConfig();
        }
    });

    setTimeout(function () {

        if (StData == 200) {
            Swal.fire(
                'Save!',
                'Your data has been Save.',
                'success'
            );

            ShowHomeConfig();
        }
    }, 1500);

});
$('#btn-save-new-config').click(function () {
    if ($('#txt_Type').val() == '') {
        Swal.fire("Validation", "Type Is Empty.", "warning");
        return
    }
    if ($('#txt_Category').val() == '') {
        Swal.fire("Validation", "Category Is Empty.", "warning");
        return
    }
    if ($('#txt_CategorySub').val() == '') {
        Swal.fire("Validation", "Category Sub Is Empty.", "warning");
        return
    }
    if ($('#txt_Code').val() == '') {
        Swal.fire("Validation", "Code Is Empty.", "warning");
        return
    }
    if ($('#txt_Value').val() == '') {
        Swal.fire("Validation", "Value Is Empty.", "warning");
        return
    }

    Swal.fire({
        title: "Do you want to save the changes?",
        text: "Save this change request ? You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it!"
    }).then((result) => {
        if (result.isConfirmed) {
            AjaxNewConfig();
        }
    });

    setTimeout(function () {

        if (StData == 200) {
            Swal.fire(
                'Save!',
                'Your data has been Save.',
                'success'
            );

            ShowHomeConfig();
        }
    }, 1500);
});

function ShowDetailConfig(Id) {
    $('#PageHome').hide(function () {
        $('#PageDetail').removeAttr('hidden');
        $('#PageDetail').show('fade');
    })

    $('#PageDetail .card-title').html("<i class='icon icon-lg' data-feather='edit'></i> &nbsp;Edit System Configuration");
    $('#btn-save-edit-config').removeClass('hide');
    $('#btn-save-new-config').addClass('hide');

    ConfigId = Id;
    AjaxGetByIdConfig();
}

function ShowHomeConfig() {
    $('#PageDetail').hide(function () {
        $('#PageDetail').attr('hidden');
        $('#PageHome').show('fade');
    })

    AjaxGetAllConfig();
}

function DeleteConfigById(Id) {
    Swal.fire({
        title: "Do you want to delete the changes?",
        text: "Delete this change request ? You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            AjaxDeleteByIdConfig(Id);
        }
    });

    setTimeout(function () {

        if (StData == 200) {
            Swal.fire(
                'Delete!',
                'Your data has been Delete.',
                'success'
            );

            ShowHomeConfig();
        }

    }, 1500);
}

function AjaxNewConfig() {
    var DtO = {
        Id: 0, Name: $('#txt_Type').val(), SystemCategory: $('#txt_Category').val(), SystemSubCategory: $('#txt_CategorySub').val()
        , SystemCode: $('#txt_Code').val(), SystemValue: $('#txt_Value').val(), Description: $('#txt_Description').val()
    };
    var Data = JSON.stringify(DtO);

    var Save = $.ajax({
        url: UrlOrigin + '/config/Add',
        type: 'POST',
        data: Data,
        dataType: "json",
        cache: false,
        async: false,
        contentType: 'application/json',
        processData: false,
        beforeSend: function (XMLHttpRequest) {
            showLoader('Mohon menunggu, sedang memproses data.');
        },
        error: function (request, status, error) {
            Swal.close();
            Swal.fire("Failed", "Gagal memproses data.", "error");
        }
    });

    Swal.close();
    StData = Save.status;
    if (Save.status != 200) {
        Swal.fire("Failed", "Gagal memproses data.", "error");
    }
}
function AjaxEditByIdConfig() {
    var DtO = {
        Id: ConfigId, Name: $('#txt_Type').val(), SystemCategory: $('#txt_Category').val(), SystemSubCategory: $('#txt_CategorySub').val()
        , SystemCode: $('#txt_Code').val(), SystemValue: $('#txt_Value').val(), Description: $('#txt_Description').val()
    };
    var Data = JSON.stringify(DtO);

    var Save = $.ajax({
        url: UrlOrigin + '/config/UpdateById',
        type: 'POST',
        data: Data,
        dataType: "json",
        cache: false,
        async: false,
        contentType: 'application/json',
        processData: false,
        beforeSend: function (XMLHttpRequest) {
            showLoader('Mohon menunggu, sedang memproses data.');
        },
        error: function (request, status, error) {
            Swal.close();
            Swal.fire("Failed", "Gagal memproses data.", "error");
        }
    });

    Swal.close();
    StData = Save.status;
    if (Save.status != 200) {
        Swal.fire("Failed", "Gagal memproses data.", "error");
    }
}
function AjaxGetByIdConfig() {
    var DetailId = $.ajax({
        url: UrlOrigin + '/config/GetById?Id=' + ConfigId,
        type: 'GET',
        dataType: "json",
        cache: false,
        async: false,
        contentType: false,
        processData: false,
        beforeSend: function (XMLHttpRequest) {
            showLoader('Mohon menunggu, sedang memproses data.');
        },
        error: function (request, status, error) {
            Swal.close();
            Swal.fire("Failed", "Gagal memproses data.", "error");
        }
    });

    Swal.close();
    if (DetailId.status != 200) {
        Swal.fire("Failed", "Gagal memproses data.", "error");
    }
    else {
        $('#txt_Type').val(DetailId.responseJSON.data.name);
        $('#txt_Category').val(DetailId.responseJSON.data.systemCategory);
        $('#txt_CategorySub').val(DetailId.responseJSON.data.systemSubCategory);
        $('#txt_Code').val(DetailId.responseJSON.data.systemCode);
        $('#txt_Value').val(DetailId.responseJSON.data.systemValue);
        $('#txt_Description').val(DetailId.responseJSON.data.description);
    }
}
function AjaxDeleteByIdConfig() {
    var DeleteId = $.ajax({
        url: UrlOrigin + '/config/DeledeById?Id=' + ConfigId,
        type: 'GET',
        dataType: "json",
        cache: false,
        async: false,
        contentType: false,
        processData: false,
        beforeSend: function (XMLHttpRequest) {
            showLoader('Mohon menunggu, sedang memproses data.');
        },
        error: function (request, status, error) {
            Swal.close();
            Swal.fire("Failed", "Gagal memproses data.", "error");
        }
    });

    Swal.close();

    StData = DeleteId.status;
    if (DeleteId.status != 200) {
        Swal.fire("Failed", "Gagal memproses data.", "error");
    }
}
function AjaxGetAllConfig(KeyWord) {
    showLoader('Mohon menunggu, sedang memproses data.');
    setTimeout(function () {
        if (KeyWord == undefined) {
            ConfigUrl = UrlOrigin + '/config/GetAll';
        }
        else {
            ConfigUrl = UrlOrigin + '/config/GetAll?KeyWord=' + KeyWord;
        }
        $.ajax({
            type: 'GET',
            url: ConfigUrl,
            dataType: 'json',
            cache: false,
            async: true,
            beforeSend: function (XMLHttpRequest) {
                showLoader('Mohon menunggu, sedang menyiapkan data.');
            },
            error: function (request, status, error) {
                Swal.close();
                Swal.fire("Failed", "Gagal menyiapkan data.", "error");
            },
            success: function (data) {

                if (data.error) {
                    Swal.close();
                    Swal.fire("Failed", "Gagal menyiapkan data.", "error");
                    return
                }

                $('#dataTable2').DataTable().clear().draw();

                if (data.data.listData.length != 0) {

                    var NoUrut = 1;
                    for (var i = 0; i < data.data.listData.length; i++) {
                        $('#dataTable2').DataTable().row.add([
                            '<div class="btn-group me-2" role="group" aria-label="First group">' +
                            '<button type = "button" class= "btn btn-info btn-icon-text" onclick = "ShowDetailConfig(' + data.data.listData[i].id + ')" >' +
                            '<i class="btn-icon-append" data-feather="eye"></i> View</button > ' +
                            '<button type="button" class="btn btn-danger btn-icon-text" onclick="DeleteConfigById(' + data.data.listData[i].id + ')">' +
                            '<i class="btn-icon-append" data-feather="delete"></i> Delete</button ></div > '
                            , NoUrut
                            , data.data.listData[i].name
                            , data.data.listData[i].systemCategory
                            , data.data.listData[i].systemSubCategory
                            , data.data.listData[i].systemCode
                            , data.data.listData[i].systemValue
                            , data.data.listData[i].description
                            , data.data.listData[i].creator
                            , data.data.listData[i].updater
                        ]).draw();
                        NoUrut = NoUrut + 1;
                    }
                    feather.replace();
                }

                Swal.close();


                ModelTable = $('#dataTable2').DataTable();
                new $.fn.dataTable.FixedColumns(ModelTable).left();
            }
        });
    }, 1500);
    
}