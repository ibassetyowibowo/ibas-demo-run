
var MCategoryId;
var MCategorySubId;
var MCategoryDetailId;
var StData;
var DtDdCategory;
var DtDdCategorySub;
var DtDdCategoryDetail;
var ModelTable;
var StData64;

$(function () {
    if (UrlPath.length > 2) {
        NamaController = UrlPath[UrlPath.length - 2];
    }
    else {
        NamaController = UrlPath[UrlPath.length - 1];
    }

    switch (NamaController) {
        case 'MasterTicket':
            break;
        case 'Category':
            GetListMasterCategory();
            break;
        case 'CategorySub':
            GetListMasterCategorySub();
            break;
        case 'CategoryDetail':
            GetListMasterCategoryDetail();
            break;
    }

    //#region Button trigger click Modal Show
    $('#btn-create-new-categori').click(function () {
        
        $('#PageList').hide(function () {
            $('#PageDetail').removeAttr('hidden');
            $('#PageDetail').show('fade')
        })

        ShowDetailKategori();        
        //$("#Modal_TicketCategory .modal-title").html("<i class='icon icon-lg' data-feather='plus-square'></i> &nbsp;New Ticket Category");
        //$('#Modal_TicketCategory').modal('toggle');
        $('#PageDetail .card-title').html("<i class='icon icon-lg' data-feather='plus-square'></i> &nbsp;New Ticket Category");
        feather.replace();        
        $('#txt_CategoryName').val('')
        $('#txt_CategoryDesc').val('')
        $('#btn-save-new-category').removeClass('hide');
        $('#btn-save-edit-category').addClass('hide');
    });

    $('#btn-create-new-categori-sub').click(function () {
        Ddl_Category();
        ShowDetailKategoriSub();        
        //$("#Modal_TicketCategorySub .modal-title").html("<i class='icon icon-lg' data-feather='plus-square'></i> &nbsp;New Ticket Category Sub");
        feather.replace();
        //$('#Modal_TicketCategorySub').modal('toggle');
        $('#txt_CategoryNameSub').val('')
        $('#btn-save-new-category-sub').removeClass('hide');
        $('#btn-save-edit-category-sub').addClass('hide');

        Ddl_Category();
    });

    $('#btn-create-new-categori-detail').click(function () {
        Ddl_Category();
        Ddl_CategorySub();
        ShowDetailKategoriDetail();        
        //$("#Modal_TicketCategoryDetail .modal-title").html("<i class='icon icon-lg' data-feather='plus-square'></i> &nbsp;New Ticket Category Detail");
        feather.replace();
        //$('#Modal_TicketCategoryDetail').modal('toggle');
        $('#txt_CategoryNameDetail').val('')
        $('#btn-save-new-category-detail').removeClass('hide');
        $('#btn-save-edit-category-detail').addClass('hide');

        Ddl_Category();
        Ddl_CategorySub();
    });

    //#endregion

    //#region Button trigger click save new
    $('#btn-save-new-category').click(function () {        
        OnClick_BtnSaveNewCategory();
    });

    $('#btn-save-new-category-sub').click(function () {
        debugger
        OnClick_BtnSaveNewCategorySub();
    });

    $('#btn-save-new-category-detail').click(function () {
        OnClick_BtnSaveNewCategoryDetail();
    });

    //#endregion

    //#region Button trigger click save edit
    $('#btn-save-edit-category').click(function () {
        OnClick_BtnSaveEditCategory();
    });

    $('#btn-save-edit-category-sub').click(function () {
        OnClick_BtnSaveEditCategorySub();
    });

    $('#btn-save-edit-category-detail').click(function () {
        OnClick_BtnSaveEditCategoryDetail();
    });
    //#endregion


    //#region Dropdown list on change
    $('#DdList_TicketCategory').on('select2:select', function (e) {
        Ddl_CategorySub(e.params.data.id);

    });
    //#endregion
});

//#region Oder
function DownloadLog(alamat, filename)
{
    //window.location.href = UrlOrigin +"/" + Path;
    //window.open(UrlOrigin + "/" + Path);
    let href = UrlOrigin + "/" + alamat;
    var a = document.createElement('a');
    a.href = href;
    a.download = filename;
    a.setAttribute('target', '_blank');
    a.click();    
}
function DeleteImageCategoryDetail() {
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
            $('#ImgNotExists').removeClass("hide");
            $('#ImgExists').addClass("hide");
            StData64 = undefined;
            files2 = [];
            $('#Img_CategoryDetail_Input').val('')
            $('#Img_CategoryDetailNotExists').removeAttr("alt");
            $('#Img_CategoryDetailNotExists').removeAttr("src");
            Swal.close();
        }
    });
};

