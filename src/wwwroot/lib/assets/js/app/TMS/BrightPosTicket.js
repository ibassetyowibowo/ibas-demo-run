
let inputFileBrightPos = $('#attachment-rp-bpos');
let filesContainerBrightPos = $('#attachment-container');
let filesBrightPos = [];

$(document).ready(function () {
    var initialStatus = "";
    if ($('#IsUserPic').val() == "PIC") {
        initialStatus = "Open";
    }

    $('#statusFilterBPOS').val(initialStatus).trigger('change');

    $('#checkSaveTemplate').change(function () {
        if ($(this).is(':checked')) {
            $('#templateNameContainer').show(); // Show the input
        } else {
            $('#templateNameContainer').hide(); // Hide the input
        }
    });

    $('#TemplateTicketBPOS').on('change', function () {
        var selectedText = $(this).find("option:selected").text();

        tinyMCE.get('txt_BrightPosTicketContent').setContent($(this).val());

        if (selectedText) {
            $('#NewTemplateName').val(selectedText);
        }
    });


    $('#checkSaveTemplateEdit').change(function () {
        if ($(this).is(':checked')) {
            $('#templateNameContainerEdit').show(); // Show the input
        } else {
            $('#templateNameContainerEdit').hide(); // Hide the input
        }
    });

    $('#TemplateTicketBPOSEdit').on('change', function () {
        var selectedText = $(this).find("option:selected").text();

        tinyMCE.get('txt_BrightPosTicketContentEdit').setContent($(this).val());

        if (selectedText) {
            $('#NewTemplateNameEdit').val(selectedText);
        }
    });


    $.ajax({
        url: UrlOrigin + '/BrightPos/GetListBrightPosTicket',
        type: 'GET',
        dataType: "json",
        cache: false,
        async: false,
        contentType: false,
        processData: false,
        success: function (response) {

            if ($.cookie("BrightPosAlertEsign") == undefined) {
                $.cookie("BrightPosAlertEsign", 1);
                if ($.cookie("KodeUnitBisnis") == "UNIT" && response.length > 0) {
                    Swal.fire("Menunggu Respon", response.length + " Tiket menunggu untuk anda respon ", "info");    
                }
            }

            if (response.length != 0) {
                $('#div_indicator').removeClass("hide");
                $('#Div_DdNotification').removeClass("hide");
            }

            for (var i = 0; i < response.length; i++) {
                var Dt = '<a href="' + UrlOrigin + '/BrightPos/BrightPosTicketDetail?Id=' + response[i].id + '" class="dropdown-item">' +
                    '<div class="content" style="margin-bottom:0px;">' +
                    '<p class="text-wrap" style="font-size:12px; color:#4a9ad7"><i class="fa fa-file"></i> <b> BrightPos TICKETING - ' + response[i].ticketSubject + '</b></p>' +
                    '<p class="text-wrap" style="font-size:10px; color:purple"><b>' + response[i].ticketId + '</b></p>' +
                    '<p class="text-wrap" style="font-size:9px; color:grey;"> <b>SPBU : </b> ' + response[i].stationId + ' <br> ' + response[i].brightName + ' </p>' +
                    '<p class="text-wrap" style="font-size:9px; color:red; margin-bottom:0px; padding-bottom:0px; padding-top:0px;"><span style="font-size:10px; color:grey;"><b>Status: </b></span> <b><i> ' + response[i].status + ' </i></b></p>' +
                    '<p style="font-size:10px; color:brown;" class="sub-text text-muted"> <span style="color:grey;"><b>on:</b></span> ' + response[i].createdAtFormated + '</p>' +
                    '<hr class="dashed-hr"></div></a>';

                $('#LsNotifTicketDetail').append(Dt);
            }
        },
        error: function (xhr, status, error) {
            console.error("AJAX Error:", status, error);
        }
    });


});


