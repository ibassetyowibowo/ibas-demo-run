
function getChangeRequestByStatus(status, developer) {
    
    let requestUrl = "/ChangeRequest/developerTaskDetail?";
    $.ajax({
        type: 'GET',
        headers: {'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')},
        url: requestUrl + 'status=' + status + '&developer=' + developer,
        //data: formData, //formDataSerialize,
        processData: false,                   
        cache: false,
        contentType: false,
        //dataType: "json",
        //encode: true,
        timeout: 800000,
        beforeSend:function(XMLHttpRequest) {
            //show loader
            //$('#loader-form').fadeIn();//show(250);
            showLoader('Mohon menunggu, sedang menampilkan <strong>Data</strong>.');
        },
        success: function (data) {
            //let res = JSON.parse(response);
            //$("#output").text(data);
            console.log("SUCCESS : ", data);
            debugger
            showRequestList(data);
            Swal.close();

            //display alert success
            //Swal.fire("Success", "Change request berhasil dibuat.", "success");

        },
        error: function (e) {
            
            let res = JSON.parse(e.responseText);
            
            Swal.close();

            Swal.fire("Failed", "Maaf, Tidak dapat menampilkan data.", "error");
        },
    });
    
}

function showRequestList(data) {
    $('#taskDetailModal').modal('toggle');

    $('#dataTable2 tbody').empty();

    for (var i = 0; i < data.length; i++) {
        let badgeStyle = 'success';
        var row = '<tr>' +
            '<td>' + (i + 1) + '</td>' +
            '<td>' + data[i].usulan_aplikasi + '</td>' +
            '<td class="text-center">' + (data[i].created_at ? new Date(data[i].created_at).toLocaleDateString() : '-') + '</td>' +
            '<td class="text-center">' + (data[i].start_date ? new Date(data[i].start_date).toLocaleDateString() : '-') + '</td>' +
            '<td class="text-center">' + (data[i].end_date ? new Date(data[i].end_date).toLocaleDateString() : '-') + '</td>' +
            '<td>' + data[i].pic + '</td>' +
            '<td>' +
            '<div class="progress-group">' +
            '<span class="text-muted tx-13">' + parseInt(data[i].progress_percentage ? data[i].progress_percentage : 0) + '%</span>' +
            '<div class="progress ht-10 mt-0">' +
            '<div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: ' + parseInt(data[i].progress_percentage ? data[i].progress_percentage : 0) + '%" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>' +
            '</div>' +
            '</div>' +
            '</td>' +

            '</tr>';
        $('#dataTable2 tbody').append(row);

        // After adding content to the DOM, replace Feather Icons inside the modal
        $('#taskDetailModal').on('shown.bs.modal', function () {
            feather.replace();
        });
    }
}