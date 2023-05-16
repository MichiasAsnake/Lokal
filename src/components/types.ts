export interface IData {
    name: string;
    place_id: string;
    photos: {
      photo_reference: string;
      html_attributions: string[];
      height: number;
      width: number;
    }[];
    opening_hours: {
      open_now: boolean;
    };
    rating: number;
    plus_code: {
      compound_code: string;
    };
  }