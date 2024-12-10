let WfBak = ["15", "99"];
let StatusFungsiOpen = ["0", "16", "20"];
let DtStatusNoDisable = ["0", "20"];
var LsProdukVolume = [];
var LsLegalGrading = [];
var LsTeknikDispenser = [];
var LsTeknikDispenserRls = [];
var LsFinancePickupEdcBank = [];
var LsFinancePickupEdcBankNew = [];
var LsKsoDipilih = [];
var LsIctDetail = [];
var LsHcSdm = [];
var LsHcSdmRls = [];
var LsIctPrtRls = [];
var LsHcSdmSam = [];
var LsBpdProduk = [];
var LsBpdPakaianPekerja = [];
var LsBpdJabatanPekerja = [];
var LsBpdOverhead = [];
var LsBpdAsumsi = [];
var LsBpdCapex = [];
let FileLegalContract = [];
var IsCompletedGenerate = false;
var StData64Contract;
let DtTittleHelpdesk = ["tms", "masterticket", "myticket", "faq", "mastercost", "config"];

$(function () {
    document.title = "Pertamina Retail | P-Serv";
    $('#div_HcSdm').addClass('hide');



    if (UrlPath[1].toLowerCase() == "formkso" && UrlPath[2] == "detail") {

        $('#dtPickerBpdTanggalUsulan').datepicker('setDate', new Date($('#H_BpdTanggalUsulan').val()));
        $('#datePickerDefault3').datepicker('setDate', new Date($('#H_EndDate').val()));

        //if (Number($('#H_KsoProdukCount').val()) != 0)
        //{
        //    $('#div_TblProdukVolume').removeClass('hide');
        //}

        ShowSPBURole($('#Ddl_SPBURole').val());

        if (jQuery.inArray($('#H_StatusId').val(), DtStatusNoDisable) == -1 && $('#H_StatusId').val() != "") {
            DisableInputInformation();
            //$('#div_HcSdm').removeClass('hide');
        }
        else if (Number($('#H_StatusId').val()) == 7) {
            DisableInputInformation();
            $('.ksoatt').attr('disabled', true);
        }
        else {
            $('.ksobpd').attr('disabled', false);
            $('.ksobak').attr('disabled', false);
            $('.ksopettycash').attr('disabled', false);
            $('.ksopickup').attr('disabled', false);
            $('.ksohc').attr('disabled', false);
            $('.ksolegal').attr('disabled', false);
            $('.ksoteknik').attr('disabled', false);
        }

        if ((Number($('#H_StatusId').val()) == 20 || Number($('#H_StatusId').val()) == 0) && $('#IsHavingAccessSAM').val().toLowerCase() != 'true') {
            $('.ksosam').attr('disabled', true);
        }

        if (Number($('#H_LoginFungsiBpd').val()) == 1) {
            if (jQuery.inArray(Number($('#H_StatusBpdId').val()).toString(), StatusFungsiOpen) != -1) { $('.ksobpd').attr('disabled', false); }
        }
        if (Number($('#H_LoginFungsiTeknik').val()) == 1) { if (jQuery.inArray(Number($('#H_StatusTeknikId').val()).toString(), StatusFungsiOpen) != -1) { $('.ksoteknik').attr('disabled', false); } }
        if (Number($('#H_LoginFungsiLegal').val()) == 1) { if (jQuery.inArray(Number($('#H_StatusLegalId').val()).toString(), StatusFungsiOpen) != -1) { $('.ksolegal').attr('disabled', false); } }
        if (Number($('#H_LoginFungsiHc').val()) == 1) { if (jQuery.inArray(Number($('#H_StatusHcId').val()).toString(), StatusFungsiOpen) != -1) { $('.ksohc').attr('disabled', false); } }
        if (Number($('#H_LoginFungsiIctMaster').val()) == 1) { }
        if (Number($('#H_LoginFungsiIctPerangkat').val()) == 1) { }
        if (Number($('#H_LoginFungsiFinancePetty').val()) == 1) { if (jQuery.inArray(Number($('#H_StatusFinancePettyCashId').val()).toString(), StatusFungsiOpen) != -1) { $('.ksopettycash').attr('disabled', false); } }
        if (Number($('#H_LoginFungsiFinancePickup').val()) == 1) { if (jQuery.inArray(Number($('#H_StatusFinancePickupId').val()).toString(), StatusFungsiOpen) != -1) { $('.ksopickup').attr('disabled', false); } }

        //if (Number($('#Ddl_SPBURole').val()) == 1) {
        //    if (jQuery.inArray(Number($('#H_StatusBpdId').val()).toString(), StatusFungsiOpen) != -1) { $('.ksobpd').attr('disabled', false); }
        //} else {
        //    if (jQuery.inArray(Number($('#H_StatusId').val()).toString(), StatusFungsiOpen) != -1) { $('.ksobak').attr('disabled', false); }
        //    if (jQuery.inArray(Number($('#H_StatusFinancePettyCashId').val()).toString(), StatusFungsiOpen) != -1) { $('.ksopettycash').attr('disabled', false); }
        //    if (jQuery.inArray(Number($('#H_StatusFinancePickupId').val()).toString(), StatusFungsiOpen) != -1) { $('.ksopickup').attr('disabled', false); }
        //    if (jQuery.inArray(Number($('#H_StatusHcId').val()).toString(), StatusFungsiOpen) != -1) { $('.ksohc').attr('disabled', false); }
        //    if (jQuery.inArray(Number($('#H_StatusLegalId').val()).toString(), StatusFungsiOpen) != -1) { $('.ksolegal').attr('disabled', false); }
        //    if (jQuery.inArray(Number($('#H_StatusTeknikId').val()).toString(), StatusFungsiOpen) != -1) { $('.ksoteknik').attr('disabled', false); }
        //}

        if (Number($('#IsAccessReadonly').val()) == 1) {

            $('.ksosam').attr('disabled', true);
            $('.ksobak').attr('disabled', true);
            $('.ksobpd').attr('disabled', true);
            $('.ksopettycash').attr('disabled', true);
            $('.ksopickup').attr('disabled', true);
            $('.ksohc').attr('disabled', true);
            $('.ksolegal').attr('disabled', true);
            $('.ksoteknik').attr('disabled', true);
            //$('.form-input-mst').prop('disabled', true);
            $('.form-input-prt').prop('disabled', true);

            $('.modal-footer button').attr('disabled', true);
        }

        $('#txt_Hc_Usia').val(GetUmur($('#txt_Hc_Dob').val()));

        if ($('#ddl_sam_manager').val() != "All") {
            $.ajax({
                type: 'GET',
                url: origin + '/FormKSO/GetUserDetailByNip?Nip=' + $('#ddl_sam_manager').val(),
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

                    $('#txt_legal_ContractSigningOfficer').val(data.data.nip + ' - ' + data.data.namaPegawai + ' - ' + data.data.namaJabatan);

                    Swal.close();
                }
            });
        }
    }

    //if ($('#IsHavingAccessICT').val()) {
    //    setTimeout(function () { $('#nav-ict').click(); }, 1000);
    //}
    //if ($('#IsHavingAccessHC').val()) {
    //    setTimeout(function () { $('#nav-hc').click(); }, 1000);
    //}
    //if ($('#IsHavingAccessFinance').val()) {
    //    setTimeout(function () { $('#nav-finance').click(); }, 1000);
    //}
    //if ($('#IsHavingAccessTeknik').val()) {
    //    setTimeout(function () { $('#nav-teknik').click(); }, 1000);
    //}
    //if ($('#IsHavingAccessLegal').val()) {
    //    setTimeout(function () { $('#nav-legal').click(); }, 1000);
    //}
    //if ($('#IsHavingAccessBAK').val()) {
    //    ShowContentNav('bak');
    //    setTimeout(function () { $('#nav-bak').click(); }, 1000);
    //}


});

//#region css
$('#tbl_ProdukSaleVolume thead th').css("text-align", "center");
$('#tbl_ProdukSaleVolume tbody td').addClass("no-padding");
//#endregion

//#region other

function GetUmur(Tgl) {
    let dob = new Date(Tgl);
    let today = new Date();
    let age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000));
    return age;
}

$('#txt_SPBUBadanUsaha').on('input', function (e) {
    $('#txt_SPBUBadanUsaha').val($('#txt_SPBUBadanUsaha').val().toUpperCase());
});


$('#tbl_EdcBankPickup').on('click', '.BtnSelectEdcBankPickup', function () {

    $(this).closest("tr").remove();

    GetFinancePickupEdcBank();
});


$('#tbl_EdcBankPickupNew').on('click', '.BtnSelectEdcBankPickupNew', function () {

    $(this).closest("tr").remove();

    GetFinancePickupEdcBankNew();
});

$('#tbl_ProdukSaleVolume').on('click', '.BtnSelectProductVolume', function () {

    $(this).closest("tr").remove();

    GetSaleVolume();
});

$('#tbl_teknikdispanser').on('click', '.BtnSelectTeknikDispenser', function () {

    $(this).closest("tr").remove();

    GetTeknikDispenser();
});

$('#tbl_Hc_Sdm').on('click', '.btndeletehcSdm', function () {

    $(this).closest("tr").remove();

    if ($('#tbl_Hc_Sdm tbody')[0].rows.length == 0) {
    }
    GetHcDetailSdm();
});
$('#tbl_Hc_SdmSam').on('click', '.btndeletehcSam', function () {

    $(this).closest("tr").remove();

    if ($('#tbl_Hc_SdmSam tbody')[0].rows.length == 0) {
    }
    GetHcSdmSam();
});

$('#tbl_KsoDipilih').on('click', '.BtnDeleteKsoProcess', function () {

    var ticketId = $(this).closest("tr").find("td:eq(1) input[type=text]").val().trim();
    LsKsoDipilih = LsKsoDipilih.filter(function (item) {
        return item.TicketId !== ticketId;
    });

    $(this).closest("tr").remove();

});

$('#txt_start_date').change(function () {

    let DStart = new Date(this.value);
    let DEnd = new Date($('#txt_end_date').val());
    let DToday = new Date(new Date().toISOString().split("T")[0]);
    if (DToday != DEnd) {
        if (DEnd < DStart) {
            swal('Tanggal Usulan Estimasi Start-Up tidak valid.');
            return;
        }
    }
});
$('#txt_end_date').change(function () {

    let DStart = new Date($('#txt_start_date').val());
    let DEnd = new Date(this.value);
    let DToday = new Date(new Date().toISOString().split("T")[0]);
    if (DToday != DEnd) {
        if (DEnd < DStart) {
            swal('Tanggal Usulan Estimasi Start-Up tidak valid.');
            return;
        }
    }

});
$('#txt_Hc_Dob').change(function () {
    $('#txt_Hc_Usia').val(GetUmur($('#txt_Hc_Dob').val()));
});
function ShowSPBURole(Role) {
    $('#ul-Nav-Tab li').addClass('hide');
    $('#li-nav-att').removeClass('hide');
    ClearActiveNav();
    $('#div-NavContent').addClass('hide');
    switch (Role) {
        case '1':
            $('#li-nav-bpd').removeClass('hide');
            $('#div-NavContent').removeClass('hide');
            $('#ul-Nav-Tab').removeClass('hide');
            $('#nav-bpd').addClass('active');
            $('#DivBpd').addClass('show active');
            $('#DivBpd').removeClass('hide');
            break;
        case '2':
            $('#li-nav-bak').removeClass('hide');
            $('#li-nav-ict').removeClass('hide');
            $('#li-nav-hc').removeClass('hide');
            $('#li-nav-finance').removeClass('hide');
            $('#li-nav-teknik').removeClass('hide');
            $('#li-nav-legal').removeClass('hide');
            $('#ul-Nav-Tab').removeClass('hide');
            if ($('#txt_TicketId').val().length == 0) {
                $('#nav-bak').addClass('active');
                $('#DivBak').addClass('show active');
                $('#DivBak').removeClass('hide');
                $('#div-NavContent').removeClass('hide');
                break;
            }
                        
            $('#txt_legal_ContractValue').val($('#H_Legal-ContractValue').val());

            if ($('#IsHavingAccessBAK').val().toLowerCase() == 'true') { $('#div-NavContent').removeClass('hide'); $('#nav-bak').click(); }
            else if ($('#IsHavingAccessICT').val().toLowerCase() == 'true') { $('#div-NavContent').removeClass('hide'); $('#nav-ict').click(); }
            else if ($('#IsHavingAccessHC').val().toLowerCase() == 'true') { $('#div-NavContent').removeClass('hide'); $('#nav-hc').click(); }
            else if ($('#IsHavingAccessFinance').val().toLowerCase() == 'true') { $('#div-NavContent').removeClass('hide'); $('#nav-finance').click(); }
            else if ($('#IsHavingAccessTeknik').val().toLowerCase() == 'true') { $('#div-NavContent').removeClass('hide'); $('#nav-teknik').click(); }
            else if ($('#IsHavingAccessLegal').val().toLowerCase() == 'true') { $('#div-NavContent').removeClass('hide'); $('#nav-legal').click(); }
            break;
    }
}
function ShowDetailKsoAllOperate(Id) {
    if (Id == undefined) {
        window.location.replace(UrlOrigin + '/formkso/detail');
    }
    else {
        window.location.replace(UrlOrigin + '/formkso/detail?Id=' + Id);
    }
}
function ShowFileIctByTicket() {
    if ($('#txt_ict_previewfile').val() == "FICO") {

        OpenFileDocuemnt($('#txt_TicketId').val(), 'FICO ICT');

    }
    else if ($('#txt_ict_previewfile').val() == "BA") {
        $('#modal-ict-file').modal('show');
        $('#detail-ict-file').attr("src", "/lib/files/Form/KSO/2024/2/Form Permintaan Perangkat IT_SPBU TAC.pdf");
    }
}

function ShowFilekso(Id) {

    Swal.fire({
        title: 'Loading...',
        showConfirmButton: false,
        allowOutsideClick: false,
        onBeforeOpen: () => {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');

            setTimeout(() => {
                AjaxShowFileKso(Id);
            }, 1500);
        },
        onClose: () => {
            Swal.close();
        }
    });
}

function AjaxShowFileKso(Id) {

    $.ajax({
        type: 'GET',
        url: UrlOrigin + '/FormKSO/GetFileKsoById?Id=' + Id,
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

            $('#detail-file-kso').attr('hidden', true);
            $('#detail-img-kso').addClass('hide');

            if (data.data.mimeType.toLowerCase().indexOf("image") >= 0) {
                $('#modal-kso').modal('show');
                $('#detail-img-kso').removeClass('hide');
                $('#detail-img-kso').attr("alt", data.data.fileName.toUpperCase());
                $('#detail-img-kso').attr("src", "/" + data.data.path);
            }
            else if (data.data.mimeType.toLowerCase().indexOf("office") >= 0 || data.data.mimeType.toLowerCase().indexOf("ms") >= 0) {
                window.location.replace(UrlOrigin + "/" + data.data.path);
            }
            else {
                $('#modal-kso').modal('show');
                $('#detail-file-kso').attr('hidden', false);
                $('#detail-file-kso').attr("alt", data.data.fileName.toUpperCase());
                $('#detail-file-kso').attr("src", "/" + data.data.path);
            }
            Swal.close();
        }
    });
}

function ShowFileIct(Id) {

    Swal.fire({
        title: 'Loading...',
        showConfirmButton: false,
        allowOutsideClick: false,
        onBeforeOpen: () => {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');

            setTimeout(() => {
                AjaxShowFileIct(Id);
            }, 1500);
        },
        onClose: () => {
            Swal.close();
        }
    });
}

function AjaxShowFileIct(Id) {

    $.ajax({
        type: 'GET',
        url: UrlOrigin + '/FormKSO/GetFileIctById?Id=' + Id,
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

            $('#modal-ict').modal('show');
            $('#detail-file-ict').attr('hidden', true);
            $('#detail-img-ict').addClass('hide');

            if (data.data.mimeType.toLowerCase().indexOf("image") >= 0) {
                $('#detail-img-ict').removeClass('hide');
                $('#detail-img-ict').attr("alt", data.data.fileName.toUpperCase());
                $('#detail-img-ict').attr("src", "/" + data.data.path);
            }
            else {
                $('#detail-file-ict').attr('hidden', false);
                $('#detail-file-ict').attr("alt", data.data.fileName.toUpperCase());
                $('#detail-file-ict').attr("src", "/" + data.data.path);
            }
            Swal.close();
        }
    });
}

function ShowFileHc(Id) {

    $.ajax({
        type: 'GET',
        url: UrlOrigin + '/FormKSO/GetFileHcById?Id=' + Id,
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

            $('#modal-hc-file').modal('show');
            $('#detail-file-hc').attr('hidden', true);
            $('#detail-img-hc').addClass('hide');

            if (data.data.mimeType.toLowerCase().indexOf("image") >= 0) {
                $('#detail-img-hc').removeClass('hide');
                $('#detail-img-hc').attr("alt", data.data.fileName.toUpperCase());
                $('#detail-img-hc').attr("src", "/" + data.data.path);
            }
            else {
                $('#detail-file-hc').attr('hidden', false);
                $('#detail-file-hc').attr("alt", data.data.fileName.toUpperCase());
                $('#detail-file-hc').attr("src", "/" + data.data.path);
            }

        }
    });
}
function ShowFileBak(Id) {

    $.ajax({
        type: 'GET',
        url: UrlOrigin + '/FormKSO/GetFileBakById?Id=' + Id,
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

            $('#modal-bak').modal('show');
            $('#detail-file-bak').attr('hidden', true);
            $('#detail-img-bak').addClass('hide');

            if (data.data.mimeType.toLowerCase().indexOf("image") >= 0) {
                $('#detail-img-bak').removeClass('hide');
                $('#detail-img-bak').attr("alt", data.data.fileName.toUpperCase());
                $('#detail-img-bak').attr("src", "/" + data.data.path);
            }
            else {
                $('#detail-file-bak').attr('hidden', false);
                $('#detail-file-bak').attr("alt", data.data.fileName.toUpperCase());
                $('#detail-file-bak').attr("src", "/" + data.data.path);
            }

        }
    });
}
function ShowFileBpd(Id) {

    $.ajax({
        type: 'GET',
        url: UrlOrigin + '/FormKSO/GetFileBpdById?Id=' + Id,
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

            if (data.data.type =="Kajian")
            {
                window.location.replace(UrlOrigin + "/" + data.data.path);
                return;
            }

            $('#modal-bpd-file').modal('show');
            $('#detail-file-bpd').attr('hidden', true);
            $('#detail-img-bpd').addClass('hide');

            if (data.data.mimeType.toLowerCase().indexOf("image") >= 0) {
                $('#detail-img-bpd').removeClass('hide');
                $('#detail-img-bpd').attr("alt", data.data.fileName.toUpperCase());
                $('#detail-img-bpd').attr("src", "/" + data.data.path);
            }
            else {
                $('#detail-file-bpd').attr('hidden', false);
                $('#detail-file-bpd').attr("alt", data.data.fileName.toUpperCase());
                $('#detail-file-bpd').attr("src", "/" + data.data.path);
            }

        }
    });
}
function ShowFileLegal(Id) {

    $.ajax({
        type: 'GET',
        url: UrlOrigin + '/FormKSO/GetFileLegalById?Id=' + Id,
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

            $('#modal-legal').modal('show');
            $('#detail-file-legal').attr('hidden', true);
            $('#detail-img-legal').addClass('hide');

            if (data.data.mimeType.toLowerCase().indexOf("image") >= 0) {
                $('#detail-img-legal').removeClass('hide');
                $('#detail-img-legal').attr("alt", data.data.fileName.toUpperCase());
                $('#detail-img-legal').attr("src", "/" + data.data.path);
            }
            else {
                $('#detail-file-legal').attr('hidden', false);
                $('#detail-file-legal').attr("alt", data.data.fileName.toUpperCase());
                $('#detail-file-legal').attr("src", "/" + data.data.path);
            }

        }
    });
}
function ShowFileTeknik(Id) {

    $.ajax({
        type: 'GET',
        url: UrlOrigin + '/FormKSO/GetFileTeknikById?Id=' + Id,
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

            $('#modal-teknik').modal('show');
            $('#detail-file-teknik').attr('hidden', true);
            $('#detail-img-teknik').addClass('hide');

            if (data.data.mimeType.toLowerCase().indexOf("image") >= 0) {
                $('#detail-img-teknik').removeClass('hide');
                $('#detail-img-teknik').attr("alt", data.data.fileName.toUpperCase());
                $('#detail-img-teknik').attr("src", "/" + data.data.path);
            }
            else {
                $('#detail-file-teknik').attr('hidden', false);
                $('#detail-file-teknik').attr("alt", data.data.fileName.toUpperCase());
                $('#detail-file-teknik').attr("src", "/" + data.data.path);
            }

        }
    });
}
function ShowFileFinance(Id) {

    $.ajax({
        type: 'GET',
        url: UrlOrigin + '/FormKSO/GetFileFinanceById?Id=' + Id,
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

            $('#modal-finance-file').modal('show');
            $('#detail-file-finance').attr('hidden', true);
            $('#detail-img-finance').addClass('hide');

            if (data.data.mimeType.toLowerCase().indexOf("image") >= 0) {
                $('#detail-img-finance').removeClass('hide');
                $('#detail-img-finance').attr("alt", data.data.fileName.toUpperCase());
                $('#detail-img-finance').attr("src", "/" + data.data.path);
            }
            else {
                $('#detail-file-finance').attr('hidden', false);
                $('#detail-file-finance').attr("alt", data.data.fileName.toUpperCase());
                $('#detail-file-finance').attr("src", "/" + data.data.path);
            }

        }
    });
}
function GetSaleVolume() {
    var DtTable = $("#tbl_ProdukSaleVolume tr.data").map(function (index, elem) {
        var ret = [];

        $('.inputValue', this).each(function () {
            var d = $(this).val() || $(this).text();
            ret.push(d);
            //console.log(d);
            //if (d == "N/A") {
            //    console.log(true);
            //}
        });
        return ret;
    });

    LsProdukVolume = [];

    for (var i = 0; i < DtTable.length / 7; i++) {
        var DtProdukVolume = {};
        if (i == 0) {
            DtProdukVolume.Produk = DtTable[i];
            DtProdukVolume.SalesVolume = DtTable[i + 1];
            DtProdukVolume.SoldTo = DtTable[i + 2];
            DtProdukVolume.SupplyPoint = DtTable[i + 3];
            DtProdukVolume.Jenis = DtTable[i + 4];
            DtProdukVolume.QtyTanki = DtTable[i + 5];
            DtProdukVolume.VolumeTanki = DtTable[i + 6];
        }
        else {
            var i2 = i * 7;
            DtProdukVolume.Produk = DtTable[i2];
            DtProdukVolume.SalesVolume = DtTable[i2 + 1];
            DtProdukVolume.SoldTo = DtTable[i2 + 2];
            DtProdukVolume.SupplyPoint = DtTable[i2 + 3];
            DtProdukVolume.Jenis = DtTable[i2 + 4];
            DtProdukVolume.QtyTanki = DtTable[i2 + 5];
            DtProdukVolume.VolumeTanki = DtTable[i2 + 6];
        }

        LsProdukVolume.push(DtProdukVolume);
    }
}
function GetLegalGrading() {
    var DtTable = $("#tbl_legal_grading tr.data").map(function (index, elem) {
        var ret = [];

        $('.inputValue', this).each(function () {
            var d = $(this).val() || $(this).text();
            ret.push(d);
        });
        return ret;
    });

    LsLegalGrading = [];

    for (var i = 0; i < DtTable.length / 3; i++) {
        var DtLegalGrading = {};
        if (i == 0) {
            DtLegalGrading.Grading = DtTable[i];
            DtLegalGrading.Pertama = DtTable[i + 1];
            DtLegalGrading.Kedua = DtTable[i + 2];
        }
        else {
            var i2 = i * 3;
            DtLegalGrading.Grading = DtTable[i2];
            DtLegalGrading.Pertama = DtTable[i2 + 1];
            DtLegalGrading.Kedua = DtTable[i2 + 2];
        }

        LsLegalGrading.push(DtLegalGrading);
    }
}
function GetTeknikDispenser() {
    var DtTable = $("#tbl_teknikdispanser tr.data").map(function (index, elem) {
        var ret = [];

        $('.inputValue', this).each(function () {

            if ($(this).is(':checkbox')) {
                var isChecked = $(this).is(':checked');
                ret.push(isChecked);
            }
            else {
                var d = $(this).val() || $(this).text();
                ret.push(d);
            }

        });
        return ret;
    });



    LsTeknikDispenser = [];

    for (var i = 0; i < DtTable.length / 10; i++) {
        var DtTekknikDispenser = {};
        if (i == 0) {
            DtTekknikDispenser.Merk = DtTable[i];
            DtTekknikDispenser.Jumlah = DtTable[i + 1];
            DtTekknikDispenser.JumlahNozzle = DtTable[i + 2];
            DtTekknikDispenser.JumlahDisplay = DtTable[i + 3];
            DtTekknikDispenser.JumlahRls = DtTable[i + 4];
            DtTekknikDispenser.JumlahNozzleRls = DtTable[i + 5];
            DtTekknikDispenser.JumlahDisplayRls = DtTable[i + 6];
            DtTekknikDispenser.Status = DtTable[i + 7];
            DtTekknikDispenser.Descriptions = DtTable[i + 8];
            DtTekknikDispenser.IsConfirmed = DtTable[i + 9];
        }
        else {
            var i2 = i * 10;
            DtTekknikDispenser.Merk = DtTable[i2];
            DtTekknikDispenser.Jumlah = DtTable[i2 + 1];
            DtTekknikDispenser.JumlahNozzle = DtTable[i2 + 2];
            DtTekknikDispenser.JumlahDisplay = DtTable[i2 + 3];
            DtTekknikDispenser.JumlahRls = DtTable[i2 + 4];
            DtTekknikDispenser.JumlahNozzleRls = DtTable[i2 + 5];
            DtTekknikDispenser.JumlahDisplayRls = DtTable[i2 + 6];
            DtTekknikDispenser.Status = DtTable[i2 + 7];
            DtTekknikDispenser.Descriptions = DtTable[i2 + 8];
            DtTekknikDispenser.IsConfirmed = DtTable[i2 + 9];
        }

        LsTeknikDispenser.push(DtTekknikDispenser);
    }
}
function GetTeknikDispenserRls() {
    var DtTable = $("#tbl_teknikdispanserRls tr.data").map(function (index, elem) {
        var ret = [];

        $('.inputValue', this).each(function () {
            var d = $(this).val() || $(this).text();
            ret.push(d);
        });
        return ret;
    });

    LsTeknikDispenserRls = [];

    for (var i = 0; i < DtTable.length / 6; i++) {
        var DtTekknikDispenser = {};
        if (i == 0) {
            DtTekknikDispenser.Merk = DtTable[i];
            DtTekknikDispenser.Jumlah = DtTable[i + 1];
            DtTekknikDispenser.JumlahNozzle = DtTable[i + 2];
            DtTekknikDispenser.JumlahDisplay = DtTable[i + 3];
            DtTekknikDispenser.Status = DtTable[i + 4];
            DtTekknikDispenser.Descriptions = DtTable[i + 5];
        }
        else {
            var i2 = i * 6;
            DtTekknikDispenser.Merk = DtTable[i2];
            DtTekknikDispenser.Jumlah = DtTable[i2 + 1];
            DtTekknikDispenser.JumlahNozzle = DtTable[i2 + 2];
            DtTekknikDispenser.JumlahDisplay = DtTable[i2 + 3];
            DtTekknikDispenser.Status = DtTable[i2 + 4];
            DtTekknikDispenser.Descriptions = DtTable[i2 + 5];
        }

        LsTeknikDispenserRls.push(DtTekknikDispenser);
    }
}

function GetFinancePickupEdcBank() {
    var DtTable = $("#tbl_EdcBankPickup tr.data").map(function (index, elem) {
        var ret = [];

        $('.inputValue', this).each(function () {
            var d = $(this).val() || $(this).text();
            ret.push(d);
        });
        return ret;
    });

    LsFinancePickupEdcBank = [];

    for (var i = 0; i < DtTable.length / 5; i++) {
        var DtFinancePickupEdcBank = {};
        if (i == 0) {
            DtFinancePickupEdcBank.SerialNumber = DtTable[i];
            DtFinancePickupEdcBank.MID = DtTable[i + 1];
            DtFinancePickupEdcBank.TID = DtTable[i + 2];
            DtFinancePickupEdcBank.JenisBank = DtTable[i + 3];
            DtFinancePickupEdcBank.Descriptions = DtTable[i + 4];
        }
        else {
            var i2 = i * 5;
            DtFinancePickupEdcBank.SerialNumber = DtTable[i2];
            DtFinancePickupEdcBank.MID = DtTable[i2 + 1];
            DtFinancePickupEdcBank.TID = DtTable[i2 + 2];
            DtFinancePickupEdcBank.JenisBank = DtTable[i2 + 3];
            DtFinancePickupEdcBank.Descriptions = DtTable[i2 + 4];
        }

        LsFinancePickupEdcBank.push(DtFinancePickupEdcBank);
    }
}

function GetFinancePickupEdcBankNew() {
    var DtTable = $("#tbl_EdcBankPickupNew tr.data").map(function (index, elem) {
        var ret = [];

        $('.inputValue', this).each(function () {

            if ($(this).is(':checkbox')) {
                var isChecked = $(this).is(':checked');
                ret.push(isChecked);
            }
            else {
                var d = $(this).val() || $(this).text();
                ret.push(d);
            }

        });
        return ret;
    });

    LsFinancePickupEdcBankNew = [];

    for (var i = 0; i < DtTable.length / 6; i++) {
        var DtFinancePickupEdcBankNew = {};
        if (i == 0) {
            DtFinancePickupEdcBankNew.SerialNumber = DtTable[i];
            DtFinancePickupEdcBankNew.MID = DtTable[i + 1];
            DtFinancePickupEdcBankNew.TID = DtTable[i + 2];
            DtFinancePickupEdcBankNew.JenisBank = DtTable[i + 3];
            DtFinancePickupEdcBankNew.Descriptions = DtTable[i + 4];
            DtFinancePickupEdcBankNew.IsConfirmed = DtTable[i + 5];
        }
        else {
            var i2 = i * 6;
            DtFinancePickupEdcBankNew.SerialNumber = DtTable[i2];
            DtFinancePickupEdcBankNew.MID = DtTable[i2 + 1];
            DtFinancePickupEdcBankNew.TID = DtTable[i2 + 2];
            DtFinancePickupEdcBankNew.JenisBank = DtTable[i2 + 3];
            DtFinancePickupEdcBankNew.Descriptions = DtTable[i2 + 4];
            DtFinancePickupEdcBankNew.IsConfirmed = DtTable[i2 + 5];
        }

        LsFinancePickupEdcBankNew.push(DtFinancePickupEdcBankNew);
    }
}

