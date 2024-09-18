/// 注意: [経度, 緯度] の順
export type LngLat = [number, number];

export type SinglePrefecture = {
  /// 全国地方公共団体コード
  code: number;
  /// 都道府県名
  pref: string;

  /// 代表点 (県庁の位置)
  point: LngLat;

  cities: SingleCity[];
};
export function prefectureName(pref: SinglePrefecture): string {
  return pref.pref;
}

/**
 * 都道府県、市区町村一覧API
 * 政令都市の場合は区で区切ります
 * @file api/ja.json
 */
export type PrefectureApi = SinglePrefecture[];

export type SingleCity = {
  /// 全国地方公共団体コード
  code: number;
  /// 郡名
  county?: string;
  /// 市区町村名
  city: string;
  /// 政令市区名
  ward?: string;

  /// 代表点 (自治体役場の位置)
  point: LngLat;
};

export function cityName(city: SingleCity): string {
  return `${city.county || ''}${city.city}${city.ward || ''}`;
}

/**
 * 市区町村一覧API
 * @file api/ja/{都道府県名}.json
 */
export type CityApi = SingleCity[];

export type SingleMachiAza = {
  /// ABR上の「町字ID」
  machiaza_id: string;

  /// 大字・町名
  oaza_cho?: string;
  /// 丁目名
  chome?: string;
  /// 小字名
  koaza?: string;

  /// 住居表示住所の情報の存在。値が存在しない場合は、住居表示住所の情報は存在しません。
  rsdt?: true;

  /// 代表点
  point?: LngLat;
};

export function machiAzaName(machiAza: SingleMachiAza): string {
  return `${machiAza.oaza_cho || ''}${machiAza.chome || ''}${machiAza.koaza || ''}`;
}

/**
 * 町字一覧API
 * @file api/ja/{都道府県名}/{市区町村名}.json
 */
export type MachiAzaApi = SingleMachiAza[];

export type SingleRsdt = {
  /// 街区符号
  blk_num?: string;
  /// 住居番号
  rsdt_num: string;
  /// 住居番号2
  rsdt_num2?: string;

  /// 代表点
  point?: LngLat;
};
/**
 * {市区町村名}-住居表示.json は類似なデータフォーマットを使います。
 * @file api/ja/{都道府県名}/{市区町村名}-住居表示.json
 */
export type RsdtApi = {
  machiAza: SingleMachiAza;
  rsdts: SingleRsdt[];
}[];

export type SingleChiban = {
  /// 地番1
  prc_num1: string;
  /// 地番2
  prc_num2?: string;
  /// 地番3
  prc_num3?: string;

  /// 代表点
  point?: LngLat;
};
/**
 * {市区町村名}-地番.txt は類似なデータフォーマットを使います。
 * @file api/ja/{都道府県名}/{市区町村名}-地番.json
 */
export type ChibanApi = {
  machiAza: SingleMachiAza;
  chibans: SingleChiban[];
}[];
