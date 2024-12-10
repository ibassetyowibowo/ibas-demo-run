$(function () {    
    switch (UrlPath[UrlPath.length - 1]) {
        case 'Services':

            break;
        case 'ReportIssue':
            PrepareData(getUrlVars()['Status']);
            $('.card-body h4').html('REPORT IT SERVICES');
            break;
    }

    $('#btn-Coll-1').click(function () {

        $('#collapse1').collapse('show');
        setTimeout(function () {

            if ($('#collapse1').hasClass('show')) {
                $('#fa_collapse1').addClass('fa-square-caret-up');
                $('#fa_collapse1').removeClass('fa-square-caret-down');
            }
            else {
                $('#fa_collapse1').addClass('fa-square-caret-down');
                $('#fa_collapse1').removeClass('fa-square-caret-up');
            }
        }, 500);

    });
    $('#btn-Coll-2').click(function () {

        $('#collapse2').collapse('show');
        setTimeout(function () {

            if ($('#collapse2').hasClass('show')) {
                $('#fa_collapse2').addClass('fa-square-caret-up');
                $('#fa_collapse3').removeClass('fa-square-caret-down');
            }
            else {
                $('#fa_collapse2').addClass('fa-square-caret-down');
                $('#fa_collapse2').removeClass('fa-square-caret-up');
            }
        }, 500);

    });
    $('#btn-Coll-3').click(function () {

        $('#collapse3').collapse('show');
        setTimeout(function () {

            if ($('#collapse3').hasClass('show')) {
                $('#fa_collapse3').addClass('fa-square-caret-up');
                $('#fa_collapse3').removeClass('fa-square-caret-down');
            }
            else {
                $('#fa_collapse3').addClass('fa-square-caret-down');
                $('#fa_collapse3').removeClass('fa-square-caret-up');
            }
        }, 500);

    });
    $('#btn-Coll-4').click(function () {

        $('#collapse4').collapse('show');
        setTimeout(function () {

            if ($('#collapse4').hasClass('show')) {
                $('#fa_collapse4').addClass('fa-square-caret-up');
                $('#fa_collapse4').removeClass('fa-square-caret-down');
            }
            else {
                $('#fa_collapse4').addClass('fa-square-caret-down');
                $('#fa_collapse4').removeClass('fa-square-caret-up');
            }
        }, 500);

    });

    $('#spbu').on('select2:select', function (e) {

        Ddl_PicIT();
        var Dt = DtDdSpbu.filter(x => x.stationId == $('#spbu').val())[0];
        $('#spbuType').val(Dt.stationType);
        $('#spbuArea').val(Dt.area);
        $('#spbuAddress').val(Dt.stationAddress);

    });

    $('#btn-div-sso').click(function () {
        GenerateTicketId();
        window.location = origin + '/TMS/ReportIssue?Category=Services&CategorySub=Access&CategoryDetail=SSO&Status=New&appId=' + TicketId
    });
    $('#btn-div-laptop').click(function () {
        GenerateTicketId();
        window.location = origin + '/TMS/ReportIssue?Category=Services&CategorySub=Hardware&CategoryDetail=Laptop&Status=New&appId=' + TicketId
    });
    $('#btn-div-pc').click(function () {
        GenerateTicketId();
        window.location = origin + '/TMS/ReportIssue?Category=Services&CategorySub=Hardware&CategoryDetail=PC&Status=New&appId=' + TicketId
    });
    $('#btn-div-monitor').click(function () {
        GenerateTicketId();
        window.location = origin + '/TMS/ReportIssue?Category=Services&CategorySub=Hardware&CategoryDetail=Monitor&Status=New&appId=' + TicketId
    });
    $('#btn-div-etc').click(function () {
        GenerateTicketId();
        window.location = origin + '/TMS/ReportIssue?Category=Services&CategorySub=Hardware&CategoryDetail=Etc&Status=New&appId=' + TicketId
    });
    $('#btn-div-vpn').click(function () {
        GenerateTicketId();
        window.location = origin + '/TMS/ReportIssue?Category=Services&CategorySub=Network&CategoryDetail=VPN&Status=New&appId=' + TicketId
    });
    $('#btn-div-config').click(function () {
        GenerateTicketId();
        window.location = origin + '/TMS/ReportIssue?Category=Services&CategorySub=Software&CategoryDetail=Configuration&Status=New&appId=' + TicketId
    });
    $('#btn-div-install').click(function () {
        GenerateTicketId();
        window.location = origin + '/TMS/ReportIssue?Category=Services&CategorySub=Software&CategoryDetail=Installation&Status=New&appId=' + TicketId
    });
    $('#btn-div-license').click(function () {
        GenerateTicketId();
        window.location = origin + '/TMS/ReportIssue?Category=Services&CategorySub=Software&CategoryDetail=License&Status=New&appId=' + TicketId
    });
});

