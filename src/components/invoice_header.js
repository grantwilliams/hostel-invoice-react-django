import React from 'react';

const InvoiceHeader = () => {
  return (
    <div className="row no-gutters">
      <div className="col-4 logo"><img src="http://imgur.com/UthY0zL.jpg" /></div>
      <div className="col-4 offset-4 text-right">
        <h5>Contact</h5>
        <p>Jetpak Alternative<br/>
        Görlitzer Str. 38<br/>
        Berlin, 10997<br/>
        Tel: +49 30 6290 8641<br/>
        alt@jetpak.de</p>
      </div>
    </div>
  );
};

export default InvoiceHeader;