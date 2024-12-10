var FaqId;
var FaqUrl;
var FaqDtList;
var FaqDtListCount;
var FaqQuest;
var FaqAnswer;
var DtDdFaq;

if (UrlPath.length > 2) {
    NamaController = UrlPath[UrlPath.length - 2];
}
else {
    NamaController = UrlPath[UrlPath.length - 1];
}
switch (NamaController) {
    case 'FAQ':
        AjaxGetList();
        $('.rating').starRating(
            {
                starsSize: 3,
                showInfo: false
            });

        $('.ResultRating').starRating(
            {
                starsSize: 2,
                showInfo: false,
                value: 3,
                cursor: false
            });
        break;
    case 'Search':
        $('#faq-search-list').html('');
        break;
    case 'TicketDetail':
        if ($(".RsRate").length) {            
            $('.RsRate').starRating(
                {
                    starsSize: 2,
                    showInfo: false,
                    value: $("#FeedbackRate").val() == "" ? 0 : Number($("#FeedbackRate").val()),
                    cursor: false
                });
        }
        break;
}

$('#txt-searchfaq').on("keypress", function (e) {
    if (e.which == 13) {
        debugger
        //AjaxGetList($('#txt-searchfaq').val());
        FaqSearch();
    }
});

$('#btn-save-new-faq').click(function () {
    if ($('#txt_KategoriFaq').val() == '') {
        Swal.fire("Validation", "Kategori Is Empty.", "warning");
        return
    }
    if ($('#txt_PertanyaanFaq').val() == '') {
        Swal.fire("Validation", "Pertanyaan Is Empty.", "warning");
        return
    }
    if (tinymce.activeEditor.getContent() == '') {
        Swal.fire("Validation", "Jawaban Is Empty.", "warning");
        return
    }

    Swal.fire({
        title: "Do you want to save the changes?",
        text: "Save this change request ? You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it!"
    }).then((result) => {
        if (result.isConfirmed) {
            AjaxSaveById();

            setTimeout(function () {

                if (StData == 200) {
                    Swal.fire(
                        'Save!',
                        'Your data has been Save.',
                        'success'
                    );

                    ShowListFaq();
                }
            }, 1500);
        }
    });    
});

$('#btn-save-edit-faq').click(function () {
    if ($('#txt_KategoriFaq').val() == '') {
        Swal.fire("Validation", "Kategori Is Empty.", "warning");
        return
    }
    if ($('#txt_PertanyaanFaq').val() == '') {
        Swal.fire("Validation", "Pertanyaan Is Empty.", "warning");
        return
    }
    if (tinymce.activeEditor.getContent() == '') {
        Swal.fire("Validation", "Jawaban Is Empty.", "warning");
        return
    }

    UpdateById(FaqId);
});

$('#DdList_Faq').on('select2:select', function (e) {
    FaqId = e.params.data.id;
});