$('#Img_CategoryDetail_Input').change(function () {
    inputFile2 = $('#Img_CategoryDetail_Input');
    files2 = [];

    for (let index = 0; index < inputFile2[0].files.length; index++) {
        let file = inputFile2[0].files[index];

        if (file.type.toLowerCase().indexOf("image") != 0) {
            Swal.fire("Failed", "File type Not Image", "warning");
            return
        }

        file.TmpUri = URL.createObjectURL(file);        

        $('#Img_CategoryDetailNotExists').attr("alt", file.name.split('.').pop().toUpperCase());
        $('#Img_CategoryDetailNotExists').attr("src", file.TmpUri);
        
        let reader = new FileReader();
        reader.addEventListener("load", function (evt) {
            StData64 = evt.target.result;
        });

        reader.readAsDataURL(this.files[0]);
        
        files2.push(file);
    }
});

function GetTypeCategory() {
    //if ($("#Modal_TicketCategory .modal-title").html().toLocaleLowerCase().indexOf('new')!=-1) {
    if ($("#PageDetail .card-title").html().toLocaleLowerCase().indexOf('new') != -1) {
        OnClick_BtnSaveNewCategory();
    }
    else {
        OnClick_BtnSaveEditCategory();
    }
}

function GetTypeCategorySub() {
    if ($("#PageDetail .card-title").html().toLocaleLowerCase().indexOf('new') != -1) {
        OnClick_BtnSaveNewCategorySub();
    }
    else {
        OnClick_BtnSaveEditCategorySub();
    }
}

function GetTypeCategoryDetail() {
    if ($("#PageDetail .card-title").html().toLocaleLowerCase().indexOf('new') != -1) {
        OnClick_BtnSaveNewCategoryDetail();
    }
    else {
        OnClick_BtnSaveEditCategoryDetail();
    }
}


//#endregion

//#region OnClick
function OnClick_BtnSaveNewCategory() {
    debugger
    if ($('#txt_CategoryName').val() == '') {
        Swal.fire("Validation", "Ticket Category Is Empty.", "warning");
        return
    }

    Swal.fire({
        title: "Do you want to save the changes?",
        text: "Save this ? You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it!"
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses data.');
            setTimeout(function () {
                NewCategory();
                //$('#Modal_TicketCategory').modal('toggle');
                ShowListKategori();
                setTimeout(function () {

                    if (StData == 200) {
                        Swal.fire(
                            'Save!',
                            'Your data has been Save.',
                            'success'
                        );
                    }
                }, 1500);
            }, 1500);
            
        }
    });

}

function OnClick_BtnSaveEditCategory() {
    if ($('#txt_CategoryName').val() == '') {
        Swal.fire("Validation", "Ticket Category Is Empty.", "warning");
        return
    }

    Swal.fire({
        title: "Do you want to save the changes?",
        text: "Save this ? You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it!"
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses data.');
            setTimeout(function () {
                UpdateCategoryById(MCategoryId);
                //$('#Modal_TicketCategory').modal('toggle');
                ShowListKategori();

                setTimeout(function () {

                    if (StData == 200) {
                        Swal.fire(
                            'Save!',
                            'Your data has been Save.',
                            'success'
                        );
                    }
                }, 1500);
            }, 1500);
            
        }
    });

}

function OnClick_BtnSaveNewCategorySub() {
    if ($('#DdList_TicketCategory').val() == 'All') {
        Swal.fire("Validation", "Ticket Category Is Empty.", "warning");
        return
    }

    if ($('#txt_CategoryNameSub').val() == '') {
        Swal.fire("Validation", "Ticket Category Sub Is Empty.", "warning");
        return
    }

    Swal.fire({
        title: "Do you want to save the changes?",
        text: "Save this ? You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it!"
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses data.');
            setTimeout(function () {
                NewCategorySub();
                if (StData == 200) {
                    ShowListKategoriSub();
                    setTimeout(function () {

                        if (StData == 200) {
                            Swal.fire(
                                'Save!',
                                'Your data has been Save.',
                                'success'
                            );
                        }
                    }, 1500);
                    //$('#Modal_TicketCategorySub').modal('toggle');
                }
            }, 1500);
            
        }
    });

}

