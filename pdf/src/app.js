import printPDF from './print';

const basePrintData = {
    'addressSender': {
        'person':'GasteizTxoko',
        'street':'C/ Alava, 39, ',
        'city':'01006, Vitoria-Gasteiz',
        'email':'GasteizTxoko@gmail.com',
        'phone':'+34 945333222'
    },
    'address': {
        '':'',
        '':'',
        '':'',
        '':'',
    },
    'personalInfo': {
        'website': 'https://andrekelling.de',
        'bank': {
            'person':'André Kelling',
            'name':'Noris Bank',
            'IBAN':'DE12 3456 7890 1234 5678 90'
        },
        'taxoffice': {
            'name':'FA Treptow-Köpenick',
            'number':'St-Nr 12/123/12345'
        }
    },
    'label': {
        'invoicenumber':'Invoice No.',
        'invoice':'Invoice for',
        'tableItems':'Reserva',
        'tableQty':'Qty',
        'tableSinglePrice':'Precio',
        'tableSingleTotal':'Total',
        'totalGrand':'Grand Total',
        'contact':'Kontaktdetails',
        'bank':'Bankverbindung',
        'taxinfo':'Steuernummer',
    }
};
const shortPrintData = {
    'invoice': {
        'number':'2018-15738',
        'date':'28.06.2018',
        'subject':'https://andrekelling.de',
        'total':'2.838,00 €',
        'text':'Recuerde guardar esta factura ya que le servira como justificante de reserva.'
    },
    'items': {
        [0]: {
            'title':'Templating',
            'description':'predefined custom specialities for vague usage in a framework. Sense a light case weight value for exisiting solution services. Provide a case for universal properties.',
            'amount':'1.200,00 €',
            'qty':'2',
            'total':'2.400,00 €'
        },
        [1]: {
            'title':'Design',
            'description':'outwork digital screen UX in different cases for utilities',
            'amount':'876,00 €',
            'qty':'0.5',
            'total':'438,00 €'
        }
    }
};



document.getElementById('short').onclick = () => {
    printPDF(Object.assign(basePrintData, shortPrintData));
};




