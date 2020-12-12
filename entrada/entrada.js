$.ajaxSetup({
    url: 'entrada/per.entrada.php',
    data: {
        
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
