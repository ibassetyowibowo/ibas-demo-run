
let currentTicket = null;
let idz = 1;
let StatusClosed = ["7", "99"];
var FrData;

$(document).ready(function () {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    
    if (window.location.pathname.split("/")[1].toLowerCase() == "WorkOrder".toLowerCase()) {
        if ($('#txt_TitleList').length != 0) {
            if (vars["status"] == "10") {
                $('#txt_TitleList').html("On Waiting for Approval List ");
            }
            else if (vars["status"] == "11") {
                $('#txt_TitleList').html("On Progress List");
            }
            else if (vars["status"] == "13") {
                $('#txt_TitleList').html("On Done List");
            }
        }
    }
    else if (window.location.pathname.split("/")[1].toLowerCase() == "MyTicket".toLowerCase()) {
        if ($('#txt_TitleList').length != 0) {
            if (vars["status"] == "999") {
                $('#txt_TitleList').html("On List All");
            }
            else if (vars["status"] == "0") {
                $('#txt_TitleList').html("On Draft List ");
            }
            else if (vars["status"] == "1") {
                $('#txt_TitleList').html("On Progress List");
            }
            else if (vars["status"] == "2") {
                $('#txt_TitleList').html("On Done List");
            }
        }
    }
    else if (window.location.pathname.split("/")[1].toLowerCase() == "formkso".toLowerCase()) {        
        if ($('#txt_TitleList').length != 0) {
            if (vars["status"] == "999") {
                $('#txt_TitleList').html("On List All");
            }
            else if (vars["status"] == "0") {
                $('#txt_TitleList').html("On Draft List ");
            }
            else if (vars["status"] == "1") {
                $('#txt_TitleList').html("On Progress List");
            }
            else if (vars["status"] == "2") {
                $('#txt_TitleList').html("On Done List");
            }
            else {
                $('#txt_TitleList').html("On Draft List ");
            }
        }
    }
    else if (window.location.pathname.split("/")[1].toLowerCase() == "CostCenter".toLowerCase()) {
        if ($('#txt_TitleList').length != 0) {
            if (vars["status"] == "999") {
                $('#txt_TitleList').html("On List All");
            }
            else if (vars["status"] == "0") {
                $('#txt_TitleList').html("On Draft List ");
            }
            else if (vars["status"] == "1") {
                $('#txt_TitleList').html("On Progress List");
            }
            else if (vars["status"] == "2") {
                $('#txt_TitleList').html("On Done List");
            }
            else {
                $('#txt_TitleList').html("On Draft List ");
            }
        }
    }
    
    
});

function clearTicketing() {
    $('#ticketID').val('');
    $('#ticketCategory').val('');
    $('#ticketCategoryDetail').val('');
    $('#ticketSpbuID').val('');
    $('#ticketSpbuName').val('');
    $('#ticketSpbuArea').val('');
    $('#ticketSpbuAgent').val('');
    $('#ticketSpbuAddress').val('');
    $('#ticketDesc').val('');

}

function getProgressDetail(button, id) {
    debugger
    currentTicket = button;

    var requestUrl = "getTicketDetail?Id=";

    $.ajax({
        type: 'GET',
        headers: { 'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content') },
        url: requestUrl + id,
        processData: false,
        cache: false,
        contentType: false,
        timeout: 800000,
        beforeSend: function (XMLHttpRequest) {
            showLoader('Mohon menunggu, sedang menampilkan <strong>Data</strong>.');
        },
        success: function (data) {
            
/*            console.log("SUCCESS : ", data);*/

            setButton(data);            
            detailTicket(data);

            Swal.close();

        },
        error: function (e) {
           /* let res = JSON.parse(e.responseText);*/
          
            Swal.close();

            Swal.fire("Failed", "Maaf, Tidak dapat menampilkan data.", "error");
        },
    });

    $('#mdl-progress').modal('toggle');
};