function GetHcSdm() {
    var DtTable = $("#tbl_Hc_Sdm tr.dataHcSdm").map(function (index, elem) {
        var ret = [];

        $('.inputValueHcSdm', this).each(function () {
            var d = $(this).val() || $(this).text();
            ret.push(d);

        });
        return ret;
    });

    LsHcSdm = [];
    for (var i = 0; i < DtTable.length / 7; i++) {
        var DtHcSdm = {};
        if (i == 0) {
            DtHcSdm.Fullname = DtTable[i];
            DtHcSdm.Posisi = DtTable[i + 1];
            DtHcSdm.JenisKelamin = DtTable[i + 2];
            DtHcSdm.Pendidikan = DtTable[i + 3];
            DtHcSdm.Pengalaman = DtTable[i + 4];
            DtHcSdm.Usia = DtTable[i + 5];
            DtHcSdm.Dob = DtTable[i + 6];
        }
        else {
            var i2 = i * 7;
            DtHcSdm.Fullname = DtTable[i2];
            DtHcSdm.Posisi = DtTable[i2 + 1];
            DtHcSdm.JenisKelamin = DtTable[i2 + 2];
            DtHcSdm.Pendidikan = DtTable[i2 + 3];
            DtHcSdm.Pengalaman = DtTable[i2 + 4];
            DtHcSdm.Usia = DtTable[i2 + 5];
            DtHcSdm.Dob = DtTable[i2 + 6];
        }

        LsHcSdm.push(DtHcSdm);
    }
}
function GetHcSdmSam() {
    var DtTable = $("#tbl_Hc_SdmSam tr.dataHcSam").map(function (index, elem) {
        var ret = [];

        $('.inputValueHcSam', this).each(function () {

            if ($(this).is(':checkbox')) {
                var isChecked = $(this).is(':checked');
                ret.push(isChecked);
            }
            else {
                var d = $(this).val() || $(this).text();
                ret.push(d);
            }

        });
        return ret;
    });

    LsHcSdmSam = [];
    for (var i = 0; i < DtTable.length / 5; i++) {
        var DtHcSdmSam = {};
        if (i == 0) {
            DtHcSdmSam.Posisi = DtTable[i];
            DtHcSdmSam.JenisKelamin = DtTable[i + 1];
            DtHcSdmSam.Jumlah = DtTable[i + 2];
            DtHcSdmSam.JumlahRls = DtTable[i + 3];
            DtHcSdmSam.IsConfirmed = DtTable[i + 4];
        }
        else {
            var i2 = i * 5;
            DtHcSdmSam.Posisi = DtTable[i2];
            DtHcSdmSam.JenisKelamin = DtTable[i2 + 1];
            DtHcSdmSam.Jumlah = DtTable[i2 + 2];
            DtHcSdmSam.JumlahRls = DtTable[i2 + 3];
            DtHcSdmSam.IsConfirmed = DtTable[i2 + 4];
        }

        LsHcSdmSam.push(DtHcSdmSam);
    }
}
function GetHcSdmSamRls() {
    var DtTable = $("#tbl_Hc_SdmSamRls tr.dataHcSam").map(function (index, elem) {
        var ret = [];

        $('.inputValueHcSam', this).each(function () {
            var d = $(this).val() || $(this).text();
            ret.push(d);

        });
        return ret;
    });

    LsHcSdmRls = [];
    for (var i = 0; i < DtTable.length / 3; i++) {
        var DtHcSdmSam = {};
        if (i == 0) {
            DtHcSdmSam.Posisi = DtTable[i];
            DtHcSdmSam.JenisKelamin = DtTable[i + 1];
            DtHcSdmSam.Jumlah = DtTable[i + 2];
        }
        else {
            var i2 = i * 3;
            DtHcSdmSam.Posisi = DtTable[i2];
            DtHcSdmSam.JenisKelamin = DtTable[i2 + 1];
            DtHcSdmSam.Jumlah = DtTable[i2 + 2];
        }

        LsHcSdmRls.push(DtHcSdmSam);
    }
}
function GetBpdProduk() {
    var DtTable = $("#tbl_bpd_produk tr.databpdproduk").map(function (index, elem) {
        var ret = [];

        $('.inputValuebpdproduk', this).each(function () {
            var d = $(this).val() || $(this).text();
            ret.push(d);

        });
        return ret;
    });

    LsBpdProduk = [];

    for (var i = 0; i < DtTable.length / 2; i++) {
        var DtBpdProduk = {};
        if (i == 0) {
            DtBpdProduk.Produk = DtTable[i];
            DtBpdProduk.Volume = DtTable[i + 1];
        }
        else {
            var i2 = i * 2;
            DtBpdProduk.Produk = DtTable[i2];
            DtBpdProduk.Volume = DtTable[i2 + 1];
        }

        LsBpdProduk.push(DtBpdProduk);
    }

    var DtTotal = 0;
    for (var i = 0; i < LsBpdProduk.length - 1; i++) {

        DtTotal += LsBpdProduk[i].Volume << 0;
    }
    debugger
    $('#txt_bpd_totalproduk').val(DtTotal);

}
function GetBpdJabatanPekerja() {
    var DtTable = $("#tbl_bpd_JumlahPekerja tr.databpdJumlahPekerja").map(function (index, elem) {
        var ret = [];

        $('.inputValuebpdJumlahPekerja', this).each(function () {
            var d = $(this).val() || $(this).text();
            ret.push(d);

        });
        return ret;
    });

    LsBpdJabatanPekerja = [];
    for (var i = 0; i < DtTable.length / 2; i++) {
        var DtBpdJabatanPekerja = {};
        if (i == 0) {
            DtBpdJabatanPekerja.Jabatan = DtTable[i];
            DtBpdJabatanPekerja.Jumlah = Number(DtTable[i + 1]);
        }
        else {
            var i2 = i * 2;
            DtBpdJabatanPekerja.Jabatan = DtTable[i2];
            DtBpdJabatanPekerja.Jumlah = Number(DtTable[i2 + 1]);
        }

        LsBpdJabatanPekerja.push(DtBpdJabatanPekerja);
    }

    var DtTotal = 0;
    for (var i = 0; i < LsBpdJabatanPekerja.length - 1; i++) {
        DtTotal += LsBpdJabatanPekerja[i].Jumlah << 0;
    }
    $('#txt_bpd_totalJumlahPekerja').val(DtTotal);
}
function GetBpdPakaianPekerja() {
    var DtTable = $("#tbl_bpd_PakaianPekerja tr.databpdPakaianPekerja").map(function (index, elem) {
        var ret = [];

        $('.inputValuebpdPakaianPekerja', this).each(function () {
            var d = $(this).val() || $(this).text();
            ret.push(d);

        });
        return ret;
    });

    LsBpdPakaianPekerja = [];

    for (var i = 0; i < DtTable.length / 2; i++) {
        var DtBpdPakaianPekerja = {};
        if (i == 0) {
            DtBpdPakaianPekerja.Jabatan = DtTable[i];
            DtBpdPakaianPekerja.Harga = DtTable[i + 1].replace(".", "").replace(",", "");
        }
        else {
            var i2 = i * 2;
            DtBpdPakaianPekerja.Jabatan = DtTable[i2];
            DtBpdPakaianPekerja.Harga = DtTable[i2 + 1].replace(".", "").replace(",", "");
        }

        LsBpdPakaianPekerja.push(DtBpdPakaianPekerja);
    }

    var DtTotal = 0;
    for (var i = 0; i < LsBpdPakaianPekerja.length - 1; i++) {

        DtTotal += LsBpdPakaianPekerja[i].Harga << 0;
    }
    debugger
    DtTotal = Number(DtTotal.toString().substr(0, DtTotal.toString().length - 2) + '.' + DtTotal.toString().substr(DtTotal.toString().length - 2));
    $('#txt_bpd_totalPakaianPekerja').val(DtTotal);

}
function GetBpdOverhead() {
    var DtTable = $("#tbl_bpd_overhead tr.databpdoverhead").map(function (index, elem) {
        var ret = [];

        $('.inputValuebpdoverhead', this).each(function () {
            var d = $(this).val() || $(this).text();
            ret.push(d);

        });
        return ret;
    });

    LsBpdOverhead = [];

    for (var i = 0; i < DtTable.length / 2; i++) {
        var DtBpdOverhead = {};
        if (i == 0) {
            DtBpdOverhead.Overhead = DtTable[i];
            DtBpdOverhead.Value = DtTable[i + 1].replace(".", "").replace(",", "");
        }
        else {
            var i2 = i * 2;
            DtBpdOverhead.Overhead = DtTable[i2];
            DtBpdOverhead.Value = DtTable[i2 + 1].replace(".", "").replace(",", "");
        }

        LsBpdOverhead.push(DtBpdOverhead);
    }
}
function GetBpdAsumsi() {
    var DtTable = $("#tbl_bpd_asumsiparameter tr.databpdasumsiparameter").map(function (index, elem) {
        var ret = [];

        $('.inputValuebpdasumsiparameter', this).each(function () {
            var d = $(this).val() || $(this).text();
            ret.push(d);

        });
        return ret;
    });

    LsBpdAsumsi = [];

    for (var i = 0; i < DtTable.length / 2; i++) {
        var DtBpdAsumsi = {};
        if (i == 0) {
            DtBpdAsumsi.NamaParameter = DtTable[i];
            DtBpdAsumsi.ValueParameter = DtTable[i + 1].replace(".", "").replace(",", "");
        }
        else {
            var i2 = i * 2;
            DtBpdAsumsi.NamaParameter = DtTable[i2];
            DtBpdAsumsi.ValueParameter = DtTable[i2 + 1].replace(".", "").replace(",", "");
        }

        LsBpdAsumsi.push(DtBpdAsumsi);
    }
}
function GetBpdCapex() {
    var DtTable = $("#tbl_bpd_Capex tr.dataBpdCapex").map(function (index, elem) {
        var ret = [];

        $('.inputValuebpdCapex', this).each(function () {
            var d = $(this).val() || $(this).text();
            ret.push(d);

        });
        return ret;
    });

    LsBpdCapex = [];
    debugger
    for (var i = 0; i < (DtTable.length - 2) / 5; i++) {
        var DtBpdCapex = {};
        if (i == 0) {
            DtBpdCapex.Item = DtTable[i];
            DtBpdCapex.Nilai = DtTable[i + 1];
            DtBpdCapex.Harga = DtTable[i + 2].replace(".", "").replace(",", "");
            DtBpdCapex.Total = DtTable[i + 3].replace(".", "").replace(",", "");
            DtBpdCapex.Keterangan = DtTable[i + 4];
        }
        else {
            var i2 = i * 5;
            DtBpdCapex.Item = DtTable[i2];
            DtBpdCapex.Nilai = DtTable[i2 + 1];
            DtBpdCapex.Harga = DtTable[i2 + 2].replace(".", "").replace(",", "");
            DtBpdCapex.Total = DtTable[i2 + 3].replace(".", "").replace(",", "");
            DtBpdCapex.Keterangan = DtTable[i2 + 4];
        }

        LsBpdCapex.push(DtBpdCapex);
    }

    var DtTotal = 0;
    for (var i = 0; i < LsBpdCapex.length; i++) {
        DtTotal += LsBpdCapex[i].Total << 0;
    }
    DtTotal = Number(DtTotal.toString().substr(0, DtTotal.toString().length - 2) + '.' + DtTotal.toString().substr(DtTotal.toString().length - 2));
    $('#txt_bpd_capex_total').val(DtTotal);

    var DtBpdCapexTotal = {};
    DtBpdCapexTotal.Item = "Total";
    DtBpdCapexTotal.Nilai = "0";
    DtBpdCapexTotal.Harga = "0";
    DtBpdCapexTotal.Total = DtTotal;
    DtBpdCapexTotal.Keterangan = "";
    LsBpdCapex.push(DtBpdCapexTotal);
}

function SaveAgreementBak() {
    debugger
    if ($('#txt_Bak_Type_agreement').val() == 'All') {
        Swal.fire("Failed", "Mohon Pilih Agreement Type.", "error");
        return false;
    };

    if ($('#txt_Bak_agreement_reason').val() == '') {
        Swal.fire("Failed", "Mohon Isi Agreement Reason.", "error");
        return false;
    };

    let frmData = $('#frmKsoAllOperateTac').serializeArray();
    FrData = new FormData();

    $.each(frmData, function (key, input) {
        FrData.append(input.name, $.trim(input.value));
    });

    Swal.fire({
        title: "Are you sure?",
        text: "Submit this, You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it.",
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
            setTimeout(function () {

                $.ajax({
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    url: UrlOrigin + '/FormKSO/SaveAgreementBak',
                    data: FrData,
                    processData: false,
                    cache: false,
                    async: false,
                    contentType: false,
                    timeout: 800000,
                    success: function (data) {
                        Swal.close();
                        debugger
                        if (data.status != 200) {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        } else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500
                            });

                            location.reload();
                        }

                    },
                    error: function (e) {

                        //close wal
                        Swal.close();

                        //display alert error
                        if (e.status == 400 || e.status == 422) {
                            let cnt = 0;
                            $.each(e.responseJSON.errors, function (key, value) {
                                if (cnt == 0) {
                                    console.log('value: ' + value);
                                    Swal.fire("Failed", '' + value, "error");
                                }
                                cnt++;
                            });
                        } else {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        }

                    },
                });
            }, 500);
        }
    });
}

function ShowAgrementBak() {
    $('#modal-bak-agreement').modal('show');
    $('#txt_Bak_Type_agreement').val('All').trigger('change');
    $('#txt_Bak_agreement').val('');
}

//#Region Delete File By Id
function DeleteFileBak(Id) {
    Swal.fire({
        title: "Do you want to delete the changes?",
        text: "Delete this ? You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses data.');
            setTimeout(function () {
                AjaxDeleteFileBakById(Id);
            }, 1500);

        }
    });
}
function DeleteFileBpd(Id) {
    Swal.fire({
        title: "Do you want to delete the changes?",
        text: "Delete this ? You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses data.');
            setTimeout(function () {
                AjaxDeleteFileBpdById(Id);
            }, 1500);

        }
    });
}
function DeleteFileLegal(Id) {
    Swal.fire({
        title: "Do you want to delete the changes?",
        text: "Delete this ? You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses data.');
            setTimeout(function () {
                AjaxDeleteFileLegalById(Id);
            }, 1500);

        }
    });
}
function DeleteFileTeknik(Id) {
    Swal.fire({
        title: "Do you want to delete the changes?",
        text: "Delete this ? You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses data.');
            setTimeout(function () {
                AjaxDeleteFileTeknikById(Id);
            }, 1500);

        }
    });
}
function DeleteFileFinance(Id) {
    Swal.fire({
        title: "Do you want to delete the changes?",
        text: "Delete this ? You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses data.');
            setTimeout(function () {
                AjaxDeleteFileFinanceById(Id);
            }, 1500);

        }
    });
}
function DeleteFileIct(Id) {
    Swal.fire({
        title: "Do you want to delete the changes?",
        text: "Delete this ? You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses data.');
            setTimeout(function () {
                AjaxDeleteFileIctById(Id);
            }, 1500);

        }
    });
}
function DeleteFileHc(Id) {
    Swal.fire({
        title: "Do you want to delete the changes?",
        text: "Delete this ? You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses data.');
            setTimeout(function () {
                AjaxDeleteFileHcById(Id);
            }, 1500);

        }
    });
}
function DeleteFileKso(Id) {
    Swal.fire({
        title: "Do you want to delete the changes?",
        text: "Delete this ? You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses data.');
            setTimeout(function () {
                AjaxDeleteFileKsoById(Id);
            }, 1500);

        }
    });
}
function deleteDataKso(Id) {
    Swal.fire({
        title: "Do you want to delete the changes?",
        text: "Delete this ? You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses data.');
            setTimeout(function () {
                AjaxDeleteKsoById(Id);
            }, 1500);

        }
    });
}

//#endregion


function CLearKsoUpload() {
    $('#modal-kso-upload').modal('show');
    $('#txt_kso_File_Type').val('');
    $('#attachment-kso').val('');
    $('#txt_kso_Description').val('');
    files2 = null;
    $('#new-img-kso').addClass('hide');
    $('#new-file-kso').attr('hidden', true);
}
function CLearBakUpload() {
    //debugger
    //if ($('#txt_TicketId').val().length == 0)
    //{
    //    Swal.fire("Failed", "Ticket Kso Not Exists. Please Submit or Save as Draft.", "warning");
    //    return
    //}
    $('#modal-bak-upload').modal('show');
    $('#txt_Bak_File_Type').val('All').trigger('change');
    $('#attachment-bak').val('');
    $('#txt_Bak_Description').val('');
    files2 = null;
    $('#new-img-bak').addClass('hide');
    $('#new-file-bak').attr('hidden', true);
}
function CLearIctUpload() {
    //debugger
    //if ($('#txt_TicketId').val().length == 0) {
    //    Swal.fire("Failed", "Ticket Kso Not Exists. Please Submit or Save as Draft.", "warning");
    //    return
    //}
    $('#modal-ict-upload').modal('show');
    $('#txt_Ict_File_Type').val('All').trigger('change');
    $('#attachment-ict').val('');
    $('#txt_Ict_Description').val('');
    files2 = null;
    $('#new-img-ict').addClass('hide');
    $('#new-file-ict').attr('hidden', true);
}
function ClearBpdUpload() {
    //debugger
    //if ($('#txt_TicketId').val().length == 0) {
    //    Swal.fire("Failed", "Ticket Kso Not Exists. Please Submit or Save as Draft.", "warning");
    //    return
    //}
    $('#modal-bpd-upload').modal('show');
    $('#txt_bpd_fileType').val('');
    $('#attachment-bpd').val('');
    $('#txt_bpd_FileDescription').val('');
    files2 = null;
    $('#new-img-bpd').addClass('hide');
    $('#new-file-bpd').attr('hidden', true);
}
function ClearLegalUpload() {
    //debugger
    //if ($('#txt_TicketId').val().length == 0) {
    //    Swal.fire("Failed", "Ticket Kso Not Exists. Please Submit or Save as Draft.", "warning");
    //    return
    //}
    $('#modal-legal-upload').modal('show');
    $('#txt_legal_fileType').val('');
    $('#attachment-legal').val('');
    $('#txt_legal_FileDescription').val('');
    files2 = null;
    $('#new-img-legal').addClass('hide');
    $('#new-file-legal').attr('hidden', true);
}
function ClearTeknikUpload() {
    //debugger
    //if ($('#txt_TicketId').val().length == 0) {
    //    Swal.fire("Failed", "Ticket Kso Not Exists. Please Submit or Save as Draft.", "warning");
    //    return
    //}
    $('#modal-teknik-upload').modal('show');
    $('#txt_teknik_fileType').val('');
    $('#attachment-teknik').val('');
    $('#txt_teknik_FileDescription').val('');
    files2 = null;
    $('#new-img-teknik').addClass('hide');
    $('#new-file-teknik').attr('hidden', true);
}
function ClearFinancePettyCashUpload() {
    //debugger
    //if ($('#txt_TicketId').val().length == 0) {
    //    Swal.fire("Failed", "Ticket Kso Not Exists. Please Submit or Save as Draft.", "warning");
    //    return
    //}
    $('#modal-financePettyCash-upload').modal('show');
    $('#txt_financePettyCash_fileType').val('');
    $('#attachment-financePettyCash').val('');
    $('#txt_financePettyCash_FileDescription').val('');
    files2 = null;
    $('#new-img-financePettyCash').addClass('hide');
    $('#new-file-financePettyCash').attr('hidden', true);
}
function ClearFinancePickupServiceUpload() {
    //debugger
    //if ($('#txt_TicketId').val().length == 0) {
    //    Swal.fire("Failed", "Ticket Kso Not Exists. Please Submit or Save as Draft.", "warning");
    //    return
    //}
    $('#modal-financePickupService-upload').modal('show');
    $('#txt_financePickupService_fileType').val('');
    $('#attachment-financePickupService').val('');
    $('#txt_financePickupService_FileDescription').val('');
    files2 = null;
    $('#new-img-financePickupService').addClass('hide');
    $('#new-file-financePickupService').attr('hidden', true);
}
function ClearHcUpload() {
    //debugger
    //if ($('#txt_TicketId').val().length == 0) {
    //    Swal.fire("Failed", "Ticket Kso Not Exists. Please Submit or Save as Draft.", "warning");
    //    return
    //}
    $('#modal-hc-upload').modal('show');
    $('#txt_hc_fileType').val('');
    $('#attachment-hc').val('');
    $('#txt_hc_FileDescription').val('');
    files2 = null;
    $('#new-img-hc').addClass('hide');
    $('#new-file-hc').attr('hidden', true);
}
function ClearItemHc() {
    $('#txt_Hc_Fullname').val('');
    $('#Ddl_Hc_JenisKelamin').val('All').trigger('change');
    $('#txt_Hc_Posisi').val('');
    $('#txt_Hc_Pendidikan').val('');
    $('#txt_Hc_Pengalaman').val('');
    $('#datePickerDefault6').datepicker('setDate', new Date());
    $('#txt_Hc_Usia').val(0);
}
function ClearItemHcSdmSam() {
    $('#txt_Hc_Posisi_SdmSam').val('');
    $('#txt_Hc_Jumlah_SdmSam').val('');
    $('#txt_Hc_Posisi_SdmSam').val('All').trigger('change');
    $('#Ddl_Hc_JenisKelamin_SdmSam').val('All').trigger('change');
}

function DisableInputInformation() {
    $('.ksosam').attr('disabled', true);
    $('.ksobak').attr('disabled', true);
    $('.ksobpd').attr('disabled', true);
    $('.ksopettycash').attr('disabled', true);
    $('.ksopickup').attr('disabled', true);
    $('.ksohc').attr('disabled', true);
    $('.ksolegal').attr('disabled', true);
    $('.ksoteknik').attr('disabled', true);
    $('.form-input-mst').prop('disabled', true);
    $('.form-input-prt').prop('disabled', true);

    //$('#txt_SPBUName').attr('disabled', true);
    //$('#txt_SPBUNomor').attr('disabled', true);
    //$('#txt_SPBUType').attr('disabled', true);
    //$('#txt_SPBUGrading').attr('disabled', true);
    //$('#Ddl_SPBURole').attr('disabled', true);
    //$('#btn_new_product').attr('disabled', true);
    //$('#txt_SPBUBadanUsaha').attr('disabled', true);
    //$('#txt_start_date').attr('disabled', true);
    //$('#txt_end_date').attr('disabled', true);    
    //$('.inputValue').attr('disabled', true);
    //$('.BtnSelectProductVolume').attr('disabled', true);
    //$('#txt_SPBUProvince').attr('disabled', true);
    //$('#txt_SPBUCity').attr('disabled', true);
    //$('#txt_SPBUDistrict').attr('disabled', true);
    //$('#txt_SPBUVillage').attr('disabled', true);
    //$('#txt_SPBUZipCode').attr('disabled', true);
    //$('#txt_SPBUKoordinate').attr('disabled', true);
    //$('#txt_SPBUAddress').attr('disabled', true);
    //$('#txt_SalesArea').attr('disabled', true);
    //$('#txt_MOR').attr('disabled', true);
    //$('#txt_durasi').attr('disabled', true);
    //$('#ddl_sam_asmen').attr('disabled', true);
    //$('#ddl_sam_manager').attr('disabled', true);
    //$('#ListProduk').attr('disabled', true);
}

//#endregion


//#region Ajax Delete
function AjaxDeleteKsoById(Id) {
    var DeleteId = $.ajax({
        url: origin + '/FormKSO/DeleteKso?Id=' + Id,
        type: 'GET',
        dataType: "json",
        cache: false,
        async: false,
        contentType: false,
        processData: false,
        error: function (request, status, error) {
            Swal.close();
            Swal.fire("Failed", "Gagal memproses data.", "error");
        }
    });

    Swal.close();

    if (DeleteId.status != 200) {
        Swal.fire("Failed", "Gagal memproses data.", "error");
    }
    else {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been deleted',
            showConfirmButton: false,
            timer: 1500
        });
               
        location.reload(true);
        //AjaxListDataBak($('#txt_TicketId').val());
    }
};
function AjaxDeleteFileKsoById(Id) {
    var DeleteId = $.ajax({
        url: origin + '/FormKSO/DeleteFileKsoById?Id=' + Id,
        type: 'GET',
        dataType: "json",
        cache: false,
        async: false,
        contentType: false,
        processData: false,
        error: function (request, status, error) {
            Swal.close();
            Swal.fire("Failed", "Gagal memproses data.", "error");
        }
    });

    Swal.close();

    if (DeleteId.status != 200) {
        Swal.fire("Failed", "Gagal memproses data.", "error");
    }
    else {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been deleted',
            showConfirmButton: false,
            timer: 1500
        });

        AjaxListFileKso($('#txt_TicketId').val());
        //location.reload();
        //AjaxListDataBak($('#txt_TicketId').val());
    }
};
function AjaxDeleteFileBakById(Id) {
    var DeleteId = $.ajax({
        url: origin + '/FormKSO/DeleteFileBakById?Id=' + Id,
        type: 'GET',
        dataType: "json",
        cache: false,
        async: false,
        contentType: false,
        processData: false,
        error: function (request, status, error) {
            Swal.close();
            Swal.fire("Failed", "Gagal memproses data.", "error");
        }
    });

    Swal.close();

    if (DeleteId.status != 200) {
        Swal.fire("Failed", "Gagal memproses data.", "error");
    }
    else {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been deleted',
            showConfirmButton: false,
            timer: 1500
        });

        AjaxListFileBak($('#txt_TicketId').val());
        //location.reload();
        //AjaxListDataBak($('#txt_TicketId').val());
    }
};
function AjaxDeleteFileBpdById(Id) {
    var DeleteId = $.ajax({
        url: origin + '/FormKSO/DeleteFileBpdById?Id=' + Id,
        type: 'GET',
        dataType: "json",
        cache: false,
        async: false,
        contentType: false,
        processData: false,
        error: function (request, status, error) {
            Swal.close();
            Swal.fire("Failed", "Gagal memproses data.", "error");
        }
    });

    Swal.close();

    if (DeleteId.status != 200) {
        Swal.fire("Failed", "Gagal memproses data.", "error");
    }
    else {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been deleted',
            showConfirmButton: false,
            timer: 1500
        });

        AjaxListFileBpd($('#txt_TicketId').val());

        //location.reload();
        //AjaxListDataBak($('#txt_TicketId').val());
    }
};
function AjaxDeleteFileLegalById(Id) {
    var DeleteId = $.ajax({
        url: origin + '/FormKSO/DeleteFileLegalById?Id=' + Id,
        type: 'GET',
        dataType: "json",
        cache: false,
        async: false,
        contentType: false,
        processData: false,
        error: function (request, status, error) {
            Swal.close();
            Swal.fire("Failed", "Gagal memproses data.", "error");
        }
    });

    Swal.close();

    if (DeleteId.status != 200) {
        Swal.fire("Failed", "Gagal memproses data.", "error");
    }
    else {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been deleted',
            showConfirmButton: false,
            timer: 1500
        });

        AjaxListFileLegal($('#txt_TicketId').val());

        //location.reload();
        //AjaxListDataBak($('#txt_TicketId').val());
    }
};
function AjaxDeleteFileTeknikById(Id) {
    var DeleteId = $.ajax({
        url: origin + '/FormKSO/DeleteFileTeknikById?Id=' + Id,
        type: 'GET',
        dataType: "json",
        cache: false,
        async: false,
        contentType: false,
        processData: false,
        error: function (request, status, error) {
            Swal.close();
            Swal.fire("Failed", "Gagal memproses data.", "error");
        }
    });

    Swal.close();

    if (DeleteId.status != 200) {
        Swal.fire("Failed", "Gagal memproses data.", "error");
    }
    else {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been deleted',
            showConfirmButton: false,
            timer: 1500
        });

        AjaxListFileLegal($('#txt_TicketId').val());

        //location.reload();
        //AjaxListDataBak($('#txt_TicketId').val());
    }
};
function AjaxDeleteFileFinanceById(Id) {
    var DeleteId = $.ajax({
        url: origin + '/FormKSO/DeleteFileFinanceById?Id=' + Id,
        type: 'GET',
        dataType: "json",
        cache: false,
        async: false,
        contentType: false,
        processData: false,
        error: function (request, status, error) {
            Swal.close();
            Swal.fire("Failed", "Gagal memproses data.", "error");
        }
    });

    Swal.close();

    if (DeleteId.status != 200) {
        Swal.fire("Failed", "Gagal memproses data.", "error");
    }
    else {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been deleted',
            showConfirmButton: false,
            timer: 1500
        });

        AjaxListFileFinance($('#txt_TicketId').val());

        //location.reload();
        //AjaxListDataBak($('#txt_TicketId').val());
    }
};
function AjaxDeleteFileIctById(Id) {
    var DeleteId = $.ajax({
        url: origin + '/FormKSO/DeleteFileIctById?Id=' + Id,
        type: 'GET',
        dataType: "json",
        cache: false,
        async: false,
        contentType: false,
        processData: false,
        error: function (request, status, error) {
            Swal.close();
            Swal.fire("Failed", "Gagal memproses data.", "error");
        }
    });

    Swal.close();

    if (DeleteId.status != 200) {
        Swal.fire("Failed", "Gagal memproses data.", "error");
    }
    else {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been deleted',
            showConfirmButton: false,
            timer: 1500
        });

        Swal.fire({
            title: 'Loading...',
            showConfirmButton: false,
            allowOutsideClick: false,
            onBeforeOpen: () => {
                showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');

                setTimeout(() => {

                    AjaxListFileIct($('#txt_TicketId').val());

                }, 1500);
            },
            onClose: () => {
                Swal.close();
            }
        });

    }
};
function AjaxDeleteFileHcById(Id) {
    var DeleteId = $.ajax({
        url: origin + '/FormKSO/DeleteFileHcById?Id=' + Id,
        type: 'GET',
        dataType: "json",
        cache: false,
        async: false,
        contentType: false,
        processData: false,
        error: function (request, status, error) {
            Swal.close();
            Swal.fire("Failed", "Gagal memproses data.", "error");
        }
    });

    Swal.close();

    if (DeleteId.status != 200) {
        Swal.fire("Failed", "Gagal memproses data.", "error");
    }
    else {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been deleted',
            showConfirmButton: false,
            timer: 1500
        });

        AjaxListFileHc($('#txt_TicketId').val());

        //location.reload();
        //AjaxListDataBak($('#txt_TicketId').val());
    }
};
//#endregion

//#region Ajax Save
function IbosSubmitPickupServiceDetail() {
    let DtForm = $('#frmKsoAllOperateTac');
    let DtDisabled = DtForm.find(':input:disabled');
    DtForm.find(':input:disabled').removeAttr('disabled');

    let frmData = DtForm.serializeArray();
    FrData = new FormData();

    $.each(frmData, function (key, input) {
        FrData.append(input.name, $.trim(input.value));
    });

    DtDisabled.attr('disabled', true);

    Swal.showLoading();
    $.ajax({
        type: 'POST',
        enctype: 'multipart/form-data',
        url: UrlOrigin + '/FormKSO/IbosSubmitPickupServiceDetail',
        data: FrData,
        processData: false,
        cache: false,
        async: false,
        contentType: false,
        timeout: 800000,
        success: function (data) {
            Swal.close();
            debugger
            if (data.status != 200) {
                Swal.fire("Failed", "Data tidak berhasil di process.", "error");
            } else {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 1500
                });

                window.location.replace(UrlOrigin + '/formkso/detail?Id=' + data.data.id);
            }
        },
        error: function (e) {

            //close wal
            Swal.close();

            //display alert error
            if (e.status == 400 || e.status == 422) {
                let cnt = 0;
                $.each(e.responseJSON.errors, function (key, value) {
                    if (cnt == 0) {
                        console.log('value: ' + value);
                        Swal.fire("Failed", '' + value, "error");
                    }
                    cnt++;
                });
            } else {
                Swal.fire("Failed", "Data tidak berhasil di process.", "error");
            }

        }
    });
}
function IbosSubmitMasterStation() {
    if ($('#txt_ict_Mst_StationId').val() == '') {
        Swal.fire("Failed", "Mohon Isi Feedback SSC Station Id", "warning");
        return false;
    };
    if ($('#txt_ict_Mst_CostCenterNo').val() == '') {
        Swal.fire("Failed", "Mohon Isi Feedback SSC No Cost Center", "warning");
        return false;
    };
    if ($('#txt_ict_Mst_PlantNo').val() == '') {
        Swal.fire("Failed", "Mohon Isi Feedback SSC No Plant", "warning");
        return false;
    };
    if ($('#txt_ict_Mst_UserSSO').val() == '') {
        Swal.fire("Failed", "Mohon Isi Feedback SSC User SSO", "warning");
        return false;
    };

    let DtForm = $('#frmKsoAllOperateTac');
    let DtDetele = DtForm.find(':input:disabled');
    DtForm.find(':input:disabled').removeAttr('disabled');

    let frmData = DtForm.serializeArray();
    FrData = new FormData();

    $.each(frmData, function (key, input) {
        FrData.append(input.name, $.trim(input.value));
    });
    DtDetele.attr('disabled', true);

    showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
    setTimeout(() => {
        $.ajax({
            type: 'POST',
            enctype: 'multipart/form-data',
            url: UrlOrigin + '/FormKSO/IbosSubmitMasterStation',
            data: FrData,
            processData: false,
            cache: false,
            async: false,
            contentType: false,
            timeout: 800000,
            success: function (data) {
                Swal.close();
                debugger
                if (data.status != 200) {
                    Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                } else {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your work has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setTimeout(() => { location.reload(true); }, 1500);

                    //window.location.replace(UrlOrigin + '/formkso/detail?Id=' + id);
                }
            },
            error: function (e) {

                //close wal
                Swal.close();

                //display alert error
                if (e.status == 400 || e.status == 422) {
                    let cnt = 0;
                    $.each(e.responseJSON.errors, function (key, value) {
                        if (cnt == 0) {
                            console.log('value: ' + value);
                            Swal.fire("Failed", '' + value, "error");
                        }
                        cnt++;
                    });
                } else {
                    Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                }

            }
        });
    },
    500);    
}
//#endregion

//#region Ajax Update

//#endregion

