var CostId;

if (UrlPath.length > 2) {
    NamaController = UrlPath[UrlPath.length - 2];
}
else {
    NamaController = UrlPath[UrlPath.length - 1];
}

switch (NamaController) {

    case 'MasterCost':
        ShowListCost();
        break;
}


$('#btn-save-new-cost').click(function () {
    if ($('#txt_CostStation').val() == '') {
        Swal.fire("Validation", "Station Is Empty.", "warning");
        return
    }
    if ($('#txt_CostCenter').val() == '') {
        Swal.fire("Validation", "Cost Center Is Empty.", "warning");
        return
    }
    if ($('#DdList_CostTipe').val() == 'All') {
        Swal.fire("Validation", "Tipe Anggaran Is Empty.", "warning");
        return
    }
    if ($('#txt_CostTahun').val() == '') {
        Swal.fire("Validation", "Tahun Anggaran Is Empty.", "warning");
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
            showLoader('Mohon menunggu, sedang memproses data.');
            setTimeout(function () {
                AjaxAddCost();
                setTimeout(function () {

                    if (StData == 200) {
                        Swal.fire(
                            'Save!',
                            'Your data has been Save.',
                            'success'
                        );

                        ShowListCost();
                    }
                }, 1500);
            }, 1500);
            
        }
    });

    
});

$('#btn-save-edit-cost').click(function () {
    if ($('#txt_CostStation').val() == '') {
        Swal.fire("Validation", "Station Is Empty.", "warning");
        return
    }
    if ($('#txt_CostCenter').val() == '') {
        Swal.fire("Validation", "Cost Center Is Empty.", "warning");
        return
    }
    if ($('#DdList_CostTipe').val() == 'All') {
        Swal.fire("Validation", "Tipe Anggaran Is Empty.", "warning");
        return
    }
    if ($('#txt_CostTahun').val() == '') {
        Swal.fire("Validation", "Tahun Anggaran Is Empty.", "warning");
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
            showLoader('Mohon menunggu, sedang memproses data.');
            setTimeout(function () {
                AjaxUpdateByIdCost();
                setTimeout(function () {

                    if (StData == 200) {
                        Swal.fire(
                            'Save!',
                            'Your data has been Save.',
                            'success'
                        );

                        ShowListCost();
                    }
                }, 1500);
            }, 1500);
            
        }
    });

    
});

$.fn.inputFilter = function (callback, errMsg) {
    
    return this.on("input keydown keyup mousedown mouseup select contextmenu drop focusout", function (e) {                
       if (callback(this.value)) {
            // Accepted value
            if (["keydown", "mousedown", "focusout"].indexOf(e.type) >= 0) {
                this.setCustomValidity("");
            }
            this.oldValue = this.value;
            this.oldSelectionStart = this.selectionStart;
            this.oldSelectionEnd = this.selectionEnd;


        } else if (this.hasOwnProperty("oldValue")) {
            // Rejected value - restore the previous one
            this.setCustomValidity(errMsg);
            this.reportValidity();
            this.value = this.oldValue;
            this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);

        } else {
            // Rejected value - nothing to restore
            this.value = "";
        }
    });
};

$("#txt_CostTahun").inputFilter(function (value) {
    return /^\d*$/.test(value);
}, "Only digits allowed");

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function format_currency(Field_ID) {
    var Nominal = Field_ID.value.replace(/,/g, "");
    if (!Number(Nominal) == false) {

        var fix_num = numberWithCommas(Number(Nominal));

        Field_ID.value = fix_num;
    }
}

function ShowListCost() {
    $('#PageDetail').hide(function () {
        $('#PageList').attr('hidden');
        $('#PageList').show('fade')
    })
    showLoader('Mohon menunggu, sedang memproses data.');
    setTimeout(function () { AjaxGetAllCost(); },1500);
    
}
function ShowDetailCost(Id) {
    
    $('#PageList').hide(function () {
        $('#PageDetail').removeAttr('hidden');
        $('#PageDetail').show('fade')
    })

    if (Id != undefined) {
        $('#PageDetail .card-title').html("<i class='icon icon-lg' data-feather='edit'></i> &nbsp;Edit Cost Center");
        $('#btn-save-new-cost').addClass('hide');
        $('#btn-save-edit-cost').removeClass('hide');
        showLoader('Mohon menunggu, sedang memproses data.');
        setTimeout(function () { AjaxGetByIdCost(Id); }, 1000);
        
    }
    else {
        $('#PageDetail .card-title').html("<i class='icon icon-lg' data-feather='plus-square'></i> &nbsp;New Cost Center");

        $('#btn-save-new-cost').removeClass('hide');
        $('#btn-save-edit-cost').addClass('hide');
        $('#txt_CostStation').val('');
        $('#txt_CostCenter').val('');
        $('#txt_CostTahun').val('');
        $('#txt_CostBudget').val('');
        $('#DdList_CostTipe').val('All').trigger('change');

    }
}
function DeleteByIdCost(Id) {
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
            showLoader('Mohon menunggu, sedang memproses data.');
            setTimeout(function () {
                AjaxDeleteByIdCost(Id);
                setTimeout(function () {

                    if (StData == 200) {
                        ShowListCost();
                    }

                }, 1500);
            }, 1500);           
            
        }
    });

    
}

