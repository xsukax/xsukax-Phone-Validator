/**
 * PhoneValidator.js v2.0.0
 * Lightweight phone number validator with 180+ countries and operator detection
 * 
 * @author xsukax
 * @license MIT
 */

(function(global) {
  'use strict';

  // ============================================================================
  // COUNTRY DATA - 181 Countries
  // ============================================================================
  
  const COUNTRIES = {
    // North America
    'US': { name: 'United States', code: '1', flag: '🇺🇸' },
    'CA': { name: 'Canada', code: '1', flag: '🇨🇦' },
    'MX': { name: 'Mexico', code: '52', flag: '🇲🇽' },
    
    // Central America & Caribbean
    'BZ': { name: 'Belize', code: '501', flag: '🇧🇿' },
    'GT': { name: 'Guatemala', code: '502', flag: '🇬🇹' },
    'SV': { name: 'El Salvador', code: '503', flag: '🇸🇻' },
    'HN': { name: 'Honduras', code: '504', flag: '🇭🇳' },
    'NI': { name: 'Nicaragua', code: '505', flag: '🇳🇮' },
    'CR': { name: 'Costa Rica', code: '506', flag: '🇨🇷' },
    'PA': { name: 'Panama', code: '507', flag: '🇵🇦' },
    'BS': { name: 'Bahamas', code: '1242', flag: '🇧🇸' },
    'BB': { name: 'Barbados', code: '1246', flag: '🇧🇧' },
    'JM': { name: 'Jamaica', code: '1876', flag: '🇯🇲' },
    'TT': { name: 'Trinidad and Tobago', code: '1868', flag: '🇹🇹' },
    'CU': { name: 'Cuba', code: '53', flag: '🇨🇺' },
    'DO': { name: 'Dominican Republic', code: '1809', flag: '🇩🇴' },
    'HT': { name: 'Haiti', code: '509', flag: '🇭🇹' },
    'PR': { name: 'Puerto Rico', code: '1787', flag: '🇵🇷' },
    
    // South America
    'BR': { name: 'Brazil', code: '55', flag: '🇧🇷' },
    'AR': { name: 'Argentina', code: '54', flag: '🇦🇷' },
    'CL': { name: 'Chile', code: '56', flag: '🇨🇱' },
    'CO': { name: 'Colombia', code: '57', flag: '🇨🇴' },
    'VE': { name: 'Venezuela', code: '58', flag: '🇻🇪' },
    'PE': { name: 'Peru', code: '51', flag: '🇵🇪' },
    'EC': { name: 'Ecuador', code: '593', flag: '🇪🇨' },
    'BO': { name: 'Bolivia', code: '591', flag: '🇧🇴' },
    'PY': { name: 'Paraguay', code: '595', flag: '🇵🇾' },
    'UY': { name: 'Uruguay', code: '598', flag: '🇺🇾' },
    'GY': { name: 'Guyana', code: '592', flag: '🇬🇾' },
    'SR': { name: 'Suriname', code: '597', flag: '🇸🇷' },
    
    // Western Europe
    'GB': { name: 'United Kingdom', code: '44', flag: '🇬🇧' },
    'DE': { name: 'Germany', code: '49', flag: '🇩🇪' },
    'FR': { name: 'France', code: '33', flag: '🇫🇷' },
    'IT': { name: 'Italy', code: '39', flag: '🇮🇹' },
    'ES': { name: 'Spain', code: '34', flag: '🇪🇸' },
    'PT': { name: 'Portugal', code: '351', flag: '🇵🇹' },
    'NL': { name: 'Netherlands', code: '31', flag: '🇳🇱' },
    'BE': { name: 'Belgium', code: '32', flag: '🇧🇪' },
    'LU': { name: 'Luxembourg', code: '352', flag: '🇱🇺' },
    'CH': { name: 'Switzerland', code: '41', flag: '🇨🇭' },
    'AT': { name: 'Austria', code: '43', flag: '🇦🇹' },
    'IE': { name: 'Ireland', code: '353', flag: '🇮🇪' },
    'MC': { name: 'Monaco', code: '377', flag: '🇲🇨' },
    
    // Northern Europe
    'SE': { name: 'Sweden', code: '46', flag: '🇸🇪' },
    'NO': { name: 'Norway', code: '47', flag: '🇳🇴' },
    'DK': { name: 'Denmark', code: '45', flag: '🇩🇰' },
    'FI': { name: 'Finland', code: '358', flag: '🇫🇮' },
    'IS': { name: 'Iceland', code: '354', flag: '🇮🇸' },
    
    // Eastern Europe
    'PL': { name: 'Poland', code: '48', flag: '🇵🇱' },
    'CZ': { name: 'Czech Republic', code: '420', flag: '🇨🇿' },
    'SK': { name: 'Slovakia', code: '421', flag: '🇸🇰' },
    'HU': { name: 'Hungary', code: '36', flag: '🇭🇺' },
    'RO': { name: 'Romania', code: '40', flag: '🇷🇴' },
    'BG': { name: 'Bulgaria', code: '359', flag: '🇧🇬' },
    'UA': { name: 'Ukraine', code: '380', flag: '🇺🇦' },
    'BY': { name: 'Belarus', code: '375', flag: '🇧🇾' },
    'MD': { name: 'Moldova', code: '373', flag: '🇲🇩' },
    'LT': { name: 'Lithuania', code: '370', flag: '🇱🇹' },
    'LV': { name: 'Latvia', code: '371', flag: '🇱🇻' },
    'EE': { name: 'Estonia', code: '372', flag: '🇪🇪' },
    'RU': { name: 'Russia', code: '7', flag: '🇷🇺' },
    
    // Southern Europe & Balkans
    'GR': { name: 'Greece', code: '30', flag: '🇬🇷' },
    'HR': { name: 'Croatia', code: '385', flag: '🇭🇷' },
    'SI': { name: 'Slovenia', code: '386', flag: '🇸🇮' },
    'RS': { name: 'Serbia', code: '381', flag: '🇷🇸' },
    'BA': { name: 'Bosnia and Herzegovina', code: '387', flag: '🇧🇦' },
    'ME': { name: 'Montenegro', code: '382', flag: '🇲🇪' },
    'MK': { name: 'North Macedonia', code: '389', flag: '🇲🇰' },
    'AL': { name: 'Albania', code: '355', flag: '🇦🇱' },
    'CY': { name: 'Cyprus', code: '357', flag: '🇨🇾' },
    'MT': { name: 'Malta', code: '356', flag: '🇲🇹' },
    
    // Middle East
    'TR': { name: 'Turkey', code: '90', flag: '🇹🇷' },
    'SA': { name: 'Saudi Arabia', code: '966', flag: '🇸🇦' },
    'AE': { name: 'United Arab Emirates', code: '971', flag: '🇦🇪' },
    'QA': { name: 'Qatar', code: '974', flag: '🇶🇦' },
    'KW': { name: 'Kuwait', code: '965', flag: '🇰🇼' },
    'BH': { name: 'Bahrain', code: '973', flag: '🇧🇭' },
    'OM': { name: 'Oman', code: '968', flag: '🇴🇲' },
    'IL': { name: 'Israel', code: '972', flag: '🇮🇱' },
    'PS': { name: 'Palestine', code: '970', flag: '🇵🇸' },
    'JO': { name: 'Jordan', code: '962', flag: '🇯🇴' },
    'LB': { name: 'Lebanon', code: '961', flag: '🇱🇧' },
    'SY': { name: 'Syria', code: '963', flag: '🇸🇾' },
    'IQ': { name: 'Iraq', code: '964', flag: '🇮🇶' },
    'IR': { name: 'Iran', code: '98', flag: '🇮🇷' },
    'YE': { name: 'Yemen', code: '967', flag: '🇾🇪' },
    
    // North Africa
    'EG': { name: 'Egypt', code: '20', flag: '🇪🇬' },
    'MA': { name: 'Morocco', code: '212', flag: '🇲🇦' },
    'DZ': { name: 'Algeria', code: '213', flag: '🇩🇿' },
    'TN': { name: 'Tunisia', code: '216', flag: '🇹🇳' },
    'LY': { name: 'Libya', code: '218', flag: '🇱🇾' },
    'SD': { name: 'Sudan', code: '249', flag: '🇸🇩' },
    
    // Sub-Saharan Africa
    'ZA': { name: 'South Africa', code: '27', flag: '🇿🇦' },
    'NG': { name: 'Nigeria', code: '234', flag: '🇳🇬' },
    'KE': { name: 'Kenya', code: '254', flag: '🇰🇪' },
    'ET': { name: 'Ethiopia', code: '251', flag: '🇪🇹' },
    'TZ': { name: 'Tanzania', code: '255', flag: '🇹🇿' },
    'UG': { name: 'Uganda', code: '256', flag: '🇺🇬' },
    'GH': { name: 'Ghana', code: '233', flag: '🇬🇭' },
    'CI': { name: 'Ivory Coast', code: '225', flag: '🇨🇮' },
    'SN': { name: 'Senegal', code: '221', flag: '🇸🇳' },
    'CM': { name: 'Cameroon', code: '237', flag: '🇨🇲' },
    'AO': { name: 'Angola', code: '244', flag: '🇦🇴' },
    'ZW': { name: 'Zimbabwe', code: '263', flag: '🇿🇼' },
    'MZ': { name: 'Mozambique', code: '258', flag: '🇲🇿' },
    'BW': { name: 'Botswana', code: '267', flag: '🇧🇼' },
    'NA': { name: 'Namibia', code: '264', flag: '🇳🇦' },
    'MU': { name: 'Mauritius', code: '230', flag: '🇲🇺' },
    'RW': { name: 'Rwanda', code: '250', flag: '🇷🇼' },
    'MW': { name: 'Malawi', code: '265', flag: '🇲🇼' },
    'ZM': { name: 'Zambia', code: '260', flag: '🇿🇲' },
    
    // East Asia
    'CN': { name: 'China', code: '86', flag: '🇨🇳' },
    'JP': { name: 'Japan', code: '81', flag: '🇯🇵' },
    'KR': { name: 'South Korea', code: '82', flag: '🇰🇷' },
    'KP': { name: 'North Korea', code: '850', flag: '🇰🇵' },
    'TW': { name: 'Taiwan', code: '886', flag: '🇹🇼' },
    'HK': { name: 'Hong Kong', code: '852', flag: '🇭🇰' },
    'MO': { name: 'Macau', code: '853', flag: '🇲🇴' },
    'MN': { name: 'Mongolia', code: '976', flag: '🇲🇳' },
    
    // Southeast Asia
    'TH': { name: 'Thailand', code: '66', flag: '🇹🇭' },
    'VN': { name: 'Vietnam', code: '84', flag: '🇻🇳' },
    'PH': { name: 'Philippines', code: '63', flag: '🇵🇭' },
    'ID': { name: 'Indonesia', code: '62', flag: '🇮🇩' },
    'MY': { name: 'Malaysia', code: '60', flag: '🇲🇾' },
    'SG': { name: 'Singapore', code: '65', flag: '🇸🇬' },
    'MM': { name: 'Myanmar', code: '95', flag: '🇲🇲' },
    'KH': { name: 'Cambodia', code: '855', flag: '🇰🇭' },
    'LA': { name: 'Laos', code: '856', flag: '🇱🇦' },
    'BN': { name: 'Brunei', code: '673', flag: '🇧🇳' },
    'TL': { name: 'East Timor', code: '670', flag: '🇹🇱' },
    
    // South Asia
    'IN': { name: 'India', code: '91', flag: '🇮🇳' },
    'PK': { name: 'Pakistan', code: '92', flag: '🇵🇰' },
    'BD': { name: 'Bangladesh', code: '880', flag: '🇧🇩' },
    'LK': { name: 'Sri Lanka', code: '94', flag: '🇱🇰' },
    'NP': { name: 'Nepal', code: '977', flag: '🇳🇵' },
    'BT': { name: 'Bhutan', code: '975', flag: '🇧🇹' },
    'MV': { name: 'Maldives', code: '960', flag: '🇲🇻' },
    'AF': { name: 'Afghanistan', code: '93', flag: '🇦🇫' },
    
    // Central Asia
    'KZ': { name: 'Kazakhstan', code: '7', flag: '🇰🇿' },
    'UZ': { name: 'Uzbekistan', code: '998', flag: '🇺🇿' },
    'TM': { name: 'Turkmenistan', code: '993', flag: '🇹🇲' },
    'TJ': { name: 'Tajikistan', code: '992', flag: '🇹🇯' },
    'KG': { name: 'Kyrgyzstan', code: '996', flag: '🇰🇬' },
    'AM': { name: 'Armenia', code: '374', flag: '🇦🇲' },
    'AZ': { name: 'Azerbaijan', code: '994', flag: '🇦🇿' },
    'GE': { name: 'Georgia', code: '995', flag: '🇬🇪' },
    
    // Oceania
    'AU': { name: 'Australia', code: '61', flag: '🇦🇺' },
    'NZ': { name: 'New Zealand', code: '64', flag: '🇳🇿' },
    'PG': { name: 'Papua New Guinea', code: '675', flag: '🇵🇬' },
    'FJ': { name: 'Fiji', code: '679', flag: '🇫🇯' },
    'NC': { name: 'New Caledonia', code: '687', flag: '🇳🇨' },
    'PF': { name: 'French Polynesia', code: '689', flag: '🇵🇫' },
    'WS': { name: 'Samoa', code: '685', flag: '🇼🇸' },
    'TO': { name: 'Tonga', code: '676', flag: '🇹🇴' },
    'VU': { name: 'Vanuatu', code: '678', flag: '🇻🇺' },
    'SB': { name: 'Solomon Islands', code: '677', flag: '🇸🇧' },
    'GU': { name: 'Guam', code: '1671', flag: '🇬🇺' },
    
    // Additional Territories
    'VA': { name: 'Vatican City', code: '379', flag: '🇻🇦' },
    'SM': { name: 'San Marino', code: '378', flag: '🇸🇲' },
    'AD': { name: 'Andorra', code: '376', flag: '🇦🇩' },
    'LI': { name: 'Liechtenstein', code: '423', flag: '🇱🇮' },
    'GL': { name: 'Greenland', code: '299', flag: '🇬🇱' },
    'FO': { name: 'Faroe Islands', code: '298', flag: '🇫🇴' },
    'AX': { name: 'Aland Islands', code: '358', flag: '🇦🇽' },
    'GI': { name: 'Gibraltar', code: '350', flag: '🇬🇮' },
    'IM': { name: 'Isle of Man', code: '44', flag: '🇮🇲' },
    'JE': { name: 'Jersey', code: '44', flag: '🇯🇪' },
    'GG': { name: 'Guernsey', code: '44', flag: '🇬🇬' },
    'RE': { name: 'Reunion', code: '262', flag: '🇷🇪' },
    'YT': { name: 'Mayotte', code: '262', flag: '🇾🇹' },
    'GP': { name: 'Guadeloupe', code: '590', flag: '🇬🇵' },
    'MQ': { name: 'Martinique', code: '596', flag: '🇲🇶' },
    'GF': { name: 'French Guiana', code: '594', flag: '🇬🇫' },
    'BM': { name: 'Bermuda', code: '1441', flag: '🇧🇲' },
    'KY': { name: 'Cayman Islands', code: '1345', flag: '🇰🇾' },
    'TC': { name: 'Turks and Caicos', code: '1649', flag: '🇹🇨' },
    'VG': { name: 'British Virgin Islands', code: '1284', flag: '🇻🇬' },
    'VI': { name: 'US Virgin Islands', code: '1340', flag: '🇻🇮' },
    'AS': { name: 'American Samoa', code: '1684', flag: '🇦🇸' },
    'MP': { name: 'Northern Mariana Islands', code: '1670', flag: '🇲🇵' }
  };

  // ============================================================================
  // TELECOM OPERATORS DATABASE - Major Carriers per Country
  // ============================================================================
  
  const OPERATORS = {
    // Egypt
    'EG': [
      { prefix: '100|101|106|109', name: 'Vodafone Egypt' },
      { prefix: '111|112|114|115', name: 'Etisalat Misr' },
      { prefix: '120|122|127|128', name: 'Orange Egypt' },
      { prefix: '150|155', name: 'WE (Telecom Egypt)' }
    ],
    
    // United Kingdom
    'GB': [
      { prefix: '74', name: 'EE' },
      { prefix: '75|76|77', name: 'Vodafone UK' },
      { prefix: '78', name: 'O2 UK' },
      { prefix: '79', name: 'Three UK' }
    ],
    
    // Germany
    'DE': [
      { prefix: '151|160|170|171|175', name: 'T-Mobile Germany' },
      { prefix: '152|162|172|173|174', name: 'Vodafone Germany' },
      { prefix: '157|159|176|179', name: 'O2 Germany' },
      { prefix: '163|177|178', name: 'E-Plus' }
    ],
    
    // France
    'FR': [
      { prefix: '6|7', name: 'Orange / SFR / Bouygues / Free Mobile' }
    ],
    
    // Italy
    'IT': [
      { prefix: '33', name: 'TIM / Vodafone / Wind Tre' }
    ],
    
    // Spain
    'ES': [
      { prefix: '6|7', name: 'Movistar / Vodafone / Orange' }
    ],
    
    // Saudi Arabia
    'SA': [
      { prefix: '50|53|59', name: 'STC (Saudi Telecom)' },
      { prefix: '54|55|56|58', name: 'Mobily' },
      { prefix: '51|52|57', name: 'Zain KSA' }
    ],
    
    // United Arab Emirates
    'AE': [
      { prefix: '50|54|56', name: 'Etisalat UAE' },
      { prefix: '52|55|58', name: 'du' }
    ],
    
    // Turkey
    'TR': [
      { prefix: '53[0-9]', name: 'Turkcell' },
      { prefix: '54[0-9]', name: 'Vodafone Turkey' },
      { prefix: '55[0-9]', name: 'Turk Telekom' }
    ],
    
    // China
    'CN': [
      { prefix: '130|131|132|145|155|156|166|171|175|176|185|186', name: 'China Unicom' },
      { prefix: '134|135|136|137|138|139|147|150|151|152|157|158|159|178|182|183|184|187|188', name: 'China Mobile' },
      { prefix: '133|149|153|173|177|180|181|189|191|199', name: 'China Telecom' }
    ],
    
    // India
    'IN': [
      { prefix: '98|99|96|90', name: 'Bharti Airtel' },
      { prefix: '70|76|77|89', name: 'Reliance Jio' },
      { prefix: '78', name: 'Vodafone Idea' },
      { prefix: '94|95', name: 'BSNL' }
    ],
    
    // Japan
    'JP': [
      { prefix: '70|80|90', name: 'NTT DoCoMo / au / SoftBank / Rakuten' }
    ],
    
    // South Korea
    'KR': [
      { prefix: '10|11|16|17|18|19', name: 'SK Telecom / KT / LG U+' }
    ],
    
    // Brazil
    'BR': [
      { prefix: '11', name: 'São Paulo - Vivo / Claro / TIM / Oi' },
      { prefix: '21', name: 'Rio de Janeiro - Vivo / Claro / TIM / Oi' }
    ],
    
    // Mexico
    'MX': [
      { prefix: '1', name: 'Telcel / AT&T / Movistar' }
    ],
    
    // Australia
    'AU': [
      { prefix: '4', name: 'Telstra / Optus / Vodafone' }
    ],
    
    // Russia
    'RU': [
      { prefix: '9', name: 'MTS / Beeline / MegaFon / Tele2' }
    ],
    
    // South Africa
    'ZA': [
      { prefix: '6|7|8', name: 'Vodacom / MTN / Cell C / Telkom Mobile' }
    ],
    
    // Poland
    'PL': [
      { prefix: '45|50|51|53|57|60|66|69|72|73|78|79|88', name: 'Orange / T-Mobile / Play / Plus' }
    ],
    
    // Netherlands
    'NL': [
      { prefix: '6', name: 'KPN / Vodafone / T-Mobile / Tele2' }
    ],
    
    // Sweden
    'SE': [
      { prefix: '70|72|73|76|79', name: 'Telia / Tele2 / Telenor / Tre' }
    ],
    
    // Switzerland
    'CH': [
      { prefix: '74|75|76|77|78|79', name: 'Swisscom / Sunrise / Salt' }
    ],
    
    // Belgium
    'BE': [
      { prefix: '4', name: 'Proximus / Orange / Base' }
    ],
    
    // Austria
    'AT': [
      { prefix: '6', name: 'A1 Telekom / T-Mobile / Drei' }
    ],
    
    // Portugal
    'PT': [
      { prefix: '9', name: 'MEO / Vodafone / NOS' }
    ],
    
    // Greece
    'GR': [
      { prefix: '69', name: 'Cosmote / Vodafone / Wind Hellas' }
    ],
    
    // Norway
    'NO': [
      { prefix: '4|9', name: 'Telenor / Telia / Ice.net' }
    ],
    
    // Denmark
    'DK': [
      { prefix: '2|3|4|5|60|71|81|9[1-3]', name: 'TDC / Telenor / Telia / 3' }
    ],
    
    // Finland
    'FI': [
      { prefix: '4|50', name: 'Elisa / Telia / DNA' }
    ],
    
    // Czech Republic
    'CZ': [
      { prefix: '60|70|72|73|77', name: 'T-Mobile / O2 / Vodafone' }
    ],
    
    // Romania
    'RO': [
      { prefix: '7', name: 'Orange / Vodafone / Telekom' }
    ],
    
    // Hungary
    'HU': [
      { prefix: '20|30|31|50|70', name: 'Telekom / Telenor / Vodafone' }
    ],
    
    // Ireland
    'IE': [
      { prefix: '8', name: 'Three / Vodafone / Eir / Tesco Mobile' }
    ],
    
    // Ukraine
    'UA': [
      { prefix: '39|50|63|66|67|68|73|9[1-9]', name: 'Kyivstar / Vodafone / lifecell' }
    ],
    
    // New Zealand
    'NZ': [
      { prefix: '2', name: 'Spark / Vodafone / 2degrees' }
    ],
    
    // Singapore
    'SG': [
      { prefix: '8|9', name: 'Singtel / StarHub / M1' }
    ],
    
    // Malaysia
    'MY': [
      { prefix: '10|11|12|13|14|16|17|18|19', name: 'Maxis / Celcom / Digi / U Mobile' }
    ],
    
    // Thailand
    'TH': [
      { prefix: '6|8|9', name: 'AIS / DTAC / TrueMove H' }
    ],
    
    // Indonesia
    'ID': [
      { prefix: '8', name: 'Telkomsel / Indosat / XL Axiata / Tri' }
    ],
    
    // Philippines
    'PH': [
      { prefix: '9', name: 'Globe / Smart / DITO' }
    ],
    
    // Vietnam
    'VN': [
      { prefix: '3|5|7|8|9', name: 'Viettel / Vinaphone / MobiFone' }
    ],
    
    // Pakistan
    'PK': [
      { prefix: '30|31|32|33|34|35', name: 'Jazz / Telenor / Zong / Ufone' }
    ],
    
    // Bangladesh
    'BD': [
      { prefix: '13|14|15|16|17|18|19', name: 'Grameenphone / Robi / Banglalink' }
    ],
    
    // Israel
    'IL': [
      { prefix: '5', name: 'Cellcom / Pelephone / Partner' }
    ],
    
    // Argentina
    'AR': [
      { prefix: '9', name: 'Movistar / Claro / Personal' }
    ],
    
    // Chile
    'CL': [
      { prefix: '9', name: 'Entel / Movistar / Claro / WOM' }
    ],
    
    // Colombia
    'CO': [
      { prefix: '3', name: 'Claro / Movistar / Tigo' }
    ],
    
    // Peru
    'PE': [
      { prefix: '9', name: 'Movistar / Claro / Entel / Bitel' }
    ],
    
    // Venezuela
    'VE': [
      { prefix: '4', name: 'Movistar / Digitel / Movilnet' }
    ],
    
    // Kenya
    'KE': [
      { prefix: '7', name: 'Safaricom / Airtel / Telkom' }
    ],
    
    // Nigeria
    'NG': [
      { prefix: '70|80|81|90|91', name: 'MTN / Airtel / Glo / 9mobile' }
    ],
    
    // Morocco
    'MA': [
      { prefix: '6|7', name: 'Maroc Telecom / Orange / Inwi' }
    ],
    
    // Algeria
    'DZ': [
      { prefix: '5|6|7', name: 'Mobilis / Djezzy / Ooredoo' }
    ],
    
    // Iraq
    'IQ': [
      { prefix: '75|76|77|78|79', name: 'Zain / Asiacell / Korek' }
    ],
    
    // Qatar
    'QA': [
      { prefix: '3|5|6|7', name: 'Ooredoo / Vodafone Qatar' }
    ],
    
    // Kuwait
    'KW': [
      { prefix: '5|6|9', name: 'Zain / Ooredoo / Viva' }
    ],
    
    // Oman
    'OM': [
      { prefix: '9', name: 'Omantel / Ooredoo' }
    ],
    
    // Jordan
    'JO': [
      { prefix: '7', name: 'Zain / Orange / Umniah' }
    ],
    
    // Lebanon
    'LB': [
      { prefix: '3|7', name: 'Alfa / touch' }
    ],
    
    // Tunisia
    'TN': [
      { prefix: '2|4|5|9', name: 'Ooredoo / Orange / Tunisie Telecom' }
    ],
    
    // Ethiopia
    'ET': [
      { prefix: '9', name: 'Ethio Telecom / Safaricom Ethiopia' }
    ],
    
    // Ghana
    'GH': [
      { prefix: '2|5', name: 'MTN / Vodafone / AirtelTigo' }
    ],
    
    // Tanzania
    'TZ': [
      { prefix: '6|7', name: 'Vodacom / Airtel / Tigo / Halotel' }
    ],
    
    // Uganda
    'UG': [
      { prefix: '7', name: 'MTN / Airtel / Africell' }
    ],
    
    // Zimbabwe
    'ZW': [
      { prefix: '7', name: 'Econet / NetOne / Telecel' }
    ],
    
    // United States
    'US': [
      { prefix: '[2-9]\\d{2}', name: 'Verizon / AT&T / T-Mobile / Sprint' }
    ],
    
    // Canada
    'CA': [
      { prefix: '[2-9]\\d{2}', name: 'Bell / Rogers / Telus / Freedom' }
    ]
  };

  // ============================================================================
  // PHONE VALIDATOR CLASS
  // ============================================================================

  class PhoneValidator {
    constructor() {
      this.version = '2.0.0';
    }

    /**
     * Normalize phone number to E.164 format
     */
    normalize(phone) {
      if (!phone) return '';
      let clean = String(phone).replace(/[\s\-\(\)\.\+]/g, '');
      if (clean.startsWith('00')) clean = clean.substring(2);
      return '+' + clean;
    }

    /**
     * Parse phone number
     */
    parse(phone) {
      const normalized = this.normalize(phone);
      if (!normalized.startsWith('+')) return null;
      
      const digits = normalized.substring(1);
      
      // Sort by code length (longest first) for accurate matching
      const sorted = Object.entries(COUNTRIES).sort((a, b) => 
        b[1].code.length - a[1].code.length
      );
      
      for (const [code, country] of sorted) {
        if (digits.startsWith(country.code)) {
          const nationalNumber = digits.substring(country.code.length);
          return {
            country: country.name,
            countryCode: code,
            callingCode: country.code,
            flag: country.flag,
            nationalNumber: nationalNumber,
            international: `+${country.code} ${nationalNumber}`,
            e164: `+${country.code}${nationalNumber}`
          };
        }
      }
      
      return null;
    }

    /**
     * Identify telecom operator
     */
    identify(phone) {
      const parsed = this.parse(phone);
      if (!parsed) return { error: 'Invalid phone number' };
      
      const operators = OPERATORS[parsed.countryCode];
      if (!operators) {
        return {
          ...parsed,
          operator: 'Unknown Operator'
        };
      }
      
      // Match operator by prefix
      for (const op of operators) {
        const regex = new RegExp(`^(${op.prefix})`);
        if (regex.test(parsed.nationalNumber)) {
          return {
            ...parsed,
            operator: op.name
          };
        }
      }
      
      return {
        ...parsed,
        operator: 'Unknown Operator'
      };
    }

    /**
     * Get all supported countries
     */
    getCountries() {
      return Object.entries(COUNTRIES).map(([code, data]) => ({
        code: code,
        name: data.name,
        callingCode: data.code,
        flag: data.flag
      }));
    }

    /**
     * Search country by name or code
     */
    searchCountry(query) {
      const q = query.toLowerCase();
      return this.getCountries().filter(c => 
        c.name.toLowerCase().includes(q) || 
        c.code.toLowerCase() === q ||
        c.callingCode === q
      );
    }
  }

  // ============================================================================
  // EXPORT
  // ============================================================================

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = PhoneValidator;
  } else if (typeof define === 'function' && define.amd) {
    define([], () => PhoneValidator);
  } else {
    global.PhoneValidator = PhoneValidator;
  }

})(typeof window !== 'undefined' ? window : this);

/**
 * ============================================================================
 * USAGE
 * ============================================================================
 * 
 * const validator = new PhoneValidator();
 * 
 * // Parse number
 * const result = validator.parse('+1 555 123 4567');
 * console.log(result.country); // "United States"
 * console.log(result.flag);    // "🇺🇸"
 * 
 * // Identify operator
 * const info = validator.identify('+44 75 1234 5678');
 * console.log(info.operator);  // "Vodafone UK"
 * 
 * // Get all countries
 * const countries = validator.getCountries();
 * console.log(countries.length); // 196
 * 
 * // Search country
 * const results = validator.searchCountry('united states');
 * console.log(results[0].flag); // "🇺🇸"
 * 
 * ============================================================================
 */