//#region Ajax List File
function AjaxListActivity(TicketId) {
    if (TicketId != "") {

        $.ajax({
            type: 'GET',
            url: UrlOrigin + '/FormKSO/GetComment?TicketId=' + TicketId,
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

                $('#Ul-ActivityLog').empty();
                var StrContent = "";
                for (var i = 0; i < data.data.length; i++) {
                    if (i == (data.data.length - 1)) {
                        if (Number(data.data[i].status) == 9) {
                            StrContent = "<li class='timeline-item mb-3 focusview'><span class='timeline-icon-primary'><i class='fas fa-pencil-alt fa-sm fa-fw'></i></span>" +
                                "<h6 class='fw-bold mb-1'>" + data.data[i].log_Title + " To " + data.data[i].next_Title + "</h6>" +
                                "<p class='text-muted mb-1 fw-bold tx-12'>" + data.data[i].createdAtFormated + "</p>" +
                                "<div class='form-group card p-2 text-white bg-secondary'>" + data.data[i].log_Message + "</div></li>"
                        }
                        else {
                            StrContent = "<li class='timeline-item mb-3 focusview'><span class='timeline-icon-primary'>" +
                                "<i class='fas fa-pencil-alt fa-sm fa-fw'></i></span>" +
                                "<h6 class='fw-bold mb-1'>" + data.data[i].log_Title + "</h6>" +
                                "<p class='text-muted mb-1 fw-bold tx-12'>" + data.data[i].createdAtFormated + "</p>" +
                                "<p class='text-primary tx-13'>" + data.data[i].log_Message + "</p></li>"
                        }
                    }
                    else {
                        if (Number(data.data[i].status) == 9) {
                            StrContent = "<li class='timeline-item mb-3'><span class='timeline-icon-primary'><i class='fas fa-pencil-alt fa-sm fa-fw'></i></span>" +
                                "<h6 class='fw-bold mb-1'>" + data.data[i].log_Title + " To " + data.data[i].next_Title + "</h6>" +
                                "<p class='text-muted mb-1 fw-bold tx-12'>" + data.data[i].createdAtFormated + "</p>" +
                                "<div class='form-group card p-2 text-white bg-secondary'>" + data.data[i].log_Message + "</div></li>"
                        }
                        else {
                            StrContent = "<li class='timeline-item mb-3'><span class='timeline-icon-primary'>" +
                                "<i class='fas fa-pencil-alt fa-sm fa-fw'></i></span>" +
                                "<h6 class='fw-bold mb-1'>" + data.data[i].log_Title + "</h6>" +
                                "<p class='text-muted mb-1 fw-bold tx-12'>" + data.data[i].createdAtFormated + "</p>" +
                                "<p class='text-primary tx-13'>" + data.data[i].log_Message + "</p></li>"
                        }
                    }

                    $('#Ul-ActivityLog').append(StrContent);
                }

                $(".focusview").get(0).scrollIntoView({ behavior: 'smooth' });
                Swal.close();
            }
        });
    }
};
function AjaxListFileKso(TicketId) {
    if (TicketId != "") {

        $.ajax({
            type: 'GET',
            url: UrlOrigin + '/FormKSO/GetListFileKso?TicketId=' + TicketId,
            dataType: 'json',
            cache: false,
            async: true,
            error: function (request, status, error) {
                Swal.close();
                Swal.fire("Failed", "Gagal menyiapkan data.", "error");
            },
            success: function (data) {
                debugger
                if (data.error) {
                    Swal.close();
                    Swal.fire("Failed", "Gagal menyiapkan data.", "error");
                    return
                }

                $('#DtKsoFile').DataTable().clear().draw();

                if (data.data.length != 0) {

                    for (var i = 0; i < data.data.length; i++) {
                        $('#DtKsoFile').DataTable().row.add([
                            '<div class="btn-group me-2" role="group" aria-label="First group">' +
                            '<button type = "button" class= "btn btn-warning btn-icon-text" onclick = "ShowFilekso(' + data.data[i].id + ')" >' +
                            '<i class="btn-icon-append" data-feather="edit"></i> Edit</button > ' +
                            '<button type="button" class="btn btn-danger btn-icon-text ksoatt" onclick="DeleteFilekso(' + data.data[i].id + ')">' +
                            '<i class="btn-icon-append" data-feather="delete"></i> Delete</button ></div > '
                            , data.data[i].type
                            , data.data[i].fileName
                            , data.data[i].creator
                        ]).draw();
                    }
                    feather.replace();
                }

                Swal.close();
            }
        });
    }
};
function AjaxListFileBak(TicketId) {
    if (TicketId != "") {

        $.ajax({
            type: 'GET',
            url: UrlOrigin + '/FormKSO/GetListFileBak?TicketId=' + TicketId,
            dataType: 'json',
            cache: false,
            async: true,
            error: function (request, status, error) {
                Swal.close();
                Swal.fire("Failed", "Gagal menyiapkan data.", "error");
            },
            success: function (data) {
                debugger
                if (data.error) {
                    Swal.close();
                    Swal.fire("Failed", "Gagal menyiapkan data.", "error");
                    return
                }

                $('#dataTableBakFile').DataTable().clear().draw();

                if (data.data.length != 0) {

                    for (var i = 0; i < data.data.length; i++) {
                        $('#dataTableBakFile').DataTable().row.add([
                            '<div class="btn-group me-2" role="group" aria-label="First group">' +
                            '<button type = "button" class= "btn btn-warning btn-icon-text" onclick = "ShowMCategoryById(' + data.data[i].id + ')" >' +
                            '<i class="btn-icon-append" data-feather="edit"></i> Edit</button > ' +
                            '<button type="button" class="btn btn-danger btn-icon-text" onclick="DeleteMCategoryById(' + data.data[i].id + ')">' +
                            '<i class="btn-icon-append" data-feather="delete"></i> Delete</button ></div > '
                            , data.data[i].type
                            , data.data[i].fileName
                            , data.data[i].creator
                        ]).draw();
                    }
                    feather.replace();
                }

                Swal.close();

                if (data.data.filter(w => w.type == 'BAK').length != 0) {
                    $('#H_StatusBak').val(TicketId);
                    $('#txt_Bak_WfStatus').val('File BAK Exists')
                }
                else {
                    $('#H_StatusBak').val('');
                    $('#txt_Bak_WfStatus').val('Waiting For Upload BAK')
                }

                //ModelTable = $('#dataTable2').DataTable();
                //new $.fn.dataTable.FixedColumns(ModelTable).left();
            }
        });
    }
};
function AjaxListFileIct(TicketId) {
    if (TicketId != "") {

        $.ajax({
            type: 'GET',
            url: UrlOrigin + '/FormKSO/GetListFileIct?TicketId=' + TicketId,
            dataType: 'json',
            cache: false,
            async: true,
            error: function (request, status, error) {
                Swal.close();
                Swal.fire("Failed", "Gagal menyiapkan data.", "error");
            },
            success: function (data) {
                debugger
                if (data.error) {
                    Swal.close();
                    Swal.fire("Failed", "Gagal menyiapkan data.", "error");
                    return
                }

                $('#dataTableIctFile').DataTable().clear().draw();

                if (data.data.length != 0) {

                    for (var i = 0; i < data.data.length; i++) {
                        $('#dataTableIctFile').DataTable().row.add([
                            '<div class="btn-group me-2" role="group" aria-label="First group">' +
                            '<button type = "button" class= "btn btn-primary btn-icon-text" onclick = "ShowFileIct(' + data.data[i].id + ')" >' +
                            ' <i class="btn-icon-append" data-feather="eye"></i> View</button > ' +
                            '<button type="button" class="btn btn-danger btn-icon-text" onclick="DeleteFileIct(' + data.data[i].id + ')">' +
                            '<i class="btn-icon-append" data-feather="delete"></i> Delete</button ></div > '
                            , data.data[i].type
                            , data.data[i].fileName
                            , data.data[i].creator
                        ]).draw();
                    }
                    feather.replace();
                }

                Swal.close();

                //ModelTable = $('#dataTable2').DataTable();
                //new $.fn.dataTable.FixedColumns(ModelTable).left();
            }
        });
    }
};
function AjaxListFileHc(TicketId) {
    if (TicketId != "") {

        $.ajax({
            type: 'GET',
            url: UrlOrigin + '/FormKSO/GetListFileHc?TicketId=' + TicketId,
            dataType: 'json',
            cache: false,
            async: true,
            error: function (request, status, error) {
                Swal.close();
                Swal.fire("Failed", "Gagal menyiapkan data.", "error");
            },
            success: function (data) {
                debugger
                if (data.error) {
                    Swal.close();
                    Swal.fire("Failed", "Gagal menyiapkan data.", "error");
                    return
                }

                $('#Tbl_Hc_File').DataTable().clear().draw();

                if (data.data.length != 0) {

                    for (var i = 0; i < data.data.length; i++) {
                        $('#Tbl_Hc_File').DataTable().row.add([
                            '<div class="btn-group me-2" role="group" aria-label="First group">' +
                            '<button type="button" class="btn btn-primary btn-icon-text" onclick="ShowFileHc(' + data.data[i].id + ')">' +
                            '<i class="btn-icon-append" data-feather="eye"></i> View' +
                            '</button>' +
                            '<button type="button" class="btn btn-danger btn-icon-text" onclick="DeleteFileHc(' + data.data[i].id + ')">' +
                            '<i class="btn-icon-append" data-feather="trash-2"></i> Delete' +
                            '</button>' +
                            '</div>'
                            , data.data[i].type
                            , data.data[i].fileName
                            , data.data[i].creator
                        ]).draw();
                    }
                    feather.replace();
                }

                Swal.close();

                //ModelTable = $('#dataTable2').DataTable();
                //new $.fn.dataTable.FixedColumns(ModelTable).left();
            }
        });
    }
};
function AjaxListFileBpd(TicketId) {
    if (TicketId != "") {

        $.ajax({
            type: 'GET',
            url: UrlOrigin + '/FormKSO/GetListFileBpd?TicketId=' + TicketId,
            dataType: 'json',
            cache: false,
            async: true,
            error: function (request, status, error) {
                Swal.close();
                Swal.fire("Failed", "Gagal menyiapkan data.", "error");
            },
            success: function (data) {
                debugger
                if (data.error) {
                    Swal.close();
                    Swal.fire("Failed", "Gagal menyiapkan data.", "error");
                    return
                }

                $('#Tbl_Bpd_File').DataTable().clear().draw();

                if (data.data.length != 0) {

                    for (var i = 0; i < data.data.length; i++) {
                        $('#Tbl_Bpd_File').DataTable().row.add([
                            '<div class="btn-group me-2" role="group" aria-label="First group">' +
                            '<button type="button" class="btn btn-primary btn-icon-text" onclick="ShowFileBpd(' + data.data[i].id + ')">' +
                            '<i class="btn-icon-append" data-feather="eye"></i> View' +
                            '</button>' +
                            '<button type="button" class="btn btn-danger btn-icon-text" onclick="DeleteFileBpd(' + data.data[i].id + ')">' +
                            '<i class="btn-icon-append" data-feather="trash-2"></i> Delete' +
                            '</button>' +
                            '</div>'
                            , data.data[i].type
                            , data.data[i].fileName
                            , data.data[i].creator
                        ]).draw();
                    }
                    feather.replace();
                }

                Swal.close();

                //ModelTable = $('#dataTable2').DataTable();
                //new $.fn.dataTable.FixedColumns(ModelTable).left();
            }
        });
    }
};
function AjaxListFileBpdKajian(TicketId) {
    if (TicketId != "") {

        $.ajax({
            type: 'GET',
            url: UrlOrigin + '/FormKSO/GetListFileBpd?TicketId=' + TicketId +'&Tipe=kajian',
            dataType: 'json',
            cache: false,
            async: true,
            error: function (request, status, error) {
                Swal.close();
                Swal.fire("Failed", "Gagal menyiapkan data.", "error");
            },
            success: function (data) {
                debugger
                if (data.error) {
                    Swal.close();
                    Swal.fire("Failed", "Gagal menyiapkan data.", "error");
                    return
                }
                
                $('#Tbl_Bpd_FileKajian').DataTable().clear().draw();

                if (data.data.length != 0) {

                    for (var i = 0; i < data.data.length; i++) {
                        $('#Tbl_Bpd_FileKajian').DataTable().row.add([
                            '<div class="btn-group me-2" role="group" aria-label="First group">' +
                            '<button type="button" class="btn btn-primary btn-icon-text" onclick="ShowFileBpd(' + data.data[i].id + ')">' +
                            '<i class="btn-icon-append" data-feather="eye"></i> View' +
                            '</button>' +
                            '<button type="button" class="btn btn-danger btn-icon-text ksobpd" onclick="DeleteFileBpd(' + data.data[i].id + ')">' +
                            '<i class="btn-icon-append" data-feather="trash-2"></i> Delete' +
                            '</button>' +
                            '</div>'
                            , data.data[i].fileName
                            , data.data[i].creator
                        ]).draw();
                    }
                    feather.replace();
                }

                Swal.close();
                Swal.close();

            }
        });
    }
};
function AjaxListFileLegal(TicketId) {
    if (TicketId != "") {

        $.ajax({
            type: 'GET',
            url: UrlOrigin + '/FormKSO/GetListFileLegal?TicketId=' + TicketId,
            dataType: 'json',
            cache: false,
            async: true,
            error: function (request, status, error) {
                Swal.close();
                Swal.fire("Failed", "Gagal menyiapkan data.", "error");
            },
            success: function (data) {
                debugger
                if (data.error) {
                    Swal.close();
                    Swal.fire("Failed", "Gagal menyiapkan data.", "error");
                    return
                }

                $('#Tbl-Legal-File').DataTable().clear().draw();

                if (data.data.length != 0) {

                    for (var i = 0; i < data.data.length; i++) {
                        $('#Tbl-Legal-File').DataTable().row.add([
                            '<div class="btn-group me-2" role="group" aria-label="First group">' +
                            '<button type="button" class="btn btn-primary btn-icon-text" onclick="ShowFileLegal(' + data.data[i].id + ')">' +
                            '<i class="btn-icon-append" data-feather="eye"></i> View' +
                            '</button>' +
                            '<button type="button" class="btn btn-danger btn-icon-text" onclick="DeleteFileLegal(' + data.data[i].id + ')">' +
                            '<i class="btn-icon-append" data-feather="trash-2"></i> Delete' +
                            '</button>' +
                            '</div>'
                            , data.data[i].type
                            , data.data[i].fileName
                            , data.data[i].creator
                        ]).draw();
                    }
                    feather.replace();
                }

                Swal.close();

                //ModelTable = $('#dataTable2').DataTable();
                //new $.fn.dataTable.FixedColumns(ModelTable).left();
            }
        });
    }
};
function AjaxListFileTeknik(TicketId) {
    if (TicketId != "") {

        $.ajax({
            type: 'GET',
            url: UrlOrigin + '/FormKSO/GetListFileTeknik?TicketId=' + TicketId,
            dataType: 'json',
            cache: false,
            async: true,
            error: function (request, status, error) {
                Swal.close();
                Swal.fire("Failed", "Gagal menyiapkan data.", "error");
            },
            success: function (data) {
                debugger
                if (data.error) {
                    Swal.close();
                    Swal.fire("Failed", "Gagal menyiapkan data.", "error");
                    return
                }

                $('#Tbl-Teknik-File').DataTable().clear().draw();

                if (data.data.length != 0) {

                    for (var i = 0; i < data.data.length; i++) {
                        $('#Tbl-Teknik-File').DataTable().row.add([
                            '<div class="btn-group me-2" role="group" aria-label="First group">' +
                            '<button type="button" class="btn btn-primary btn-icon-text" onclick="ShowFileTeknik(' + data.data[i].id + ')">' +
                            '<i class="btn-icon-append" data-feather="eye"></i> View' +
                            '</button>' +
                            '<button type="button" class="btn btn-danger btn-icon-text" onclick="DeleteFileTeknik(' + data.data[i].id + ')">' +
                            '<i class="btn-icon-append" data-feather="trash-2"></i> Delete' +
                            '</button>' +
                            '</div>'
                            , data.data[i].type
                            , data.data[i].fileName
                            , data.data[i].creator
                        ]).draw();
                    }
                    feather.replace();
                }

                Swal.close();

                //ModelTable = $('#dataTable2').DataTable();
                //new $.fn.dataTable.FixedColumns(ModelTable).left();
            }
        });
    }
};
function AjaxListFileFinancePettyCash(TicketId) {
    if (TicketId != "") {

        $.ajax({
            type: 'GET',
            url: UrlOrigin + '/FormKSO/GetListFileFinance?TicketId=' + TicketId + '&Posisi=PettyCash',
            dataType: 'json',
            cache: false,
            async: true,
            error: function (request, status, error) {
                Swal.close();
                Swal.fire("Failed", "Gagal menyiapkan data.", "error");
            },
            success: function (data) {
                debugger
                if (data.error) {
                    Swal.close();
                    Swal.fire("Failed", "Gagal menyiapkan data.", "error");
                    return
                }

                $('#Tbl-FinancePettyCash-File').DataTable().clear().draw();

                if (data.data.length != 0) {

                    for (var i = 0; i < data.data.length; i++) {
                        $('#Tbl-FinancePettyCash-File').DataTable().row.add([
                            '<div class="btn-group me-2" role="group" aria-label="First group">' +
                            '<button type="button" class="btn btn-primary btn-icon-text" onclick="ShowFileFinance(' + data.data[i].id + ')">' +
                            '<i class="btn-icon-append" data-feather="eye"></i> View' +
                            '</button>' +
                            '<button type="button" class="btn btn-danger btn-icon-text" onclick="DeleteFileFinance(' + data.data[i].id + ')">' +
                            '<i class="btn-icon-append" data-feather="trash-2"></i> Delete' +
                            '</button>' +
                            '</div>'
                            , data.data[i].type
                            , data.data[i].fileName
                            , data.data[i].creator
                        ]).draw();
                    }
                    feather.replace();
                }

                Swal.close();

                //ModelTable = $('#dataTable2').DataTable();
                //new $.fn.dataTable.FixedColumns(ModelTable).left();
            }
        });
    }
};
function AjaxListFileFinancePickupService(TicketId) {
    if (TicketId != "") {

        $.ajax({
            type: 'GET',
            url: UrlOrigin + '/FormKSO/GetListFileFinance?TicketId=' + TicketId + '&Posisi=PickupService',
            dataType: 'json',
            cache: false,
            async: true,
            error: function (request, status, error) {
                Swal.close();
                Swal.fire("Failed", "Gagal menyiapkan data.", "error");
            },
            success: function (data) {
                debugger
                if (data.error) {
                    Swal.close();
                    Swal.fire("Failed", "Gagal menyiapkan data.", "error");
                    return
                }

                $('#Tbl-FinancePickupService-File').DataTable().clear().draw();

                if (data.data.length != 0) {

                    for (var i = 0; i < data.data.length; i++) {
                        $('#Tbl-FinancePickupService-File').DataTable().row.add([
                            '<div class="btn-group me-2" role="group" aria-label="First group">' +
                            '<button type="button" class="btn btn-primary btn-icon-text" onclick="ShowFileFinance(' + data.data[i].id + ')">' +
                            '<i class="btn-icon-append" data-feather="eye"></i> View' +
                            '</button>' +
                            '<button type="button" class="btn btn-danger btn-icon-text" onclick="DeleteFileFinance(' + data.data[i].id + ')">' +
                            '<i class="btn-icon-append" data-feather="trash-2"></i> Delete' +
                            '</button>' +
                            '</div>'
                            , data.data[i].type
                            , data.data[i].fileName
                            , data.data[i].creator
                        ]).draw();
                    }
                    feather.replace();
                }

                Swal.close();

                //ModelTable = $('#dataTable2').DataTable();
                //new $.fn.dataTable.FixedColumns(ModelTable).left();
            }
        });
    }
};
//#endregion

function ClearActiveNav() {
    $('#nav-bak').removeClass('active');
    $('#nav-bpd').removeClass('active');
    $('#nav-ict').removeClass('active');
    $('#nav-hc').removeClass('active');
    $('#nav-finance').removeClass('active');
    $('#nav-teknik').removeClass('active');
    $('#nav-legal').removeClass('active');
    $('#nav-att').removeClass('active');

    $('#Tab-PettyCash').removeClass('active');
    $('#Tab-PickupService').removeClass('active');

    $('#SubMenuIctCostCenter-line-tab').removeClass('active');
    $('#SubMenuPengadaanPerangkat-line-tab').removeClass('active');
    $('#SubMenuIctCostCenter').removeClass('show active');
    $('#SubMenuPengadaanPerangkat').removeClass('show active');

    $('#DivBak').removeClass('show active');
    $('#DivBpd').removeClass('show active');
    $('#DivIct').removeClass('show active');
    $('#DivHc').removeClass('show active');
    $('#DivFinance').removeClass('show active');
    $('#DivTeknik').removeClass('show active');
    $('#DivLegal').removeClass('show active');
    $('#DivAtt').removeClass('show active');

    $('#DivBak').addClass('hide');
    $('#DivBpd').addClass('hide');
    $('#DivIct').addClass('hide');
    $('#DivHc').addClass('hide');
    $('#DivFinance').addClass('hide');
    $('#DivTeknik').addClass('hide');
    $('#DivLegal').addClass('hide');
    $('#DivAtt').addClass('hide');

}

//#region Attachment

$('#attachment-ict').change(function () {

    inputFile2 = $('#attachment-ict');
    files2 = [];

    for (let index = 0; index < inputFile2[0].files.length; index++) {
        let file = inputFile2[0].files[index];

        if (file.size / 1024 >= 10000) {
            Swal.fire("Failed", "File size lebih dari 10 mb.", "warning");
            return
        }

        file.TmpUri = URL.createObjectURL(file);

        $('#new-file-ict').attr("hidden", true);
        $('#new-img-ict').addClass("hide");

        if (file.type.toLowerCase().indexOf("image") >= 0) {
            $('#new-img-ict').attr("alt", file.name.split('.').pop().toUpperCase());
            $('#new-img-ict').attr("src", file.TmpUri);
            $('#new-img-ict').removeClass("hide");
        }
        else if (file.type.toLowerCase().indexOf("pdf") >= 0) {
            $('#new-file-ict').attr("alt", file.name.split('.').pop().toUpperCase());
            $('#new-file-ict').attr("src", file.TmpUri);
            $('#new-file-ict').removeAttr("hidden");
        }

        let reader = new FileReader();
        reader.addEventListener("load", function (evt) {
            StData64 = evt.target.result;
        });

        reader.readAsDataURL(this.files[0]);
        file.Extention = "." + file.name.split(".").pop().toUpperCase();
        files2.push(file);
    }
});

$('#attachment-bak').change(function () {

    inputFile2 = $('#attachment-bak');
    files2 = [];

    for (let index = 0; index < inputFile2[0].files.length; index++) {
        let file = inputFile2[0].files[index];

        if (file.size / 1024 >= 10000) {
            Swal.fire("Failed", "File size lebih dari 10 mb.", "warning");
            return
        }

        file.TmpUri = URL.createObjectURL(file);

        $('#new-file-bak').attr("hidden", true);
        $('#new-img-bak').addClass("hide");

        if (file.type.toLowerCase().indexOf("image") >= 0) {
            $('#new-img-bak').attr("alt", file.name.split('.').pop().toUpperCase());
            $('#new-img-bak').attr("src", file.TmpUri);
            $('#new-img-bak').removeClass("hide");
        }
        else if (file.type.toLowerCase().indexOf("pdf") >= 0) {
            $('#new-file-bak').attr("alt", file.name.split('.').pop().toUpperCase());
            $('#new-file-bak').attr("src", file.TmpUri);
            $('#new-file-bak').removeAttr("hidden");
        }

        let reader = new FileReader();
        reader.addEventListener("load", function (evt) {
            StData64 = evt.target.result;
        });

        reader.readAsDataURL(this.files[0]);
        file.Extention = "." + file.name.split(".").pop().toUpperCase();
        files2.push(file);
    }
});
$('#attachment-bpd').change(function () {

    inputFile2 = $('#attachment-bpd');
    files2 = [];

    for (let index = 0; index < inputFile2[0].files.length; index++) {
        let file = inputFile2[0].files[index];

        if (file.size / 1024 >= 10000) {
            Swal.fire("Failed", "File size lebih dari 10 mb.", "warning");
            return
        }

        file.TmpUri = URL.createObjectURL(file);

        $('#new-file-bpd').attr("hidden", true);
        $('#new-img-bpd').addClass("hide");

        if (file.type.toLowerCase().indexOf("image") >= 0) {
            $('#new-img-bpd').attr("alt", file.name.split('.').pop().toUpperCase());
            $('#new-img-bpd').attr("src", file.TmpUri);
            $('#new-img-bpd').removeClass("hide");
        }
        else if (file.type.toLowerCase().indexOf("pdf") >= 0) {
            $('#new-file-bpd').attr("alt", file.name.split('.').pop().toUpperCase());
            $('#new-file-bpd').attr("src", file.TmpUri);
            $('#new-file-bpd').removeAttr("hidden");
        }

        let reader = new FileReader();
        reader.addEventListener("load", function (evt) {
            StData64 = evt.target.result;
        });

        reader.readAsDataURL(this.files[0]);
        file.Extention = "." + file.name.split(".").pop().toUpperCase();
        files2.push(file);
    }
});
$('#attachment-legal').change(function () {

    inputFile2 = $('#attachment-legal');
    files2 = [];

    for (let index = 0; index < inputFile2[0].files.length; index++) {
        let file = inputFile2[0].files[index];

        if (file.size / 1024 >= 10000) {
            Swal.fire("Failed", "File size lebih dari 10 mb.", "warning");
            return
        }

        file.TmpUri = URL.createObjectURL(file);

        $('#new-file-legal').attr("hidden", true);
        $('#new-img-legal').addClass("hide");

        if (file.type.toLowerCase().indexOf("image") >= 0) {
            $('#new-img-legal').attr("alt", file.name.split('.').pop().toUpperCase());
            $('#new-img-legal').attr("src", file.TmpUri);
            $('#new-img-legal').removeClass("hide");
        }
        else if (file.type.toLowerCase().indexOf("pdf") >= 0) {
            $('#new-file-legal').attr("alt", file.name.split('.').pop().toUpperCase());
            $('#new-file-legal').attr("src", file.TmpUri);
            $('#new-file-legal').removeAttr("hidden");
        }

        let reader = new FileReader();
        reader.addEventListener("load", function (evt) {
            StData64 = evt.target.result;
        });

        reader.readAsDataURL(this.files[0]);
        file.Extention = "." + file.name.split(".").pop().toUpperCase();
        files2.push(file);
    }
});
$('#attachment-teknik').change(function () {

    inputFile2 = $('#attachment-teknik');
    files2 = [];

    for (let index = 0; index < inputFile2[0].files.length; index++) {
        let file = inputFile2[0].files[index];

        if (file.size / 1024 >= 10000) {
            Swal.fire("Failed", "File size lebih dari 10 mb.", "warning");
            return
        }

        file.TmpUri = URL.createObjectURL(file);

        $('#new-file-teknik').attr("hidden", true);
        $('#new-img-teknik').addClass("hide");

        if (file.type.toLowerCase().indexOf("image") >= 0) {
            $('#new-img-teknik').attr("alt", file.name.split('.').pop().toUpperCase());
            $('#new-img-teknik').attr("src", file.TmpUri);
            $('#new-img-teknik').removeClass("hide");
        }
        else if (file.type.toLowerCase().indexOf("pdf") >= 0) {
            $('#new-file-teknik').attr("alt", file.name.split('.').pop().toUpperCase());
            $('#new-file-teknik').attr("src", file.TmpUri);
            $('#new-file-teknik').removeAttr("hidden");
        }

        let reader = new FileReader();
        reader.addEventListener("load", function (evt) {
            StData64 = evt.target.result;
        });

        reader.readAsDataURL(this.files[0]);
        file.Extention = "." + file.name.split(".").pop().toUpperCase();
        files2.push(file);
    }
});
$('#attachment-financePickupService').change(function () {

    inputFile2 = $('#attachment-financePickupService');
    files2 = [];

    for (let index = 0; index < inputFile2[0].files.length; index++) {
        let file = inputFile2[0].files[index];

        if (file.size / 1024 >= 10000) {
            Swal.fire("Failed", "File size lebih dari 10 mb.", "warning");
            return
        }

        file.TmpUri = URL.createObjectURL(file);

        $('#new-file-financePickupService').attr("hidden", true);
        $('#new-img-financePickupService').addClass("hide");

        if (file.type.toLowerCase().indexOf("image") >= 0) {
            $('#new-img-financePickupService').attr("alt", file.name.split('.').pop().toUpperCase());
            $('#new-img-financePickupService').attr("src", file.TmpUri);
            $('#new-img-financePickupService').removeClass("hide");
        }
        else if (file.type.toLowerCase().indexOf("pdf") >= 0) {
            $('#new-file-financePickupService').attr("alt", file.name.split('.').pop().toUpperCase());
            $('#new-file-financePickupService').attr("src", file.TmpUri);
            $('#new-file-financePickupService').removeAttr("hidden");
        }

        let reader = new FileReader();
        reader.addEventListener("load", function (evt) {
            StData64 = evt.target.result;
        });

        reader.readAsDataURL(this.files[0]);
        file.Extention = "." + file.name.split(".").pop().toUpperCase();
        files2.push(file);
    }
});
$('#attachment-financePettyCash').change(function () {

    inputFile2 = $('#attachment-financePettyCash');
    files2 = [];

    for (let index = 0; index < inputFile2[0].files.length; index++) {
        let file = inputFile2[0].files[index];

        if (file.size / 1024 >= 10000) {
            Swal.fire("Failed", "File size lebih dari 10 mb.", "warning");
            return
        }

        file.TmpUri = URL.createObjectURL(file);

        $('#new-file-financePettyCash').attr("hidden", true);
        $('#new-img-financePettyCash').addClass("hide");

        if (file.type.toLowerCase().indexOf("image") >= 0) {
            $('#new-img-financePettyCash').attr("alt", file.name.split('.').pop().toUpperCase());
            $('#new-img-financePettyCash').attr("src", file.TmpUri);
            $('#new-img-financePettyCash').removeClass("hide");
        }
        else if (file.type.toLowerCase().indexOf("pdf") >= 0) {
            $('#new-file-financePettyCash').attr("alt", file.name.split('.').pop().toUpperCase());
            $('#new-file-financePettyCash').attr("src", file.TmpUri);
            $('#new-file-financePettyCash').removeAttr("hidden");
        }

        let reader = new FileReader();
        reader.addEventListener("load", function (evt) {
            StData64 = evt.target.result;
        });

        reader.readAsDataURL(this.files[0]);
        file.Extention = "." + file.name.split(".").pop().toUpperCase();
        files2.push(file);
    }
});
$('#attachment_legal_Contract').change(function () {

    inputFile2 = $('#attachment_legal_Contract');
    FileLegalContract = [];

    for (let index = 0; index < inputFile2[0].files.length; index++) {
        let file = inputFile2[0].files[index];

        if (file.size / 1024 >= 10000) {
            Swal.fire("Failed", "File size lebih dari 10 mb.", "warning");
            return
        }

        file.TmpUri = URL.createObjectURL(file);

        let reader = new FileReader();
        reader.addEventListener("load", function (evt) {
            StData64Contract = evt.target.result;
        });

        reader.readAsDataURL(this.files[0]);
        file.Extention = "." + file.name.split(".").pop().toUpperCase();
        FileLegalContract.push(file);
    }
});
$('#attachment-hc').change(function () {

    inputFile2 = $('#attachment-hc');
    files2 = [];

    for (let index = 0; index < inputFile2[0].files.length; index++) {
        let file = inputFile2[0].files[index];

        if (file.size / 1024 >= 10000) {
            Swal.fire("Failed", "File size lebih dari 10 mb.", "warning");
            return
        }

        file.TmpUri = URL.createObjectURL(file);

        $('#new-file-hc').attr("hidden", true);
        $('#new-img-hc').addClass("hide");

        if (file.type.toLowerCase().indexOf("image") >= 0) {
            $('#new-img-hc').attr("alt", file.name.split('.').pop().toUpperCase());
            $('#new-img-hc').attr("src", file.TmpUri);
            $('#new-img-hc').removeClass("hide");
        }
        else if (file.type.toLowerCase().indexOf("pdf") >= 0) {
            $('#new-file-hc').attr("alt", file.name.split('.').pop().toUpperCase());
            $('#new-file-hc').attr("src", file.TmpUri);
            $('#new-file-hc').removeAttr("hidden");
        }

        let reader = new FileReader();
        reader.addEventListener("load", function (evt) {
            StData64 = evt.target.result;
        });

        reader.readAsDataURL(this.files[0]);
        file.Extention = "." + file.name.split(".").pop().toUpperCase();
        files2.push(file);
    }
});
$('#attachment-kso').change(function () {

    inputFile2 = $('#attachment-kso');
    files2 = [];

    for (let index = 0; index < inputFile2[0].files.length; index++) {
        let file = inputFile2[0].files[index];

        if (file.size / 1024 >= 10000) {
            Swal.fire("Failed", "File size lebih dari 10 mb.", "warning");
            return
        }

        file.TmpUri = URL.createObjectURL(file);

        $('#new-file-kso').attr("hidden", true);
        $('#new-img-kso').addClass("hide");

        if (file.type.toLowerCase().indexOf("image") >= 0) {
            $('#new-img-kso').attr("alt", file.name.split('.').pop().toUpperCase());
            $('#new-img-kso').attr("src", file.TmpUri);
            $('#new-img-kso').removeClass("hide");
        }
        else if (file.type.toLowerCase().indexOf("pdf") >= 0) {
            $('#new-file-kso').attr("alt", file.name.split('.').pop().toUpperCase());
            $('#new-file-kso').attr("src", file.TmpUri);
            $('#new-file-kso').removeAttr("hidden");
        }

        let reader = new FileReader();
        reader.addEventListener("load", function (evt) {
            StData64 = evt.target.result;
        });

        reader.readAsDataURL(this.files[0]);
        file.Extention = "." + file.name.split(".").pop().toUpperCase();
        files2.push(file);
    }
});
$('#attachment-bpdHasilKajian').change(function () {
    inputFile2 = $('#attachment-bpdHasilKajian');
    files2 = [];

    for (let index = 0; index < inputFile2[0].files.length; index++) {
        let file = inputFile2[0].files[index];

        if (file.size / 1024 >= 10000) {
            Swal.fire("Failed", "File size lebih dari 10 mb.", "warning");
            return
        }

        file.TmpUri = URL.createObjectURL(file);
               
        let reader = new FileReader();
        reader.addEventListener("load", function (evt) {
            StData64 = evt.target.result;
        });

        reader.readAsDataURL(this.files[0]);
        file.Extention = "." + file.name.split(".").pop().toUpperCase();
        files2.push(file);
    }
    
    showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
    setTimeout(function () {
        let DtForm = $('#frmKsoAllOperateTac');
        let DtDisabled = DtForm.find(':input:disabled');
        DtForm.find(':input:disabled').removeAttr('disabled');

        let frmData = DtForm.serializeArray();
        FrData = new FormData();

        $.each(frmData, function (key, input) {
            FrData.append(input.name, $.trim(input.value));
        });

        DtDisabled.attr('disabled', true);

        var Data = JSON.stringify({
            TicketId: $('#txt_TicketId').val(), FileName: files2[0].name, FileExtention: "." + files2[0].name.split(".").pop(), MimeType: files2[0].type,
            AsBase64: StData64.split(",").pop(), Type: "Kajian", Descriptions: $('#txt_bpd_FileDescription').val()
        });

        FrData.append('fileAtt', JSON.stringify(Data));

        var Save = $.ajax({
            type: 'POST',
            enctype: 'multipart/form-data',
            url: UrlOrigin + '/FormKSO/AddFileBpdKajian',
            data: FrData,
            processData: false,
            cache: false,
            async: false,
            contentType: false,
            timeout: 800000,
            error: function (request, status, error) {

                Swal.close();
                Swal.fire("Failed", request.responseJSON.detail, "error");
                return
            }
        });

        Swal.close();

        if (Save.status != 200) {

            Swal.fire("Failed", Save.responseJSON.detail, "error");
            return
        }
        else {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your work has been save',
                showConfirmButton: false,
                timer: 1500
            });
            AjaxListFileBpdKajian($('#txt_TicketId').val());
        }
    }, 1500);
});
//#endregion

//#region FBS Anggaran Rutin
function FBSDetailAnggaran(id) {
    showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');

    FrData = new FormData();
    FrData.append("action", 1);
    FrData.append("Id", id);

    Swal.fire({
        title: 'Loading...',
        showConfirmButton: false,
        allowOutsideClick: false,
        onBeforeOpen: () => {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');

            setTimeout(() => {
                $.ajax({
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    url: UrlOrigin + '/FormKSO/AnggaranRutinPettyCash',
                    data: FrData,
                    processData: false,
                    cache: false,
                    async: false,
                    contentType: false,
                    timeout: 800000,
                    success: function (data) {
                        Swal.close();

                        if (data.status != 200) {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        }
                        else {
                            $('#ddl_PettyCash_ActivityAnggaran').val(data.data.activityId).trigger('change');
                            $('#txt_PettyCash_description').val(data.data.description);
                            $('#txt_PettyCash_CoaId').val(data.data.coaCode + " - " + data.data.coaName);
                            $('#txt_PettyCash_NilaiAnggaran').val(data.data.amount);
                            $('#txt_PettyCash_note').val(data.data.note);
                            $('#txt_PettyCash_SAPNoRekening').val(data.data.norekening);
                            $('#txt_PettyCash_expanseNo').val(data.data.expanseNo);
                            $('#h_PettyCash_AnggaranId').val(data.data.id);
                            $('#btn_new_anggaranPettyCash').addClass("hide");
                            $('#btn_update_anggaranPettyCash').removeClass("hide");

                        }
                    },
                    error: function (e) {

                        //close wal
                        Swal.close();

                        //display alert error
                        if (e.status == 400 || e.status == 422) {
                            let cnt = 0;
                            $.each(e.responseJSON.errors, function (key, value) {
                                if (cnt == 0) {
                                    console.log('value: ' + value);
                                    Swal.fire("Failed", '' + value, "error");
                                }
                                cnt++;
                            });
                        } else {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        }

                    },
                });
            }, 1500);
        },
        onClose: () => {
            Swal.close();
        }
    });
}
function FBSDeleteAnggaran(id) {
    showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');

    FrData = new FormData();
    FrData.append("action", 2);
    FrData.append("Id", id);
    FrData.append("txt_TicketId", $('#txt_TicketId').val());

    Swal.fire({
        title: 'Loading...',
        showConfirmButton: false,
        allowOutsideClick: false,
        onBeforeOpen: () => {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');

            setTimeout(() => {
                $.ajax({
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    url: UrlOrigin + '/FormKSO/AnggaranRutinPettyCashDelete',
                    data: FrData,
                    processData: false,
                    cache: false,
                    async: false,
                    contentType: false,
                    timeout: 800000,
                    success: function (data) {
                        Swal.close();

                        if (data.status != 200) {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        }
                        else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500
                            });

                            $('#tbl_anggaranPettyCash').DataTable().clear().draw();

                            if (data.data.length != 0)
                            {
                                for (var i = 0; i < data.data.length; i++)
                                {
                                    $('#tbl_anggaranPettyCash').DataTable().row.add([
                                        "<div class='btn-group me-2' role='group' aria-label='First group'>" +
                                        "<button type='button' class='btn btn-warning btn-icon-text' onclick = 'FBSDetailAnggaran(" + data.data[i].id + ")'>" +
                                        "<i class='btn-icon-append' data-feather='eye'></i> View" +
                                        "</button>" +
                                        "<button type='button' class='btn btn-danger btn-icon-text' onclick = 'FBSDeleteAnggaran(" + data.data[i].id + ")'>" +
                                        "<i class='btn-icon-append' data-feather='trash-2'></i> Delete" +
                                        "</button></div>"
                                        , data.data[i].coaCode + " - " + data.data[i].coaName
                                        , data.data[i].activityName
                                    ]).draw();
                                }
                            }
                            feather.replace();
                        }

                    },
                    error: function (e) {

                        //close wal
                        Swal.close();

                        //display alert error
                        if (e.status == 400 || e.status == 422) {
                            let cnt = 0;
                            $.each(e.responseJSON.errors, function (key, value) {
                                if (cnt == 0) {
                                    console.log('value: ' + value);
                                    Swal.fire("Failed", '' + value, "error");
                                }
                                cnt++;
                            });
                        }
                        else {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        }
                    },
                });
            }, 1500);
        },
        onClose: () => {
            Swal.close();
        }
    });
}
//#endregion