function OnClick_BtnSaveEditCategorySub() {
    if ($('#DdList_TicketCategory').val() == 'All') {
        Swal.fire("Validation", "Ticket Category Is Empty.", "warning");
        return
    }

    if ($('#txt_CategoryNameSub').val() == '') {
        Swal.fire("Validation", "Ticket Category Sub Is Empty.", "warning");
        return
    }

    Swal.fire({
        title: "Do you want to save the changes?",
        text: "Save this ? You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it!"
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses data.');
            setTimeout(function () {
                UpdateCategorySubById(MCategorySubId);
                //$('#Modal_TicketCategorySub').modal('toggle');
                ShowListKategoriSub();
                setTimeout(function () {

                    if (StData == 200) {
                        Swal.fire(
                            'Save!',
                            'Your data has been Save.',
                            'success'
                        );
                    }
                }, 1500);
            }, 1500);
            
        }
    });

}

function OnClick_BtnSaveNewCategoryDetail() {
    if ($('#DdList_TicketCategory').val() == 'All') {
        Swal.fire("Validation", "Ticket Category Is Empty.", "warning");
        return
    }

    if ($('#DdList_TicketCategorySub').val() == 'All') {
        Swal.fire("Validation", "Ticket Category Sub Is Empty.", "warning");
        return
    }

    if ($('#txt_CategoryNameDetail').val() == '') {
        Swal.fire("Validation", "Ticket Category Detail Is Empty.", "warning");
        return
    }

    if (StData64==undefined) {
        Swal.fire("Validation", "Ticket Category Image Is Empty.", "warning");
        return
    }

    MCategorySubId = $('#DdList_TicketCategorySub').val();

    Swal.fire({
        title: "Do you want to save the changes?",
        text: "Save this ? You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it!"
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses data.');
            setTimeout(function () {
                NewCategoryDetail();
                ShowListKategoriDetail();
                setTimeout(function () {
                    if (StData == 200) {
                        Swal.fire(
                            'Save!',
                            'Your data has been Save.',
                            'success'
                        );
                    }
                }, 1500);
            }, 1500);
            
            //if (StData == 200) {
            //    $('#Modal_TicketCategoryDetail').modal('toggle');
            //}
        }
    });


}

function OnClick_BtnSaveEditCategoryDetail() {
    if ($('#DdList_TicketCategory').val() == 'All') {
        Swal.fire("Validation", "Ticket Category Is Empty.", "warning");
        return
    }

    if ($('#DdList_TicketCategorySub').val() == 'All') {
        Swal.fire("Validation", "Ticket Category Sub Is Empty.", "warning");
        return
    }

    if ($('#txt_CategoryNameDetail').val() == '') {
        Swal.fire("Validation", "Ticket Category Detail Is Empty.", "warning");
        return
    }

    if (StData64 == undefined) {
        Swal.fire("Validation", "Ticket Category Image Is Empty.", "warning");
        return
    }

    Swal.fire({
        title: "Do you want to save the changes?",
        text: "Save this ? You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it!"
    }).then((result) => {
        if (result.isConfirmed) {
            showLoader('Mohon menunggu, sedang memproses data.');
            setTimeout(function () {
                UpdateCategoryDetailById(MCategoryDetailId);
                ShowListKategoriDetail();
                setTimeout(function () {

                    if (StData == 200) {
                        Swal.fire(
                            'Save!',
                            'Your data has been Save.',
                            'success'
                        );
                    }
                }, 1500);
            }, 1500);
            
            //$('#Modal_TicketCategoryDetail').modal('toggle');
        }
    });


}

//#endregion

//#region Show List
function ShowListKategori() {
    $('#PageDetail').hide(function () {
        $('#PageList').attr('hidden');
        $('#PageList').show('fade')
    })

    GetListMasterCategory();
}
function ShowListKategoriSub() {
    $('#PageDetail').hide(function () {
        $('#PageList').attr('hidden');
        $('#PageList').show('fade')
    })

    GetListMasterCategorySub();
}
function ShowListKategoriDetail() {
    $('#PageDetail').hide(function () {
        $('#PageList').attr('hidden');
        $('#PageList').show('fade')
    })

    GetListMasterCategoryDetail();
}
//#endregion