$('#btn-add-collaborator-bpos-ticket').click(function () { $('#addCollaboratorModal').modal('show'); });
$('#btn-close-collaborator-bpos-ticket').click(function () { $('#addCollaboratorModal').modal('hide'); });

$('#btn-assign-bpos-ticket-modal').click(function () { $('#modal-asign-to').modal('show'); });

$('#btn-close-bpos-ticket-modal').click(function () { $('#modal-asign-to').modal('hide'); });

$('#btn-close-edit-bpos-ticket-modal').click(function () {
    $('#TemplateTicketBPOSEdit').val("").trigger('change');
    $('#modal-edit-reply').modal('hide');
});



$('#btn-assign-bpos-ticket').click(function () {

    let issue = $('#txtAssignTo').val();
    if (issue == '') {
        Swal.fire("Validation", "PIC Tidak Boleh Kosong.", "warning");
        return
    }

    $('#ActionProcess').val("ASIGN");
    $('#AssignTo').val($('#txtAssignTo').val());
    Swal.fire({
        title: "Melakukan Proses Assign?",
        text: "Lanjutkan langkah ini ? anda masih bisa mengubah lagi setelahnya!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it!"
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang melakukan <strong>Proses Data</strong>.');
            setTimeout(function () { addReportBrightPosTicket(1); }, 500);
        }
    });
    setTimeout(() => { Swal.clickConfirm(); }, 0);
});


$('#btn-request-reopen-bpos-ticket').click(function () {

    $('#TicketBody').val(tinyMCE.get('txt_BrightPosTicketContent').getContent());
    if ($('#TicketBody').val() == '') {
        Swal.fire("Validation", "Body Ticket Tidak Boleh Kosong.", "warning");
        return
    }

    $('#ActionProcess').val("REQUEST REOPEN");
    Swal.fire({
        title: "Melakukan Proses Request Reopen?",
        text: "Lanjutkan langkah ini ? anda masih bisa mengubah lagi setelahnya!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it!"
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang melakukan <strong>Proses Data</strong>.');
            setTimeout(function () { addReportBrightPosTicket(1); }, 500);
        }
    });

});

$('#btn-resolved-bpos-ticket').click(function () {

    $('#TicketBody').val(tinyMCE.get('txt_BrightPosTicketContent').getContent());
    if ($('#TicketBody').val() == '') {
        Swal.fire("Validation", "Body Ticket Tidak Boleh Kosong.", "warning");
        return
    }

    $('#ActionProcess').val("Resolved");
    Swal.fire({
        title: "Melakukan Proses Resolved Ticket?",
        text: "Lanjutkan langkah ini ? anda masih bisa mengubah lagi setelahnya!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it!"
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang melakukan <strong>Proses Data</strong>.');
            setTimeout(function () { addReportBrightPosTicket("Resolved"); }, 500);
        }
    });

});

$('#btn-open-bpos-ticket').click(function () {

    $('#TicketBody').val(tinyMCE.get('txt_BrightPosTicketContent').getContent());
    if ($('#TicketBody').val() == '') {
        Swal.fire("Validation", "Body Ticket Tidak Boleh Kosong.", "warning");
        return
    }

    $('#ActionProcess').val("OPEN TICKET");
    Swal.fire({
        title: "Melakukan Proses Open Ticket?",
        text: "Lanjutkan langkah ini ? anda masih bisa mengubah lagi setelahnya!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it!"
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang melakukan <strong>Proses Data</strong>.');
            setTimeout(function () { addReportBrightPosTicket(1); }, 500);
        }
    });
    setTimeout(() => { Swal.clickConfirm(); }, 0);
});

