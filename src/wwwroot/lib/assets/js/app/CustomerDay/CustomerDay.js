$('#ddl_aplikasi').on('change', function () {
    var selectedValue = $(this).val();
    //console.log('Selected Value: ' + selectedValue);

    if (selectedValue === '0') {
        $('#txt_UsulanAplikasiId').removeClass('hide');
        $('#txt_UsulanAplikasiDesc').removeClass('hide');
        $('#txt_UsulanAplikasi').removeClass('hide');
    } else {
        $('#txt_UsulanAplikasiId').addClass('hide');
        $('#txt_UsulanAplikasiDesc').addClass('hide');
        $('#txt_UsulanAplikasi').addClass('hide');
    }
});

$('#btn-add-file-comday').click(function () {
    $('#modal-comday-upload').modal('show');
    $('#txt_comday_File_Type').val('');
    $('#attachment-comday').val('');
    $('#txt_comday_Description').val('');
    files2 = null;
    $('#new-img-comday').addClass('hide');
    $('#new-file-comday').attr('hidden', true);
});

$('#attachment-comday').change(function () {

    inputFile2 = $('#attachment-comday');
    files2 = [];

    for (let index = 0; index < inputFile2[0].files.length; index++) {
        let file = inputFile2[0].files[index];

        if (file.size / 1024 >= 10000) {
            Swal.fire("Failed", "File size lebih dari 10 mb.", "warning");
            return
        }

        file.TmpUri = URL.createObjectURL(file);

        $('#new-file-comday').attr("hidden", true);
        $('#new-img-comday').addClass("hide");

        if (file.type.toLowerCase().indexOf("image") >= 0) {
            $('#new-img-comday').attr("alt", file.name.split('.').pop().toUpperCase());
            $('#new-img-comday').attr("src", file.TmpUri);
            $('#new-img-comday').removeClass("hide");
        }
        else if (file.type.toLowerCase().indexOf("pdf") >= 0) {
            $('#new-file-comday').attr("alt", file.name.split('.').pop().toUpperCase());
            $('#new-file-comday').attr("src", file.TmpUri);
            $('#new-file-comday').removeAttr("hidden");
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

$('#btn-Upload-comday').click(function (e) {
    e.preventDefault();

    if (files2 == null || files2.length == 0) {
        swal('Mohon pilih file.');
        return;
    }
    if ($('#txt_comday_File_Type').val() == "All") {
        swal('Mohon pilih file type.');
        return;
    }
    showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
    setTimeout(function () {
        let DtForm = $('#frmCustomerDay');
        let DtDisabled = DtForm.find(':input:disabled');
        DtForm.find(':input:disabled').removeAttr('disabled');

        let frmData = DtForm.serializeArray();
        FrData = new FormData();

        $.each(frmData, function (key, input) {
            FrData.append(input.name, $.trim(input.value));
        });

        DtDisabled.attr('disabled', true);

        var Data = JSON.stringify({
            TicketId: $('#txt_ticketid').val(), FileName: files2[0].name, FileExtention: "." + files2[0].name.split(".").pop(), MimeType: files2[0].type,
            AsBase64: StData64.split(",").pop(), Type: $('#txt_comday_File_Type').val(), Descriptions: $('#txt_comday_Description').val()
        });
        FrData.append('fileAtt', JSON.stringify(Data));

        var Save = $.ajax({
            type: 'POST',
            enctype: 'multipart/form-data',
            url: UrlOrigin + '/CustomerDay/AddFile',
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
            $('#txt_ticketid').val(Save.responseJSON.data.ticketId);
            AjaxListFilecomday($('#txt_ticketid').val());
            $('#modal-comday-upload').modal('hide');
        }
    }, 1500);

});
$('#ListPekerjaan').on('click', '#btn-comday-remove-work-item', function () {

    $(this).closest('.lsPekerjaan').remove();    
});
$('#btn-add-description-comday').click(function ()
{
    let Dt = `<div class="row lsPekerjaan">
        <div class="col-sm-12">
            <div class="card mb-2">
                <div class="card-body p-2">
                    <a style="color:#ff3366;cursor:pointer;" class="mb-2" id="btn-comday-remove-work-item">
                        <i class="icon icon-sm" data-feather="trash"></i> Hapus Pekerjaan
                    </a>
                    <div class="row mt-2">                    
                        <div class="col-sm-12">
                            <label class="control-label text-muted mb-1">Detail Pekerjaan <code>(Wajib Isi)</code></label>
                            <textarea type="text" class="form-control form-control-sm" placeholder="Detail Pekerjaan" id="txt_DetailPekerjaan" name="txt_DetailPekerjaan"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
    $('#ListPekerjaan').append(Dt);
    feather.replace();
});

function AjaxListFilecomday(TicketId) {
    if (TicketId != "") {

        $.ajax({
            type: 'GET',
            url: UrlOrigin + '/CustomerDay/GetListFile?TicketId=' + TicketId,
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

                $('#DtcomdayFile').DataTable().clear().draw();

                if (data.data.length != 0) {

                    for (var i = 0; i < data.data.length; i++) {
                        $('#DtcomdayFile').DataTable().row.add([
                            '<div class="btn-group me-2" role="group" aria-label="First group">' +
                            '<button type = "button" class= "btn btn-warning btn-icon-text" onclick = "ShowFileComday(' + data.data[i].id + ')" >' +
                            '<i class="btn-icon-append" data-feather="edit"></i> Edit</button > ' +
                            '<button type="button" class="btn btn-danger btn-icon-text" onclick="DeleteFileComday(' + data.data[i].id + ')">' +
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

function ShowFileComday(Id) {

    Swal.fire({
        title: 'Loading...',
        showConfirmButton: false,
        allowOutsideClick: false,
        onBeforeOpen: () => {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');

            setTimeout(() => {
                AjaxShowFileComday(Id);
            }, 1500);
        },
        onClose: () => {
            Swal.close();
        }
    });
}

function DeleteFileComday(Id) {
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
                AjaxDeleteFileComdayById(Id);
            }, 1500);

        }
    });
}

function AjaxShowFileComday(Id) {

    $.ajax({
        type: 'GET',
        url: UrlOrigin + '/CustomerDay/GetFileById?Id=' + Id,
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

            $('#detail-file-comday').attr('hidden', true);
            $('#detail-img-comday').addClass('hide');

            if (data.data.mimeType.toLowerCase().indexOf("image") >= 0) {
                $('#modal-comday').modal('show');
                $('#detail-img-comday').removeClass('hide');
                $('#detail-img-comday').attr("alt", data.data.fileName.toUpperCase());
                $('#detail-img-comday').attr("src", "/" + data.data.path);
            }
            else if (data.data.mimeType.toLowerCase().indexOf("office") >= 0) {
                window.location.replace(UrlOrigin + "/" + data.data.path);
            }
            else {
                $('#modal-comday').modal('show');
                $('#detail-file-comday').attr('hidden', false);
                $('#detail-file-comday').attr("alt", data.data.fileName.toUpperCase());
                $('#detail-file-comday').attr("src", "/" + data.data.path);
            }
            Swal.close();
        }
    });
}

function AjaxDeleteFileComdayById(Id) {
    var DeleteId = $.ajax({
        url: origin + '/CustomerDay/DeleteFileById?Id=' + Id,
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

        AjaxListFilecomday($('#txt_ticketid').val());
    }
};

function AjaxDeleteComdayById(Id) {
    var DeleteId = $.ajax({
        url: origin + '/CustomerDay/DeleteById?Id=' + Id,
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

        setTimeout(function () {
            window.location.replace(UrlOrigin + '/customerday');
        })
    }
};

function ShowDetailComday(Id) {
    if (Id == undefined) {
        window.location.replace(UrlOrigin + '/customerday/detail');
    }
    else {
        window.location.replace(UrlOrigin + '/customerday/detail?Id=' + Id);
    }
}

function DeleteComday(Id) {
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
                AjaxDeleteComdayById(Id);
            }, 1500);

        }
    });
}

function SubmitComDay(SubmitId)
{
    if (Number(SubmitId) == 1)
    {
        if ($('#ddl_aplikasi').val() == '0') {
            if ($('#txt_UsulanAplikasi').val() == '') {
                swal('Mohon isi Nama Aplikasi.');
                return;
            }
        }
        if ($('#ddl_aplikasi').val() == 'All') {
            swal('Mohon isi Pilih Aplikasi.');
            return;
        }
        if ($('input[name="rd_kategori"]:checked').val()== undefined) {
            swal('Mohon Pilih Kategori.');
            return;
        }
        if ($('#ddl_targetuser').val() == 'All') {
            swal('Mohon Target Go Live User.');
            return;
        }        
        if ($('#txt_summary').val() == '') {
            swal('Mohon isi Deskripsi.');
            return;
        }
        if ($('.lsPekerjaan').length == 0) {
            swal('Mohon isi Detail Pekerjaan.');
            return;
        }
    }
        
    let DtForm = $('#frmCustomerDay');
    let DtDisabled = DtForm.find(':input:disabled');
    DtForm.find(':input:disabled').removeAttr('disabled');

    let frmData = DtForm.serializeArray();
    FrData = new FormData();

    $.each(frmData, function (key, input) {
        FrData.append(input.name, $.trim(input.value));
    });

    DtDisabled.attr('disabled', true);
    FrData.append("SubmitId", SubmitId);

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
                    url: UrlOrigin + '/CustomerDay/PocessComday',
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

                            window.location.replace(UrlOrigin + '/CustomerDay/detail?Id=' + data.data.id);

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
function ComDayPersetujuanManagerPIC(SubmitId)
{
    if ($('#txt_reasonManagerPIC').val() == '') {
        swal('Mohon isi Feedback Manager PIC.');
        return;
    }

    let DtForm = $('#frmCustomerDay');
    let DtDisabled = DtForm.find(':input:disabled');
    DtForm.find(':input:disabled').removeAttr('disabled');

    let frmData = DtForm.serializeArray();
    FrData = new FormData();

    $.each(frmData, function (key, input) {
        FrData.append(input.name, $.trim(input.value));
    });

    DtDisabled.attr('disabled', true);
    FrData.append("FlagPersetujuan", SubmitId);

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
                    url: UrlOrigin + '/CustomerDay/PersetujuanManagerPIC',
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

                            window.location.replace(UrlOrigin + '/CustomerDay/detail?Id=' + data.data.id);

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
function SendCommentComDay()
{
    let DtForm = $('#frmCustomerDay');
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
                    url: UrlOrigin + '/CustomerDay/SendComment',
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
                            AjaxListActivityComDay($('#txt_ticketid').val());
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
function ProcessBd(SubmitId)
{
    if (Number(SubmitId) == 24) {
        if ($('#ddl_prioritas').val() == '') {
            swal('Mohon Pilih Prioritas.');
            return;
        }
        if ($('#ddl_executor').val() == '') {
            swal('Mohon Pilih Executor.');
            return;
        }
        if ($('#ddl_targetict').val() == '') {
            swal('Mohon Pilih Target ICT.');
            return;
        }
        if ($('#ddl_developer').val().length == 0) {
            swal('Mohon Pilih Developer.');
            return;
        }
        if ($('#txt_NoteBd').val() == '') {
            swal('Mohon isi Note.');
            return;
        }
    }
    else if (Number(SubmitId) == 27)
    {
        if ($('#txt_NoteBd').val() == '') {
            swal('Mohon isi Note.');
            return;
        }
    }

    let DtForm = $('#frmCustomerDay');
    let DtDisabled = DtForm.find(':input:disabled');
    DtForm.find(':input:disabled').removeAttr('disabled');

    let frmData = DtForm.serializeArray();
    FrData = new FormData();

    $.each(frmData, function (key, input) {
        FrData.append(input.name, $.trim(input.value));
    });

    DtDisabled.attr('disabled', true);
    FrData.append("ActionId", SubmitId);

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
                    url: UrlOrigin + '/CustomerDay/PocessBd',
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

                            window.location.replace(UrlOrigin + '/CustomerDay/detail?Id=' + data.data.id);

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
function ProcessDeveloper()
{
    if (Number($('#h_StatusId').val())!=24) {
        if ($('#ddl_progress').val() == 'All') {
            swal('Mohon Pilih Progress.');
            return;
        }
        if (Number($('#h_latestprogress').val()) - 1 > Number($('#ddl_progress').val())) {
            swal('Mohon Pilih Progress harus lebih tinggi dari ' + $('#h_latestprogress').val() + ' %.');
            return;
        }
    }
    
    
    let DtForm = $('#frmCustomerDay');
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
                    url: UrlOrigin + '/CustomerDay/PocessDeveloper',
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

                            window.location.replace(UrlOrigin + '/CustomerDay/detail?Id=' + data.data.id);

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
function AjaxListActivityComDay(TicketId) {
    if (TicketId != "") {

        $.ajax({
            type: 'GET',
            url: UrlOrigin + '/CustomerDay/GetComment?TicketId=' + TicketId,
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
                    StrContent = "<li class='timeline-item mb-3'>" +
                        "<span class='timeline-icon-primary'>" +
                        "<i class='fas fa-pencil-alt fa-sm fa-fw'></i>" +
                        "</span>" +
                        "<h6>" + data.data[i].log_Title +"</h6>" +
                        "<p class='tx-12'>" + data.data[i].createdAtFormated + "</p>" +
                        "<div class='form-group card p-2 text-white bg-secondary'>" +
                        data.data[i].log_Message +
                        "</div>" +
                        "</li>";                    

                    $('#Ul-ActivityLog').append(StrContent);
                }

                $(".focusview").get(0).scrollIntoView({ behavior: 'smooth' });
                Swal.close();
            }
        });
    }
};
