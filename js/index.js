

$(function () {

    $('.pnMenu a').click(function () {
        pnMenuToggle();
    });

    $(document).keydown(function (e) {
        if (e.keyCode == 27) {
            if ($('.pnMenu').hasClass('pnMenuToggle'))
                pnMenuToggle();

            if ($('.pnUser').hasClass('pnUserToggle'))
                pnUserToggle();
        }
    });


    $('#pnTitulo').html($('#pnPrincipal title').html());

});



function pnMenuToggle() {
    $('.pnMenu').toggleClass('pnMenuToggle');
    return false;
}
function pnUserToggle() {
    $('.pnUser').toggleClass('pnUserToggle');
    if ($('.viewPhoto').hasClass('viewPhotoBig'))
        pnViewPhoto();
    return false;
}
function pnViewPhoto() {
    $('.viewPhoto').toggleClass('viewPhotoBig');
    $('.viewPhoto img').toggleClass('viewPhotoImg');
    return false;
}