$('#btn-reject-bpos-ticket').click(function () {

    $('#TicketBody').val(tinyMCE.get('txt_BrightPosTicketContent').getContent());
    if ($('#TicketBody').val() == '') {
        Swal.fire("Validation", "Body Ticket Tidak Boleh Kosong.", "warning");
        return
    }

    $('#ActionProcess').val("REJECT REQUEST");
    Swal.fire({
        title: "Melakukan Proses Reject Ticket?",
        text: "Lanjutkan langkah ini ? anda masih bisa mengubah lagi setelahnya!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it!"
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang melakukan <strong>Proses Data</strong>.');
            setTimeout(function () { addReportBrightPosTicket(1); }, 500);
        }
    });
});

$('#btn-save-edit-reply-bpos-ticket').click(function () {

    $('#TicketBody').val(tinyMCE.get('txt_BrightPosTicketContentEdit').getContent());
    $('#ActionProcess').val("EDIT-REPLY");
    $('#checkSaveTemplate').prop('checked', $('#checkSaveTemplateEdit').prop('checked'));
    $('#NewTemplateName').val($('#NewTemplateNameEdit').val());

    Swal.fire({
        title: "Melakukan Proses Assign?",
        text: "Lanjutkan langkah ini ? anda masih bisa mengubah lagi setelahnya!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it!"
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang melakukan <strong>Proses Data</strong>.');
            setTimeout(function () { addReportBrightPosTicket(1); }, 500);
        }
    });
    setTimeout(() => { Swal.clickConfirm(); }, 0);
});

$('#btn-delete-template-reply-bpos-ticket').click(function () {

    if ($('#TemplateTicketBPOS').val() == '') {
        Swal.fire("Validation", "Pilih Nama Template Reply terlebih dahulu", "warning");
        return
    }

    Swal.fire({
        title: "Melakukan Delete Template ?",
        text: "Lanjutkan langkah ini ? anda tidak bisa mengubah lagi setelahnya!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it!"
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang melakukan <strong>Proses Data</strong>.');
            setTimeout(function () { DeleteTemplateBrightPosTicket(); }, 500);
        }
    });

});

$('#btn-delete-collaborator-bpos-ticket').click(function () {

    if ($('#Collaborator').val() == '') {
        Swal.fire("Validation", "Pilih Collaborator terlebih dahulu", "warning");
        return
    }

    Swal.fire({
        title: "Melakukan Delete Collaborator ?",
        text: "Lanjutkan langkah ini ? anda tidak bisa mengubah lagi setelahnya!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it!"
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang melakukan <strong>Proses Data</strong>.');
            setTimeout(function () { DeleteCollaboratorBrightPosTicket(); }, 500);
        }
    });

});

$('#saveCollaborator').click(function () {

    if (!$('#UserEmailCollaborator').val() || !$('#UserFullnameCollaborator').val()) {
        Swal.fire("Warning", "Email dan Nama Lengkap harus di isi!", "warning");
        return
    }

    if (!$('#UserNIPCollaborator').val() && !$('#UserSSOCollaborator').val()) {
        Swal.fire("Warning", "NIP atau Username SSO minimal harus di isi salah satu!", "warning");
        return
    }


    Swal.fire({
        title: "Melakukan Tambah Collaborator Ticket?",
        text: "Lanjutkan langkah ini ? anda masih bisa mengubah lagi setelahnya!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it!"
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang melakukan <strong>Proses Data</strong>.');
            setTimeout(function () { addCollaboratorBrightPosTicket(); }, 500);
        }
    });
    setTimeout(() => { Swal.clickConfirm(); }, 0);
});



