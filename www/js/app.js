(function(window){

    $('.segmented-control a').click(function () {
        $('.segmented-control a').removeClass('active');
        $(this).addClass('active');
        var timeFrame = $(this).data('timeFrame');
    });

})(window);