//#region Show Detail Modal
function ShowMCategoryById(Id) {
    ShowDetailKategori(Id);
    return
    $("#Modal_TicketCategory .modal-title").html("<i class='icon icon-lg' data-feather='edit'></i> &nbsp;Edit Ticket Category");
    feather.replace();
    $('#Modal_TicketCategory').modal('toggle');
    $('#txt_CategoryName').val('');
    $('#txt_CategoryDesc').val('');

    $('#btn-save-new-category').addClass('hide');
    $('#btn-save-edit-category').removeClass('hide');

    GetMasterCategoryById(Id);
}
function ShowMCategorySubById(Id) {
    ShowDetailKategoriSub(Id);
    return
    $("#Modal_TicketCategorySub .modal-title").html("<i class='icon icon-lg' data-feather='edit'></i> &nbsp;Edit Ticket Category Sub");
    feather.replace();
    $('#Modal_TicketCategorySub').modal('toggle');
    $('#txt_SubCategoryName').val('')

    $('#btn-save-new-category-sub').addClass('hide');
    $('#btn-save-edit-category-sub').removeClass('hide');

    GetMasterCategorSubyById(Id);
}
function ShowMCategoryDetailById(Id) {
    ShowDetailKategoriDetail(Id);
    return;
    $("#Modal_TicketCategoryDetail .modal-title").html("<i class='icon icon-lg' data-feather='edit'></i> &nbsp;Edit Ticket Category Detail");
    feather.replace();
    $('#Modal_TicketCategoryDetail').modal('toggle');
    $('#txt_CategoryNameDetail').val('')

    $('#btn-save-new-category-detail').addClass('hide');
    $('#btn-save-edit-category-detail').removeClass('hide');
    
    GetMasterCategorDetailyById(Id);

}

function ShowDetailKategori(Id) {

    $('#PageList').hide(function () {
        $('#PageDetail').removeAttr('hidden');
        $('#PageDetail').show('fade')
    })
    if (Id != undefined) {
        $('#PageDetail .card-title').html("<i class='icon icon-lg' data-feather='edit'></i> &nbsp;Edit Kategori");
        $('#btn-save-new-category').addClass('hide');
        $('#btn-save-edit-category').removeClass('hide');
        GetMasterCategoryById(Id);
    }
    else {
        $('#PageDetail .card-title').html("<i class='icon icon-lg' data-feather='plus-square'></i> &nbsp;New Kategori");
        $('#txt_CategoryName').val('');
        $('#btn-save-new-category').removeClass('hide');
        $('#btn-save-edit-category').addClass('hide');
    }
}

function ShowDetailKategoriSub(Id) {

    $('#PageList').hide(function () {
        $('#PageDetail').removeAttr('hidden');
        $('#PageDetail').show('fade')
    })
    if (Id != undefined) {
        $('#PageDetail .card-title').html("<i class='icon icon-lg' data-feather='edit'></i> &nbsp;Edit Kategori Sub");
        $('#btn-save-new-category-sub').addClass('hide');
        $('#btn-save-edit-category-sub').removeClass('hide');
        GetMasterCategorSubyById(Id);
    }
    else {
        $('#PageDetail .card-title').html("<i class='icon icon-lg' data-feather='plus-square'></i> &nbsp;New Kategori Sub");
        $('#txt_CategoryNameSub').val('')
        $('#btn-save-new-category-sub').removeClass('hide');
        $('#btn-save-edit-category-sub').addClass('hide');
    }
}

function ShowDetailKategoriDetail(Id) {

    $('#PageList').hide(function () {
        $('#PageDetail').removeAttr('hidden');
        $('#PageDetail').show('fade')
    })
    if (Id != undefined) {
        $('#PageDetail .card-title').html("<i class='icon icon-lg' data-feather='edit'></i> &nbsp;Edit Kategori Detail");
        $('#btn-save-new-category-detail').addClass('hide');
        $('#btn-save-edit-category-detail').removeClass('hide');
        GetMasterCategorDetailyById(Id);
    }
    else {
        $('#PageDetail .card-title').html("<i class='icon icon-lg' data-feather='plus-square'></i> &nbsp;New Kategori Detail");
        $('#txt_CategoryNameDetail').val('');
        $('#btn-save-new-category-detail').removeClass('hide');
        $('#btn-save-edit-category-detail').addClass('hide');
    }
}
//#endregion