$('#btn-save-bpos-ticket').click(function () {

    if ($('#checkSaveTemplate').is(':checked')) {
        if ($('#NewTemplateName').val() == '') {
            Swal.fire("Validation", "Nama Template Ticket Tidak Boleh Kosong.", "warning");
            return
        }
    }

    let issue = $('#TicketSubject').val();
    if (issue == '') {
        Swal.fire("Validation", "Subject Ticket Tidak Boleh Kosong.", "warning");
        return
    }

    $('#TicketBody').val(tinyMCE.get('txt_BrightPosTicketContent').getContent());
    if ($('#TicketBody').val() == '') {
        Swal.fire("Validation", "Body Ticket Tidak Boleh Kosong.", "warning");
        return
    }


    var emailValue = $('#userEmail').val();

    var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailValue && !emailPattern.test(emailValue)) {
        Swal.fire("Validation", "Please enter a valid email address.", "warning");
        return
    }

    Swal.fire({
        title: "Melakukan Proses Kirim?",
        text: "Lanjutkan langkah ini ? anda masih bisa melakukan Kirim lagi setelahnya!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it!"
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang melakukan <strong>Proses Data</strong>.');
            $("#btn-save-report-issue").prop("disabled", true);
            setTimeout(function () { addReportBrightPosTicket(1); }, 500);

        }
    });
    setTimeout(() => { Swal.clickConfirm(); }, 0);
});

function addReportBrightPosTicket(status) {

    if ($('#ActionProcess').val() === 'EDIT-REPLY') {
        $('#loadingBackdrop').show();
    }

    $("#AssignTo").prop("disabled", false);

    var formData = new FormData();

    var form_data = $('#bposTicketForm').serializeArray();
    $.each(form_data, function (key, input) {
        formData.append(input.name, input.value);
    });
    debugger

    filesBrightPos.forEach(fileItem => {
        formData.append('files[]', fileItem);
    });

    formData.append('status', status);

    var Save = $.ajax({
        type: 'POST',
        enctype: 'multipart/form-data',
        url: UrlOrigin + '/BrightPos/addReportBrightPosTicket',
        data: formData,
        processData: false,
        cache: false,
        async: false,
        contentType: false,
        timeout: 800000,
        success: function (data) {

            Swal.close();

            //display alert success
            Swal.fire("Success", "Report Issue berhasil dibuat.", "success");

            if ($('#ActionProcess').val() === 'EDIT-REPLY') {
                location.reload();
            } else {
                setTimeout(window.location.href = UrlOrigin + "/BrightPos", 1500);
            }
            $('#ReplyId').val(0);
        },
        error: function (e) {

            Swal.close();

            //display alert error
            if (e.status == 400 || e.status == 422) {
                let cnt = 0;
                $.each(e.responseJSON.errors, function (key, value) {
                    if (cnt == 0) {
                        Swal.fire("Failed", '' + value, "error");
                    }
                    cnt++;
                });
            } else {
                Swal.fire("Failed", "Proses Data tidak berhasil dilakukan.", "error");
            }
        },
    });

    Swal.close();
    StData = Save.status;
    if (Save.status != 200) {
        Swal.fire("Failed", "Gagal memproses data.", "error");
    }
}


function addCollaboratorBrightPosTicket() {

    $('#loadingBackdrop').show();

    var formData = new FormData();
    var form_data = $('#collaboratorForm').serializeArray();
    $.each(form_data, function (key, input) {
        formData.append(input.name, input.value);
    });

    var Save = $.ajax({
        type: 'POST',
        enctype: 'multipart/form-data', 
        url: UrlOrigin + '/BrightPos/addCollaboratorBrightPosTicket',
        data: formData,
        processData: false,
        cache: false,
        async: false,
        contentType: false,
        timeout: 800000,
        success: function (data) {
            Swal.close();
            Swal.fire("Success", "Collaborator berhasil di tambahkan.", "success");
            location.reload();
            $('#ReplyId').val(0);
        },
        error: function (e) {
            Swal.close();
            if (e.status == 400 || e.status == 422) {
                let cnt = 0;
                $.each(e.responseJSON.errors, function (key, value) {
                    if (cnt == 0) {
                        Swal.fire("Failed", '' + value, "error");
                    }
                    cnt++;
                });
            } else {
                Swal.fire("Failed", "Proses Data tidak berhasil dilakukan.", "error");
            }
        },
    });

    Swal.close();
    StData = Save.status;
    if (Save.status != 200) {
        Swal.fire("Failed", "Gagal memproses data.", "error");
    }
}


