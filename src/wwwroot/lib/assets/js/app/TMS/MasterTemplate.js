
var TemplateId;
var NamaController;

$(function () {
    if (UrlPath.length > 2) {
        NamaController = UrlPath[UrlPath.length - 2];
    }
    else {
        NamaController = UrlPath[UrlPath.length - 1];
    }
    //switch (UrlPath[UrlPath.length - 1]) {
    switch (NamaController) {

        case 'MasterTemplate':            
            GetAllTemplate();          
            break;
    }


    $('#btn-create-new-template-email-notification').click(function () {
        ShowDetailTemplate();
        return
        $("#Modal_Template .modal-title").html("<i class='icon icon-lg' data-feather='plus-square'></i> &nbsp;New Template Notification");
        feather.replace();
        $('#Modal_Template').modal('toggle');

        $('#btn-save-new').removeClass('hide');
        $('#btn-save-edit').addClass('hide');
        /*$('#btn-faq').addClass('hide');*/

        $('#txt_Tipe').val('');
        $('#txt_Subject').val('');
        $('#txt_Description').val('');
        tinymce.activeEditor.setContent('')
        Ddl_Faq();
    });

    $('#btn-save-new-template').click(function () {
        if ($('#txt_Tipe').val() == '') {
            Swal.fire("Validation", "Template Tipe Is Empty.", "warning");
            return
        }
        if ($('#txt_Subject').val() == '') {
            Swal.fire("Validation", "Template Subject Is Empty.", "warning");
            return
        }
        if (tinymce.activeEditor.getContent() == '') {
            Swal.fire("Validation", "Template Content Is Empty.", "warning");
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
                setTimeout(function () { AddTemplate(); }, 1500);
                
                //$('#Modal_Template').modal('toggle');
            }
        });                
    });

    $('#btn-faq').click(function () {
        ShowModalFaq(FaqId);
    });

    $('#btn-save-edit-template').click(function () {
        if ($('#txt_Tipe').val() == '') {
            Swal.fire("Validation", "Template Tipe Is Empty.", "warning");
            return
        }
        if ($('#txt_Subject').val() == '') {
            Swal.fire("Validation", "Template Subject Is Empty.", "warning");
            return
        }
        if (tinymce.activeEditor.getContent() == '') {
            Swal.fire("Validation", "Template Content Is Empty.", "warning");
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
                UpdateTemplateById();                
                /*$('#Modal_Template').modal('toggle');*/
            }
        });

        
    })
});

function ShowDetailTemplate(Id) {

    $('#PageList').hide(function () {
        $('#PageDetail').removeAttr('hidden');
        $('#PageDetail').show('fade')
    })
    if (Id != undefined) {
        $('#PageDetail .card-title').html("<i class='icon icon-lg' data-feather='edit'></i> &nbsp;Edit Template");
        $('#btn-save-new-template').addClass('hide');
        $('#btn-save-edit-template').removeClass('hide');
        showLoader('Mohon menunggu, sedang memproses data.');
        setTimeout(function(){ AjaxGetTemplateById(Id); }, 1500);
    }
    else {
        $('#PageDetail .card-title').html("<i class='icon icon-lg' data-feather='plus-square'></i> &nbsp;New Template");

        $('#btn-save-new-template').removeClass('hide');
        $('#btn-save-edit-template').addClass('hide');

        $('#txt_Tipe').val('');
        $('#txt_Subject').val('');
        $('#txt_Description').val('');
        tinymce.activeEditor.setContent('')
        Ddl_Faq();
    }
}

function ShowListTemplate() {
    $('#PageDetail').hide(function () {
        $('#PageList').attr('hidden');
        $('#PageList').show('fade')
    })
    showLoader('Mohon menunggu, sedang memproses data.');
    setTimeout(function () { GetAllTemplate(); }, 1500);
   
}

