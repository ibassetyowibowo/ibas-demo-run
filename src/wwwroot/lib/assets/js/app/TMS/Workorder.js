
function CekSpeciment()
{    
    var Data = $.ajax({
        url: UrlOrigin + '/MasterTemplate/GetSpeciment?UserSSO=' + $('#BUH_val').val(),
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
    
    if (Data.responseJSON.error) {
        Swal.close();
        Swal.fire("Validation", "Oh no, Your Speciment Not Found. <br/>Please Insert Speciment in <a href='https://ibos.pertaminaretail.com/login/esign' target='_blank'>Visit Ibos Esign</a>", "warning");
        StData = 1;
    }
}

$('#btn-wo-reject').click(function () {
    if ($('#ticketComment').val() == '') {
        swal('Mohon isi komentar/pesan!.');
        return;
    }

    let frmData = $('#frmTicket').serializeArray();
    var formData = new FormData();
    formData.append('actionWo', "0");

    $.each(frmData, function (key, input) {
        formData.append(input.name, input.value);
    });

    showLoader('Mohon menunggu, sedang memprosess.');

    let requestUrl = '/WorkOrder/RejectWorkOrder';

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
                setTimeout(window.location.href = "Index", 1500);

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
    }, 1500);

    
});

$('#btn-wo-approve').click(function () {
    
    CekSpeciment();
    if (StData == 1) return
    let comment = $('#ticketComment').val();
    if (comment === '') {
        swal('Mohon isi komentar/pesan!.');
        return;
    }

    let frmData = $('#frmTicket').serializeArray();
    var formData = new FormData();
    formData.append('actionWo', "0");
    formData.append('UrlOrigin', origin);

    $.each(frmData, function (key, input) {
        formData.append(input.name, input.value);
    });

    showLoader('Mohon menunggu, sedang memprosess.');

    let requestUrl = '/WorkOrder/updateWorkOrder';

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
                setTimeout(window.location.href = "Index?status=11", 1500);

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
    }, 1500);

    
});