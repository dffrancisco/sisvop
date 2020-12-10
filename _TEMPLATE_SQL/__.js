$.ajaxSetup({
    url: '_TEMPLATE_SQL/per.__.php',
    data: {
        class: '__'
    }
});

$(function () {

});


var exemplo = (function () {

    function getExemplo() {
        $.ajax({
            data: {
                call: 'exemplo',
                param: {
                    id_empresa: 808
                }
            },
            success: function (r) {
                console.log(r);
            }
        });
    }

    return {
        getExemplo: getExemplo
    }
})();