function setButton(data) {
    let status = data.helpdesk.status;

    $('#btn-approve-ticket').show();
    $('#btn-close-ticket').show();
    $('#btn-vendor-ticket').show();
    $('#btn-reject-ticket').show();
    $('#btn-delete-ticket').show();

    if (status == 99) {
        $('#btn-approve-ticket').hide();
        $('#btn-close-ticket').hide();
        $('#btn-vendor-ticket').hide();
        $('#btn-reject-ticket').hide();
        $('#btn-delete-ticket').hide();
    }
}

function detailTicket(data)
{
    clearTicketing();
    //Ddl_BUH();

    $('#ticketID').val(data.helpdesk.id);
    $('#ticketCategory').val(data.helpdesk.ticketCategoryName);
    $('#ticketCategoryDetail').val(data.helpdesk.subName + ' - ' + data.helpdesk.detailName);
    $('#ticketSpbuID').val(data.helpdesk.spbuId);
    $('#ticketSpbuName').val(data.helpdesk.spbuName);
    $('#ticketSpbuArea').val(data.helpdesk.spbuArea);
    $('#ticketSpbuAgent').val(data.helpdesk.spbuAgent);
    $('#ticketSpbuAddress').val(data.helpdesk.spbuAddress);
    $('#ticketDesc').val(data.helpdesk.ticketDesc);    
    //setTimeout(function () {
        debugger
        //$('#DdList_BUH').val(data.helpdesk.bUH).trigger('change');
    //}, 1500);
    

    let status = data.helpdesk.status;
    let varStatus = "";
    if (status == 0) {
        varStatus = "NEW";
    }
    else if (status == 1) {
        varStatus = "APPROVED";
    }
    else if (status == 99) {
        varStatus = "REJECTED";
    }
    $('#ticketStatusVar').val(varStatus);
    $('#ticketStatus').val(status);

    /*Insert to vendor dropdown*/
    if (data.vendor != null) {

        var str = '<option value="">--PILIH VENDOR--</option>';

        for (i = 0; i < data.vendor.length; i++)
        {
            str += '<option value="' + data.vendor[i].VID + '">' + data.vendor[i].vendorName + '</option>';
        }

        $('#nameVendor').html(str);
    }
}

function ShowTicketSummary() {
    $('#PageList').hide(function () {
        $('#PageDetail').removeAttr('hidden');
        $('#PageDetail').show('fade')

        $('#txt_PenyebabMasalah').val('');
        tinymce.activeEditor.setContent('');
    })    
}

function ConfirmTicket() {
    Swal.fire({
        title: "Do you want to the changes?",
        text: "Changes this ? You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Change it!"
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses data.');
            setTimeout(function () {
                var save = $.ajax({
                    url: origin + '/MyTicket/ConfirmTicket?Id=' + $('#DtTicketId').val() +'&UrlOrigin='+origin,
                    type: 'POST',
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
                    },
                    success: function (data) {
                        debugger
                        Swal.close();
                        if (data.error) {
                            Swal.fire("Failed", "Gagal menyiapkan data.", "error");
                            return
                        }

                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Your work has been saved',
                            showConfirmButton: false,
                            timer: 1500
                        });

                        window.location.replace(origin + data.data.url);
                    }
                });                
            }, 1500);
        }
    });
}

function ShowTicketReopen()
{
    $('#PageList').hide(function () {
        $('#PageDetailReopen').removeAttr('hidden');
        $('#PageDetailReopen').show('fade')

        $('#txt_AlasanReopen').val('');
        tinymce.activeEditor.setContent('');
    })
}

function ShowTicketList() {
    $('#PageDetail').hide(function () {
        $('#PageList').attr('hidden');
        $('#PageList').show('fade')
    })

    $('#PageDetailReopen').hide(function () {
        $('#PageList').attr('hidden');
        $('#PageList').show('fade')
    })
}

