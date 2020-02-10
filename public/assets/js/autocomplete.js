/**
 * @author MD. RASHEDUL ISLAM
 * @package Bus Ticket Reservation System
 * @version v2.0
 * @see https://github.com/rashed370/webtech-final
 */

function __autocomplete(element, suggestions) {
    element = element || null;
    suggestions = suggestions || [];

    var selectedElement;


    if(element)
    {
        element.parentNode.classList.add('__acl_container');

        element.addEventListener('input', function (e) {

            __autocomplete_close_lists();
            if(this.value) {
                var _value = this.value,
                    _list = document.createElement('div'),
                    _item, _strongtext, _input;

                    _list.setAttribute('id', this.id + '__aclist');
                    _list.classList.add('__acl_items');


                selectedElement = -1;

                if(suggestions.length>0)
                {
                    suggestions.forEach(function (item, index) {
                        var _matched = item.substr(0, _value.length);

                        if( _matched.toLowerCase() == _value.toLowerCase())
                        {
                            _item = document.createElement('div');
                            _strongtext = document.createElement('strong');
                            _input =  document.createElement('input');
                            _input.setAttribute('type', 'hidden');
                            _input.setAttribute('value', item);
                            _strongtext.appendChild( document.createTextNode(_matched) );
                            document.createTextNode(_matched);
                            _item.appendChild(_strongtext);
                            _item.appendChild(
                                document.createTextNode(item.substr(_value.length))
                            );
                            _item.appendChild(_input);
                            _item.addEventListener('click', function (e) {
                                element.value = this.querySelector('input[type="hidden"]').value || '';
                                __autocomplete_close_lists();
                            });

                            _list.appendChild(_item);

                        }

                    });
                    this.parentNode.appendChild(_list);
                }

            }
        });

        element.addEventListener('keydown', function (e) {
            var _list = document.getElementById(this.id + '__aclist'),
                _items = _list ? _list.querySelectorAll('div'): _list;

            if(e.which == 40)
            {
                selectedElement++;
                __autocomplete_select_items(_items);
            }
            else if(e.which == 38)
            {
                selectedElement--;
                __autocomplete_select_items(_items);
            }
            else if(e.which == 13)
            {
                e.preventDefault();

                if(selectedElement>-1)
                {
                    if(_items)
                    {
                        _items[selectedElement].click();
                    }
                }
            }
        });
    }

    function __autocomplete_select_items(elements)
    {
        if(elements)
        {
            __autocomplete_unselect_items(elements);

            selectedElement = selectedElement >= elements.length ? 0 : ( selectedElement < 0 ? elements.length - 1 : selectedElement );

           elements[selectedElement].classList.add('__acl_active')
        }

        return elements;
    }


    function __autocomplete_unselect_items(elements)
    {
        if(elements.length>0)
        {
            elements.forEach(function (item) {
                item.classList.remove('__acl_active');
            });
        }

        return elements;
    }

    function __autocomplete_close_lists(current) {
        current = current || null;

        var i, aclItems = document.getElementsByClassName('__acl_items');

        if(aclItems.length>0)
        {
            for (i = 0; i<aclItems.length; i++)  {
                if(current==null || (current != aclItems[i] && current != element))
                {
                    aclItems[i].parentNode.removeChild(aclItems[i]);
                }
            }
        }
    }
    if(!document._aclevent)
    {
        document._aclevent = true;
        document.addEventListener("click", function (e) {
            __autocomplete_close_lists(e.target);
        });
    }

    return element;
}


