function uniqueStr() {
    return '_' + Math.random().toString(36).substr(2, 9);
}
function removeSelection(elem) {
    //elem.classList.remove('selected');
    var parent = elem.parentNode.parentNode.parentNode.parentNode.parentNode;
    var checkoutForm = parent.querySelector('.checkout-confirm>form');
    var checkoutList = parent.querySelector('.selected-seats table tbody tr[seat="'+elem.title+'"]');
    var booked = checkoutForm.querySelector('input[name="checkout_seats[]"][checkout="'+elem.title+'"]');

    if(checkoutList!=null && booked!=null)
    {
        checkoutList.remove();
        booked.remove();
        var checkoutTotal = parent.querySelector('.selected-total span');
        var fare = parseFloat(parent.getAttribute('fare'));
        checkoutTotal.textContent = parseFloat(checkoutTotal.textContent) - fare;
        elem.classList.remove('selected');
    }
}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function addSelection(elem) {

    var parent = elem.parentNode.parentNode.parentNode.parentNode.parentNode;
    var checkoutForm = parent.querySelector('.checkout-confirm>form');
    var checkoutList = parent.querySelector('.selected-seats table tbody');
    var checkoutTotal = parent.querySelector('.selected-total span');
    var booked = checkoutForm.querySelectorAll('input[name="checkout_seats[]"]');
    var fare = parseFloat(parent.getAttribute('fare'));
    var total = parseFloat(checkoutTotal.textContent) + fare;

    if(booked.length<4)
    {
        var input = document.createElement('input');
        input.setAttribute("name", "checkout_seats[]");
        input.setAttribute("checkout", elem.title);
        input.setAttribute("type", "hidden");
        input.value = elem.title;
        checkoutForm.prepend(input);

        var tr = document.createElement('tr');
        var tdSeat = document.createElement('td');
        var tdFare = document.createElement('td');
        var txtSeat = document.createTextNode(elem.title);
        var txtFare = document.createTextNode(parseFloat(fare).toFixed(2));

        tr.setAttribute("seat", elem.title);
        tdSeat.appendChild(txtSeat);
        tdFare.appendChild(txtFare);

        tr.appendChild(tdSeat);
        tr.appendChild(tdFare);

        checkoutList.appendChild(tr);

        checkoutTotal.textContent = parseFloat(total).toFixed(2);

        elem.classList.add('selected');
    }
    else
    {
        alert('Only 4 Seats can be selected at a time');
    }

}

function getPublicBooking(parent, data) {
    data = data || {};
    data['context'] = 'getPublicBooking';

    if(!parent.hasAttribute('__bookingparent')) {
        var bookingID = uniqueStr();
        var bookingParent = document.createElement('tr');
        var __btn = parent.querySelector('button.expand-bookings');
        bookingParent.setAttribute('id', bookingID);
        insertAfter(bookingParent, parent);
        parent.setAttribute('__bookingparent', bookingID);
        __btn.style.visibility = 'hidden';
        sendXhr(data, function(response){
            if(response.status==true) {
                if(response.message && response.message!=null) {
                    bookingParent.innerHTML = response.message;
                    if(bookingParent.hasAttribute('loadingLocker')) {
                        bookingParent.removeAttribute('loadingLocker');
                    }
                } else {
                    alert('Couldn\'t Fetch Response')
                }
            } else if(response.message && response.message!=null) {
                alert(response.message);
            } else {
                alert('Couldn\'t Fetch Response')
            }

        }, function (data) {
            if(!data.bookingParent.hasAttribute('loadingLocker')) {
                data.bookingParent.innerHTML = '<td colspan="5" class="text-center"><br>Loading...<br><br></td>';
                data.bookingParent.setAttribute('loadingLocker', '');
            }
        }, function (data) {
            if(data.bookingParent.hasAttribute('loadingLocker')) {
                data.bookingParent.remove();
                data.btn.style.visibility = 'visible';
                if(data.parent.hasAttribute('__bookingparent'))
                {
                    data.parent.removeAttribute('__bookingparent');
                }
            }
        },{bookingParent: bookingParent}, {parent: parent, bookingParent: bookingParent, btn: __btn});
    }
    else {
        alert('Close Previous One First');
    }

    parent.setAttribute('__bookingparent', bookingID);
}

function closeBookingArea(area) {
    if(area && area.hasAttribute('id'))
    {
        var parent = document.querySelector('tr[__bookingparent="'+area.id+'"]');

        if(parent!=null)
        {
            parent.removeAttribute('__bookingparent');
            parent.querySelector('button.expand-bookings').style.visibility = 'visible';
            area.remove();
        }
    }
}