//#region Button Click
$('#btn-bpd-hasil-kajian').click(function () {
    console.log('add file');
    $('#attachment-bpdHasilKajian').click();
});

$('#btn-generate-fico').click(function (e) {
    debugger
    if ($('#txt_TicketId').val().length == 0) {
        Swal.fire("Failed", "Ticket Kso Not Exists. Please Submit or Save as Draft.", "warning");
        e.preventDefault();
        return false;
    }
});
$('#btnCloseModalFico').click(function (e) {
    e.preventDefault();
    if (IsCompletedGenerate) {
        IsCompletedGenerate = false;
        window.location.replace(UrlOrigin + '/formkso/GenerateFico?status=999');
    }

});

$('#btn-create-new-hcSdm').click(function () {
    $('#modal-hcSdm').modal('show');
    ClearItemHc();
});
$('#btn-create-new-hcSdmSam').click(function () {
    $('#modal-hcSdmSam').modal('show');
    ClearItemHcSdmSam();
});
$('#btn_new_anggaranPettyCash').click(function () {
    if ($('#ddl_PettyCash_ActivityAnggaran').val() == "All") {
        swal('Please Pilih Activity Anggaran.');
        return;
    }
    else {
        showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');

        let DtForm = $('#frmKsoAllOperateTac');
        let DtDisabled = DtForm.find(':input:disabled');
        DtForm.find(':input:disabled').removeAttr('disabled');

        let frmData = DtForm.serializeArray();
        FrData = new FormData();

        $.each(frmData, function (key, input) {
            FrData.append(input.name, $.trim(input.value));
        });

        DtDisabled.attr('disabled', true);

        FrData.append("action", 0);
        FrData.append("StationId", $('#h_PettyCash_StationId').val());
        FrData.append("StationName", $('#h_PettyCash_StationName').val());
        FrData.append("LsMasterCoaDetail", $('#h_LsActivityPettyCash').val());

        var Save = $.ajax({
            type: 'POST',
            enctype: 'multipart/form-data',
            url: UrlOrigin + '/FormKSO/AnggaranRutinPettyCash',
            data: FrData,
            processData: false,
            cache: false,
            async: false,
            contentType: false,
            timeout: 800000,
            error: function (request, status, error) {

                Swal.close();
                Swal.fire("Failed", request.responseJSON.detail, "error");
                return
            }
        });

        Swal.close();

        if (Save.status != 200) {

            Swal.fire("Failed", Save.responseJSON.detail, "error");
            return
        }
        else {
            $('#tbl_anggaranPettyCash').DataTable().row.add([
                "<div class='btn-group me-2' role='group' aria-label='First group'>" +
                "<button type='button' class='btn btn-warning btn-icon-text' onclick = 'FBSDetailAnggaran(" + Save.responseJSON.data.id + ")'>" +
                "<i class='btn-icon-append' data-feather='eye'></i> View" +
                "</button>" +
                "<button type='button' class='btn btn-danger btn-icon-text'  onclick = 'FBSDeleteAnggaran(" + Save.responseJSON.data.id + ")'>" +
                "<i class='btn-icon-append' data-feather='trash-2'></i> Delete" +
                "</button></div>"
                , Save.responseJSON.data.coaCode + " - " + Save.responseJSON.data.coaName
                , Save.responseJSON.data.activityName
            ])
            .draw();

            feather.replace();
            $('#ddl_PettyCash_ActivityAnggaran').val('All').trigger('change');
            $('#txt_PettyCash_description').val('');
            $('#txt_PettyCash_CoaId').val('');
            $('#txt_PettyCash_NilaiAnggaran').val(0);
            $('#txt_PettyCash_note').val('');
        }

    }
        
});

$('#btn_update_anggaranPettyCash').click(function () {
    if ($('#ddl_PettyCash_ActivityAnggaran').val() == "All") {
        swal('Please Pilih Activity Anggaran.');
        return;
    }
    else {
        showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');

        let DtForm = $('#frmKsoAllOperateTac');
        let DtDisabled = DtForm.find(':input:disabled');
        DtForm.find(':input:disabled').removeAttr('disabled');

        let frmData = DtForm.serializeArray();
        FrData = new FormData();

        $.each(frmData, function (key, input) {
            FrData.append(input.name, $.trim(input.value));
        });

        DtDisabled.attr('disabled', true);

        FrData.append("Id", $('#h_PettyCash_AnggaranId').val());
        FrData.append("LsMasterCoaDetail", $('#h_LsActivityPettyCash').val());

        var Save = $.ajax({
            type: 'POST',
            enctype: 'multipart/form-data',
            url: UrlOrigin + '/FormKSO/AnggaranRutinPettyCashUpdate',
            data: FrData,
            processData: false,
            cache: false,
            async: false,
            contentType: false,
            timeout: 800000,
            error: function (request, status, error) {

                Swal.close();
                Swal.fire("Failed", request.responseJSON.detail, "error");
                return
            }
        });

        Swal.close();

        if (Save.status != 200) {

            Swal.fire("Failed", Save.responseJSON.detail, "error");
            return
        }
        else {
            $('#tbl_anggaranPettyCash').DataTable().clear().draw();

            if (Save.responseJSON.data.length != 0) {
                for (var i = 0; i < Save.responseJSON.data.length; i++) {
                    $('#tbl_anggaranPettyCash').DataTable().row.add([
                        "<div class='btn-group me-2' role='group' aria-label='First group'>" +
                        "<button type='button' class='btn btn-warning btn-icon-text' onclick = 'FBSDetailAnggaran(" + Save.responseJSON.data[i].id + ")'>" +
                        "<i class='btn-icon-append' data-feather='eye'></i> View" +
                        "</button>" +
                        "<button type='button' class='btn btn-danger btn-icon-text' onclick = 'FBSDeleteAnggaran(" + Save.responseJSON.data[i].id + ")'>" +
                        "<i class='btn-icon-append' data-feather='trash-2'></i> Delete" +
                        "</button></div>"
                        , Save.responseJSON.data[i].coaCode + " - " + Save.responseJSON.data[i].coaName
                        , Save.responseJSON.data[i].activityName
                    ]).draw();
                }
            }
            feather.replace();

            $('#ddl_PettyCash_ActivityAnggaran').val('All').trigger('change');
            $('#txt_PettyCash_description').val('');
            $('#txt_PettyCash_CoaId').val('');
            $('#txt_PettyCash_NilaiAnggaran').val(0);
            $('#txt_PettyCash_note').val('');
            $('#btn_new_anggaranPettyCash').removeClass("hide");
            $('#btn_update_anggaranPettyCash').addClass("hide");
        }

    }

});

$('#btn_new_product').click(function () {
    GetSaleVolume();
    if ($('#ListProduk').val() != "All") {
        if (LsProdukVolume.length != 0 && LsProdukVolume.filter(w => w.Produk == $('#ListProduk').select2('data')[0].text).length != 0) {
            swal('Produk ' + $('#ListProduk').val() + ' sudah ada.');
            return;
        }

        $('#div_TblProdukVolume').removeClass('hide');
        $('#tbl_ProdukSaleVolume tbody').append("<tr class='data'>" +
            "<td><button type='button' class='btn btn-danger btn-icon-text BtnSelectProductVolume ksosam'><i class='btn-icon-append' data-feather='trash-2'></i> Delete</button></td>" +
            "<td><input type='text' class='form-control inputValue ksosam' disabled='disabled' id='txt_produk' value='" + $('#ListProduk').select2('data')[0].text + "'></td>" +
            "<td><input type='number' class='form-control inputValue ksosam' id='txt_volume' placeholder='0' onkeypress='return onlyNumberKey(event)'></td>" +
            "<td><input type='number' class='form-control inputValue ksosam' id='txt_soldto' placeholder='0' onkeypress='return onlyNumberKey(event)'></td>" +
            "<td><input type='text' class='form-control inputValue ksosam' id='txt_supply'></td>" +
            "<td><select class='js-example-basic-single form-select-sm inputValue ksosam' id='txt_jenis' data-width='100%'><option value='All' selected >--Selected--</option><option value='BBM'>BBM</option><option value='BBK'>BBK</option></select></td>" +
            /*          "<td><input type='text' class='form-control inputValue ksosam' id='txt_jenis'></td>" +*/
            "<td><input type='number' class='form-control inputValue ksosam' id='txt_qtytanki' placeholder='0' onkeypress='return onlyNumberKey(event)'></td>" +
            "<td><input type='number' class='form-control inputValue ksosam' id='txt_volumetanki' onkeypress='return onlyNumberKey(event)' placeholder='0'></td>" +
            "</tr>");
        feather.replace();
        $('#ListProduk').val('All').trigger('change');
        $('#tbl_ProdukSaleVolume tbody td').addClass("no-padding");
    }
    else {
        swal('Mohon Pilih Product.');
    }
    GetSaleVolume();
});
$('#btn_legal_add_grading').click(function () {
    GetLegalGrading();
    if ($('#ddl_legal_grading').val() != "All") {
        if (LsLegalGrading.length != 0 && LsLegalGrading.filter(w => w.Grading == $('#ddl_legal_grading').select2('data')[0].text).length != 0) {
            swal('Grading ' + $('#ddl_legal_grading').select2('data')[0].text + ' sudah ada.');
            return;
        }

        $('#tbl_legal_grading tbody').append("<tr class='data'>" +
            "<td><button type='button' class='btn btn-danger btn-icon-text'><i class='btn-icon-append' data-feather='trash-2'></i> Delete</button></td>" +
            "<td><input type='text' class='form-control inputValue' disabled='disabled' value='" + $('#ddl_legal_grading').select2('data')[0].text +"' /></td>" +
            "<td><input type='number' class='form-control inputValue' onkeypress='return onlyNumberKey(event)' placeholder='0'></td>" +
            "<td><input type='number' class='form-control inputValue' onkeypress='return onlyNumberKey(event)' placeholder='0'></td>" +
            "</tr>");
        feather.replace();
        $('#ddl_legal_grading').val('All').trigger('change');
        $('#ddl_legal_grading tbody td').addClass("no-padding");
    }
    else {
        swal('Mohon Pilih Grading.');
    }
});
$('#btn_addDispanser').click(function () {
    GetTeknikDispenser();
    if ($('#ddl_merkdispenser').val() != "All") {

        $('#tbl_teknikdispanser').removeClass('hide');
        $('#tbl_teknikdispanser tbody').append("<tr class='data'>" +
            "<td><button type='button' class='btn btn-danger btn-icon-text BtnSelectTeknikDispenser ksoteknik'><i class='btn-icon-append' data-feather='trash-2'></i> Delete</button></td>" +
            "<td><input type='text' class='form-control inputValue ksoteknik' disabled='disabled' id='txt_merkdispenser' value='" + $('#ddl_merkdispenser').select2('data')[0].text + "'/></td>" +
            "<td><input type='number' class='form-control inputValue ksoteknik' id='txt_jumlahdispenser' onkeypress='return onlyNumberKey(event)' placeholder='0' /></td>" +
            "<td><input type='number' class='form-control inputValue ksoteknik' id='txt_jumlahnozzle' onkeypress='return onlyNumberKey(event)' placeholder='0' /></td>" +
            "<td><input type='number' class='form-control inputValue ksoteknik' id='txt_jumlahdisplay' onkeypress='return onlyNumberKey(event)' placeholder='0' /></td>" +
            "<td><input type='number' class='form-control inputValue ksoteknik' readonly id='txt_jumlahdispenserRls' onkeypress='return onlyNumberKey(event)' placeholder='0' /></td>" +
            "<td><input type='number' class='form-control inputValue ksoteknik' readonly id='txt_jumlahnozzleRls' onkeypress='return onlyNumberKey(event)' placeholder='0' /></td>" +
            "<td><input type='number' class='form-control inputValue ksoteknik' readonly id='txt_jumlahdisplayRls' onkeypress='return onlyNumberKey(event)' placeholder='0' /></td>" +
            "<td><select class='js-example-basic-single form-select-sm inputValue ' id='ddl_statusdispenser' data-width='100%' disabled><option value='All' selected >--Selected--</option><option value='New'>New</option><option value='Used'>Used</option></select></td>" +
            "<td><input type='text' class='form-control inputValue ksoteknik' id='txt_keterangandispenser' placeholder='Keterangan'/></td>" +
            "<td class='text-center'><div class='form-check m-0 pb-3 pl-4'><input type='checkbox' class='inputValue form-check-input' readonly id='txt_IsConfirmedDispencer' name='txt_IsConfirmedDispencer' disabled></div></td>" +
            "</tr>");
        feather.replace();
        $('#ddl_merkdispenser').val('All').trigger('change');
        $('#tbl_teknikdispanser tbody td').addClass("no-padding");
    }
    else {
        swal('Mohon Pilih Merk Dispenser.');
    }
    GetTeknikDispenser();
});

$('#btn_addEdcBankPickup').click(function () {
    GetFinancePickupEdcBank();

    //alert(JSON.stringify($('#ddl_EdcBankPickup').select2('data')[0]));
    $('#tbl_EdcBankPickup').removeClass('hide');
    $('#tbl_EdcBankPickup tbody').append("<tr class='data'>" +
        "<td><button type='button' class='btn btn-danger btn-icon-text BtnSelectEdcBankPickup ksopickup'><i class='btn-icon-append' data-feather='trash-2'></i> Delete</button></td>" +
        "<td><input type='text' class='form-control inputValue ksopickup' placeholder='Serial Number' id='txt_EdcBankPickupSN' /></td>" +
        "<td><input type='text' class='form-control inputValue ksopickup' placeholder='MID' id='txt_EdcBankPickupMID' /></td>" +
        "<td><input type='text' class='form-control inputValue ksopickup' placeholder='TID' id='txt_EdcBankPickupTID' /></td>" +
        "<td><input type='text' class='form-control inputValue ksopickup' placeholder='Jenis Bank' id='txt_EdcBankPickupJenisBank' /></td>" +
        "<td><input type='text' class='form-control inputValue ksopickup' placeholder='Keterangan' id='txt_EdcBankPickupKeterangan' /></td>" +
        "</tr>");
    feather.replace();
    $('#tbl_EdcBankPickup tbody td').addClass("no-padding");

    GetFinancePickupEdcBank();
});

$('#btn_addEdcBankPickupNew').click(function () {
    GetFinancePickupEdcBankNew();

    //alert(JSON.stringify($('#ddl_EdcBankPickup').select2('data')[0]));
    $('#tbl_EdcBankPickupNew').removeClass('hide');
    $('#tbl_EdcBankPickupNew tbody').append("<tr class='data'>" +
        "<td><button type='button' class='btn btn-danger btn-icon-text BtnSelectEdcBankPickupNew ksopickup'><i class='btn-icon-append' data-feather='trash-2'></i> Delete</button></td>" +
        "<td><input type='text' class='form-control inputValue ksopickup' placeholder='Serial Number' id='txt_EdcBankPickupSNNew' /></td>" +
        "<td><input type='text' class='form-control inputValue ksopickup' placeholder='MID' id='txt_EdcBankPickupMIDNew' /></td>" +
        "<td><input type='text' class='form-control inputValue ksopickup' placeholder='TID' id='txt_EdcBankPickupTIDNew' /></td>" +
        "<td><input type='text' class='form-control inputValue ksopickup' placeholder='Jenis Bank' id='txt_EdcBankPickupJenisBankNew' /></td>" +
        "<td><input type='text' class='form-control inputValue ksopickup' placeholder='Keterangan' id='txt_EdcBankPickupKeteranganNew' /></td>" +
        "<td class='text-center'><div class='form-check m-0 pb-3 pl-4'><input type='checkbox' class='inputValue form-check-input' readonly id='txt_IsConfirmedEdc' name='txt_IsConfirmedEdc' disabled></div></td>" +
        "</tr>");
    feather.replace();
    $('#tbl_EdcBankPickupNew tbody td').addClass("no-padding");

    GetFinancePickupEdcBankNew();
});


$('#btn_new_KsoProcess').click(function () {

    if ($('#ListKsoProcess').val() != "All") {
        if (LsKsoDipilih.length != 0 && LsKsoDipilih.filter(w => w.TicketId == $('#ListKsoProcess').val()).length != 0) {
            swal('KSO ' + $('#ListKsoProcess').val() + ' sudah ada.');
            return;
        }

        var KsoSelected = jsonKsoProcessLs.find(function (ticket) {
            return ticket.TicketId === $('#ListKsoProcess').val();
        });

        //alert(JSON.stringify(KsoSelected1));
        //$('#div_TblProdukVolume').removeClass('hide');
        $('#tbl_KsoDipilih tbody').append("<tr class='data'>" +
            "<td><button type='button' class='btn btn-danger btn-icon-text BtnDeleteKsoProcess'><i class='btn-icon-append' data-feather='trash-2'></i> Delete</button></td>" +
            "<td><input type='text' style='background-color:transparent !important;' class='form-control inputValue' name='txt_ict_TicketKsoDipilih[]' readonly value='" + $('#ListKsoProcess').val() + "'></td>" +
            "<td style='padding-left:10px !important;'>" + KsoSelected.JenisRequest + "</td>" +
            "<td>" + KsoSelected.Fullname + "</td>" +
            "<td>" + KsoSelected.SpbuPicFullname + "</td>" +
            "<td>" + KsoSelected.SpbuPicTelp + "</td>" +
            "</tr>");

        feather.replace();
        $('#ListKsoProcess').val('All').trigger('change');
        $('#tbl_KsoDipilih tbody td').addClass("no-padding");

        var DtKsoPilih = {};
        DtKsoPilih.TicketId = KsoSelected.TicketId;
        LsKsoDipilih.push(DtKsoPilih);
    }
    else {
        swal('Mohon Pilih KSO.');
    }
});

$('#btn-legal-draft').click(function () {
    let DtForm = $('#frmKsoAllOperateTac');
    let DtDisabled = DtForm.find(':input:disabled');
    DtForm.find(':input:disabled').removeAttr('disabled');

    let frmData = DtForm.serializeArray();
    FrData = new FormData();

    $.each(frmData, function (key, input) {
        FrData.append(input.name, $.trim(input.value));
    });

    DtDisabled.attr('disabled', true);

    GetSaleVolume();

    FrData.append('LsProdukVolume', JSON.stringify(LsProdukVolume));
    if (FileLegalContract.length == 0) {
        FrData.append('DataFileLegal', '');
    }
    else {
        var DataFileLegal = JSON.stringify({
            TicketId: $('#txt_TicketId').val(), FileName: FileLegalContract[0].name, FileExtention: "." + FileLegalContract[0].name.split(".").pop(), MimeType: FileLegalContract[0].type,
            AsBase64: StData64Contract.split(",").pop(), Type: "Contract", Descriptions: $('#txt_legal_FileDescription').val()
        });
        FrData.append('DataFileLegal', JSON.stringify(DataFileLegal));
    }

    debugger
    Swal.fire({
        title: "Are you sure?",
        text: "Submit this, You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it.",
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
            setTimeout(function () {

                var Save = $.ajax({
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    url: UrlOrigin + '/FormKSO/DraftKsoLegal',
                    data: FrData,
                    processData: false,
                    cache: false,
                    async: false,
                    contentType: false,
                    timeout: 800000,
                    success: function (data) {
                        Swal.close();
                        debugger
                        if (data.status != 200) {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        } else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500
                            });

                            window.location.replace(UrlOrigin + '/formkso/detail?Id=' + data.data.id);
                        }
                    },
                    error: function (e) {

                        //close wal
                        Swal.close();

                        //display alert error
                        if (e.status == 400 || e.status == 422) {
                            let cnt = 0;
                            $.each(e.responseJSON.errors, function (key, value) {
                                if (cnt == 0) {
                                    console.log('value: ' + value);
                                    Swal.fire("Failed", '' + value, "error");
                                }
                                cnt++;
                            });
                        } else {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        }

                    }
                });

            }, 500);
        }
    });
});

$('#btnSubmitGenerateFico').click(function () {
    FrData = new FormData();
    FrData.append('LsKsoDipilih', JSON.stringify(LsKsoDipilih));
    Swal.fire({
        title: "Proses Generate Fico?",
        html: "Klik <b>Lanjutkan</b> untuk mulai melakukan generate file Fico",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Lanjutkan",
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
            setTimeout(function () {

                var Save = $.ajax({
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    url: UrlOrigin + '/FormKSO/ProcessDocumentFico',
                    data: FrData,
                    processData: false,
                    cache: false,
                    async: false,
                    contentType: false,
                    timeout: 800000,
                    success: function (data) {
                        Swal.close();

                        if (!data.data.status) {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        } else {

                            $('#modal-add-fico-file').modal('hide');
                            PreviewDocument(data.data.data, 'FICO ICT');

                            LsKsoDipilih = [];
                            var tbodyKsoDipilih = document.querySelector('#tbl_KsoDipilih tbody');
                            tbodyKsoDipilih.innerHTML = '';
                            IsCompletedGenerate = true;
                        }
                    },
                    error: function (e) {

                        //close wal
                        Swal.close();

                        //display alert error
                        if (e.status == 400 || e.status == 422) {
                            let cnt = 0;
                            $.each(e.responseJSON.errors, function (key, value) {
                                if (cnt == 0) {
                                    console.log('value: ' + value);
                                    Swal.fire("Failed", '' + value, "error");
                                }
                                cnt++;
                            });
                        } else {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        }

                    }
                });

            }, 500);
        }
    });

});

$('#btn-add-file-bak').click(function () {
    //debugger
    //if ($('#txt_TicketId').val().length == 0) {
    //    Swal.fire("Failed", "Ticket Kso Not Exists. Please Submit or Save as Draft.", "warning");
    //    return
    //}
    $('#modal-bak-upload').modal('show');
    $('#txt_Bak_File_Type').val('All').trigger('change');
    $('#attachment-bak').val('');
    $('#txt_Bak_Description').val('');
    files2 = null;
    $('#new-img-bak').addClass('hide');
    $('#new-file-bak').attr('hidden', true);
});
//#endregion

//#region Button Draft
$('#btn-draft-formksoalloperate').click(function () {
    let DtForm = $('#frmKsoAllOperateTac');
    let DtDisabled = DtForm.find(':input:disabled');
    DtForm.find(':input:disabled').removeAttr('disabled');

    let frmData = DtForm.serializeArray();
    FrData = new FormData();

    $.each(frmData, function (key, input) {
        FrData.append(input.name, $.trim(input.value));
    });

    DtDisabled.attr('disabled', true);

    GetSaleVolume();
    GetLegalGrading();

    FrData.append('LsProdukVolume', JSON.stringify(LsProdukVolume));
    FrData.append('LsLegalGrading', JSON.stringify(LsLegalGrading));

    if ($('#Ddl_SPBURole').val() == "2") {
        GetIctDetail();
        GetHcSdm();
        GetHcSdmSam();
        GetTeknikDispenser();
        GetFinancePickupEdcBank();
        FrData.append('LsIctDetail', JSON.stringify(LsIctDetail));
        FrData.append('LsHcSdm', JSON.stringify(LsHcSdm));
        FrData.append('LsHcSdmSam', JSON.stringify(LsHcSdmSam));

        FrData.append('LsTeknikDispenser', JSON.stringify(LsTeknikDispenser));
        FrData.append('LsFinancePickupEdcBank', JSON.stringify(LsFinancePickupEdcBank));

        if (FileLegalContract.length == 0) {
            FrData.append('DataFileLegal', '');
        }
        else {
            var DataFileLegal = JSON.stringify({
                TicketId: $('#txt_TicketId').val(), FileName: FileLegalContract[0].name, FileExtention: "." + FileLegalContract[0].name.split(".").pop(), MimeType: FileLegalContract[0].type,
                AsBase64: StData64Contract.split(",").pop(), Type: "Contract", Descriptions: $('#txt_legal_FileDescription').val()
            });
            FrData.append('DataFileLegal', JSON.stringify(DataFileLegal));
        }
    }
    else if ($('#Ddl_SPBURole').val() == "1") {
        GetBpdProduk();
        GetBpdJabatanPekerja();
        GetBpdPakaianPekerja()
        GetBpdOverhead();
        GetBpdAsumsi();
        GetBpdCapex();

        FrData.append('LsBpdProduk', JSON.stringify(LsBpdProduk));
        FrData.append('LsBpdJabatanPekerja', JSON.stringify(LsBpdJabatanPekerja));
        FrData.append('LsBpdPakaianPekerja', JSON.stringify(LsBpdPakaianPekerja));
        FrData.append('LsBpdOverhead', JSON.stringify(LsBpdOverhead));
        FrData.append('LsBpdAsumsi', JSON.stringify(LsBpdAsumsi));
        FrData.append('LsBpdCapex', JSON.stringify(LsBpdCapex));

    }

    debugger
    Swal.fire({
        title: "Are you sure?",
        text: "Submit this, You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it.",
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
            setTimeout(function () {

                var Save = $.ajax({
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    url: UrlOrigin + '/FormKSO/DraftKsoAllOperate',
                    data: FrData,
                    processData: false,
                    cache: false,
                    async: false,
                    contentType: false,
                    timeout: 800000,
                    success: function (data) {
                        Swal.close();
                        debugger
                        if (data.status != 200) {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        } else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500
                            });

                            window.location.replace(UrlOrigin + '/formkso/detail?Id=' + data.data.id);
                        }
                    },
                    error: function (e) {

                        //close wal
                        Swal.close();

                        //display alert error
                        if (e.status == 400 || e.status == 422) {
                            let cnt = 0;
                            $.each(e.responseJSON.errors, function (key, value) {
                                if (cnt == 0) {
                                    console.log('value: ' + value);
                                    Swal.fire("Failed", '' + value, "error");
                                }
                                cnt++;
                            });
                        } else {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        }

                    }
                });

            }, 500);
        }
    });
});
$('#btn-bpd-draft').click(function () {
    let DtForm = $('#frmKsoAllOperateTac');
    let DtDisabled = DtForm.find(':input:disabled');
    DtForm.find(':input:disabled').removeAttr('disabled');

    let frmData = DtForm.serializeArray();
    FrData = new FormData();

    $.each(frmData, function (key, input) {
        FrData.append(input.name, $.trim(input.value));
    });

    DtDisabled.attr('disabled', true);

    GetBpdProduk();
    GetBpdJabatanPekerja();
    GetBpdPakaianPekerja()
    GetBpdOverhead();
    GetBpdAsumsi();
    GetBpdCapex();

    FrData.append('LsBpdProduk', JSON.stringify(LsBpdProduk));
    FrData.append('LsBpdJabatanPekerja', JSON.stringify(LsBpdJabatanPekerja));
    FrData.append('LsBpdPakaianPekerja', JSON.stringify(LsBpdPakaianPekerja));
    FrData.append('LsBpdOverhead', JSON.stringify(LsBpdOverhead));
    FrData.append('LsBpdAsumsi', JSON.stringify(LsBpdAsumsi));
    FrData.append('LsBpdCapex', JSON.stringify(LsBpdCapex));

    Swal.fire({
        title: "Are you sure?",
        text: "Submit this, You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it.",
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
            setTimeout(function () {

                var Save = $.ajax({
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    url: UrlOrigin + '/FormKSO/DraftKsoBpd',
                    data: FrData,
                    processData: false,
                    cache: false,
                    async: false,
                    contentType: false,
                    timeout: 800000,
                    success: function (data) {
                        Swal.close();
                        debugger
                        if (data.status != 200) {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        } else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500
                            });

                            window.location.replace(UrlOrigin + '/formkso/detail?Id=' + data.data.id);
                        }
                    },
                    error: function (e) {

                        //close wal
                        Swal.close();

                        //display alert error
                        if (e.status == 400 || e.status == 422) {
                            let cnt = 0;
                            $.each(e.responseJSON.errors, function (key, value) {
                                if (cnt == 0) {
                                    console.log('value: ' + value);
                                    Swal.fire("Failed", '' + value, "error");
                                }
                                cnt++;
                            });
                        } else {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        }

                    }
                });

            }, 500);
        }
    });
});
$('#btn-finance-pettycash-draft').click(function () {

    let DtForm = $('#frmKsoAllOperateTac');
    let DtDisabled = DtForm.find(':input:disabled');
    DtForm.find(':input:disabled').removeAttr('disabled');

    let frmData = DtForm.serializeArray();
    FrData = new FormData();

    $.each(frmData, function (key, input) {
        FrData.append(input.name, $.trim(input.value));
    });

    DtDisabled.attr('disabled', true);

    Swal.fire({
        title: "Are you sure?",
        text: "Submit this, You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it.",
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
            setTimeout(function () {

                var Save = $.ajax({
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    url: UrlOrigin + '/FormKSO/DraftKsoFinancePettyCash',
                    data: FrData,
                    processData: false,
                    cache: false,
                    async: false,
                    contentType: false,
                    timeout: 800000,
                    success: function (data) {
                        Swal.close();
                        debugger
                        if (data.status != 200) {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        } else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500
                            });

                            window.location.replace(UrlOrigin + '/formkso/detail?Id=' + data.data.id);
                        }
                    },
                    error: function (e) {

                        //close wal
                        Swal.close();

                        //display alert error
                        if (e.status == 400 || e.status == 422) {
                            let cnt = 0;
                            $.each(e.responseJSON.errors, function (key, value) {
                                if (cnt == 0) {
                                    console.log('value: ' + value);
                                    Swal.fire("Failed", '' + value, "error");
                                }
                                cnt++;
                            });
                        } else {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        }

                    }
                });

            }, 500);
        }
    });
});
$('#btn-finance-pickupservice-draft').click(function () {
    let DtForm = $('#frmKsoAllOperateTac');
    let DtDisabled = DtForm.find(':input:disabled');
    DtForm.find(':input:disabled').removeAttr('disabled');

    let frmData = DtForm.serializeArray();
    FrData = new FormData();

    $.each(frmData, function (key, input) {
        FrData.append(input.name, $.trim(input.value));
    });

    GetFinancePickupEdcBank();
    GetFinancePickupEdcBankNew();
    FrData.append('LsFinancePickupEdcBank', JSON.stringify(LsFinancePickupEdcBank));
    FrData.append('LsFinancePickupEdcBankNew', JSON.stringify(LsFinancePickupEdcBankNew));

    DtDisabled.attr('disabled', true);

    Swal.fire({
        title: "Are you sure?",
        text: "Submit this, You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it.",
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
            setTimeout(function () {

                var Save = $.ajax({
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    url: UrlOrigin + '/FormKSO/DraftKsoFinancePickup',
                    data: FrData,
                    processData: false,
                    cache: false,
                    async: false,
                    contentType: false,
                    timeout: 800000,
                    success: function (data) {
                        Swal.close();
                        debugger
                        if (data.status != 200) {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        } else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500
                            });

                            window.location.replace(UrlOrigin + '/formkso/detail?Id=' + data.data.id);
                        }
                    },
                    error: function (e) {

                        //close wal
                        Swal.close();

                        //display alert error
                        if (e.status == 400 || e.status == 422) {
                            let cnt = 0;
                            $.each(e.responseJSON.errors, function (key, value) {
                                if (cnt == 0) {
                                    console.log('value: ' + value);
                                    Swal.fire("Failed", '' + value, "error");
                                }
                                cnt++;
                            });
                        } else {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        }

                    }
                });

            }, 500);
        }
    });
});
$('#btn-hc-draft').click(function () {
    let DtForm = $('#frmKsoAllOperateTac');
    let DtDisabled = DtForm.find(':input:disabled');
    DtForm.find(':input:disabled').removeAttr('disabled');

    let frmData = DtForm.serializeArray();
    FrData = new FormData();

    $.each(frmData, function (key, input) {
        FrData.append(input.name, $.trim(input.value));
    });

    DtDisabled.attr('disabled', true);

    GetHcSdm();
    GetHcSdmSam();
    GetHcSdmSamRls();

    FrData.append('LsHcSdm', JSON.stringify(LsHcSdm));
    FrData.append('LsHcSdmSam', JSON.stringify(LsHcSdmSam));
    FrData.append('LsHcDetailRls', JSON.stringify(LsHcSdmRls));

    Swal.fire({
        title: "Are you sure?",
        text: "Submit this, You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it.",
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
            setTimeout(function () {

                var Save = $.ajax({
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    url: UrlOrigin + '/FormKSO/DraftKsoHc',
                    data: FrData,
                    processData: false,
                    cache: false,
                    async: false,
                    contentType: false,
                    timeout: 800000,
                    success: function (data) {
                        Swal.close();
                        debugger
                        if (data.status != 200) {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        } else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500
                            });

                            window.location.replace(UrlOrigin + '/formkso/detail?Id=' + data.data.id);
                        }
                    },
                    error: function (e) {

                        //close wal
                        Swal.close();

                        //display alert error
                        if (e.status == 400 || e.status == 422) {
                            let cnt = 0;
                            $.each(e.responseJSON.errors, function (key, value) {
                                if (cnt == 0) {
                                    console.log('value: ' + value);
                                    Swal.fire("Failed", '' + value, "error");
                                }
                                cnt++;
                            });
                        } else {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        }

                    }
                });

            }, 500);
        }
    });
});
$('#btn-Teknik-draft').click(function () {
    let DtForm = $('#frmKsoAllOperateTac');
    let DtDisabled = DtForm.find(':input:disabled');
    DtForm.find(':input:disabled').removeAttr('disabled');

    let frmData = DtForm.serializeArray();
    FrData = new FormData();

    $.each(frmData, function (key, input) {
        FrData.append(input.name, $.trim(input.value));
    });

    DtDisabled.attr('disabled', true);
    GetTeknikDispenser();
    GetTeknikDispenserRls();
    FrData.append('LsTeknikDispenser', JSON.stringify(LsTeknikDispenser));
    FrData.append('LsTeknikDispenserRls', JSON.stringify(LsTeknikDispenserRls));

    Swal.fire({
        title: "Are you sure?",
        text: "Submit this, You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it.",
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
            setTimeout(function () {

                var Save = $.ajax({
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    url: UrlOrigin + '/FormKSO/DraftKsoTeknik',
                    data: FrData,
                    processData: false,
                    cache: false,
                    async: false,
                    contentType: false,
                    timeout: 800000,
                    success: function (data) {
                        Swal.close();
                        debugger
                        if (data.status != 200) {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        } else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500
                            });

                            window.location.replace(UrlOrigin + '/formkso/detail?Id=' + data.data.id);
                        }
                    },
                    error: function (e) {

                        //close wal
                        Swal.close();

                        //display alert error
                        if (e.status == 400 || e.status == 422) {
                            let cnt = 0;
                            $.each(e.responseJSON.errors, function (key, value) {
                                if (cnt == 0) {
                                    console.log('value: ' + value);
                                    Swal.fire("Failed", '' + value, "error");
                                }
                                cnt++;
                            });
                        } else {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        }

                    }
                });

            }, 500);
        }
    });
});