//#region GetList
function GetListMasterCategory() {
    
    showLoader('Mohon menunggu, sedang menyiapkan data.');
    setTimeout(function () {
        $.ajax({
            type: 'GET',
            url: UrlOrigin + '/MasterTicket/GetListCategory',
            dataType: 'json',
            cache: false,
            async: true,
            //beforeSend: function (XMLHttpRequest) {
            //    showLoader('Mohon menunggu, sedang menyiapkan data.');
            //},
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

                $('#dataTable2').DataTable().clear().draw();

                if (data.data.length != 0) {

                    var NoUrut = 1;
                    for (var i = 0; i < data.data.length; i++) {
                        $('#dataTable2').DataTable().row.add([
                            '<div class="btn-group me-2" role="group" aria-label="First group">' +
                            '<button type = "button" class= "btn btn-warning btn-icon-text" onclick = "ShowMCategoryById(' + data.data[i].id + ')" >' +
                            '<i class="btn-icon-append" data-feather="edit"></i> Edit</button > ' +
                            '<button type="button" class="btn btn-danger btn-icon-text" onclick="DeleteMCategoryById(' + data.data[i].id + ')">' +
                            '<i class="btn-icon-append" data-feather="delete"></i> Delete</button ></div > '
                            , NoUrut
                            , data.data[i].nameCategory
                            , data.data[i].creator
                            , data.data[i].updater
                        ]).draw();
                        NoUrut = NoUrut + 1;
                    }
                    feather.replace()
                }

                Swal.close();

                ModelTable = $('#dataTable2').DataTable();
                new $.fn.dataTable.FixedColumns(ModelTable).left();
            }
        });

    }, 1500);
    
};

function GetListMasterCategorySub() {
    showLoader('Mohon menunggu, sedang menyiapkan data.');
    setTimeout(function () {
        $.ajax({
            type: 'GET',
            url: UrlOrigin + '/MasterTicket/GetListCategorySub',
            dataType: 'json',
            cache: false,
            async: true,
            //beforeSend: function (XMLHttpRequest) {
            //    
            //},
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

                $('#dataTable2').DataTable().clear().draw();

                if (data.data.listData.length != 0) {

                    for (var i = 0; i < data.data.listData.length; i++) {
                        $('#dataTable2').DataTable().row.add([
                            '<div class="btn-group me-2" role="group" aria-label="First group">' +
                            '<button type = "button" class= "btn btn-warning btn-icon-text" onclick = "ShowMCategorySubById(' + data.data.listData[i].id + ')" >' +
                            '<i class="btn-icon-append" data-feather="edit"></i> Edit</button > ' +
                            '<button type="button" class="btn btn-danger btn-icon-text" onclick="DeleteMCategorySubById(' + data.data.listData[i].id + ')">' +
                            '<i class="btn-icon-append" data-feather="delete"></i> Delete</button ></div > '
                            , data.data.listData[i].recid
                            , data.data.listData[i].nameCategory
                            , data.data.listData[i].nameCategorySub
                            , data.data.listData[i].creator
                            , data.data.listData[i].updater
                        ]).draw();
                    }
                    feather.replace();
                }

                Swal.close();

                ModelTable = $('#dataTable2').DataTable();
                new $.fn.dataTable.FixedColumns(ModelTable).left();
            }
        });

    }, 1500);
    
};

function GetListMasterCategoryDetail() {
    showLoader('Mohon menunggu, sedang menyiapkan data.');
    setTimeout(function () {
        $.ajax({
            type: 'GET',
            url: UrlOrigin + '/MasterTicket/GetListCategoryDetail',
            dataType: 'json',
            cache: false,
            async: true,
            //beforeSend: function (XMLHttpRequest) {
            //    showLoader('Mohon menunggu, sedang menyiapkan data.');
            //},
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
                $('#dataTable2').DataTable().clear().draw();
                

                if (data.data.listData.length != 0) {
                    for (var i = 0; i < data.data.listData.length; i++) {
                        $('#dataTable2').DataTable().row.add([
                            '<div class="btn-group me-2" role="group" aria-label="First group">' +
                            '<button type = "button" class= "btn btn-warning btn-icon-text" onclick = "ShowMCategoryDetailById(' + data.data.listData[i].id + ')" >' +
                            '<i class="btn-icon-append" data-feather="edit"></i> Edit</button > ' +
                            '<button type="button" class="btn btn-danger btn-icon-text" onclick="DeleteMCategoryDetailById(' + data.data.listData[i].id + ')">' +
                            '<i class="btn-icon-append" data-feather="delete"></i> Delete</button ></div > '
                            , data.data.listData[i].recid
                            , data.data.listData[i].nameCategory
                            , data.data.listData[i].nameCategorySub
                            , data.data.listData[i].nameCategorySubDetail
                            , '<img src="/' + data.data.listData[i].image + '" alt="image">'
                            , data.data.listData[i].creator
                            , data.data.listData[i].updater
                        ]).draw();
                    }
                    feather.replace();

                }

                Swal.close();

                ModelTable = $('#dataTable2').DataTable();
                new $.fn.dataTable.FixedColumns(ModelTable).left();
                
            }
        });
    }, 1500);
    
};