function SaveTicketReOpen() {
    if ($('#txt_AlasanReopen').val() == '') {
        swal('Mohon Isi Alasan Re-Open Ticket.');
        return;
    }

    let frmData = $('#frmTicket').serializeArray();
    FrData = new FormData();

    $.each(frmData, function (key, input) {
        FrData.append(input.name, $.trim(input.value));
    });
    
    FrData.append('txt_AlasanReOpen', $('#txt_AlasanReopen').val());

    let requestUrl = UrlOrigin + '/MyTicket/reopen';
    debugger
    Swal.fire({
        title: "Are you sure?",
        text: "Submit this ticket request, You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it.",
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses <strong>ticket request</strong>.');
            setTimeout(function () {
                
                $.ajax({
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    url: requestUrl,
                    data: FrData,
                    processData: false,
                    cache: false,
                    async: false,
                    contentType: false,
                    timeout: 800000,                    
                    success: function (data) {

                        console.log("SUCCESS : ", data);
                                                
                        Swal.close();

                        //display alert success
                        Swal.fire("Success", "Ticket Berhasil Diupdate.", "success");

                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Your work has been saved',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        //reload current page
                        setTimeout(window.location.href = origin + "/MyTicket/Index?status=999", 1500);

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
                            Swal.fire("Failed", "Ticket tidak berhasil diupdate.", "error");
                        }

                    },
                });
            }, 500);
        }
    });
}

function SaveTicketSummary() {
    
    if ($("#txt_PenyebabMasalah").val() == '') {
        swal('Mohon Isi Pekerjaan Internal Penyebab Masalah.');
        return;
    }
    if (tinymce.activeEditor.getContent() == '') {
        swal('Mohon Isi Pekerjaan Internal Detail.');
        return;
    }

    FrData.append('UrlOrigin', origin);
    FrData.append('StatusWo', "0");
    FrData.append('txt_PenyebabMasalah', $("#txt_PenyebabMasalah").val());
    FrData.append('txt_KegiatanInternal', $.trim(tinymce.activeEditor.getContent()));

    files2.forEach(fileItem => {
        FrData.append('files[]', fileItem);
    });

    let requestUrl = UrlOrigin + '/WorkOrder/addWorkOrder';
    
    var WordingButton;
    if ($('#slc-vendor').val()=="7") {
        WordingButton = "Yes, Save it.";
    }
    else {
        WordingButton = "Yes, Reject it.";
    }
    Swal.fire({
        title: "Are you sure?",
        text: "Submit this ticket request, You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: WordingButton
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses <strong>ticket request</strong>.');
            setTimeout(function () {
                debugger
                $.ajax({
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    url: requestUrl,
                    data: FrData,
                    processData: false,
                    cache: false,
                    async: false,
                    contentType: false,
                    timeout: 800000,
                    //beforeSend: function (XMLHttpRequest) {

                    //    showLoader('Mohon menunggu, sedang mengupdate <strong>Ticket</strong> baru.');

                    //},
                    success: function (data) {

                        console.log("SUCCESS : ", data);

                        //close modal
                        $('#mdl-progress').modal('toggle');

                        //dismis alert
                        //swal.close();
                        Swal.close();

                        //display alert success
                        Swal.fire("Success", "Ticket Berhasil Diupdate.", "success");

                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Your work has been saved',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        //reload current page
                        setTimeout(window.location.href = origin + "/MyTicket/Index?status=999", 1500);

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
                            Swal.fire("Failed", "Ticket tidak berhasil diupdate.", "error");
                        }

                    },
                });
            }, 500);
        }
    });
        
}

