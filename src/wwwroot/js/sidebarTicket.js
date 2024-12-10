(function (e) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], e)
    } else {
        e(jQuery)
    }
})(function (e) {
    function n(e) {
        if (i.raw) {
            return e
        }
        return decodeURIComponent(e.replace(t, " "))
    }
    function r(e) {
        if (e.indexOf('"') === 0) {
            e = e.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\")
        }
        e = n(e);
        try {
            return i.json ? JSON.parse(e) : e
        } catch (t) { }
    }
    var t = /\+/g;
    var i = e.cookie = function (t, s, o) {
        if (s !== undefined) {
            o = e.extend({}, i.defaults, o);
            if (typeof o.expires === "number") {
                var u = o.expires,
                    a = o.expires = new Date;
                a.setDate(a.getDate() + u)
            }
            s = i.json ? JSON.stringify(s) : String(s);
            return document.cookie = [i.raw ? t : encodeURIComponent(t), "=", i.raw ? s : encodeURIComponent(s), o.expires ? "; expires=" + o.expires.toUTCString() : "", o.path ? "; path=" + o.path : "", o.domain ? "; domain=" + o.domain : "", o.secure ? "; secure" : ""].join("")
        }
        var f = document.cookie.split("; ");
        var l = t ? undefined : {};
        for (var c = 0, h = f.length; c < h; c++) {
            var p = f[c].split("=");
            var d = n(p.shift());
            var v = p.join("=");
            if (t && t === d) {
                l = r(v);
                break
            }
            if (!t) {
                l[d] = r(v)
            }
        }
        return l
    };
    i.defaults = {};
    e.removeCookie = function (t, n) {

        if (e.cookie(t) !== undefined) {
            e.cookie(t, "", e.extend({}, n, {
                expires: -1
            }));
            return true
        }
        return false
    }
})

