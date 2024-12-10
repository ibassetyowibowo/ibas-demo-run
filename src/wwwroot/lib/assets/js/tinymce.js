$(function () {
    'use strict';

    //Tinymce editor

    if ($("#txt_BosTicketContent").length) {
        tinymce.init({
            selector: '#txt_BosTicketContent',
            min_height: 350,
            default_text_color: 'red',
            plugins: [
                'advlist', 'autoresize', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'pagebreak',
                'searchreplace', 'wordcount', 'visualblocks', 'visualchars', 'code', 'fullscreen',
            ],
            toolbar1: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media | forecolor backcolor emoticons | codesample help',
            image_advtab: true,
            statusbar: false,    
            promotion:false,
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

    if ($("#txt_BosTicketContentEdit").length) {
        tinymce.init({
            selector: '#txt_BosTicketContentEdit',
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

    if ($("#txt_TemplateContent").length) {
        tinymce.init({
            selector: '#txt_TemplateContent',
            height: '400px',
            theme: 'silver',
            statusbar: false,    
            promotion: false,
            plugins: [
                'advlist', 'autoresize', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen', 'pagebreak',
                'insertdatetime', 'media', 'table', 'visualchars',
            ],
            //plugins: [
            //    'advlist autolink lists link image charmap print preview hr anchor pagebreak',
            //    'searchreplace wordcount visualblocks visualchars code fullscreen table',
            //],
            toolbar1: 'undo redo | insert | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | fullscreen',
            toolbar2: 'print preview media | forecolor backcolor emoticons | codesample',
            //image_advtab: true,
            //templates: [{
            //    title: 'Test template 1',
            //    content: 'Test 1'
            //},
            //{
            //    title: 'Test template 2',
            //    content: 'Test 2'
            //}
            //],
            //content_css: []
        });
    }

    if ($("#txt_FAQContent").length) {
        tinymce.init({
            selector: '#txt_FAQContent',
            height: 400,
            theme: 'silver',
            statusbar: false,
            promotion: false,
            plugins: [
                'advlist autolink lists link image charmap print preview hr anchor pagebreak',
                'searchreplace wordcount visualblocks visualchars code fullscreen table',
            ],
            toolbar1: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
            toolbar2: 'print preview media | forecolor backcolor emoticons | codesample help',
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

    if ($("#tinymceExample").length) {
        tinymce.init({
            selector: '#tinymceExample',
            height: 400,
            theme: 'silver',
            plugins: [
                'advlist autolink lists link image charmap print preview hr anchor pagebreak',
                'searchreplace wordcount visualblocks visualchars code fullscreen table',
            ],
            toolbar1: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
            toolbar2: 'print preview media | forecolor backcolor emoticons | codesample help',
            image_advtab: true,
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

    if ($('#txt_KegiatanInternal').length) {
        
        tinymce.init({
            selector: '#txt_KegiatanInternal',
            height: 200,
            theme: 'silver',
            menubar: false,
            statusbar: false,
            promotion: false,
            plugins: [
                'paste autolink directionality',
                'image link media table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists',
                'imagetools textpattern noneditable charmap emoticons fullscreen'
            ],
            toolbar1: 'insert | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | forecolor backcolor emoticons table | link image | fullscreen',
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

    if ($('#txt_KegiatanInternalSummary').length) {
        
        tinymce.init({
            selector: 'textarea#txt_KegiatanInternalSummary',
            height: 250,
            menubar: false,
            statusbar: false,   
            promotion: false,
            toolbar: false,
            readonly: 1,
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
        });
    }

    if ($('#txt_ReasonReOpen').length) {
        
        tinymce.init({
            selector: 'textarea#txt_ReasonReOpen',
            height: 250,
            menubar: false,
            statusbar: false,      
            toolbar: false,
            promotion: false,
            readonly: 1,
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
        });
    }

    if ($('#txt_Ulasan').length) {

        tinymce.init({
            selector: 'textarea#txt_Ulasan',
            height: 80,
            menubar: false,
            statusbar: false,
            toolbar: false,
            promotion: false,
            readonly: 1,
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
        });
    }

});