/*FOR APPROVE*/
$('#btn-approve-ticket').click(function () {
    debugger
    console.log('approve');

    let cmmnt = $.trim($('#ticketComment').val());
    if (cmmnt === '') {
        swal('Mohon isi Activity/ komentar/ pesan!.');
        return;
    }

    let opt = $('#slc-vendor').val();
    if (opt === '0') {
        swal('Mohon Pilih Action!.');
        return;
    }

    let frmData = $('#frmTicket').serializeArray();
    var formData = new FormData();
    formData.append('actionWo', "0");

    $.each(frmData, function (key, input) {
        formData.append(input.name, $.trim(input.value));
    });
    
    if (opt == 4) {
        for (let i in frmData)
        {            
            if (frmData[i].name == "nameVendor[]" && frmData[i].value == "") {
                swal('Mohon Pilih Vendor.');
                return;
            }
            if (frmData[i].name == "jobOrder[]" && frmData[i].value == "") {
                swal('Mohon Pilih Job Order.');
                return;
            }
            if (frmData[i].name == "costCenter[]" && frmData[i].value == "") {
                swal('Mohon Pilih Jenis Anggaran.');
                return;
            }
            if (frmData[i].name == "workItem[]" && frmData[i].value == "") {
                swal('Mohon Isi Kegiatan.');
                return;
            }
            if (frmData[i].name == "problemItem[]" && frmData[i].value == "") {
                swal('Mohon Isi Penyebab Masalah.');
                return;
            }
            if (frmData[i].name == "volItem[]" && frmData[i].value == "") {
                swal('Mohon Isi valume');
                return;
            }
        }

        if (formData.get("nameVendor[]") == null) {
            swal('Mohon Isi Pekerjaan Vendor.');
            return;
        }
        formData.append('StatusWo', "1");

        
    }

    formData.set('ticketComment', $.trim($('#ticketComment').val()));
    formData.append('actionTicket', opt);
    
    let requestUrl = '/WorkOrder/addWorkOrder';

    if (jQuery.inArray(opt, StatusClosed) !== -1) {
        FrData = formData;
        ShowTicketSummary();
        return
    }

    Swal.fire({
        title: "Are you sure?",
        text: "Submit this ticket request, You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Submit it!"
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses <strong>ticket request</strong>.');
            setTimeout(function () {
                $.ajax({
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    url: requestUrl,
                    data: formData,
                    processData: false,
                    cache: false,
                    async: false,
                    contentType: false,
                    timeout: 800000,
                    //beforeSend: function (XMLHttpRequest) {

                    //    showLoader('Mohon menunggu, sedang mengupdate <strong>Ticket</strong> baru.');

                    //},
                    success: function (data) {

                        console.log("SUCCESS : ", data);

                        //close modal
                        $('#mdl-progress').modal('toggle');

                        //dismis alert
                        //swal.close();
                        Swal.close();

                        //display alert success
                        Swal.fire("Success", "Ticket Berhasil Diupdate.", "success");

                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Your work has been saved',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        //reload current page
                        setTimeout(window.location.href = origin + "/MyTicket/Index?status=999", 1500);

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
                            Swal.fire("Failed", "Ticket tidak berhasil diupdate.", "error");
                        }

                    },
                });
            }, 500);
        }
    });
});

$('#btn-close-ticket').click(function () {

    let cmmnt = $('#ticketComment').val();
    if (cmmnt === '') {
        swal('Mohon isi komentar/pesan!.');
        return;
    }

    var formData = new FormData();
    formData.append('id', $('#ticketID').val());
    formData.append('comment', $('#ticketComment').val());
});

$('#btn-reject-ticket').click(function () {
    confirmRejectDialog();
});

function confirmRejectDialog() {
    Swal.fire({
        title: "Are you sure?",
        text: "Reject this ticket request, You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, reject it!"
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang me-reject <strong>ticket request</strong>.');
            setTimeout(function () { rejectTicket(); },500);
            
        }
    });
}

function rejectTicket() {
    debugger
    let cmmnt = $('#ticketComment').val();
    if (cmmnt === '') {
        swal('Mohon isi komentar/pesan!.');
        return;
    }

    var formData = new FormData();
    formData.append('id', $('#ticketID').val());
    formData.append('comment', $('#ticketComment').val());
    formData.append('status', $('#ticketStatus').val());

    let requestUrl = 'rejectTicket';

    $.ajax({
        type: 'POST',
        enctype: 'multipart/form-data',
        url: requestUrl,
        data: formData,
        processData: false,
        cache: false,
        contentType: false,
        timeout: 800000,
        //beforeSend: function (XMLHttpRequest) {

        //    showLoader('Mohon menunggu, sedang me-reject <strong>ticket request</strong>.');

        //},
        success: function (data) {

            console.log("SUCCESS : ", data);

            //close modal
            $('#mdl-progress').modal('toggle');

            //dismis alert
            //swal.close();
            Swal.close();

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1500
            });
            //reload current page
            setTimeout(window.location.href = origin + "/TMS/helpdesk", 1500);
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
                Swal.fire("Failed", "Change request tidak dapat dibuat.", "error");
            }

        },
    });
};