//#region Get All
function GetAllTemplate() {
    showLoader('Mohon menunggu, sedang memproses data.');
    setTimeout(function () {
        $.ajax({
            type: 'GET',
            url: UrlOrigin + '/MasterTemplate/GetAll',
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

                $('#dataTable2').DataTable().clear().draw();

                if (data.data.listData.length != 0) {

                    var NoUrut = 1;
                    for (var i = 0; i < data.data.listData.length; i++) {
                        $('#dataTable2').DataTable().row.add([
                            '<div class="btn-group me-2" role="group" aria-label="First group">' +
                            //'<button type = "button" class= "btn btn-info btn-icon-text" onclick = "GetTemplateById(' + data.data.listData[i].id + ')" >' +
                            //'<i class="btn-icon-append" data-feather="eye"></i> View</button > ' +
                            '<button type = "button" class= "btn btn-warning btn-icon-text" onclick = "GetTemplateById(' + data.data.listData[i].id + ')" >' +
                            '<i class="btn-icon-append" data-feather="edit"></i> Edit</button > ' +
                            '<button type="button" class="btn btn-danger btn-icon-text" onclick="DeleteTemplateById(' + data.data.listData[i].id + ')">' +
                            '<i class="btn-icon-append" data-feather="delete"></i> Delete</button ></div > '
                            , NoUrut
                            , data.data.listData[i].tipe
                            , data.data.listData[i].subject
                            , data.data.listData[i].descriptions
                            , data.data.listData[i].creator
                            , data.data.listData[i].updater
                        ]).draw();
                        NoUrut = NoUrut + 1;
                    }
                    feather.replace()
                }

                Swal.close();


                ModelTable = $('#dataTable2').DataTable();
                new $.fn.dataTable.FixedColumns(ModelTable).left();
            }
        });
    }, 1500);
    
};
//#endregion

//#region Get By Id
function GetTemplateById(Id) {
    TemplateId = Id;
    ShowDetailTemplate(Id);
    return

    $("#Modal_Template .modal-title").html("<i class='icon icon-lg' data-feather='edit'></i> &nbsp;Edit Template Notification");
    feather.replace();
    $('#Modal_Template').modal('toggle');

    $('#btn-save-new').addClass('hide');
    $('#btn-save-edit').removeClass('hide');
    //$('#btn-faq').removeClass('hide');

    TemplateId = Id;
    AjaxGetTemplateById();

};

function CetakWo() {
    var Dto = {
        "WoNo": "0201/RO-ICT/III/2024",
        "TicketNo": "REQ/2024/SERVICE/000001",
        "WoTipe": "BUH",
        "Unit": "00.00017",
        "Lokasi": "REGION 3 SPBUT-JAKARTA HALIM",
        "PicIT": "Umar",
        "PicITTelp": "0812-1234-1234",
        "BUH": "Fauzi",
        "BUHTelp": "0812-2222-2222",
        "ToName": "ASTRA OTOPART (Nasional)",
        "ToAddress": "Jl. Pegangsaan Dua Km 2,2 Pegangsaan Dua Jakarta Utara 14250",
        "Note": null,
        "PlanStart": "2024-03-05",
        "PlanEnd": "2024-03-05", 
        "DataSpeciment": [{
            "Posisi": "BUH SPBU 00.00017",
            "DateApproved": "1 Februari 2024",
            "Name": "Fauzi",
            "Base64String": "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"
        }],
        "DetailWo": [
            {
                "No": 1,
                "KodeOrder": "Pemeriksaan",
                "Aktifitas": "cek power",
                "Issue": "Maintenance Rutin",
                "Vol": "10",
                "Sat": "Unit",
                "Keterangan": "Urgen"
            }, {
                "No": 2,
                "KodeOrder": "Pemeriksaan",
                "Aktifitas": "cek power",
                "Issue": "Maintenance Rutin",
                "Vol": "100",
                "Sat": "Unit",
                "Keterangan": "Urgen"
            }
        ]
    };

    var DataSave = JSON.stringify(Dto);

    var DataRs = $.ajax({
        url: UrlOrigin + '/MasterTemplate/ExportWo',
        type: 'POST',
        data: DataSave,
        dataType: "json",
        cache: false,
        async: false,
        contentType: 'application/json',
        processData: false,
        error: function (request, status, error) {
            Swal.fire("Failed", "Gagal memproses data.", "error");
        }
    });
    debugger
    if (DataRs.responseJSON.error) {
        Swal.fire("Failed", DataRs.responseJSON.Message, "error");
    } else {
        ExportFIle(DataRs.responseJSON.data.file);
    }
}