if ($('#txt_tiny').length) {
    tinymce.init({
        selector: '#txt_tiny',
        height: 100,
        theme: 'silver',
        menubar: false,
        statusbar: false,
        plugins: [
            'paste autolink autosave save directionality',
            'image link media table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists',
            'imagetools textpattern noneditable charmap emoticons'
        ],
        toolbar1: 'undo redo | insert | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | forecolor backcolor emoticons table',
        image_advtab: true,
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

function Ddl_Faq() {

    if ($('#DdList_Faq').val() == undefined) return

    $.ajax({
        type: 'GET',
        url: origin + '/FAQ/DdlistFaq',
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

            DtDdFaq = data;

            $('#DdList_Faq').empty().trigger('change');

            $("#DdList_Faq").append("<option value='All' selected>--Selected--</option>");
            for (var i = 0; i < data.data.length; i++) {
                $("#DdList_Faq").append("<option value='" + data.data[i].id + "'>" + data.data[i].category + " - " + data.data[i].quest + "</option>");
            }
            $('#DdList_Faq').trigger('change');
        }
    });
}

function FaqSearch() {
    showLoader('Mohon menunggu, sedang menyiapkan data.');
    setTimeout(function () {
        
        FaqUrl = UrlOrigin + '/FAQ/GetAll?KeyWord=' + $('#txt-searchfaq').val();
        $.ajax({
            type: 'GET',
            //url: 'faq/GetAll',
            url: FaqUrl,
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

                FaqDtList = data.data.listData;
                FaqDtListCount = data.data.listData.length;

                if (FaqDtListCount == 0) return;

                var Dt = '';

                for (var i = 0; i < FaqDtList.length; i++) {
                    Dt += '<div class="email-list-item" onclick="ShowModalFaq(' + FaqDtList[i].id + ')">' +
                        '<div class="email-list-detail">' +
                        '<div class="content">' +
                        '<span class="from">' + FaqDtList[i].quest + '</span>' +
                        //'<p class="msg">' + FaqDtList[i].answare + '</p>' +
                        '<p class="msg">Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                }

                $('#faq-search-list').html(Dt);

                Swal.close();
            }
        });
        
    }, 500);

};

function ShowModalFaq(Id) {
    var DetailId = $.ajax({
        url: UrlOrigin + '/FAQ/GetById?Id=' + Id,
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
    debugger
    Swal.close();
    if (DetailId.status != 200) {
        Swal.fire("Failed", "Gagal memproses data.", "error");
    }
    else {
        $('#txt-faq-quest').html(DetailId.responseJSON.data.quest);
        $('#txt-faq-content').html(DetailId.responseJSON.data.answer);
        $('#Modal_Faqdetail').modal('toggle');
    }

}

function ShowDetailFaq(Id) {

    $('#PageList').hide(function () {
        $('#PageDetail').removeAttr('hidden');
        $('#PageDetail').show('fade')
    })
    if (Id != undefined) {
        $('#PageDetail .card-title').html("<i class='icon icon-lg' data-feather='edit'></i> &nbsp;Edit FAQ");
        $('#btn-save-new-faq').addClass('hide');
        $('#btn-save-edit-faq').removeClass('hide');
        AjaxGetById(Id);
    }
    else {
        $('#PageDetail .card-title').html("<i class='icon icon-lg' data-feather='plus-square'></i> &nbsp;New FAQ");
        $('#txt_KategoriFaq').val('');
        $('#txt_PertanyaanFaq').val('');
        tinymce.activeEditor.setContent('');
        $('#btn-save-new-faq').removeClass('hide');
        $('#btn-save-edit-faq').addClass('hide');
    }
}

function ShowListFaq() {
    $('#PageDetail').hide(function () {
        $('#PageList').attr('hidden');
        $('#PageList').show('fade')
    })

    AjaxGetList();
}

function UpdateById(id) {
    Swal.fire({
        title: "Do you want to save the changes?",
        text: "Save this change request ? You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            AjaxUpdateById(id);

            setTimeout(function () {

                if (StData == 200) {
                    Swal.fire(
                        'Delete!',
                        'Your data has been Delete.',
                        'success'
                    );

                    ShowListFaq();
                }

            }, 1500);
        }        
    });    
}


function DeleteById(id) {
    Swal.fire({
        title: "Do you want to delete the changes?",
        text: "Delete this change request ? You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            AjaxDeleteById(id);

            setTimeout(function () {

                if (StData == 200) {
                    Swal.fire(
                        'Delete!',
                        'Your data has been Delete.',
                        'success'
                    );

                    ShowListFaq();
                }

            }, 1500);
        }
    });

   
}

function AjaxSaveById() {
    var DtO = { Id: 0, Category: $('#txt_KategoriFaq').val(), Quest: $('#txt_PertanyaanFaq').val(), Answer: tinymce.activeEditor.getContent() };
    var Data = JSON.stringify(DtO);

    var Save = $.ajax({
        url: UrlOrigin + '/FAQ/Add',
        type: 'POST',
        data: Data,
        dataType: "json",
        cache: false,
        async: false,
        contentType: 'application/json',
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
    StData = Save.status;
    if (Save.status != 200) {
        Swal.fire("Failed", "Gagal memproses data.", "error");
    }
}

function AjaxGetById(Id) {

    var DetailId = $.ajax({
        url: UrlOrigin + '/FAQ/GetById?Id=' + Id,
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
    if (DetailId.status != 200) {
        Swal.fire("Failed", "Gagal memproses data.", "error");
    }
    else {
        FaqQuest = DetailId.responseJSON.data.quest;
        FaqAnswer = DetailId.responseJSON.data.answer;
        FaqId = DetailId.responseJSON.data.id;
        $('#txt_KategoriFaq').val(DetailId.responseJSON.data.category);
        $('#txt_PertanyaanFaq').val(DetailId.responseJSON.data.quest);
        tinymce.activeEditor.setContent(DetailId.responseJSON.data.answer);
    }
}

function AjaxDeleteById(Id) {
    var DeleteId = $.ajax({
        url: UrlOrigin + '/FAQ/DeledeById?Id=' + Id,
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

    StData = DeleteId.status;
    if (DeleteId.status != 200) {
        Swal.fire("Failed", "Gagal memproses data.", "error");
    }
}

function AjaxUpdateById(Id) {
    var DtO = { Id: Id, Category: $('#txt_KategoriFaq').val(), Quest: $('#txt_PertanyaanFaq').val(), Answer: tinymce.activeEditor.getContent() };
    var Data = JSON.stringify(DtO);

    var Save = $.ajax({
        url: UrlOrigin + '/FAQ/UpdateById',
        type: 'POST',
        data: Data,
        dataType: "json",
        cache: false,
        async: false,
        contentType: 'application/json',
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
    StData = Save.status;
    if (Save.status != 200) {
        Swal.fire("Failed", "Gagal memproses data.", "error");
    }
}

function AjaxGetList(KeyWord) {
    showLoader('Mohon menunggu, sedang memproses data.');
    setTimeout(function () {
        if (KeyWord == undefined) {
            FaqUrl = UrlOrigin + '/FAQ/GetAll';
        }
        else {
            FaqUrl = UrlOrigin + '/FAQ/GetAll?KeyWord=' + KeyWord;
        }
        $.ajax({
            type: 'GET',
            //url: 'faq/GetAll',
            url: FaqUrl,
            dataType: 'json',
            cache: false,
            async: true,
            beforeSend: function (XMLHttpRequest) {
                showLoader('Mohon menunggu, sedang menyiapkan data.');
            },
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

                FaqDtList = data.data.listData;
                FaqDtListCount = data.data.listData.length;

                if (data.data.listData.length != 0) {

                    var NoUrut = 1;
                    for (var i = 0; i < data.data.listData.length; i++) {
                        $('#dataTable2').DataTable().row.add([
                            '<div class="btn-group me-2" role="group" aria-label="First group">' +
                            '<button type = "button" class= "btn btn-info btn-icon-text" onclick = "ShowDetailFaq(' + data.data.listData[i].id + ')" >' +
                            '<i class="btn-icon-append" data-feather="eye"></i> View</button > ' +
                            '<button type="button" class="btn btn-danger btn-icon-text" onclick="DeleteById(' + data.data.listData[i].id + ')">' +
                            '<i class="btn-icon-append" data-feather="delete"></i> Delete</button ></div > '
                            , NoUrut
                            , data.data.listData[i].category
                            , data.data.listData[i].quest
                            , data.data.listData[i].creator
                            , data.data.listData[i].updater
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
    
}