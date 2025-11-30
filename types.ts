export interface UserCredentials {
  username: string;
  email: string;
}

export enum SectionId {
  INTRO = 'intro',
  CORE = 'core',
  MACRO = 'macro',
  MICRO = 'micro',
  UNITY = 'unity',
  REFS = 'refs'
}

export interface NavItem {
  id: SectionId;
  label: string;
  icon: React.ReactNode;
}