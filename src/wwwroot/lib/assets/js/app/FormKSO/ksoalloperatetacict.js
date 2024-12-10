

$(document).ready(function () {

    //$('.form-input-mst').prop('disabled', false);
    //if ($('#txt_ict_is_active_mst').val()) {
    //    $('.form-input-mst').prop('disabled', true);
    //}

    $('.form-input-prt').prop('disabled', false);
    if ($('#txt_ict_is_active_prt').val()) {
        $('.form-input-prt').prop('disabled', true);
    }

});

$('#btn-ict-MasterData-draft').click(function () {

    $('#txt_ict_SubModuleProcess').val('MST');
    $('#txt_ict_SubModuleProcessStatus').val('DRAFT');

    Swal.fire({
        title: "Apakah Anda yakin?",
        html: "Simpan <b>Master Data </b> sebagai draf & dapat diubah lagi kemudian!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Simpan sebagai Draf.",
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
            setTimeout(function () {

                saveDataKsoIct('MST', true);

            }, 500);
        }
    });
});

$('#btn-ict-perangkat-draft').click(function () {

    $('#txt_ict_SubModuleProcess').val('PRT');
    $('#txt_ict_SubModuleProcessStatus').val('DRAFT');

    Swal.fire({
        title: "Apakah Anda yakin?",
        html: "Simpan <b>Data Perangkat </b> sebagai draf & dapat diubah lagi kemudian!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Simpan sebagai Draf.",
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
            setTimeout(function () {

                saveDataKsoIct('PRT', true);

            }, 500);
        }
    });
});

$('#btn-ict-MasterData-submit').click(function () {

    $('#txt_ict_SubModuleProcess').val('MST');
    $('#txt_ict_SubModuleProcessStatus').val('SUBMIT');

    Swal.fire({
        title: "Apakah Anda yakin?",
        html: "Simpan <b>Master Data</b> dan kirim kepada reviewer.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Lanjutkan.",
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
            setTimeout(function () {

                saveDataKsoIct('MST', false);

            }, 500);
        }
    });

});

$('#btn-ict-perangkat-submit').click(function () {

    $('#txt_ict_SubModuleProcess').val('PRT');
    $('#txt_ict_SubModuleProcessStatus').val('SUBMIT');

    Swal.fire({
        title: "Apakah Anda yakin?",
        html: "Simpan data <b>Perangkat</b> dan kirim kepada reviewer.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Lanjutkan.",
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');
            setTimeout(function () {

                saveDataKsoIct('PRT', false);

            }, 500);
        }
    });

});

$('#btn-viewba-ict').click(function (e) {
    e.preventDefault();

    Swal.fire({
        title: 'Loading...',
        showConfirmButton: false,
        allowOutsideClick: false,
        onBeforeOpen: () => {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');

            setTimeout(() => {
                viewBaIct();
            }, 1500); // Delay in milliseconds (1.5 seconds)
        },
        onClose: () => {
            Swal.close();
        }
    });

});


function approvalActionTrigger(module, status, JabatanApproval) {

    if (module == 'KSO-ICT-MASTERDATA') {
        if (JabatanApproval == 'ASMEN' && $('#txt_ict_mst_AsmenReason').val() == '') {
            Swal.fire("Failed", "Mohon Isi Catatan Approval.", "error");
            return false;
        }
        else if (JabatanApproval == 'MANAGER' && $('#txt_ict_mst_ManagerReason').val() == '') {
            Swal.fire("Failed", "Mohon Isi Catatan Approval.", "error");
            return false;
        };
    }

    if (module == 'KSO-ICT-PERANGKAT') {
        if (JabatanApproval == 'ASMEN' && $('#txt_ict_prt_AsmenReason').val() == '') {
            Swal.fire("Failed", "Mohon Isi Catatan Approval.", "error");
            return false;
        }
        else if (JabatanApproval == 'MANAGER' && $('#txt_ict_prt_ManagerReason').val() == '') {
            Swal.fire("Failed", "Mohon Isi Catatan Approval.", "error");
            return false;
        };
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

                approvalKsoIctHandlerJs(module, status, JabatanApproval);

            }, 500);
        }
    });
}