function AjaxGetAllCost(KeyWord) {
    if (KeyWord == undefined) {
        FaqUrl = UrlOrigin + '/MasterCost/GetAll';
    }
    else {
        FaqUrl = UrlOrigin + '/MasterCost/GetAll?KeyWord=' + KeyWord;
    }
    
    $.ajax({
        type: 'GET',
        url: FaqUrl,
        dataType: 'json',
        cache: false,
        async: true,
        //beforeSend: function (XMLHttpRequest) {
        //    showLoader('Mohon menunggu, sedang menyiapkan data.');
        //},
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
                        
            //$('#dataTable2').DataTable().clear().draw();
            ModelTable = $('#dataTable2').DataTable();
            ModelTable.clear().draw();
            
            if (data.data.listData.length != 0) {

                var NoUrut = 1;
                for (var i = 0; i < data.data.listData.length; i++) {
                    //$('#dataTable2').DataTable().row.add([
                    ModelTable.row.add([
                        '<div class="btn-group me-2" role="group" aria-label="First group">' +
                        '<button type = "button" class= "btn btn-info btn-icon-text" onclick = "ShowDetailCost(' + data.data.listData[i].id + ')" >' +
                        '<i class="btn-icon-append" data-feather="eye"></i> View</button > ' +
                        '<button type="button" class="btn btn-danger btn-icon-text" onclick="DeleteByIdCost(' + data.data.listData[i].id + ')">' +
                        '<i class="btn-icon-append" data-feather="delete"></i> Delete</button ></div > '
                        , NoUrut
                        , data.data.listData[i].stationId
                        , data.data.listData[i].costCenter
                        , data.data.listData[i].type
                        , data.data.listData[i].tahun
                        , data.data.listData[i].creator
                        , data.data.listData[i].updater
                    ]).draw();
                    NoUrut = NoUrut + 1;
                }
                feather.replace()                
            }
            
            /*ModelTable = $('#dataTable2').DataTable();*/
            new $.fn.dataTable.FixedColumns(ModelTable).left();

            Swal.close();
        }
    });
}

function AjaxGetByIdCost(Id) {
    var DetailId = $.ajax({
        url: UrlOrigin + '/MasterCost/GetById?Id=' + Id,
        type: 'GET',
        dataType: "json",
        cache: false,
        async: false,
        contentType: false,
        processData: false,
        //beforeSend: function (XMLHttpRequest) {
        //    showLoader('Mohon menunggu, sedang memproses data.');
        //},
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
        CostId = Id;
        $('#txt_CostCenter').val(DetailId.responseJSON.data.costCenter);
        $('#txt_CostStation').val(DetailId.responseJSON.data.stationId);
        $('#DdList_CostTipe').val(DetailId.responseJSON.data.type).trigger('change');;
        $('#txt_CostTahun').val(DetailId.responseJSON.data.tahun);
    }
}

function AjaxDeleteByIdCost(Id) {
    var DeleteId = $.ajax({
        url: UrlOrigin + '/MasterCost/DeledeById?Id=' + Id,
        type: 'GET',
        dataType: "json",
        cache: false,
        async: false,
        contentType: false,
        processData: false,
        //beforeSend: function (XMLHttpRequest) {
        //    showLoader('Mohon menunggu, sedang memproses data.');
        //},
        error: function (request, status, error) {
            Swal.close();
            Swal.fire("Failed", "Gagal memproses data.", "error");
        }
    });

    Swal.close();

    StData = DeleteId.status;
    if (DeleteId.status != 200) {
        Swal.fire("Failed", "Gagal memproses data.", "error");
    } else {
        Swal.fire(
            'Delete!',
            'Your data has been Delete.',
            'success'
        );
    }
}

function AjaxUpdateByIdCost() {
    var DtO = {
        Id: CostId, CostCenter: $('#txt_CostCenter').val(), StationId: $('#txt_CostStation').val(), Type: $('#DdList_CostTipe').val(),
        Tahun: $('#txt_CostTahun').val()
    };
    var Data = JSON.stringify(DtO);

    var Save = $.ajax({
        url: UrlOrigin + '/MasterCost/UpdateById',
        type: 'POST',
        data: Data,
        dataType: "json",
        cache: false,
        async: false,
        contentType: 'application/json',
        processData: false,
        //beforeSend: function (XMLHttpRequest) {
        //    showLoader('Mohon menunggu, sedang memproses data.');
        //},
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

function AjaxAddCost() {
    var DtO = {
        Id: 0, CostCenter: $('#txt_CostCenter').val(), StationId: $('#txt_CostStation').val(), Type: $('#DdList_CostTipe').val(),
        Tahun: $('#txt_CostTahun').val()
    };
    var Data = JSON.stringify(DtO);

    var Save = $.ajax({
        url: UrlOrigin + '/MasterCost/Add',
        type: 'POST',
        data: Data,
        dataType: "json",
        cache: false,
        async: false,
        contentType: 'application/json',
        processData: false,
        //beforeSend: function (XMLHttpRequest) {
        //    showLoader('Mohon menunggu, sedang memproses data.');
        //},
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