//#endregion GetList

//#region GetById

function GetMasterCategoryById(Id) {
    MCategoryId = Id;
    showLoader('Mohon menunggu, sedang memproses data.');
    setTimeout(function () {
        var DetailId = $.ajax({
            url: origin + '/MasterTicket/GetCategoryById?Id=' + Id,
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
        if (DetailId.status != 200) {
            Swal.fire("Failed", "Gagal memproses data.", "error");
        }
        else {
            $('#txt_CategoryName').val(DetailId.responseJSON.data.nameCategory);
            $('#txt_CategoryDesc').val(DetailId.responseJSON.data.categoryDescription);
        }
    }, 1500);
    
};

function GetMasterCategorSubyById(Id) {
    MCategorySubId = Id;
    showLoader('Mohon menunggu, sedang memproses data.');
    setTimeout(function () {
        var DetailId = $.ajax({
            url: origin + '/MasterTicket/GetCategorySubById?Id=' + Id,
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
        if (DetailId.status != 200) {
            Swal.fire("Failed", "Gagal memproses data.", "error");
        }
        else {
            Ddl_Category();
            setTimeout(function () {
                MCategoryId = DetailId.responseJSON.data.ticketCategoryId;
                $('#DdList_TicketCategory').val(DetailId.responseJSON.data.ticketCategoryId).trigger('change');
                $('#txt_CategoryNameSub').val(DetailId.responseJSON.data.nameCategorySub);
            }, 400);

        }
    }, 1500);
    
};

function GetMasterCategorDetailyById(Id) {
    files2 = [];
    StData64 = undefined;
    MCategoryDetailId = Id;
    showLoader('Mohon menunggu, sedang memproses data.');
    setTimeout(function () {
        var DetailId = $.ajax({
            url: origin + '/MasterTicket/GetCategoryDetailById?Id=' + Id,
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
        if (DetailId.status != 200) {
            Swal.fire("Failed", "Gagal memproses data.", "error");
        }
        else {
            Ddl_Category();
            Ddl_CategorySub(DetailId.responseJSON.data.ticketCategoryId);
            setTimeout(function () {
                
                MCategoryId = DetailId.responseJSON.data.ticketCategoryId;
                MCategorySubId = DetailId.responseJSON.data.ticketCategorySubId;
                $('#DdList_TicketCategory').val(DetailId.responseJSON.data.ticketCategoryId).trigger('change');
                $('#DdList_TicketCategorySub').val(DetailId.responseJSON.data.ticketCategorySubId).trigger('change');
                $('#txt_CategoryNameDetail').val(DetailId.responseJSON.data.nameCategorySubDetail);
                if (DetailId.responseJSON.data.image == null) {
                    $('#ImgNotExists').removeClass("hide");
                    $('#ImgExists').addClass("hide");
                }
                else {
                    
                    $('#ImgNotExists').addClass("hide");
                    $('#ImgExists').removeClass("hide");
                    $('#Img_CategoryDetail_link').attr("href", "/"+ DetailId.responseJSON.data.image) ;
                    $('#Img_CategoryDetail_link').attr("title", DetailId.responseJSON.data.imageName) ;
                    $('#Img_CategoryDetailExist').attr("src", "/"+ DetailId.responseJSON.data.image) ;
                    $('#Img_CategoryDetailExist').attr("alt", DetailId.responseJSON.data.image.split(".")[1].toUpperCase()) ;
                    $('#Img_CategoryDetail_NamaFile').html(DetailId.responseJSON.data.imageName) ;
                    $('#Img_CategoryDetail_Date').html(DetailId.responseJSON.data.imageDate) ;
                    $('#Img_CategoryDetail_ByUser').html(DetailId.responseJSON.data.updated_by) ;
                    $('#btn-remove-Img_CategoryDetail').attr("onclick", "DeleteImageCategoryDetail()");
                    StData64 = DetailId.responseJSON.data.image;
                }
                
            }, 1000);
        }
    }, 1500);
    
};

//#endregion GetById

//#region DeleteById
function DeleteMCategoryById(Id) {
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
                AjaxDeletedMCategoryById(Id);
                setTimeout(function () {

                    if (StData == 200) {
                        Swal.fire(
                            'Delete!',
                            'Your data has been Delete.',
                            'success'
                        );
                        setTimeout(function () { ShowListKategori() }, 1500);
                    }
                }, 1500);
            }, 1500);
            
        }
    });
};

function DeleteMCategorySubById(Id) {
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
                AjaxDeletedMCategorySubById(Id);
                setTimeout(function () {

                    if (StData == 200) {
                        Swal.fire(
                            'Delete!',
                            'Your data has been Delete.',
                            'success'
                        );
                        setTimeout(function () { ShowListKategoriSub() }, 1500);
                    }
                }, 1500);
            }, 1500);
            
        }
    });
};