$('#btn-vendor-ticket').click(function () {
    $('#nameVendor').val("").trigger('change');
    $('#vendorDesc').val('');
});

$('#btn-save-vendor').click(function () {
    let vndr = $('#nameVendor').val();
    if (vndr === '') {
        swal('Mohon pilih Vendor!.');
        return;
    }

    let desc = $('#vendorDesc').val();
    if (desc === '') {
        swal('Mohon isi Deskripsi Pekerjaan!.');
        return;
    }
});

$('#btn-delete-ticket').click(function () {
    confirmDeleteTicketDialog();
});

function confirmDeleteTicketDialog() {
    Swal.fire({
        title: "Are you sure?",
        text: "Delete this ticket request, You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang menghapus <strong>ticket request</strong>.');
            setTimeout(function () { deleteTicket(); },500);
            
        }
    });
}

function deleteTicket() {
    debugger
    let docId = $('#ticketID').val();
    let requestUrl = 'deleteTicket?docId=';

    $.ajax({
        type: 'POST',
        enctype: 'multipart/form-data',
        url: requestUrl + docId,
        processData: false,
        cache: false,
        contentType: false,
        timeout: 800000,
        //beforeSend: function (XMLHttpRequest) {

        //    showLoader('Mohon menunggu, sedang menghapus <strong>ticket request</strong>.');

        //},
        success: function (data) {

            console.log("SUCCESS : ", data);

            //close modal
            $('#mdl-progress').modal('toggle');

            //dismis alert
            //swal.close();
            Swal.close();

            //display alert success
            Swal.fire("Success", "Ticket request berhasil dihapus.", "success");
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 2000
            });
            //reload current page
            setTimeout(window.location.href = origin + "/TMS/helpdesk", 1500);
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
                Swal.fire("Failed", "Ticket request tidak dapat dihapus.", "error");
            }

        },
    });
}

//add description checklist item
$('#btn-add-hardware').click(function () {
    $('#DivListHardware').removeClass('hide');

    let DtItem = `<div class="row crView">
                    <div class="card col-sm-12">
                        <div class="row mt-2">
                            <div class="col-sm-8">
                                <div class="row">
                                    <div class="col-sm-12">
                                        <a style="color:#ff3366;cursor:pointer;" id="btn-remove-hardware-item">
                                            <i class="icon icon-sm" data-feather="trash"></i> Hapus Hardware
                                        </a>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-5">
                                        <label class="control-label text-muted mb-1">Nama Hardware</label>
                                        <input type="text" class="form-control form-control-sm" name="txt_NamaHardware" id="txt_NamaHardware" placeholder="Nama Hardware">
                                    </div>
                                    <div class="col-sm-5">
                                        <label class="control-label text-muted mb-1">Merk</label>
                                        <input type="text" class="form-control form-control-sm" name="txt_MerkHardware" id="txt_MerkHardware" placeholder="Merk Hardware">
                                    </div>
                                    <div class="col-sm-2">
                                        <label class="control-label text-muted mb-1">Qty</label>
                                        <input type="number" class="form-control" id="txt_QtyHardware" name="txt_QtyHardware" onkeypress="return onlyNumberKey(event)" placeholder="0">
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-4 mb-2">
                                <label class="control-label text-muted mb-1">Serial Number</label>
                                <textarea type="text" class="form-control form-control-sm" placeholder="Serial Number" id="txt_SnHardware" name="txt_SnHardware"></textarea>
                            </div>
                        </div>
                    </div>
                </div>`;
    $('#LsHardware').append(DtItem);
    feather.replace();
});
$("#btn-add-work-item-vendor").click(function () {
    debugger
    $("#div_vendor").removeClass('hide');
    let item = addWorkDescription(idz, '');
    
    //$("#description-work").append(item);
    $("#ListVendor").append(item);
    feather.replace(); // display the icons
    //document.getElementById("editable-description-item-"+idx).contentEditable = true;
    idz += 1;
    $(".js-example-basic-single").select2()    
    for (var i = 0; i < $(".validasiNumber").length; i++) {
        
        $("#" + $(".validasiNumber")[i].id).inputFilter(function (value) {
            return /^\d*$/.test(value);
        }, "Only digits allowed");
    }
   
});

