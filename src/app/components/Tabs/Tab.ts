export interface Tab {
  id: string;
  type: string;
  title: string;
  unsavedChanges?: boolean;
  titleScope?: string;
  action: string;
  item: any;
}
