const moment = require("moment");

const parmBodyIsDate = ( value, { req, location, path } ) => {

    if( !value ) {
        return false;
    }
    
    const fecha = moment( value );
    if( fecha.isValid() ) {
        return true;
    } 
    return false;
}

module.exports = {
    parmBodyIsDate
}