//#endregion

//#region Button Submit
$('#btn-bpd-BA').click(function () {
    if ($('#ddl_BaOption').val() == 'All') {
        swal('Mohon pilih file tipe.');
        return;
    }
    Swal.fire({
        title: 'Loading...',
        showConfirmButton: false,
        allowOutsideClick: false,
        onBeforeOpen: () => {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');

            setTimeout(() => {
                var TicketId = $('#txt_TicketId').val();

                $.ajax({
                    type: 'GET',
                    url: UrlOrigin + '/FormKSO/GenerateBpd?TicketId=' + TicketId + '&Tipe=' + $('#ddl_BaOption').val(),
                    dataType: 'json',
                    cache: false,
                    async: true,
                    success: function (data) {
                        if (data.status != 200) {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                            Swal.close();
                        } else {
                            Swal.close();
                            if ($('#ddl_BaOption').val() == "xlsx") {
                                window.location.replace(UrlOrigin + "/" + data.data.path);
                            }
                            else {
                                $('#modal-bpd-file').modal('show');
                                $('#detail-file-bpd').attr("src", "/" + data.data.path);
                            }
                        }
                    },
                    error: function (e) {

                        if (e.status == 400 || e.status == 422) {
                            let cnt = 0;
                            $.each(e.responseJSON.errors, function (key, value) {
                                if (cnt == 0) {
                                    console.log('value: ' + value);
                                    Swal.fire("Failed", '' + value, "error");
                                }
                                cnt++;
                            });
                            Swal.close();
                        } else {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                            Swal.close();
                        }

                    }
                });


            }, 1500);
        },
        onClose: () => {
            Swal.close();
        }
    });
});

$('#btn-Comment').click(function () {
    if ($('#txt_twitter').val() == '') {
        swal('Mohon isi Comment Interaksi.');
        return;
    };
    if ($('#ddl_PicFungsi').val() == 'All') {
        swal('Mohon Pilih Fungsi tujuan.');
        return;
    };

    let DtForm = $('#frmKsoAllOperateTac');
    let DtDisabled = DtForm.find(':input:disabled');
    DtForm.find(':input:disabled').removeAttr('disabled');

    let frmData = DtForm.serializeArray();
    FrData = new FormData();

    $.each(frmData, function (key, input) {
        FrData.append(input.name, $.trim(input.value));
    });

    DtDisabled.attr('disabled', true);

    Swal.fire({
        title: 'Loading...',
        showConfirmButton: false,
        allowOutsideClick: false,
        onBeforeOpen: () => {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');

            setTimeout(() => {
                $.ajax({
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    url: UrlOrigin + '/FormKSO/SaveComment',
                    data: FrData,
                    processData: false,
                    cache: false,
                    async: false,
                    contentType: false,
                    timeout: 800000,
                    success: function (data) {
                        Swal.close();
                        debugger
                        if (data.status != 200) {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        } else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500
                            });
                            $('#txt_twitter').val('');
                            AjaxListActivity($('#txt_TicketId').val());
                        }

                    },
                    error: function (e) {

                        //close wal
                        Swal.close();

                        //display alert error
                        if (e.status == 400 || e.status == 422) {
                            let cnt = 0;
                            $.each(e.responseJSON.errors, function (key, value) {
                                if (cnt == 0) {
                                    console.log('value: ' + value);
                                    Swal.fire("Failed", '' + value, "error");
                                }
                                cnt++;
                            });
                        } else {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        }

                    },
                });
            }, 1500);
        },
        onClose: () => {
            Swal.close();
        }
    });
});
$('#btn-save-formksoalloperate').click(function () {
    var DtNow = new Date().toISOString().slice(0, 10);

    if ($('#txt_SPBUName').val() == '') {
        swal('Mohon Isi SPBU Name.');
        return;
    };
    if (Number($('#Ddl_SPBURole').val()) == 2) {
        if ($('#txt_SPBUProvince').val() == 'All') {
            swal('Mohon Pilih SPBU Provinsi.');
            return;
        };

        if ($('#txt_SPBUCity').val() == 'All') {
            swal('Mohon Pilih SPBU Kota.');
            return;
        };

        if ($('#txt_SPBUDistrict').val() == 'All') {
            swal('Mohon Pilih SPBU Kecamatan.');
            return;
        };

        if ($('#txt_SPBUVillage').val() == 'All') {
            swal('Mohon Pilih SPBU Kelurahan/ Desa.');
            return;
        };

        if ($('#txt_SPBUKoordinate').val() == 'All') {
            swal('Mohon Isi SPBU Koordinat.');
            return;
        };

        if ($('#txt_SPBUZipCode').val() == '') {
            swal('Mohon Isi SPBU ZIP Code.');
            return;
        };

        if ($('#txt_SPBUAddress').val() == '') {
            swal('Mohon Isi SPBU Address.');
            return;
        };
        if ($('#H_StatusBak').val() != $('#txt_TicketId').val()) {
            swal('Mohon Upload File BAK.');
            return;
        };
        GetSaleVolume();        

        if (LsProdukVolume.length == 0) {
            swal('Mohon Pilih SPBU Product.');
            return;
        };

        if (LsProdukVolume.filter(x => Number(x.Volume) == 0).length != 0) {
            swal('Sale Volume SPBU Product masih ada 0.');
            return;
        }

        GetLegalGrading();
        if (LsLegalGrading.length == 0) {
            swal('Mohon Pilih Legal Grading.');
            return;
        };

        if ($('#txt_legal_Mitra').val() =='') {
            swal('Mohon Isi Legal Nama Mitra.');
            return;
        };
        if ($('#txt_legal_MitraAddress').val() == '') {
            swal('Mohon Isi Legal Mitra Alamat.');
            return;
        };
        if ($('#txt_legal_MitraPic').val() == '') {
            swal('Mohon Isi Legal Mitra PIC.');
            return;
        };
        if ($('#txt_legal_MitraPicTelp').val() == '') {
            swal('Mohon Isi Legal Mitra Telp.');
            return;
        };
        if ($('#txt_legal_BankMitra').val() == '') {
            swal('Mohon Isi Legal Mitra Nama Bank.');
            return;
        };
        if ($('#txt_legal_BankAtasNama').val() == '') {
            swal('Mohon Isi Legal Mitra Bank Atas Nama.');
            return;
        };
        if ($('#txt_legal_NoRekening').val() == '') {
            swal('Mohon Isi Legal Mitra No Rekening.');
            return;
        };
        if ($('#txt_legal_SpjNo').val() == '') {
            swal('Mohon Isi Legal No SPJ.');
            return;
        };
        if ($('#txt_legal_NovasiNo').val() == '') {
            swal('Mohon Isi Legal No Novasi.');
            return;
        };
        if ($('#txt_legal_BakNo').val() == '') {
            swal('Mohon Isi Legal No BAK.');
            return;
        };
        if ($('#txt_legal_SharingMarginNominalDiAwal').val() == '') {
            swal('Mohon Isi Legal Sharing Margin Nominal Di Awal.');
            return;
        };
        if ($('#txt_legal_MasaBerlakuPerjanjian').val() == '') {
            swal('Mohon Isi Legal Masa Berlaku Perjanjian.');
            return;
        };
        if ($('#txt_legal_EvaluasiDurasi').val() == '') {
            swal('Mohon Isi Legal Evaluasi Durasi.');
            return;
        };
        if ($('#txt_legal_DataPenjualan').val() == '') {
            swal('Mohon Isi Legal Data Penjualan.');
            return;
        };
        if ($('#txt_legal_PeriodeTagihan').val() == '') {
            swal('Mohon Isi Legal Legal Periode Tagihan.');
            return;
        };
        if ($('#txt_legal_TanggalTagihan').val() == '') {
            swal('Mohon Isi Legal Tanggal Tagihan.');
            return;
        };
        if ($('#txt_legal_SharingMarginTermin').val() == '') {
            swal('Mohon Isi Legal Sharing Margin Termin.');
            return;
        };
        if ($('#txt_legal_SharingMarginTerminNominal').val() == '') {
            swal('Mohon Isi Legal Sharing Margin Termin Nominal.');
            return;
        };
    }
    else {

    }

    if ($('#txt_SPBUNomor').val() == '') {
        swal('Mohon Isi SPBU Nomor.');
        return;
    };

    if ($('#txt_SPBUType').val() == 'All') {
        swal('Mohon Pilih SPBU Type');
        return;
    };

    if ($('#txt_SPBUGrading').val() == 'All') {
        swal('Mohon Pilih SPBU Grading.');
        return;
    };

    if ($('#txt_SPBUBadanUsaha').val() == 'All') {
        swal('Mohon Isi SPBU Badan Usaha.');
        return;
    };

    if ($('#txt_MOR').val() == 'All') {
        swal('Mohon Isi MOR (CnT).');
        return;
    };


    if ($('#ddl_sam_asmen').val() == 'All') {
        swal('Mohon Pilih ASMEN SAM.');
        return;
    };

    if ($('#ddl_sam_manager').val() == 'All') {
        swal('Mohon Pilih Manager SAM.');
        return;
    };


    let DtForm = $('#frmKsoAllOperateTac');
    let DtDisabled = DtForm.find(':input:disabled');
    DtForm.find(':input:disabled').removeAttr('disabled');

    let frmData = DtForm.serializeArray();
    FrData = new FormData();

    $.each(frmData, function (key, input) {
        FrData.append(input.name, $.trim(input.value));
    });

    DtDisabled.attr('disabled', true);

    FrData.append('LsProdukVolume', JSON.stringify(LsProdukVolume));
    
    if ($('#Ddl_SPBURole').val() == "2") {
        GetIctDetail();
        GetHcSdm();
        GetHcSdmSam();
        GetTeknikDispenser();
        GetFinancePickupEdcBank();

        FrData.append('LsIctDetail', JSON.stringify(LsIctDetail));
        FrData.append('LsHcSdm', JSON.stringify(LsHcSdm));
        FrData.append('LsHcSdmSam', JSON.stringify(LsHcSdmSam));
        FrData.append('LsTeknikDispenser', JSON.stringify(LsTeknikDispenser));
        FrData.append('LsFinancePickupEdcBank', JSON.stringify(LsFinancePickupEdcBank));
        FrData.append('LsLegalGrading', JSON.stringify(LsLegalGrading));

        if (LsTeknikDispenser.length == 0) {
            swal('Teknik Dispenser masih kosong.');
            return;
        }

        if (FileLegalContract.length == 0) {
            FrData.append('DataFileLegal', '');
        }
        else {
            var DataFileLegal = JSON.stringify({
                TicketId: $('#txt_TicketId').val(), FileName: FileLegalContract[0].name, FileExtention: "." + FileLegalContract[0].name.split(".").pop(), MimeType: FileLegalContract[0].type,
                AsBase64: StData64Contract.split(",").pop(), Type: "Contract", Descriptions: $('#txt_legal_FileDescription').val()
            });
            FrData.append('DataFileLegal', JSON.stringify(DataFileLegal));
        }
    }
    else {
        GetBpdProduk();
        GetBpdJabatanPekerja();
        GetBpdPakaianPekerja()
        GetBpdOverhead();
        GetBpdAsumsi();
        GetBpdCapex();

        FrData.append('LsBpdProduk', JSON.stringify(LsBpdProduk));
        FrData.append('LsBpdJabatanPekerja', JSON.stringify(LsBpdJabatanPekerja));
        FrData.append('LsBpdPakaianPekerja', JSON.stringify(LsBpdPakaianPekerja));
        FrData.append('LsBpdOverhead', JSON.stringify(LsBpdOverhead));
        FrData.append('LsBpdAsumsi', JSON.stringify(LsBpdAsumsi));
        FrData.append('LsBpdCapex', JSON.stringify(LsBpdCapex));
    }

    Swal.fire({
        title: "Are you sure?",
        text: "Submit this, You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it.",
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
            setTimeout(function () {

                $.ajax({
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    url: UrlOrigin + '/FormKSO/AddKsoAllOperate',
                    data: FrData,
                    processData: false,
                    cache: false,
                    async: false,
                    contentType: false,
                    timeout: 800000,
                    success: function (data) {
                        Swal.close();
                        debugger
                        if (data.status != 200) {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        } else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500
                            });

                            window.location.replace(UrlOrigin + '/formkso/detail?Id=' + data.data.id);

                        }

                    },
                    error: function (e) {

                        //close wal
                        Swal.close();

                        //display alert error
                        if (e.status == 400 || e.status == 422) {
                            let cnt = 0;
                            $.each(e.responseJSON.errors, function (key, value) {
                                if (cnt == 0) {
                                    console.log('value: ' + value);
                                    Swal.fire("Failed", '' + value, "error");
                                }
                                cnt++;
                            });
                        } else {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        }

                    },
                });
            }, 500);
        }
    });

});
$('#btn-bpd-submit').click(function () {

    if ($('#Tbl_Bpd_FileKajian tr').length - 1 == 0) {
        swal('Mohon upload file Kajian BPD.');
        return;
    };
    if ($('#ddl_bpd_asmen').val() == 'All') {
        swal('Mohon Pilih ASMEN BPD.');
        return;
    };
    if ($('#ddl_bpd_manager').val() == 'All') {
        swal('Mohon Pilih Manager BPD.');
        return;
    };
    if ($('#ddl_bpd_feasibility_provinsi').val() == 'All') {
        swal('Mohon Pilih Provinsi.');
        return;
    };

    if ($('#ddl_bpd_feasibility_kabupaten').val() == 'All') {
        swal('Mohon Pilih Kabupaten.');
        return;
    };
    if ($('#ddl_bpd_feasibility_kecamantan').val() == 'All') {
        swal('Mohon Pilih Kecamatan.');
        return;
    };

    if ($('#ddl_bpd_feasibility_kelurahan').val() == 'All') {
        swal('Mohon Pilih Kelurahan.');
        return;
    };
    if ($('#txt_bpd_feasibility_alamat').val() == '') {
        swal('Mohon Isi Alamat.');
        return;
    };

    if ($('#txt_bpd_feasibility_region').val() == '') {
        swal('Mohon Isi Region.');
        return;
    };
    if ($('#txt_bpd_feasibility_mitra').val() == '') {
        swal('Mohon Isi Mitra.');
        return;
    };
    if ($('#txt_bpd_feasibility_tahunKajian').val() == '') {
        swal('Mohon Isi Tahun Kajian.');
        return;
    };

    if ($('#txt_bpd_feasibility_pulauPompa').val() == '') {
        swal('Mohon Isi Pulau Pompa.');
        return;
    };
    if ($('#txt_bpd_feasibility_jumlahDispense').val() == '') {
        swal('Mohon Isi Jumlah Dispenser.');
        return;
    };

    if ($('#txt_bpd_feasibility_jumlahTangkiPendam').val() == '') {
        swal('Mohon Isi Jumlah Tangki Pendam.');
        return;
    };
    if ($('#txt_bpd_feasibility_tahun_1').val() == 'All') {
        swal('Mohon Pilih Grading Tahun 1.');
        return;
    };

    if ($('#txt_bpd_feasibility_tahun_2').val() == 'All') {
        swal('Mohon Pilih Grading Tahun 2.');
        return;
    };
    if ($('#txt_bpd_feasibility_tahun_3').val() == 'All') {
        swal('Mohon Pilih Grading Tahun 3.');
        return;
    };

    if ($('#txt_bpd_feasibility_tahun_4').val() == 'All') {
        swal('Mohon Pilih Grading Tahun 4.');
        return;
    };
    if ($('#txt_bpd_feasibility_tahun_5').val() == 'All') {
        swal('Mohon Pilih Grading Tahun 5.');
        return;
    };

    let DtForm = $('#frmKsoAllOperateTac');
    let DtDisabled = DtForm.find(':input:disabled');
    DtForm.find(':input:disabled').removeAttr('disabled');

    let frmData = DtForm.serializeArray();
    FrData = new FormData();

    $.each(frmData, function (key, input) {
        FrData.append(input.name, $.trim(input.value));
    });

    DtDisabled.attr('disabled', true);

    GetBpdProduk();
    GetBpdJabatanPekerja();
    GetBpdPakaianPekerja()
    GetBpdOverhead();
    GetBpdAsumsi();
    GetBpdCapex();

    FrData.append('LsBpdProduk', JSON.stringify(LsBpdProduk));
    FrData.append('LsBpdJabatanPekerja', JSON.stringify(LsBpdJabatanPekerja));
    FrData.append('LsBpdPakaianPekerja', JSON.stringify(LsBpdPakaianPekerja));
    FrData.append('LsBpdOverhead', JSON.stringify(LsBpdOverhead));
    FrData.append('LsBpdAsumsi', JSON.stringify(LsBpdAsumsi));
    FrData.append('LsBpdCapex', JSON.stringify(LsBpdCapex));


    Swal.fire({
        title: "Are you sure?",
        text: "Submit this, You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it.",
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
            setTimeout(function () {

                $.ajax({
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    url: UrlOrigin + '/FormKSO/AddKsoBpd',
                    data: FrData,
                    processData: false,
                    cache: false,
                    async: false,
                    contentType: false,
                    timeout: 800000,
                    success: function (data) {
                        Swal.close();
                        debugger
                        if (data.status != 200) {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        } else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500
                            });

                            window.location.replace(UrlOrigin + '/formkso/detail?Id=' + data.data.id);

                        }

                    },
                    error: function (e) {

                        //close wal
                        Swal.close();

                        //display alert error
                        if (e.status == 400 || e.status == 422) {
                            let cnt = 0;
                            $.each(e.responseJSON.errors, function (key, value) {
                                if (cnt == 0) {
                                    console.log('value: ' + value);
                                    Swal.fire("Failed", '' + value, "error");
                                }
                                cnt++;
                            });
                        } else {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        }

                    },
                });
            }, 500);
        }
    });

});
$('#btn-finance-pettycash-submit').click(function () {

    if ($('#ddl_finance_asmen_PettyCash').val() == 'All') {
        swal('Mohon Pilih ASMEN PETTY CASH.');
        return;
    };

    if ($('#ddl_finance_manager_PettyCash').val() == 'All') {
        swal('Mohon Pilih Manager PETTY CASH.');
        return;
    };

    let DtForm = $('#frmKsoAllOperateTac');
    let DtDisabled = DtForm.find(':input:disabled');
    DtForm.find(':input:disabled').removeAttr('disabled');

    let frmData = DtForm.serializeArray();
    FrData = new FormData();

    $.each(frmData, function (key, input) {
        FrData.append(input.name, $.trim(input.value));
    });

    DtDisabled.attr('disabled', true);

    Swal.fire({
        title: "Are you sure?",
        text: "Submit this, You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it.",
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
            setTimeout(function () {

                $.ajax({
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    url: UrlOrigin + '/FormKSO/AddKsoFinancePettyCash',
                    data: FrData,
                    processData: false,
                    cache: false,
                    async: false,
                    contentType: false,
                    timeout: 800000,
                    success: function (data) {
                        Swal.close();
                        debugger
                        if (data.status != 200) {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        } else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500
                            });

                            window.location.replace(UrlOrigin + '/formkso/detail?Id=' + data.data.id);

                        }

                    },
                    error: function (e) {

                        //close wal
                        Swal.close();

                        //display alert error
                        if (e.status == 400 || e.status == 422) {
                            let cnt = 0;
                            $.each(e.responseJSON.errors, function (key, value) {
                                if (cnt == 0) {
                                    console.log('value: ' + value);
                                    Swal.fire("Failed", '' + value, "error");
                                }
                                cnt++;
                            });
                        } else {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        }

                    },
                });
            }, 500);
        }
    });

});
$('#btn-finance-pickupservice-submit').click(function () {

    if ($('#ddl_finance_asmen_PickupService').val() == 'All') {
        swal('Mohon Pilih ASMEN PICKUP SERVICES.');
        return;
    };

    if ($('#ddl_finance_manager_PickupService').val() == 'All') {
        swal('Mohon Pilih Manager PICKUP SERVICES.');
        return;
    };

    let DtForm = $('#frmKsoAllOperateTac');
    let DtDisabled = DtForm.find(':input:disabled');
    DtForm.find(':input:disabled').removeAttr('disabled');

    let frmData = DtForm.serializeArray();
    FrData = new FormData();

    $.each(frmData, function (key, input) {
        FrData.append(input.name, $.trim(input.value));
    });

    GetFinancePickupEdcBank();
    GetFinancePickupEdcBankNew();
    FrData.append('LsFinancePickupEdcBank', JSON.stringify(LsFinancePickupEdcBank));
    FrData.append('LsFinancePickupEdcBankNew', JSON.stringify(LsFinancePickupEdcBankNew));

    DtDisabled.attr('disabled', true);

    Swal.fire({
        title: "Are you sure?",
        text: "Submit this, You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it.",
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
            setTimeout(function () {

                $.ajax({
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    url: UrlOrigin + '/FormKSO/AddKsoFinancePickup',
                    data: FrData,
                    processData: false,
                    cache: false,
                    async: false,
                    contentType: false,
                    timeout: 800000,
                    success: function (data) {
                        Swal.close();
                        debugger
                        if (data.status != 200) {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        } else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500
                            });

                            window.location.replace(UrlOrigin + '/formkso/detail?Id=' + data.data.id);

                        }

                    },
                    error: function (e) {

                        //close wal
                        Swal.close();

                        //display alert error
                        if (e.status == 400 || e.status == 422) {
                            let cnt = 0;
                            $.each(e.responseJSON.errors, function (key, value) {
                                if (cnt == 0) {
                                    console.log('value: ' + value);
                                    Swal.fire("Failed", '' + value, "error");
                                }
                                cnt++;
                            });
                        } else {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        }

                    },
                });
            }, 500);
        }
    });

});
$('#btn-hc-submit').click(function () {

    if ($('#ddl_hc_asmen').val() == 'All') {
        swal('Mohon Pilih ASMEN HC.');
        return;
    };

    if ($('#ddl_hc_manager').val() == 'All') {
        swal('Mohon Pilih Manager HC.');
        return;
    };

    let DtForm = $('#frmKsoAllOperateTac');
    let DtDisabled = DtForm.find(':input:disabled');
    DtForm.find(':input:disabled').removeAttr('disabled');

    let frmData = DtForm.serializeArray();
    FrData = new FormData();

    $.each(frmData, function (key, input) {
        FrData.append(input.name, $.trim(input.value));
    });

    DtDisabled.attr('disabled', true);

    FrData.append('LsProdukVolume', JSON.stringify(LsProdukVolume));

    GetHcSdm();
    GetHcSdmSam();
    GetHcSdmSamRls();
    FrData.append('LsHcSdm', JSON.stringify(LsHcSdm));
    FrData.append('LsHcSdmSam', JSON.stringify(LsHcSdmSam));
    FrData.append('LsHcDetailRls', JSON.stringify(LsHcSdmRls));

    Swal.fire({
        title: "Are you sure?",
        text: "Submit this, You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it.",
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
            setTimeout(function () {

                $.ajax({
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    url: UrlOrigin + '/FormKSO/AddKsoHc',
                    data: FrData,
                    processData: false,
                    cache: false,
                    async: false,
                    contentType: false,
                    timeout: 800000,
                    success: function (data) {
                        Swal.close();
                        debugger
                        if (data.status != 200) {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        } else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500
                            });

                            window.location.replace(UrlOrigin + '/formkso/detail?Id=' + data.data.id);

                        }

                    },
                    error: function (e) {

                        //close wal
                        Swal.close();

                        //display alert error
                        if (e.status == 400 || e.status == 422) {
                            let cnt = 0;
                            $.each(e.responseJSON.errors, function (key, value) {
                                if (cnt == 0) {
                                    console.log('value: ' + value);
                                    Swal.fire("Failed", '' + value, "error");
                                }
                                cnt++;
                            });
                        } else {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        }

                    },
                });
            }, 500);
        }
    });

});
$('#btn-legal-submit').click(function () {

    if ($('#ddl_legal_asmen').val() == 'All') {
        swal('Mohon Pilih ASMEN LEGAL.');
        return;
    };

    if ($('#ddl_legal_manager').val() == 'All') {
        swal('Mohon Pilih Manager LEGAL.');
        return;
    };

    let DtForm = $('#frmKsoAllOperateTac');
    let DtDisabled = DtForm.find(':input:disabled');
    DtForm.find(':input:disabled').removeAttr('disabled');

    let frmData = DtForm.serializeArray();
    FrData = new FormData();

    $.each(frmData, function (key, input) {
        FrData.append(input.name, $.trim(input.value));
    });

    DtDisabled.attr('disabled', true);

    if (FileLegalContract.length == 0) {
        FrData.append('DataFileLegal', '');
    }
    else {
        var DataFileLegal = JSON.stringify({
            TicketId: $('#txt_TicketId').val(), FileName: FileLegalContract[0].name, FileExtention: "." + FileLegalContract[0].name.split(".").pop(), MimeType: FileLegalContract[0].type,
            AsBase64: StData64Contract.split(",").pop(), Type: "Contract", Descriptions: $('#txt_legal_FileDescription').val()
        });
        FrData.append('DataFileLegal', JSON.stringify(DataFileLegal));
    }

    Swal.fire({
        title: "Are you sure?",
        text: "Submit this, You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it.",
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
            setTimeout(function () {

                $.ajax({
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    url: UrlOrigin + '/FormKSO/AddKsoLegal',
                    data: FrData,
                    processData: false,
                    cache: false,
                    async: false,
                    contentType: false,
                    timeout: 800000,
                    success: function (data) {
                        Swal.close();
                        debugger
                        if (data.status != 200) {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        } else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500
                            });

                            window.location.replace(UrlOrigin + '/formkso/detail?Id=' + data.data.id);

                        }

                    },
                    error: function (e) {

                        //close wal
                        Swal.close();

                        //display alert error
                        if (e.status == 400 || e.status == 422) {
                            let cnt = 0;
                            $.each(e.responseJSON.errors, function (key, value) {
                                if (cnt == 0) {
                                    console.log('value: ' + value);
                                    Swal.fire("Failed", '' + value, "error");
                                }
                                cnt++;
                            });
                        } else {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        }

                    },
                });
            }, 500);
        }
    });

});
$('#btn-Teknik-submit').click(function () {

    if ($('#ddl_teknik_asmen').val() == 'All') {
        swal('Mohon Pilih ASMEN TEKNIK.');
        return;
    };

    if ($('#ddl_teknik_manager').val() == 'All') {
        swal('Mohon Pilih Manager TEKNIK.');
        return;
    };

    let DtForm = $('#frmKsoAllOperateTac');
    let DtDisabled = DtForm.find(':input:disabled');
    DtForm.find(':input:disabled').removeAttr('disabled');

    let frmData = DtForm.serializeArray();
    FrData = new FormData();

    $.each(frmData, function (key, input) {
        FrData.append(input.name, $.trim(input.value));
    });

    DtDisabled.attr('disabled', true);
    GetTeknikDispenser();
    GetTeknikDispenserRls();
    FrData.append('LsTeknikDispenser', JSON.stringify(LsTeknikDispenser));
    FrData.append('LsTeknikDispenserRls', JSON.stringify(LsTeknikDispenserRls));

    Swal.fire({
        title: "Are you sure?",
        text: "Submit this, You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it.",
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
            setTimeout(function () {

                $.ajax({
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    url: UrlOrigin + '/FormKSO/AddKsoTeknik',
                    data: FrData,
                    processData: false,
                    cache: false,
                    async: false,
                    contentType: false,
                    timeout: 800000,
                    success: function (data) {
                        Swal.close();
                        debugger
                        if (data.status != 200) {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        } else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500
                            });

                            window.location.replace(UrlOrigin + '/formkso/detail?Id=' + data.data.id);

                        }

                    },
                    error: function (e) {

                        //close wal
                        Swal.close();

                        //display alert error
                        if (e.status == 400 || e.status == 422) {
                            let cnt = 0;
                            $.each(e.responseJSON.errors, function (key, value) {
                                if (cnt == 0) {
                                    console.log('value: ' + value);
                                    Swal.fire("Failed", '' + value, "error");
                                }
                                cnt++;
                            });
                        } else {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        }

                    },
                });
            }, 500);
        }
    });

});
//#endregion