function DeleteTemplateBrightPosTicket() {

    $('#loadingBackdrop').show();

    var formData = new FormData();
    var form_data = $('#bposTicketForm').serializeArray();
    $.each(form_data, function (key, input) {
        formData.append(input.name, input.value);
    });

    var Save = $.ajax({
        type: 'POST',
        enctype: 'multipart/form-data',
        url: UrlOrigin + '/BrightPos/DeleteTemplateBrightPosTicket',
        data: formData,
        processData: false,
        cache: false,
        async: false,
        contentType: false,
        timeout: 800000,
        success: function (data) {
            Swal.close();
            Swal.fire("Success", "Template berhasil di hapus.", "success");
            location.reload();
            $('#ReplyId').val(0);
        },
        error: function (e) {
            Swal.close();
            if (e.status == 400 || e.status == 422) {
                let cnt = 0;
                $.each(e.responseJSON.errors, function (key, value) {
                    if (cnt == 0) {
                        Swal.fire("Failed", '' + value, "error");
                    }
                    cnt++;
                });
            } else {
                Swal.fire("Failed", "Proses Data tidak berhasil dilakukan.", "error");
            }
        },
    });

    Swal.close();
    StData = Save.status;
    if (Save.status != 200) {
        Swal.fire("Failed", "Gagal memproses data.", "error");
    }
}


function DeleteCollaboratorBrightPosTicket() {

    $('#loadingBackdrop').show();

    var formData = new FormData();
    var form_data = $('#bposTicketForm').serializeArray();
    $.each(form_data, function (key, input) {
        formData.append(input.name, input.value);
    });

    var Save = $.ajax({
        type: 'POST',
        enctype: 'multipart/form-data',
        url: UrlOrigin + '/BrightPos/DeleteCollaboratorBrightPosTicket',
        data: formData,
        processData: false,
        cache: false,
        async: false,
        contentType: false,
        timeout: 800000,
        success: function (data) {
            Swal.close();
            Swal.fire("Success", "Collaborator berhasil di hapus.", "success");
            location.reload();
            $('#ReplyId').val(0);
        },
        error: function (e) {
            Swal.close();
            if (e.status == 400 || e.status == 422) {
                let cnt = 0;
                $.each(e.responseJSON.errors, function (key, value) {
                    if (cnt == 0) {
                        Swal.fire("Failed", '' + value, "error");
                    }
                    cnt++;
                });
            } else {
                Swal.fire("Failed", "Proses Data tidak berhasil dilakukan.", "error");
            }
        },
    });

    Swal.close();
    StData = Save.status;
    if (Save.status != 200) {
        Swal.fire("Failed", "Gagal memproses data.", "error");
    }
}


$('#btn-add-file-ticket').click(function () {
    $('#attachment-rp-bpos').click();
});

$('#btn-add-file-ticketDetail').click(function () {
    $('#attachment-rp-bpos').click();
});

