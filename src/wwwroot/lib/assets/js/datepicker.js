$(function () {
    'use strict';

    if ($('#datePickerExample').length) {
        var date = new Date();
        var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        $('#datePickerExample').datepicker({
            format: "mm/dd/yyyy",
            todayHighlight: true,
            autoclose: true
        });
        $('#datePickerExample').datepicker('setDate', today);
    }

    if ($('#datePickerDefault').length) {
        var date = new Date();
        var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        $('#datePickerDefault').datepicker({
            format: "yyyy-mm-dd",
            todayHighlight: true,
            autoclose: true
        });
        $('#datePickerDefault').datepicker('setDate', today);
    }

    if ($('#datePickerDefault2').length) {
        var date = new Date();
        var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        $('#datePickerDefault2').datepicker({
            format: "yyyy-mm-dd",
            todayHighlight: true,
            autoclose: true
        });
        $('#datePickerDefault2').datepicker('setDate', today);
    }
    if ($('#dtPickerBpdTanggalUsulan').length) {
        var date = new Date();
        var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        $('#dtPickerBpdTanggalUsulan').datepicker({
            format: "yyyy-mm-dd",
            todayHighlight: true,
            autoclose: true
        });
        $('#dtPickerBpdTanggalUsulan').datepicker('setDate', today);
    }

    if ($('#datePickerDefault3').length) {
        var date = new Date();
        var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        $('#datePickerDefault3').datepicker({
            format: "yyyy-mm-dd",
            todayHighlight: true,
            autoclose: true
        });
        $('#datePickerDefault3').datepicker('setDate', today);
    }

    if ($('#datePickerDefault4').length) {
        var date = new Date();
        var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        $('#datePickerDefault4').datepicker({
            format: "yyyy-mm-dd",
            todayHighlight: true,
            autoclose: true
        });
        $('#datePickerDefault4').datepicker('setDate', today);
    }

    if ($('#datePickerDefault5').length) {
        var date = new Date();
        var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        $('#datePickerDefault5').datepicker({
            format: "yyyy-mm-dd",
            todayHighlight: true,
            autoclose: true
        });
        $('#datePickerDefault5').datepicker('setDate', today);
    }

    if ($('#datePickerDefault6').length) {
        var date = new Date();
        var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        $('#datePickerDefault6').datepicker({
            format: "yyyy-mm-dd",
            todayHighlight: true,
            autoclose: true
        });
        $('#datePickerDefault6').datepicker('setDate', today);
    }
   
    $('.datePickerDefaultToday').datepicker({
        format: "yyyy-mm-dd",
        todayHighlight: true,
        autoclose: true
    });

    var today = new Date().toISOString().slice(0, 10); // Get today's date in yyyy-mm-dd format
    $('.datePickerDefaultToday').each(function () {
        var currentValue = $(this).val();
        if (!currentValue) {
            $(this).val(today);
        }
    });
           
});