//#region Manager Reject
$('#btn_kso_ManagerReject').click(function () {
    if ($('#txt_kso_ManagerReason').val() == '') {
        swal('Mohon Isi Keterangan Manager.');
        return;
    };

    let DtForm = $('#frmKsoAllOperateTac');
    let DtDisabled = DtForm.find(':input:disabled');
    DtForm.find(':input:disabled').removeAttr('disabled');

    let frmData = DtForm.serializeArray();
    FrData = new FormData();

    $.each(frmData, function (key, input) {
        FrData.append(input.name, $.trim(input.value));
    });

    DtDisabled.attr('disabled', true);

    Swal.fire({
        title: "Are you sure?",
        text: "Submit this, You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it.",
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
            setTimeout(function () {

                $.ajax({
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    url: UrlOrigin + '/FormKSO/ManagerKSOReject',
                    data: FrData,
                    processData: false,
                    cache: false,
                    async: false,
                    contentType: false,
                    timeout: 800000,
                    success: function (data) {
                        Swal.close();
                        debugger
                        if (data.status != 200) {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        } else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500
                            });

                            window.location.replace(UrlOrigin + '/formkso/detail?Id=' + data.data.id);

                        }

                    },
                    error: function (e) {

                        //close wal
                        Swal.close();

                        //display alert error
                        if (e.status == 400 || e.status == 422) {
                            let cnt = 0;
                            $.each(e.responseJSON.errors, function (key, value) {
                                if (cnt == 0) {
                                    console.log('value: ' + value);
                                    Swal.fire("Failed", '' + value, "error");
                                }
                                cnt++;
                            });
                        } else {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        }

                    },
                });
            }, 500);
        }
    });
});
$('#btn_kso_ManagerReject_bpd').click(function () {
    if ($('#txt_kso_ManagerReason_bpd').val() == '') {
        swal('Mohon Isi Keterangan Manager.');
        return;
    };

    let DtForm = $('#frmKsoAllOperateTac');
    let DtDisabled = DtForm.find(':input:disabled');
    DtForm.find(':input:disabled').removeAttr('disabled');

    let frmData = DtForm.serializeArray();
    FrData = new FormData();

    $.each(frmData, function (key, input) {
        FrData.append(input.name, $.trim(input.value));
    });

    DtDisabled.attr('disabled', true);

    Swal.fire({
        title: "Are you sure?",
        text: "Submit this, You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it.",
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
            setTimeout(function () {

                $.ajax({
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    url: UrlOrigin + '/FormKSO/BpdManagerKSOReject',
                    data: FrData,
                    processData: false,
                    cache: false,
                    async: false,
                    contentType: false,
                    timeout: 800000,
                    success: function (data) {
                        Swal.close();
                        debugger
                        if (data.status != 200) {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        } else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500
                            });

                            window.location.replace(UrlOrigin + '/formkso/detail?Id=' + data.data.id);

                        }

                    },
                    error: function (e) {

                        //close wal
                        Swal.close();

                        //display alert error
                        if (e.status == 400 || e.status == 422) {
                            let cnt = 0;
                            $.each(e.responseJSON.errors, function (key, value) {
                                if (cnt == 0) {
                                    console.log('value: ' + value);
                                    Swal.fire("Failed", '' + value, "error");
                                }
                                cnt++;
                            });
                        } else {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        }

                    },
                });
            }, 500);
        }
    });
});
$('#btn_kso_ManagerReject_Hc').click(function () {
    if ($('#txt_kso_ManagerReason_Hc').val() == '') {
        swal('Mohon Isi Keterangan Manager.');
        return;
    };

    let DtForm = $('#frmKsoAllOperateTac');
    let DtDisabled = DtForm.find(':input:disabled');
    DtForm.find(':input:disabled').removeAttr('disabled');

    let frmData = DtForm.serializeArray();
    FrData = new FormData();

    $.each(frmData, function (key, input) {
        FrData.append(input.name, $.trim(input.value));
    });

    DtDisabled.attr('disabled', true);

    Swal.fire({
        title: "Are you sure?",
        text: "Submit this, You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it.",
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
            setTimeout(function () {

                $.ajax({
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    url: UrlOrigin + '/FormKSO/HcManagerKSOReject',
                    data: FrData,
                    processData: false,
                    cache: false,
                    async: false,
                    contentType: false,
                    timeout: 800000,
                    success: function (data) {
                        Swal.close();
                        debugger
                        if (data.status != 200) {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        } else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500
                            });

                            window.location.replace(UrlOrigin + '/formkso/detail?Id=' + data.data.id);

                        }

                    },
                    error: function (e) {

                        //close wal
                        Swal.close();

                        //display alert error
                        if (e.status == 400 || e.status == 422) {
                            let cnt = 0;
                            $.each(e.responseJSON.errors, function (key, value) {
                                if (cnt == 0) {
                                    console.log('value: ' + value);
                                    Swal.fire("Failed", '' + value, "error");
                                }
                                cnt++;
                            });
                        } else {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        }

                    },
                });
            }, 500);
        }
    });
});
$('#btn_kso_ManagerReject_Legal').click(function () {
    if ($('#txt_kso_ManagerReason_Legal').val() == '') {
        swal('Mohon Isi Keterangan Manager.');
        return;
    };

    let DtForm = $('#frmKsoAllOperateTac');
    let DtDisabled = DtForm.find(':input:disabled');
    DtForm.find(':input:disabled').removeAttr('disabled');

    let frmData = DtForm.serializeArray();
    FrData = new FormData();

    $.each(frmData, function (key, input) {
        FrData.append(input.name, $.trim(input.value));
    });

    DtDisabled.attr('disabled', true);

    Swal.fire({
        title: "Are you sure?",
        text: "Submit this, You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it.",
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
            setTimeout(function () {

                $.ajax({
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    url: UrlOrigin + '/FormKSO/LegalManagerKSOReject',
                    data: FrData,
                    processData: false,
                    cache: false,
                    async: false,
                    contentType: false,
                    timeout: 800000,
                    success: function (data) {
                        Swal.close();
                        debugger
                        if (data.status != 200) {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        } else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500
                            });

                            window.location.replace(UrlOrigin + '/formkso/detail?Id=' + data.data.id);

                        }

                    },
                    error: function (e) {

                        //close wal
                        Swal.close();

                        //display alert error
                        if (e.status == 400 || e.status == 422) {
                            let cnt = 0;
                            $.each(e.responseJSON.errors, function (key, value) {
                                if (cnt == 0) {
                                    console.log('value: ' + value);
                                    Swal.fire("Failed", '' + value, "error");
                                }
                                cnt++;
                            });
                        } else {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        }

                    },
                });
            }, 500);
        }
    });
});
$('#btn_kso_ManagerReject_Teknik').click(function () {
    if ($('#txt_kso_ManagerReason_Teknik').val() == '') {
        swal('Mohon Isi Keterangan Manager.');
        return;
    };

    let DtForm = $('#frmKsoAllOperateTac');
    let DtDisabled = DtForm.find(':input:disabled');
    DtForm.find(':input:disabled').removeAttr('disabled');

    let frmData = DtForm.serializeArray();
    FrData = new FormData();

    $.each(frmData, function (key, input) {
        FrData.append(input.name, $.trim(input.value));
    });

    DtDisabled.attr('disabled', true);

    Swal.fire({
        title: "Are you sure?",
        text: "Submit this, You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it.",
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
            setTimeout(function () {

                $.ajax({
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    url: UrlOrigin + '/FormKSO/TeknikManagerKSOReject',
                    data: FrData,
                    processData: false,
                    cache: false,
                    async: false,
                    contentType: false,
                    timeout: 800000,
                    success: function (data) {
                        Swal.close();
                        debugger
                        if (data.status != 200) {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        } else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500
                            });

                            window.location.replace(UrlOrigin + '/formkso/detail?Id=' + data.data.id);

                        }

                    },
                    error: function (e) {

                        //close wal
                        Swal.close();

                        //display alert error
                        if (e.status == 400 || e.status == 422) {
                            let cnt = 0;
                            $.each(e.responseJSON.errors, function (key, value) {
                                if (cnt == 0) {
                                    console.log('value: ' + value);
                                    Swal.fire("Failed", '' + value, "error");
                                }
                                cnt++;
                            });
                        } else {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        }

                    },
                });
            }, 500);
        }
    });
});
$('#btn_kso_ManagerReject_financePettyCash').click(function () {
    if ($('#txt_kso_ManagerReason_financePettyCash').val() == '') {
        swal('Mohon Isi Keterangan Manager.');
        return;
    };

    let DtForm = $('#frmKsoAllOperateTac');
    let DtDisabled = DtForm.find(':input:disabled');
    DtForm.find(':input:disabled').removeAttr('disabled');

    let frmData = DtForm.serializeArray();
    FrData = new FormData();

    $.each(frmData, function (key, input) {
        FrData.append(input.name, $.trim(input.value));
    });

    DtDisabled.attr('disabled', true);

    Swal.fire({
        title: "Are you sure?",
        text: "Submit this, You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it.",
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
            setTimeout(function () {

                $.ajax({
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    url: UrlOrigin + '/FormKSO/FinancePettyCashManagerKSOReject',
                    data: FrData,
                    processData: false,
                    cache: false,
                    async: false,
                    contentType: false,
                    timeout: 800000,
                    success: function (data) {
                        Swal.close();
                        debugger
                        if (data.status != 200) {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        } else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500
                            });

                            window.location.replace(UrlOrigin + '/formkso/detail?Id=' + data.data.id);

                        }

                    },
                    error: function (e) {

                        //close wal
                        Swal.close();

                        //display alert error
                        if (e.status == 400 || e.status == 422) {
                            let cnt = 0;
                            $.each(e.responseJSON.errors, function (key, value) {
                                if (cnt == 0) {
                                    console.log('value: ' + value);
                                    Swal.fire("Failed", '' + value, "error");
                                }
                                cnt++;
                            });
                        } else {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        }

                    },
                });
            }, 500);
        }
    });
});
$('#btn_kso_ManagerReject_FinancePickup').click(function () {
    if ($('#txt_kso_ManagerReason_FinancePickup').val() == '') {
        swal('Mohon Isi Keterangan Manager.');
        return;
    };

    let DtForm = $('#frmKsoAllOperateTac');
    let DtDisabled = DtForm.find(':input:disabled');
    DtForm.find(':input:disabled').removeAttr('disabled');

    let frmData = DtForm.serializeArray();
    FrData = new FormData();

    $.each(frmData, function (key, input) {
        FrData.append(input.name, $.trim(input.value));
    });

    DtDisabled.attr('disabled', true);

    Swal.fire({
        title: "Are you sure?",
        text: "Submit this, You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it.",
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
            setTimeout(function () {

                $.ajax({
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    url: UrlOrigin + '/FormKSO/FinancePickUpManagerKSOReject',
                    data: FrData,
                    processData: false,
                    cache: false,
                    async: false,
                    contentType: false,
                    timeout: 800000,
                    success: function (data) {
                        Swal.close();
                        debugger
                        if (data.status != 200) {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        } else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500
                            });

                            window.location.replace(UrlOrigin + '/formkso/detail?Id=' + data.data.id);

                        }

                    },
                    error: function (e) {

                        //close wal
                        Swal.close();

                        //display alert error
                        if (e.status == 400 || e.status == 422) {
                            let cnt = 0;
                            $.each(e.responseJSON.errors, function (key, value) {
                                if (cnt == 0) {
                                    console.log('value: ' + value);
                                    Swal.fire("Failed", '' + value, "error");
                                }
                                cnt++;
                            });
                        } else {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        }

                    },
                });
            }, 500);
        }
    });
});
//#endregion

//#region Manager Approve
$('#btn_kso_ManagerApprove').click(function () {
    if ($('#txt_kso_ManagerReason').val() == '') {
        swal('Mohon Isi Keterangan Manager.');
        return;
    };

    let DtForm = $('#frmKsoAllOperateTac');
    let DtDisabled = DtForm.find(':input:disabled');
    DtForm.find(':input:disabled').removeAttr('disabled');

    let frmData = DtForm.serializeArray();
    FrData = new FormData();

    $.each(frmData, function (key, input) {
        FrData.append(input.name, $.trim(input.value));
    });

    DtDisabled.attr('disabled', true);

    Swal.fire({
        title: "Are you sure?",
        text: "Submit this, You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it.",
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
            setTimeout(function () {

                $.ajax({
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    url: UrlOrigin + '/FormKSO/ManagerKSOApprove',
                    data: FrData,
                    processData: false,
                    cache: false,
                    async: false,
                    contentType: false,
                    timeout: 800000,
                    success: function (data) {
                        Swal.close();
                        debugger
                        if (data.status != 200) {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        } else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500
                            });

                            window.location.replace(UrlOrigin + '/formkso/detail?Id=' + data.data.id);

                        }

                    },
                    error: function (e) {

                        //close wal
                        Swal.close();

                        //display alert error
                        if (e.status == 400 || e.status == 422) {
                            let cnt = 0;
                            $.each(e.responseJSON.errors, function (key, value) {
                                if (cnt == 0) {
                                    console.log('value: ' + value);
                                    Swal.fire("Failed", '' + value, "error");
                                }
                                cnt++;
                            });
                        } else {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        }

                    },
                });
            }, 500);
        }
    });
});
$('#btn_kso_ManagerApprove_bpd').click(function () {
    if ($('#txt_kso_ManagerReason_bpd').val() == '') {
        swal('Mohon Isi Keterangan Manager.');
        return;
    };

    let DtForm = $('#frmKsoAllOperateTac');
    let DtDisabled = DtForm.find(':input:disabled');
    DtForm.find(':input:disabled').removeAttr('disabled');

    let frmData = DtForm.serializeArray();
    FrData = new FormData();

    $.each(frmData, function (key, input) {
        FrData.append(input.name, $.trim(input.value));
    });

    DtDisabled.attr('disabled', true);

    Swal.fire({
        title: "Are you sure?",
        text: "Submit this, You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it.",
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
            setTimeout(function () {

                $.ajax({
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    url: UrlOrigin + '/FormKSO/BpdManagerKSOApprove',
                    data: FrData,
                    processData: false,
                    cache: false,
                    async: false,
                    contentType: false,
                    timeout: 800000,
                    success: function (data) {
                        Swal.close();
                        debugger
                        if (data.status != 200) {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        } else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500
                            });

                            window.location.replace(UrlOrigin + '/formkso/detail?Id=' + data.data.id);

                        }

                    },
                    error: function (e) {

                        //close wal
                        Swal.close();

                        //display alert error
                        if (e.status == 400 || e.status == 422) {
                            let cnt = 0;
                            $.each(e.responseJSON.errors, function (key, value) {
                                if (cnt == 0) {
                                    console.log('value: ' + value);
                                    Swal.fire("Failed", '' + value, "error");
                                }
                                cnt++;
                            });
                        } else {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        }

                    },
                });
            }, 500);
        }
    });
});
$('#btn_kso_ManagerApprove_Hc').click(function () {
    if ($('#txt_kso_ManagerReason_Hc').val() == '') {
        swal('Mohon Isi Keterangan Manager.');
        return;
    };

    let DtForm = $('#frmKsoAllOperateTac');
    let DtDisabled = DtForm.find(':input:disabled');
    DtForm.find(':input:disabled').removeAttr('disabled');

    let frmData = DtForm.serializeArray();
    FrData = new FormData();

    $.each(frmData, function (key, input) {
        FrData.append(input.name, $.trim(input.value));
    });

    DtDisabled.attr('disabled', true);

    Swal.fire({
        title: "Are you sure?",
        text: "Submit this, You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it.",
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
            setTimeout(function () {

                $.ajax({
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    url: UrlOrigin + '/FormKSO/HcManagerKSOApprove',
                    data: FrData,
                    processData: false,
                    cache: false,
                    async: false,
                    contentType: false,
                    timeout: 800000,
                    success: function (data) {
                        Swal.close();
                        debugger
                        if (data.status != 200) {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        } else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500
                            });

                            window.location.replace(UrlOrigin + '/formkso/detail?Id=' + data.data.id);

                        }

                    },
                    error: function (e) {

                        //close wal
                        Swal.close();

                        //display alert error
                        if (e.status == 400 || e.status == 422) {
                            let cnt = 0;
                            $.each(e.responseJSON.errors, function (key, value) {
                                if (cnt == 0) {
                                    console.log('value: ' + value);
                                    Swal.fire("Failed", '' + value, "error");
                                }
                                cnt++;
                            });
                        } else {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        }

                    },
                });
            }, 500);
        }
    });
});
$('#btn_kso_ManagerApprove_Legal').click(function () {
    if ($('#txt_kso_ManagerReason_Legal').val() == '') {
        swal('Mohon Isi Keterangan Manager.');
        return;
    };

    let DtForm = $('#frmKsoAllOperateTac');
    let DtDisabled = DtForm.find(':input:disabled');
    DtForm.find(':input:disabled').removeAttr('disabled');

    let frmData = DtForm.serializeArray();
    FrData = new FormData();

    $.each(frmData, function (key, input) {
        FrData.append(input.name, $.trim(input.value));
    });

    DtDisabled.attr('disabled', true);

    Swal.fire({
        title: "Are you sure?",
        text: "Submit this, You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it.",
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
            setTimeout(function () {

                $.ajax({
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    url: UrlOrigin + '/FormKSO/LegalManagerKSOApprove',
                    data: FrData,
                    processData: false,
                    cache: false,
                    async: false,
                    contentType: false,
                    timeout: 800000,
                    success: function (data) {
                        Swal.close();
                        debugger
                        if (data.status != 200) {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        } else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500
                            });

                            window.location.replace(UrlOrigin + '/formkso/detail?Id=' + data.data.id);

                        }

                    },
                    error: function (e) {

                        //close wal
                        Swal.close();

                        //display alert error
                        if (e.status == 400 || e.status == 422) {
                            let cnt = 0;
                            $.each(e.responseJSON.errors, function (key, value) {
                                if (cnt == 0) {
                                    console.log('value: ' + value);
                                    Swal.fire("Failed", '' + value, "error");
                                }
                                cnt++;
                            });
                        } else {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        }

                    },
                });
            }, 500);
        }
    });
});
$('#btn_kso_ManagerApprove_Teknik').click(function () {
    if ($('#txt_kso_ManagerReason_Teknik').val() == '') {
        swal('Mohon Isi Keterangan Manager.');
        return;
    };

    let DtForm = $('#frmKsoAllOperateTac');
    let DtDisabled = DtForm.find(':input:disabled');
    DtForm.find(':input:disabled').removeAttr('disabled');

    let frmData = DtForm.serializeArray();
    FrData = new FormData();

    $.each(frmData, function (key, input) {
        FrData.append(input.name, $.trim(input.value));
    });

    DtDisabled.attr('disabled', true);

    Swal.fire({
        title: "Are you sure?",
        text: "Submit this, You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it.",
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
            setTimeout(function () {

                $.ajax({
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    url: UrlOrigin + '/FormKSO/TeknikManagerKSOApprove',
                    data: FrData,
                    processData: false,
                    cache: false,
                    async: false,
                    contentType: false,
                    timeout: 800000,
                    success: function (data) {
                        Swal.close();
                        debugger
                        if (data.status != 200) {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        } else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500
                            });

                            window.location.replace(UrlOrigin + '/formkso/detail?Id=' + data.data.id);

                        }

                    },
                    error: function (e) {

                        //close wal
                        Swal.close();

                        //display alert error
                        if (e.status == 400 || e.status == 422) {
                            let cnt = 0;
                            $.each(e.responseJSON.errors, function (key, value) {
                                if (cnt == 0) {
                                    console.log('value: ' + value);
                                    Swal.fire("Failed", '' + value, "error");
                                }
                                cnt++;
                            });
                        } else {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        }

                    },
                });
            }, 500);
        }
    });
});
$('#btn_kso_ManagerApprove_financePettyCash').click(function () {
    if ($('#txt_kso_ManagerReason_financePettyCash').val() == '') {
        swal('Mohon Isi Keterangan Manager.');
        return;
    };

    let DtForm = $('#frmKsoAllOperateTac');
    let DtDisabled = DtForm.find(':input:disabled');
    DtForm.find(':input:disabled').removeAttr('disabled');

    let frmData = DtForm.serializeArray();
    FrData = new FormData();

    $.each(frmData, function (key, input) {
        FrData.append(input.name, $.trim(input.value));
    });

    DtDisabled.attr('disabled', true);

    Swal.fire({
        title: "Are you sure?",
        text: "Submit this, You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it.",
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
            setTimeout(function () {

                $.ajax({
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    url: UrlOrigin + '/FormKSO/FinancePettyCashManagerKSOApprove',
                    data: FrData,
                    processData: false,
                    cache: false,
                    async: false,
                    contentType: false,
                    timeout: 800000,
                    success: function (data) {
                        Swal.close();
                        debugger
                        if (data.status != 200) {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        } else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500
                            });

                            window.location.replace(UrlOrigin + '/formkso/detail?Id=' + data.data.id);

                        }

                    },
                    error: function (e) {

                        //close wal
                        Swal.close();

                        //display alert error
                        if (e.status == 400 || e.status == 422) {
                            let cnt = 0;
                            $.each(e.responseJSON.errors, function (key, value) {
                                if (cnt == 0) {
                                    console.log('value: ' + value);
                                    Swal.fire("Failed", '' + value, "error");
                                }
                                cnt++;
                            });
                        } else {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        }

                    },
                });
            }, 500);
        }
    });
});
$('#btn_kso_ManagerApprove_FinancePickup').click(function () {
    if ($('#txt_kso_ManagerReason_FinancePickup').val() == '') {
        swal('Mohon Isi Keterangan Manager.');
        return;
    };

    let DtForm = $('#frmKsoAllOperateTac');
    let DtDisabled = DtForm.find(':input:disabled');
    DtForm.find(':input:disabled').removeAttr('disabled');

    let frmData = DtForm.serializeArray();
    FrData = new FormData();

    $.each(frmData, function (key, input) {
        FrData.append(input.name, $.trim(input.value));
    });

    DtDisabled.attr('disabled', true);

    Swal.fire({
        title: "Are you sure?",
        text: "Submit this, You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it.",
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
            setTimeout(function () {

                $.ajax({
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    url: UrlOrigin + '/FormKSO/FinancePickUpManagerKSOApprove',
                    data: FrData,
                    processData: false,
                    cache: false,
                    async: false,
                    contentType: false,
                    timeout: 800000,
                    success: function (data) {
                        Swal.close();
                        debugger
                        if (data.status != 200) {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        } else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500
                            });

                            window.location.replace(UrlOrigin + '/formkso/detail?Id=' + data.data.id);

                        }

                    },
                    error: function (e) {

                        //close wal
                        Swal.close();

                        //display alert error
                        if (e.status == 400 || e.status == 422) {
                            let cnt = 0;
                            $.each(e.responseJSON.errors, function (key, value) {
                                if (cnt == 0) {
                                    console.log('value: ' + value);
                                    Swal.fire("Failed", '' + value, "error");
                                }
                                cnt++;
                            });
                        } else {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        }

                    },
                });
            }, 500);
        }
    });
});
//#endregion

//#region Asmen Reject
$('#btn_kso_AsmenReject').click(function () {
    if ($('#txt_kso_AsmenReason').val() == '') {
        swal('Mohon Isi Keterangan Asmen.');
        return;
    };

    let DtForm = $('#frmKsoAllOperateTac');
    let DtDisabled = DtForm.find(':input:disabled');
    DtForm.find(':input:disabled').removeAttr('disabled');

    let frmData = DtForm.serializeArray();
    FrData = new FormData();

    $.each(frmData, function (key, input) {
        FrData.append(input.name, $.trim(input.value));
    });

    DtDisabled.attr('disabled', true);

    Swal.fire({
        title: "Are you sure?",
        text: "Submit this, You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it.",
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
            setTimeout(function () {

                $.ajax({
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    url: UrlOrigin + '/FormKSO/AsmenKSOReject',
                    data: FrData,
                    processData: false,
                    cache: false,
                    async: false,
                    contentType: false,
                    timeout: 800000,
                    success: function (data) {
                        Swal.close();
                        debugger
                        if (data.status != 200) {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        } else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500
                            });

                            window.location.replace(UrlOrigin + '/formkso/detail?Id=' + data.data.id);

                        }

                    },
                    error: function (e) {

                        //close wal
                        Swal.close();

                        //display alert error
                        if (e.status == 400 || e.status == 422) {
                            let cnt = 0;
                            $.each(e.responseJSON.errors, function (key, value) {
                                if (cnt == 0) {
                                    console.log('value: ' + value);
                                    Swal.fire("Failed", '' + value, "error");
                                }
                                cnt++;
                            });
                        } else {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        }

                    },
                });
            }, 500);
        }
    });
});
$('#btn_kso_AsmenReject_bpd').click(function () {
    if ($('#txt_kso_AsmenReason_bpd').val() == '') {
        swal('Mohon Isi Keterangan Asmen.');
        return;
    };

    let DtForm = $('#frmKsoAllOperateTac');
    let DtDisabled = DtForm.find(':input:disabled');
    DtForm.find(':input:disabled').removeAttr('disabled');

    let frmData = DtForm.serializeArray();
    FrData = new FormData();

    $.each(frmData, function (key, input) {
        FrData.append(input.name, $.trim(input.value));
    });

    DtDisabled.attr('disabled', true);

    Swal.fire({
        title: "Are you sure?",
        text: "Submit this, You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it.",
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
            setTimeout(function () {

                $.ajax({
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    url: UrlOrigin + '/FormKSO/BpdAsmenKSOReject',
                    data: FrData,
                    processData: false,
                    cache: false,
                    async: false,
                    contentType: false,
                    timeout: 800000,
                    success: function (data) {
                        Swal.close();
                        debugger
                        if (data.status != 200) {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        } else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500
                            });

                            window.location.replace(UrlOrigin + '/formkso/detail?Id=' + data.data.id);

                        }

                    },
                    error: function (e) {

                        //close wal
                        Swal.close();

                        //display alert error
                        if (e.status == 400 || e.status == 422) {
                            let cnt = 0;
                            $.each(e.responseJSON.errors, function (key, value) {
                                if (cnt == 0) {
                                    console.log('value: ' + value);
                                    Swal.fire("Failed", '' + value, "error");
                                }
                                cnt++;
                            });
                        } else {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        }

                    },
                });
            }, 500);
        }
    });
});
$('#btn_kso_AsmenReject_Hc').click(function () {
    if ($('#txt_kso_AsmenReason_Hc').val() == '') {
        swal('Mohon Isi Keterangan Asmen.');
        return;
    };

    let DtForm = $('#frmKsoAllOperateTac');
    let DtDisabled = DtForm.find(':input:disabled');
    DtForm.find(':input:disabled').removeAttr('disabled');

    let frmData = DtForm.serializeArray();
    FrData = new FormData();

    $.each(frmData, function (key, input) {
        FrData.append(input.name, $.trim(input.value));
    });

    DtDisabled.attr('disabled', true);

    Swal.fire({
        title: "Are you sure?",
        text: "Submit this, You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it.",
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
            setTimeout(function () {

                $.ajax({
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    url: UrlOrigin + '/FormKSO/HcAsmenKSOReject',
                    data: FrData,
                    processData: false,
                    cache: false,
                    async: false,
                    contentType: false,
                    timeout: 800000,
                    success: function (data) {
                        Swal.close();
                        debugger
                        if (data.status != 200) {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        } else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500
                            });

                            window.location.replace(UrlOrigin + '/formkso/detail?Id=' + data.data.id);

                        }

                    },
                    error: function (e) {

                        //close wal
                        Swal.close();

                        //display alert error
                        if (e.status == 400 || e.status == 422) {
                            let cnt = 0;
                            $.each(e.responseJSON.errors, function (key, value) {
                                if (cnt == 0) {
                                    console.log('value: ' + value);
                                    Swal.fire("Failed", '' + value, "error");
                                }
                                cnt++;
                            });
                        } else {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        }

                    },
                });
            }, 500);
        }
    });
});
$('#btn_kso_AsmenReject_Legal').click(function () {
    if ($('#txt_kso_AsmenReason_Legal').val() == '') {
        swal('Mohon Isi Keterangan Asmen.');
        return;
    };

    let DtForm = $('#frmKsoAllOperateTac');
    let DtDisabled = DtForm.find(':input:disabled');
    DtForm.find(':input:disabled').removeAttr('disabled');

    let frmData = DtForm.serializeArray();
    FrData = new FormData();

    $.each(frmData, function (key, input) {
        FrData.append(input.name, $.trim(input.value));
    });

    DtDisabled.attr('disabled', true);

    Swal.fire({
        title: "Are you sure?",
        text: "Submit this, You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it.",
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
            setTimeout(function () {

                $.ajax({
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    url: UrlOrigin + '/FormKSO/LegalAsmenKSOReject',
                    data: FrData,
                    processData: false,
                    cache: false,
                    async: false,
                    contentType: false,
                    timeout: 800000,
                    success: function (data) {
                        Swal.close();
                        debugger
                        if (data.status != 200) {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        } else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500
                            });

                            window.location.replace(UrlOrigin + '/formkso/detail?Id=' + data.data.id);

                        }

                    },
                    error: function (e) {

                        //close wal
                        Swal.close();

                        //display alert error
                        if (e.status == 400 || e.status == 422) {
                            let cnt = 0;
                            $.each(e.responseJSON.errors, function (key, value) {
                                if (cnt == 0) {
                                    console.log('value: ' + value);
                                    Swal.fire("Failed", '' + value, "error");
                                }
                                cnt++;
                            });
                        } else {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        }

                    },
                });
            }, 500);
        }
    });
});
$('#btn_kso_AsmenReject_Teknik').click(function () {
    if ($('#txt_kso_AsmenReason_Teknik').val() == '') {
        swal('Mohon Isi Keterangan Asmen.');
        return;
    };

    let DtForm = $('#frmKsoAllOperateTac');
    let DtDisabled = DtForm.find(':input:disabled');
    DtForm.find(':input:disabled').removeAttr('disabled');

    let frmData = DtForm.serializeArray();
    FrData = new FormData();

    $.each(frmData, function (key, input) {
        FrData.append(input.name, $.trim(input.value));
    });

    DtDisabled.attr('disabled', true);

    Swal.fire({
        title: "Are you sure?",
        text: "Submit this, You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it.",
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
            setTimeout(function () {

                $.ajax({
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    url: UrlOrigin + '/FormKSO/TeknikAsmenKSOReject',
                    data: FrData,
                    processData: false,
                    cache: false,
                    async: false,
                    contentType: false,
                    timeout: 800000,
                    success: function (data) {
                        Swal.close();
                        debugger
                        if (data.status != 200) {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        } else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500
                            });

                            window.location.replace(UrlOrigin + '/formkso/detail?Id=' + data.data.id);

                        }

                    },
                    error: function (e) {

                        //close wal
                        Swal.close();

                        //display alert error
                        if (e.status == 400 || e.status == 422) {
                            let cnt = 0;
                            $.each(e.responseJSON.errors, function (key, value) {
                                if (cnt == 0) {
                                    console.log('value: ' + value);
                                    Swal.fire("Failed", '' + value, "error");
                                }
                                cnt++;
                            });
                        } else {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        }

                    },
                });
            }, 500);
        }
    });
});
$('#btn_kso_AsmenReject_financePettyCash').click(function () {
    if ($('#txt_kso_AsmenReason_financePettyCash').val() == '') {
        swal('Mohon Isi Keterangan Asmen.');
        return;
    };

    let DtForm = $('#frmKsoAllOperateTac');
    let DtDisabled = DtForm.find(':input:disabled');
    DtForm.find(':input:disabled').removeAttr('disabled');

    let frmData = DtForm.serializeArray();
    FrData = new FormData();

    $.each(frmData, function (key, input) {
        FrData.append(input.name, $.trim(input.value));
    });

    DtDisabled.attr('disabled', true);

    Swal.fire({
        title: "Are you sure?",
        text: "Submit this, You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it.",
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
            setTimeout(function () {

                $.ajax({
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    url: UrlOrigin + '/FormKSO/FinancePettyCashAsmenKSOReject',
                    data: FrData,
                    processData: false,
                    cache: false,
                    async: false,
                    contentType: false,
                    timeout: 800000,
                    success: function (data) {
                        Swal.close();
                        debugger
                        if (data.status != 200) {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        } else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500
                            });

                            window.location.replace(UrlOrigin + '/formkso/detail?Id=' + data.data.id);

                        }

                    },
                    error: function (e) {

                        //close wal
                        Swal.close();

                        //display alert error
                        if (e.status == 400 || e.status == 422) {
                            let cnt = 0;
                            $.each(e.responseJSON.errors, function (key, value) {
                                if (cnt == 0) {
                                    console.log('value: ' + value);
                                    Swal.fire("Failed", '' + value, "error");
                                }
                                cnt++;
                            });
                        } else {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        }

                    },
                });
            }, 500);
        }
    });
});
$('#btn_kso_AsmenReject_FinancePickup').click(function () {
    if ($('#txt_kso_AsmenReason_FinancePickup').val() == '') {
        swal('Mohon Isi Keterangan Asmen.');
        return;
    };

    let DtForm = $('#frmKsoAllOperateTac');
    let DtDisabled = DtForm.find(':input:disabled');
    DtForm.find(':input:disabled').removeAttr('disabled');

    let frmData = DtForm.serializeArray();
    FrData = new FormData();

    $.each(frmData, function (key, input) {
        FrData.append(input.name, $.trim(input.value));
    });

    DtDisabled.attr('disabled', true);

    Swal.fire({
        title: "Are you sure?",
        text: "Submit this, You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it.",
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
            setTimeout(function () {

                $.ajax({
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    url: UrlOrigin + '/FormKSO/FinancePickUpAsmenKSOReject',
                    data: FrData,
                    processData: false,
                    cache: false,
                    async: false,
                    contentType: false,
                    timeout: 800000,
                    success: function (data) {
                        Swal.close();
                        debugger
                        if (data.status != 200) {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        } else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500
                            });

                            window.location.replace(UrlOrigin + '/formkso/detail?Id=' + data.data.id);

                        }

                    },
                    error: function (e) {

                        //close wal
                        Swal.close();

                        //display alert error
                        if (e.status == 400 || e.status == 422) {
                            let cnt = 0;
                            $.each(e.responseJSON.errors, function (key, value) {
                                if (cnt == 0) {
                                    console.log('value: ' + value);
                                    Swal.fire("Failed", '' + value, "error");
                                }
                                cnt++;
                            });
                        } else {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        }

                    },
                });
            }, 500);
        }
    });
});
//#endregion