$('#attachment-rp-bpos').change(function () {
    debugger
    let crId = $('#id').val();
    if (crId) {
        let newFiles = [];
        for (let index = 0; index < inputFileBrightPos[0].files.length; index++) {
            let file = inputFileBrightPos[0].files[index];
            newFiles.push(file);
            filesBrightPos.push(file);
        }

        uploadFile();
    } else {
        let newFiles = [];
        for (let index = 0; index < inputFileBrightPos[0].files.length; index++) {
            let file = inputFileBrightPos[0].files[index];
            debugger
            if (file.size / 1024 >= 10000) {
                Swal.fire("Failed", "File size lebih dari 10 mb.", "warning");
                return
            }
            file.TmpUri = URL.createObjectURL(file);
            newFiles.push(file);
            filesBrightPos.push(file);
        }

        newFiles.forEach(file => {
            let filName = file.name;
            let fileExtension = filName.split('.').pop().toUpperCase();

            let fileElement;

            if (file.type.toLowerCase().indexOf("image") == 0) {
                fileElement = `
                    <div class="attachment-thumbnail">
                    <a class="attachment-thumbnail-preview" href="#" target="_blank" title="`+ filName + `" rel="noreferrer nofollow noopener">
                        <img class="attachment-thumbnail-preview" src="`+ file.TmpUri + `" alt="` + fileExtension + `">
                    </a>
                    <p class="attachment-thumbnail-details">
                        <span class="attachment-thumbnail-name">`+ filName + `</span>
                        <span class="u-block quiet attachment-thumbnail-details-title-options">
                            <span>
                                Added <span class="date past">Jun 21 at 2:30 PM</span>
                            </span>
                        </span>
                        <span class="quiet attachment-thumbnail-details-options">
                            <a class="attachment-thumbnail-details-options-item dark-hover" href="#" id="btn-remove-file-`+ fileInc + `">
                                <span class="attachment-thumbnail-details-options-item-text"> <i class="fas fa-trash-alt text-primary fa-sm fa-fw"></i>&nbsp;Remove File</span>
                            </a>
                        </span>
                    </p>
                    </div>
                `;
            }
            else {
                fileElement = `
                    <div class="attachment-thumbnail">
                    <a class="attachment-thumbnail-preview" href="#" target="_blank" title="`+ filName + `" rel="noreferrer nofollow noopener">
                        <span class="attachment-thumbnail-preview-ext">`+ fileExtension + `</span>
                    </a>
                    <p class="attachment-thumbnail-details">
                        <span class="attachment-thumbnail-name">`+ filName + `</span>
                        <span class="u-block quiet attachment-thumbnail-details-title-options">
                            <span>
                                Added <span class="date past">Jun 21 at 2:30 PM</span>
                            </span>
                        </span>
                        <span class="quiet attachment-thumbnail-details-options">
                            <a class="attachment-thumbnail-details-options-item dark-hover" href="#" id="btn-remove-file-`+ fileInc + `">
                                <span class="attachment-thumbnail-details-options-item-text"> <i class="fas fa-trash-alt text-primary fa-sm fa-fw"></i>&nbsp;Remove File</span>
                            </a>
                        </span>
                    </p>
                    </div>
                `;
            }

            filesContainerBrightPos.append(fileElement);

            let btnRemoveFile = $('#btn-remove-file-' + fileInc);
            btnRemoveFile.data('fileData', file);

            //remove file click event 
            btnRemoveFile.click(function () {
                //let fileElement = $(event.target);
                let indexToRemove = files.indexOf(btnRemoveFile.data('fileData'));
                $(this).closest('div').remove();
                files.splice(indexToRemove, 1);

                //get files from temp
                files.forEach(fileItem => {
                    let fileName2 = fileItem.name;
                    //console.log(fileName2);
                    /* here I just put file as file[] so now in submitting it will send all files */
                    //formData.append('file[]', fileItem);
                });

            });
        });

        fileInc += 1;
    }

});



function populateEditReply(id) {

    $('#loadingBackdrop').show();

    var Save = $.ajax({
        type: 'GET',
        url: UrlOrigin + '/BrightPos/GetReplyBrightPosTicket?Id=' + id,
        processData: false,
        cache: false,
        contentType: false,
        timeout: 800000,
        success: function (data) {

            $('#modal-edit-reply').modal('show');
            $('#ReplyId').val(id);
            tinyMCE.get('txt_BrightPosTicketContentEdit').setContent(data.ticketDetailBody);

        },
        error: function (e) {
            Swal.close();
            if (e.status == 400 || e.status == 422) {
                let cnt = 0;
                $.each(e.responseJSON.errors, function (key, value) {
                    if (cnt == 0) {
                        Swal.fire("Failed", '' + value, "error");
                    }
                    cnt++;
                });
            } else {
                Swal.fire("Failed", "Proses Data tidak berhasil dilakukan.", "error");
            }
        },
        complete: function () {
            $('#loadingBackdrop').hide();
        }
    });

}