var TicketId;
var DtDdSpbu;
var DtDdPICIT;
var DtSpbu;
var DtSpbuIt;
var DtCategori;
var DtCategoriSub;
var DtCategoriDetail;
GetSpecimentUser();
function GetSpecimentUser()
{        
    var Data = $.ajax({
        url: UrlOrigin + '/MasterTemplate/GetSpeciment?UserSSO=' + $('#H_UserId').val(),
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

    if (Data.responseJSON.error) {
        
        Swal.close();
        //Swal.fire("Validation", "Oh no, Your Speciment Not Found. <br/>Please Insert Speciment in <a href='https://ibos.pertaminaretail.com/login/esign' target='_blank'>Visit Ibos Esign</a>", "warning");
        //Swal.fire("Waiting Persetujuan", "Total Ticket 3", "info");
        if ($.cookie("AlertEsign") == undefined) {
            $.cookie("AlertEsign", 1);
        } else {
            NotifikasiTicketContent(Data.responseJSON.data);
            return
        }
        
        Swal.fire({
            title: "Validation",
            html: "Oh no, Your Speciment Not Found. <br/>Please Insert Speciment in <a href='https://ibos.pertaminaretail.com/login/esign' target='_blank'>Visit Ibos Esign</a>",
            icon: "warning",
            showDenyButton: false,
            allowOutsideClick:false,
            showCancelButton: false,
            confirmButtonText: "OK"
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                if (Data.responseJSON.data.totalTicket!=0) {
                    Swal.fire("Waiting Persetujuan", "Total Ticket " + Data.responseJSON.data.totalTicket, "info");    
                    NotifikasiTicketContent(Data.responseJSON.data);
                }                
            } 
        });        
    }
    else if (Data.responseJSON.data && Data.responseJSON.data.totalTicket != 0) {
        Swal.fire("Waiting Persetujuan", "Total Ticket " + Data.responseJSON.data.totalTicket, "info");
        NotifikasiTicketContent(Data.responseJSON.data);
    }
}

function NotifikasiTicketContent(data)
{  
    if (data.lsTicket.length != 0) {
        $('#div_indicator').removeClass("hide");
        $('#Div_DdNotification').removeClass("hide"); }
    for (var i = 0; i < data.lsTicket.length; i++) {
        var Dt = '<a href="' + UrlOrigin + data.lsTicket[i].urlTicketDetail +'" class="dropdown-item">' +
            '<div class="content ml-0">' +
            '<p>' + data.lsTicket[i].ticketId+'</p>' +
            '<p class="sub-text text-muted">' + data.lsTicket[i].created_At +'</p>' +
            '</div></a>';

        $('#LsNotifTicketDetail').append(Dt);
    }
}

function PrepareData(Status) {
    if (Status == 'New') {
        $('#appId').val(getUrlVars()['appId']);
        $('#txt_TicketCategory').val(getUrlVars()['Category']);
        $('#txt_TicketCategorySub').val(getUrlVars()['CategorySub']);
        $('#txt_TicketCategoryDetail').val(getUrlVars()['CategoryDetail']);
        $('#spbuType').val('');
        $('#spbuArea').val('');
        $('#spbuAddress').val('');
        $('#Issue').val('');

        Ddl_SPBU();
        Ddl_PicIT();

        if (getUrlVars()['Category'] == 'Services') {
            $('#btn-save').click(function () {
                AddTicketService();
            });
            $('#btn-batal').click(function () {
                window.location = origin + '/tms/Services';
            });
        }
        else {
            $('#btn-save').click(function () {

            });
            $('#btn-batal').click(function () {
                window.location = origin + '/tms/Issues';
            });
        }

    }
    else {

    }
}

function Ddl_SPBU() {
    $('#spbu').select2()

    $.ajax({
        type: 'GET',
        url: origin + '/tms/GetListStation',
        dataType: 'json',
        cache: false,
        async: true,
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

            DtDdSpbu = data.data;

            $('#spbu').empty().trigger('change');

            $("#spbu").append("<option value='All' selected>--PILIH SPBU--</option>");
            for (var i = 0; i < data.data.length; i++) {
                $("#spbu").append("<option value='" + data.data[i].stationId + "'>" + data.data[i].stationName + "</option>");
            }
            $('#spbu').trigger('change');

        }
    });
}

