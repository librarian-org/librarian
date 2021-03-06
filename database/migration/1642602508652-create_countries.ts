import { MigrationInterface, QueryRunner } from 'typeorm';

export class Countries1642593250439 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('country', ['id', 'name'])
      .values([
        { id: 1, name: 'AF' },
        { id: 2, name: 'AX' },
        { id: 3, name: 'AL' },
        { id: 4, name: 'DZ' },
        { id: 5, name: 'AS' },
        { id: 6, name: 'AD' },
        { id: 7, name: 'AO' },
        { id: 8, name: 'AI' },
        { id: 9, name: 'AQ' },
        { id: 10, name: 'AG' },
        { id: 11, name: 'AR' },
        { id: 12, name: 'AM' },
        { id: 13, name: 'AW' },
        { id: 14, name: 'AU' },
        { id: 15, name: 'AT' },
        { id: 16, name: 'AZ' },
        { id: 17, name: 'BS' },
        { id: 18, name: 'BH' },
        { id: 19, name: 'BD' },
        { id: 20, name: 'BB' },
        { id: 21, name: 'BY' },
        { id: 22, name: 'BE' },
        { id: 23, name: 'BZ' },
        { id: 24, name: 'BJ' },
        { id: 25, name: 'BM' },
        { id: 26, name: 'BT' },
        { id: 27, name: 'BO' },
        { id: 28, name: 'BQ' },
        { id: 29, name: 'BA' },
        { id: 30, name: 'BW' },
        { id: 31, name: 'BV' },
        { id: 32, name: 'BR' },
        { id: 33, name: 'IO' },
        { id: 34, name: 'BN' },
        { id: 35, name: 'BG' },
        { id: 36, name: 'BF' },
        { id: 37, name: 'BI' },
        { id: 38, name: 'KH' },
        { id: 39, name: 'CM' },
        { id: 40, name: 'CA' },
        { id: 41, name: 'CV' },
        { id: 42, name: 'KY' },
        { id: 43, name: 'CF' },
        { id: 44, name: 'TD' },
        { id: 45, name: 'CL' },
        { id: 46, name: 'CN' },
        { id: 47, name: 'CX' },
        { id: 48, name: 'CC' },
        { id: 49, name: 'CO' },
        { id: 50, name: 'KM' },
        { id: 51, name: 'CG' },
        { id: 52, name: 'CD' },
        { id: 53, name: 'CK' },
        { id: 54, name: 'CR' },
        { id: 55, name: 'CI' },
        { id: 56, name: 'HR' },
        { id: 57, name: 'CU' },
        { id: 58, name: 'CW' },
        { id: 59, name: 'CY' },
        { id: 60, name: 'CZ' },
        { id: 61, name: 'DK' },
        { id: 62, name: 'DJ' },
        { id: 63, name: 'DM' },
        { id: 64, name: 'DO' },
        { id: 65, name: 'EC' },
        { id: 66, name: 'EG' },
        { id: 67, name: 'SV' },
        { id: 68, name: 'GQ' },
        { id: 69, name: 'ER' },
        { id: 70, name: 'EE' },
        { id: 71, name: 'ET' },
        { id: 72, name: 'FK' },
        { id: 73, name: 'FO' },
        { id: 74, name: 'FJ' },
        { id: 75, name: 'FI' },
        { id: 76, name: 'FR' },
        { id: 77, name: 'GF' },
        { id: 78, name: 'PF' },
        { id: 79, name: 'TF' },
        { id: 80, name: 'GA' },
        { id: 81, name: 'GM' },
        { id: 82, name: 'GE' },
        { id: 83, name: 'DE' },
        { id: 84, name: 'GH' },
        { id: 85, name: 'GI' },
        { id: 86, name: 'GR' },
        { id: 87, name: 'GL' },
        { id: 88, name: 'GD' },
        { id: 89, name: 'GP' },
        { id: 90, name: 'GU' },
        { id: 91, name: 'GT' },
        { id: 92, name: 'GG' },
        { id: 93, name: 'GN' },
        { id: 94, name: 'GW' },
        { id: 95, name: 'GY' },
        { id: 96, name: 'HT' },
        { id: 97, name: 'HM' },
        { id: 98, name: 'VA' },
        { id: 99, name: 'HN' },
        { id: 100, name: 'HK' },
        { id: 101, name: 'HU' },
        { id: 102, name: 'IS' },
        { id: 103, name: 'IN' },
        { id: 104, name: 'ID' },
        { id: 105, name: 'IR' },
        { id: 106, name: 'IQ' },
        { id: 107, name: 'IE' },
        { id: 108, name: 'IM' },
        { id: 109, name: 'IL' },
        { id: 110, name: 'IT' },
        { id: 111, name: 'JM' },
        { id: 112, name: 'JP' },
        { id: 113, name: 'JE' },
        { id: 114, name: 'JO' },
        { id: 115, name: 'KZ' },
        { id: 116, name: 'KE' },
        { id: 117, name: 'KI' },
        { id: 118, name: 'KP' },
        { id: 119, name: 'KR' },
        { id: 120, name: 'XK' },
        { id: 121, name: 'KW' },
        { id: 122, name: 'KG' },
        { id: 123, name: 'LA' },
        { id: 124, name: 'LV' },
        { id: 125, name: 'LB' },
        { id: 126, name: 'LS' },
        { id: 127, name: 'LR' },
        { id: 128, name: 'LY' },
        { id: 129, name: 'LI' },
        { id: 130, name: 'LT' },
        { id: 131, name: 'LU' },
        { id: 132, name: 'MO' },
        { id: 133, name: 'MK' },
        { id: 134, name: 'MG' },
        { id: 135, name: 'MW' },
        { id: 136, name: 'MY' },
        { id: 137, name: 'MV' },
        { id: 138, name: 'ML' },
        { id: 139, name: 'MT' },
        { id: 140, name: 'MH' },
        { id: 141, name: 'MQ' },
        { id: 142, name: 'MR' },
        { id: 143, name: 'MU' },
        { id: 144, name: 'YT' },
        { id: 145, name: 'MX' },
        { id: 146, name: 'FM' },
        { id: 147, name: 'MD' },
        { id: 148, name: 'MC' },
        { id: 149, name: 'MN' },
        { id: 150, name: 'ME' },
        { id: 151, name: 'MS' },
        { id: 152, name: 'MA' },
        { id: 153, name: 'MZ' },
        { id: 154, name: 'MM' },
        { id: 155, name: 'NA' },
        { id: 156, name: 'NR' },
        { id: 157, name: 'NP' },
        { id: 158, name: 'NL' },
        { id: 159, name: 'AN' },
        { id: 160, name: 'NC' },
        { id: 161, name: 'NZ' },
        { id: 162, name: 'NI' },
        { id: 163, name: 'NE' },
        { id: 164, name: 'NG' },
        { id: 165, name: 'NU' },
        { id: 166, name: 'NF' },
        { id: 167, name: 'MP' },
        { id: 168, name: 'NO' },
        { id: 169, name: 'OM' },
        { id: 170, name: 'PK' },
        { id: 171, name: 'PW' },
        { id: 172, name: 'PS' },
        { id: 173, name: 'PA' },
        { id: 174, name: 'PG' },
        { id: 175, name: 'PY' },
        { id: 176, name: 'PE' },
        { id: 177, name: 'PH' },
        { id: 178, name: 'PN' },
        { id: 179, name: 'PL' },
        { id: 180, name: 'PT' },
        { id: 181, name: 'PR' },
        { id: 182, name: 'QA' },
        { id: 183, name: 'RE' },
        { id: 184, name: 'RO' },
        { id: 185, name: 'RU' },
        { id: 186, name: 'RW' },
        { id: 187, name: 'BL' },
        { id: 188, name: 'SH' },
        { id: 189, name: 'KN' },
        { id: 190, name: 'LC' },
        { id: 191, name: 'MF' },
        { id: 192, name: 'PM' },
        { id: 193, name: 'VC' },
        { id: 194, name: 'WS' },
        { id: 195, name: 'SM' },
        { id: 196, name: 'ST' },
        { id: 197, name: 'SA' },
        { id: 198, name: 'SN' },
        { id: 199, name: 'RS' },
        { id: 200, name: 'CS' },
        { id: 201, name: 'SC' },
        { id: 202, name: 'SL' },
        { id: 203, name: 'SG' },
        { id: 204, name: 'SX' },
        { id: 205, name: 'SK' },
        { id: 206, name: 'SI' },
        { id: 207, name: 'SB' },
        { id: 208, name: 'SO' },
        { id: 209, name: 'ZA' },
        { id: 210, name: 'GS' },
        { id: 211, name: 'SS' },
        { id: 212, name: 'ES' },
        { id: 213, name: 'LK' },
        { id: 214, name: 'SD' },
        { id: 215, name: 'SR' },
        { id: 216, name: 'SJ' },
        { id: 217, name: 'SZ' },
        { id: 218, name: 'SE' },
        { id: 219, name: 'CH' },
        { id: 220, name: 'SY' },
        { id: 221, name: 'TW' },
        { id: 222, name: 'TJ' },
        { id: 223, name: 'TZ' },
        { id: 224, name: 'TH' },
        { id: 225, name: 'TL' },
        { id: 226, name: 'TG' },
        { id: 227, name: 'TK' },
        { id: 228, name: 'TO' },
        { id: 229, name: 'TT' },
        { id: 230, name: 'TN' },
        { id: 231, name: 'TR' },
        { id: 232, name: 'TM' },
        { id: 233, name: 'TC' },
        { id: 234, name: 'TV' },
        { id: 235, name: 'UG' },
        { id: 236, name: 'UA' },
        { id: 237, name: 'AE' },
        { id: 238, name: 'GB' },
        { id: 239, name: 'US' },
        { id: 240, name: 'UM' },
        { id: 241, name: 'UY' },
        { id: 242, name: 'UZ' },
        { id: 243, name: 'VU' },
        { id: 244, name: 'VE' },
        { id: 245, name: 'VN' },
        { id: 246, name: 'VG' },
        { id: 247, name: 'VI' },
        { id: 248, name: 'WF' },
        { id: 249, name: 'EH' },
        { id: 250, name: 'YE' },
        { id: 251, name: 'ZM' },
        { id: 252, name: 'ZW' },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('country')
      .execute();
  }
}
