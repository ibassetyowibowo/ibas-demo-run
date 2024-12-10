
//ATTACHMENT
let inputFile = $('#attachment');
let filesContainer = $('#attachment-container');
let files = [];
let fileInc = 1;
let idx = 1;
let descriptionItemCount = 0;
let currentSelectedRow = null;
let currentSelectedBadgeElement = null;

let commentContainer = $('#comment-container');
let logContainer = $('#log-container');

$(function () {
    //show modal add new change request
    $('#btn-create-new-request').click(function () {
        //get current date
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = dd + '/' + mm + '/' + yyyy;

        //clear files
        files = [];
        fileInc = 1;
        idx = 1;
        descriptionItemCount = 0;

        //clear input form
        $('#usulan_aplikasi').val('');
        $('#fungsi').val($('#function-temp').val());
        $('#pic').val($('#pic-temp').val());
        $('#fasilitator').val('');
        $('#summary').val('');
        $('#tanggal_pengajuan').val(today);
        $('#id').val('');
        $('#comment-text').val('');

        $('#usulan_aplikasi').prop('readonly', false);
        //$('#fungsi').prop('readonly', false);
        //$('#pic').prop('readonly', false);
        $('#fasilitator').prop('readonly', false);
        $('#summary').prop('readonly', false);
        $('#developer-content').hide();

        $('#app_id_container').show();
        $('#progress-content').hide();
        $('#btn-start-progress').hide();
        $('#btn-create-change-request').show();
        $('#btn-add-description-content').show();

        $('#btn-approve-change-request').hide();
        $('#btn-reject-change-request').hide();
        $('#btn-update-change-request').hide();
        $('#btn-delete-change-request').hide();
        $('#btn-update-progress-change-request').hide();
        $('#btn-print-change-request').hide();

        $('#execution_date').hide();
        $('#start_date').prop('disabled', true);
        $('#end_date').prop('disabled', true);

        $('#progress-content').hide();
        $('#div_input_progress_number').hide();
        $('#div_input_progress_number_title').hide();

        //hide button post comment first time create
        $('#btn-post-comment').hide();

        //enable select fasilitator
        $('select#fasilitator').prop('disabled', false);

        //clear description item
        $('#description-item div').empty();

        //set priority
        $('.btn-priority').show();
        $('#priority').val('rendah');
        $('.btn-priority').removeClass('active');
        $('#btn-priority-low').addClass("active");

        //set default app id select2
        $('#app_id').select2();
        $('#app_id').val('').trigger('change');

        //hide log activity
        $('#log-activity').hide();
        filesContainer.empty();
        commentContainer.empty();
        logContainer.empty();

        //show modal
        $('#exampleModal').modal('toggle');
    });

    //add description checklist item
    $("#btn-add-description-item").click(function () {
        //alert('ok');
        let item = descriptionItemElement(idx, '');
        $("#description-item").append(item);
        feather.replace(); // display the icons
        //document.getElementById("editable-description-item-"+idx).contentEditable = true;
        idx += 1;
    });

    //add file item
    $('#btn-add-file-item').click(function () {
        console.log('add file');
        $('#attachment').click();
    });

    //on change file input
    $('#attachment').change(function () {
        let crId = $('#id').val();
        if (crId) {
            let newFiles = [];
            for (let index = 0; index < inputFile[0].files.length; index++) {
                let file = inputFile[0].files[index];
                newFiles.push(file);
                files.push(file);
            }

            //send file directly
            uploadFile();
        } else {
            let newFiles = [];
            for (let index = 0; index < inputFile[0].files.length; index++) {
                let file = inputFile[0].files[index];
                newFiles.push(file);
                files.push(file);
            }

            newFiles.forEach(file => {
                let filName = file.name;
                let fileExtension = filName.split('.').pop();
                //let fileElement = $(`<p>${file.name}</p>`);

                let fileElement = `
                    <div class="attachment-thumbnail">
                    <a class="attachment-thumbnail-preview" href="" target="_blank" title="`+ filName + `" rel="noreferrer nofollow noopener">
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

                //fileElement.data('fileData', file);
                filesContainer.append(fileElement);

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

    //PRIORITY
    $('#btn-priority-high').click(function () {
        $('#priority').val('tinggi');
        $('.btn-priority').removeClass('active');
        $(this).addClass("active");
    });

    $('#btn-priority-normal').click(function () {
        $('#priority').val('sedang');
        $('.btn-priority').removeClass('active');
        $(this).addClass("active");
    });

    $('#btn-priority-low').click(function () {
        $('#priority').val('rendah');
        $('.btn-priority').removeClass('active');
        $(this).addClass("active");
    });

    //$("#btn-remove-description-item").click(function() {
    $('#description-content').on('click', '#btn-remove-description-item', function () {
        //alert('rem');
        $(this).closest('div').remove();
    });

    //send request create cr
    $('#btn-create-change-request').click(function () {

        var appId = $('#app_id').val();
        if (appId === '') {
            swal('Mohon pilih usulan aplikasi!');
            return;
        }

        let usulanAplikasi = $('#usulan_aplikasi').val();
        if (appId === '0' && !usulanAplikasi) {
            swal('Mohon isi usulan aplikasi!');
            return;
        }

        let cmmt = $('#comment-text').val();
        if (cmmt === '') {
            swal('Mohon isi komentar/pesan!.');
            return;
        }


        var formData = new FormData();

        //Form data
        var form_data = $('#form-cr').serializeArray();
        $.each(form_data, function (key, input) {
            formData.append(input.name, input.value);
        });

        files.forEach(fileItem => {
            //let fileName2 = fileItem.name;
            //console.log(fileName2);
            formData.append('files[]', fileItem);
            //formDataSerialize +='&file[]='+fileItem;
        });

        console.log('formData: ' + formData);
        
        let requestUrl = $('#cr-url').val();
        $.ajax({
            type: 'POST',
/*            headers: { 'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content') },*/
            enctype: 'multipart/form-data',
            url: requestUrl,
            data: formData, //formDataSerialize,
            processData: false,
            cache: false,
            contentType: false,
            //dataType: "json",
            //encode: true,
            timeout: 800000,
            beforeSend: function (XMLHttpRequest) {
                //show loader
                //$('#loader-form').fadeIn();//show(250);
                showLoader('Mohon menunggu, sedang membuat <strong>change request</strong> baru.');

                //disable button submit
                $("#btn-create-change-request").prop("disabled", true);
            },
            success: function (data) {
                //let res = JSON.parse(response);
                //$("#output").text(data);
                console.log("SUCCESS : ", data);

                //enable button submit
                $("#btn-create-change-request").prop("disabled", false);

                //hide loader
                //$('#loader-form').fadeOut(); //hide(250);

                //close modal
                $('#exampleModal').modal('toggle');

                //dismis alert
                //swal.close();
                Swal.close();

                //display alert success
                Swal.fire("Success", "Change request berhasil dibuat.", "success");

                //reload current page
                window.location.reload();
            },
            error: function (e) {
                //$("#div-error-message").text(e.responseText);
                let res = JSON.parse(e.responseText);
                /*
                let errorMessages = res.error.message;
                let messages = '';
                console.log("ERROR messages : ", errorMessages);
                for(let i = 0; i < errorMessages.length; i++) {
                    messages += errorMessages[i] + "<br>";
                }
                */

                //$("#div-error-message").html(messages);

                //show alert
                //const toast = new coreui.Toast($("#liveToast"))
                //toast.show()

                //enable button submit
                $("#btn-create-change-request").prop("disabled", false);

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
                //Swal.fire("Failed", "Change request tidak dapat dibuat.", "error");

                //hide loader
                //$('#loader-form').fadeOut(); //hide(250);

                //close modal
                //$('#modalFormStream').modal('toggle');
            },
        });
    });

    //send comment
    $('#btn-post-comment').click(function () {
        let message = $('#comment-text').val();
        if (!message) {
            swal('Mohon isi komentar terlebih dahulu !');
            return;
        }

        //var formData = new FormData('#form-cr');
        var formData = new FormData();

        //Form data
        var form_data = $('#form-cr').serializeArray();
        $.each(form_data, function (key, input) {
            formData.append(input.name, input.value);
        });

        let requestUrl = $('#cm-url').val();

        //set message box empty
        $('#comment-text').val('');

        $.ajax({
            type: 'POST',
            headers: { 'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content') },
            enctype: 'multipart/form-data',
            url: requestUrl, //"{{ url('api/change-request') }}",
            data: formData, //formDataSerialize,
            processData: false,
            cache: false,
            contentType: false,
            //dataType: "json",
            //encode: true,
            timeout: 800000,
            beforeSend: function (XMLHttpRequest) {
                //show loader
                //$('#loader-form').fadeIn();//show(250);
                showLoader('Mohon menunggu, sedang mengirim <strong>komentar</strong>.');

                //disable button submit
                $("#btn-post-comment").prop("disabled", true);
            },
            success: function (data) {
                //let res = JSON.parse(response);
                //$("#output").text(data);
                console.log("SUCCESS : ", data);

                //enable button submit
                $("#btn-post-comment").prop("disabled", false);

                //hide loader
                //$('#loader-form').fadeOut(); //hide(250);

                //dismis alert
                //swal.close();
                Swal.close();

                //display alert success
                //Swal.fire("Success", "Change request berhasil dibuat.", "success");

                //get current date
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = today.getFullYear();
                today = dd + '/' + mm + '/' + yyyy;

                let commentData = {
                    id: data.data.id,
                    full_name: data.data.full_name,
                    comment_date: data.data.created_at,
                    message: data.data.comment,
                };

                let commentElement2 = commentElement(commentData);
                commentContainer.append(commentElement2).show('slow');
                //commentElement2.show('slow');//.slideDown();

            },
            error: function (e) {
                //$("#div-error-message").text(e.responseText);
                let res = JSON.parse(e.responseText);
                /*
                let errorMessages = res.error.message;
                let messages = '';
                console.log("ERROR messages : ", errorMessages);
                for(let i = 0; i < errorMessages.length; i++) {
                    messages += errorMessages[i] + "<br>";
                }
                */

                //$("#div-error-message").html(messages);

                //show alert
                //const toast = new coreui.Toast($("#liveToast"))
                //toast.show()

                //enable button submit
                $("#btn-post-comment").prop("disabled", false);

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
                    Swal.fire("Failed", "Tidak dapat mengirim komentar.", "error");
                }
                //Swal.fire("Failed", "Tidak dapat mengirim komentar.", "error");
            },
        });

    });

    $('#btn-update-change-request').click(function () {
        let usulanAplikasi = $('#usulan_aplikasi').val();
        if (!usulanAplikasi) {
            swal('Mohon isi usulan aplikasi!');
            return;
        }
        debugger
        //var formData = new FormData('#form-cr');
        var formData = new FormData();

        //Form data
        var form_data = $('#form-cr').serializeArray();
        $.each(form_data, function (key, input) {
            formData.append(input.name, input.value);
        });

        formData.append('_method', 'PUT');

        //console.log('formData: ' +formData);

        let id = $('#id').val();
        let requestUrl = 'updateChangeRequest';

        $.ajax({
            type: 'POST',
            headers: { 'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content') },
            enctype: 'multipart/form-data',
            url: requestUrl + '/' + id, 
            data: formData, 
            processData: false,
            cache: false,
            contentType: false,
            timeout: 800000,
            beforeSend: function (XMLHttpRequest) {
                //show loader
                //$('#loader-form').fadeIn();//show(250);
                showLoader('Mohon menunggu, sedang mengubah <strong>change request</strong>.');

                //disable button submit
                $("#btn-update-change-request").prop("disabled", true);
            },
            success: function (data) {

                console.log("SUCCESS : ", data);

                $("#btn-update-change-request").prop("disabled", false);

                Swal.close();

                //display alert success
                Swal.fire("Success", "Change request berhasil di ubah.", "success");


                window.location.reload();
            },
            error: function (e) {

                //enable button submit
                $("#btn-update-change-request").prop("disabled", false);

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
                    Swal.fire("Failed", "Change request tidak dapat di ubah.", "error");
                }

            },
        });
    });

    $('#btn-delete-change-request').click(function () {
        confirmDeleteDialog();
    });

    $('#btn-approve-change-request').click(function () {
        confirmApproveDialog()
    });

    $('#btn-reject-change-request').click(function () {
        rejectDialog();

    });

    $('#btn-reject-change-request-action').click(function () {
        let rejectedReason = $('#rejected_reason').val();
        if (rejectedReason === '') {
            // empty value
            Swal.fire({
                title: "Warning!",
                text: "Masukkan alasan penolakan!.",
                icon: "warning"
            });
        } else {
            // value exist
            rejectChangeRequest(rejectedReason)
        }
    });

    $('#btn-update-progress-change-request').click(function () {

        let cmmt = $('#comment-text').val();
        if (cmmt === '') {
            swal('Mohon isi komentar/pesan!.');
            return;
        }

        var formData = new FormData();

        //Form data
        var form_data = $('#form-cr').serializeArray();
        $.each(form_data, function (key, input) {
            formData.append(input.name, input.value);
        });

        let x = 0;
        $('input.cb-progress-item').each(function () {
            let itemId = $(this).data('id');
            let itemVal = $(this).val();
            formData.append('description_detail_item['+x+'][id]', itemId);
            formData.append('description_detail_item['+x+'][status]', itemVal);
            //console.log(itemId + ':' + itemVal);
            x++;
        });

        //console.log(formData);
        //return;

        formData.append('_method', 'PUT');

        let id = $('#id').val();
/*        let requestUrl = $('#btn-update-progress-change-request').data('url');*/
        let requestUrl = 'updateProgress';
        
        $.ajax({
            type: 'POST',
            headers: { 'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content') },
            enctype: 'multipart/form-data',
            url: requestUrl + '/' + id, //"{{ url('api/change-request') }}",
            data: formData, //formDataSerialize,
            processData: false,
            cache: false,
            contentType: false,
            //dataType: "json",
            //encode: true,
            timeout: 800000,
            beforeSend: function (XMLHttpRequest) {
                //show loader
                //$('#loader-form').fadeIn();//show(250);
                showLoader('Mohon menunggu, sedang di proses.');

                //disable button submit
                //$("#btn-post-comment").prop("disabled", true);
            },
            success: function (data) {
                //let res = JSON.parse(response);
                //$("#output").text(data);
                console.log("SUCCESS : ", data);

                //dismis alert
                //swal.close();
                Swal.close();

                let progress = parseInt(data.progress);
                if (progress >= 100) {
                    //add new log
                    let logElement = addLogItem(data.data);
                    logContainer.append(logElement);

                    //add last log (next log message)
                    let lastLogElement = addLastLogItem(data.data);
                    logContainer.append(lastLogElement);

                    //display alert success
                    Swal.fire("Success", "Change Request sudah selesai di kerjakan.", "success");
                } else {
                    //display alert success
                    Swal.fire("Success", "Change Request berhasil di update.", "success");
                }

                //update progressbar percentage
                let progressPercentage = $('#progress_number').val();
                $('#progressbar-detail-percentage').text(progressPercentage);
                $('#progressbar-element-detail').css("width", progressPercentage + "%");
                //getChangeRequest(currentSelectedRow, id);

                window.location.reload();
            },
            error: function (e) {
                //$("#div-error-message").text(e.responseText);
                let res = JSON.parse(e.responseText);
                /*
                let errorMessages = res.error.message;
                let messages = '';
                console.log("ERROR messages : ", errorMessages);
                for(let i = 0; i < errorMessages.length; i++) {
                    messages += errorMessages[i] + "<br>";
                }
                */

                //$("#div-error-message").html(messages);

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
                    Swal.fire("Failed", "Tidak dapat di proses. Silahkan ulangi kembali.", "error");
                }

            },
        });
    });

    $('#description-item').on("click", "input.cb-progress-item", function () {
        if ($(this).is(':checked')) {
            $(this).val('1');
        } else {
            $(this).val('0');
        }

        let count = $('input.cb-progress-item').length;
        let checked = $('input.cb-progress-item:checked').length;
        let percentage = parseInt(((checked / count) * 100), 10);

        //set progressbar
        //Comment Now, cz percentage set by user input
        /*
        $('#progressbar-detail-percentage').text(percentage);
        $('#progress-finished').text(checked);
        $('#progress-total-count').text(count);
        $('#progressbar-element-detail').css("width", percentage + "%");
        */
    });

    $('#app_id').on('change', function () {
        var selectedValue = $(this).val();
        //console.log('Selected Value: ' + selectedValue);

        $('#usulan_aplikasi').val('');
        if (selectedValue === '0') {
            $('#usulan_aplikasi').show();
        } else {
            $('#usulan_aplikasi').hide();
        }
    });

    $('#btn-print-change-request').click(function () {
        let id = $('#id').val();

        window.open('pdfForm?id=' + id);
    });

});

function removeChangeRequest() {
    let id = $('#id').val();
    /*    let requestUrl = $('#cr-url').val();*/
    let requestUrl = 'deleteChangeRequest';

    $.ajax({
        type: 'DELETE',
        headers: { 'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content') },
        enctype: 'multipart/form-data',
        url: requestUrl + '/' + id, //"{{ url('api/change-request') }}",
        //data: formData, //formDataSerialize,
        processData: false,
        cache: false,
        contentType: false,
        //dataType: "json",
        //encode: true,
        timeout: 800000,
        beforeSend: function (XMLHttpRequest) {
            //show loader
            //$('#loader-form').fadeIn();//show(250);
            showLoader('Mohon menunggu, sedang <strong>menghapus change request</strong>.');

            //disable button submit
            $("#btn-delete-change-request").prop("disabled", true);
        },
        success: function (data) {
            //let res = JSON.parse(response);
            //$("#output").text(data);
            console.log("SUCCESS : ", data);

            //enable button submit
            $("#btn-delete-change-request").prop("disabled", false);

            //hide loader
            //$('#loader-form').fadeOut(); //hide(250);

            //close modal
            //$('#exampleModal').modal('toggle');

            //dismis alert
            //swal.close();
            Swal.close();

            //display alert success
            Swal.fire("Deleted Success", "Change request berhasil di hapus.", "success");

            //reload current page
            window.location.reload();
        },
        error: function (e) {
            //$("#div-error-message").text(e.responseText);
            let res = JSON.parse(e.responseText);
            /*
            let errorMessages = res.error.message;
            let messages = '';
            console.log("ERROR messages : ", errorMessages);
            for(let i = 0; i < errorMessages.length; i++) {
                messages += errorMessages[i] + "<br>";
            }
            */

            //$("#div-error-message").html(messages);

            //show alert
            //const toast = new coreui.Toast($("#liveToast"))
            //toast.show()

            //enable button submit
            $("#btn-delete-change-request").prop("disabled", false);

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
                Swal.fire("Failed", "Change request tidak dapat di hapus.", "error");
            }
            //Swal.fire("Failed", "Change request tidak dapat di hapus.", "error");

            //hide loader
            //$('#loader-form').fadeOut(); //hide(250);

            //close modal
            //$('#modalFormStream').modal('toggle');
        },
    });
}

function removeChangeRequestMain(id) {
    let requestUrl = 'deleteChangeRequest';

    $.ajax({
        type: 'DELETE',
        headers: { 'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content') },
        enctype: 'multipart/form-data',
        url: requestUrl + '/' + id,
        processData: false,
        cache: false,
        contentType: false,
        timeout: 800000,
        beforeSend: function (XMLHttpRequest) {
            //show loader
            showLoader('Mohon menunggu, sedang <strong>menghapus change request</strong>.');

            //disable button submit
            $("#btn-delete-change-request").prop("disabled", true);
        },
        success: function (data) {
            console.log("SUCCESS : ", data);

            //enable button submit
            $("#btn-delete-change-request").prop("disabled", false);

            Swal.close();

            //display alert success
            Swal.fire("Deleted Success", "Change request berhasil di hapus.", "success");

            //reload current page
            window.location.reload();
        },
        error: function (e) {
            let res = JSON.parse(e.responseText);

            //enable button submit
            $("#btn-delete-change-request").prop("disabled", false);

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
                Swal.fire("Failed", "Change request tidak dapat di hapus.", "error");
            }

        },
    });
}

function approveChangeRequest() {
    var formData = new FormData();

    let cmmt = $('#comment-text').val();
    if (cmmt === '') {
        swal('Mohon isi komentar/pesan!.');
        return;
    }
    
    $('#tanggal_estimasi').prop('disabled', false);

    //Form data
    var form_data = $('#form-cr').serializeArray();
    
    $.each(form_data, function (key, input) {
        formData.append(input.name, input.value);
    });
    
    if ($('#start_date').is(':visible') && $('#end_date').is(':visible')) {
        let sdate = $('#start_date').val();
        let edate = $('#end_date').val();
        if (sdate === '' && edate === '') {
            swal('Mohon isi Tanggal Mulai dan Selesai Pekerjaan!.');
            return;
        }
        let developer = $('#developer').val();
        if (developer.length === 0) {
            swal('Mohon Pilih Developer!.');
            return;
        }
    }

    $('#tanggal_estimasi').prop('disabled', true);
    
    formData.append('_method', 'PUT');

    let id = $('#id').val();
    //let requestUrl = $('#btn-approve-change-request').data('url');
    let requestUrl = 'addChangeRequest';

    $.ajax({
        type: 'POST',
        headers: { 'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content') },
        enctype: 'multipart/form-data',
        url: requestUrl + '/' + id, //"{{ url('api/change-request') }}",
        data: formData, //formDataSerialize,
        processData: false,
        cache: false,
        contentType: false,
        //dataType: "json",
        //encode: true,
        timeout: 800000,
        beforeSend: function (XMLHttpRequest) {
            //show loader
            //$('#loader-form').fadeIn();//show(250);
            showLoader('Mohon menunggu, sedang di proses.');

            //disable button submit
            //$("#btn-post-comment").prop("disabled", true);
        },
        success: function (data) {
            //let res = JSON.parse(response);
            //$("#output").text(data);
            console.log("SUCCESS : ", data);

            //dismis alert
            //swal.close();
            Swal.close();

            //hide button approve & reject
            $('#btn-approve-change-request').hide();
            $('#btn-reject-change-request').hide();
            $('#btn-update-progress-change-request').hide();

            //remove last log element
            $('#log-container li:last-child').remove();

            //add log
            let logElement = addLogItem(data.data);
            logContainer.append(logElement);

            //add last log (next log message)
            let lastLogElement = addLastLogItem(data.data);
            logContainer.append(lastLogElement);

            //display alert success
            Swal.fire("Success", "Proses berhasil.", "success");

             window.location.reload();
            //getChangeRequest(currentSelectedRow, id);

        },
        error: function (e) {
            //$("#div-error-message").text(e.responseText);
            let res = JSON.parse(e.responseText);
            /*
            let errorMessages = res.error.message;
            let messages = '';
            console.log("ERROR messages : ", errorMessages);
            for(let i = 0; i < errorMessages.length; i++) {
                messages += errorMessages[i] + "<br>";
            }
            */

            //$("#div-error-message").html(messages);

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
                Swal.fire("Failed", "Tidak dapat di proses. Silahkan ulangi kembali.", "error");
            }
        },
    });
}

function rejectChangeRequest(rejectedReason) {
    var formData = new FormData();

    //Form data
    var form_data = $('#form-cr').serializeArray();
    $.each(form_data, function (key, input) {
        formData.append(input.name, input.value);
    });

    formData.append('rejected_reason', rejectedReason);
    formData.append('_method', 'PUT');

    let id = $('#id').val();
    //let requestUrl = $('#btn-reject-change-request').data('url');
    let requestUrl = 'rejectChangeRequest';

    $.ajax({
        type: 'POST',
        headers: { 'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content') },
        enctype: 'multipart/form-data',
        url: requestUrl + '/' + id, //"{{ url('api/change-request') }}",
        data: formData, //formDataSerialize,
        processData: false,
        cache: false,
        contentType: false,
        //dataType: "json",
        //encode: true,
        timeout: 800000,
        beforeSend: function (XMLHttpRequest) {
            //show loader
            //$('#loader-form').fadeIn();//show(250);
            showLoader('Mohon menunggu, sedang di proses.');

            //disable button submit
            //$("#btn-post-comment").prop("disabled", true);
        },
        success: function (data) {
            //let res = JSON.parse(response);
            //$("#output").text(data);
            console.log("SUCCESS : ", data);

            //dismis alert
            //swal.close();
            Swal.close();

            //hide button approve & reject
            $('#btn-approve-change-request').hide();
            $('#btn-reject-change-request').hide();
            $('#btn-update-progress-change-request').hide();

            //remove last log element
            $('#log-container li:last-child').remove();

            //add new log
            let logElement = addLogItem(data.data);
            logContainer.append(logElement);

            //add last log (next log message)
            let lastLogElement = addLastLogItem(data.data);
            logContainer.append(lastLogElement);

            $('#rejectModal').modal('toggle');

            //display alert success
            Swal.fire("Success", "Change Request berhasil ditolak.", "success");

            //getChangeRequest(currentSelectedRow, id);

        },
        error: function (e) {
            //$("#div-error-message").text(e.responseText);
            let res = JSON.parse(e.responseText);
            /*
            let errorMessages = res.error.message;
            let messages = '';
            console.log("ERROR messages : ", errorMessages);
            for(let i = 0; i < errorMessages.length; i++) {
                messages += errorMessages[i] + "<br>";
            }
            */

            //$("#div-error-message").html(messages);

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
                Swal.fire("Failed", "Tidak dapat di proses. Silahkan ulangi kembali.", "error");
            }

        },
    });
}

function confirmApproveDialog() {
    Swal.fire({
        title: "Approve?",
        text: "Approve this change request ? You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#10B759",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Approve it!"
    }).then((result) => {
        if (result.isConfirmed) {
            approveChangeRequest();
        }
    });
}

function confirmDeleteDialog() {
    Swal.fire({
        title: "Are you sure?",
        text: "Delete this change request ? You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            removeChangeRequest();
        }
    });
}

function rejectDialog() {
    $('#rejectModal').modal('show');
    //$('#rejectModal').modal('toggle');
}

function uploadFile() {
    let crId = $('#id').val();
    if (!crId) {
        swal('Change request belum dipilih!');
        return;
    }

    //var formData = new FormData('#form-cr');
    var formData = new FormData();

    //Form data
    var form_data = $('#form-cr').serializeArray();
    $.each(form_data, function (key, input) {
        formData.append(input.name, input.value);
    });

    files.forEach(fileItem => {
        //let fileName2 = fileItem.name;
        //console.log(fileName2);
        formData.append('files[]', fileItem);
        //formDataSerialize +='&file[]='+fileItem;
    });

    console.log('formData: ' + formData);

    let requestUrl = 'addOtherFile';
    $.ajax({
        type: 'POST',
        headers: { 'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content') },
        enctype: 'multipart/form-data',
        url: requestUrl, 
        data: formData,
        processData: false,
        cache: false,
        contentType: false,
        timeout: 800000,
        beforeSend: function (XMLHttpRequest) {
            showLoader('Mohon menunggu, sedang mengirim <strong>File</strong>.');

            $("#btn-add-file-item").prop("disabled", true);
        },
        success: function (data) {

            console.log("SUCCESS : ", data);

            //enable button submit
            $("#btn-add-file-item").prop("disabled", false);

            Swal.close();

            
            files = [];

            //add element to item list
            let fileData = {
                id: data.data.id,
                fileUrl: data.data.path,
                fileName: data.data.file_name_plain,
                fileExtension: data.data.file_extension,
                uploaded_date: data.data.created_at,
                uploader: data.data.uploader_full_name,
                fileInc: fileInc,
            };

            let fileEle = fileElement(fileData);
            filesContainer.append(fileEle);
        },
        error: function (e) {
            //$("#div-error-message").text(e.responseText);
            let res = JSON.parse(e.responseText);
            /*
            let errorMessages = res.error.message;
            let messages = '';
            console.log("ERROR messages : ", errorMessages);
            for(let i = 0; i < errorMessages.length; i++) {
                messages += errorMessages[i] + "<br>";
            }
            */

            //$("#div-error-message").html(messages);

            //show alert
            //const toast = new coreui.Toast($("#liveToast"))
            //toast.show()

            //enable button submit
            $("#btn-add-file-item").prop("disabled", false);

            //close wal
            Swal.close();

            //display alert error
            Swal.fire("Failed", "Tidak dapat mengirim file.", "error");

            //hide loader
            //$('#loader-form').fadeOut(); //hide(250);

            //close modal
            //$('#modalFormStream').modal('toggle');
        },
    });
}

function deleteDataCR(id) {
    Swal.fire({
        title: "Are you sure?",
        text: "Delete this change request ? You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            removeChangeRequestMain(id);
        }
    });
}

function getChangeRequest(button, id) {
    currentSelectedRow = button;
    
    let requestUrl = 'getChangeRequest?id=';
    $.ajax({
        type: 'GET',
        headers: { 'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content') },
        url: requestUrl + id,
        processData: false,
        cache: false,
        contentType: false,
        //dataType: "json",
        //encode: true,
        timeout: 800000,
        beforeSend: function (XMLHttpRequest) {
            //show loader
            //$('#loader-form').fadeIn();//show(250);
            showLoader('Mohon menunggu, sedang menampilkan <strong>Data</strong>.');
        },
        success: function (data) {
            
            console.log("SUCCESS : ", data);

            showDetail(data.data.change_request, data.data);
            
            if (data.data.element != null) {
                if (data.data.element.button.approve.visibility == 'show')
                    $('#btn-approve-change-request').show();
                else
                    $('#btn-approve-change-request').hide();

                $('#btn-approve-change-request').text(data.data.element.button.approve.text);
                $('#btn-approve-change-request').data('url', data.data.element.button.approve.url);

                if (data.data.element.button.reject.visibility == 'show')
                    $('#btn-reject-change-request').show();
                else
                    $('#btn-reject-change-request').hide();

                $('#btn-reject-change-request').text(data.data.element.button.reject.text);
                $('#btn-reject-change-request').data('url', data.data.element.button.reject.url);
            }

            //            this.updateTableRow(button, data.data.change_request);

            //dismis alert
            //swal.close();
            Swal.close();

            //display alert success
            //Swal.fire("Success", "Change request berhasil dibuat.", "success");

        },
        error: function (e) {
            //$("#div-error-message").text(e.responseText);
            let res = JSON.parse(e.responseText);
            /*
            let errorMessages = res.error.message;
            let messages = '';
            console.log("ERROR messages : ", errorMessages);
            for(let i = 0; i < errorMessages.length; i++) {
                messages += errorMessages[i] + "<br>";
            }
            */

            //$("#div-error-message").html(messages);

            //show alert
            //const toast = new coreui.Toast($("#liveToast"))
            //toast.show()

            //close wal
            Swal.close();

            //close modal
            //$('#exampleModal').modal('toggle');

            //display alert error
            Swal.fire("Failed", "Maaf, Tidak dapat menampilkan data.", "error");
        },
    });
}

function showDetail(data, fullData) {
    
    //let res = JSON.parse(data);
    console.log('data: ' + JSON.stringify(data));
    console.log(data.usulan_aplikasi);
    let tanggalPengajuan = this.displayDateDefault(data.changeRequest.tanggal_pengajuan);
    let tanggalEstimasi = this.displayDateDefault(data.changeRequest.estimated_completion_date);
    let startDate = this.displayDateDefault(data.changeRequest.start_date);
    let endDate = this.displayDateDefault(data.changeRequest.end_date);

    let progressPercentage = data.changeRequest.progress_percentage ?? 0;
    progressPercentage = parseInt(progressPercentage);

    if (progressPercentage !== null && !isNaN(progressPercentage)) {

    } else {
        progressPercentage = 0;
    }

    $('#id').val(data.changeRequest.id);
    $('#app_id').val(data.changeRequest.app_id).trigger('change');
    $('#usulan_aplikasi').val(data.changeRequest.usulan_aplikasi);
    $('#fungsi').val(data.changeRequest.fungsi);
    $('#pic').val(data.changeRequest.pic);
    $('#fasilitator').val(data.changeRequest.fasilitator);
    $('#summary').val(data.changeRequest.summary);
    $('#tanggal_pengajuan').val(tanggalPengajuan);

    $('#tanggal_estimasi').val(tanggalEstimasi);
    $('#start_date').val(startDate);
    $('#end_date').val(endDate);

    $('#comment-text').val('');
    $('#progress_number').val(progressPercentage);

    $('#usulan_aplikasi').prop('readonly', true);
    $('#fungsi').prop('readonly', true);
    $('#pic').prop('readonly', true);
    $('#fasilitator').prop('readonly', true);
    $('#summary').prop('readonly', true);
    $('#start_date').prop('disabled', true);
    $('#end_date').prop('disabled', true);

    $('#app_id_container').hide();
    $('#usulan_aplikasi').show();

    $('#btn-start-progress').show();
    $('#btn-create-change-request').hide();
    //$('#btn-add-description-content').hide();
    $('#btn-update-change-request').hide();
    $('#btn-delete-change-request').hide();

    //set fasilitator default
    $("#fasilitator").select2().val("ICT").trigger("change");
    $('select#fasilitator').prop('disabled', true);

    $('#form_tanggal_estimasi').hide();
    $('#execution_date').hide();

    $('#tanggal_estimasi').prop('disabled', true);
    $('#start_date').prop('disabled', true);
    $('#end_date').prop('disabled', true);

    $('#progress-content').hide();
    $('#div_input_progress_number').hide();
    $('#div_input_progress_number_title').hide();

    //can update priority ?
    if (data.can_priority_update) {
        $('.btn-priority').show();
    } else {
        $('.btn-priority').hide();
    }

    //set disable option list progresspercentage
    //Disable options by value

    $('#progress_number').select2();
    if (progressPercentage >= 25) {
        $('#progress_number option[value="0"]').prop('disabled', true);
        $('#progress_number option[value="25"]').prop('disabled', true);
    }

    if (progressPercentage >= 50)
        $('#progress_number option[value="50"]').prop('disabled', true);

    if (progressPercentage >= 75)
        $('#progress_number option[value="75"]').prop('disabled', true);

    if (progressPercentage >= 100)
        $('#progress_number option[value="100"]').prop('disabled', true);

    // Trigger Select2 to refresh
    $('#progress_number').trigger('change');

    //set priority
    let priority = data.changeRequest.prioritas;
    $('#priority').val(priority);
    $('.btn-priority').removeClass('active');

    if (priority == 'rendah') {
        $('#btn-priority-low').addClass("active");
        $('#btn-priority-low').show();
    } else if (priority == 'sedang') {
        $('#btn-priority-normal').addClass("active");
        $('#btn-priority-normal').show();
    } else {
        $('#btn-priority-high').addClass("active");
        $('#btn-priority-high').show();
    }

    //clear description item
    $('#description-item div').empty();

    //show log activity
    $('#log-activity').show();

    //empty container
    filesContainer.empty();
    commentContainer.empty();
    logContainer.empty();

    //let status = data.status;

    //console.log('status: ' + status);
    //is button update & delete change request show
    if (fullData.element.button.update.visibility == 'show') {
        $('#app_id_container').show();
        $('#usulan_aplikasi').prop('readonly', false);

        $('#summary').prop('readonly', false);
        $('#btn-update-change-request').show();
        $('#btn-delete-change-request').show();
        $("#btn-add-description-content").show();
        console.log('show update & delete');
    } else {
        $('#app_id_container').hide();
        $('#usulan_aplikasi').prop('readonly', true);

        $('#btn-update-change-request').hide();
        $('#btn-delete-change-request').hide();
        $("#btn-add-description-content").hide();
        console.log('hide update & delete');
    }

    //visibility button update progress
    $('#btn-update-progress-change-request').data('url', fullData.element.button.progress_update.url);
    if (fullData.element.button.progress_update.visibility == 'show') {
        $('#btn-update-progress-change-request').show();
    } else {
        $('#btn-update-progress-change-request').hide();
    }

    //visibility button print
    //$('#btn-print-change-request').attr("href", fullData.element.button.print.url);
    if (fullData.element.button.print.visibility == 'show') {
        $('#btn-print-change-request').show();
    } else {
        $('#btn-print-change-request').hide();
    }
    
    //is developer select option show
    if (fullData.element.div.developer_content.visibility == 'show') {
        $('#developer-content').show();

        //is select developer enable
        if (fullData.element.div.developer_content.enable) {
            //set select option developer enable
            $("#developer").select2().val("").trigger("change");
            $('select#developer').prop('disabled', false);
        } else {
            //SET SELECTED DEVELOPER
            var developersData = data.changeRequest.developer;
            let selectedDeveloperOptions = [];
            // Check if the string is not null and not empty
            if (developersData && developersData.trim() !== "") {
                selectedDeveloperOptions = developersData.split(',');
                //console.log(resultArray);
            } else {
                //console.log("String is null or empty");
            }

            $('#developer').select2();
            // Set selected options
            //let selectedDeveloperOptions = ['option1', 'option3']; // Array of values to be selected
            $('#developer').val(selectedDeveloperOptions);
            // Trigger Select2 to refresh
            $('#developer').trigger('change');

            //set select option developer disable
            //$("#developer").select2().val(data.developer).trigger("change");
            //$("#developer").select2().val(fullData.developers[0].username).trigger("change");
            $('select#developer').prop('disabled', true);
        }
    } else {
        $('#developer-content').hide();
        $("#developer").select2().val("").trigger("change");
        $('select#developer').prop('disabled', true);
    }

    if (fullData.element.div.estimated_date.visibility == 'show') {
        $('#form_tanggal_estimasi').show();
    }

    if (fullData.element.div.estimated_date.enable) {
        $('#tanggal_estimasi').prop('disabled', false);
    }

    if (fullData.element.div.execution_date.visibility == 'show') {
        $('#execution_date').show();
    }

    if (fullData.element.div.execution_date.visibility == 'show') {
        $('#execution_date').show();
    }

    if (fullData.element.input.progress.visibility == 'show') {
        $('#progress-content').show();
        $('#div_input_progress_number').show();
        $('#div_input_progress_number_title').show();
    }

    if (fullData.element.div.progress_bar.visibility == 'show') {
        $('#progress-content').show();
        $('#div_input_progress_number_title').show();
    }

    if (fullData.element.input.start_date.enable) {
        $('#start_date').prop('disabled', false);
    }

    if (fullData.element.input.end_date.enable) {
        $('#end_date').prop('disabled', false);
    }
    
    //display list description item
    let detailItem = data.detail;
    descriptionItemCount = detailItem.length;
    let countCheckedDescriptionItem = 0;
    
    for (let i = 0; i < detailItem.length; i++) {
        let obj = detailItem[i];
        let descriptionId = obj.id;
        let requestItem = obj.request_Name;
        let itemStatus = obj.status;

        if (fullData.element.button.update.visibility == 'show') {
            let item = this.descriptionItemElement(idx, requestItem);
            $("#description-item").append(item);
            feather.replace(); // display the icons
            //document.getElementById("editable-description-item-"+idx).contentEditable = true;
            idx += 1;
        } else {
            let checked = '';
            let disabled = '';
            if (itemStatus == '1') {
                checked = 'checked';
                countCheckedDescriptionItem += 1;
            }

            if (!data.can_description_progress_update) {
                disabled = 'disabled';
            }

            let checkboxItem = `
                <div class="form-check">
                    <label class="form-check-label text-muted tx-13">
                    <input type="checkbox" class="form-check-input cb-progress-item" name="description_item[]" value="`+ itemStatus + `" data-id="` + descriptionId + `" ` + checked + ` ` + disabled + `>
                    `+ requestItem + `
                    <i class="input-frame"></i></label>
                </div>`;
            //console.log(obj.request_name);

            $("#description-item").append(checkboxItem);
        }
    }

    //set progressbar
    /*
    $('#progressbar-detail-percentage').text(data.progress.progress_percentage_value);
    $('#progress-finished').text(data.progress.finished);
    $('#progress-total-count').text(data.progress.total);
    $('#progressbar-element-detail').css("width", data.progress.progress_percentage_value + "%");
    */

    $('#progressbar-detail-percentage').text(progressPercentage);
    $('#progressbar-element-detail').css("width", progressPercentage + "%");
    //$("div").attr("style", "display:block; color:red")
    
    //display list file item
    let files = data.files;
    for (let x = 0; x < files.length; x++) {
        
        let fileId = files[x].id;
        let fileName = files[x].file_name_plain;
        let fileName2 = files[x].file_name;
        let fileUrl = files[x].path;
        let fileExtension = files[x].file_extension;
        let uploader = files[x].uploader_Full_Name;
        let uploaded_date = this.displayDateTime(files[x].created_at);

        let fileItemElementId = 'file-item-' + fileId;

        let fileElement = `
            <div class="attachment-thumbnail" id="`+ fileItemElementId + `">
                <a class="attachment-thumbnail-preview" href="/`+ fileUrl + `" target="_blank" title="` + fileName + `" rel="noreferrer nofollow noopener">
                    <span class="attachment-thumbnail-preview-ext">`+ fileExtension + `</span>
                </a>
                <p class="attachment-thumbnail-details">
                    <span class="attachment-thumbnail-name">`+ fileName + `</span>
                    <span class="u-block quiet attachment-thumbnail-details-title-options">
                        <span>
                            Added at <span class="date past">`+ uploaded_date + `</span> by <i>` + uploader + `</i>
                        </span>
                    </span>
                    <span class="quiet attachment-thumbnail-details-options">
                        <a class="attachment-thumbnail-details-options-item dark-hover" href="#" id="btn-remove-file-item" data-id="`+ fileId + `" onclick="deleteFiles('` + fileId + `')">
                            <span class="attachment-thumbnail-details-options-item-text"> <i class="fas fa-trash-alt text-primary fa-sm fa-fw"></i>&nbsp;Delete File</span>
                        </a>
                    </span>
                </p>
            </div>
        `;

        filesContainer.append(fileElement);
        fileInc += 1;

    }
    
    //display list comments
    let comments = data.comments;
    for (let y = 0; y < comments.length; y++) {
        let item = comments[y];
        let commentId = item.id;
        let message = item.comment;
        let full_name = item.full_name;
        let comment_date = this.displayDateTime(item.created_at);

        let commentData = {
            id: commentId,
            full_name: full_name,
            comment_date: comment_date,
            message: message,
        };

        let commentElement2 = this.commentElement(commentData);
        commentContainer.append(commentElement2);

    }
    
    //display list logs
    let logs = data.logs;
    let logs_length = logs.length;
    for (let z = 0; z < logs.length; z++) {
        let item = logs[z];
        
        let logElement = this.addLogItem(item);
        logContainer.append(logElement);
    }

    if (logs_length > 0) {
        //show next message from last log
        let item = logs[logs_length - 1];
        
        let logElement = this.addLastLogItem(item);
        logContainer.append(logElement);
    }

    
    //set disable datepicker
    const tglAju = document.getElementById('tanggal_estimasi');
    const tglStart = document.getElementById('start_date');
    const tglEnd = document.getElementById('end_date');

    if (data.changeRequest.status == '2' || data.changeRequest.status > '3' ) {
        tglAju.disabled = true;
        tglAju.addEventListener('click', function (e) {
            e.stopPropagation();
            e.preventDefault();
        });

        if (data.changeRequest.status > 3) {
            tglStart.disabled = true;
            tglEnd.disabled = true;
            tglStart.addEventListener('click', function (e) {
                e.stopPropagation();
                e.preventDefault();
            });
            tglEnd.addEventListener('click', function (e) {
                e.stopPropagation();
                e.preventDefault();
            });
        }
    }

    $('#exampleModal').modal('toggle');
}

function addLogItem(logData) {
    let item = logData;
    let log_title = item.log_Title;
    let log_message = item.log_Message;
    let log_date = this.displayDateTime(item.created_at);
    let status_group = item.status_Group;

    let style_type = "primary";
    let fa_icon = 'fa-pencil-alt';
    if (status_group == 'approved') {
        style_type = "success";
        fa_icon = 'fa-check';
    } else if (status_group == 'finished') {
        style_type = "success";
        fa_icon = 'fa-check';
    } else if (status_group == 'rejected') {
        style_type = "danger";
        fa_icon = 'fa-stop';
    } else if (status_group == 'started') {
        style_type = "primary";
        fa_icon = 'fa-check';
    } else if (status_group == 'done') {
        style_type = "success";
        fa_icon = 'fa-check';
    }
    debugger
    return `
        <li class="timeline-item mb-3">
            <span class="timeline-icon-`+ style_type + `">
                <i class="fas `+ fa_icon + ` fa-sm fa-fw"></i>
            </span>
            <h6 class="fw-bold mb-1">`+ log_title + `</h6>
            <p class="text-muted mb-1 fw-bold tx-12">`+ log_date + `</p>
            <p class="text-`+ style_type + ` tx-13">
                `+ log_message + `
            </p>
        </li>
    `;
}

function addLastLogItem(logData) {
    //show next message from last log
    let item = logData;
    let next_title = item.log_Title;
    let next_message = item.next_Message;
    let log_date = item.created_at;
    let status_group = item.status_Group;

    let style_type = "warning";
    let fa_icon = 'fa-spinner';
    if (status_group == 'rejected') {
        style_type = "danger";
        fa_icon = 'fa-stop';
    } else if (status_group == 'done') {
        style_type = "success";
        fa_icon = 'fa-check';
    } else if (status_group == 'started') {
        style_type = "warning";
        fa_icon = 'fa-tasks';
    }

    return `
        <li class="timeline-item mb-3">
            <span class="timeline-icon-`+ style_type + `">
                <i class="fas `+ fa_icon + ` fa-sm fa-fw"></i>
            </span>
            <!--
            <h6 class="fw-bold mb-1">`+ next_title + `</h6>
            <p class="text-muted mb-1 fw-bold tx-12">`+ log_date + `</p>
            -->
            <p class="text-`+ style_type + ` tx-13 pt-2">
                `+ next_message + `
            </p>
        </li>
    `;
}

function fileElement(file) {
    return `
        <div class="attachment-thumbnail">
            <a class="attachment-thumbnail-preview" href="`+ file.fileUrl + `" target="_blank" title="` + file.fileName + `" rel="noreferrer nofollow noopener">
                <span class="attachment-thumbnail-preview-ext">`+ file.fileExtension + `</span>
            </a>
            <p class="attachment-thumbnail-details">
                <span class="attachment-thumbnail-name">`+ file.fileName + `</span>
                <span class="u-block quiet attachment-thumbnail-details-title-options">
                    <span>
                        Added at <span class="date past">`+ file.uploaded_date + `</span> by <i>` + file.uploader + `</i>
                    </span>
                </span>
                <span class="quiet attachment-thumbnail-details-options">
                    <a class="attachment-thumbnail-details-options-item dark-hover" href="#" id="btn-remove-file-`+ file.fileInc + `">
                        <span class="attachment-thumbnail-details-options-item-text"> <i class="fas fa-trash-alt text-primary fa-sm fa-fw"></i>&nbsp;Delete File</span>
                    </a>
                </span>
            </p>
        </div>
    `;
}

function commentElement(comment) {
    return `
    <div class="mb-0 mt-4" id="comment-item-`+ comment.id + `">
        <div class="d-flex flex-start align-items-center">
            <img class="rounded-circle shadow-1-strong mr-3"
                src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg" alt="avatar" width="40" height="40" />
            <div>
                <h6 class="fw-bold text-primary mb-1">` + comment.full_name + `</h6>
                <div class="d-flex align-items-center mb-0">
                    <p class="text-muted small mb-0">
                        at `+ comment.comment_date + `
                    </p>
                    <!--<a href="#" class="link-muted"><i class="fas fa-pencil-alt fa-sm fa-fw ml-3"></i></a>-->
                    <a href="#" class="link-muted" onclick="deleteComment('`+ comment.id + `')"><i class="fas fa-trash-alt fa-sm fa-fw ml-2"></i></a>
                </div>
            </div>
        </div>

        <p class="mt-2 mb-2 pb-1">
        `+ comment.message + `
        </p>
    </div>
    `;
}

function descriptionItemElement(idx, text) {
    return `
    <div class="d-flex align-items-top">
        <a style="color:#ff3366;cursor:pointer;" id="btn-remove-description-item"><i class="icon icon-sm" data-feather="trash"></i></a>&nbsp;&nbsp;
        <input type="text" class="editable-span" placeholder="Ketik deskripsi disini" name="description_item[]" id="editable-description-item-`+ idx + `" value="` + text + `">
    </div>
    `;
}

function deleteFiles(id) {
    Swal.fire({
        title: "Are you sure?",
        text: "Delete this File ? You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            removeFiles(id);
        }
    });
}

function removeFiles(id) {
    $.ajax({
        type: 'DELETE',
        url: 'deleteFiles?id=' + id,
        processData: false,
        cache: false,
        contentType: false,
        //dataType: "json",
        //encode: true,
        timeout: 800000,
        beforeSend: function (XMLHttpRequest) {
            //show loader
            //$('#loader-form').fadeIn();//show(250);
            showLoader('Mohon menunggu, sedang di proses.');

            //disable button submit
            //$("#btn-post-comment").prop("disabled", true);
        },
        success: function (data) {
            //let res = JSON.parse(response);
            //$("#output").text(data);
            console.log("SUCCESS : ", data);

            //remove element item
            $('#file-item-' + id).hide();

            //dismis alert
            //swal.close();
            Swal.close();

            //display alert success
            Swal.fire("Success", "File berhasil dihapus.", "success");

        },
        error: function (e) {
            //$("#div-error-message").text(e.responseText);
            let res = JSON.parse(e.responseText);
            /*
            let errorMessages = res.error.message;
            let messages = '';
            console.log("ERROR messages : ", errorMessages);
            for(let i = 0; i < errorMessages.length; i++) {
                messages += errorMessages[i] + "<br>";
            }
            */

            //$("#div-error-message").html(messages);

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
                Swal.fire("Failed", "Tidak dapat menghapus file. Silahkan ulangi kembali.", "error");
            }
        },
    });
}

function deleteFile(id, requestUrl) {
    //$.ajax({
    //    type: 'DELETE',
    //    url: 'deleteFiles?id=' + id,
    //    processData: false,
    //    cache: false,
    //    contentType: false,
    //    //dataType: "json",
    //    //encode: true,
    //    timeout: 800000,
    //    beforeSend: function (XMLHttpRequest) {
    //        //show loader
    //        //$('#loader-form').fadeIn();//show(250);
    //        showLoader('Mohon menunggu, sedang di proses.');

    //        //disable button submit
    //        //$("#btn-post-comment").prop("disabled", true);
    //    },
    //    success: function (data) {
    //        //let res = JSON.parse(response);
    //        //$("#output").text(data);
    //        console.log("SUCCESS : ", data);

    //        //remove element item
    //        $('#file-item-' + id).hide();

    //        //dismis alert
    //        //swal.close();
    //        Swal.close();

    //        //display alert success
    //        Swal.fire("Success", "File berhasil dihapus.", "success");

    //    },
    //    error: function (e) {
    //        //$("#div-error-message").text(e.responseText);
    //        let res = JSON.parse(e.responseText);
    //        /*
    //        let errorMessages = res.error.message;
    //        let messages = '';
    //        console.log("ERROR messages : ", errorMessages);
    //        for(let i = 0; i < errorMessages.length; i++) {
    //            messages += errorMessages[i] + "<br>";
    //        }
    //        */

    //        //$("#div-error-message").html(messages);

    //        //close wal
    //        Swal.close();

    //        //display alert error
    //        if (e.status == 400 || e.status == 422) {
    //            let cnt = 0;
    //            $.each(e.responseJSON.errors, function (key, value) {
    //                if (cnt == 0) {
    //                    console.log('value: ' + value);
    //                    Swal.fire("Failed", '' + value, "error");
    //                }
    //                cnt++;
    //            });
    //        } else {
    //            Swal.fire("Failed", "Tidak dapat menghapus file. Silahkan ulangi kembali.", "error");
    //        }
    //    },
    //});
}

function deleteComment(id) {
    let requestUrl = $('#cm-url').val();

    $.ajax({
        type: 'DELETE',
        headers: { 'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content') },
        //enctype: 'multipart/form-data',
        url: requestUrl + '/' + id, //"{{ url('api/change-request') }}",
        //data: formData, //formDataSerialize,
        processData: false,
        cache: false,
        contentType: false,
        //dataType: "json",
        //encode: true,
        timeout: 800000,
        beforeSend: function (XMLHttpRequest) {
            //show loader
            //$('#loader-form').fadeIn();//show(250);
            showLoader('Mohon menunggu, sedang di proses.');

            //disable button submit
            //$("#btn-post-comment").prop("disabled", true);
        },
        success: function (data) {
            //let res = JSON.parse(response);
            //$("#output").text(data);
            console.log("SUCCESS : ", data);

            //remove element item
            $('#comment-item-' + id).hide();

            //dismis alert
            //swal.close();
            Swal.close();

            //display alert success
            Swal.fire("Success", "Komentar berhasil dihapus.", "success");

        },
        error: function (e) {
            //$("#div-error-message").text(e.responseText);
            let res = JSON.parse(e.responseText);
            /*
            let errorMessages = res.error.message;
            let messages = '';
            console.log("ERROR messages : ", errorMessages);
            for(let i = 0; i < errorMessages.length; i++) {
                messages += errorMessages[i] + "<br>";
            }
            */

            //$("#div-error-message").html(messages);

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
                Swal.fire("Failed", "Tidak dapat menghapus komentar. Silahkan ulangi kembali.", "error");
            }
        },
    });
}

function swal(msg) {
    Swal.fire({
        icon: 'error',
        title: 'Attention',
        text: msg,
        footer: ''
    })
}

function showLoader(msg) {
    //let timerInterval
    return Swal.fire({
        title: 'Loading...',
        html: msg,
        buttons: false,
        closeOnClickOutside: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        //timer: 2000,
        onBeforeOpen: () => {
            Swal.showLoading()
            /*
            timerInterval = setInterval(() => {
                Swal.getContent().querySelector('strong')
                .textContent = Swal.getTimerLeft()
            }, 100)
            */
        },
        onClose: () => {
            //clearInterval(timerInterval)
        }
    }).then((result) => {
        /*
        if (
            // Read more about handling dismissals
            result.dismiss === Swal.DismissReason.timer
        ) {
            console.log('I was closed by the timer')
        }
        */
    });
}

function displayDate(stringDate) {
    if (stringDate) {
        try {
            const dt = new Date(stringDate);
            const dd = String(dt.getDate()).padStart(2, '0');
            const mm = String(dt.getMonth() + 1).padStart(2, '0'); //January is 0!
            const yyyy = dt.getFullYear();
            result = dd + '/' + mm + '/' + yyyy;
            return result;
        } catch (err) {
            return stringDate;
        }
    }
    return stringDate;

}

function displayDateDefault(stringDate) {
    if (stringDate) {
        try {
            const dt = new Date(stringDate);
            const dd = String(dt.getDate()).padStart(2, '0');
            const mm = String(dt.getMonth() + 1).padStart(2, '0'); //January is 0!
            const yyyy = dt.getFullYear();
            result = dd + '-' + mm + '-' + yyyy;
            return result;
        } catch (err) {
            return stringDate;
        }
    }
    return stringDate;

}

function displayDateTime(stringDate) {
    if (stringDate) {
        try {
            const dt = new Date(stringDate);
            const dd = String(dt.getDate()).padStart(2, '0');
            const mm = String(dt.getMonth() + 1).padStart(2, '0'); //January is 0!
            const hour = String(dt.getHours()).padStart(2, '0');
            const minute = String(dt.getMinutes()).padStart(2, '0');
            const yyyy = dt.getFullYear();
            result = dd + '/' + mm + '/' + yyyy + '  ' + hour + ':' + minute;
            return result;
        } catch (err) {
            return stringDate;
        }
    }
    return stringDate;

}


function tableRowElement() {
    return `
        <td>1</td>
        <td>app name</td>
        <td class="text-center">start date</td>
        <td class="text-center">end date</td>
        <td>pic</td>
        <td>
            <span class="badge badge-success">status group</span>
        </td>
        <td>
        <div class="progress-group">
            <span class="text-muted tx-13">10%</span>
            <span class="float-right text-muted tx-13"><b>2</b>/5</span>
            <div class="progress ht-10 mt-0">
                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 40%" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
        </div>
        </td>
        <td>
        <button type="button" class="btn btn-primary btn-icon" onclick="getChangeRequest(1);">
            <i data-feather="eye"></i>
        </button>
        </td>
    `;
}

function updateTableRow(button, data) {
    var row = button.parentNode.parentNode;
    var cells = row.getElementsByTagName("td");

    // Update the row cells with new values
    //cells[0].innerHTML = "New Name"; ///num
    //cells[1].innerHTML = "New Age"; //app name
    cells[2].innerHTML = data.start_date; //start date
    cells[3].innerHTML = data.end_date; //end date
    //cells[4].innerHTML = data.pic; //pic
    cells[5].innerHTML = data.status_group; //status
    cells[6].innerHTML = `<div class="progress-group">
                            <span class="text-muted tx-13">10%</span>
                            <span class="float-right text-muted tx-13"><b>2</b>/5</span>
                            <div class="progress ht-10 mt-0">
                                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 40%" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                          </div>
                            `; //progress
    cells[7].innerHTML = `<button type="button" class="btn btn-primary btn-icon" onclick="getChangeRequest(this, ` + data.id + `);">
                            <i data-feather="eye"></i>
                          </button>
                            `; //view button

    // Additional actions using the rowId parameter
    console.log("Row ID:", data.id);
}