$(function () {

    //var UrlPath = window.location.pathname.split('/');

    function RemoveCookieMenu() {
        $.removeCookie('Nav-Parrent', { path: '/' });
        $.removeCookie('Nav-Child', { path: '/' });
        $.removeCookie('Nav-Menu', { path: '/' });
    }

    RemoveCookieMenu();
    
    switch (UrlPath[UrlPath.length - 1]) {
        case 'MasterTicket':
            $.cookie('Nav-Menu', 'Li-Nav-Home', { path: '/' });
            break;
        case 'Issues':
            $.cookie('Nav-Menu', 'Li-Nav-Helpdesk', { path: '/' });
            break;
        case 'Services':
            $.cookie('Nav-Menu', 'Li-Nav-Helpdesk', { path: '/' });
            break;
        case 'helpdesk':
            $.cookie('Nav-Menu', 'Li-Nav-Helpdesk', { path: '/' });
            break;
        case 'Applications':
            $.cookie('Nav-Parrent', 'Li-Nav-Master', { path: '/' });
            $.cookie('Nav-Child', 'Master-Applications', { path: '/' });
            break;
        case 'MasterCost':
            $.cookie('Nav-Parrent', 'Li-Nav-Master', { path: '/' });
            $.cookie('Nav-Child', 'Master-Cost', { path: '/' });
            break;
        case 'Category':
            $.cookie('Nav-Parrent', 'Li-Nav-Master', { path: '/' });
            $.cookie('Nav-Child', 'Master-Category', { path: '/' });
            break;
        case 'CategorySub':
            $.cookie('Nav-Parrent', 'Li-Nav-Master', { path: '/' });
            $.cookie('Nav-Child', 'Master-CategorySub', { path: '/' });
            break;
        case 'CategoryDetail':
            $.cookie('Nav-Parrent', 'Li-Nav-Master', { path: '/' });
            $.cookie('Nav-Child', 'Master-CategoryDetail', { path: '/' });
            break;
        case 'MasterTemplate':
            $.cookie('Nav-Parrent', 'Li-Nav-Master', { path: '/' });
            $.cookie('Nav-Child', 'Master-Template', { path: '/' });
            break;
        case 'FAQ':
            $.cookie('Nav-Parrent', 'Li-Nav-Master', { path: '/' });
            $.cookie('Nav-Child', 'Master-faq', { path: '/' });
            break;
        case 'config':
            $.cookie('Nav-Parrent', 'Li-Nav-Master', { path: '/' });
            $.cookie('Nav-Child', 'Master-config', { path: '/' });
            break;
        case 'Index':
            if (NewUrl.searchParams.get('status') == "999" && NewUrl.pathname == "/MyTicket/Index") {
                $.cookie('Nav-Parrent', 'Li-Nav-MyTicket', { path: '/' });
                $.cookie('Nav-Child', 'Ticket-List', { path: '/' });
            }
            else if (NewUrl.searchParams.get('status') == "0" && NewUrl.pathname == "/MyTicket/Index") {
                $.cookie('Nav-Parrent', 'Li-Nav-MyTicket', { path: '/' });
                $.cookie('Nav-Child', 'Ticket-Draft', { path: '/' });
            }
            else if (NewUrl.searchParams.get('status') == "1" && NewUrl.pathname == "/MyTicket/Index") {
                $.cookie('Nav-Parrent', 'Li-Nav-MyTicket', { path: '/' });
                $.cookie('Nav-Child', 'Ticket-InProgress', { path: '/' });
            }
            else if (NewUrl.searchParams.get('status') == "2" && NewUrl.pathname == "/MyTicket/Index") {
                $.cookie('Nav-Parrent', 'Li-Nav-MyTicket', { path: '/' });
                $.cookie('Nav-Child', 'Ticket-Done', { path: '/' });
            }
            else if (NewUrl.searchParams.get('status') == "0" && NewUrl.pathname == "/WorkOrder/Index") {
                $.cookie('Nav-Parrent', 'Li-Nav-WorkOrder', { path: '/' });
                $.cookie('Nav-Child', 'Wo-Waiting', { path: '/' });
            }
            else if (NewUrl.searchParams.get('status') == "1" && NewUrl.pathname == "/WorkOrder/Index") {
                $.cookie('Nav-Parrent', 'Li-Nav-WorkOrder', { path: '/' });
                $.cookie('Nav-Child', 'Wo-InProgress', { path: '/' });
            }
            else if (NewUrl.searchParams.get('status') == "3" && NewUrl.pathname == "/WorkOrder/Index") {
                $.cookie('Nav-Parrent', 'Li-Nav-WorkOrder', { path: '/' });
                $.cookie('Nav-Child', 'Wo-Done', { path: '/' });
            }
            break;

    }

    $('#ul-Nav-Tab .nav-link').removeClass('active');
    $('#ul-Nav-Tab .nav-item').removeClass('active');
    //$('.collapse').removeClass('show');

    //Cookie Set Nav Active
    
    if ($.cookie('Nav-Menu') != undefined) {

        $('#' + $.cookie('Nav-Menu')).addClass('active');
    }
    else {
        if ($.cookie('Nav-Parrent') != undefined) {

            $('#' + $.cookie('Nav-Parrent')).addClass('active');
            let MasterNav = ["Applications", "MasterCost", "Category", "CategorySub",
                "CategoryDetail", "MasterTemplate", "FAQ", "config"];
            if (jQuery.inArray(UrlPath[UrlPath.length - 1], MasterNav)!=-1) {
                $('#MasterTicket').addClass('show');
            }
            else if (NewUrl.pathname == "/MyTicket/Index") {
                $('#MyTicket').addClass('show');
            }
            else if (NewUrl.pathname == "/WorkOrder/Index") {
                $('#WorkOrder').addClass('show');
            }
        }
        if ($.cookie('Nav-Child') != undefined) {

            $('#' + $.cookie('Nav-Child')).addClass('active');
        }
    }

    //Set Nav Active
    if ($(this).attr('href') != undefined)
    {
        debugger
        $('.nav-link').click(function () {
            if (UrlPath[1] == "formkso") { return; }

            RemoveCookieMenu();

            if ($(this).attr('href').indexOf('#') != -1) {
                switch ($(this).attr('href').replace('/', '')) {
                    case 'MasterTicket':
                        $.cookie('Nav-Menu', 'Li-Nav-Home', { path: '/' });
                        break;
                    case 'Issues':
                        $.cookie('Nav-Menu', 'Li-Nav-Helpdesk', { path: '/' });
                        break;
                    case 'Services':
                        $.cookie('Nav-Menu', 'Li-Nav-Helpdesk', { path: '/' });
                        break;
                    case 'helpdesk':
                        $.cookie('Nav-Menu', 'Li-Nav-Helpdesk', { path: '/' });
                        break;
                }
                return
            }
            if ($(this).attr('id') == undefined) {
                switch ($(this).attr('href').replace('/', '')) {
                    case 'MasterTicket':
                        $.cookie('Nav-Menu', 'Li-Nav-Home', { path: '/' });
                        break;
                    case 'ChangeRequest':
                        $.cookie('Nav-Menu', 'Li-Nav-Change', { path: '/' });
                        break;
                }
                return
            }

            var NavParrent = $(this).attr('id').split('-')[0];
            if (NavParrent == 'Master') {
                $('#Li-Nav-Master').addClass('active');
                $.cookie('Nav-Parrent', 'Li-Nav-Master', { path: '/' });
                $.cookie('Nav-Child', $(this).attr('id'), { path: '/' });
            }
        })
    }
    
})