function PostWoIvent() {
    var Dto = [{
        "WoNo": "0030/RO-ICT/II/2024",
        "TicketNo": "REQ/2024/SERVICE/000001",
        "WoTipe": "BUH",
        "Unit": "00.00017",
        "Lokasi": "REGION 3 SPBUT-JAKARTA HALIM",
        "PicIT": "Umar",
        "PicITTelp": "0812-1234-1234",
        "BUH": "Fauzi",
        "BUHTelp": "0812-2222-2222",
        "VendorId": "1010",
        "ToName": "ASTRA OTOPART (Nasional)",
        "ToAddress": "Jl. Pegangsaan Dua Km 2,2 Pegangsaan Dua Jakarta Utara 14250",
        "Note": null,
        "PlanStart": "2024-01-28",
        "PlanEnd": "2024-01-28",
        "DataSpeciment": [{
            "Posisi": "BUH SPBU 00.00017",
            "DateApproved": "1 Februari 2024",
            "Name": "Fauzi",
            "Base64String": "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"
        }],
        "DetailWo": [
            {
                "No": 1,
                "KodeOrder": "Pemeriksaan",
                "Aktifitas": "cek power",
                "Issue": "Maintenance Rutin",
                "Vol": "10",
                "Sat": "Unit",
                "Keterangan": "Urgen"
            }, {
                "No": 2,
                "KodeOrder": "Pemeriksaan",
                "Aktifitas": "cek power",
                "Issue": "Maintenance Rutin",
                "Vol": "100",
                "Sat": "Unit",
                "Keterangan": "Urgen"
            }, {
                "No": 3,
                "KodeOrder": "Pemeriksaan",
                "Aktifitas": "cek power",
                "Issue": "Maintenance Rutin",
                "Vol": "20",
                "Sat": "Unit",
                "Keterangan": "Urgen"
            }, {
                "No": 4,
                "KodeOrder": "Pemeriksaan",
                "Aktifitas": "cek power",
                "Issue": "Maintenance Rutin",
                "Vol": "40",
                "Sat": "Unit",
                "Keterangan": "Urgen"
            }, {
                "No": 5,
                "KodeOrder": "Pemeriksaan",
                "Aktifitas": "cek power",
                "Issue": "Maintenance Rutin",
                "Vol": "60",
                "Sat": "Unit",
                "Keterangan": "Urgen"
            }, {
                "No": 6,
                "KodeOrder": "Pemeriksaan",
                "Aktifitas": "cek power",
                "Issue": "Maintenance Rutin",
                "Vol": "80",
                "Sat": "Unit",
                "Keterangan": "Urgen"
            }, {
                "No": 7,
                "KodeOrder": "Pemeriksaan",
                "Aktifitas": "cek power",
                "Issue": "Maintenance Rutin",
                "Vol": "90",
                "Sat": "Unit",
                "Keterangan": "Urgen"
            }, {
                "No": 8,
                "KodeOrder": "Pemeriksaan",
                "Aktifitas": "cek power",
                "Issue": "Maintenance Rutin",
                "Vol": "70",
                "Sat": "Unit",
                "Keterangan": "Urgen"
            }, {
                "No": 9,
                "KodeOrder": "Pemeriksaan",
                "Aktifitas": "cek power",
                "Issue": "Maintenance Rutin",
                "Vol": "50",
                "Sat": "Unit",
                "Keterangan": "Urgen"
            }, {
                "No": 10,
                "KodeOrder": "Pemeriksaan",
                "Aktifitas": "cek power",
                "Issue": "Maintenance Rutin",
                "Vol": "30",
                "Sat": "Unit",
                "Keterangan": "Urgen"
            }
        ]
    }];
    var DataSave = JSON.stringify(Dto);

    var DataRs = $.ajax({
        url: UrlOrigin + '/MasterTemplate/PostWo',
        type: 'POST',
        data: DataSave,
        dataType: "json",
        cache: false,
        async: false,
        contentType: 'application/json',
        processData: false,
        error: function (request, status, error) {
            Swal.fire("Failed", "Gagal memproses data.", "error");
        }
    });
    debugger
    if (DataRs.responseJSON.status != 200) {
        Swal.fire("Failed", DataRs.responseJSON.message, "error");
    } else {
        Swal.fire(
            'Sent!',
            'Your data has been Sent.',
            'success'
        );
    }
}