function deleteFile(id, path) {
    let requestUrl = 'deleteFile';

    $.ajax({
        type: 'DELETE',
        headers: { 'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content') },
        url: requestUrl + '/' + id,
        processData: false,
        cache: false,
        contentType: false,
        timeout: 800000,
        beforeSend: function (XMLHttpRequest) {
            showLoader('Mohon menunggu, sedang di proses.');
        },
        success: function (data) {

            //remove element item
            $('#file-ticket-' + id).hide();

            Swal.close();

            Swal.fire("Success", "File berhasil dihapus.", "success");

        },
        error: function (e) {
            let res = JSON.parse(e.responseText);

            Swal.close();

            //display alert error
            if (e.status == 400 || e.status == 422) {
                let cnt = 0;
                $.each(e.responseJSON.errors, function (key, value) {
                    if (cnt == 0) {
                        Swal.fire("Failed", '' + value, "error");
                    }
                    cnt++;
                });
            } else {
                Swal.fire("Failed", "Tidak dapat menghapus file. Silahkan ulangi kembali.", "error");
            }
        },
    });
}




// --------- DATA-TABLE HANDLER -----------------------
$(document).ready(function () {

    var selectedTicketIds = [];

    'use strict';
    window.tablebpos = $('#dataTableBrightPosTicketing').DataTable({
        "aLengthMenu": [
            [10, 30, 50, 100, 150],
            [10, 30, 50, 100, 150]
        ],
        "columnDefs": [
            {
                "targets": 0,
                "orderable": false
            }
        ],
        "pageLength": 50,
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": UrlOrigin + '/BrightPos/GetFilteredTickets',
            "type": "POST",
            "data": function (d) {
                d.status = $('#statusFilterBPOS').val();
                d.asCollaborator = $('#checkAsCollaborator').prop('checked') ? 'true' : 'false';
            }
        },
        "columns": [
            { "data": "checkbox" },
            { "data": "action" },
            { "data": "status" },
            { "data": "ticketId" },
            { "data": "updatedAt" },
            { "data": "ticketSubject" },
            { "data": "ticketAssignTo" },
            { "data": "createdBy" },
            { "data": "brightName" }
        ],
        "drawCallback": function (settings) {
            feather.replace();
        }
    });

    $('#statusFilterBPOS').on('change', function () { tablebpos.draw(); });
    $('#checkAsCollaborator').on('change', function () { tablebpos.draw(); });

    $('#dataTableBrightPosTicketing').each(function () {
        var datatable = $(this);
        var search_input = datatable.closest('.dataTables_wrapper').find('div[id$=_filter] input');
        search_input.attr('placeholder', 'Search');
        search_input.removeClass('form-control-sm');
        var length_sel = datatable.closest('.dataTables_wrapper').find('div[id$=_length] select');
        length_sel.removeClass('form-control-sm');
    });



    // On 'Select All' checkbox change
    $('#select-all-checkbox').on('change', function () {
        var isChecked = $(this).is(':checked');

        // Select or deselect all checkboxes based on 'Select All' checkbox state
        $('#dataTableBrightPosTicketing tbody .checkbox-row').each(function () {
            var ticketId = $(this).data('ticket-id');  // Get the ticket ID from the checkbox
            $(this).prop('checked', isChecked);  // Check/uncheck the checkbox

            // Update the selectedTicketIds array accordingly
            if (isChecked) {
                if (!selectedTicketIds.includes(ticketId)) {
                    selectedTicketIds.push(ticketId);
                }
            } else {
                selectedTicketIds = selectedTicketIds.filter(function (id) {
                    return id !== ticketId;  // Remove the ticketId from array if unchecked
                });
            }
        });
    });

    // On individual checkbox change, update selectedTicketIds array
    $('#dataTableBrightPosTicketing tbody').on('change', '.checkbox-row', function () {
        var ticketId = $(this).data('ticket-id');
        if ($(this).is(':checked')) {
            selectedTicketIds.push(ticketId);  // Add ticketId to selectedTicketIds if checked
        } else {
            selectedTicketIds = selectedTicketIds.filter(function (id) {
                return id !== ticketId;  // Remove ticketId from selectedTicketIds if unchecked
            });
        }

        // Optionally, check/uncheck the 'Select All' checkbox based on individual checkboxes
        var allChecked = $('#dataTableBrightPosTicketing tbody .checkbox-row').length ===
            $('#dataTableBrightPosTicketing tbody .checkbox-row:checked').length;
        $('#select-all-checkbox').prop('checked', allChecked);
    });


    // Handle bulk status update
    $('#updateStatusBrightPosButton').click(function () {
        if (selectedTicketIds.length > 0) {
            $('#loadingBackdrop').show();
            var BrightPosUpdateNotes = tinyMCE.get('txt_BrightPosTicketContentEdit').getContent();  // Get the new status from a select dropdown
            $.ajax({
                url: UrlOrigin + '/BrightPos/UpdateTicketBrightPosStatus',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    TicketIds: selectedTicketIds,
                    TicketBody: BrightPosUpdateNotes
                }),
                success: function (response) {
                    selectedTicketIds = [];
                    $('#TemplateTicketBPOSEdit').val("").trigger('change');
                    Swal.fire("Success", "Tiket berhasil di update", "success");
                    $('#modal-edit-reply').modal('hide');
                    $('#loadingBackdrop').hide();
                    tablebpos.ajax.reload();
                },
                error: function (xhr, status, error) {
                    alert('Error updating status.');
                }
            });
        } else {
            Swal.fire("Validation", "Please select at least one ticket.", "warning");
        }
    });

    $('#btn-update-status-bpos-ticket').click(function () {
        if (selectedTicketIds.length > 0) {

            tinyMCE.get('txt_BrightPosTicketContentEdit').setContent("");
            $('#modal-edit-reply').modal('show');

        } else {
            Swal.fire("Validation", "Please select at least one ticket.", "warning");
        }
    });


});


