//
//$(document).ready(function () {
//    incluiBtnPrint();
//});
//
//function incluiBtnPrint() {
//    var id;
//    $('.xPrint').each(function () {
//        id = $(this).attr('id');
//
//        if ($(this).attr('for')) {
//            id = $(this).attr('for');
//        }
//
//        if (!($(this).attr('id')) && (!$(this).attr('for'))) {
//            console.log('Não foi possível adicionar o botão imprimir, é obrigatório o uso de um id');
//            return false;
//        }
//
//        let aa = function () {
//            $("#" + id).xPrint();
//        }
//
//        let print = $('<button>', {
//            onClick: aa,
//            html: '<i class="fa fa-print fa-lg white-text"></i> Imprimir',
//            class: 'btn_xPrint btn'
//        });
//
//        let div = $('<div>', {
//            style: 'text-align: right; margin-top: 21px; margin-bottom: 10px;',
//            class: 'pn-Print'
//        });
//
//        print.click = function () {
//            click.apply($("#" + id).xPrint());
//        }
//
//        div.append(print);
//        $(this).after(div);
//    });
//}


//$('idPNimpressao').xPrint();
//$('idPNimpressao').xPrint({
//    btnID: '#mybtn',
//    cabecalhoID: '.outroCabecalho',
//    title: 'Meu doc para impressao'
//});



$.fn.xPrint = function (options) {

    var element = this;

    var argDefalt = {
        btnID: false,
        cabecalhoID: '.cabecalho',
        title: 'Impressão de Documento'
    };

    var arg = $.extend(argDefalt, options);

    if (arg.btnID) {
        arg.btnID = $(arg.btnID);
        var htmlBtn = arg.btnID.html();
        arg.btnID.html('<i class="fa fa-spinner fa-pulse fa-lg white-text"></i> Aguarde').attr('disabled', '');
    }

    if ($.trim(element.html()) === '') {
        if (arg.btnID) {
            arg.btnID.html('<i class="fa fa-exclamation-triangle fa-lg white-text"></i> Sem Conteúdo').attr('disabled', '');
            setTimeout(function () {
                arg.btnID.html(htmlBtn).removeAttr('disabled');
            }, 3000);
        } else {
            alert('Sem conteúdo para impressão');
        }

        return false;
    }

    let style = '<style>html, body{ background: #fff !important;}</style>';

    $("link[rel=stylesheet]").each(function () {
        let href = $(this).attr("href");
        if (href) {
            let media = $(this).attr("media") || "all";
            style += "<link type='text/css' rel='stylesheet' href='" + href + "' media='" + media + "'>";
        }
    });




    var iframe = $('<iframe/>');
    iframe[0].name = "iframe";
    iframe.css({ "position": "absolute", "top": "-1000000px" });

    $("body").append(iframe);
    var frameDoc = iframe[0].contentWindow ? iframe[0].contentWindow
        : iframe[0].contentDocument.document ? iframe[0].contentDocument.document
            : iframe[0].contentDocument;
    frameDoc.document.open();

    //Create a new HTML document.
    frameDoc.document.write('<html><head><title>' + arg.title + '</title>');

    frameDoc.document.write(style);
    frameDoc.document.write('</head>');

    frameDoc.document.write('<body>');


    let dataTime = new Date();
    $(arg.cabecalhoID + ' .spData').html(dataTime.getDate() + '/' + (("0" + parseInt(dataTime.getMonth() + 1)).substr(-2)) + '/' + dataTime.getFullYear());
    $(arg.cabecalhoID + ' .spHora').html(dataTime.getHours() + ':' + ('0' + dataTime.getMinutes()).substr(-2));

    if (arg.cabecalhoID == '.cabecalho')
        frameDoc.document.write($('.cabecalho').html());
    else
        frameDoc.document.write($(arg.cabecalhoID).html());


    frameDoc.document.write(element.html());

    frameDoc.document.write('</body></html>');
    frameDoc.document.close();


    setTimeout(function () {
        window.frames["iframe"].focus();
        window.frames["iframe"].print();
        iframe.remove();
        if (arg.btnID)
            arg.btnID.html(htmlBtn).removeAttr('disabled');
    }, 300);

    return false;

}

