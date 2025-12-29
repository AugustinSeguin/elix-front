export interface Resource {
  id: number;
  name: string;
  localization: {
    latitude: number;
    longitude: number;
  };
  phoneNumber: string | null;
}
