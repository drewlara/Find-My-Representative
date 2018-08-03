/* Storing API Key's and Endpoint URL's*/
const CIVIC_API_KEY = 'AIzaSyBxaoaf_4p7w-iT6ZoiP4DW8HEMJeip3-U';
const CIVIC_API_URL = 'https://www.googleapis.com/civicinfo/v2/representatives';
const NEWS_API_KEY = 'a6acc6c620464ed1b88325d225039d01';
const NEWS_API_URL = 'https://newsapi.org/v2/everything';

function cleanCivicData(data) {
    //seperating each object filled array
    let officials = data.officials;
    let offices = data.offices;

    //adding position names to the officials array
    officials.forEach(function (official, index) {
        for (let i = 0; i < offices.length; i++) {
            if (offices[i].officialIndices.includes(index)) {
                official.positionHeld = offices[i].name;
            }
        }
    });
    
    //displaying data
    displaySearchAddress(data);
    displayBox(officials);
    displayModals(officials);

}

function getDataFromCivicApi(searchTerm, callback) {
    const query = {
        key: CIVIC_API_KEY,
        address: searchTerm
    }
    $.getJSON(CIVIC_API_URL, query, callback);
}

function watchSubmit() {
    $('.search-form').submit(function (event) {
        event.preventDefault();
        const queryTarget = $(event.currentTarget).find('.search-input');
        const query = queryTarget.val();
        queryTarget.val("");
        getDataFromCivicApi(query, cleanCivicData);
    });

}

$(watchSubmit);