$("#btn-add-work-item-internal").click(function () {
    $("#div_SummaryInternal").removeClass('hide');
    $("#btn-add-work-item-internal").attr('disabled', true);

    $("#txt_PenyebabMasalah").val("");
    tinymce.activeEditor.setContent('');
});

$("#btn-TicketSummary-Close").click(function () {
    $("#div_SummaryInternal").addClass('hide');
    $("#btn-add-work-item-internal").attr('disabled', false);    
});


function addWorkDescription(idz, text) {
    var listVendor = getListVendor();
    
    var strHtml = `
    
<div class="card mb-1 mt-1">
    <div class="card-body">
        <div class="row mb-1 mt-1">
            <div class="col-sm-12">
                <div class="form-group mb-1">
                <div class="d-flex align-items-top">
                    <a style="color:#ff3366;cursor:pointer;" id="btn-remove-work-item">
                        <i class="icon icon-sm" data-feather="trash"></i> Hapus Pekerjaan
                    </a>
                    
                </div>
                    <div class="forms-sample">
                        <div class="row mb-1">
                            <div class="col-md-4">
                                <select class="js-example-basic-single w-100" style="width:100%;" name="nameVendor[]" id="nameVendor-item-`+ idz + `" value="` + text + `">
                                    <option value="" selected>-- Pilih Vendor --</option>
                                   `;
                                    for (var i = 0; i < listVendor.length; i++) {
                                        strHtml += `<option value="${listVendor[i].vendorID}">${listVendor[i].vendorName}</option>`;
                                    }
    strHtml += `
                                </select>
                            </div>
                            <div class="col-md-4">
                                <select class="js-example-basic-single w-100" style="width:100%;" name="jobOrder[]" id="jobOrder-item-`+ idz + `" value="` + text + `">
                                    <option value="" selected>-- JOB ORDER --</option>
                                    <option value="Pemeriksaan">Pemeriksaan</option>
                                    <option value="Pengadaan">Pengadaan</option>
                                    <option value="Perbaikan">Perbaikan</option>
                                    <option value="Instalasi">Instalasi</option>
                                    <option value="Routine Maintenance">Routine Maintenance</option>
                                    <option value="Part (Only)">Part (Only)</option>
                                    <option value="Relokasi">Relokasi</option>
                                </select>
                            </div>
                             <div class="col-md-4">
                                <select class="js-example-basic-single w-100" style="width:100%;" name="costCenter[]" id="costCenter-item-`+ idz + `" value="` + text + `">
                                    <option value="" selected>-- Pilih Jenis Anggaran --</option>
                                    <option value="1">ABO (Anggaran Bisnis Operasi)</option>
                                    <option value="2">ABI (Anggaran Bisnis Investasi) </option>
                                </select>
                            </div>
                        </div>
                        <div class="row mb-2">
                            <div class="col-md-4">
                                <label class="form-label">Kegiatan</label>
                                <textarea class="form-control" rows="3" placeholder="Ketik Kegiatan Di Sini" name="workItem[]" id="work-item-`+ idz + `" value="` + text + `"></textarea>
                                
                            </div>
                            <div class="col-md-4">
                                <label class="form-label">Penyebab Masalah</label>
                                <textarea class="form-control" rows="3" placeholder="Ketik Penyebab Masalah Di Sini" name="problemItem[]" id="problem-item-`+ idz + `" value="` + text + `"></textarea>
                                
                            </div>
                            <div class="col-md-4">
                                <div class="row">
                                    <div class="col-md-4 form-group text-center">
				                        <label class="form-label">Volume</label>
				                        <input type="text" class="form-control validasiNumber" placeholder="0" name="volItem[]" id="vol-item-`+ idz + `" value="` + text + `">
			                        </div>
                                    <div class="col-md-3 form-group text-center padding-custom">
				                        <label class="form-label">Satuan</label>
				                        <input type="text" class="form-control" placeholder="Satuan" value="Unit" name="satuanItem[]" id="satuan-item-`+ idz + `" value="` + text + `" readonly>
			                        </div>
                                    <div class="col-md-5 form-group text-center padding-custom">
			                        <label class="form-label">Keterangan</label>
				                       <select class="js-example-basic-single w-100" style="width:100%;" name="descItem[]" id="desc-item-`+ idz + `" value="` + text + `">
                                            <option value="Urgent" selected>Urgent</option>
                                            <option value="Normal">Normal</option>
                                            <option value="Low">Low</option>
                                        </select>
			                        </div>
                                </div>
                            </div>                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>     
    `;
    return strHtml;
}

