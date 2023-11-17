export default function getAirportShortName(city){
    const cityInLowerCase = city.toLowerCase()
    switch(cityInLowerCase){

        case 'jammu' : return 'IXJ'
        case 'kolkata' : return 'CCU'
        case 'jammu and kashmir' : return 'CCU'
        case 'chennai' : return 'MAA'
        case 'punjab' : return 'ATQ'
        case 'bengaluru' : return 'BLR'
        case 'bhubaneswar' : return 'BBI'
        case 'patna' : return 'PAT'
        case 'new Delhi' : return 'DEL'
        case 'mumbai' : return 'BOM'
        case 'nagpur' : return 'NAG'
        case 'pune' : return 'PNQ'
        case 'dehradun' : return 'DED'
        case 'goa' : return 'GOI'
        case 'guwahati' : return 'GAU'
        case 'chhattisgarh' : return 'RPR'
        case 'madurai' : return 'IXM'
        case 'gaya' : return 'GAY'
        case 'ahmedabad' : return 'AMD'
        case 'vadodara' : return 'VDQ'
        case 'surat' : return 'STV'
        case 'mangaluru' : return 'IXE'
        case 'jaipur': return 'JAI'
        case 'lucknow': return 'LKO'
        case 'cochin': return 'COK'
        case 'vadodara': return 'BDQ'
    }
}