$(function () {
    'use strict'

    if ($(".compose-multiple-select").length) {
        $(".compose-multiple-select").select2({
            placeholder: "Select collaborators"
        });
    }

});


$(function () {
    'use strict'

    //Tinymce editor
    if ($("#txt_BrightPosTicketContent").length) {
        tinymce.init({
            selector: '#txt_BrightPosTicketContent',
            min_height: 350,
            default_text_color: 'red',
            plugins: [
                'advlist', 'autoresize', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'pagebreak',
                'searchreplace', 'wordcount', 'visualblocks', 'visualchars', 'code', 'fullscreen',
            ],
            toolbar1: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media | forecolor backcolor emoticons | codesample help',
            image_advtab: true,
            statusbar: false,
            promotion: false,
            templates: [{
                title: 'Test template 1',
                content: 'Test 1'
            },
            {
                title: 'Test template 2',
                content: 'Test 2'
            }
            ],
            content_css: []
        });
    }

    if ($("#txt_BrightPosTicketContentEdit").length) {
        tinymce.init({
            selector: '#txt_BrightPosTicketContentEdit',
            min_height: 300,
            default_text_color: 'red',
            plugins: [
                'advlist', 'autoresize', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'pagebreak',
                'searchreplace', 'wordcount', 'visualblocks', 'visualchars', 'code', 'fullscreen',
            ],
            toolbar1: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media | forecolor backcolor emoticons | codesample help',
            image_advtab: true,
            statusbar: false,
            promotion: false,
            templates: [{
                title: 'Test template 1',
                content: 'Test 1'
            },
            {
                title: 'Test template 2',
                content: 'Test 2'
            }
            ],
            content_css: []
        });
    }

});

