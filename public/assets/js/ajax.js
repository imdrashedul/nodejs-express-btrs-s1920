/**
 * @author MD. RASHEDUL ISLAM
 * @package Bus Ticket Reservation System
 * @version v2.0
 * @see https://github.com/rashed370/webtech-final
 */

function sendXhr(data, success, load, release, ldata, rdata) {

    if(data!==null) {
        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
        var params = '';
        var dataPair = [];
        data = data || [];
        load = load || null;
        release = release || null;
        ldata = ldata || [];
        rdata = rdata || [];

        for(var index in data) {
            dataPair.push(encodeURIComponent(index) + '=' + encodeURIComponent(data[index]));
        }

        params =  dataPair.join('&').replace(/%20/g, '+');

        xhr.onreadystatechange = function() {
            if (this.readyState == 4 ) {
                if(this.status == 200) {
                    success(JSON.parse(this.response));
                }
                if(release!=null) release(rdata);
            }
        };

        if(load!=null) load(ldata);
        xhr.open('POST', 'ajax.php', true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("X-Requested-With", "xmlhttprequest");
        xhr.send(params);

        return xhr;
    }

    return null;
}
