'use strict';

var Ajax = ({

    call: function (url, method, object, callback) {
        $.ajax({
            url: url,
            async: false,
            method: method,
            crossOrigin: true,
            contentType:"application/json",
            dataType: "json",
            data: object
        }).done(function( data ) {
            callback ? callback(data):'';
        }).fail( function(xhr, textStatus, errorThrown) {
            console.log("Fail:"+textStatus);
        });
    }
});

module.exports = Ajax;