$('#description-work').on('click', '#btn-remove-work-item', function () {
    
    $(this).closest('.card').remove();
    debugger
    if ($('#dataTable2').length==0) {
        if ($("#btn-remove-work-item").length == 0) $("#div_vendor").addClass('hide');
    }    
});

$('#DivListHardware').on('click', '#btn-remove-hardware-item', function () {
    $(this).closest('.crView').remove();
    if ($("#btn-remove-hardware-item").length == 0) $("#DivListHardware").addClass('hide');
});

function getListVendor() {
    var lvd = Object;
    $.ajax({
        type: 'GET',
        url: 'getListVendor',
        processData: false,
        cache: false,
        async: false,
        contentType: false,
        timeout: 800000,
        success: function (data) {
            
            lvd = data;
        },
        error: function (e) {
                        
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
                Swal.fire("Failed", "Request Vendor Gagal.", "error");
            }

        },
    });

    return lvd;
}

//if ($('#DdList_BUH').length) {      
//    if ($('#TicketStatus').val() == "0") {
//        Ddl_BUH();
//        if ($('#DdList_BUH_val').val() != "") {
//            setTimeout(function () {
//                $('#DdList_BUH').val($('#DdList_BUH_val').val()).trigger('change');
//            }, 2000);
//        }
        
//    }
//    else if ($('#DdList_BUH_val').val() == "" && $('#DdList_BUH_val').length)
//    {
//        Ddl_BUH();
//    }
//    else
//    {
//        $('#DdList_BUH').empty().trigger('change');
//        $("#DdList_BUH").append("<option value='" + $('#DdList_BUH_val').val() + "' selected>" + $('#DdList_BUH_name').val() + "</option>");
//    }
    
//    //Ddl_BUH();
//    //setTimeout(function () {        
//    //    if ($('#DdList_BUH_val').length) {
//    //        if ($('#DdList_BUH_val').val()!="")
//            //$('#DdList_BUH').val($('#DdList_BUH_val').val()).trigger('change');
//    //    }
//    //}, 1500);
   
//}
function Ddl_BUH() {
   
    $.ajax({
        type: 'GET',
        url: origin + '/Home/GetListBUH',
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

            $('#DdList_BUH').empty().trigger('change');            
            $("#DdList_BUH").append("<option value='All' selected>--Selected--</option>");
            
            for (var i = 0; i < data.data.length; i++) {                
                $("#DdList_BUH").append("<option value='" + data.data[i].username + "'>" + data.data[i].namaPegawai + "</option>");   
            }
            $('#DdList_BUH').trigger('change');
        }
    });
}