//#region Asmen Approve
$('#btn_kso_AsmenApprove').click(function () {
    if ($('#txt_kso_AsmenReason').val() == '') {
        swal('Mohon Isi Keterangan Asmen.');
        return;
    };

    let DtForm = $('#frmKsoAllOperateTac');
    let DtDisabled = DtForm.find(':input:disabled');
    DtForm.find(':input:disabled').removeAttr('disabled');

    let frmData = DtForm.serializeArray();
    FrData = new FormData();

    $.each(frmData, function (key, input) {
        FrData.append(input.name, $.trim(input.value));
    });

    DtDisabled.attr('disabled', true);

    Swal.fire({
        title: "Are you sure?",
        text: "Submit this, You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it.",
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
            setTimeout(function () {

                $.ajax({
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    url: UrlOrigin + '/FormKSO/AsmenKSOApprove',
                    data: FrData,
                    processData: false,
                    cache: false,
                    async: false,
                    contentType: false,
                    timeout: 800000,
                    success: function (data) {
                        Swal.close();
                        debugger
                        if (data.status != 200) {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        } else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500
                            });

                            window.location.replace(UrlOrigin + '/formkso/detail?Id=' + data.data.id);

                        }

                    },
                    error: function (e) {

                        //close wal
                        Swal.close();

                        //display alert error
                        if (e.status == 400 || e.status == 422) {
                            let cnt = 0;
                            $.each(e.responseJSON.errors, function (key, value) {
                                if (cnt == 0) {
                                    console.log('value: ' + value);
                                    Swal.fire("Failed", '' + value, "error");
                                }
                                cnt++;
                            });
                        } else {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        }

                    },
                });
            }, 500);
        }
    });
});
$('#btn_kso_AsmenApprove_bpd').click(function () {
    if ($('#txt_kso_AsmenReason_bpd').val() == '') {
        swal('Mohon Isi Keterangan Asmen.');
        return;
    };

    let DtForm = $('#frmKsoAllOperateTac');
    let DtDisabled = DtForm.find(':input:disabled');
    DtForm.find(':input:disabled').removeAttr('disabled');

    let frmData = DtForm.serializeArray();
    FrData = new FormData();

    $.each(frmData, function (key, input) {
        FrData.append(input.name, $.trim(input.value));
    });

    DtDisabled.attr('disabled', true);

    Swal.fire({
        title: "Are you sure?",
        text: "Submit this, You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it.",
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
            setTimeout(function () {

                $.ajax({
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    url: UrlOrigin + '/FormKSO/BpdAsmenKSOApprove',
                    data: FrData,
                    processData: false,
                    cache: false,
                    async: false,
                    contentType: false,
                    timeout: 800000,
                    success: function (data) {
                        Swal.close();
                        debugger
                        if (data.status != 200) {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        } else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500
                            });

                            window.location.replace(UrlOrigin + '/formkso/detail?Id=' + data.data.id);

                        }

                    },
                    error: function (e) {

                        //close wal
                        Swal.close();

                        //display alert error
                        if (e.status == 400 || e.status == 422) {
                            let cnt = 0;
                            $.each(e.responseJSON.errors, function (key, value) {
                                if (cnt == 0) {
                                    console.log('value: ' + value);
                                    Swal.fire("Failed", '' + value, "error");
                                }
                                cnt++;
                            });
                        } else {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        }

                    },
                });
            }, 500);
        }
    });
});
$('#btn_kso_AsmenApprove_Hc').click(function () {
    if ($('#txt_kso_AsmenReason_Hc').val() == '') {
        swal('Mohon Isi Keterangan Asmen.');
        return;
    };

    let DtForm = $('#frmKsoAllOperateTac');
    let DtDisabled = DtForm.find(':input:disabled');
    DtForm.find(':input:disabled').removeAttr('disabled');

    let frmData = DtForm.serializeArray();
    FrData = new FormData();

    $.each(frmData, function (key, input) {
        FrData.append(input.name, $.trim(input.value));
    });

    DtDisabled.attr('disabled', true);

    Swal.fire({
        title: "Are you sure?",
        text: "Submit this, You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it.",
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
            setTimeout(function () {

                $.ajax({
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    url: UrlOrigin + '/FormKSO/HcAsmenKSOApprove',
                    data: FrData,
                    processData: false,
                    cache: false,
                    async: false,
                    contentType: false,
                    timeout: 800000,
                    success: function (data) {
                        Swal.close();
                        debugger
                        if (data.status != 200) {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        } else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500
                            });

                            window.location.replace(UrlOrigin + '/formkso/detail?Id=' + data.data.id);

                        }

                    },
                    error: function (e) {

                        //close wal
                        Swal.close();

                        //display alert error
                        if (e.status == 400 || e.status == 422) {
                            let cnt = 0;
                            $.each(e.responseJSON.errors, function (key, value) {
                                if (cnt == 0) {
                                    console.log('value: ' + value);
                                    Swal.fire("Failed", '' + value, "error");
                                }
                                cnt++;
                            });
                        } else {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        }

                    },
                });
            }, 500);
        }
    });
});
$('#btn_kso_AsmenApprove_Legal').click(function () {
    if ($('#txt_kso_AsmenReason_Legal').val() == '') {
        swal('Mohon Isi Keterangan Asmen.');
        return;
    };

    let DtForm = $('#frmKsoAllOperateTac');
    let DtDisabled = DtForm.find(':input:disabled');
    DtForm.find(':input:disabled').removeAttr('disabled');

    let frmData = DtForm.serializeArray();
    FrData = new FormData();

    $.each(frmData, function (key, input) {
        FrData.append(input.name, $.trim(input.value));
    });

    DtDisabled.attr('disabled', true);

    Swal.fire({
        title: "Are you sure?",
        text: "Submit this, You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it.",
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
            setTimeout(function () {

                $.ajax({
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    url: UrlOrigin + '/FormKSO/LegalAsmenKSOApprove',
                    data: FrData,
                    processData: false,
                    cache: false,
                    async: false,
                    contentType: false,
                    timeout: 800000,
                    success: function (data) {
                        Swal.close();
                        debugger
                        if (data.status != 200) {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        } else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500
                            });

                            window.location.replace(UrlOrigin + '/formkso/detail?Id=' + data.data.id);

                        }

                    },
                    error: function (e) {

                        //close wal
                        Swal.close();

                        //display alert error
                        if (e.status == 400 || e.status == 422) {
                            let cnt = 0;
                            $.each(e.responseJSON.errors, function (key, value) {
                                if (cnt == 0) {
                                    console.log('value: ' + value);
                                    Swal.fire("Failed", '' + value, "error");
                                }
                                cnt++;
                            });
                        } else {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        }

                    },
                });
            }, 500);
        }
    });
});
$('#btn_kso_AsmenApprove_Teknik').click(function () {
    if ($('#txt_kso_AsmenReason_Teknik').val() == '') {
        swal('Mohon Isi Keterangan Asmen.');
        return;
    };

    let DtForm = $('#frmKsoAllOperateTac');
    let DtDisabled = DtForm.find(':input:disabled');
    DtForm.find(':input:disabled').removeAttr('disabled');

    let frmData = DtForm.serializeArray();
    FrData = new FormData();

    $.each(frmData, function (key, input) {
        FrData.append(input.name, $.trim(input.value));
    });

    DtDisabled.attr('disabled', true);

    Swal.fire({
        title: "Are you sure?",
        text: "Submit this, You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it.",
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
            setTimeout(function () {

                $.ajax({
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    url: UrlOrigin + '/FormKSO/TeknikAsmenKSOApprove',
                    data: FrData,
                    processData: false,
                    cache: false,
                    async: false,
                    contentType: false,
                    timeout: 800000,
                    success: function (data) {
                        Swal.close();
                        debugger
                        if (data.status != 200) {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        } else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500
                            });

                            window.location.replace(UrlOrigin + '/formkso/detail?Id=' + data.data.id);

                        }

                    },
                    error: function (e) {

                        //close wal
                        Swal.close();

                        //display alert error
                        if (e.status == 400 || e.status == 422) {
                            let cnt = 0;
                            $.each(e.responseJSON.errors, function (key, value) {
                                if (cnt == 0) {
                                    console.log('value: ' + value);
                                    Swal.fire("Failed", '' + value, "error");
                                }
                                cnt++;
                            });
                        } else {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        }

                    },
                });
            }, 500);
        }
    });
});
$('#btn_kso_AsmenApprove_financePettyCash').click(function () {
    if ($('#txt_kso_AsmenReason_financePettyCash').val() == '') {
        swal('Mohon Isi Keterangan Asmen.');
        return;
    };

    let DtForm = $('#frmKsoAllOperateTac');
    let DtDisabled = DtForm.find(':input:disabled');
    DtForm.find(':input:disabled').removeAttr('disabled');

    let frmData = DtForm.serializeArray();
    FrData = new FormData();

    $.each(frmData, function (key, input) {
        FrData.append(input.name, $.trim(input.value));
    });

    DtDisabled.attr('disabled', true);

    Swal.fire({
        title: "Are you sure?",
        text: "Submit this, You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it.",
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
            setTimeout(function () {

                $.ajax({
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    url: UrlOrigin + '/FormKSO/FinancePettyCashAsmenKSOApprove',
                    data: FrData,
                    processData: false,
                    cache: false,
                    async: false,
                    contentType: false,
                    timeout: 800000,
                    success: function (data) {
                        Swal.close();
                        debugger
                        if (data.status != 200) {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        } else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500
                            });

                            window.location.replace(UrlOrigin + '/formkso/detail?Id=' + data.data.id);

                        }

                    },
                    error: function (e) {

                        //close wal
                        Swal.close();

                        //display alert error
                        if (e.status == 400 || e.status == 422) {
                            let cnt = 0;
                            $.each(e.responseJSON.errors, function (key, value) {
                                if (cnt == 0) {
                                    console.log('value: ' + value);
                                    Swal.fire("Failed", '' + value, "error");
                                }
                                cnt++;
                            });
                        } else {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        }

                    },
                });
            }, 500);
        }
    });
});
$('#btn_kso_AsmenApprove_FinancePickup').click(function () {
    if ($('#txt_kso_AsmenReason_FinancePickup').val() == '') {
        swal('Mohon Isi Keterangan Asmen.');
        return;
    };

    let DtForm = $('#frmKsoAllOperateTac');
    let DtDisabled = DtForm.find(':input:disabled');
    DtForm.find(':input:disabled').removeAttr('disabled');

    let frmData = DtForm.serializeArray();
    FrData = new FormData();

    $.each(frmData, function (key, input) {
        FrData.append(input.name, $.trim(input.value));
    });

    DtDisabled.attr('disabled', true);

    Swal.fire({
        title: "Are you sure?",
        text: "Submit this, You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it.",
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
            setTimeout(function () {

                $.ajax({
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    url: UrlOrigin + '/FormKSO/FinancePickUpAsmenKSOApprove',
                    data: FrData,
                    processData: false,
                    cache: false,
                    async: false,
                    contentType: false,
                    timeout: 800000,
                    success: function (data) {
                        Swal.close();
                        debugger
                        if (data.status != 200) {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        } else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500
                            });

                            window.location.replace(UrlOrigin + '/formkso/detail?Id=' + data.data.id);

                        }

                    },
                    error: function (e) {

                        //close wal
                        Swal.close();

                        //display alert error
                        if (e.status == 400 || e.status == 422) {
                            let cnt = 0;
                            $.each(e.responseJSON.errors, function (key, value) {
                                if (cnt == 0) {
                                    console.log('value: ' + value);
                                    Swal.fire("Failed", '' + value, "error");
                                }
                                cnt++;
                            });
                        } else {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        }

                    },
                });
            }, 500);
        }
    });
});

//#endregion

//#region Close Ticket

$('#btn_kso_closed_ticket').click(function () {

    //if ($('#txt_kso_ClosedReason').val() == '') {
    //    swal('Mohon Isi Keterangan Closed Ticket.');
    //    return;
    //};

    let DtForm = $('#frmKsoAllOperateTac');
    let DtDisabled = DtForm.find(':input:disabled');
    DtForm.find(':input:disabled').removeAttr('disabled');

    let frmData = DtForm.serializeArray();
    FrData = new FormData();

    $.each(frmData, function (key, input) {
        FrData.append(input.name, $.trim(input.value));
    });

    DtDisabled.attr('disabled', true);

    Swal.fire({
        title: "Are you sure?",
        text: "Submit this, You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it.",
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
            setTimeout(function () {

                $.ajax({
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    url: UrlOrigin + '/FormKSO/SamClosedTicketKso',
                    data: FrData,
                    processData: false,
                    cache: false,
                    async: false,
                    contentType: false,
                    timeout: 800000,
                    success: function (data) {
                        Swal.close();
                        debugger
                        if (data.status != 200) {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        } else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500
                            });

                            window.location.replace(UrlOrigin + '/formkso/detail?Id=' + data.data.id);

                        }

                    },
                    error: function (e) {

                        //close wal
                        Swal.close();

                        //display alert error
                        if (e.status == 400 || e.status == 422) {
                            let cnt = 0;
                            $.each(e.responseJSON.errors, function (key, value) {
                                if (cnt == 0) {
                                    console.log('value: ' + value);
                                    Swal.fire("Failed", '' + value, "error");
                                }
                                cnt++;
                            });
                        } else {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        }

                    },
                });
            }, 500);
        }
    });
});

//#endregion

$('#btn-create-new-spbu-kso-all-operate-tac').click(function () {
    //window.location.replace(UrlOrigin + '/FormKSO/detail');

    //const swalWithBootstrapButtons = Swal.mixin({
    //    customClass: {
    //        confirmButton: 'btn btn-success',
    //        cancelButton: 'btn btn-danger me-2'
    //    },
    //    buttonsStyling: false,
    //})

    //swalWithBootstrapButtons.fire({
    //    title: 'Are you sure?',
    //    text: "Alasan Freeze " + FreezeStatus + " :",
    //    input: 'text',
    //    inputAttributes: {
    //        style: 'width: 400px;', // Adjust width as needed
    //        autocapitalize: 'off',
    //        autocorrect: 'off'
    //    },
    //    icon: 'warning',
    //    showCancelButton: true,
    //    confirmButtonClass: 'me-2 btn-custom-swa',
    //    confirmButtonText: 'Submit',
    //    cancelButtonText: 'Cancel',
    //    reverseButtons: true,
    //    preConfirm: (inputValue) => {
    //        if (!inputValue) {
    //            Swal.showValidationMessage('Kolom alasan tidak boleh kosong');
    //        }
    //        return inputValue;
    //    }
    //}).then((result) => {
    //    if (result.value) {
    //        showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
    //        window.location.replace(UrlOrigin + '/FormKSO/detail?Id=0&RoleKso=' + result.value );
    //    } else {
    //        if (
    //            result.dismiss === Swal.DismissReason.cancel
    //        ) {
    //        }
    //    }
    //})


    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success m-1 p-2 ',
            cancelButton: 'btn btn-danger me-2 m-1 p-2'
        },
        buttonsStyling: false,
    })

    swalWithBootstrapButtons.fire({
        title: 'Pilih Role KSO ?',
        html: `
        <div class="form-group">
        <label for="dropdown"></label>
        <select id="dropdown-role-kso-new" name="dropdown-role-kso-new" class="pl-3 pr-3 js-example-basic-single form-select" data-width="100%"
            style="width: 200px; border: 1px solid black; color: black;">
            <option value="" selected> -- Pilih -- </option>
            <option value="1">All Operate</option>
            <option value="2">TAC</option>
        </select>
        </div>
    `,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Continue',
        cancelButtonText: 'Cancel',
        reverseButtons: true,
        preConfirm: () => {
            const dropdown = Swal.getPopup().querySelector('#dropdown-role-kso-new');
            const selectedValue = dropdown.value;
            if (!selectedValue) {
                Swal.showValidationMessage('Mohon Pilih Role KSO');
            }
            return selectedValue;
        }
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');

            // Ensure result.value is valid for URL
            const encodedValue = encodeURIComponent(result.value);
            window.location.replace(`${UrlOrigin}/FormKSO/detail?Id=0&RoleKso=${encodedValue}`);
        }
    });




});

$('#btn-Hc-new-detail').click(function (e) {
    e.preventDefault();

    if ($('#txt_Hc_Fullname').val() == "") {
        swal('Mohon Enter Fullname.');
        return;
    }
    if ($('#Ddl_Hc_JenisKelamin').val() == "All") {
        swal('Mohon Pilih Jenis Kelamin.');
        return;
    }
    if ($('#txt_Hc_Posisi').val() == "") {
        swal('Mohon Enter Posisi.');
        return;
    }
    if ($('#txt_Hc_Pendidikan').val() == "") {
        swal('Mohon Enter Pendidikan.');
        return;
    }
    if ($('#txt_Hc_Dob').val() == new Date().toISOString().split("T")[0]) {
        swal('Mohon pilih Tanggal Lahir.');
        return;
    }
    if ($('#txt_Hc_Pengalaman').val() == "") {
        swal('Mohon Enter Pengalaman.');
        return;
    }

    showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');

    $('#tbl_Hc_Sdm tbody').append("<tr class='dataHcSdm'>" +
        "<td>" +
        "<button type='button' class='btn btn-danger btn-icon-text btndeletehcSdm'>" +
        "<i class='btn-icon-append' data-feather='trash-2'></i> Delete" +
        "</button>" +
        "</td>" +
        "<td class='inputValueHcSdm'>" + $('#txt_Hc_Fullname').val() + "</td>" +
        "<td class='inputValueHcSdm'>" + $('#txt_Hc_Posisi').val() + "</td>" +
        "<td class='inputValueHcSdm'>" + $('#Ddl_Hc_JenisKelamin').val() + "</td>" +
        "<td class='inputValueHcSdm'>" + $('#txt_Hc_Pendidikan').val() + "</td>" +
        "<td class='inputValueHcSdm'>" + $('#txt_Hc_Pengalaman').val() + "</td>" +
        "<td class='inputValueHcSdm'>" + $('#txt_Hc_Usia').val() + "</td>" +
        "<td class='inputValueHcSdm'>" + $('#txt_Hc_Dob').val() + "</td>" +
        "</tr>");
    feather.replace();
    $('#modal-hcSdm').modal('hide');
    Swal.close();
    GetHcSdm();
});
$('#btn-Hc-SdmSam').click(function (e) {
    e.preventDefault();

    if ($('#txt_Hc_Posisi_SdmSam').val() == "") {
        swal('Mohon Enter Posisi.');
        return;
    }
    if ($('#Ddl_Hc_JenisKelamin_SdmSam').val() == "All") {
        swal('Mohon Pilih Jenis Kelamin.');
        return;
    }
    if ($('#txt_Hc_Jumlah_SdmSam').val() == "") {
        swal('Mohon Enter Jumlah.');
        return;
    }

    showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');

    $('#tbl_Hc_SdmSam tbody').append("<tr class='dataHcSam'>" +
        "<td>" +
        "<button type='button' class='btn btn-danger btn-icon-text btndeletehcSam'>" +
        "<i class='btn-icon-append' data-feather='trash-2'></i> Delete" +
        "</button>" +
        "</td>" +
        "<td class='inputValueHcSam'>" + $('#txt_Hc_Posisi_SdmSam').val() + "</td>" +
        "<td class='inputValueHcSam'>" + $('#Ddl_Hc_JenisKelamin_SdmSam').val() + "</td>" +
        "<td><input type='number' class='inputValueHcSam form-control' id='txt_jumlahSdmSAM' name='txt_jumlahSdmSAM' value='" + $('#txt_Hc_Jumlah_SdmSam').val() +"' onkeypress='return onlyNumberKey(event)' onchange='onlyNumberKey(event)' style='width:70px !important;'></td>" +
        "<td><input type='number' readonly class='inputValueHcSam form-control' id='txt_jumlahSdmSAMRls' name='txt_jumlahSdmSAMRls' value='0' onkeypress='return onlyNumberKey(event)' onchange='onlyNumberKey(event)' style='width:70px !important;'></td>" +
        "<td class='text-center'><div class='form-check m-0 pb-3 pl-4'><input type='checkbox' class='inputValueHcSam form-check-input' readonly id='txt_IsConfirmedSdm' name='txt_IsConfirmedSdm' disabled></div></td>" +
        "</tr>");

    feather.replace();
    $('#modal-hcSdmSam').modal('hide');
    Swal.close();
    GetHcSdmSam();
});

$('#btn-Upload-ict').click(function (e) {
    e.preventDefault();

    if (files2 == null || files2.length == 0) {
        swal('Mohon pilih file.');
        return;
    }
    if ($('#txt_Ict_File_Type').val() == "All") {
        swal('Mohon pilih file type.');
        return;
    }
    showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
    setTimeout(function () {
        let DtForm = $('#frmKsoAllOperateTac');
        let DtDisabled = DtForm.find(':input:disabled');
        DtForm.find(':input:disabled').removeAttr('disabled');

        let frmData = DtForm.serializeArray();
        FrData = new FormData();

        $.each(frmData, function (key, input) {
            FrData.append(input.name, $.trim(input.value));
        });

        DtDisabled.attr('disabled', true);

        var Data = JSON.stringify({
            TicketId: $('#txt_TicketId').val(), FileName: files2[0].name, FileExtention: "." + files2[0].name.split(".").pop(), MimeType: files2[0].type,
            AsBase64: StData64.split(",").pop(), Type: $('#txt_Ict_File_Type').val(), Descriptions: $('#txt_Ict_Description').val()
        });

        FrData.append('fileAtt', JSON.stringify(Data));
        GetSaleVolume();
        FrData.append('LsProdukVolume', JSON.stringify(LsProdukVolume));

        var Save = $.ajax({
            type: 'POST',
            enctype: 'multipart/form-data',
            url: UrlOrigin + '/FormKSO/AddFileIct',
            data: FrData,
            processData: false,
            cache: false,
            async: false,
            contentType: false,
            timeout: 800000,
            error: function (request, status, error) {

                Swal.close();
                Swal.fire("Failed", request.responseJSON.detail, "error");
                return
            }
        });

        Swal.close();

        if (Save.status != 200) {

            Swal.fire("Failed", Save.responseJSON.detail, "error");
            return
        }
        else {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your work has been save',
                showConfirmButton: false,
                timer: 1500
            });

            Swal.fire({
                title: 'Loading...',
                showConfirmButton: false,
                allowOutsideClick: false,
                onBeforeOpen: () => {
                    showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');

                    setTimeout(() => {
                        $('#txt_TicketId').val(Save.responseJSON.data.ticketId);
                        AjaxListFileIct($('#txt_TicketId').val());
                        $('#modal-ict-upload').modal('hide');

                    }, 1500); // Delay in milliseconds (1.5 seconds)
                },
                onClose: () => {
                    Swal.close();
                }
            });




        }
    }, 1500);

});
$('#btn-Upload-bak').click(function (e) {
    e.preventDefault();

    if (files2 == null || files2.length == 0) {
        swal('Mohon pilih file.');
        return;
    }
    if ($('#txt_Bak_File_Type').val() == "All") {
        swal('Mohon pilih file type.');
        return;
    }
    showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
    setTimeout(function () {
        let DtForm = $('#frmKsoAllOperateTac');
        let DtDisabled = DtForm.find(':input:disabled');
        DtForm.find(':input:disabled').removeAttr('disabled');

        let frmData = DtForm.serializeArray();
        FrData = new FormData();

        $.each(frmData, function (key, input) {
            FrData.append(input.name, $.trim(input.value));
        });

        DtDisabled.attr('disabled', true);

        var Data = JSON.stringify({
            TicketId: $('#txt_TicketId').val(), FileName: files2[0].name, FileExtention: "." + files2[0].name.split(".").pop(), MimeType: files2[0].type,
            AsBase64: StData64.split(",").pop(), Type: $('#txt_Bak_File_Type').val(), Descriptions: $('#txt_Bak_Description').val()
        });
        FrData.append('fileAtt', JSON.stringify(Data));
        GetSaleVolume();
        FrData.append('LsProdukVolume', JSON.stringify(LsProdukVolume));

        var Save = $.ajax({
            type: 'POST',
            enctype: 'multipart/form-data',
            url: UrlOrigin + '/FormKSO/AddFileBak',
            data: FrData,
            processData: false,
            cache: false,
            async: false,
            contentType: false,
            timeout: 800000,
            error: function (request, status, error) {

                Swal.close();
                Swal.fire("Failed", request.responseJSON.detail, "error");
                return
            }
        });

        Swal.close();

        if (Save.status != 200) {

            Swal.fire("Failed", Save.responseJSON.detail, "error");
            return
        }
        else {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your work has been save',
                showConfirmButton: false,
                timer: 1500
            });
            $('#txt_TicketId').val(Save.responseJSON.data.ticketId);
            AjaxListFileBak($('#txt_TicketId').val());
            $('#modal-bak-upload').modal('hide');
        }
    }, 1500);

});
$('#btn-Upload-bpd').click(function (e) {
    e.preventDefault();

    if (files2 == null || files2.length == 0) {
        swal('Mohon pilih file.');
        return;
    }
    if ($('#txt_bpd_fileType').val() == "") {
        swal('Mohon isi file type.');
        return;
    }
    showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
    setTimeout(function () {
        let DtForm = $('#frmKsoAllOperateTac');
        let DtDisabled = DtForm.find(':input:disabled');
        DtForm.find(':input:disabled').removeAttr('disabled');

        let frmData = DtForm.serializeArray();
        FrData = new FormData();

        $.each(frmData, function (key, input) {
            FrData.append(input.name, $.trim(input.value));
        });

        DtDisabled.attr('disabled', true);
        GetSaleVolume();
        FrData.append('LsProdukVolume', JSON.stringify(LsProdukVolume));

        var Data = JSON.stringify({
            TicketId: $('#txt_TicketId').val(), FileName: files2[0].name, FileExtention: "." + files2[0].name.split(".").pop(), MimeType: files2[0].type,
            AsBase64: StData64.split(",").pop(), Type: $('#txt_bpd_fileType').val(), Descriptions: $('#txt_bpd_FileDescription').val()
        });

        FrData.append('fileAtt', JSON.stringify(Data));

        var Save = $.ajax({
            type: 'POST',
            enctype: 'multipart/form-data',
            url: UrlOrigin + '/FormKSO/AddFileBpd',
            data: FrData,
            processData: false,
            cache: false,
            async: false,
            contentType: false,
            timeout: 800000,
            error: function (request, status, error) {

                Swal.close();
                Swal.fire("Failed", request.responseJSON.detail, "error");
                return
            }
        });

        Swal.close();

        if (Save.status != 200) {

            Swal.fire("Failed", Save.responseJSON.detail, "error");
            return
        }
        else {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your work has been save',
                showConfirmButton: false,
                timer: 1500
            });
            $('#txt_TicketId').val(Save.responseJSON.data.ticketId);
            AjaxListFileBpd($('#txt_TicketId').val());
            $('#modal-bpd-upload').modal('hide');
        }
    }, 1500);

});
$('#btn-Upload-legal').click(function (e) {
    e.preventDefault();

    if (files2 == null || files2.length == 0) {
        swal('Mohon pilih file.');
        return;
    }
    if ($('#txt_legal_fileType').val() == "") {
        swal('Mohon isi file type.');
        return;
    }
    showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
    setTimeout(function () {
        let DtForm = $('#frmKsoAllOperateTac');
        let DtDisabled = DtForm.find(':input:disabled');
        DtForm.find(':input:disabled').removeAttr('disabled');

        let frmData = DtForm.serializeArray();
        FrData = new FormData();

        $.each(frmData, function (key, input) {
            FrData.append(input.name, $.trim(input.value));
        });

        DtDisabled.attr('disabled', true);
        GetSaleVolume();
        FrData.append('LsProdukVolume', JSON.stringify(LsProdukVolume));

        var Data = JSON.stringify({
            TicketId: $('#txt_TicketId').val(), FileName: files2[0].name, FileExtention: "." + files2[0].name.split(".").pop(), MimeType: files2[0].type,
            AsBase64: StData64.split(",").pop(), Type: $('#txt_legal_fileType').val(), Descriptions: $('#txt_legal_FileDescription').val()
        });

        FrData.append('fileAtt', JSON.stringify(Data));

        var Save = $.ajax({
            type: 'POST',
            enctype: 'multipart/form-data',
            url: UrlOrigin + '/FormKSO/AddFileLegal',
            data: FrData,
            processData: false,
            cache: false,
            async: false,
            contentType: false,
            timeout: 800000,
            error: function (request, status, error) {

                Swal.close();
                Swal.fire("Failed", request.responseJSON.detail, "error");
                return
            }
        });

        Swal.close();

        if (Save.status != 200) {

            Swal.fire("Failed", Save.responseJSON.detail, "error");
            return
        }
        else {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your work has been save',
                showConfirmButton: false,
                timer: 1500
            });
            $('#txt_TicketId').val(Save.responseJSON.data.ticketId);
            AjaxListFileLegal($('#txt_TicketId').val());
            $('#modal-legal-upload').modal('hide');
        }
    }, 1500);

});
$('#btn-Upload-teknik').click(function (e) {
    e.preventDefault();

    if (files2 == null || files2.length == 0) {
        swal('Mohon pilih file.');
        return;
    }
    if ($('#txt_teknik_fileType').val() == "") {
        swal('Mohon isi file type.');
        return;
    }
    showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
    setTimeout(function () {
        let DtForm = $('#frmKsoAllOperateTac');
        let DtDisabled = DtForm.find(':input:disabled');
        DtForm.find(':input:disabled').removeAttr('disabled');

        let frmData = DtForm.serializeArray();
        FrData = new FormData();

        $.each(frmData, function (key, input) {
            FrData.append(input.name, $.trim(input.value));
        });

        DtDisabled.attr('disabled', true);

        var Data = JSON.stringify({
            TicketId: $('#txt_TicketId').val(), FileName: files2[0].name, FileExtention: "." + files2[0].name.split(".").pop(), MimeType: files2[0].type,
            AsBase64: StData64.split(",").pop(), Type: $('#txt_teknik_fileType').val(), Descriptions: $('#txt_teknik_FileDescription').val()
        });

        FrData.append('fileAtt', JSON.stringify(Data));
        GetSaleVolume();
        FrData.append('LsProdukVolume', JSON.stringify(LsProdukVolume));

        var Save = $.ajax({
            type: 'POST',
            enctype: 'multipart/form-data',
            url: UrlOrigin + '/FormKSO/AddFileTeknik',
            data: FrData,
            processData: false,
            cache: false,
            async: false,
            contentType: false,
            timeout: 800000,
            error: function (request, status, error) {

                Swal.close();
                Swal.fire("Failed", request.responseJSON.detail, "error");
                return
            }
        });

        Swal.close();

        if (Save.status != 200) {

            Swal.fire("Failed", Save.responseJSON.detail, "error");
            return
        }
        else {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your work has been save',
                showConfirmButton: false,
                timer: 1500
            });
            $('#txt_TicketId').val(Save.responseJSON.data.ticketId);
            AjaxListFileTeknik($('#txt_TicketId').val());
            $('#modal-teknik-upload').modal('hide');
        }
    }, 1500);

});
$('#btn-Upload-financePettyCash').click(function (e) {
    e.preventDefault();

    if (files2 == null || files2.length == 0) {
        swal('Mohon pilih file.');
        return;
    }
    if ($('#txt_financePettyCash_fileType').val() == "") {
        swal('Mohon isi file type.');
        return;
    }
    showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
    setTimeout(function () {
        let DtForm = $('#frmKsoAllOperateTac');
        let DtDisabled = DtForm.find(':input:disabled');
        DtForm.find(':input:disabled').removeAttr('disabled');

        let frmData = DtForm.serializeArray();
        FrData = new FormData();

        $.each(frmData, function (key, input) {
            FrData.append(input.name, $.trim(input.value));
        });

        DtDisabled.attr('disabled', true);
        GetSaleVolume();
        FrData.append('LsProdukVolume', JSON.stringify(LsProdukVolume));

        var Data = JSON.stringify({
            TicketId: $('#txt_TicketId').val(), FileName: files2[0].name, FileExtention: "." + files2[0].name.split(".").pop(), MimeType: files2[0].type,
            AsBase64: StData64.split(",").pop(), Type: $('#txt_financePettyCash_fileType').val(), Descriptions: $('#txt_financePettyCash_FileDescription').val(), Posisi: "PettyCash"
        });

        FrData.append('fileAtt', JSON.stringify(Data));

        var Save = $.ajax({
            type: 'POST',
            enctype: 'multipart/form-data',
            url: UrlOrigin + '/FormKSO/AddFileFinance',
            data: FrData,
            processData: false,
            cache: false,
            async: false,
            contentType: false,
            timeout: 800000,
            error: function (request, status, error) {

                Swal.close();
                Swal.fire("Failed", request.responseJSON.detail, "error");
                return
            }
        });

        Swal.close();

        if (Save.status != 200) {

            Swal.fire("Failed", Save.responseJSON.detail, "error");
            return
        }
        else {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your work has been save',
                showConfirmButton: false,
                timer: 1500
            });
            $('#txt_TicketId').val(Save.responseJSON.data.ticketId);
            AjaxListFileFinancePettyCash($('#txt_TicketId').val());
            $('#modal-financePettyCash-upload').modal('hide');
        }
    }, 1500);

});
$('#btn-Upload-financePickupService').click(function (e) {
    e.preventDefault();

    if (files2 == null || files2.length == 0) {
        swal('Mohon pilih file.');
        return;
    }
    if ($('#txt_financePickupService_fileType').val() == "") {
        swal('Mohon isi file type.');
        return;
    }
    showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
    setTimeout(function () {
        let DtForm = $('#frmKsoAllOperateTac');
        let DtDisabled = DtForm.find(':input:disabled');
        DtForm.find(':input:disabled').removeAttr('disabled');

        let frmData = DtForm.serializeArray();
        FrData = new FormData();

        $.each(frmData, function (key, input) {
            FrData.append(input.name, $.trim(input.value));
        });

        DtDisabled.attr('disabled', true);
        GetSaleVolume();
        FrData.append('LsProdukVolume', JSON.stringify(LsProdukVolume));

        var Data = JSON.stringify({
            TicketId: $('#txt_TicketId').val(), FileName: files2[0].name, FileExtention: "." + files2[0].name.split(".").pop(), MimeType: files2[0].type,
            AsBase64: StData64.split(",").pop(), Type: $('#txt_financePickupService_fileType').val(), Descriptions: $('#txt_financePickupService_FileDescription').val(), Posisi: "PickupService"
        });

        FrData.append('fileAtt', JSON.stringify(Data));

        var Save = $.ajax({
            type: 'POST',
            enctype: 'multipart/form-data',
            url: UrlOrigin + '/FormKSO/AddFileFinance',
            data: FrData,
            processData: false,
            cache: false,
            async: false,
            contentType: false,
            timeout: 800000,
            error: function (request, status, error) {

                Swal.close();
                Swal.fire("Failed", request.responseJSON.detail, "error");
                return
            }
        });

        Swal.close();

        if (Save.status != 200) {

            Swal.fire("Failed", Save.responseJSON.detail, "error");
            return
        }
        else {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your work has been save',
                showConfirmButton: false,
                timer: 1500
            });
            $('#txt_TicketId').val(Save.responseJSON.data.ticketId);
            AjaxListFileFinancePickupService($('#txt_TicketId').val());
            $('#modal-financePickupService-upload').modal('hide');
        }
    }, 1500);

});
$('#btn-Upload-hc').click(function (e) {
    e.preventDefault();

    if (files2 == null || files2.length == 0) {
        swal('Mohon pilih file.');
        return;
    }
    if ($('#txt_hc_fileType').val() == "") {
        swal('Mohon isi file type.');
        return;
    }
    showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
    setTimeout(function () {
        let DtForm = $('#frmKsoAllOperateTac');
        let DtDisabled = DtForm.find(':input:disabled');
        DtForm.find(':input:disabled').removeAttr('disabled');

        let frmData = DtForm.serializeArray();
        FrData = new FormData();

        $.each(frmData, function (key, input) {
            FrData.append(input.name, $.trim(input.value));
        });

        DtDisabled.attr('disabled', true);

        var Data = JSON.stringify({
            TicketId: $('#txt_TicketId').val(), FileName: files2[0].name, FileExtention: "." + files2[0].name.split(".").pop(), MimeType: files2[0].type,
            AsBase64: StData64.split(",").pop(), Type: $('#txt_hc_fileType').val(), Descriptions: $('#txt_hc_FileDescription').val()
        });

        FrData.append('fileAtt', JSON.stringify(Data));
        GetSaleVolume();
        FrData.append('LsProdukVolume', JSON.stringify(LsProdukVolume));

        var Save = $.ajax({
            type: 'POST',
            enctype: 'multipart/form-data',
            url: UrlOrigin + '/FormKSO/AddFileHc',
            data: FrData,
            processData: false,
            cache: false,
            async: false,
            contentType: false,
            timeout: 800000,
            error: function (request, status, error) {

                Swal.close();
                Swal.fire("Failed", request.responseJSON.detail, "error");
                return
            }
        });

        Swal.close();

        if (Save.status != 200) {

            Swal.fire("Failed", Save.responseJSON.detail, "error");
            return
        }
        else {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your work has been save',
                showConfirmButton: false,
                timer: 1500
            });
            $('#txt_TicketId').val(Save.responseJSON.data.ticketId);
            AjaxListFileHc($('#txt_TicketId').val());
            $('#modal-hc-upload').modal('hide');
        }
    }, 1500);

});
$('#btn-Upload-kso').click(function (e) {
    e.preventDefault();

    if (files2 == null || files2.length == 0) {
        swal('Mohon pilih file.');
        return;
    }
    if ($('#txt_kso_File_Type').val() == "") {
        swal('Mohon isi file type.');
        return;
    }
    showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
    setTimeout(function () {
        let DtForm = $('#frmKsoAllOperateTac');
        let DtDisabled = DtForm.find(':input:disabled');
        DtForm.find(':input:disabled').removeAttr('disabled');

        let frmData = DtForm.serializeArray();
        FrData = new FormData();

        $.each(frmData, function (key, input) {
            FrData.append(input.name, $.trim(input.value));
        });

        DtDisabled.attr('disabled', true);

        var Data = JSON.stringify({
            TicketId: $('#txt_TicketId').val(), FileName: files2[0].name, FileExtention: "." + files2[0].name.split(".").pop(), MimeType: files2[0].type,
            AsBase64: StData64.split(",").pop(), Type: $('#txt_kso_File_Type').val(), Descriptions: $('#txt_kso_Description').val()
        });

        FrData.append('fileAtt', JSON.stringify(Data));
        GetSaleVolume();
        FrData.append('LsProdukVolume', JSON.stringify(LsProdukVolume));

        var Save = $.ajax({
            type: 'POST',
            enctype: 'multipart/form-data',
            url: UrlOrigin + '/FormKSO/AddFileKso',
            data: FrData,
            processData: false,
            cache: false,
            async: false,
            contentType: false,
            timeout: 800000,
            error: function (request, status, error) {

                Swal.close();
                Swal.fire("Failed", request.responseJSON.detail, "error");
                return
            }
        });

        Swal.close();

        if (Save.status != 200) {

            Swal.fire("Failed", Save.responseJSON.detail, "error");
            return
        }
        else {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your work has been save',
                showConfirmButton: false,
                timer: 1500
            });
            $('#txt_TicketId').val(Save.responseJSON.data.ticketId);
            AjaxListFileKso($('#txt_TicketId').val());
            $('#modal-kso-upload').modal('hide');
        }
    }, 1500);

});
//#endregion