function DeleteMCategoryDetailById(Id) {
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
                AjaxDeletedMCategoryDetailById(Id);
                setTimeout(function () {

                    if (StData == 200) {
                        Swal.fire(
                            'Delete!',
                            'Your data has been Delete.',
                            'success'
                        );
                        setTimeout(function () { ShowListKategoriDetail() }, 1500);
                    }
                }, 1500);
            }, 1500);
            
        }
    });
};

function AjaxDeletedMCategoryById(Id) {
    var DeleteId = $.ajax({
        url: origin + '/MasterTicket/DeleteCategoryById?Id=' + Id,
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

    StData = DeleteId.status;
    if (DeleteId.status != 200) {
        Swal.fire("Failed", "Gagal memproses data.", "error");
    }
}

function AjaxDeletedMCategorySubById(Id) {
    var DeleteId = $.ajax({
        url: origin + '/MasterTicket/DeleteCategorySubById?Id=' + Id,
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

    StData = DeleteId.status;
    if (DeleteId.status != 200) {
        Swal.fire("Failed", "Gagal memproses data.", "error");
    }
}

function AjaxDeletedMCategoryDetailById(Id) {
    var DeleteId = $.ajax({
        url: origin + '/MasterTicket/DeleteCategoryDetailById?Id=' + Id,
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

    StData = DeleteId.status;
    if (DeleteId.status != 200) {
        Swal.fire("Failed", "Gagal memproses data.", "error");
    }
}

function AjaxDeteleImageCategoryDetailById(Id) {
    var DeleteId = $.ajax({
        url: origin + '/MasterTicket/DeleteCategoryDetailImageById?Id=' + Id,
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

    StData = DeleteId.status;
    if (DeleteId.status != 200) {
        Swal.fire("Failed", "Gagal memproses data.", "error");
    }
}

//#endregion DeleteById

//#region Update
function UpdateCategoryById(Id) {
    var DataSave = new FormData();
    DataSave.append('Id', Id);
    DataSave.append('NameCategory', $('#txt_CategoryName').val());
    DataSave.append('CategoryDescription', $('#txt_CategoryDesc').val());

    var Update = $.ajax({
        url: origin + '/MasterTicket/UpdateCategoryById',
        type: 'POST',
        data: DataSave,
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
    StData = Update.status;
    if (Update.status != 200) {
        Swal.fire("Failed", "Gagal memproses data.", "error");
    }
};

function UpdateCategorySubById(Id) {
    var DataSave = new FormData();
    DataSave.append('Id', Id);
    DataSave.append('MCategoryId', $('#DdList_TicketCategory').val());
    DataSave.append('NameCategorySub', $('#txt_CategoryNameSub').val());


    var Update = $.ajax({
        url: origin + '/MasterTicket/UpdateCategorySubById',
        type: 'POST',
        data: DataSave,
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
    StData = Update.status;
    if (Update.status != 200) {
        Swal.fire("Failed", "Gagal memproses data.", "error");
    }
    else {
        GetListMasterCategorySub();
    }
};

function UpdateCategoryDetailById(Id) {

    var DataSave = new FormData();
    DataSave.append('Id', Id);
    DataSave.append('MCategorySubId', $('#DdList_TicketCategorySub').val());
    DataSave.append('NameCategorySubDetail', $('#txt_CategoryNameDetail').val());
    if (files2.length == 0) {
        DataSave.append('Filename', $('#Img_CategoryDetail_NamaFile').text());
    }
    else {
        DataSave.append('Filename', files2.pop().name);
    }
    DataSave.append('Base64String', StData64.split(",").pop());


    var Update = $.ajax({
        url: origin + '/MasterTicket/UpdateCategoryDetailById',
        type: 'POST',
        data: DataSave,
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
    StData = Update.status;
    if (Update.status != 200) {
        Swal.fire("Failed", "Gagal memproses data.", "error");
    }
    else {
        GetListMasterCategoryDetail();
    }
};
//#endregion

//#region Add
function NewCategory() {
    var Data = JSON.stringify({ NameCategory: $('#txt_CategoryName').val(), CategoryDescription: $('#txt_CategoryDesc').val() });

    var Save = $.ajax({
        url: origin + '/MasterTicket/AddCategory',
        type: 'POST',
        data: Data,
        dataType: "json",
        cache: false,
        async: false,
        contentType: 'application/json',
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
    StData = Save.status;
    if (Save.status != 200) {
        Swal.fire("Failed", "Gagal memproses data.", "error");
    }
}

function NewCategorySub() {

    var DtO = { TicketCategoryId: $('#DdList_TicketCategory').val(), NameCategorySub: $('#txt_CategoryNameSub').val() };
    var Data = JSON.stringify(DtO);

    var Save = $.ajax({
        url: origin + '/MasterTicket/AddCategorySub',
        type: 'POST',
        data: Data,
        dataType: "json",
        cache: false,
        async: false,
        contentType: 'application/json',
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
    StData = Save.status;
    if (Save.status != 200) {
        Swal.fire("Failed", "Gagal memproses data.", "error");
    }
}

function NewCategoryDetail() {
    debugger
    if (files2.length == 0) return;
    var DtO = { TicketCategorySubId: $('#DdList_TicketCategorySub').val(), NameCategorySubDetail: $('#txt_CategoryNameDetail').val(), Filename: files2.pop().name, Base64String: StData64.split(",").pop() };
    var Data = JSON.stringify(DtO);

    var Save = $.ajax({
        url: origin + '/MasterTicket/AddCategoryDetail',
        type: 'POST',
        data: Data,
        dataType: "json",
        cache: false,
        async: false,
        contentType: 'application/json',
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
    StData = Save.status;
    if (Save.status != 200) {
        Swal.fire("Failed", "Gagal memproses data.", "error");
    }
    else {
        GetListMasterCategoryDetail();
    }
}
//#endregion

//#region DropdownList
function Ddl_Category() {
    $.ajax({
        type: 'GET',
        url: origin + '/MasterTicket/DdListCategory',
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

            DtDdCategory = data;

            $('#DdList_TicketCategory').empty().trigger('change');

            $("#DdList_TicketCategory").append("<option value='All' selected>--Selected--</option>");
            for (var i = 0; i < data.data.length; i++) {
                $("#DdList_TicketCategory").append("<option value='" + data.data[i].id + "'>" + data.data[i].nameCategory + "</option>");
            }
            $('#DdList_TicketCategory').trigger('change');
        }
    });
}

function Ddl_CategorySub(CategoryId) {

    if (CategoryId == undefined) {
        $('#DdList_TicketCategorySub').empty().trigger('change');

        $("#DdList_TicketCategorySub").append("<option value='All' selected>--Selected--</option>");
        return
    }

    $.ajax({
        type: 'GET',
        url: origin + '/MasterTicket/DdListCategorySub?CategoryId=' + CategoryId,
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

            DtDdCategorySub = data;

            $('#DdList_TicketCategorySub').empty().trigger('change');

            $("#DdList_TicketCategorySub").append("<option value='All' selected>--Selected--</option>");
            for (var i = 0; i < data.data.length; i++) {
                $("#DdList_TicketCategorySub").append("<option value='" + data.data[i].id + "'>" + data.data[i].nameCategorySub + "</option>");
            }
            $('#DdList_TicketCategorySub').trigger('change');

        }
    });
}

function Ddl_CategoryDetail(CategorySubId) {
    $.ajax({
        type: 'GET',
        url: origin + '/MasterTicket/DdListCategoryDetail',
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

            DtDdCategoryDetail = data;

            $("#DdList_TicketCategory").append("<option value='All' selected>--Selected--</option>");
            for (var i = 0; i < data.data.length; i++) {
                $("#DdList_TicketCategory").append("<option value='" + +"'>" + +"</option>");
            }
            $('#DdList_TicketCategory').trigger('change');
        }
    });
}
//#endregion