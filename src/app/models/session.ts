export interface Section {
  id: string;
  name: string;
  icon_name?: string;
  items: SectionItem[];
  new: boolean;
}

export interface SectionItem {
  img_url: string;
  overlay: {
    enabled: boolean;
    overlay_msg?: string;
    icon_name?: string;
  };
}