function ShowContentNav(Nav) {
    ClearActiveNav();
    switch (Nav) {
        case 'att':
            //$('#div-NavContent').html($('#div-bak').html());
            $('#nav-att').addClass('active');
            $('#DivAtt').addClass('show active');
            $('#DivAtt').removeClass('hide');
            if (Number($('#H_StatusId').val()) == 7) {
                DisableInputInformation();
                $('.ksoatt').attr('disabled', true);
            }
            break;
        case 'bak':
            //$('#div-NavContent').html($('#div-bak').html());
            $('#nav-bak').addClass('active');
            $('#DivBak').addClass('show active');
            $('#DivBak').removeClass('hide');
            break;
        case 'bpd':
            //$('#div-NavContent').html($('#div-bpd').html());
            $('#nav-bpd').addClass('active');
            $('#DivBpd').addClass('show active');
            $('#DivBpd').removeClass('hide');
            break;
        case 'ict':
            //$('#div-NavContent').html($('#div-ict').html());
            $('#nav-ict').addClass('active');
            $('#DivIct').addClass('show active');
            $('#DivIct').removeClass('hide');

            if ($('#IsHavingAccessICTPrt').val().toLowerCase() == 'true' && $('#IsHavingAccessICTMst').val().toLowerCase() == 'true') {
                $('#SubMenuIctCostCenter-line-tab').removeClass(' hide');
                $('#SubMenuPengadaanPerangkat-line-tab').removeClass(' hide');

                $('#SubMenuIctCostCenter-line-tab').addClass(' show active');
                $('#SubMenuIctCostCenter').addClass('show active');
            }
            else if ($('#IsHavingAccessICTPrt').val().toLowerCase() == 'true') {
                $('#SubMenuIctCostCenter-line-tab').addClass(' hide');

                $('#SubMenuPengadaanPerangkat-line-tab').addClass(' show active');
                $('#SubMenuPengadaanPerangkat').addClass('show active');
            }
            else if ($('#IsHavingAccessICTMst').val().toLowerCase() == 'true') {
                $('#SubMenuPengadaanPerangkat-line-tab').addClass(' hide');

                $('#SubMenuIctCostCenter-line-tab').addClass(' show active');
                $('#SubMenuIctCostCenter').addClass('show active');
            }

            break;
        case 'hc':
            //$('#div-NavContent').html($('#div-hc').html());
            $('#nav-hc').addClass('active');
            $('#DivHc').addClass('show active');
            $('#DivHc').removeClass('hide');
            break;
        case 'finance':
            //$('#div-NavContent').html($('#div-finance').html());
            $('#nav-finance').addClass('active');
            $('#DivFinance').addClass('show active');
            $('#DivFinance').removeClass('hide');

            if ($('#IsHavingAccessFinancePCh').val().toLowerCase() == 'true' && $('#IsHavingAccessFinancePSv').val().toLowerCase() == 'true') {
                $('#Tab-PettyCash').removeClass(' hide');
                $('#TabPettyCash').removeClass(' hide');

                $('#TabPettyCash').addClass(' show active');
                $('#Tab-PettyCash').addClass('active');
            }
            else if ($('#IsHavingAccessFinancePCh').val().toLowerCase() == 'true') {
                $('#Tab-PickupService').addClass(' hide');

                $('#TabPettyCash').addClass(' show active');
                $('#Tab-PettyCash').addClass('active');
            }
            else if ($('#IsHavingAccessFinancePSv').val().toLowerCase() == 'true') {
                //$('#Tab-PettyCash').addClass(' hide');

                $('#Tab-PickupService').addClass(' show active');
                $('#TabPickupService').addClass('show active');
            }


            break;
        case 'teknik':
            //$('#div-NavContent').html($('#div-teknik').html());
            $('#nav-teknik').addClass('active');
            $('#DivTeknik').addClass('show active');
            $('#DivTeknik').removeClass('hide');
            break;
        case 'legal':
            //$('#div-NavContent').html($('#div-legal').html());
            $('#nav-legal').addClass('active');
            $('#DivLegal').addClass('show active');
            $('#DivLegal').removeClass('hide');
            if ($('#txt_legal_StationAddress').val() != $('#txt_SPBUAddress').val()) {
                $('#txt_legal_StationAddress').val($('#txt_SPBUAddress').val());
            }
            break;
    }
}

//#region Dropdown list on change

$('#Ddl_SPBURole').on('select2:select', function (e) {
    //debugger
    //if ($('#txt_SPBUName').val() == "") {
    //    swal('Mohon enter SPBU Nama.');
    //    $('#Ddl_SPBURole').val('All').trigger('change');
    //    return;
    //}
    //if ($('#txt_SPBUNomor').val() == "") {
    //    swal('Mohon enter SPBU Nomor.');
    //    $('#Ddl_SPBURole').val('All').trigger('change');
    //    return;
    //}

    ShowSPBURole(e.params.data.id);
    return;
    let frmData = $('#frmKsoAllOperateTac').serializeArray();
    GetSaleVolume();
    FrData = new FormData();

    $.each(frmData, function (key, input) {
        FrData.append(input.name, $.trim(input.value));
    });

    FrData.append('LsProdukVolume', JSON.stringify(LsProdukVolume));

    if ($('#txt_TicketId').val() != "") return

    $.ajax({
        type: 'POST',
        enctype: 'multipart/form-data',
        url: UrlOrigin + '/FormKSO/DraftKsoAllOperateRole',
        data: FrData,
        processData: false,
        cache: false,
        async: false,
        contentType: false,
        timeout: 800000,
        success: function (data) {
            window.location.replace(UrlOrigin + '/formkso/detail?Id=' + data.data.id);
        }
    });
});

//$('#ListProduk').on('select2:select', function (e) {
//    debugger
//    $('#ListProduk').val($('#ListProduk').val().filter(function (x) { return x != 'All' })).trigger('change');
//    $('#tbl_ProdukSaleVolume').removeClass('hide');
//    $('#tbl_ProdukSaleVolume tbody').append("<tr class='data'><td class='inputValue'>Pertamax</td><td><input type='number' class='form-control inputValue' id='txt_volume' value='10'></td></tr>");
//});

//$('#ListProduk').on('select2:unselect', function (e) {
//    debugger
//    if ($(this).val().length == 0)
//    {
//        $('#ListProduk').val('All').trigger('change');
//        $('#tbl_ProdukSaleVolume').addClass('hide');
//    }
//    else
//    {
//        $('#ListProduk').val($('#ListProduk').val().filter(function (x) { return x != 'All' })).trigger('change');
//    }

//});
//#region General TAC - Provinsi
$('#ddl_sam_manager').on('select2:select', function (e) {

    $.ajax({
        type: 'GET',
        url: origin + '/FormKSO/GetUserDetailByNip?Nip=' + e.params.data.id,
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

            $('#txt_legal_ContractSigningOfficer').val(data.data.nip + ' - ' + data.data.namaPegawai + ' - ' + data.data.namaJabatan);

            Swal.close();
        }
    });
});
$('#txt_SPBUProvince').on('select2:select', function (e) {
    Swal.showLoading();
    Ddl_City(e.params.data.id);

});
$('#txt_SPBUCity').on('select2:select', function (e) {
    Swal.showLoading();
    Ddl_District(e.params.data.id);

});
$('#txt_SPBUDistrict').on('select2:select', function (e) {
    Swal.showLoading();
    Ddl_Village(e.params.data.id);
});

function Ddl_City(IdProvince) {
    $.ajax({
        type: 'GET',
        url: origin + '/FormKSO/GetCityList?IdProvince=' + IdProvince,
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

            $('#txt_SPBUCity').empty().trigger('change');

            $("#txt_SPBUCity").append("<option value='All' selected>--Selected--</option>");
            for (var i = 0; i < data.data.length; i++) {
                $("#txt_SPBUCity").append("<option value='" + data.data[i].id + "'>" + data.data[i].kabupaten + "</option>");
            }
            $('#txt_SPBUCity').trigger('change');

            Swal.close();
        }
    });
};
function Ddl_District(IdCity) {
    $.ajax({
        type: 'GET',
        url: origin + '/FormKSO/GetDistrictList?IdCity=' + IdCity,
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

            $('#txt_SPBUDistrict').empty().trigger('change');

            $("#txt_SPBUDistrict").append("<option value='All' selected>--Selected--</option>");
            for (var i = 0; i < data.data.length; i++) {
                $("#txt_SPBUDistrict").append("<option value='" + data.data[i].id + "'>" + data.data[i].kecamatan + "</option>");
            }
            $('#txt_SPBUDistrict').trigger('change');

            Swal.close();
        }
    });
};
function Ddl_Village(IdDistrict) {
    $.ajax({
        type: 'GET',
        url: origin + '/FormKSO/GetVillageList?IdDistrict=' + IdDistrict,
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

            $('#txt_SPBUVillage').empty().trigger('change');

            $("#txt_SPBUVillage").append("<option value='All' selected>--Selected--</option>");
            for (var i = 0; i < data.data.length; i++) {
                $("#txt_SPBUVillage").append("<option value='" + data.data[i].id + "'>" + data.data[i].kelurahan + "</option>");
            }
            $('#txt_SPBUVillage').trigger('change');

            Swal.close();
        }
    });
};
//#end General TAC

//#region General BPD - Provinsi
$('#ddl_bpd_feasibility_provinsi').on('select2:select', function (e) {
    Swal.showLoading();
    Ddl_CityBpd(e.params.data.id);

});
$('#ddl_bpd_feasibility_kabupaten').on('select2:select', function (e) {
    Swal.showLoading();
    Ddl_DistrictBpd(e.params.data.id);

});
$('#ddl_bpd_feasibility_kecamantan').on('select2:select', function (e) {
    Swal.showLoading();
    Ddl_VillageBpd(e.params.data.id);
});

function Ddl_CityBpd(IdProvince) {
    $.ajax({
        type: 'GET',
        url: origin + '/FormKSO/GetCityList?IdProvince=' + IdProvince,
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

            $('#ddl_bpd_feasibility_kabupaten').empty().trigger('change');

            $("#ddl_bpd_feasibility_kabupaten").append("<option value='All' selected>--Selected--</option>");
            for (var i = 0; i < data.data.length; i++) {
                $("#ddl_bpd_feasibility_kabupaten").append("<option value='" + data.data[i].id + "'>" + data.data[i].kabupaten + "</option>");
            }
            $('#ddl_bpd_feasibility_kabupaten').trigger('change');

            Swal.close();
        }
    });
};
function Ddl_DistrictBpd(IdCity) {
    $.ajax({
        type: 'GET',
        url: origin + '/FormKSO/GetDistrictList?IdCity=' + IdCity,
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

            $('#ddl_bpd_feasibility_kecamantan').empty().trigger('change');

            $("#ddl_bpd_feasibility_kecamantan").append("<option value='All' selected>--Selected--</option>");
            for (var i = 0; i < data.data.length; i++) {
                $("#ddl_bpd_feasibility_kecamantan").append("<option value='" + data.data[i].id + "'>" + data.data[i].kecamatan + "</option>");
            }
            $('#ddl_bpd_feasibility_kecamantan').trigger('change');

            Swal.close();
        }
    });
};
function Ddl_VillageBpd(IdDistrict) {
    $.ajax({
        type: 'GET',
        url: origin + '/FormKSO/GetVillageList?IdDistrict=' + IdDistrict,
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

            $('#ddl_bpd_feasibility_kelurahan').empty().trigger('change');

            $("#ddl_bpd_feasibility_kelurahan").append("<option value='All' selected>--Selected--</option>");
            for (var i = 0; i < data.data.length; i++) {
                $("#ddl_bpd_feasibility_kelurahan").append("<option value='" + data.data[i].id + "'>" + data.data[i].kelurahan + "</option>");
            }
            $('#ddl_bpd_feasibility_kelurahan').trigger('change');

            Swal.close();
        }
    });
};
//#end General TAC
//#endregion
//#endregion



function OpenFileDocuemnt(TicketId, DocType) {

    Swal.fire({
        title: 'Loading...',
        showConfirmButton: false,
        allowOutsideClick: false,
        onBeforeOpen: () => {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');

            setTimeout(() => {
                PreviewDocument(TicketId, DocType);
            }, 1500); // Delay in milliseconds (1.5 seconds)
        },
        onClose: () => {
            Swal.close();
        }
    });
}

function PreviewDocument(TicketId, DocType) {

    $.ajax({
        type: 'POST',
        enctype: 'multipart/form-data',
        url: UrlOrigin + '/FormKSO/GetFileIctByTicketId?TicketId=' + TicketId + '&doctype=' + DocType,
        data: FrData,
        processData: false,
        cache: false,
        async: false,
        contentType: false,
        timeout: 800000,
        success: function (data) {
            if (data.status != 200) {
                Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                Swal.close();
            } else {
                $('#modal-ict-file').modal('show');
                $('#detail-ict-file').attr("src", "/" + data.data.path);
                Swal.close();
            }
        },
        error: function (e) {

            if (e.status == 400 || e.status == 422) {
                let cnt = 0;
                $.each(e.responseJSON.errors, function (key, value) {
                    if (cnt == 0) {
                        console.log('value: ' + value);
                        Swal.fire("Failed", '' + value, "error");
                    }
                    cnt++;
                });
                Swal.close();
            } else {
                Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                Swal.close();
            }

        }
    });
}

$('#txt_kso_PicSpbuFullname_buh').on('select2:select', function (e) {

    Swal.fire({
        title: 'Loading...',
        showConfirmButton: false,
        allowOutsideClick: false,
        onBeforeOpen: () => {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
            $.ajax({
                type: 'GET',
                url: origin + '/FormKSO/GetDataEmployee?nip=' + e.params.data.id,
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

                    /*                    alert(JSON.stringify(data));*/
                    $('#txt_kso_PicSpbuTelp_buh').val(data.data.handphone_1);
                    $('#txt_kso_PicSpbuFungsi_buh').val("BUH");

                    Swal.close();
                }
            });
        },
        onClose: () => {
            Swal.close();
        }
    });

});

$('#ddl_PettyCash_ActivityAnggaran').on('select2:select', function (e) {
    Swal.fire({
        title: 'Loading...',
        showConfirmButton: false,
        allowOutsideClick: false,
        onBeforeOpen: () => {
            if (e.params.data.id == "All")
            {
                $('#txt_CoaId').val('');
                Swal.close();
                return;
            }
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
            let DtJson = JSON.parse($('#h_LsActivityPettyCash').val());
            DtJson = DtJson.filter(w => w.Id == e.params.data.id);
            $('#txt_PettyCash_CoaId').val(DtJson[0].COACode + " - " + DtJson[0].AccountName);
            Swal.close();
        },
        onClose: () => {
            Swal.close();
        }
    });
});

function approvalFinalKsoActionTrigger(module, status, JabatanApproval) {

    if (module == 'KSO-Finance-PickupService') {
        if (JabatanApproval == 'SAM' && $('#txt_Finance_ConfirmNotes').val() == '') {
            Swal.fire("Failed", "Mohon Isi Catatan Approval.", "error");
            return false;
        }
    }


    Swal.fire({
        title: "Apakah Anda yakin?",
        html: "Melakukan <b> " + status + " </b> Pengajuan KSO!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, " + status + " Pengajuan ini",
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
            setTimeout(function () {

                approvalFinalKsoHandlerJs(module, status, JabatanApproval);

            }, 500);
        }
    });
}

function approvalFinalKsoHandlerJs(module, statusApproval, JabatanApproval) {

    let DtForm = $('#frmKsoAllOperateTac');
    let DtDisabled = DtForm.find(':input:disabled');
    DtForm.find(':input:disabled').removeAttr('disabled');

    let frmData = DtForm.serializeArray();
    FrData = new FormData();

    $.each(frmData, function (key, input) {
        FrData.append(input.name, $.trim(input.value));
    });

    DtDisabled.attr('disabled', true);

    GetIctDetail();
    GetHcSdm();
    GetHcSdmSam();
    GetTeknikDispenser();
    GetFinancePickupEdcBank();
    GetFinancePickupEdcBankNew();
    FrData.append('LsIctDetail', JSON.stringify(LsIctDetail));
    FrData.append('LsHcSdm', JSON.stringify(LsHcSdm));
    FrData.append('LsHcSdmSam', JSON.stringify(LsHcSdmSam));
    FrData.append('LsTeknikDispenser', JSON.stringify(LsTeknikDispenser));
    FrData.append('LsFinancePickupEdcBank', JSON.stringify(LsFinancePickupEdcBank));
    FrData.append('LsFinancePickupEdcBankNew', JSON.stringify(LsFinancePickupEdcBankNew));


    FrData.append('ApprovalModule', module);
    FrData.append('ApprovalStatus', statusApproval);
    FrData.append('ApprovalJabatan', JabatanApproval);

    var Save = $.ajax({
        type: 'POST',
        enctype: 'multipart/form-data',
        url: UrlOrigin + '/FormKSO/ApprovalFinalProcessKso',
        data: FrData,
        processData: false,
        cache: false,
        async: false,
        contentType: false,
        timeout: 800000,
        success: function (data) {
            Swal.close();
            debugger
            if (data.status != 200) {
                Swal.fire("Failed", "Data tidak berhasil di process.", "error");
            } else {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Data telah disimpan',
                    showConfirmButton: false,
                    timer: 1500
                });

                window.location.replace(UrlOrigin + '/formkso/detail?Id=' + data.data.id);
            }
        },
        error: function (e) {
            Swal.close();
            if (e.status == 400 || e.status == 422) {
                let cnt = 0;
                $.each(e.responseJSON.errors, function (key, value) {
                    if (cnt == 0) {
                        console.log('value: ' + value);
                        Swal.fire("Failed", '' + value, "error");
                    }
                    cnt++;
                });
            } else {
                Swal.fire("Failed", "Data tidak berhasil di process.", "error");
            }
        }
    });

}


$('#btn-viewba-ict-masterdata').click(function (e) {
    e.preventDefault();

    Swal.fire({
        title: 'Loading...',
        showConfirmButton: false,
        allowOutsideClick: false,
        onBeforeOpen: () => {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');

            setTimeout(() => {
                viewBaIctMasterData();
            }, 1500); // Delay in milliseconds (1.5 seconds)
        },
        onClose: () => {
            Swal.close();
        }
    });

});

$('#btn-viewba-finance-pettycash').click(function (e) {
    e.preventDefault();

    Swal.fire({
        title: 'Loading...',
        showConfirmButton: false,
        allowOutsideClick: false,
        onBeforeOpen: () => {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');

            setTimeout(() => {
                viewBaFinancePettyCash();
            }, 1500); // Delay in milliseconds (1.5 seconds)
        },
        onClose: () => {
            Swal.close();
        }
    });

});

$('#btn-viewba-finance-pickup').click(function (e) {
    e.preventDefault();

    Swal.fire({
        title: 'Loading...',
        showConfirmButton: false,
        allowOutsideClick: false,
        onBeforeOpen: () => {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');

            setTimeout(() => {
                viewBaFinancePickup();
            }, 1500); // Delay in milliseconds (1.5 seconds)
        },
        onClose: () => {
            Swal.close();
        }
    });

});


$('#btn-viewba-teknik').click(function (e) {
    e.preventDefault();

    Swal.fire({
        title: 'Loading...',
        showConfirmButton: false,
        allowOutsideClick: false,
        onBeforeOpen: () => {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');

            setTimeout(() => {
                viewBaTeknik();
            }, 1500); // Delay in milliseconds (1.5 seconds)
        },
        onClose: () => {
            Swal.close();
        }
    });

});


$('#btn-viewba-KsoHc').click(function (e) {
    e.preventDefault();

    Swal.fire({
        title: 'Loading...',
        showConfirmButton: false,
        allowOutsideClick: false,
        onBeforeOpen: () => {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');

            setTimeout(() => {
                viewBaKsoHc();
            }, 1500); // Delay in milliseconds (1.5 seconds)
        },
        onClose: () => {
            Swal.close();
        }
    });

});


function viewBaIctMasterData() {

    $.ajax({
        type: 'POST',
        enctype: 'multipart/form-data',
        url: UrlOrigin + '/FormKSO/PreviewDocumentBaMasterData?TicketId=' + $('#txt_TicketId').val() + '&option=' + $('#txt_mst_downloadOption').val(),
        data: FrData,
        processData: false,
        cache: false,
        async: false,
        contentType: false,
        timeout: 800000,
        success: function (data) {
            //debugger
            if (data.status != 200) {
                Swal.fire("Failed", "Data tidak berhasil di process.", "error");
            } else {
                if (data.data.mimeType.toLowerCase().indexOf("excel") >= 0) {
                    window.location.replace(UrlOrigin + "/" + data.data.path);
                } else {
                    $('#modal-ict-file').modal('show');
                    $('#detail-ict-file').attr("src", "/" + data.data.path);
                }
            }
            Swal.close();
        },
        error: function (e) {

            Swal.close();

            if (e.status == 400 || e.status == 422) {
                let cnt = 0;
                $.each(e.responseJSON.errors, function (key, value) {
                    if (cnt == 0) {
                        console.log('value: ' + value);
                        Swal.fire("Failed", '' + value, "error");
                    }
                    cnt++;
                });
            } else {
                Swal.fire("Failed", "Data tidak berhasil di process.", "error");
            }

        }
    });
}


function viewBaFinancePettyCash() {

    $.ajax({
        type: 'POST',
        enctype: 'multipart/form-data',
        url: UrlOrigin + '/FormKSO/PreviewDocumentBaPettyCash?TicketId=' + $('#txt_TicketId').val() + '&option=' + $('#txt_pettycash_downloadOption').val(),
        data: FrData,
        processData: false,
        cache: false,
        async: false,
        contentType: false,
        timeout: 800000,
        success: function (data) {
            //debugger
            if (data.status != 200) {
                Swal.fire("Failed", "Data tidak berhasil di process.", "error");
            } else {
                if (data.data.mimeType.toLowerCase().indexOf("excel") >= 0) {
                    window.location.replace(UrlOrigin + "/" + data.data.path);
                } else {
                    $('#modal-finance-file').modal('show');
                    $('#detail-file-finance').attr('hidden', true);
                    $('#detail-img-finance').addClass('hide');

                    if (data.data.mimeType.toLowerCase().indexOf("image") >= 0) {
                        $('#detail-img-finance').removeClass('hide');
                        $('#detail-img-finance').attr("alt", data.data.fileName.toUpperCase());
                        $('#detail-img-finance').attr("src", "/" + data.data.path);
                    }
                    else {
                        $('#detail-file-finance').attr('hidden', false);
                        $('#detail-file-finance').attr("alt", data.data.fileName.toUpperCase());
                        $('#detail-file-finance').attr("src", "/" + data.data.path);
                    }
                }

            }
            Swal.close();
        },
        error: function (e) {

            Swal.close();

            if (e.status == 400 || e.status == 422) {
                let cnt = 0;
                $.each(e.responseJSON.errors, function (key, value) {
                    if (cnt == 0) {
                        console.log('value: ' + value);
                        Swal.fire("Failed", '' + value, "error");
                    }
                    cnt++;
                });
            } else {
                Swal.fire("Failed", "Data tidak berhasil di process.", "error");
            }

        }
    });
}


function viewBaFinancePickup() {

    $.ajax({
        type: 'POST',
        enctype: 'multipart/form-data',
        url: UrlOrigin + '/FormKSO/PreviewDocumentBaEdc?TicketId=' + $('#txt_TicketId').val() + '&option=' + $('#txt_pickup_downloadOption').val(),
        data: FrData,
        processData: false,
        cache: false,
        async: false,
        contentType: false,
        timeout: 800000,
        success: function (data) {
            //debugger
            if (data.status != 200) {
                Swal.fire("Failed", "Data tidak berhasil di process.", "error");
            } else {
                if (data.data.mimeType.toLowerCase().indexOf("excel") >= 0) {
                    window.location.replace(UrlOrigin + "/" + data.data.path);
                } else {
                    $('#modal-finance-file').modal('show');
                    $('#detail-file-finance').attr('hidden', true);
                    $('#detail-img-finance').addClass('hide');

                    if (data.data.mimeType.toLowerCase().indexOf("image") >= 0) {
                        $('#detail-img-finance').removeClass('hide');
                        $('#detail-img-finance').attr("alt", data.data.fileName.toUpperCase());
                        $('#detail-img-finance').attr("src", "/" + data.data.path);
                    }
                    else {
                        $('#detail-file-finance').attr('hidden', false);
                        $('#detail-file-finance').attr("alt", data.data.fileName.toUpperCase());
                        $('#detail-file-finance').attr("src", "/" + data.data.path);
                    }
                }

            }
            Swal.close();
        },
        error: function (e) {

            Swal.close();

            if (e.status == 400 || e.status == 422) {
                let cnt = 0;
                $.each(e.responseJSON.errors, function (key, value) {
                    if (cnt == 0) {
                        console.log('value: ' + value);
                        Swal.fire("Failed", '' + value, "error");
                    }
                    cnt++;
                });
            } else {
                Swal.fire("Failed", "Data tidak berhasil di process.", "error");
            }

        }
    });
}


function viewBaTeknik() {

    $.ajax({
        type: 'POST',
        enctype: 'multipart/form-data',
        url: UrlOrigin + '/FormKSO/PreviewDocumentBaTeknik?TicketId=' + $('#txt_TicketId').val() + '&option=' + $('#txt_teknik_downloadOption').val(),
        data: FrData,
        processData: false,
        cache: false,
        async: false,
        contentType: false,
        timeout: 800000,
        success: function (data) {
            //debugger
            if (data.status != 200) {
                Swal.fire("Failed", "Data tidak berhasil di process.", "error");
            } else {
                if (data.data.mimeType.toLowerCase().indexOf("excel") >= 0) {
                    window.location.replace(UrlOrigin + "/" + data.data.path);
                } else {
                    $('#modal-teknik').modal('show');
                    $('#detail-file-teknik').attr('hidden', true);
                    $('#detail-img-teknik').addClass('hide');

                    if (data.data.mimeType.toLowerCase().indexOf("image") >= 0) {
                        $('#detail-img-teknik').removeClass('hide');
                        $('#detail-img-teknik').attr("alt", data.data.fileName.toUpperCase());
                        $('#detail-img-teknik').attr("src", "/" + data.data.path);
                    }
                    else {
                        $('#detail-file-teknik').attr('hidden', false);
                        $('#detail-file-teknik').attr("alt", data.data.fileName.toUpperCase());
                        $('#detail-file-teknik').attr("src", "/" + data.data.path);
                    }
                }
            }
            Swal.close();
        },
        error: function (e) {

            Swal.close();

            if (e.status == 400 || e.status == 422) {
                let cnt = 0;
                $.each(e.responseJSON.errors, function (key, value) {
                    if (cnt == 0) {
                        console.log('value: ' + value);
                        Swal.fire("Failed", '' + value, "error");
                    }
                    cnt++;
                });
            } else {
                Swal.fire("Failed", "Data tidak berhasil di process.", "error");
            }

        }
    });
}


function viewBaKsoHc() {

    $.ajax({
        type: 'POST',
        enctype: 'multipart/form-data',
        url: UrlOrigin + '/FormKSO/PreviewDocumentBaHc?TicketId=' + $('#txt_TicketId').val() + '&option=' + $('#txt_hc_downloadOption').val(),
        data: FrData,
        processData: false,
        cache: false,
        async: false,
        contentType: false,
        timeout: 800000,
        success: function (data) {
            //debugger
            if (data.status != 200) {
                Swal.fire("Failed", "Data tidak berhasil di process.", "error");
            } else {
                if (data.data.mimeType.toLowerCase().indexOf("excel") >= 0) {
                    window.location.replace(UrlOrigin + "/" + data.data.path);
                } else {
                    $('#modal-hc-file').modal('show');
                    $('#detail-file-hc').attr('hidden', true);
                    $('#detail-img-hc').addClass('hide');

                    if (data.data.mimeType.toLowerCase().indexOf("image") >= 0) {
                        $('#detail-img-hc').removeClass('hide');
                        $('#detail-img-hc').attr("alt", data.data.fileName.toUpperCase());
                        $('#detail-img-hc').attr("src", "/" + data.data.path);
                    }
                    else {
                        $('#detail-file-hc').attr('hidden', false);
                        $('#detail-file-hc').attr("alt", data.data.fileName.toUpperCase());
                        $('#detail-file-hc').attr("src", "/" + data.data.path);
                    }
                }

            }
            Swal.close();
        },
        error: function (e) {

            Swal.close();

            if (e.status == 400 || e.status == 422) {
                let cnt = 0;
                $.each(e.responseJSON.errors, function (key, value) {
                    if (cnt == 0) {
                        console.log('value: ' + value);
                        Swal.fire("Failed", '' + value, "error");
                    }
                    cnt++;
                });
            } else {
                Swal.fire("Failed", "Data tidak berhasil di process.", "error");
            }

        }
    });
}



function reviseKsoActionTrigger(module, status, JabatanApproval) {
    if (module == 'KSO') {
        if (JabatanApproval == 'ASMEN' && $('#txt_kso_AsmenReason').val() == '') {
            Swal.fire("Failed", "Mohon Isi Catatan Approval.", "error");
            return false;
        }
        else if (JabatanApproval == 'MANAGER' && $('#txt_kso_ManagerReason').val() == '') {
            Swal.fire("Failed", "Mohon Isi Catatan Approval.", "error");
            return false;
        }
    }
    else if (module == 'KSO-Bpd') {
        if (JabatanApproval == 'ASMEN' && $('#txt_kso_AsmenReason_bpd').val() == '') {
            Swal.fire("Failed", "Mohon Isi Catatan Approval.", "error");
            return false;
        }
        else if (JabatanApproval == 'MANAGER' && $('#txt_kso_ManagerReason_bpd').val() == '') {
            Swal.fire("Failed", "Mohon Isi Catatan Approval.", "error");
            return false;
        }
    }
    else if (module == 'KSO-Teknik') {
        if (JabatanApproval == 'ASMEN' && $('#txt_kso_AsmenReason_Teknik').val() == '') {
            Swal.fire("Failed", "Mohon Isi Catatan Approval.", "error");
            return false;
        }
        else if (JabatanApproval == 'MANAGER' && $('#txt_kso_ManagerReason_Teknik').val() == '') {
            Swal.fire("Failed", "Mohon Isi Catatan Approval.", "error");
            return false;
        }
    }
    else if (module == 'KSO-Hc') {
        if (JabatanApproval == 'ASMEN' && $('#txt_kso_AsmenReason_Hc').val() == '') {
            Swal.fire("Failed", "Mohon Isi Catatan Approval.", "error");
            return false;
        }
        else if (JabatanApproval == 'MANAGER' && $('#txt_kso_ManagerReason_Hc').val() == '') {
            Swal.fire("Failed", "Mohon Isi Catatan Approval.", "error");
            return false;
        }
    }
    else if (module == 'KSO-ICTPerangkat') {
        if (JabatanApproval == 'ASMEN' && $('#txt_ict_prt_AsmenReason').val() == '') {
            Swal.fire("Failed", "Mohon Isi Catatan Approval.", "error");
            return false;
        }
        else if (JabatanApproval == 'MANAGER' && $('#txt_ict_prt_ManagerReason').val() == '') {
            Swal.fire("Failed", "Mohon Isi Catatan Approval.", "error");
            return false;
        }
    }
    else if (module == 'KSO-ICTMasterData') {
        if (JabatanApproval == 'ASMEN' && $('#txt_ict_mst_AsmenReason').val() == '') {
            Swal.fire("Failed", "Mohon Isi Catatan Approval.", "error");
            return false;
        }
        else if (JabatanApproval == 'MANAGER' && $('#txt_ict_mst_ManagerReason').val() == '') {
            Swal.fire("Failed", "Mohon Isi Catatan Approval.", "error");
            return false;
        }
    }
    else if (module == 'KSO-Finance-PickupService') {
        if (JabatanApproval == 'ASMEN' && $('#txt_kso_AsmenReason_FinancePickup').val() == '') {
            Swal.fire("Failed", "Mohon Isi Catatan Approval.", "error");
            return false;
        }
        else if (JabatanApproval == 'MANAGER' && $('#txt_kso_ManagerReason_FinancePickup').val() == '') {
            Swal.fire("Failed", "Mohon Isi Catatan Approval.", "error");
            return false;
        }
    }
    else if (module == 'KSO-Finance-PettyCash') {
        if (JabatanApproval == 'ASMEN' && $('#txt_kso_AsmenReason_financePettyCash').val() == '') {
            Swal.fire("Failed", "Mohon Isi Catatan Approval.", "error");
            return false;
        }
        else if (JabatanApproval == 'MANAGER' && $('#txt_kso_ManagerReason_financePettyCash').val() == '') {
            Swal.fire("Failed", "Mohon Isi Catatan Approval.", "error");
            return false;
        }
    }


    Swal.fire({
        title: "Apakah Anda yakin?",
        html: "Melakukan <b> " + status + " </b> Pengajuan KSO!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, " + status + " Pengajuan ini",
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
            setTimeout(function () {

                reviseKsoHandlerJs(module, status, JabatanApproval);

            }, 500);
        }
    });
}

function reviseKsoHandlerJs(module, statusApproval, JabatanApproval) {

    let DtForm = $('#frmKsoAllOperateTac');
    let DtDisabled = DtForm.find(':input:disabled');
    DtForm.find(':input:disabled').removeAttr('disabled');

    let frmData = DtForm.serializeArray();
    FrData = new FormData();

    $.each(frmData, function (key, input) {
        FrData.append(input.name, $.trim(input.value));
    });

    DtDisabled.attr('disabled', true);

    //GetIctDetail();
    //GetHcSdm();
    //GetHcSdmSam();
    //GetTeknikDispenser();
    //GetFinancePickupEdcBank();
    //GetFinancePickupEdcBankNew();
    //FrData.append('LsIctDetail', JSON.stringify(LsIctDetail));
    //FrData.append('LsHcSdm', JSON.stringify(LsHcSdm));
    //FrData.append('LsHcSdmSam', JSON.stringify(LsHcSdmSam));
    //FrData.append('LsTeknikDispenser', JSON.stringify(LsTeknikDispenser));
    //FrData.append('LsFinancePickupEdcBank', JSON.stringify(LsFinancePickupEdcBank));
    //FrData.append('LsFinancePickupEdcBankNew', JSON.stringify(LsFinancePickupEdcBankNew));


    FrData.append('ApprovalModule', module);
    FrData.append('ApprovalStatus', statusApproval);
    FrData.append('ApprovalJabatan', JabatanApproval);

    var Save = $.ajax({
        type: 'POST',
        enctype: 'multipart/form-data',
        url: UrlOrigin + '/FormKSO/ReviseProcessKso',
        data: FrData,
        processData: false,
        cache: false,
        async: false,
        contentType: false,
        timeout: 800000,
        success: function (data) {
            Swal.close();
            debugger
            if (data.status != 200) {
                Swal.fire("Failed", "Data tidak berhasil di process.", "error");
            } else {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Data telah disimpan',
                    showConfirmButton: false,
                    timer: 1500
                });

                window.location.replace(UrlOrigin + '/formkso/detail?Id=' + data.data.id);
            }
        },
        error: function (e) {
            Swal.close();
            if (e.status == 400 || e.status == 422) {
                let cnt = 0;
                $.each(e.responseJSON.errors, function (key, value) {
                    if (cnt == 0) {
                        console.log('value: ' + value);
                        Swal.fire("Failed", '' + value, "error");
                    }
                    cnt++;
                });
            } else {
                Swal.fire("Failed", "Data tidak berhasil di process.", "error");
            }
        }
    });

}