function approvalFinalActionTrigger(module, status, JabatanApproval) {

    if (module == 'KSO-ICT-MASTERDATA') {
        if (JabatanApproval == 'SAM' && $('#txt_ict_mst_ConfirmNotes').val() == '') {
            Swal.fire("Failed", "Mohon Isi Catatan Approval.", "error");
            return false;
        }
    }

    if (module == 'KSO-ICT-PERANGKAT') {
        if (JabatanApproval == 'ASMEN' && $('#txt_ict_prt_ConfirmNotes').val() == '') {
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

                approvalFinalKsoIctHandlerJs(module, status, JabatanApproval);

            }, 500);
        }
    });
}


function approvalKsoIctHandlerJs(module, statusApproval, JabatanApproval) {

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
    GetIctDetailRls();
    FrData.append('LsIctDetail', JSON.stringify(LsIctDetail));
    FrData.append('LsIctDetailRls', JSON.stringify(LsIctDetailrls));
    FrData.append('ApprovalModule', module);
    FrData.append('ApprovalStatus', statusApproval);
    FrData.append('ApprovalJabatan', JabatanApproval);

    var Save = $.ajax({
        type: 'POST',
        enctype: 'multipart/form-data',
        url: UrlOrigin + '/FormKSO/ApprovalProcessKsoIct',
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

                const costCenterNo = $('#txt_ict_Mst_CostCenterNo').val()?.trim();
                if (module == 'KSO-ICT-MASTERDATA' && JabatanApproval == 'MANAGER' && costCenterNo) {
                    //IbosSubmitMasterStation(data.data.id);
                    window.location.replace(UrlOrigin + '/formkso/detail?Id=' + data.data.id);
                }
                else {
                    window.location.replace(UrlOrigin + '/formkso/detail?Id=' + data.data.id);
                }
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


function approvalFinalKsoIctHandlerJs(module, statusApproval, JabatanApproval) {

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
    FrData.append('LsIctDetail', JSON.stringify(LsIctDetail));
    FrData.append('ApprovalModule', module);
    FrData.append('ApprovalStatus', statusApproval);
    FrData.append('ApprovalJabatan', JabatanApproval);

    var Save = $.ajax({
        type: 'POST',
        enctype: 'multipart/form-data',
        url: UrlOrigin + '/FormKSO/ApprovalFinalProcessKsoIct',
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


function saveDataKsoIct(module, isdraft) {

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
    GetIctDetailRls();
    FrData.append('LsIctDetail', JSON.stringify(LsIctDetail));
    FrData.append('LsIctDetailRls', JSON.stringify(LsIctDetailrls));

    //if ($('#txt_ict_SubModuleProcessStatus').val() == "SUBMIT" && LsIctDetail.filter(w => w.Qty == 0).length == 7) {
    //    swal('Mohon Isi Item ICT.');
    //    return;
    //}

    var Save = $.ajax({
        type: 'POST',
        enctype: 'multipart/form-data',
        url: UrlOrigin + '/FormKSO/SaveDataKsoAllOperateIct',
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

function ShowFileIctFico() {

    Swal.fire({
        title: 'Loading...',
        showConfirmButton: false,
        allowOutsideClick: false,
        onBeforeOpen: () => {
            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');

            setTimeout(() => {
                PreviewDocumentFico($('#txt_TicketId').val(), 'FICO ICT');
            }, 1500);
        },
        onClose: () => {
            Swal.close();
        }
    });
}

function PreviewDocumentFico(TicketId, DocType) {

    $.ajax({
        type: 'POST',
        enctype: 'multipart/form-data',
        url: UrlOrigin + '/FormKSO/PreviewDocumentFico?TicketId=' + TicketId,
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

function viewBaIct() {

    const doctype = "BA ICT";
    $.ajax({
        type: 'POST',
        enctype: 'multipart/form-data',
        url: UrlOrigin + '/FormKSO/PreviewDocumentBa?TicketId=' + $('#txt_TicketId').val() + '&option=' + $('#txt_prt_downloadOption').val(),
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

function GetIctDetail() {
    var DtTable = $("#tbl_IctDetail tr.dataIct").map(function (index, elem) {
        var ret = [];

        $('.inputValueIct', this).each(function () {

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

    LsIctDetail = [];
    for (var i = 0; i < DtTable.length / 7; i++) {
        var DtIctDetail = {};
        if (i == 0) {
            DtIctDetail.NamaBarang = DtTable[i];
            DtIctDetail.Qty = DtTable[i + 1];
            DtIctDetail.QtyRls = DtTable[i + 2];
            DtIctDetail.Status = DtTable[i + 3];
            DtIctDetail.SerialNumber = DtTable[i + 4];
            DtIctDetail.Descriptions = DtTable[i + 5];
            DtIctDetail.IsConfirmed = DtTable[i + 6];
        }
        else {
            var i2 = i * 7;
            DtIctDetail.NamaBarang = DtTable[i2];
            DtIctDetail.Qty = DtTable[i2 + 1];
            DtIctDetail.QtyRls = DtTable[i2 + 2];
            DtIctDetail.Status = DtTable[i2 + 3];
            DtIctDetail.SerialNumber = DtTable[i2 + 4];
            DtIctDetail.Descriptions = DtTable[i2 + 5];
            DtIctDetail.IsConfirmed = DtTable[i2 + 6];
        }

        LsIctDetail.push(DtIctDetail);
    }
}

function GetIctDetailRls() {
    var DtTable = $("#tbl_IctDetailRls tr.dataIct").map(function (index, elem) {
        var ret = [];

        $('.inputValueIct', this).each(function () {
            var d = $(this).val() || $(this).text();
            ret.push(d);

        });
        return ret;
    });

    LsIctDetailrls = [];
    for (var i = 0; i < DtTable.length / 5; i++) {
        var DtIctDetail = {};
        if (i == 0) {
            DtIctDetail.NamaBarang = DtTable[i];
            DtIctDetail.Qty = DtTable[i + 1];
            DtIctDetail.Status = DtTable[i + 2];
            DtIctDetail.SerialNumber = DtTable[i + 3];
            DtIctDetail.Descriptions = DtTable[i + 4];
        }
        else {
            var i2 = i * 5;
            DtIctDetail.NamaBarang = DtTable[i2];
            DtIctDetail.Qty = DtTable[i2 + 1];
            DtIctDetail.Status = DtTable[i2 + 2];
            DtIctDetail.SerialNumber = DtTable[i2 + 3];
            DtIctDetail.Descriptions = DtTable[i2 + 4];
        }

        LsIctDetailrls.push(DtIctDetail);
    }
}

function sendStationToIbos(id) {

    const costCenterNo = $('#txt_ict_Mst_CostCenterNo').val()?.trim();
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

    if (costCenterNo) {
        IbosSubmitMasterStation();
    }
    else {
        Swal.fire("Failed", "Mohon isi Nomor Cost Center", "error");
    }
}

function FreezeKSOProcessIct(Id, KsoId, FreezeStatus, module) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger me-2'
        },
        buttonsStyling: false,
    })

    swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "Alasan Freeze " + FreezeStatus + " :",
        input: 'text',
        inputAttributes: {
            style: 'width: 400px;', // Adjust width as needed
            autocapitalize: 'off',
            autocorrect: 'off'
        },
        icon: 'warning',
        showCancelButton: true,
        confirmButtonClass: 'me-2 btn-custom-swa',
        confirmButtonText: 'Submit',
        cancelButtonText: 'Cancel',
        reverseButtons: true,
        preConfirm: (inputValue) => {
            if (!inputValue) {
                Swal.showValidationMessage('Kolom alasan tidak boleh kosong');
            }
            return inputValue;
        }
    }).then((result) => {
        if (result.value) {

            showLoader('Mohon menunggu, sedang memproses <strong>Data</strong>.');

            var dataRequest = JSON.stringify({
                Id: Id,
                KsoId: KsoId,
                FreezeStatus: FreezeStatus,
                FreezeReason: result.value,
                Module: module
            });

            setTimeout(function () {

                $.ajax({
                    url: UrlOrigin + '/FormKSO/FreezeKSOProcessIct',
                    type: 'POST',
                    data: dataRequest,
                    dataType: "json",
                    cache: false,
                    async: false,
                    contentType: 'application/json',
                    processData: false,
                    data: dataRequest,
                    timeout: 800000,
                    success: function (data) {
                        Swal.close();
                        if (data.status != 200) {
                            Swal.fire("Failed", "Data tidak berhasil di process.", "error");
                        } else {
                            Swal.fire({
                                //position: 'top-end',
                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500
                            });

                            window.location.replace(UrlOrigin + '/formkso/detail?Id=' + KsoId);

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

        } else {
            if (
                // Read more about handling dismissals
                result.dismiss === Swal.DismissReason.cancel
            ) {
            }
        }

    })
}