function GetWoIvendz(Wono) {
    var DataRs = $.ajax({
        url: UrlOrigin + '/MasterTemplate/GetWoIvendz?Wono=' + Wono,
        type: 'GET',
        dataType: "json",
        cache: false,
        async: false,
        contentType: 'application/json',
        processData: false,
        error: function (request, status, error) {
            Swal.fire("Failed", "Gagal memproses data.", "error");
        }
    });
}

function AjaxGetTemplateById() {

    Ddl_Faq();

    var DetailId = $.ajax({
        url: UrlOrigin + '/MasterTemplate/GetById?Id=' + TemplateId,
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
        $('#txt_Tipe').val(DetailId.responseJSON.data.tipe);
        $('#txt_Subject').val(DetailId.responseJSON.data.subject);
        $('#txt_Description').val(DetailId.responseJSON.data.descriptions);
        tinymce.activeEditor.setContent(DetailId.responseJSON.data.content);
        FaqId = DetailId.responseJSON.data.faqId;
        if(FaqId!=null)
        $('#DdList_Faq').val(FaqId).trigger('change');
    }
};
//#endregion

//#region Add
function AddTemplate() {

    var DtO = { Tipe: $('#txt_Tipe').val(), FaqId: FaqId, Subject: $('#txt_Subject').val(), Content: tinymce.activeEditor.getContent(), Descriptions: $('#txt_Description').val() };
    var Data = JSON.stringify(DtO);

    var Save = $.ajax({
        url: UrlOrigin + '/MasterTemplate/Add',
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
    else {
        if (StData == 200) {
            Swal.fire(
                'Add!',
                'Your data has been Add.',
                'success'
            );
            setTimeout(function () { ShowListTemplate(); }, 1500);
        }                
    }
}
//#endregion

//#region Delete
function DeleteTemplateById(Id) {

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
                AjaxDeleteTemplateById(Id);
                setTimeout(function () {

                    if (StData == 200) {
                        Swal.fire(
                            'Delete!',
                            'Your data has been Delete.',
                            'success'
                        );

                        setTimeout(function () { GetAllTemplate(); }, 1500);
                    }

                }, 1500);
            }, 1500);
            
        }
    });
}

function AjaxDeleteTemplateById(Id) {

    var DeleteId = $.ajax({
        url: UrlOrigin + '/MasterTemplate/DeledeById?Id=' + Id,
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
    }
}
//#endregion

//#region Update
function UpdateTemplateById() {
    showLoader('Mohon menunggu, sedang memproses data.');
    setTimeout(function () {
        var DtO = { Id: TemplateId, Tipe: $('#txt_Tipe').val(), FaqId: FaqId, Subject: $('#txt_Subject').val(), Content: tinymce.activeEditor.getContent(), Descriptions: $('#txt_Description').val() };
        var Data = JSON.stringify(DtO);

        var Save = $.ajax({
            url: UrlOrigin + '/MasterTemplate/UpdateById',
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
        else {
            if (StData == 200) {
                debugger
                Swal.fire(
                    'Update!',
                    'Your data has been Update.',
                    'success'
                );
                setTimeout(function () {
                    ShowListTemplate();
                }, 1500);
            }
        }
    }, 1500);
}
//#endregion