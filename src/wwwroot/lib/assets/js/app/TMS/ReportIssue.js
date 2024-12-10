
let inputFile2 = $('#attachment-rp');
let filesContainer2 = $('#attachment-container');
let files2 = [];

$('#btn-cancel-report-issue').click(function () {

    //set default app id select2
    $('#spbu').select2();
    $('#spbu').val('').trigger('change');

    //clear form
    $('#spbuArea').val('');
    $('#spbuType').val('');
    $('#spbuAddress').val('');
    $('#spbuAgent').val('');
    $('#Issue').val('');

    filesContainer.empty();
});

$('#btn-draft-report-issue').click(function () {
    let issue = $('#Issue').val();
    if (issue == '') {
        Swal.fire("Validation", "Keluhan Tidak Boleh Kosong.", "warning");
        return
    }
    
    Swal.fire({
        title: "Do you want to save this as Draft?",
        text: "Save this Ticket as Draft ? You can change this ticket in Draft Menu",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it!"
    }).then((result) => {
        if (result.isConfirmed) {
            addReportIssue(0);
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
});

$('#btn-save-report-issue').click(function () {

    let issue = $('#Issue').val();
    if (issue == '') {
        Swal.fire("Validation", "Keluhan Tidak Boleh Kosong.", "warning");
        return
    }
    if ($('#DdList_BUH').val() == 'All' && $('#spbuType').val() == 'SPBU') {
        Swal.fire("Validation", "BUH Tidak Boleh Kosong.", "warning");
        return
    }
    if ($('#DdList_BUH').val() == 'All' && $('#spbuType').val() == 'HO') {
        Swal.fire("Validation", "Manager Tidak Boleh Kosong.", "warning");
        return
    }
    if ($("#btn-remove-hardware-item").length == 0 && $('#appId').val().toLowerCase().indexOf("hardware") !=0)
    {
        Swal.fire("Validation", "List Hardware tidak Boleh Kosong", "warning");
        return
    }


    Swal.fire({
        title: "Do you want to save the changes?",
        text: "Save this Report Issue ? You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it!"
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang membuat <strong>Report Issue</strong> baru.');
            $("#btn-save-report-issue").prop("disabled", true);
            setTimeout(function () { addReportIssue(1); },500);
            
        }
    });   
});

function addReportIssue(status) {
    //var DtO = { Tipe: $('#txt_Tipe').val(), Subject: $('#txt_Subject').val(), Content: tinymce.activeEditor.getContent(), Descriptions: $('#txt_Description').val() };
    //var Data = JSON.stringify(DtO);

    var formData = new FormData();

    //Form data
    var form_data = $('#repIssues').serializeArray();
    $.each(form_data, function (key, input) {
        formData.append(input.name, input.value);
    });
    debugger

    files2.forEach(fileItem => {
        formData.append('files[]', fileItem);
    });

    formData.append('status', status);

    let requestUrl = 'addReportIssue';
        
    var Save = $.ajax({
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

        //    showLoader('Mohon menunggu, sedang membuat <strong>Report Issue</strong> baru.');
        //    $("#btn-save-report-issue").prop("disabled", true);
        //},
        success: function (data) {

            console.log("SUCCESS : ", data);
            $("#btn-save-report-issue").prop("disabled", false);

            //swal.close();
            Swal.close();

            //display alert success
            //Swal.fire("Success", "Report Issue berhasil dibuat.", "success");

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1500
            })
            //reload current page
            setTimeout(window.location.href = "helpdesk", 1500);
        },
        error: function (e) {

            //enable button submit
            $("#btn-save-report-issue").prop("disabled", false);

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
                Swal.fire("Failed", "Report Issue tidak dapat dibuat.", "error");
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
    console.log('add file');
    $('#attachment-rp').click();
});

$('#btn-add-file-ticketDetail').click(function () {
    console.log('add file');
    $('#attachment-rp').click();
});

$('#attachment-rp').change(function () {    
    debugger
    let crId = $('#id').val();
    if (crId) {
        let newFiles = [];
        for (let index = 0; index < inputFile2[0].files.length; index++) {
            let file = inputFile2[0].files[index];
            newFiles.push(file);
            files2.push(file);
        }

        //send file directly
        uploadFile();
    } else {
        let newFiles = [];
        for (let index = 0; index < inputFile2[0].files.length; index++) {            
            let file = inputFile2[0].files[index];
            debugger
            if (file.size / 1024 >= 10000) {
                Swal.fire("Failed", "File size lebih dari 10 mb.", "warning");
                return
            }
            file.TmpUri = URL.createObjectURL(file);
            newFiles.push(file);
            files2.push(file);
        }

        newFiles.forEach(file => {
            let filName = file.name;
            let fileExtension = filName.split('.').pop().toUpperCase();            
            
            //let fileElement = $(`<p>${file.name}</p>`);
            let fileElement;

            if (file.type.toLowerCase().indexOf("image")==0) {
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


            //fileElement.data('fileData', file);
            filesContainer2.append(fileElement);

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
            console.log("SUCCESS : ", data);

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
                        console.log('value: ' + value);
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