function Ddl_PicIT() {
    if ($('#spbu').val() == 'All' || $('#spbu').val() == null) {
        $('#spbuAgent').empty().trigger('change');
        $("#spbuAgent").append("<option value='All' selected>--PILIH PIC IT--</option>");
        $('#spbuAgent').trigger('change');

        return
    }

    DtSpbu = DtDdSpbu.filter(w => w.stationId == $('#spbu').val())[0];

    $.ajax({
        type: 'GET',
        url: origin + '/tms/GetListEmploye?AreaId=' + DtSpbu.regionId,
        dataType: 'json',
        cache: false,
        async: true,
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

            DtDdPICIT = data.data;

            $('#spbuAgent').empty().trigger('change');

            $("#spbuAgent").append("<option value='All' selected>--PILIH PIC IT--</option>");
            for (var i = 0; i < data.data.length; i++) {
                $("#spbuAgent").append("<option value='" + data.data[i].id + "'>" + toTitleCase(data.data[i].nama.toLowerCase()) + "</option>");
            }
            $('#spbuAgent').trigger('change');

        }
    });
}

function toTitleCase(str) {
    return str.replace(/(?:^|\s)\w/g, function (match) {
        return match.toUpperCase();
    });
}

function GenerateTicketId() {
    var Data = $.ajax({
        url: origin + '/tms/GenTicketId?TicketCategory=' + UrlPath[UrlPath.length - 1],
        type: 'POST',
        dataType: "json",
        cache: false,
        async: false,
        contentType: 'application/json',
        processData: false,
        error: function (request, status, error) {
            Swal.close();
            Swal.fire("Failed", "Gagal memproses data.", "error");
        }
    });

    TicketId = Data.responseJSON.data;
};

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function AddTicketService() {
    if ($('#spbu').val() == 'All') {
        Swal.fire("Validation", "SPBU Is Empty.", "warning");
        return
    }
    if ($('#spbuAgent').val() == 'All') {
        Swal.fire("Validation", "PIC IT Is Empty.", "warning");
        return
    }
    if ($('#Issue').val() == '') {
        Swal.fire("Validation", "Ticket Description Is Empty.", "warning");
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
            AjaxAddHelpdesk();
            if (StData == 200) {
                window.location = origin + '/tms/Services';
            }
        }
    });

    setTimeout(function () {

        if (StData == 200) {
            Swal.fire(
                'Save!',
                'Your data has been Save.',
                'success'
            );
        }
    }, 1500);

}

function AjaxAddHelpdesk() {


    DtSpbuIt = DtDdPICIT.filter(x => x.id == $('#spbuAgent').val())[0];
    var DtO = {
        Id: 0, TicketId: $('#appId').val(), Status: 1, TicketCategoryId: 0, TicketCategoryName: $('#txt_TicketCategory').val(), TicketCategorySubId: 0, TicketCategorySubName: $('#txt_TicketCategorySub').val(),
        TicketCategoryDetailId: 0, TicketCategoryDetailName: $('#txt_TicketCategoryDetail').val(), SpbuId: DtSpbu.stationId, SpbuName: DtSpbu.stationName, SpbuArea: DtSpbu.area, SpbuType: DtSpbu.stationType,
        SpbuAgent: toTitleCase(DtSpbuIt.nama.toLowerCase()), SpbuAddress: DtSpbu.stationAddress, TicketDesc: $('#Issue').val(), SpbuAgentEmail: DtSpbuIt.email
    };
    var Data = JSON.stringify(DtO);

    var Save = $.ajax({
        url: origin + '/tms/AddHelpdesk',
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
    else {

    }

}
