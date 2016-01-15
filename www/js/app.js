'use strict';

(function (window) {

    ReactDOM.render(
        React.createElement(SignalsTable, null),
        window.document.getElementById('signals-table')
    );

    $('.segmented-control a').click(function () {
        $('.segmented-control a').removeClass('active');
        $(this).addClass('active');
        var timeFrame = $(this).data('timeFrame');
    });

})(window);